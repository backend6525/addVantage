// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import {
// 	useKindeBrowserClient,
// 	LogoutLink,
// } from '@kinde-oss/kinde-auth-nextjs';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Bell, ChevronDown, Menu } from 'lucide-react';
// import Brand from '../../ui/Brand';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/app/components/ui/toast/use-toast';
// import Image from 'next/image';

// interface NavbarProps {
// 	search: string;
// 	setIsMenuOpen: (isOpen: boolean) => void;
// 	onMenuToggle: () => void;
// 	userStatus: {
// 		isOnline: boolean;
// 		lastSeen?: string;
// 	};
// }

// interface DropdownOption {
// 	href: string;
// 	label: string;
// 	onClick?: () => void;
// }

// const navItems = [
// 	{ href: '/dashboard', label: 'Dashboard' },
// 	{ href: '/ads', label: 'Ads' },
// 	{ href: '/analytics', label: 'Analytics' },
// 	{ href: '/dashboard/BulkSMS', label: 'Messages' },
// 	{ href: '/help', label: 'Help' },
// ];

// const Navbar: React.FC<NavbarProps> = ({
// 	search,
// 	setIsMenuOpen,
// 	onMenuToggle,
// 	userStatus,
// }) => {
// 	const { user } = useKindeBrowserClient();
// 	const [dropdownOpen, setDropdownOpen] = useState(false);
// 	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// 		const [userData, setUserData] = useState<any>(null);
// 	const router = useRouter();
// 	const { toast } = useToast();

// 	const handleSignOut = async () => {
// 		try {
// 			// Call our signout API first
// 			const response = await fetch('/api/auth/signout', {
// 				method: 'POST',
// 			});

// 			// Clear session storage regardless of API response
// 			sessionStorage.clear();

// 			// Redirect to Kinde logout
// 			window.location.href = '/api/auth/logout';
// 		} catch (error) {
// 			console.error('Error signing out:', error);
// 			// If API call fails, still try to logout from Kinde
// 			window.location.href = '/api/auth/logout';
// 		}
// 	};

// 	const dropdownOptions: DropdownOption[] = [
// 		{ href: '/dashboard/profile', label: 'Profile' },
// 		{ href: '/settings', label: 'Settings' },
// 		{ href: '/purchase-history', label: 'Purchase History' },
// 		{ href: '/refer-friends', label: 'Refer Friends' },
// 		{ href: '/create-team', label: 'Create Team' },
// 		{ href: '#', label: 'Sign Out', onClick: handleSignOut },
// 	];

// 	return (
// 		<nav className='fixed top-0 left-0 right-0 z-50 bg-slate-800/70 border-b border-slate-700/50'>
// 			<div className='mx-auto flex items-center justify-between h-16 px-4 sm:px-8'>
// 				{/* Logo and Brand */}
// 				<div className='flex items-center'>
// 					<Brand className='w-10 h-10' />
// 					<span className='ml-3 text-2xl font-bold text-white'>adzpay</span>
// 				</div>

// 				{/* Desktop Navigation */}
// 				<div className='hidden md:flex items-center space-x-8'>
// 					{navItems.map((item) => (
// 						<Link
// 							key={item.label}
// 							href={item.href}
// 							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
// 							{item.label}
// 						</Link>
// 					))}
// 				</div>

// 				{/* Notifications and Profile */}
// 				<div className='flex items-center space-x-4'>
// 					{/* Notifications */}

// 					{/* <button className='relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200'>
// 						<Bell className='h-5 w-5' />
// 					</button>
//  */}

// 					{/* <span className='relative pr-12 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200'>
// 						<NotificationCenter />
// 					</span> */}

// 					{/* Profile Dropdown */}
// 					<div className='relative hidden md:block'>
// 						<button
// 							onClick={() => setDropdownOpen(!dropdownOpen)}
// 							className='flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200'>
// 							{/* <img
// 								src={user?.picture ?? undefined}
// 								alt='Profile'
// 								className='h-8 w-8 rounded-full border-2 border-slate-700/50'
// 							/> */}
// 							<button
// 								onClick={() => setIsMenuOpen(!isMenuOpen)}
// 								className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
// 								<div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600'>
// 									{userData?.picture ? (
// 										<Image
// 											src={userData.picture}
// 											alt='Profile'
// 											width={32}
// 											height={32}
// 											className='object-cover'
// 										/>
// 									) : (
// 										<span className='text-white font-bold'>
// 											{userData?.name?.charAt(0) || 'U'}
// 										</span>
// 									)}
// 								</div>
// 							</button>
// 							<ChevronDown
// 								className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${
// 									dropdownOpen ? 'rotate-180' : ''
// 								}`}
// 							/>
// 						</button>

// 						{/* Dropdown Menu */}
// 						<AnimatePresence>
// 							{dropdownOpen && (
// 								<motion.div
// 									initial={{ opacity: 0, y: 10 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									exit={{ opacity: 0, y: 10 }}
// 									className='absolute right-0 mt-2 w-56 rounded-lg bg-slate-800/70 border border-slate-700/50 shadow-lg py-1'>
// 									{dropdownOptions.map((option) => (
// 										<a
// 											key={option.label}
// 											href={option.href}
// 											onClick={option.onClick}
// 											className='block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700/50 rounded-md cursor-pointer'>
// 											{option.label}
// 										</a>
// 									))}
// 								</motion.div>
// 							)}
// 						</AnimatePresence>
// 					</div>

// 					{/* Mobile Menu Button */}
// 					<button
// 						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// 						className='md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700/50'>
// 						<Menu className='h-6 w-6' />
// 					</button>
// 				</div>
// 			</div>

// 			{/* Mobile Menu & Profile Dropdown */}
// 			<AnimatePresence>
// 				{mobileMenuOpen && (
// 					<motion.div
// 						initial={{ opacity: 0, y: -10 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						exit={{ opacity: 0, y: -10 }}
// 						className='md:hidden px-4 pt-2'>
// 						<div className='bg-slate-800/70 rounded-lg shadow-lg border border-slate-700/50'>
// 							{/* Profile Section */}
// 							<div className='flex items-center space-x-3 p-4'>
// 								<img
// 									src={user?.picture ?? undefined}
// 									alt='Profile'
// 									className='h-10 w-10 rounded-full border-2 border-slate-700/50'
// 								/>
// 								<span className='text-sm text-gray-300 font-medium'>
// 									{user?.family_name || 'User'}
// 								</span>
// 							</div>

// 							{/* Navigation Links */}
// 							<div className='space-y-2 px-4 py-2'>
// 								{navItems.map((item) => (
// 									<Link
// 										key={item.label}
// 										href={item.href}
// 										className='block text-gray-300 hover:text-white py-2'>
// 										{item.label}
// 									</Link>
// 								))}
// 							</div>

// 							{/* Dropdown Options */}
// 							<div className='border-t border-slate-700/50 px-4 py-2'>
// 								{dropdownOptions.map((option) => (
// 									<a
// 										key={option.label}
// 										href={option.href}
// 										onClick={option.onClick}
// 										className='block text-gray-300 hover:text-white py-2 cursor-pointer'>
// 										{option.label}
// 									</a>
// 								))}
// 							</div>
// 						</div>
// 					</motion.div>
// 				)}
// 			</AnimatePresence>
// 		</nav>
// 	);
// };

// export default React.memo(Navbar);

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Bell, ChevronDown, Menu } from 'lucide-react';
// import Brand from '../../ui/Brand';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/app/components/ui/toast/use-toast';
// import Image from 'next/image';

// interface NavbarProps {
// 	search: string;
// 	setIsMenuOpen: (isOpen: boolean) => void;
// 	onMenuToggle: () => void;
// 	userStatus: {
// 		isOnline: boolean;
// 		lastSeen?: string;
// 	};
// }

// interface DropdownOption {
// 	href: string;
// 	label: string;
// 	onClick?: () => void;
// }

// interface UserData {
// 	id: string;
// 	name: string;
// 	email: string;
// 	picture?: string;
// 	family_name?: string;
// }

// const navItems = [
// 	{ href: '/dashboard', label: 'Dashboard' },
// 	{ href: '/ads', label: 'Ads' },
// 	{ href: '/analytics', label: 'Analytics' },
// 	{ href: '/dashboard/BulkSMS', label: 'Messages' },
// 	{ href: '/help', label: 'Help' },
// ];

// const Navbar: React.FC<NavbarProps> = ({
// 	search,
// 	setIsMenuOpen,
// 	onMenuToggle,
// 	userStatus,
// }) => {
// 	const [dropdownOpen, setDropdownOpen] = useState(false);
// 	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// 	const [userData, setUserData] = useState<UserData | null>(null);
// 	const [loading, setLoading] = useState(true);
// 	const router = useRouter();
// 	const { toast } = useToast();

// 	// Fetch user data from API
// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			try {
// 				setLoading(true);
// 				const response = await fetch('/api/auth/user');

// 				if (response.ok) {
// 					const userData = await response.json();
// 					setUserData(userData);
// 				} else {
// 					console.error('Failed to fetch user data');
// 					toast({
// 						title: 'Error',
// 						description: 'Failed to load user data',
// 						variant: 'destructive',
// 					});
// 				}
// 			} catch (error) {
// 				console.error('Error fetching user data:', error);
// 				toast({
// 					title: 'Error',
// 					description: 'Failed to load user data',
// 					variant: 'destructive',
// 				});
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchUserData();
// 	}, [toast]);

// 	const handleSignOut = async () => {
// 		try {
// 			// Call our signout API first
// 			const response = await fetch('/api/auth/signout', {
// 				method: 'POST',
// 			});

// 			// Clear session storage regardless of API response
// 			sessionStorage.clear();

// 			// Redirect to Kinde logout
// 			window.location.href = '/api/auth/logout';
// 		} catch (error) {
// 			console.error('Error signing out:', error);
// 			// If API call fails, still try to logout from Kinde
// 			window.location.href = '/api/auth/logout';
// 		}
// 	};

// 	const dropdownOptions: DropdownOption[] = [
// 		{ href: '/dashboard/profile', label: 'Profile' },
// 		{ href: '/settings', label: 'Settings' },
// 		{ href: '/purchase-history', label: 'Purchase History' },
// 		{ href: '/refer-friends', label: 'Refer Friends' },
// 		{ href: '/create-team', label: 'Create Team' },
// 		{ href: '#', label: 'Sign Out', onClick: handleSignOut },
// 	];

// 	return (
// 		<nav className='fixed top-0 left-0 right-0 z-50 bg-slate-800/70 border-b border-slate-700/50'>
// 			<div className='mx-auto flex items-center justify-between h-16 px-4 sm:px-8'>
// 				{/* Logo and Brand */}
// 				<div className='flex items-center'>
// 					<Brand className='w-10 h-10' />
// 					<span className='ml-3 text-2xl font-bold text-white'>adzpay</span>
// 				</div>

// 				{/* Desktop Navigation */}
// 				<div className='hidden md:flex items-center space-x-8'>
// 					{navItems.map((item) => (
// 						<Link
// 							key={item.label}
// 							href={item.href}
// 							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
// 							{item.label}
// 						</Link>
// 					))}
// 				</div>

// 				{/* Notifications and Profile */}
// 				<div className='flex items-center space-x-4'>
// 					{/* Profile Dropdown */}
// 					<div className='relative hidden md:block'>
// 						<button
// 							onClick={() => setDropdownOpen(!dropdownOpen)}
// 							className='flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200'>
// 							<button
// 								onClick={() => setIsMenuOpen(!isMenuOpen)}
// 								className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
// 								<div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600'>
// 									{loading ? (
// 										<div className='w-8 h-8 bg-gray-600 rounded-full animate-pulse'></div>
// 									) : userData?.picture ? (
// 										<Image
// 											src={userData.picture}
// 											alt='Profile'
// 											width={32}
// 											height={32}
// 											className='object-cover'
// 										/>
// 									) : (
// 										<span className='text-white font-bold'>
// 											{userData?.name?.charAt(0) || 'U'}
// 										</span>
// 									)}
// 								</div>
// 							</button>
// 							<ChevronDown
// 								className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${
// 									dropdownOpen ? 'rotate-180' : ''
// 								}`}
// 							/>
// 						</button>

// 						{/* Dropdown Menu */}
// 						<AnimatePresence>
// 							{dropdownOpen && (
// 								<motion.div
// 									initial={{ opacity: 0, y: 10 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									exit={{ opacity: 0, y: 10 }}
// 									className='absolute right-0 mt-2 w-56 rounded-lg bg-slate-800/70 border border-slate-700/50 shadow-lg py-1'>
// 									{dropdownOptions.map((option) => (
// 										<a
// 											key={option.label}
// 											href={option.href}
// 											onClick={option.onClick}
// 											className='block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700/50 rounded-md cursor-pointer'>
// 											{option.label}
// 										</a>
// 									))}
// 								</motion.div>
// 							)}
// 						</AnimatePresence>
// 					</div>

// 					{/* Mobile Menu Button */}
// 					<button
// 						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// 						className='md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700/50'>
// 						<Menu className='h-6 w-6' />
// 					</button>
// 				</div>
// 			</div>

// 			{/* Mobile Menu & Profile Dropdown */}
// 			<AnimatePresence>
// 				{mobileMenuOpen && (
// 					<motion.div
// 						initial={{ opacity: 0, y: -10 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						exit={{ opacity: 0, y: -10 }}
// 						className='md:hidden px-4 pt-2'>
// 						<div className='bg-slate-800/70 rounded-lg shadow-lg border border-slate-700/50'>
// 							{/* Profile Section */}
// 							<div className='flex items-center space-x-3 p-4'>
// 								<div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600'>
// 									{loading ? (
// 										<div className='w-10 h-10 bg-gray-600 rounded-full animate-pulse'></div>
// 									) : userData?.picture ? (
// 										<Image
// 											src={userData.picture}
// 											alt='Profile'
// 											width={40}
// 											height={40}
// 											className='object-cover'
// 										/>
// 									) : (
// 										<span className='text-white font-bold text-lg'>
// 											{userData?.name?.charAt(0) || 'U'}
// 										</span>
// 									)}
// 								</div>
// 								<span className='text-sm text-gray-300 font-medium'>
// 									{loading
// 										? 'Loading...'
// 										: userData?.family_name || userData?.name || 'User'}
// 								</span>
// 							</div>

// 							{/* Navigation Links */}
// 							<div className='space-y-2 px-4 py-2'>
// 								{navItems.map((item) => (
// 									<Link
// 										key={item.label}
// 										href={item.href}
// 										className='block text-gray-300 hover:text-white py-2'>
// 										{item.label}
// 									</Link>
// 								))}
// 							</div>

// 							{/* Dropdown Options */}
// 							<div className='border-t border-slate-700/50 px-4 py-2'>
// 								{dropdownOptions.map((option) => (
// 									<a
// 										key={option.label}
// 										href={option.href}
// 										onClick={option.onClick}
// 										className='block text-gray-300 hover:text-white py-2 cursor-pointer'>
// 										{option.label}
// 									</a>
// 								))}
// 							</div>
// 						</div>
// 					</motion.div>
// 				)}
// 			</AnimatePresence>
// 		</nav>
// 	);
// };

// export default React.memo(Navbar);

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import Brand from '../../ui/Brand';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/components/ui/toast/use-toast';
import Image from 'next/image';

interface NavbarProps {
	search: string;
	isMenuOpen: boolean; // Add this prop
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

interface UserData {
	id: string;
	name: string;
	email: string;
	picture?: string;
	family_name?: string;
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
	isMenuOpen, // Receive the prop
	setIsMenuOpen,
	onMenuToggle,
	userStatus,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { toast } = useToast();

	// Fetch user data from API
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/auth/user');

				if (response.ok) {
					const userData = await response.json();
					setUserData(userData);
				} else {
					console.error('Failed to fetch user data');
					toast({
						title: 'Error',
						description: 'Failed to load user data',
						variant: 'destructive',
					});
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				toast({
					title: 'Error',
					description: 'Failed to load user data',
					variant: 'destructive',
				});
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [toast]);

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
					{/* Profile Dropdown */}
					<div className='relative hidden md:block'>
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className='flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200'>
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)} // Now using isMenuOpen prop
								className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
								<div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600'>
									{loading ? (
										<div className='w-8 h-8 bg-gray-600 rounded-full animate-pulse'></div>
									) : userData?.picture ? (
										<Image
											src={userData.picture}
											alt='Profile'
											width={32}
											height={32}
											className='object-cover'
										/>
									) : (
										<span className='text-white font-bold'>
											{userData?.name?.charAt(0) || 'U'}
										</span>
									)}
								</div>
							</button>
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
								<div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600'>
									{loading ? (
										<div className='w-10 h-10 bg-gray-600 rounded-full animate-pulse'></div>
									) : userData?.picture ? (
										<Image
											src={userData.picture}
											alt='Profile'
											width={40}
											height={40}
											className='object-cover'
										/>
									) : (
										<span className='text-white font-bold text-lg'>
											{userData?.name?.charAt(0) || 'U'}
										</span>
									)}
								</div>
								<span className='text-sm text-gray-300 font-medium'>
									{loading
										? 'Loading...'
										: userData?.family_name || userData?.name || 'User'}
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
