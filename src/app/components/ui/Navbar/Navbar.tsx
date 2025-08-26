'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ChevronUp, Sparkles } from 'lucide-react';
import Brand from '@/app/components/ui/Brand'; // Adjust path as needed

import { Button } from '@/components/ui/button';
import {
	motion,
	AnimatePresence,
	useScroll,
	useVelocity,
	useSpring,
} from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

// Design tokens (same as home page)
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
	gradient: {
		primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600',
		text: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
	},
} as const;

// Hook for scroll effects
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
		scrollDirection,
		isScrolled,
		showScrollTop,
		scrollProgress,
	};
};

interface NavigationProps {
	/**
	 * Current active section for home page navigation
	 * Not used on other pages
	 */
	activeSection?: string;
	/**
	 * Function to scroll to section (only for home page)
	 */
	scrollToSection?: (sectionId: string) => void;
	/**
	 * Custom navigation items
	 * If not provided, uses default items
	 */
	navigationItems?: Array<{
		name: string;
		id: string;
		href?: string;
	}>;
	/**
	 * Page type affects behavior
	 * - 'home': Enables section scrolling
	 * - 'standard': Regular page navigation with links
	 */
	pageType?: 'home' | 'standard';
}

// Desktop Navigation Component
const DesktopNavigation = ({
	navigationItems,
	activeSection,
	scrollToSection,
	pageType,
	theme,
	setTheme,
	scrollProgress,
}) => {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const pathname = usePathname();

	return (
		<>
			{/* Progress bar */}
			<motion.div
				className='fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-purple-500'
				style={{ scaleX: scrollProgress, originX: 0 }}
				initial={{ scaleX: 0 }}
			/>

			<div className='hidden lg:flex items-center gap-2'>
				{navigationItems.map((item, index) => {
					const isActive =
						pageType === 'home'
							? activeSection === item.id
							: pathname === item.href ||
								(item.href && pathname.startsWith(item.href));

					if (item.href) {
						// External/internal link
						return (
							<Link key={item.id} href={item.href}>
								<motion.div
									className={cn(
										'relative py-3 px-5 rounded-xl transition-all duration-300',
										'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
										isActive
											? 'text-blue-400 bg-blue-500/10 shadow-lg'
											: 'text-slate-200 hover:text-blue-400 hover:bg-slate-700/30'
									)}
									whileHover={{ y: -2, scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 * index, duration: 0.5 }}>
									{isActive && (
										<motion.div
											layoutId='activeSection'
											className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30'
											transition={{
												type: 'spring',
												damping: 30,
												stiffness: 400,
											}}
										/>
									)}
									<span className='relative z-10 font-medium'>{item.name}</span>
								</motion.div>
							</Link>
						);
					} else {
						// Section scroll (home page only)
						return (
							<motion.button
								key={item.id}
								onClick={() => scrollToSection?.(item.id)}
								onHoverStart={() => setHoveredItem(item.id)}
								onHoverEnd={() => setHoveredItem(null)}
								className={cn(
									'relative py-3 px-5 rounded-xl transition-all duration-300',
									'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
									isActive
										? 'text-blue-400 bg-blue-500/10 shadow-lg'
										: 'text-slate-200 hover:text-blue-400 hover:bg-slate-700/30'
								)}
								whileHover={{ y: -2, scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 * index, duration: 0.5 }}>
								{isActive && (
									<motion.div
										layoutId='activeSection'
										className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30'
										transition={{
											type: 'spring',
											damping: 30,
											stiffness: 400,
										}}
									/>
								)}

								{hoveredItem === item.id && !isActive && (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										className='absolute inset-0 bg-slate-700/20 rounded-xl'
									/>
								)}

								<span className='relative z-10 font-medium'>{item.name}</span>
							</motion.button>
						);
					}
				})}
			</div>

			{/* Right side actions */}
			<div className='flex items-center gap-4'>
				{/* Theme toggle */}
				<motion.button
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					className={cn(
						'p-3 rounded-xl transition-all duration-300',
						'hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50',
						'border border-slate-700/30 hover:border-slate-600/50'
					)}
					whileHover={{ scale: 1.05, rotate: 5 }}
					whileTap={{ scale: 0.95 }}>
					<AnimatePresence mode='wait'>
						{theme === 'dark' ? (
							<motion.div
								key='sun'
								initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
								animate={{ opacity: 1, rotate: 0, scale: 1 }}
								exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
								transition={{ duration: 0.3 }}>
								<Sun className='w-5 h-5 text-amber-400' />
							</motion.div>
						) : (
							<motion.div
								key='moon'
								initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
								animate={{ opacity: 1, rotate: 0, scale: 1 }}
								exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
								transition={{ duration: 0.3 }}>
								<Moon className='w-5 h-5 text-slate-300' />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>

				{/* CTA buttons */}
				<div className='hidden lg:flex items-center gap-3'>
					<Link href='/login'>
						<Button
							variant='ghost'
							size='sm'
							className={cn(
								'text-slate-200 hover:text-blue-400 hover:bg-slate-700/50',
								'border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300'
							)}>
							Log In
						</Button>
					</Link>

					<Link href='/signup'>
						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<Button
								size='sm'
								className={cn(
									DESIGN_TOKENS.gradient.primary,
									'hover:shadow-xl hover:shadow-blue-500/25',
									'text-white border-none font-semibold px-6',
									'transition-all duration-300'
								)}>
								<Sparkles className='w-4 h-4 mr-2' />
								Get Started
							</Button>
						</motion.div>
					</Link>
				</div>
			</div>
		</>
	);
};

// Mobile Navigation Component
const MobileNavigation = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	navigationItems,
	activeSection,
	scrollToSection,
	pageType,
}) => {
	const pathname = usePathname();

	return (
		<>
			{/* Mobile menu button */}
			<motion.div
				className='lg:hidden fixed top-6 right-6 z-[60]'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5 }}>
				<motion.button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className={cn(
						'bg-slate-800/90 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/50',
						'hover:bg-slate-700/90 focus:ring-2 focus:ring-blue-400/50 focus:outline-none',
						'shadow-xl transition-all duration-300'
					)}
					whileHover={{ scale: 1.05, rotate: isMobileMenuOpen ? 180 : 0 }}
					whileTap={{ scale: 0.95 }}>
					<AnimatePresence mode='wait'>
						{isMobileMenuOpen ? (
							<motion.div
								key='close'
								initial={{ opacity: 0, rotate: -90 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: 90 }}>
								<X className='w-6 h-6 text-slate-200' />
							</motion.div>
						) : (
							<motion.div
								key='menu'
								initial={{ opacity: 0, rotate: -90 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: 90 }}>
								<Menu className='w-6 h-6 text-slate-200' />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
			</motion.div>

			{/* Mobile menu overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
							onClick={() => setIsMobileMenuOpen(false)}
						/>
						<motion.nav
							initial={{ opacity: 0, x: '100%', scale: 0.95 }}
							animate={{ opacity: 1, x: 0, scale: 1 }}
							exit={{ opacity: 0, x: '100%', scale: 0.95 }}
							transition={{
								type: 'spring',
								damping: 25,
								stiffness: 300,
								duration: 0.4,
							}}
							className='fixed top-0 right-0 w-full max-w-sm h-full z-[70] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/30'>
							<div className='p-6 space-y-8 h-full flex flex-col'>
								{/* Header */}
								<motion.div
									className='flex items-center justify-between pt-4'
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 }}>
									<h2
										className={cn(
											'text-xl font-bold flex items-center gap-2',
											DESIGN_TOKENS.gradient.text
										)}>
										<Sparkles className='w-5 h-5' />
										Menu
									</h2>
									<button
										onClick={() => setIsMobileMenuOpen(false)}
										className='p-2 hover:bg-slate-700/50 rounded-xl transition-all duration-200'>
										<X className='w-5 h-5 text-slate-200' />
									</button>
								</motion.div>

								{/* Navigation items */}
								<nav className='flex flex-col gap-3 flex-1'>
									{navigationItems.map((item, index) => {
										const isActive =
											pageType === 'home'
												? activeSection === item.id
												: pathname === item.href ||
													(item.href && pathname.startsWith(item.href));

										if (item.href) {
											return (
												<Link key={item.id} href={item.href}>
													<motion.div
														className={cn(
															'relative text-left py-4 px-5 rounded-2xl transition-all duration-300',
															'border border-transparent',
															isActive
																? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-500/30'
																: 'hover:bg-slate-700/50 text-slate-200 hover:text-blue-400 hover:border-slate-600/30'
														)}
														initial={{ opacity: 0, x: 20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{
															delay: 0.1 * (index + 2),
															duration: 0.4,
														}}
														whileHover={{ x: 4, scale: 1.02 }}
														whileTap={{ scale: 0.98 }}
														onClick={() => setIsMobileMenuOpen(false)}>
														{isActive && (
															<motion.div
																className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl'
																layoutId='mobileActiveSection'
																transition={{
																	type: 'spring',
																	damping: 30,
																	stiffness: 400,
																}}
															/>
														)}
														<span className='relative z-10 font-medium text-lg'>
															{item.name}
														</span>
													</motion.div>
												</Link>
											);
										} else {
											return (
												<motion.button
													key={item.id}
													onClick={() => {
														scrollToSection?.(item.id);
														setIsMobileMenuOpen(false);
													}}
													className={cn(
														'relative text-left py-4 px-5 rounded-2xl transition-all duration-300',
														'border border-transparent',
														isActive
															? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-500/30'
															: 'hover:bg-slate-700/50 text-slate-200 hover:text-blue-400 hover:border-slate-600/30'
													)}
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{
														delay: 0.1 * (index + 2),
														duration: 0.4,
													}}
													whileHover={{ x: 4, scale: 1.02 }}
													whileTap={{ scale: 0.98 }}>
													{isActive && (
														<motion.div
															className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl'
															layoutId='mobileActiveSection'
															transition={{
																type: 'spring',
																damping: 30,
																stiffness: 400,
															}}
														/>
													)}
													<span className='relative z-10 font-medium text-lg'>
														{item.name}
													</span>
												</motion.button>
											);
										}
									})}
								</nav>

								{/* Mobile CTA buttons */}
								<motion.div
									className='space-y-4 pt-6 border-t border-slate-700/50'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}>
									<Link href='/login' className='block'>
										<Button
											variant='ghost'
											size='lg'
											className='w-full text-slate-200 hover:text-blue-400 hover:bg-slate-700/50 border border-slate-700/30'>
											Log In
										</Button>
									</Link>
									<Link href='/signup' className='block'>
										<Button
											size='lg'
											className={cn(
												'w-full',
												DESIGN_TOKENS.gradient.primary,
												'hover:shadow-xl hover:shadow-blue-500/25',
												'text-white font-semibold'
											)}>
											<Sparkles className='w-4 h-4 mr-2' />
											Get Started Free
										</Button>
									</Link>
								</motion.div>
							</div>
						</motion.nav>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

// Main Navigation Component
export default function Navigation({
	activeSection,
	scrollToSection,
	navigationItems,
	pageType = 'standard',
}: NavigationProps) {
	const { theme, setTheme } = useTheme();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { scrollDirection, isScrolled, showScrollTop, scrollProgress } =
		useScrollEffects();

	// Default navigation items
	const defaultNavigationItems = useMemo(
		() => [
			{ name: 'Home', id: 'hero', href: '/' },
			{
				name: 'Features',
				id: 'features',
				href: pageType === 'home' ? undefined : '/#features',
			},
			{
				name: 'Testimonials',
				id: 'testimonials',
				href: pageType === 'home' ? undefined : '/#testimonials',
			},
			{
				name: 'Pricing',
				id: 'pricing',
				href: pageType === 'home' ? undefined : '/#pricing',
			},
			{
				name: 'FAQ',
				id: 'faq',
				href: pageType === 'home' ? undefined : '/#faq',
			},
			{ name: 'Careers', id: 'careers', href: '/careers' },
			{ name: 'Blogs', id: 'blogs', href: '/blogs' },
		],
		[pageType]
	);

	const navItems = navigationItems || defaultNavigationItems;

	// Enhanced keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isMobileMenuOpen]);

	return (
		<>
			<motion.nav
				className={cn(
					'fixed top-1 left-0 right-0 z-40 transition-all duration-500',
					isScrolled
						? 'bg-slate-900/90 backdrop-blur-xl shadow-2xl border border-slate-800/50 rounded-2xl mx-4 py-3'
						: 'bg-transparent py-6'
				)}
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}>
				<div
					className={cn(
						DESIGN_TOKENS.spacing.container,
						'flex justify-between items-center'
					)}>
					{/* Logo */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='relative'>
						<Link
							href='/'
							className={cn(
								'text-2xl font-bold flex items-center gap-2',
								DESIGN_TOKENS.gradient.text,
								'focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-xl px-3 py-2'
							)}>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
								className='flex items-center justify-center'>
								<Brand className='h-8 w-8' />
							</motion.div>
							AdZPay
						</Link>
					</motion.div>

					{/* Desktop Navigation */}
					<DesktopNavigation
						navigationItems={navItems}
						activeSection={activeSection}
						scrollToSection={scrollToSection}
						pageType={pageType}
						theme={theme}
						setTheme={setTheme}
						scrollProgress={scrollProgress}
					/>
				</div>
			</motion.nav>

			{/* Mobile Navigation */}
			<MobileNavigation
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
				navigationItems={navItems}
				activeSection={activeSection}
				scrollToSection={scrollToSection}
				pageType={pageType}
			/>

			{/* Scroll to top button */}
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
		</>
	);
}
