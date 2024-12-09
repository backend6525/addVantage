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
			className='fixed w-full top-0 z-50 bg-gray-900/60 backdrop-blur-md border-b border-gray-700'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}>
			<div className='container mx-auto px-4 py-4 flex justify-between items-center'>
				{/* Logo */}
				<Link
					href='/'
					className='h-8 w-8 text-2xl font-bold text-white flex items-center space-x-2'>
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
								className='text-gray-300 hover:text-white transition-colors'>
								{item.name}
							</Link>
						</motion.div>
					))}
				</nav>

				{/* Auth Buttons */}
				<div className='hidden md:flex items-center space-x-4'>
					<LoginLink className='flex items-center space-x-2 text-gray-300 hover:text-white'>
						<LogIn size={18} />
						<span>Sign In</span>
					</LoginLink>
					<RegisterLink className='bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2'>
						<User size={18} />
						<span>Sign Up</span>
					</RegisterLink>
				</div>

				{/* Mobile Menu Toggle */}
				<button
					className='md:hidden text-white'
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
					{mobileMenuOpen ? <X /> : <Menu />}
				</button>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<motion.div
					className='md:hidden absolute top-full left-0 w-full bg-gray-900 shadow-2xl'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}>
					<div className='container mx-auto px-4 py-6 space-y-4'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='block py-2 text-gray-300 hover:text-white'
								onClick={() => setMobileMenuOpen(false)}>
								{item.name}
							</Link>
						))}
						<div className='border-t border-gray-700 pt-4 space-y-4'>
							<LoginLink className='block py-2 text-gray-300 hover:text-white'>
								Sign In
							</LoginLink>
							<RegisterLink className='block bg-blue-600 text-white py-2 rounded-xl text-center hover:bg-blue-700'>
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
