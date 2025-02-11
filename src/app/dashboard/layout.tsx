'use client';
import React, { ReactNode, useState, useEffect, Suspense } from 'react';
import Header from '../components/dashboardUi/Header';
import SideMenu from '../components/dashboardUi/SideMenu';
import styles from './layout.module.css';
import { ChatProvider } from '@/context/ChatContext';
import { GlobalChatInterface } from '@/app/components/GlobalChatInterface';

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	// Manage responsive behavior
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

	// Handle mobile overlay click
	const handleOverlayClick = () => {
		if (isMobile && isMenuOpen) setIsMenuOpen(false);
	};

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ChatProvider>
				<div className={styles.dashboardContainer}>
					{/* Header */}
					<header className={styles.header}>
						<Header />
					</header>

					{/* Layout Container */}
					<div className='flex flex-1 relative'>
						{/* Sidebar */}
						<aside
							className={`${styles.sidebar} ${
								isMobile
									? `fixed inset-y-0 left-0 z-40 transform shadow-xl ${
											isMenuOpen ? 'translate-x-0' : '-translate-x-full'
										}`
									: `static ${isMenuOpen ? 'w-64' : 'w-16'}`
							}`}>
							<SideMenu
								isMenuOpen={isMenuOpen}
								setIsMenuOpen={setIsMenuOpen}
								userEmail='info.fiberlinknet@gmail.com'
							/>
						</aside>

						{/* Mobile Overlay */}
						{isMobile && isMenuOpen && (
							<div
								className={styles.mobileOverlay}
								onClick={handleOverlayClick}
							/>
						)}

						{/* Main Content */}
						<main
							id='main-content'
							className={`${styles.mainContent} ${
								!isMobile && isMenuOpen ? 'ml-0' : 'ml-0'
							}`}>
							<div className='pt-6 max-w-8xl mx-auto'>{children}</div>
						</main>
					</div>

					{/* Global Chat Interface */}
					<GlobalChatInterface />
				</div>
			</ChatProvider>
		</Suspense>
	);
}
