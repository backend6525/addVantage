'use client';

import React, { useState, useMemo } from 'react';
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

export default function TasksPage() {
	const [activeView, setActiveView] = useState('board');
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilters, setSelectedFilters] = useState({
		priority: [],
		status: [],
		assignees: [],
	});

	const views = [
		{
			name: 'board',
			label: 'Board View',
			icon: <Columns className='mr-2 h-4 w-4' />,
		},
		{
			name: 'list',
			label: 'List View',
			icon: <List className='mr-2 h-4 w-4' />,
		},
		{
			name: 'calendar',
			label: 'Calendar',
			icon: <Calendar className='mr-2 h-4 w-4' />,
		},
	];

	const stats = [
		{
			label: 'Total Tasks',
			value: 24,
			color: 'text-gray-900 dark:text-white',
			icon: <BarChart2 className='text-gray-400 h-5 w-5' />,
			trend: 'up',
		},
		{
			label: 'In Progress',
			value: 8,
			color: 'text-blue-600',
			icon: <RefreshCw className='text-blue-400 h-5 w-5' />,
			trend: 'up',
		},
		{
			label: 'Completed',
			value: 12,
			color: 'text-green-600',
			icon: <RefreshCw className='text-green-400 h-5 w-5' />,
			trend: 'up',
		},
		{
			label: 'Overdue',
			value: 4,
			color: 'text-red-600',
			icon: <RefreshCw className='text-red-400 h-5 w-5' />,
			trend: 'down',
		},
	];

	const filterOptions = {
		priority: ['High', 'Medium', 'Low'],
		status: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
		assignees: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown'],
	};

	const renderFilterPopover = () => (
		<Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
			<PopoverContent className='w-96 p-4 space-y-4'>
				<div>
					<h4 className='text-lg font-semibold mb-2 flex items-center'>
						<Tag className='mr-2 h-5 w-5 text-gray-500' />
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
									className='text-sm font-medium'>
									{priority} Priority
								</label>
							</div>
						))}
					</div>
				</div>

				<div>
					<h4 className='text-lg font-semibold mb-2 flex items-center'>
						<Users className='mr-2 h-5 w-5 text-gray-500' />
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
									className='text-sm font-medium'>
									{assignee}
								</label>
							</div>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);

	return (
		<div className='h-full min-h-screen bg-gray-50 dark:bg-gray-900'>
			<div className='container mx-auto px-4 py-12'>
				{/* Header with Advanced Actions */}
				<div className='mb-8'>
					<div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
						<div>
							<div className='flex items-center space-x-4'>
								<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
									Task Management
								</h1>
								<div className='bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm'>
									Pro Workspace
								</div>
							</div>
							<p className='text-gray-500 dark:text-gray-400 max-w-xl'>
								Streamline your workflow with intelligent task management and
								collaboration tools.
							</p>
						</div>

						<div className='flex items-center space-x-4'>
							{/* Search */}
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4' />
								<Input
									placeholder='Search tasks...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pl-10 w-64'
								/>
							</div>
						</div>
					</div>

					{/* Enhanced Stats Grid */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
						{stats.map((stat) => (
							<div
								key={stat.label}
								className='
                  bg-white dark:bg-gray-800 
                  p-4 rounded-lg shadow-md 
                  hover:shadow-lg transition-shadow 
                  flex items-center gap-4
                  group cursor-pointer
                '>
								<div
									className='
                  bg-gray-100 dark:bg-gray-700 
                  p-3 rounded-full 
                  group-hover:bg-purple-100 
                  transition-colors
                '>
									{stat.icon}
								</div>
								<div className='flex-grow'>
									<p className='text-gray-500 dark:text-gray-400 text-sm mb-1'>
										{stat.label}
									</p>
									<div className='flex items-center'>
										<h3 className={`text-2xl font-bold ${stat.color} mr-2`}>
											{stat.value}
										</h3>
										<span
											className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${
													stat.trend === 'up'
														? 'bg-green-100 text-green-600'
														: 'bg-red-100 text-red-600'
												}
                      `}>
											{stat.trend === 'up' ? '▲' : '▼'} 5%
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* View Options with Filters */}
				<div className='flex justify-between items-center mb-6'>
					<div className='flex flex-wrap gap-2'>
						{views.map((view) => (
							<Button
								key={view.name}
								onClick={() => setActiveView(view.name)}
								className={`
                  flex items-center
                  ${
										activeView === view.name
											? 'bg-purple-50 text-purple-600 dark:bg-gray-800'
											: 'text-gray-600 hover:text-purple-600 dark:text-gray-400 hover:bg-gray-100'
									}
                  transition-colors
                `}>
								{view.icon}
								{view.label}
							</Button>
						))}
					</div>

					{/* Filters and Sort */}
					<div className='flex items-center space-x-3'>
						{renderFilterPopover()}
						<Button variant='outline' className='flex items-center'>
							Sort By
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				</div>

				{/* Kanban Board with Enhanced Container */}
				<div
					className='
          bg-white dark:bg-gray-800 
          rounded-lg shadow-lg 
          overflow-hidden 
          border border-gray-200 
          dark:border-gray-700
        '>
					<div className='overflow-x-auto'>
						<div className='min-w-[1024px]'>
							<KanbanBoard />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
