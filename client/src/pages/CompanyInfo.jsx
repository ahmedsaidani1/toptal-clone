// CompanyInfo.jsx
import { Alert, Button, Label, Select, TextInput, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function CompanyInfo() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { companyName, companySize, companyLinkedIn } = formData;
    if (!companyName || !companySize || !companyLinkedIn) {
      return setErrorMessage('Please fill out all fields.');
    } else if (!/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/.test(formData.companyLinkedIn)) {
        return setErrorMessage('Please enter a valid LinkedIn URL.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const token = localStorage.getItem('token');
      console.log('token:', localStorage.getItem('token'));
      const res = await fetch(`/api/auth/update-company-info/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1' style={{marginTop: "10px"}}>
          <Link to='/sign-in' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Brain
            </span>
            Supply
          </Link>
          <p className='text-sm mt-5'>
            This is an e-learning platform. Please complete your company information to continue.
          </p>
        </div>
        {/* right */}
        <div className='flex-1' style={{marginTop: "1px"}}>
          <h2 className='text-2xl font-bold mb-4'>Company Information</h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Company Name' />
              <TextInput
                type='text'
                placeholder='Company Name'
                id='companyName'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Company Size' />
              <Select id="companySize" value={formData.companySize} onChange={handleChange} className="mt-1">
              <option value="">Select Company Size</option>
              <option value="1-10">1-10</option>
              <option value="10-100">10-100</option>
              <option value="100-1000">100-1000</option>
            </Select>
            </div>
            <div>
              <Label value='Company LinkedIn' />
              <TextInput
                type='url'
                placeholder='Company LinkedIn'
                id='companyLinkedIn'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
                ) : 'Submit'
              }
            </Button>
          </form>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
