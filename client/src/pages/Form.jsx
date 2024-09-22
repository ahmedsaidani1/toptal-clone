import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/developers', formData);
      console.log('Developer created:', response.data);
    } catch (error) {
      console.error('Error creating developer:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-grow flex max-w-4xl mx-auto mt-20">
        <form onSubmit={handleSubmit} className="w-1/2 mr-10">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Developer Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="specialty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialty</label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            >
              <option value="">Select Specialty</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
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
    </div>
  );
};

export default Form;
