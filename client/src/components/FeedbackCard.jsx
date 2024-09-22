import React from 'react'
import { avatar, quotationMark } from '../assets'

const FeedbackCard = () => {
  return (
    <div className='dark:text-white p-8 rounded-3xl shadow-xl my-8 mx-2'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
                <img src="https://upload.wikimedia.org/wikipedia/en/f/fd/Tommy_Shelby.jpg" className='rounded-3xl w-25 h-20'/>
                <div>
                    <h1>Thomas,</h1>
                    <p>CTO</p>
                </div>
            
            </div>
            <img className='h-8' src={quotationMark} />
      </div>

      <div className='py-8'>
        <h3 className='text-lg'>"Working with Brainsupply has been a game-changer for our development team. The
three developers recommended to us were not only highly skilled but also perfectly
matched to our project needs. Their expertise and professionalism have significantly
accelerated our product development timeline. Brainsupply 's rigorous selection process
truly ensures that you get the best talent available. We couldn't be happier with the results
and look forward to continuing our partnership.</h3>
      </div>
    </div>
  )
}

export default FeedbackCard