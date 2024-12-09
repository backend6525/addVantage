'use client';

import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Zap } from 'lucide-react';
import GradientWrapper from '@/app/components/GradientWrapper';
import Image from 'next/image';
import NavLink from '../NavLink';
import HeroImg from '@/../../public/images/hero.svg';
import LayoutEffect from '@/app/components/LayoutEffect';
import ParticleBackground from '@/app/components/ui/PaticleBackground';

const Hero = () => {
	const [isHovered, setIsHovered] = useState({
		getStarted: false,
		learnMore: false,
	});

	return (
		<GradientWrapper className='min-h-[90vh] pt-40 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden absolute inset-0 z-0 opacity-70 mix-blend-screen'>
			{/* Particle Background */}
			<ParticleBackground color='#818cf8' count={200} speed={2} maxSize={5} />

			{/* Subtle Animated Background Elements */}
			<div className='absolute top-10 left-0 right-0 bottom-0 pointer-events-none'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<div className='container mx-auto px-4 lg:px-6 grid md:grid-cols-2 gap-8 items-center max-w-[95%] xl:max-w-[90%] relative z-10'>
				{/* Text Content */}
				<div className='space-y-8 max-w-3xl mx-auto md:mx-0 text-gray-100'>
					<LayoutEffect
						className='duration-1000 delay-300'
						isInviewState={{
							trueState: 'opacity-1 translate-y-0',
							falseState: 'opacity-0 translate-y-10',
						}}>
						<div>
							<div className='flex items-center gap-3 text-primary-500'>
								<Zap className='w-8 h-8 animate-pulse text-primary-400' />
								<span className='font-semibold text-xl tracking-wide'>
									AdZpay: Personalized Ad Discovery
								</span>
							</div>
							<h1 className='text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-400'>
								Connect. Discover. <br />
								Recommend.
							</h1>
							<p className='mt-6 text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed'>
								Explore a curated marketplace of ads tailored just for you. Find
								products and services that resonate with your lifestyle and
								passions.
							</p>
						</div>
					</LayoutEffect>

					{/* Call to Action */}
					<div className='flex space-x-4'>
						<NavLink
							href='/get-started'
							className={`
                                flex items-center gap-3 px-10 py-5
                                text-xl font-semibold
                                bg-primary-500 text-white rounded-xl
                                hover:bg-primary-600 
                                focus:outline focus:ring-2 focus:ring-primary-400
                                transition-all duration-300 ease-in-out
                                shadow-xl shadow-primary-500/40
                                ${
																	isHovered.getStarted
																		? 'scale-105 ring-2 ring-primary-300 shadow-2xl'
																		: ''
																}
                            `}
							aria-label='Get Started'
							onMouseEnter={() =>
								setIsHovered((prev) => ({ ...prev, getStarted: true }))
							}
							onMouseLeave={() =>
								setIsHovered((prev) => ({ ...prev, getStarted: false }))
							}>
							Get Started
							<ChevronRight className='w-7 h-7' />
						</NavLink>

						<button
							className={`
                                flex items-center gap-2 px-8 py-4
                                text-lg font-medium
                                border border-gray-500 text-gray-400
                                rounded-xl hover:bg-gray-700 hover:text-gray-200
                                focus:outline focus:ring-2 focus:ring-gray-600
                                transition-all duration-300
                                ${
																	isHovered.learnMore
																		? 'shadow-lg scale-105 border-primary-500'
																		: ''
																}
                            `}
							onMouseEnter={() =>
								setIsHovered((prev) => ({ ...prev, learnMore: true }))
							}
							onMouseLeave={() =>
								setIsHovered((prev) => ({ ...prev, learnMore: false }))
							}>
							<CheckCircle className='w-6 h-6 text-green-500' />
							Learn More
						</button>
					</div>

					{/* Social Proof */}
					<div className='mt-10 flex items-center gap-6 text-md text-gray-400'>
						<div className='flex -space-x-3'>
							{[1, 2, 3].map((_, index) => (
								<Image
									key={index}
									src={`/api/placeholder/48/48?user=${index}`}
									alt={`User ${index + 1}`}
									width={48}
									height={48}
									className='w-12 h-12 rounded-full border-3 border-gray-700 shadow-md hover:scale-110 transition-transform hover:z-10'
								/>
							))}
						</div>
						<span>
							Join <span className='font-bold text-white'>10,000+</span>{' '}
							satisfied users
						</span>
					</div>
				</div>

				{/* Hero Image */}
				<div className='flex justify-center items-center relative'>
					<LayoutEffect
						className='duration-1000 delay-300'
						isInviewState={{
							trueState: 'opacity-1 scale-100',
							falseState: 'opacity-0 scale-95',
						}}>
						<Image
							src={HeroImg}
							alt='AdZpay Hero Illustration'
							width={800}
							height={800}
							className='hover:scale-105 transition-transform duration-500 ease-in-out drop-shadow-2xl'
							priority
							aria-hidden='true'
						/>
					</LayoutEffect>
				</div>
			</div>
		</GradientWrapper>
	);
};

Hero.displayName = 'Hero';
export default Hero;
