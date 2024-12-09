// 'use client';

// import React from 'react';
// import LayoutEffect from '@/app/components/LayoutEffect';

// const faqsList = [
// 	{
// 		q: 'What is adzpay?',
// 		a: 'adzpay is a revolutionary peer-to-peer marketing platform that connects you with brands and empowers your network. It allows you to discover relevant ads, share them with your network, and earn rewards for successful referrals and even direct sales',
// 	},
// 	{
// 		q: 'How does adzpay work?',
// 		a: 'Discover: Explore a personalized feed of advertisements tailored to your interests. Find exciting products and services you genuinely believe in',
// 	},
// 	{
// 		q: 'Who can use adzpay?',
// 		a: "Anyone! Whether you're a social media influencer, a tech enthusiast, a college student, or simply someone looking for exciting products and rewards, adzpay offers a unique opportunity to connect with brands and earn money.",
// 	},
// 	{
// 		q: 'Is it free to use adzpay?',
// 		a: 'Absolutely! Signing up and browsing ads on adzpay is completely free. You only start earning rewards when your network engages with the ads you share.',
// 	},
// 	{
// 		q: 'What types of ads will I see on adzpay?',
// 		a: "adzpay prioritizes your interests. You'll see a curated selection of ads for products and services that align with your preferences. This ensures a more relevant and engaging experience.",
// 	},
// 	{
// 		q: 'How do I share ads with my network?',
// 		a: 'Sharing ads on adzpay is super easy! You can seamlessly share them through your preferred platform – social media, messaging apps, or even by copying and pasting the link directly.',
// 	},
// ];

// const FAQs = () => (
// 	<section className='custom-screen text-gray-300'>
// 		<div className='max-w-xl text-center xl:mx-auto'>
// 			<h2 className='text-gray-50 text-3xl font-extrabold sm:text-4xl'>
// 				Everything you need to know
// 			</h2>
// 			<p className='mt-3'>
// 				Here are the most questions people always ask about.
// 			</p>
// 		</div>
// 		<div className='mt-12'>
// 			<LayoutEffect
// 				className='duration-1000 delay-300'
// 				isInviewState={{
// 					trueState: 'opacity-1',
// 					falseState: 'opacity-0 translate-y-12',
// 				}}>
// 				<ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
// 					{faqsList.map((item, idx) => (
// 						<li key={idx} className='space-y-3'>
// 							<summary className='flex items-center justify-between font-semibold text-gray-100'>
// 								{item.q}
// 							</summary>
// 							<p
// 								dangerouslySetInnerHTML={{ __html: item.a }}
// 								className='leading-relaxed'></p>
// 						</li>
// 					))}
// 				</ul>
// 			</LayoutEffect>
// 		</div>
// 	</section>
// );
// FAQs.displayName = 'FAQs';
// export default FAQs;

'use client';

import React, { useState } from 'react';
import {
	ChevronDown,
	HelpCircle,
	MessageCircle,
	Users,
	Zap,
} from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';

interface FAQ {
	q: string;
	a: string;
	icon: React.ElementType;
	gradient: string;
}

const FAQs = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const faqsList: FAQ[] = [
		{
			q: 'What is adzpay and how does it work?',
			a: 'adzpay is a revolutionary platform that connects users with targeted ads. Share ads you love, earn rewards, and help brands reach their perfect audience.',
			icon: HelpCircle,
			gradient: 'from-purple-500/20 via-pink-500/10 to-blue-500/20',
		},
		{
			q: 'How do I earn money with adzpay?',
			a: 'Earn by sharing ads with your network. When someone engages with your shared ad, you earn a commission. The more engagement, the more you earn!',
			icon: Zap,
			gradient: 'from-blue-500/20 via-cyan-500/10 to-teal-500/20',
		},
		{
			q: 'Is there a minimum payout threshold?',
			a: 'Yes, the minimum payout is $10. Once you reach this threshold, you can withdraw your earnings through various payment methods including PayPal and bank transfer.',
			icon: MessageCircle,
			gradient: 'from-teal-500/20 via-green-500/10 to-emerald-500/20',
		},
		{
			q: 'Can I use adzpay on multiple devices?',
			a: 'Absolutely! adzpay is accessible across all devices. Use it on your phone, tablet, or computer - your account syncs seamlessly.',
			icon: Users,
			gradient: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
		},
	];

	return (
		<section className='relative py-32 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4'>
				<div className='text-center max-w-2xl mx-auto mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400'>
						Frequently Asked Questions
					</h2>
					<p className='text-lg text-gray-300'>
						Everything you need to know about adzpay and how it works
					</p>
				</div>

				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
						{faqsList.map((faq, idx) => {
							const Icon = faq.icon;
							const isOpen = openIndex === idx;

							return (
								<div
									key={idx}
									className={`group relative bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 ${
										isOpen ? 'border-purple-500/50' : ''
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
												className={`p-3 rounded-xl bg-gray-800/50 text-purple-400 group-hover:scale-110 transform transition-transform duration-300`}>
												<Icon className='w-6 h-6' />
											</div>
											<h3 className='text-xl font-semibold text-white group-hover:text-purple-400 transition-colors flex-1'>
												{faq.q}
											</h3>
											<ChevronDown
												className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
													isOpen ? 'rotate-180' : ''
												}`}
											/>
										</div>

										<div
											className={`overflow-hidden transition-all duration-300 ${
												isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
											}`}>
											<p className='text-gray-300 leading-relaxed'>{faq.a}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</LayoutEffect>

				{/* Contact Support Section */}
				<div className='mt-16 text-center'>
					<div className='inline-block p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300'>
						<h3 className='text-2xl font-semibold text-white mb-4'>
							Still have questions?
						</h3>
						<p className='text-gray-300 mb-6'>
							Cant find the answer youre looking for? Our support team is here
							to help.
						</p>
						<button className='inline-flex items-center px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25'>
							<MessageCircle className='w-5 h-5 mr-2' />
							Contact Support
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

FAQs.displayName = 'FAQs';
export default FAQs;
