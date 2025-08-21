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
