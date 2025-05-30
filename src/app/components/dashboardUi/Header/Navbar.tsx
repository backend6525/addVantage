'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
	useKindeBrowserClient,
	LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import Brand from '../../ui/Brand';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/components/ui/toast/use-toast';

interface NavbarProps {
	search: string;
	setIsMenuOpen: (isOpen: boolean) => void;
	onMenuToggle: () => void;
	userStatus: {
		isOnline: boolean;
		lastSeen?: string;
	};
}

interface DropdownOption {
	href: string;
	label: string;
	onClick?: () => void;
}

const navItems = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/ads', label: 'Ads' },
	{ href: '/analytics', label: 'Analytics' },
	{ href: '/dashboard/BulkSMS', label: 'Messages' },
	{ href: '/help', label: 'Help' },
];

const Navbar: React.FC<NavbarProps> = ({
	search,
	setIsMenuOpen,
	onMenuToggle,
	userStatus,
}) => {
	const { user } = useKindeBrowserClient();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleSignOut = async () => {
		try {
			// Call our signout API first
			const response = await fetch('/api/auth/signout', {
				method: 'POST',
			});

			// Clear session storage regardless of API response
			sessionStorage.clear();

			// Redirect to Kinde logout
			window.location.href = '/api/auth/logout';
		} catch (error) {
			console.error('Error signing out:', error);
			// If API call fails, still try to logout from Kinde
			window.location.href = '/api/auth/logout';
		}
	};

	const dropdownOptions: DropdownOption[] = [
		{ href: '/dashboard/profile', label: 'Profile' },
		{ href: '/settings', label: 'Settings' },
		{ href: '/purchase-history', label: 'Purchase History' },
		{ href: '/refer-friends', label: 'Refer Friends' },
		{ href: '/create-team', label: 'Create Team' },
		{ href: '#', label: 'Sign Out', onClick: handleSignOut },
	];

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-slate-800/70 border-b border-slate-700/50'>
			<div className='mx-auto flex items-center justify-between h-16 px-4 sm:px-8'>
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

					{/* <button className='relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200'>
						<Bell className='h-5 w-5' />
					</button>
 */}

					{/* <span className='relative pr-12 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200'>
						<NotificationCenter />
					</span> */}

					{/* Profile Dropdown */}
					<div className='relative hidden md:block'>
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className='flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200'>
							<img
								src={user?.picture ?? undefined}
								alt='Profile'
								className='h-8 w-8 rounded-full border-2 border-slate-700/50'
							/>
							<ChevronDown
								className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${
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
									className='absolute right-0 mt-2 w-56 rounded-lg bg-slate-800/70 border border-slate-700/50 shadow-lg py-1'>
									{dropdownOptions.map((option) => (
										<a
											key={option.label}
											href={option.href}
											onClick={option.onClick}
											className='block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700/50 rounded-md cursor-pointer'>
											{option.label}
										</a>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className='md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700/50'>
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
						<div className='bg-slate-800/70 rounded-lg shadow-lg border border-slate-700/50'>
							{/* Profile Section */}
							<div className='flex items-center space-x-3 p-4'>
								<img
									src={user?.picture ?? undefined}
									alt='Profile'
									className='h-10 w-10 rounded-full border-2 border-slate-700/50'
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
							<div className='border-t border-slate-700/50 px-4 py-2'>
								{dropdownOptions.map((option) => (
									<a
										key={option.label}
										href={option.href}
										onClick={option.onClick}
										className='block text-gray-300 hover:text-white py-2 cursor-pointer'>
										{option.label}
									</a>
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
