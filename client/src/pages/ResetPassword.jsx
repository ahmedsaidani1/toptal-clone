import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput } from 'flowbite-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Password reset successful');
        setTimeout(() => navigate('/sign-in'), 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
            <h2 className='text-2xl font-bold mb-5'>Reset Password</h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='New Password' />
              <TextInput
                type='password'
                placeholder='**********'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label value='Confirm Password' />
              <TextInput
                type='password'
                placeholder='**********'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Reset Password
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
        </div>
      </div>
    </div>
  );
}
