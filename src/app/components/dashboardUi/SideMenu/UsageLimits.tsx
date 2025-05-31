import React, { useEffect } from 'react';
import { FiAlertCircle, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import {
	getDailyLimit,
	getWeeklyLimit,
	type AccountType,
} from '../utils/accountLimits';
import { useToast } from '../../ui/toast/use-toast';

interface UsageLimitsProps {
	dailyAdCount: number;
	weeklyAdCount: number;
	hasCredits: boolean;
	refreshLimits: () => Promise<void>;
	accountType?: AccountType;
}

export default function UsageLimits({
	dailyAdCount,
	weeklyAdCount,
	hasCredits,
	refreshLimits,
	accountType = 'free',
}: UsageLimitsProps) {
	const [isRefreshing, setIsRefreshing] = React.useState(false);
	const [lastRefresh, setLastRefresh] = React.useState(Date.now());
	const [localCounts, setLocalCounts] = React.useState({
		daily: dailyAdCount,
		weekly: weeklyAdCount,
	});
	const { toast } = useToast();

	const dailyAdLimit = getDailyLimit(accountType);
	const weeklyAdLimit = getWeeklyLimit(accountType);

	// Update local counts when props change
	useEffect(() => {
		console.log('UsageLimits: Props changed, updating local state:', {
			dailyAdCount,
			weeklyAdCount,
			hasCredits,
			accountType,
			dailyAdLimit,
			weeklyAdLimit,
			timestamp: new Date().toISOString(),
		});

		setLocalCounts({
			daily: dailyAdCount,
			weekly: weeklyAdCount,
		});
	}, [
		dailyAdCount,
		weeklyAdCount,
		hasCredits,
		accountType,
		dailyAdLimit,
		weeklyAdLimit,
	]);

	// Auto-refresh when component mounts to ensure we have fresh data
	useEffect(() => {
		const autoRefresh = async () => {
			console.log('UsageLimits: Auto-refreshing on mount...');
			try {
				await refreshLimits();
				setLastRefresh(Date.now());
				console.log('UsageLimits: Auto-refresh completed');
			} catch (error) {
				console.error('UsageLimits: Auto-refresh failed:', error);
			}
		};

		// Only auto-refresh if we haven't refreshed recently (within 5 seconds)
		const timeSinceLastRefresh = Date.now() - lastRefresh;
		if (timeSinceLastRefresh > 5000) {
			autoRefresh();
		}
	}, []); // Empty dependency array - run once on mount

	const handleRefresh = async () => {
		setIsRefreshing(true);
		try {
			console.log('UsageLimits: Manual refresh triggered');
			await refreshLimits();
			setLastRefresh(Date.now());
			toast({
				title: 'Limits Refreshed',
				description: 'Usage limits have been updated with latest data.',
			});
			console.log('UsageLimits: Manual refresh completed');
		} catch (error) {
			console.error('UsageLimits: Manual refresh failed:', error);
			toast({
				title: 'Refresh Failed',
				description: 'Could not refresh usage limits. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsRefreshing(false);
		}
	};

	const calculateProgress = () => {
		// Use local counts for immediate UI feedback
		const dailyProgress = Math.min(
			(localCounts.daily / dailyAdLimit) * 100,
			100
		);
		const weeklyProgress = Math.min(
			(localCounts.weekly / weeklyAdLimit) * 100,
			100
		);

		console.log('UsageLimits: Progress calculation:', {
			localCounts,
			dailyProgress: dailyProgress.toFixed(1),
			weeklyProgress: weeklyProgress.toFixed(1),
			dailyAdLimit,
			weeklyAdLimit,
			accountType,
		});

		return { dailyProgress, weeklyProgress };
	};

	const getProgressBarColor = () => {
		const { dailyProgress, weeklyProgress } = calculateProgress();
		const maxProgress = Math.max(dailyProgress, weeklyProgress);

		if (maxProgress >= 100) {
			return 'bg-red-500';
		} else if (maxProgress >= 90) {
			return 'bg-orange-500';
		} else if (maxProgress >= 70) {
			return 'bg-yellow-500';
		} else {
			return 'bg-green-500';
		}
	};

	const { dailyProgress, weeklyProgress } = calculateProgress();
	const progressBarColor = getProgressBarColor();

	// Visual warnings for limit status
	const isDailyLimitReached = localCounts.daily >= dailyAdLimit;
	const isWeeklyLimitReached = localCounts.weekly >= weeklyAdLimit;
	const isNearDailyLimit = localCounts.daily >= dailyAdLimit * 0.8;
	const isNearWeeklyLimit = localCounts.weekly >= weeklyAdLimit * 0.8;

	return (
		<div className='flex-shrink-0 mt-2 bg-slate-800/90 rounded-lg p-4 border border-slate-700/50'>
			{/* Header with Account Type and Credits */}
			<div className='flex justify-between items-center mb-3'>
				<span className='text-sm text-gray-300 font-medium'>
					{accountType.charAt(0).toUpperCase() + accountType.slice(1)} Account
				</span>
				<span
					className={`text-xs ${hasCredits ? 'text-green-400' : 'text-yellow-400'}`}>
					{hasCredits ? '✓ Credits OK' : '⚠ Add Credits'}
				</span>
			</div>

			{/* Weekly Usage Progress Bar */}
			<div className='flex justify-between items-center mb-2'>
				<span className='text-sm text-gray-300'>Weekly Usage</span>
				<span className='text-xs text-gray-400'>
					{localCounts.weekly}/{weeklyAdLimit}
				</span>
			</div>
			<div className='h-3 bg-slate-700/50 rounded-full overflow-hidden mb-1'>
				<div
					className={`h-full ${progressBarColor} transition-all duration-500 ease-out`}
					style={{ width: `${weeklyProgress}%` }}
				/>
			</div>
			<div className='text-xs text-gray-500 mb-3'>
				{weeklyProgress.toFixed(1)}% of weekly limit used
			</div>

			{/* Daily Usage Info */}
			<div className='mb-3'>
				<div className='flex justify-between items-center mb-1'>
					<span className='text-sm text-gray-300'>Daily Usage</span>
					<span className='text-xs text-gray-400'>
						{localCounts.daily}/{dailyAdLimit}
					</span>
				</div>
				<div className='h-2 bg-slate-700/50 rounded-full overflow-hidden'>
					<div
						className={`h-full ${progressBarColor} transition-all duration-500 ease-out`}
						style={{ width: `${dailyProgress}%` }}
					/>
				</div>
			</div>

			{/* Status Warnings */}
			{isDailyLimitReached && (
				<div className='mb-2 flex items-center text-red-400 text-xs'>
					<FiAlertCircle className='mr-1' size={12} />
					Daily limit reached - try again tomorrow
				</div>
			)}

			{isWeeklyLimitReached && (
				<div className='mb-2 flex items-center text-red-400 text-xs'>
					<FiAlertCircle className='mr-1' size={12} />
					Weekly limit reached
				</div>
			)}

			{!isDailyLimitReached && !isWeeklyLimitReached && isNearDailyLimit && (
				<div className='mb-2 flex items-center text-yellow-400 text-xs'>
					<FiAlertCircle className='mr-1' size={12} />
					Approaching daily limit
				</div>
			)}

			{!isWeeklyLimitReached && isNearWeeklyLimit && (
				<div className='mb-2 flex items-center text-yellow-400 text-xs'>
					<FiAlertCircle className='mr-1' size={12} />
					Approaching weekly limit
				</div>
			)}

			{/* Credits Warning */}
			{!hasCredits && (
				<div className='mb-3 flex items-center text-orange-400 text-xs bg-orange-400/10 p-2 rounded'>
					<FiAlertCircle className='mr-1' size={12} />
					Add credits to publish ads
				</div>
			)}

			{/* Refresh Button */}
			<button
				onClick={handleRefresh}
				disabled={isRefreshing}
				className='w-full mt-2 text-xs text-blue-400 hover:text-blue-300 disabled:text-gray-500 transition-colors flex items-center justify-center bg-slate-700/30 hover:bg-slate-700/50 rounded px-2 py-2'>
				<FiRefreshCw
					className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`}
					size={12}
				/>
				{isRefreshing ? 'Refreshing...' : 'Refresh Limits'}
			</button>

			{/* Last Updated Timestamp */}
			<div className='mt-2 text-xs text-gray-500 text-center'>
				Last updated: {new Date(lastRefresh).toLocaleTimeString()}
			</div>
		</div>
	);
}
