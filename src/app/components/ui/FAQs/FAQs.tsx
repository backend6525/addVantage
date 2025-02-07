'use client';

import React, { useState } from 'react';
import {
	HelpCircle,
	MessageCircle,
	ChevronDown,
	Plus,
	Minus,
} from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
	q: string;
	a: string;
	icon: React.ElementType;
	gradient: string;
	category?: string;
}

const FAQs = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [activeCategory, setActiveCategory] = useState<string>('All');

	const categories = ['All', 'General', 'Pricing', 'Technical', 'Support'];

	const faqsList: FAQ[] = [
		{
			q: 'What is adzpay and how does it work?',
			a: 'adzpay is a revolutionary platform that connects users with targeted ads. Share ads you love, earn rewards, and help brands reach their perfect audience.',
			icon: HelpCircle,
			gradient: 'from-primary/20 via-secondary/10 to-accent/20',
			category: 'General',
		},
		{
			q: 'How do I earn money with adzpay?',
			a: 'Earn by sharing ads with your network. When someone engages with your shared ad, you earn a commission. The more engagement, the more you earn!',
			icon: MessageCircle,
			gradient: 'from-secondary/20 via-accent/10 to-primary/20',
			category: 'Pricing',
		},
		{
			q: 'Is there a minimum payout threshold?',
			a: 'Yes, the minimum payout is $10. Once you reach this threshold, you can withdraw your earnings through various payment methods including PayPal and bank transfer.',
			icon: HelpCircle,
			gradient: 'from-accent/20 via-primary/10 to-secondary/20',
			category: 'Pricing',
		},
		{
			q: 'Can I use adzpay on multiple devices?',
			a: 'Absolutely! adzpay is accessible across all devices. Use it on your phone, tablet, or computer - your account syncs seamlessly.',
			icon: MessageCircle,
			gradient: 'from-primary/20 via-accent/10 to-secondary/20',
			category: 'Technical',
		},
	];

	const filteredFaqs =
		activeCategory === 'All'
			? faqsList
			: faqsList.filter((faq) => faq.category === activeCategory);

	return (
		<section className='section-transition'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4'>
				<div className='text-center max-w-2xl mx-auto mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-gradient'>
						Frequently Asked Questions
					</h2>
					<p className='text-lg text-muted-foreground'>
						Everything you need to know about adzpay and how it works
					</p>
				</div>

				{/* Category Filter */}
				<div className='flex flex-wrap justify-center gap-4 mb-12'>
					{categories.map((category) => (
						<Button
							key={category}
							variant={activeCategory === category ? 'gradient' : 'outline'}
							className='transition-all duration-300'
							onClick={() => setActiveCategory(category)}>
							{category}
						</Button>
					))}
				</div>

				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
						<AnimatePresence>
							{filteredFaqs.map((faq, idx) => {
								const Icon = faq.icon;
								const isOpen = openIndex === idx;

								return (
									<motion.div
										key={idx}
										layout
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3, delay: idx * 0.1 }}
										className={`group hover-card glass ${
											isOpen ? 'border-primary' : ''
										}`}
										onClick={() => setOpenIndex(isOpen ? null : idx)}>
										{/* Gradient Background */}
										<div
											className={`absolute inset-0 opacity-0 group-hover:opacity-10 ${
												isOpen ? 'opacity-10' : ''
											} bg-gradient-to-br ${
												faq.gradient
											} transition-opacity duration-500`}
										/>

										<div className='relative p-6'>
											<div className='flex items-center gap-4 mb-4'>
												<div
													className={`p-3 rounded-xl bg-background/50 text-primary group-hover:scale-110 transform transition-transform duration-300`}>
													<Icon className='w-6 h-6' />
												</div>
												<h3 className='text-xl font-semibold text-foreground group-hover:text-primary transition-colors flex-1'>
													{faq.q}
												</h3>
												{isOpen ? (
													<Minus className='w-5 h-5 text-primary transition-transform duration-300' />
												) : (
													<Plus className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform duration-300' />
												)}
											</div>

											<AnimatePresence>
												{isOpen && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: 'auto', opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.3 }}
														className='overflow-hidden'>
														<p className='text-muted-foreground leading-relaxed'>
															{faq.a}
														</p>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
				</LayoutEffect>

				{/* Contact Support Section */}
				<div className='mt-16 text-center'>
					<div className='inline-block glass p-8 rounded-2xl hover:border-primary/50 transition-all duration-300'>
						<h3 className='text-2xl font-semibold text-foreground mb-4'>
							Still have questions?
						</h3>
						<p className='text-muted-foreground mb-6'>
							Cant find the answer youre looking for? Our support team is here
							to help.
						</p>
						<Button className='group gap-2 hover:scale-105 transition-all duration-300'>
							<MessageCircle className='w-5 h-5' />
							Contact Support
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

FAQs.displayName = 'FAQs';
export default FAQs;
