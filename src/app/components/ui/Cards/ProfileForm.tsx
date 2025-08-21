'use client';
import React, { useState, useEffect } from 'react';
import { Instagram, Twitter, Facebook, Youtube, Linkedin } from 'lucide-react';

const TiktokIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M19 9.5V15.5C19 17.5 17.5 19 15.5 19H9.5C7.5 19 6 17.5 6 15.5V9.5C6 7.5 7.5 6 9.5 6H15.5C17.5 6 19 7.5 19 9.5Z' />
		<path d='M12 16V8' />
		<path d='M8 12H16' />
	</svg>
);

interface ProfileFormProps {
	userType: 'influencer' | 'business';
	selectedPlatforms: string[];
	onPlatformSelect: (platform: string) => void;
	userData?: any; // Add userData prop
	onSubmit?: (formData: any) => void; // Add onSubmit prop
}

const ProfileForm: React.FC<ProfileFormProps> = ({
	userType,
	selectedPlatforms,
	onPlatformSelect,
	userData,
	onSubmit,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		website: '',
		companyName: '',
		bio: '',
		photo: null as File | null,
	});

	// Populate form with user data when available
	useEffect(() => {
		if (userData) {
			console.log('Populating form with user data:', userData);
			setFormData((prevData) => ({
				...prevData,
				name: userData.name || '',
				email: userData.email || '',
				website: userData.website || '',
				companyName: userData.companyName || '',
				bio: userData.bio || '',
			}));
		}
	}, [userData]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputElement = e.target;
		if (inputElement.files && inputElement.files[0]) {
			setFormData((prevState) => ({
				...prevState,
				photo: inputElement.files[0],
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Call the onSubmit prop if provided
		if (onSubmit) {
			onSubmit(formData);
		} else {
			// Fallback to console log if no onSubmit handler is provided
			console.log('Form submitted with data:', formData);
		}
	};

	const platforms = [
		{ id: 'instagram', icon: Instagram, label: 'Instagram' },
		{ id: 'twitter', icon: Twitter, label: 'Twitter' },
		{ id: 'facebook', icon: Facebook, label: 'Facebook' },
		{ id: 'youtube', icon: Youtube, label: 'YouTube' },
		{ id: 'tiktok', icon: TiktokIcon, label: 'TikTok' },
		{ id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
	];

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<label className='block text-gray-300 mb-2'>Full Name</label>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary'
						placeholder='Enter your full name'
						required
					/>
				</div>
				<div>
					<label className='block text-gray-300 mb-2'>Email</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary'
						placeholder='Enter your email'
						required
					/>
				</div>
			</div>

			{userType === 'business' && (
				<div>
					<label className='block text-gray-300 mb-2'>Company Name</label>
					<input
						type='text'
						name='companyName'
						value={formData.companyName}
						onChange={handleInputChange}
						className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary'
						placeholder='Enter your company name'
					/>
				</div>
			)}

			<div>
				<label className='block text-gray-300 mb-2'>Website</label>
				<input
					type='text'
					name='website'
					value={formData.website}
					onChange={handleInputChange}
					className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary'
					placeholder='Enter your website URL'
				/>
			</div>

			<div>
				<label className='block text-gray-300 mb-2'>Bio</label>
				<textarea
					name='bio'
					value={formData.bio}
					onChange={handleInputChange}
					className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary min-h-[100px]'
					placeholder={
						userType === 'influencer'
							? 'Tell us about your content and audience'
							: 'Tell us about your business'
					}
				/>
			</div>

			<div>
				<label className='block text-gray-300 mb-2'>Profile Photo</label>
				<input
					type='file'
					name='photo'
					onChange={handleFileChange}
					className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary'
					accept='image/*'
				/>
			</div>

			{/* <div>
				<label className='block text-gray-300 mb-4'>
					Connect Social Media Platforms
				</label>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
					{platforms.map((platform) => {
						const Icon = platform.icon;
						const isSelected = selectedPlatforms.includes(platform.id);
						return (
							<button
								key={platform.id}
								type='button'
								onClick={() => onPlatformSelect(platform.id)}
								className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all duration-300 ${
									isSelected
										? 'border-primary bg-primary/10 text-primary'
										: 'border-gray-700 hover:border-primary/50 text-gray-400 hover:text-primary'
								}`}>
								<Icon className='w-5 h-5' />
								<span>{platform.label}</span>
							</button>
						);
					})}
				</div>
			</div> */}

			{/* <div className='flex justify-end'>
				<button
					type='submit'
					className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'>
					Save Profile
				</button>
			</div> */}
		</form>
	);
};

export default ProfileForm;
