import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkforceSidebar from '../components/WorkforceSidebar';
import { Link } from 'react-router-dom';

const Talent = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get('/api/developers');
        setDevelopers(response.data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 h-full">
      <WorkforceSidebar />
      <div className="flex-grow flex flex-wrap justify-start mt-20 ml-10 h-32 ">
        {developers.map((developer, index) => (
          <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-white m-4">
            <img className="w-full h-32 object-cover" src={developer.image} alt={developer.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">{developer.name}</div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{developer.specialty}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Bay Area, San Francisco, CA</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-center">
              <Link to='/userpage'>
              <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-1 px-3 rounded text-sm hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800">
                + View Profile
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Talent;
