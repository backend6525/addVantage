'use client';

import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const calculateScrollProgress = () => {
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrollTop = document.documentElement.scrollTop;
			const progress = (scrollTop / scrollHeight) * 100;
			setScrollProgress(progress);
		};

		window.addEventListener('scroll', calculateScrollProgress);

		// Initialize progress
		calculateScrollProgress();

		// Cleanup
		return () => {
			window.removeEventListener('scroll', calculateScrollProgress);
		};
	}, []);

	return (
		<div className='fixed top-0 left-0 w-full h-1 z-50'>
			<div
				className='h-full bg-gradient-to-r from-primary via-secondary to-accent'
				style={{ width: `${scrollProgress}%` }}
			/>
		</div>
	);
};

export default ScrollProgress;
