'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const companies = [
	{
		name: 'KCB Bank',
		logo: '/images/logos/KCB.png',
		darkLogo: '/images/logos/KCB.png',
		industry: 'Financial Services',
	},
	{
		name: 'MTN',
		logo: '/images/logos/mtn.png',
		darkLogo: '/images/logos/mtn.png',
		industry: 'Telecommunications',
	},
	{
		name: 'NBS',
		logo: '/images/logos/NBS.jpg',
		darkLogo: '/images/logos/NBS.jpg',
		industry: 'Media',
	},
	{
		name: 'Nile Special',
		logo: '/images/logos/Nilespecial.jpg',
		darkLogo: '/images/logos/Nilespecial.jpg',
		industry: 'Beverage',
	},
	{
		name: 'SafeBoda',
		logo: '/images/logos/safeboda.png',
		darkLogo: '/images/logos/safeboda.png',
		industry: 'Transportation',
	},
	{
		name: 'KCB Bank',
		logo: '/images/logos/KCB.png',
		darkLogo: '/images/logos/KCB.png',
		industry: 'Financial Services',
	},
	{
		name: 'MTN',
		logo: '/images/logos/mtn.png',
		darkLogo: '/images/logos/mtn.png',
		industry: 'Telecommunications',
	},
	{
		name: 'NBS',
		logo: '/images/logos/NBS.jpg',
		darkLogo: '/images/logos/NBS.jpg',
		industry: 'Media',
	},
	{
		name: 'Nile Special',
		logo: '/images/logos/Nilespecial.jpg',
		darkLogo: '/images/logos/Nilespecial.jpg',
		industry: 'Beverage',
	},
	{
		name: 'SafeBoda',
		logo: '/images/logos/safeboda.png',
		darkLogo: '/images/logos/safeboda.png',
		industry: 'Transportation',
	},
];

const ProfessionalLogoScroll = () => {
	return (
		<div className='relative w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black py-8 md:py-6'>
			{/* Decorative Gradient Overlay */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary-500/20 to-transparent'></div>
				<div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-500/20 to-transparent'></div>
			</div>

			{/* Infinite Logo Carousel */}
			<div className='relative w-full'>
				<motion.div
					className='flex items-center space-x-8 md:space-x-12 lg:space-x-16 w-[200%]'
					initial={{ x: '0%' }} // Start offscreen to the left
					animate={{ x: '-100%' }} // Slide to the right
					transition={{
						duration: 90, // Adjust speed
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'linear',
					}}>
					{[...companies, ...companies].map((company, index) => (
						<motion.div
							key={`${company.name}-${index}`}
							className='flex-shrink-0 w-24 md:w-32 lg:w-40 h-16 md:h-20 lg:h-24 relative group'
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.0 },
							}}>
							<div className='absolute inset-0 bg-white/10 rounded-xl blur-2xl group-hover:bg-white/20 transition-all duration-300 ease-in-out'></div>

							<div className='relative z-10 w-full h-full flex items-center justify-center'>
								<Image
									src={company.darkLogo || company.logo}
									alt={`${company.name} logo`}
									fill
									className='object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300'
								/>
							</div>

							{/* Hover Tooltip */}
							<div className='absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
								<div className='bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 text-xs text-white'>
									{company.industry}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Gradient Masks */}
				<div className='pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10'></div>
				<div className='pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10'></div>
			</div>
		</div>
	);
};

export default ProfessionalLogoScroll;
