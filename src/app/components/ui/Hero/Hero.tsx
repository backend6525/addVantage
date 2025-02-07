'use client';

import React, { useState } from 'react';
import { ChevronRight, Rocket, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Brand from '../Brand';
import HeroImg from '@/../../public/images/hero.avif';
import LayoutEffect from '@/app/components/LayoutEffect';

const Hero = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<section className='section-transition min-h-screen pt-40 pb-24'>
			{/* Enhanced Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div
					className={`absolute top-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl transition-all duration-700 ${isHovered ? 'scale-110 opacity-70' : 'scale-100 opacity-50'} animate-pulse`}></div>
				<div
					className={`absolute bottom-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-secondary/5 rounded-full blur-3xl transition-all duration-700 ${isHovered ? 'scale-110 opacity-70' : 'scale-100 opacity-50'} animate-pulse delay-500`}></div>
			</div>

			<div className='relative z-10 max-w-[90rem] mx-auto px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-16 items-center'>
					{/* Enhanced Text Content */}
					<LayoutEffect
						className='duration-1000 delay-300'
						isInviewState={{
							trueState: 'opacity-1 translate-y-0',
							falseState: 'opacity-0 translate-y-12',
						}}>
						<div className='text-center lg:text-left max-w-3xl mx-auto lg:mx-0'>
							{/* Enhanced Badge */}
							<div className='inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-10 hover:scale-105 transition-transform cursor-pointer'>
								<Rocket className='w-6 h-6 text-primary animate-pulse' />
								<span className='text-base font-medium text-foreground'>
									Revolutionizing Digital Marketing
								</span>
							</div>

							{/* Enhanced Heading with Gradient Animation */}
							<h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8'>
								Connect. Share.{' '}
								<span className='text-gradient bg-[size:400%] animate-gradient'>
									Earn.
								</span>
							</h1>

							{/* Enhanced Description */}
							<p className='text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0'>
								Join the future of digital marketing. Share ads you love, earn
								rewards, and help brands reach their perfect audience through
								authentic connections.
							</p>

							{/* Enhanced CTA Buttons */}
							<div className='flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16'>
								<Button
									size='lg'
									className='group gap-2 text-lg px-8 py-6 hover:scale-105 transition-all duration-300'
									variant='gradient'
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}>
									Get Started
									<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
								</Button>

								<Button
									size='lg'
									variant='outline'
									className='group gap-2 text-lg px-8 py-6 hover:scale-105 transition-all duration-300'>
									<Star className='w-5 h-5 text-primary group-hover:rotate-45 transition-transform' />
									Learn More
								</Button>
							</div>

							{/* Enhanced Trust Indicators */}
							<div className='flex items-center gap-8 justify-center lg:justify-start'>
								<div className='flex -space-x-4 hover:space-x-1 transition-all duration-300'>
									{[1, 2, 3, 4].map((_, idx) => (
										<div
											key={idx}
											className='w-12 h-12 rounded-full glass border-2 border-background hover:scale-110 transition-all duration-300 cursor-pointer'
										/>
									))}
								</div>
								<div className='text-base text-muted-foreground hover:text-foreground transition-colors'>
									Trusted by{' '}
									<span className='font-bold text-foreground animate-pulse'>
										10,000+
									</span>{' '}
									marketers
								</div>
							</div>
						</div>
					</LayoutEffect>

					{/* Enhanced Hero Image */}
					<LayoutEffect
						className='duration-1000 delay-500'
						isInviewState={{
							trueState: 'opacity-1 scale-100',
							falseState: 'opacity-0 scale-95',
						}}>
						<div
							className='relative mx-auto max-w-2xl lg:max-w-none'
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}>
							{/* Enhanced Gradient Glow */}
							<div
								className={`absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl transition-all duration-700 ${isHovered ? 'scale-110 opacity-70' : 'scale-100 opacity-50'}`}></div>

							{/* Enhanced Image Container */}
							<div className='relative glass rounded-3xl p-6 hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl'>
								<Image
									src={HeroImg}
									alt='AdZPay Platform Preview'
									className='w-full h-auto rounded-2xl'
									priority
								/>

								{/* Enhanced Decorative Elements */}
								<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent'></div>
								<div className='absolute top-1 left-0 w-full h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 blur-sm'></div>
							</div>
						</div>
					</LayoutEffect>
				</div>
			</div>
		</section>
	);
};

Hero.displayName = 'Hero';
export default Hero;
