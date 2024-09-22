import React from 'react'

const Card = ({course}) => {
  return (
    <div className='z-10 dark:text-white overflow-hidden  mr-6  my-4 rounded-lg shadow-lg border border-[#bc9ce8]'>
        <img src={course.linkImg} 
                className="h-40 w-full "
        
        />
        <div className='p-4  '>
            <h1 className='py-2 truncate font-bold text-xl'>{course.title}</h1>
            <h1>{course.description}</h1>
        </div>
        
    </div>
  )
}

export default Card