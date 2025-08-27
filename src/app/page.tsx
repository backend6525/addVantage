// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import { ChevronUp, Play, Sparkles, Zap } from 'lucide-react';
// import ParticleBackground from './components/ui/PaticleBackground/ParticleBackground';
// import Navigation from '@/app/components/ui/Navbar'; // Import the new navigation component
// import {
// 	motion,
// 	AnimatePresence,
// 	useScroll,
// 	useTransform,
// 	useSpring,
// 	useVelocity,
// } from 'framer-motion';
// import { ThemeProvider } from 'next-themes';
// import { cn } from '@/lib/utils';
// import Footer from './components/ui/Footer/Footer';

// // Enhanced design tokens with better color psychology and spacing
// const DESIGN_TOKENS = {
// 	animation: {
// 		duration: 0.6,
// 		ease: [0.25, 0.46, 0.45, 0.94],
// 		spring: { type: 'spring', damping: 25, stiffness: 400 },
// 		micro: { duration: 0.15, ease: 'easeOut' },
// 		stagger: { delayChildren: 0.1, staggerChildren: 0.05 },
// 	},
// 	spacing: {
// 		section: { mobile: 'py-8', desktop: 'py-12 lg:py-16' },
// 		container: 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto',
// 	},
// 	blur: {
// 		subtle: 'backdrop-blur-sm',
// 		medium: 'backdrop-blur-md',
// 		strong: 'backdrop-blur-xl',
// 	},
// 	glow: {
// 		subtle: 'shadow-lg shadow-blue-500/10',
// 		medium: 'shadow-xl shadow-blue-500/15',
// 		strong: 'shadow-2xl shadow-blue-500/25',
// 		accent: 'shadow-2xl shadow-purple-500/20',
// 	},
// 	gradient: {
// 		primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600',
// 		secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
// 		text: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
// 		border: 'bg-gradient-to-r from-blue-500/50 to-purple-500/50',
// 	},
// } as const;

// // Enhanced performance optimization with better detection
// const usePerformanceOptimization = () => {
// 	const [settings, setSettings] = useState({
// 		isReducedMotion: false,
// 		isParticlesEnabled: true,
// 		isHighPerformance: true,
// 		enableAdvancedAnimations: true,
// 	});

// 	useEffect(() => {
// 		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
// 		const contrastQuery = window.matchMedia('(prefers-contrast: high)');

// 		const checkPerformance = () => {
// 			const isLowMemory =
// 				'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
// 			const isSlowConnection =
// 				'connection' in navigator &&
// 				['slow-2g', '2g', '3g'].includes(
// 					(navigator as any).connection?.effectiveType
// 				);
// 			const isMobile = window.innerWidth < 768;

// 			setSettings({
// 				isReducedMotion: mediaQuery.matches,
// 				isParticlesEnabled:
// 					window.innerWidth >= 1024 && !isLowMemory && !isSlowConnection,
// 				isHighPerformance: !isLowMemory && !isSlowConnection,
// 				enableAdvancedAnimations:
// 					!isMobile && !isLowMemory && !mediaQuery.matches,
// 			});
// 		};

// 		checkPerformance();
// 		mediaQuery.addEventListener('change', checkPerformance);
// 		contrastQuery.addEventListener('change', checkPerformance);
// 		window.addEventListener('resize', checkPerformance);

// 		return () => {
// 			mediaQuery.removeEventListener('change', checkPerformance);
// 			contrastQuery.removeEventListener('change', checkPerformance);
// 			window.removeEventListener('resize', checkPerformance);
// 		};
// 	}, []);

// 	return settings;
// };

// // Enhanced scroll effects with smooth momentum
// const useScrollEffects = () => {
// 	const { scrollY, scrollYProgress } = useScroll();
// 	const scrollVelocity = useVelocity(scrollY);
// 	const smoothVelocity = useSpring(scrollVelocity, {
// 		damping: 50,
// 		stiffness: 400,
// 	});

// 	const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
// 	const [isScrolled, setIsScrolled] = useState(false);
// 	const [showScrollTop, setShowScrollTop] = useState(false);
// 	const [scrollProgress, setScrollProgress] = useState(0);

// 	useEffect(() => {
// 		return smoothVelocity.on('change', (latest) => {
// 			if (latest > 0) setScrollDirection('down');
// 			else if (latest < 0) setScrollDirection('up');
// 		});
// 	}, [smoothVelocity]);

// 	useEffect(() => {
// 		const unsubscribeY = scrollY.on('change', (latest) => {
// 			setIsScrolled(latest > 20);
// 			setShowScrollTop(latest > 800);
// 		});

// 		const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
// 			setScrollProgress(latest);
// 		});

// 		return () => {
// 			unsubscribeY();
// 			unsubscribeProgress();
// 		};
// 	}, [scrollY, scrollYProgress]);

// 	return {
// 		scrollY,
// 		scrollDirection,
// 		isScrolled,
// 		showScrollTop,
// 		scrollProgress,
// 	};
// };

// // Enhanced Loading Component
// const LoadingSpinner = () => (
// 	<div className='min-h-screen bg-slate-950 flex items-center justify-center'>
// 		<motion.div
// 			className='flex flex-col items-center space-y-6'
// 			initial={{ opacity: 0, scale: 0.8 }}
// 			animate={{ opacity: 1, scale: 1 }}
// 			transition={{ duration: 0.5 }}>
// 			<motion.div
// 				className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center'
// 				animate={{
// 					scale: [1, 1.1, 1],
// 					rotate: [0, 180, 360],
// 				}}
// 				transition={{
// 					duration: 2,
// 					repeat: Infinity,
// 					ease: 'easeInOut',
// 				}}>
// 				<Sparkles className='w-8 h-8 text-white' />
// 			</motion.div>

// 			<div className='space-y-3 text-center'>
// 				<motion.div
// 					className='flex space-x-1 justify-center'
// 					variants={{
// 						loading: {
// 							transition: {
// 								staggerChildren: 0.2,
// 							},
// 						},
// 					}}
// 					animate='loading'>
// 					{[...Array(3)].map((_, i) => (
// 						<motion.div
// 							key={i}
// 							className='w-2 h-2 bg-blue-400 rounded-full'
// 							variants={{
// 								loading: {
// 									y: [0, -10, 0],
// 									transition: {
// 										duration: 0.6,
// 										repeat: Infinity,
// 										ease: 'easeInOut',
// 									},
// 								},
// 							}}
// 						/>
// 					))}
// 				</motion.div>
// 				<p className='text-slate-400 font-medium'>
// 					Loading amazing experience...
// 				</p>
// 			</div>
// 		</motion.div>
// 	</div>
// );

// // Main component with enhancements
// export default function Home() {
// 	const [activeSection, setActiveSection] = useState('hero');
// 	const [isMounted, setIsMounted] = useState(false);

// 	const performanceSettings = usePerformanceOptimization();
// 	const { scrollY, scrollDirection, showScrollTop } = useScrollEffects();

// 	// Fixed parallax effects - more subtle and doesn't make hero disappear
// 	const heroOpacity = useTransform(scrollY, [0, 1000], [1, 0.7]);
// 	const heroY = useTransform(scrollY, [0, 1000], [0, 100]);

// 	const navigationItems = useMemo(
// 		() => [
// 			{ name: 'Home', id: 'hero' },
// 			{ name: 'Features', id: 'features' },
// 			{ name: 'Testimonials', id: 'testimonials' },
// 			{ name: 'Pricing', id: 'pricing' },
// 			{ name: 'FAQ', id: 'faq' },
// 			{ name: 'Careers', id: 'careers', href: '/careers' },
// 			{ name: 'Blogs', id: 'blogs', href: '/blogs' },
// 		],
// 		[]
// 	);

// 	// Fixed section visibility tracking
// 	const handleScroll = useCallback(() => {
// 		const sections = navigationItems.map((item) => item.id);
// 		const current = sections.find((section) => {
// 			const element = document.getElementById(section);
// 			if (element) {
// 				const rect = element.getBoundingClientRect();
// 				// Improved detection - consider top 30% of viewport for active section
// 				return (
// 					rect.top <= window.innerHeight * 0.3 &&
// 					rect.bottom >= window.innerHeight * 0.1
// 				);
// 			}
// 			return false;
// 		});

// 		if (current && current !== activeSection) {
// 			setActiveSection(current);
// 		}
// 	}, [navigationItems, activeSection]);

// 	useEffect(() => {
// 		const debouncedScroll = debounce(handleScroll, 10);
// 		window.addEventListener('scroll', debouncedScroll, { passive: true });
// 		handleScroll(); // Call immediately to set initial state
// 		return () => window.removeEventListener('scroll', debouncedScroll);
// 	}, [handleScroll]);

// 	// Fixed smooth scroll function
// 	const scrollToSection = useCallback(
// 		(sectionId: string) => {
// 			const element = document.getElementById(sectionId);
// 			if (element) {
// 				// Fixed offset calculation - account for fixed navigation
// 				const navHeight = 80;
// 				const targetPosition = element.offsetTop - navHeight;

// 				window.scrollTo({
// 					top: targetPosition,
// 					behavior: performanceSettings.isReducedMotion ? 'auto' : 'smooth',
// 				});

// 				// Update active section immediately for better UX
// 				setActiveSection(sectionId);
// 			}
// 		},
// 		[performanceSettings.isReducedMotion]
// 	);

// 	// Mount detection
// 	useEffect(() => {
// 		setIsMounted(true);
// 	}, []);

// 	// Enhanced keyboard navigation
// 	useEffect(() => {
// 		const handleKeyDown = (e: KeyboardEvent) => {
// 			// Quick navigation shortcuts
// 			if (e.ctrlKey || e.metaKey) {
// 				const keyMap = {
// 					'1': 'hero',
// 					'2': 'features',
// 					'3': 'testimonials',
// 					'4': 'pricing',
// 					'5': 'faq',
// 				};

// 				if (keyMap[e.key]) {
// 					e.preventDefault();
// 					scrollToSection(keyMap[e.key]);
// 				}
// 			}
// 		};

// 		document.addEventListener('keydown', handleKeyDown);
// 		return () => document.removeEventListener('keydown', handleKeyDown);
// 	}, [scrollToSection]);

// 	if (!isMounted) {
// 		return <LoadingSpinner />;
// 	}

// 	return (
// 		<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
// 			<main className='relative min-h-screen bg-slate-950 overflow-x-hidden'>
// 				{/* Enhanced background with depth */}
// 				<div className='fixed inset-0 w-full h-full pointer-events-none'>
// 					<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
// 					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent' />
// 					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent' />

// 					{/* Animated mesh gradient */}
// 					<motion.div
// 						className='absolute inset-0 opacity-30'
// 						animate={{
// 							background: [
// 								'radial-gradient(circle at 20% 80%, rgb(59 130 246 / 0.15) 0%, transparent 50%)',
// 								'radial-gradient(circle at 80% 20%, rgb(147 51 234 / 0.15) 0%, transparent 50%)',
// 								'radial-gradient(circle at 40% 40%, rgb(59 130 246 / 0.15) 0%, transparent 50%)',
// 							],
// 						}}
// 						transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
// 					/>
// 				</div>

// 				{/* Enhanced particles */}
// 				{performanceSettings.isParticlesEnabled &&
// 					!performanceSettings.isReducedMotion && (
// 						<motion.div
// 							initial={{ opacity: 0 }}
// 							animate={{ opacity: 0.6 }}
// 							transition={{ duration: 2 }}
// 							className='fixed inset-0 pointer-events-none z-10'>
// 							<ParticleBackground
// 								color='#3E63DD'
// 								count={25}
// 								speed={0.3}
// 								maxSize={2}
// 							/>
// 						</motion.div>
// 					)}

// 				{/* Enhanced scroll to top button */}
// 				<AnimatePresence>
// 					{showScrollTop && (
// 						<motion.button
// 							initial={{ opacity: 0, scale: 0.8, y: 20 }}
// 							animate={{
// 								opacity: scrollDirection === 'up' ? 1 : 0.8,
// 								scale: 1,
// 								y: 0,
// 							}}
// 							exit={{ opacity: 0, scale: 0.8, y: 20 }}
// 							whileHover={{
// 								scale: 1.1,
// 								y: -4,
// 								boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
// 							}}
// 							whileTap={{ scale: 0.9 }}
// 							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
// 							className={cn(
// 								'fixed bottom-8 right-8 z-50 p-4 rounded-2xl',
// 								DESIGN_TOKENS.gradient.primary,
// 								'text-white shadow-2xl border border-blue-500/20',
// 								'focus:outline-none focus:ring-2 focus:ring-blue-400/50'
// 							)}>
// 							<ChevronUp className='w-6 h-6' />
// 						</motion.button>
// 					)}
// 				</AnimatePresence>

// 				{/* Use the new Navigation component */}
// 				<Navigation
// 					activeSection={activeSection}
// 					scrollToSection={scrollToSection}
// 					navigationItems={navigationItems}
// 					pageType='home'
// 				/>

// 				{/* Content Sections with enhanced animations */}
// 				<div className='relative w-full'>
// 					{/* Hero Section with fixed parallax */}
// 					<motion.section
// 						id='hero'
// 						style={{
// 							opacity: performanceSettings.enableAdvancedAnimations
// 								? heroOpacity
// 								: 1,
// 							y: performanceSettings.enableAdvancedAnimations ? heroY : 0,
// 						}}
// 						className='relative min-h-screen flex items-center justify-center'>
// 						<div
// 							className={cn(DESIGN_TOKENS.spacing.container, 'relative z-20')}>
// 							<Hero />
// 						</div>
// 					</motion.section>

// 					{/* Enhanced section transitions */}
// 					{[
// 						{ Component: TrustedBy, id: 'trusted' },
// 						{ Component: VisualFeatures, id: 'visual-features' },
// 						{ Component: Features, id: 'features' },
// 						{ Component: Testimonial, id: 'testimonials' },
// 						{ Component: Pricing, id: 'pricing' },
// 						{ Component: FAQs, id: 'faq' },
// 						{ Component: CTA, id: 'cta' },
// 						{ Component: LiveChat, id: 'live-chat' },
// 					].map(({ Component, id }, index) => (
// 						<motion.section
// 							key={id}
// 							id={id === 'trusted' ? undefined : id}
// 							initial={{ opacity: 0, y: 60 }}
// 							whileInView={{ opacity: 1, y: 0 }}
// 							viewport={{ once: true, margin: '-15%' }}
// 							transition={{
// 								duration: 0.8,
// 								delay: performanceSettings.enableAdvancedAnimations ? 0.1 : 0,
// 								ease: [0.25, 0.46, 0.45, 0.94],
// 							}}
// 							className='relative w-full'>
// 							<Component />
// 						</motion.section>
// 					))}
// 				</div>

// 				{/* Enhanced Footer */}
// 				<motion.div
// 					initial={{ opacity: 0, y: 40 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					viewport={{ once: true }}
// 					transition={{ duration: 0.8 }}>
// 					<Footer />
// 				</motion.div>

// 				{/* Floating action button for demos */}
// 				<AnimatePresence>
// 					{activeSection === 'hero' && (
// 						<motion.div
// 							initial={{ opacity: 0, scale: 0.8, x: 100 }}
// 							animate={{ opacity: 1, scale: 1, x: 0 }}
// 							exit={{ opacity: 0, scale: 0.8, x: 100 }}
// 							className='fixed bottom-8 left-8 z-50 hidden lg:block'>
// 							<motion.button
// 								whileHover={{ scale: 1.05, y: -2 }}
// 								whileTap={{ scale: 0.95 }}
// 								className={cn(
// 									'flex items-center gap-3 px-6 py-4 rounded-2xl',
// 									'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50',
// 									'text-white hover:bg-slate-700/90 transition-all duration-300',
// 									'shadow-2xl hover:shadow-blue-500/20'
// 								)}>
// 								<Play className='w-5 h-5 text-blue-400' />
// 								<span className='font-medium'>Watch Demo</span>
// 							</motion.button>
// 						</motion.div>
// 					)}
// 				</AnimatePresence>
// 			</main>
// 		</ThemeProvider>
// 	);
// }

// // Utility function
// function debounce<T extends (...args: any[]) => any>(
// 	func: T,
// 	wait: number
// ): (...args: Parameters<T>) => void {
// 	let timeout: NodeJS.Timeout;
// 	return function executedFunction(...args: Parameters<T>) {
// 		const later = () => {
// 			clearTimeout(timeout);
// 			func(...args);
// 		};
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 	};
// }

// // Enhanced dynamic imports with better loading states
// const Hero = dynamic(() => import('@/app/components/ui/Hero/Hero'), {
// 	loading: () => (
// 		<div className='min-h-screen flex items-center justify-center'>
// 			<motion.div
// 				className='flex flex-col items-center space-y-8 w-full max-w-3xl px-4'
// 				initial={{ opacity: 0 }}
// 				animate={{ opacity: 1 }}>
// 				{/* Logo skeleton */}
// 				<motion.div
// 					className='w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center'
// 					animate={{
// 						scale: [1, 1.05, 1],
// 						rotate: [0, 5, -5, 0],
// 					}}
// 					transition={{
// 						duration: 2,
// 						repeat: Infinity,
// 						ease: 'easeInOut',
// 					}}>
// 					<Zap className='w-10 h-10 text-blue-400' />
// 				</motion.div>

// 				{/* Text skeletons */}
// 				<div className='space-y-6 text-center w-full'>
// 					{/* Main title skeleton */}
// 					<div className='space-y-4'>
// 						<motion.div
// 							className='h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl mx-auto'
// 							style={{ width: '400px', maxWidth: '90%' }}
// 							animate={{ opacity: [0.5, 1, 0.5] }}
// 							transition={{ duration: 2, repeat: Infinity }}
// 						/>
// 						<motion.div
// 							className='h-8 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl mx-auto'
// 							style={{ width: '350px', maxWidth: '80%' }}
// 							animate={{ opacity: [0.5, 1, 0.5] }}
// 							transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
// 						/>
// 					</div>

// 					{/* Subtitle skeleton */}
// 					<div className='space-y-3'>
// 						{[300, 280, 240].map((width, i) => (
// 							<motion.div
// 								key={i}
// 								className='h-4 bg-gradient-to-r from-slate-400/20 to-slate-500/20 rounded-xl mx-auto'
// 								style={{ width: `${width}px`, maxWidth: '90%' }}
// 								animate={{ opacity: [0.3, 0.7, 0.3] }}
// 								transition={{
// 									duration: 1.5,
// 									repeat: Infinity,
// 									delay: i * 0.1,
// 								}}
// 							/>
// 						))}
// 					</div>

// 					{/* Button skeletons */}
// 					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
// 						<motion.div
// 							className='h-12 w-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl'
// 							animate={{ opacity: [0.6, 1, 0.6] }}
// 							transition={{ duration: 1.5, repeat: Infinity }}
// 						/>
// 						<motion.div
// 							className='h-12 w-32 bg-gradient-to-r from-slate-600/20 to-slate-700/20 rounded-xl'
// 							animate={{ opacity: [0.4, 0.8, 0.4] }}
// 							transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
// 						/>
// 					</div>
// 				</div>

// 				{/* Stats skeleton */}
// 				<div className='flex justify-center gap-8 pt-8'>
// 					{[1, 2, 3].map((i) => (
// 						<motion.div
// 							key={i}
// 							className='text-center space-y-2'
// 							initial={{ opacity: 0, y: 20 }}
// 							animate={{ opacity: 1, y: 0 }}
// 							transition={{ delay: i * 0.2 }}>
// 							<motion.div
// 								className='h-8 w-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg mx-auto'
// 								animate={{ opacity: [0.5, 1, 0.5] }}
// 								transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
// 							/>
// 							<motion.div
// 								className='h-3 w-20 bg-slate-400/20 rounded mx-auto'
// 								animate={{ opacity: [0.3, 0.6, 0.3] }}
// 								transition={{
// 									duration: 1.8,
// 									repeat: Infinity,
// 									delay: i * 0.15,
// 								}}
// 							/>
// 						</motion.div>
// 					))}
// 				</div>
// 			</motion.div>
// 		</div>
// 	),
// });

// // Other components with enhanced loading states
// const TrustedBy = dynamic(
// 	() => import('@/app/components/ui/TrustedBy/TrustedBy'),
// 	{
// 		loading: () => (
// 			<div className={cn(DESIGN_TOKENS.spacing.container, 'py-16')}>
// 				<motion.div
// 					className='text-center space-y-8'
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}>
// 					<motion.div
// 						className='h-6 w-48 bg-slate-400/20 rounded-xl mx-auto'
// 						animate={{ opacity: [0.5, 1, 0.5] }}
// 						transition={{ duration: 2, repeat: Infinity }}
// 					/>
// 					<div className='flex justify-center items-center gap-8 flex-wrap'>
// 						{[...Array(5)].map((_, i) => (
// 							<motion.div
// 								key={i}
// 								className='w-32 h-12 bg-slate-700/20 rounded-xl'
// 								animate={{ opacity: [0.3, 0.7, 0.3] }}
// 								transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
// 							/>
// 						))}
// 					</div>
// 				</motion.div>
// 			</div>
// 		),
// 	}
// );

// const VisualFeatures = dynamic(
// 	() => import('@/app/components/ui/VisualFeatures/VisualFeatures'),
// 	{
// 		loading: () => (
// 			<div className={cn(DESIGN_TOKENS.spacing.container, 'py-20')}>
// 				<motion.div
// 					className='grid lg:grid-cols-2 gap-12 items-center'
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}>
// 					<div className='space-y-6'>
// 						<motion.div
// 							className='h-8 w-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl'
// 							animate={{ opacity: [0.5, 1, 0.5] }}
// 							transition={{ duration: 2, repeat: Infinity }}
// 						/>
// 						<div className='space-y-3'>
// 							{[...Array(3)].map((_, i) => (
// 								<motion.div
// 									key={i}
// 									className='h-4 bg-slate-400/20 rounded-xl'
// 									style={{ width: `${90 - i * 10}%` }}
// 									animate={{ opacity: [0.3, 0.7, 0.3] }}
// 									transition={{
// 										duration: 1.5,
// 										repeat: Infinity,
// 										delay: i * 0.1,
// 									}}
// 								/>
// 							))}
// 						</div>
// 					</div>
// 					<motion.div
// 						className='aspect-video bg-gradient-to-br from-slate-700/20 to-slate-800/20 rounded-3xl'
// 						animate={{ opacity: [0.4, 0.8, 0.4] }}
// 						transition={{ duration: 2, repeat: Infinity }}
// 					/>
// 				</motion.div>
// 			</div>
// 		),
// 	}
// );

// const Features = dynamic(
// 	() => import('@/app/components/ui/Features/Features'),
// 	{
// 		loading: () => (
// 			<div className={cn(DESIGN_TOKENS.spacing.container, 'py-20')}>
// 				<motion.div
// 					className='text-center space-y-16'
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}>
// 					<div className='space-y-4'>
// 						<motion.div
// 							className='h-10 w-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl mx-auto'
// 							animate={{ opacity: [0.5, 1, 0.5] }}
// 							transition={{ duration: 2, repeat: Infinity }}
// 						/>
// 						<motion.div
// 							className='h-5 w-96 bg-slate-400/20 rounded-xl mx-auto'
// 							animate={{ opacity: [0.3, 0.7, 0.3] }}
// 							transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
// 						/>
// 					</div>
// 					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
// 						{[...Array(6)].map((_, i) => (
// 							<motion.div
// 								key={i}
// 								className='p-6 bg-slate-800/20 rounded-3xl space-y-4'
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ delay: i * 0.1 }}>
// 								<motion.div
// 									className='w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl'
// 									animate={{ opacity: [0.5, 1, 0.5] }}
// 									transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
// 								/>
// 								<motion.div
// 									className='h-6 w-32 bg-slate-400/20 rounded-xl'
// 									animate={{ opacity: [0.4, 0.8, 0.4] }}
// 									transition={{
// 										duration: 1.8,
// 										repeat: Infinity,
// 										delay: i * 0.05,
// 									}}
// 								/>
// 								<div className='space-y-2'>
// 									{[...Array(2)].map((_, j) => (
// 										<motion.div
// 											key={j}
// 											className='h-3 bg-slate-500/20 rounded'
// 											style={{ width: `${85 - j * 15}%` }}
// 											animate={{ opacity: [0.3, 0.6, 0.3] }}
// 											transition={{
// 												duration: 1.5,
// 												repeat: Infinity,
// 												delay: (i + j) * 0.05,
// 											}}
// 										/>
// 									))}
// 								</div>
// 							</motion.div>
// 						))}
// 					</div>
// 				</motion.div>
// 			</div>
// 		),
// 	}
// );

// const CTA = dynamic(() => import('@/app/components/ui/CTA/CTA'));
// const Testimonial = dynamic(
// 	() => import('@/app/components/ui/Testimonial/Testimonial')
// );
// const Pricing = dynamic(() => import('@/app/components/ui/Pricing/Pricing'));
// const FAQs = dynamic(() => import('@/app/components/ui/FAQs/FAQs'));
// const LiveChat = dynamic(() => import('@/app/components/ui/LiveChat/LiveChat'));

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ChevronUp, Play, Sparkles, Zap } from 'lucide-react';
import ParticleBackground from './components/ui/PaticleBackground/ParticleBackground';
import Navigation from '@/app/components/ui/Navbar';
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
	useSpring,
	useVelocity,
} from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import Footer from './components/ui/Footer/Footer';

// Enhanced design tokens with better cross-browser consistency
const DESIGN_TOKENS = {
	animation: {
		duration: 0.6,
		ease: [0.25, 0.46, 0.45, 0.94],
		spring: { type: 'spring', damping: 25, stiffness: 400 },
		micro: { duration: 0.15, ease: 'easeOut' },
		stagger: { delayChildren: 0.1, staggerChildren: 0.05 },
	},
	spacing: {
		section: {
			mobile: 'py-8 sm:py-12',
			desktop: 'py-12 lg:py-16 xl:py-20',
		},
		container: 'px-4 sm:px-6 lg:px-8 mx-auto w-full',
		maxWidth: 'max-w-7xl',
	},
	blur: {
		subtle: 'backdrop-blur-sm',
		medium: 'backdrop-blur-md',
		strong: 'backdrop-blur-xl',
	},
	glow: {
		subtle: 'shadow-lg shadow-blue-500/10',
		medium: 'shadow-xl shadow-blue-500/15',
		strong: 'shadow-2xl shadow-blue-500/25',
		accent: 'shadow-2xl shadow-purple-500/20',
	},
	gradient: {
		primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600',
		secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
		text: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
		border: 'bg-gradient-to-r from-blue-500/50 to-purple-500/50',
	},
	// Cross-browser font settings
	typography: {
		fontSmooth: 'antialiased',
		textRender: 'optimizeLegibility',
	},
} as const;

// Enhanced browser detection and compatibility
const useBrowserCompatibility = () => {
	const [browserInfo, setBrowserInfo] = useState({
		isFirefox: false,
		isSafari: false,
		isChrome: false,
		isEdge: false,
		supportsBackdropFilter: false,
		supportsScrollBehavior: false,
		isMobile: false,
		isIOS: false,
		pixelRatio: 1,
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const userAgent = navigator.userAgent.toLowerCase();
		const isFirefox = userAgent.includes('firefox');
		const isSafari =
			userAgent.includes('safari') && !userAgent.includes('chrome');
		const isChrome =
			userAgent.includes('chrome') && !userAgent.includes('edge');
		const isEdge = userAgent.includes('edge') || userAgent.includes('edg/');
		const isMobile =
			/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
				userAgent
			);
		const isIOS = /ipad|iphone|ipod/.test(userAgent);

		// Test for backdrop-filter support
		const supportsBackdropFilter =
			CSS.supports('backdrop-filter', 'blur(10px)') ||
			CSS.supports('-webkit-backdrop-filter', 'blur(10px)');

		// Test for smooth scroll support
		const supportsScrollBehavior =
			'scrollBehavior' in document.documentElement.style;

		setBrowserInfo({
			isFirefox,
			isSafari,
			isChrome,
			isEdge,
			supportsBackdropFilter,
			supportsScrollBehavior,
			isMobile,
			isIOS,
			pixelRatio: window.devicePixelRatio || 1,
		});

		// Apply browser-specific fixes
		document.documentElement.style.setProperty(
			'--browser-font-smooth',
			isSafari || isIOS
				? '-webkit-font-smoothing: antialiased'
				: 'font-smooth: auto'
		);

		// Fix for Safari's 100vh issue
		if (isSafari || isIOS) {
			const setVH = () => {
				const vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			};
			setVH();
			window.addEventListener('resize', setVH);
			return () => window.removeEventListener('resize', setVH);
		}
	}, []);

	return browserInfo;
};

// Enhanced performance optimization with browser-specific settings
const usePerformanceOptimization = () => {
	const [settings, setSettings] = useState({
		isReducedMotion: false,
		isParticlesEnabled: true,
		isHighPerformance: true,
		enableAdvancedAnimations: true,
	});

	const browserInfo = useBrowserCompatibility();

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const contrastQuery = window.matchMedia('(prefers-contrast: high)');

		const checkPerformance = () => {
			const isLowMemory =
				'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
			const isSlowConnection =
				'connection' in navigator &&
				['slow-2g', '2g', '3g'].includes(
					(navigator as any).connection?.effectiveType
				);

			// Browser-specific performance adjustments
			const browserPerformanceFactor = browserInfo.isFirefox
				? 0.8
				: browserInfo.isSafari
					? 0.9
					: 1;

			setSettings({
				isReducedMotion: mediaQuery.matches,
				isParticlesEnabled:
					window.innerWidth >= 1024 &&
					!isLowMemory &&
					!isSlowConnection &&
					!browserInfo.isMobile &&
					browserPerformanceFactor > 0.8,
				isHighPerformance:
					!isLowMemory && !isSlowConnection && browserPerformanceFactor > 0.8,
				enableAdvancedAnimations:
					!browserInfo.isMobile &&
					!isLowMemory &&
					!mediaQuery.matches &&
					browserPerformanceFactor > 0.7,
			});
		};

		checkPerformance();
		mediaQuery.addEventListener('change', checkPerformance);
		contrastQuery.addEventListener('change', checkPerformance);
		window.addEventListener('resize', checkPerformance);

		return () => {
			mediaQuery.removeEventListener('change', checkPerformance);
			contrastQuery.removeEventListener('change', checkPerformance);
			window.removeEventListener('resize', checkPerformance);
		};
	}, [browserInfo]);

	return settings;
};

// Enhanced scroll effects with cross-browser smooth scrolling
const useScrollEffects = () => {
	const { scrollY, scrollYProgress } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});

	const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
	const [isScrolled, setIsScrolled] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	const browserInfo = useBrowserCompatibility();

	// Cross-browser smooth scroll function
	const smoothScrollTo = useCallback(
		(top: number) => {
			if (browserInfo.supportsScrollBehavior) {
				window.scrollTo({ top, behavior: 'smooth' });
			} else {
				// Fallback for older browsers
				const startPosition = window.pageYOffset;
				const distance = top - startPosition;
				const duration = Math.min(Math.abs(distance) / 2, 1000);
				let start: number;

				const step = (timestamp: number) => {
					if (!start) start = timestamp;
					const progress = Math.min((timestamp - start) / duration, 1);
					const ease = 0.5 - Math.cos(progress * Math.PI) / 2; // easeInOutSine
					window.scrollTo(0, startPosition + distance * ease);

					if (progress < 1) {
						requestAnimationFrame(step);
					}
				};

				requestAnimationFrame(step);
			}
		},
		[browserInfo.supportsScrollBehavior]
	);

	useEffect(() => {
		return smoothVelocity.on('change', (latest) => {
			if (latest > 0) setScrollDirection('down');
			else if (latest < 0) setScrollDirection('up');
		});
	}, [smoothVelocity]);

	useEffect(() => {
		const unsubscribeY = scrollY.on('change', (latest) => {
			setIsScrolled(latest > 20);
			setShowScrollTop(latest > 800);
		});

		const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
			setScrollProgress(latest);
		});

		return () => {
			unsubscribeY();
			unsubscribeProgress();
		};
	}, [scrollY, scrollYProgress]);

	return {
		scrollY,
		scrollDirection,
		isScrolled,
		showScrollTop,
		scrollProgress,
		smoothScrollTo,
	};
};

// Enhanced Loading Component with better cross-browser support
const LoadingSpinner = () => (
	<div
		className='min-h-screen bg-slate-950 flex items-center justify-center p-4'
		style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
		<motion.div
			className='flex flex-col items-center space-y-6 max-w-sm w-full'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}>
			<motion.div
				className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center'
				animate={{
					scale: [1, 1.1, 1],
					rotate: [0, 180, 360],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut',
				}}>
				<Sparkles className='w-8 h-8 text-white' />
			</motion.div>

			<div className='space-y-3 text-center'>
				<motion.div
					className='flex space-x-1 justify-center'
					variants={{
						loading: {
							transition: {
								staggerChildren: 0.2,
							},
						},
					}}
					animate='loading'>
					{[...Array(3)].map((_, i) => (
						<motion.div
							key={i}
							className='w-2 h-2 bg-blue-400 rounded-full'
							variants={{
								loading: {
									y: [0, -10, 0],
									transition: {
										duration: 0.6,
										repeat: Infinity,
										ease: 'easeInOut',
									},
								},
							}}
						/>
					))}
				</motion.div>
				<p className='text-slate-400 font-medium text-sm sm:text-base'>
					Loading amazing experience...
				</p>
			</div>
		</motion.div>
	</div>
);

// Main component with enhanced cross-browser support
export default function Home() {
	const [activeSection, setActiveSection] = useState('hero');
	const [isMounted, setIsMounted] = useState(false);

	const browserInfo = useBrowserCompatibility();
	const performanceSettings = usePerformanceOptimization();
	const { scrollY, scrollDirection, showScrollTop, smoothScrollTo } =
		useScrollEffects();

	// Enhanced parallax effects with browser-specific optimizations
	const heroOpacity = useTransform(scrollY, [0, 1000], [1, 0.7]);
	const heroY = useTransform(
		scrollY,
		[0, 1000],
		[0, browserInfo.isSafari ? 50 : 100]
	);

	const navigationItems = useMemo(
		() => [
			{ name: 'Home', id: 'hero' },
			{ name: 'Features', id: 'features' },
			{ name: 'Testimonials', id: 'testimonials' },
			{ name: 'Pricing', id: 'pricing' },
			{ name: 'FAQ', id: 'faq' },
			{ name: 'Careers', id: 'careers', href: '/careers' },
			{ name: 'Blogs', id: 'blogs', href: '/blogs' },
		],
		[]
	);

	// Enhanced section visibility tracking with better performance
	const handleScroll = useCallback(() => {
		const sections = navigationItems.map((item) => item.id);
		const viewportHeight = window.innerHeight;

		const current = sections.find((section) => {
			const element = document.getElementById(section);
			if (element) {
				const rect = element.getBoundingClientRect();
				// More reliable detection across browsers
				return (
					rect.top <= viewportHeight * 0.3 &&
					rect.bottom >= viewportHeight * 0.1
				);
			}
			return false;
		});

		if (current && current !== activeSection) {
			setActiveSection(current);
		}
	}, [navigationItems, activeSection]);

	useEffect(() => {
		const debouncedScroll = debounce(handleScroll, 10);
		window.addEventListener('scroll', debouncedScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', debouncedScroll);
	}, [handleScroll]);

	// Enhanced smooth scroll function with cross-browser support
	const scrollToSection = useCallback(
		(sectionId: string) => {
			const element = document.getElementById(sectionId);
			if (element) {
				const navHeight = 80;
				const elementTop =
					element.getBoundingClientRect().top + window.pageYOffset;
				const targetPosition = elementTop - navHeight;

				smoothScrollTo(targetPosition);
				setActiveSection(sectionId);
			}
		},
		[smoothScrollTo]
	);

	// Mount detection with browser compatibility check
	useEffect(() => {
		// Ensure all browser-specific styles are applied
		const timer = setTimeout(() => {
			setIsMounted(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	// Enhanced keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey) {
				const keyMap: Record<string, string> = {
					'1': 'hero',
					'2': 'features',
					'3': 'testimonials',
					'4': 'pricing',
					'5': 'faq',
				};

				if (keyMap[e.key]) {
					e.preventDefault();
					scrollToSection(keyMap[e.key]);
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [scrollToSection]);

	if (!isMounted) {
		return <LoadingSpinner />;
	}

	// Browser-specific backdrop filter fallback
	const getBackdropStyles = (blur: string) => {
		if (!browserInfo.supportsBackdropFilter) {
			return 'bg-slate-900/95';
		}
		return `${blur} bg-slate-900/80`;
	};

	return (
		<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
			<main
				className={cn(
					'relative min-h-screen bg-slate-950 overflow-x-hidden',
					DESIGN_TOKENS.typography.fontSmooth,
					// Browser-specific fixes
					browserInfo.isFirefox && 'firefox-optimized',
					browserInfo.isSafari && 'safari-optimized',
					browserInfo.isIOS && 'ios-optimized'
				)}
				style={{
					minHeight:
						browserInfo.isSafari || browserInfo.isIOS
							? 'calc(var(--vh, 1vh) * 100)'
							: '100vh',
					textRendering: 'optimizeLegibility',
					WebkitFontSmoothing: 'antialiased',
					MozOsxFontSmoothing: 'grayscale',
				}}>
				{/* Enhanced background with better browser support */}
				<div className='fixed inset-0 w-full h-full pointer-events-none'>
					<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
					<div
						className='absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent'
						style={{
							background: browserInfo.isFirefox
								? 'radial-gradient(ellipse at top left, rgba(30, 58, 138, 0.2) 0%, transparent 50%)'
								: 'radial-gradient(ellipse at top left, rgb(30 58 138 / 0.2) 0%, transparent 50%)',
						}}
					/>
					<div
						className='absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent'
						style={{
							background: browserInfo.isFirefox
								? 'radial-gradient(ellipse at bottom right, rgba(88, 28, 135, 0.2) 0%, transparent 50%)'
								: 'radial-gradient(ellipse at bottom right, rgb(88 28 135 / 0.2) 0%, transparent 50%)',
						}}
					/>

					{/* Animated mesh gradient with browser compatibility */}
					{performanceSettings.enableAdvancedAnimations && (
						<motion.div
							className='absolute inset-0 opacity-30'
							animate={{
								background: browserInfo.isFirefox
									? [
											'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
											'radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
											'radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
										]
									: [
											'radial-gradient(circle at 20% 80%, rgb(59 130 246 / 0.15) 0%, transparent 50%)',
											'radial-gradient(circle at 80% 20%, rgb(147 51 234 / 0.15) 0%, transparent 50%)',
											'radial-gradient(circle at 40% 40%, rgb(59 130 246 / 0.15) 0%, transparent 50%)',
										],
							}}
							transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
						/>
					)}
				</div>

				{/* Enhanced particles with performance optimization */}
				{performanceSettings.isParticlesEnabled &&
					!performanceSettings.isReducedMotion && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: browserInfo.isMobile ? 0.4 : 0.6 }}
							transition={{ duration: 2 }}
							className='fixed inset-0 pointer-events-none z-10'>
							<ParticleBackground
								color='#3E63DD'
								count={browserInfo.isMobile ? 15 : 25}
								speed={browserInfo.isSafari ? 0.2 : 0.3}
								maxSize={2}
							/>
						</motion.div>
					)}

				{/* Enhanced scroll to top button */}
				<AnimatePresence>
					{showScrollTop && (
						<motion.button
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{
								opacity: scrollDirection === 'up' ? 1 : 0.8,
								scale: 1,
								y: 0,
							}}
							exit={{ opacity: 0, scale: 0.8, y: 20 }}
							whileHover={
								performanceSettings.enableAdvancedAnimations
									? {
											scale: 1.1,
											y: -4,
											boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
										}
									: { scale: 1.05 }
							}
							whileTap={{ scale: 0.9 }}
							onClick={() => smoothScrollTo(0)}
							className={cn(
								'fixed bottom-6 right-6 z-50 p-3 sm:p-4 rounded-2xl',
								'bottom-safe-offset-6 right-safe-offset-6', // Safe area insets for mobile
								DESIGN_TOKENS.gradient.primary,
								'text-white shadow-2xl border border-blue-500/20',
								'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
								'touch-manipulation' // Better mobile interaction
							)}>
							<ChevronUp className='w-5 h-5 sm:w-6 sm:h-6' />
						</motion.button>
					)}
				</AnimatePresence>

				{/* Navigation with enhanced mobile support */}
				<Navigation
					activeSection={activeSection}
					scrollToSection={scrollToSection}
					navigationItems={navigationItems}
					pageType='home'
				/>

				{/* Content Sections with enhanced responsive design */}
				<div className='relative w-full'>
					{/* Hero Section with enhanced cross-browser support */}

					<motion.section
						id='hero'
						style={{
							opacity: performanceSettings.enableAdvancedAnimations
								? heroOpacity
								: 1,
							y: performanceSettings.enableAdvancedAnimations ? heroY : 0,
							height:
								browserInfo.isSafari || browserInfo.isIOS
									? 'calc(var(--vh, 1vh) * 100)'
									: undefined,
						}}
						className={cn(
							'relative flex items-center justify-center',
							browserInfo.isSafari || browserInfo.isIOS
								? 'h-screen'
								: 'min-h-screen'
						)}>
						<div
							className={cn(
								DESIGN_TOKENS.spacing.container,
								DESIGN_TOKENS.spacing.maxWidth,
								'relative z-20 w-full'
							)}>
							<Hero />
						</div>
					</motion.section>

					{/* Enhanced section transitions with better performance */}
					{[
						{ Component: TrustedBy, id: 'trusted' },
						{ Component: VisualFeatures, id: 'visual-features' },
						{ Component: Features, id: 'features' },
						{ Component: Testimonial, id: 'testimonials' },
						{ Component: Pricing, id: 'pricing' },
						{ Component: FAQs, id: 'faq' },
						{ Component: CTA, id: 'cta' },
						{ Component: LiveChat, id: 'live-chat' },
					].map(({ Component, id }, index) => (
						<motion.section
							key={id}
							id={id === 'trusted' ? undefined : id}
							initial={
								performanceSettings.enableAdvancedAnimations
									? {
											opacity: 0,
											y: 60,
										}
									: { opacity: 1, y: 0 }
							}
							whileInView={
								performanceSettings.enableAdvancedAnimations
									? {
											opacity: 1,
											y: 0,
										}
									: undefined
							}
							viewport={{ once: true, margin: '-15%' }}
							transition={{
								duration: performanceSettings.enableAdvancedAnimations
									? 0.8
									: 0,
								delay: performanceSettings.enableAdvancedAnimations ? 0.1 : 0,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							className='relative w-full'>
							<Component />
						</motion.section>
					))}
				</div>

				{/* Enhanced Footer */}
				<motion.div
					initial={
						performanceSettings.enableAdvancedAnimations
							? {
									opacity: 0,
									y: 40,
								}
							: { opacity: 1, y: 0 }
					}
					whileInView={
						performanceSettings.enableAdvancedAnimations
							? {
									opacity: 1,
									y: 0,
								}
							: undefined
					}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<Footer />
				</motion.div>

				{/* Floating action button with enhanced mobile support */}
				<AnimatePresence>
					{activeSection === 'hero' && !browserInfo.isMobile && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8, x: 100 }}
							animate={{ opacity: 1, scale: 1, x: 0 }}
							exit={{ opacity: 0, scale: 0.8, x: 100 }}
							className='fixed bottom-6 left-6 z-50 hidden lg:block bottom-safe-offset-6 left-safe-offset-6'>
							<motion.button
								whileHover={
									performanceSettings.enableAdvancedAnimations
										? {
												scale: 1.05,
												y: -2,
											}
										: { scale: 1.02 }
								}
								whileTap={{ scale: 0.95 }}
								className={cn(
									'flex items-center gap-3 px-6 py-4 rounded-2xl',
									getBackdropStyles(DESIGN_TOKENS.blur.strong),
									'border border-slate-700/50',
									'text-white hover:bg-slate-700/90 transition-all duration-300',
									'shadow-2xl hover:shadow-blue-500/20',
									'touch-manipulation'
								)}>
								<Play className='w-5 h-5 text-blue-400' />
								<span className='font-medium'>Watch Demo</span>
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Browser-specific CSS fixes */}
				<style jsx global>{`
					/* Safari and iOS specific fixes */
					.safari-optimized {
						-webkit-overflow-scrolling: touch;
					}

					.ios-optimized {
						-webkit-overflow-scrolling: touch;
						-webkit-transform: translateZ(0);
					}

					/* Firefox specific optimizations */
					.firefox-optimized {
						scrollbar-width: thin;
						scrollbar-color: rgb(71 85 105) transparent;
					}

					/* Safe area insets for mobile devices */
					@supports (padding: env(safe-area-inset-bottom)) {
						.bottom-safe-offset-6 {
							bottom: max(1.5rem, env(safe-area-inset-bottom));
						}
						.right-safe-offset-6 {
							right: max(1.5rem, env(safe-area-inset-right));
						}
						.left-safe-offset-6 {
							left: max(1.5rem, env(safe-area-inset-left));
						}
					}

					/* Backdrop filter fallback */
					@supports not (backdrop-filter: blur(10px)) {
						.backdrop-blur-xl {
							background-color: rgb(15 23 42 / 0.95) !important;
						}
						.backdrop-blur-md {
							background-color: rgb(15 23 42 / 0.9) !important;
						}
						.backdrop-blur-sm {
							background-color: rgb(15 23 42 / 0.85) !important;
						}
					}

					/* Custom scrollbar for webkit browsers */
					::-webkit-scrollbar {
						width: 8px;
					}

					::-webkit-scrollbar-track {
						background: transparent;
					}

					::-webkit-scrollbar-thumb {
						background-color: rgb(71 85 105);
						border-radius: 4px;
						border: 2px solid transparent;
						background-clip: content-box;
					}

					::-webkit-scrollbar-thumb:hover {
						background-color: rgb(100 116 139);
					}

					/* Fix for gradient text in older browsers */
					@supports not (background-clip: text) {
						.bg-clip-text.text-transparent {
							color: rgb(96 165 250);
							background: none;
						}
					}
				`}</style>
			</main>
		</ThemeProvider>
	);
}

// Enhanced utility function with better performance
function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Enhanced dynamic imports with better loading states and error boundaries
const Hero = dynamic(() => import('@/app/components/ui/Hero/Hero'), {
	loading: () => (
		<div
			className='min-h-screen flex items-center justify-center p-4'
			style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
			<motion.div
				className='flex flex-col items-center space-y-8 w-full max-w-4xl'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}>
				{/* Enhanced logo skeleton */}
				<motion.div
					className='w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center'
					animate={{
						scale: [1, 1.05, 1],
						rotate: [0, 5, -5, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}>
					<Zap className='w-10 h-10 text-blue-400' />
				</motion.div>

				{/* Enhanced text skeletons with better responsiveness */}
				<div className='space-y-6 text-center w-full'>
					{/* Main title skeleton */}
					<div className='space-y-4'>
						<motion.div
							className='h-6 sm:h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl mx-auto'
							style={{ width: 'min(400px, 90vw)' }}
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<motion.div
							className='h-6 sm:h-8 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl mx-auto'
							style={{ width: 'min(350px, 80vw)' }}
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
						/>
					</div>

					{/* Subtitle skeleton */}
					<div className='space-y-3 max-w-2xl mx-auto'>
						{[80, 75, 60].map((width, i) => (
							<motion.div
								key={i}
								className='h-3 sm:h-4 bg-gradient-to-r from-slate-400/20 to-slate-500/20 rounded-xl mx-auto'
								style={{ width: `${width}%` }}
								animate={{ opacity: [0.3, 0.7, 0.3] }}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									delay: i * 0.1,
								}}
							/>
						))}
					</div>

					{/* Button skeletons */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
						<motion.div
							className='h-12 w-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl'
							animate={{ opacity: [0.6, 1, 0.6] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
						<motion.div
							className='h-12 w-32 bg-gradient-to-r from-slate-600/20 to-slate-700/20 rounded-xl'
							animate={{ opacity: [0.4, 0.8, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
						/>
					</div>
				</div>

				{/* Stats skeleton with better mobile layout */}
				<div className='flex flex-wrap justify-center gap-4 sm:gap-8 pt-8 w-full'>
					{[1, 2, 3].map((i) => (
						<motion.div
							key={i}
							className='text-center space-y-2 min-w-0 flex-shrink-0'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.2 }}>
							<motion.div
								className='h-6 sm:h-8 w-12 sm:w-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg mx-auto'
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
							/>
							<motion.div
								className='h-2 sm:h-3 w-16 sm:w-20 bg-slate-400/20 rounded mx-auto'
								animate={{ opacity: [0.3, 0.6, 0.3] }}
								transition={{
									duration: 1.8,
									repeat: Infinity,
									delay: i * 0.15,
								}}
							/>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	),
	ssr: false,
});

// Enhanced loading states for other components
const TrustedBy = dynamic(
	() => import('@/app/components/ui/TrustedBy/TrustedBy'),
	{
		loading: () => (
			<div
				className={cn(
					DESIGN_TOKENS.spacing.container,
					DESIGN_TOKENS.spacing.maxWidth,
					'py-12 sm:py-16'
				)}>
				<motion.div
					className='text-center space-y-8'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<motion.div
						className='h-5 sm:h-6 w-40 sm:w-48 bg-slate-400/20 rounded-xl mx-auto'
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
					<div className='flex justify-center items-center gap-6 sm:gap-8 flex-wrap'>
						{[...Array(5)].map((_, i) => (
							<motion.div
								key={i}
								className='w-24 sm:w-32 h-8 sm:h-12 bg-slate-700/20 rounded-xl flex-shrink-0'
								animate={{ opacity: [0.3, 0.7, 0.3] }}
								transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
							/>
						))}
					</div>
				</motion.div>
			</div>
		),
		ssr: false,
	}
);

const VisualFeatures = dynamic(
	() => import('@/app/components/ui/VisualFeatures/VisualFeatures'),
	{
		loading: () => (
			<div
				className={cn(
					DESIGN_TOKENS.spacing.container,
					DESIGN_TOKENS.spacing.maxWidth,
					'py-16 sm:py-20'
				)}>
				<motion.div
					className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<div className='space-y-6 order-2 lg:order-1'>
						<motion.div
							className='h-6 sm:h-8 w-64 sm:w-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl'
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<div className='space-y-3'>
							{[90, 80, 70].map((width, i) => (
								<motion.div
									key={i}
									className='h-3 sm:h-4 bg-slate-400/20 rounded-xl'
									style={{ width: `${width}%` }}
									animate={{ opacity: [0.3, 0.7, 0.3] }}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										delay: i * 0.1,
									}}
								/>
							))}
						</div>
					</div>
					<motion.div
						className='aspect-video bg-gradient-to-br from-slate-700/20 to-slate-800/20 rounded-2xl sm:rounded-3xl order-1 lg:order-2'
						animate={{ opacity: [0.4, 0.8, 0.4] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				</motion.div>
			</div>
		),
		ssr: false,
	}
);

const Features = dynamic(
	() => import('@/app/components/ui/Features/Features'),
	{
		loading: () => (
			<div
				className={cn(
					DESIGN_TOKENS.spacing.container,
					DESIGN_TOKENS.spacing.maxWidth,
					'py-16 sm:py-20'
				)}>
				<motion.div
					className='text-center space-y-12 sm:space-y-16'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<div className='space-y-4'>
						<motion.div
							className='h-8 sm:h-10 w-48 sm:w-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl mx-auto'
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<motion.div
							className='h-4 sm:h-5 w-72 sm:w-96 bg-slate-400/20 rounded-xl mx-auto'
							animate={{ opacity: [0.3, 0.7, 0.3] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
						/>
					</div>
					<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
						{[...Array(6)].map((_, i) => (
							<motion.div
								key={i}
								className='p-4 sm:p-6 bg-slate-800/20 rounded-2xl sm:rounded-3xl space-y-4'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.1 }}>
								<motion.div
									className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl'
									animate={{ opacity: [0.5, 1, 0.5] }}
									transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
								/>
								<motion.div
									className='h-5 sm:h-6 w-24 sm:w-32 bg-slate-400/20 rounded-xl'
									animate={{ opacity: [0.4, 0.8, 0.4] }}
									transition={{
										duration: 1.8,
										repeat: Infinity,
										delay: i * 0.05,
									}}
								/>
								<div className='space-y-2'>
									{[85, 70].map((width, j) => (
										<motion.div
											key={j}
											className='h-2.5 sm:h-3 bg-slate-500/20 rounded'
											style={{ width: `${width}%` }}
											animate={{ opacity: [0.3, 0.6, 0.3] }}
											transition={{
												duration: 1.5,
												repeat: Infinity,
												delay: (i + j) * 0.05,
											}}
										/>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		),
		ssr: false,
	}
);

// Other enhanced components with SSR disabled and better error handling
const CTA = dynamic(() => import('@/app/components/ui/CTA/CTA'), {
	ssr: false,
	loading: () => (
		<div
			className={cn(
				DESIGN_TOKENS.spacing.container,
				DESIGN_TOKENS.spacing.maxWidth,
				'py-16'
			)}>
			<div className='text-center space-y-8'>
				<motion.div
					className='h-8 w-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl mx-auto'
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
				/>
				<motion.div
					className='h-12 w-40 bg-blue-500/20 rounded-xl mx-auto'
					animate={{ opacity: [0.6, 1, 0.6] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				/>
			</div>
		</div>
	),
});

const Testimonial = dynamic(
	() => import('@/app/components/ui/Testimonial/Testimonial'),
	{ ssr: false }
);

const Pricing = dynamic(() => import('@/app/components/ui/Pricing/Pricing'), {
	ssr: false,
});

const FAQs = dynamic(() => import('@/app/components/ui/FAQs/FAQs'), {
	ssr: false,
});

const LiveChat = dynamic(
	() => import('@/app/components/ui/LiveChat/LiveChat'),
	{
		ssr: false,
	}
);
