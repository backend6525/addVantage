import React from 'react';
import { Team, Campaign, Influencer, ContentDeliverable } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
	Users,
	UserPlus,
	Target,
	Plus,
	FileText,
	Eye,
	CheckCircle,
	AlertCircle,
	BarChart3,
	TrendingUp,
	Heart,
	Image,
	Camera,
	Video,
	Trash2,
	Pause,
	X,
	Edit,
} from 'lucide-react';

const formatNumber = (num: number) => {
	if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
	if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
	return num.toString();
};

export const StatusBadge = ({ status }: { status: string }) => {
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

	return (
		<Badge className={`${getStatusColor(status)} text-white`}>
			{status.replace('_', ' ')}
		</Badge>
	);
};

export const CampaignCard = ({
	campaign,
	onAssignInfluencer,
}: {
	campaign: Campaign;
	onAssignInfluencer: (campaign: Campaign) => void;
}) => {
	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency || 'USD',
		}).format(amount);
	};

	return (
		<Card className='bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors'>
			<CardContent className='p-6'>
				<div className='flex items-start justify-between'>
					<div className='flex-1'>
						<div className='flex items-center gap-3 mb-2'>
							<h3 className='text-lg font-semibold text-white'>
								{campaign.campaignName}
							</h3>
							<StatusBadge status={campaign.status} />
						</div>
						<p className='text-gray-400 mb-4'>{campaign.description}</p>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							<div>
								<p className='text-xs text-gray-500'>Budget</p>
								<p className='text-sm font-medium text-white'>
									{formatCurrency(
										campaign.budget.total,
										campaign.budget.currency
									)}
								</p>
							</div>
							<div>
								<p className='text-xs text-gray-500'>Start Date</p>
								<p className='text-sm font-medium text-white'>
									{new Date(campaign.startDate).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className='text-xs text-gray-500'>End Date</p>
								<p className='text-sm font-medium text-white'>
									{new Date(campaign.endDate).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className='text-xs text-gray-500'>Target Locations</p>
								<p className='text-sm font-medium text-white'>
									{campaign.targetAudience.locations.length} locations
								</p>
							</div>
						</div>
					</div>
					<div className='flex items-center gap-2 ml-4'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => onAssignInfluencer(campaign)}>
							<UserPlus className='h-4 w-4' />
							Assign
						</Button>
						<Button variant='outline' size='sm'>
							<Edit className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const InfluencerCard = ({
	influencer,
	onClick,
}: {
	influencer: Influencer;
	onClick: () => void;
}) => {
	return (
		<Card
			className='bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer'
			onClick={onClick}>
			<CardContent className='p-6'>
				<div className='flex items-center gap-4 mb-4'>
					<div className='w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-lg'>
						{influencer.firstName?.charAt(0)}
						{influencer.lastName?.charAt(0)}
					</div>
					<div className='flex-1 min-w-0'>
						<h3 className='font-semibold text-white truncate'>
							{influencer.firstName} {influencer.lastName}
						</h3>
						<p className='text-sm text-gray-400'>
							{influencer.location.country}
						</p>
						<StatusBadge status={influencer.status} />
					</div>
				</div>

				{influencer.socialProfiles && influencer.socialProfiles.length > 0 && (
					<div className='space-y-2'>
						{influencer.socialProfiles.slice(0, 2).map((profile) => (
							<div
								key={profile._id}
								className='flex items-center justify-between p-2 bg-gray-700/30 rounded'>
								<div className='flex items-center gap-2'>
									<span className='text-sm font-medium text-white capitalize'>
										{profile.platform}
									</span>
									{profile.isVerified && (
										<CheckCircle className='h-4 w-4 text-blue-500' />
									)}
								</div>
								<span className='text-sm text-gray-400'>
									{formatNumber(profile.followerCount)}
								</span>
							</div>
						))}
					</div>
				)}

				{influencer.expertise && influencer.expertise.length > 0 && (
					<div className='mt-4 flex flex-wrap gap-1'>
						{influencer.expertise.slice(0, 3).map((skill, index) => (
							<Badge
								key={index}
								className='bg-blue-600/20 text-blue-400 text-xs'>
								{skill}
							</Badge>
						))}
						{influencer.expertise.length > 3 && (
							<Badge className='bg-gray-600/20 text-gray-400 text-xs'>
								+{influencer.expertise.length - 3} more
							</Badge>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export const DeliverableCard = ({
	deliverable,
	campaigns,
	influencers,
}: {
	deliverable: ContentDeliverable;
	campaigns: Campaign[];
	influencers: Influencer[];
}) => {
	const campaign = campaigns.find((c) => c._id === deliverable.campaignId);
	const influencer = influencers.find(
		(i) => i._id === deliverable.influencerId
	);

	return (
		<Card className='bg-gray-800/50 border-gray-700'>
			<CardContent className='p-6'>
				<div className='flex items-start justify-between'>
					<div className='flex-1'>
						<div className='flex items-center gap-3 mb-2'>
							<div className='flex items-center gap-2'>
								{deliverable.contentType === 'post' && (
									<Image className='h-4 w-4 text-blue-500' />
								)}
								{deliverable.contentType === 'story' && (
									<Camera className='h-4 w-4 text-purple-500' />
								)}
								{deliverable.contentType === 'reel' && (
									<Video className='h-4 w-4 text-pink-500' />
								)}
								<span className='text-sm font-medium text-white capitalize'>
									{deliverable.contentType}
								</span>
							</div>
							<StatusBadge status={deliverable.status} />
						</div>

						<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
							<div>
								<p className='text-xs text-gray-500'>Campaign</p>
								<p className='text-sm font-medium text-white truncate'>
									{campaign?.campaignName || 'Unknown'}
								</p>
							</div>
							<div>
								<p className='text-xs text-gray-500'>Influencer</p>
								<p className='text-sm font-medium text-white'>
									{influencer
										? `${influencer.firstName} ${influencer.lastName}`
										: 'Unknown'}
								</p>
							</div>
							<div>
								<p className='text-xs text-gray-500'>Scheduled</p>
								<p className='text-sm font-medium text-white'>
									{deliverable.scheduledPostTime
										? new Date(
												deliverable.scheduledPostTime
											).toLocaleDateString()
										: 'Not scheduled'}
								</p>
							</div>
							<div>
								<p className='text-xs text-gray-500'>Performance</p>
								<p className='text-sm font-medium text-white'>
									{deliverable.performance?.engagement
										? formatNumber(deliverable.performance.engagement)
										: 'No data'}
								</p>
							</div>
						</div>
					</div>

					<div className='flex items-center gap-2 ml-4'>
						{deliverable.status === 'submitted' && (
							<>
								<Button
									variant='outline'
									size='sm'
									className='bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30'>
									<CheckCircle className='h-4 w-4' />
									Approve
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='bg-yellow-600/20 border-yellow-600 text-yellow-400 hover:bg-yellow-600/30'>
									<AlertCircle className='h-4 w-4' />
									Request Changes
								</Button>
							</>
						)}
						<Button variant='outline' size='sm'>
							<Eye className='h-4 w-4' />
							View
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const MetricCard = ({
	title,
	value,
	change,
	icon: Icon,
	iconColor,
}: {
	title: string;
	value: string | number;
	change?: string;
	icon: React.ComponentType<{ className?: string }>;
	iconColor: string;
}) => {
	return (
		<Card className='bg-gray-800/50 border-gray-700'>
			<CardContent className='p-6'>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-gray-400 text-sm'>{title}</p>
						<p className='text-2xl font-bold text-white'>{value}</p>
						{change && <p className='text-xs text-green-400'>{change}</p>}
					</div>
					<Icon className={`h-8 w-8 ${iconColor}`} />
				</div>
			</CardContent>
		</Card>
	);
};
