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
			} bg-gray-900 text-white p-6 shadow-lg transition-all duration-300 fixed top-[0.58rem] border border-gray-700 left-0 h-full flex flex-col backdrop-blur-md bg-opacity-50 overflow-hidden`}>
			{/* Sidebar Header */}
			<div className='flex-shrink-0 '>
				<button
					onClick={toggleMenu}
					className='text-gray-300 hover:text-white transition-colors pl-2 mt-20'>
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
									className='flex items-center p-3 w-full text-left rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white backdrop-blur-lg bg-gray-800/40 transition-colors'>
									<span className='mr-3'>{item.icon}</span>
									{isMenuOpen && item.label}
								</button>
								{isTeamsOpen && isMenuOpen && (
									<ul className='ml-8 mt-2 space-y-2'>
										<li>
											<Link
												href='/dashboard/teams/create'
												className='text-gray-300 hover:text-white transition-colors'>
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
									className='flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white backdrop-blur-lg bg-gray-800/40 transition-colors'>
									<span className='mr-3'>{item.icon}</span>
									{isMenuOpen && item.label}
								</Link>
							</li>
						)
					)}
				</ul>
			</div>

			{/* Footer Area */}
			<div className='mt-auto-mt-8'>
				<Create onCreateAdd={onCreateAdd} isMenuOpen={isMenuOpen} />
				<div className='mt-4'>
					<div className='h-4 w-full bg-gray-700 rounded'>
						<div
							className='h-4 bg-green-500 rounded'
							style={{ width: '35%' }}></div>
					</div>
					{isMenuOpen && (
						<p className='text-xs text-gray-400 mt-2 text-center'>
							Upgrade Account to enjoy more features!
						</p>
					)}
				</div>
				<Separator className='bg-gray-600 mt-3' />

				{/* UpCard adjusted to fit screen */}
				<div className='overflow-y-auto max-h-[40vh] mt-4'>
					{isMenuOpen && <UpCard />}
				</div>
			</div>
		</aside>
	);
};

export default SideMenu;
