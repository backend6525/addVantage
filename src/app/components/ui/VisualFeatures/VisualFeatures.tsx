'use client';

import React from 'react';
import Feature1 from '../../../../../public/images/Features.png';
import Feature2 from '../../../../../public/images/Features2.png';
import Image from 'next/image';
import { ChevronRight, Zap } from 'lucide-react';

const VisualFeatures = () => {
	const features = [
		{
			title: 'Smart Ad Discovery',
			desc: 'Our AI-powered platform intelligently matches you with relevant ads that align with your interests and audience preferences.',
			img: Feature1,
			highlight: 'AI-Powered',
		},
		{
			title: 'Maximize Your Earnings',
			desc: 'Turn your influence into income with our transparent reward system. Share what you love and earn competitive commissions.',
			img: Feature2,
			highlight: 'Rewards',
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
						<Zap className='w-6 h-6 animate-pulse text-primary' />
						<span className='font-semibold text-lg tracking-wide text-primary'>
							Powerful Features
						</span>
					</div>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-gradient'>
						Reimagining Digital Marketing
					</h2>
					<p className='text-lg text-muted-foreground leading-relaxed'>
						Direct Sales, Bigger Rewards: Connect with your audience
						authentically and earn more through your shared recommendations.
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 mt-16'>
					{features.map((item, idx) => (
						<div key={idx} className='group hover-card glass'>
							<div className='p-8'>
								<span className='inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4'>
									{item.highlight}
								</span>
								<h3 className='text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors'>
									{item.title}
								</h3>
								<p className='text-muted-foreground leading-relaxed mb-6'>
									{item.desc}
								</p>
								<button className='inline-flex items-center text-primary hover:text-primary-light transition-colors'>
									Learn more
									<ChevronRight className='w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform' />
								</button>
							</div>
							<div className='relative h-48 mt-auto overflow-hidden'>
								<div className='absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10'></div>
								<Image
									src={item.img}
									alt={item.title}
									className='w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500'
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

VisualFeatures.displayName = 'VisualFeatures';
export default VisualFeatures;
