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
// import { DatePicker } from '@/components/ui/date-picker';
// import Label from '@/components/ui/Lable/Lable';
// import { useToast } from '../../../components/ui/toast/use-toast';
// import { Target, Calendar, DollarSign, MapPin, Users } from 'lucide-react';
// import { toast } from 'sonner';

// interface CreateCampaignModalProps {
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// 	team: {
// 		_id: string;
// 		defaultBudget?: {
// 			min: number;
// 			max: number;
// 			currency: string;
// 		};
// 	};
// 	onSubmit?: (campaignData: any) => void;
// }

// export const CreateCampaignModal = ({
// 	open,
// 	onOpenChange,
// 	team,
// 	onSubmit,
// }: CreateCampaignModalProps) => {
// 	const [name, setName] = useState('');
// 	const [description, setDescription] = useState('');
// 	const [budget, setBudget] = useState(team.defaultBudget?.min || 0);
// 	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
// 	const [endDate, setEndDate] = useState<Date | undefined>(
// 		new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
// 	);
// 	const [targetAudience, setTargetAudience] = useState('');
// 	const [locations, setLocations] = useState<string[]>([]);
// 	const [interests, setInterests] = useState<string[]>([]);
// 	const [newLocation, setNewLocation] = useState('');
// 	const [newInterest, setNewInterest] = useState('');

// 	const createCampaign = useMutation(api.campaigns.createCampaign);
// 	const { toast } = useToast();

// 	const handleSubmit = async () => {
// 		if (!name || !description || !startDate || !endDate) {
// 			toast({
// 				title: 'Missing required fields',
// 				description: 'Please fill in all required fields',
// 				variant: 'destructive',
// 			});
// 			return;
// 		}

// 		try {
// 			const campaignData = {
// 				teamId: team._id,
// 				campaignName: name,
// 				description,
// 				budget: {
// 					total: budget,
// 					currency: team.defaultBudget?.currency || 'USD',
// 				},
// 				startDate: startDate.getTime(),
// 				endDate: endDate.getTime(),
// 				targetAudience: {
// 					demographics: targetAudience,
// 					interests,
// 					locations,
// 				},
// 			};

// 			const result = await createCampaign(campaignData);

// 			toast({
// 				title: 'Campaign created successfully',
// 				description: 'Your new campaign has been created',
// 			});

// 			onOpenChange(false);
// 			if (onSubmit) onSubmit(result || campaignData); // Pass the campaign data
// 		} catch (error) {
// 			toast({
// 				title: 'Failed to create campaign',
// 				description: 'An error occurred while creating the campaign',
// 				variant: 'destructive',
// 			});
// 		}
// 	};

// 	const addLocation = () => {
// 		if (newLocation && !locations.includes(newLocation)) {
// 			setLocations([...locations, newLocation]);
// 			setNewLocation('');
// 		}
// 	};

// 	const addInterest = () => {
// 		if (newInterest && !interests.includes(newInterest)) {
// 			setInterests([...interests, newInterest]);
// 			setNewInterest('');
// 		}
// 	};

// 	return (
// 		<Dialog open={open} onOpenChange={onOpenChange}>
// 			<DialogContent className='sm:max-w-[600px]'>
// 				<DialogHeader>
// 					<DialogTitle className='flex items-center gap-2'>
// 						<Target className='w-5 h-5' />
// 						Create New Campaign
// 					</DialogTitle>
// 					<DialogDescription>
// 						Set up a new campaign for your team
// 					</DialogDescription>
// 				</DialogHeader>

// 				<div className='grid gap-4 py-4'>
// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label htmlFor='name' className='text-right'>
// 							Campaign Name
// 						</Label>
// 						<Input
// 							id='name'
// 							value={name}
// 							onChange={(e) => setName(e.target.value)}
// 							className='col-span-3'
// 							placeholder='Summer Promotion'
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label htmlFor='description' className='text-right'>
// 							Description
// 						</Label>
// 						<Textarea
// 							id='description'
// 							value={description}
// 							onChange={(e) => setDescription(e.target.value)}
// 							className='col-span-3'
// 							placeholder='Describe the purpose and goals of this campaign'
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<DollarSign className='w-4 h-4' />
// 							Budget
// 						</Label>
// 						<Input
// 							type='number'
// 							value={budget}
// 							onChange={(e) => setBudget(Number(e.target.value))}
// 							className='col-span-3'
// 							min={0}
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<Calendar className='w-4 h-4' />
// 							Start Date
// 						</Label>
// 						<DatePicker
// 							selected={startDate}
// 							onSelect={setStartDate}
// 							className='col-span-3'
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<Calendar className='w-4 h-4' />
// 							End Date
// 						</Label>
// 						<DatePicker
// 							selected={endDate}
// 							onSelect={setEndDate}
// 							className='col-span-3'
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<Users className='w-4 h-4' />
// 							Target Audience
// 						</Label>
// 						<Input
// 							value={targetAudience}
// 							onChange={(e) => setTargetAudience(e.target.value)}
// 							className='col-span-3'
// 							placeholder='e.g., Women 18-35'
// 						/>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right flex items-center gap-1'>
// 							<MapPin className='w-4 h-4' />
// 							Locations
// 						</Label>
// 						<div className='col-span-3 space-y-2'>
// 							<div className='flex gap-2'>
// 								<Input
// 									value={newLocation}
// 									onChange={(e) => setNewLocation(e.target.value)}
// 									placeholder='Add target location'
// 								/>
// 								<Button type='button' onClick={addLocation}>
// 									Add
// 								</Button>
// 							</div>
// 							{locations.length > 0 && (
// 								<div className='flex flex-wrap gap-2'>
// 									{locations.map((loc) => (
// 										<span
// 											key={loc}
// 											className='px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
// 											{loc}
// 										</span>
// 									))}
// 								</div>
// 							)}
// 						</div>
// 					</div>

// 					<div className='grid grid-cols-4 items-center gap-4'>
// 						<Label className='text-right'>Interests</Label>
// 						<div className='col-span-3 space-y-2'>
// 							<div className='flex gap-2'>
// 								<Input
// 									value={newInterest}
// 									onChange={(e) => setNewInterest(e.target.value)}
// 									placeholder='Add target interest'
// 								/>
// 								<Button type='button' onClick={addInterest}>
// 									Add
// 								</Button>
// 							</div>
// 							{interests.length > 0 && (
// 								<div className='flex flex-wrap gap-2'>
// 									{interests.map((interest) => (
// 										<span
// 											key={interest}
// 											className='px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
// 											{interest}
// 										</span>
// 									))}
// 								</div>
// 							)}
// 						</div>
// 					</div>
// 				</div>

// 				<DialogFooter>
// 					<Button variant='outline' onClick={() => onOpenChange(false)}>
// 						Cancel
// 					</Button>
// 					<Button onClick={handleSubmit}>Create Campaign</Button>
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
import { DatePicker } from '@/components/ui/date-picker';
import Label from '@/components/ui/Lable/Lable';
import { Target, Calendar, DollarSign, MapPin, Users, X } from 'lucide-react';
import { toast } from 'sonner';
import { createCampaign } from '../api';

interface Budget {
	total: number;
	currency: string;
}

interface TargetAudience {
	demographics?: string;
	interests: string[];
	locations: string[];
}

interface CampaignData {
	teamId: string;
	campaignName: string;
	description: string;
	budget: Budget;
	startDate: number;
	endDate: number;
	targetAudience: TargetAudience;
}

interface CreateCampaignModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	team: {
		_id: string;
		defaultBudget?: {
			min: number;
			max: number;
			currency: string;
		};
	};
	onSubmit?: (result: any) => void;
}

export const CreateCampaignModal = ({
	open,
	onOpenChange,
	team,
	onSubmit,
}: CreateCampaignModalProps) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [budget, setBudget] = useState<number>(team.defaultBudget?.min || 0);
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(
		new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
	);
	const [targetAudience, setTargetAudience] = useState('');
	const [locations, setLocations] = useState<string[]>([]);
	const [interests, setInterests] = useState<string[]>([]);
	const [newLocation, setNewLocation] = useState('');
	const [newInterest, setNewInterest] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (!name || !description || !startDate || !endDate) {
			toast.error('Please fill in all required fields');
			return;
		}

		if (startDate >= endDate) {
			toast.error('End date must be after start date');
			return;
		}

		setIsSubmitting(true);

		try {
			const campaignData: CampaignData = {
				teamId: team._id,
				campaignName: name,
				description,
				budget: {
					total: budget,
					currency: team.defaultBudget?.currency || 'USD',
				},
				startDate: startDate.getTime(),
				endDate: endDate.getTime(),
				targetAudience: {
					demographics: targetAudience,
					interests,
					locations,
				},
			};

			const result = await createCampaign(team._id, campaignData);

			toast.success('Campaign created successfully!');
			onOpenChange(false);

			// Reset form
			setName('');
			setDescription('');
			setBudget(team.defaultBudget?.min || 0);
			setStartDate(new Date());
			setEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
			setTargetAudience('');
			setLocations([]);
			setInterests([]);

			if (onSubmit) {
				onSubmit(result);
			}
		} catch (error) {
			console.error('Error creating campaign:', error);
			toast.error('Failed to create campaign');
		} finally {
			setIsSubmitting(false);
		}
	};

	const addLocation = () => {
		if (newLocation && !locations.includes(newLocation)) {
			setLocations([...locations, newLocation]);
			setNewLocation('');
		}
	};

	const removeLocation = (locationToRemove: string) => {
		setLocations(locations.filter((location) => location !== locationToRemove));
	};

	const addInterest = () => {
		if (newInterest && !interests.includes(newInterest)) {
			setInterests([...interests, newInterest]);
			setNewInterest('');
		}
	};

	const removeInterest = (interestToRemove: string) => {
		setInterests(interests.filter((interest) => interest !== interestToRemove));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Target className='w-5 h-5' />
						Create New Campaign
					</DialogTitle>
					<DialogDescription>
						Set up a new campaign for your team
					</DialogDescription>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Campaign Name *
						</Label>
						<Input
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='col-span-3'
							placeholder='Summer Promotion'
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='description' className='text-right'>
							Description *
						</Label>
						<Textarea
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='col-span-3'
							placeholder='Describe the purpose and goals of this campaign'
							rows={3}
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<DollarSign className='w-4 h-4' />
							Budget *
						</Label>
						<Input
							type='number'
							value={budget}
							onChange={(e) => setBudget(Number(e.target.value))}
							className='col-span-3'
							min={0}
							step={100}
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<Calendar className='w-4 h-4' />
							Start Date *
						</Label>
						<DatePicker
							selected={startDate}
							onSelect={setStartDate}
							className='col-span-3'
							fromDate={new Date()}
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<Calendar className='w-4 h-4' />
							End Date *
						</Label>
						<DatePicker
							selected={endDate}
							onSelect={setEndDate}
							className='col-span-3'
							fromDate={startDate || new Date()}
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<Users className='w-4 h-4' />
							Target Audience
						</Label>
						<Input
							value={targetAudience}
							onChange={(e) => setTargetAudience(e.target.value)}
							className='col-span-3'
							placeholder='e.g., Women 18-35'
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right flex items-center gap-1'>
							<MapPin className='w-4 h-4' />
							Locations
						</Label>
						<div className='col-span-3 space-y-2'>
							<div className='flex gap-2'>
								<Input
									value={newLocation}
									onChange={(e) => setNewLocation(e.target.value)}
									placeholder='Add target location'
									onKeyDown={(e) => e.key === 'Enter' && addLocation()}
								/>
								<Button type='button' onClick={addLocation} variant='outline'>
									Add
								</Button>
							</div>
							{locations.length > 0 && (
								<div className='flex flex-wrap gap-2'>
									{locations.map((loc) => (
										<div
											key={loc}
											className='flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
											{loc}
											<button
												type='button'
												onClick={() => removeLocation(loc)}
												className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'>
												<X className='w-3 h-3' />
											</button>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Interests</Label>
						<div className='col-span-3 space-y-2'>
							<div className='flex gap-2'>
								<Input
									value={newInterest}
									onChange={(e) => setNewInterest(e.target.value)}
									placeholder='Add target interest'
									onKeyDown={(e) => e.key === 'Enter' && addInterest()}
								/>
								<Button type='button' onClick={addInterest} variant='outline'>
									Add
								</Button>
							</div>
							{interests.length > 0 && (
								<div className='flex flex-wrap gap-2'>
									{interests.map((interest) => (
										<div
											key={interest}
											className='flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
											{interest}
											<button
												type='button'
												onClick={() => removeInterest(interest)}
												className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'>
												<X className='w-3 h-3' />
											</button>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isSubmitting}>
						{isSubmitting ? 'Creating...' : 'Create Campaign'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
