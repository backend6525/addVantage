'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
	ChevronRight,
	Play,
	X,
	Sparkles,
	Brain,
	Target,
	TrendingUp,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Design tokens for consistency
const DESIGN_TOKENS = {
	animation: {
		duration: 0.7,
		ease: [0.22, 1, 0.36, 1],
	},
	colors: {
		primary: '#3E63DD',
		text: {
			primary: '#f1f5f9', // slate-100
			secondary: '#e2e8f0', // slate-200
			tertiary: '#cbd5e1', // slate-300
		},
	},
};

// Consistent badge component
const ConsistentBadge = ({
	text,
	icon,
}: {
	text: string;
	icon: React.ReactNode;
}) => (
	<motion.div
		whileHover={{ scale: 1.02 }}
		whileTap={{ scale: 0.98 }}
		className='inline-flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-slate-700/50 shadow-lg hover:shadow-xl hover:border-slate-600/50 transition-all duration-300'>
		{icon}
		<span className='text-sm font-medium text-blue-400'>{text}</span>
	</motion.div>
);

const Hero = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);

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

	return (
		<section
			id='hero'
			className='relative flex items-center w-full py-16 lg:py-24'
			aria-label='Hero section'>
			<div className='relative z-10 w-full px-4 sm:px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto'>
					{/* Enhanced Text Content */}
					<div className='text-center lg:text-left max-w-2xl mx-auto lg:mx-0'>
						{/* AI Feature Badge - now using ConsistentBadge */}
						<ConsistentBadge
							text={aiFeatures[activeFeature].description}
							icon={aiFeatures[activeFeature].icon}
						/>

						{/* Enhanced Heading with AI emphasis */}
						<motion.h1
							className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
							<span className='text-slate-100'>
								Transform Your Influence with{' '}
							</span>
							<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
								AI-Powered Earnings
							</span>
						</motion.h1>

						{/* Enhanced Value Proposition */}
						<motion.p
							className='text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.1,
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
							Join the future of digital marketing. Our AI-driven platform helps
							you share the right ads with the right audience, maximizing your
							earnings through intelligent targeting and optimization.
						</motion.p>

						{/* Enhanced Earning Potential Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.2,
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}
							whileHover={{ scale: 1.02 }}
							className='bg-slate-800/80 border border-slate-700/50 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300'>
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
								make <span className='text-green-400 font-semibold'>$500+</span>{' '}
								monthly with smart targeting and automated optimization.
							</p>
						</motion.div>

						{/* Enhanced CTA Buttons */}
						<motion.div
							className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.3,
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
							<Link href='/signup' passHref>
								<Button
									size='lg'
									className='group gap-2 text-lg px-8 py-6 transition-all duration-300 shadow-lg hover:shadow-xl font-medium bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl'>
									Start with AI
									<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
								</Button>
							</Link>

							<Button
								size='lg'
								onClick={() => setShowVideo(true)}
								className='group gap-2 text-lg px-8 py-6 transition-all duration-300 shadow-lg hover:shadow-xl font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/50 hover:border-slate-600/50 rounded-xl'>
								<Play className='w-5 h-5' />
								See AI in Action
							</Button>
						</motion.div>

						{/* Enhanced Trust Indicators */}
						<motion.div
							className='grid grid-cols-3 gap-4 text-sm'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.4,
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
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
									className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center hover:border-slate-600/50 transition-all duration-300'>
									<div className='flex items-center justify-center gap-2 mb-1'>
										{stat.icon}
										<span className='font-semibold text-slate-200'>
											{stat.value}
										</span>
									</div>
									<span className='text-xs text-slate-400'>{stat.label}</span>
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Enhanced Image Section with AI visualization */}
					<motion.div
						className='relative mx-auto max-w-md lg:max-w-none'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: DESIGN_TOKENS.animation.duration,
							ease: DESIGN_TOKENS.animation.ease,
						}}>
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300'>
							<Image
								src='/images/hero.avif'
								alt='AI-Powered AddVantage Platform'
								width={800}
								height={600}
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
					</motion.div>
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
							transition={{
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}
							className='relative bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full aspect-video border border-slate-700/50'>
							<button
								onClick={() => setShowVideo(false)}
								className='absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 transition-colors duration-300 z-10'>
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
