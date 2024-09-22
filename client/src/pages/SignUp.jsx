import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import PasswordValidation from '../components/PasswordValidation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the styles for react-phone-number-input
import './SignUp.css'; // Import the custom CSS
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [showRepeatPasswordValidation, setShowRepeatPasswordValidation] = useState(false);
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));

    if (id === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailPattern.test(value);
      setIsEmailValid(valid);
      setShowEmailValidation(!valid);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleFocus = (e) => {
    if (e.target.id === 'password') {
      setShowPasswordValidation(true);
    } else if (e.target.id === 'repeatPassword') {
      setShowRepeatPasswordValidation(true);
    }
  };

  const handleBlur = (e) => {
    if (e.target.id === 'password') {
      setShowPasswordValidation(false);
    } else if (e.target.id === 'repeatPassword') {
      setShowRepeatPasswordValidation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.password || !formData.repeatPassword) {
      return setErrorMessage('Please fill out all fields.');
    } else if (!emailPattern.test(formData.email)) {
      return setErrorMessage('Please enter a valid email address.');
    } else if (!passwordPattern.test(formData.password)) {
      return setErrorMessage('Password must be at least 8 characters long and contain at least one letter and one number.');
    } else if (!phonePattern.test(formData.phone)) {
      return setErrorMessage('Please enter a valid phone number.');
    } else if (formData.password !== formData.repeatPassword) {
      return setErrorMessage('Passwords do not match.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const { firstName, lastName, phone, email, password } = formData;
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone, email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        const { token, ...user } = data;

        // Store the token in local storage
        localStorage.setItem('token', token);

        // Dispatch login success action
        dispatch(signInSuccess(user));

        // Display a success toast notification
     
        setTimeout(() => {
          toast.success("Signed up successfully!");
        }, 6000); // Delay to allow the toast to be seen
      
        navigate('/company-info');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1' style={{ marginTop: "10px" }}>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Brain
            </span>
            Supply
          </Link>
          <p className='text-sm mt-5'>
            This is an e-learning platform. You can sign up with your email and password or with Google.
          </p>
        </div>
        <div className='flex-1' style={{ marginTop: "1px" }}>
          <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label />
              <TextInput type='text' placeholder='FirstName' id='firstName' onChange={handleChange} />
            </div>
            <div>
              <Label />
              <TextInput type='text' placeholder='LastName' id='lastName' onChange={handleChange} />
            </div>
            <div className="phone-input-container">
              <PhoneInput
                international
                defaultCountry="US"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="phone-input "
              />
            </div>
            <div>
              <Label />
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange} />
              {showEmailValidation && (
                <p className="text-red-500 mt-2">Please enter a valid email address.</p>
              )}
              {isEmailValid && !showEmailValidation && (
                <p className="text-green-500 mt-2">Email is valid!</p>
              )}
            </div>
            <div>
              <Label />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
              {showPasswordValidation && <PasswordValidation password={formData.password || ''} />}
            </div>
            <div>
              <Label />
              <TextInput type='password' placeholder='Repeat Password' id='repeatPassword' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
              {showRepeatPasswordValidation && (
                <div className="mt-2">
                  {formData.password === formData.repeatPassword ? (
                    <p className="text-green-500">Passwords match!</p>
                  ) : (
                    <p className="text-red-500">Passwords do not match!</p>
                  )}
                </div>
              )}
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign Up'}
            </Button>
            <hr className="my-4" />
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Log In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
