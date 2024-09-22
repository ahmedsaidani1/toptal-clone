import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WorkforceSidebar from './WorkforceSidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hiring = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    skillset: [],
    hours: '',
    role: '',
    projectType: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        skillset: checked
          ? [...prevData.skillset, value]
          : prevData.skillset.filter((skill) => skill !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Hire created successfully:', data);
      } else {
        console.log('Failed to create hire');
      }
    } catch (error) {
      console.error('Error:', error);
    }

      toast.success("project is added!");
   
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Section */}
      <WorkforceSidebar tab="hire-more" />

      {/* Main Content Section */}
      <div className="flex-grow flex max-w-4xl mx-auto mt-20">
        <form onSubmit={handleSubmit} className="w-1/2 mr-10">
          <div className="mb-5">
            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skillset</label>
            <div className="flex flex-wrap">
              {['React', 'Angular', 'Node'].map((skill) => (
                <div key={skill} className="flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    id={skill}
                    name="skillset"
                    value={skill}
                    onChange={handleChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                  <label htmlFor={skill} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{skill}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="hours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Hours</label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            >
              <option value="">Select Role</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="projectType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Type</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            >
              <option value="">Select Project Type</option>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="cloud">Cloud</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Hiring;
