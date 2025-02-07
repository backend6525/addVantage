'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Brand from '@/app/components/ui/Brand';
import { Menu, X, User, LogIn } from 'lucide-react';
import {
	LoginLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { ThemeToggle } from '../ThemeToggle';

//import { UserButton } from '@kinde-oss/kinde-auth-nextjs/components';

const navigation = [
	{ name: 'Features', href: '/#features' },
	{ name: 'Pricing', href: '/#pricing' },
	{ name: 'Testimonials', href: '/#testimonials' },
	{ name: 'Careers', href: '/careers' },
];

function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<motion.header
			className='fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}>
			<div className='container mx-auto px-4 py-4 flex justify-between items-center'>
				{/* Logo */}
				<Link
					href='/'
					className='h-8 w-8 text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2 hover:opacity-80 transition-opacity'>
					<Brand />
					<span>AdZPay</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className='hidden md:flex items-center space-x-6'>
					{navigation.map((item) => (
						<motion.div
							key={item.name}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							<Link
								href={item.href}
								className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'>
								{item.name}
							</Link>
						</motion.div>
					))}
				</nav>

				{/* Auth Buttons and Theme Toggle */}
				<div className='hidden md:flex items-center space-x-4'>
					<ThemeToggle />
					<LoginLink className='flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>
						<LogIn className='h-[1.2rem] w-[1.2rem]' />
						<span>Sign In</span>
					</LoginLink>
					<RegisterLink className='bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg'>
						<User className='h-[1.2rem] w-[1.2rem]' />
						<span>Sign Up</span>
					</RegisterLink>
				</div>

				{/* Mobile Menu Toggle */}
				<div className='flex items-center space-x-4 md:hidden'>
					<ThemeToggle />
					<button
						className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						{mobileMenuOpen ? (
							<X className='h-6 w-6' />
						) : (
							<Menu className='h-6 w-6' />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<motion.div
					className='md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200/80 dark:border-gray-700/80'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}>
					<div className='container mx-auto px-4 py-6 space-y-4'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-3 transition-colors'
								onClick={() => setMobileMenuOpen(false)}>
								{item.name}
							</Link>
						))}
						<div className='border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4'>
							<LoginLink className='block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-3 transition-colors'>
								Sign In
							</LoginLink>
							<RegisterLink className='block bg-primary text-primary-foreground py-2 rounded-xl text-center hover:bg-primary/90 shadow-md hover:shadow-lg transition-all'>
								Sign Up
							</RegisterLink>
						</div>
					</div>
				</motion.div>
			)}
		</motion.header>
	);
}

export default Navbar;
