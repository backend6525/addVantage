// 'use client';

// import { useState } from 'react';
// import { useMutation } from 'convex/react';
// import { api } from '@convex/_generated/api';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogDescription,
// 	DialogFooter,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Label from '@/components/ui/Lable/Lable';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/Select';
// import { useToast } from '@/app/components/ui/toast/use-toast';
// import { UserPlus, DollarSign, FileText } from 'lucide-react';

// interface AssignInfluencerModalProps {
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// 	campaign: {
// 		_id: string;
// 		campaignName: string;
// 		budget: {
// 			currency: string;
// 		};
// 	};
// 	influencers: Array<{
// 		_id: string;
// 		firstName: string;
// 		lastName: string;
// 		socialProfiles?: Array<{
// 			platform: string;
// 			followerCount: number;
// 		}>;
// 	}>;
// 	onSubmit?: (data?: any) => void | Promise<void>; // More flexible signature
// }

// export const AssignInfluencerModal = ({
// 	open,
// 	onOpenChange,
// 	campaign,
// 	influencers,
// 	onSubmit,
// }: AssignInfluencerModalProps) => {
// 	const [selectedInfluencer, setSelectedInfluencer] = useState('');
// 	const [rate, setRate] = useState(0);
// 	const [contentType, setContentType] = useState('post');
// 	const [dueDate, setDueDate] = useState<Date | undefined>(
// 		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
// 	);

// 	const assignInfluencer = useMutation(api.teams.assignInfluencer);
// 	const { toast } = useToast();

// 	const handleSubmit = async () => {
// 		if (!selectedInfluencer || !dueDate) {
// 			toast({
// 				title: 'Missing required fields',
// 				description: 'Please select an influencer and due date',
// 				variant: 'destructive',
// 			});
// 			return;
// 		}

// 		try {
// 			await assignInfluencer({
// 				campaignId: campaign._id,
// 				influencerId: selectedInfluencer,
// 				agreedRate: {
// 					amount: rate,
// 					currency: campaign.budget.currency,
// 					contentType,
// 				},
// 				deliverables: [
// 					{
// 						type: contentType,
// 						dueDate: dueDate.getTime(),
// 						status: 'pending',
// 					},
// 				],
// 			});

// 			toast({
// 				title: 'Influencer assigned',
// 				description:
// 					'The influencer has been successfully assigned to the campaign',
// 			});

// 			onOpenChange(false);
// 			if (onSubmit) onSubmit();
// 		} catch (error) {
// 			toast({
// 				title: 'Assignment failed',
// 				description: 'An error occurred while assigning the influencer',
// 				variant: 'destructive',
// 			});
// 		}
// 	};

// 	return (
// 		<Dialog open={open} onOpenChange={onOpenChange}>
// 			<DialogContent className='sm:max-w-[600px]'>
// 				<DialogHeader>
// 					<DialogTitle className='flex items-center gap-2'>
// 						<UserPlus className='w-5 h-5' />
// 						Assign Influencer to Campaign
// 					</DialogTitle>
// 					<DialogDescription>
// 						{/* Assign an influencer to `&quot{campaign.campaignName}`&quot */}
// 						{/* {`Assign an influencer to "${campaign.campaignName}"`} */}
// 						{`Assign an influencer to "${campaign?.campaignName ?? ''}"`}
// 					</DialogDescription>
// 				</DialogHeader>

// 				<div className='grid gap-4 py-4'>
// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label htmlFor='influencer' className='text-right'>
// 							Influencer
// 						</Label>
// 						<Select
// 							value={selectedInfluencer}
// 							onValueChange={setSelectedInfluencer}>
// 							<SelectTrigger className='col-span-3'>
// 								<SelectValue placeholder='Select an influencer' />
// 							</SelectTrigger>
// 							<SelectContent>
// 								{influencers.map((influencer) => (
// 									<SelectItem key={influencer._id} value={influencer._id}>
// 										{influencer.firstName} {influencer.lastName}
// 										{influencer.socialProfiles?.[0] && (
// 											<span className='text-gray-500 ml-2'>
// 												({influencer.socialProfiles[0].platform},{' '}
// 												{influencer.socialProfiles[0].followerCount.toLocaleString()}{' '}
// 												followers)
// 											</span>
// 										)}
// 									</SelectItem>
// 								))}
// 							</SelectContent>
// 						</Select>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<DollarSign className='w-4 h-4' />
// 							Rate
// 						</Label>
// 						<Input
// 							type='number'
// 							value={rate}
// 							onChange={(e) => setRate(Number(e.target.value))}
// 							className='col-span-3'
// 							min={0}
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<FileText className='w-4 h-4' />
// 							Content Type
// 						</Label>
// 						<Select value={contentType} onValueChange={setContentType}>
// 							<SelectTrigger className='col-span-3'>
// 								<SelectValue placeholder='Select content type' />
// 							</SelectTrigger>
// 							<SelectContent>
// 								<SelectItem value='post'>Post</SelectItem>
// 								<SelectItem value='story'>Story</SelectItem>
// 								<SelectItem value='reel'>Reel</SelectItem>
// 								<SelectItem value='video'>Video</SelectItem>
// 								<SelectItem value='ugc'>UGC</SelectItem>
// 							</SelectContent>
// 						</Select>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right'>Due Date</Label>
// 						<Input
// 							type='date'
// 							value={dueDate?.toISOString().split('T')[0]}
// 							onChange={(e) => setDueDate(new Date(e.target.value))}
// 							className='col-span-3'
// 						/>
// 					</div>
// 				</div>

// 				<DialogFooter>
// 					<Button variant='outline' onClick={() => onOpenChange(false)}>
// 						Cancel
// 					</Button>
// 					<Button onClick={handleSubmit}>Assign Influencer</Button>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

'use client';

import { useState } from 'react';
import { api } from '@convex/_generated/api';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Label from '@/components/ui/Lable/Lable';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import { useToast } from '@/app/components/ui/toast/use-toast';
import { UserPlus, DollarSign, FileText } from 'lucide-react';
import { assignInfluencer } from '../api'; // Update the import path

interface AssignInfluencerModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	campaign: {
		_id: string;
		campaignName: string;
		budget: {
			currency: string;
		};
	};
	influencers: Array<{
		_id: string;
		firstName: string;
		lastName: string;
		socialProfiles?: Array<{
			platform: string;
			followerCount: number;
		}>;
	}>;
	teamId: string; // Add teamId to props
	onSubmit?: (data?: any) => void | Promise<void>;
}

export const AssignInfluencerModal = ({
	open,
	onOpenChange,
	campaign,
	influencers,
	teamId,
	onSubmit,
}: AssignInfluencerModalProps) => {
	const [selectedInfluencer, setSelectedInfluencer] = useState('');
	const [rate, setRate] = useState(0);
	const [contentType, setContentType] = useState('post');
	const [dueDate, setDueDate] = useState<Date | undefined>(
		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	);

	const { toast } = useToast();

	const handleSubmit = async () => {
		if (!selectedInfluencer || !dueDate) {
			toast({
				title: 'Missing required fields',
				description: 'Please select an influencer and due date',
				variant: 'destructive',
			});
			return;
		}

		try {
			const assignmentData = {
				campaignId: campaign._id,
				influencerId: selectedInfluencer,
				agreedRate: {
					amount: rate,
					currency: campaign.budget.currency,
					contentType,
				},
				deliverables: [
					{
						type: contentType,
						dueDate: dueDate.getTime(),
						status: 'pending',
					},
				],
			};

			await assignInfluencer(assignmentData, teamId);

			toast({
				title: 'Influencer assigned',
				description:
					'The influencer has been successfully assigned to the campaign',
			});

			onOpenChange(false);
			if (onSubmit) onSubmit();
		} catch (error) {
			toast({
				title: 'Assignment failed',
				description: 'An error occurred while assigning the influencer',
				variant: 'destructive',
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<UserPlus className='w-5 h-5' />
						Assign Influencer to Campaign
					</DialogTitle>
					<DialogDescription>
						{`Assign an influencer to "${campaign?.campaignName ?? ''}"`}
					</DialogDescription>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='influencer' className='text-right'>
							Influencer
						</Label>
						<Select
							value={selectedInfluencer}
							onValueChange={setSelectedInfluencer}>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select an influencer' />
							</SelectTrigger>
							<SelectContent>
								{influencers.map((influencer) => (
									<SelectItem key={influencer._id} value={influencer._id}>
										{influencer.firstName} {influencer.lastName}
										{influencer.socialProfiles?.[0] && (
											<span className='text-gray-500 ml-2'>
												({influencer.socialProfiles[0].platform},{' '}
												{influencer.socialProfiles[0].followerCount.toLocaleString()}{' '}
												followers)
											</span>
										)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<DollarSign className='w-4 h-4' />
							Rate
						</Label>
						<Input
							type='number'
							value={rate}
							onChange={(e) => setRate(Number(e.target.value))}
							className='col-span-3'
							min={0}
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<FileText className='w-4 h-4' />
							Content Type
						</Label>
						<Select value={contentType} onValueChange={setContentType}>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select content type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='post'>Post</SelectItem>
								<SelectItem value='story'>Story</SelectItem>
								<SelectItem value='reel'>Reel</SelectItem>
								<SelectItem value='video'>Video</SelectItem>
								<SelectItem value='ugc'>UGC</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Due Date</Label>
						<Input
							type='date'
							value={dueDate?.toISOString().split('T')[0]}
							onChange={(e) => setDueDate(new Date(e.target.value))}
							className='col-span-3'
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Assign Influencer</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
