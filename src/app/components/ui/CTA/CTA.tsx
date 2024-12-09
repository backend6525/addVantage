// import GradientWrapper from '@/app/components/GradientWrapper';
// import Image from 'next/image';
// import NavLink from '../NavLink';
// import bgPattern from '@/../../public/images/bg-pattern.webp';
// import LayoutEffect from '@/app/components/LayoutEffect';

// const CTA = () => (
// 	<section>
// 		<GradientWrapper wrapperclassname='max-w-xs h-[13rem] top-12 inset-0'>
// 			<div className='custom-screen py-28 relative'>
// 				<LayoutEffect
// 					className='duration-1000 delay-300'
// 					isInviewState={{
// 						trueState: 'opacity-1',
// 						falseState: 'opacity-0 translate-y-6',
// 					}}>
// 					<div className='relative z-10'>
// 						<div className='max-w-xl mx-auto text-center'>
// 							<h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
// 								Unleash the Power of AI with Email Marketing
// 							</h2>
// 							<p className='mt-5 text-gray-300'>
// 								Mailgo is the perfect answer! Our AI-based email marketing
// 								platform enables you to create highly targeted email campaigns
// 								that are tailored to each individual subscriber.
// 							</p>
// 						</div>
// 						<div className='mt-5 flex justify-center font-medium text-sm'>
// 							<NavLink
// 								href='/#pricing'
// 								className='flex items-center text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700 '>
// 								Start now
// 								<svg
// 									xmlns='http://www.w3.org/2000/svg'
// 									viewBox='0 0 20 20'
// 									fill='currentColor'
// 									className='w-5 h-5'>
// 									<path
// 										fillRule='evenodd'
// 										d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
// 										clipRule='evenodd'
// 									/>
// 								</svg>
// 							</NavLink>
// 						</div>
// 					</div>
// 				</LayoutEffect>
// 				<Image
// 					src={bgPattern}
// 					className='w-full h-full object-cover m-auto absolute inset-0 pointer-events-none'
// 					alt='Background pattern'
// 				/>
// 			</div>
// 		</GradientWrapper>
// 	</section>
// );

// export default CTA;

// import GradientWrapper from '@/app/components/GradientWrapper';
// import Image from 'next/image';
// import NavLink from '../NavLink';
// import bgPattern from '@/../../public/images/bg-pattern.webp';
// import LayoutEffect from '@/app/components/LayoutEffect';

// const CTA = () => (
// 	<section>
// 		<GradientWrapper className='max-w-xs h-[13rem] top-12 inset-0'>
// 			<div className='custom-screen py-28 relative'>
// 				<LayoutEffect
// 					className='duration-1000 delay-300'
// 					isInviewState={{
// 						trueState: 'opacity-1',
// 						falseState: 'opacity-0 translate-y-6',
// 					}}>
// 					<div className='relative z-10'>
// 						<div className='max-w-xl mx-auto text-center'>
// 							<h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
// 								Unleash the Power of AI with Email Marketing
// 							</h2>
// 							<p className='mt-5 text-gray-300'>
// 								Mailgo is the perfect answer! Our AI-based email marketing
// 								platform enables you to create highly targeted email campaigns
// 								that are tailored to each individual subscriber.
// 							</p>
// 						</div>
// 						<div className='mt-5 flex justify-center font-medium text-sm'>
// 							<NavLink
// 								href='/#pricing'
// 								className='flex items-center text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700 '>
// 								Start now
// 								<svg
// 									xmlns='http://www.w3.org/2000/svg'
// 									viewBox='0 0 20 20'
// 									fill='currentColor'
// 									className='w-5 h-5'>
// 									<path
// 										fillRule='evenodd'
// 										d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
// 										clipRule='evenodd'
// 									/>
// 								</svg>
// 							</NavLink>
// 						</div>
// 					</div>
// 				</LayoutEffect>
// 				<Image
// 					src={bgPattern}
// 					className='w-full h-full object-cover m-auto absolute inset-0 pointer-events-none'
// 					alt='Background pattern'
// 				/>
// 			</div>
// 		</GradientWrapper>
// 	</section>
// );

// export default CTA;

'use client';

import React from 'react';
import { ArrowRight, Rocket, Star } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
	return (
		<section className='relative py-32 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4'>
				<div className='max-w-4xl mx-auto'>
					<div className='relative bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden p-8 md:p-12'>
						{/* Decorative Elements */}
						<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500'></div>
						<div className='absolute top-1 left-0 w-full h-px bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50 blur-sm'></div>

						<div className='flex flex-col md:flex-row items-center justify-between gap-8'>
							<div className='flex-1 text-center md:text-left'>
								<div className='flex items-center justify-center md:justify-start gap-3 mb-6'>
									<Rocket className='w-6 h-6 text-purple-400 animate-pulse' />
									<span className='font-semibold text-lg tracking-wide text-purple-400'>
										Ready to Get Started?
									</span>
								</div>
								<h2 className='text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400'>
									Transform Your Marketing Today
								</h2>
								<p className='text-lg text-gray-300 leading-relaxed mb-8'>
									Join thousands of successful marketers who are already
									leveraging our platform to grow their business and increase
									their revenue.
								</p>
								<div className='flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start'>
									<Link
										href='/get-started'
										className='inline-flex items-center px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 group'>
										Get Started Free
										<ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
									</Link>
									<Link
										href='/contact'
										className='inline-flex items-center px-8 py-4 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800/50 hover:border-purple-500/50 transition-all duration-300 group'>
										Contact Sales
										<Star className='w-5 h-5 ml-2 text-yellow-400 group-hover:rotate-45 transition-transform' />
									</Link>
								</div>
							</div>

							{/* Stats Section */}
							<div className='flex flex-col gap-6 min-w-[240px]'>
								{[
									{ value: '10K+', label: 'Active Users' },
									{ value: '95%', label: 'Satisfaction Rate' },
									{ value: '$2M+', label: 'Revenue Generated' },
								].map((stat, idx) => (
									<div
										key={idx}
										className='group bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300'>
										<div className='text-2xl font-bold text-white group-hover:text-purple-400 transition-colors'>
											{stat.value}
										</div>
										<div className='text-sm text-gray-400'>{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

CTA.displayName = 'CTA';
export default CTA;
