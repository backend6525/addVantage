// 'use client';

// import { useState } from 'react';

// type User = {
// 	name: string;
// 	email: string;
// 	avatar: string;
// 	plan: string;
// 	notifications: Record<string, boolean>;
// 	twoFactorEnabled: boolean;
// };

// export const useUserSettings = () => {
// 	const [user, setUser] = useState<User>({
// 		name: 'Jane Smith',
// 		email: 'jane@example.com',
// 		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
// 		plan: 'Premium Plus',
// 		notifications: {
// 			email: true,
// 			push: true,
// 			marketing: false,
// 		},
// 		twoFactorEnabled: true,
// 	});

// 	const handleSave = async (section: string) => {
// 		try {
// 			await new Promise((resolve) => setTimeout(resolve, 1000));
// 			alert(`${section} saved!`);
// 			return true;
// 		} catch (error) {
// 			alert('Save failed');
// 			return false;
// 		}
// 	};

// 	const handleNotificationToggle = (key: string) => {
// 		setUser((prev) => ({
// 			...prev,
// 			notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
// 		}));
// 	};

// 	const handleTwoFactorToggle = () => {
// 		setUser((prev) => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
// 	};

// 	return { user, handleSave, handleNotificationToggle, handleTwoFactorToggle };
// };

'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';

// Comprehensive User Schema with Validation
const UserSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	avatar: z.string().url('Invalid avatar URL'),
	plan: z.enum(['Free', 'Pro', 'Enterprise', 'Premium Plus']),
	tier: z.object({
		level: z.number().min(1).max(5),
		benefits: z.array(z.string()),
	}),
	notifications: z.object({
		email: z.boolean(),
		push: z.boolean(),
		sms: z.boolean(),
		marketing: z.boolean(),
		billing: z.boolean(),
		security: z.boolean(),
	}),
	preferences: z.object({
		theme: z.enum(['light', 'dark', 'system', 'high-contrast']),
		language: z.string(),
		timezone: z.string(),
		accessibilityMode: z.boolean(),
	}),
	security: z.object({
		twoFactorEnabled: z.boolean(),
		lastPasswordChange: z.date(),
		loginHistory: z.array(
			z.object({
				timestamp: z.date(),
				ipAddress: z.string(),
				location: z.string(),
				device: z.string(),
			})
		),
	}),
});

type User = z.infer<typeof UserSchema>;

// Simulated API for user operations
class UserSettingsAPI {
	static async saveUserSettings(updatedUser: Partial<User>): Promise<User> {
		// Simulate API call with validation
		return new Promise((resolve, reject) => {
			try {
				// In a real scenario, this would be an actual API call
				const mergedUser = { ...initialUser, ...updatedUser };
				UserSchema.parse(mergedUser);
				setTimeout(() => resolve(mergedUser as User), 500);
			} catch (error) {
				reject(new Error('Invalid user data'));
			}
		});
	}

	static async toggleNotification(
		key: keyof User['notifications']
	): Promise<User['notifications']> {
		return new Promise((resolve) => {
			setTimeout(() => {
				const updatedNotifications = {
					...initialUser.notifications,
					[key]: !initialUser.notifications[key],
				};
				resolve(updatedNotifications);
			}, 300);
		});
	}
}

// Initial User State with Rich Metadata
const initialUser: User = {
	id: crypto.randomUUID(),
	name: 'Jane Smith',
	email: 'jane@example.com',
	avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
	plan: 'Premium Plus',
	tier: {
		level: 3,
		benefits: [
			'Priority Support',
			'Advanced Analytics',
			'Custom Integrations',
			'Unlimited Team Members',
		],
	},
	notifications: {
		email: true,
		push: true,
		sms: false,
		marketing: false,
		billing: true,
		security: true,
	},
	preferences: {
		theme: 'dark',
		language: 'en-US',
		timezone: 'America/New_York',
		accessibilityMode: false,
	},
	security: {
		twoFactorEnabled: true,
		lastPasswordChange: new Date(),
		loginHistory: [
			{
				timestamp: new Date(),
				ipAddress: '192.168.1.100',
				location: 'New York, NY',
				device: 'Chrome (MacOS)',
			},
		],
	},
};

export const useUserSettings = () => {
	const [user, setUser] = useState<User>(initialUser);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSave = useCallback(
		async (section: keyof User, data: Partial<User>) => {
			setIsLoading(true);
			setError(null);

			try {
				const updatedUser = await UserSettingsAPI.saveUserSettings(data);
				setUser(updatedUser);
				return { success: true, message: `${section} updated successfully` };
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Update failed';
				setError(errorMessage);
				return { success: false, message: errorMessage };
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const handleNotificationToggle = useCallback(
		async (key: keyof User['notifications']) => {
			setIsLoading(true);
			setError(null);

			try {
				const updatedNotifications =
					await UserSettingsAPI.toggleNotification(key);
				setUser((prev) => ({ ...prev, notifications: updatedNotifications }));
				return { success: true, message: `${key} notifications toggled` };
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Toggle failed';
				setError(errorMessage);
				return { success: false, message: errorMessage };
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const handleTwoFactorToggle = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const updatedUser = await UserSettingsAPI.saveUserSettings({
				security: {
					...user.security,
					twoFactorEnabled: !user.security.twoFactorEnabled,
				},
			});
			setUser(updatedUser);
			return {
				success: true,
				message: `Two-factor authentication ${updatedUser.security.twoFactorEnabled ? 'enabled' : 'disabled'}`,
			};
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Toggle failed';
			setError(errorMessage);
			return { success: false, message: errorMessage };
		} finally {
			setIsLoading(false);
		}
	}, [user]);

	return {
		user,
		handleSave,
		handleNotificationToggle,
		handleTwoFactorToggle,
		isLoading,
		error,
	};
};
