'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import {
	ArrowRight,
	ArrowLeft,
	Building2,
	UserCircle,
	Briefcase,
	CheckCircle,
	ChevronRight,
	Rocket,
	Instagram,
	Twitter,
	Facebook,
	Youtube,
	Linkedin,
	SkipForward,
} from 'lucide-react';
import OptionCard from '../components/ui/Cards/OptionCard';
import ProfileForm from '../components/ui/Cards/ProfileForm';

interface Step {
	title: string;
	description: string;
	details: string;
	icon: React.ElementType;
	content: React.ReactNode;
}

const OnboardingProcess: React.FC = () => {
	const router = useRouter();
	const convex = useConvex();
	const [currentStep, setCurrentStep] = useState(1);
	const [userType, setUserType] = useState<'influencer' | 'business' | null>(
		null
	);
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<any>(null);
	const [isLoadingUserData, setIsLoadingUserData] = useState(true);

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoadingUserData(true);
				const response = await fetch('/api/auth/user');
				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}
				const data = await response.json();

				// Check if the data is nested (common in API responses)
				let userDataObj = data;
				if (data && data.data) {
					userDataObj = data.data;
				}

				if (userDataObj) {
					console.log('User data fetched successfully:', userDataObj);

					// Store the complete user data
					setUserData(userDataObj);

					// Ensure user ID is stored in session storage
					if (userDataObj._id) {
						sessionStorage.setItem('userId', userDataObj._id);
						console.log('User ID stored in session storage:', userDataObj._id);
					} else {
						console.error('User ID is missing from fetched data');
					}

					// Store user email in session storage for later use
					if (userDataObj.email) {
						sessionStorage.setItem('userEmail', userDataObj.email);
					}

					// If user has a type already set, use it
					if (userDataObj.userType) {
						setUserType(userDataObj.userType);
					}

					// If user has platforms already set, use them
					if (userDataObj.platforms && Array.isArray(userDataObj.platforms)) {
						setSelectedPlatforms(userDataObj.platforms);
					}
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			} finally {
				setIsLoadingUserData(false);
			}
		};

		fetchUserData();
	}, []);

	// Save user data to database when it changes
	useEffect(() => {
		const saveUserData = async () => {
			if (!userData || !userData._id) return;

			try {
				// Update user data in the database
				await convex.mutation(api.user.updateUser, {
					id: userData._id,
					userType: userType || undefined,
					platforms:
						selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
				});
			} catch (error) {
				console.error('Error saving user data:', error);
			}
		};

		saveUserData();
	}, [userType, selectedPlatforms, userData]);

	const steps: Step[] = [
		{
			title: 'User Type',
			description: 'Choose Your Role',
			details:
				'Select whether you are an influencer looking to monetize your content or a business seeking to advertise.',
			icon: UserCircle,
			content: (
				<div className='grid md:grid-cols-2 gap-6'>
					<OptionCard
						title='Influencer'
						description='Create and monetize your content through ads. Perfect for content creators and social media personalities.'
						value='influencer'
						onClick={() => setUserType('influencer')}
						className='bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20'
						selected={userType === 'influencer'}
					/>
					<OptionCard
						title='Business'
						description='Advertise your products or services through influencer marketing. Ideal for brands and companies.'
						value='business'
						onClick={() => setUserType('business')}
						className='bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20'
						selected={userType === 'business'}
					/>
				</div>
			),
		},
		{
			title: 'Profile',
			description: 'Tell Us About Yourself',
			details:
				'Help us personalize your experience by sharing some basic information about you and your role.',
			icon: UserCircle,
			content: isLoadingUserData ? (
				<div className='flex justify-center items-center h-64'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
				</div>
			) : (
				<ProfileForm
					userType={userType}
					selectedPlatforms={selectedPlatforms}
					onPlatformSelect={(platform: string) => {
						setSelectedPlatforms((prev) =>
							prev.includes(platform)
								? prev.filter((p) => p !== platform)
								: [...prev, platform]
						);
					}}
					userData={userData}
					onSubmit={async (formData) => {
						try {
							setIsLoading(true);

							// Update user profile in the database
							await convex.mutation(api.user.updateProfile, {
								userId: userData._id,
								name: formData.name,
								email: formData.email,
								website: formData.website,
								companyName: formData.companyName,
								bio: formData.bio,
							});

							// Update local user data
							setUserData({
								...userData,
								name: formData.name,
								email: formData.email,
								website: formData.website,
								companyName: formData.companyName,
								bio: formData.bio,
							});

							// Show success message
							alert('Profile updated successfully!');

							// Move to next step
							setCurrentStep((prev) => Math.min(prev + 1, steps.length));
						} catch (error) {
							console.error('Error updating profile:', error);
							alert('Failed to update profile. Please try again.');
						} finally {
							setIsLoading(false);
						}
					}}
				/>
			),
		},
		{
			title: 'Social Media',
			description: 'Connect Your Platforms',
			details:
				'Link your social media accounts to enhance your profile and reach. You can skip this step and connect later.',
			icon: Instagram,
			content: (
				<div className='space-y-6'>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
						{[
							{
								name: 'Instagram',
								icon: Instagram,
								color: 'from-pink-500 to-purple-500',
							},
							{
								name: 'Twitter',
								icon: Twitter,
								color: 'from-blue-400 to-blue-600',
							},
							{
								name: 'Facebook',
								icon: Facebook,
								color: 'from-blue-600 to-blue-800',
							},
							{
								name: 'YouTube',
								icon: Youtube,
								color: 'from-red-500 to-red-700',
							},

							{
								name: 'LinkedIn',
								icon: Linkedin,
								color: 'from-blue-700 to-blue-900',
							},
						].map((platform) => (
							<button
								key={platform.name}
								onClick={() => {
									setSelectedPlatforms((prev) =>
										prev.includes(platform.name)
											? prev.filter((p) => p !== platform.name)
											: [...prev, platform.name]
									);
								}}
								className={`p-4 rounded-xl border transition-all duration-300 ${
									selectedPlatforms.includes(platform.name)
										? 'border-primary bg-primary/10'
										: 'border-gray-700 hover:border-primary/50'
								}`}>
								<div className='flex flex-col items-center gap-2'>
									<platform.icon
										className={`w-8 h-8 ${
											selectedPlatforms.includes(platform.name)
												? 'text-primary'
												: 'text-gray-400'
										}`}
									/>
									<span className='text-sm font-medium'>{platform.name}</span>
								</div>
							</button>
						))}
					</div>
					<div className='flex justify-center'>
						<button
							onClick={() => setCurrentStep((prev) => prev + 1)}
							className='flex items-center gap-2 text-gray-400 hover:text-primary transition-colors'>
							<SkipForward className='w-5 h-5' />
							Skip for now
						</button>
					</div>
				</div>
			),
		},
		{
			title: userType === 'influencer' ? 'Content Details' : 'Business Details',
			description:
				userType === 'influencer'
					? 'Your Content Profile'
					: 'Your Business Profile',
			details:
				userType === 'influencer'
					? 'Tell us about your content and audience to help match you with relevant advertising opportunities.'
					: 'Provide information about your business to help us better understand your advertising needs.',
			icon: Briefcase,
			content: (
				<div className='space-y-6'>
					{userType === 'influencer' ? (
						<div className='grid gap-6'>
							<div className='p-6 rounded-xl bg-gray-800/50 border border-gray-700'>
								<h3 className='text-lg font-semibold mb-4'>
									Content Categories
								</h3>
								<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
									{[
										'Lifestyle',
										'Tech',
										'Fashion',
										'Food',
										'Travel',
										'Fitness',
									].map((category) => (
										<button
											key={category}
											className='p-3 rounded-lg border border-gray-700 hover:border-primary/50 transition-colors'>
											{category}
										</button>
									))}
								</div>
							</div>
							<div className='p-6 rounded-xl bg-gray-800/50 border border-gray-700'>
								<h3 className='text-lg font-semibold mb-4'>
									Audience Demographics
								</h3>
								{/* Add audience demographics form fields */}
							</div>
						</div>
					) : (
						<div className='grid gap-6'>
							<div className='p-6 rounded-xl bg-gray-800/50 border border-gray-700'>
								<h3 className='text-lg font-semibold mb-4'>
									Business Information
								</h3>
								{/* Add business information form fields */}
							</div>
							<div className='p-6 rounded-xl bg-gray-800/50 border border-gray-700'>
								<h3 className='text-lg font-semibold mb-4'>
									Advertising Goals
								</h3>
								{/* Add advertising goals form fields */}
							</div>
						</div>
					)}
				</div>
			),
		},
		{
			title: 'Confirmation',
			description: 'Ready to Launch',
			details:
				'Review your information and confirm everything is correct before we finalize your setup.',
			icon: CheckCircle,
			content: (
				<div className='space-y-6'>
					<div className='p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-gray-700'>
						<h3 className='text-lg font-semibold mb-4'>Almost There!</h3>
						<p className='text-gray-400'>
							Review and confirm your details to complete the setup.
						</p>
					</div>
				</div>
			),
		},
	];

	const handleComplete = async () => {
		try {
			setIsLoading(true);

			// Get the user ID from session storage
			let userId = sessionStorage.getItem('userId');

			// If not in session storage, try to get it from the userData state
			if (!userId && userData && userData._id) {
				userId = userData._id;
				// Also store it in session storage for future use
				sessionStorage.setItem('userId', userId);
			}

			if (!userId) {
				console.error('No user ID found');
				alert('User ID not found. Please refresh the page and try again.');
				return;
			}

			console.log('Completing onboarding for user ID:', userId);

			// Mark onboarding as completed
			await convex.mutation(api.user.completeOnboarding, {
				userId: userId as any, // Type assertion needed for Convex ID
			});

			console.log(
				'Onboarding completed successfully. Redirecting to dashboard.'
			);

			// Set a flag in session storage to indicate onboarding is complete
			sessionStorage.setItem('onboardingCompleted', 'true');

			// Redirect to dashboard with a small delay to ensure the mutation completes
			setTimeout(() => {
				router.push('/dashboard');
			}, 500);
		} catch (error) {
			console.error('Error completing onboarding:', error);
			alert('Failed to complete onboarding. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const nextStep = () => {
		if (currentStep === 1 && !userType) {
			// Show error toast or message
			return;
		}
		if (currentStep === steps.length) {
			handleComplete();
		} else {
			setCurrentStep((prev) => Math.min(prev + 1, steps.length));
		}
	};

	const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900'>
			<div className='container mx-auto px-4 py-12'>
				{/* Welcome Banner */}
				<div className='text-center mb-12'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<Rocket className='w-8 h-8 text-purple-400 animate-pulse' />
						<h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400'>
							Welcome to AddVantage
						</h1>
					</div>
					<p className='text-gray-400 max-w-2xl mx-auto'>
						Lets get your account set up and ready to go. This will only take a
						few minutes.
					</p>
				</div>

				{/* Progress Steps */}
				<div className='max-w-4xl mx-auto mb-12'>
					<div className='flex justify-between relative'>
						{steps.map((step, index) => {
							const StepIcon = step.icon;
							return (
								<div
									key={index}
									className='flex flex-col items-center relative z-10'>
									<div
										className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
											currentStep > index + 1
												? 'bg-purple-500 text-white'
												: currentStep === index + 1
													? 'bg-purple-400 text-white ring-4 ring-purple-400/20'
													: 'bg-gray-800 text-gray-400'
										}`}>
										<StepIcon className='w-6 h-6' />
									</div>
									<div className='mt-3 text-sm font-medium text-gray-400'>
										{step.title}
									</div>
								</div>
							);
						})}
						{/* Progress Line */}
						<div className='absolute top-6 left-0 right-0 h-[2px] bg-gray-800 -z-10'>
							<div
								className='h-full bg-purple-500 transition-all duration-300'
								style={{
									width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
								}}
							/>
						</div>
					</div>
				</div>

				{/* Content Area */}
				<div className='max-w-4xl mx-auto'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentStep}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className='bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8'>
							<div className='mb-8'>
								<h2 className='text-2xl font-bold text-white mb-3'>
									{steps[currentStep - 1].description}
								</h2>
								<p className='text-gray-400'>
									{steps[currentStep - 1].details}
								</p>
							</div>

							<div className='mb-8'>{steps[currentStep - 1].content}</div>

							<div className='flex justify-between items-center'>
								<button
									onClick={prevStep}
									className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-300 ${
										currentStep > 1
											? 'bg-gray-700 hover:bg-gray-600'
											: 'opacity-0 pointer-events-none'
									}`}>
									<ArrowLeft className='w-5 h-5' />
									Back
								</button>

								{currentStep === steps.length ? (
									<button
										onClick={handleComplete}
										disabled={isLoading}
										className='flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
										{isLoading ? (
											<>Processing...</>
										) : (
											<>
												Get Started
												<Rocket className='w-5 h-5' />
											</>
										)}
									</button>
								) : (
									<button
										onClick={nextStep}
										className='flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all duration-300'>
										Continue
										<ChevronRight className='w-5 h-5' />
									</button>
								)}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default OnboardingProcess;
