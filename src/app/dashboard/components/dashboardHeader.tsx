'use client';
import React, { useState, useEffect } from 'react';
import {
	Bell,
	Settings,
	Search,
	Sun,
	Moon,
	User,
	ChevronDown,
	Menu,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { NotificationCenter } from '@/app/components/ui/NotificationCenter/NotificationCenter';

interface DashboardHeaderProps {
	userData: {
		name?: string;
		email?: string;
		avatar?: string;
	} | null;
	onOpenSettings?: () => void;
	isMobile?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
	userData,
	onOpenSettings,
	isMobile = false,
}) => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [activeTimeframe, setActiveTimeframe] = useState('daily');
	const [isConfigOpen, setIsConfigOpen] = useState(false);

	// Update the time every minute
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 60000);

		return () => clearInterval(timer);
	}, []);

	// Safely extract the given name or use a default
	const userName = userData?.name || userData?.email?.split('@')[0] || 'User';
	const userInitial = userName.charAt(0).toUpperCase();

	// Custom time formatting function to ensure consistency between server and client
	const formatTime = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	const formattedTime = formatTime(currentTime);

	const formattedDate = currentTime.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});

	return (
		<>
			{/* Main Dashboard Header */}
			<div className='relative z-10 '>
				{/* Subtle gradient background */}
				<div className='absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5  -z-10'></div>

				{/* Glass morphism effect */}
				<div className='backdrop-blur-md bg-slate-800/40 border border-slate-700/50 shadow-xl overflow-hidden'>
					<div className='p-6'>
						<div className='flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0'>
							{/* Left Section - Greeting and Date/Time */}
							<div className='flex flex-col'>
								<motion.h1
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									className='text-3xl font-bold mb-1'>
									<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400'>
										Premium Dashboard
									</span>
								</motion.h1>

								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: 0.1 }}
									className='flex flex-col sm:flex-row sm:items-center text-gray-300 gap-1 sm:gap-4'>
									<div className='flex items-center'>
										<span className='h-2 w-2 rounded-full bg-green-500 mr-2'></span>
										<p>
											Welcome back,{' '}
											<span className='font-semibold text-white'>
												{userName}
											</span>
										</p>
									</div>

									<div className='hidden sm:flex text-slate-400/70 text-sm items-center'>
										<span className='h-1 w-1 rounded-full bg-slate-500 mx-2'></span>
										{formattedDate} · {formattedTime}
									</div>
								</motion.div>
							</div>

							{/* Right Section - Actions */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3, delay: 0.2 }}
								className='flex items-center space-x-1 md:space-x-3 ml-auto'>
								{/* Search Bar - Expandable */}
								<div className='relative'>
									<button
										onClick={() => setIsSearchOpen(!isSearchOpen)}
										className={`p-2 rounded-full transition-all duration-300 ${
											isSearchOpen
												? 'bg-slate-700/70 text-purple-400'
												: 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300'
										}`}>
										<Search size={18} />
									</button>

									{isSearchOpen && (
										<motion.div
											initial={{ width: 0, opacity: 0 }}
											animate={{ width: 260, opacity: 1 }}
											exit={{ width: 0, opacity: 0 }}
											transition={{ duration: 0.2 }}
											className='absolute right-0 top-0 overflow-hidden'>
											<div className='flex items-center bg-slate-800/90 border border-slate-700/50 rounded-full pl-3 pr-1 py-1'>
												<Search size={16} className='text-slate-400 mr-2' />
												<input
													type='text'
													placeholder='Search features, stats...'
													className='bg-transparent border-none outline-none text-sm text-white w-full'
													autoFocus
												/>
												<button
													onClick={() => setIsSearchOpen(false)}
													className='p-1 rounded-full hover:bg-slate-700/70 text-slate-400'>
													<ChevronDown size={16} />
												</button>
											</div>
										</motion.div>
									)}
								</div>

								{/* Theme Toggle */}
								<button
									onClick={() => setIsDarkMode(!isDarkMode)}
									className='p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-400 hover:text-slate-300 transition-colors'>
									{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
								</button>

								{/* Notifications */}
								<div className='relative'>
									<button className='p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-400 hover:text-slate-300 transition-colors'>
										<NotificationCenter />
										{/* <span className='absolute top-0 right-0 h-2 w-2 bg-purple-500 rounded-full'>
											
										</span> */}
									</button>
								</div>

								{/* Settings */}
								<button
									onClick={onOpenSettings}
									className='p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-400 hover:text-slate-300 transition-colors'>
									<Settings size={18} />
								</button>

								{/* Mobile Menu Button */}
								<button className='sm:hidden p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-400 hover:text-slate-300 transition-colors'>
									<Menu size={18} />
								</button>
							</motion.div>
						</div>

						{/* Status Bar Extended with Premium Features */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.3 }}
							className='mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400'>
							<div className='px-2.5 py-1 bg-purple-500/10 rounded-full text-purple-400 border border-purple-500/20'>
								Premium Account
							</div>
							<div className='px-2.5 py-1 bg-green-500/10 rounded-full text-green-400 border border-green-500/20'>
								<span className='flex items-center'>
									<span className='h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5'></span>
									Live
								</span>
							</div>

							{/* Timeframe Selector */}
							<div className='px-2 py-1 bg-slate-700/30 rounded-full flex items-center space-x-1'>
								<button
									onClick={() => setActiveTimeframe('daily')}
									className={`text-xs px-2 py-1 rounded-full transition-colors ${activeTimeframe === 'daily' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}>
									24h
								</button>
								<button
									onClick={() => setActiveTimeframe('weekly')}
									className={`text-xs px-2 py-1 rounded-full transition-colors ${activeTimeframe === 'weekly' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}>
									7d
								</button>
								<button
									onClick={() => setActiveTimeframe('monthly')}
									className={`text-xs px-2 py-1 rounded-full transition-colors ${activeTimeframe === 'monthly' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}>
									30d
								</button>
							</div>

							<div className='px-2.5 py-1 bg-slate-700/30 rounded-full'>
								Next Renewal: 7 days
							</div>
							{/*
							<button
								onClick={() => setIsConfigOpen(!isConfigOpen)}
								className='px-2.5 py-1 bg-slate-700/30 rounded-full hover:bg-slate-700/50 ml-auto'>
								{isConfigOpen ? 'Close Settings' : 'Settings'}
							</button> */}
						</motion.div>
					</div>
				</div>
			</div>

			{/* Render configuration panel if open */}
			{isConfigOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-6 p-4 backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl'>
					{/* Add your configuration settings here */}
					<h3 className='text-lg font-medium text-white '></h3>
					{/* Your settings controls would go here */}
				</motion.div>
			)}
		</>
	);
};
