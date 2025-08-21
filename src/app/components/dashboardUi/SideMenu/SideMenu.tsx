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
					{navItems.map((item) => (
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
					))}
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
					refreshLimits={refreshLimits}
					accountType={accountType}
				/>
			</div>

			{/* Usage Limits Component */}
			{isMenuOpen && (
				<UsageLimits
					dailyAdCount={dailyAdCount}
					weeklyAdCount={weeklyAdCount}
					hasCredits={hasCredits}
					refreshLimits={refreshLimits}
					accountType={accountType}
				/>
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
