'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	HelpCircle,
	MessageCircle,
	ChevronDown,
	ChevronRight,
	Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LayoutEffect from '@/app/components/LayoutEffect';

interface FAQ {
	q: string;
	a: string;
	icon: React.ElementType;
	gradient: string;
	category: string;
}

const FAQs = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [activeCategory, setActiveCategory] = useState<string>('All');

	const categories = ['All', 'General', 'Pricing', 'Technical', 'Support'];

	const faqsList: FAQ[] = [
		{
			q: 'What is AddVantage and how does it work?',
			a: 'AddVantage is a revolutionary platform that connects users with targeted ads. Share ads you love, earn rewards, and help brands reach their perfect audience.',
			icon: HelpCircle,
			gradient: 'from-blue-400/20 via-blue-300/10 to-blue-500/20',
			category: 'General',
		},
		{
			q: 'How do I earn money with AddVantage?',
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
			q: 'Can I use AddVantage on multiple devices?',
			a: 'Absolutely! AddVantage is accessible across all devices. Use it on your phone, tablet, or computer - your account syncs seamlessly.',
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
				{/* Connecting gradients */}
				<div className='absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/50 to-slate-900/0' />
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-100 translate-y-0',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='text-center mb-12'>
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='inline-flex items-center gap-2 bg-gradient-to-r from-slate-800/90 to-slate-800/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-slate-700/50 shadow-lg'>
							<Sparkles className='w-4 h-4 text-blue-400' />
							<span className='text-sm font-medium bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent'>
								Common Questions
							</span>
						</motion.div>
						<h2 className='text-4xl font-bold mb-6'>
							<span className='bg-gradient-to-r from-slate-100 via-slate-300 to-purple-400 bg-clip-text text-transparent inline-block'>
								Frequently Asked Questions
							</span>
						</h2>
						<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
							Everything you need to know about AddVantage and how it works
						</p>
					</div>

					{/* Enhanced Category Filter */}
					<div className='flex flex-wrap justify-center gap-4 mb-12'>
						{categories.map((category) => (
							<motion.button
								key={category}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setActiveCategory(category)}
								className={`px-6 py-2 rounded-full transition-all duration-300 ${
									activeCategory === category
										? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
										: 'bg-slate-800/50 text-slate-300 hover:text-slate-100 border border-slate-700/50'
								}`}>
								{category}
							</motion.button>
						))}
					</div>

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
									initial={false}
									animate={{
										backgroundColor: isOpen
											? 'rgba(30, 41, 59, 0.8)'
											: 'rgba(30, 41, 59, 0.5)',
									}}
									className='relative overflow-hidden backdrop-blur-sm rounded-2xl border border-slate-700/50 transition-all duration-300'>
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
					<div className='mt-12 text-center'>
						<p className='text-lg text-slate-300 mb-8'>
							Still have questions? We&apos;re here to help!
						</p>
						<Button className='group gap-2 text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300'>
							Contact Support
							<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
						</Button>
					</div>
				</LayoutEffect>
			</div>
		</section>
	);
};

FAQs.displayName = 'FAQs';
export default FAQs;
