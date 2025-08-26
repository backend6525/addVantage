// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import {
// 	Menu,
// 	X,
// 	Sun,
// 	Moon,
// 	ChevronUp,
// 	ArrowRight,
// 	Zap,
// 	Shield,
// 	TrendingUp,
// 	Play,
// 	Sparkles,
// } from 'lucide-react';
// import Brand from './components/ui/Brand';
// import ParticleBackground from './components/ui/PaticleBackground/ParticleBackground';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import {
// 	motion,
// 	AnimatePresence,
// 	useScroll,
// 	useTransform,
// 	useSpring,
// 	useVelocity,
// } from 'framer-motion';
// import { useTheme } from 'next-themes';
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

// // Enhanced Navigation with better micro-interactions
// const Navigation = ({
// 	isScrolled,
// 	activeSection,
// 	scrollToSection,
// 	navigationItems,
// 	theme,
// 	setTheme,
// 	scrollProgress,
// }) => {
// 	const [hoveredItem, setHoveredItem] = useState<string | null>(null);

// 	return (
// 		<>
// 			{/* Progress bar */}
// 			<motion.div
// 				className='fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-purple-500'
// 				style={{ scaleX: scrollProgress, originX: 0 }}
// 				initial={{ scaleX: 0 }}
// 			/>

// 			<motion.nav
// 				className={cn(
// 					'fixed top-1 left-0 right-0 z-40 transition-all duration-500',
// 					isScrolled
// 						? 'bg-slate-900/90 backdrop-blur-xl shadow-2xl border border-slate-800/50 rounded-2xl mx-4 py-3'
// 						: 'bg-transparent py-6'
// 				)}
// 				initial={{ y: -100, opacity: 0 }}
// 				animate={{ y: 0, opacity: 1 }}
// 				transition={{ duration: 0.8, ease: 'easeOut' }}>
// 				<div
// 					className={cn(
// 						DESIGN_TOKENS.spacing.container,
// 						'flex justify-between items-center'
// 					)}>
// 					{/* Enhanced Logo */}
// 					<motion.div
// 						whileHover={{ scale: 1.05 }}
// 						whileTap={{ scale: 0.95 }}
// 						className='relative'>
// 						<Link
// 							href='/'
// 							className={cn(
// 								'text-2xl font-bold flex items-center gap-2',
// 								DESIGN_TOKENS.gradient.text,
// 								'focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-xl px-3 py-2'
// 							)}>
// 							<motion.div
// 								animate={{ rotate: 360 }}
// 								transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
// 								className=' flex items-center justify-center'>
// 								<Brand className='h-8 w-8' />
// 							</motion.div>
// 							AdZPay
// 						</Link>
// 					</motion.div>
// 					{/* Enhanced Desktop Navigation */}

// 					<div className='hidden lg:flex items-center gap-2'>
// 						{navigationItems.map((item, index) =>
// 							item.href ? (
// 								// External link for Careers and Blogs
// 								<Link key={item.id} href={item.href}>
// 									<motion.div
// 										className={cn(
// 											'relative py-3 px-5 rounded-xl transition-all duration-300',
// 											'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
// 											'text-slate-200 hover:text-blue-400 hover:bg-slate-700/30'
// 										)}
// 										whileHover={{ y: -2, scale: 1.02 }}
// 										whileTap={{ scale: 0.98 }}
// 										initial={{ opacity: 0, y: 10 }}
// 										animate={{ opacity: 1, y: 0 }}
// 										transition={{ delay: 0.1 * index, duration: 0.5 }}>
// 										<span className='relative z-10 font-medium'>
// 											{item.name}
// 										</span>
// 									</motion.div>
// 								</Link>
// 							) : (
// 								// Section scroll for other items
// 								<motion.button
// 									key={item.id}
// 									onClick={() => scrollToSection(item.id)}
// 									onHoverStart={() => setHoveredItem(item.id)}
// 									onHoverEnd={() => setHoveredItem(null)}
// 									className={cn(
// 										'relative py-3 px-5 rounded-xl transition-all duration-300',
// 										'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
// 										activeSection === item.id
// 											? 'text-blue-400 bg-blue-500/10 shadow-lg'
// 											: 'text-slate-200 hover:text-blue-400 hover:bg-slate-700/30'
// 									)}
// 									whileHover={{ y: -2, scale: 1.02 }}
// 									whileTap={{ scale: 0.98 }}
// 									initial={{ opacity: 0, y: 10 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									transition={{ delay: 0.1 * index, duration: 0.5 }}>
// 									{/* Active indicator */}
// 									{activeSection === item.id && (
// 										<motion.div
// 											layoutId='activeSection'
// 											className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30'
// 											transition={{
// 												type: 'spring',
// 												damping: 30,
// 												stiffness: 400,
// 											}}
// 										/>
// 									)}

// 									{/* Hover effect */}
// 									{hoveredItem === item.id && activeSection !== item.id && (
// 										<motion.div
// 											initial={{ opacity: 0, scale: 0.8 }}
// 											animate={{ opacity: 1, scale: 1 }}
// 											exit={{ opacity: 0, scale: 0.8 }}
// 											className='absolute inset-0 bg-slate-700/20 rounded-xl'
// 										/>
// 									)}

// 									<span className='relative z-10 font-medium'>{item.name}</span>
// 								</motion.button>
// 							)
// 						)}
// 					</div>

// 					{/* Enhanced Right side actions */}
// 					<div className='flex items-center gap-4'>
// 						{/* Enhanced Theme toggle */}
// 						<motion.button
// 							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
// 							className={cn(
// 								'p-3 rounded-xl transition-all duration-300',
// 								'hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50',
// 								'border border-slate-700/30 hover:border-slate-600/50'
// 							)}
// 							whileHover={{ scale: 1.05, rotate: 5 }}
// 							whileTap={{ scale: 0.95 }}>
// 							<AnimatePresence mode='wait'>
// 								{theme === 'dark' ? (
// 									<motion.div
// 										key='sun'
// 										initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
// 										animate={{ opacity: 1, rotate: 0, scale: 1 }}
// 										exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
// 										transition={{ duration: 0.3 }}>
// 										<Sun className='w-5 h-5 text-amber-400' />
// 									</motion.div>
// 								) : (
// 									<motion.div
// 										key='moon'
// 										initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
// 										animate={{ opacity: 1, rotate: 0, scale: 1 }}
// 										exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
// 										transition={{ duration: 0.3 }}>
// 										<Moon className='w-5 h-5 text-slate-300' />
// 									</motion.div>
// 								)}
// 							</AnimatePresence>
// 						</motion.button>

// 						{/* Enhanced CTA buttons */}
// 						<div className='hidden lg:flex items-center gap-3'>
// 							<Link href='/login'>
// 								<Button
// 									variant='ghost'
// 									size='sm'
// 									className={cn(
// 										'text-slate-200 hover:text-blue-400 hover:bg-slate-700/50',
// 										'border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300'
// 									)}>
// 									Log In
// 								</Button>
// 							</Link>

// 							<Link href='/signup'>
// 								<motion.div
// 									whileHover={{ scale: 1.02 }}
// 									whileTap={{ scale: 0.98 }}>
// 									<Button
// 										size='sm'
// 										className={cn(
// 											DESIGN_TOKENS.gradient.primary,
// 											'hover:shadow-xl hover:shadow-blue-500/25',
// 											'text-white border-none font-semibold px-6',
// 											'transition-all duration-300'
// 										)}>
// 										<Sparkles className='w-4 h-4 mr-2' />
// 										Get Started
// 									</Button>
// 								</motion.div>
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</motion.nav>
// 		</>
// 	);
// };

// // Enhanced Mobile Navigation
// const MobileNavigation = ({
// 	isMobileMenuOpen,
// 	setIsMobileMenuOpen,
// 	navigationItems,
// 	activeSection,
// 	scrollToSection,
// }) => {
// 	return (
// 		<>
// 			{/* Enhanced Mobile menu button */}
// 			<motion.div
// 				className='lg:hidden fixed top-6 right-6 z-[60]'
// 				initial={{ opacity: 0, scale: 0.5 }}
// 				animate={{ opacity: 1, scale: 1 }}
// 				transition={{ delay: 0.5 }}>
// 				<motion.button
// 					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// 					className={cn(
// 						'bg-slate-800/90 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/50',
// 						'hover:bg-slate-700/90 focus:ring-2 focus:ring-blue-400/50 focus:outline-none',
// 						'shadow-xl transition-all duration-300'
// 					)}
// 					whileHover={{ scale: 1.05, rotate: isMobileMenuOpen ? 180 : 0 }}
// 					whileTap={{ scale: 0.95 }}>
// 					<AnimatePresence mode='wait'>
// 						{isMobileMenuOpen ? (
// 							<motion.div
// 								key='close'
// 								initial={{ opacity: 0, rotate: -90 }}
// 								animate={{ opacity: 1, rotate: 0 }}
// 								exit={{ opacity: 0, rotate: 90 }}>
// 								<X className='w-6 h-6 text-slate-200' />
// 							</motion.div>
// 						) : (
// 							<motion.div
// 								key='menu'
// 								initial={{ opacity: 0, rotate: -90 }}
// 								animate={{ opacity: 1, rotate: 0 }}
// 								exit={{ opacity: 0, rotate: 90 }}>
// 								<Menu className='w-6 h-6 text-slate-200' />
// 							</motion.div>
// 						)}
// 					</AnimatePresence>
// 				</motion.button>
// 			</motion.div>

// 			{/* Enhanced Mobile menu overlay */}
// 			<AnimatePresence>
// 				{isMobileMenuOpen && (
// 					<>
// 						<motion.div
// 							initial={{ opacity: 0 }}
// 							animate={{ opacity: 1 }}
// 							exit={{ opacity: 0 }}
// 							transition={{ duration: 0.3 }}
// 							className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
// 							onClick={() => setIsMobileMenuOpen(false)}
// 						/>
// 						<motion.nav
// 							initial={{ opacity: 0, x: '100%', scale: 0.95 }}
// 							animate={{ opacity: 1, x: 0, scale: 1 }}
// 							exit={{ opacity: 0, x: '100%', scale: 0.95 }}
// 							transition={{
// 								type: 'spring',
// 								damping: 25,
// 								stiffness: 300,
// 								duration: 0.4,
// 							}}
// 							className='fixed top-0 right-0 w-full max-w-sm h-full z-[70] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/30'>
// 							<div className='p-6 space-y-8 h-full flex flex-col'>
// 								{/* Enhanced Header */}
// 								<motion.div
// 									className='flex items-center justify-between pt-4'
// 									initial={{ opacity: 0, y: -20 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									transition={{ delay: 0.1 }}>
// 									<h2
// 										className={cn(
// 											'text-xl font-bold flex items-center gap-2',
// 											DESIGN_TOKENS.gradient.text
// 										)}>
// 										<Sparkles className='w-5 h-5' />
// 										Menu
// 									</h2>
// 									<button
// 										onClick={() => setIsMobileMenuOpen(false)}
// 										className='p-2 hover:bg-slate-700/50 rounded-xl transition-all duration-200'>
// 										<X className='w-5 h-5 text-slate-200' />
// 									</button>
// 								</motion.div>

// 								{/* Enhanced Navigation items */}
// 								<nav className='flex flex-col gap-3 flex-1'>
// 									{navigationItems.map((item, index) =>
// 										item.href ? (
// 											// External link for Careers and Blogs
// 											<Link key={item.id} href={item.href}>
// 												<motion.div
// 													className={cn(
// 														'relative text-left py-4 px-5 rounded-2xl transition-all duration-300',
// 														'border border-transparent',
// 														'hover:bg-slate-700/50 text-slate-200 hover:text-blue-400 hover:border-slate-600/30'
// 													)}
// 													initial={{ opacity: 0, x: 20 }}
// 													animate={{ opacity: 1, x: 0 }}
// 													transition={{
// 														delay: 0.1 * (index + 2),
// 														duration: 0.4,
// 													}}
// 													whileHover={{ x: 4, scale: 1.02 }}
// 													whileTap={{ scale: 0.98 }}
// 													onClick={() => setIsMobileMenuOpen(false)}>
// 													<span className='relative z-10 font-medium text-lg'>
// 														{item.name}
// 													</span>
// 												</motion.div>
// 											</Link>
// 										) : (
// 											// Section scroll for other items
// 											<motion.button
// 												key={item.id}
// 												onClick={() => {
// 													scrollToSection(item.id);
// 													setIsMobileMenuOpen(false);
// 												}}
// 												className={cn(
// 													'relative text-left py-4 px-5 rounded-2xl transition-all duration-300',
// 													'border border-transparent',
// 													activeSection === item.id
// 														? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-500/30'
// 														: 'hover:bg-slate-700/50 text-slate-200 hover:text-blue-400 hover:border-slate-600/30'
// 												)}
// 												initial={{ opacity: 0, x: 20 }}
// 												animate={{ opacity: 1, x: 0 }}
// 												transition={{ delay: 0.1 * (index + 2), duration: 0.4 }}
// 												whileHover={{ x: 4, scale: 1.02 }}
// 												whileTap={{ scale: 0.98 }}>
// 												{activeSection === item.id && (
// 													<motion.div
// 														className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl'
// 														layoutId='mobilActiveSection'
// 														transition={{
// 															type: 'spring',
// 															damping: 30,
// 															stiffness: 400,
// 														}}
// 													/>
// 												)}

// 												<span className='relative z-10 font-medium text-lg'>
// 													{item.name}
// 												</span>
// 											</motion.button>
// 										)
// 									)}
// 								</nav>

// 								{/* Enhanced Mobile CTA buttons */}
// 								<motion.div
// 									className='space-y-4 pt-6 border-t border-slate-700/50'
// 									initial={{ opacity: 0, y: 20 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									transition={{ delay: 0.3 }}>
// 									<Link href='/login' className='block'>
// 										<Button
// 											variant='ghost'
// 											size='lg'
// 											className='w-full text-slate-200 hover:text-blue-400 hover:bg-slate-700/50 border border-slate-700/30'>
// 											Log In
// 										</Button>
// 									</Link>
// 									<Link href='/signup' className='block'>
// 										<Button
// 											size='lg'
// 											className={cn(
// 												'w-full',
// 												DESIGN_TOKENS.gradient.primary,
// 												'hover:shadow-xl hover:shadow-blue-500/25',
// 												'text-white font-semibold'
// 											)}>
// 											<Sparkles className='w-4 h-4 mr-2' />
// 											Get Started Free
// 										</Button>
// 									</Link>
// 								</motion.div>
// 							</div>
// 						</motion.nav>
// 					</>
// 				)}
// 			</AnimatePresence>
// 		</>
// 	);
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
// 	const { theme, setTheme } = useTheme();
// 	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// 	const [activeSection, setActiveSection] = useState('hero');
// 	const [isMounted, setIsMounted] = useState(false);

// 	const performanceSettings = usePerformanceOptimization();
// 	const {
// 		scrollY,
// 		scrollDirection,
// 		isScrolled,
// 		showScrollTop,
// 		scrollProgress,
// 	} = useScrollEffects();

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
// 			if (e.key === 'Escape' && isMobileMenuOpen) {
// 				setIsMobileMenuOpen(false);
// 			}

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
// 	}, [isMobileMenuOpen, scrollToSection]);

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

// 				{/* Enhanced Navigation */}
// 				<Navigation
// 					isScrolled={isScrolled}
// 					activeSection={activeSection}
// 					scrollToSection={scrollToSection}
// 					navigationItems={navigationItems}
// 					theme={theme}
// 					setTheme={setTheme}
// 					scrollProgress={scrollProgress}
// 				/>

// 				<MobileNavigation
// 					isMobileMenuOpen={isMobileMenuOpen}
// 					setIsMobileMenuOpen={setIsMobileMenuOpen}
// 					navigationItems={navigationItems}
// 					activeSection={activeSection}
// 					scrollToSection={scrollToSection}
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
import Navigation from '@/app/components/ui/Navbar'; // Import the new navigation component
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

// Enhanced design tokens with better color psychology and spacing
const DESIGN_TOKENS = {
	animation: {
		duration: 0.6,
		ease: [0.25, 0.46, 0.45, 0.94],
		spring: { type: 'spring', damping: 25, stiffness: 400 },
		micro: { duration: 0.15, ease: 'easeOut' },
		stagger: { delayChildren: 0.1, staggerChildren: 0.05 },
	},
	spacing: {
		section: { mobile: 'py-8', desktop: 'py-12 lg:py-16' },
		container: 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto',
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
} as const;

// Enhanced performance optimization with better detection
const usePerformanceOptimization = () => {
	const [settings, setSettings] = useState({
		isReducedMotion: false,
		isParticlesEnabled: true,
		isHighPerformance: true,
		enableAdvancedAnimations: true,
	});

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
			const isMobile = window.innerWidth < 768;

			setSettings({
				isReducedMotion: mediaQuery.matches,
				isParticlesEnabled:
					window.innerWidth >= 1024 && !isLowMemory && !isSlowConnection,
				isHighPerformance: !isLowMemory && !isSlowConnection,
				enableAdvancedAnimations:
					!isMobile && !isLowMemory && !mediaQuery.matches,
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
	}, []);

	return settings;
};

// Enhanced scroll effects with smooth momentum
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
	};
};

// Enhanced Loading Component
const LoadingSpinner = () => (
	<div className='min-h-screen bg-slate-950 flex items-center justify-center'>
		<motion.div
			className='flex flex-col items-center space-y-6'
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
				<p className='text-slate-400 font-medium'>
					Loading amazing experience...
				</p>
			</div>
		</motion.div>
	</div>
);

// Main component with enhancements
export default function Home() {
	const [activeSection, setActiveSection] = useState('hero');
	const [isMounted, setIsMounted] = useState(false);

	const performanceSettings = usePerformanceOptimization();
	const { scrollY, scrollDirection, showScrollTop } = useScrollEffects();

	// Fixed parallax effects - more subtle and doesn't make hero disappear
	const heroOpacity = useTransform(scrollY, [0, 1000], [1, 0.7]);
	const heroY = useTransform(scrollY, [0, 1000], [0, 100]);

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

	// Fixed section visibility tracking
	const handleScroll = useCallback(() => {
		const sections = navigationItems.map((item) => item.id);
		const current = sections.find((section) => {
			const element = document.getElementById(section);
			if (element) {
				const rect = element.getBoundingClientRect();
				// Improved detection - consider top 30% of viewport for active section
				return (
					rect.top <= window.innerHeight * 0.3 &&
					rect.bottom >= window.innerHeight * 0.1
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
		handleScroll(); // Call immediately to set initial state
		return () => window.removeEventListener('scroll', debouncedScroll);
	}, [handleScroll]);

	// Fixed smooth scroll function
	const scrollToSection = useCallback(
		(sectionId: string) => {
			const element = document.getElementById(sectionId);
			if (element) {
				// Fixed offset calculation - account for fixed navigation
				const navHeight = 80;
				const targetPosition = element.offsetTop - navHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: performanceSettings.isReducedMotion ? 'auto' : 'smooth',
				});

				// Update active section immediately for better UX
				setActiveSection(sectionId);
			}
		},
		[performanceSettings.isReducedMotion]
	);

	// Mount detection
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Enhanced keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Quick navigation shortcuts
			if (e.ctrlKey || e.metaKey) {
				const keyMap = {
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

	return (
		<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
			<main className='relative min-h-screen bg-slate-950 overflow-x-hidden'>
				{/* Enhanced background with depth */}
				<div className='fixed inset-0 w-full h-full pointer-events-none'>
					<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent' />
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent' />

					{/* Animated mesh gradient */}
					<motion.div
						className='absolute inset-0 opacity-30'
						animate={{
							background: [
								'radial-gradient(circle at 20% 80%, rgb(59 130 246 / 0.15) 0%, transparent 50%)',
								'radial-gradient(circle at 80% 20%, rgb(147 51 234 / 0.15) 0%, transparent 50%)',
								'radial-gradient(circle at 40% 40%, rgb(59 130 246 / 0.15) 0%, transparent 50%)',
							],
						}}
						transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
					/>
				</div>

				{/* Enhanced particles */}
				{performanceSettings.isParticlesEnabled &&
					!performanceSettings.isReducedMotion && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.6 }}
							transition={{ duration: 2 }}
							className='fixed inset-0 pointer-events-none z-10'>
							<ParticleBackground
								color='#3E63DD'
								count={25}
								speed={0.3}
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
							whileHover={{
								scale: 1.1,
								y: -4,
								boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
							}}
							whileTap={{ scale: 0.9 }}
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							className={cn(
								'fixed bottom-8 right-8 z-50 p-4 rounded-2xl',
								DESIGN_TOKENS.gradient.primary,
								'text-white shadow-2xl border border-blue-500/20',
								'focus:outline-none focus:ring-2 focus:ring-blue-400/50'
							)}>
							<ChevronUp className='w-6 h-6' />
						</motion.button>
					)}
				</AnimatePresence>

				{/* Use the new Navigation component */}
				<Navigation
					activeSection={activeSection}
					scrollToSection={scrollToSection}
					navigationItems={navigationItems}
					pageType='home'
				/>

				{/* Content Sections with enhanced animations */}
				<div className='relative w-full'>
					{/* Hero Section with fixed parallax */}
					<motion.section
						id='hero'
						style={{
							opacity: performanceSettings.enableAdvancedAnimations
								? heroOpacity
								: 1,
							y: performanceSettings.enableAdvancedAnimations ? heroY : 0,
						}}
						className='relative min-h-screen flex items-center justify-center'>
						<div
							className={cn(DESIGN_TOKENS.spacing.container, 'relative z-20')}>
							<Hero />
						</div>
					</motion.section>

					{/* Enhanced section transitions */}
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
							initial={{ opacity: 0, y: 60 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-15%' }}
							transition={{
								duration: 0.8,
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
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<Footer />
				</motion.div>

				{/* Floating action button for demos */}
				<AnimatePresence>
					{activeSection === 'hero' && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8, x: 100 }}
							animate={{ opacity: 1, scale: 1, x: 0 }}
							exit={{ opacity: 0, scale: 0.8, x: 100 }}
							className='fixed bottom-8 left-8 z-50 hidden lg:block'>
							<motion.button
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									'flex items-center gap-3 px-6 py-4 rounded-2xl',
									'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50',
									'text-white hover:bg-slate-700/90 transition-all duration-300',
									'shadow-2xl hover:shadow-blue-500/20'
								)}>
								<Play className='w-5 h-5 text-blue-400' />
								<span className='font-medium'>Watch Demo</span>
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</ThemeProvider>
	);
}

// Utility function
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

// Enhanced dynamic imports with better loading states
const Hero = dynamic(() => import('@/app/components/ui/Hero/Hero'), {
	loading: () => (
		<div className='min-h-screen flex items-center justify-center'>
			<motion.div
				className='flex flex-col items-center space-y-8 w-full max-w-3xl px-4'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}>
				{/* Logo skeleton */}
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

				{/* Text skeletons */}
				<div className='space-y-6 text-center w-full'>
					{/* Main title skeleton */}
					<div className='space-y-4'>
						<motion.div
							className='h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl mx-auto'
							style={{ width: '400px', maxWidth: '90%' }}
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<motion.div
							className='h-8 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl mx-auto'
							style={{ width: '350px', maxWidth: '80%' }}
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
						/>
					</div>

					{/* Subtitle skeleton */}
					<div className='space-y-3'>
						{[300, 280, 240].map((width, i) => (
							<motion.div
								key={i}
								className='h-4 bg-gradient-to-r from-slate-400/20 to-slate-500/20 rounded-xl mx-auto'
								style={{ width: `${width}px`, maxWidth: '90%' }}
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

				{/* Stats skeleton */}
				<div className='flex justify-center gap-8 pt-8'>
					{[1, 2, 3].map((i) => (
						<motion.div
							key={i}
							className='text-center space-y-2'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.2 }}>
							<motion.div
								className='h-8 w-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg mx-auto'
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
							/>
							<motion.div
								className='h-3 w-20 bg-slate-400/20 rounded mx-auto'
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
});

// Other components with enhanced loading states
const TrustedBy = dynamic(
	() => import('@/app/components/ui/TrustedBy/TrustedBy'),
	{
		loading: () => (
			<div className={cn(DESIGN_TOKENS.spacing.container, 'py-16')}>
				<motion.div
					className='text-center space-y-8'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<motion.div
						className='h-6 w-48 bg-slate-400/20 rounded-xl mx-auto'
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
					<div className='flex justify-center items-center gap-8 flex-wrap'>
						{[...Array(5)].map((_, i) => (
							<motion.div
								key={i}
								className='w-32 h-12 bg-slate-700/20 rounded-xl'
								animate={{ opacity: [0.3, 0.7, 0.3] }}
								transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
							/>
						))}
					</div>
				</motion.div>
			</div>
		),
	}
);

const VisualFeatures = dynamic(
	() => import('@/app/components/ui/VisualFeatures/VisualFeatures'),
	{
		loading: () => (
			<div className={cn(DESIGN_TOKENS.spacing.container, 'py-20')}>
				<motion.div
					className='grid lg:grid-cols-2 gap-12 items-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<div className='space-y-6'>
						<motion.div
							className='h-8 w-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl'
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<div className='space-y-3'>
							{[...Array(3)].map((_, i) => (
								<motion.div
									key={i}
									className='h-4 bg-slate-400/20 rounded-xl'
									style={{ width: `${90 - i * 10}%` }}
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
						className='aspect-video bg-gradient-to-br from-slate-700/20 to-slate-800/20 rounded-3xl'
						animate={{ opacity: [0.4, 0.8, 0.4] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				</motion.div>
			</div>
		),
	}
);

const Features = dynamic(
	() => import('@/app/components/ui/Features/Features'),
	{
		loading: () => (
			<div className={cn(DESIGN_TOKENS.spacing.container, 'py-20')}>
				<motion.div
					className='text-center space-y-16'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<div className='space-y-4'>
						<motion.div
							className='h-10 w-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl mx-auto'
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<motion.div
							className='h-5 w-96 bg-slate-400/20 rounded-xl mx-auto'
							animate={{ opacity: [0.3, 0.7, 0.3] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
						/>
					</div>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[...Array(6)].map((_, i) => (
							<motion.div
								key={i}
								className='p-6 bg-slate-800/20 rounded-3xl space-y-4'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.1 }}>
								<motion.div
									className='w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl'
									animate={{ opacity: [0.5, 1, 0.5] }}
									transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
								/>
								<motion.div
									className='h-6 w-32 bg-slate-400/20 rounded-xl'
									animate={{ opacity: [0.4, 0.8, 0.4] }}
									transition={{
										duration: 1.8,
										repeat: Infinity,
										delay: i * 0.05,
									}}
								/>
								<div className='space-y-2'>
									{[...Array(2)].map((_, j) => (
										<motion.div
											key={j}
											className='h-3 bg-slate-500/20 rounded'
											style={{ width: `${85 - j * 15}%` }}
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
	}
);

const CTA = dynamic(() => import('@/app/components/ui/CTA/CTA'));
const Testimonial = dynamic(
	() => import('@/app/components/ui/Testimonial/Testimonial')
);
const Pricing = dynamic(() => import('@/app/components/ui/Pricing/Pricing'));
const FAQs = dynamic(() => import('@/app/components/ui/FAQs/FAQs'));
const LiveChat = dynamic(() => import('@/app/components/ui/LiveChat/LiveChat'));
