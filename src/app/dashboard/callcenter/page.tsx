'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Phone,
	Users,
	BarChart3,
	Plus,
	Settings,
	AlertCircle,
	Bell,
	Filter,
	Clock,
	Star,
	Upload,
	Video,
	MessageSquare,
	ChevronDown,
	Calendar,
	Headphones,
	FileText,
	PhoneForwarded,
	PhoneMissed,
	Activity,
	User,
	Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AgentRequest from './AgentRequestForm';
import { withAuth } from '@/app/components/auth/withAuth';

const tableHeaders = [
	'Name',
	'Status',
	"Today's Calls",
	'Success Rate',
	'Type',
	'Actions',
];

function CallAgentPage() {
	const [showRequestForm, setShowRequestForm] = useState(false);
	const [isConfigOpen, setIsConfigOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('active');
	const [expandedSection, setExpandedSection] = useState('none');

	const currentAgents = [
		{
			id: 1,
			name: 'Sarah Johnson',
			status: 'Active',
			calls: 27,
			successRate: '92%',
			type: 'Professional',
			availability: '9AM - 5PM EST',
			skills: ['Sales', 'Customer Support', 'Technical'],
		},
		{
			id: 2,
			name: 'Michael Chen',
			status: 'Active',
			calls: 31,
			successRate: '87%',
			type: 'Professional',
			availability: '10AM - 6PM EST',
			skills: ['Outbound', 'Lead Generation', 'Sales'],
		},
		{
			id: 3,
			name: 'David Smith',
			status: 'On Break',
			calls: 18,
			successRate: '94%',
			type: 'Professional',
			availability: '8AM - 4PM EST',
			skills: ['Customer Support', 'Escalations', 'Technical'],
		},
		{
			id: 4,
			name: 'Rebecca Taylor',
			status: 'Active',
			calls: 24,
			successRate: '89%',
			type: 'Starter',
			availability: '12PM - 8PM EST',
			skills: ['Outbound', 'Sales', 'Follow-up'],
		},
	];

	const toggleSection = (section) => {
		setExpandedSection(expandedSection === section ? 'none' : section);
	};

	return (
		<div className='flex flex-col h-[calc(100vh-4rem)] bg-gray-900 text-gray-100 mt-10'>
			{/* Header */}
			<div className='flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50'>
				<div className='flex items-center gap-4'>
					<h1 className='text-xl md:text-2xl font-bold text-white'>
						Call Center Management
					</h1>
					<select className='bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none'>
						<option>All Departments</option>
						<option>Sales</option>
						<option>Support</option>
						<option>Technical</option>
					</select>
				</div>
				<div className='flex items-center gap-3'>
					<Button
						variant='outline'
						className='gap-1.5 bg-gray-700/50 border-gray-600 hover:bg-gray-700/70'>
						<Headphones className='h-4 w-4' />
						Join Call Queue
					</Button>
					<Button
						variant={showRequestForm ? 'outline' : 'secondary'}
						className='gap-1.5 transition-all duration-300 hover:shadow-sm bg-gray-800/60 hover:bg-gray-800/80 border-gray-700'
						onClick={() => setShowRequestForm(!showRequestForm)}>
						{showRequestForm ? (
							<>
								<Users className='h-4 w-4' />
								View Agents
							</>
						) : (
							<>
								<Plus className='h-4 w-4' />
								Request Agent
							</>
						)}
					</Button>
					<Button
						className='gap-1.5 bg-gray-700/50 border-gray-600 hover:bg-gray-700/70'
						onClick={() => setIsConfigOpen(!isConfigOpen)}>
						<Settings className='h-4 w-4' />
						{isConfigOpen ? 'Close Config' : 'Config'}
					</Button>
					<Button className='bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/30 gap-1.5'>
						<Calendar className='h-4 w-4' />
						Schedule Call
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex flex-1 overflow-hidden relative'>
				{/* Left sidebar */}
				<div className='w-64 border-r border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-y-auto hidden md:block'>
					<div className='p-4'>
						<h2 className='text-lg font-semibold text-white mb-4'>Dashboard</h2>
						<div className='space-y-2'>
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700/50'>
								<Users className='h-4 w-4' />
								All Agents
							</Button>
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700/50'>
								<Phone className='h-4 w-4' />
								Active Calls
							</Button>
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700/50'>
								<Video className='h-4 w-4' />
								Video Sessions
							</Button>
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700/50'>
								<MessageSquare className='h-4 w-4' />
								Chat Support
							</Button>
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700/50'>
								<BarChart3 className='h-4 w-4' />
								Analytics
							</Button>
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700/50'>
								<FileText className='h-4 w-4' />
								Call Scripts
							</Button>
						</div>

						{/* Recent Activity Section */}
						<div className='mt-6'>
							<div
								className='flex items-center justify-between py-2 px-1 cursor-pointer'
								onClick={() => toggleSection('activity')}>
								<h3 className='text-sm font-medium text-gray-400'>
									Recent Activity
								</h3>
								<ChevronDown
									className={`h-4 w-4 text-gray-400 transform transition-transform ${
										expandedSection === 'activity' ? 'rotate-180' : ''
									}`}
								/>
							</div>

							{expandedSection === 'activity' && (
								<div className='space-y-2 mt-2 animate-in fade-in'>
									{currentAgents.map((agent) => (
										<div
											key={agent.id}
											className='bg-gray-700/30 p-2 rounded-lg flex items-center gap-2'>
											<div className='bg-gradient-to-br from-blue-500 to-blue-400 w-6 h-6 rounded-lg flex items-center justify-center text-white font-medium text-xs'>
												{agent.name.charAt(0)}
											</div>
											<div className='flex-1 min-w-0'>
												<p className='text-xs font-medium text-white truncate'>
													{agent.name}
												</p>
												<p className='text-xs text-gray-400'>
													Completed {agent.calls} calls
												</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Stats Section */}
						<div className='mt-6'>
							<div
								className='flex items-center justify-between py-2 px-1 cursor-pointer'
								onClick={() => toggleSection('stats')}>
								<h3 className='text-sm font-medium text-gray-400'>
									Quick Stats
								</h3>
								<ChevronDown
									className={`h-4 w-4 text-gray-400 transform transition-transform ${
										expandedSection === 'stats' ? 'rotate-180' : ''
									}`}
								/>
							</div>

							{expandedSection === 'stats' && (
								<div className='space-y-2 mt-2 animate-in fade-in'>
									{[
										{
											label: 'Total Agents',
											value: '24',
											change: '+12%',
											changeColor: 'text-green-500',
											iconBg: 'bg-blue-500',
										},
										{
											label: 'Active Calls',
											value: '12',
											change: '+5%',
											changeColor: 'text-green-500',
											iconBg: 'bg-green-500',
										},
										{
											label: 'Avg Duration',
											value: '5m 23s',
											change: '-2%',
											changeColor: 'text-red-500',
											iconBg: 'bg-orange-500',
										},
										{
											label: 'Rating',
											value: '4.8',
											change: '+0.3',
											changeColor: 'text-green-500',
											iconBg: 'bg-purple-500',
										},
									].map((stat, index) => (
										<div key={index} className='bg-gray-700/30 p-2 rounded-lg'>
											<div className='flex justify-between items-center'>
												<span className='text-xs text-gray-300'>
													{stat.label}
												</span>
												<div
													className={`w-2 h-2 rounded-full ${stat.iconBg}`}></div>
											</div>
											<div className='flex justify-between items-center mt-1'>
												<span className='text-sm font-semibold text-white'>
													{stat.value}
												</span>
												<span className={`text-xs ${stat.changeColor}`}>
													{stat.change}
												</span>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Main Canvas Area */}
				<div className='flex-1 flex flex-col'>
					<AnimatePresence mode='wait'>
						{showRequestForm ? (
							<motion.div
								key='request-form'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className='flex-1 overflow-auto p-6'>
								<AgentRequest />
							</motion.div>
						) : (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className='flex-1 overflow-auto p-6'>
								{/* Communication Tools */}
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
									{/* ... (communication tools content) */}
								</div>

								{/* Call Center Tabs */}
								<div className='mb-6 border-b border-gray-700'>
									<div className='flex space-x-6'>
										<button
											className={`pb-3 text-sm font-medium ${
												activeTab === 'active'
													? 'text-white border-b-2 border-blue-500'
													: 'text-gray-400 hover:text-white'
											}`}
											onClick={() => setActiveTab('active')}>
											Active Agents
										</button>
										<button
											className={`pb-3 text-sm font-medium ${
												activeTab === 'queue'
													? 'text-white border-b-2 border-blue-500'
													: 'text-gray-400 hover:text-white'
											}`}
											onClick={() => setActiveTab('queue')}>
											Call Queue
										</button>
										<button
											className={`pb-3 text-sm font-medium ${
												activeTab === 'campaigns'
													? 'text-white border-b-2 border-blue-500'
													: 'text-gray-400 hover:text-white'
											}`}
											onClick={() => setActiveTab('campaigns')}>
											Active Campaigns
										</button>
									</div>
								</div>

								{/* Agents Table */}
								{activeTab === 'active' && (
									<div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6'>
										<div className='flex justify-between items-center mb-6'>
											<h2 className='text-xl font-bold text-white/90'>
												Active Agents
											</h2>
											<div className='flex items-center space-x-3'>
												<Button
													variant='outline'
													size='sm'
													className='gap-1.5 bg-gray-700/50 border-gray-600 hover:bg-gray-700/70'>
													<Filter className='h-4 w-4' />
													Filter
												</Button>
											</div>
										</div>
										<div className='overflow-x-auto'>
											<table className='w-full'>
												<thead className='bg-gray-700/50 text-sm font-medium text-gray-400'>
													<tr>
														{tableHeaders.map((header) => (
															<th key={header} className='px-6 py-4 text-left'>
																{header}
															</th>
														))}
													</tr>
												</thead>
												<tbody className='divide-y divide-gray-700 text-sm'>
													{currentAgents.map((agent) => (
														<tr
															key={agent.id}
															className='hover:bg-gray-700/30 transition-colors duration-150'>
															<td className='px-6 py-4 font-medium text-white'>
																{agent.name}
															</td>
															<td className='px-6 py-4'>
																<Badge
																	variant={
																		agent.status === 'Active'
																			? 'default'
																			: agent.status === 'On Break'
																				? 'outline'
																				: 'secondary'
																	}>
																	{agent.status}
																</Badge>
															</td>
															<td className='px-6 py-4 text-center'>
																{agent.calls}
															</td>
															<td className='px-6 py-4 text-center font-medium'>
																{agent.successRate}
															</td>
															<td className='px-6 py-4'>
																<TypePill type={agent.type} />
															</td>
															<td className='px-6 py-4 text-right flex justify-end space-x-1'>
																<Button
																	variant='ghost'
																	size='icon'
																	className='rounded-lg hover:bg-gray-700/50'>
																	<Phone className='h-4 w-4 text-blue-400' />
																</Button>
																<Button
																	variant='ghost'
																	size='icon'
																	className='rounded-lg hover:bg-gray-700/50'>
																	<Video className='h-4 w-4 text-purple-400' />
																</Button>
																<Button
																	variant='ghost'
																	size='icon'
																	className='rounded-lg hover:bg-gray-700/50'>
																	<Settings className='h-4 w-4 text-gray-400' />
																</Button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								)}

								{/* Call Queue */}
								{activeTab === 'queue' && (
									<div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6'>
										<div className='flex justify-between items-center mb-6'>
											<h2 className='text-xl font-bold text-white/90'>
												Call Queue
											</h2>
											<div className='flex items-center space-x-3'>
												<div className='text-sm text-gray-400'>
													<span className='text-white font-medium'>8</span>{' '}
													calls waiting · Average wait:{' '}
													<span className='text-white font-medium'>4:12</span>
												</div>
												<Button className='gap-1.5 bg-emerald-600 hover:bg-emerald-700'>
													<PhoneForwarded className='h-4 w-4' />
													Take Next Call
												</Button>
											</div>
										</div>
										<div className='space-y-3'>
											{[
												{
													id: 1,
													caller: 'John Doe',
													time: '5:23',
													priority: 'High',
													type: 'Support',
													department: 'Technical',
												},
												{
													id: 2,
													caller: 'Lisa Johnson',
													time: '4:51',
													priority: 'Medium',
													type: 'Sales',
													department: 'Enterprise',
												},
												{
													id: 3,
													caller: 'Mark Williams',
													time: '3:12',
													priority: 'High',
													type: 'Support',
													department: 'Billing',
												},
												{
													id: 4,
													caller: 'Susan Taylor',
													time: '2:45',
													priority: 'Low',
													type: 'Inquiry',
													department: 'General',
												},
											].map((call) => (
												<div
													key={call.id}
													className='bg-gray-700/30 p-4 rounded-lg flex items-center justify-between'>
													<div className='flex items-center gap-3'>
														<div
															className={`w-2 h-2 rounded-full ${
																call.priority === 'High'
																	? 'bg-red-500'
																	: call.priority === 'Medium'
																		? 'bg-yellow-500'
																		: 'bg-blue-500'
															}`}></div>
														<div>
															<p className='font-medium text-white'>
																{call.caller}
															</p>
															<p className='text-xs text-gray-400'>
																{call.type} · {call.department}
															</p>
														</div>
														<div>
															<p className='font-medium text-white'>
																{call.caller}
															</p>
															<p className='text-xs text-gray-400'>
																{call.type} · {call.department}
															</p>
														</div>
													</div>
													<div className='flex items-center gap-4'>
														<div className='flex items-center gap-1.5 text-sm text-gray-300'>
															<Clock className='h-4 w-4' />
															{call.time}
														</div>
														<Button
															variant='outline'
															size='sm'
															className='gap-1.5 bg-green-600/20 hover:bg-green-600/30 border-green-600 text-green-400'>
															<Phone className='h-4 w-4' />
															Accept
														</Button>
													</div>
												</div>
											))}
										</div>
										<div className='mt-4 flex justify-center'>
											<Button
												variant='ghost'
												className='text-gray-400 hover:text-white'
												size='sm'>
												Load More Calls
												<ChevronDown className='h-4 w-4 ml-1' />
											</Button>
										</div>
									</div>
								)}

								{/* Campaigns Section */}
								{activeTab === 'campaigns' && (
									<div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
										<div className='flex justify-between items-center mb-6'>
											<h2 className='text-xl font-bold text-white/90'>
												Active Campaigns
											</h2>
											<Button className='gap-1.5 bg-blue-600 hover:bg-blue-700'>
												<Plus className='h-4 w-4' />
												New Campaign
											</Button>
										</div>
										<div className='text-center py-12 text-gray-400'>
											<Activity className='h-12 w-12 mx-auto mb-4' />
											<p className='text-lg'>No active campaigns running</p>
											<p className='text-sm mt-2'>
												Create a new campaign to start managing your call
												strategies
											</p>
										</div>
									</div>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

const TypePill = ({ type }) => (
	<span
		className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
			type === 'Professional'
				? 'bg-purple-500/20 text-purple-400'
				: 'bg-blue-500/20 text-blue-400'
		}`}>
		{type}
	</span>
);

export default withAuth(CallAgentPage);
