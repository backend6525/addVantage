// 'use client';

// import React, { useState } from 'react';
// import {
// 	Check,
// 	Sparkles,
// 	Zap,
// 	Building2,
// 	X,
// 	ChevronRight,
// 	Users,
// 	TrendingUp,
// 	Globe,
// 	DollarSign,
// } from 'lucide-react';
// import LayoutEffect from '@/app/components/LayoutEffect';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';

// // Design tokens for consistency
// const DESIGN_TOKENS = {
// 	animation: {
// 		duration: 0.7,
// 		ease: [0.22, 1, 0.36, 1],
// 	},
// 	colors: {
// 		primary: '#3E63DD',
// 		text: {
// 			primary: '#f1f5f9', // slate-100
// 			secondary: '#e2e8f0', // slate-200
// 			tertiary: '#cbd5e1', // slate-300
// 		},
// 	},
// };

// // Consistent badge component (same as in other sections)
// const ConsistentBadge = ({
// 	text,
// 	icon,
// }: {
// 	text: string;
// 	icon: React.ReactNode;
// }) => (
// 	<motion.div
// 		initial={{ opacity: 0, y: 20 }}
// 		whileInView={{ opacity: 1, y: 0 }}
// 		transition={{
// 			duration: DESIGN_TOKENS.animation.duration,
// 			ease: DESIGN_TOKENS.animation.ease,
// 		}}
// 		viewport={{ once: true }}
// 		className='inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 text-sm font-medium text-blue-400 mb-6'>
// 		{icon}
// 		{text}
// 	</motion.div>
// );

// interface Plan {
// 	name: string;
// 	desc: string;
// 	price: { monthly: number; annual: number };
// 	isMostPop: boolean;
// 	features: {
// 		included: string[];
// 		notIncluded: string[];
// 	};
// 	icon: React.ElementType;
// 	gradient: string;
// 	cta: string;
// }

// const Pricing = () => {
// 	const [isHovered, setIsHovered] = useState(false);
// 	const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
// 	const [isAnnual, setIsAnnual] = useState(false);
// 	// Add this state and function to your Pricing component
// 	const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
// 	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
// 	const [showContactModal, setShowContactModal] = useState(false);

// 	const plans: Plan[] = [
// 		{
// 			name: 'Basic',
// 			desc: 'Perfect for getting started',
// 			price: { monthly: 0, annual: 0 },
// 			isMostPop: false,
// 			icon: Zap,
// 			gradient: 'from-blue-400/20 via-purple-400/10 to-blue-400/20',
// 			features: {
// 				included: [
// 					'Access targeted ads',
// 					'Share up to 5 ads per month',
// 					'Basic analytics dashboard',
// 					'Email support',
// 					'Community access',
// 					'Mobile app access',
// 				],
// 				notIncluded: [
// 					'Advanced analytics',
// 					'Custom branding',
// 					'API access',
// 					'Priority support',
// 				],
// 			},
// 			cta: 'Start Free',
// 		},
// 		{
// 			name: 'Pro',
// 			desc: 'Best for growing businesses',
// 			price: { monthly: 29, annual: 290 },
// 			isMostPop: true,
// 			icon: Sparkles,
// 			gradient: 'from-purple-400/20 via-blue-400/10 to-purple-400/20',
// 			features: {
// 				included: [
// 					'Everything in Basic, plus:',
// 					'Unlimited ad sharing',
// 					'Advanced analytics',
// 					'Priority support',
// 					'Custom branding',
// 					'API access',
// 				],
// 				notIncluded: [
// 					'Dedicated account manager',
// 					'Custom integrations',
// 					'SLA guarantee',
// 				],
// 			},
// 			cta: 'Get Pro',
// 		},
// 		{
// 			name: 'Enterprise',
// 			desc: 'For large organizations',
// 			price: { monthly: 99, annual: 990 },
// 			isMostPop: false,
// 			icon: Building2,
// 			gradient: 'from-blue-400/20 via-purple-400/10 to-blue-400/20',
// 			features: {
// 				included: [
// 					'Everything in Pro, plus:',
// 					'Dedicated account manager',
// 					'Custom integrations',
// 					'Advanced security features',
// 					'SLA guarantee',
// 					'24/7 phone support',
// 				],
// 				notIncluded: [],
// 			},
// 			cta: 'Contact Sales',
// 		},
// 	];

// 	const handlePlanSelect = (plan: Plan) => {
// 		setSelectedPlan(plan.name);

// 		if (plan.name === 'Basic') {
// 			// Redirect to signup page with plan=basic query parameter
// 			window.location.href = '/signup?plan=basic';
// 		} else if (plan.name === 'Pro') {
// 			setShowCheckoutModal(true);
// 		} else if (plan.name === 'Enterprise') {
// 			setShowContactModal(true);
// 		}
// 	};

// 	return (
// 		<section className='relative py-16 lg:py-20 overflow-hidden'>
// 			{/* Enhanced Background Elements */}
// 			<div className='absolute inset-0 pointer-events-none'>
// 				<motion.div
// 					animate={{
// 						scale: isHovered ? 1.1 : 1,
// 						opacity: isHovered ? 0.7 : 0.5,
// 					}}
// 					transition={{ duration: 0.7 }}
// 					className='absolute top-[-20%] right-[-10%] w-[45rem] h-[45rem] bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-full blur-3xl'
// 				/>
// 				<motion.div
// 					animate={{
// 						scale: isHovered ? 1.1 : 1,
// 						opacity: isHovered ? 0.7 : 0.5,
// 					}}
// 					transition={{ duration: 0.7, delay: 0.2 }}
// 					className='absolute bottom-[-20%] left-[-10%] w-[45rem] h-[45rem] bg-gradient-to-tr from-slate-700/20 to-blue-600/10 rounded-full blur-3xl'
// 				/>
// 				<div className='absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50' />
// 			</div>

// 			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
// 				<LayoutEffect
// 					className='duration-1000 delay-300'
// 					isInviewState={{
// 						trueState: 'opacity-100 translate-y-0',
// 						falseState: 'opacity-0 translate-y-12',
// 					}}>
// 					<motion.div
// 						className='max-w-3xl mx-auto text-center mb-16'
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						transition={{
// 							duration: DESIGN_TOKENS.animation.duration,
// 							ease: DESIGN_TOKENS.animation.ease,
// 						}}
// 						viewport={{ once: true }}>
// 						<ConsistentBadge
// 							text='Simple, Transparent Pricing'
// 							icon={<Sparkles className='w-4 h-4 text-blue-400' />}
// 						/>
// 						<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
// 							<span className='text-slate-100'>Choose Your Perfect </span>
// 							<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
// 								Plan
// 							</span>
// 						</h2>
// 						<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
// 							Start free and scale as you grow. No hidden fees. Cancel anytime.
// 						</p>

// 						{/* Enhanced Billing Toggle */}
// 						<motion.div
// 							className='mt-8 inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm p-1 rounded-full border border-slate-700/50'
// 							initial={{ opacity: 0, y: 20 }}
// 							whileInView={{ opacity: 1, y: 0 }}
// 							transition={{
// 								duration: DESIGN_TOKENS.animation.duration,
// 								delay: 0.1,
// 								ease: DESIGN_TOKENS.animation.ease,
// 							}}
// 							viewport={{ once: true }}>
// 							<motion.button
// 								whileHover={{ scale: 1.02 }}
// 								whileTap={{ scale: 0.98 }}
// 								className={`px-6 py-2 rounded-full transition-all duration-300 ${
// 									!isAnnual
// 										? 'bg-blue-600 text-white shadow-lg'
// 										: 'text-slate-300 hover:text-slate-100'
// 								}`}
// 								onClick={() => setIsAnnual(false)}>
// 								Monthly
// 							</motion.button>
// 							<motion.button
// 								whileHover={{ scale: 1.02 }}
// 								whileTap={{ scale: 0.98 }}
// 								className={`px-6 py-2 rounded-full transition-all duration-300 ${
// 									isAnnual
// 										? 'bg-blue-600 text-white shadow-lg'
// 										: 'text-slate-300 hover:text-slate-100'
// 								}`}
// 								onClick={() => setIsAnnual(true)}>
// 								Annual
// 								<span className='ml-1 text-xs opacity-75'>(Save 20%)</span>
// 							</motion.button>
// 						</motion.div>
// 					</motion.div>

// 					<div
// 						className='grid md:grid-cols-3 gap-8'
// 						onMouseEnter={() => setIsHovered(true)}
// 						onMouseLeave={() => setIsHovered(false)}>
// 						{plans.map((plan, idx) => {
// 							const Icon = plan.icon;
// 							const price = isAnnual ? plan.price.annual : plan.price.monthly;
// 							const isHovered = hoveredPlan === plan.name;

// 							return (
// 								<motion.div
// 									key={idx}
// 									initial={{ opacity: 0, y: 20 }}
// 									whileInView={{ opacity: 1, y: 0 }}
// 									transition={{
// 										duration: DESIGN_TOKENS.animation.duration,
// 										delay: idx * 0.1,
// 										ease: DESIGN_TOKENS.animation.ease,
// 									}}
// 									viewport={{ once: true }}
// 									whileHover={{ scale: 1.02 }}
// 									className={`relative overflow-hidden bg-slate-800/30 backdrop-blur-md rounded-xl border ${
// 										plan.isMostPop
// 											? 'border-blue-400/50 shadow-lg shadow-blue-400/10'
// 											: 'border-slate-700/50'
// 									} transition-all duration-300 flex flex-col`}
// 									onMouseEnter={() => setHoveredPlan(plan.name)}
// 									onMouseLeave={() => setHoveredPlan(null)}>
// 									{/* Gradient Background */}
// 									<motion.div
// 										className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 transition-opacity duration-300`}
// 										animate={{ opacity: isHovered ? 0.1 : 0 }}
// 									/>

// 									{/* Popular Badge */}
// 									{plan.isMostPop && (
// 										<div className='absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium py-1.5 px-4 rounded-bl-xl'>
// 											Most Popular
// 										</div>
// 									)}

// 									<div className='relative p-8 flex flex-col h-full'>
// 										{/* Plan Header */}
// 										<div className='flex items-center gap-4 mb-6'>
// 											<motion.div
// 												className='p-3 rounded-xl bg-slate-700/50 text-blue-400'
// 												animate={{ scale: isHovered ? 1.1 : 1 }}
// 												transition={{ duration: 0.3 }}>
// 												<Icon className='w-6 h-6' />
// 											</motion.div>
// 											<div>
// 												<h3 className='text-xl font-bold text-slate-100'>
// 													{plan.name}
// 												</h3>
// 												<p className='text-sm text-slate-400'>{plan.desc}</p>
// 											</div>
// 										</div>
// 										{/* Price */}
// 										<div className='mb-6'>
// 											<div className='flex items-baseline gap-2'>
// 												<span className='text-4xl font-bold text-slate-100'>
// 													${price}
// 												</span>
// 												<span className='text-slate-400'>
// 													/{isAnnual ? 'year' : 'month'}
// 												</span>
// 											</div>
// 										</div>
// 										{/* Features - This section will expand to fill available space */}
// 										<div className='space-y-4 mb-8 flex-grow'>
// 											{plan.features.included.map((feature, featureIdx) => (
// 												<div
// 													key={featureIdx}
// 													className='flex items-center gap-3'>
// 													<Check className='w-5 h-5 text-green-400 flex-shrink-0' />
// 													<span className='text-slate-300 text-sm'>
// 														{feature}
// 													</span>
// 												</div>
// 											))}
// 											{plan.features.notIncluded.map((feature, featureIdx) => (
// 												<div
// 													key={featureIdx}
// 													className='flex items-center gap-3 opacity-50'>
// 													<X className='w-5 h-5 text-slate-400 flex-shrink-0' />
// 													<span className='text-slate-400 text-sm'>
// 														{feature}
// 													</span>
// 												</div>
// 											))}
// 										</div>
// 										{/* CTA Button - This will stick to the bottom */}
// 										<Button
// 											onClick={() => handlePlanSelect(plan)}
// 											className={`w-full group gap-2 text-base py-6 transition-all duration-300 rounded-xl mt-auto ${
// 												plan.isMostPop
// 													? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
// 													: 'bg-slate-700/50 hover:bg-slate-700/70 text-slate-200 border border-slate-600/50 hover:border-slate-500/50'
// 											}`}>
// 											{plan.cta}
// 											<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
// 										</Button>

// 										{showCheckoutModal && (
// 											<CheckoutModal
// 												plan={plans.find((p) => p.name === 'Pro')}
// 												isAnnual={isAnnual}
// 												onClose={() => setShowCheckoutModal(false)}
// 											/>
// 										)}
// 										{showContactModal && (
// 											<ContactModal
// 												onClose={() => setShowContactModal(false)}
// 											/>
// 										)}
// 									</div>

// 								</motion.div>
// 							);
// 						})}
// 					</div>

// 					{/* Enhanced Trust Indicators */}
// 					<motion.div
// 						className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						transition={{
// 							duration: DESIGN_TOKENS.animation.duration,
// 							delay: 0.3,
// 							ease: DESIGN_TOKENS.animation.ease,
// 						}}
// 						viewport={{ once: true }}>
// 						{[
// 							{
// 								value: '10K+',
// 								label: 'Active Users',
// 								icon: <Users className='w-5 h-5 text-blue-400' />,
// 								description: 'Growing community',
// 							},
// 							{
// 								value: '95%',
// 								label: 'Satisfaction Rate',
// 								icon: <TrendingUp className='w-5 h-5 text-green-400' />,
// 								description: 'Happy clients',
// 							},
// 							{
// 								value: '24/7',
// 								label: 'Support',
// 								icon: <Globe className='w-5 h-5 text-purple-400' />,
// 								description: 'Always available',
// 							},
// 							{
// 								value: '$2M+',
// 								label: 'Revenue Generated',
// 								icon: <DollarSign className='w-5 h-5 text-yellow-400' />,
// 								description: 'User earnings',
// 							},
// 						].map((stat, idx) => (
// 							<motion.div
// 								key={idx}
// 								whileHover={{ scale: 1.02 }}
// 								className='bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300'>
// 								<div className='flex items-center gap-3 mb-3'>
// 									<div className='p-2 rounded-lg bg-slate-700/50'>
// 										{stat.icon}
// 									</div>
// 									<div>
// 										<p className='text-2xl font-bold text-slate-100'>
// 											{stat.value}
// 										</p>
// 										<p className='text-sm text-slate-400'>{stat.label}</p>
// 									</div>
// 								</div>
// 								<p className='text-xs text-slate-300'>{stat.description}</p>
// 							</motion.div>
// 						))}
// 					</motion.div>
// 				</LayoutEffect>
// 			</div>
// 		</section>
// 	);
// };

// Pricing.displayName = 'Pricing';
// export default Pricing;

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
	CreditCard,
	User,
	Mail,
	Phone,
	MessageSquare,
	Calendar,
	Lock,
	Shield,
	BadgeCheck,
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

// Checkout Modal Component
const CheckoutModal = ({
	plan,
	isAnnual,
	onClose,
}: {
	plan: any;
	isAnnual: boolean;
	onClose: () => void;
}) => {
	const [step, setStep] = useState(1);
	const [paymentMethod, setPaymentMethod] = useState('card');

	const price = isAnnual ? plan.price.annual : plan.price.monthly;
	const billingPeriod = isAnnual ? 'year' : 'month';

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				className='relative bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl shadow-blue-500/10 w-full max-w-2xl overflow-hidden'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-700/50'>
					<h3 className='text-xl font-bold text-slate-100'>
						Complete Your Purchase
					</h3>
					<button
						onClick={onClose}
						className='p-2 text-slate-400 hover:text-slate-100 rounded-full hover:bg-slate-700/50 transition-colors'>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Progress Bar */}
				<div className='px-6 pt-4'>
					<div className='flex items-center justify-between mb-6'>
						<div className='flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden'>
							<div
								className='h-full bg-blue-500 transition-all duration-500'
								style={{
									width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
								}}></div>
						</div>
					</div>

					<div className='flex justify-between text-xs text-slate-400 mb-2'>
						<span className={step >= 1 ? 'text-blue-400' : ''}>Details</span>
						<span className={step >= 2 ? 'text-blue-400' : ''}>Payment</span>
						<span className={step >= 3 ? 'text-blue-400' : ''}>
							Confirmation
						</span>
					</div>
				</div>

				{/* Content */}
				<div className='p-6 max-h-[60vh] overflow-y-auto'>
					{step === 1 && (
						<div className='space-y-6'>
							<div className='bg-slate-700/30 rounded-xl p-4'>
								<div className='flex items-center justify-between mb-2'>
									<h4 className='font-semibold text-slate-100'>
										{plan.name} Plan
									</h4>
									<BadgeCheck className='w-5 h-5 text-blue-400' />
								</div>
								<p className='text-sm text-slate-300 mb-4'>{plan.desc}</p>
								<div className='flex items-baseline gap-2'>
									<span className='text-2xl font-bold text-slate-100'>
										${price}
									</span>
									<span className='text-slate-400'>/{billingPeriod}</span>
									{isAnnual && (
										<span className='text-xs text-green-400 ml-2 bg-green-400/10 px-2 py-1 rounded-full'>
											Save 20%
										</span>
									)}
								</div>
							</div>

							<div className='space-y-4'>
								<h4 className='font-semibold text-slate-100'>
									Account Information
								</h4>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm text-slate-400 mb-2'>
											First Name
										</label>
										<input
											type='text'
											className='w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
											placeholder='John'
										/>
									</div>
									<div>
										<label className='block text-sm text-slate-400 mb-2'>
											Last Name
										</label>
										<input
											type='text'
											className='w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
											placeholder='Doe'
										/>
									</div>
								</div>

								<div>
									<label className='block text-sm text-slate-400 mb-2'>
										Email Address
									</label>
									<input
										type='email'
										className='w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
										placeholder='john@example.com'
									/>
								</div>

								<div>
									<label className='block text-sm text-slate-400 mb-2'>
										Password
									</label>
									<input
										type='password'
										className='w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
										placeholder='Create a secure password'
									/>
								</div>
							</div>
						</div>
					)}

					{step === 2 && (
						<div className='space-y-6'>
							<div className='bg-slate-700/30 rounded-xl p-4'>
								<div className='flex items-center justify-between mb-2'>
									<h4 className='font-semibold text-slate-100'>
										Order Summary
									</h4>
									<BadgeCheck className='w-5 h-5 text-blue-400' />
								</div>
								<div className='flex justify-between items-center mb-1'>
									<span className='text-slate-300'>{plan.name} Plan</span>
									<span className='text-slate-100'>${price}</span>
								</div>
								<div className='flex justify-between items-center text-sm'>
									<span className='text-slate-400'>Billing period</span>
									<span className='text-slate-400'>Per {billingPeriod}</span>
								</div>
								<div className='border-t border-slate-700/50 my-3 pt-3 flex justify-between items-center font-semibold'>
									<span className='text-slate-100'>Total</span>
									<span className='text-slate-100'>${price}</span>
								</div>
							</div>

							<div className='space-y-4'>
								<h4 className='font-semibold text-slate-100'>Payment Method</h4>

								<div className='grid grid-cols-2 gap-4 mb-4'>
									<button
										onClick={() => setPaymentMethod('card')}
										className={`p-4 rounded-xl border transition-all ${
											paymentMethod === 'card'
												? 'border-blue-500/50 bg-blue-500/10'
												: 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
										}`}>
										<div className='flex items-center gap-3'>
											<CreditCard
												className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-blue-400' : 'text-slate-400'}`}
											/>
											<span
												className={
													paymentMethod === 'card'
														? 'text-slate-100'
														: 'text-slate-300'
												}>
												Credit Card
											</span>
										</div>
									</button>

									<button
										onClick={() => setPaymentMethod('paypal')}
										className={`p-4 rounded-xl border transition-all ${
											paymentMethod === 'paypal'
												? 'border-blue-500/50 bg-blue-500/10'
												: 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
										}`}>
										<div className='flex items-center gap-3'>
											<Shield
												className={`w-5 h-5 ${paymentMethod === 'paypal' ? 'text-blue-400' : 'text-slate-400'}`}
											/>
											<span
												className={
													paymentMethod === 'paypal'
														? 'text-slate-100'
														: 'text-slate-300'
												}>
												PayPal
											</span>
										</div>
									</button>
								</div>

								{paymentMethod === 'card' && (
									<div className='space-y-4'>
										<div>
											<label className='block text-sm text-slate-400 mb-2'>
												Card Number
											</label>
											<div className='relative'>
												<CreditCard className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500' />
												<input
													type='text'
													className='w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
													placeholder='1234 5678 9012 3456'
												/>
											</div>
										</div>

										<div className='grid grid-cols-2 gap-4'>
											<div>
												<label className='block text-sm text-slate-400 mb-2'>
													Expiry Date
												</label>
												<input
													type='text'
													className='w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
													placeholder='MM/YY'
												/>
											</div>
											<div>
												<label className='block text-sm text-slate-400 mb-2'>
													CVV
												</label>
												<input
													type='text'
													className='w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
													placeholder='123'
												/>
											</div>
										</div>

										<div>
											<label className='block text-sm text-slate-400 mb-2'>
												Cardholder Name
											</label>
											<input
												type='text'
												className='w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
												placeholder='John Doe'
											/>
										</div>
									</div>
								)}

								{paymentMethod === 'paypal' && (
									<div className='bg-slate-700/30 rounded-xl p-4 text-center'>
										<Shield className='w-12 h-12 text-blue-400 mx-auto mb-3' />
										<p className='text-slate-300 mb-4'>
											You will be redirected to PayPal to complete your payment
											securely.
										</p>
										<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3'>
											Continue to PayPal
										</Button>
									</div>
								)}
							</div>

							<div className='flex items-center gap-3 text-sm text-slate-400'>
								<Lock className='w-4 h-4' />
								<span>Your payment information is encrypted and secure</span>
							</div>
						</div>
					)}

					{step === 3 && (
						<div className='text-center py-8'>
							<div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
								<Check className='w-8 h-8 text-green-400' />
							</div>
							<h3 className='text-2xl font-bold text-slate-100 mb-2'>
								Payment Successful!
							</h3>
							<p className='text-slate-300 mb-6'>
								Your {plan.name} plan has been activated successfully.
							</p>

							<div className='bg-slate-700/30 rounded-xl p-4 text-left max-w-md mx-auto mb-6'>
								<div className='flex justify-between items-center mb-3'>
									<span className='text-slate-400'>Plan</span>
									<span className='text-slate-100'>{plan.name}</span>
								</div>
								<div className='flex justify-between items-center mb-3'>
									<span className='text-slate-400'>Amount</span>
									<span className='text-slate-100'>${price}</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-slate-400'>Next billing</span>
									<span className='text-slate-100'>
										{isAnnual ? 'In 1 year' : 'In 30 days'}
									</span>
								</div>
							</div>

							<Button
								onClick={onClose}
								className='bg-blue-600 hover:bg-blue-700 text-white px-8'>
								Start Using AdZPay
							</Button>
						</div>
					)}
				</div>

				{/* Footer */}
				{step < 3 && (
					<div className='flex justify-between p-6 border-t border-slate-700/50'>
						{step > 1 ? (
							<Button
								onClick={() => setStep(step - 1)}
								variant='outline'
								className='border-slate-600/50 text-slate-300 hover:bg-slate-700/50'>
								Back
							</Button>
						) : (
							<div></div>
						)}

						<Button
							onClick={() => (step < 3 ? setStep(step + 1) : onClose())}
							className='bg-blue-600 hover:bg-blue-700 text-white gap-2'>
							{step === 2 ? 'Complete Payment' : 'Continue'}
							<ChevronRight className='w-4 h-4' />
						</Button>
					</div>
				)}
			</motion.div>
		</div>
	);
};

// Contact Modal Component
const ContactModal = ({ onClose }: { onClose: () => void }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		company: '',
		phone: '',
		message: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				className='relative bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl shadow-blue-500/10 w-full max-w-2xl overflow-hidden'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-700/50'>
					<h3 className='text-xl font-bold text-slate-100'>
						Contact Enterprise Sales
					</h3>
					<button
						onClick={onClose}
						className='p-2 text-slate-400 hover:text-slate-100 rounded-full hover:bg-slate-700/50 transition-colors'>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Content */}
				<div className='p-6 max-h-[80vh] overflow-y-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
						<div className='md:col-span-2'>
							<h4 className='text-lg font-semibold text-slate-100 mb-4'>
								Custom Enterprise Solutions
							</h4>
							<p className='text-slate-300 mb-6'>
								Our enterprise team will contact you within 24 hours to discuss
								your specific needs and create a tailored solution for your
								organization.
							</p>
						</div>

						<div>
							<label className='block text-sm text-slate-400 mb-2'>
								Full Name *
							</label>
							<div className='relative'>
								<User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500' />
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									className='w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
									placeholder='John Doe'
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm text-slate-400 mb-2'>
								Work Email *
							</label>
							<div className='relative'>
								<Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500' />
								<input
									type='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className='w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
									placeholder='john@company.com'
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm text-slate-400 mb-2'>
								Company Name *
							</label>
							<div className='relative'>
								<Building2 className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500' />
								<input
									type='text'
									name='company'
									value={formData.company}
									onChange={handleChange}
									className='w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
									placeholder='Company Inc.'
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm text-slate-400 mb-2'>
								Phone Number
							</label>
							<div className='relative'>
								<Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500' />
								<input
									type='tel'
									name='phone'
									value={formData.phone}
									onChange={handleChange}
									className='w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
									placeholder='+1 (555) 123-4567'
								/>
							</div>
						</div>

						<div className='md:col-span-2'>
							<label className='block text-sm text-slate-400 mb-2'>
								Your Needs & Requirements *
							</label>
							<div className='relative'>
								<MessageSquare className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
								<textarea
									name='message'
									value={formData.message}
									onChange={handleChange}
									rows={4}
									className='w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none'
									placeholder='Tell us about your advertising needs, team size, and any specific requirements...'
								/>
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3 text-sm text-slate-400 mb-6'>
						<Shield className='w-4 h-4' />
						<span>
							Your information is secure and will only be used to contact you
							about your enterprise inquiry.
						</span>
					</div>

					<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3'>
						Contact Sales Team
					</Button>
				</div>
			</motion.div>
		</div>
	);
};

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
	const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
	const [showContactModal, setShowContactModal] = useState(false);

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
			cta: 'Get Pro',
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

	const handlePlanSelect = (plan: Plan) => {
		setSelectedPlan(plan);

		if (plan.name === 'Basic') {
			// Redirect to signup page with plan=basic query parameter
			window.location.href = '/signup?plan=basic';
		} else if (plan.name === 'Pro') {
			setShowCheckoutModal(true);
		} else if (plan.name === 'Enterprise') {
			setShowContactModal(true);
		}
	};

	return (
		<section className='relative py-16 lg:py-20 overflow-hidden'>
			{showCheckoutModal && (
				<CheckoutModal
					plan={selectedPlan}
					isAnnual={isAnnual}
					onClose={() => setShowCheckoutModal(false)}
				/>
			)}

			{showContactModal && (
				<ContactModal onClose={() => setShowContactModal(false)} />
			)}

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
									} transition-all duration-300 flex flex-col`}
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

									<div className='relative p-8 flex flex-col h-full'>
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

										{/* Features - This section will expand to fill available space */}
										<div className='space-y-4 mb-8 flex-grow'>
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

										{/* CTA Button - This will stick to the bottom */}
										<Button
											onClick={() => handlePlanSelect(plan)}
											className={`w-full group gap-2 text-base py-6 transition-all duration-300 rounded-xl mt-auto ${
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
