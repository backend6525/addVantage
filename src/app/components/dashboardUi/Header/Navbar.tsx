'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import Brand from '../../ui/Brand';
import { NotificationCenter } from '../../ui/NotificationCenter/NotificationCenter';

interface NavbarProps {
	search: {
		placeholder: string;
	};
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
	{ href: '/dashboard/tasks', label: 'Tasks' },
	{ href: '/billing', label: 'Billing' },
	{ href: '/analytics', label: 'Analytics' },
	{ href: '/messages', label: 'Messages' },
	{ href: '/help', label: 'Help' },
];

const dropdownOptions = [
	{ href: '/profile', label: 'Profile' },
	{ href: '/settings', label: 'Settings' },
	{ href: '/purchase-history', label: 'Purchase History' },
	{ href: '/refer-friends', label: 'Refer Friends' },
	{ href: '/create-team', label: 'Create Team' },
	{ href: '/logout', label: 'Sign Out' },
];

const Navbar: React.FC<NavbarProps> = ({ search, setIsMenuOpen }) => {
	const { user } = useKindeBrowserClient();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	console.log('Navbar user state:', user);

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800/95 backdrop-blur-lg border-b border-white/10'>
			<div className=' mx-auto flex items-center justify-between h-16 px-4 sm:px-8'>
				{/* Logo and Brand */}
				<div className='flex items-center'>
					<Brand className='w-10 h-10' />
					<span className='ml-3 text-2xl font-bold text-white'>adzpay</span>
				</div>

				{/* Desktop Navigation */}
				<div className='hidden md:flex items-center space-x-8'>
					{navItems.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
							{item.label}
						</Link>
					))}
				</div>

				{/* Notifications and Profile */}
				<div className='flex items-center space-x-4'>
					{/* Notifications */}

					{/* <button className='relative p-2 text-gray-400 hover:text-white transition-colors duration-200'>
						<Bell className='h-5 w-5' />
					</button>
 */}

					<span className='relative pr-12 text-gray-400 hover:text-white transition-colors duration-200'>
						<NotificationCenter />
					</span>

					{/* Profile Dropdown */}
					<div className='relative hidden md:block'>
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200'>
							<img
								src={user?.picture ?? undefined}
								alt='Profile'
								className='h-8 w-8 rounded-full border-2 border-gray-700'
							/>
							<ChevronDown
								className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
									dropdownOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						{/* Dropdown Menu */}
						<AnimatePresence>
							{dropdownOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className='absolute right-0 mt-2 w-56 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1'>
									{dropdownOptions.map((option) => (
										<Link
											key={option.label}
											href={option.href}
											className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md'>
											{option.label}
										</Link>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className='md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800'>
						<Menu className='h-6 w-6' />
					</button>
				</div>
			</div>

			{/* Mobile Menu & Profile Dropdown */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='md:hidden px-4 pt-2'>
						<div className='bg-gray-800 rounded-lg shadow-lg'>
							{/* Profile Section */}
							<div className='flex items-center space-x-3 p-4'>
								<img
									src={user?.picture ?? undefined}
									alt='Profile'
									className='h-10 w-10 rounded-full border-2 border-gray-700'
								/>
								<span className='text-sm text-gray-300 font-medium'>
									{user?.family_name || 'User'}
								</span>
							</div>

							{/* Navigation Links */}
							<div className='space-y-2 px-4 py-2'>
								{navItems.map((item) => (
									<Link
										key={item.label}
										href={item.href}
										className='block text-gray-300 hover:text-white py-2'>
										{item.label}
									</Link>
								))}
							</div>

							{/* Dropdown Options */}
							<div className='border-t border-gray-700 px-4 py-2'>
								{dropdownOptions.map((option) => (
									<Link
										key={option.label}
										href={option.href}
										className='block text-gray-300 hover:text-white py-2'>
										{option.label}
									</Link>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default React.memo(Navbar);
