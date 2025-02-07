'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import LayoutEffect from '@/app/components/LayoutEffect';

const testimonials = [
	{
		content:
			'AdZPay has transformed how we approach digital marketing. The platform is intuitive, and the results have been outstanding. Our ROI has increased significantly.',
		author: {
			name: 'Sarah Johnson',
			title: 'Marketing Director at TechCorp',
			image: '/images/testimonials/1.jpg',
			rating: 5,
		},
	},
	{
		content:
			"The targeting capabilities are incredible. We're reaching exactly the right audience, and the engagement metrics speak for themselves. Highly recommended!",
		author: {
			name: 'Michael Chen',
			title: 'Growth Lead at StartupX',
			image: '/images/testimonials/2.jpg',
			rating: 5,
		},
	},
	{
		content:
			"What sets AdZPay apart is their commitment to authentic connections. Our brand message resonates better, and we're seeing real, measurable results.",
		author: {
			name: 'Emma Davis',
			title: 'Brand Manager at InnovateCo',
			image: '/images/testimonials/3.jpg',
			rating: 5,
		},
	},
];

const Testimonial = () => {
	return (
		<section className='section-transition'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4'>
				<div className='text-center max-w-2xl mx-auto mb-16'>
					{/* Badge */}
					<div className='inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6'>
						<Star className='w-5 h-5 text-primary animate-pulse' />
						<span className='text-sm font-medium text-foreground'>
							Customer Success Stories
						</span>
					</div>

					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-gradient'>
						Loved by Marketers Worldwide
					</h2>
					<p className='text-lg text-muted-foreground'>
						See what industry leaders are saying about their experience with our
						platform
					</p>
				</div>

				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='grid md:grid-cols-3 gap-8'>
						{testimonials.map((testimonial, idx) => (
							<div
								key={idx}
								className='group hover-card glass relative overflow-hidden'>
								{/* Gradient Background */}
								<div
									className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 transition-opacity duration-500`}
								/>

								<div className='relative p-8'>
									{/* Quote Icon */}
									<div className='mb-6'>
										<Quote className='w-10 h-10 text-primary/20' />
									</div>

									{/* Rating */}
									<div className='flex gap-1 mb-4'>
										{[...Array(testimonial.author.rating)].map((_, i) => (
											<Star
												key={i}
												className='w-5 h-5 text-primary fill-primary'
											/>
										))}
									</div>

									{/* Content */}
									<blockquote className='text-lg text-foreground mb-6 leading-relaxed'>
										&ldquo;{testimonial.content}&rdquo;
									</blockquote>

									{/* Author */}
									<div className='flex items-center gap-4'>
										<div className='w-12 h-12 rounded-full glass border-2 border-background overflow-hidden'>
											{testimonial.author.image && (
												<Image
													src={testimonial.author.image}
													alt={testimonial.author.name}
													className='w-full h-full object-cover'
													width={48}
													height={48}
												/>
											)}
										</div>
										<div>
											<h4 className='font-semibold text-foreground'>
												{testimonial.author.name}
											</h4>
											<p className='text-sm text-muted-foreground'>
												{testimonial.author.title}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</LayoutEffect>
			</div>
		</section>
	);
};

Testimonial.displayName = 'Testimonial';
export default Testimonial;
