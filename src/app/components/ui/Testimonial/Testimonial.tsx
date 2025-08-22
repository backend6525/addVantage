'use client';

import React from 'react';
import { Star, Quote, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import LayoutEffect from '@/app/components/LayoutEffect';
import { motion } from 'framer-motion';

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

const testimonials = [
	{
		content:
			'AdZPay has transformed how we approach digital marketing. The platform is intuitive, and the results have been outstanding. Our ROI has increased significantly.',
		author: {
			name: 'Loan Johnson',
			title: 'Marketing Director at TechCorp',
			image: 'https://www.codeplay.com/assets/images/company/team/max.jpg',
			rating: 5,
		},
	},
	{
		content:
			"The targeting capabilities are incredible. We're reaching exactly the right audience, and the engagement metrics speak for themselves. Highly recommended!",
		author: {
			name: 'Michael Chen',
			title: 'Growth Lead at StartupX',
			image:
				'https://www.codeplay.com/assets/images/company/team/ruyman-reyes.jpg',
			rating: 5,
		},
	},
	{
		content:
			"What sets AdZPay apart is their commitment to authentic connections. Our brand message resonates better, and we're seeing real, measurable results.",
		author: {
			name: 'Emma Davis',
			title: 'Brand Manager at InnovateCo',
			image:
				'https://www.codeplay.com/assets/images/portal/authors/przemyslaw-malon.png',
			rating: 5,
		},
	},
];

const Testimonial = () => {
	return (
		<section className='relative py-16 lg:py-20 overflow-hidden'>
			{/* Background elements consistent with other sections */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute top-[-10%] right-[-5%] w-72 h-72 bg-blue-600/20 rounded-full blur-3xl'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-purple-600/20 rounded-full blur-3xl'></div>
				<div className='absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50' />
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<motion.div
						className='w-full'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: DESIGN_TOKENS.animation.duration,
							ease: DESIGN_TOKENS.animation.ease,
						}}
						viewport={{ once: true }}>
						{/* Section header */}
						<div className='text-center mb-12'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: DESIGN_TOKENS.animation.duration,
									ease: DESIGN_TOKENS.animation.ease,
								}}
								viewport={{ once: true }}
								className='inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 text-sm font-medium text-blue-400 mb-6'>
								<Quote className='w-4 h-4' />
								Customer Testimonials
							</motion.div>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: DESIGN_TOKENS.animation.duration,
									delay: 0.1,
									ease: DESIGN_TOKENS.animation.ease,
								}}
								viewport={{ once: true }}
								className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
								<span className='text-slate-100'>What Our </span>
								<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
									Customers Say
								</span>
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: DESIGN_TOKENS.animation.duration,
									delay: 0.2,
									ease: DESIGN_TOKENS.animation.ease,
								}}
								viewport={{ once: true }}
								className='text-lg text-slate-300 max-w-2xl mx-auto'>
								Discover why businesses choose AdZPay for their digital
								marketing success
							</motion.p>
						</div>

						{/* Testimonials carousel effect - Fixed card heights and overflow handling */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{testimonials.map((testimonial, idx) => (
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
									className='group relative flex flex-col bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300'>
									{/* Gradient background on hover */}
									<div className='absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-blue-400/30 transition-opacity duration-500 rounded-xl' />

									<div className='relative flex flex-col flex-grow'>
										{/* Quote icon */}
										<div className='absolute top-0 right-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500'>
											<Quote className='w-8 h-8 text-blue-400' />
										</div>

										{/* Rating */}
										<div className='flex gap-1 mb-4'>
											{[...Array(testimonial.author.rating)].map((_, i) => (
												<Star
													key={i}
													className='w-4 h-4 text-yellow-400 fill-yellow-400'
												/>
											))}
										</div>

										{/* Content */}
										<div className='mb-4 relative flex-grow'>
											<div className='text-slate-300 leading-relaxed'>
												<span>&ldquo;{testimonial.content}&rdquo;</span>
											</div>
										</div>

										{/* Author info */}
										<div className='flex items-center gap-3 pt-4 border-t border-slate-700/50'>
											<div className='w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700/50 group-hover:border-blue-400/50 transition-colors duration-300'>
												{testimonial.author.image && (
													<Image
														src={testimonial.author.image}
														alt={testimonial.author.name}
														className='w-full h-full object-cover'
														width={40}
														height={40}
													/>
												)}
											</div>
											<div>
												<h4 className='font-semibold text-slate-100 text-sm'>
													{testimonial.author.name}
												</h4>
												<p className='text-xs text-slate-400'>
													{testimonial.author.title}
												</p>
											</div>
										</div>
									</div>

									{/* Read more indicator */}
									<div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
										<div className='p-1.5 rounded-full bg-blue-400/20 text-blue-400 hover:bg-blue-400/30 transition-colors duration-300'>
											<ChevronRight className='w-3 h-3' />
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Additional testimonials indicator */}
						<div className='flex justify-center gap-2 mt-8'>
							<span className='w-6 h-1.5 bg-blue-400 rounded-full'></span>
							<span className='w-1.5 h-1.5 bg-slate-600 rounded-full'></span>
							<span className='w-1.5 h-1.5 bg-slate-600 rounded-full'></span>
						</div>
					</motion.div>
				</LayoutEffect>
			</div>
		</section>
	);
};

Testimonial.displayName = 'Testimonial';
export default Testimonial;
