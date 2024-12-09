// 'use client';

// import React from 'react';

// interface OnlineStatusProps {
// 	isOnline: boolean;
// 	isOwner: boolean;
// 	resourceId: string;
// 	resourceType: 'product' | 'publisher' | 'user'; // extend as needed
// 	onStatusChange?: (status: boolean) => void;
// }

// const OnlineStatus = ({
// 	isOnline,
// 	isOwner,
// 	resourceId,
// 	resourceType,
// 	onStatusChange,
// }: OnlineStatusProps) => {
// 	const handleStatusChange = async (checked: boolean) => {
// 		try {
// 			const response = await fetch(
// 				`/api/${resourceType}/${resourceId}/status`,
// 				{
// 					method: 'PATCH',
// 					headers: {
// 						'Content-Type': 'application/json',
// 					},
// 					body: JSON.stringify({ isOnline: checked }),
// 				}
// 			);

// 			if (!response.ok) throw new Error('Failed to update status');

// 			onStatusChange?.(checked);
// 			alert(`Status is now ${checked ? 'online' : 'offline'}`);
// 		} catch (err) {
// 			console.error('Error updating status:', err);
// 			alert('Failed to update status');
// 		}
// 	};

// 	return (
// 		<div className='flex items-center gap-2'>
// 			{isOwner ? (
// 				<>
// 					<input
// 						type='checkbox'
// 						checked={isOnline}
// 						onChange={(e) => handleStatusChange(e.target.checked)}
// 						className='toggle-checkbox'
// 					/>
// 					<span
// 						className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
// 						{isOnline ? 'Online' : 'Offline'}
// 					</span>
// 				</>
// 			) : (
// 				<div
// 					className={`text-sm flex items-center gap-1 ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
// 					<span className='w-2 h-2 rounded-full bg-current' />
// 					{isOnline ? 'Online' : 'Offline'}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default OnlineStatus;
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OnlineStatusProps {
	isOnline: boolean;
	isOwner: boolean;
	resourceId: string;
	resourceType: 'product' | 'publisher' | 'user';
	onStatusChange?: (status: boolean) => void;
}

const OnlineStatus = ({
	isOnline,
	isOwner,
	resourceId,
	resourceType,
	onStatusChange,
}: OnlineStatusProps) => {
	const handleStatusChange = async (checked: boolean) => {
		try {
			const response = await fetch(
				`/api/${resourceType}/${resourceId}/status`,
				{
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ isOnline: checked }),
				}
			);

			if (!response.ok) throw new Error('Failed to update status');
			onStatusChange?.(checked);
		} catch (err) {
			console.error('Error updating status:', err);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10'>
			{isOwner ? (
				<>
					<button
						onClick={() => handleStatusChange(!isOnline)}
						className={`
                            relative inline-flex h-5 w-10 items-center rounded-full
                            ${isOnline ? 'bg-green-500' : 'bg-gray-600'}
                            transition-colors duration-300
                        `}>
						<span
							className={`
                                inline-block h-4 w-4 transform rounded-full bg-white
                                transition-transform duration-300
                                ${isOnline ? 'translate-x-5' : 'translate-x-1'}
                            `}
						/>
					</button>
					<span
						className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
						{isOnline ? 'Online' : 'Offline'}
					</span>
				</>
			) : (
				<div className='flex items-center gap-2'>
					<span
						className={`
                        h-2.5 w-2.5 rounded-full
                        ${isOnline ? 'bg-green-500' : 'bg-gray-500'}
                        ${isOnline ? 'animate-pulse' : ''}
                    `}
					/>
					<span
						className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
						{isOnline ? 'Online' : 'Offline'}
					</span>
				</div>
			)}
		</motion.div>
	);
};

export default OnlineStatus;
