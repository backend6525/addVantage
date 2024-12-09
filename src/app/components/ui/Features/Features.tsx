'use client';

import React from 'react';
import { Zap, Shield, Blocks, Sparkles } from 'lucide-react';

const Features = () => {
	const features = [
		{
			icon: Zap,
			title: 'Lightning Fast Performance',
			desc: 'Experience instant ad discovery and sharing with our optimized platform that ensures quick loading times and smooth interactions.',
			color: 'text-yellow-400',
			gradient: 'from-yellow-600/20 via-yellow-500/5 to-transparent',
		},
		{
			icon: Shield,
			title: 'Enhanced Security',
			desc: 'Your data is protected with enterprise-grade security. We ensure safe transactions and maintain the highest privacy standards.',
			color: 'text-green-400',
			gradient: 'from-green-600/20 via-green-500/5 to-transparent',
		},
		{
			icon: Blocks,
			title: 'Seamless Integration',
			desc: 'Easily integrate with your existing workflow. Our platform works smoothly with your favorite tools and social platforms.',
			color: 'text-blue-400',
			gradient: 'from-blue-600/20 via-blue-500/5 to-transparent',
		},
		{
			icon: Sparkles,
			title: 'Smart Analytics',
			desc: 'Make data-driven decisions with our comprehensive analytics. Track performance and optimize your marketing strategy.',
			color: 'text-purple-400',
			gradient: 'from-purple-600/20 via-purple-500/5 to-transparent',
		},
	];

	return (
		<section className='relative py-32 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4'>
				<div className='max-w-3xl mx-auto text-center mb-16'>
					<div className='flex items-center justify-center gap-3 text-primary-500 mb-4'>
						<Sparkles className='w-6 h-6 animate-pulse text-purple-400' />
						<span className='font-semibold text-lg tracking-wide text-purple-400'>
							Why Choose Us
						</span>
					</div>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400'>
						Do More with Less Complexity
					</h2>
					<p className='text-lg text-gray-300 leading-relaxed'>
						Our platform is designed to be powerful yet intuitive, helping you
						focus on what matters most - growing your business and reaching your
						audience.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>
					{features.map((item, idx) => {
						const Icon = item.icon;
						return (
							<div
								key={idx}
								className='group relative bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden'>
								<div
									className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.gradient} transition-opacity duration-500`}
								/>
								<div className='relative z-10'>
									<div
										className={`inline-flex p-3 rounded-xl ${item.color} bg-gray-800/50 mb-4 group-hover:scale-110 transform transition-transform duration-300`}>
										<Icon className='w-6 h-6' />
									</div>
									<h3 className='text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors'>
										{item.title}
									</h3>
									<p className='text-gray-300 leading-relaxed'>{item.desc}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

Features.displayName = 'Features';
export default Features;
