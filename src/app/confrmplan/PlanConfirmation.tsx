'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	CheckCircle2,
	ArrowRight,
	CreditCard,
	Clock,
	Users,
	Gift,
	AlertCircle,
	Crown,
	Shield,
	X,
} from 'lucide-react';
import Image from 'next/image';

// Types
type BillingCycle = 'monthly' | 'annual';
type PaymentMethod = 'card' | 'paypal' | 'crypto' | null;

interface Plan {
	name: string;
	price: number;
	type: 'Free' | 'Recommended' | 'Custom';
	description: string;
	features: string[];
	icon: JSX.Element;
	ctaText: string;
}

const plans: Plan[] = [
	{
		name: 'Basic Plan',
		price: 0,
		type: 'Free',
		description: 'For users who want to discover new products and services',
		features: [
			'Access targeted ads',
			'Get 1 ad per day',
			'Referral and commissions',
			'Join the adzpay community',
			'SMS & WhatsApp Campaigns',
			'Phone support',
		],
		icon: <Users className='w-5 h-5 text-blue-400' />,
		ctaText: 'Get Started',
	},
	{
		name: 'Starter',
		price: 11,
		type: 'Recommended',
		description: 'Ideal for growing businesses',
		features: [
			'Includes all Free plan features',
			'Share up to 5 ads per day',
			'Earn from referral',
			'Advanced statistics',
			'Support from the adzpay team',
			'Early access to new features',
		],
		icon: <Crown className='w-5 h-5 text-yellow-400' />,
		ctaText: 'Get Started',
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
			'Personalized support',
		],
		icon: <Shield className='w-5 h-5 text-purple-400' />,
		ctaText: 'Contact Sales',
	},
];

const PlanConfirmationPage = () => {
	const [selectedPlan, setSelectedPlan] = useState<
		Plan & { billingCycle: BillingCycle }
	>({ ...plans[1], billingCycle: 'monthly' });
	const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
	const [promoCode, setPromoCode] = useState('');
	const [showPromoInput, setShowPromoInput] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const calculatePrice = (basePrice: number, cycle: BillingCycle): string => {
		if (cycle === 'annual') {
			const annualPrice = basePrice * 12;
			const discount = annualPrice * 0.2;
			return (annualPrice - discount).toFixed(2);
		}
		return basePrice.toFixed(2);
	};

	const handlePlanSelect = (plan: Plan) => {
		setSelectedPlan({ ...plan, billingCycle });
	};

	const handlePurchase = async () => {
		setIsProcessing(true);
		setError(null);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setIsSuccess(true);
		} catch (err) {
			setError('An error occurred during purchase. Please try again.');
		} finally {
			setIsProcessing(false);
		}
	};

	const ErrorMessage = () =>
		error ? (
			<div className='bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-lg mt-4 flex items-center justify-between'>
				<span>{error}</span>
				<button onClick={() => setError(null)}>
					<X className='w-4 h-4' />
				</button>
			</div>
		) : null;

	const SuccessModal = () => (
		<AnimatePresence>
			{isSuccess && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50'>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className='bg-gray-800 p-8 rounded-2xl text-center max-w-md mx-4'>
						<CheckCircle2 className='w-16 h-16 text-green-500 mx-auto mb-4' />
						<h3 className='text-2xl font-bold mb-2'>Purchase Successful!</h3>
						<p className='text-gray-400 mb-6'>
							Thank you for choosing our service. You will receive a
							confirmation email shortly.
						</p>
						<button
							onClick={() => setIsSuccess(false)}
							className='bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
							Get Started
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	const renderPlanCard = (plan: Plan) => (
		<motion.div
			key={plan.name}
			onClick={() => handlePlanSelect(plan)}
			className={`
					relative border rounded-2xl p-6 cursor-pointer transition-all
					${
						selectedPlan.name === plan.name
							? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
							: 'bg-gray-800/60 border-gray-700 hover:bg-gray-800/80'
					}
				`}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}>
			{plan.type === 'Recommended' && (
				<div
					className='absolute -top-3 left-1/2 transform -translate-x-1/2 
					bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs 
					px-3 py-1 rounded-full flex items-center gap-1'>
					<Crown size={12} />
					Most Popular
				</div>
			)}

			<div className='flex justify-between items-center mb-4'>
				<div className='flex items-center gap-2'>
					{plan.icon}
					<h3 className='text-xl font-semibold'>{plan.name}</h3>
				</div>
				{selectedPlan.name === plan.name && (
					<CheckCircle2 className='text-green-500' />
				)}
			</div>

			<p className='text-sm text-gray-400 mb-4'>{plan.description}</p>

			<div className='text-3xl font-bold mb-6 text-blue-400'>
				${calculatePrice(plan.price, billingCycle)}
				<span className='text-sm text-gray-400 ml-2'>
					/{billingCycle === 'annual' ? 'year' : 'month'}
				</span>
				{billingCycle === 'annual' && plan.price > 0 && (
					<div className='text-sm text-green-500 mt-1'>
						Save ${(plan.price * 12 * 0.2).toFixed(2)} per year
					</div>
				)}
			</div>

			<ul className='space-y-3 text-gray-300 text-sm mb-6'>
				{plan.features.map((feature, index) => (
					<li key={index} className='flex items-center'>
						<CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
						{feature}
					</li>
				))}
			</ul>

			<button
				className={`
					w-full py-2 rounded-lg transition-colors
					${
						plan.type === 'Recommended'
							? 'bg-blue-600 hover:bg-blue-700 text-white'
							: 'bg-gray-700 hover:bg-gray-600 text-gray-200'
					}
				`}>
				{plan.ctaText}
			</button>
		</motion.div>
	);

	const PaymentSection = () => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mt-8'>
			<div className='grid md:grid-cols-2 gap-6'>
				{/* Order Summary */}
				<div className='space-y-4'>
					<h3 className='text-xl font-semibold'>Order Summary</h3>
					<div className='bg-gray-900/50 p-4 rounded-xl space-y-2'>
						<div className='flex justify-between'>
							<span className='text-gray-400'>Plan</span>
							<span>{selectedPlan.name}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-400'>Billing</span>
							<span className='capitalize'>{billingCycle}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-400'>Amount</span>
							<span>${calculatePrice(selectedPlan.price, billingCycle)}</span>
						</div>
					</div>

					<div className='flex items-center gap-2 text-sm text-gray-400'>
						<Clock size={16} />
						<span>14-day money-back guarantee</span>
					</div>
				</div>

				{/* Payment Methods */}
				<div className='space-y-4'>
					<h3 className='text-xl font-semibold'>Payment Method</h3>
					<div className='space-y-3'>
						{['card', 'paypal', 'crypto'].map((method) => (
							<button
								key={method}
								onClick={() => setPaymentMethod(method as PaymentMethod)}
								className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
									paymentMethod === method
										? 'border-blue-500 bg-blue-600/20'
										: 'border-gray-700 hover:bg-gray-800'
								}`}>
								<div className='flex items-center gap-3'>
									{method === 'card' && <CreditCard className='w-5 h-5' />}
									{method === 'paypal' && (
										<Image
											src='/images/paypal.svg'
											alt='PayPal'
											width={20}
											height={20}
										/>
									)}
									{method === 'crypto' && (
										<Image
											src='/images/crypto.avif'
											alt='Crypto'
											width={20}
											height={20}
										/>
									)}
									<span className='capitalize'>{method}</span>
								</div>
								{paymentMethod === method && (
									<CheckCircle2 className='text-green-500' />
								)}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Promo Code */}
			<div className='mt-6'>
				{!showPromoInput ? (
					<button
						onClick={() => setShowPromoInput(true)}
						className='flex items-center gap-2 text-gray-400 hover:text-white'>
						<Gift size={16} />
						<span>Add promo code</span>
					</button>
				) : (
					<div className='flex gap-2'>
						<input
							type='text'
							value={promoCode}
							onChange={(e) => setPromoCode(e.target.value)}
							placeholder='Enter promo code'
							className='flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2'
						/>
						<button className='bg-blue-600 px-4 rounded-lg hover:bg-blue-700'>
							Apply
						</button>
					</div>
				)}
			</div>

			{/* Action Button */}
			<button
				onClick={handlePurchase}
				disabled={!paymentMethod || isProcessing}
				className={`
					w-full mt-6 py-3 rounded-xl flex items-center justify-center gap-2
					transition-all
					${
						paymentMethod && !isProcessing
							? 'bg-blue-600 hover:bg-blue-700'
							: 'bg-gray-700 cursor-not-allowed'
					}
				`}>
				{isProcessing ? (
					<>
						<span>Processing...</span>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
							<Clock className='w-5 h-5' />
						</motion.div>
					</>
				) : (
					<>
						<span>Complete Purchase</span>
						<ArrowRight className='w-5 h-5' />
					</>
				)}
			</button>
		</motion.div>
	);

	return (
		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white'>
			<div className='container mx-auto px-4 pt-24 pb-12'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='space-y-8 max-w-7xl mx-auto'>
					{/* Header */}
					<div className='text-center space-y-4'>
						<h1 className='text-4xl font-bold mb-2'>Choose Your Plan</h1>
						<p className='text-gray-400 max-w-2xl mx-auto'>
							Select the perfect plan for your advertising needs
						</p>
					</div>

					{/* Billing Toggle */}
					<div className='flex justify-center gap-4'>
						<button
							onClick={() => setBillingCycle('monthly')}
							className={`px-4 py-2 rounded-lg ${
								billingCycle === 'monthly'
									? 'bg-blue-600 text-white'
									: 'bg-gray-800 text-gray-400'
							}`}>
							Monthly
						</button>
						<button
							onClick={() => setBillingCycle('annual')}
							className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
								billingCycle === 'annual'
									? 'bg-blue-600 text-white'
									: 'bg-gray-800 text-gray-400'
							}`}>
							Annual
							<span className='text-xs bg-green-500 text-white px-2 py-1 rounded-full'>
								Save 20%
							</span>
						</button>
					</div>

					{/* Plan Cards */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{plans.map((plan) => renderPlanCard(plan))}
					</div>

					<ErrorMessage />
					<PaymentSection />
					<SuccessModal />
				</motion.div>
			</div>
		</div>
	);
};

export default PlanConfirmationPage;
