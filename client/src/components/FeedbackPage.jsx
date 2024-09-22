import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WorkforceSidebar from './WorkforceSidebar';
import { Alert, Button, Label, TextInput, Textarea, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FeedbackPage() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({ fullName: '', title: '', message: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, title, message } = formData;
    if (!fullName || !title || !message) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/auth/send-feedback/${currentUser._id}`, {
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
      if (res.ok) {
        setFormData({ fullName: '', title: '', message: '' });
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
    setTimeout(() => {
      toast.success("feedback sent !");
    }, 10); 
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Section */}
      <WorkforceSidebar tab="customer-support" />

      {/* Main Content Section */}
      <div className="flex-grow p-4 mt-5">
        {/* Header Section */}
        <header className="flex justify-center w-full p-1 mt-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">Let us know what is on your mind</h1>
        </header>

        {/* Form Section */}
        <main className="flex-grow flex items-center justify-center mb-2 w-full">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="fullName" className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</Label>
                <TextInput
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">Title</Label>
                <TextInput
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="dark:bg-gray-700 dark:text-gray-200"
                ></Textarea>
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Send Message'}
              </Button>
            </form>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};
