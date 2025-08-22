'use client';

import React, { useState } from 'react';
import Feature1 from '../../../../../public/images/Features.png';
import Feature2 from '../../../../../public/images/Features2.png';
import Image from 'next/image';
import { ChevronRight, Zap, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import LayoutEffect from '@/app/components/LayoutEffect';
// import { Transition } from 'framer-motion';

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

// Consistent badge component (same as in Hero and TrustedBy)
const ConsistentBadge = ({
	text,
	icon,
}: {
	text: string;
	icon: React.ReactNode;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{
			duration: DESIGN_TOKENS.animation.duration,
			ease: DESIGN_TOKENS.animation.ease,
		}}
		viewport={{ once: true }}
		className='inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 text-sm font-medium text-blue-400 mb-8'>
		{icon}
		{text}
	</motion.div>
);

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
		<section className='py-16 lg:py-20 bg-slate-900 relative overflow-hidden'>
			{/* Premium Background Elements */}
			<div className='absolute inset-0 overflow-hidden'>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7 }}
					className='absolute top-[-20%] right-[-10%] w-[35rem] h-[35rem] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl'></motion.div>
				<motion.div
					animate={{
						scale: isHovered ? 1.1 : 1,
						opacity: isHovered ? 0.7 : 0.5,
					}}
					transition={{ duration: 0.7, delay: 0.2 }}
					className='absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl'></motion.div>
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					className='max-w-3xl mx-auto text-center mb-16'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: DESIGN_TOKENS.animation.duration,
						ease: DESIGN_TOKENS.animation.ease,
					}}
					viewport={{ once: true }}>
					<ConsistentBadge
						text='Powerful Features'
						icon={<Zap className='w-4 h-4 text-blue-400 animate-pulse' />}
					/>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-100'>
						Reimagining{' '}
						<span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
							Digital Marketing
						</span>
					</h2>
					<p className='text-lg text-slate-300 max-w-2xl mx-auto'>
						Direct Sales, Bigger Rewards: Connect with your audience
						authentically and earn more through your shared recommendations.
					</p>
				</motion.div>

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
								className='bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden group hover:border-blue-400/30 transition-all duration-300'
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								whileHover={{ scale: 1.02 }}
								// transition={{ duration: 0.3 }}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: DESIGN_TOKENS.animation.duration,
									delay: idx * 0.1,
									ease: DESIGN_TOKENS.animation.ease,
								}}
								viewport={{ once: true }}>
								<div className='p-8'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='p-2 bg-slate-700/50 rounded-lg'>
											{item.icon}
										</div>
										<span className='px-3 py-1 text-sm font-medium text-slate-200 bg-slate-700/50 rounded-full border border-slate-600/50'>
											{item.highlight}
										</span>
									</div>
									<h3 className='text-2xl font-bold text-slate-100 mb-4 group-hover:text-blue-400 transition-colors duration-300'>
										{item.title}
									</h3>
									<p className='text-slate-300 leading-relaxed mb-6'>
										{item.desc}
									</p>
									<div className='flex items-center justify-between'>
										<button className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300'>
											Learn more
											<ChevronRight className='w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300' />
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
