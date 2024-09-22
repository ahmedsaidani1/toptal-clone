import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const CTA = () => {
  return (
    <div className="w-full dark:text-white py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] items-center px-4 md:px-0">
        <img 
          src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/06/person-at-computer.jpeg.jpg" 
          alt="Hiring the best talent" 
          className="w-full md:w-[650px] rounded-xl shadow-xl mx-auto"
        />

        <div className="text-center md:text-left">
          <h1 className="py-2 text-4xl font-semibold">
            Hire <span className="text-[#bc9ce8]">The Best</span> Now!
          </h1>
          <p className="py-5 text-lg text-gray-600 dark:text-gray-300">
            Augment your team quickly, cost-effectively, and hassle-free with the best talent, all without worrying about compliance.
          </p>
          <Link to="/hiring-form">
            <Button
              gradientDuoTone="purpleToPink"
              className="px-6 py-4 font-semibold shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
              >
              <p className='text-base'>Hire the best talent</p>  
              
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CTA;
