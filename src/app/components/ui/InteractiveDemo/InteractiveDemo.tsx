'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ChevronLeft,
	ChevronRight,
	Play,
	Pause,
	Maximize2,
	Minimize2,
} from 'lucide-react';
import Image from 'next/image';

// Mock data for the demo
const demoFeatures = [
	{
		id: 'dashboard',
		title: 'Smart Dashboard',
		description:
			"Get a bird's eye view of your marketing performance with our intuitive dashboard.",
		image: '/images/demo/dashboard.png',
		video: '/videos/dashboard-demo.mp4',
	},
	{
		id: 'analytics',
		title: 'Advanced Analytics',
		description:
			'Dive deep into your data with powerful analytics tools that help you make informed decisions.',
		image: '/images/demo/analytics.png',
		video: '/videos/analytics-demo.mp4',
	},
	{
		id: 'rewards',
		title: 'Reward System',
		description:
			'Earn rewards for sharing ads and engaging with content through our transparent reward system.',
		image: '/images/demo/rewards.png',
		video: '/videos/rewards-demo.mp4',
	},
	{
		id: 'audience',
		title: 'Audience Targeting',
		description:
			'Reach your perfect audience with our advanced targeting algorithms and segmentation tools.',
		image: '/images/demo/audience.png',
		video: '/videos/audience-demo.mp4',
	},
];

const InteractiveDemo = () => {
	const [activeFeature, setActiveFeature] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const nextFeature = () => {
		setIsLoading(true);
		setActiveFeature((prev) => (prev + 1) % demoFeatures.length);
		setTimeout(() => setIsLoading(false), 500);
	};

	const prevFeature = () => {
		setIsLoading(true);
		setActiveFeature(
			(prev) => (prev - 1 + demoFeatures.length) % demoFeatures.length
		);
		setTimeout(() => setIsLoading(false), 500);
	};

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	return (
		<section className='py-20 relative overflow-hidden'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-extrabold mb-4 text-gradient'>
						See AddVantage in Action
					</h2>
					<p className='text-lg text-foreground/80 max-w-2xl mx-auto'>
						Explore our platforms features with this interactive demo
					</p>
				</div>

				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* Feature Navigation */}
					<div className='space-y-6'>
						{demoFeatures.map((feature, index) => (
							<motion.div
								key={feature.id}
								className={`glass p-6 rounded-xl cursor-pointer transition-all duration-300 ${
									activeFeature === index
										? 'border-2 border-primary shadow-lg shadow-primary/10'
										: 'border border-primary/10 hover:border-primary/30'
								}`}
								onClick={() => {
									setIsLoading(true);
									setActiveFeature(index);
									setTimeout(() => setIsLoading(false), 500);
								}}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}>
								<div className='flex items-start gap-4'>
									<div
										className={`w-12 h-12 rounded-lg flex items-center justify-center ${
											activeFeature === index
												? 'bg-primary text-white'
												: 'bg-primary/10 text-primary'
										}`}>
										{index + 1}
									</div>
									<div>
										<h3 className='text-xl font-bold mb-1'>{feature.title}</h3>
										<p className='text-foreground/70'>{feature.description}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Interactive Demo Display */}
					<div className='relative'>
						<div
							className={`glass rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl transition-all duration-500 ${
								isFullscreen ? 'fixed inset-4 z-50' : 'relative'
							}`}>
							<div className='relative aspect-video'>
								<AnimatePresence mode='wait'>
									<motion.div
										key={activeFeature}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5 }}
										className='absolute inset-0'>
										{isLoading ? (
											<div className='absolute inset-0 flex items-center justify-center bg-muted/20'>
												<div className='w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin'></div>
											</div>
										) : (
											<>
												<Image
													src={demoFeatures[activeFeature].image}
													alt={demoFeatures[activeFeature].title}
													fill
													className='object-cover'
												/>
												<div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent'></div>
												<div className='absolute bottom-0 left-0 right-0 p-6'>
													<h3 className='text-2xl font-bold text-white mb-2'>
														{demoFeatures[activeFeature].title}
													</h3>
													<p className='text-white/90'>
														{demoFeatures[activeFeature].description}
													</p>
												</div>
											</>
										)}
									</motion.div>
								</AnimatePresence>

								{/* Controls */}
								<div className='absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm'>
									<div className='flex items-center gap-2'>
										<button
											onClick={prevFeature}
											className='p-2 rounded-full hover:bg-primary/10 transition-colors'
											aria-label='Previous feature'>
											<ChevronLeft className='w-5 h-5 text-primary' />
										</button>
										<button
											onClick={togglePlay}
											className='p-2 rounded-full hover:bg-primary/10 transition-colors'
											aria-label={isPlaying ? 'Pause' : 'Play'}>
											{isPlaying ? (
												<Pause className='w-5 h-5 text-primary' />
											) : (
												<Play className='w-5 h-5 text-primary' />
											)}
										</button>
										<button
											onClick={nextFeature}
											className='p-2 rounded-full hover:bg-primary/10 transition-colors'
											aria-label='Next feature'>
											<ChevronRight className='w-5 h-5 text-primary' />
										</button>
									</div>
									<button
										onClick={toggleFullscreen}
										className='p-2 rounded-full hover:bg-primary/10 transition-colors'
										aria-label={
											isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
										}>
										{isFullscreen ? (
											<Minimize2 className='w-5 h-5 text-primary' />
										) : (
											<Maximize2 className='w-5 h-5 text-primary' />
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Feature Indicators */}
						<div className='flex justify-center mt-6 gap-2'>
							{demoFeatures.map((_, index) => (
								<button
									key={index}
									onClick={() => {
										setIsLoading(true);
										setActiveFeature(index);
										setTimeout(() => setIsLoading(false), 500);
									}}
									className={`w-3 h-3 rounded-full transition-all duration-300 ${
										activeFeature === index
											? 'bg-primary scale-125'
											: 'bg-primary/30 hover:bg-primary/50'
									}`}
									aria-label={`Go to feature ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InteractiveDemo;
