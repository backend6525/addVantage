'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { withAuth } from '@/app/components/auth/withAuth';
import { KanbanBoard } from '@/app/components/dashboardUi/Tasks/KanbanBoard';
import Button from '@/app/components/ui/Button/Button';
import {
	Plus,
	Filter,
	Columns,
	List,
	Calendar,
	BarChart2,
	RefreshCw,
	Search,
	ChevronDown,
	Bell,
	Users,
	Tag,
	Settings,
	LayoutGrid,
	Clock,
	CheckCircle,
	AlertTriangle,
	ChevronRight,
	Menu,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

function TasksPage() {
	const [activeView, setActiveView] = useState('board');
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isConfigOpen, setIsConfigOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState({
		priority: [],
		status: [],
		assignees: [],
	});

	const views = [
		{
			name: 'board',
			label: 'Board View',
			icon: <Columns className='h-4 w-4' />,
		},
		{
			name: 'list',
			label: 'List View',
			icon: <List className='h-4 w-4' />,
		},
		{
			name: 'calendar',
			label: 'Calendar',
			icon: <Calendar className='h-4 w-4' />,
		},
	];

	const stats = [
		{
			label: 'Total Tasks',
			value: 24,
			color: 'text-gray-900 dark:text-white',
			icon: <LayoutGrid className='text-gray-400 h-5 w-5' />,
			trend: 'up',
			percentage: 5,
		},
		{
			label: 'In Progress',
			value: 8,
			color: 'text-blue-600',
			icon: <Clock className='text-blue-400 h-5 w-5' />,
			trend: 'up',
			percentage: 8,
		},
		{
			label: 'Completed',
			value: 12,
			color: 'text-green-600',
			icon: <CheckCircle className='text-green-400 h-5 w-5' />,
			trend: 'up',
			percentage: 12,
		},
		{
			label: 'Overdue',
			value: 4,
			color: 'text-red-600',
			icon: <AlertTriangle className='text-red-400 h-5 w-5' />,
			trend: 'down',
			percentage: 2,
		},
	];

	const filterOptions = {
		priority: ['High', 'Medium', 'Low'],
		status: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
		assignees: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown'],
	};

	const workspaces = [
		{ id: 1, name: 'Marketing Campaign', tasks: 12 },
		{ id: 2, name: 'Product Launch', tasks: 8 },
		{ id: 3, name: 'Website Redesign', tasks: 15 },
	];

	const renderSidebar = () => (
		<div className='w-64 border-r border-slate-700/50 bg-slate-800/70 overflow-y-auto h-full'>
			<div className='p-4'>
				<h2 className='text-lg font-semibold text-white mb-6'>Workspaces</h2>

				<div className='space-y-2'>
					{workspaces.map((workspace) => (
						<div
							key={workspace.id}
							className='flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer group transition-colors'>
							<div className='flex items-center'>
								<div className='w-3 h-3 rounded-full bg-purple-500 mr-3'></div>
								<span className='text-gray-300'>{workspace.name}</span>
							</div>
							<div className='bg-slate-700/50 px-2 py-0.5 rounded-full text-xs text-gray-300'>
								{workspace.tasks}
							</div>
						</div>
					))}
				</div>

				<div className='mt-4 pt-4 border-t border-slate-700/50'>
					<Button className='w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white'>
						<Plus className='h-4 w-4' />
						New Workspace
					</Button>
				</div>

				<div className='mt-8'>
					<h3 className='text-sm font-medium text-gray-400 mb-4'>FILTERS</h3>

					<div className='space-y-4'>
						<div>
							<h4 className='text-sm font-semibold mb-2 flex items-center text-gray-300'>
								<Tag className='mr-2 h-4 w-4 text-gray-400' />
								Priority
							</h4>
							{filterOptions.priority.map((priority) => (
								<div
									key={priority}
									className='flex items-center space-x-2 mb-2'>
									<Checkbox
										id={`sidebar-priority-${priority}`}
										checked={selectedFilters.priority.includes(priority)}
										onCheckedChange={(checked) => {
											setSelectedFilters((prev) => ({
												...prev,
												priority: checked
													? [...prev.priority, priority]
													: prev.priority.filter((p) => p !== priority),
											}));
										}}
									/>
									<label
										htmlFor={`sidebar-priority-${priority}`}
										className='text-sm text-gray-300'>
										{priority}
									</label>
								</div>
							))}
						</div>

						<div>
							<h4 className='text-sm font-semibold mb-2 flex items-center text-gray-300'>
								<Users className='mr-2 h-4 w-4 text-gray-400' />
								Team Members
							</h4>
							<div className='flex flex-col space-y-2'>
								{filterOptions.assignees.slice(0, 3).map((assignee) => (
									<div key={assignee} className='flex items-center gap-2'>
										<Avatar className='h-6 w-6'>
											<AvatarFallback className='bg-purple-200 text-purple-800 text-xs'>
												{assignee
													.split(' ')
													.map((n) => n[0])
													.join('')}
											</AvatarFallback>
										</Avatar>
										<span className='text-sm text-gray-300'>{assignee}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderFilterPopover = () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center bg-slate-800/70 border-slate-700/50 text-gray-300 hover:bg-slate-700/50'>
					<Filter className='mr-2 h-4 w-4' />
					Filters
					{Object.values(selectedFilters).some((arr) => arr.length > 0) && (
						<span className='ml-2 bg-purple-900/20 text-purple-400 px-2 py-0.5 rounded-full text-xs'>
							{Object.values(selectedFilters).flat().length}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-96 p-4 space-y-4 bg-gray-900/95 border border-slate-700/50 shadow-xl backdrop-blur-sm'>
				<div>
					<h4 className='text-lg font-semibold mb-2 flex items-center text-white'>
						<Tag className='mr-2 h-5 w-5 text-gray-400' />
						Priority
					</h4>
					<div className='space-y-2'>
						{filterOptions.priority.map((priority) => (
							<div key={priority} className='flex items-center space-x-2'>
								<Checkbox
									id={`priority-${priority}`}
									checked={selectedFilters.priority.includes(priority)}
									onCheckedChange={(checked) => {
										setSelectedFilters((prev) => ({
											...prev,
											priority: checked
												? [...prev.priority, priority]
												: prev.priority.filter((p) => p !== priority),
										}));
									}}
								/>
								<label
									htmlFor={`priority-${priority}`}
									className='text-sm font-medium text-gray-300'>
									{priority} Priority
								</label>
							</div>
						))}
					</div>
				</div>

				<div>
					<h4 className='text-lg font-semibold mb-2 flex items-center text-white'>
						<Users className='mr-2 h-5 w-5 text-gray-400' />
						Assignees
					</h4>
					<div className='space-y-2'>
						{filterOptions.assignees.map((assignee) => (
							<div key={assignee} className='flex items-center space-x-2'>
								<Checkbox
									id={`assignee-${assignee}`}
									checked={selectedFilters.assignees.includes(assignee)}
									onCheckedChange={(checked) => {
										setSelectedFilters((prev) => ({
											...prev,
											assignees: checked
												? [...prev.assignees, assignee]
												: prev.assignees.filter((a) => a !== assignee),
										}));
									}}
								/>
								<label
									htmlFor={`assignee-${assignee}`}
									className='text-sm font-medium text-gray-300'>
									{assignee}
								</label>
							</div>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);

	const renderConfigPanel = () => (
		<div className='w-64 border-l border-slate-700/50 bg-slate-800/70 overflow-y-auto h-full'>
			<div className='p-4'>
				<h2 className='text-lg font-semibold text-white mb-4'>Task Settings</h2>
				<div className='space-y-4'>
					<div className='bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition-colors'>
						<h3 className='text-sm font-medium text-gray-300'>View Options</h3>
						<p className='text-xs text-gray-400'>
							Configure how your tasks are displayed.
						</p>
					</div>
					<div className='bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition-colors'>
						<h3 className='text-sm font-medium text-gray-300'>
							Automation Rules
						</h3>
						<p className='text-xs text-gray-400'>
							Set up workflows and automations.
						</p>
					</div>
					<div className='bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition-colors'>
						<h3 className='text-sm font-medium text-gray-300'>Notifications</h3>
						<p className='text-xs text-gray-400'>
							Manage task notifications and alerts.
						</p>
					</div>
					<div className='bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition-colors'>
						<h3 className='text-sm font-medium text-gray-300'>
							Integration Settings
						</h3>
						<p className='text-xs text-gray-400'>
							Connect with calendar, email and more.
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className='flex flex-col h-[calc(100vh-4rem)] bg-gray-900 mt-16 pt-16'>
			{/* Header */}
			<div className='flex items-center justify-between p-6 pb-8 border-b border-slate-700/50 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50'>
				<div className='flex items-center gap-4'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='md:hidden text-gray-300 hover:text-white'>
						<Menu className='h-5 w-5' />
					</Button>

					<h1 className='text-xl md:text-2xl font-bold text-white'>
						Task Management
					</h1>
					<div className='bg-purple-900/20 text-purple-400 px-3 py-1 rounded-full text-sm'>
						Pro Workspace
					</div>
				</div>

				<div className='flex items-center gap-4'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4' />
						<Input
							placeholder='Search tasks...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='pl-10 w-64 bg-slate-800/70 border-slate-700/50 text-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/30'
						/>
					</div>

					<Button
						variant='outline'
						className='px-4 py-2 border-slate-700/50 bg-slate-800/70 text-gray-300 hover:bg-slate-700/50'
						onClick={() => setIsConfigOpen(!isConfigOpen)}>
						<Settings className='mr-2 h-4 w-4' />
						{isConfigOpen ? 'Close Settings' : 'Settings'}
					</Button>

					<Button className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2'>
						<Plus className='h-4 w-4' />
						New Task
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex flex-1 overflow-hidden'>
				{/* Left Sidebar */}
				{isSidebarOpen && (
					<div className='hidden md:block'>{renderSidebar()}</div>
				)}

				{/* Main Content Area */}
				<div className='flex-1 flex flex-col overflow-hidden'>
					{/* Stats Grid */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4'>
						{stats.map((stat) => (
							<div
								key={stat.label}
								className='bg-slate-800/70 p-4 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-4 group cursor-pointer'>
								<div className='bg-slate-700/50 p-3 rounded-full group-hover:bg-purple-900/20 transition-colors'>
									{stat.icon}
								</div>
								<div className='flex-grow'>
									<p className='text-gray-400 text-sm mb-1'>{stat.label}</p>
									<div className='flex items-center'>
										<h3 className='text-2xl font-bold text-white mr-2'>
											{stat.value}
										</h3>
										<span
											className={`text-xs px-2 py-0.5 rounded-full ${
												stat.trend === 'up'
													? 'bg-green-900/20 text-green-400'
													: 'bg-red-900/20 text-red-400'
											}`}>
											{stat.trend === 'up' ? '▲' : '▼'} {stat.percentage}%
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* View Options with Filters */}
					<div className='flex flex-wrap items-center justify-between p-4 gap-4 bg-slate-800/30'>
						<div className='flex flex-wrap gap-2'>
							{views.map((view) => (
								<Button
									key={view.name}
									onClick={() => setActiveView(view.name)}
									className={`flex items-center gap-2 ${
										activeView === view.name
											? 'bg-purple-900/20 text-purple-400'
											: 'text-gray-400 hover:text-purple-400 hover:bg-slate-700/50'
									} transition-colors`}>
									{view.icon}
									{view.label}
								</Button>
							))}
						</div>

						{/* Filters and Sort */}
						<div className='flex items-center space-x-3'>
							{renderFilterPopover()}
							<Button
								variant='outline'
								className='flex items-center bg-slate-800/70 border-slate-700/50 text-gray-300 hover:bg-slate-700/50'>
								Sort By
								<ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</div>
					</div>

					{/* Kanban Board Container */}
					<div className='flex-1 overflow-auto p-4'>
						<div className='bg-slate-800/70 rounded-lg border border-slate-700/50 h-full overflow-hidden'>
							<Suspense
								fallback={
									<div className='p-8 text-center text-gray-400'>
										Loading tasks...
									</div>
								}>
								<div className='overflow-x-auto h-full'>
									<div className='min-w-[1024px] h-full'>
										<KanbanBoard />
									</div>
								</div>
							</Suspense>
						</div>
					</div>
				</div>

				{/* Right Config Panel */}
				{isConfigOpen && renderConfigPanel()}
			</div>
		</div>
	);
}

export default withAuth(TasksPage);
