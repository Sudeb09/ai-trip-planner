import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center px-6 md:px-20 lg:mx-56 gap-6 md:gap-9 text-center'>
      <h2 className='font-extrabold text-3xl md:text-5xl mt-12 md:mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI </span>
        <br className='hidden md:block' />
        Personalized Itineraries at Your Fingertips
      </h2>

      <p className='text-base md:text-xl text-gray-500'>
        Your personal trip planner and travel adviser, creating custom itineraries tailored to your interests and budget
      </p>

      <Link to={'/create-trip'}>
        <Button className='px-6 py-3 text-lg md:text-xl'>Get Started</Button>
      </Link>
    </div>
  );
}

export default Hero;