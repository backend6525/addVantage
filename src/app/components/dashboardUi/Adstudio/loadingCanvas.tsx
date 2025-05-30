// @/app/components/dashboardUi/Adstudio/loadingCanvas.tsx
// import React from 'react';

// const LoadingCanvas: React.FC = () => {
// 	return (
// 		<div className='w-full h-full flex flex-col items-center justify-center bg-background space-y-4'>
// 			<div className='relative w-24 h-24'>
// 				<div className='absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse' />
// 				<div className='absolute inset-4 border-4 border-primary/30 rounded-full animate-ping' />
// 				<div className='absolute inset-8 border-4 border-primary/40 rounded-full animate-spin' />
// 			</div>

// 			<div className='text-center space-y-2'>
// 				<h3 className='text-lg font-medium text-primary'>
// 					Initializing Workspace
// 				</h3>
// 				<p className='text-sm text-muted-foreground'>
// 					Loading your creative environment...
// 				</p>
// 			</div>

// 			{/* Progress indicator */}
// 			<div className='w-48 h-2 bg-accent rounded-full overflow-hidden'>
// 				<div
// 					className='h-full bg-primary transition-all duration-1000 ease-out'
// 					style={{ width: `${Math.min(90, Math.random() * 100)}%` }}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default LoadingCanvas;

'use client';
import React, { useState, useEffect } from 'react';
import { Loader2 as LoaderIcon } from 'lucide-react';

const LoadingCanvas: React.FC = () => {
	const [progress, setProgress] = useState(0);
	const [statusMessage, setStatusMessage] = useState('Initializing canvas');

	useEffect(() => {
		const messages = [
			'Initializing canvas',
			'Loading workspace tools',
			'Preparing node templates',
			'Configuring connections',
			'Syncing with cloud data',
			'Almost ready',
		];

		// Simulate loading progress
		const interval = setInterval(() => {
			setProgress((prev) => {
				const newProgress = prev + Math.random() * 15;
				if (newProgress >= 100) {
					clearInterval(interval);
					return 100;
				}
				return newProgress;
			});
		}, 500);

		// Update status messages periodically
		const messageInterval = setInterval(() => {
			setStatusMessage(
				messages[Math.floor((progress / 100) * messages.length)]
			);
		}, 1200);

		return () => {
			clearInterval(interval);
			clearInterval(messageInterval);
		};
	}, [progress]);

	return (
		<div className='w-full h-full flex flex-col items-center justify-center bg-gray-900 space-y-6'>
			{/* Animated logo/loader */}
			<div className='relative w-24 h-24'>
				<div className='absolute inset-0 border-4 border-blue-500/10 rounded-full' />
				<div
					className='absolute inset-0 border-4 border-blue-500/20 rounded-full animate-ping opacity-75'
					style={{ animationDuration: '3s' }}
				/>
				<div
					className='absolute inset-2 border-4 border-blue-600/30 rounded-full animate-pulse'
					style={{ animationDuration: '2s' }}
				/>
				<div
					className='absolute inset-4 border-4 border-blue-700/40 rounded-full animate-spin'
					style={{ animationDuration: '4s' }}
				/>
				<div
					className='absolute inset-6 border-4 border-indigo-600/50 rounded-full animate-ping'
					style={{ animationDuration: '2.5s' }}
				/>
				<div className='absolute inset-0 flex items-center justify-center'>
					<LoaderIcon className='h-8 w-8 text-blue-400 animate-spin' />
				</div>
			</div>

			{/* Status text */}
			<div className='text-center space-y-2'>
				<h3 className='text-lg font-medium text-gray-100'>{statusMessage}</h3>
				<p className='text-sm text-gray-400'>
					Preparing your creative environment...
				</p>
			</div>

			{/* Progress bar */}
			<div className='w-64 h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50'>
				<div
					className='h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out'
					style={{ width: `${Math.min(98, progress)}%` }}
				/>
			</div>

			{/* Loading tasks */}
			<div className='flex flex-col items-center space-y-1 mt-4'>
				<div className='flex items-center space-x-2 text-xs text-gray-400'>
					<div
						className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-green-500' : 'bg-gray-600 animate-pulse'}`}
					/>
					<span className={progress > 20 ? 'text-gray-300' : 'text-gray-500'}>
						Initializing workspace
					</span>
				</div>
				<div className='flex items-center space-x-2 text-xs text-gray-400'>
					<div
						className={`w-2 h-2 rounded-full ${progress > 40 ? 'bg-green-500' : 'bg-gray-600 animate-pulse'}`}
					/>
					<span className={progress > 40 ? 'text-gray-300' : 'text-gray-500'}>
						Loading node templates
					</span>
				</div>
				<div className='flex items-center space-x-2 text-xs text-gray-400'>
					<div
						className={`w-2 h-2 rounded-full ${progress > 60 ? 'bg-green-500' : 'bg-gray-600 animate-pulse'}`}
					/>
					<span className={progress > 60 ? 'text-gray-300' : 'text-gray-500'}>
						Configuring canvas tools
					</span>
				</div>
				<div className='flex items-center space-x-2 text-xs text-gray-400'>
					<div
						className={`w-2 h-2 rounded-full ${progress > 80 ? 'bg-green-500' : 'bg-gray-600 animate-pulse'}`}
					/>
					<span className={progress > 80 ? 'text-gray-300' : 'text-gray-500'}>
						Syncing with cloud storage
					</span>
				</div>
			</div>

			{/* Tip */}
			<div className='mt-8 p-3 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50 max-w-sm'>
				<p className='text-xs text-gray-400 text-center'>
					<span className='text-blue-400 font-medium'>Tip:</span> Connect nodes
					by dragging from output handles to input handles for a seamless
					workflow
				</p>
			</div>
		</div>
	);
};

export default LoadingCanvas;
