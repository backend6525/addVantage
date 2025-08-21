'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MousePointer, Percent, Activity, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
	loading: boolean;
	totalViews: number;
	totalClicks: number;
	averageCTR: string;
	bestPerformingAd?: {
		title: string;
	};
}

const StatCardSkeleton = () => (
	<motion.div
		className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 animate-pulse'
		initial={{ opacity: 0.5 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1.5, repeat: Infinity }}>
		<div className='flex justify-between items-start mb-3'>
			<div className='bg-slate-700/50 p-2 rounded-lg w-8 h-8' />
			<div className='bg-slate-700/50 w-12 h-3 rounded' />
		</div>
		<div className='bg-slate-700/50 w-3/4 h-6 rounded mb-2' />
		<div className='bg-slate-700/50 w-1/2 h-3 rounded' />
	</motion.div>
);

export const DashboardStats: React.FC<DashboardStatsProps> = ({
	loading,
	totalViews,
	totalClicks,
	averageCTR,
	bestPerformingAd,
}) => {
	if (loading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4'>
				{Array(4)
					.fill(0)
					.map((_, i) => (
						<StatCardSkeleton key={i} />
					))}
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4'>
			{/* Views Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group hover:shadow-purple-500/20 transition-shadow'>
				<div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
				<div className='flex justify-between items-start mb-2 md:mb-3'>
					<div className='bg-purple-500/20 p-2 rounded-lg'>
						<Eye className='h-4 w-4 md:h-5 md:w-5 text-purple-400' />
					</div>
					<span className='text-xs text-gray-400 flex items-center gap-1'>
						<TrendingUp className='h-3 w-3 text-green-400' />
						+12.5%
					</span>
				</div>
				<h3 className='text-xl md:text-2xl font-bold text-white'>
					{totalViews.toLocaleString()}
				</h3>
				<p className='text-xs md:text-sm text-gray-400'>Total Views</p>
				<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
			</motion.div>

			{/* Clicks Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.1 }}
				className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group hover:shadow-blue-500/20 transition-shadow'>
				<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
				<div className='flex justify-between items-start mb-2 md:mb-3'>
					<div className='bg-blue-500/20 p-2 rounded-lg'>
						<MousePointer className='h-4 w-4 md:h-5 md:w-5 text-blue-400' />
					</div>
					<span className='text-xs text-gray-400 flex items-center gap-1'>
						<TrendingUp className='h-3 w-3 text-green-400' />
						+8.3%
					</span>
				</div>
				<h3 className='text-xl md:text-2xl font-bold text-white'>
					{totalClicks.toLocaleString()}
				</h3>
				<p className='text-xs md:text-sm text-gray-400'>Total Clicks</p>
				<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
			</motion.div>

			{/* CTR Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.2 }}
				className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group hover:shadow-green-500/20 transition-shadow'>
				<div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
				<div className='flex justify-between items-start mb-2 md:mb-3'>
					<div className='bg-green-500/20 p-2 rounded-lg'>
						<Percent className='h-4 w-4 md:h-5 md:w-5 text-green-400' />
					</div>
					<span className='text-xs text-gray-400 flex items-center gap-1'>
						<TrendingUp className='h-3 w-3 text-green-400' />
						+2.1%
					</span>
				</div>
				<h3 className='text-xl md:text-2xl font-bold text-white'>
					{averageCTR}%
				</h3>
				<p className='text-xs md:text-sm text-gray-400'>Average CTR</p>
				<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
			</motion.div>

			{/* Best Performing Ad Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.3 }}
				className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group hover:shadow-amber-500/20 transition-shadow'>
				<div className='absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
				<div className='flex justify-between items-start mb-2 md:mb-3'>
					<div className='bg-amber-500/20 p-2 rounded-lg'>
						<Activity className='h-4 w-4 md:h-5 md:w-5 text-amber-400' />
					</div>
					<span className='text-xs text-gray-400'>
						{bestPerformingAd ? 'Top Performer' : 'No data'}
					</span>
				</div>
				<h3 className='text-base md:text-lg font-bold text-white truncate'>
					{bestPerformingAd?.title || 'No data'}
				</h3>
				<p className='text-xs md:text-sm text-gray-400'>Top Performing Ad</p>
				<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
			</motion.div>
		</div>
	);
};
