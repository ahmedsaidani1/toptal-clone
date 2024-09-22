import React from 'react';

const Categories = () => {
  return (
    <div className='w-full dark:text-white py-24 flex justify-center'>
      <div className='bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg w-[50rem]'>
        <div className='flex items-center mb-6'>
          <img 
            src="https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/340219304_184192200657028_613496711251567426_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Lj1oMSgdX7QQ7kNvgGvybcR&_nc_ht=scontent.ftun14-1.fna&oh=00_AYB5sdH4M0dRiAC_crisG_I5PaW2MqD7KTQls8-owB23RQ&oe=66C427BC"
            alt="Profile" 
            className='rounded-full w-20 h-20'
          />
          <div className='ml-4'>
            <h2 className='text-xl font-bold'>Hi, I am Ahmed 👋</h2>
          </div>
        </div>
        
        <p className='mb-4'>
          After working as a software engineer for several German companies over the past five
          years, I encountered a persistent challenge: a shortage of high-quality talent and the high
          costs associated with hiring locally. Outsourcing, while a potential solution, often seemed
          risky due to concerns about quality assurance, compliance, and the lack of direct contact
          with developers.
        </p>
        <p className='mb-4'>
          Determined to address these issues, I founded Brainsupply. My goal was to create a
          solution that combines the benefits of outsourcing with the reliability and transparency of
          local hiring. At Brainsupply, we ensure top-notch quality and compliance by carefully
          curating our talent pool and providing a seamless, efficient hiring process. This approach
          not only reduces costs but also provides a direct line of communication with highly skilled
          professionals, delivering the best of both worlds.
        </p>
      </div>
    </div>
  );
};

export default Categories;
