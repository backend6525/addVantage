'use client';

import React, { useState } from 'react';
import Feature1 from '../../../../../public/images/Features.png';
import Feature2 from '../../../../../public/images/Features2.png';
import Image from 'next/image';
import { ChevronRight, Zap, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import LayoutEffect from '@/app/components/LayoutEffect';

const VisualFeatures = () => {
	const [isHovered, setIsHovered] = useState(false);

	const features = [
		{
			title: 'Smart Ad Discovery',
			desc: 'Our AI-powered platform intelligently matches you with relevant ads that align with your interests and audience preferences.',
			img: Feature1,
			highlight: 'AI-Powered',
			icon: <Zap className='w-5 h-5 text-blue-400' />,
			stats: '95% higher engagement',
		},
		{
			title: 'Maximize Your Earnings',
			desc: 'Turn your influence into income with our transparent reward system. Share what you love and earn competitive commissions.',
			img: Feature2,
			highlight: 'Rewards',
			icon: <DollarSign className='w-5 h-5 text-green-400' />,
			stats: '70% commission rate',
		},
	];

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
				<div className='max-w-3xl mx-auto text-center mb-16'>
					<div className='badge mb-6'>
						<Zap className='w-4 h-4 text-blue-400 animate-pulse' />
						<span className='text-sm font-medium text-slate-200'>
							Powerful Features
						</span>
					</div>
					<h2 className='heading-lg mb-6 text-slate-100'>
						Reimagining <span className='text-gradient'>Digital Marketing</span>
					</h2>
					<p className='paragraph-lg max-w-2xl mx-auto'>
						Direct Sales, Bigger Rewards: Connect with your audience
						authentically and earn more through your shared recommendations.
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 mt-16'>
					{features.map((item, idx) => (
						<LayoutEffect
							key={idx}
							className='duration-1000 delay-300'
							isInviewState={{
								trueState: 'opacity-100 translate-y-0',
								falseState: 'opacity-0 translate-y-12',
							}}>
							<motion.div
								className='card-feature group'
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}>
								<div className='p-8'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='p-2 bg-slate-700/50 rounded-lg'>
											{item.icon}
										</div>
										<span className='px-3 py-1 text-sm font-medium text-slate-200 bg-slate-700/50 rounded-full'>
											{item.highlight}
										</span>
									</div>
									<h3 className='text-2xl font-bold text-slate-100 mb-4 group-hover:text-blue-400 transition-colors'>
										{item.title}
									</h3>
									<p className='text-slate-300 leading-relaxed mb-6'>
										{item.desc}
									</p>
									<div className='flex items-center justify-between'>
										<button className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors'>
											Learn more
											<ChevronRight className='w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform' />
										</button>
										<div className='flex items-center gap-2 text-sm text-slate-400'>
											<TrendingUp className='w-4 h-4 text-green-400' />
											<span>{item.stats}</span>
										</div>
									</div>
								</div>
								<div className='relative h-48 mt-auto overflow-hidden'>
									<div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent z-10'></div>
									<Image
										src={item.img}
										alt={item.title}
										className='w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500'
									/>
								</div>
							</motion.div>
						</LayoutEffect>
					))}
				</div>
			</div>
		</section>
	);
};

export default VisualFeatures;
