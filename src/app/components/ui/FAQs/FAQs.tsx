'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	HelpCircle,
	MessageCircle,
	ChevronDown,
	ChevronRight,
	Sparkles,
	X,
	Send,
	User,
	Mail,
	MessageSquare,
	AlertCircle,
	CheckCircle,
} from 'lucide-react';

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

// Consistent badge component
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

interface FAQ {
	q: string;
	a: string;
	icon: React.ElementType;
	gradient: string;
	category: string;
}

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	priority: 'low' | 'medium' | 'high';
}

const ContactSupportModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const [formData, setFormData] = useState<ContactFormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
		priority: 'medium',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState<Partial<ContactFormData>>({});

	const validateForm = (): boolean => {
		const newErrors: Partial<ContactFormData> = {};

		if (!formData.name.trim()) newErrors.name = 'Name is required';
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}
		if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
		if (!formData.message.trim()) newErrors.message = 'Message is required';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setIsSubmitted(true);

		// Reset form after success
		setTimeout(() => {
			setIsSubmitted(false);
			setFormData({
				name: '',
				email: '',
				subject: '',
				message: '',
				priority: 'medium',
			});
			onClose();
		}, 2000);
	};

	const handleInputChange = (field: keyof ContactFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: '' }));
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
			{/* Backdrop */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='absolute inset-0 bg-black/60 backdrop-blur-sm'
				onClick={onClose}
			/>

			{/* Modal */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 20 }}
				className='relative w-full max-w-2xl bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-700/50'>
					<div>
						<h3 className='text-2xl font-bold text-slate-100'>
							Contact Support
						</h3>
						<p className='text-slate-300 mt-1'>Get help from our AdZPay team</p>
					</div>
					<button
						onClick={onClose}
						className='p-2 hover:bg-slate-800 rounded-lg transition-colors'>
						<X className='w-5 h-5 text-slate-400' />
					</button>
				</div>

				{/* Success State */}
				<AnimatePresence>
					{isSubmitted && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='absolute inset-0 bg-slate-900/95 backdrop-blur-md flex items-center justify-center rounded-2xl'>
							<div className='text-center'>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.2 }}
									className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
									<CheckCircle className='w-8 h-8 text-green-400' />
								</motion.div>
								<h4 className='text-xl font-semibold text-slate-100 mb-2'>
									Message Sent!
								</h4>
								<p className='text-slate-300'>
									We&apos;ll get back to you within 24 hours.
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Form */}
				<div className='p-6 space-y-6'>
					{/* Name and Email Row */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-slate-200 mb-2'>
								<User className='w-4 h-4 inline mr-2' />
								Full Name
							</label>
							<input
								type='text'
								value={formData.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
								className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
									errors.name ? 'border-red-500' : 'border-slate-600'
								}`}
								placeholder='Enter your full name'
							/>
							{errors.name && (
								<p className='text-red-400 text-sm mt-1 flex items-center gap-1'>
									<AlertCircle className='w-3 h-3' />
									{errors.name}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-medium text-slate-200 mb-2'>
								<Mail className='w-4 h-4 inline mr-2' />
								Email Address
							</label>
							<input
								type='email'
								value={formData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
									errors.email ? 'border-red-500' : 'border-slate-600'
								}`}
								placeholder='your@email.com'
							/>
							{errors.email && (
								<p className='text-red-400 text-sm mt-1 flex items-center gap-1'>
									<AlertCircle className='w-3 h-3' />
									{errors.email}
								</p>
							)}
						</div>
					</div>

					{/* Subject and Priority Row */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='md:col-span-2'>
							<label className='block text-sm font-medium text-slate-200 mb-2'>
								Subject
							</label>
							<input
								type='text'
								value={formData.subject}
								onChange={(e) => handleInputChange('subject', e.target.value)}
								className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
									errors.subject ? 'border-red-500' : 'border-slate-600'
								}`}
								placeholder='Brief description of your issue'
							/>
							{errors.subject && (
								<p className='text-red-400 text-sm mt-1 flex items-center gap-1'>
									<AlertCircle className='w-3 h-3' />
									{errors.subject}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-medium text-slate-200 mb-2'>
								Priority
							</label>
							<select
								value={formData.priority}
								onChange={(e) => handleInputChange('priority', e.target.value)}
								className='w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
						</div>
					</div>

					{/* Message */}
					<div>
						<label className='block text-sm font-medium text-slate-200 mb-2'>
							<MessageSquare className='w-4 h-4 inline mr-2' />
							Message
						</label>
						<textarea
							value={formData.message}
							onChange={(e) => handleInputChange('message', e.target.value)}
							rows={5}
							className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
								errors.message ? 'border-red-500' : 'border-slate-600'
							}`}
							placeholder='Please describe your issue in detail...'
						/>
						{errors.message && (
							<p className='text-red-400 text-sm mt-1 flex items-center gap-1'>
								<AlertCircle className='w-3 h-3' />
								{errors.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<div className='flex justify-end gap-4 pt-4'>
						<button
							type='button'
							onClick={onClose}
							className='px-6 py-3 text-slate-300 hover:text-slate-100 transition-colors'>
							Cancel
						</button>
						<motion.button
							type='button'
							disabled={isSubmitting}
							onClick={handleSubmit}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 disabled:cursor-not-allowed'>
							{isSubmitting ? (
								<>
									<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
									Sending...
								</>
							) : (
								<>
									<Send className='w-4 h-4' />
									Send Message
								</>
							)}
						</motion.button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

const FAQs = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [activeCategory, setActiveCategory] = useState<string>('All');
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	const categories = ['All', 'General', 'Pricing', 'Technical', 'Support'];

	const faqsList: FAQ[] = [
		{
			q: 'What is AdZPay and how does it work?',
			a: 'AdZPay is a revolutionary platform that connects users with targeted ads. Share ads you love, earn rewards, and help brands reach their perfect audience.',
			icon: HelpCircle,
			gradient: 'from-blue-400/20 via-blue-300/10 to-blue-500/20',
			category: 'General',
		},
		{
			q: 'How do I earn money with AdZPay?',
			a: 'Earn by sharing ads with your network. When someone engages with your shared ad, you earn a commission. The more engagement, the more you earn!',
			icon: MessageCircle,
			gradient: 'from-green-400/20 via-green-300/10 to-green-500/20',
			category: 'Pricing',
		},
		{
			q: 'Is there a minimum payout threshold?',
			a: 'Yes, the minimum payout is $10. Once you reach this threshold, you can withdraw your earnings through various payment methods including PayPal and bank transfer.',
			icon: HelpCircle,
			gradient: 'from-purple-400/20 via-purple-300/10 to-purple-500/20',
			category: 'Pricing',
		},
		{
			q: 'Can I use AdZPay on multiple devices?',
			a: 'Absolutely! AdZPay is accessible across all devices. Use it on your phone, tablet, or computer - your account syncs seamlessly.',
			icon: MessageCircle,
			gradient: 'from-yellow-400/20 via-yellow-300/10 to-yellow-500/20',
			category: 'Technical',
		},
	];

	const filteredFaqs =
		activeCategory === 'All'
			? faqsList
			: faqsList.filter((faq) => faq.category === activeCategory);

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
				{/* Connecting gradients */}
				<div className='absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/50 to-slate-900/0' />
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='duration-1000 delay-300'>
					<motion.div
						className='text-center mb-12'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: DESIGN_TOKENS.animation.duration,
							ease: DESIGN_TOKENS.animation.ease,
						}}
						viewport={{ once: true }}>
						<ConsistentBadge
							text='Common Questions'
							icon={<Sparkles className='w-4 h-4 text-blue-400' />}
						/>
						<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
							<span className='text-slate-100'>Frequently Asked </span>
							<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
								Questions
							</span>
						</h2>
						<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
							Everything you need to know about AdZPay and how it works
						</p>
					</motion.div>

					{/* Enhanced Category Filter */}
					<motion.div
						className='flex flex-wrap justify-center gap-4 mb-12'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: DESIGN_TOKENS.animation.duration,
							delay: 0.1,
							ease: DESIGN_TOKENS.animation.ease,
						}}
						viewport={{ once: true }}>
						{categories.map((category) => (
							<motion.button
								key={category}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setActiveCategory(category)}
								className={`px-6 py-2 rounded-full transition-all duration-300 ${
									activeCategory === category
										? 'bg-blue-600 text-white shadow-lg'
										: 'bg-slate-800/50 text-slate-300 hover:text-slate-100 border border-slate-700/50'
								}`}>
								{category}
							</motion.button>
						))}
					</motion.div>

					{/* Enhanced FAQ List */}
					<div
						className='max-w-3xl mx-auto space-y-4'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}>
						{filteredFaqs.map((faq, idx) => {
							const Icon = faq.icon;
							const isOpen = openIndex === idx;

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
									animate={{
										backgroundColor: isOpen
											? 'rgba(30, 41, 59, 0.8)'
											: 'rgba(30, 41, 59, 0.5)',
									}}
									className='relative overflow-hidden bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 transition-all duration-300'>
									{/* Gradient Background */}
									<motion.div
										className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-0 transition-opacity duration-300`}
										animate={{ opacity: isOpen ? 0.1 : 0 }}
									/>

									<motion.button
										className='relative z-10 flex items-center justify-between w-full p-6 text-left'
										onClick={() => setOpenIndex(isOpen ? null : idx)}>
										<div className='flex items-center gap-4'>
											<div
												className={`p-2 rounded-lg ${
													isOpen
														? 'bg-blue-500/20 text-blue-400'
														: 'bg-slate-700/50 text-slate-400'
												}`}>
												<Icon className='w-5 h-5' />
											</div>
											<h3 className='text-lg font-semibold text-slate-100'>
												{faq.q}
											</h3>
										</div>
										<ChevronDown
											className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
												isOpen ? 'rotate-180' : ''
											}`}
										/>
									</motion.button>

									<AnimatePresence>
										{isOpen && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: 'auto', opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.3 }}
												className='relative z-10'>
												<div className='p-6 pt-0 text-slate-300'>{faq.a}</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							);
						})}
					</div>

					{/* Enhanced CTA Section */}
					<motion.div
						className='mt-12 text-center'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: DESIGN_TOKENS.animation.duration,
							delay: 0.3,
							ease: DESIGN_TOKENS.animation.ease,
						}}
						viewport={{ once: true }}>
						<p className='text-lg text-slate-300 mb-8'>
							Still have questions? We&apos;re here to help!
						</p>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setIsContactModalOpen(true)}
							className='group gap-2 text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl inline-flex items-center'>
							Contact Support
							<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
						</motion.button>
					</motion.div>
				</div>
			</div>

			{/* Contact Support Modal */}
			<AnimatePresence>
				{isContactModalOpen && (
					<ContactSupportModal
						isOpen={isContactModalOpen}
						onClose={() => setIsContactModalOpen(false)}
					/>
				)}
			</AnimatePresence>
		</section>
	);
};

export default FAQs;
