'use client';

import { useState } from 'react';
import { Clock, Search, ChevronDown, ChevronRight } from 'lucide-react';

export default function ScheduledView() {
	const [scheduled, setScheduled] = useState([
		{
			id: '1',
			date: '2023-05-20',
			time: '09:00 AM',
			message: 'Weekly promotion: 20% off all products',
			recipients: 124,
			status: 'Pending',
		},
		// Add more scheduled items
	]);

	return (
		<div className='bg-slate-800/90 rounded-lg p-6 border border-slate-700/50'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-semibold text-white'>Scheduled Messages</h2>
				<div className='flex space-x-3'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<input
							type='text'
							placeholder='Search scheduled...'
							className='bg-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500/50'
						/>
					</div>
					<button className='flex items-center space-x-2 bg-slate-700/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-slate-600/50'>
						<ChevronDown className='h-4 w-4' />
						<span>Filter</span>
					</button>
				</div>
			</div>

			<div className='space-y-4'>
				{scheduled.map((item) => (
					<div
						key={item.id}
						className='bg-slate-700/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/30 transition-colors'>
						<div className='flex items-center justify-between'>
							<div>
								<h3 className='font-medium text-white'>{item.message}</h3>
								<p className='text-sm text-gray-400 mt-1'>
									Scheduled for {item.date} at {item.time}
								</p>
							</div>
							<div className='flex items-center space-x-4'>
								<div className='text-sm'>
									<span className='text-gray-300'>{item.recipients}</span>
									<span className='text-gray-500 ml-1'>recipients</span>
								</div>
								<span
									className={`px-2 py-1 rounded text-xs ${
										item.status === 'Pending'
											? 'bg-yellow-600/20 text-yellow-400'
											: 'bg-blue-600/20 text-blue-400'
									}`}>
									{item.status}
								</span>
								<button className='text-purple-400 hover:text-purple-300'>
									<ChevronRight className='h-5 w-5' />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
