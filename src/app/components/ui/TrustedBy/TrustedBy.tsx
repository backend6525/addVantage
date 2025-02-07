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
		<section className='section-transition'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			{/* Section Content */}
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 py-12'>
				<div className='max-w-3xl mx-auto text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-gradient'>
						Trusted by Industry Leaders
					</h2>
					<p className='text-lg text-muted-foreground leading-relaxed'>
						Join thousands of successful businesses that trust our platform for
						their marketing needs
					</p>
				</div>

				{/* Logo Carousel */}
				<div className='relative w-full overflow-hidden'>
					<div className='absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10'></div>
					<div className='absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10'></div>

					<motion.div
						className='flex items-center space-x-8 md:space-x-12 lg:space-x-16 w-[200%]'
						initial={{ x: '0%' }}
						animate={{ x: '-100%' }}
						transition={{
							duration: 90,
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
									transition: { duration: 0.2 },
								}}>
								<div className='glass absolute inset-0 rounded-xl group-hover:border-primary/20 transition-colors duration-300'></div>

								<div className='relative z-10 w-full h-full flex items-center justify-center p-4'>
									<Image
										src={company.darkLogo || company.logo}
										alt={`${company.name} logo`}
										fill
										className='object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300'
									/>
								</div>

								{/* Hover Tooltip */}
								<div className='absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<div className='glass px-3 py-2 text-xs text-foreground'>
										{company.industry}
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Trust Indicators */}
				<div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-8'>
					{[
						{ value: '1000+', label: 'Active Users' },
						{ value: '95%', label: 'Satisfaction Rate' },
						{ value: '24/7', label: 'Support' },
						{ value: '50+', label: 'Countries' },
					].map((stat, idx) => (
						<div key={idx} className='text-center'>
							<div className='text-3xl font-bold text-gradient mb-2'>
								{stat.value}
							</div>
							<div className='text-sm text-muted-foreground'>{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProfessionalLogoScroll;
