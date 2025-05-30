'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
	Bell,
	Check,
	X,
	MessageCircle,
	AlertCircle,
	ChevronRight,
	MoreHorizontal,
	Gift,
	Info,
	RefreshCcw,
} from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/Button/Button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useToast } from '@/app/components/ui/toast/use-toast';
import { motion } from 'framer-motion';

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
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [activeTab, setActiveTab] = useState('all');
	const { toast } = useToast();

	const FETCH_COOLDOWN = 3000000000000; // 30 seconds cooldown between background fetches
	const INACTIVE_TIMEOUT = 30000000000000; // 5 minutes of inactivity before pausing background fetches

	const fetchNotifications = useCallback(
		async (force = false) => {
			if (isLoading || !user?.email) return;

			// Skip fetch if within cooldown period and not forced
			const now = Date.now();
			if (!force && now - lastFetchTime < FETCH_COOLDOWN) {
				return;
			}

			if (force) {
				setIsRefreshing(true);
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
			} finally {
				setIsRefreshing(false);
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
				title: action === 'accept' ? 'Accepted' : 'Rejected',
				description: `Request ${action === 'accept' ? 'accepted' : 'rejected'} successfully`,
				variant: action === 'accept' ? 'default' : 'destructive',
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

	const markAllAsRead = async () => {
		if (!user?.email) return;

		try {
			await fetch('/api/notifications', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'x-user-email': user.email,
				},
				body: JSON.stringify({
					action: 'markAllRead',
				}),
			});

			setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
			setUnreadCount(0);

			toast({
				title: 'Success',
				description: 'All notifications marked as read',
			});
		} catch (error) {
			console.error('Error marking notifications as read:', error);
			toast({
				title: 'Error',
				description: 'Failed to mark notifications as read',
				variant: 'destructive',
			});
		}
	};

	// Filter notifications based on active tab
	const filteredNotifications = notifications.filter((notification) => {
		if (activeTab === 'all') return true;
		if (activeTab === 'unread') return !notification.read;
		if (activeTab === 'pending') return notification.status === 'pending';
		return true;
	});

	// Get notification icon based on type
	const getNotificationIcon = (type: string) => {
		switch (type) {
			case 'message':
				return <MessageCircle className='w-5 h-5 text-blue-400' />;
			case 'alert':
				return <AlertCircle className='w-5 h-5 text-amber-400' />;
			case 'gift':
				return <Gift className='w-5 h-5 text-purple-400' />;
			case 'info':
			default:
				return <Info className='w-5 h-5 text-indigo-400' />;
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div className='relative p-2 rounded-full transition-all duration-200 hover:bg-slate-700/50 focus:bg-slate-700/70 focus:outline-none cursor-pointer'>
					<Bell className='w-5 h-5 text-slate-300' />
					{unreadCount > 0 && (
						<motion.span
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							className='absolute -top-1 -right-1 w-5 h-5 bg-purple-500 border border-slate-700 rounded-full text-xs flex items-center justify-center text-white font-medium shadow-lg shadow-purple-500/20'>
							{unreadCount}
						</motion.span>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent
				className='w-96 p-0 backdrop-blur-md bg-slate-800/90 border border-slate-700/50 shadow-xl shadow-purple-500/5 rounded-xl overflow-hidden'
				align='end'>
				<div className='max-h-[500px] overflow-hidden flex flex-col'>
					{/* Header with controls */}
					<div className='sticky top-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 p-4 border-b border-slate-700/50 backdrop-blur-md'>
						<div className='flex items-center justify-between mb-3'>
							<h3 className='text-lg font-semibold text-white'>
								Notifications
							</h3>
							<div className='flex items-center gap-2'>
								<button
									onClick={() => fetchNotifications(true)}
									disabled={isRefreshing}
									className='p-1.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-slate-300 transition-colors'>
									<RefreshCcw
										size={16}
										className={`${isRefreshing ? 'animate-spin' : ''}`}
									/>
								</button>
								<button
									onClick={() => markAllAsRead()}
									className='text-xs text-purple-400 hover:text-purple-300 transition-colors px-2 py-1 rounded-md hover:bg-purple-500/10'>
									Mark all read
								</button>
							</div>
						</div>

						{/* Tabs */}
						<div className='flex gap-1'>
							<button
								onClick={() => setActiveTab('all')}
								className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
									activeTab === 'all'
										? 'bg-purple-500 text-white font-medium'
										: 'text-gray-300 hover:bg-slate-700/50'
								}`}>
								All
							</button>
							<button
								onClick={() => setActiveTab('unread')}
								className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
									activeTab === 'unread'
										? 'bg-purple-500 text-white font-medium'
										: 'text-gray-300 hover:bg-slate-700/50'
								}`}>
								Unread {unreadCount > 0 && `(${unreadCount})`}
							</button>
							<button
								onClick={() => setActiveTab('pending')}
								className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
									activeTab === 'pending'
										? 'bg-purple-500 text-white font-medium'
										: 'text-gray-300 hover:bg-slate-700/50'
								}`}>
								Pending
							</button>
						</div>
					</div>

					{/* Notification List */}
					<div className='overflow-y-auto'>
						{filteredNotifications.length > 0 ? (
							filteredNotifications.map((notification) => (
								<motion.div
									key={notification.id}
									initial={{ opacity: 0, y: 5 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.2 }}
									className={`p-4 border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${
										!notification.read ? 'bg-slate-700/10' : ''
									}`}>
									<div className='flex items-start gap-3'>
										<div className='mt-1'>
											{getNotificationIcon(notification.type)}
										</div>
										<div className='flex-1'>
											<p
												className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-white/80'}`}>
												{notification.message}
											</p>
											<div className='flex items-center justify-between mt-1'>
												<p className='text-xs text-white/50'>
													{new Date(notification.createdAt).toLocaleString(
														undefined,
														{
															month: 'short',
															day: 'numeric',
															hour: '2-digit',
															minute: '2-digit',
															hour12: false,
														}
													)}
												</p>
												{notification.status && (
													<span
														className={`text-xs px-2 py-0.5 rounded-full ${
															notification.status === 'pending'
																? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
																: notification.status === 'accept'
																	? 'bg-green-500/20 text-green-300 border border-green-500/30'
																	: 'bg-red-500/20 text-red-300 border border-red-500/30'
														}`}>
														{notification.status.charAt(0).toUpperCase() +
															notification.status.slice(1)}
													</span>
												)}
											</div>

											{/* Action buttons for pending notifications */}
											{notification.status === 'pending' && (
												<div className='flex gap-2 mt-3'>
													<Button
														size='sm'
														className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none shadow-md shadow-purple-500/20'
														onClick={() =>
															handleAction(notification, 'accept')
														}>
														<Check className='w-4 h-4 mr-1' />
														Accept
													</Button>
													<Button
														size='sm'
														variant='destructive'
														className='bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
														onClick={() =>
															handleAction(notification, 'reject')
														}>
														<X className='w-4 h-4 mr-1' />
														Reject
													</Button>
												</div>
											)}
										</div>
										<div className='mt-1 p-1 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer'>
											<ChevronRight className='w-4 h-4' />
										</div>
									</div>
								</motion.div>
							))
						) : (
							<div className='p-8 text-center text-white/60 flex flex-col items-center'>
								<Bell className='w-10 h-10 text-slate-600 mb-3' />
								<p className='text-slate-400'>No notifications</p>
								<p className='text-xs text-slate-500 mt-1'>
									{activeTab !== 'all'
										? `No ${activeTab} notifications to display`
										: 'Youre all caught up!'}
								</p>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className='p-3 bg-slate-800/80 border-t border-slate-700/30 text-center'>
						<button
							className='text-xs text-slate-400 hover:text-purple-400 transition-colors'
							onClick={() => setIsOpen(false)}>
							Notification settings
						</button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
