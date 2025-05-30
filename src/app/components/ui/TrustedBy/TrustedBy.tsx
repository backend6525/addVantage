'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	Building2,
	TrendingUp,
	Users,
	Globe,
	Shield,
	Award,
	Brain,
	Target,
	Sparkles,
	Zap,
} from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';

const companies = [
	{
		name: 'KCB Bank',
		logo: '/images/logos/KCB.png',
		darkLogo: '/images/logos/KCB.png',
		industry: 'Financial Services',
		description: 'AI-Optimized Ad Performance',
		aiMetric: '45% ROI Increase',
	},
	{
		name: 'MTN',
		logo: '/images/logos/mtn.png',
		darkLogo: '/images/logos/mtn.png',
		industry: 'Telecommunications',
		description: 'Smart Audience Targeting',
		aiMetric: '3.2x Engagement',
	},
	{
		name: 'NBS',
		logo: '/images/logos/NBS.jpg',
		darkLogo: '/images/logos/NBS.jpg',
		industry: 'Media',
		description: 'Intelligent Content Distribution',
		aiMetric: '87% Accuracy',
	},
	{
		name: 'Nile Special',
		logo: '/images/logos/Nilespecial.jpg',
		darkLogo: '/images/logos/Nilespecial.jpg',
		industry: 'Beverage',
		description: 'AI-Driven Campaign Success',
		aiMetric: '2.8x ROI',
	},
	{
		name: 'SafeBoda',
		logo: '/images/logos/safeboda.png',
		darkLogo: '/images/logos/safeboda.png',
		industry: 'Transportation',
		description: 'Predictive Ad Placement',
		aiMetric: '92% Match Rate',
	},
];

const TrustedBy = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
	const [activeMetric, setActiveMetric] = useState(0);

	// AI success metrics for rotation
	const aiMetrics = [
		{
			icon: <Brain className='w-5 h-5 text-blue-400' />,
			metric: '98%',
			label: 'AI Accuracy',
		},
		{
			icon: <Target className='w-5 h-5 text-purple-400' />,
			metric: '3.5x',
			label: 'ROI Improvement',
		},
		{
			icon: <Sparkles className='w-5 h-5 text-yellow-400' />,
			metric: '10K+',
			label: 'Smart Matches',
		},
	];

	// Auto-rotate metrics
	React.useEffect(() => {
		const interval = setInterval(() => {
			setActiveMetric((prev) => (prev + 1) % aiMetrics.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className='relative py-16 overflow-hidden'>
			{/* Enhanced Background Elements */}
			<div className='absolute inset-0 pointer-events-none'>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7 }}
					className='absolute top-[-40%] right-[-10%] w-[55rem] h-[55rem] bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent rounded-full blur-[128px]'
				/>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7, delay: 0.2 }}
					className='absolute bottom-[-40%] left-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-slate-700/20 via-blue-600/10 to-transparent rounded-full blur-[128px]'
				/>
				{/* Additional connecting gradient */}
				<div className='absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/50 to-slate-900/0' />
			</div>

			{/* Section Content */}
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-100 translate-y-0',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='max-w-3xl mx-auto text-center mb-12'>
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='inline-flex items-center gap-2 bg-gradient-to-r from-slate-800/90 to-slate-800/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-slate-700/50 shadow-lg'>
							<Brain className='w-4 h-4 text-blue-400' />
							<span className='text-sm font-medium bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent'>
								AI-Powered Success Stories
							</span>
						</motion.div>
						<h2 className='text-4xl font-bold mb-6'>
							<span className='bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent'>
								Trusted by Leaders in{' '}
							</span>
							<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
								AI Innovation
							</span>
						</h2>
						<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
							See how our AI-powered platform is transforming digital
							advertising for industry leaders across sectors.
						</p>
					</div>
				</LayoutEffect>

				{/* Enhanced Logo Carousel with AI Metrics */}
				<div
					className='relative w-full overflow-hidden py-12'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<div className='absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10' />
					<div className='absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10' />

					<div className='flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16'>
						{companies.map((company, index) => (
							<motion.div
								key={`${company.name}-${index}`}
								whileHover={{ scale: 1.05 }}
								className='relative group'
								onMouseEnter={() => setHoveredCompany(company.name)}
								onMouseLeave={() => setHoveredCompany(null)}>
								<motion.div className='w-32 h-32 relative flex items-center justify-center'>
									<div className='absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-lg group-hover:border-slate-600/50 group-hover:shadow-xl transition-all duration-300' />
									<Image
										src={company.darkLogo || company.logo}
										alt={`${company.name} logo`}
										width={100}
										height={100}
										className='relative z-10 p-4 transition-all duration-300 group-hover:opacity-80'
										style={{ objectFit: 'contain' }}
									/>
								</motion.div>

								{/* Enhanced AI Metrics Tooltip */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{
										opacity: hoveredCompany === company.name ? 1 : 0,
										y: hoveredCompany === company.name ? 0 : 10,
									}}
									className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-3 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl z-20'>
									<p className='text-sm font-semibold text-slate-200 mb-1'>
										{company.name}
									</p>
									<div className='flex items-center gap-2 mb-2'>
										<Brain className='w-3 h-3 text-blue-400' />
										<p className='text-xs text-slate-300'>
											{company.description}
										</p>
									</div>
									<div className='flex items-center gap-2 mt-2'>
										<Target className='w-3 h-3 text-purple-400' />
										<span className='text-xs text-green-400 font-semibold'>
											{company.aiMetric}
										</span>
									</div>
								</motion.div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Enhanced Trust Indicators with AI Focus */}
				<LayoutEffect
					className='duration-1000 delay-500'
					isInviewState={{
						trueState: 'opacity-100 translate-y-0',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
						{[
							{
								value: '98%',
								label: 'AI Accuracy',
								icon: <Brain className='w-5 h-5 text-blue-400' />,
								description: 'Precision targeting',
							},
							{
								value: '3.5x',
								label: 'ROI Boost',
								icon: <TrendingUp className='w-5 h-5 text-green-400' />,
								description: 'AI-driven growth',
							},
							{
								value: '24/7',
								label: 'AI Analysis',
								icon: <Zap className='w-5 h-5 text-purple-400' />,
								description: 'Real-time optimization',
							},
							{
								value: '50+',
								label: 'AI Models',
								icon: <Sparkles className='w-5 h-5 text-yellow-400' />,
								description: 'Advanced algorithms',
							},
						].map((stat, idx) => (
							<motion.div
								key={idx}
								whileHover={{ scale: 1.02 }}
								className='bg-gradient-to-br from-slate-800/80 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all'>
								<div className='flex items-center gap-3 mb-3'>
									<div className='p-2 rounded-lg bg-slate-700/50'>
										{stat.icon}
									</div>
									<div>
										<p className='text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent'>
											{stat.value}
										</p>
										<p className='text-sm text-slate-400'>{stat.label}</p>
									</div>
								</div>
								<p className='text-xs text-slate-300'>{stat.description}</p>
							</motion.div>
						))}
					</div>
				</LayoutEffect>
			</div>
		</section>
	);
};

export default TrustedBy;
