'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { api } from '../../../../../convex/_generated/api';
import { useConvex, useMutation } from 'convex/react';
import { ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';

import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/Select/SelectUi';
import { Textarea } from '@/components/ui/textarea';

// Team types for selection
const TEAM_TYPES = [
	{ value: 'startup', label: 'Startup' },
	{ value: 'enterprise', label: 'Enterprise' },
	{ value: 'nonprofit', label: 'Non-Profit' },
	{ value: 'education', label: 'Educational' },
	{ value: 'personal', label: 'Personal Project' },
] as const;

type TeamType = (typeof TEAM_TYPES)[number]['value'];

const CreateTeamPage: React.FC = () => {
	const router = useRouter();
	const convex = useConvex();

	// State management
	const [teamName, setTeamName] = useState<string>('');
	const [teamDescription, setTeamDescription] = useState<string>('');
	const [teamType, setTeamType] = useState<TeamType>('startup');
	const [teamAvatar, setTeamAvatar] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const createTeam = useMutation(api.teams.createTeam);
	const { user } = useKindeBrowserClient();

	// Avatar upload handler
	const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Validate file size (e.g., max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				toast.error('File size should be less than 5MB');
				return;
			}

			// Validate file type
			const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
			if (!allowedTypes.includes(file.type)) {
				toast.error('Only JPEG, PNG, and GIF files are allowed');
				return;
			}

			setTeamAvatar(file);
			setAvatarPreview(URL.createObjectURL(file));
		}
	};

	// Remove avatar
	const removeAvatar = () => {
		setTeamAvatar(null);
		setAvatarPreview(null);
	};

	// Team creation handler
	const handleCreateTeam = async () => {
		// Validation
		if (!teamName.trim()) {
			toast.error('Team name is required');
			return;
		}

		if (teamDescription.length > 500) {
			toast.error('Team description cannot exceed 500 characters');
			return;
		}

		setIsLoading(true);

		try {
			// Upload avatar if exists (you'd need to implement this in your backend)
			let avatarUrl = null;
			if (teamAvatar) {
				// Placeholder for avatar upload logic
				// avatarUrl = await uploadTeamAvatar(teamAvatar);
			}

			const result = await createTeam({
				teamName: teamName.trim(),
				teamDescription: teamDescription.trim(),
				teamType,
				createdBy: user?.email,
				teamAvatarUrl: avatarUrl,
			});

			if (result) {
				toast.success('Team created successfully!');
				router.push('/dashboard');
			}
		} catch (error) {
			console.error('Team creation error:', error);
			toast.error('Failed to create team');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container mx-auto px-4 py-16'>
			<div className='max-w-md mx-auto'>
				<h2 className='text-3xl font-bold mb-4 text-center'>
					Create Your Team
				</h2>
				<p className='text-gray-600 mb-8 text-center'>
					Set up your team and start collaborating
				</p>

				<div className='space-y-6'>
					{/* Team Avatar Upload */}
					<div className='flex justify-center mb-6'>
						<div className='relative'>
							{avatarPreview ? (
								<div className='relative'>
									<img
										src={avatarPreview}
										alt='Team Avatar'
										className='w-32 h-32 rounded-full object-cover'
									/>
									<button
										onClick={removeAvatar}
										className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'>
										<X size={16} />
									</button>
								</div>
							) : (
								<label className='cursor-pointer'>
									<input
										type='file'
										accept='image/jpeg,image/png,image/gif'
										className='hidden'
										onChange={handleAvatarUpload}
									/>
									<div className='w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center'>
										<ImagePlus className='text-gray-500' size={32} />
										<span className='sr-only'>Upload Team Avatar</span>
									</div>
								</label>
							)}
						</div>
					</div>

					{/* Team Name Input */}
					<div>
						<label
							htmlFor='teamName'
							className='block text-sm font-medium text-gray-700 mb-2'>
							Team Name
						</label>
						<Input
							id='teamName'
							placeholder='Enter team name'
							value={teamName}
							onChange={(e) => setTeamName(e.target.value)}
							className='w-full'
							maxLength={50}
						/>
					</div>

					{/* Team Description */}
					<div>
						<label
							htmlFor='teamDescription'
							className='block text-sm font-medium text-gray-700 mb-2'>
							Team Description
						</label>
						<Textarea
							id='teamDescription'
							placeholder="Describe your team's purpose (optional)"
							value={teamDescription}
							onChange={(e) => setTeamDescription(e.target.value)}
							className='w-full'
							maxLength={500}
						/>
						<p className='text-xs text-gray-500 mt-1'>
							{teamDescription.length}/500 characters
						</p>
					</div>

					{/* Team Type Selection */}
					<div>
						<label
							htmlFor='teamType'
							className='block text-sm font-medium text-gray-700 mb-2'>
							Team Type
						</label>
						<Select
							value={teamType}
							onValueChange={(value: TeamType) => setTeamType(value)}>
							<SelectTrigger>
								<SelectValue placeholder='Select team type' />
							</SelectTrigger>
							<SelectContent>
								{TEAM_TYPES.map((type) => (
									<SelectItem key={type.value} value={type.value}>
										{type.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Create Team Button */}
					<Button
						onClick={handleCreateTeam}
						disabled={!teamName.trim() || isLoading}
						className='w-full bg-indigo-600 hover:bg-indigo-700 
              text-white font-bold py-2 px-4 rounded 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              disabled:opacity-50 disabled:cursor-not-allowed'>
						{isLoading ? 'Creating Team...' : 'Create Team'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateTeamPage;
