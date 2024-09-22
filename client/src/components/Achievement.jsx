import React from 'react';
import { FaBusinessTime, FaClock, FaUserTie, FaDollarSign, FaMedal, FaShieldAlt } from 'react-icons/fa';

const Card = ({ icon, title, content }) => {
  return (
    <div className="dark:bg-gray-800 bg-[#f5f3f9] dark:text-gray-200 text-black p-6 rounded-lg shadow-lg border border-[#bc9ce8] w-64 h-[25rem] flex flex-col items-center text-center">
      <div className="text-2xl mb-5">{icon}</div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

const Achievement = () => {
  return (
    <div className='w-full py-24'>
      <h1 className='mb-5 pl-4 text-3xl font-bold' style={{ marginLeft: '100px' }}>Why <span className='text-[#bc9ce8]'>BrainSupply</span>?</h1>
      <div className='container mx-auto'>
        <div className='flex flex-wrap justify-center gap-6'>
          <Card 
            icon={<FaBusinessTime size={30} style={{color:'#bc9ce8'}} />} 
            title="No Administrative Overhead" 
            content="Simply fill out a form with your requirements, and we’ll provide you with three tailored recommendations. Choose who to interview, and if you accept them, they’ll start working on your project immediately."
          />
          <Card 
            icon={<FaClock size={30} style={{color:'#bc9ce8'}} />} 
            title="Faster Hiring" 
            content="It takes just one week to start working with our hired talent." 
          />
          <Card 
            icon={<FaUserTie size={30} style={{color:'#bc9ce8'}} />} 
            title="Access Inaccessible Talent" 
            content="Our talent pool consists of over 1,000 tech experts, all accessible with the click of a button." 
          />
        </div>
        <div className='flex justify-center gap-6 mt-6'>
          <Card 
            icon={<FaDollarSign size={30} style={{color:'#bc9ce8'}} />} 
            title="Affordable Costs" 
            content="It only costs €1000 per month, compared to hiring locally for €6000 per month." 
          />
          <Card 
            icon={<FaMedal size={30} style={{color:'#bc9ce8'}} />} 
            title="Top 2% of the Talent Pool" 
            content="Our talent pool is curated from the top 2% of talent Tunisia has to offer." 
          />
          <Card 
            icon={<FaShieldAlt size={30} style={{color:'#bc9ce8'}} />} 
            title="We Are Compliant" 
            content="We adhere to both Tunisian labour laws and EU digital regulations, including data privacy and more." 
          />
        </div>
      </div>
    </div>
  );
};

export default Achievement;
