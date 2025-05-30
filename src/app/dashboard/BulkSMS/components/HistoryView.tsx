'use client';

import { useState } from 'react';
import { History, Search, Filter, ChevronDown } from 'lucide-react';

export default function HistoryView() {
	const [history, setHistory] = useState([
		{
			id: '1',
			date: '2023-05-15',
			recipients: 58,
			delivered: 56,
			failed: 2,
			message: 'March Flash Sale: 30% off all products until Sunday!',
			status: 'Delivered',
			category: 'Promotion',
		},
		// Add more history items
	]);

	return (
		<div className='bg-slate-800/90 rounded-lg p-6 border border-slate-700/50'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-semibold text-white'>Message History</h2>
				<div className='flex space-x-3'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<input
							type='text'
							placeholder='Search history...'
							className='bg-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500/50'
						/>
					</div>
					<button className='flex items-center space-x-2 bg-slate-700/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-slate-600/50'>
						<Filter className='h-4 w-4' />
						<span>Filter</span>
						<ChevronDown className='h-4 w-4' />
					</button>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='w-full text-sm text-left text-gray-400'>
					<thead className='text-xs text-gray-300 border-b border-slate-700/50'>
						<tr>
							<th className='px-6 py-3'>Date</th>
							<th className='px-6 py-3'>Message</th>
							<th className='px-6 py-3'>Recipients</th>
							<th className='px-6 py-3'>Status</th>
							<th className='px-6 py-3'>Category</th>
							<th className='px-6 py-3'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{history.map((item) => (
							<tr
								key={item.id}
								className='border-b border-slate-700/50 hover:bg-slate-700/30'>
								<td className='px-6 py-4'>{item.date}</td>
								<td className='px-6 py-4 max-w-xs truncate'>{item.message}</td>
								<td className='px-6 py-4'>
									<div className='flex items-center space-x-2'>
										<span>{item.recipients}</span>
										<span className='text-xs text-gray-500'>
											({item.delivered}✓ {item.failed}✗)
										</span>
									</div>
								</td>
								<td className='px-6 py-4'>
									<span
										className={`px-2 py-1 rounded text-xs ${
											item.status === 'Delivered'
												? 'bg-green-600/20 text-green-400'
												: item.status === 'Partial'
													? 'bg-yellow-600/20 text-yellow-400'
													: 'bg-red-600/20 text-red-400'
										}`}>
										{item.status}
									</span>
								</td>
								<td className='px-6 py-4'>
									<span className='text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded'>
										{item.category}
									</span>
								</td>
								<td className='px-6 py-4'>
									<button className='text-purple-400 hover:text-purple-300 text-sm'>
										View Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
