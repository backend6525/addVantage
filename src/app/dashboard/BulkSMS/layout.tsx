'use client';

import { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	Settings,
	HelpCircle,
	ChevronLeft,
	ChevronRight,
	MessageSquare,
	History,
	LayoutTemplate,
	Users,
	Clock,
} from 'lucide-react';
import { ViewTabContext } from './context/ViewTabContext';

interface BulkSMSLayoutProps {
	children: React.ReactNode;
}

export default function BulkSMSLayout({ children }: BulkSMSLayoutProps) {
	const { user, isLoading } = useKindeBrowserClient();
	const router = useRouter();
	const [viewTab, setViewTab] = useState<
		'compose' | 'templates' | 'history' | 'contacts' | 'schedule'
	>('compose');

	useEffect(() => {
		if (!isLoading && !user) {
			router.push('/auth/signin');
		}
	}, [isLoading, user, router]);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				Loading...
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<ViewTabContext.Provider value={{ viewTab, setViewTab }}>
			<div className='flex h-screen bg-slate-800/70'>
				{/* Main Content Area */}
				<div className='flex-1 flex flex-col'>
					{/* Header */}
					<div className='p-4 border-b border-slate-700/50 bg-slate-800/90'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-4'>
								<h1 className='text-xl font-semibold text-white'>Bulk SMS</h1>
							</div>
							<div className='flex items-center space-x-2'>
								<button className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'>
									<Settings className='h-5 w-5' />
								</button>
								<button className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'>
									<HelpCircle className='h-5 w-5' />
								</button>
							</div>
						</div>

						{/* Navigation Tabs */}
						<div className='flex space-x-4 mt-4 overflow-x-auto'>
							<button
								onClick={() => setViewTab('compose')}
								className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors min-w-fit ${
									viewTab === 'compose'
										? 'bg-purple-600 text-white'
										: 'text-gray-400 hover:text-white hover:bg-slate-700/50'
								}`}>
								<MessageSquare className='h-4 w-4' />
								<span>Compose</span>
							</button>
							<button
								onClick={() => setViewTab('contacts')}
								className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors min-w-fit ${
									viewTab === 'contacts'
										? 'bg-purple-600 text-white'
										: 'text-gray-400 hover:text-white hover:bg-slate-700/50'
								}`}>
								<Users className='h-4 w-4' />
								<span>Contacts</span>
							</button>
							<button
								onClick={() => setViewTab('templates')}
								className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors min-w-fit ${
									viewTab === 'templates'
										? 'bg-purple-600 text-white'
										: 'text-gray-400 hover:text-white hover:bg-slate-700/50'
								}`}>
								<LayoutTemplate className='h-4 w-4' />
								<span>Templates</span>
							</button>
							<button
								onClick={() => setViewTab('history')}
								className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors min-w-fit ${
									viewTab === 'history'
										? 'bg-purple-600 text-white'
										: 'text-gray-400 hover:text-white hover:bg-slate-700/50'
								}`}>
								<History className='h-4 w-4' />
								<span>History</span>
							</button>
							<button
								onClick={() => setViewTab('schedule')}
								className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors min-w-fit ${
									viewTab === 'schedule'
										? 'bg-purple-600 text-white'
										: 'text-gray-400 hover:text-white hover:bg-slate-700/50'
								}`}>
								<Clock className='h-4 w-4' />
								<span>Scheduled</span>
							</button>
						</div>
					</div>

					{/* Content Area */}
					<div className='flex-1 overflow-auto p-6'>{children}</div>
				</div>
			</div>
		</ViewTabContext.Provider>
	);
}
