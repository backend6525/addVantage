// import GradientWrapper from '@/app/components/GradientWrapper';

// import user1 from '../../../../../public/testimonial/user1.webp';
// import user2 from '../../../../../public/testimonial/user2.webp';
// import user3 from '../../../../../public/testimonial/user3.webp';
// import user4 from '../../../../../public/testimonial/user4.webp';
// import user5 from '../../../../../public/testimonial/user5.webp';
// import user6 from '../../../../../public/testimonial/user6.webp';
// import Image from 'next/image';
// import LayoutEffect from '@/app/components/LayoutEffect';

// const Testimonial = () => {
// 	const testimonials = [
// 		{
// 			avatar: user1,
// 			name: 'Mark Zuckerberg',
// 			title: 'Founder of meta',
// 			quote:
// 				'adzpay completely changed how I promote brands I love!  I can now share curated fashion finds with my followers and actually earn money when they respond. It feels way more authentic than just pushing random ads',
// 		},
// 		{
// 			avatar: user2,
// 			name: 'Guillermo Rauch',
// 			title: 'Founder of Vercel',
// 			quote:
// 				"adzpay offers a refreshing take on marketing. It utilizes the power of word-of-mouth and social influence, leading to genuine connections between brands and consumers. It's a smart strategy for brands looking to expand their reach authentically.",
// 		},
// 		{
// 			avatar: user3,
// 			name: 'Sidi jeddou',
// 			title: 'Founder of Float UI',
// 			quote:
// 				"I'm constantly discovering cool new tech on adzpay. The best part? Sharing these finds with my techie friends allows me to earn a commission if they click on the ad. It's a win-win - I spread the word about interesting products, and my friends benefit from relevant recommendations.",
// 		},
// 		{
// 			avatar: user4,
// 			name: 'Ghazbel',
// 			title: 'Founder of forceY',
// 			quote:
// 				"adzpay has become my secret weapon for saving money!  By sharing cool ads with my friends, I earn rewards that help me with college expenses. Plus, I discover great deals and discounts that I wouldn't find anywhere else.",
// 		},
// 		{
// 			avatar: user5,
// 			name: 'Ana khan',
// 			title: 'Founder of larax',
// 			quote:
// 				"adzpay allows me to leverage my social media presence for targeted marketing. I only promote brands I use and believe in, and adzpay helps me earn rewards for doing so. It's a fantastic way to monetize my influence while connecting my audience with products they might love",
// 		},
// 		{
// 			avatar: user6,
// 			name: 'Ahmed khasem',
// 			title: 'Founder of Let’s code',
// 			quote:
// 				"adzpay is a great way to make some extra income while staying home with the kids. I discover awesome products for families, share them with my network, and earn commissions. It's flexible and allows me to contribute financially without leaving the house",
// 		},
// 	];

// 	return (
// 		<div id='testimonials' className='custom-screen text-gray-300'>
// 			<div className='max-w-2xl text-center md:mx-auto'>
// 				<h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
// 					adzpay opennig the door
// 				</h2>
// 			</div>
// 			<GradientWrapper
// 				wrapperclassname='max-w-sm h-40 top-12 inset-x-0'
// 				className='mt-12'>
// 				<LayoutEffect
// 					className='duration-1000 delay-300'
// 					isInviewState={{
// 						trueState: 'opacity-1',
// 						falseState: 'opacity-0 translate-y-12',
// 					}}>
// 					<ul className='grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3'>
// 						{testimonials.map((item, idx) => (
// 							<li
// 								key={idx}
// 								className='p-4 rounded-xl border border-gray-800'
// 								style={{
// 									backgroundImage:
// 										'radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)',
// 								}}>
// 								<figure className='flex flex-col justify-between gap-y-6 h-full'>
// 									<blockquote className=''>
// 										<p className=''>{item.quote}</p>
// 									</blockquote>
// 									<div className='flex items-center gap-x-4'>
// 										<Image
// 											src={item.avatar}
// 											alt={item.name}
// 											className='w-14 h-14 rounded-full object-cover'
// 										/>
// 										<div>
// 											<span className='block text-gray-50 font-semibold'>
// 												{item.name}
// 											</span>
// 											<span className='block text-sm mt-0.5'>{item.title}</span>
// 										</div>
// 									</div>
// 								</figure>
// 							</li>
// 						))}
// 					</ul>
// 				</LayoutEffect>
// 			</GradientWrapper>
// 		</div>
// 	);
// };

// export default Testimonial;

'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import LayoutEffect from '@/app/components/LayoutEffect';

import user1 from '../../../../../public/testimonial/user1.jpg';
import user2 from '../../../../../public/testimonial/user2.jpg';
import user3 from '../../../../../public/testimonial/user3.jpg';
import user4 from '../../../../../public/testimonial/user4.jpg';
import user5 from '../../../../../public/testimonial/user5.jpg';
import user6 from '../../../../../public/testimonial/user6.jpg';

const Testimonial = () => {
	const testimonials = [
		{
			avatar: user1,
			name: 'Kwame David',
			title: 'Doctor',
			quote:
				'adzpay completely changed how I promote brands I love! I can now share curated fashion finds with my followers and actually earn money when they respond. It feels way more authentic than just pushing random ads',
			rating: 5,
		},
		{
			avatar: user2,
			name: ' Papaleox Finch',
			title: 'Developer Advocate',
			quote:
				"adzpay offers a refreshing take on marketing. It utilizes the power of word-of-mouth and social influence, leading to genuine connections between brands and consumers. It's a smart strategy for brands looking to expand their reach authentically.",
			rating: 5,
		},
		{
			avatar: user3,
			name: 'Lulu Sarah',
			title: 'Marketing Executive',
			quote:
				"I'm constantly discovering cool new tech on adzpay. The best part? Sharing these finds with my techie friends allows me to earn a commission if they click on the ad. It's a win-win - I spread the word about interesting products, and my friends benefit from relevant recommendations.",
			rating: 5,
		},
		{
			avatar: user4,
			name: 'Ayana Pola',
			title: 'Consultant',
			quote:
				"adzpay has become my secret weapon for saving money! By sharing cool ads with my friends, I earn rewards that help me with college expenses. Plus, I discover great deals and discounts that I wouldn't find anywhere else.",
			rating: 5,
		},
		{
			avatar: user5,
			name: 'Mouris Slim',
			title: 'Founder of blue coin',
			quote:
				"adzpay allows me to leverage my social media presence for targeted marketing. I only promote brands I use and believe in, and adzpay helps me earn rewards for doing so. It's a fantastic way to monetize my influence while connecting my audience with products they might love",
			rating: 5,
		},
		{
			avatar: user6,
			name: 'Ahmed Bin Hassan',
			title: 'Marketing Executive',
			quote:
				"adzpay is a great way to make some extra income while staying home with the kids. I discover awesome products for families, share them with my network, and earn commissions. It's flexible and allows me to contribute financially without leaving the house",
			rating: 5,
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
						Trusted by Industry Leaders
					</h2>
					<p className='text-lg text-gray-300'>
						Discover why thousands of professionals choose adzpay to
						revolutionize their marketing approach
					</p>
				</div>

				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
						{testimonials.map((item, idx) => (
							<div
								key={idx}
								className='group relative bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10'>
								<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>

								<div className='p-8'>
									<div className='flex items-center gap-2 mb-4'>
										{[...Array(item.rating)].map((_, i) => (
											<Star
												key={i}
												className='w-5 h-5 text-yellow-400 fill-yellow-400'
											/>
										))}
									</div>

									<Quote className='w-10 h-10 text-purple-400/20 mb-4' />

									<blockquote className='text-gray-300 mb-6 leading-relaxed'>
										{item.quote}
									</blockquote>

									<div className='flex items-center gap-4'>
										<Image
											src={item.avatar}
											alt={item.name}
											className='w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all duration-300'
										/>
										<div>
											<h4 className='text-white font-semibold group-hover:text-purple-400 transition-colors'>
												{item.name}
											</h4>
											<p className='text-sm text-gray-400'>{item.title}</p>
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
