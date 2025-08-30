// import React, { useState } from 'react';
// import Link from 'next/link';
// import {
// 	FiHome,
// 	FiSettings,
// 	FiDollarSign,
// 	FiPlusCircle,
// 	FiUsers,
// 	FiArrowLeft,
// 	FiArrowRight,
// 	FiGift,
// 	FiPhoneCall,
// } from 'react-icons/fi';
// import { Separator } from '@/app/components/separator';
// import { Create } from '../CreateAd/Create';
// import UpCard from './upgradeAccCard/upCard';
// import UsageLimits from './UsageLimits';
// import './styles/sidebar.css';
// import { useToast } from '../../ui/toast/use-toast';

// // Define navigation items
// const navItems = [
// 	{ href: '/dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
// 	// {
// 	// 	href: '/dashboard/adstudio',
// 	// 	label: 'Add Studio',
// 	// 	icon: <FiPlusCircle size={20} />,
// 	// },
// 	// {
// 	// 	href: '/dashboard/earnings',
// 	// 	label: 'Earnings',
// 	// 	icon: <FiDollarSign size={20} />,
// 	// },
// 	// {
// 	// 	href: '/dashboard/teams',
// 	// 	label: 'Teams',
// 	// 	icon: <FiUsers size={20} />,
// 	// },
// 	// {
// 	// 	href: '/dashboard/settings',
// 	// 	label: 'Settings',
// 	// 	icon: <FiSettings size={20} />,
// 	// },
// 	// {
// 	// 	href: '/dashboard/referrals',
// 	// 	label: 'Referrals',
// 	// 	icon: <FiGift size={20} />,
// 	// },
// 	// {
// 	// 	href: '/dashboard/callcenter',
// 	// 	label: 'Call Center',
// 	// 	icon: <FiPhoneCall size={20} />,
// 	// },
// ];

// interface SidebarProps {
// 	userEmail: string;
// 	isMenuOpen: boolean;
// 	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
// 	dailyAdCount: number;
// 	weeklyAdCount: number;
// 	hasCredits: boolean;
// 	refreshLimits: () => Promise<void>;
// 	accountType?: 'free' | 'pro' | 'enterprise';
// }

// export default function SideMenu({
// 	userEmail,
// 	isMenuOpen,
// 	setIsMenuOpen,
// 	dailyAdCount,
// 	weeklyAdCount,
// 	hasCredits,
// 	refreshLimits,
// 	accountType,
// }: SidebarProps) {
// 	const [isLoading, setIsLoading] = useState(false);
// 	const { toast } = useToast();

// 	const toggleMenu = () => {
// 		setIsMenuOpen(!isMenuOpen);
// 	};

// 	const handleAdCreated = async (limits: {
// 		dailyCount: number;
// 		weeklyCount: number;
// 	}) => {
// 		await refreshLimits();
// 		toast({
// 			title: 'Ad Created',
// 			description: 'Your ad has been successfully created!',
// 		});
// 	};

// 	return (
// 		<div
// 			className={`h-full bg-slate-800/70 text-white flex flex-col overflow-y-auto custom-scrollbar ${
// 				isMenuOpen ? 'w-[16rem]' : 'w-[5.2rem]'
// 			} transition-all duration-300 px-6 pb-6 shadow-lg border-r border-slate-700/50`}>
// 			<div className='flex-shrink-0 pt-4'>
// 				<button
// 					onClick={toggleMenu}
// 					className='flex items-center justify-center w-full py-2 text-gray-300 hover:text-white'>
// 					{isMenuOpen ? <FiArrowLeft size={20} /> : <FiArrowRight size={20} />}
// 				</button>
// 			</div>

// 			{/* Sidebar Menu */}
// 			<div className='flex-grow overflow-y-auto custom-scrollbar mt-2'>
// 				<ul className='space-y-1.5'>
// 					{navItems.map((item) => (
// 						<li key={item.label}>
// 							<Link
// 								href={item.href || '#'}
// 								className={`flex items-center p-2.5 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors
//                   ${!isMenuOpen ? 'justify-center' : ''}`}>
// 								<div className='flex-shrink-0'>{item.icon}</div>
// 								{isMenuOpen && (
// 									<span className='ml-3 truncate'>{item.label}</span>
// 								)}
// 							</Link>
// 						</li>
// 					))}
// 				</ul>
// 			</div>

// 			{/* Create Component */}
// 			<div className='flex-shrink-0 mt-2'>
// 				<Create
// 					onCreateAd={handleAdCreated}
// 					isMenuOpen={isMenuOpen}
// 					dailyAdCount={dailyAdCount}
// 					weeklyAdCount={weeklyAdCount}
// 					hasCredits={hasCredits}
// 					userEmail={userEmail}
// 					refreshLimits={refreshLimits}
// 					accountType={accountType}
// 				/>
// 			</div>

// 			{/* Usage Limits Component */}
// 			{isMenuOpen && (
// 				<UsageLimits
// 					dailyAdCount={dailyAdCount}
// 					weeklyAdCount={weeklyAdCount}
// 					hasCredits={hasCredits}
// 					refreshLimits={refreshLimits}
// 					accountType={accountType}
// 				/>
// 			)}

// 			{/* Footer Links */}
// 			{isMenuOpen && (
// 				<div className='flex-shrink-0 mt-auto pt-2'>
// 					<Separator className='my-2 bg-slate-700/50' />

// 					{/* Upgrade Account Card */}
// 					<div className='flex-shrink-0 mt-2'>{isMenuOpen && <UpCard />}</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

import React, { useState } from 'react';
import Link from 'next/link';
import {
	FiHome,
	FiSettings,
	FiDollarSign,
	FiPlusCircle,
	FiUsers,
	FiArrowLeft,
	FiArrowRight,
	FiGift,
	FiPhoneCall,
	FiMenu,
	FiX,
} from 'react-icons/fi';
import { Separator } from '@/app/components/separator';
import { Create } from '../CreateAd/Create';
import UpCard from './upgradeAccCard/upCard';
import UsageLimits from './UsageLimits';
import './styles/sidebar.css';
import { useToast } from '../../ui/toast/use-toast';

// Define navigation items
const navItems = [
	{ href: '/dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
	// {
	// 	href: '/dashboard/adstudio',
	// 	label: 'Add Studio',
	// 	icon: <FiPlusCircle size={20} />,
	// },
	// {
	// 	href: '/dashboard/earnings',
	// 	label: 'Earnings',
	// 	icon: <FiDollarSign size={20} />,
	// },
	// {
	// 	href: '/dashboard/teams',
	// 	label: 'Teams',
	// 	icon: <FiUsers size={20} />,
	// },
	// {
	// 	href: '/dashboard/settings',
	// 	label: 'Settings',
	// 	icon: <FiSettings size={20} />,
	// },
	// {
	// 	href: '/dashboard/referrals',
	// 	label: 'Referrals',
	// 	icon: <FiGift size={20} />,
	// },
	// {
	// 	href: '/dashboard/callcenter',
	// 	label: 'Call Center',
	// 	icon: <FiPhoneCall size={20} />,
	// },
];

interface SidebarProps {
	userEmail: string;
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dailyAdCount: number;
	weeklyAdCount: number;
	hasCredits: boolean;
	refreshLimits: () => Promise<void>;
	accountType?: 'free' | 'pro' | 'enterprise';
}

export default function SideMenu({
	userEmail,
	isMenuOpen,
	setIsMenuOpen,
	dailyAdCount,
	weeklyAdCount,
	hasCredits,
	refreshLimits,
	accountType,
}: SidebarProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleAdCreated = async (limits: {
		dailyCount: number;
		weeklyCount: number;
	}) => {
		await refreshLimits();
		toast({
			title: 'Ad Created',
			description: 'Your ad has been successfully created!',
		});
	};

	return (
		<div
			className={`h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm text-white flex flex-col overflow-hidden ${
				isMenuOpen ? 'w-[17rem]' : 'w-[5.2rem]'
			} transition-all duration-300 ease-in-out shadow-2xl border-r border-slate-700/30`}>
			{/* Navigation Menu */}
			<div className='flex-grow overflow-y-auto px-4 py-4 space-y-2'>
				<nav>
					<ul className='space-y-1'>
						{navItems.map((item, index) => (
							<li key={item.label}>
								{item.label === 'Dashboard' ? (
									<div
										className={`group flex items-center p-3 rounded-xl text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white hover:shadow-md transition-all duration-200 relative overflow-hidden cursor-pointer ${
											!isMenuOpen ? 'justify-center' : ''
										}`}
										onClick={toggleMenu}>
										{/* Hover effect background */}
										<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl' />

										<div className='relative z-10 flex items-center w-full'>
											<div className='flex-shrink-0 group-hover:scale-110 transition-transform duration-200'>
												{item.icon}
											</div>
											{isMenuOpen && (
												<>
													<span className='ml-4 font-medium truncate group-hover:translate-x-1 transition-transform duration-200'>
														{item.label}
													</span>
													<div className='ml-auto transition-transform duration-200'>
														{isMenuOpen ? (
															<FiArrowLeft
																size={16}
																className='text-slate-400'
															/>
														) : (
															<FiArrowRight
																size={16}
																className='text-slate-400'
															/>
														)}
													</div>
												</>
											)}
										</div>

										{/* Tooltip for collapsed state */}
										{!isMenuOpen && (
											<div className='absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-slate-700'>
												{item.label}
												<div className='absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700'></div>
											</div>
										)}
									</div>
								) : (
									<Link
										href={item.href || '#'}
										className={`group flex items-center p-3 rounded-xl text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white hover:shadow-md transition-all duration-200 relative overflow-hidden ${
											!isMenuOpen ? 'justify-center' : ''
										}`}>
										{/* Hover effect background */}
										<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl' />

										<div className='relative z-10 flex items-center w-full'>
											<div className='flex-shrink-0 group-hover:scale-110 transition-transform duration-200'>
												{item.icon}
											</div>
											{isMenuOpen && (
												<>
													<span className='ml-4 font-medium truncate group-hover:translate-x-1 transition-transform duration-200'>
														{item.label}
													</span>
													<div className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
														<FiArrowRight
															size={16}
															className='text-slate-400'
														/>
													</div>
												</>
											)}
										</div>

										{/* Tooltip for collapsed state */}
										{!isMenuOpen && (
											<div className='absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-slate-700'>
												{item.label}
												<div className='absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700'></div>
											</div>
										)}
									</Link>
								)}
							</li>
						))}
					</ul>
				</nav>
			</div>

			{/* Create Ad Section */}
			<div className='flex-shrink-0 px-4 py-3 border-t border-slate-700/30'>
				<div className={`${!isMenuOpen ? 'flex justify-center' : ''}`}>
					<Create
						onCreateAd={handleAdCreated}
						isMenuOpen={isMenuOpen}
						dailyAdCount={dailyAdCount}
						weeklyAdCount={weeklyAdCount}
						hasCredits={hasCredits}
						userEmail={userEmail}
						refreshLimits={refreshLimits}
						accountType={accountType}
					/>
				</div>
			</div>

			{/* Usage Limits Section */}
			{isMenuOpen && (
				<div className='flex-shrink-0 px-4 py-3'>
					<div className='bg-slate-800/50 rounded-xl p-4 border border-slate-700/30'>
						<UsageLimits
							dailyAdCount={dailyAdCount}
							weeklyAdCount={weeklyAdCount}
							hasCredits={hasCredits}
							refreshLimits={refreshLimits}
							accountType={accountType}
						/>
					</div>
				</div>
			)}

			{/* Footer Section */}
			{isMenuOpen && (
				<div className='flex-shrink-0 px-4 py-4 border-t border-slate-700/30 mt-auto'>
					{/* User Info */}
					<div className='mb-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/30'>
						<div className='flex items-center space-x-3'>
							<div className='w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center'>
								<span className='text-white font-medium text-sm'>
									{userEmail.charAt(0).toUpperCase()}
								</span>
							</div>
							<div className='flex-1 min-w-0'>
								<p className='text-white text-sm font-medium truncate'>
									{userEmail.split('@')[0]}
								</p>
								<p className='text-slate-400 text-xs truncate'>
									{accountType
										? accountType.charAt(0).toUpperCase() + accountType.slice(1)
										: 'Free'}{' '}
									Plan
								</p>
							</div>
						</div>
					</div>

					{/* Upgrade Card */}
					<UpCard />
				</div>
			)}
		</div>
	);
}
