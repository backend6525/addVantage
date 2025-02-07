import React, { useState, useEffect } from 'react';
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
	FiGithub,
	FiArchive,
} from 'react-icons/fi';
import { Separator } from '@/app/components/separator';
import Create from './create';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import TeamDropDown from './TeamDropDown';
import UpCard from './upgradeAccCard/upCard';
import './styles/sidebar.css';
const navItems = [
	{ href: '/dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
	{
		href: '/dashboard/addstudio',
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
];

const bottomMenuItems = [
	{
		id: 1,
		name: 'GitHub',
		icon: <FiGithub size={20} />,
		path: 'https://github.com',
	},
	{
		id: 2,
		name: 'Docs',
		icon: <FiGithub size={20} />,
		path: 'https://docs.github.com',
	},
	{ id: 3, name: 'Archive', icon: <FiArchive size={20} />, path: '/archive' },
];

interface SidebarProps {
	userEmail: string;
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu: React.FC<SidebarProps> = ({
	isMenuOpen,
	setIsMenuOpen,
	userEmail,
}) => {
	const [isTeamsOpen, setIsTeamsOpen] = useState(false);
	const [teamsExist, setTeamsExist] = useState(true);
	const createAdd = useMutation(api.adds.createAdd);

	const onCreateAdd = (fileName: string) => {
		console.log(fileName);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Resize effect to adjust dashboard when sidebar changes
	useEffect(() => {
		const dashboardContent = document.getElementById('dashboard-content');
		if (dashboardContent) {
			if (isMenuOpen) {
				dashboardContent.style.marginLeft = '0rem'; // Full width sidebar
			} else {
				dashboardContent.style.marginLeft = '0rem'; // Collapsed sidebar
			}
		}
	}, [isMenuOpen]);

	return (
		<aside
			className={`${
				isMenuOpen ? 'w-[16rem]' : 'w-[5.2rem]'
			} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 pb-6 shadow-lg transition-all duration-300 fixed top-16 border-r border-gray-200 dark:border-gray-800 left-0 h-[calc(100%-4rem)] flex flex-col overflow-hidden z-40`}>
			{/* Sidebar Header */}
			<div className='flex-shrink-0'>
				<button
					onClick={toggleMenu}
					className='text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors pl-2 mt-4'>
					{isMenuOpen ? <FiArrowLeft size={24} /> : <FiArrowRight size={24} />}
				</button>
			</div>

			{/* Sidebar Menu */}
			<div
				className='flex-grow overflow-y-auto mt-6 glass-scroll'
				style={{ maxHeight: 'calc(100% - 32rem)' }}>
				<ul className='space-y-2'>
					{navItems.map((item) =>
						item.label === 'Teams' ? (
							<li key={item.label} className='group'>
								<button
									onClick={() => setIsTeamsOpen(!isTeamsOpen)}
									className={`flex items-center p-3 w-full text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors
										${!isMenuOpen ? 'justify-center' : ''}`}>
									<span className={`${!isMenuOpen ? '' : 'mr-3'}`}>
										{item.icon}
									</span>
									{isMenuOpen && item.label}
								</button>
								{isTeamsOpen && isMenuOpen && (
									<ul className='ml-8 mt-2 space-y-2'>
										<li>
											<Link
												href='/dashboard/teams/create'
												className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'>
												Create Team
											</Link>
										</li>
										{teamsExist && (
											<li>
												<TeamDropDown userEmail={userEmail} />
											</li>
										)}
									</ul>
								)}
							</li>
						) : (
							<li key={item.label} className='group'>
								<Link
									href={item.href!}
									className={`flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors
										${!isMenuOpen ? 'justify-center' : ''}`}>
									<span className={`${!isMenuOpen ? '' : 'mr-3'}`}>
										{item.icon}
									</span>
									{isMenuOpen && item.label}
								</Link>
							</li>
						)
					)}
				</ul>
			</div>

			{/* Footer Area */}
			<div className='mt-auto-mt-8 pl-0.5'>
				<Create onCreateAdd={onCreateAdd} isMenuOpen={isMenuOpen} />
				<div className='mt-4'>
					<div className='h-4 w-full bg-gray-200 dark:bg-gray-700 rounded'>
						<div
							className='h-4 bg-primary rounded'
							style={{ width: '35%' }}></div>
					</div>
					{isMenuOpen && (
						<p className='text-xs text-gray-500 dark:text-gray-400 mt-2 text-center'>
							Upgrade Account to enjoy more features!
						</p>
					)}
				</div>
				<Separator className='bg-gray-200 dark:bg-gray-700 mt-3' />

				{/* UpCard adjusted to fit screen */}
				<div className='overflow-y-auto max-h-[40vh] mt-4'>
					{isMenuOpen && <UpCard />}
				</div>
			</div>
		</aside>
	);
};

export default SideMenu;
