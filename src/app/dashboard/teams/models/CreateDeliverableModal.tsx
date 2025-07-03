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
// import { Textarea } from '@/components/ui/textarea';
// import Label from '@/components/ui/Lable/Lable';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/Select';
// import { useToast } from '@/app/components/ui/toast/use-toast';
// import { FileText, Calendar, User } from 'lucide-react';

// // interface CreateDeliverableModalProps {
// // 	open: boolean;
// // 	onOpenChange: (open: boolean) => void;
// // 	campaigns: Array<{
// // 		_id: string;
// // 		campaignName: string;
// // 	}>;
// // 	influencers: Array<{
// // 		_id: string;
// // 		firstName: string;
// // 		lastName: string;
// // 	}>;
// // 	onSubmit?: () => void;
// // }
// interface CreateDeliverableModalProps {
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// 	campaigns: Array<{
// 		_id: string;
// 		campaignName: string;
// 	}>;
// 	influencers: Array<{
// 		_id: string;
// 		firstName: string;
// 		lastName: string;
// 	}>;
// 	onSubmit?: (data?: any) => void | Promise<void>;
// 	onSuccess?: () => void | Promise<void>; // Add onSuccess prop
// }

// export const CreateDeliverableModal = ({
// 	open,
// 	onOpenChange,
// 	campaigns,
// 	influencers,
// 	onSubmit,
// 	onSuccess,
// }: CreateDeliverableModalProps) => {
// 	const [selectedCampaign, setSelectedCampaign] = useState('');
// 	const [selectedInfluencer, setSelectedInfluencer] = useState('');
// 	const [contentType, setContentType] = useState('post');
// 	const [description, setDescription] = useState('');
// 	const [dueDate, setDueDate] = useState<Date | undefined>(
// 		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
// 	);

// 	const createDeliverable = useMutation(api.deliverables.createDeliverable);
// 	const { toast } = useToast();

// 	const handleSubmit = async () => {
// 		if (!selectedCampaign || !selectedInfluencer || !dueDate) {
// 			toast({
// 				title: 'Missing required fields',
// 				description: 'Please fill in all required fields',
// 				variant: 'destructive',
// 			});
// 			return;
// 		}

// 		try {
// 			const deliverableData = {
// 				campaignId: selectedCampaign,
// 				influencerId: selectedInfluencer,
// 				contentType,
// 				description,
// 				scheduledPostTime: dueDate.getTime(),
// 				status: 'pending',
// 			};

// 			await createDeliverable(deliverableData);

// 			toast({
// 				title: 'Deliverable created',
// 				description: 'The content deliverable has been successfully created',
// 			});

// 			onOpenChange(false);

// 			// Call both callbacks if they exist
// 			if (onSubmit) await onSubmit(deliverableData);
// 			if (onSuccess) await onSuccess();
// 		} catch (error) {
// 			toast({
// 				title: 'Creation failed',
// 				description: 'An error occurred while creating the deliverable',
// 				variant: 'destructive',
// 			});
// 		}
// 	};

// 	return (
// 		<Dialog open={open} onOpenChange={onOpenChange}>
// 			<DialogContent className='sm:max-w-[600px]'>
// 				<DialogHeader>
// 					<DialogTitle className='flex items-center gap-2'>
// 						<FileText className='w-5 h-5' />
// 						Create Content Deliverable
// 					</DialogTitle>
// 					<DialogDescription>
// 						Track a new piece of content to be created by an influencer
// 					</DialogDescription>
// 				</DialogHeader>

// 				<div className='grid gap-4 py-4'>
// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label htmlFor='campaign' className='text-right'>
// 							Campaign
// 						</Label>
// 						<Select
// 							value={selectedCampaign}
// 							onValueChange={setSelectedCampaign}>
// 							<SelectTrigger className='col-span-3'>
// 								<SelectValue placeholder='Select a campaign' />
// 							</SelectTrigger>
// 							<SelectContent>
// 								{campaigns.map((campaign) => (
// 									<SelectItem key={campaign._id} value={campaign._id}>
// 										{campaign.campaignName}
// 									</SelectItem>
// 								))}
// 							</SelectContent>
// 						</Select>
// 					</div>

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
// 									</SelectItem>
// 								))}
// 							</SelectContent>
// 						</Select>
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
// 						<Label className='text-right'>Description</Label>
// 						<Textarea
// 							value={description}
// 							onChange={(e) => setDescription(e.target.value)}
// 							className='col-span-3'
// 							placeholder='Describe the content requirements'
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<Calendar className='w-4 h-4' />
// 							Due Date
// 						</Label>
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
// 					<Button onClick={handleSubmit}>Create Deliverable</Button>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import Label from '@/components/ui/Lable/Lable';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import { FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { createDeliverable } from '../api';

interface CreateDeliverableModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	campaigns: Array<{
		_id: string;
		campaignName: string;
	}>;
	influencers: Array<{
		_id: string;
		firstName: string;
		lastName: string;
	}>;
	onSubmit?: (data?: any) => void | Promise<void>;
	onSuccess?: () => void | Promise<void>;
}

export const CreateDeliverableModal = ({
	open,
	onOpenChange,
	campaigns,
	influencers,
	onSubmit,
	onSuccess,
}: CreateDeliverableModalProps) => {
	const [selectedCampaign, setSelectedCampaign] = useState('');
	const [selectedInfluencer, setSelectedInfluencer] = useState('');
	const [contentType, setContentType] = useState('post');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState<Date | undefined>(
		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (!selectedCampaign || !selectedInfluencer || !dueDate) {
			toast.error('Please fill in all required fields');
			return;
		}

		setIsSubmitting(true);

		try {
			const deliverableData = {
				campaignId: selectedCampaign,
				influencerId: selectedInfluencer,
				contentType,
				description,
				scheduledPostTime: dueDate.getTime(),
				status: 'pending',
			};

			// Use the API function instead of direct Convex call
			const result = await createDeliverable(deliverableData, selectedCampaign);

			toast.success('Deliverable created successfully!');
			onOpenChange(false);

			// Reset form
			setSelectedCampaign('');
			setSelectedInfluencer('');
			setContentType('post');
			setDescription('');
			setDueDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

			// Call callbacks
			if (onSubmit) await onSubmit(result);
			if (onSuccess) await onSuccess();
		} catch (error) {
			console.error('Error creating deliverable:', error);
			toast.error('Failed to create deliverable');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<FileText className='w-5 h-5' />
						Create Content Deliverable
					</DialogTitle>
					<DialogDescription>
						Track a new piece of content to be created by an influencer
					</DialogDescription>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='campaign' className='text-right'>
							Campaign *
						</Label>
						<Select
							value={selectedCampaign}
							onValueChange={setSelectedCampaign}>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select a campaign' />
							</SelectTrigger>
							<SelectContent>
								{campaigns.map((campaign) => (
									<SelectItem key={campaign._id} value={campaign._id}>
										{campaign.campaignName}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='influencer' className='text-right'>
							Influencer *
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
									</SelectItem>
								))}
							</SelectContent>
						</Select>
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
						<Label className='text-right'>Description</Label>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='col-span-3'
							placeholder='Describe the content requirements'
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<Calendar className='w-4 h-4' />
							Due Date *
						</Label>
						<Input
							type='date'
							value={dueDate?.toISOString().split('T')[0]}
							onChange={(e) => setDueDate(new Date(e.target.value))}
							className='col-span-3'
							min={new Date().toISOString().split('T')[0]}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isSubmitting}>
						{isSubmitting ? 'Creating...' : 'Create Deliverable'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
