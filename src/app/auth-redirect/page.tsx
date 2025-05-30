'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRedirectPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function checkUserStatus() {
			try {
				// Fetch user data from the auth API
				const response = await fetch('/api/auth/user');
				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}

				const userData = await response.json();
				console.log('User data:', userData);

				if (!isMounted) return;

				// Check if user has completed onboarding
				if (userData.onboardingCompleted) {
					// User has completed onboarding, redirect to dashboard
					console.log(
						'User has completed onboarding, redirecting to dashboard'
					);
					router.replace('/dashboard');
				} else {
					// User has not completed onboarding, redirect to onboarding page
					console.log(
						'User has not completed onboarding, redirecting to onboarding page'
					);
					router.replace('/onboarding');
				}
			} catch (error) {
				console.error('Error in auth redirect:', error);
				if (isMounted) {
					setError(
						error instanceof Error ? error.message : 'An error occurred'
					);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		checkUserStatus();

		return () => {
			isMounted = false;
		};
	}, [router]);

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900'>
				<div className='text-center'>
					<h2 className='text-2xl font-semibold text-white mb-2'>Error</h2>
					<p className='text-gray-400'>{error}</p>
					<button
						onClick={() => router.push('/api/auth/login')}
						className='mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90'>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4'></div>
				<h2 className='text-2xl font-semibold text-white mb-2'>
					Setting up your account...
				</h2>
				<p className='text-gray-400'>
					Please wait while we prepare your experience.
				</p>
			</div>
		</div>
	);
}
