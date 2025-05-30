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
	FiAlertCircle,
} from 'react-icons/fi';
import { Separator } from '@/app/components/separator';
import { Create } from '../CreateAd/Create';
import TeamDropDown from './TeamDropDown';
import UpCard from './upgradeAccCard/upCard';
import './styles/sidebar.css';
import { useToast } from '../../ui/toast/use-toast';

// Define navigation items
const navItems = [
	{ href: '/dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
	{
		href: '/dashboard/adstudio',
		label: 'Add Studio',
		icon: <FiPlusCircle size={20} />,
	},
	{
		href: '/dashboard/earnings',
		label: 'Earnings',
		icon: <FiDollarSign size={20} />,
	},
	{ label: 'Teams', icon: <FiUsers size={20} /> },
	{
		href: '/dashboard/settings',
		label: 'Settings',
		icon: <FiSettings size={20} />,
	},
	{
		href: '/dashboard/referrals',
		label: 'Referrals',
		icon: <FiGift size={20} />,
	},
	{
		href: '/dashboard/callcenter',
		label: 'Call Center',
		icon: <FiGift size={20} />,
	},
];

interface SidebarProps {
	userEmail: string;
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	// These are passed from parent component
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
	const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
	const { toast } = useToast();

	// Define limits - these are the actual limits for free accounts
	const dailyAdLimit = 1;
	const weeklyAdLimit = 5;

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const calculateProgress = () => {
		const dailyProgress = (dailyAdCount / dailyAdLimit) * 100;
		const weeklyProgress = (weeklyAdCount / weeklyAdLimit) * 100;
		return { dailyProgress, weeklyProgress };
	};

	const getProgressBarColor = () => {
		const { dailyProgress, weeklyProgress } = calculateProgress();
		if (dailyProgress >= 90 || weeklyProgress >= 90) {
			return 'bg-red-500';
		} else if (dailyProgress >= 70 || weeklyProgress >= 70) {
			return 'bg-yellow-500';
		} else {
			return 'bg-green-500';
		}
	};

	// Handle ad creation and refresh limits
	const handleAdCreated = async (limits: {
		dailyCount: number;
		weeklyCount: number;
	}) => {
		// Refresh the limits from the parent
		await refreshLimits();

		toast({
			title: 'Ad Created',
			description: 'Your ad has been successfully created!',
		});
	};

	return (
		<div
			className={`h-full bg-slate-800/70 text-white flex flex-col overflow-y-auto custom-scrollbar ${
				isMenuOpen ? 'w-[16rem]' : 'w-[5.2rem]'
			} transition-all duration-300 px-6 pb-6 shadow-lg border-r border-slate-700/50`}>
			<div className='flex-shrink-0 pt-4'>
				<button
					onClick={toggleMenu}
					className='flex items-center justify-center w-full py-2 text-gray-300 hover:text-white'>
					{isMenuOpen ? <FiArrowLeft size={20} /> : <FiArrowRight size={20} />}
				</button>
			</div>

			{/* Sidebar Menu */}
			<div className='flex-grow overflow-y-auto custom-scrollbar mt-2'>
				<ul className='space-y-1.5'>
					{navItems.map((item) =>
						item.label === 'Teams' ? (
							<li key={item.label} className='group'>
								<button
									onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
									className={`flex items-center p-2.5 w-full text-left rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors
                    ${!isMenuOpen ? 'justify-center' : ''}`}>
									<div className='flex-shrink-0'>{item.icon}</div>
									{isMenuOpen && (
										<span className='ml-3 truncate'>{item.label}</span>
									)}
									{isMenuOpen && (
										<span className='ml-auto'>
											{isTeamDropdownOpen ? (
												<FiArrowLeft size={16} />
											) : (
												<FiArrowRight size={16} />
											)}
										</span>
									)}
								</button>
								{isMenuOpen && isTeamDropdownOpen && (
									<div className='mt-2 ml-6 space-y-2'>
										<TeamDropDown userEmail={userEmail} />
									</div>
								)}
							</li>
						) : (
							<li key={item.label}>
								<Link
									href={item.href || '#'}
									className={`flex items-center p-2.5 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors
                    ${!isMenuOpen ? 'justify-center' : ''}`}>
									<div className='flex-shrink-0'>{item.icon}</div>
									{isMenuOpen && (
										<span className='ml-3 truncate'>{item.label}</span>
									)}
								</Link>
							</li>
						)
					)}
				</ul>
			</div>

			{/* Create Component */}
			<div className='flex-shrink-0 mt-2'>
				<Create
					onCreateAd={handleAdCreated}
					isMenuOpen={isMenuOpen}
					dailyAdCount={dailyAdCount}
					weeklyAdCount={weeklyAdCount}
					hasCredits={hasCredits}
					userEmail={userEmail}
				/>
			</div>

			{/* Usage Limits */}
			{isMenuOpen && (
				<div className='flex-shrink-0 mt-2 bg-slate-800/90 rounded-lg p-4 border border-slate-700/50'>
					{/* Account Type and Credits */}
					<div className='flex justify-between items-center mb-3'>
						<span className='text-sm text-gray-300'>
							{accountType
								? accountType.charAt(0).toUpperCase() + accountType.slice(1)
								: 'Free'}{' '}
							Account
						</span>
						<span className='text-xs text-gray-400'>
							{hasCredits ? 'Credits Available' : 'No Credits'}
						</span>
					</div>

					<div className='flex justify-between items-center mb-2'>
						<span className='text-sm text-gray-300'>Weekly Ad Usage</span>
						<span className='text-xs text-gray-400'>
							{weeklyAdCount}/{weeklyAdLimit} used
						</span>
					</div>
					<div className='h-2 bg-slate-700/50 rounded-full overflow-hidden'>
						<div
							className={`h-full ${getProgressBarColor()} transition-all duration-300`}
							style={{ width: `${calculateProgress().weeklyProgress}%` }}></div>
					</div>
					<div className='mt-4 text-xs text-gray-400'>
						{dailyAdCount >= dailyAdLimit ? (
							<div className='flex items-center text-yellow-400'>
								<FiAlertCircle className='mr-1' size={12} />
								Daily limit reached
							</div>
						) : (
							<div>
								Daily: {dailyAdCount}/{dailyAdLimit} used
							</div>
						)}
					</div>

					{/* Always show credits warning if !hasCredits */}
					{!hasCredits && (
						<div className='mt-2 flex items-center text-yellow-400 text-xs'>
							<FiAlertCircle className='mr-1' size={12} />
							Add credits to publish ads
						</div>
					)}

					{/* Add refresh button */}
					<button
						onClick={refreshLimits}
						className='mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center'>
						<FiArrowRight className='mr-1' size={12} />
						Refresh limits
					</button>
				</div>
			)}

			{/* Footer Links */}
			{isMenuOpen && (
				<div className='flex-shrink-0 mt-auto pt-2'>
					<Separator className='my-2 bg-slate-700/50' />

					{/* Upgrade Account Card */}
					<div className='flex-shrink-0 mt-2'>{isMenuOpen && <UpCard />}</div>
				</div>
			)}
		</div>
	);
}
