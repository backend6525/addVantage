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

import React, { useState } from 'react';
import {
	ArrowRight,
	Rocket,
	Star,
	DollarSign,
	TrendingUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import LayoutEffect from '@/app/components/LayoutEffect';

const CTA = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<section className='section-transition bg-slate-900'>
			{/* Premium Background Elements */}
			<div className='bg-blur'>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7 }}
					className='absolute top-[-20%] right-[-10%] w-[35rem] h-[35rem] bg-gradient-primary rounded-full blur-3xl'></motion.div>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7, delay: 0.2 }}
					className='absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-secondary rounded-full blur-3xl'></motion.div>
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<LayoutEffect
					className='duration-1000 delay-300'
					isInviewState={{
						trueState: 'opacity-100 translate-y-0',
						falseState: 'opacity-0 translate-y-12',
					}}>
					<div className='max-w-4xl mx-auto'>
						<div
							className='glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300'
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}>
							{/* Premium Decorative Elements */}
							<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'></div>
							<div className='absolute top-1 left-0 w-full h-px bg-gradient-to-r from-blue-600/50 via-indigo-600/50 to-purple-600/50 blur-sm'></div>

							<div className='grid md:grid-cols-[1fr,auto] items-center gap-8 p-8 md:p-12'>
								{/* Content Section */}
								<div className='flex flex-col items-center md:items-start text-center md:text-left'>
									{/* Premium Badge */}
									<div className='badge mb-6'>
										<Star className='w-4 h-4 text-yellow-400 animate-pulse' />
										<span className='text-sm font-medium text-slate-200'>
											Limited Time Offer
										</span>
									</div>

									{/* Premium Heading */}
									<h2 className='heading-lg mb-4 text-slate-100'>
										Ready to{' '}
										<span className='text-gradient bg-[size:400%] animate-gradient'>
											Transform
										</span>{' '}
										Your Marketing?
									</h2>

									{/* Premium Description */}
									<p className='paragraph-lg mb-8 max-w-2xl'>
										Join thousands of successful marketers who have already
										revolutionized their digital marketing strategy with our
										platform.
									</p>

									{/* Premium CTA Button */}
									<Link href='/signup' passHref>
										<Button
											size='lg'
											className='group gap-2 text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300'>
											Get Started Now
											<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
										</Button>
									</Link>
								</div>

								{/* Premium Stats Section */}
								<div className='flex flex-col gap-6 glass rounded-xl p-6 hover:scale-105 transition-transform duration-300'>
									{[
										{
											value: '10K+',
											label: 'Active Users',
											icon: <Users className='w-5 h-5 text-blue-400' />,
										},
										{
											value: '95%',
											label: 'Success Rate',
											icon: <TrendingUp className='w-5 h-5 text-green-400' />,
										},
										{
											value: '$500+',
											label: 'Monthly Earnings',
											icon: <DollarSign className='w-5 h-5 text-yellow-400' />,
										},
									].map((stat, idx) => (
										<div key={idx} className='text-center'>
											<div className='flex items-center justify-center gap-2 mb-2'>
												{stat.icon}
											</div>
											<div className='text-2xl font-bold text-gradient mb-1'>
												{stat.value}
											</div>
											<div className='text-sm text-slate-300'>{stat.label}</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</LayoutEffect>
			</div>
		</section>
	);
};

export default CTA;
