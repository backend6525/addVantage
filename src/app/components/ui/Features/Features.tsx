'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	DollarSign,
	TrendingUp,
	Users,
	Shield,
	Zap,
	BarChart,
	ChevronRight,
} from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';
import { Button } from '@/components/ui/button';

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

// Consistent badge component (same as in Hero, TrustedBy, and VisualFeatures)
const ConsistentBadge = ({
	text,
	icon,
}: {
	text: string;
	icon: React.ReactNode;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{
			duration: DESIGN_TOKENS.animation.duration,
			ease: DESIGN_TOKENS.animation.ease,
		}}
		viewport={{ once: true }}
		className='inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 text-sm font-medium text-blue-400 mb-8'>
		{icon}
		{text}
	</motion.div>
);

const features = [
	{
		icon: <DollarSign className='w-6 h-6 text-green-400' />,
		title: 'Maximum Earnings',
		description:
			'Earn up to 70% commission on ad shares. Our transparent pricing ensures you get the best returns for your influence.',
		stats: 'Top earners make $500+ monthly',
		gradient: 'from-green-400/20 via-green-300/10 to-green-500/20',
	},
	{
		icon: <TrendingUp className='w-6 h-6 text-blue-400' />,
		title: 'Smart Ad Matching',
		description:
			'Our AI-powered system matches you with ads that resonate with your audience, increasing engagement and earnings.',
		stats: '95% higher engagement rate',
		gradient: 'from-blue-400/20 via-blue-300/10 to-blue-500/20',
	},
	{
		icon: <Users className='w-6 h-6 text-purple-400' />,
		title: 'Audience Growth',
		description:
			'Grow your network and increase your earning potential with our built-in audience development tools.',
		stats: '2x faster audience growth',
		gradient: 'from-purple-400/20 via-purple-300/10 to-purple-500/20',
	},
	{
		icon: <Shield className='w-6 h-6 text-yellow-400' />,
		title: 'Secure Payments',
		description:
			'Get paid securely and on time. Our platform handles all payment processing with industry-standard security.',
		stats: '100% secure transactions',
		gradient: 'from-yellow-400/20 via-yellow-300/10 to-yellow-500/20',
	},
	{
		icon: <Zap className='w-6 h-6 text-red-400' />,
		title: 'Instant Sharing',
		description:
			'Share ads instantly across multiple platforms with our one-click sharing technology.',
		stats: '3x faster sharing',
		gradient: 'from-red-400/20 via-red-300/10 to-red-500/20',
	},
	{
		icon: <BarChart className='w-6 h-6 text-indigo-400' />,
		title: 'Performance Analytics',
		description:
			'Track your earnings and performance with detailed analytics and insights.',
		stats: 'Real-time earnings tracking',
		gradient: 'from-indigo-400/20 via-indigo-300/10 to-indigo-500/20',
	},
];

const Features = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

	return (
		<section className='py-16 lg:py-20 bg-slate-900 relative overflow-hidden'>
			{/* Premium Background Elements */}
			<div className='absolute inset-0 overflow-hidden'>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7 }}
					className='absolute top-[-20%] right-[-10%] w-[35rem] h-[35rem] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl'></motion.div>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7, delay: 0.2 }}
					className='absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl'></motion.div>
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					className='max-w-3xl mx-auto text-center mb-16'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: DESIGN_TOKENS.animation.duration,
						ease: DESIGN_TOKENS.animation.ease,
					}}
					viewport={{ once: true }}>
					<ConsistentBadge
						text='Powerful Features'
						icon={<Zap className='w-4 h-4 text-blue-400 animate-pulse' />}
					/>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-100'>
						Earn More with{' '}
						<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
							AdZPay{' '}
						</span>
					</h2>
					<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
						Our platform is designed to maximize your earning potential while
						providing the best experience for your audience.
					</p>
				</motion.div>

				<div
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					{features.map((feature, index) => (
						<LayoutEffect
							key={index}
							className='duration-1000 delay-300'
							isInviewState={{
								trueState: 'opacity-100 translate-y-0',
								falseState: 'opacity-0 translate-y-12',
							}}>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: DESIGN_TOKENS.animation.duration,
									delay: index * 0.1,
									ease: DESIGN_TOKENS.animation.ease,
								}}
								viewport={{ once: true }}
								whileHover={{ scale: 1.02 }}
								className='relative overflow-hidden bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 group hover:border-blue-400/30 transition-all duration-300'
								onMouseEnter={() => setHoveredFeature(feature.title)}
								onMouseLeave={() => setHoveredFeature(null)}>
								{/* Gradient Background */}
								<motion.div
									className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300`}
									animate={{
										opacity: hoveredFeature === feature.title ? 0.1 : 0,
									}}
								/>

								<div className='relative z-10'>
									<div className='flex items-center gap-4 mb-4'>
										<motion.div
											className='p-3 rounded-xl bg-slate-700/50'
											animate={{
												scale: hoveredFeature === feature.title ? 1.1 : 1,
											}}
											transition={{ duration: 0.3 }}>
											{feature.icon}
										</motion.div>
										<h3 className='text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-300'>
											{feature.title}
										</h3>
									</div>
									<p className='text-slate-300 mb-4'>{feature.description}</p>
									<div className='flex items-center gap-2 text-sm text-slate-400'>
										<TrendingUp className='w-4 h-4 text-green-400' />
										<span>{feature.stats}</span>
									</div>
								</div>
							</motion.div>
						</LayoutEffect>
					))}
				</div>

				{/* Enhanced Earning Calculator */}
				<motion.div
					className='mt-16 text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: DESIGN_TOKENS.animation.duration,
						delay: 0.3,
						ease: DESIGN_TOKENS.animation.ease,
					}}
					viewport={{ once: true }}>
					<div className='text-center mb-8'>
						<h3 className='text-3xl font-bold mb-4 text-slate-100'>
							Calculate Your{' '}
							<span className='bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent'>
								Potential Earnings
							</span>
						</h3>
						<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
							See how much you could earn with AdZPay competitive commission
							structure
						</p>
					</div>

					<motion.div
						whileHover={{ scale: 1.02 }}
						className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
						<div className='text-center'>
							<div className='p-4 bg-slate-700/50 rounded-xl inline-block mb-4'>
								<DollarSign className='w-8 h-8 text-green-400' />
							</div>
							<p className='text-slate-400 mb-2'>Average Commission</p>
							<p className='text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent'>
								70%
							</p>
						</div>
						<div className='text-center'>
							<div className='p-4 bg-slate-700/50 rounded-xl inline-block mb-4'>
								<TrendingUp className='w-8 h-8 text-blue-400' />
							</div>
							<p className='text-slate-400 mb-2'>Average Ad Value</p>
							<p className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent'>
								$50
							</p>
						</div>
						<div className='text-center'>
							<div className='p-4 bg-slate-700/50 rounded-xl inline-block mb-4'>
								<BarChart className='w-8 h-8 text-purple-400' />
							</div>
							<p className='text-slate-400 mb-2'>Monthly Potential</p>
							<p className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent'>
								$500+
							</p>
						</div>
					</motion.div>

					<div className='mt-8 text-center'>
						<Button className='group gap-2 text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl'>
							Start Earning Now
							<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Features;
