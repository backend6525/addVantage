'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/app/components/separator';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/Tabs/Tabs';
import {
	CheckCircle,
	Globe,
	Mail,
	Phone,
	MapPin,
	Users,
	BarChart2,
	DollarSign,
} from 'lucide-react';

interface SocialProfile {
	platform: string;
	username: string;
	profileUrl: string;
	isVerified: boolean;
	followerCount: number;
	engagementRate?: number;
	isActive: boolean;
}

interface InfluencerProfileModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	influencer: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber?: string;
		location: {
			city?: string;
			state?: string;
			country: string;
		};
		bio?: string;
		website?: string;
		occupation?: string;
		expertise?: string[];
		socialProfiles?: SocialProfile[];
		status: string;
	};
}

export const InfluencerProfileModal = ({
	open,
	onOpenChange,
	influencer,
}: InfluencerProfileModalProps) => {
	const initials = `${influencer.firstName.charAt(0)}${influencer.lastName.charAt(0)}`;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[800px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Users className='w-5 h-5' />
						Influencer Profile
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					<div className='flex items-start gap-6'>
						<Avatar className='w-20 h-20'>
							<AvatarImage src='' />
							<AvatarFallback className='text-xl'>{initials}</AvatarFallback>
						</Avatar>

						<div className='flex-1'>
							<div className='flex items-center gap-4'>
								<h2 className='text-2xl font-bold'>
									{influencer.firstName} {influencer.lastName}
								</h2>
								<Badge
									className={
										influencer.status === 'active'
											? 'bg-green-500'
											: influencer.status === 'suspended'
												? 'bg-yellow-500'
												: 'bg-gray-500'
									}>
									{influencer.status}
								</Badge>
							</div>

							{influencer.occupation && (
								<p className='text-gray-600 dark:text-gray-400 mt-1'>
									{influencer.occupation}
								</p>
							)}

							<div className='mt-4 grid grid-cols-2 gap-4'>
								<div className='flex items-center gap-2 text-sm'>
									<Mail className='w-4 h-4 text-gray-500' />
									<span>{influencer.email}</span>
								</div>

								{influencer.phoneNumber && (
									<div className='flex items-center gap-2 text-sm'>
										<Phone className='w-4 h-4 text-gray-500' />
										<span>{influencer.phoneNumber}</span>
									</div>
								)}

								<div className='flex items-center gap-2 text-sm'>
									<MapPin className='w-4 h-4 text-gray-500' />
									<span>
										{influencer.location.city &&
											`${influencer.location.city}, `}
										{influencer.location.state &&
											`${influencer.location.state}, `}
										{influencer.location.country}
									</span>
								</div>

								{influencer.website && (
									<div className='flex items-center gap-2 text-sm'>
										<Globe className='w-4 h-4 text-gray-500' />
										<a
											href={influencer.website}
											target='_blank'
											rel='noopener noreferrer'
											className='text-blue-600 hover:underline'>
											{influencer.website}
										</a>
									</div>
								)}
							</div>
						</div>
					</div>

					{influencer.bio && (
						<div>
							<h3 className='font-medium mb-2'>About</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{influencer.bio}
							</p>
						</div>
					)}

					<Separator />

					<Tabs defaultValue='social'>
						<TabsList>
							<TabsTrigger value='social' className='flex items-center gap-2'>
								<Users className='w-4 h-4' />
								Social Profiles
							</TabsTrigger>
							<TabsTrigger
								value='expertise'
								className='flex items-center gap-2'>
								<BarChart2 className='w-4 h-4' />
								Expertise
							</TabsTrigger>
							<TabsTrigger value='rates' className='flex items-center gap-2'>
								<DollarSign className='w-4 h-4' />
								Rates
							</TabsTrigger>
						</TabsList>

						<TabsContent value='social' className='pt-4'>
							{influencer.socialProfiles &&
							influencer.socialProfiles.length > 0 ? (
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									{influencer.socialProfiles.map((profile) => (
										<div
											key={`${profile.platform}-${profile.username}`}
											className='border rounded-lg p-4'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-3'>
													<div className='w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
														<span className='text-xs font-medium uppercase'>
															{profile.platform.charAt(0)}
														</span>
													</div>
													<div>
														<h4 className='font-medium capitalize'>
															{profile.platform}
														</h4>
														<a
															href={profile.profileUrl}
															target='_blank'
															rel='noopener noreferrer'
															className='text-sm text-blue-600 hover:underline'>
															@{profile.username}
														</a>
													</div>
												</div>
												{profile.isVerified && (
													<CheckCircle className='w-5 h-5 text-blue-500' />
												)}
											</div>

											<div className='mt-4 grid grid-cols-3 gap-2 text-center'>
												<div>
													<p className='text-sm text-gray-500'>Followers</p>
													<p className='font-medium'>
														{profile.followerCount.toLocaleString()}
													</p>
												</div>
												<div>
													<p className='text-sm text-gray-500'>Engagement</p>
													<p className='font-medium'>
														{profile.engagementRate
															? `${profile.engagementRate.toFixed(1)}%`
															: 'N/A'}
													</p>
												</div>
												<div>
													<p className='text-sm text-gray-500'>Status</p>
													<p className='font-medium'>
														{profile.isActive ? 'Active' : 'Inactive'}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className='text-gray-500 text-center py-8'>
									No social profiles added
								</p>
							)}
						</TabsContent>

						<TabsContent value='expertise' className='pt-4'>
							{influencer.expertise && influencer.expertise.length > 0 ? (
								<div className='flex flex-wrap gap-2'>
									{influencer.expertise.map((skill) => (
										<Badge key={skill} variant='secondary'>
											{skill}
										</Badge>
									))}
								</div>
							) : (
								<p className='text-gray-500 text-center py-8'>
									No expertise listed
								</p>
							)}
						</TabsContent>

						<TabsContent value='rates' className='pt-4'>
							<p className='text-gray-500 text-center py-8'>
								Rates information would be displayed here
							</p>
						</TabsContent>
					</Tabs>
				</div>
			</DialogContent>
		</Dialog>
	);
};
