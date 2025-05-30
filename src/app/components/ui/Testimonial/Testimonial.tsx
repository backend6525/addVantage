'use client';

import React from 'react';
import { Star, Quote, ChevronRight } from 'lucide-react';
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
		<div className='py-12'>
			{/* More vibrant background elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-72 h-72 bg-primary/25 dark:bg-primary/30 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-secondary/25 dark:bg-secondary/30 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<LayoutEffect
				className='duration-1000 delay-300'
				isInviewState={{
					trueState: 'opacity-1',
					falseState: 'opacity-0 translate-y-12',
				}}>
				<div className='w-full'>
					{/* Testimonials carousel effect - Fixed card heights and overflow handling */}
					<div className='flex flex-col md:flex-row gap-5 md:gap-6 relative justify-center'>
						{testimonials.map((testimonial, idx) => (
							<div
								key={idx}
								className='group hover-card glass relative flex-1 flex flex-col md:max-w-[310px] transition-all duration-500 border-2 border-primary/20 shadow-sm hover:shadow-md hover:shadow-primary/10 rounded-xl overflow-hidden'>
								{/* Enhanced gradient background with smoother transition */}
								<div className='absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 transition-opacity duration-500' />

								<div className='relative p-6 flex flex-col flex-grow'>
									{/* More vibrant quote icon */}
									<div className='absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity duration-500'>
										<Quote className='w-8 h-8 text-primary' />
									</div>

									{/* More visually appealing rating */}
									<div className='flex gap-1 mb-3'>
										{[...Array(testimonial.author.rating)].map((_, i) => (
											<Star
												key={i}
												className='w-4 h-4 text-primary fill-primary'
											/>
										))}
									</div>

									{/* Fixed height content area with proper overflow handling */}
									<div className='mb-4 relative'>
										<div className='text-base text-foreground/90 leading-relaxed h-[110px] overflow-hidden group-hover:h-auto transition-all duration-500'>
											<span>&ldquo;{testimonial.content}&rdquo;</span>
										</div>
										<div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent group-hover:opacity-0 transition-opacity duration-500'></div>
									</div>

									{/* More visually appealing author info */}
									<div className='flex items-center gap-3 mt-auto pt-3 border-t border-primary/10'>
										<div className='w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-colors duration-500'>
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
											<h4 className='font-semibold text-foreground text-sm'>
												{testimonial.author.name}
											</h4>
											<p className='text-xs text-foreground/80'>
												{testimonial.author.title}
											</p>
										</div>
									</div>
								</div>

								{/* Read more indicator with smoother transition */}
								<div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
									<div className='p-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-300'>
										<ChevronRight className='w-3 h-3' />
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Additional testimonials indicator */}
					<div className='flex justify-center gap-2 mt-8'>
						<span className='w-6 h-1.5 bg-primary rounded-full'></span>
						<span className='w-1.5 h-1.5 bg-foreground/20 rounded-full'></span>
						<span className='w-1.5 h-1.5 bg-foreground/20 rounded-full'></span>
					</div>
				</div>
			</LayoutEffect>
		</div>
	);
};

Testimonial.displayName = 'Testimonial';
export default Testimonial;
