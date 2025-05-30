'use client';

import { Suspense, useState } from 'react';
import { Settings as SettingsIcon, Plus as PlusIcon } from 'lucide-react';
import { AdStudioProvider } from '@/app/lib/providers/ad-studio-provider';
import AdStudioCanvas from '@/app/components/dashboardUi/Adstudio/canvas/canvas';
import AdStudioToolbox from '@/app/components/dashboardUi/Adstudio/toolbox';
import ProjectSelector from '@/app/components/dashboardUi/Adstudio/projectSelector';
import RecentProjects from '@/app/components/dashboardUi/Adstudio/recentProjects';
import LoadingCanvas from '@/app/components/dashboardUi/Adstudio/loadingCanvas';
import { withAuth } from '@/app/components/auth/withAuth';

function AdStudioPage() {
	const [isConfigOpen, setIsConfigOpen] = useState(false);

	return (
		<div className='flex flex-col h-[calc(100vh-4rem)] bg-gray-900 text-gray-100 mt-10'>
			{/* Header */}
			<div className='flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50'>
				<div className='flex items-center gap-4'>
					<h1 className='text-xl md:text-2xl font-bold text-white'>
						Ad Studio
					</h1>
					<ProjectSelector />
				</div>
				<div className='flex items-center gap-4'>
					<button
						className='px-4 py-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2'
						onClick={() => setIsConfigOpen(!isConfigOpen)}>
						<SettingsIcon className='w-4 h-4' />
						{isConfigOpen ? 'Close Panel' : 'Open Config'}
					</button>
					<button className='px-4 py-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-md hover:from-emerald-600 hover:to-green-700 transition-all flex items-center gap-2'>
						<PlusIcon className='w-4 h-4' />
						New Project
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex flex-1 overflow-hidden relative'>
				{/* Left sidebar */}
				<div className='w-64 border-r border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-y-auto hidden md:block'>
					<AdStudioToolbox />
				</div>

				{/* Main Canvas Area with Recent Projects below */}
				<div className='flex-1 flex flex-col'>
					<div className='flex-1 overflow-auto relative'>
						<Suspense fallback={<LoadingCanvas />}>
							<AdStudioProvider>
								<AdStudioCanvas />
							</AdStudioProvider>
						</Suspense>
					</div>

					{/* Recent Projects Section */}
					<div className='p-4 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-sm'>
						<RecentProjects />
					</div>
				</div>

				{/* Right sidebar (Configuration Panel) */}
				{isConfigOpen && (
					<div className='w-64 border-l border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-y-auto'>
						<div className='p-4'>
							<h2 className='text-lg font-semibold text-white mb-4'>
								Configuration
							</h2>
							{/* Configuration options go here */}
							<div className='space-y-4'>
								<div className='bg-gray-700/50 p-3 rounded-lg'>
									<h3 className='text-sm font-medium text-gray-300'>
										Theme Settings
									</h3>
									<p className='text-xs text-gray-400'>
										Customize the appearance of your workspace.
									</p>
								</div>
								<div className='bg-gray-700/50 p-3 rounded-lg'>
									<h3 className='text-sm font-medium text-gray-300'>
										Export Options
									</h3>
									<p className='text-xs text-gray-400'>
										Set preferences for exporting your projects.
									</p>
								</div>
								<div className='bg-gray-700/50 p-3 rounded-lg'>
									<h3 className='text-sm font-medium text-gray-300'>
										Advanced Settings
									</h3>
									<p className='text-xs text-gray-400'>
										Configure advanced project settings.
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default withAuth(AdStudioPage);
