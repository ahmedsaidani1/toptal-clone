import React, { useState } from 'react';
import WorkforceSidebar from '../components/WorkforceSidebar';
import { Button, Label, Select, Spinner, Alert } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Schedule = () => {
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const developers = ['Developer 1', 'Developer 2', 'Developer 3']; // Replace with your actual developers

  const handleChange = (e) => {
    setSelectedDeveloper(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDeveloper || !selectedDate) {
      return setErrorMessage('Please select a developer and a date.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.post('/api/schedule', {
        developer: selectedDeveloper,
        date: selectedDate
      });
      setLoading(false);
      setSelectedDeveloper('');
      setSelectedDate(null);
      toast.success('Appointment created successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Section */}
      <WorkforceSidebar tab="appointments" />

      {/* Main Content Section */}
      <div className="flex-grow p-4 mt-5">
        {/* Header Section */}
        <header className="flex justify-center w-full p-1 mt-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Appointments</h1>
        </header>

        {/* Form Section */}
        <main className="flex-grow flex items-center justify-center mb-2 w-full">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg w-full max-w-2xl flex flex-col shadow-lg">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <Label htmlFor="developer" className="block text-gray-700 dark:text-gray-300 mb-2">Select Developer</Label>
                <Select
                  id="developer"
                  value={selectedDeveloper}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="" disabled>Select Developer</option>
                  {developers.map((developer, index) => (
                    <option key={index} value={developer}>
                      {developer}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="mb-4">
                <Label htmlFor="date" className="block text-gray-700 dark:text-gray-300 mb-2">Select Date</Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                  id="date"
                  required
                />
              </div>
              <div className="flex space-x-10">
                <Button
                  gradientDuoTone="purpleToPink"
                  type="submit"
                  className="flex-shrink-0"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : 'Make an Appointment'}
                </Button>
                <Button
                  gradientDuoTone="cyanToBlue"
                  type="button"
                  className="flex-shrink-0"
                  onClick={() => {
                    setSelectedDeveloper('');
                    setSelectedDate(null);
                  }}
                >
                  Restart Matching
                </Button>

                
                
                <a href='/appointment' className='mt-2 underline text-red-400' style={{marginLeft:'80px'}}>view appointments</a>
              </div>
            </form>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Schedule;
