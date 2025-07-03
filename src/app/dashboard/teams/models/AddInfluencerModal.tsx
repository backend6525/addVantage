// modals.tsx (or wherever your AddInfluencerModal is defined)
import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import  Lable  from '@/components/ui/Lable/Lable';
import Label from '@/components/ui/Lable/Lable';
import type { Team } from '../types';

export const AddInfluencerModal = ({
	open,
	onOpenChange,
	team,
	onSuccess,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	team: Team | null;
	onSuccess: (data: any) => void;
}) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		status: 'pending',
		location: {
			country: '',
			city: '',
		},
	});

	const [socialProfiles, setSocialProfiles] = useState([
		{
			platform: 'instagram',
			handle: '',
			followerCount: 0,
		},
	]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await onSuccess({
				influencerData: formData,
				socialProfiles,
			});
			onOpenChange(false);
		} catch (error) {
			console.error('Error adding influencer:', error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Add New Influencer</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								id='firstName'
								value={formData.firstName}
								onChange={(e) =>
									setFormData({ ...formData, firstName: e.target.value })
								}
								required
							/>
						</div>
						<div>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								value={formData.lastName}
								onChange={(e) =>
									setFormData({ ...formData, lastName: e.target.value })
								}
								required
							/>
						</div>
					</div>
					<div>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
						/>
					</div>
					{/* Add fields for social profiles */}
					<div className='space-y-2'>
						<Label>Social Profiles</Label>
						{socialProfiles.map((profile, index) => (
							<div key={index} className='grid grid-cols-3 gap-2'>
								<select
									value={profile.platform}
									onChange={(e) => {
										const newProfiles = [...socialProfiles];
										newProfiles[index].platform = e.target.value;
										setSocialProfiles(newProfiles);
									}}
									className='bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white'>
									<option value='instagram'>Instagram</option>
									<option value='tiktok'>TikTok</option>
									<option value='youtube'>YouTube</option>
								</select>
								<Input
									placeholder='Handle'
									value={profile.handle}
									onChange={(e) => {
										const newProfiles = [...socialProfiles];
										newProfiles[index].handle = e.target.value;
										setSocialProfiles(newProfiles);
									}}
								/>
								<Input
									type='number'
									placeholder='Followers'
									value={profile.followerCount}
									onChange={(e) => {
										const newProfiles = [...socialProfiles];
										newProfiles[index].followerCount =
											parseInt(e.target.value) || 0;
										setSocialProfiles(newProfiles);
									}}
								/>
							</div>
						))}
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								setSocialProfiles([
									...socialProfiles,
									{ platform: 'instagram', handle: '', followerCount: 0 },
								])
							}>
							Add Social Profile
						</Button>
					</div>
					<div className='flex justify-end gap-2'>
						<Button
							type='button'
							variant='outline'
							onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type='submit'>Add Influencer</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
