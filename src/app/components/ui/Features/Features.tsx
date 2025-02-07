'use client';

import React from 'react';
import { Zap, Shield, Blocks, Sparkles, ChevronRight } from 'lucide-react';

const Features = () => {
	const features = [
		{
			icon: Zap,
			title: 'Lightning Fast Performance',
			desc: 'Experience instant ad discovery and sharing with our optimized platform that ensures quick loading times and smooth interactions.',
			color: 'text-yellow-500 dark:text-yellow-400',
			gradient:
				'from-yellow-500/20 via-yellow-400/5 to-transparent dark:from-yellow-600/20 dark:via-yellow-500/5 dark:to-transparent',
			stats: { value: '0.5s', label: 'Avg. Load Time' },
		},
		{
			icon: Shield,
			title: 'Enhanced Security',
			desc: 'Your data is protected with enterprise-grade security. We ensure safe transactions and maintain the highest privacy standards.',
			color: 'text-green-500 dark:text-green-400',
			gradient:
				'from-green-500/20 via-green-400/5 to-transparent dark:from-green-600/20 dark:via-green-500/5 dark:to-transparent',
			stats: { value: '99.9%', label: 'Uptime' },
		},
		{
			icon: Blocks,
			title: 'Seamless Integration',
			desc: 'Easily integrate with your existing workflow. Our platform works smoothly with your favorite tools and social platforms.',
			color: 'text-blue-500 dark:text-blue-400',
			gradient:
				'from-blue-500/20 via-blue-400/5 to-transparent dark:from-blue-600/20 dark:via-blue-500/5 dark:to-transparent',
			stats: { value: '50+', label: 'Integrations' },
		},
		{
			icon: Sparkles,
			title: 'Smart Analytics',
			desc: 'Make data-driven decisions with our comprehensive analytics. Track performance and optimize your marketing strategy.',
			color: 'text-purple-500 dark:text-purple-400',
			gradient:
				'from-purple-500/20 via-purple-400/5 to-transparent dark:from-purple-600/20 dark:via-purple-500/5 dark:to-transparent',
			stats: { value: '100%', label: 'Data Accuracy' },
		},
	];

	return (
		<section className='section-transition'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4'>
				<div className='max-w-3xl mx-auto text-center mb-16'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<Sparkles className='w-6 h-6 animate-pulse text-primary' />
						<span className='font-semibold text-lg tracking-wide text-primary'>
							Why Choose Us
						</span>
					</div>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-gradient'>
						Do More with Less Complexity
					</h2>
					<p className='text-lg text-muted-foreground leading-relaxed'>
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
								className='group hover-card glass relative overflow-hidden cursor-pointer'
								style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}>
								<div
									className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.gradient} transition-opacity duration-500`}
								/>
								<div className='relative z-10 p-8'>
									<div
										className={`inline-flex p-3 rounded-xl ${item.color} bg-background/50 mb-4 group-hover:scale-110 transform transition-transform duration-300`}>
										<Icon className='w-6 h-6' />
									</div>
									<h3 className='text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors'>
										{item.title}
									</h3>
									<p className='text-muted-foreground leading-relaxed mb-6'>
										{item.desc}
									</p>

									{/* Feature Stats */}
									<div className='mt-6 pt-6 border-t border-border/50'>
										<div className='flex items-center justify-between'>
											<span className='text-2xl font-bold text-gradient'>
												{item.stats.value}
											</span>
											<span className='text-sm text-muted-foreground'>
												{item.stats.label}
											</span>
										</div>
									</div>

									{/* Hover Indicator */}
									<div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
										<div
											className={`p-2 rounded-full ${item.color} bg-background/50`}>
											<ChevronRight className='w-4 h-4' />
										</div>
									</div>
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
