'use client';
import React, { ReactNode, useState, useEffect, Suspense } from 'react';
import Header from '../components/dashboardUi/Header';
import SideMenu from '../components/dashboardUi/SideMenu';
import { ChatProvider } from '@/context/ChatContext';
import { GlobalChatInterface } from '@/app/components/GlobalChatInterface';
import { useUser } from '@/hooks/useUser';

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const { user, isLoading } = useUser();

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			if (mobile) setIsMenuOpen(false);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return null; // This will trigger the page-level redirect
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ChatProvider>
				<div className='flex flex-col h-screen bg-slate-900 overflow-hidden'>
					{/* Header - Fixed at the top */}
					<header className='fixed top-0 left-0 right-0 h-16 z-40 bg-slate-900 border-b border-slate-700'>
						<Header
							onMenuToggle={handleMenuToggle}
							userStatus={{
								email: user.email,
								dailyAdCount: user.dailyAdCount || 0,
								weeklyAdCount: user.weeklyAdCount || 0,
								dailyAdLimit: user.dailyAdLimit || 10,
								weeklyAdLimit: user.weeklyAdLimit || 50,
								hasCredits: user.credits > 0,
								credits: user.credits || 0,
								accountType:
									user.accountType === 'pro' ||
									user.accountType === 'enterprise'
										? user.accountType
										: 'free',
								lastLimitReset: user.lastLimitReset || new Date().toISOString(),
							}}
						/>
					</header>

					{/* Main content area - Flex below header */}
					<div className='flex flex-1 pt-0 overflow-hidden'>
						{/* Sidebar - Fixed width */}
						<aside
							className={`fixed top-16 bottom-0 z-30 bg-slate-900 border-r border-slate-700 ${
								isMenuOpen ? 'w-64' : 'w-20'
							} transition-all duration-300 ease-in-out ${
								isMobile ? 'block' : 'block'
							}`}>
							<SideMenu
								isMenuOpen={isMenuOpen}
								setIsMenuOpen={setIsMenuOpen}
								userEmail={user.email}
								dailyAdCount={user.dailyAdCount || 0}
								weeklyAdCount={user.weeklyAdCount || 0}
								hasCredits={user.credits > 0}
								refreshLimits={async () => {}}
							/>
						</aside>

						{/* Main Content Area */}
						<main
							className={`flex-1 overflow-y-auto transition-all duration-300 ${
								isMenuOpen ? 'ml-64' : 'ml-20'
							} ${isMobile ? 'pt-16' : ''}`}>
							{/* This is where your dashboard content will be rendered */}
							<div>{children}</div>
						</main>
					</div>

					{/* Global Chat Interface */}
					<GlobalChatInterface />

					{/* Mobile Overlay */}
					{isMobile && isMenuOpen && (
						<div
							className='fixed inset-0 bg-black bg-opacity-50 z-20'
							onClick={() => setIsMenuOpen(false)}
						/>
					)}
				</div>
			</ChatProvider>
		</Suspense>
	);
}
