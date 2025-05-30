'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
	ChevronRight,
	Rocket,
	Star,
	ArrowUp,
	DollarSign,
	Users,
	TrendingUp,
	Play,
	X,
	Sparkles,
	Brain,
	Target,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Brand from '../Brand';
import HeroImg from '@/../../public/images/hero.avif';
import LayoutEffect from '@/app/components/LayoutEffect';
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
} from 'framer-motion';

const Hero = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [showBackToTop, setShowBackToTop] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);
	const heroRef = useRef<HTMLDivElement>(null);

	// Parallax scroll effect
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 500], [0, 100]);
	const opacity = useTransform(scrollY, [0, 300], [1, 0]);

	// AI Features for rotation
	const aiFeatures = [
		{
			icon: <Target className='w-5 h-5 text-blue-400' />,
			title: 'Smart Ad Matching',
			description: 'AI-powered targeting for maximum engagement',
		},
		{
			icon: <Brain className='w-5 h-5 text-purple-400' />,
			title: 'Intelligent Analytics',
			description: 'Real-time performance insights',
		},
		{
			icon: <Sparkles className='w-5 h-5 text-yellow-400' />,
			title: 'Optimized Earnings',
			description: 'AI-enhanced revenue optimization',
		},
	];

	// Auto-rotate features
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % aiFeatures.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	// Check scroll position for back to top button
	useEffect(() => {
		const handleScroll = () => {
			setShowBackToTop(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section
			ref={heroRef}
			id='hero'
			className='relative min-h-screen flex items-center py-16 lg:py-24 overflow-hidden w-full'
			aria-label='Hero section'>
			{/* Enhanced Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<motion.div
					style={{ y, opacity }}
					className={`absolute top-[-40%] right-[-10%] w-[55rem] h-[55rem] bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-transparent rounded-full blur-[128px] transition-all duration-700 ${
						isHovered ? 'scale-105 opacity-70' : 'scale-100 opacity-60'
					}`}
				/>
				<motion.div
					style={{ y: useTransform(scrollY, [0, 500], [0, -100]), opacity }}
					className={`absolute bottom-[-40%] left-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-slate-700/30 via-blue-600/20 to-transparent rounded-full blur-[128px] transition-all duration-700 ${
						isHovered ? 'scale-105 opacity-70' : 'scale-100 opacity-60'
					}`}
				/>
				{/* Neural network pattern overlay */}
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/30 to-slate-900/50' />
			</div>

			<div className='relative z-10 w-full px-4 sm:px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[2000px] mx-auto'>
					{/* Enhanced Text Content */}
					<LayoutEffect
						className='duration-1000 delay-300'
						isInviewState={{
							trueState: 'opacity-1 translate-y-0',
							falseState: 'opacity-0 translate-y-12',
						}}>
						<div className='text-center lg:text-left max-w-2xl mx-auto lg:mx-0'>
							{/* AI Feature Badge */}
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className='inline-flex items-center gap-2 bg-gradient-to-r from-slate-800/90 to-slate-800/70 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-slate-700/50 shadow-lg hover:shadow-xl hover:border-slate-600/50'>
								{aiFeatures[activeFeature].icon}
								<span className='text-sm font-medium bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent'>
									{aiFeatures[activeFeature].description}
								</span>
							</motion.div>

							{/* Enhanced Heading with AI emphasis */}
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
								<span className='bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent'>
									Transform Your Influence with{' '}
								</span>
								<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
									AI-Powered Earnings
								</span>
							</h1>

							{/* Enhanced Value Proposition */}
							<p className='text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0'>
								Join the future of digital marketing. Our AI-driven platform
								helps you share the right ads with the right audience,
								maximizing your earnings through intelligent targeting and
								optimization.
							</p>

							{/* Enhanced Earning Potential Card */}
							<motion.div
								whileHover={{ scale: 1.02 }}
								className='bg-gradient-to-br from-slate-800/80 to-slate-800/60 border border-slate-700/50 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all'>
								<div className='flex items-center gap-3 mb-3'>
									<div className='p-2 bg-green-500/10 rounded-lg'>
										<Brain className='w-5 h-5 text-green-400' />
									</div>
									<h3 className='text-lg font-semibold text-slate-200'>
										AI-Optimized Earnings
									</h3>
								</div>
								<p className='text-slate-300 text-sm leading-relaxed'>
									Our AI predicts optimal ad placements and timing. Top earners
									make{' '}
									<span className='text-green-400 font-semibold'>$500+</span>{' '}
									monthly with smart targeting and automated optimization.
								</p>
							</motion.div>

							{/* Enhanced CTA Buttons */}
							<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10'>
								<Link href='/signup' passHref>
									<Button
										size='lg'
										className='group gap-2 text-lg px-8 py-6 transition-all duration-300 shadow-lg hover:shadow-xl font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-none rounded-xl'>
										Start with AI
										<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
									</Button>
								</Link>

								<Button
									size='lg'
									onClick={() => setShowVideo(true)}
									className='group gap-2 text-lg px-8 py-6 transition-all duration-300 shadow-lg hover:shadow-xl font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/50 hover:border-slate-600/50 rounded-xl'>
									<Play className='w-5 h-5' />
									See AI in Action
								</Button>
							</div>

							{/* Enhanced Trust Indicators */}
							<div className='grid grid-cols-3 gap-4 text-sm'>
								{[
									{
										icon: <Brain className='w-4 h-4 text-blue-400' />,
										label: 'AI Accuracy',
										value: '98%',
									},
									{
										icon: <TrendingUp className='w-4 h-4 text-green-400' />,
										label: 'Avg. Growth',
										value: '3.5x',
									},
									{
										icon: <Users className='w-4 h-4 text-purple-400' />,
										label: 'AI-Matched Ads',
										value: '10K+',
									},
								].map((stat, i) => (
									<motion.div
										key={stat.label}
										whileHover={{ scale: 1.05 }}
										className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center hover:border-slate-600/50 transition-all'>
										<div className='flex items-center justify-center gap-2 mb-1'>
											{stat.icon}
											<span className='font-semibold text-slate-200'>
												{stat.value}
											</span>
										</div>
										<span className='text-xs text-slate-400'>{stat.label}</span>
									</motion.div>
								))}
							</div>
						</div>
					</LayoutEffect>

					{/* Enhanced Image Section with AI visualization */}
					<LayoutEffect
						className='duration-1000 delay-500'
						isInviewState={{
							trueState: 'opacity-100 translate-y-0',
							falseState: 'opacity-0 translate-y-12',
						}}>
						<div className='relative mx-auto max-w-md lg:max-w-none'>
							<motion.div
								whileHover={{ scale: 1.02 }}
								className='relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm'>
								<Image
									src={HeroImg}
									alt='AI-Powered AddVantage Platform'
									className='w-full h-auto'
									priority
								/>
								{/* AI Analysis Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent'>
									<div className='absolute bottom-0 left-0 right-0 p-6'>
										<div className='flex items-center gap-3 mb-2'>
											<Brain className='w-5 h-5 text-blue-400' />
											<span className='text-sm font-medium text-slate-200'>
												AI Analysis Active
											</span>
										</div>
										<div className='h-1 bg-slate-700/50 rounded-full overflow-hidden'>
											<motion.div
												className='h-full bg-gradient-to-r from-blue-400 to-purple-400'
												initial={{ width: '0%' }}
												animate={{ width: '85%' }}
												transition={{
													duration: 2,
													repeat: Infinity,
													repeatType: 'reverse',
												}}
											/>
										</div>
									</div>
								</div>
							</motion.div>
							{/* Enhanced decorative elements */}
							<div className='absolute -top-4 -right-4 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl animate-pulse' />
							<div className='absolute -bottom-4 -left-4 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl animate-pulse delay-500' />
						</div>
					</LayoutEffect>
				</div>
			</div>

			{/* Enhanced Video Modal with AI Demo */}
			<AnimatePresence>
				{showVideo && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
						onClick={() => setShowVideo(false)}>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='relative bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full aspect-video'>
							<button
								onClick={() => setShowVideo(false)}
								className='absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 transition-colors z-10'>
								<X className='w-5 h-5' />
							</button>
							<div className='w-full h-full bg-slate-800 flex items-center justify-center'>
								<div className='text-center'>
									<Brain className='w-12 h-12 text-blue-400 mx-auto mb-4' />
									<p className='text-slate-200 text-lg'>
										AI-Powered Platform Demo
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Hero;
