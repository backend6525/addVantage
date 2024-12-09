// 'use client';

// import React from 'react';
// import LayoutEffect from '@/app/components/LayoutEffect';
// import Button from '../Button';

// interface Plan {
// 	name: string;
// 	desc: string;
// 	price: number;
// 	isMostPop: boolean;
// 	features: string[];
// }

// const Pricing: React.FC = () => {
// 	const plans: Plan[] = [
// 		// ... (your plan objects)
// 		{
// 			name: 'Basic plan',
// 			desc: 'For users who want to discover new products and services ',
// 			price: 0,
// 			isMostPop: false,
// 			features: [
// 				'Access targeted ads',
// 				'Get 1 ad per day ',
// 				'Referral and commissions',
// 				'Join the adzpay community',
// 				'SMS & WhatsApp Campaigns',
// 				'Phone support',
// 			],
// 		},
// 		{
// 			name: 'Starter',
// 			desc: 'Ideal for growing businesses',
// 			price: 11,
// 			isMostPop: true,
// 			features: [
// 				'Includes all Free plan features',
// 				'Share up to 5 ads per day',
// 				'Earn from referral',
// 				'Advanced statistics',
// 				'Support from the adzpay team',
// 				'Early access to new features',
// 			],
// 		},
// 		{
// 			name: 'Enterprise',
// 			desc: 'Built for marketing managers',
// 			price: 100,
// 			isMostPop: false,
// 			features: [
// 				'Everything in Starter',
// 				'Share unlimited ads per day',
// 				'Receive personalized support ',
// 				'Sub-account Management',
// 				'Access in-depth reporting tools',
// 				'Personalized support',
// 			],
// 		},
// 	];

// 	const mostPopPricingBg =
// 		'radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)';

// 	return (
// 		<section id='pricing' className='custom-screen'>
// 			<div className='relative max-w-xl mx-auto text-center'>
// 				<h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
// 					Find a plan to power your business
// 				</h2>
// 			</div>
// 			<LayoutEffect
// 				className='duration-1000 delay-300'
// 				isInviewState={{
// 					trueState: 'opacity-1',
// 					falseState: 'opacity-0',
// 				}}>
// 				<div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
// 					{plans.map((item, idx) => (
// 						<div
// 							key={idx}
// 							className={`relative flex-1 flex items-stretch flex-col rounded-xl border border-gray-800 mt-6 sm:mt-0 ${
// 								item.isMostPop ? 'border border-purple-500' : ''
// 							}`}
// 							style={{
// 								backgroundImage: item.isMostPop ? mostPopPricingBg : '',
// 							}}>
// 							<div className='p-8 space-y-4 border-b border-gray-800 text-center'>
// 								<span className='text-purple-600 font-medium'>{item.name}</span>
// 								<div className='text-gray-50 text-3xl font-semibold'>
// 									${item.price}{' '}
// 									<span className='text-xl text-gray-400 font-normal'>/mo</span>
// 								</div>
// 								<p className='text-gray-400'>{item.desc}</p>
// 							</div>
// 							<div className='p-8'>
// 								<ul className='space-y-3'>
// 									{item.features.map((featureItem, idx) => (
// 										<li
// 											key={idx}
// 											className='flex items-center gap-5 text-gray-300'>
// 											<svg
// 												xmlns='http://www.w3.org/2000/svg'
// 												className='h-5 w-5 text-indigo-600'
// 												viewBox='0 0 20 20'
// 												fill='currentColor'>
// 												<path
// 													fillRule='evenodd'
// 													d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
// 													clipRule='evenodd'></path>
// 											</svg>
// 											{featureItem}
// 										</li>
// 									))}
// 								</ul>
// 								<div className='pt-8'>
// 									<Button
// 										className={`w-full rounded-full text-white ring-offset-2 focus:ring ${
// 											item.isMostPop
// 												? 'bg-purple-600 hover:bg-purple-500 focus:bg-purple-700 ring-purple-600'
// 												: 'bg-gray-800 hover:bg-gray-700 ring-gray-800'
// 										}`}>
// 										Get Started
// 									</Button>
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</LayoutEffect>
// 		</section>
// 	);
// };
// Pricing.displayName = 'Pricing';
// export default Pricing;

'use client';

import React from 'react';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';

interface Plan {
	name: string;
	desc: string;
	price: number;
	isMostPop: boolean;
	features: string[];
	icon: React.ElementType;
	gradient: string;
}

const Pricing = () => {
	const plans: Plan[] = [
		{
			name: 'Basic plan',
			desc: 'For users who want to discover new products and services',
			price: 0,
			isMostPop: false,
			icon: Zap,
			gradient: 'from-blue-500/20 via-blue-300/10 to-purple-500/20',
			features: [
				'Access targeted ads',
				'Get 1 ad per day',
				'Referral and commissions',
				'Join the adzpay community',
				'SMS & WhatsApp Campaigns',
				'Phone support',
			],
		},
		{
			name: 'Starter',
			desc: 'Ideal for growing businesses',
			price: 11,
			isMostPop: true,
			icon: Sparkles,
			gradient: 'from-purple-500/20 via-pink-500/10 to-orange-500/20',
			features: [
				'Includes all Free plan features',
				'Share up to 5 ads per day',
				'Earn from referral',
				'Advanced statistics',
				'Support from the adzpay team',
				'Early access to new features',
			],
		},
		{
			name: 'Enterprise',
			desc: 'Built for marketing managers',
			price: 100,
			isMostPop: false,
			icon: Building2,
			gradient: 'from-orange-500/20 via-amber-300/10 to-yellow-500/20',
			features: [
				'Everything in Starter',
				'Share unlimited ads per day',
				'Receive personalized support',
				'Sub-account Management',
				'Access in-depth reporting tools',
				'Personalized support',
			],
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
						Find Your Perfect Plan
					</h2>
					<p className='text-lg text-gray-300'>
						Choose the plan that best fits your needs and start growing your
						business today
					</p>
				</div>

				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{plans.map((plan, idx) => {
							const Icon = plan.icon;
							return (
								<div
									key={idx}
									className={`group relative bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-2xl border ${
										plan.isMostPop ? 'border-purple-500' : 'border-gray-700/50'
									} overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10`}>
									{/* Gradient Background */}
									<div
										className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${plan.gradient} transition-opacity duration-500`}
									/>

									{/* Popular Badge */}
									{plan.isMostPop && (
										<div className='absolute top-0 right-0 bg-purple-500 text-white text-sm font-semibold py-1 px-4 rounded-bl-xl rounded-tr-xl'>
											Most Popular
										</div>
									)}

									<div className='relative p-8'>
										{/* Plan Header */}
										<div className='flex items-center gap-4 mb-6'>
											<div
												className={`p-3 rounded-xl bg-gray-800/50 ${plan.isMostPop ? 'text-purple-400' : 'text-gray-400'} group-hover:scale-110 transform transition-transform duration-300`}>
												<Icon className='w-6 h-6' />
											</div>
											<div>
												<h3 className='text-xl font-bold text-white group-hover:text-purple-400 transition-colors'>
													{plan.name}
												</h3>
												<p className='text-sm text-gray-400'>{plan.desc}</p>
											</div>
										</div>

										{/* Price */}
										<div className='mb-6'>
											<div className='flex items-baseline gap-2'>
												<span className='text-4xl font-bold text-white group-hover:text-purple-400 transition-colors'>
													${plan.price}
												</span>
												<span className='text-gray-400'>/month</span>
											</div>
										</div>

										{/* Features */}
										<ul className='space-y-4 mb-8'>
											{plan.features.map((feature, featureIdx) => (
												<li
													key={featureIdx}
													className='flex items-center gap-3 text-gray-300'>
													<Check className='w-5 h-5 text-purple-400 flex-shrink-0' />
													<span>{feature}</span>
												</li>
											))}
										</ul>

										{/* CTA Button */}
										<button
											className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
												plan.isMostPop
													? 'bg-purple-600 text-white hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25'
													: 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50'
											} group-hover:transform group-hover:translate-y-0`}>
											Get Started
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</LayoutEffect>

				{/* Stats Section */}
				{/* <div className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8'>
					{[
						{ value: '10K+', label: 'Active Users' },
						{ value: '95%', label: 'Satisfaction Rate' },
						{ value: '24/7', label: 'Customer Support' },
						{ value: '$2M+', label: 'Revenue Generated' },
					].map((stat, idx) => (
						<div
							key={idx}
							className='group text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300'>
							<div className='text-3xl font-bold text-white group-hover:text-purple-400 transition-colors'>
								{stat.value}
							</div>
							<div className='text-sm text-gray-400 mt-2'>{stat.label}</div>
						</div>
					))}
				</div> */}
			</div>
		</section>
	);
};

Pricing.displayName = 'Pricing';
export default Pricing;
