'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { CheckCircle2, ArrowRight, CreditCard, Clock, X } from 'lucide-react';
import Image from 'next/image';
import {
	InternationalPaymentSupport,
	LegalComplianceModal as Legal,
	PaymentDetailsForm,
	TaxAndInvoiceCalculator as TaxInvoice,
	BillingToggle,
	PlanCards,
	PlanIcon,
} from '@/app/components/Payment';

// Types
type BillingCycle = 'monthly' | 'annual';
type PaymentMethod = 'card' | 'paypal' | 'crypto' | null;

import {
	Plan,
	BasicIcon,
	ProIcon,
	EnterpriseIcon,
} from '@/app/components/Payment/PlanIcon';

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
		icon: <BasicIcon />,
		iconType: 'basic',
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
		icon: <ProIcon />,
		iconType: 'pro',
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
		icon: <EnterpriseIcon />,
		iconType: 'enterprise',
		ctaText: 'Contact Sales',
	},
];

const PlanConfirmationPage = () => {
	const [selectedPlan, setSelectedPlan] = useState<
		Plan & { billingCycle: BillingCycle }
	>({
		...plans[1],
		billingCycle: 'monthly',
	});
	const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
	const [promoCode, setPromoCode] = useState('');
	const [showPromoInput, setShowPromoInput] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const [isLegalOpen, setIsLegalOpen] = useState(false);
	const [legalConsent, setLegalConsent] = useState(false);
	const [paymentInfo, setPaymentInfo] = useState(null);
	const [taxDetails, setTaxDetails] = useState(null);
	const [convertedPrice, setConvertedPrice] = useState({
		currency: 'USD',
		amount: selectedPlan.price,
	});

	// Handle currency conversion
	const handleCurrencyChange = ({ currency, convertedPrice }) => {
		setConvertedPrice({
			currency,
			amount: convertedPrice,
		});
	};

	// Handle payment submission
	const handlePaymentSubmit = async () => {
		if (!legalConsent || !paymentInfo || !taxDetails) {
			setError('Please complete all required fields');
			return;
		}

		setIsProcessing(true);
		// ... rest of your payment processing logic
	};

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

	const handlePaymentMethodChange = (method: PaymentMethod) => {
		setPaymentMethod(method);
	};

	return (
		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white'>
			<div className='container mx-auto px-4 pt-24 pb-12'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='space-y-8 max-w-7xl mx-auto'>
					{/* Plan Selection Section */}
					<div className='space-y-6'>
						<BillingToggle
							billingCycle={billingCycle}
							onChange={setBillingCycle}
						/>
						<PlanCards
							selectedPlan={selectedPlan}
							onSelect={setSelectedPlan}
							billingCycle={billingCycle}
							plans={plans}
						/>
					</div>

					{/* Payment Processing Section */}
					<div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8'>
						{/* Order Summary */}
						<div className='mb-8'>
							<h3 className='text-xl font-semibold mb-4'>Order Summary</h3>
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
									<span>
										${calculatePrice(selectedPlan.price, billingCycle)}
									</span>
								</div>
							</div>

							<div className='flex items-center gap-2 text-sm text-gray-400 mt-4'>
								<Clock size={16} />
								<span>14-day money-back guarantee</span>
							</div>
						</div>

						{/* Payment Method Selection */}
						<div className='mb-8'>
							<h3 className='text-xl font-semibold mb-4'>Payment Method</h3>
							<div className='grid gap-4'>
								{['card', 'paypal', 'crypto'].map((method) => (
									<button
										key={method}
										onClick={() =>
											handlePaymentMethodChange(method as PaymentMethod)
										}
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

						{/* Additional Payment Details */}
						{paymentMethod && (
							<div className='space-y-6'>
								<InternationalPaymentSupport
									basePrice={selectedPlan.price}
									onCurrencyChange={handleCurrencyChange}
								/>

								<PaymentDetailsForm
									paymentMethod={paymentMethod}
									selectedPlan={selectedPlan}
									onSubmit={setPaymentInfo}
								/>

								<TaxInvoice
									plan={selectedPlan}
									billingCycle={billingCycle}
									paymentMethod={paymentMethod}
								/>
							</div>
						)}

						{/* Promo Code Section */}
						<div className='mt-6'>
							{!showPromoInput ? (
								<button
									onClick={() => setShowPromoInput(true)}
									className='text-sm text-blue-400 hover:text-blue-300'>
									Have a promo code?
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

						{/* Complete Purchase Button */}
						<button
							onClick={handlePurchase}
							disabled={
								!paymentMethod || !paymentInfo || !legalConsent || isProcessing
							}
							className={`
								w-full mt-6 py-3 rounded-xl flex items-center justify-center gap-2
								transition-all
								${
									paymentMethod && paymentInfo && legalConsent && !isProcessing
										? 'bg-blue-600 hover:bg-blue-700'
										: 'bg-gray-700 cursor-not-allowed'
								}
							`}>
							{isProcessing ? (
								<>
									<span>Processing...</span>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: 'linear',
										}}>
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
					</div>

					{/* Legal Modal */}
					<Legal
						isOpen={isLegalOpen}
						onClose={() => setIsLegalOpen(false)}
						onAccept={() => {
							setLegalConsent(true);
							setIsLegalOpen(false);
						}}
					/>

					{/* Error and Success Components */}
					<ErrorMessage />
					<SuccessModal />
				</motion.div>
			</div>
		</div>
	);
};

export default PlanConfirmationPage;
