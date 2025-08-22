'use client';

import React, { useState } from 'react';
import {
	Check,
	Sparkles,
	Zap,
	Building2,
	X,
	ChevronRight,
	Users,
	TrendingUp,
	Globe,
	DollarSign,
} from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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

// Consistent badge component (same as in other sections)
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
		className='inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 text-sm font-medium text-blue-400 mb-6'>
		{icon}
		{text}
	</motion.div>
);

interface Plan {
	name: string;
	desc: string;
	price: { monthly: number; annual: number };
	isMostPop: boolean;
	features: {
		included: string[];
		notIncluded: string[];
	};
	icon: React.ElementType;
	gradient: string;
	cta: string;
}

const Pricing = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
	const [isAnnual, setIsAnnual] = useState(false);

	const plans: Plan[] = [
		{
			name: 'Basic',
			desc: 'Perfect for getting started',
			price: { monthly: 0, annual: 0 },
			isMostPop: false,
			icon: Zap,
			gradient: 'from-blue-400/20 via-purple-400/10 to-blue-400/20',
			features: {
				included: [
					'Access targeted ads',
					'Share up to 5 ads per month',
					'Basic analytics dashboard',
					'Email support',
					'Community access',
					'Mobile app access',
				],
				notIncluded: [
					'Advanced analytics',
					'Custom branding',
					'API access',
					'Priority support',
				],
			},
			cta: 'Start Free',
		},
		{
			name: 'Pro',
			desc: 'Best for growing businesses',
			price: { monthly: 29, annual: 290 },
			isMostPop: true,
			icon: Sparkles,
			gradient: 'from-purple-400/20 via-blue-400/10 to-purple-400/20',
			features: {
				included: [
					'Everything in Basic, plus:',
					'Unlimited ad sharing',
					'Advanced analytics',
					'Priority support',
					'Custom branding',
					'API access',
				],
				notIncluded: [
					'Dedicated account manager',
					'Custom integrations',
					'SLA guarantee',
				],
			},
			cta: 'Upgrade Now',
		},
		{
			name: 'Enterprise',
			desc: 'For large organizations',
			price: { monthly: 99, annual: 990 },
			isMostPop: false,
			icon: Building2,
			gradient: 'from-blue-400/20 via-purple-400/10 to-blue-400/20',
			features: {
				included: [
					'Everything in Pro, plus:',
					'Dedicated account manager',
					'Custom integrations',
					'Advanced security features',
					'SLA guarantee',
					'24/7 phone support',
				],
				notIncluded: [],
			},
			cta: 'Contact Sales',
		},
	];

	return (
		<section className='relative py-16 lg:py-20 overflow-hidden'>
			{/* Enhanced Background Elements */}
			<div className='absolute inset-0 pointer-events-none'>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7 }}
					className='absolute top-[-20%] right-[-10%] w-[45rem] h-[45rem] bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-full blur-3xl'
				/>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7, delay: 0.2 }}
					className='absolute bottom-[-20%] left-[-10%] w-[45rem] h-[45rem] bg-gradient-to-tr from-slate-700/20 to-blue-600/10 rounded-full blur-3xl'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50' />
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-100 translate-y-0',
						falseState: 'opacity-0 translate-y-12',
					}}>
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
							text='Simple, Transparent Pricing'
							icon={<Sparkles className='w-4 h-4 text-blue-400' />}
						/>
						<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
							<span className='text-slate-100'>Choose Your Perfect </span>
							<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
								Plan
							</span>
						</h2>
						<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
							Start free and scale as you grow. No hidden fees. Cancel anytime.
						</p>

						{/* Enhanced Billing Toggle */}
						<motion.div
							className='mt-8 inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm p-1 rounded-full border border-slate-700/50'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								duration: DESIGN_TOKENS.animation.duration,
								delay: 0.1,
								ease: DESIGN_TOKENS.animation.ease,
							}}
							viewport={{ once: true }}>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={`px-6 py-2 rounded-full transition-all duration-300 ${
									!isAnnual
										? 'bg-blue-600 text-white shadow-lg'
										: 'text-slate-300 hover:text-slate-100'
								}`}
								onClick={() => setIsAnnual(false)}>
								Monthly
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={`px-6 py-2 rounded-full transition-all duration-300 ${
									isAnnual
										? 'bg-blue-600 text-white shadow-lg'
										: 'text-slate-300 hover:text-slate-100'
								}`}
								onClick={() => setIsAnnual(true)}>
								Annual
								<span className='ml-1 text-xs opacity-75'>(Save 20%)</span>
							</motion.button>
						</motion.div>
					</motion.div>

					<div
						className='grid md:grid-cols-3 gap-8'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}>
						{plans.map((plan, idx) => {
							const Icon = plan.icon;
							const price = isAnnual ? plan.price.annual : plan.price.monthly;
							const isHovered = hoveredPlan === plan.name;

							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: DESIGN_TOKENS.animation.duration,
										delay: idx * 0.1,
										ease: DESIGN_TOKENS.animation.ease,
									}}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02 }}
									className={`relative overflow-hidden bg-slate-800/30 backdrop-blur-md rounded-xl border ${
										plan.isMostPop
											? 'border-blue-400/50 shadow-lg shadow-blue-400/10'
											: 'border-slate-700/50'
									} transition-all duration-300`}
									onMouseEnter={() => setHoveredPlan(plan.name)}
									onMouseLeave={() => setHoveredPlan(null)}>
									{/* Gradient Background */}
									<motion.div
										className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 transition-opacity duration-300`}
										animate={{ opacity: isHovered ? 0.1 : 0 }}
									/>

									{/* Popular Badge */}
									{plan.isMostPop && (
										<div className='absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium py-1.5 px-4 rounded-bl-xl'>
											Most Popular
										</div>
									)}

									<div className='relative p-8'>
										{/* Plan Header */}
										<div className='flex items-center gap-4 mb-6'>
											<motion.div
												className='p-3 rounded-xl bg-slate-700/50 text-blue-400'
												animate={{ scale: isHovered ? 1.1 : 1 }}
												transition={{ duration: 0.3 }}>
												<Icon className='w-6 h-6' />
											</motion.div>
											<div>
												<h3 className='text-xl font-bold text-slate-100'>
													{plan.name}
												</h3>
												<p className='text-sm text-slate-400'>{plan.desc}</p>
											</div>
										</div>

										{/* Price */}
										<div className='mb-6'>
											<div className='flex items-baseline gap-2'>
												<span className='text-4xl font-bold text-slate-100'>
													${price}
												</span>
												<span className='text-slate-400'>
													/{isAnnual ? 'year' : 'month'}
												</span>
											</div>
										</div>

										{/* Features */}
										<div className='space-y-4 mb-8'>
											{plan.features.included.map((feature, featureIdx) => (
												<div
													key={featureIdx}
													className='flex items-center gap-3'>
													<Check className='w-5 h-5 text-green-400 flex-shrink-0' />
													<span className='text-slate-300 text-sm'>
														{feature}
													</span>
												</div>
											))}
											{plan.features.notIncluded.map((feature, featureIdx) => (
												<div
													key={featureIdx}
													className='flex items-center gap-3 opacity-50'>
													<X className='w-5 h-5 text-slate-400 flex-shrink-0' />
													<span className='text-slate-400 text-sm'>
														{feature}
													</span>
												</div>
											))}
										</div>

										{/* CTA Button */}
										<Button
											className={`w-full group gap-2 text-base py-6 transition-all duration-300 rounded-xl ${
												plan.isMostPop
													? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
													: 'bg-slate-700/50 hover:bg-slate-700/70 text-slate-200 border border-slate-600/50 hover:border-slate-500/50'
											}`}>
											{plan.cta}
											<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
										</Button>
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* Enhanced Trust Indicators */}
					<motion.div
						className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: DESIGN_TOKENS.animation.duration,
							delay: 0.3,
							ease: DESIGN_TOKENS.animation.ease,
						}}
						viewport={{ once: true }}>
						{[
							{
								value: '10K+',
								label: 'Active Users',
								icon: <Users className='w-5 h-5 text-blue-400' />,
								description: 'Growing community',
							},
							{
								value: '95%',
								label: 'Satisfaction Rate',
								icon: <TrendingUp className='w-5 h-5 text-green-400' />,
								description: 'Happy clients',
							},
							{
								value: '24/7',
								label: 'Support',
								icon: <Globe className='w-5 h-5 text-purple-400' />,
								description: 'Always available',
							},
							{
								value: '$2M+',
								label: 'Revenue Generated',
								icon: <DollarSign className='w-5 h-5 text-yellow-400' />,
								description: 'User earnings',
							},
						].map((stat, idx) => (
							<motion.div
								key={idx}
								whileHover={{ scale: 1.02 }}
								className='bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300'>
								<div className='flex items-center gap-3 mb-3'>
									<div className='p-2 rounded-lg bg-slate-700/50'>
										{stat.icon}
									</div>
									<div>
										<p className='text-2xl font-bold text-slate-100'>
											{stat.value}
										</p>
										<p className='text-sm text-slate-400'>{stat.label}</p>
									</div>
								</div>
								<p className='text-xs text-slate-300'>{stat.description}</p>
							</motion.div>
						))}
					</motion.div>
				</LayoutEffect>
			</div>
		</section>
	);
};

Pricing.displayName = 'Pricing';
export default Pricing;
