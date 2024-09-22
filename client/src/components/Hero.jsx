import React from 'react';
import { heroImg } from '../assets';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="w-full dark:text-white py-24 bg-white dark:bg-gray-900">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] px-4 md:px-0 items-center">
        <div className="flex flex-col justify-center gap-4 text-center md:text-left">
          <p className="py-2 text-3xl text-[#bc9ce8] font-semibold">
            Hire the Top 3% of Tunisia's Talent
          </p>
          <h3 className="md:leading-[72px] py-2 md:text-5xl text-3xl font-bold text-gray-800 dark:text-white">
            Brainsupply is <span className="text-[#bc9ce8]">an elite network</span> of premier Tunisian software developers, QA experts, DevOps specialists, Data scientists, UX/UI Designers, and IT project managers. Leading companies choose <span className="text-[#bc9ce8]">Toptal talent</span> to enhance their teams and drive their most critical projects to success.
          </h3>
          <Link to="/hiring-form">
          <Button 
            gradientDuoTone="purpleToPink" 
            className="self-center md:self-start px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
              <p className='text-base'>Hire the best talent</p>  
          </Button>
          </Link>
        </div>
        <img src={heroImg} alt="Hero" className="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Hero;
