'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X, Sun, Moon, ChevronUp, ArrowRight } from 'lucide-react';
import ParticleBackground from './components/ui/PaticleBackground/ParticleBackground';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
	useSpring,
} from 'framer-motion';
import { useTheme } from 'next-themes';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import Footer from './components/ui/Footer/Footer';

// Define prop types for components
interface ScrollProgressProps {
	className?: string;
}

interface FloatingCTAProps {
	className?: string;
}

// Dynamically import components with types
const ScrollProgress = dynamic<ScrollProgressProps>(
	() => import('./components/ui/ScrollProgress'),
	{ ssr: false }
);

const FloatingCTA = dynamic<FloatingCTAProps>(
	() => import('./components/ui/FloatingCTA'),
	{ ssr: false }
);

// Dynamically import components with loading states
const Hero = dynamic(() => import('@/app/components/ui/Hero/Hero'), {
	loading: () => (
		<div className='min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8'>
			<div className='animate-pulse flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-md'>
				<div className='h-12 w-12 sm:h-16 sm:w-16 bg-blue-400/20 rounded-full'></div>
				<div className='space-y-3 sm:space-y-4 text-center w-full'>
					<div className='h-4 sm:h-6 w-full max-w-[300px] bg-blue-400/20 rounded mx-auto'></div>
					<div className='h-3 sm:h-4 w-full max-w-[250px] bg-blue-400/20 rounded mx-auto'></div>
					<div className='h-3 sm:h-4 w-full max-w-[200px] bg-blue-400/20 rounded mx-auto'></div>
				</div>
				<div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4 w-full sm:w-auto'>
					<div className='h-10 w-full sm:w-28 bg-blue-400/20 rounded-lg'></div>
					<div className='h-10 w-full sm:w-28 bg-blue-400/20 rounded-lg'></div>
				</div>
			</div>
		</div>
	),
});

const TrustedBy = dynamic(
	() => import('@/app/components/ui/TrustedBy/TrustedBy'),
	{
		loading: () => (
			<div className='h-24 sm:h-32 flex justify-center items-center px-4 sm:px-6'>
				<div className='animate-pulse grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl'>
					{[...Array(4)].map((_, i) => (
						<div key={i} className='h-6 sm:h-8 bg-blue-400/10 rounded'></div>
					))}
				</div>
			</div>
		),
	}
);

const VisualFeatures = dynamic(
	() => import('@/app/components/ui/VisualFeatures/VisualFeatures')
);
const Features = dynamic(() => import('@/app/components/ui/Features/Features'));
const CTA = dynamic(() => import('@/app/components/ui/CTA/CTA'));
const Testimonial = dynamic(
	() => import('@/app/components/ui/Testimonial/Testimonial')
);
const Pricing = dynamic(() => import('@/app/components/ui/Pricing/Pricing'));
const FAQs = dynamic(() => import('@/app/components/ui/FAQs/FAQs'));
const LiveChat = dynamic(() => import('@/app/components/ui/LiveChat/LiveChat'));

export default function Home() {
	// State management
	const { theme, setTheme } = useTheme();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('hero');
	const [isReducedMotion, setIsReducedMotion] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [isParticlesEnabled, setIsParticlesEnabled] = useState(true);
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	// Scroll animations
	const { scrollYProgress } = useScroll();
	const smoothProgress = useSpring(scrollYProgress, {
		damping: 50,
		stiffness: 400,
	});
	const opacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
	const scale = useTransform(smoothProgress, [0, 0.05], [1, 0.98]);
	const y = useTransform(smoothProgress, [0, 0.05], [0, 20]);

	// Intersection observer for section animations
	const [visibleSections, setVisibleSections] = useState<Set<string>>(
		new Set()
	);

	// Navigation items
	const navigationItems = [
		{ name: 'Home', id: 'hero' },
		{ name: 'Features', id: 'features' },
		{ name: 'Testimonials', id: 'testimonials' },
		{ name: 'Pricing', id: 'pricing' },
		{ name: 'FAQ', id: 'faq' },
	];

	// Section transition variants with responsive considerations
	const sectionVariants = {
		hidden: {
			opacity: 0,
			y: isMobile ? 15 : 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: isMobile ? 0.6 : 0.8,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	};

	// Detect mobile devices and screen size
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Scroll handling with debouncing
	const handleScroll = useCallback(() => {
		const scrollPosition = window.scrollY;
		setIsScrolled(scrollPosition > 20);
		setShowScrollTop(scrollPosition > 500);

		// Update active section based on scroll position
		const sections = navigationItems.map((item) => item.id);
		const currentSection = sections.find((section) => {
			const element = document.getElementById(section);
			if (element) {
				const rect = element.getBoundingClientRect();
				return rect.top <= 100 && rect.bottom >= 100;
			}
			return false;
		});

		if (currentSection) {
			setActiveSection(currentSection);
		}
	}, []);

	useEffect(() => {
		const debouncedScroll = debounce(handleScroll, 10);
		window.addEventListener('scroll', debouncedScroll, { passive: true });
		return () => window.removeEventListener('scroll', debouncedScroll);
	}, [handleScroll]);

	// Section intersection observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisibleSections((prev) => new Set([...prev, entry.target.id]));
					}
				});
			},
			{ threshold: isMobile ? 0.1 : 0.2 }
		);

		document.querySelectorAll('section[id]').forEach((section) => {
			observer.observe(section);
		});

		return () => observer.disconnect();
	}, [isMobile]);

	// Loading animation
	useEffect(() => {
		const timer = setInterval(() => {
			setLoadingProgress((prev) => {
				if (prev >= 100) {
					clearInterval(timer);
					return 100;
				}
				return prev + 1;
			});
		}, 10);

		return () => clearInterval(timer);
	}, []);

	// Check for reduced motion and device performance
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		setIsReducedMotion(mediaQuery.matches);

		const checkPerformance = () => {
			// Disable particles on smaller screens or low-memory devices
			if (
				window.innerWidth < 768 ||
				('deviceMemory' in navigator && (navigator as any).deviceMemory < 4)
			) {
				setIsParticlesEnabled(false);
			}
		};

		checkPerformance();
		mediaQuery.addEventListener('change', (e) => setIsReducedMotion(e.matches));
		window.addEventListener('resize', checkPerformance);

		return () => {
			mediaQuery.removeEventListener('change', (e) =>
				setIsReducedMotion(e.matches)
			);
			window.removeEventListener('resize', checkPerformance);
		};
	}, []);

	// Smooth scroll function with offset adjustment for mobile
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const offset = isMobile ? 60 : 80;
			const top = element.offsetTop - offset;
			window.scrollTo({
				top,
				behavior: isReducedMotion ? 'auto' : 'smooth',
			});
		}
	};

	return (
		<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
			<main className='relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden'>
				{/* Loading Screen */}
				<AnimatePresence>
					{loadingProgress < 100 && (
						<motion.div
							initial={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950 px-4'>
							<div className='w-48 sm:w-64 h-2 bg-slate-800 rounded-full overflow-hidden'>
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: `${loadingProgress}%` }}
									className='h-full bg-blue-600'
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Floating UI Elements */}
				<ScrollProgress className='z-50' />
				<FloatingCTA className='z-40' />

				{/* Particles - Disabled on mobile for performance */}
				{isParticlesEnabled && !isReducedMotion && !isMobile && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						transition={{ duration: 2 }}
						className='fixed inset-0 pointer-events-none'>
						<ParticleBackground
							color={theme === 'dark' ? '#3E63DD' : '#2563EB'}
							count={15}
							speed={0.2}
							maxSize={1.5}
						/>
					</motion.div>
				)}

				{/* Scroll to Top */}
				<AnimatePresence>
					{showScrollTop && (
						<motion.button
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							className={cn(
								'fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50',
								'p-2 sm:p-3 rounded-full',
								'bg-blue-600/90 backdrop-blur-sm',
								'shadow-lg shadow-blue-500/10',
								'hover:bg-blue-600 transition-all duration-300',
								'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
							)}
							aria-label='Scroll to top'>
							<ChevronUp className='w-4 h-4 sm:w-5 sm:h-5 text-white/90' />
						</motion.button>
					)}
				</AnimatePresence>

				{/* Mobile Navigation Button */}
				<motion.div
					className='lg:hidden fixed top-4 right-4 z-[60]'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}>
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className={cn(
							'bg-slate-800/90 backdrop-blur-md p-3 rounded-lg',
							'shadow-lg border border-slate-700/50',
							'hover:bg-slate-700/90 focus:ring-2 focus:ring-blue-400',
							'focus:outline-none transition-all duration-200',
							'active:scale-95'
						)}
						aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={isMobileMenuOpen}>
						{isMobileMenuOpen ? (
							<X className='w-5 h-5 text-slate-200' />
						) : (
							<Menu className='w-5 h-5 text-slate-200' />
						)}
					</button>
				</motion.div>

				{/* Mobile Navigation Drawer */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
								onClick={() => setIsMobileMenuOpen(false)}
							/>
							<motion.nav
								initial={{ opacity: 0, x: '100%' }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: '100%' }}
								transition={{ type: 'spring', damping: 25, stiffness: 200 }}
								className={cn(
									'fixed top-0 right-0 w-full max-w-sm h-full z-[70]',
									'bg-slate-900/98 backdrop-blur-md',
									'border-l border-slate-700/50 shadow-2xl'
								)}>
								<div className='p-4 sm:p-6 space-y-6 sm:space-y-8 h-full flex flex-col'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg sm:text-xl font-bold text-slate-100'>
											Navigation
										</h2>
										<button
											onClick={() => setIsMobileMenuOpen(false)}
											className={cn(
												'p-2 hover:bg-slate-700/50 rounded-md',
												'focus:ring-2 focus:ring-blue-400',
												'focus:outline-none transition-colors'
											)}
											aria-label='Close menu'>
											<X className='w-5 h-5 text-slate-200' />
										</button>
									</div>

									<nav className='flex flex-col gap-2 flex-1'>
										{navigationItems.map((item) => (
											<button
												key={item.id}
												onClick={() => {
													scrollToSection(item.id);
													setIsMobileMenuOpen(false);
												}}
												className={cn(
													'text-left py-3 sm:py-4 px-4 rounded-lg transition-all',
													'focus:ring-2 focus:ring-blue-400 focus:outline-none',
													'active:scale-98',
													activeSection === item.id
														? 'bg-blue-600/20 text-blue-400 font-medium'
														: 'hover:bg-slate-700/50 text-slate-200 hover:text-blue-400'
												)}>
												<span className='text-base sm:text-lg'>
													{item.name}
												</span>
											</button>
										))}
									</nav>

									<div className='space-y-3 pt-4 border-t border-slate-700/50'>
										<Link href='/login' className='block'>
											<Button
												variant='ghost'
												size='lg'
												className={cn(
													'w-full text-slate-200 text-base',
													'hover:text-blue-400 hover:bg-slate-700/50',
													'focus:ring-2 focus:ring-blue-400 py-3'
												)}>
												Log In
											</Button>
										</Link>
										<Link href='/signup' className='block'>
											<Button
												variant='default'
												size='lg'
												className={cn(
													'w-full bg-blue-600 hover:bg-blue-700 text-white text-base',
													'shadow-lg shadow-blue-500/20 py-3',
													'focus:ring-2 focus:ring-blue-400'
												)}>
												Sign Up
											</Button>
										</Link>
									</div>
								</div>
							</motion.nav>
						</>
					)}
				</AnimatePresence>

				{/* Desktop Navigation */}
				<motion.nav
					className={cn(
						'hidden lg:flex fixed top-0 left-0 right-0 z-40',
						'transition-all duration-300',
						isScrolled
							? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3'
							: 'bg-transparent py-6'
					)}
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					transition={{ type: 'spring', damping: 20 }}>
					<div className='max-w-7xl mx-auto w-full flex justify-between items-center px-6 xl:px-8'>
						<Link
							href='/'
							className={cn(
								'text-2xl font-bold text-slate-100',
								'hover:text-blue-400 transition-colors',
								'focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-2 py-1'
							)}>
							AdZPay
						</Link>

						<div className='flex gap-6 xl:gap-8'>
							{navigationItems.map((item) => (
								<button
									key={item.id}
									onClick={() => scrollToSection(item.id)}
									className={cn(
										'relative py-2 px-3 rounded-md transition-all group',
										'focus:outline-none focus:ring-2 focus:ring-blue-400',
										activeSection === item.id
											? 'text-blue-400 font-medium'
											: 'text-slate-200 hover:text-blue-400'
									)}>
									{item.name}
									{activeSection === item.id && (
										<motion.div
											layoutId='activeSection'
											className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400'
											transition={{
												type: 'spring',
												stiffness: 380,
												damping: 30,
											}}
										/>
									)}
									<span className='absolute inset-0 rounded-md bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity' />
								</button>
							))}
						</div>

						<div className='flex items-center gap-3 xl:gap-4'>
							<button
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
								className={cn(
									'p-2 rounded-md transition-colors',
									'hover:bg-slate-700/50',
									'focus:outline-none focus:ring-2 focus:ring-blue-400'
								)}
								aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
								{theme === 'dark' ? (
									<Sun className='w-5 h-5 text-slate-200' />
								) : (
									<Moon className='w-5 h-5 text-slate-200' />
								)}
							</button>

							<Link href='/login'>
								<Button
									variant='ghost'
									size='sm'
									className={cn(
										'text-slate-200',
										'hover:text-blue-400 hover:bg-slate-700/50',
										'focus:ring-2 focus:ring-blue-400'
									)}>
									Log In
								</Button>
							</Link>

							<Link href='/signup'>
								<Button
									variant='default'
									size='sm'
									className={cn(
										'bg-blue-600 hover:bg-blue-700 text-white',
										'shadow-lg shadow-blue-500/20 border-none',
										'focus:ring-2 focus:ring-blue-400'
									)}>
									Sign Up
								</Button>
							</Link>
						</div>
					</div>
				</motion.nav>

				{/* Content Sections Container */}
				<div className='relative w-full'>
					{/* Hero Section */}
					<motion.section
						id='hero'
						style={{ opacity, scale, y }}
						className='relative min-h-screen flex items-center justify-center w-full px-4 sm:px-6 lg:px-8'>
						<div className='absolute inset-0 w-full h-full bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80' />
						<div className='w-full max-w-7xl mx-auto'>
							<Hero />
						</div>
					</motion.section>

					{/* Trusted By Section */}
					<motion.section
						id='trusted-by'
						initial='hidden'
						animate={visibleSections.has('trusted-by') ? 'visible' : 'hidden'}
						variants={sectionVariants}
						className='relative w-full py-8 sm:py-12 lg:py-16'>
						<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<TrustedBy />
						</div>
					</motion.section>

					{/* Visual Features Section */}
					<motion.section
						id='visual-features'
						initial='hidden'
						animate={
							visibleSections.has('visual-features') ? 'visible' : 'hidden'
						}
						variants={sectionVariants}
						className='relative w-full py-0 overflow-hidden'>
						<VisualFeatures />
					</motion.section>

					{/* Features Section */}
					<motion.section
						id='features'
						initial='hidden'
						animate={visibleSections.has('features') ? 'visible' : 'hidden'}
						variants={sectionVariants}
						className='relative w-full py-12 sm:py-16 lg:py-24'>
						<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<Features />
						</div>
					</motion.section>

					{/* Testimonials Section */}
					<motion.section
						id='testimonials'
						initial='hidden'
						animate={visibleSections.has('testimonials') ? 'visible' : 'hidden'}
						variants={sectionVariants}
						className='relative w-full py-12 sm:py-16 lg:py-24'>
						<div className='absolute inset-0 w-full h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none' />
						<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<Testimonial />
						</div>
					</motion.section>

					{/* Pricing Section */}
					<motion.section
						id='pricing'
						initial='hidden'
						animate={visibleSections.has('pricing') ? 'visible' : 'hidden'}
						variants={sectionVariants}
						className='relative w-full py-12 sm:py-16 lg:py-24 bg-slate-900/30 backdrop-blur-[2px]'>
						<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<Pricing />
						</div>
					</motion.section>

					{/* FAQs Section */}
					<motion.section
						id='faq'
						initial='hidden'
						animate={visibleSections.has('faq') ? 'visible' : 'hidden'}
						variants={sectionVariants}
						className='relative w-full py-12 sm:py-16 lg:py-20'>
						<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<FAQs />
						</div>
					</motion.section>

					{/* CTA Section */}
					<motion.section
						id='cta'
						initial='hidden'
						animate={visibleSections.has('cta') ? 'visible' : 'hidden'}
						variants={sectionVariants}
						className='relative w-full py-12 sm:py-16 lg:py-24 overflow-hidden'>
						<div className='absolute inset-0 w-full h-full'>
							<div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10' />
							<div className='absolute inset-0 backdrop-blur-[2px]' />
						</div>
						<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
							<CTA />
						</div>
					</motion.section>

					{/* Live Chat Section */}
					<motion.section
						id='chat'
						initial='hidden'
						animate={visibleSections.has('chat') ? 'visible' : 'hidden'}
						variants={sectionVariants}
						className='relative w-full py-8 sm:py-12 lg:py-16 bg-slate-900/20'>
						<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<LiveChat />
						</div>
					</motion.section>
				</div>

				{/* Ambient Overlay */}
				<div className='fixed inset-0 pointer-events-none'>
					<div className='absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-slate-900/5 to-slate-900/20' />
					<div className='absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(62,99,221,0.03)_0%,transparent_100%)]' />
				</div>

				{/* Footer section */}
				<Footer />
			</main>
		</ThemeProvider>
	);
}

// Utility function for debouncing
function debounce(func: Function, wait: number) {
	let timeout: NodeJS.Timeout;
	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
