
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

import { SocialIcon1, SocialIcon2, SocialIcon3, SocialIcon4, SocialIcon5 } from './SocialIcons';

const HeaderCard = () => {
  return (
    <div className="card bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white mt-2 mx-2 w-full h-auto py-20 flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold">What will you design today?</h2>
      <div className="mt-2 w-1/2 py-4">
        <input
          type="text"
          placeholder="Search your content or Canva's"
          className="w-full p-2 rounded"
        />
      </div>
      <div className="flex flex-wrap justify-center space-x-2 mt-4 py-4">
        {/* Custom images for document types */}
          <div className='px-4 py-2 mr-2'>
            <SocialIcon1/>
          </div>
    
        <div className='px-4 py-2 mr-2'> <SocialIcon2/> </div>
        <div className='px-4 py-2 mr-2'> <SocialIcon3/> </div>
        <div className='px-4 py-2 mr-2'> <SocialIcon4/></div>
        <div className='px-4 py-2 mr-2'> <SocialIcon5/></div>
      </div>
    </div>
  );
};

export default HeaderCard;

