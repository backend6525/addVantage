// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
// 	Plus,
// 	Users,
// 	UserPlus,
// 	Trash2,
// 	Edit,
// 	Settings,
// 	Search,
// 	Filter,
// 	ChevronDown,
// 	BarChart3,
// 	Bell,
// 	Star,
// 	Calendar,
// 	FileText,
// 	Activity,
// 	Download,
// 	Target,
// 	TrendingUp,
// 	Play,
// 	Pause,
// 	Clock,
// 	CheckCircle,
// 	AlertCircle,
// 	DollarSign,
// 	Eye,
// 	Heart,
// 	MessageCircle,
// 	Share2,
// 	Camera,
// 	Video,
// 	Image,
// 	Link,
// 	X,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import {
// 	Tabs,
// 	TabsContent,
// 	TabsList,
// 	TabsTrigger,
// } from '@/components/ui/Tabs/Tabs';
// import {
// 	CreateCampaignModal,
// 	AssignInfluencerModal,
// 	CreateDeliverableModal,
// 	InfluencerProfileModal,
// } from './models';
// import { CreateTeamModal, AddMemberModal, AddInfluencerModal } from './modals';
// import { toast } from 'sonner';

// interface Team {
// 	_id: string;
// 	teamName: string;
// 	createdBy: string;
// 	description?: string;
// 	industry?: string;
// 	targetAudience?: string;
// 	defaultBudget?: {
// 		min: number;
// 		max: number;
// 		currency: string;
// 	};
// 	campaignTypes?: string[];
// 	isActive: boolean;
// 	createdAt: number;
// 	updatedAt: number;
// }

// interface Campaign {
// 	_id: string;
// 	teamId: string;
// 	campaignName: string;
// 	description: string;
// 	budget: {
// 		total: number;
// 		currency: string;
// 	};
// 	startDate: number;
// 	endDate: number;
// 	status: 'draft' | 'active' | 'completed' | 'cancelled';
// 	targetAudience: {
// 		demographics?: string;
// 		interests: string[];
// 		locations: string[];
// 	};
// 	createdBy: string;
// 	createdAt: number;
// 	updatedAt: number;
// }

// interface Influencer {
// 	_id: string;
// 	email: string;
// 	firstName: string;
// 	lastName: string;
// 	phoneNumber?: string;
// 	location: {
// 		city?: string;
// 		state?: string;
// 		country: string;
// 		timezone?: string;
// 	};
// 	bio?: string;
// 	website?: string;
// 	occupation?: string;
// 	expertise?: string[];
// 	socialProfiles?: SocialProfile[];
// 	businessInfo?: InfluencerBusiness;
// 	status: 'active' | 'inactive' | 'suspended';
// }

// interface SocialProfile {
// 	_id: string;
// 	platform: string;
// 	username: string;
// 	profileUrl: string;
// 	isVerified: boolean;
// 	followerCount: number;
// 	engagementRate?: number;
// 	averageLikes?: number;
// 	averageComments?: number;
// 	isActive: boolean;
// }

// interface InfluencerBusiness {
// 	contentCategories: string[];
// 	ratesAndPricing: {
// 		sponsoredPost?: { min: number; max: number; currency: string };
// 		story?: { min: number; max: number; currency: string };
// 		reel?: { min: number; max: number; currency: string };
// 		ugc?: { min: number; max: number; currency: string };
// 	};
// 	availability: {
// 		isAvailable: boolean;
// 		workingHours?: string;
// 		responseTime?: string;
// 	};
// }

// interface ContentDeliverable {
// 	_id: string;
// 	campaignId: string;
// 	influencerId: string;
// 	contentType: string;
// 	status: 'draft' | 'submitted' | 'approved' | 'published' | 'revision_needed';
// 	scheduledPostTime?: number;
// 	actualPostTime?: number;
// 	performance?: {
// 		reach?: number;
// 		impressions?: number;
// 		engagement?: number;
// 		clicks?: number;
// 	};
// }

// const TeamsPage = () => {
// 	// State management
// 	const [teams, setTeams] = useState<Team[]>([]);
// 	const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
// 	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
// 	const [influencers, setInfluencers] = useState<Influencer[]>([]);
// 	const [deliverables, setDeliverables] = useState<ContentDeliverable[]>([]);
// 	const [analytics, setAnalytics] = useState<any>(null);

// 	const [loading, setLoading] = useState({
// 		user: false,
// 		teams: false,
// 		campaigns: false,
// 		influencers: false,
// 		deliverables: false,
// 		analytics: false,
// 	});

// 	// Modal states
// 	const [showCreateTeam, setShowCreateTeam] = useState(false);
// 	const [showAddMember, setShowAddMember] = useState(false);
// 	const [showAddInfluencer, setShowAddInfluencer] = useState(false);
// 	const [showCreateCampaign, setShowCreateCampaign] = useState(false);
// 	const [showAssignInfluencer, setShowAssignInfluencer] = useState(false);
// 	const [showCreateDeliverable, setShowCreateDeliverable] = useState(false);
// 	const [showInfluencerProfile, setShowInfluencerProfile] = useState(false);

// 	const [selectedInfluencer, setSelectedInfluencer] =
// 		useState<Influencer | null>(null);
// 	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
// 		null
// 	);

// 	const [currentUser, setCurrentUser] = useState<any>(null);
// 	const [expandedSection, setExpandedSection] = useState('none');
// 	const [activeTab, setActiveTab] = useState('overview');
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const [filterStatus, setFilterStatus] = useState('all');

// 	// Fetch functions
// 	const fetchUser = async () => {
// 		try {
// 			const response = await fetch('/api/auth/user');
// 			if (!response.ok) throw new Error('Failed to fetch user');
// 			const userData = await response.json();
// 			return userData;
// 		} catch (error) {
// 			console.error('Error fetching user:', error);
// 			throw error;
// 		}
// 	};

// 	const fetchTeams = async (userEmail: string) => {
// 		try {
// 			const response = await fetch(
// 				`/api/teams?email=${encodeURIComponent(userEmail)}`
// 			);
// 			if (!response.ok) throw new Error('Failed to fetch teams');
// 			const teamsData = await response.json();
// 			return Array.isArray(teamsData) ? teamsData : [];
// 		} catch (error) {
// 			console.error('Error fetching teams:', error);
// 			throw error;
// 		}
// 	};

// 	const fetchCampaigns = async (teamId: string) => {
// 		try {
// 			setLoading((prev) => ({ ...prev, campaigns: true }));
// 			const response = await fetch(
// 				`/api/teams?teamId=${teamId}&type=campaigns`
// 			);
// 			if (!response.ok) throw new Error('Failed to fetch campaigns');
// 			const campaignsData = await response.json();
// 			setCampaigns(Array.isArray(campaignsData) ? campaignsData : []);
// 		} catch (error) {
// 			console.error('Error fetching campaigns:', error);
// 			setCampaigns([]);
// 		} finally {
// 			setLoading((prev) => ({ ...prev, campaigns: false }));
// 		}
// 	};

// 	const fetchTeamInfluencers = async (teamId: string) => {
// 		try {
// 			setLoading((prev) => ({ ...prev, influencers: true }));
// 			const response = await fetch(
// 				`/api/teams?teamId=${teamId}&type=influencers`
// 			);
// 			if (!response.ok) throw new Error('Failed to fetch influencers');
// 			const influencersData = await response.json();
// 			setInfluencers(Array.isArray(influencersData) ? influencersData : []);
// 		} catch (error) {
// 			console.error('Error fetching influencers:', error);
// 			setInfluencers([]);
// 		} finally {
// 			setLoading((prev) => ({ ...prev, influencers: false }));
// 		}
// 	};

// 	const fetchDeliverables = async (campaignId?: string) => {
// 		try {
// 			setLoading((prev) => ({ ...prev, deliverables: true }));
// 			const url = campaignId
// 				? `/api/deliverables?campaignId=${campaignId}`
// 				: `/api/deliverables?teamId=${selectedTeam?._id}`;
// 			const response = await fetch(url);
// 			if (!response.ok) throw new Error('Failed to fetch deliverables');
// 			const deliverablesData = await response.json();
// 			setDeliverables(Array.isArray(deliverablesData) ? deliverablesData : []);
// 		} catch (error) {
// 			console.error('Error fetching deliverables:', error);
// 			setDeliverables([]);
// 		} finally {
// 			setLoading((prev) => ({ ...prev, deliverables: false }));
// 		}
// 	};

// 	const fetchAnalytics = async (teamId: string) => {
// 		try {
// 			setLoading((prev) => ({ ...prev, analytics: true }));
// 			const response = await fetch(`/api/analytics/team/${teamId}`);
// 			if (!response.ok) throw new Error('Failed to fetch analytics');
// 			const analyticsData = await response.json();
// 			setAnalytics(analyticsData);
// 		} catch (error) {
// 			console.error('Error fetching analytics:', error);
// 			setAnalytics(null);
// 		} finally {
// 			setLoading((prev) => ({ ...prev, analytics: false }));
// 		}
// 	};

// 	// Initial data loading
// 	useEffect(() => {
// 		const fetchUserAndTeams = async () => {
// 			try {
// 				setLoading({
// 					user: true,
// 					teams: false,
// 					campaigns: false,
// 					influencers: false,
// 					deliverables: false,
// 					analytics: false,
// 				});

// 				const userData = await fetchUser();
// 				setCurrentUser(userData);

// 				setLoading((prev) => ({ ...prev, user: false, teams: true }));
// 				const teamsData = await fetchTeams(userData.email);
// 				setTeams(teamsData);

// 				if (teamsData.length > 0 && !selectedTeam) {
// 					const firstTeam = teamsData[0];
// 					setSelectedTeam(firstTeam);
// 					// Fetch related data for the first team
// 					await Promise.all([
// 						fetchCampaigns(firstTeam._id),
// 						fetchTeamInfluencers(firstTeam._id),
// 						fetchAnalytics(firstTeam._id),
// 					]);
// 				}
// 			} catch (error) {
// 				console.error('Error in fetch operation:', error);
// 				toast.error('Failed to load data');
// 			} finally {
// 				setLoading((prev) => ({ ...prev, teams: false }));
// 			}
// 		};

// 		fetchUserAndTeams();
// 	}, []);

// 	// Load related data when team changes
// 	useEffect(() => {
// 		if (selectedTeam) {
// 			Promise.all([
// 				fetchCampaigns(selectedTeam._id),
// 				fetchTeamInfluencers(selectedTeam._id),
// 				fetchAnalytics(selectedTeam._id),
// 				fetchDeliverables(),
// 			]);
// 		}
// 	}, [selectedTeam?._id]);

// 	// Handler functions
// 	const handleCreateTeam = async (teamData: any) => {
// 		try {
// 			const response = await fetch('/api/teams', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					action: 'createTeam',
// 					...teamData,
// 				}),
// 			});

// 			if (response.ok) {
// 				const result = await response.json();
// 				const updatedTeams = await fetchTeams(currentUser.email);
// 				setTeams(updatedTeams);
// 				setShowCreateTeam(false);
// 				toast.success('Team created successfully!');
// 			}
// 		} catch (error) {
// 			console.error('Error creating team:', error);
// 			toast.error('Failed to create team');
// 		}
// 	};

// 	const handleCreateCampaign = async (campaignData: any) => {
// 		try {
// 			const response = await fetch('/api/teams', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					action: 'createCampaign',
// 					teamId: selectedTeam?._id,
// 					...campaignData,
// 				}),
// 			});

// 			if (response.ok) {
// 				await fetchCampaigns(selectedTeam!._id);
// 				setShowCreateCampaign(false);
// 				toast.success('Campaign created successfully!');
// 			}
// 		} catch (error) {
// 			console.error('Error creating campaign:', error);
// 			toast.error('Failed to create campaign');
// 		}
// 	};

// 	const handleAssignInfluencer = async (assignmentData: any) => {
// 		try {
// 			const response = await fetch('/api/teams', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					action: 'assignInfluencerToCampaign',
// 					...assignmentData,
// 				}),
// 			});

// 			if (response.ok) {
// 				await fetchCampaigns(selectedTeam!._id);
// 				setShowAssignInfluencer(false);
// 				toast.success('Influencer assigned successfully!');
// 			}
// 		} catch (error) {
// 			console.error('Error assigning influencer:', error);
// 			toast.error('Failed to assign influencer');
// 		}
// 	};

// 	const handleDeleteTeam = async (teamId: string) => {
// 		if (window.confirm('Are you sure you want to delete this team?')) {
// 			try {
// 				const response = await fetch('/api/teams', {
// 					method: 'DELETE',
// 					headers: { 'Content-Type': 'application/json' },
// 					body: JSON.stringify({
// 						action: 'deleteTeam',
// 						teamId,
// 					}),
// 				});

// 				if (response.ok) {
// 					const updatedTeams = await fetchTeams(currentUser.email);
// 					setTeams(updatedTeams);
// 					setSelectedTeam(null);
// 					toast.success('Team deleted successfully');
// 				}
// 			} catch (error) {
// 				console.error('Error deleting team:', error);
// 				toast.error('Failed to delete team');
// 			}
// 		}
// 	};

// 	const handleAddInfluencer = async (influencerData: any) => {
// 		try {
// 			const response = await fetch('/api/teams', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					action: 'createInfluencerAndAddToTeam',
// 					teamId: selectedTeam?._id,
// 					influencerData: influencerData.influencerData,
// 					socialProfiles: influencerData.socialProfiles,
// 				}),
// 			});

// 			if (response.ok) {
// 				await fetchTeamInfluencers(selectedTeam!._id);
// 				setShowAddInfluencer(false);
// 				toast.success('Influencer added successfully!');
// 			}
// 		} catch (error) {
// 			console.error('Error adding influencer:', error);
// 			toast.error('Failed to add influencer');
// 		}
// 	};

// 	const handleCreateDeliverable = async (deliverableData: any) => {
// 		try {
// 			const response = await fetch('/api/deliverables', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify(deliverableData),
// 			});

// 			if (response.ok) {
// 				await fetchDeliverables();
// 				setShowCreateDeliverable(false);
// 				toast.success('Deliverable created successfully!');
// 			}
// 		} catch (error) {
// 			console.error('Error creating deliverable:', error);
// 			toast.error('Failed to create deliverable');
// 		}
// 	};

// 	const toggleSection = (section: string) => {
// 		setExpandedSection(expandedSection === section ? 'none' : section);
// 	};

// 	const handleTeamSelect = (team: Team) => {
// 		setSelectedTeam(team);
// 		setActiveTab('overview');
// 	};

// 	const handleUpdateTeam = async (updates: any) => {
// 		try {
// 			const response = await fetch('/api/teams', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					action: 'updateTeam',
// 					teamId: selectedTeam?._id,
// 					updates,
// 				}),
// 			});

// 			if (response.ok) {
// 				const updatedTeams = await fetchTeams(currentUser.email);
// 				setTeams(updatedTeams);
// 				if (selectedTeam) {
// 					setSelectedTeam(
// 						updatedTeams.find((t) => t._id === selectedTeam._id) || null
// 					);
// 				}
// 				toast.success('Team updated successfully');
// 			}
// 		} catch (error) {
// 			console.error('Error updating team:', error);
// 			toast.error('Failed to update team');
// 		}
// 	};

// 	const getStatusColor = (status: string) => {
// 		switch (status) {
// 			case 'active':
// 				return 'bg-green-500';
// 			case 'draft':
// 				return 'bg-yellow-500';
// 			case 'completed':
// 				return 'bg-blue-500';
// 			case 'cancelled':
// 				return 'bg-red-500';
// 			default:
// 				return 'bg-gray-500';
// 		}
// 	};

// 	const formatCurrency = (amount: number, currency: string) => {
// 		return new Intl.NumberFormat('en-US', {
// 			style: 'currency',
// 			currency: currency || 'USD',
// 		}).format(amount);
// 	};

// 	const formatNumber = (num: number) => {
// 		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
// 		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
// 		return num.toString();
// 	};

// 	// Loading state
// 	if (loading.user || loading.teams) {
// 		return (
// 			<div className='flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-900'>
// 				<div className='text-center'>
// 					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
// 					<p className='text-gray-400'>Loading teams...</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	// Empty state
// 	if (!loading.user && !loading.teams && teams.length === 0) {
// 		return (
// 			<div className='flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-900'>
// 				<div className='text-center'>
// 					<Users className='w-16 h-16 mx-auto mb-4 text-gray-300' />
// 					<h3 className='text-lg font-medium text-white mb-2'>
// 						No teams found
// 					</h3>
// 					<p className='text-gray-400 mb-6'>
// 						You haven&apos;t joined or created any teams yet.
// 					</p>
// 					<Button onClick={() => setShowCreateTeam(true)}>
// 						Create New Team
// 					</Button>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='flex flex-col h-[calc(100vh-4rem)] bg-gray-900 text-gray-100 mt-16'>
// 			{/* Enhanced Header */}
// 			<div className='flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50'>
// 				<div className='flex items-center gap-4'>
// 					<h1 className='text-xl md:text-2xl font-bold text-white'>
// 						Team Management
// 					</h1>
// 					<select
// 						className='bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 						value={selectedTeam?._id || ''}
// 						onChange={(e) => {
// 							const team = teams.find((t) => t._id === e.target.value);
// 							if (team) handleTeamSelect(team);
// 						}}>
// 						<option value=''>Select Team</option>
// 						{teams.map((team) => (
// 							<option key={team._id} value={team._id}>
// 								{team.teamName}
// 							</option>
// 						))}
// 					</select>
// 					{selectedTeam && (
// 						<Badge
// 							className={`${getStatusColor(selectedTeam.isActive ? 'active' : 'inactive')} text-white`}>
// 							{selectedTeam.isActive ? 'Active' : 'Inactive'}
// 						</Badge>
// 					)}
// 				</div>
// 				<div className='flex items-center gap-3'>
// 					<Button
// 						variant='outline'
// 						className='gap-1.5 bg-gray-700/50 border-gray-600 hover:bg-gray-700/70'
// 						onClick={() => setShowAddInfluencer(true)}
// 						disabled={!selectedTeam}>
// 						<UserPlus className='h-4 w-4' />
// 						Add Influencer
// 					</Button>
// 					<Button
// 						variant='secondary'
// 						className='gap-1.5 bg-gray-800/60 hover:bg-gray-800/80 border-gray-700'
// 						onClick={() => setShowCreateCampaign(true)}
// 						disabled={!selectedTeam}>
// 						<Target className='h-4 w-4' />
// 						New Campaign
// 					</Button>
// 					<Button
// 						className='gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
// 						onClick={() => setShowCreateTeam(true)}>
// 						<Plus className='h-4 w-4' />
// 						Create Team
// 					</Button>
// 				</div>
// 			</div>

// 			{/* Main Content */}
// 			<div className='flex flex-1 overflow-hidden'>
// 				{/* Enhanced Sidebar */}
// 				<div className='w-80 border-r border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-y-auto hidden lg:block'>
// 					<div className='p-4'>
// 						{/* Quick Stats */}
// 						<div className='mb-6'>
// 							<h3 className='text-sm font-medium text-gray-400 mb-3'>
// 								Quick Stats
// 							</h3>
// 							<div className='grid grid-cols-2 gap-2'>
// 								<div className='bg-gray-700/30 p-3 rounded-lg'>
// 									<div className='text-xs text-gray-400'>Teams</div>
// 									<div className='text-lg font-semibold text-white'>
// 										{teams.length}
// 									</div>
// 								</div>
// 								<div className='bg-gray-700/30 p-3 rounded-lg'>
// 									<div className='text-xs text-gray-400'>Campaigns</div>
// 									<div className='text-lg font-semibold text-white'>
// 										{campaigns.length}
// 									</div>
// 								</div>
// 								<div className='bg-gray-700/30 p-3 rounded-lg'>
// 									<div className='text-xs text-gray-400'>Influencers</div>
// 									<div className='text-lg font-semibold text-white'>
// 										{influencers.length}
// 									</div>
// 								</div>
// 								<div className='bg-gray-700/30 p-3 rounded-lg'>
// 									<div className='text-xs text-gray-400'>Content</div>
// 									<div className='text-lg font-semibold text-white'>
// 										{deliverables.length}
// 									</div>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Navigation */}
// 						<div className='mb-6'>
// 							<h3 className='text-sm font-medium text-gray-400 mb-3'>
// 								Navigation
// 							</h3>
// 							<div className='space-y-1'>
// 								{[
// 									{ id: 'overview', label: 'Overview', icon: BarChart3 },
// 									{ id: 'campaigns', label: 'Campaigns', icon: Target },
// 									{ id: 'influencers', label: 'Influencers', icon: Users },
// 									{ id: 'content', label: 'Content', icon: FileText },
// 									{ id: 'analytics', label: 'Analytics', icon: TrendingUp },
// 									{ id: 'settings', label: 'Settings', icon: Settings },
// 								].map((tab) => (
// 									<Button
// 										key={tab.id}
// 										variant='ghost'
// 										className={`w-full justify-start gap-2 ${
// 											activeTab === tab.id
// 												? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400'
// 												: 'text-gray-300 hover:text-white hover:bg-gray-700/50'
// 										}`}
// 										onClick={() => setActiveTab(tab.id)}>
// 										<tab.icon className='h-4 w-4' />
// 										{tab.label}
// 									</Button>
// 								))}
// 							</div>
// 						</div>

// 						{/* Recent Activity */}
// 						<div className='mb-6'>
// 							<div
// 								className='flex items-center justify-between py-2 px-1 cursor-pointer'
// 								onClick={() => toggleSection('activity')}>
// 								<h3 className='text-sm font-medium text-gray-400'>
// 									Recent Activity
// 								</h3>
// 								<ChevronDown
// 									className={`h-4 w-4 text-gray-400 transform transition-transform ${
// 										expandedSection === 'activity' ? 'rotate-180' : ''
// 									}`}
// 								/>
// 							</div>

// 							{expandedSection === 'activity' && (
// 								<div className='space-y-2 mt-2'>
// 									{campaigns.slice(0, 3).map((campaign) => (
// 										<div
// 											key={campaign._id}
// 											className='bg-gray-700/30 p-2 rounded-lg'>
// 											<div className='flex items-center gap-2'>
// 												<div
// 													className={`w-2 h-2 rounded-full ${getStatusColor(campaign.status)}`}></div>
// 												<div className='flex-1 min-w-0'>
// 													<p className='text-xs font-medium text-white truncate'>
// 														{campaign.campaignName}
// 													</p>
// 													<p className='text-xs text-gray-400 capitalize'>
// 														{campaign.status}
// 													</p>
// 												</div>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							)}
// 						</div>

// 						{/* Team List */}
// 						<div>
// 							<h3 className='text-sm font-medium text-gray-400 mb-3'>Teams</h3>
// 							<div className='space-y-2'>
// 								{teams.map((team) => (
// 									<div
// 										key={team._id}
// 										className={`p-2 rounded-lg cursor-pointer transition-colors ${
// 											selectedTeam?._id === team._id
// 												? 'bg-blue-600/20 border border-blue-600/30'
// 												: 'bg-gray-700/30 hover:bg-gray-700/50'
// 										}`}
// 										onClick={() => handleTeamSelect(team)}>
// 										<div className='flex items-center gap-2'>
// 											<div className='bg-gradient-to-br from-blue-500 to-blue-400 w-8 h-8 rounded-lg flex items-center justify-center text-white font-medium text-sm'>
// 												{team.teamName.charAt(0)}
// 											</div>
// 											<div className='flex-1 min-w-0'>
// 												<p className='text-sm font-medium text-white truncate'>
// 													{team.teamName}
// 												</p>
// 												<p className='text-xs text-gray-400'>
// 													{team.industry || 'No industry'}
// 												</p>
// 											</div>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Main Content Area */}
// 				<div className='flex-1 overflow-auto'>
// 					{selectedTeam ? (
// 						<div className='p-6'>
// 							<Tabs value={activeTab} onValueChange={setActiveTab}>
// 								<TabsList className='grid w-full grid-cols-6 bg-gray-800/50'>
// 									<TabsTrigger value='overview'>Overview</TabsTrigger>
// 									<TabsTrigger value='campaigns'>Campaigns</TabsTrigger>
// 									<TabsTrigger value='influencers'>Influencers</TabsTrigger>
// 									<TabsTrigger value='content'>Content</TabsTrigger>
// 									<TabsTrigger value='analytics'>Analytics</TabsTrigger>
// 									<TabsTrigger value='settings'>Settings</TabsTrigger>
// 								</TabsList>

// 								{/* Overview Tab */}
// 								<TabsContent value='overview' className='space-y-6'>
// 									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
// 										<Card className='bg-gray-800/50 border-gray-700'>
// 											<CardContent className='p-6'>
// 												<div className='flex items-center justify-between'>
// 													<div>
// 														<p className='text-gray-400 text-sm'>
// 															Active Campaigns
// 														</p>
// 														<p className='text-2xl font-bold text-white'>
// 															{
// 																campaigns.filter((c) => c.status === 'active')
// 																	.length
// 															}
// 														</p>
// 													</div>
// 													<Target className='h-8 w-8 text-blue-500' />
// 												</div>
// 											</CardContent>
// 										</Card>

// 										<Card className='bg-gray-800/50 border-gray-700'>
// 											<CardContent className='p-6'>
// 												<div className='flex items-center justify-between'>
// 													<div>
// 														<p className='text-gray-400 text-sm'>
// 															Team Influencers
// 														</p>
// 														<p className='text-2xl font-bold text-white'>
// 															{influencers.length}
// 														</p>
// 													</div>
// 													<Users className='h-8 w-8 text-green-500' />
// 												</div>
// 											</CardContent>
// 										</Card>

// 										<Card className='bg-gray-800/50 border-gray-700'>
// 											<CardContent className='p-6'>
// 												<div className='flex items-center justify-between'>
// 													<div>
// 														<p className='text-gray-400 text-sm'>
// 															Content Pieces
// 														</p>
// 														<p className='text-2xl font-bold text-white'>
// 															{deliverables.length}
// 														</p>
// 													</div>
// 													<FileText className='h-8 w-8 text-purple-500' />
// 												</div>
// 											</CardContent>
// 										</Card>

// 										<Card className='bg-gray-800/50 border-gray-700'>
// 											<CardContent className='p-6'>
// 												<div className='flex items-center justify-between'>
// 													<div>
// 														<p className='text-gray-400 text-sm'>
// 															Total Budget
// 														</p>
// 														<p className='text-2xl font-bold text-white'>
// 															{selectedTeam.defaultBudget
// 																? formatCurrency(
// 																		selectedTeam.defaultBudget.max,
// 																		selectedTeam.defaultBudget.currency
// 																	)
// 																: '$0'}
// 														</p>
// 													</div>
// 													<DollarSign className='h-8 w-8 text-yellow-500' />
// 												</div>
// 											</CardContent>
// 										</Card>
// 									</div>

// 									{/* Recent Campaigns */}
// 									<Card className='bg-gray-800/50 border-gray-700'>
// 										<CardHeader>
// 											<CardTitle className='text-white'>
// 												Recent Campaigns
// 											</CardTitle>
// 										</CardHeader>
// 										<CardContent>
// 											{loading.campaigns ? (
// 												<div className='text-center py-8'>
// 													<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
// 												</div>
// 											) : campaigns.length > 0 ? (
// 												<div className='space-y-4'>
// 													{campaigns.slice(0, 5).map((campaign) => (
// 														<div
// 															key={campaign._id}
// 															className='flex items-center justify-between p-4 bg-gray-700/30 rounded-lg'>
// 															<div className='flex items-center gap-3'>
// 																<div
// 																	className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`}></div>
// 																<div>
// 																	<p className='font-medium text-white'>
// 																		{campaign.campaignName}
// 																	</p>
// 																	<p className='text-sm text-gray-400'>
// 																		{campaign.description}
// 																	</p>
// 																</div>
// 															</div>
// 															<div className='text-right'>
// 																<p className='text-sm text-white'>
// 																	{formatCurrency(
// 																		campaign.budget.total,
// 																		campaign.budget.currency
// 																	)}
// 																</p>
// 																<Badge
// 																	className={`${getStatusColor(campaign.status)} text-white text-xs`}>
// 																	{campaign.status}
// 																</Badge>
// 															</div>
// 														</div>
// 													))}
// 												</div>
// 											) : (
// 												<div className='text-center py-8'>
// 													<Target className='w-12 h-12 mx-auto mb-4 text-gray-400' />
// 													<p className='text-gray-400'>No campaigns yet</p>
// 													<Button
// 														className='mt-4'
// 														onClick={() => setShowCreateCampaign(true)}>
// 														Create Campaign
// 													</Button>
// 												</div>
// 											)}
// 										</CardContent>
// 									</Card>

// 									{/* Team Influencers Preview */}
// 									<Card className='bg-gray-800/50 border-gray-700'>
// 										<CardHeader>
// 											<CardTitle className='text-white'>
// 												Team Influencers
// 											</CardTitle>
// 										</CardHeader>
// 										<CardContent>
// 											{loading.influencers ? (
// 												<div className='text-center py-8'>
// 													<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
// 												</div>
// 											) : influencers.length > 0 ? (
// 												<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
// 													{influencers.slice(0, 6).map((influencer) => (
// 														<div
// 															key={influencer._id}
// 															className='p-4 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors'
// 															onClick={() => {
// 																setSelectedInfluencer(influencer);
// 																setShowInfluencerProfile(true);
// 															}}>
// 															<div className='flex items-center gap-3'>
// 																<div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium'>
// 																	{influencer.firstName?.charAt(0)}
// 																	{influencer.lastName?.charAt(0)}
// 																</div>
// 																<div className='flex-1 min-w-0'>
// 																	<p className='font-medium text-white truncate'>
// 																		{influencer.firstName} {influencer.lastName}
// 																	</p>
// 																	<p className='text-sm text-gray-400'>
// 																		{influencer.location.country}
// 																	</p>
// 																	{influencer.socialProfiles &&
// 																		influencer.socialProfiles.length > 0 && (
// 																			<p className='text-xs text-gray-500'>
// 																				{formatNumber(
// 																					influencer.socialProfiles[0]
// 																						.followerCount
// 																				)}{' '}
// 																				followers
// 																			</p>
// 																		)}
// 																</div>
// 															</div>
// 														</div>
// 													))}
// 												</div>
// 											) : (
// 												<div className='text-center py-8'>
// 													<Users className='w-12 h-12 mx-auto mb-4 text-gray-400' />
// 													<p className='text-gray-400'>
// 														No influencers in this team yet
// 													</p>
// 													<Button
// 														className='mt-4'
// 														onClick={() => setShowAddInfluencer(true)}>
// 														Add Influencer
// 													</Button>
// 												</div>
// 											)}
// 										</CardContent>
// 									</Card>
// 								</TabsContent>

// 								{/* Campaigns Tab */}
// 								<TabsContent value='campaigns' className='space-y-6'>
// 									<div className='flex items-center justify-between'>
// 										<h2 className='text-xl font-bold text-white'>Campaigns</h2>
// 										<div className='flex items-center gap-3'>
// 											<div className='relative'>
// 												<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
// 												<input
// 													type='text'
// 													placeholder='Search campaigns...'
// 													className='bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none'
// 													value={searchTerm}
// 													onChange={(e) => setSearchTerm(e.target.value)}
// 												/>
// 											</div>
// 											<select
// 												className='bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 												value={filterStatus}
// 												onChange={(e) => setFilterStatus(e.target.value)}>
// 												<option value='all'>All Status</option>
// 												<option value='draft'>Draft</option>
// 												<option value='active'>Active</option>
// 												<option value='completed'>Completed</option>
// 												<option value='cancelled'>Cancelled</option>
// 											</select>
// 											<Button onClick={() => setShowCreateCampaign(true)}>
// 												<Plus className='h-4 w-4' />
// 												New Campaign
// 											</Button>
// 										</div>
// 									</div>

// 									<div className='grid gap-6'>
// 										{loading.campaigns ? (
// 											<div className='text-center py-12'>
// 												<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
// 												<p className='text-gray-400'>Loading campaigns...</p>
// 											</div>
// 										) : campaigns.filter((campaign) => {
// 												const matchesSearch =
// 													campaign.campaignName
// 														.toLowerCase()
// 														.includes(searchTerm.toLowerCase()) ||
// 													campaign.description
// 														.toLowerCase()
// 														.includes(searchTerm.toLowerCase());
// 												const matchesStatus =
// 													filterStatus === 'all' ||
// 													campaign.status === filterStatus;
// 												return matchesSearch && matchesStatus;
// 										  }).length > 0 ? (
// 											campaigns
// 												.filter((campaign) => {
// 													const matchesSearch =
// 														campaign.campaignName
// 															.toLowerCase()
// 															.includes(searchTerm.toLowerCase()) ||
// 														campaign.description
// 															.toLowerCase()
// 															.includes(searchTerm.toLowerCase());
// 													const matchesStatus =
// 														filterStatus === 'all' ||
// 														campaign.status === filterStatus;
// 													return matchesSearch && matchesStatus;
// 												})
// 												.map((campaign) => (
// 													<Card
// 														key={campaign._id}
// 														className='bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors'>
// 														<CardContent className='p-6'>
// 															<div className='flex items-start justify-between'>
// 																<div className='flex-1'>
// 																	<div className='flex items-center gap-3 mb-2'>
// 																		<h3 className='text-lg font-semibold text-white'>
// 																			{campaign.campaignName}
// 																		</h3>
// 																		<Badge
// 																			className={`${getStatusColor(campaign.status)} text-white`}>
// 																			{campaign.status}
// 																		</Badge>
// 																	</div>
// 																	<p className='text-gray-400 mb-4'>
// 																		{campaign.description}
// 																	</p>
// 																	<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				Budget
// 																			</p>
// 																			<p className='text-sm font-medium text-white'>
// 																				{formatCurrency(
// 																					campaign.budget.total,
// 																					campaign.budget.currency
// 																				)}
// 																			</p>
// 																		</div>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				Start Date
// 																			</p>
// 																			<p className='text-sm font-medium text-white'>
// 																				{new Date(
// 																					campaign.startDate
// 																				).toLocaleDateString()}
// 																			</p>
// 																		</div>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				End Date
// 																			</p>
// 																			<p className='text-sm font-medium text-white'>
// 																				{new Date(
// 																					campaign.endDate
// 																				).toLocaleDateString()}
// 																			</p>
// 																		</div>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				Target Locations
// 																			</p>
// 																			<p className='text-sm font-medium text-white'>
// 																				{
// 																					campaign.targetAudience.locations
// 																						.length
// 																				}{' '}
// 																				locations
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div className='flex items-center gap-2 ml-4'>
// 																	<Button
// 																		variant='outline'
// 																		size='sm'
// 																		onClick={() => {
// 																			setSelectedCampaign(campaign);
// 																			setShowAssignInfluencer(true);
// 																		}}>
// 																		<UserPlus className='h-4 w-4' />
// 																		Assign
// 																	</Button>
// 																	<Button variant='outline' size='sm'>
// 																		<Edit className='h-4 w-4' />
// 																	</Button>
// 																</div>
// 															</div>
// 														</CardContent>
// 													</Card>
// 												))
// 										) : (
// 											<div className='text-center py-12'>
// 												<Target className='w-16 h-16 mx-auto mb-4 text-gray-400' />
// 												<h3 className='text-lg font-medium text-white mb-2'>
// 													No campaigns found
// 												</h3>
// 												<p className='text-gray-400 mb-6'>
// 													{searchTerm || filterStatus !== 'all'
// 														? 'No campaigns match your current filters.'
// 														: 'Create your first campaign to get started.'}
// 												</p>
// 												{!searchTerm && filterStatus === 'all' && (
// 													<Button onClick={() => setShowCreateCampaign(true)}>
// 														<Plus className='h-4 w-4' />
// 														Create Campaign
// 													</Button>
// 												)}
// 											</div>
// 										)}
// 									</div>
// 								</TabsContent>

// 								{/* Influencers Tab */}
// 								<TabsContent value='influencers' className='space-y-6'>
// 									<div className='flex items-center justify-between'>
// 										<h2 className='text-xl font-bold text-white'>
// 											Team Influencers
// 										</h2>
// 										<Button onClick={() => setShowAddInfluencer(true)}>
// 											<UserPlus className='h-4 w-4' />
// 											Add Influencer
// 										</Button>
// 									</div>

// 									<div className='grid gap-6'>
// 										{loading.influencers ? (
// 											<div className='text-center py-12'>
// 												<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
// 												<p className='text-gray-400'>Loading influencers...</p>
// 											</div>
// 										) : influencers.length > 0 ? (
// 											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
// 												{influencers.map((influencer) => (
// 													<Card
// 														key={influencer._id}
// 														className='bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer'
// 														onClick={() => {
// 															setSelectedInfluencer(influencer);
// 															setShowInfluencerProfile(true);
// 														}}>
// 														<CardContent className='p-6'>
// 															<div className='flex items-center gap-4 mb-4'>
// 																<div className='w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-lg'>
// 																	{influencer.firstName?.charAt(0)}
// 																	{influencer.lastName?.charAt(0)}
// 																</div>
// 																<div className='flex-1 min-w-0'>
// 																	<h3 className='font-semibold text-white truncate'>
// 																		{influencer.firstName} {influencer.lastName}
// 																	</h3>
// 																	<p className='text-sm text-gray-400'>
// 																		{influencer.location.country}
// 																	</p>
// 																	<Badge
// 																		className={`mt-1 ${influencer.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs`}>
// 																		{influencer.status}
// 																	</Badge>
// 																</div>
// 															</div>

// 															{influencer.socialProfiles &&
// 																influencer.socialProfiles.length > 0 && (
// 																	<div className='space-y-2'>
// 																		{influencer.socialProfiles
// 																			.slice(0, 2)
// 																			.map((profile) => (
// 																				<div
// 																					key={profile._id}
// 																					className='flex items-center justify-between p-2 bg-gray-700/30 rounded'>
// 																					<div className='flex items-center gap-2'>
// 																						<span className='text-sm font-medium text-white capitalize'>
// 																							{profile.platform}
// 																						</span>
// 																						{profile.isVerified && (
// 																							<CheckCircle className='h-4 w-4 text-blue-500' />
// 																						)}
// 																					</div>
// 																					<span className='text-sm text-gray-400'>
// 																						{formatNumber(
// 																							profile.followerCount
// 																						)}
// 																					</span>
// 																				</div>
// 																			))}
// 																	</div>
// 																)}

// 															{influencer.expertise &&
// 																influencer.expertise.length > 0 && (
// 																	<div className='mt-4 flex flex-wrap gap-1'>
// 																		{influencer.expertise
// 																			.slice(0, 3)
// 																			.map((skill, index) => (
// 																				<Badge
// 																					key={index}
// 																					className='bg-blue-600/20 text-blue-400 text-xs'>
// 																					{skill}
// 																				</Badge>
// 																			))}
// 																		{influencer.expertise.length > 3 && (
// 																			<Badge className='bg-gray-600/20 text-gray-400 text-xs'>
// 																				+{influencer.expertise.length - 3} more
// 																			</Badge>
// 																		)}
// 																	</div>
// 																)}
// 														</CardContent>
// 													</Card>
// 												))}
// 											</div>
// 										) : (
// 											<div className='text-center py-12'>
// 												<Users className='w-16 h-16 mx-auto mb-4 text-gray-400' />
// 												<h3 className='text-lg font-medium text-white mb-2'>
// 													No influencers yet
// 												</h3>
// 												<p className='text-gray-400 mb-6'>
// 													Add influencers to your team to start collaborating.
// 												</p>
// 												<Button onClick={() => setShowAddInfluencer(true)}>
// 													<UserPlus className='h-4 w-4' />
// 													Add Influencer
// 												</Button>
// 											</div>
// 										)}
// 									</div>
// 								</TabsContent>

// 								{/* Content Tab */}
// 								<TabsContent value='content' className='space-y-6'>
// 									<div className='flex items-center justify-between'>
// 										<h2 className='text-xl font-bold text-white'>
// 											Content Deliverables
// 										</h2>
// 										<Button
// 											onClick={() => setShowCreateDeliverable(true)}
// 											disabled={!selectedCampaign}>
// 											<Plus className='h-4 w-4' />
// 											Create Deliverable
// 										</Button>
// 									</div>

// 									{loading.deliverables ? (
// 										<div className='text-center py-12'>
// 											<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
// 											<p className='text-gray-400'>Loading content...</p>
// 										</div>
// 									) : deliverables.length > 0 ? (
// 										<div className='grid gap-4'>
// 											{deliverables.map((deliverable) => {
// 												const campaign = campaigns.find(
// 													(c) => c._id === deliverable.campaignId
// 												);
// 												const influencer = influencers.find(
// 													(i) => i._id === deliverable.influencerId
// 												);

// 												return (
// 													<Card
// 														key={deliverable._id}
// 														className='bg-gray-800/50 border-gray-700'>
// 														<CardContent className='p-6'>
// 															<div className='flex items-start justify-between'>
// 																<div className='flex-1'>
// 																	<div className='flex items-center gap-3 mb-2'>
// 																		<div className='flex items-center gap-2'>
// 																			{deliverable.contentType === 'post' && (
// 																				<Image className='h-4 w-4 text-blue-500' />
// 																			)}
// 																			{deliverable.contentType === 'story' && (
// 																				<Camera className='h-4 w-4 text-purple-500' />
// 																			)}
// 																			{deliverable.contentType === 'reel' && (
// 																				<Video className='h-4 w-4 text-pink-500' />
// 																			)}
// 																			<span className='text-sm font-medium text-white capitalize'>
// 																				{deliverable.contentType}
// 																			</span>
// 																		</div>
// 																		<Badge
// 																			className={`${getStatusColor(deliverable.status)} text-white text-xs`}>
// 																			{deliverable.status.replace('_', ' ')}
// 																		</Badge>
// 																	</div>

// 																	<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				Campaign
// 																			</p>
// 																			<p className='text-sm font-medium text-white truncate'>
// 																				{campaign?.campaignName || 'Unknown'}
// 																			</p>
// 																		</div>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				Influencer
// 																			</p>
// 																			<p className='text-sm font-medium text-white'>
// 																				{influencer
// 																					? `${influencer.firstName} ${influencer.lastName}`
// 																					: 'Unknown'}
// 																			</p>
// 																		</div>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				Scheduled
// 																			</p>
// 																			<p className='text-sm font-medium text-white'>
// 																				{deliverable.scheduledPostTime
// 																					? new Date(
// 																							deliverable.scheduledPostTime
// 																						).toLocaleDateString()
// 																					: 'Not scheduled'}
// 																			</p>
// 																		</div>
// 																		<div>
// 																			<p className='text-xs text-gray-500'>
// 																				Performance
// 																			</p>
// 																			<p className='text-sm font-medium text-white'>
// 																				{deliverable.performance?.engagement
// 																					? formatNumber(
// 																							deliverable.performance.engagement
// 																						)
// 																					: 'No data'}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>

// 																<div className='flex items-center gap-2 ml-4'>
// 																	{deliverable.status === 'submitted' && (
// 																		<>
// 																			<Button
// 																				variant='outline'
// 																				size='sm'
// 																				className='bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30'>
// 																				<CheckCircle className='h-4 w-4' />
// 																				Approve
// 																			</Button>
// 																			<Button
// 																				variant='outline'
// 																				size='sm'
// 																				className='bg-yellow-600/20 border-yellow-600 text-yellow-400 hover:bg-yellow-600/30'>
// 																				<AlertCircle className='h-4 w-4' />
// 																				Request Changes
// 																			</Button>
// 																		</>
// 																	)}
// 																	<Button variant='outline' size='sm'>
// 																		<Eye className='h-4 w-4' />
// 																		View
// 																	</Button>
// 																</div>
// 															</div>
// 														</CardContent>
// 													</Card>
// 												);
// 											})}
// 										</div>
// 									) : (
// 										<div className='text-center py-12'>
// 											<FileText className='w-16 h-16 mx-auto mb-4 text-gray-400' />
// 											<h3 className='text-lg font-medium text-white mb-2'>
// 												No content yet
// 											</h3>
// 											<p className='text-gray-400 mb-6'>
// 												Create deliverables to track content creation and
// 												performance.
// 											</p>
// 										</div>
// 									)}
// 								</TabsContent>

// 								{/* Analytics Tab */}
// 								<TabsContent value='analytics' className='space-y-6'>
// 									<div className='flex items-center justify-between'>
// 										<h2 className='text-xl font-bold text-white'>
// 											Analytics Dashboard
// 										</h2>
// 										<div className='flex items-center gap-3'>
// 											<Button variant='outline'>
// 												<Download className='h-4 w-4' />
// 												Export
// 											</Button>
// 											<select className='bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white'>
// 												<option>Last 30 days</option>
// 												<option>Last 90 days</option>
// 												<option>Last 6 months</option>
// 												<option>Last year</option>
// 											</select>
// 										</div>
// 									</div>

// 									{loading.analytics ? (
// 										<div className='text-center py-12'>
// 											<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
// 											<p className='text-gray-400'>Loading analytics...</p>
// 										</div>
// 									) : (
// 										<div className='grid gap-6'>
// 											{/* Key Metrics */}
// 											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
// 												<Card className='bg-gray-800/50 border-gray-700'>
// 													<CardContent className='p-6'>
// 														<div className='flex items-center justify-between'>
// 															<div>
// 																<p className='text-gray-400 text-sm'>
// 																	Total Reach
// 																</p>
// 																<p className='text-2xl font-bold text-white'>
// 																	{analytics?.totalReach
// 																		? formatNumber(analytics.totalReach)
// 																		: '0'}
// 																</p>
// 																<p className='text-xs text-green-400'>
// 																	+12% from last month
// 																</p>
// 															</div>
// 															<Eye className='h-8 w-8 text-blue-500' />
// 														</div>
// 													</CardContent>
// 												</Card>

// 												<Card className='bg-gray-800/50 border-gray-700'>
// 													<CardContent className='p-6'>
// 														<div className='flex items-center justify-between'>
// 															<div>
// 																<p className='text-gray-400 text-sm'>
// 																	Engagement Rate
// 																</p>
// 																<p className='text-2xl font-bold text-white'>
// 																	{analytics?.avgEngagementRate
// 																		? `${analytics.avgEngagementRate.toFixed(1)}%`
// 																		: '0%'}
// 																</p>
// 																<p className='text-xs text-green-400'>
// 																	+3.2% from last month
// 																</p>
// 															</div>
// 															<Heart className='h-8 w-8 text-pink-500' />
// 														</div>
// 													</CardContent>
// 												</Card>

// 												<Card className='bg-gray-800/50 border-gray-700'>
// 													<CardContent className='p-6'>
// 														<div className='flex items-center justify-between'>
// 															<div>
// 																<p className='text-gray-400 text-sm'>
// 																	Content Published
// 																</p>
// 																<p className='text-2xl font-bold text-white'>
// 																	{
// 																		deliverables.filter(
// 																			(d) => d.status === 'published'
// 																		).length
// 																	}
// 																</p>
// 																<p className='text-xs text-blue-400'>
// 																	This month
// 																</p>
// 															</div>
// 															<FileText className='h-8 w-8 text-purple-500' />
// 														</div>
// 													</CardContent>
// 												</Card>

// 												<Card className='bg-gray-800/50 border-gray-700'>
// 													<CardContent className='p-6'>
// 														<div className='flex items-center justify-between'>
// 															<div>
// 																<p className='text-gray-400 text-sm'>ROI</p>
// 																<p className='text-2xl font-bold text-white'>
// 																	{analytics?.roi
// 																		? `${analytics.roi.toFixed(1)}x`
// 																		: '0x'}
// 																</p>
// 																<p className='text-xs text-green-400'>
// 																	Return on investment
// 																</p>
// 															</div>
// 															<TrendingUp className='h-8 w-8 text-green-500' />
// 														</div>
// 													</CardContent>
// 												</Card>
// 											</div>

// 											{/* Performance Charts Placeholder */}
// 											<Card className='bg-gray-800/50 border-gray-700'>
// 												<CardHeader>
// 													<CardTitle className='text-white'>
// 														Performance Over Time
// 													</CardTitle>
// 												</CardHeader>
// 												<CardContent>
// 													<div className='h-64 flex items-center justify-center bg-gray-700/30 rounded-lg'>
// 														<p className='text-gray-400'>
// 															Chart visualization would go here
// 														</p>
// 													</div>
// 												</CardContent>
// 											</Card>

// 											{/* Top Performing Content */}
// 											<Card className='bg-gray-800/50 border-gray-700'>
// 												<CardHeader>
// 													<CardTitle className='text-white'>
// 														Top Performing Content
// 													</CardTitle>
// 												</CardHeader>
// 												<CardContent>
// 													{deliverables.filter((d) => d.performance).length >
// 													0 ? (
// 														<div className='space-y-4'>
// 															{deliverables
// 																.filter(
// 																	(d) =>
// 																		d.performance && d.performance.engagement
// 																)
// 																.sort(
// 																	(a, b) =>
// 																		(b.performance?.engagement || 0) -
// 																		(a.performance?.engagement || 0)
// 																)
// 																.slice(0, 5)
// 																.map((deliverable) => {
// 																	const influencer = influencers.find(
// 																		(i) => i._id === deliverable.influencerId
// 																	);
// 																	const campaign = campaigns.find(
// 																		(c) => c._id === deliverable.campaignId
// 																	);

// 																	return (
// 																		<div
// 																			key={deliverable._id}
// 																			className='flex items-center justify-between p-4 bg-gray-700/30 rounded-lg'>
// 																			<div className='flex items-center gap-3'>
// 																				{deliverable.contentType === 'post' && (
// 																					<Image className='h-5 w-5 text-blue-500' />
// 																				)}
// 																				{deliverable.contentType ===
// 																					'story' && (
// 																					<Camera className='h-5 w-5 text-purple-500' />
// 																				)}
// 																				{deliverable.contentType === 'reel' && (
// 																					<Video className='h-5 w-5 text-pink-500' />
// 																				)}
// 																				<div>
// 																					<p className='font-medium text-white capitalize'>
// 																						{deliverable.contentType}
// 																					</p>
// 																					<p className='text-sm text-gray-400'>
// 																						{influencer
// 																							? `${influencer.firstName} ${influencer.lastName}`
// 																							: 'Unknown'}{' '}
// 																						• {campaign?.campaignName}
// 																					</p>
// 																				</div>
// 																			</div>
// 																			<div className='text-right'>
// 																				<p className='text-sm font-medium text-white'>
// 																					{formatNumber(
// 																						deliverable.performance
// 																							?.engagement || 0
// 																					)}{' '}
// 																					engagements
// 																				</p>
// 																				<p className='text-xs text-gray-400'>
// 																					{formatNumber(
// 																						deliverable.performance?.reach || 0
// 																					)}{' '}
// 																					reach
// 																				</p>
// 																			</div>
// 																		</div>
// 																	);
// 																})}
// 														</div>
// 													) : (
// 														<div className='text-center py-8'>
// 															<BarChart3 className='w-12 h-12 mx-auto mb-4 text-gray-400' />
// 															<p className='text-gray-400'>
// 																No performance data available yet
// 															</p>
// 														</div>
// 													)}
// 												</CardContent>
// 											</Card>
// 										</div>
// 									)}
// 								</TabsContent>

// 								{/* Settings Tab */}
// 								<TabsContent value='settings' className='space-y-6'>
// 									<div className='flex items-center justify-between'>
// 										<h2 className='text-xl font-bold text-white'>
// 											Team Settings
// 										</h2>
// 									</div>

// 									{selectedTeam && (
// 										<div className='grid gap-6'>
// 											{/* Team Information */}
// 											<Card className='bg-gray-800/50 border-gray-700'>
// 												<CardHeader>
// 													<CardTitle className='text-white'>
// 														Team Information
// 													</CardTitle>
// 												</CardHeader>
// 												<CardContent className='space-y-4'>
// 													<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 														<div>
// 															<label className='block text-sm font-medium text-gray-400 mb-2'>
// 																Team Name
// 															</label>
// 															<input
// 																type='text'
// 																defaultValue={selectedTeam.teamName}
// 																className='w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 															/>
// 														</div>
// 														<div>
// 															<label className='block text-sm font-medium text-gray-400 mb-2'>
// 																Industry
// 															</label>
// 															<input
// 																type='text'
// 																defaultValue={selectedTeam.industry || ''}
// 																className='w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 															/>
// 														</div>
// 													</div>
// 													<div>
// 														<label className='block text-sm font-medium text-gray-400 mb-2'>
// 															Description
// 														</label>
// 														<textarea
// 															defaultValue={selectedTeam.description || ''}
// 															rows={3}
// 															className='w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 														/>
// 													</div>
// 													<div>
// 														<label className='block text-sm font-medium text-gray-400 mb-2'>
// 															Target Audience
// 														</label>
// 														<input
// 															type='text'
// 															defaultValue={selectedTeam.targetAudience || ''}
// 															className='w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 														/>
// 													</div>
// 												</CardContent>
// 											</Card>

// 											{/* Budget Settings */}
// 											<Card className='bg-gray-800/50 border-gray-700'>
// 												<CardHeader>
// 													<CardTitle className='text-white'>
// 														Default Budget Range
// 													</CardTitle>
// 												</CardHeader>
// 												<CardContent>
// 													<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
// 														<div>
// 															<label className='block text-sm font-medium text-gray-400 mb-2'>
// 																Minimum Budget
// 															</label>
// 															<input
// 																type='number'
// 																defaultValue={
// 																	selectedTeam.defaultBudget?.min || 0
// 																}
// 																className='w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 															/>
// 														</div>
// 														<div>
// 															<label className='block text-sm font-medium text-gray-400 mb-2'>
// 																Maximum Budget
// 															</label>
// 															<input
// 																type='number'
// 																defaultValue={
// 																	selectedTeam.defaultBudget?.max || 0
// 																}
// 																className='w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 															/>
// 														</div>
// 														<div>
// 															<label className='block text-sm font-medium text-gray-400 mb-2'>
// 																Currency
// 															</label>
// 															<select
// 																defaultValue={
// 																	selectedTeam.defaultBudget?.currency || 'USD'
// 																}
// 																className='w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'>
// 																<option value='USD'>USD ($)</option>
// 																<option value='EUR'>EUR (€)</option>
// 																<option value='GBP'>GBP (£)</option>
// 																<option value='JPY'>JPY (¥)</option>
// 															</select>
// 														</div>
// 													</div>
// 												</CardContent>
// 											</Card>

// 											{/* Campaign Types */}
// 											<Card className='bg-gray-800/50 border-gray-700'>
// 												<CardHeader>
// 													<CardTitle className='text-white'>
// 														Campaign Types
// 													</CardTitle>
// 												</CardHeader>
// 												<CardContent>
// 													<div className='space-y-2'>
// 														{selectedTeam.campaignTypes &&
// 														selectedTeam.campaignTypes.length > 0 ? (
// 															<div className='flex flex-wrap gap-2'>
// 																{selectedTeam.campaignTypes.map(
// 																	(type, index) => (
// 																		<Badge
// 																			key={index}
// 																			className='bg-blue-600/20 text-blue-400'>
// 																			{type}
// 																			<button className='ml-1 text-blue-300 hover:text-blue-200'>
// 																				<X className='h-3 w-3' />
// 																			</button>
// 																		</Badge>
// 																	)
// 																)}
// 															</div>
// 														) : (
// 															<p className='text-gray-400'>
// 																No campaign types defined
// 															</p>
// 														)}
// 														<div className='flex items-center gap-2 mt-4'>
// 															<input
// 																type='text'
// 																placeholder='Add new campaign type'
// 																className='flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none'
// 															/>
// 															<Button size='sm'>
// 																<Plus className='h-4 w-4' />
// 																Add
// 															</Button>
// 														</div>
// 													</div>
// 												</CardContent>
// 											</Card>

// 											{/* Danger Zone */}
// 											<Card className='bg-gray-800/50 border-red-700/50'>
// 												<CardHeader>
// 													<CardTitle className='text-white'>
// 														Danger Zone
// 													</CardTitle>
// 												</CardHeader>
// 												<CardContent>
// 													<div className='space-y-4'>
// 														<div className='flex items-center justify-between'>
// 															<div>
// 																<h4 className='font-medium text-white'>
// 																	Deactivate Team
// 																</h4>
// 																<p className='text-sm text-gray-400'>
// 																	Temporarily disable this team. Campaigns will
// 																	be paused.
// 																</p>
// 															</div>
// 															<Button variant='destructive' size='sm'>
// 																<Pause className='h-4 w-4' />
// 																Deactivate
// 															</Button>
// 														</div>
// 														<div className='flex items-center justify-between'>
// 															<div>
// 																<h4 className='font-medium text-white'>
// 																	Delete Team
// 																</h4>
// 																<p className='text-sm text-gray-400'>
// 																	Permanently delete this team and all its data.
// 																</p>
// 															</div>
// 															<Button
// 																variant='destructive'
// 																size='sm'
// 																onClick={() =>
// 																	handleDeleteTeam(selectedTeam._id)
// 																}>
// 																<Trash2 className='h-4 w-4' />
// 																Delete Team
// 															</Button>
// 														</div>
// 													</div>
// 												</CardContent>
// 											</Card>
// 										</div>
// 									)}
// 								</TabsContent>
// 							</Tabs>
// 						</div>
// 					) : (
// 						<div className='flex items-center justify-center h-full'>
// 							<div className='text-center'>
// 								<Users className='w-16 h-16 mx-auto mb-4 text-gray-400' />
// 								<h3 className='text-lg font-medium text-white mb-2'>
// 									Select a team
// 								</h3>
// 								<p className='text-gray-400 mb-6'>
// 									Choose a team from the sidebar or create a new one
// 								</p>
// 								<Button onClick={() => setShowCreateTeam(true)}>
// 									<Plus className='h-4 w-4' />
// 									Create Team
// 								</Button>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			{/* Modals */}
// 			<CreateTeamModal
// 				open={showCreateTeam}
// 				onOpenChange={setShowCreateTeam}
// 				// onSubmit={handleCreateTeam}
// 				onSuccess={handleCreateTeam}
// 			/>

// 			<AddMemberModal
// 				open={showAddMember}
// 				onOpenChange={setShowAddMember}
// 				team={selectedTeam}
// 				onSuccess={() => {}}
// 			/>

// 			<AddInfluencerModal
// 				open={showAddInfluencer}
// 				onOpenChange={setShowAddInfluencer}
// 				team={selectedTeam}
// 				// onSubmit={handleAddInfluencer}
// 				onSuccess={() => fetchTeamInfluencers(selectedTeam?._id || '')}
// 			/>

// 			<CreateCampaignModal
// 				open={showCreateCampaign}
// 				onOpenChange={setShowCreateCampaign}
// 				team={selectedTeam}
// 				onSubmit={handleCreateCampaign}
// 			/>

// 			<AssignInfluencerModal
// 				open={showAssignInfluencer}
// 				onOpenChange={setShowAssignInfluencer}
// 				campaign={selectedCampaign}
// 				influencers={influencers}
// 				onSubmit={handleAssignInfluencer}
// 			/>

// 			<CreateDeliverableModal
// 				open={showCreateDeliverable}
// 				onOpenChange={setShowCreateDeliverable}
// 				campaigns={campaigns}
// 				influencers={influencers}
// 				onSubmit={handleCreateDeliverable}
// 			/>

// 			{selectedInfluencer && (
// 				<InfluencerProfileModal
// 					open={showInfluencerProfile}
// 					onOpenChange={setShowInfluencerProfile}
// 					influencer={selectedInfluencer}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default TeamsPage;
