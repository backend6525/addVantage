'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Plus,
	Users,
	UserPlus,
	Trash2,
	Edit,
	Settings,
	Search,
	Filter,
	ChevronDown,
	BarChart3,
	Bell,
	Star,
	Calendar,
	FileText,
	Activity,
	Download,
	Target,
	TrendingUp,
	Play,
	Pause,
	Clock,
	CheckCircle,
	AlertCircle,
	DollarSign,
	Eye,
	Heart,
	MessageCircle,
	Share2,
	Camera,
	Video,
	Image,
	Link,
	X,
	LayoutDashboard,
	Briefcase,
	User,
	PieChart,
	ArrowRight,
	MoreVertical,
	ArrowUpRight,
	ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/Tabs/Tabs';
import {
	CreateCampaignModal,
	AssignInfluencerModal,
	CreateDeliverableModal,
	InfluencerProfileModal,
} from './models';
import { CreateTeamModal, AddMemberModal, AddInfluencerModal } from './modals';
import { toast } from 'sonner';
import { Team, Campaign, Influencer, ContentDeliverable } from './types';
import {
	fetchUser,
	fetchTeams,
	fetchCampaigns,
	fetchTeamInfluencers,
	fetchDeliverables,
	fetchAnalytics,
	createTeam,
	createCampaign,
	assignInfluencer,
	deleteTeam,
	addInfluencer,
	createDeliverable,
	updateTeam,
} from './api';
import {
	StatusBadge,
	CampaignCard,
	InfluencerCard,
	DeliverableCard,
	MetricCard,
} from './components';

const TeamsPage = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [influencers, setInfluencers] = useState<Influencer[]>([]);
	const [deliverables, setDeliverables] = useState<ContentDeliverable[]>([]);
	const [analytics, setAnalytics] = useState<any>(null);
	const [loading, setLoading] = useState({
		user: false,
		teams: false,
		campaigns: false,
		influencers: false,
		deliverables: false,
		analytics: false,
	});

	// Modal states
	const [showCreateTeam, setShowCreateTeam] = useState(false);
	const [showAddMember, setShowAddMember] = useState(false);
	const [showAddInfluencer, setShowAddInfluencer] = useState(false);
	const [showCreateCampaign, setShowCreateCampaign] = useState(false);
	const [showAssignInfluencer, setShowAssignInfluencer] = useState(false);
	const [showCreateDeliverable, setShowCreateDeliverable] = useState(false);
	const [showInfluencerProfile, setShowInfluencerProfile] = useState(false);
	const [currentTeamId, setCurrentTeamId] = useState('');

	const [selectedInfluencer, setSelectedInfluencer] =
		useState<Influencer | null>(null);
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null
	);
	const [currentUser, setCurrentUser] = useState<any>(null);
	const [expandedSection, setExpandedSection] = useState('none');
	const [activeTab, setActiveTab] = useState('overview');
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');

	// Formatting functions
	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency || 'USD',
		}).format(amount);
	};

	const formatNumber = (num: number) => {
		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-500';
			case 'draft':
				return 'bg-yellow-500';
			case 'completed':
				return 'bg-blue-500';
			case 'cancelled':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	};

	// Handler functions
	const handleCreateTeam = async (teamData: any) => {
		try {
			const updatedTeams = await createTeam(teamData, currentUser.email);
			setTeams(updatedTeams);
			setShowCreateTeam(false);
		} catch (error) {
			console.error('Error in create team:', error);
		}
	};

	const handleCreateCampaign = async (campaignData: any) => {
		if (!selectedTeam) return;
		try {
			const updatedCampaigns = await createCampaign(
				selectedTeam._id,
				campaignData
			);
			setCampaigns(updatedCampaigns);
			setShowCreateCampaign(false);
		} catch (error) {
			console.error('Error in create campaign:', error);
		}
	};

	const handleAssignInfluencer = async (assignmentData: any) => {
		if (!selectedTeam) return;
		try {
			const updatedCampaigns = await assignInfluencer(
				assignmentData,
				selectedTeam._id
			);
			setCampaigns(updatedCampaigns);
			setShowAssignInfluencer(false);
		} catch (error) {
			console.error('Error in assign influencer:', error);
		}
	};

	const handleDeleteTeam = async (teamId: string) => {
		if (window.confirm('Are you sure you want to delete this team?')) {
			try {
				const updatedTeams = await deleteTeam(teamId, currentUser.email);
				setTeams(updatedTeams);
				setSelectedTeam(null);
			} catch (error) {
				console.error('Error in delete team:', error);
			}
		}
	};

	const handleAddInfluencer = async (influencerData: any) => {
		if (!selectedTeam) return;
		try {
			const updatedInfluencers = await addInfluencer(
				selectedTeam._id,
				influencerData
			);
			setInfluencers(updatedInfluencers);
			setShowAddInfluencer(false);
		} catch (error) {
			console.error('Error in add influencer:', error);
		}
	};

	const handleCreateDeliverable = async (deliverableData: any) => {
		if (!selectedTeam) return;
		try {
			const updatedDeliverables = await createDeliverable(
				deliverableData,
				selectedTeam._id
			);
			setDeliverables(updatedDeliverables);
			setShowCreateDeliverable(false);
		} catch (error) {
			console.error('Error in create deliverable:', error);
		}
	};

	const handleUpdateTeam = async (updates: any) => {
		if (!selectedTeam) return;
		try {
			const updatedTeams = await updateTeam(
				selectedTeam._id,
				updates,
				currentUser.email
			);
			setTeams(updatedTeams);
			if (selectedTeam) {
				setSelectedTeam(
					updatedTeams.find((t) => t._id === selectedTeam._id) || null
				);
			}
		} catch (error) {
			console.error('Error in update team:', error);
		}
	};

	const toggleSection = (section: string) => {
		setExpandedSection(expandedSection === section ? 'none' : section);
	};

	const handleTeamSelect = (team: Team) => {
		setSelectedTeam(team);
		setCurrentTeamId(team._id);
		setActiveTab('overview');
	};

	// Initial data loading
	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading((prev) => ({ ...prev, user: true }));
				const userData = await fetchUser();
				setCurrentUser(userData);

				setLoading((prev) => ({ ...prev, teams: true }));
				const teamsData = await fetchTeams(userData.email);
				setTeams(teamsData);

				if (teamsData.length > 0 && !selectedTeam) {
					const firstTeam = teamsData[0];
					setSelectedTeam(firstTeam);
					const [
						campaignsData,
						influencersData,
						analyticsData,
						deliverablesData,
					] = await Promise.all([
						fetchCampaigns(firstTeam._id),
						fetchTeamInfluencers(firstTeam._id),
						fetchAnalytics(firstTeam._id),
						fetchDeliverables(firstTeam._id),
					]);
					setCampaigns(campaignsData);
					setInfluencers(influencersData);
					setAnalytics(analyticsData);
					setDeliverables(deliverablesData);
				}
			} catch (error) {
				console.error('Error loading data:', error);
				toast.error('Failed to load data');
			} finally {
				setLoading((prev) => ({ ...prev, user: false, teams: false }));
			}
		};

		loadData();
	}, []);

	// Load related data when team changes
	useEffect(() => {
		if (!selectedTeam) return;

		const loadTeamData = async () => {
			try {
				setLoading((prev) => ({
					...prev,
					campaigns: true,
					influencers: true,
					analytics: true,
					deliverables: true,
				}));
				const [
					campaignsData,
					influencersData,
					analyticsData,
					deliverablesData,
				] = await Promise.all([
					fetchCampaigns(selectedTeam._id),
					fetchTeamInfluencers(selectedTeam._id),
					fetchAnalytics(selectedTeam._id),
					fetchDeliverables(selectedTeam._id),
				]);
				setCampaigns(campaignsData);
				setInfluencers(influencersData);
				setAnalytics(analyticsData);
				setDeliverables(deliverablesData);
			} catch (error) {
				console.error('Error loading team data:', error);
			} finally {
				setLoading((prev) => ({
					...prev,
					campaigns: false,
					influencers: false,
					analytics: false,
					deliverables: false,
				}));
			}
		};

		loadTeamData();
	}, [selectedTeam?._id]);

	// Loading state
	if (loading.user || loading.teams) {
		return (
			<div className='flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-900'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
					<p className='text-gray-400'>Loading teams...</p>
				</div>
			</div>
		);
	}

	// Empty state
	if (!loading.user && !loading.teams && teams.length === 0) {
		return (
			<div className='flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-900'>
				<div className='text-center'>
					<Users className='w-16 h-16 mx-auto mb-4 text-gray-300' />
					<h3 className='text-lg font-medium text-white mb-2'>
						No teams found
					</h3>
					<p className='text-gray-400 mb-6'>
						You haven&apos;t joined or created any teams yet.
					</p>
					<Button onClick={() => setShowCreateTeam(true)}>
						Create New Team
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-col h-[calc(100vh-4rem)] bg-gray-900 text-gray-100 mt-16'>
			{/* Enhanced Header */}
			<div className='flex items-center justify-between p-4 border-b border-gray-800 bg-gray-800/90 backdrop-blur-sm sticky top-0 z-50'>
				<div className='flex items-center gap-4'>
					<h1 className='text-xl md:text-2xl font-bold text-white flex items-center gap-2'>
						<Briefcase className='w-6 h-6 text-blue-400' />
						Team Management
					</h1>
					<div className='relative'>
						<select
							className='bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 pr-8 text-sm font-medium text-white focus:ring-2 focus:ring-blue-600 outline-none appearance-none'
							value={selectedTeam?._id || ''}
							onChange={(e) => {
								const team = teams.find((t) => t._id === e.target.value);
								if (team) handleTeamSelect(team);
							}}>
							<option value=''>Select Team</option>
							{teams.map((team) => (
								<option key={team._id} value={team._id}>
									{team.teamName}
								</option>
							))}
						</select>
						<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
					</div>
					{selectedTeam && (
						<Badge
							className={`${selectedTeam.isActive ? 'bg-green-900 text-green-400' : 'bg-gray-700 text-gray-300'} text-xs font-medium py-1 px-2 rounded-full`}>
							{selectedTeam.isActive ? 'Active' : 'Inactive'}
						</Badge>
					)}
				</div>
				<div className='flex items-center gap-3'>
					<Button
						variant='outline'
						className='gap-1.5 bg-gray-800 border-gray-700 hover:bg-gray-700'
						onClick={() => setShowAddInfluencer(true)}
						disabled={!selectedTeam}>
						<UserPlus className='h-4 w-4' />
						<span className='hidden sm:inline'>Add Influencer</span>
					</Button>
					<Button
						variant='secondary'
						className='gap-1.5 bg-blue-900/50 hover:bg-blue-900/70 border-blue-800'
						onClick={() => setShowCreateCampaign(true)}
						disabled={!selectedTeam}>
						<Target className='h-4 w-4' />
						<span className='hidden sm:inline'>New Campaign</span>
					</Button>
					<Button
						className='gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
						onClick={() => setShowCreateTeam(true)}>
						<Plus className='h-4 w-4' />
						Create Team
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex flex-1 overflow-hidden'>
				{/* Enhanced Sidebar */}
				<div className='w-64 border-r border-gray-800 bg-gray-800/90 backdrop-blur-sm overflow-y-auto hidden lg:block'>
					<div className='p-4'>
						{/* Quick Stats */}
						<div className='mb-6'>
							<h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
								Quick Stats
							</h3>
							<div className='grid grid-cols-2 gap-3'>
								<div className='bg-gray-800 p-3 rounded-lg border border-gray-700'>
									<div className='text-xs text-gray-400'>Teams</div>
									<div className='text-lg font-semibold text-white'>
										{teams.length}
									</div>
								</div>
								<div className='bg-gray-800 p-3 rounded-lg border border-gray-700'>
									<div className='text-xs text-gray-400'>Campaigns</div>
									<div className='text-lg font-semibold text-white'>
										{campaigns.length || 0}
									</div>
								</div>
								<div className='bg-gray-800 p-3 rounded-lg border border-gray-700'>
									<div className='text-xs text-gray-400'>Influencers</div>
									<div className='text-lg font-semibold text-white'>
										{influencers.length || 0}
									</div>
								</div>
								<div className='bg-gray-800 p-3 rounded-lg border border-gray-700'>
									<div className='text-xs text-gray-400'>Content</div>
									<div className='text-lg font-semibold text-white'>
										{deliverables.length}
									</div>
								</div>
							</div>
						</div>

						{/* Navigation */}
						<div className='mb-6'>
							<h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
								Navigation
							</h3>
							<div className='space-y-1'>
								{[
									{ id: 'overview', label: 'Overview', icon: LayoutDashboard },
									{ id: 'campaigns', label: 'Campaigns', icon: Target },
									{ id: 'influencers', label: 'Influencers', icon: User },
									{ id: 'content', label: 'Content', icon: FileText },
									{ id: 'analytics', label: 'Analytics', icon: PieChart },
									{ id: 'settings', label: 'Settings', icon: Settings },
								].map((tab) => (
									<Button
										key={tab.id}
										variant='ghost'
										className={`w-full justify-start gap-3 px-3 py-3 rounded-lg ${
											activeTab === tab.id
												? 'bg-blue-900/30 text-blue-400 border-l-2 border-blue-400'
												: 'text-gray-300 hover:bg-gray-700'
										}`}
										onClick={() => setActiveTab(tab.id)}>
										<tab.icon className='h-4 w-4' />
										{tab.label}
									</Button>
								))}
							</div>
						</div>

						{/* Recent Activity */}
						<div className='mb-6'>
							<div
								className='flex items-center justify-between py-2 px-1 cursor-pointer'
								onClick={() => toggleSection('activity')}>
								<h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
									Recent Activity
								</h3>
								<ChevronDown
									className={`h-4 w-4 text-gray-400 transform transition-transform ${
										expandedSection === 'activity' ? 'rotate-180' : ''
									}`}
								/>
							</div>

							{expandedSection === 'activity' && (
								<div className='space-y-2 mt-2'>
									{campaigns.slice(0, 3).map((campaign) => (
										<div
											key={campaign._id}
											className='bg-gray-800 p-3 rounded-lg border border-gray-700'>
											<div className='flex items-center gap-3'>
												<div
													className={`w-2 h-2 rounded-full ${getStatusColor(campaign.status)}`}></div>
												<div className='flex-1 min-w-0'>
													<p className='text-sm font-medium text-white truncate'>
														{campaign.campaignName}
													</p>
													<p className='text-xs text-gray-400 capitalize'>
														{campaign.status}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Team List */}
						<div>
							<h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
								Your Teams
							</h3>
							<div className='space-y-2'>
								{teams.map((team) => (
									<div
										key={team._id}
										className={`p-3 rounded-lg cursor-pointer transition-colors ${
											selectedTeam?._id === team._id
												? 'bg-blue-900/20 border border-blue-700'
												: 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
										}`}
										onClick={() => handleTeamSelect(team)}>
										<div className='flex items-center gap-3'>
											<div className='bg-gradient-to-br from-blue-500 to-blue-400 w-10 h-10 rounded-lg flex items-center justify-center text-white font-medium text-sm'>
												{team.teamName.charAt(0)}
											</div>
											<div className='flex-1 min-w-0'>
												<p className='text-sm font-medium text-white truncate'>
													{team.teamName}
												</p>
												<p className='text-xs text-gray-400'>
													{team.industry || 'No industry'}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Main Content Area */}
				<div className='flex-1 overflow-auto bg-gray-900'>
					{selectedTeam ? (
						<div className='p-6'>
							<Tabs value={activeTab} onValueChange={setActiveTab}>
								<TabsList className='grid w-full grid-cols-6 bg-gray-800 border border-gray-700 rounded-lg p-1 mb-6'>
									<TabsTrigger value='overview'>Overview</TabsTrigger>
									<TabsTrigger value='campaigns'>Campaigns</TabsTrigger>
									<TabsTrigger value='influencers'>Influencers</TabsTrigger>
									<TabsTrigger value='content'>Content</TabsTrigger>
									<TabsTrigger value='analytics'>Analytics</TabsTrigger>
									<TabsTrigger value='settings'>Settings</TabsTrigger>
								</TabsList>

								{/* Overview Tab */}
								<TabsContent value='overview' className='space-y-6'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
										<Card className='bg-gray-800 border border-gray-700'>
											<CardContent className='p-6'>
												<div className='flex items-center justify-between'>
													<div>
														<p className='text-gray-400 text-sm'>
															Active Campaigns
														</p>
														<p className='text-2xl font-bold text-white'>
															{
																campaigns.filter((c) => c.status === 'active')
																	.length
															}
														</p>
														<p className='text-xs text-green-400 flex items-center mt-1'>
															<ArrowUpRight className='h-3 w-3 mr-1' /> 2 this
															week
														</p>
													</div>
													<div className='bg-blue-900/20 p-2 rounded-lg'>
														<Target className='h-8 w-8 text-blue-400' />
													</div>
												</div>
											</CardContent>
										</Card>

										<Card className='bg-gray-800 border border-gray-700'>
											<CardContent className='p-6'>
												<div className='flex items-center justify-between'>
													<div>
														<p className='text-gray-400 text-sm'>
															Team Influencers
														</p>
														<p className='text-2xl font-bold text-white'>
															{influencers.length}
														</p>
														<p className='text-xs text-green-400 flex items-center mt-1'>
															<ArrowUpRight className='h-3 w-3 mr-1' /> 3 this
															month
														</p>
													</div>
													<div className='bg-green-900/20 p-2 rounded-lg'>
														<Users className='h-8 w-8 text-green-400' />
													</div>
												</div>
											</CardContent>
										</Card>

										<Card className='bg-gray-800 border border-gray-700'>
											<CardContent className='p-6'>
												<div className='flex items-center justify-between'>
													<div>
														<p className='text-gray-400 text-sm'>
															Content Pieces
														</p>
														<p className='text-2xl font-bold text-white'>
															{deliverables.length}
														</p>
														<p className='text-xs text-blue-400 flex items-center mt-1'>
															<ArrowUpRight className='h-3 w-3 mr-1' /> 12 this
															week
														</p>
													</div>
													<div className='bg-purple-900/20 p-2 rounded-lg'>
														<FileText className='h-8 w-8 text-purple-400' />
													</div>
												</div>
											</CardContent>
										</Card>

										<Card className='bg-gray-800 border border-gray-700'>
											<CardContent className='p-6'>
												<div className='flex items-center justify-between'>
													<div>
														<p className='text-gray-400 text-sm'>
															Total Budget
														</p>
														<p className='text-2xl font-bold text-white'>
															{selectedTeam.defaultBudget
																? formatCurrency(
																		selectedTeam.defaultBudget.max,
																		selectedTeam.defaultBudget.currency
																	)
																: '$0'}
														</p>
														<p className='text-xs text-green-400 flex items-center mt-1'>
															<ArrowUpRight className='h-3 w-3 mr-1' />{' '}
															Increased by 15%
														</p>
													</div>
													<div className='bg-yellow-900/20 p-2 rounded-lg'>
														<DollarSign className='h-8 w-8 text-yellow-400' />
													</div>
												</div>
											</CardContent>
										</Card>
									</div>

									<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
										{/* Recent Campaigns Card */}
										<Card className='bg-gray-800 border border-gray-700'>
											<CardHeader className='pb-4'>
												<div className='flex justify-between items-center'>
													<CardTitle className='text-lg font-semibold text-white'>
														Recent Campaigns
													</CardTitle>
													<Button
														variant='outline'
														size='sm'
														onClick={() => setShowCreateCampaign(true)}
														className='text-xs bg-blue-900/20 border-blue-700 hover:bg-blue-900/30'>
														<Plus className='h-4 w-4 mr-1' /> New
													</Button>
												</div>
												<CardDescription className='text-sm text-gray-400'>
													Your most recent marketing campaigns
												</CardDescription>
											</CardHeader>
											<CardContent>
												{loading.campaigns ? (
													<div className='text-center py-8'>
														<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
													</div>
												) : campaigns.length > 0 ? (
													<div className='space-y-4'>
														{campaigns.slice(0, 4).map((campaign) => (
															<div
																key={campaign._id}
																className='flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600'>
																<div className='flex items-center gap-3'>
																	<div
																		className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`}></div>
																	<div>
																		<p className='font-medium text-white'>
																			{campaign.campaignName}
																		</p>
																		<p className='text-sm text-gray-400 line-clamp-1'>
																			{campaign.description}
																		</p>
																	</div>
																</div>
																<div className='text-right'>
																	<p className='text-sm font-medium text-white'>
																		{formatCurrency(
																			campaign.budget.total,
																			campaign.budget.currency
																		)}
																	</p>
																	<StatusBadge status={campaign.status} />
																</div>
															</div>
														))}
													</div>
												) : (
													<div className='text-center py-8'>
														<Target className='w-12 h-12 mx-auto mb-4 text-gray-500' />
														<p className='text-gray-400'>No campaigns yet</p>
													</div>
												)}
											</CardContent>
											<CardFooter>
												<Button
													variant='link'
													className='text-blue-400 text-sm p-0 hover:no-underline'
													onClick={() => setActiveTab('campaigns')}>
													View all campaigns{' '}
													<ArrowRight className='h-4 w-4 ml-1' />
												</Button>
											</CardFooter>
										</Card>

										{/* Team Influencers Card */}
										<Card className='bg-gray-800 border border-gray-700'>
											<CardHeader className='pb-4'>
												<div className='flex justify-between items-center'>
													<CardTitle className='text-lg font-semibold text-white'>
														Top Influencers
													</CardTitle>
													<Button
														variant='outline'
														size='sm'
														onClick={() => setShowAddInfluencer(true)}
														className='text-xs bg-green-900/20 border-green-700 hover:bg-green-900/30'>
														<UserPlus className='h-4 w-4 mr-1' /> Add
													</Button>
												</div>
												<CardDescription className='text-sm text-gray-400'>
													Most engaged influencers in your team
												</CardDescription>
											</CardHeader>
											<CardContent>
												{loading.influencers ? (
													<div className='text-center py-8'>
														<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
													</div>
												) : influencers.length > 0 ? (
													<div className='grid grid-cols-1 gap-4'>
														{influencers.slice(0, 3).map((influencer) => (
															<div
																key={influencer._id}
																className='flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700/50 transition-colors'
																onClick={() => {
																	setSelectedInfluencer(influencer);
																	setShowInfluencerProfile(true);
																}}>
																<div className='bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-sm'>
																	{influencer.firstName?.charAt(0)}
																	{influencer.lastName?.charAt(0)}
																</div>
																<div className='flex-1 min-w-0'>
																	<p className='font-medium text-white'>
																		{influencer.firstName} {influencer.lastName}
																	</p>
																	<p className='text-sm text-gray-400 flex items-center gap-1'>
																		<span>{influencer.location.country}</span>
																		{influencer.socialProfiles?.[0]
																			?.followerCount && (
																			<span className='flex items-center'>
																				<span className='mx-1'>•</span>
																				<span>
																					{formatNumber(
																						influencer.socialProfiles[0]
																							.followerCount
																					)}{' '}
																					followers
																				</span>
																			</span>
																		)}
																	</p>
																</div>
																<StatusBadge status={influencer.status} />
															</div>
														))}
													</div>
												) : (
													<div className='text-center py-8'>
														<Users className='w-12 h-12 mx-auto mb-4 text-gray-500' />
														<p className='text-gray-400'>
															No influencers in this team yet
														</p>
													</div>
												)}
											</CardContent>
											<CardFooter>
												<Button
													variant='link'
													className='text-blue-400 text-sm p-0 hover:no-underline'
													onClick={() => setActiveTab('influencers')}>
													View all influencers{' '}
													<ArrowRight className='h-4 w-4 ml-1' />
												</Button>
											</CardFooter>
										</Card>
									</div>
								</TabsContent>

								{/* Campaigns Tab */}
								<TabsContent value='campaigns' className='space-y-6'>
									<div className='flex items-center justify-between'>
										<h2 className='text-xl font-bold text-white'>Campaigns</h2>
										<div className='flex items-center gap-3'>
											<div className='relative'>
												<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
												<input
													type='text'
													placeholder='Search campaigns...'
													className='bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-600 outline-none'
													value={searchTerm}
													onChange={(e) => setSearchTerm(e.target.value)}
												/>
											</div>
											<select
												className='bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
												value={filterStatus}
												onChange={(e) => setFilterStatus(e.target.value)}>
												<option value='all'>All Status</option>
												<option value='draft'>Draft</option>
												<option value='active'>Active</option>
												<option value='completed'>Completed</option>
												<option value='cancelled'>Cancelled</option>
											</select>
											<Button onClick={() => setShowCreateCampaign(true)}>
												<Plus className='h-4 w-4' />
												New Campaign
											</Button>
										</div>
									</div>

									<div className='grid gap-6'>
										{loading.campaigns ? (
											<div className='text-center py-12'>
												<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
												<p className='text-gray-400'>Loading campaigns...</p>
											</div>
										) : campaigns.filter((campaign) => {
												const matchesSearch =
													campaign.campaignName
														.toLowerCase()
														.includes(searchTerm.toLowerCase()) ||
													campaign.description
														.toLowerCase()
														.includes(searchTerm.toLowerCase());
												const matchesStatus =
													filterStatus === 'all' ||
													campaign.status === filterStatus;
												return matchesSearch && matchesStatus;
										  }).length > 0 ? (
											campaigns
												.filter((campaign) => {
													const matchesSearch =
														campaign.campaignName
															.toLowerCase()
															.includes(searchTerm.toLowerCase()) ||
														campaign.description
															.toLowerCase()
															.includes(searchTerm.toLowerCase());
													const matchesStatus =
														filterStatus === 'all' ||
														campaign.status === filterStatus;
													return matchesSearch && matchesStatus;
												})
												.map((campaign) => (
													<CampaignCard
														key={campaign._id}
														campaign={campaign}
														onAssignInfluencer={(camp) => {
															setSelectedCampaign(camp);
															setShowAssignInfluencer(true);
														}}
													/>
												))
										) : (
											<div className='text-center py-12'>
												<Target className='w-16 h-16 mx-auto mb-4 text-gray-500' />
												<h3 className='text-lg font-medium text-white mb-2'>
													No campaigns found
												</h3>
												<p className='text-gray-400 mb-6'>
													{searchTerm || filterStatus !== 'all'
														? 'No campaigns match your current filters.'
														: 'Create your first campaign to get started.'}
												</p>
												{!searchTerm && filterStatus === 'all' && (
													<Button onClick={() => setShowCreateCampaign(true)}>
														<Plus className='h-4 w-4' />
														Create Campaign
													</Button>
												)}
											</div>
										)}
									</div>
								</TabsContent>

								{/* Influencers Tab */}
								<TabsContent value='influencers' className='space-y-6'>
									<div className='flex items-center justify-between'>
										<h2 className='text-xl font-bold text-white'>
											Team Influencers
										</h2>
										<Button onClick={() => setShowAddInfluencer(true)}>
											<UserPlus className='h-4 w-4' />
											Add Influencer
										</Button>
									</div>

									<div className='grid gap-6'>
										{loading.influencers ? (
											<div className='text-center py-12'>
												<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
												<p className='text-gray-400'>Loading influencers...</p>
											</div>
										) : influencers.length > 0 ? (
											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
												{influencers.map((influencer) => (
													<InfluencerCard
														key={influencer._id}
														influencer={influencer}
														onClick={() => {
															setSelectedInfluencer(influencer);
															setShowInfluencerProfile(true);
														}}
													/>
												))}
											</div>
										) : (
											<div className='text-center py-12'>
												<Users className='w-16 h-16 mx-auto mb-4 text-gray-500' />
												<h3 className='text-lg font-medium text-white mb-2'>
													No influencers yet
												</h3>
												<p className='text-gray-400 mb-6'>
													Add influencers to your team to start collaborating.
												</p>
												<Button onClick={() => setShowAddInfluencer(true)}>
													<UserPlus className='h-4 w-4' />
													Add Influencer
												</Button>
											</div>
										)}
									</div>
								</TabsContent>

								{/* Content Tab */}
								<TabsContent value='content' className='space-y-6'>
									<div className='flex items-center justify-between'>
										<h2 className='text-xl font-bold text-white'>
											Content Deliverables
										</h2>
										<Button
											onClick={() => setShowCreateDeliverable(true)}
											disabled={!selectedCampaign}>
											<Plus className='h-4 w-4' />
											Create Deliverable
										</Button>
									</div>

									{loading.deliverables ? (
										<div className='text-center py-12'>
											<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
											<p className='text-gray-400'>Loading content...</p>
										</div>
									) : deliverables.length > 0 ? (
										<div className='grid gap-4'>
											{deliverables.map((deliverable) => (
												<DeliverableCard
													key={deliverable._id}
													deliverable={deliverable}
													campaigns={campaigns}
													influencers={influencers}
												/>
											))}
										</div>
									) : (
										<div className='text-center py-12'>
											<FileText className='w-16 h-16 mx-auto mb-4 text-gray-500' />
											<h3 className='text-lg font-medium text-white mb-2'>
												No content yet
											</h3>
											<p className='text-gray-400 mb-6'>
												Create deliverables to track content creation and
												performance.
											</p>
										</div>
									)}
								</TabsContent>

								{/* Analytics Tab */}
								<TabsContent value='analytics' className='space-y-6'>
									<div className='flex items-center justify-between'>
										<h2 className='text-xl font-bold text-white'>
											Analytics Dashboard
										</h2>
										<div className='flex items-center gap-3'>
											<Button variant='outline' className='border-gray-700'>
												<Download className='h-4 w-4' />
												Export
											</Button>
											<select className='bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white'>
												<option>Last 30 days</option>
												<option>Last 90 days</option>
												<option>Last 6 months</option>
												<option>Last year</option>
											</select>
										</div>
									</div>

									{loading.analytics ? (
										<div className='text-center py-12'>
											<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
											<p className='text-gray-400'>Loading analytics...</p>
										</div>
									) : analytics ? (
										<div className='grid gap-6'>
											{/* Key Metrics */}
											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
												<MetricCard
													title='Total Reach'
													value={
														analytics?.totalReach
															? formatNumber(analytics.totalReach)
															: '0'
													}
													change='+12% from last month'
													icon={Eye}
													iconColor='text-blue-500'
												/>
												<MetricCard
													title='Engagement Rate'
													value={
														analytics?.avgEngagementRate
															? `${analytics.avgEngagementRate.toFixed(1)}%`
															: '0%'
													}
													change='+3.2% from last month'
													icon={Heart}
													iconColor='text-pink-500'
												/>
												<MetricCard
													title='Content Published'
													value={
														deliverables.filter((d) => d.status === 'published')
															.length
													}
													change='This month'
													icon={FileText}
													iconColor='text-purple-500'
												/>
												<MetricCard
													title='ROI'
													value={
														analytics?.roi
															? `${analytics.roi.toFixed(1)}x`
															: '0x'
													}
													change='Return on investment'
													icon={TrendingUp}
													iconColor='text-green-500'
												/>
											</div>

											{/* Performance Charts */}
											<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
												<Card className='bg-gray-800 border border-gray-700'>
													<CardHeader>
														<CardTitle className='text-white'>
															Performance Over Time
														</CardTitle>
													</CardHeader>
													<CardContent>
														<div className='h-64 flex items-center justify-center bg-gray-700/30 rounded-lg border border-gray-600'>
															<div className='text-center'>
																<BarChart3 className='w-12 h-12 mx-auto mb-4 text-gray-500' />
																<p className='text-gray-400'>
																	Engagement metrics visualization
																</p>
																<p className='text-sm text-gray-500 mt-2'>
																	(Chart would display here)
																</p>
															</div>
														</div>
													</CardContent>
												</Card>

												<Card className='bg-gray-800 border border-gray-700'>
													<CardHeader>
														<CardTitle className='text-white'>
															Audience Demographics
														</CardTitle>
													</CardHeader>
													<CardContent>
														<div className='h-64 flex items-center justify-center bg-gray-700/30 rounded-lg border border-gray-600'>
															<div className='text-center'>
																<Users className='w-12 h-12 mx-auto mb-4 text-gray-500' />
																<p className='text-gray-400'>
																	Audience breakdown by location
																</p>
																<p className='text-sm text-gray-500 mt-2'>
																	(Demographic chart would display here)
																</p>
															</div>
														</div>
													</CardContent>
												</Card>
											</div>

											{/* Top Performing Content */}
											<Card className='bg-gray-800 border border-gray-700'>
												<CardHeader>
													<CardTitle className='text-white'>
														Top Performing Content
													</CardTitle>
												</CardHeader>
												<CardContent>
													{deliverables.filter((d) => d.performance).length >
													0 ? (
														<div className='space-y-4'>
															{deliverables
																.filter(
																	(d) =>
																		d.performance && d.performance.engagement
																)
																.sort(
																	(a, b) =>
																		(b.performance?.engagement || 0) -
																		(a.performance?.engagement || 0)
																)
																.slice(0, 5)
																.map((deliverable) => {
																	const influencer = influencers.find(
																		(i) => i._id === deliverable.influencerId
																	);
																	const campaign = campaigns.find(
																		(c) => c._id === deliverable.campaignId
																	);

																	return (
																		<div
																			key={deliverable._id}
																			className='flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600'>
																			<div className='flex items-center gap-3'>
																				{deliverable.contentType === 'post' && (
																					<Image className='h-5 w-5 text-blue-500' />
																				)}
																				{deliverable.contentType ===
																					'story' && (
																					<Camera className='h-5 w-5 text-purple-500' />
																				)}
																				{deliverable.contentType === 'reel' && (
																					<Video className='h-5 w-5 text-pink-500' />
																				)}
																				<div>
																					<p className='font-medium text-white capitalize'>
																						{deliverable.contentType}
																					</p>
																					<p className='text-sm text-gray-400'>
																						{influencer
																							? `${influencer.firstName} ${influencer.lastName}`
																							: 'Unknown'}{' '}
																						• {campaign?.campaignName}
																					</p>
																				</div>
																			</div>
																			<div className='text-right'>
																				<p className='text-sm font-medium text-white'>
																					{formatNumber(
																						deliverable.performance
																							?.engagement || 0
																					)}{' '}
																					engagements
																				</p>
																				<p className='text-xs text-gray-400'>
																					{formatNumber(
																						deliverable.performance?.reach || 0
																					)}{' '}
																					reach
																				</p>
																			</div>
																		</div>
																	);
																})}
														</div>
													) : (
														<div className='text-center py-8'>
															<BarChart3 className='w-12 h-12 mx-auto mb-4 text-gray-500' />
															<p className='text-gray-400'>
																No performance data available yet
															</p>
														</div>
													)}
												</CardContent>
											</Card>
										</div>
									) : (
										<div className='text-center py-12'>
											<Activity className='w-16 h-16 mx-auto mb-4 text-gray-500' />
											<p className='text-gray-400'>
												No analytics data available for this team
											</p>
										</div>
									)}
								</TabsContent>

								{/* Settings Tab */}
								<TabsContent value='settings' className='space-y-6'>
									<div className='flex items-center justify-between'>
										<h2 className='text-xl font-bold text-white'>
											Team Settings
										</h2>
									</div>

									{selectedTeam && (
										<div className='grid gap-6'>
											{/* Team Information */}
											<Card className='bg-gray-800 border border-gray-700'>
												<CardHeader>
													<CardTitle className='text-white'>
														Team Information
													</CardTitle>
												</CardHeader>
												<CardContent className='space-y-4'>
													<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
														<div>
															<label className='block text-sm font-medium text-gray-400 mb-2'>
																Team Name
															</label>
															<input
																type='text'
																defaultValue={selectedTeam.teamName}
																className='w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
															/>
														</div>
														<div>
															<label className='block text-sm font-medium text-gray-400 mb-2'>
																Industry
															</label>
															<input
																type='text'
																defaultValue={selectedTeam.industry || ''}
																className='w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
															/>
														</div>
													</div>
													<div>
														<label className='block text-sm font-medium text-gray-400 mb-2'>
															Description
														</label>
														<textarea
															defaultValue={selectedTeam.description || ''}
															rows={3}
															className='w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
														/>
													</div>
													<div>
														<label className='block text-sm font-medium text-gray-400 mb-2'>
															Target Audience
														</label>
														<input
															type='text'
															defaultValue={selectedTeam.targetAudience || ''}
															className='w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
														/>
													</div>
												</CardContent>
											</Card>

											{/* Budget Settings */}
											<Card className='bg-gray-800 border border-gray-700'>
												<CardHeader>
													<CardTitle className='text-white'>
														Default Budget Range
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
														<div>
															<label className='block text-sm font-medium text-gray-400 mb-2'>
																Minimum Budget
															</label>
															<input
																type='number'
																defaultValue={
																	selectedTeam.defaultBudget?.min || 0
																}
																className='w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
															/>
														</div>
														<div>
															<label className='block text-sm font-medium text-gray-400 mb-2'>
																Maximum Budget
															</label>
															<input
																type='number'
																defaultValue={
																	selectedTeam.defaultBudget?.max || 0
																}
																className='w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
															/>
														</div>
														<div>
															<label className='block text-sm font-medium text-gray-400 mb-2'>
																Currency
															</label>
															<select
																defaultValue={
																	selectedTeam.defaultBudget?.currency || 'USD'
																}
																className='w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'>
																<option value='USD'>USD ($)</option>
																<option value='EUR'>EUR (€)</option>
																<option value='GBP'>GBP (£)</option>
																<option value='JPY'>JPY (¥)</option>
															</select>
														</div>
													</div>
												</CardContent>
											</Card>

											{/* Campaign Types */}
											<Card className='bg-gray-800 border border-gray-700'>
												<CardHeader>
													<CardTitle className='text-white'>
														Campaign Types
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className='space-y-2'>
														{selectedTeam.campaignTypes &&
														selectedTeam.campaignTypes.length > 0 ? (
															<div className='flex flex-wrap gap-2'>
																{selectedTeam.campaignTypes.map(
																	(type, index) => (
																		<Badge
																			key={index}
																			className='bg-blue-900/20 text-blue-400'>
																			{type}
																			<button className='ml-1 text-blue-300 hover:text-blue-200'>
																				<X className='h-3 w-3' />
																			</button>
																		</Badge>
																	)
																)}
															</div>
														) : (
															<p className='text-gray-400'>
																No campaign types defined
															</p>
														)}
														<div className='flex items-center gap-2 mt-4'>
															<input
																type='text'
																placeholder='Add new campaign type'
																className='flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none'
															/>
															<Button
																size='sm'
																className='bg-blue-900/20 border-blue-700 hover:bg-blue-900/30'>
																<Plus className='h-4 w-4' />
																Add
															</Button>
														</div>
													</div>
												</CardContent>
											</Card>

											{/* Danger Zone */}
											<Card className='bg-gray-800 border border-red-700/50'>
												<CardHeader>
													<CardTitle className='text-white'>
														Danger Zone
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className='space-y-4'>
														<div className='flex items-center justify-between'>
															<div>
																<h4 className='font-medium text-white'>
																	Deactivate Team
																</h4>
																<p className='text-sm text-gray-400'>
																	Temporarily disable this team. Campaigns will
																	be paused.
																</p>
															</div>
															<Button
																variant='destructive'
																size='sm'
																className='bg-red-900/30 border-red-700 hover:bg-red-900/40'>
																<Pause className='h-4 w-4' />
																Deactivate
															</Button>
														</div>
														<div className='flex items-center justify-between'>
															<div>
																<h4 className='font-medium text-white'>
																	Delete Team
																</h4>
																<p className='text-sm text-gray-400'>
																	Permanently delete this team and all its data.
																</p>
															</div>
															<Button
																variant='destructive'
																size='sm'
																className='bg-red-900/30 border-red-700 hover:bg-red-900/40'
																onClick={() =>
																	handleDeleteTeam(selectedTeam._id)
																}>
																<Trash2 className='h-4 w-4' />
																Delete Team
															</Button>
														</div>
													</div>
												</CardContent>
											</Card>
										</div>
									)}
								</TabsContent>
							</Tabs>
						</div>
					) : (
						<div className='flex items-center justify-center h-full'>
							<div className='text-center max-w-md p-8 bg-gray-800 rounded-xl border border-gray-700'>
								<div className='bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
									<Briefcase className='w-10 h-10 text-blue-400' />
								</div>
								<h3 className='text-xl font-semibold text-white mb-2'>
									No team selected
								</h3>
								<p className='text-gray-400 mb-6'>
									Choose a team from the sidebar or create a new one to get
									started
								</p>
								<div className='flex flex-col sm:flex-row gap-3 justify-center'>
									<Button onClick={() => setShowCreateTeam(true)}>
										<Plus className='h-4 w-4 mr-1' /> Create Team
									</Button>
									<Button
										variant='outline'
										className='border-gray-700'
										onClick={() => document.querySelector('select')?.focus()}>
										<Briefcase className='h-4 w-4 mr-1' /> Select Team
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Modals */}
			<CreateTeamModal
				open={showCreateTeam}
				onOpenChange={setShowCreateTeam}
				onSuccess={handleCreateTeam}
			/>

			<AddMemberModal
				open={showAddMember}
				onOpenChange={setShowAddMember}
				team={selectedTeam}
				onSuccess={() => {}}
			/>

			<AddInfluencerModal
				open={showAddInfluencer}
				onOpenChange={setShowAddInfluencer}
				team={selectedTeam}
				onSuccess={handleAddInfluencer}
			/>

			<CreateCampaignModal
				open={showCreateCampaign}
				onOpenChange={setShowCreateCampaign}
				team={selectedTeam}
				onSubmit={handleCreateCampaign}
			/>

			{/* <AssignInfluencerModal
				open={showAssignInfluencer}
				onOpenChange={setShowAssignInfluencer}
				campaign={selectedCampaign}
				influencers={influencers}
				onSubmit={handleAssignInfluencer}
			/> */}
			<AssignInfluencerModal
				open={showAssignInfluencer}
				onOpenChange={setShowAssignInfluencer}
				campaign={selectedCampaign}
				influencers={influencers}
				// teamId={currentTeamId} // Add this line
				teamId={selectedTeam?._id || ''}
				onSubmit={handleAssignInfluencer}
			/>

			<CreateDeliverableModal
				open={showCreateDeliverable}
				onOpenChange={setShowCreateDeliverable}
				campaigns={campaigns}
				influencers={influencers}
				onSubmit={handleCreateDeliverable}
			/>

			{selectedInfluencer && (
				<InfluencerProfileModal
					open={showInfluencerProfile}
					onOpenChange={setShowInfluencerProfile}
					influencer={selectedInfluencer}
				/>
			)}
		</div>
	);
};

export default TeamsPage;
