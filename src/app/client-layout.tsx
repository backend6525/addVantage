'use client';

import { useState, useEffect } from 'react';
import SideMenu from './components/dashboardUi/SideMenu/SideMenu';
import Header from './components/dashboardUi/Header/Header';
import { useRouter, usePathname } from 'next/navigation';

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [userData, setUserData] = useState<{ email: string } | null>(null);
	const [userStatus, setUserStatus] = useState<any>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	// Skip authentication check for login page
	const isLoginPage = pathname === '/login';

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/auth/user');

				if (response.status === 404) {
					// User not authenticated, redirect to login if not already on login page
					console.log('User not authenticated, redirecting to login');
					if (!isLoginPage) {
						router.push('/login');
					}
					return;
				}

				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}

				const data = await response.json();
				console.log('User data fetched successfully:', data);
				setUserData(data);
			} catch (error) {
				console.error('Error fetching user data:', error);
				if (!isLoginPage) {
					router.push('/login');
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, [router, isLoginPage]);

	useEffect(() => {
		if (userData?.email) {
			fetchUserStatus();
		}
	}, [userData]);

	const fetchUserStatus = async () => {
		try {
			const response = await fetch(
				`/api/auth/user/userLimits?email=${userData?.email}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch user status');
			}
			const data = await response.json();
			setUserStatus(data);
		} catch (error) {
			console.error('Error fetching user status:', error);
		}
	};

	// Show loading state
	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				Loading...
			</div>
		);
	}

	// If on login page or no user data, just render children
	if (isLoginPage || !userData) {
		return <>{children}</>;
	}

	// Render dashboard with user data
	return (
		<div className='flex h-screen'>
			<SideMenu
				userEmail={userData?.email || ''}
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				dailyAdCount={userStatus?.dailyAdCount || 0}
				weeklyAdCount={userStatus?.weeklyAdCount || 0}
				hasCredits={userStatus?.hasCredits || false}
				refreshLimits={fetchUserStatus}
				accountType={userStatus?.accountType || 'free'}
			/>
			<div className='flex-1 flex flex-col'>
				<Header
					onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
					userStatus={userStatus}
				/>
				<main className='flex-1 overflow-auto p-4'>{children}</main>
			</div>
		</div>
	);
}
