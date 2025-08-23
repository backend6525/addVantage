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
	Zap,
	DollarSign,
	ArrowRight,
	Star,
	Shield,
	CheckCircle,
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

// Enhanced floating particles component
const FloatingParticles = () => {
	const [particles, setParticles] = useState([]);

	useEffect(() => {
		const newParticles = Array.from({ length: 15 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 2,
			duration: 3 + Math.random() * 2,
		}));
		setParticles(newParticles);
	}, []);

	return (
		<div className='absolute inset-0 overflow-hidden pointer-events-none'>
			{particles.map((particle) => (
				<div
					key={particle.id}
					className='absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse'
					style={{
						left: `${particle.x}%`,
						top: `${particle.y}%`,
						animationDelay: `${particle.delay}s`,
						animationDuration: `${particle.duration}s`,
					}}
				/>
			))}
		</div>
	);
};

// Enhanced gradient orb component
const GradientOrb = ({ className, delay = 0 }) => (
	<div
		className={`absolute rounded-full opacity-20 animate-pulse ${className}`}
		style={{ animationDelay: `${delay}s`, animationDuration: '4s' }}
	/>
);

// Enhanced badge component
const EnhancedBadge = ({ text, icon, isActive = false }) => (
	<motion.div
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.98 }}
		className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-8 border backdrop-blur-sm transition-all duration-500 ${
			isActive
				? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/50 shadow-lg shadow-blue-500/25'
				: 'bg-slate-800/60 border-slate-700/50 hover:border-slate-600/70'
		}`}>
		<div
			className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-500/20' : 'bg-slate-700/50'}`}>
			{icon}
		</div>
		<span
			className={`text-sm font-semibold ${isActive ? 'text-blue-300' : 'text-slate-300'}`}>
			{text}
		</span>
	</motion.div>
);

// Enhanced animated stats component
const AnimatedStat = ({ icon, value, label, delay = 0 }) => {
	const [count, setCount] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (hasAnimated) return;

		const timer = setTimeout(() => {
			const targetValue = parseFloat(value.replace(/[^\d.]/g, ''));
			let current = 0;
			const increment = targetValue / 50;

			const counter = setInterval(() => {
				current += increment;
				if (current >= targetValue) {
					current = targetValue;
					clearInterval(counter);
				}
				setCount(current);
			}, 30);

			setHasAnimated(true);
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [value, delay, hasAnimated]);

	const displayValue = value.includes('%')
		? `${Math.round(count)}%`
		: value.includes('x')
			? `${count.toFixed(1)}x`
			: value.includes('K')
				? `${Math.round(count / 1000)}K+`
				: `$${Math.round(count)}+`;

	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			className='group bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center hover:border-slate-600/50 transition-all duration-300'>
			<div className='flex items-center justify-center gap-2 mb-1'>
				<div className='p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300'>
					{icon}
				</div>
				<span className='font-semibold text-slate-200 group-hover:text-white transition-colors duration-300'>
					{displayValue}
				</span>
			</div>
			<span className='text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300'>
				{label}
			</span>
		</motion.div>
	);
};

// Enhanced earnings showcase
const EarningsShowcase = () => (
	<motion.div
		whileHover={{ scale: 1.02 }}
		className='bg-slate-800/80 border border-slate-700/50 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300'>
		<div className='flex items-center gap-3 mb-3'>
			<div className='p-2 bg-green-500/10 rounded-lg'>
				<DollarSign className='w-5 h-5 text-green-400' />
			</div>
			<h3 className='text-lg font-semibold text-slate-200'>
				AI-Optimized Earnings
			</h3>
		</div>

		<div className='space-y-3'>
			<div className='flex justify-between items-center'>
				<span className='text-sm text-slate-300'>This Month</span>
				<span className='text-lg font-bold text-green-400'>$847</span>
			</div>
			<div className='w-full bg-slate-700/50 rounded-full h-2 overflow-hidden'>
				<div
					className='h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full'
					style={{ width: '78%' }}
				/>
			</div>
			<p className='text-slate-300 text-sm leading-relaxed'>
				Our AI predicts optimal ad placements and timing. Top earners make{' '}
				<span className='text-green-400 font-semibold'>$500-2000+</span> monthly
				with our AI targeting system.
			</p>
		</div>

		{/* Success indicators */}
		<div className='flex gap-2 mt-4 flex-wrap'>
			{['Smart Matching', 'Auto-Optimization', 'Real-time Analytics'].map(
				(feature) => (
					<div
						key={feature}
						className='flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-lg'>
						<CheckCircle className='w-3 h-3 text-green-400' />
						<span className='text-xs text-slate-300'>{feature}</span>
					</div>
				)
			)}
		</div>
	</motion.div>
);

const Hero = () => {
	const [showVideo, setShowVideo] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);

	// AI Features for rotation
	const aiFeatures = [
		{
			icon: <Target className='w-5 h-5 text-blue-400' />,
			title: 'Smart Ad Targeting',
			description: 'AI matches ads to your audience perfectly',
		},
		{
			icon: <Brain className='w-5 h-5 text-purple-400' />,
			title: 'Intelligent Analytics',
			description: 'Real-time insights & optimization',
		},
		{
			icon: <Zap className='w-5 h-5 text-yellow-400' />,
			title: 'Auto-Optimization',
			description: 'AI continuously improves performance',
		},
		{
			icon: <Shield className='w-5 h-5 text-green-400' />,
			title: 'Brand Safety',
			description: 'AI ensures quality ad placements',
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % aiFeatures.length);
		}, 3500);
		return () => clearInterval(interval);
	}, []);

	return (
		<section
			id='hero'
			className='relative flex items-center w-full py-16 lg:py-24'
			aria-label='Hero section'>
			{/* Enhanced background with multiple layers */}
			<div className='absolute inset-0'>
				{/* Subtle gradient background */}
				{/* <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900' /> */}

				{/* More subtle animated gradient orbs */}
				<GradientOrb
					className='w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 -top-48 -left-48'
					delay={0}
				/>
				<GradientOrb
					className='w-80 h-80 bg-gradient-to-br from-purple-600/10 to-pink-600/10 -bottom-40 -right-40'
					delay={2}
				/>
				<GradientOrb
					className='w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
					delay={1}
				/>

				{/* Floating particles */}
				<FloatingParticles />
			</div>

			<div className='relative z-10 w-full px-4 sm:px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto'>
					{/* Enhanced Text Content */}
					<div className='text-center lg:text-left max-w-2xl mx-auto lg:mx-0'>
						{/* Enhanced AI Feature Badge */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
							<EnhancedBadge
								text={aiFeatures[activeFeature].description}
								icon={aiFeatures[activeFeature].icon}
								isActive={true}
							/>
						</motion.div>

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
							Revolutionary AI technology that analyzes your audience and
							automatically matches you with the{' '}
							<span className='text-blue-400 font-semibold'>
								highest-paying ads
							</span>{' '}
							for maximum earnings.
						</motion.p>

						{/* Enhanced Earning Potential Card - Replaced with EarningsShowcase */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.2,
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
							<EarningsShowcase />
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
									className='group gap-2 text-lg px-8 py-6 transition-all duration-300 shadow-lg hover:shadow-xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none rounded-xl relative overflow-hidden'>
									<div className='absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700' />
									<span className='relative flex items-center gap-3'>
										Start with AI
										<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
									</span>
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

						{/* Social proof - New Addition */}
						<motion.div
							className='flex items-center justify-center lg:justify-start gap-2 mt-8'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.5,
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
							<div className='flex'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className='w-5 h-5 text-yellow-400 fill-current'
									/>
								))}
							</div>
							<span className='text-slate-300 text-sm ml-2'>
								4.9/5 from{' '}
								<span className='font-semibold text-white'>2,847</span> creators
							</span>
						</motion.div>
					</div>

					{/* Enhanced Image Section with AI visualization */}
					<div className='relative'>
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
								className='relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300 group mb-8'>
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

								{/* Floating elements around the image - New Addition */}
								<div className='absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 flex items-center justify-center rotate-12 group-hover:rotate-6 transition-transform duration-500'>
									<Zap className='w-6 h-6 text-blue-400' />
								</div>
								<div className='absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-green-500/30 flex items-center justify-center -rotate-12 group-hover:-rotate-6 transition-transform duration-500'>
									<DollarSign className='w-5 h-5 text-green-400' />
								</div>
							</motion.div>
						</motion.div>

						{/* Stats moved under the hero image */}
						<motion.div
							className='grid grid-cols-3 gap-4 text-sm mt-8'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.6,
								duration: DESIGN_TOKENS.animation.duration,
								ease: DESIGN_TOKENS.animation.ease,
							}}>
							<AnimatedStat
								icon={<Brain className='w-4 h-4 text-blue-400' />}
								value='98%'
								label='AI Accuracy'
								delay={0.5}
							/>
							<AnimatedStat
								icon={<TrendingUp className='w-4 h-4 text-green-400' />}
								value='3.5x'
								label='Avg Growth'
								delay={0.7}
							/>
							<AnimatedStat
								icon={<Users className='w-4 h-4 text-purple-400' />}
								value='10K'
								label='AI-Matched Ads'
								delay={0.9}
							/>
						</motion.div>
					</div>
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
