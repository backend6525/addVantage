import React, { useState } from 'react';

export const CreateTeamModal = ({ open, onOpenChange, onSuccess }) => {
	const [formData, setFormData] = useState({
		teamName: '',
		description: '',
		industry: '',
		targetAudience: '',
		defaultBudget: '',
		campaignTypes: [],
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const teamData = {
			...formData,
			defaultBudget: parseFloat(formData.defaultBudget) || 0,
			campaignTypes: formData.campaignTypes.filter((type) => type.trim()),
		};
		onSuccess(teamData);
		onOpenChange(false);
	};

	const handleClose = () => {
		onOpenChange(false);
	};

	if (!open) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-6 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Create New Team
					</h3>
				</div>
				<form onSubmit={handleSubmit} className='p-6 space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Team Name
						</label>
						<input
							type='text'
							required
							value={formData.teamName}
							onChange={(e) =>
								setFormData({ ...formData, teamName: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Description
						</label>
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={3}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Industry
						</label>
						<input
							type='text'
							value={formData.industry}
							onChange={(e) =>
								setFormData({ ...formData, industry: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Target Audience
						</label>
						<input
							type='text'
							value={formData.targetAudience}
							onChange={(e) =>
								setFormData({ ...formData, targetAudience: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Default Budget
						</label>
						<input
							type='number'
							value={formData.defaultBudget}
							onChange={(e) =>
								setFormData({ ...formData, defaultBudget: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div className='flex gap-3 pt-4'>
						<button
							type='button'
							onClick={handleClose}
							className='flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50'>
							Cancel
						</button>
						<button
							type='submit'
							className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
							Create Team
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export const AddMemberModal = ({ open, onOpenChange, team, onSuccess }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: 'Member',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSuccess(formData);
		onOpenChange(false);
	};

	const handleClose = () => {
		onOpenChange(false);
	};

	if (!open) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
				<div className='p-6 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Add Team Member
					</h3>
				</div>
				<form onSubmit={handleSubmit} className='p-6 space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							First Name
						</label>
						<input
							type='text'
							required
							value={formData.firstName}
							onChange={(e) =>
								setFormData({ ...formData, firstName: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Last Name
						</label>
						<input
							type='text'
							required
							value={formData.lastName}
							onChange={(e) =>
								setFormData({ ...formData, lastName: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Email
						</label>
						<input
							type='email'
							required
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Role
						</label>
						<select
							value={formData.role}
							onChange={(e) =>
								setFormData({ ...formData, role: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
							<option value='Member'>Member</option>
							<option value='Admin'>Admin</option>
							<option value='Manager'>Manager</option>
						</select>
					</div>
					<div className='flex gap-3 pt-4'>
						<button
							type='button'
							onClick={handleClose}
							className='flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50'>
							Cancel
						</button>
						<button
							type='submit'
							className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
							Add Member
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export const AddInfluencerModal = ({ open, onOpenChange, team, onSuccess }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		dateOfBirth: '',
		location: {
			country: '',
			city: '',
			state: '',
			timezone: '',
		},
		bio: '',
		website: '',
		occupation: '',
		expertise: [],
	});

	const [socialProfiles, setSocialProfiles] = useState([
		{
			platform: 'instagram',
			username: '',
			profileUrl: '',
			isVerified: false,
			followerCount: 0,
			engagementRate: 0,
		},
	]);

	const [newExpertise, setNewExpertise] = useState('');

	// Add/remove social profiles
	const addSocialProfile = () => {
		setSocialProfiles([
			...socialProfiles,
			{
				platform: 'instagram',
				username: '',
				profileUrl: '',
				isVerified: false,
				followerCount: 0,
				engagementRate: 0,
			},
		]);
	};

	const removeSocialProfile = (index) => {
		setSocialProfiles(socialProfiles.filter((_, i) => i !== index));
	};

	const updateSocialProfile = (index, field, value) => {
		const updatedProfiles = [...socialProfiles];
		updatedProfiles[index] = {
			...updatedProfiles[index],
			[field]:
				field === 'followerCount' || field === 'engagementRate'
					? Number(value) || 0
					: field === 'isVerified'
						? Boolean(value)
						: value,
		};
		setSocialProfiles(updatedProfiles);
	};

	// Expertise management
	const addExpertise = () => {
		if (
			newExpertise.trim() &&
			!formData.expertise.includes(newExpertise.trim())
		) {
			setFormData({
				...formData,
				expertise: [...formData.expertise, newExpertise.trim()],
			});
			setNewExpertise('');
		}
	};

	const removeExpertise = (index) => {
		setFormData({
			...formData,
			expertise: formData.expertise.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const apiData = {
			influencerData: {
				...formData,
				// Ensure all required fields are included
				occupation: formData.occupation || 'Influencer',
				expertise: formData.expertise || [],
				// Ensure country is provided
				location: {
					...formData.location,
					country: formData.location.country || '',
				},
			},
			socialProfiles: socialProfiles.map((profile) => ({
				...profile,
				// Generate profile URL if not provided
				profileUrl:
					profile.profileUrl ||
					`https://${profile.platform}.com/${profile.username}`,
			})),
		};

		onSuccess(apiData);
		onOpenChange(false);
	};

	const handleClose = () => {
		onOpenChange(false);
	};

	if (!open) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-6 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Add Influencer
					</h3>
				</div>
				<form onSubmit={handleSubmit} className='p-6 space-y-4'>
					{/* Basic Info Section */}
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								First Name*
							</label>
							<input
								type='text'
								required
								value={formData.firstName}
								onChange={(e) =>
									setFormData({ ...formData, firstName: e.target.value })
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Last Name*
							</label>
							<input
								type='text'
								required
								value={formData.lastName}
								onChange={(e) =>
									setFormData({ ...formData, lastName: e.target.value })
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Email*
							</label>
							<input
								type='email'
								required
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Phone Number
							</label>
							<input
								type='tel'
								value={formData.phoneNumber}
								onChange={(e) =>
									setFormData({ ...formData, phoneNumber: e.target.value })
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Date of Birth
							</label>
							<input
								type='date'
								value={formData.dateOfBirth}
								onChange={(e) =>
									setFormData({ ...formData, dateOfBirth: e.target.value })
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Occupation
							</label>
							<input
								type='text'
								value={formData.occupation}
								onChange={(e) =>
									setFormData({ ...formData, occupation: e.target.value })
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Country*
							</label>
							<input
								type='text'
								required
								value={formData.location.country}
								onChange={(e) =>
									setFormData({
										...formData,
										location: { ...formData.location, country: e.target.value },
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								City
							</label>
							<input
								type='text'
								value={formData.location.city}
								onChange={(e) =>
									setFormData({
										...formData,
										location: { ...formData.location, city: e.target.value },
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								State/Region
							</label>
							<input
								type='text'
								value={formData.location.state}
								onChange={(e) =>
									setFormData({
										...formData,
										location: { ...formData.location, state: e.target.value },
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Timezone
							</label>
							<input
								type='text'
								value={formData.location.timezone}
								onChange={(e) =>
									setFormData({
										...formData,
										location: {
											...formData.location,
											timezone: e.target.value,
										},
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Website
						</label>
						<input
							type='url'
							value={formData.website}
							onChange={(e) =>
								setFormData({ ...formData, website: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Bio
						</label>
						<textarea
							value={formData.bio}
							onChange={(e) =>
								setFormData({ ...formData, bio: e.target.value })
							}
							rows={3}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>

					{/* Expertise Section */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Expertise
						</label>
						<div className='flex gap-2 mb-2'>
							<input
								type='text'
								value={newExpertise}
								onChange={(e) => setNewExpertise(e.target.value)}
								onKeyPress={(e) =>
									e.key === 'Enter' && (e.preventDefault(), addExpertise())
								}
								placeholder='Add expertise'
								className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
							<button
								type='button'
								onClick={addExpertise}
								className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
								Add
							</button>
						</div>
						<div className='flex flex-wrap gap-2'>
							{formData.expertise.map((expertise, index) => (
								<span
									key={index}
									className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
									{expertise}
									<button
										type='button'
										onClick={() => removeExpertise(index)}
										className='text-blue-600 hover:text-blue-800'>
										×
									</button>
								</span>
							))}
						</div>
					</div>

					{/* Social Media Profiles Section */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Social Media Profiles
						</label>
						{socialProfiles.map((profile, index) => (
							<div key={index} className='grid grid-cols-12 gap-2 mb-3'>
								<div className='col-span-3'>
									<select
										value={profile.platform}
										onChange={(e) =>
											updateSocialProfile(index, 'platform', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
										<option value='instagram'>Instagram</option>
										<option value='tiktok'>TikTok</option>
										<option value='youtube'>YouTube</option>
										<option value='twitter'>Twitter</option>
									</select>
								</div>
								<div className='col-span-3'>
									<input
										type='text'
										placeholder='Username'
										value={profile.username}
										onChange={(e) =>
											updateSocialProfile(index, 'username', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
								<div className='col-span-3'>
									<input
										type='url'
										placeholder='Profile URL'
										value={profile.profileUrl}
										onChange={(e) =>
											updateSocialProfile(index, 'profileUrl', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
								<div className='col-span-2'>
									<input
										type='number'
										placeholder='Followers'
										value={profile.followerCount}
										onChange={(e) =>
											updateSocialProfile(
												index,
												'followerCount',
												e.target.value
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
								<div className='col-span-1 flex items-center justify-center'>
									<input
										type='checkbox'
										checked={profile.isVerified}
										onChange={(e) =>
											updateSocialProfile(index, 'isVerified', e.target.checked)
										}
										className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
									/>
								</div>
							</div>
						))}
						<button
							type='button'
							onClick={addSocialProfile}
							className='mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'>
							+ Add Social Profile
						</button>
					</div>

					<div className='flex gap-3 pt-4'>
						<button
							type='button'
							onClick={handleClose}
							className='flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50'>
							Cancel
						</button>
						<button
							type='submit'
							className='flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
							Add Influencer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
