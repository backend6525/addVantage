import React, { useEffect, useState, useCallback } from 'react';
import {
	Bell,
	Check,
	X,
	MessageCircle,
	AlertCircle,
	ChevronRight,
} from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/Button/Button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useToast } from '@/app/components/ui/toast/use-toast';

interface Notification {
	id: string;
	type: string;
	message: string;
	adId?: string;
	requesterId?: string;
	status: string;
	createdAt: string;
	read: boolean;
}

export const NotificationCenter = () => {
	const { user, isLoading } = useKindeBrowserClient();
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const [lastFetchTime, setLastFetchTime] = useState<number>(0);
	const { toast } = useToast();

	const FETCH_COOLDOWN = 30000; // 30 seconds cooldown between background fetches
	const INACTIVE_TIMEOUT = 300000; // 5 minutes of inactivity before pausing background fetches

	const fetchNotifications = useCallback(
		async (force = false) => {
			if (isLoading || !user?.email) return;

			// Skip fetch if within cooldown period and not forced
			const now = Date.now();
			if (!force && now - lastFetchTime < FETCH_COOLDOWN) {
				return;
			}

			try {
				const response = await fetch('/api/notifications', {
					method: 'GET',
					headers: {
						'x-user-email': user.email,
						'Cache-Control': 'no-cache',
						Pragma: 'no-cache',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch notifications');
				}

				const data = await response.json();
				setNotifications(data.notifications || []);
				setUnreadCount(data.unreadCount || 0);
				setLastFetchTime(now);
			} catch (error) {
				console.error('Error fetching notifications:', error);
			}
		},
		[user?.email, isLoading, lastFetchTime]
	);

	// Smart background polling
	useEffect(() => {
		if (!user?.email || isLoading) return;

		let timeoutId: NodeJS.Timeout;
		let inactivityTimeout: NodeJS.Timeout;
		let isActive = true;

		const checkForUpdates = () => {
			if (isActive) {
				fetchNotifications();
				timeoutId = setTimeout(checkForUpdates, FETCH_COOLDOWN);
			}
		};

		const handleUserActivity = () => {
			clearTimeout(inactivityTimeout);
			if (!isActive) {
				isActive = true;
				checkForUpdates();
			}
			inactivityTimeout = setTimeout(() => {
				isActive = false;
			}, INACTIVE_TIMEOUT);
		};

		// Start initial fetch and polling
		checkForUpdates();
		handleUserActivity();

		// Setup activity listeners
		const events = ['mousedown', 'keydown', 'scroll', 'mousemove'];
		events.forEach((event) => {
			window.addEventListener(event, handleUserActivity);
		});

		return () => {
			events.forEach((event) => {
				window.removeEventListener(event, handleUserActivity);
			});
			clearTimeout(timeoutId);
			clearTimeout(inactivityTimeout);
			isActive = false;
		};
	}, [user?.email, isLoading, fetchNotifications]);

	// Fetch on popover open
	useEffect(() => {
		if (isOpen) {
			fetchNotifications(true);
		}
	}, [isOpen, fetchNotifications]);

	const handleAction = async (
		notification: Notification,
		action: 'accept' | 'reject'
	) => {
		try {
			console.log(
				'Handling action:',
				action,
				'for notification:',
				notification.id
			);
			await fetch('/api/notifications', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'x-user-email': user?.email || '',
				},
				body: JSON.stringify({
					notificationId: notification.id,
					status: action,
					action: 'status',
				}),
			});

			setNotifications((prev) =>
				prev.map((n) =>
					n.id === notification.id ? { ...n, status: action } : n
				)
			);

			toast({
				title: 'Success',
				description: `Request ${action}ed successfully`,
			});

			fetchNotifications();
		} catch (error) {
			console.error('Error handling action:', error);
			toast({
				title: 'Error',
				description: 'Failed to process request',
				variant: 'destructive',
			});
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button className='relative p-2 rounded-full hover:bg-gray-700/50 transition-colors'>
					<Bell className='w-5 h-5 text-white/70' />
					{unreadCount > 0 && (
						<span className='absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center text-white'>
							{unreadCount}
						</span>
					)}
				</button>
			</PopoverTrigger>
			<PopoverContent
				className='w-80 p-0 bg-gray-800 border border-gray-700'
				align='end'>
				<div className='max-h-[400px] overflow-y-auto'>
					<div className='sticky top-0 bg-gray-800 p-4 border-b border-gray-700'>
						<h3 className='text-lg font-semibold text-white'>Notifications</h3>
					</div>
					{notifications.length > 0 ? (
						notifications.map((notification) => (
							<div
								key={notification.id}
								className='p-4 border-b border-gray-700/50 hover:bg-gray-700/10 transition-colors'>
								<div className='flex items-start gap-3'>
									<MessageCircle className='w-5 h-5 text-blue-400 mt-1' />
									<div className='flex-1'>
										<p className='text-sm text-white/90'>
											{notification.message}
										</p>
										<p className='text-xs text-white/60 mt-1'>
											{new Date(notification.createdAt).toLocaleString()}
										</p>
										{notification.status === 'pending' && (
											<div className='flex gap-2 mt-2'>
												<Button
													size='sm'
													variant='default'
													onClick={() => handleAction(notification, 'accept')}>
													<Check className='w-4 h-4 mr-1' />
													Accept
												</Button>
												<Button
													size='sm'
													variant='destructive'
													onClick={() => handleAction(notification, 'reject')}>
													<X className='w-4 h-4 mr-1' />
													Reject
												</Button>
											</div>
										)}
									</div>
									<ChevronRight className='w-4 h-4 text-white/40' />
								</div>
							</div>
						))
					) : (
						<div className='p-4 text-center text-white/60'>
							<p>No notifications</p>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
};
