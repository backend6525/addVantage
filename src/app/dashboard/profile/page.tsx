// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import {
// 	FaTwitch,
// 	FaInstagram,
// 	FaWhatsapp,
// 	FaTwitter,
// 	FaFacebook,
// 	FaYoutube,
// 	FaLinkedin,
// 	FaGlobe,
// 	FaEdit,
// 	FaUser,
// 	FaBriefcase,
// 	FaHistory,
// 	FaImages,
// 	FaFolder,
// 	FaChartLine,
// 	FaBell,
// 	FaCog,
// 	FaStar,
// 	FaCalendarAlt,
// 	FaLink,
// 	FaHeart,
// 	FaComment,
// 	FaEye,
// 	FaLock,
// 	FaCrown,
// } from 'react-icons/fa';
// import {
// 	TicketIcon,
// 	Mail,
// 	ExternalLink,
// 	MessageSquare,
// 	Share2,
// 	Award,
// 	Users,
// 	Monitor,
// 	Sparkles,
// 	Activity,
// } from 'lucide-react';
// import SidebarCard from './sidebarCard';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// // Custom TikTok icon component
// const TiktokIcon = () => (
// 	<svg
// 		xmlns='http://www.w3.org/2000/svg'
// 		width='24'
// 		height='24'
// 		viewBox='0 0 24 24'
// 		fill='none'
// 		stroke='currentColor'
// 		strokeWidth='2'
// 		strokeLinecap='round'
// 		strokeLinejoin='round'>
// 		<path d='M19 9.5V15.5C19 17.5 17.5 19 15.5 19H9.5C7.5 19 6 17.5 6 15.5V9.5C6 7.5 7.5 6 9.5 6H15.5C17.5 6 19 7.5 19 9.5Z' />
// 		<path d='M12 16V8' />
// 		<path d='M8 12H16' />
// 	</svg>
// );

// type TabType = 'history' | 'portfolio' | 'collection' | 'analytics';

// export default function PremiumProfile() {
// 	const router = useRouter();
// 	const [userData, setUserData] = useState<any>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const [activeTab, setActiveTab] = useState<TabType>('history');
// 	const [showEditButtons, setShowEditButtons] = useState(false);
// 	const [showSocialModal, setShowSocialModal] = useState(false);
// 	const [notificationsCount, setNotificationsCount] = useState(3);
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const menuRef = useRef(null);

// 	// Mock analytics data
// 	const analyticsData = {
// 		followers: {
// 			count: 12453,
// 			growth: 8.7,
// 			data: [12, 19, 15, 23, 28, 30, 32, 35, 40, 41, 35, 38],
// 		},
// 		engagement: {
// 			count: '7.8%',
// 			growth: 2.3,
// 			data: [5, 8, 6, 9, 7, 5, 8, 9, 7, 8, 6, 8],
// 		},
// 		recentPosts: [
// 			{
// 				id: 1,
// 				title: 'Latest Project Reveal',
// 				platform: 'instagram',
// 				image: '/post1.jpg',
// 				likes: 843,
// 				comments: 76,
// 				views: 5249,
// 				date: '2 days ago',
// 				performance: 95,
// 			},
// 			{
// 				id: 2,
// 				title: 'Behind the Scenes',
// 				platform: 'youtube',
// 				image: '/post2.jpg',
// 				likes: 1256,
// 				comments: 124,
// 				views: 12852,
// 				date: '1 week ago',
// 				performance: 87,
// 			},
// 			{
// 				id: 3,
// 				title: 'Industry Insights',
// 				platform: 'linkedin',
// 				image: '/post3.jpg',
// 				likes: 456,
// 				comments: 38,
// 				views: 2145,
// 				date: '2 weeks ago',
// 				performance: 72,
// 			},
// 		],
// 		upcomingContent: [
// 			{
// 				id: 1,
// 				title: 'Q3 Strategy Reveal',
// 				platform: 'youtube',
// 				scheduledFor: 'May 10, 2025',
// 				status: 'scheduled',
// 			},
// 			{
// 				id: 2,
// 				title: 'Summer Collection Launch',
// 				platform: 'instagram',
// 				scheduledFor: 'May 15, 2025',
// 				status: 'draft',
// 			},
// 		],
// 		platformPerformance: [
// 			{ name: 'Instagram', growth: 12.5, followers: 5263 },
// 			{ name: 'YouTube', growth: 8.2, followers: 3870 },
// 			{ name: 'LinkedIn', growth: 15.7, followers: 2124 },
// 			{ name: 'Twitter', growth: 6.3, followers: 1196 },
// 		],
// 	};

// 	// Portfolio items mock data
// 	const portfolioItems = [
// 		{
// 			id: 1,
// 			title: 'Brand Redesign Project',
// 			description: 'Complete visual identity refresh for a major tech client',
// 			image: '/portfolio1.jpg',
// 			category: 'Branding',
// 			featured: true,
// 		},
// 		{
// 			id: 2,
// 			title: 'Mobile App UI Design',
// 			description: 'Modern interface design for a fitness tracking application',
// 			image: '/portfolio2.jpg',
// 			category: 'UI/UX',
// 		},
// 		{
// 			id: 3,
// 			title: 'Product Photography',
// 			description: 'Professional studio shots for an upcoming product line',
// 			image: '/portfolio3.jpg',
// 			category: 'Photography',
// 		},
// 		{
// 			id: 4,
// 			title: 'Website Redesign',
// 			description: 'Complete overhaul of an e-commerce platform',
// 			image: '/portfolio4.jpg',
// 			category: 'Web Design',
// 		},
// 	];

// 	// Collection items mock data
// 	const collectionItems = [
// 		{
// 			id: 1,
// 			title: 'Design Inspiration',
// 			itemCount: 47,
// 			coverImage: '/collection1.jpg',
// 			isPrivate: false,
// 		},
// 		{
// 			id: 2,
// 			title: 'Project References',
// 			itemCount: 23,
// 			coverImage: '/collection2.jpg',
// 			isPrivate: true,
// 		},
// 		{
// 			id: 3,
// 			title: 'Marketing Ideas',
// 			itemCount: 15,
// 			coverImage: '/collection3.jpg',
// 			isPrivate: false,
// 		},
// 	];

// 	// Usage history mock data
// 	const usageHistory = [
// 		{
// 			id: 1,
// 			action: 'Posted on Instagram',
// 			date: 'April 22, 2025',
// 			detail: 'New product announcement',
// 		},
// 		{
// 			id: 2,
// 			action: 'Published YouTube video',
// 			date: 'April 18, 2025',
// 			detail: 'Behind the scenes tour',
// 		},
// 		{
// 			id: 3,
// 			action: 'Updated LinkedIn profile',
// 			date: 'April 15, 2025',
// 			detail: 'Added new skills and certifications',
// 		},
// 		{
// 			id: 4,
// 			action: 'Created new collection',
// 			date: 'April 10, 2025',
// 			detail: 'Summer campaign assets',
// 		},
// 	];

// 	// Close menu when clicking outside
// 	useEffect(() => {
// 		function handleClickOutside(event) {
// 			if (menuRef.current && !menuRef.current.contains(event.target)) {
// 				setIsMenuOpen(false);
// 			}
// 		}

// 		document.addEventListener('mousedown', handleClickOutside);
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	}, [menuRef]);

// 	// Fetch user data on component mount
// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			try {
// 				setIsLoading(true);
// 				const response = await fetch('/api/auth/user');
// 				if (!response.ok) {
// 					throw new Error('Failed to fetch user data');
// 				}
// 				const data = await response.json();

// 				// Check if the data is nested (common in API responses)
// 				let userDataObj = data;
// 				if (data && data.data) {
// 					userDataObj = data.data;
// 				}

// 				if (userDataObj) {
// 					console.log('User data fetched successfully:', userDataObj);

// 					// Add premium status for demo purposes
// 					userDataObj.premiumStatus = {
// 						tier: 'Pro',
// 						since: 'January 2025',
// 						features: [
// 							'Analytics Dashboard',
// 							'Multi-platform Integration',
// 							'Priority Support',
// 							'Custom Branding',
// 						],
// 					};

// 					setUserData(userDataObj);
// 				} else {
// 					setError('No user data found');
// 				}
// 			} catch (error) {
// 				console.error('Error fetching user data:', error);
// 				setError('Failed to load profile data');
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchUserData();
// 	}, []);

// 	// Handle edit profile button click
// 	const handleEditProfile = () => {
// 		router.push('/onboarding');
// 	};

// 	// Get platform icon by name
// 	const getPlatformIcon = (platform) => {
// 		switch (platform) {
// 			case 'instagram':
// 				return <FaInstagram className='w-5 h-5' />;
// 			case 'twitter':
// 				return <FaTwitter className='w-5 h-5' />;
// 			case 'youtube':
// 				return <FaYoutube className='w-5 h-5' />;
// 			case 'linkedin':
// 				return <FaLinkedin className='w-5 h-5' />;
// 			case 'facebook':
// 				return <FaFacebook className='w-5 h-5' />;
// 			case 'tiktok':
// 				return <TiktokIcon />;
// 			default:
// 				return <FaLink className='w-5 h-5' />;
// 		}
// 	};

// 	if (isLoading) {
// 		return (
// 			<div className='bg-black text-gray-100 min-h-screen pt-[6rem] px-6 flex justify-center items-center'>
// 				<div className='flex flex-col items-center'>
// 					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4'></div>
// 					<p className='text-blue-400'>Loading your premium profile...</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className='bg-black text-gray-100 min-h-screen pt-[6rem] px-6 flex justify-center items-center'>
// 				<div className='text-red-500 text-center'>
// 					<h3 className='text-xl font-bold mb-2'>Error Loading Profile</h3>
// 					<p>{error}</p>
// 					<button
// 						onClick={() => window.location.reload()}
// 						className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors'>
// 						Try Again
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='bg-gray-900 text-gray-100 min-h-screen pt-[6rem] px-4 md:px-6'>
// 			{/* Top Navigation Bar */}
// 			<div className='fixed top-16 left-0 right-0 bg-gray-900/90 backdrop-blur-md z-10 shadow-lg border-b border-gray-800'>
// 				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
// 					<div className='flex justify-between h-16 items-center'>
// 						<div className='flex items-center'>
// 							<div className='flex-shrink-0 flex items-center'>
// 								<FaCrown className='h-5 w-5 text-yellow-400 mr-2' />
// 								<span className='font-bold text-lg text-white'>
// 									Premium Dashboard
// 								</span>
// 							</div>
// 						</div>
// 						<div className='flex items-center space-x-6'>
// 							<button className='text-gray-300 hover:text-white relative'>
// 								<FaBell className='h-5 w-5' />
// 								{notificationsCount > 0 && (
// 									<span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs'>
// 										{notificationsCount}
// 									</span>
// 								)}
// 							</button>
// 							<div className='relative' ref={menuRef}>
// 								<button
// 									onClick={() => setIsMenuOpen(!isMenuOpen)}
// 									className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
// 									<div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600'>
// 										{userData?.picture ? (
// 											<Image
// 												src={userData.picture}
// 												alt='Profile'
// 												width={32}
// 												height={32}
// 												className='object-cover'
// 											/>
// 										) : (
// 											<span className='text-white font-bold'>
// 												{userData?.name?.charAt(0) || 'U'}
// 											</span>
// 										)}
// 									</div>
// 								</button>

// 								{isMenuOpen && (
// 									<div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50'>
// 										<div className='py-1'>
// 											<a
// 												href='#'
// 												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
// 												Your Profile
// 											</a>
// 											<a
// 												href='#'
// 												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
// 												Settings
// 											</a>
// 											<a
// 												href='#'
// 												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
// 												Subscription
// 											</a>
// 											<a
// 												href='#'
// 												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
// 												Sign out
// 											</a>
// 										</div>
// 									</div>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='flex flex-col lg:flex-row lg:justify-between gap-8 max-w-7xl mx-auto mt-8'>
// 				{/* Main Profile Section */}
// 				<div className='flex-1'>
// 					{/* Profile Header Section */}
// 					<div className='relative rounded-xl overflow-hidden shadow-lg border border-gray-800'>
// 						{/* Banner Image */}
// 						<div className='w-full h-64 bg-gray-800 overflow-hidden relative'>
// 							<Image
// 								src='/Banner.webp'
// 								alt='Banner Image'
// 								layout='fill'
// 								objectFit='cover'
// 								className='w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 opacity-70'
// 							/>
// 							<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>

// 							{/* Premium badge */}
// 							<div className='absolute top-4 right-4'>
// 								<div className='bg-yellow-500 text-black px-3 py-1 rounded-full font-bold flex items-center shadow-md text-sm'>
// 									<FaCrown className='mr-1' />
// 									PRO MEMBER
// 								</div>
// 							</div>
// 						</div>

// 						{/* Profile Picture and Name */}
// 						<div className='absolute top-48 left-4 md:left-8 lg:left-12 flex items-start'>
// 							<motion.div
// 								whileHover={{ scale: 1.05 }}
// 								className='rounded-full w-24 h-24 md:w-28 md:h-28 bg-gray-700 overflow-hidden border-4 border-gray-900 shadow-lg relative group'>
// 								{userData?.picture ? (
// 									<Image
// 										src={userData.picture}
// 										alt='Profile Image'
// 										width={112}
// 										height={112}
// 										className='object-cover'
// 									/>
// 								) : (
// 									<div className='w-full h-full flex items-center justify-center text-white text-3xl font-bold'>
// 										{userData?.name?.charAt(0) || 'U'}
// 									</div>
// 								)}
// 							</motion.div>
// 						</div>
// 					</div>

// 					{/* Profile Info Section */}
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ delay: 0.2 }}
// 						className='mt-20 flex flex-col md:flex-row justify-between items-start p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700'>
// 						<div className='flex flex-col mb-6 md:mb-0'>
// 							<div className='flex items-center'>
// 								<h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
// 									{userData?.name || 'User'}
// 								</h1>
// 								<div className='ml-3 flex items-center'>
// 									<div className='bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium'>
// 										Verified
// 									</div>
// 								</div>
// 							</div>

// 							<div className='flex flex-wrap gap-y-2 mt-1'>
// 								<div className='flex items-center text-gray-400 mr-4'>
// 									<Mail className='w-4 h-4 mr-2' />
// 									<p className='text-sm'>
// 										{userData?.email || 'No email provided'}
// 									</p>
// 								</div>
// 								{userData?.companyName && (
// 									<div className='flex items-center text-gray-400 mr-4'>
// 										<FaBriefcase className='w-4 h-4 mr-2' />
// 										<p className='text-sm'>{userData.companyName}</p>
// 									</div>
// 								)}
// 								<div className='flex items-center text-gray-400'>
// 									<Users className='w-4 h-4 mr-2' />
// 									<p className='text-sm'>12.4K Followers</p>
// 								</div>
// 							</div>

// 							<div className='mt-3'>
// 								<p className='text-sm text-gray-400 max-w-md'>
// 									{userData?.bio ||
// 										'Digital creator specializing in design and marketing'}
// 								</p>
// 							</div>
// 						</div>

// 						<div className='flex flex-col items-center mb-6 md:mb-0'>
// 							<h3 className='text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium'>
// 								Connected Platforms
// 							</h3>
// 							<div className='flex flex-wrap items-center gap-3 justify-center'>
// 								{userData?.platforms?.includes('instagram') && (
// 									<motion.div
// 										whileHover={{ scale: 1.1 }}
// 										className='flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 text-white shadow-md'>
// 										<FaInstagram className='w-4 h-4' />
// 									</motion.div>
// 								)}
// 								{userData?.platforms?.includes('twitter') && (
// 									<motion.div
// 										whileHover={{ scale: 1.1 }}
// 										className='flex items-center justify-center w-9 h-9 rounded-full bg-blue-400 text-white shadow-md'>
// 										<FaTwitter className='w-4 h-4' />
// 									</motion.div>
// 								)}
// 								{userData?.platforms?.includes('facebook') && (
// 									<motion.div
// 										whileHover={{ scale: 1.1 }}
// 										className='flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white shadow-md'>
// 										<FaFacebook className='w-4 h-4' />
// 									</motion.div>
// 								)}
// 								{userData?.platforms?.includes('youtube') && (
// 									<motion.div
// 										whileHover={{ scale: 1.1 }}
// 										className='flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white shadow-md'>
// 										<FaYoutube className='w-4 h-4' />
// 									</motion.div>
// 								)}
// 								{userData?.platforms?.includes('tiktok') && (
// 									<motion.div
// 										whileHover={{ scale: 1.1 }}
// 										className='flex items-center justify-center w-9 h-9 rounded-full bg-black text-white shadow-md border border-gray-700'>
// 										<TiktokIcon />
// 									</motion.div>
// 								)}
// 								{userData?.platforms?.includes('linkedin') && (
// 									<motion.div
// 										whileHover={{ scale: 1.1 }}
// 										className='flex items-center justify-center w-9 h-9 rounded-full bg-blue-700 text-white shadow-md'>
// 										<FaLinkedin className='w-4 h-4' />
// 									</motion.div>
// 								)}

// 								{/* Add platform button */}
// 								<motion.button
// 									whileHover={{ scale: 1.1 }}
// 									onClick={() => setShowSocialModal(true)}
// 									className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'>
// 									<span className='text-lg font-bold'>+</span>
// 								</motion.button>
// 							</div>
// 						</div>

// 						<div className='md:mt-0 mt-4 flex flex-wrap gap-3'>
// 							<motion.button
// 								whileHover={{ scale: 1.03 }}
// 								whileTap={{ scale: 0.98 }}
// 								onClick={handleEditProfile}
// 								className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition-colors shadow-md flex items-center text-sm'>
// 								<FaEdit className='mr-2' />
// 								Edit Profile
// 							</motion.button>

// 							<motion.button
// 								whileHover={{ scale: 1.03 }}
// 								whileTap={{ scale: 0.98 }}
// 								className='bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-md transition-colors shadow-md border border-gray-600 flex items-center text-sm'>
// 								<Share2 className='mr-2 h-3.5 w-3.5' />
// 								Share
// 							</motion.button>
// 						</div>
// 					</motion.div>

// 					{/* Navigation Bar */}
// 					<div className='mt-8 flex justify-start md:justify-start space-x-6 border-b border-gray-700 px-4'>
// 						<button
// 							onClick={() => setActiveTab('history')}
// 							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
// 								activeTab === 'history'
// 									? 'border-blue-500 text-white font-medium'
// 									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
// 							}`}>
// 							<FaHistory className='mr-2' />
// 							History
// 						</button>
// 						<button
// 							onClick={() => setActiveTab('portfolio')}
// 							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
// 								activeTab === 'portfolio'
// 									? 'border-blue-500 text-white font-medium'
// 									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
// 							}`}>
// 							<FaImages className='mr-2' />
// 							Portfolio
// 						</button>
// 						<button
// 							onClick={() => setActiveTab('collection')}
// 							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
// 								activeTab === 'collection'
// 									? 'border-blue-500 text-white font-medium'
// 									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
// 							}`}>
// 							<FaFolder className='mr-2' />
// 							Collection
// 						</button>
// 						<button
// 							onClick={() => setActiveTab('analytics')}
// 							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
// 								activeTab === 'analytics'
// 									? 'border-blue-500 text-white font-medium'
// 									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
// 							}`}>
// 							<FaGlobe className='mr-2' />
// 							Analytics
// 						</button>
// 					</div>

// 					{/* Tab Content */}
// 					<AnimatePresence mode='wait'>
// 						{activeTab === 'history' && (
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								exit={{ opacity: 0, y: -20 }}
// 								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
// 								<h3 className='text-lg font-semibold text-white mb-4'>
// 									Recent Activity
// 								</h3>
// 								<div className='space-y-4'>
// 									{usageHistory.map((item) => (
// 										<div
// 											key={item.id}
// 											className='flex items-start pb-4 border-b border-gray-700 last:border-0'>
// 											<div className='bg-gray-700 p-2 rounded-lg mr-3'>
// 												<FaHistory className='text-blue-400' />
// 											</div>
// 											<div className='flex-1'>
// 												<div className='flex justify-between items-start'>
// 													<h4 className='text-white font-medium'>
// 														{item.action}
// 													</h4>
// 													<span className='text-xs text-gray-400'>
// 														{item.date}
// 													</span>
// 												</div>
// 												<p className='text-sm text-gray-400 mt-1'>
// 													{item.detail}
// 												</p>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</motion.div>
// 						)}
// 						{activeTab === 'portfolio' && (
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								exit={{ opacity: 0, y: -20 }}
// 								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
// 								<div className='flex justify-between items-center mb-6'>
// 									<h3 className='text-lg font-semibold text-white'>
// 										Portfolio Projects
// 									</h3>
// 									<button className='text-sm text-blue-400 hover:text-blue-300'>
// 										Add New +
// 									</button>
// 								</div>
// 								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 									{portfolioItems.map((item) => (
// 										<div
// 											key={item.id}
// 											className='bg-gray-700/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors'>
// 											<div className='h-40 bg-gray-800 relative overflow-hidden'>
// 												<Image
// 													src={item.image}
// 													alt={item.title}
// 													layout='fill'
// 													objectFit='cover'
// 													className='hover:scale-105 transition-transform'
// 												/>
// 												{item.featured && (
// 													<div className='absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded'>
// 														Featured
// 													</div>
// 												)}
// 											</div>
// 											<div className='p-4'>
// 												<h4 className='text-white font-medium'>{item.title}</h4>
// 												<p className='text-sm text-gray-400 mt-1'>
// 													{item.description}
// 												</p>
// 												<div className='mt-3 flex justify-between items-center'>
// 													<span className='text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded'>
// 														{item.category}
// 													</span>
// 													<button className='text-xs text-blue-400 hover:text-blue-300'>
// 														View Details
// 													</button>
// 												</div>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</motion.div>
// 						)}
// 						{activeTab === 'collection' && (
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								exit={{ opacity: 0, y: -20 }}
// 								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
// 								<div className='flex justify-between items-center mb-6'>
// 									<h3 className='text-lg font-semibold text-white'>
// 										Your Collections
// 									</h3>
// 									<button className='text-sm text-blue-400 hover:text-blue-300'>
// 										Create New +
// 									</button>
// 								</div>
// 								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
// 									{collectionItems.map((item) => (
// 										<div
// 											key={item.id}
// 											className='bg-gray-700/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors'>
// 											<div className='h-32 bg-gray-800 relative overflow-hidden'>
// 												<Image
// 													src={item.coverImage}
// 													alt={item.title}
// 													layout='fill'
// 													objectFit='cover'
// 													className='hover:scale-105 transition-transform'
// 												/>
// 												{item.isPrivate && (
// 													<div className='absolute top-2 right-2 bg-gray-900/80 text-white p-1 rounded'>
// 														<FaLock className='w-3 h-3' />
// 													</div>
// 												)}
// 											</div>
// 											<div className='p-4'>
// 												<h4 className='text-white font-medium'>{item.title}</h4>
// 												<div className='mt-2 flex justify-between items-center'>
// 													<span className='text-xs text-gray-400'>
// 														{item.itemCount} items
// 													</span>
// 													<button className='text-xs text-blue-400 hover:text-blue-300'>
// 														View
// 													</button>
// 												</div>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</motion.div>
// 						)}
// 						{activeTab === 'analytics' && (
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								exit={{ opacity: 0, y: -20 }}
// 								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
// 								<h3 className='text-lg font-semibold text-white mb-6'>
// 									Performance Overview
// 								</h3>

// 								<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
// 									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
// 										<div className='flex justify-between items-center mb-2'>
// 											<h4 className='text-gray-400 text-sm'>Total Followers</h4>
// 											<span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full'>
// 												+{analyticsData.followers.growth}%
// 											</span>
// 										</div>
// 										<p className='text-2xl font-bold text-white'>
// 											{analyticsData.followers.count.toLocaleString()}
// 										</p>
// 									</div>

// 									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
// 										<div className='flex justify-between items-center mb-2'>
// 											<h4 className='text-gray-400 text-sm'>Engagement Rate</h4>
// 											<span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full'>
// 												+{analyticsData.engagement.growth}%
// 											</span>
// 										</div>
// 										<p className='text-2xl font-bold text-white'>
// 											{analyticsData.engagement.count}
// 										</p>
// 									</div>
// 								</div>

// 								<h4 className='text-md font-semibold text-white mb-4'>
// 									Platform Performance
// 								</h4>
// 								<div className='space-y-4'>
// 									{analyticsData.platformPerformance.map((platform) => (
// 										<div key={platform.name} className='flex items-center'>
// 											<div className='w-32 text-gray-400 text-sm'>
// 												{platform.name}
// 											</div>
// 											<div className='flex-1 bg-gray-700 rounded-full h-2.5'>
// 												<div
// 													className='bg-blue-500 h-2.5 rounded-full'
// 													style={{
// 														width: `${Math.min(100, platform.growth * 5)}%`,
// 													}}></div>
// 											</div>
// 											<div className='w-20 text-right text-sm text-white'>
// 												{platform.followers.toLocaleString()}
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</motion.div>
// 						)}
// 					</AnimatePresence>
// 				</div>

// 				{/* Right Sidebar */}
// 				<div className='mt-10 lg:mt-0 lg:ml-8 lg:w-[300px]'>
// 					<SidebarCard />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
	FaTwitch,
	FaInstagram,
	FaWhatsapp,
	FaTwitter,
	FaFacebook,
	FaYoutube,
	FaLinkedin,
	FaGlobe,
	FaEdit,
	FaUser,
	FaBriefcase,
	FaHistory,
	FaImages,
	FaFolder,
	FaChartLine,
	FaBell,
	FaCog,
	FaStar,
	FaCalendarAlt,
	FaLink,
	FaHeart,
	FaComment,
	FaEye,
	FaLock,
	FaCrown,
	FaTrophy,
	FaUsers,
	FaRegClock,
	FaRegCheckCircle,
	FaRegCalendarCheck,
	FaChartBar,
	FaRegLightbulb,
} from 'react-icons/fa';
import {
	TicketIcon,
	Mail,
	ExternalLink,
	MessageSquare,
	Share2,
	Award,
	Users,
	Monitor,
	Sparkles,
	Activity,
	BarChart2,
	PieChart,
	TrendingUp,
	Clock,
	Zap,
	Gift,
	Shield,
	Bookmark,
	Camera,
	Video,
	Mic,
	PenTool,
	Layout,
	Code,
	Server,
	Database,
	Calendar,
	FileText,
} from 'lucide-react';
import SidebarCard from './sidebarCard';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart as RechartsPieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

// Custom TikTok icon component
const TiktokIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M19 9.5V15.5C19 17.5 17.5 19 15.5 19H9.5C7.5 19 6 17.5 6 15.5V9.5C6 7.5 7.5 6 9.5 6H15.5C17.5 6 19 7.5 19 9.5Z' />
		<path d='M12 16V8' />
		<path d='M8 12H16' />
	</svg>
);

type TabType =
	| 'history'
	| 'portfolio'
	| 'collection'
	| 'analytics'
	| 'calendar'
	| 'team';

export default function PremiumProfile() {
	const router = useRouter();
	const [userData, setUserData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<TabType>('history');
	const [showEditButtons, setShowEditButtons] = useState(false);
	const [showSocialModal, setShowSocialModal] = useState(false);
	const [notificationsCount, setNotificationsCount] = useState(3);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);

	// Mock analytics data with enhanced metrics
	const analyticsData = {
		followers: {
			count: 12453,
			growth: 8.7,
			data: [12, 19, 15, 23, 28, 30, 32, 35, 40, 41, 35, 38],
		},
		engagement: {
			count: '7.8%',
			growth: 2.3,
			data: [5, 8, 6, 9, 7, 5, 8, 9, 7, 8, 6, 8],
		},
		reach: {
			count: '42.5K',
			growth: 5.2,
			data: [25, 28, 30, 32, 35, 38, 40, 42, 45, 43, 40, 42],
		},
		impressions: {
			count: '128.7K',
			growth: 12.1,
			data: [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 120, 128],
		},
		recentPosts: [
			{
				id: 1,
				title: 'Latest Project Reveal',
				platform: 'instagram',
				image: '/post1.jpg',
				likes: 843,
				comments: 76,
				views: 5249,
				shares: 142,
				saves: 89,
				date: '2 days ago',
				performance: 95,
			},
			{
				id: 2,
				title: 'Behind the Scenes',
				platform: 'youtube',
				image: '/post2.jpg',
				likes: 1256,
				comments: 124,
				views: 12852,
				shares: 321,
				saves: 156,
				date: '1 week ago',
				performance: 87,
			},
			{
				id: 3,
				title: 'Industry Insights',
				platform: 'linkedin',
				image: '/post3.jpg',
				likes: 456,
				comments: 38,
				views: 2145,
				shares: 87,
				saves: 42,
				date: '2 weeks ago',
				performance: 72,
			},
		],
		upcomingContent: [
			{
				id: 1,
				title: 'Q3 Strategy Reveal',
				platform: 'youtube',
				scheduledFor: 'May 10, 2025',
				status: 'scheduled',
			},
			{
				id: 2,
				title: 'Summer Collection Launch',
				platform: 'instagram',
				scheduledFor: 'May 15, 2025',
				status: 'draft',
			},
			{
				id: 3,
				title: 'Podcast Interview',
				platform: 'spotify',
				scheduledFor: 'May 18, 2025',
				status: 'planned',
			},
			{
				id: 4,
				title: 'Product Demo',
				platform: 'youtube',
				scheduledFor: 'May 22, 2025',
				status: 'scheduled',
			},
		],
		platformPerformance: [
			{ name: 'Instagram', growth: 12.5, followers: 5263, color: '#E1306C' },
			{ name: 'YouTube', growth: 8.2, followers: 3870, color: '#FF0000' },
			{ name: 'LinkedIn', growth: 15.7, followers: 2124, color: '#0077B5' },
			{ name: 'Twitter', growth: 6.3, followers: 1196, color: '#1DA1F2' },
		],
		topContent: [
			{
				id: 1,
				title: 'Brand Identity Guide',
				type: 'carousel',
				platform: 'instagram',
				engagementRate: '9.2%',
				reach: '8.4K',
				link: '#',
			},
			{
				id: 2,
				title: 'Product Tutorial',
				type: 'video',
				platform: 'youtube',
				engagementRate: '7.8%',
				reach: '12.1K',
				link: '#',
			},
			{
				id: 3,
				title: 'Industry Trends Report',
				type: 'pdf',
				platform: 'linkedin',
				engagementRate: '6.5%',
				reach: '5.2K',
				link: '#',
			},
		],
	};

	// Portfolio items mock data
	const portfolioItems = [
		{
			id: 1,
			title: 'Brand Redesign Project',
			description: 'Complete visual identity refresh for a major tech client',
			image: '/portfolio1.jpg',
			category: 'Branding',
			featured: true,
			collaborators: 3,
			lastUpdated: '2 days ago',
		},
		{
			id: 2,
			title: 'Mobile App UI Design',
			description: 'Modern interface design for a fitness tracking application',
			image: '/portfolio2.jpg',
			category: 'UI/UX',
			collaborators: 2,
			lastUpdated: '1 week ago',
		},
		{
			id: 3,
			title: 'Product Photography',
			description: 'Professional studio shots for an upcoming product line',
			image: '/portfolio3.jpg',
			category: 'Photography',
			collaborators: 1,
			lastUpdated: '3 weeks ago',
		},
		{
			id: 4,
			title: 'Website Redesign',
			description: 'Complete overhaul of an e-commerce platform',
			image: '/portfolio4.jpg',
			category: 'Web Design',
			collaborators: 4,
			lastUpdated: '1 month ago',
		},
	];

	// Collection items mock data
	const collectionItems = [
		{
			id: 1,
			title: 'Design Inspiration',
			itemCount: 47,
			coverImage: '/collection1.jpg',
			isPrivate: false,
			lastUpdated: 'Yesterday',
		},
		{
			id: 2,
			title: 'Project References',
			itemCount: 23,
			coverImage: '/collection2.jpg',
			isPrivate: true,
			lastUpdated: '3 days ago',
		},
		{
			id: 3,
			title: 'Marketing Ideas',
			itemCount: 15,
			coverImage: '/collection3.jpg',
			isPrivate: false,
			lastUpdated: '1 week ago',
		},
	];

	// Usage history mock data
	const usageHistory = [
		{
			id: 1,
			action: 'Posted on Instagram',
			date: 'April 22, 2025',
			detail: 'New product announcement',
			icon: <FaInstagram className='text-pink-600' />,
		},
		{
			id: 2,
			action: 'Published YouTube video',
			date: 'April 18, 2025',
			detail: 'Behind the scenes tour',
			icon: <FaYoutube className='text-red-600' />,
		},
		{
			id: 3,
			action: 'Updated LinkedIn profile',
			date: 'April 15, 2025',
			detail: 'Added new skills and certifications',
			icon: <FaLinkedin className='text-blue-600' />,
		},
		{
			id: 4,
			action: 'Created new collection',
			date: 'April 10, 2025',
			detail: 'Summer campaign assets',
			icon: <FaFolder className='text-yellow-500' />,
		},
	];

	// Team members mock data
	const teamMembers = [
		{
			id: 1,
			name: 'Alex Johnson',
			role: 'Content Creator',
			email: 'alex@example.com',
			accessLevel: 'Full',
			lastActive: '2 hours ago',
			image: '/team1.jpg',
		},
		{
			id: 2,
			name: 'Sarah Williams',
			role: 'Social Media Manager',
			email: 'sarah@example.com',
			accessLevel: 'Editor',
			lastActive: 'Yesterday',
			image: '/team2.jpg',
		},
		{
			id: 3,
			name: 'Michael Chen',
			role: 'Graphic Designer',
			email: 'michael@example.com',
			accessLevel: 'Contributor',
			lastActive: '3 days ago',
			image: '/team3.jpg',
		},
	];

	// Achievements mock data
	const achievements = [
		{
			id: 1,
			title: 'Content Pioneer',
			description: 'Published 50+ pieces of content',
			icon: <PenTool className='text-yellow-400' />,
			progress: 100,
			unlocked: true,
			date: 'March 15, 2025',
		},
		{
			id: 2,
			title: 'Engagement Expert',
			description: 'Achieved 10%+ engagement rate',
			icon: <Activity className='text-blue-400' />,
			progress: 78,
			unlocked: false,
		},
		{
			id: 3,
			title: 'Platform Master',
			description: 'Connected 5+ social platforms',
			icon: <Monitor className='text-purple-400' />,
			progress: 60,
			unlocked: false,
		},
		{
			id: 4,
			title: 'Follower Milestone',
			description: 'Reached 10,000 followers',
			icon: <Users className='text-green-400' />,
			progress: 45,
			unlocked: false,
		},
	];

	// Premium features mock data
	const premiumFeatures = [
		{
			id: 1,
			name: 'Advanced Analytics',
			description: 'Access to detailed performance metrics',
			icon: <BarChart2 className='text-blue-400' />,
			used: true,
		},
		{
			id: 2,
			name: 'Content Scheduling',
			description: 'Plan and schedule your content',
			icon: <Calendar className='text-purple-400' />,
			used: true,
		},
		{
			id: 3,
			name: 'Team Collaboration',
			description: 'Invite team members to collaborate',
			icon: <Users className='text-green-400' />,
			used: false,
		},
		{
			id: 4,
			name: 'Custom Branding',
			description: 'Add your logo and colors',
			icon: <Layout className='text-yellow-400' />,
			used: false,
		},
	];

	// Close menu when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuRef]);

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/auth/user');
				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}
				const data = await response.json();

				// Check if the data is nested (common in API responses)
				let userDataObj = data;
				if (data && data.data) {
					userDataObj = data.data;
				}

				if (userDataObj) {
					console.log('User data fetched successfully:', userDataObj);

					// Add premium status for demo purposes
					userDataObj.premiumStatus = {
						tier: 'Pro',
						since: 'January 2025',
						features: [
							'Analytics Dashboard',
							'Multi-platform Integration',
							'Priority Support',
							'Custom Branding',
						],
					};

					setUserData(userDataObj);
				} else {
					setError('No user data found');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				setError('Failed to load profile data');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, []);

	// Handle edit profile button click
	const handleEditProfile = () => {
		router.push('/onboarding');
	};

	// Get platform icon by name
	const getPlatformIcon = (platform) => {
		switch (platform) {
			case 'instagram':
				return <FaInstagram className='w-5 h-5' />;
			case 'twitter':
				return <FaTwitter className='w-5 h-5' />;
			case 'youtube':
				return <FaYoutube className='w-5 h-5' />;
			case 'linkedin':
				return <FaLinkedin className='w-5 h-5' />;
			case 'facebook':
				return <FaFacebook className='w-5 h-5' />;
			case 'tiktok':
				return <TiktokIcon />;
			default:
				return <FaLink className='w-5 h-5' />;
		}
	};

	// Custom tooltip for charts
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className='bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg'>
					<p className='font-medium text-white'>{label}</p>
					<p className='text-sm text-gray-300'>
						{payload[0].name}: {payload[0].value}
					</p>
				</div>
			);
		}
		return null;
	};

	if (isLoading) {
		return (
			<div className='bg-black text-gray-100 min-h-screen pt-[6rem] px-6 flex justify-center items-center'>
				<div className='flex flex-col items-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4'></div>
					<p className='text-blue-400'>Loading your premium profile...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-black text-gray-100 min-h-screen pt-[6rem] px-6 flex justify-center items-center'>
				<div className='text-red-500 text-center'>
					<h3 className='text-xl font-bold mb-2'>Error Loading Profile</h3>
					<p>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors'>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-gray-900 text-gray-100 min-h-screen pt-[6rem] px-4 md:px-6'>
			{/* Top Navigation Bar */}
			<div className='fixed top-16 left-0 right-0 bg-gray-900/90 backdrop-blur-md z-10 shadow-lg border-b border-gray-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16 items-center'>
						<div className='flex items-center'>
							<div className='flex-shrink-0 flex items-center'>
								<FaCrown className='h-5 w-5 text-yellow-400 mr-2' />
								<span className='font-bold text-lg text-white'>
									Premium Dashboard
								</span>
							</div>
						</div>
						<div className='flex items-center space-x-6'>
							<button className='text-gray-300 hover:text-white relative'>
								<FaBell className='h-5 w-5' />
								{notificationsCount > 0 && (
									<span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs'>
										{notificationsCount}
									</span>
								)}
							</button>
							<div className='relative' ref={menuRef}>
								<button
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
									<div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600'>
										{userData?.picture ? (
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

								{isMenuOpen && (
									<div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50'>
										<div className='py-1'>
											<a
												href='#'
												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
												Your Profile
											</a>
											<a
												href='#'
												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
												Settings
											</a>
											<a
												href='#'
												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
												Subscription
											</a>
											<a
												href='#'
												className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'>
												Sign out
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row lg:justify-between gap-8 max-w-7xl mx-auto mt-8'>
				{/* Main Profile Section */}
				<div className='flex-1'>
					{/* Profile Header Section */}
					<div className='relative rounded-xl overflow-hidden shadow-lg border border-gray-800'>
						{/* Banner Image */}
						<div className='w-full h-64 bg-gray-800 overflow-hidden relative'>
							<Image
								src='/Banner.webp'
								alt='Banner Image'
								layout='fill'
								objectFit='cover'
								className='w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 opacity-70'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>

							{/* Premium badge */}
							<div className='absolute top-4 right-4'>
								<div className='bg-yellow-500 text-black px-3 py-1 rounded-full font-bold flex items-center shadow-md text-sm'>
									<FaCrown className='mr-1' />
									PRO MEMBER
								</div>
							</div>
						</div>

						{/* Profile Picture and Name */}
						<div className='absolute top-48 left-4 md:left-8 lg:left-12 flex items-start'>
							<motion.div
								whileHover={{ scale: 1.05 }}
								className='rounded-full w-24 h-24 md:w-28 md:h-28 bg-gray-700 overflow-hidden border-4 border-gray-900 shadow-lg relative group'>
								{userData?.picture ? (
									<Image
										src={userData.picture}
										alt='Profile Image'
										width={112}
										height={112}
										className='object-cover'
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center text-white text-3xl font-bold'>
										{userData?.name?.charAt(0) || 'U'}
									</div>
								)}
							</motion.div>
						</div>
					</div>

					{/* Profile Info Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='mt-20 flex flex-col md:flex-row justify-between items-start p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700'>
						<div className='flex flex-col mb-6 md:mb-0'>
							<div className='flex items-center'>
								<h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
									{userData?.name || 'User'}
								</h1>
								<div className='ml-3 flex items-center'>
									<div className='bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium'>
										Verified
									</div>
								</div>
							</div>

							<div className='flex flex-wrap gap-y-2 mt-1'>
								<div className='flex items-center text-gray-400 mr-4'>
									<Mail className='w-4 h-4 mr-2' />
									<p className='text-sm'>
										{userData?.email || 'No email provided'}
									</p>
								</div>
								{userData?.companyName && (
									<div className='flex items-center text-gray-400 mr-4'>
										<FaBriefcase className='w-4 h-4 mr-2' />
										<p className='text-sm'>{userData.companyName}</p>
									</div>
								)}
								<div className='flex items-center text-gray-400'>
									<Users className='w-4 h-4 mr-2' />
									<p className='text-sm'>12.4K Followers</p>
								</div>
							</div>

							<div className='mt-3'>
								<p className='text-sm text-gray-400 max-w-md'>
									{userData?.bio ||
										'Digital creator specializing in design and marketing'}
								</p>
							</div>
						</div>

						<div className='flex flex-col items-center mb-6 md:mb-0'>
							<h3 className='text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium'>
								Connected Platforms
							</h3>
							<div className='flex flex-wrap items-center gap-3 justify-center'>
								{userData?.platforms?.includes('instagram') && (
									<motion.div
										whileHover={{ scale: 1.1 }}
										className='flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 text-white shadow-md'>
										<FaInstagram className='w-4 h-4' />
									</motion.div>
								)}
								{userData?.platforms?.includes('twitter') && (
									<motion.div
										whileHover={{ scale: 1.1 }}
										className='flex items-center justify-center w-9 h-9 rounded-full bg-blue-400 text-white shadow-md'>
										<FaTwitter className='w-4 h-4' />
									</motion.div>
								)}
								{userData?.platforms?.includes('facebook') && (
									<motion.div
										whileHover={{ scale: 1.1 }}
										className='flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white shadow-md'>
										<FaFacebook className='w-4 h-4' />
									</motion.div>
								)}
								{userData?.platforms?.includes('youtube') && (
									<motion.div
										whileHover={{ scale: 1.1 }}
										className='flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white shadow-md'>
										<FaYoutube className='w-4 h-4' />
									</motion.div>
								)}
								{userData?.platforms?.includes('tiktok') && (
									<motion.div
										whileHover={{ scale: 1.1 }}
										className='flex items-center justify-center w-9 h-9 rounded-full bg-black text-white shadow-md border border-gray-700'>
										<TiktokIcon />
									</motion.div>
								)}
								{userData?.platforms?.includes('linkedin') && (
									<motion.div
										whileHover={{ scale: 1.1 }}
										className='flex items-center justify-center w-9 h-9 rounded-full bg-blue-700 text-white shadow-md'>
										<FaLinkedin className='w-4 h-4' />
									</motion.div>
								)}

								{/* Add platform button */}
								<motion.button
									whileHover={{ scale: 1.1 }}
									onClick={() => setShowSocialModal(true)}
									className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'>
									<span className='text-lg font-bold'>+</span>
								</motion.button>
							</div>
						</div>

						<div className='md:mt-0 mt-4 flex flex-wrap gap-3'>
							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleEditProfile}
								className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition-colors shadow-md flex items-center text-sm'>
								<FaEdit className='mr-2' />
								Edit Profile
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.98 }}
								className='bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-md transition-colors shadow-md border border-gray-600 flex items-center text-sm'>
								<Share2 className='mr-2 h-3.5 w-3.5' />
								Share
							</motion.button>
						</div>
					</motion.div>

					{/* Navigation Bar */}
					<div className='mt-8 flex justify-start md:justify-start space-x-6 border-b border-gray-700 px-4 overflow-x-auto'>
						<button
							onClick={() => setActiveTab('history')}
							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
								activeTab === 'history'
									? 'border-blue-500 text-white font-medium'
									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
							}`}>
							<FaHistory className='mr-2' />
							History
						</button>
						<button
							onClick={() => setActiveTab('portfolio')}
							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
								activeTab === 'portfolio'
									? 'border-blue-500 text-white font-medium'
									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
							}`}>
							<FaImages className='mr-2' />
							Portfolio
						</button>
						<button
							onClick={() => setActiveTab('collection')}
							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
								activeTab === 'collection'
									? 'border-blue-500 text-white font-medium'
									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
							}`}>
							<FaFolder className='mr-2' />
							Collection
						</button>
						<button
							onClick={() => setActiveTab('analytics')}
							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
								activeTab === 'analytics'
									? 'border-blue-500 text-white font-medium'
									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
							}`}>
							<FaChartLine className='mr-2' />
							Analytics
						</button>
						<button
							onClick={() => setActiveTab('calendar')}
							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
								activeTab === 'calendar'
									? 'border-blue-500 text-white font-medium'
									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
							}`}>
							<FaCalendarAlt className='mr-2' />
							Calendar
						</button>
						<button
							onClick={() => setActiveTab('team')}
							className={`pb-3 px-1 border-b-2 transition duration-200 flex items-center text-sm ${
								activeTab === 'team'
									? 'border-blue-500 text-white font-medium'
									: 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'
							}`}>
							<FaUsers className='mr-2' />
							Team
						</button>
					</div>

					{/* Tab Content */}
					<AnimatePresence mode='wait'>
						{activeTab === 'history' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
								<h3 className='text-lg font-semibold text-white mb-4'>
									Recent Activity
								</h3>
								<div className='space-y-4'>
									{usageHistory.map((item) => (
										<div
											key={item.id}
											className='flex items-start pb-4 border-b border-gray-700 last:border-0'>
											<div className='bg-gray-700 p-2 rounded-lg mr-3'>
												{item.icon}
											</div>
											<div className='flex-1'>
												<div className='flex justify-between items-start'>
													<h4 className='text-white font-medium'>
														{item.action}
													</h4>
													<span className='text-xs text-gray-400'>
														{item.date}
													</span>
												</div>
												<p className='text-sm text-gray-400 mt-1'>
													{item.detail}
												</p>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						)}
						{activeTab === 'portfolio' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
								<div className='flex justify-between items-center mb-6'>
									<h3 className='text-lg font-semibold text-white'>
										Portfolio Projects
									</h3>
									<button className='text-sm text-blue-400 hover:text-blue-300'>
										Add New +
									</button>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									{portfolioItems.map((item) => (
										<div
											key={item.id}
											className='bg-gray-700/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors'>
											<div className='h-40 bg-gray-800 relative overflow-hidden'>
												<Image
													src={item.image}
													alt={item.title}
													layout='fill'
													objectFit='cover'
													className='hover:scale-105 transition-transform'
												/>
												{item.featured && (
													<div className='absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded'>
														Featured
													</div>
												)}
											</div>
											<div className='p-4'>
												<h4 className='text-white font-medium'>{item.title}</h4>
												<p className='text-sm text-gray-400 mt-1'>
													{item.description}
												</p>
												<div className='mt-3 flex justify-between items-center'>
													<div className='flex space-x-2'>
														<span className='text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded'>
															{item.category}
														</span>
														<span className='text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded flex items-center'>
															<Users className='w-3 h-3 mr-1' />
															{item.collaborators}
														</span>
													</div>
													<div className='flex items-center space-x-2'>
														<span className='text-xs text-gray-400'>
															{item.lastUpdated}
														</span>
														<button className='text-xs text-blue-400 hover:text-blue-300'>
															View
														</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						)}
						{activeTab === 'collection' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
								<div className='flex justify-between items-center mb-6'>
									<h3 className='text-lg font-semibold text-white'>
										Your Collections
									</h3>
									<button className='text-sm text-blue-400 hover:text-blue-300'>
										Create New +
									</button>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									{collectionItems.map((item) => (
										<div
											key={item.id}
											className='bg-gray-700/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors'>
											<div className='h-32 bg-gray-800 relative overflow-hidden'>
												<Image
													src={item.coverImage}
													alt={item.title}
													layout='fill'
													objectFit='cover'
													className='hover:scale-105 transition-transform'
												/>
												{item.isPrivate && (
													<div className='absolute top-2 right-2 bg-gray-900/80 text-white p-1 rounded'>
														<FaLock className='w-3 h-3' />
													</div>
												)}
											</div>
											<div className='p-4'>
												<h4 className='text-white font-medium'>{item.title}</h4>
												<div className='mt-2 flex justify-between items-center'>
													<span className='text-xs text-gray-400'>
														{item.itemCount} items
													</span>
													<div className='flex items-center space-x-2'>
														<span className='text-xs text-gray-400'>
															{item.lastUpdated}
														</span>
														<button className='text-xs text-blue-400 hover:text-blue-300'>
															View
														</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						)}
						{activeTab === 'analytics' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
								<h3 className='text-lg font-semibold text-white mb-6'>
									Performance Overview
								</h3>

								{/* Key Metrics Grid */}
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
										<div className='flex justify-between items-center mb-2'>
											<h4 className='text-gray-400 text-sm'>Total Followers</h4>
											<span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full'>
												+{analyticsData.followers.growth}%
											</span>
										</div>
										<p className='text-2xl font-bold text-white'>
											{analyticsData.followers.count.toLocaleString()}
										</p>
										<div className='h-20 mt-2'>
											<ResponsiveContainer width='100%' height='100%'>
												<LineChart
													data={analyticsData.followers.data.map(
														(value, index) => ({
															name: `Month ${index + 1}`,
															value,
														})
													)}>
													<Line
														type='monotone'
														dataKey='value'
														stroke='#3B82F6'
														strokeWidth={2}
														dot={false}
													/>
													<Tooltip
														content={
															<CustomTooltip
																active={undefined}
																payload={undefined}
																label={undefined}
															/>
														}
													/>
												</LineChart>
											</ResponsiveContainer>
										</div>
									</div>

									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
										<div className='flex justify-between items-center mb-2'>
											<h4 className='text-gray-400 text-sm'>Engagement Rate</h4>
											<span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full'>
												+{analyticsData.engagement.growth}%
											</span>
										</div>
										<p className='text-2xl font-bold text-white'>
											{analyticsData.engagement.count}
										</p>
										<div className='h-20 mt-2'>
											<ResponsiveContainer width='100%' height='100%'>
												<LineChart
													data={analyticsData.engagement.data.map(
														(value, index) => ({
															name: `Month ${index + 1}`,
															value,
														})
													)}>
													<Line
														type='monotone'
														dataKey='value'
														stroke='#10B981'
														strokeWidth={2}
														dot={false}
													/>
													<Tooltip
														content={
															<CustomTooltip
																active={undefined}
																payload={undefined}
																label={undefined}
															/>
														}
													/>
												</LineChart>
											</ResponsiveContainer>
										</div>
									</div>

									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
										<div className='flex justify-between items-center mb-2'>
											<h4 className='text-gray-400 text-sm'>Total Reach</h4>
											<span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full'>
												+{analyticsData.reach.growth}%
											</span>
										</div>
										<p className='text-2xl font-bold text-white'>
											{analyticsData.reach.count}
										</p>
										<div className='h-20 mt-2'>
											<ResponsiveContainer width='100%' height='100%'>
												<LineChart
													data={analyticsData.reach.data.map(
														(value, index) => ({
															name: `Month ${index + 1}`,
															value,
														})
													)}>
													<Line
														type='monotone'
														dataKey='value'
														stroke='#8B5CF6'
														strokeWidth={2}
														dot={false}
													/>
													<Tooltip
														content={
															<CustomTooltip
																active={undefined}
																payload={undefined}
																label={undefined}
															/>
														}
													/>
												</LineChart>
											</ResponsiveContainer>
										</div>
									</div>

									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
										<div className='flex justify-between items-center mb-2'>
											<h4 className='text-gray-400 text-sm'>Impressions</h4>
											<span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full'>
												+{analyticsData.impressions.growth}%
											</span>
										</div>
										<p className='text-2xl font-bold text-white'>
											{analyticsData.impressions.count}
										</p>
										<div className='h-20 mt-2'>
											<ResponsiveContainer width='100%' height='100%'>
												<LineChart
													data={analyticsData.impressions.data.map(
														(value, index) => ({
															name: `Month ${index + 1}`,
															value,
														})
													)}>
													<Line
														type='monotone'
														dataKey='value'
														stroke='#EC4899'
														strokeWidth={2}
														dot={false}
													/>
													<Tooltip
														content={
															<CustomTooltip
																active={undefined}
																payload={undefined}
																label={undefined}
															/>
														}
													/>
												</LineChart>
											</ResponsiveContainer>
										</div>
									</div>
								</div>

								{/* Platform Performance */}
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
										<h4 className='text-md font-semibold text-white mb-4'>
											Platform Distribution
										</h4>
										<div className='h-64'>
											<ResponsiveContainer width='100%' height='100%'>
												<PieChart>
													<Pie
														data={analyticsData.platformPerformance}
														cx='50%'
														cy='50%'
														labelLine={false}
														outerRadius={80}
														fill='#8884d8'
														dataKey='followers'
														nameKey='name'
														label={({ name, percent }) =>
															`${name} ${(percent * 100).toFixed(0)}%`
														}>
														{analyticsData.platformPerformance.map(
															(entry, index) => (
																<Cell
																	key={`cell-${index}`}
																	fill={entry.color}
																/>
															)
														)}
													</Pie>
													<Tooltip
														content={({ payload }) => (
															<div className='bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg'>
																<p className='font-medium text-white'>
																	{payload?.[0]?.name}
																</p>
																<p className='text-sm text-gray-300'>
																	Followers:{' '}
																	{payload?.[0]?.value.toLocaleString()}
																</p>
																<p className='text-sm text-gray-300'>
																	Growth:{' '}
																	{
																		analyticsData.platformPerformance.find(
																			(p) => p.name === payload?.[0]?.name
																		)?.growth
																	}
																	%
																</p>
															</div>
														)}
													/>
												</PieChart>
											</ResponsiveContainer>
										</div>
									</div>

									<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700'>
										<h4 className='text-md font-semibold text-white mb-4'>
											Platform Growth
										</h4>
										<div className='space-y-4'>
											{analyticsData.platformPerformance.map((platform) => (
												<div key={platform.name} className='flex items-center'>
													<div className='w-32 text-gray-400 text-sm flex items-center'>
														<div
															className='w-3 h-3 rounded-full mr-2'
															style={{ backgroundColor: platform.color }}
														/>
														{platform.name}
													</div>
													<div className='flex-1 bg-gray-700 rounded-full h-2.5'>
														<div
															className='h-2.5 rounded-full'
															style={{
																width: `${Math.min(100, platform.growth * 5)}%`,
																backgroundColor: platform.color,
															}}></div>
													</div>
													<div className='w-20 text-right text-sm text-white'>
														+{platform.growth}%
													</div>
												</div>
											))}
										</div>
									</div>
								</div>

								{/* Top Performing Content */}
								<div className='bg-gray-700/50 p-4 rounded-lg border border-gray-700 mb-8'>
									<h4 className='text-md font-semibold text-white mb-4'>
										Top Performing Content
									</h4>
									<div className='space-y-4'>
										{analyticsData.topContent.map((content) => (
											<div
												key={content.id}
												className='flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'>
												<div className='flex items-center'>
													<div className='bg-gray-700 p-2 rounded-lg mr-3'>
														{content.type === 'video' ? (
															<Video className='text-red-400' />
														) : content.type === 'carousel' ? (
															<Image
																src='/placeholder-carousel.png'
																alt='Carousel content'
																width={24}
																height={24}
																className='text-blue-400'
															/>
														) : (
															<FileText className='text-green-400' />
														)}
													</div>
													<div>
														<h5 className='text-white font-medium'>
															{content.title}
														</h5>
														<div className='flex items-center text-xs text-gray-400 mt-1'>
															<span className='capitalize'>
																{content.platform}
															</span>
															<span className='mx-2'>•</span>
															<span>{content.type}</span>
														</div>
													</div>
												</div>
												<div className='flex items-center space-x-4'>
													<div className='text-right'>
														<p className='text-sm text-white'>
															{content.engagementRate}
														</p>
														<p className='text-xs text-gray-400'>Engagement</p>
													</div>
													<div className='text-right'>
														<p className='text-sm text-white'>
															{content.reach}
														</p>
														<p className='text-xs text-gray-400'>Reach</p>
													</div>
													<button className='text-blue-400 hover:text-blue-300'>
														<ExternalLink className='w-4 h-4' />
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
							</motion.div>
						)}
						{activeTab === 'calendar' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
								<div className='flex justify-between items-center mb-6'>
									<h3 className='text-lg font-semibold text-white'>
										Content Calendar
									</h3>
									<button className='text-sm text-blue-400 hover:text-blue-300'>
										Schedule Post +
									</button>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									{analyticsData.upcomingContent.map((item) => (
										<div
											key={item.id}
											className='bg-gray-700/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors'>
											<div className='flex items-start'>
												<div className='mr-3'>
													{item.status === 'scheduled' ? (
														<div className='bg-blue-500/20 text-blue-400 p-2 rounded-lg'>
															<FaRegCalendarCheck className='w-4 h-4' />
														</div>
													) : item.status === 'draft' ? (
														<div className='bg-yellow-500/20 text-yellow-400 p-2 rounded-lg'>
															<FaRegClock className='w-4 h-4' />
														</div>
													) : (
														<div className='bg-purple-500/20 text-purple-400 p-2 rounded-lg'>
															<FaRegLightbulb className='w-4 h-4' />
														</div>
													)}
												</div>
												<div className='flex-1'>
													<h4 className='text-white font-medium'>
														{item.title}
													</h4>
													<div className='flex items-center mt-1 text-sm text-gray-400'>
														<span className='capitalize'>{item.platform}</span>
														<span className='mx-2'>•</span>
														<span className='capitalize'>{item.status}</span>
													</div>
													<div className='mt-2 flex items-center text-xs text-gray-400'>
														<FaCalendarAlt className='mr-1 w-3 h-3' />
														<span>{item.scheduledFor}</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						)}
						{activeTab === 'team' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className='mt-6 p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 min-h-[300px]'>
								<div className='flex justify-between items-center mb-6'>
									<h3 className='text-lg font-semibold text-white'>
										Team Members
									</h3>
									<button className='text-sm text-blue-400 hover:text-blue-300'>
										Invite Member +
									</button>
								</div>

								<div className='space-y-4'>
									{teamMembers.map((member) => (
										<div
											key={member.id}
											className='flex items-center p-4 bg-gray-700/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors'>
											<div className='w-10 h-10 rounded-full bg-gray-700 mr-4 overflow-hidden'>
												{member.image ? (
													<Image
														src={member.image}
														alt={member.name}
														width={40}
														height={40}
														className='object-cover'
													/>
												) : (
													<div className='w-full h-full flex items-center justify-center text-white'>
														{member.name.charAt(0)}
													</div>
												)}
											</div>
											<div className='flex-1'>
												<h4 className='text-white font-medium'>
													{member.name}
												</h4>
												<div className='flex items-center mt-1 text-sm text-gray-400'>
													<span>{member.role}</span>
													<span className='mx-2'>•</span>
													<span className='capitalize'>
														{member.accessLevel} Access
													</span>
												</div>
											</div>
											<div className='text-right'>
												<p className='text-xs text-gray-400'>
													{member.lastActive}
												</p>
												<button className='text-xs text-blue-400 hover:text-blue-300 mt-1'>
													Manage
												</button>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Right Sidebar */}
				<div className='mt-10 lg:mt-0 lg:ml-8 lg:w-[300px] space-y-6'>
					{/* Achievements Card */}
					<div className='bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg font-semibold text-white flex items-center'>
								<FaTrophy className='text-yellow-400 mr-2' />
								Achievements
							</h3>
							<span className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full'>
								{achievements.filter((a) => a.unlocked).length}/
								{achievements.length}
							</span>
						</div>

						<div className='space-y-4'>
							{achievements.map((achievement) => (
								<div key={achievement.id} className='flex items-start'>
									<div className='bg-gray-700 p-2 rounded-lg mr-3'>
										{achievement.icon}
									</div>
									<div className='flex-1'>
										<h4 className='text-white font-medium'>
											{achievement.title}
										</h4>
										<p className='text-xs text-gray-400 mt-1'>
											{achievement.description}
										</p>
										<div className='mt-2'>
											<div className='w-full bg-gray-700 rounded-full h-1.5'>
												<div
													className='bg-blue-500 h-1.5 rounded-full'
													style={{ width: `${achievement.progress}%` }}></div>
											</div>
											<div className='flex justify-between items-center mt-1'>
												<span className='text-xs text-gray-400'>
													{achievement.unlocked
														? `Unlocked: ${achievement.date}`
														: `${achievement.progress}% complete`}
												</span>
												{achievement.unlocked && (
													<span className='text-xs text-green-400'>✓</span>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Premium Features Card */}
					<div className='bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg font-semibold text-white flex items-center'>
								<FaCrown className='text-yellow-400 mr-2' />
								Premium Features
							</h3>
							<span className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full'>
								Pro Plan
							</span>
						</div>

						<div className='space-y-4'>
							{premiumFeatures.map((feature) => (
								<div key={feature.id} className='flex items-start'>
									<div className='bg-gray-700 p-2 rounded-lg mr-3'>
										{feature.icon}
									</div>
									<div className='flex-1'>
										<h4 className='text-white font-medium'>{feature.name}</h4>
										<p className='text-xs text-gray-400 mt-1'>
											{feature.description}
										</p>
										<div className='mt-2 flex justify-between items-center'>
											<span
												className={`text-xs px-2 py-1 rounded-full ${feature.used ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
												{feature.used ? 'Active' : 'Not Used'}
											</span>
											<button className='text-xs text-blue-400 hover:text-blue-300'>
												{feature.used ? 'Manage' : 'Enable'}
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<SidebarCard />
				</div>
			</div>
		</div>
	);
}
