'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FloatingCTA = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Show floating CTA when user scrolls down 500px
			if (window.scrollY > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	if (isDismissed) return null;

	return (
		<div
			className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
			<div className='glass rounded-xl p-4 shadow-lg shadow-primary/10 border border-primary/20 max-w-xs'>
				<button
					onClick={() => setIsDismissed(true)}
					className='absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
					aria-label='Close prompt'>
					<X size={16} />
				</button>

				<div className='mb-3'>
					<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block mr-2'></div>
					<span className='text-xs text-muted-foreground'>
						Limited time offer
					</span>
				</div>

				<h4 className='text-lg font-bold mb-2'>
					Ready to boost your marketing?
				</h4>
				<p className='text-sm text-muted-foreground mb-4'>
					Start your free trial today and join thousands of satisfied marketers.
				</p>

				<Link href='/signup' passHref>
					<Button className='w-full group' variant='gradient'>
						Get Started Free
						<ArrowUpRight
							size={16}
							className='ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'
						/>
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default FloatingCTA;
