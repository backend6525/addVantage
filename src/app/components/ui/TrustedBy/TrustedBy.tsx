'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, Target, Sparkles, Zap, TrendingUp } from 'lucide-react';

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
	const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

	return (
		<section className='relative py-16 sm:py-24 lg:py-28 w-full overflow-hidden'>
			{/* Full-width background */}
			<div className='absolute inset-0 w-full h-full bg-gradient-to-b from-slate-900/30 to-slate-900/10'>
				{/* Decorative elements */}
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent' />
				<div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900 to-transparent' />
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section header */}
				<div className='text-center mb-16'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className='inline-block mb-6'>
						<span className='inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 text-sm font-medium text-blue-400'>
							<Brain className='w-4 h-4' />
							Trusted by industry leaders
						</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
						className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
						<span className='text-slate-100'>Used by </span>
						<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
							top brands worldwide
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className='text-lg text-slate-300 max-w-2xl mx-auto'>
						Our AI-powered platform helps leading companies maximize their
						advertising ROI
					</motion.p>
				</div>

				{/* Logos grid - now showing all companies */}
				<motion.div
					className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-10'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true, margin: '-100px' }}>
					{companies.map((company, index) => (
						<motion.div
							key={index}
							whileHover={{ y: -5 }}
							className='flex flex-col items-center'
							onMouseEnter={() => setHoveredCompany(company.name)}
							onMouseLeave={() => setHoveredCompany(null)}>
							<div className='relative w-full aspect-square max-w-[180px] bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 transition-all duration-300 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-400/10'>
								<Image
									src={company.darkLogo || company.logo}
									alt={company.name}
									fill
									className='object-contain p-2'
									sizes='(max-width: 768px) 100px, 180px'
								/>
							</div>

							{/* Company info appears on hover */}
							{hoveredCompany === company.name && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className='mt-4 text-center'>
									<h3 className='font-medium text-slate-100'>{company.name}</h3>
									<p className='text-sm text-slate-400'>{company.industry}</p>
									<div className='mt-2 flex items-center justify-center gap-1 text-xs text-blue-400'>
										<Target className='w-3 h-3' />
										<span>{company.aiMetric}</span>
									</div>
								</motion.div>
							)}
						</motion.div>
					))}
				</motion.div>

				{/* Stats section */}
				<motion.div
					className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-6'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					viewport={{ once: true }}>
					{[
						{
							value: '98%',
							label: 'AI Accuracy',
							icon: <Brain className='w-6 h-6 text-blue-400' />,
						},
						{
							value: '3.5x',
							label: 'ROI Boost',
							icon: <TrendingUp className='w-6 h-6 text-green-400' />,
						},
						{
							value: '24/7',
							label: 'Optimization',
							icon: <Zap className='w-6 h-6 text-purple-400' />,
						},
						{
							value: '50+',
							label: 'AI Models',
							icon: <Sparkles className='w-6 h-6 text-yellow-400' />,
						},
					].map((stat, index) => (
						<div
							key={index}
							className='bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-400/30 transition-all'>
							<div className='flex items-center gap-4'>
								<div className='p-2 bg-slate-700/50 rounded-lg'>
									{stat.icon}
								</div>
								<div>
									<p className='text-2xl font-bold text-slate-100'>
										{stat.value}
									</p>
									<p className='text-sm text-slate-400'>{stat.label}</p>
								</div>
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default TrustedBy;
