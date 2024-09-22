import { useState } from 'react';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Password reset email sent');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className='min-h-screen' style={{marginTop: '150px'}}>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Brain
            </span>
            Supply
          </Link>
          <p className='text-sm mt-5'>
            This is an e-learning platform. You can reset your password by entering your email address.
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Send Reset Link
            </Button>
          </form>
          {message && (
            <Alert className='mt-5' color='success'>
              {message}
            </Alert>
          )}
          {error && (
            <Alert className='mt-5' color='failure'>
              {error}
            </Alert>
          )}
          <div className='flex gap-2 text-sm mt-5'>
            <span>Remember your password?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}