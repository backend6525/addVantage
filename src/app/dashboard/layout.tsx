// 'use client';
// import React, { ReactNode, useState, useEffect } from 'react';
// import Header from '../components/dashboardUi/Header';
// import SideMenu from '../components/dashboardUi/SideMenu';

// interface DashboardLayoutProps {
// 	children: ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
// 	const [isMenuOpen, setIsMenuOpen] = useState(true);
// 	const [isMobile, setIsMobile] = useState(false);

// 	// Manage responsive behavior
// 	useEffect(() => {
// 		const handleResize = () => {
// 			const mobile = window.innerWidth < 768;
// 			setIsMobile(mobile);
// 			if (mobile) setIsMenuOpen(false);
// 		};

// 		handleResize();
// 		window.addEventListener('resize', handleResize);

// 		return () => window.removeEventListener('resize', handleResize);
// 	}, []);

// 	// Handle mobile overlay click
// 	const handleOverlayClick = () => {
// 		if (isMobile && isMenuOpen) setIsMenuOpen(false);
// 	};

// 	return (
// 		<div className='dark:bg-black dark:text-white min-h-screen flex flex-col'>
// 			{/* Header */}
// 			<header className='z-50 w-full bg-gray-100 dark:bg-gray-800'>
// 				<Header />
// 			</header>

// 			{/* Layout Container */}
// 			<div className='flex flex-1 relative'>
// 				{/* Sidebar */}
// 				<aside
// 					className={`transition-all duration-300 ease-in-out bg-gray-100 dark:bg-gray-800 ${
// 						isMobile
// 							? `fixed inset-y-0 left-0 z-40 transform ${
// 									isMenuOpen ? 'translate-x-0' : '-translate-x-full'
// 								}`
// 							: `static ${isMenuOpen ? 'w-64' : 'w-16'}`
// 					} h-full`}>
// 					<SideMenu
// 						isMenuOpen={isMenuOpen}
// 						setIsMenuOpen={setIsMenuOpen}
// 						userEmail='info.fiberlinknet@gmail.com'
// 					/>
// 				</aside>

// 				{/* Mobile Overlay */}
// 				{isMobile && isMenuOpen && (
// 					<div
// 						className='fixed inset-0 z-30 bg-black bg-opacity-50'
// 						onClick={handleOverlayClick}
// 					/>
// 				)}

// 				{/* Main Content */}
// 				<main
// 					id='main-content'
// 					className={`flex-1 overflow-auto transition-all duration-300 ${
// 						!isMobile && isMenuOpen ? 'ml-0' : 'ml-0'
// 					}`}>
// 					<div className='pt-4 px-4'>{children}</div>
// 				</main>
// 			</div>
// 		</div>
// 	);
// }

'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import Header from '../components/dashboardUi/Header';
import SideMenu from '../components/dashboardUi/SideMenu';

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
		<div className='dark:bg-gray-950 bg-gray-50 dark:text-white min-h-screen flex flex-col'>
			{/* Header */}
			<header className='z-50 w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800'>
				<Header />
			</header>

			{/* Layout Container */}
			<div className='flex flex-1 relative'>
				{/* Sidebar */}
				<aside
					className={`transition-all duration-300 ease-in-out 
						${
							isMobile
								? `fixed inset-y-0 left-0 z-40 transform shadow-xl   
								${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
								: `static ${isMenuOpen ? 'w-64' : 'w-16'}`
						} 
						bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 h-full  `}>
					<SideMenu
						isMenuOpen={isMenuOpen}
						setIsMenuOpen={setIsMenuOpen}
						userEmail='info.fiberlinknet@gmail.com'
					/>
				</aside>

				{/* Mobile Overlay */}
				{isMobile && isMenuOpen && (
					<div
						className='fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm'
						onClick={handleOverlayClick}
					/>
				)}

				{/* Main Content */}
				<main
					id='main-content'
					className={`flex-1 overflow-auto transition-all duration-300 
						${!isMobile && isMenuOpen ? 'ml-0' : 'ml-0'}
						bg-gray-50 dark:bg-gray-900`}>
					<div className='pt-6  max-w-8xl mx-auto'>{children}</div>
				</main>
			</div>
		</div>
	);
}
