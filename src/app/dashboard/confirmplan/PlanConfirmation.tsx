// 'use client';

// import React, { useState, useMemo, useCallback } from 'react';
// import {
// 	Package,
// 	CreditCard,
// 	FileText,
// 	Check,
// 	ChevronLeft,
// 	CheckCircle2,
// 	Clock,
// 	ArrowRight,
// 	X,
// 	Crown,
// 	Diamond,
// 	Shield,
// 	Sparkles,
// 	Gift,
// 	Users,
// 	Gem,
// } from 'lucide-react';

// // Types
// type BillingCycle = 'monthly' | 'annual';
// type PaymentMethod = 'card' | 'paypal' | 'crypto' | null;
// type Step =
// 	| 'plan-selection'
// 	| 'payment-method'
// 	| 'payment-details'
// 	| 'confirmation';

// // Props for BillingToggle
// interface BillingToggleProps {
// 	billingCycle: BillingCycle;
// 	onChange: (cycle: BillingCycle) => void;
// 	disabled?: boolean;
// }

// // Enhanced Plan Icons with proper typing
// const BasicIcon = () => <Shield className='w-7 h-7' aria-hidden='true' />;
// const ProIcon = () => <Crown className='w-7 h-7' aria-hidden='true' />;
// const EnterpriseIcon = () => <Diamond className='w-7 h-7' aria-hidden='true' />;

// // Plan type definition
// interface Plan {
// 	name: string;
// 	price: number;
// 	type: string;
// 	description: string;
// 	features: string[];
// 	icon: JSX.Element;
// 	iconType: string;
// 	ctaText: string;
// 	color: string;
// 	borderColor: string;
// 	glowColor: string;
// 	popular?: boolean;
// }

// // Step type definition
// interface StepConfig {
// 	id: Step;
// 	title: string;
// 	icon: React.ComponentType<any>;
// 	celebrationIcon: React.ComponentType<any>;
// }

// const BillingToggle = ({
// 	billingCycle,
// 	onChange,
// 	disabled = false,
// }: BillingToggleProps) => (
// 	<div className='flex items-center justify-center mb-12'>
// 		<div className='bg-slate-900/90 backdrop-blur-xl p-2 rounded-2xl border border-slate-600 shadow-2xl'>
// 			<button
// 				onClick={() => onChange('monthly')}
// 				disabled={disabled}
// 				className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
// 					billingCycle === 'monthly'
// 						? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-xl shadow-slate-500/20'
// 						: 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
// 				} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
// 				aria-pressed={billingCycle === 'monthly'}
// 				aria-label='Monthly billing'>
// 				Monthly
// 			</button>
// 			<button
// 				onClick={() => onChange('annual')}
// 				disabled={disabled}
// 				className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
// 					billingCycle === 'annual'
// 						? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-xl shadow-slate-500/20'
// 						: 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
// 				} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
// 				aria-pressed={billingCycle === 'annual'}
// 				aria-label='Annual billing with 20% discount'>
// 				Annual
// 				<span className='absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs px-3 py-1 rounded-full font-bold shadow-lg'>
// 					20% OFF
// 				</span>
// 			</button>
// 		</div>
// 	</div>
// );

// // Plans data with enhanced styling
// const plansData: Plan[] = [
// 	{
// 		name: 'Basic Plan',
// 		price: 0,
// 		type: 'Free',
// 		description: 'Perfect for getting started',
// 		features: [
// 			'Access targeted ads',
// 			'Get 1 ad per day',
// 			'Referral and commissions',
// 			'Join the adzpay community',
// 			'SMS & WhatsApp Campaigns',
// 			'Phone support',
// 		],
// 		icon: <BasicIcon />,
// 		iconType: 'basic',
// 		ctaText: 'Current Plan',
// 		color: 'from-slate-600 to-slate-700',
// 		borderColor: 'border-slate-500',
// 		glowColor: 'shadow-slate-400/10',
// 	},
// 	{
// 		name: 'Starter',
// 		price: 11,
// 		type: 'Recommended',
// 		description: 'Ideal for growing businesses',
// 		features: [
// 			'Everything in Basic',
// 			'Share up to 5 ads per day',
// 			'Earn from referral',
// 			'Advanced statistics',
// 			'Priority support',
// 			'Early access to new features',
// 		],
// 		icon: <ProIcon />,
// 		iconType: 'pro',
// 		ctaText: 'Upgrade Now',
// 		color: 'from-slate-700 to-slate-800',
// 		borderColor: 'border-slate-400',
// 		glowColor: 'shadow-slate-400/20',
// 		popular: true,
// 	},
// 	{
// 		name: 'Enterprise',
// 		price: 100,
// 		type: 'Custom',
// 		description: 'Built for marketing managers',
// 		features: [
// 			'Everything in Starter',
// 			'Share unlimited ads per day',
// 			'Receive personalized support',
// 			'Sub-account Management',
// 			'Access in-depth reporting tools',
// 			'Dedicated account manager',
// 		],
// 		icon: <EnterpriseIcon />,
// 		iconType: 'enterprise',
// 		ctaText: 'Contact Sales',
// 		color: 'from-slate-800 to-slate-900',
// 		borderColor: 'border-slate-300',
// 		glowColor: 'shadow-slate-300/15',
// 	},
// ];

// const stepsConfig: StepConfig[] = [
// 	{
// 		id: 'plan-selection',
// 		title: 'Select Plan',
// 		icon: Package,
// 		celebrationIcon: CheckCircle2,
// 	},
// 	{
// 		id: 'payment-method',
// 		title: 'Payment Method',
// 		icon: CreditCard,
// 		celebrationIcon: CheckCircle2,
// 	},
// 	{
// 		id: 'payment-details',
// 		title: 'Payment Details',
// 		icon: FileText,
// 		celebrationIcon: CheckCircle2,
// 	},
// 	{
// 		id: 'confirmation',
// 		title: 'Confirmation',
// 		icon: CheckCircle2,
// 		celebrationIcon: CheckCircle2,
// 	},
// ];

// const PlanConfirmationPage = () => {
// 	const [selectedPlan, setSelectedPlan] = useState<Plan>(plansData[1]);
// 	const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
// 	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
// 	const [promoCode, setPromoCode] = useState('');
// 	const [showPromoInput, setShowPromoInput] = useState(false);
// 	const [isProcessing, setIsProcessing] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [isSuccess, setIsSuccess] = useState(false);
// 	const [currentStep, setCurrentStep] = useState<Step>('plan-selection');
// 	const [completedSteps, setCompletedSteps] = useState<Step[]>([]);

// 	// Progress steps calculation
// 	const currentStepIndex = stepsConfig.findIndex(
// 		(step) => step.id === currentStep
// 	);
// 	const progressPercentage =
// 		(currentStepIndex / (stepsConfig.length - 1)) * 100;

// 	// Memoized price calculation
// 	const calculatePrice = useCallback(
// 		(basePrice: number, cycle: BillingCycle) => {
// 			if (cycle === 'annual') {
// 				const annualPrice = basePrice * 12;
// 				const discount = annualPrice * 0.2;
// 				return (annualPrice - discount).toFixed(2);
// 			}
// 			return basePrice.toFixed(2);
// 		},
// 		[]
// 	);

// 	const handlePlanSelect = useCallback((plan: Plan) => {
// 		if (plan.price === 0) return;
// 		setSelectedPlan(plan);
// 		setCompletedSteps((prev) => [...prev, 'plan-selection']);
// 		setCurrentStep('payment-method');
// 	}, []);

// 	const handlePaymentMethodSelect = useCallback((method: PaymentMethod) => {
// 		setPaymentMethod(method);
// 		setCompletedSteps((prev) => [...prev, 'payment-method']);
// 		setCurrentStep('payment-details');
// 	}, []);

// 	const handleBackToPreviousStep = useCallback(() => {
// 		const currentIndex = stepsConfig.findIndex(
// 			(step) => step.id === currentStep
// 		);
// 		if (currentIndex > 0) {
// 			setCurrentStep(stepsConfig[currentIndex - 1].id);
// 			setCompletedSteps((prev) =>
// 				prev.filter((step) => step !== stepsConfig[currentIndex].id)
// 			);
// 		}
// 	}, [currentStep]);

// 	const handlePurchase = useCallback(async () => {
// 		if (selectedPlan.price === 0) return;
// 		setIsProcessing(true);
// 		setError(null);

// 		try {
// 			await new Promise((resolve) => setTimeout(resolve, 2000));
// 			setIsSuccess(true);
// 			setCompletedSteps((prev) => [...prev, 'payment-details', 'confirmation']);
// 			setCurrentStep('confirmation');
// 		} catch (err) {
// 			setError('An error occurred during purchase. Please try again.');
// 		} finally {
// 			setIsProcessing(false);
// 		}
// 	}, [selectedPlan]);

// 	// Enhanced Plan Cards Component - Fixed as React component
// 	const PlanCards = useCallback(() => {
// 		const handlePlanSelectInternal = (plan: Plan) => {
// 			if (plan.price === 0) return;
// 			setSelectedPlan(plan);
// 			setCompletedSteps((prev) => [...prev, 'plan-selection']);
// 			setCurrentStep('payment-method');
// 		};

// 		return (
// 			<div className='grid lg:grid-cols-3 gap-8 mb-12'>
// 				{plansData.map((plan) => {
// 					const isSelected = selectedPlan?.name === plan.name;
// 					const isDisabled = plan.price === 0;
// 					const price = calculatePrice(plan.price, billingCycle);

// 					return (
// 						<div
// 							key={plan.name}
// 							className={`relative rounded-3xl border-2 transition-all duration-500 transform hover:scale-[1.02] ${
// 								isSelected
// 									? `${plan.borderColor} shadow-2xl ${plan.glowColor} ring-2 ring-slate-400/20`
// 									: isDisabled
// 										? 'border-slate-700 opacity-70'
// 										: `border-slate-700 hover:${plan.borderColor} hover:shadow-xl hover:${plan.glowColor}`
// 							} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
// 							onClick={() => !isDisabled && handlePlanSelectInternal(plan)}
// 							onKeyDown={(e) =>
// 								!isDisabled &&
// 								(e.key === 'Enter' || e.key === ' ') &&
// 								handlePlanSelectInternal(plan)
// 							}
// 							tabIndex={isDisabled ? -1 : 0}
// 							aria-label={`Select ${plan.name} plan for $${price} per ${billingCycle === 'annual' ? 'year' : 'month'}`}
// 							role='button'
// 							aria-pressed={isSelected}>
// 							{/* Popular Badge */}
// 							{plan.popular && (
// 								<div className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-10'>
// 									<div className='bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-2 rounded-full text-sm font-bold text-slate-900 flex items-center gap-2 shadow-xl'>
// 										<Crown className='w-4 h-4' aria-hidden='true' />
// 										Most Popular
// 									</div>
// 								</div>
// 							)}

// 							<div
// 								className={`p-8 rounded-3xl h-full bg-gradient-to-br ${
// 									isSelected
// 										? 'from-slate-800/95 to-slate-900/95 backdrop-blur-xl'
// 										: 'from-slate-800/80 to-slate-900/80 backdrop-blur-lg'
// 								} border border-slate-600/30`}>
// 								{/* Plan Header */}
// 								<div className='text-center mb-8'>
// 									<div
// 										className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-2xl ${plan.glowColor} border border-slate-500/20`}>
// 										{plan.icon}
// 									</div>
// 									<h3 className='text-2xl font-bold mb-3 text-white'>
// 										{plan.name}
// 									</h3>
// 									<p className='text-slate-400 text-base mb-6'>
// 										{plan.description}
// 									</p>

// 									{/* Price */}
// 									<div className='mb-8'>
// 										{plan.price === 0 ? (
// 											<div className='text-4xl font-bold text-slate-300'>
// 												Free
// 											</div>
// 										) : (
// 											<div className='space-y-2'>
// 												<div className='text-4xl font-bold text-white'>
// 													${price}
// 													<span className='text-lg text-slate-400 font-normal'>
// 														/{billingCycle === 'annual' ? 'year' : 'month'}
// 													</span>
// 												</div>
// 												{billingCycle === 'annual' && (
// 													<div className='text-sm text-amber-400 flex items-center justify-center gap-2'>
// 														<Gem className='w-4 h-4' aria-hidden='true' />
// 														Save ${(plan.price * 12 * 0.2).toFixed(0)} per year
// 													</div>
// 												)}
// 											</div>
// 										)}
// 									</div>
// 								</div>

// 								{/* Features */}
// 								<div className='space-y-4 mb-8 flex-grow'>
// 									{plan.features.map((feature, featureIndex) => (
// 										<div key={featureIndex} className='flex items-center gap-4'>
// 											<div className='w-6 h-6 rounded-full bg-slate-600/30 flex items-center justify-center flex-shrink-0 border border-slate-500/20'>
// 												<Check
// 													className='w-4 h-4 text-slate-300'
// 													aria-hidden='true'
// 												/>
// 											</div>
// 											<span className='text-slate-300 text-base'>
// 												{feature}
// 											</span>
// 										</div>
// 									))}
// 								</div>

// 								{/* CTA Button */}
// 								<button
// 									disabled={isDisabled}
// 									className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
// 										isDisabled
// 											? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
// 											: isSelected
// 												? `bg-gradient-to-r ${plan.color} text-white shadow-xl ${plan.glowColor} border border-slate-400/30`
// 												: `bg-slate-800/80 text-slate-300 hover:bg-gradient-to-r hover:${plan.color} hover:text-white border border-slate-600 hover:border-slate-400/50 hover:shadow-lg hover:${plan.glowColor}`
// 									}`}
// 									aria-label={
// 										isDisabled ? 'Current plan' : `Select ${plan.name}`
// 									}>
// 									{plan.ctaText}
// 								</button>
// 							</div>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		);
// 	}, [selectedPlan, billingCycle, calculatePrice]);

// 	// Enhanced Progress Steps - Fixed as React component
// 	const ProgressSteps = useCallback(
// 		() => (
// 			<div className='max-w-5xl mx-auto mb-16'>
// 				<div className='flex justify-between items-center relative'>
// 					{stepsConfig.map((step, index) => {
// 						const StepIcon = step.icon;
// 						const isCompleted = completedSteps.includes(step.id);
// 						const isCurrent = currentStep === step.id;

// 						return (
// 							<div
// 								key={index}
// 								className='flex flex-col items-center relative z-10'>
// 								<div
// 									className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 border-2 ${
// 										isCompleted
// 											? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-2xl shadow-slate-400/30 border-slate-400'
// 											: isCurrent
// 												? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white ring-4 ring-slate-400/30 shadow-2xl shadow-slate-400/40 border-slate-300'
// 												: 'bg-slate-800/80 text-slate-400 border-slate-600 backdrop-blur-sm'
// 									}`}
// 									aria-current={isCurrent ? 'step' : undefined}>
// 									{isCompleted ? (
// 										<CheckCircle2 className='w-9 h-9' aria-hidden='true' />
// 									) : (
// 										<StepIcon className='w-9 h-9' aria-hidden='true' />
// 									)}
// 								</div>
// 								<div className='mt-4 text-center'>
// 									<div
// 										className={`text-base font-semibold transition-colors ${
// 											isCompleted || isCurrent
// 												? 'text-slate-200'
// 												: 'text-slate-400'
// 										}`}>
// 										{step.title}
// 									</div>
// 									<div className='text-sm text-slate-500 mt-1'>
// 										Step {index + 1}
// 									</div>
// 								</div>
// 							</div>
// 						);
// 					})}

// 					{/* Progress Bar */}
// 					<div className='absolute top-10 left-10 right-10 h-2 bg-slate-800 rounded-full -z-10 border border-slate-700'>
// 						<div
// 							className='h-full bg-gradient-to-r from-slate-500 to-slate-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-lg'
// 							style={{ width: `${progressPercentage}%` }}
// 							role='progressbar'
// 							aria-valuenow={progressPercentage}
// 							aria-valuemin={0}
// 							aria-valuemax={100}>
// 							<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse' />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		),
// 		[completedSteps, currentStep, progressPercentage]
// 	);

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
// 			{/* Enhanced Background Effects */}
// 			<div className='fixed inset-0 overflow-hidden pointer-events-none'>
// 				<div className='absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl' />
// 				<div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/8 rounded-full blur-3xl' />
// 				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-700/3 rounded-full blur-3xl' />
// 			</div>

// 			<div className='relative container mx-auto px-6 pt-24 pb-16'>
// 				<div className='max-w-7xl mx-auto'>
// 					{/* Enhanced Header */}
// 					<header className='text-center mb-16'>
// 						<div className='flex items-center justify-center mb-6'>
// 							<div className='w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-400/20 border border-slate-500/30'>
// 								<Sparkles
// 									className='w-8 h-8 text-slate-200'
// 									aria-hidden='true'
// 								/>
// 							</div>
// 						</div>
// 						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent'>
// 							Upgrade Your Account
// 						</h1>
// 						<p className='text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed'>
// 							Choose the perfect plan to unlock powerful features and elevate
// 							your business to new heights
// 						</p>
// 					</header>

// 					{/* Progress Steps */}
// 					<ProgressSteps />

// 					{/* Main Content */}
// 					<main className='backdrop-blur-xl bg-slate-900/60 border border-slate-600/40 rounded-3xl p-10 shadow-2xl'>
// 						{/* Back Button */}
// 						{currentStep !== 'plan-selection' && (
// 							<button
// 								onClick={handleBackToPreviousStep}
// 								className='flex items-center text-base text-slate-400 hover:text-slate-300 mb-8 transition-colors group'
// 								aria-label='Back to previous step'>
// 								<ChevronLeft
// 									className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform'
// 									aria-hidden='true'
// 								/>
// 								Back to Previous Step
// 							</button>
// 						)}

// 						{/* Step Content */}
// 						<div className='min-h-[500px]'>
// 							{/* Step 1: Plan Selection */}
// 							{currentStep === 'plan-selection' && (
// 								<div className='space-y-10'>
// 									<div className='text-center'>
// 										<h2 className='text-4xl font-bold mb-6 text-slate-200'>
// 											Choose Your Plan
// 										</h2>
// 										<p className='text-slate-400 text-lg'>
// 											Select the plan that perfectly aligns with your business
// 											goals
// 										</p>
// 									</div>
// 									<BillingToggle
// 										billingCycle={billingCycle}
// 										onChange={setBillingCycle}
// 									/>
// 									<PlanCards />
// 								</div>
// 							)}

// 							{/* Step 2: Payment Method */}
// 							{currentStep === 'payment-method' && (
// 								<div className='max-w-3xl mx-auto space-y-10'>
// 									<div className='text-center'>
// 										<h2 className='text-4xl font-bold mb-6 text-slate-200'>
// 											Select Payment Method
// 										</h2>
// 										<p className='text-slate-400 text-lg'>
// 											Choose your preferred payment option
// 										</p>
// 									</div>

// 									{/* Enhanced Order Summary */}
// 									<div className='bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-8 rounded-3xl border border-slate-600/40 backdrop-blur-sm'>
// 										<h3 className='text-2xl font-semibold mb-6 flex items-center gap-3 text-slate-200'>
// 											<Package
// 												className='w-6 h-6 text-slate-400'
// 												aria-hidden='true'
// 											/>
// 											Order Summary
// 										</h3>
// 										<div className='space-y-4'>
// 											<div className='flex justify-between items-center py-2'>
// 												<span className='text-slate-400 text-lg'>Plan</span>
// 												<span className='font-semibold text-slate-200 text-lg'>
// 													{selectedPlan.name}
// 												</span>
// 											</div>
// 											<div className='flex justify-between items-center py-2'>
// 												<span className='text-slate-400 text-lg'>Billing</span>
// 												<span className='font-semibold capitalize text-slate-200 text-lg'>
// 													{billingCycle}
// 												</span>
// 											</div>
// 											<div className='border-t border-slate-700 pt-4 mt-4'>
// 												<div className='flex justify-between items-center text-2xl'>
// 													<span className='font-bold text-slate-200'>
// 														Total
// 													</span>
// 													<span className='font-bold text-slate-300'>
// 														${calculatePrice(selectedPlan.price, billingCycle)}
// 													</span>
// 												</div>
// 											</div>
// 										</div>
// 									</div>

// 									{/* Enhanced Payment Method Selection */}
// 									<div className='grid gap-6'>
// 										{[
// 											{
// 												id: 'card',
// 												name: 'Credit/Debit Card',
// 												icon: CreditCard,
// 												desc: 'Visa, Mastercard, Amex',
// 											},
// 											{
// 												id: 'paypal',
// 												name: 'PayPal',
// 												icon: Users,
// 												desc: 'Pay with your PayPal account',
// 											},
// 											{
// 												id: 'crypto',
// 												name: 'Cryptocurrency',
// 												icon: Shield,
// 												desc: 'Bitcoin, Ethereum, USDC',
// 											},
// 										].map((method) => (
// 											<button
// 												key={method.id}
// 												onClick={() =>
// 													handlePaymentMethodSelect(method.id as PaymentMethod)
// 												}
// 												className={`w-full flex items-center justify-between p-8 rounded-3xl border-2 transition-all duration-300 hover:scale-[1.01] ${
// 													paymentMethod === method.id
// 														? 'border-slate-400 bg-slate-700/50 shadow-xl shadow-slate-400/20'
// 														: 'border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-700/40'
// 												}`}
// 												aria-pressed={paymentMethod === method.id}
// 												aria-label={`Select ${method.name} payment method`}>
// 												<div className='flex items-center gap-6'>
// 													<div
// 														className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
// 															paymentMethod === method.id
// 																? 'bg-slate-600 border-slate-400'
// 																: 'bg-slate-800 border-slate-600'
// 														}`}>
// 														<method.icon
// 															className='w-8 h-8 text-slate-300'
// 															aria-hidden='true'
// 														/>
// 													</div>
// 													<div className='text-left'>
// 														<span className='text-xl font-semibold text-slate-200 block'>
// 															{method.name}
// 														</span>
// 														<span className='text-slate-400 text-sm'>
// 															{method.desc}
// 														</span>
// 													</div>
// 												</div>
// 												{paymentMethod === method.id && (
// 													<CheckCircle2
// 														className='w-7 h-7 text-slate-300'
// 														aria-hidden='true'
// 													/>
// 												)}
// 											</button>
// 										))}
// 									</div>
// 								</div>
// 							)}

// 							{/* Step 3: Payment Details */}
// 							{currentStep === 'payment-details' && (
// 								<div className='max-w-3xl mx-auto space-y-10'>
// 									<div className='text-center'>
// 										<h2 className='text-4xl font-bold mb-6 text-slate-200'>
// 											Payment Details
// 										</h2>
// 										<p className='text-slate-400 text-lg'>
// 											Enter your payment information securely
// 										</p>
// 									</div>

// 									{/* Enhanced Payment Form */}
// 									<form
// 										className='space-y-8'
// 										onSubmit={(e) => {
// 											e.preventDefault();
// 											handlePurchase();
// 										}}>
// 										<div className='grid md:grid-cols-2 gap-6'>
// 											<div>
// 												<label
// 													htmlFor='firstName'
// 													className='block text-base font-semibold mb-3 text-slate-300'>
// 													First Name
// 												</label>
// 												<input
// 													id='firstName'
// 													type='text'
// 													className='w-full bg-slate-800/80 border border-slate-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
// 													placeholder='John'
// 													required
// 												/>
// 											</div>
// 											<div>
// 												<label
// 													htmlFor='lastName'
// 													className='block text-base font-semibold mb-3 text-slate-300'>
// 													Last Name
// 												</label>
// 												<input
// 													id='lastName'
// 													type='text'
// 													className='w-full bg-slate-800/80 border border-slate-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
// 													placeholder='Doe'
// 													required
// 												/>
// 											</div>
// 										</div>

// 										<div>
// 											<label
// 												htmlFor='email'
// 												className='block text-base font-semibold mb-3 text-slate-300'>
// 												Email Address
// 											</label>
// 											<input
// 												id='email'
// 												type='email'
// 												className='w-full bg-slate-800/80 border border-slate-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
// 												placeholder='john@example.com'
// 												required
// 											/>
// 										</div>

// 										{paymentMethod === 'card' && (
// 											<>
// 												<div>
// 													<label
// 														htmlFor='cardNumber'
// 														className='block text-base font-semibold mb-3 text-slate-300'>
// 														Card Number
// 													</label>
// 													<input
// 														id='cardNumber'
// 														type='text'
// 														className='w-full bg-slate-800/80 border border-slate-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
// 														placeholder='1234 5678 9012 3456'
// 														required
// 													/>
// 												</div>
// 												<div className='grid md:grid-cols-2 gap-6'>
// 													<div>
// 														<label
// 															htmlFor='expiryDate'
// 															className='block text-base font-semibold mb-3 text-slate-300'>
// 															Expiry Date
// 														</label>
// 														<input
// 															id='expiryDate'
// 															type='text'
// 															className='w-full bg-slate-800/80 border border-slate-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
// 															placeholder='MM/YY'
// 															required
// 														/>
// 													</div>
// 													<div>
// 														<label
// 															htmlFor='securityCode'
// 															className='block text-base font-semibold mb-3 text-slate-300'>
// 															Security Code
// 														</label>
// 														<input
// 															id='securityCode'
// 															type='text'
// 															className='w-full bg-slate-800/80 border border-slate-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
// 															placeholder='123'
// 															required
// 														/>
// 													</div>
// 												</div>
// 											</>
// 										)}

// 										{/* Enhanced Promo Code */}
// 										<div>
// 											{!showPromoInput ? (
// 												<button
// 													type='button'
// 													onClick={() => setShowPromoInput(true)}
// 													className='text-slate-400 hover:text-slate-300 flex items-center gap-3 transition-colors text-lg'>
// 													<Gift className='w-5 h-5' aria-hidden='true' />
// 													Have a promo code?
// 												</button>
// 											) : (
// 												<div className='flex gap-4'>
// 													<input
// 														type='text'
// 														value={promoCode}
// 														onChange={(e) => setPromoCode(e.target.value)}
// 														placeholder='Enter promo code'
// 														className='flex-1 bg-slate-800/80 border border-slate-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
// 													/>
// 													<button
// 														type='button'
// 														className='bg-slate-600 hover:bg-slate-700 px-8 rounded-2xl transition-colors text-white font-semibold'>
// 														Apply
// 													</button>
// 												</div>
// 											)}
// 										</div>

// 										{/* Enhanced Complete Purchase Button */}
// 										<button
// 											type='submit'
// 											disabled={isProcessing}
// 											className={`w-full py-5 rounded-2xl flex items-center justify-center gap-4 text-xl font-semibold transition-all duration-300 ${
// 												!isProcessing
// 													? 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-2xl hover:shadow-slate-400/20 text-white border border-slate-400/30'
// 													: 'bg-slate-800 cursor-not-allowed text-slate-500 border border-slate-700'
// 											}`}
// 											aria-label='Complete purchase'>
// 											{isProcessing ? (
// 												<>
// 													<Clock
// 														className='w-6 h-6 animate-spin'
// 														aria-hidden='true'
// 													/>
// 													Processing Payment...
// 												</>
// 											) : (
// 												<>
// 													<span>Complete Purchase</span>
// 													<ArrowRight className='w-6 h-6' aria-hidden='true' />
// 												</>
// 											)}
// 										</button>
// 									</form>
// 								</div>
// 							)}

// 							{/* Step 4: Enhanced Confirmation */}
// 							{currentStep === 'confirmation' && (
// 								<div className='text-center max-w-3xl mx-auto space-y-10'>
// 									<div className='relative'>
// 										<div className='w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center shadow-2xl shadow-slate-400/30 border-2 border-slate-400/30'>
// 											<CheckCircle2
// 												className='w-16 h-16 text-white'
// 												aria-hidden='true'
// 											/>
// 										</div>
// 										<div className='absolute inset-0 w-32 h-32 mx-auto rounded-full bg-slate-500/20 animate-ping' />
// 									</div>

// 									<div className='space-y-6'>
// 										<h2 className='text-5xl font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent'>
// 											Upgrade Successful!
// 										</h2>
// 										<p className='text-2xl text-slate-300'>
// 											Welcome to {selectedPlan.name}! 🎉
// 										</p>
// 										<p className='text-slate-400 text-lg leading-relaxed'>
// 											You will receive a confirmation email shortly with all the
// 											details and your new premium features are now active.
// 										</p>
// 									</div>

// 									<div className='bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-8 rounded-3xl border border-slate-600/40 backdrop-blur-sm'>
// 										<h3 className='text-xl font-semibold mb-6 text-slate-200 flex items-center gap-3'>
// 											<Sparkles
// 												className='w-6 h-6 text-slate-400'
// 												aria-hidden='true'
// 											/>
// 											What&apos;s Next?
// 										</h3>
// 										<div className='space-y-5 text-left'>
// 											<div className='flex items-center gap-4'>
// 												<div className='w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center'>
// 													<Sparkles
// 														className='w-6 h-6 text-slate-300'
// 														aria-hidden='true'
// 													/>
// 												</div>
// 												<span className='text-slate-300 text-lg'>
// 													Explore your new premium features
// 												</span>
// 											</div>
// 											<div className='flex items-center gap-4'>
// 												<div className='w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center'>
// 													<Shield
// 														className='w-6 h-6 text-slate-300'
// 														aria-hidden='true'
// 													/>
// 												</div>
// 												<span className='text-slate-300 text-lg'>
// 													Check your email for receipt and setup guide
// 												</span>
// 											</div>
// 											<div className='flex items-center gap-4'>
// 												<div className='w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center'>
// 													<Users
// 														className='w-6 h-6 text-slate-300'
// 														aria-hidden='true'
// 													/>
// 												</div>
// 												<span className='text-slate-300 text-lg'>
// 													Join our premium community for exclusive tips
// 												</span>
// 											</div>
// 										</div>
// 									</div>

// 									<button
// 										onClick={() => window.location.reload()}
// 										className='bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 px-12 py-5 rounded-2xl transition-all duration-300 font-semibold text-xl shadow-2xl hover:shadow-slate-400/20 text-white border border-slate-400/30'
// 										aria-label='Start using premium features'>
// 										Start Using Premium Features
// 									</button>
// 								</div>
// 							)}
// 						</div>

// 						{/* Enhanced Error Message */}
// 						{error && (
// 							<div
// 								className='mt-8 bg-red-900/40 border border-red-600/60 text-red-400 p-6 rounded-2xl flex items-center justify-between backdrop-blur-sm'
// 								role='alert'
// 								aria-live='assertive'>
// 								<span className='text-lg'>{error}</span>
// 								<button
// 									onClick={() => setError(null)}
// 									className='hover:bg-red-800/50 p-2 rounded-xl transition-colors'
// 									aria-label='Dismiss error message'>
// 									<X className='w-5 h-5' aria-hidden='true' />
// 								</button>
// 							</div>
// 						)}
// 					</main>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default PlanConfirmationPage;

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
	Package,
	CreditCard,
	FileText,
	Check,
	ChevronLeft,
	CheckCircle2,
	Clock,
	ArrowRight,
	X,
	Crown,
	Diamond,
	Shield,
	Sparkles,
	Gift,
	Users,
	Gem,
} from 'lucide-react';

// Types
type BillingCycle = 'monthly' | 'annual';
type PaymentMethod = 'card' | 'paypal' | 'crypto' | null;
type Step =
	| 'plan-selection'
	| 'payment-method'
	| 'payment-details'
	| 'confirmation';

// Props for BillingToggle
interface BillingToggleProps {
	billingCycle: BillingCycle;
	onChange: (cycle: BillingCycle) => void;
	disabled?: boolean;
}

// Enhanced Plan Icons with proper typing
const BasicIcon = () => <Shield className='w-7 h-7' aria-hidden='true' />;
const ProIcon = () => <Crown className='w-7 h-7' aria-hidden='true' />;
const EnterpriseIcon = () => <Diamond className='w-7 h-7' aria-hidden='true' />;

// Plan type definition
interface Plan {
	name: string;
	price: number;
	type: string;
	description: string;
	features: string[];
	icon: JSX.Element;
	iconType: string;
	ctaText: string;
	color: string;
	borderColor: string;
	glowColor: string;
	popular?: boolean;
}

// Step type definition
interface StepConfig {
	id: Step;
	title: string;
	icon: React.ComponentType<any>;
	celebrationIcon: React.ComponentType<any>;
}

const BillingToggle = ({
	billingCycle,
	onChange,
	disabled = false,
}: BillingToggleProps) => (
	<div className='flex items-center justify-center mb-12'>
		<div className='bg-slate-900/90 backdrop-blur-xl p-2 rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10'>
			<button
				onClick={() => onChange('monthly')}
				disabled={disabled}
				className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
					billingCycle === 'monthly'
						? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/20'
						: 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
				} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
				aria-pressed={billingCycle === 'monthly'}
				aria-label='Monthly billing'>
				Monthly
			</button>
			<button
				onClick={() => onChange('annual')}
				disabled={disabled}
				className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
					billingCycle === 'annual'
						? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/20'
						: 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
				} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
				aria-pressed={billingCycle === 'annual'}
				aria-label='Annual billing with 20% discount'>
				Annual
				<span className='absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs px-3 py-1 rounded-full font-bold shadow-lg'>
					20% OFF
				</span>
			</button>
		</div>
	</div>
);

// Plans data with enhanced styling
const plansData: Plan[] = [
	{
		name: 'Basic Plan',
		price: 0,
		type: 'Free',
		description: 'Perfect for getting started',
		features: [
			'Access targeted ads',
			'Get 1 ad per day',
			'Referral and commissions',
			'Join the adzpay community',
			'SMS & WhatsApp Campaigns',
			'Phone support',
		],
		icon: <BasicIcon />,
		iconType: 'basic',
		ctaText: 'Current Plan',
		color: 'from-slate-600 to-slate-700',
		borderColor: 'border-slate-500',
		glowColor: 'shadow-slate-400/10',
	},
	{
		name: 'Starter',
		price: 11,
		type: 'Recommended',
		description: 'Ideal for growing businesses',
		features: [
			'Everything in Basic',
			'Share up to 5 ads per day',
			'Earn from referral',
			'Advanced statistics',
			'Priority support',
			'Early access to new features',
		],
		icon: <ProIcon />,
		iconType: 'pro',
		ctaText: 'Upgrade Now',
		color: 'from-purple-600 to-indigo-600',
		borderColor: 'border-purple-400',
		glowColor: 'shadow-purple-400/20',
		popular: true,
	},
	{
		name: 'Enterprise',
		price: 100,
		type: 'Custom',
		description: 'Built for marketing managers',
		features: [
			'Everything in Starter',
			'Share unlimited ads per day',
			'Receive personalized support',
			'Sub-account Management',
			'Access in-depth reporting tools',
			'Dedicated account manager',
		],
		icon: <EnterpriseIcon />,
		iconType: 'enterprise',
		ctaText: 'Contact Sales',
		color: 'from-indigo-600 to-blue-600',
		borderColor: 'border-blue-400',
		glowColor: 'shadow-blue-400/20',
	},
];

const stepsConfig: StepConfig[] = [
	{
		id: 'plan-selection',
		title: 'Select Plan',
		icon: Package,
		celebrationIcon: CheckCircle2,
	},
	{
		id: 'payment-method',
		title: 'Payment Method',
		icon: CreditCard,
		celebrationIcon: CheckCircle2,
	},
	{
		id: 'payment-details',
		title: 'Payment Details',
		icon: FileText,
		celebrationIcon: CheckCircle2,
	},
	{
		id: 'confirmation',
		title: 'Confirmation',
		icon: CheckCircle2,
		celebrationIcon: CheckCircle2,
	},
];

const PlanConfirmationPage = () => {
	const [selectedPlan, setSelectedPlan] = useState<Plan>(plansData[1]);
	const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
	const [promoCode, setPromoCode] = useState('');
	const [showPromoInput, setShowPromoInput] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [currentStep, setCurrentStep] = useState<Step>('plan-selection');
	const [completedSteps, setCompletedSteps] = useState<Step[]>([]);

	// Progress steps calculation
	const currentStepIndex = stepsConfig.findIndex(
		(step) => step.id === currentStep
	);
	const progressPercentage =
		(currentStepIndex / (stepsConfig.length - 1)) * 100;

	// Memoized price calculation
	const calculatePrice = useCallback(
		(basePrice: number, cycle: BillingCycle) => {
			if (cycle === 'annual') {
				const annualPrice = basePrice * 12;
				const discount = annualPrice * 0.2;
				return (annualPrice - discount).toFixed(2);
			}
			return basePrice.toFixed(2);
		},
		[]
	);

	const handlePlanSelect = useCallback((plan: Plan) => {
		if (plan.price === 0) return;
		setSelectedPlan(plan);
		setCompletedSteps((prev) => [...prev, 'plan-selection']);
		setCurrentStep('payment-method');
	}, []);

	const handlePaymentMethodSelect = useCallback((method: PaymentMethod) => {
		setPaymentMethod(method);
		setCompletedSteps((prev) => [...prev, 'payment-method']);
		setCurrentStep('payment-details');
	}, []);

	const handleBackToPreviousStep = useCallback(() => {
		const currentIndex = stepsConfig.findIndex(
			(step) => step.id === currentStep
		);
		if (currentIndex > 0) {
			setCurrentStep(stepsConfig[currentIndex - 1].id);
			setCompletedSteps((prev) =>
				prev.filter((step) => step !== stepsConfig[currentIndex].id)
			);
		}
	}, [currentStep]);

	const handlePurchase = useCallback(async () => {
		if (selectedPlan.price === 0) return;
		setIsProcessing(true);
		setError(null);

		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setIsSuccess(true);
			setCompletedSteps((prev) => [...prev, 'payment-details', 'confirmation']);
			setCurrentStep('confirmation');
		} catch (err) {
			setError('An error occurred during purchase. Please try again.');
		} finally {
			setIsProcessing(false);
		}
	}, [selectedPlan]);

	// Enhanced Plan Cards Component - Fixed as React component
	const PlanCards = useCallback(() => {
		const handlePlanSelectInternal = (plan: Plan) => {
			if (plan.price === 0) return;
			setSelectedPlan(plan);
			setCompletedSteps((prev) => [...prev, 'plan-selection']);
			setCurrentStep('payment-method');
		};

		return (
			<div className='grid lg:grid-cols-3 gap-8 mb-12'>
				{plansData.map((plan) => {
					const isSelected = selectedPlan?.name === plan.name;
					const isDisabled = plan.price === 0;
					const price = calculatePrice(plan.price, billingCycle);

					return (
						<div
							key={plan.name}
							className={`relative rounded-3xl border-2 transition-all duration-500 transform hover:scale-[1.02] ${
								isSelected
									? `${plan.borderColor} shadow-2xl ${plan.glowColor} ring-2 ring-opacity-30`
									: isDisabled
										? 'border-slate-700 opacity-70'
										: `border-slate-700 hover:${plan.borderColor} hover:shadow-xl hover:${plan.glowColor}`
							} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
							onClick={() => !isDisabled && handlePlanSelectInternal(plan)}
							onKeyDown={(e) =>
								!isDisabled &&
								(e.key === 'Enter' || e.key === ' ') &&
								handlePlanSelectInternal(plan)
							}
							tabIndex={isDisabled ? -1 : 0}
							aria-label={`Select ${plan.name} plan for $${price} per ${billingCycle === 'annual' ? 'year' : 'month'}`}
							role='button'
							aria-pressed={isSelected}>
							{/* Gradient overlay */}
							<div className='absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5 rounded-3xl -z-10'></div>

							{/* Popular Badge */}
							{plan.popular && (
								<div className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-10'>
									<div className='bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full text-sm font-bold text-white flex items-center gap-2 shadow-xl shadow-purple-500/25'>
										<Crown className='w-4 h-4' aria-hidden='true' />
										Most Popular
									</div>
								</div>
							)}

							<div
								className={`p-8 rounded-3xl h-full bg-gradient-to-br ${
									isSelected
										? 'from-slate-800/95 to-slate-900/95 backdrop-blur-xl'
										: 'from-slate-800/80 to-slate-900/80 backdrop-blur-lg'
								} border border-slate-600/30 relative overflow-hidden`}>
								{/* Plan Header */}
								<div className='text-center mb-8'>
									<div
										className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-2xl ${plan.glowColor} border border-white/10`}>
										{plan.icon}
									</div>
									<h3 className='text-2xl font-bold mb-3 text-white'>
										{plan.name}
									</h3>
									<p className='text-slate-400 text-base mb-6'>
										{plan.description}
									</p>

									{/* Price */}
									<div className='mb-8'>
										{plan.price === 0 ? (
											<div className='text-4xl font-bold text-slate-300'>
												Free
											</div>
										) : (
											<div className='space-y-2'>
												<div className='text-4xl font-bold text-white'>
													${price}
													<span className='text-lg text-slate-400 font-normal'>
														/{billingCycle === 'annual' ? 'year' : 'month'}
													</span>
												</div>
												{billingCycle === 'annual' && (
													<div className='text-sm text-purple-400 flex items-center justify-center gap-2'>
														<Gem className='w-4 h-4' aria-hidden='true' />
														Save ${(plan.price * 12 * 0.2).toFixed(0)} per year
													</div>
												)}
											</div>
										)}
									</div>
								</div>

								{/* Features */}
								<div className='space-y-4 mb-8 flex-grow'>
									{plan.features.map((feature, featureIndex) => (
										<div key={featureIndex} className='flex items-center gap-4'>
											<div className='w-6 h-6 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0 border border-purple-500/20'>
												<Check
													className='w-4 h-4 text-purple-300'
													aria-hidden='true'
												/>
											</div>
											<span className='text-slate-300 text-base'>
												{feature}
											</span>
										</div>
									))}
								</div>

								{/* CTA Button */}
								<button
									disabled={isDisabled}
									className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
										isDisabled
											? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
											: isSelected
												? `bg-gradient-to-r ${plan.color} text-white shadow-xl ${plan.glowColor} border border-white/20`
												: `bg-slate-800/80 text-slate-300 hover:bg-gradient-to-r hover:${plan.color} hover:text-white border border-slate-600 hover:border-white/20 hover:shadow-lg hover:${plan.glowColor}`
									}`}
									aria-label={
										isDisabled ? 'Current plan' : `Select ${plan.name}`
									}>
									{plan.ctaText}
								</button>
							</div>
						</div>
					);
				})}
			</div>
		);
	}, [selectedPlan, billingCycle, calculatePrice]);

	// Enhanced Progress Steps - Fixed as React component
	const ProgressSteps = useCallback(
		() => (
			<div className='max-w-5xl mx-auto mb-16'>
				<div className='flex justify-between items-center relative'>
					{stepsConfig.map((step, index) => {
						const StepIcon = step.icon;
						const isCompleted = completedSteps.includes(step.id);
						const isCurrent = currentStep === step.id;

						return (
							<div
								key={index}
								className='flex flex-col items-center relative z-10'>
								<div
									className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 border-2 ${
										isCompleted
											? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl shadow-purple-400/30 border-purple-400'
											: isCurrent
												? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white ring-4 ring-blue-400/30 shadow-2xl shadow-blue-400/40 border-blue-300'
												: 'bg-slate-800/80 text-slate-400 border-slate-600 backdrop-blur-sm'
									}`}
									aria-current={isCurrent ? 'step' : undefined}>
									{isCompleted ? (
										<CheckCircle2 className='w-9 h-9' aria-hidden='true' />
									) : (
										<StepIcon className='w-9 h-9' aria-hidden='true' />
									)}
								</div>
								<div className='mt-4 text-center'>
									<div
										className={`text-base font-semibold transition-colors ${
											isCompleted || isCurrent
												? 'text-slate-200'
												: 'text-slate-400'
										}`}>
										{step.title}
									</div>
									<div className='text-sm text-slate-500 mt-1'>
										Step {index + 1}
									</div>
								</div>
							</div>
						);
					})}

					{/* Progress Bar */}
					<div className='absolute top-10 left-10 right-10 h-2 bg-slate-800 rounded-full -z-10 border border-slate-700'>
						<div
							className='h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-lg'
							style={{ width: `${progressPercentage}%` }}
							role='progressbar'
							aria-valuenow={progressPercentage}
							aria-valuemin={0}
							aria-valuemax={100}>
							<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse' />
						</div>
					</div>
				</div>
			</div>
		),
		[completedSteps, currentStep, progressPercentage]
	);

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative'>
			{/* Enhanced Background Effects */}
			<div className='fixed inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl' />
				<div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl' />
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-700/3 rounded-full blur-3xl' />
			</div>

			{/* Gradient overlay */}
			<div className='absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5 -z-10'></div>

			<div className='relative container mx-auto px-6 pt-24 pb-16'>
				<div className='max-w-7xl mx-auto'>
					{/* Enhanced Header */}
					<header className='text-center mb-16'>
						<div className='flex items-center justify-center mb-6'>
							<div className='w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-400/20 border border-purple-500/30'>
								<Sparkles className='w-8 h-8 text-white' aria-hidden='true' />
							</div>
						</div>
						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent'>
							Upgrade Your Account
						</h1>
						<p className='text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed'>
							Choose the perfect plan to unlock powerful features and elevate
							your business to new heights
						</p>
					</header>

					{/* Progress Steps */}
					<ProgressSteps />

					{/* Main Content */}
					<main className='backdrop-blur-xl bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 border border-purple-500/20 rounded-3xl p-10 shadow-2xl shadow-purple-500/5 relative overflow-hidden'>
						{/* Gradient overlay for main content */}
						<div className='absolute inset-0 bg-gradient-to-r from-purple-500/3 via-indigo-500/3 to-blue-500/3 rounded-3xl'></div>
						<div className='relative z-10'>
							{/* Back Button */}
							{currentStep !== 'plan-selection' && (
								<button
									onClick={handleBackToPreviousStep}
									className='flex items-center text-base text-purple-400 hover:text-purple-300 mb-8 transition-colors group'
									aria-label='Back to previous step'>
									<ChevronLeft
										className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform'
										aria-hidden='true'
									/>
									Back to Previous Step
								</button>
							)}

							{/* Step Content */}
							<div className='min-h-[500px]'>
								{/* Step 1: Plan Selection */}
								{currentStep === 'plan-selection' && (
									<div className='space-y-10'>
										<div className='text-center'>
											<h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent'>
												Choose Your Plan
											</h2>
											<p className='text-slate-400 text-lg'>
												Select the plan that perfectly aligns with your business
												goals
											</p>
										</div>
										<BillingToggle
											billingCycle={billingCycle}
											onChange={setBillingCycle}
										/>
										<PlanCards />
									</div>
								)}

								{/* Step 2: Payment Method */}
								{currentStep === 'payment-method' && (
									<div className='max-w-3xl mx-auto space-y-10'>
										<div className='text-center'>
											<h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent'>
												Select Payment Method
											</h2>
											<p className='text-slate-400 text-lg'>
												Choose your preferred payment option
											</p>
										</div>

										{/* Enhanced Order Summary */}
										<div className='bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm relative overflow-hidden'>
											<div className='absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5'></div>
											<div className='relative z-10'>
												<h3 className='text-2xl font-semibold mb-6 flex items-center gap-3 text-slate-200'>
													<Package
														className='w-6 h-6 text-purple-400'
														aria-hidden='true'
													/>
													Order Summary
												</h3>
												<div className='space-y-4'>
													<div className='flex justify-between items-center py-2'>
														<span className='text-slate-400 text-lg'>Plan</span>
														<span className='font-semibold text-slate-200 text-lg'>
															{selectedPlan.name}
														</span>
													</div>
													<div className='flex justify-between items-center py-2'>
														<span className='text-slate-400 text-lg'>
															Billing
														</span>
														<span className='font-semibold capitalize text-slate-200 text-lg'>
															{billingCycle}
														</span>
													</div>
													<div className='border-t border-purple-500/20 pt-4 mt-4'>
														<div className='flex justify-between items-center text-2xl'>
															<span className='font-bold text-slate-200'>
																Total
															</span>
															<span className='font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent'>
																$
																{calculatePrice(
																	selectedPlan.price,
																	billingCycle
																)}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Enhanced Payment Method Selection */}
										<div className='grid gap-6'>
											{[
												{
													id: 'card',
													name: 'Credit/Debit Card',
													icon: CreditCard,
													desc: 'Visa, Mastercard, Amex',
													color: 'from-purple-600 to-indigo-600',
												},
												{
													id: 'paypal',
													name: 'PayPal',
													icon: Users,
													desc: 'Pay with your PayPal account',
													color: 'from-indigo-600 to-blue-600',
												},
												{
													id: 'crypto',
													name: 'Cryptocurrency',
													icon: Shield,
													desc: 'Bitcoin, Ethereum, USDC',
													color: 'from-blue-600 to-cyan-600',
												},
											].map((method) => (
												<button
													key={method.id}
													onClick={() =>
														handlePaymentMethodSelect(
															method.id as PaymentMethod
														)
													}
													className={`w-full flex items-center justify-between p-8 rounded-3xl border-2 transition-all duration-300 hover:scale-[1.01] relative overflow-hidden ${
														paymentMethod === method.id
															? 'border-purple-400 bg-slate-700/50 shadow-xl shadow-purple-400/20'
															: 'border-slate-700 hover:border-purple-600 bg-slate-800/40 hover:bg-slate-700/40'
													}`}
													aria-pressed={paymentMethod === method.id}
													aria-label={`Select ${method.name} payment method`}>
													{paymentMethod === method.id && (
														<div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10'></div>
													)}
													<div className='flex items-center gap-6 relative z-10'>
														<div
															className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
																paymentMethod === method.id
																	? `bg-gradient-to-br ${method.color} border-purple-400`
																	: 'bg-slate-800 border-slate-600'
															}`}>
															<method.icon
																className='w-8 h-8 text-white'
																aria-hidden='true'
															/>
														</div>
														<div className='text-left'>
															<span className='text-xl font-semibold text-slate-200 block'>
																{method.name}
															</span>
															<span className='text-slate-400 text-sm'>
																{method.desc}
															</span>
														</div>
													</div>
													{paymentMethod === method.id && (
														<CheckCircle2
															className='w-7 h-7 text-purple-300 relative z-10'
															aria-hidden='true'
														/>
													)}
												</button>
											))}
										</div>
									</div>
								)}

								{/* Step 3: Payment Details */}
								{currentStep === 'payment-details' && (
									<div className='max-w-3xl mx-auto space-y-10'>
										<div className='text-center'>
											<h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent'>
												Payment Details
											</h2>
											<p className='text-slate-400 text-lg'>
												Enter your payment information securely
											</p>
										</div>

										{/* Enhanced Payment Form */}
										<form
											className='space-y-8'
											onSubmit={(e) => {
												e.preventDefault();
												handlePurchase();
											}}>
											<div className='grid md:grid-cols-2 gap-6'>
												<div>
													<label
														htmlFor='firstName'
														className='block text-base font-semibold mb-3 text-slate-300'>
														First Name
													</label>
													<input
														id='firstName'
														type='text'
														className='w-full bg-slate-800/80 border border-purple-500/30 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
														placeholder='John'
														required
													/>
												</div>
												<div>
													<label
														htmlFor='lastName'
														className='block text-base font-semibold mb-3 text-slate-300'>
														Last Name
													</label>
													<input
														id='lastName'
														type='text'
														className='w-full bg-slate-800/80 border border-purple-500/30 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
														placeholder='Doe'
														required
													/>
												</div>
											</div>

											<div>
												<label
													htmlFor='email'
													className='block text-base font-semibold mb-3 text-slate-300'>
													Email Address
												</label>
												<input
													id='email'
													type='email'
													className='w-full bg-slate-800/80 border border-purple-500/30 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
													placeholder='john@example.com'
													required
												/>
											</div>

											{paymentMethod === 'card' && (
												<>
													<div>
														<label
															htmlFor='cardNumber'
															className='block text-base font-semibold mb-3 text-slate-300'>
															Card Number
														</label>
														<input
															id='cardNumber'
															type='text'
															className='w-full bg-slate-800/80 border border-purple-500/30 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
															placeholder='1234 5678 9012 3456'
															required
														/>
													</div>
													<div className='grid md:grid-cols-2 gap-6'>
														<div>
															<label
																htmlFor='expiryDate'
																className='block text-base font-semibold mb-3 text-slate-300'>
																Expiry Date
															</label>
															<input
																id='expiryDate'
																type='text'
																className='w-full bg-slate-800/80 border border-purple-500/30 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
																placeholder='MM/YY'
																required
															/>
														</div>
														<div>
															<label
																htmlFor='securityCode'
																className='block text-base font-semibold mb-3 text-slate-300'>
																Security Code
															</label>
															<input
																id='securityCode'
																type='text'
																className='w-full bg-slate-800/80 border border-purple-500/30 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
																placeholder='123'
																required
															/>
														</div>
													</div>
												</>
											)}

											{/* Enhanced Promo Code */}
											<div>
												{!showPromoInput ? (
													<button
														type='button'
														onClick={() => setShowPromoInput(true)}
														className='text-purple-400 hover:text-purple-300 flex items-center gap-3 transition-colors text-lg'>
														<Gift className='w-5 h-5' aria-hidden='true' />
														Have a promo code?
													</button>
												) : (
													<div className='flex gap-4'>
														<input
															type='text'
															value={promoCode}
															onChange={(e) => setPromoCode(e.target.value)}
															placeholder='Enter promo code'
															className='flex-1 bg-slate-800/80 border border-purple-500/30 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white text-lg backdrop-blur-sm'
														/>
														<button
															type='button'
															className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 rounded-2xl transition-colors text-white font-semibold shadow-lg shadow-purple-500/20'>
															Apply
														</button>
													</div>
												)}
											</div>

											{/* Enhanced Complete Purchase Button */}
											<button
												type='submit'
												disabled={isProcessing}
												className={`w-full py-5 rounded-2xl flex items-center justify-center gap-4 text-xl font-semibold transition-all duration-300 ${
													!isProcessing
														? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-400/20 text-white border border-white/10'
														: 'bg-slate-800 cursor-not-allowed text-slate-500 border border-slate-700'
												}`}
												aria-label='Complete purchase'>
												{isProcessing ? (
													<>
														<Clock
															className='w-6 h-6 animate-spin'
															aria-hidden='true'
														/>
														Processing Payment...
													</>
												) : (
													<>
														<span>Complete Purchase</span>
														<ArrowRight
															className='w-6 h-6'
															aria-hidden='true'
														/>
													</>
												)}
											</button>
										</form>
									</div>
								)}

								{/* Step 4: Enhanced Confirmation */}
								{currentStep === 'confirmation' && (
									<div className='text-center max-w-3xl mx-auto space-y-10'>
										<div className='relative'>
											<div className='w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-400/30 border-2 border-white/10'>
												<CheckCircle2
													className='w-16 h-16 text-white'
													aria-hidden='true'
												/>
											</div>
											<div className='absolute inset-0 w-32 h-32 mx-auto rounded-full bg-purple-500/20 animate-ping' />
										</div>

										<div className='space-y-6'>
											<h2 className='text-5xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent'>
												Upgrade Successful!
											</h2>
											<p className='text-2xl text-slate-300'>
												Welcome to {selectedPlan.name}! 🎉
											</p>
											<p className='text-slate-400 text-lg leading-relaxed'>
												You will receive a confirmation email shortly with all
												the details and your new premium features are now
												active.
											</p>
										</div>

										<div className='bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm relative overflow-hidden'>
											<div className='absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5'></div>
											<div className='relative z-10'>
												<h3 className='text-xl font-semibold mb-6 text-slate-200 flex items-center gap-3'>
													<Sparkles
														className='w-6 h-6 text-purple-400'
														aria-hidden='true'
													/>
													What&apos;s Next?
												</h3>
												<div className='space-y-5 text-left'>
													<div className='flex items-center gap-4'>
														<div className='w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20'>
															<Sparkles
																className='w-6 h-6 text-white'
																aria-hidden='true'
															/>
														</div>
														<span className='text-slate-300 text-lg'>
															Explore your new premium features
														</span>
													</div>
													<div className='flex items-center gap-4'>
														<div className='w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20'>
															<Shield
																className='w-6 h-6 text-white'
																aria-hidden='true'
															/>
														</div>
														<span className='text-slate-300 text-lg'>
															Check your email for receipt and setup guide
														</span>
													</div>
													<div className='flex items-center gap-4'>
														<div className='w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20'>
															<Users
																className='w-6 h-6 text-white'
																aria-hidden='true'
															/>
														</div>
														<span className='text-slate-300 text-lg'>
															Join our premium community for exclusive tips
														</span>
													</div>
												</div>
											</div>
										</div>

										<button
											onClick={() => window.location.reload()}
											className='bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 px-12 py-5 rounded-2xl transition-all duration-300 font-semibold text-xl shadow-2xl hover:shadow-purple-400/20 text-white border border-white/10'
											aria-label='Start using premium features'>
											Start Using Premium Features
										</button>
									</div>
								)}
							</div>

							{/* Enhanced Error Message */}
							{error && (
								<div
									className='mt-8 bg-red-900/40 border border-red-600/60 text-red-400 p-6 rounded-2xl flex items-center justify-between backdrop-blur-sm relative overflow-hidden'
									role='alert'
									aria-live='assertive'>
									<div className='absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10'></div>
									<span className='text-lg relative z-10'>{error}</span>
									<button
										onClick={() => setError(null)}
										className='hover:bg-red-800/50 p-2 rounded-xl transition-colors relative z-10'
										aria-label='Dismiss error message'>
										<X className='w-5 h-5' aria-hidden='true' />
									</button>
								</div>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default PlanConfirmationPage;
