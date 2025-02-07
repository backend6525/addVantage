'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Zap, Building2, X } from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
	const [isAnnual, setIsAnnual] = useState(false);
	const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

	const plans: Plan[] = [
		{
			name: 'Basic',
			desc: 'Perfect for getting started',
			price: { monthly: 0, annual: 0 },
			isMostPop: false,
			icon: Zap,
			gradient: 'from-primary/20 via-secondary/10 to-accent/20',
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
			gradient: 'from-secondary/20 via-accent/10 to-primary/20',
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
			gradient: 'from-accent/20 via-primary/10 to-secondary/20',
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
		<section className='section-transition'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<motion.div
					className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl'
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
				<motion.div
					className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl'
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.5, 0.3, 0.5],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 2,
					}}
				/>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4'>
				<div className='text-center max-w-2xl mx-auto mb-16'>
					{/* Badge */}
					<div className='inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6'>
						<Sparkles className='w-5 h-5 text-primary animate-pulse' />
						<span className='text-sm font-medium text-foreground'>
							Simple Pricing
						</span>
					</div>

					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-gradient'>
						Choose Your Perfect Plan
					</h2>
					<p className='text-lg text-muted-foreground'>
						Start free and scale as you grow. No hidden fees. Cancel anytime.
					</p>

					{/* Billing Toggle */}
					<div className='mt-8 inline-flex items-center gap-4 glass p-1 rounded-full'>
						<button
							className={`px-4 py-2 rounded-full transition-all ${
								!isAnnual ? 'bg-primary text-white' : 'hover:text-primary'
							}`}
							onClick={() => setIsAnnual(false)}>
							Monthly
						</button>
						<button
							className={`px-4 py-2 rounded-full transition-all ${
								isAnnual ? 'bg-primary text-white' : 'hover:text-primary'
							}`}
							onClick={() => setIsAnnual(true)}>
							Annual
							<span className='ml-1 text-xs opacity-75'>(Save 20%)</span>
						</button>
					</div>
				</div>

				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='grid md:grid-cols-3 gap-8'>
						{plans.map((plan, idx) => {
							const Icon = plan.icon;
							const price = isAnnual ? plan.price.annual : plan.price.monthly;
							const isHovered = hoveredPlan === plan.name;

							return (
								<div
									key={idx}
									className={`group hover-card glass relative overflow-hidden ${
										plan.isMostPop ? 'border-primary' : ''
									}`}
									onMouseEnter={() => setHoveredPlan(plan.name)}
									onMouseLeave={() => setHoveredPlan(null)}>
									{/* Gradient Background */}
									<motion.div
										className={`absolute inset-0 bg-gradient-to-br ${plan.gradient}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: isHovered ? 0.1 : 0 }}
										transition={{ duration: 0.3 }}
									/>

									{/* Popular Badge */}
									{plan.isMostPop && (
										<div className='absolute top-0 right-0 bg-primary text-primary-foreground text-sm font-medium py-1.5 px-4 rounded-bl-xl'>
											Most Popular
										</div>
									)}

									<div className='relative p-8'>
										{/* Plan Header */}
										<div className='flex items-center gap-4 mb-6'>
											<motion.div
												className={`p-3 rounded-xl bg-background/50 text-primary`}
												animate={{ scale: isHovered ? 1.1 : 1 }}
												transition={{ duration: 0.3 }}>
												<Icon className='w-6 h-6' />
											</motion.div>
											<div>
												<h3 className='text-xl font-bold text-foreground group-hover:text-primary transition-colors'>
													{plan.name}
												</h3>
												<p className='text-sm text-muted-foreground'>
													{plan.desc}
												</p>
											</div>
										</div>

										{/* Price */}
										<div className='mb-6'>
											<div className='flex items-baseline gap-2'>
												<span className='text-4xl font-bold text-foreground group-hover:text-primary transition-colors'>
													${price}
												</span>
												<span className='text-muted-foreground'>
													/{isAnnual ? 'year' : 'month'}
												</span>
											</div>
										</div>

										{/* Features */}
										<div className='space-y-4 mb-8'>
											{plan.features.included.map((feature, featureIdx) => (
												<div
													key={featureIdx}
													className='flex items-center gap-3 text-muted-foreground'>
													<Check className='w-5 h-5 text-primary flex-shrink-0' />
													<span>{feature}</span>
												</div>
											))}
											{plan.features.notIncluded.map((feature, featureIdx) => (
												<div
													key={featureIdx}
													className='flex items-center gap-3 text-muted-foreground/50'>
													<X className='w-5 h-5 flex-shrink-0' />
													<span>{feature}</span>
												</div>
											))}
										</div>

										{/* CTA Button */}
										<Button
											variant={plan.isMostPop ? 'gradient' : 'outline'}
											className='w-full group'
											size='lg'>
											{plan.cta}
											<motion.span
												className='inline-block ml-2'
												animate={{ x: isHovered ? 5 : 0 }}
												transition={{ duration: 0.3 }}>
												→
											</motion.span>
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				</LayoutEffect>

				{/* Trust Indicators */}
				<div className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8'>
					{[
						{ value: '10K+', label: 'Active Users' },
						{ value: '95%', label: 'Satisfaction Rate' },
						{ value: '24/7', label: 'Support Available' },
						{ value: '$2M+', label: 'Revenue Generated' },
					].map((stat, idx) => (
						<motion.div
							key={idx}
							className='group text-center glass hover-card p-6'
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3 }}>
							<div className='text-3xl font-bold text-gradient mb-2'>
								{stat.value}
							</div>
							<div className='text-sm text-muted-foreground'>{stat.label}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

Pricing.displayName = 'Pricing';
export default Pricing;
