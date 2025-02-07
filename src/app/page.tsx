'use client';

import CTA from '@/app/components/ui/CTA';
import FAQs from '@/app/components/ui/FAQs';
import Features from '@/app/components/ui/Features';
import Hero from '@/app/components/ui/Hero';
import Pricing from '@/app/components/ui/Pricing';
import Testimonial from '@/app/components/ui/Testimonial';
import VisualFeatures from '@/app/components/ui/VisualFeatures';
import TrustedBy from './components/ui/TrustedBy/TrustedBy';

export default function Home() {
	return (
		<main className='relative overflow-hidden'>
			{/* Hero Section with Trust Indicators */}
			<div className='relative'>
				<Hero />
				<div className='relative z-10 -mt-20 mb-20'>
					<TrustedBy />
				</div>
			</div>

			{/* Main Feature Sections */}
			<div className='relative'>
				<div className='absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none' />
				<VisualFeatures />
				<Features />
			</div>

			{/* Social Proof & Conversion */}
			<div className='relative'>
				<div className='absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background pointer-events-none' />
				<CTA />
				<Testimonial />
			</div>

			{/* Pricing & FAQ */}
			<div className='relative'>
				<div className='absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none' />
				<Pricing />
				<FAQs />
			</div>

			{/* Floating Background Elements */}
			<div className='fixed inset-0 pointer-events-none'>
				<div className='absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse' />
				<div className='absolute top-3/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse delay-300' />
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse delay-700' />
			</div>
		</main>
	);
}
