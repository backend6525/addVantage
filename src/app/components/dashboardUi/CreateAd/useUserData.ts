// useUserData.ts
import { useState, useCallback } from 'react';

export const useUserData = () => {
	const [userData, setUserData] = useState<{
		email: string;
		[key: string]: any;
	} | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch('/api/auth/user');
			if (!response.ok) throw new Error('Failed to fetch user data');

			const userData = await response.json();
			sessionStorage.setItem('userToken', userData.idToken);
			sessionStorage.setItem('userRole', JSON.stringify(userData.roles));

			setUserData(userData);
			return userData;
		} catch (error) {
			console.error('Error fetching user data:', error);
			setError('Authentication failed');
			throw error;
		}
	}, []);

	return { userData, error, fetchUserData };
};
