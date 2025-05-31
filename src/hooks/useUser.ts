import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
	email: string;
	dailyAdCount?: number;
	weeklyAdCount?: number;
	dailyAdLimit?: number;
	weeklyAdLimit?: number;
	credits?: number;
	accountType?: string;
	lastLimitReset?: string;
	onboardingCompleted?: boolean;
	[key: string]: any;
}

export function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('/api/auth/user');
				if (!response.ok) {
					throw new Error('Failed to fetch user');
				}
				const data = await response.json();
				setUser(data);
			} catch (error) {
				console.error('Error fetching user:', error);
				router.push('/login');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, [router]);

	return { user, isLoading };
}
