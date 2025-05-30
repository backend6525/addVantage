// // create.tsx file
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog';
import {
	FileUp,
	AlertCircle,
	Check,
	X,
	Info,
	Upload,
	Clock,
	DollarSign,
	Users,
	FileText,
	Send,
	Loader2,
} from 'lucide-react';
import { useToast } from '@/app/components/ui/toast/use-toast';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

type CreateAdPayload = {
	adName: string;
	teamId: string;
	createdBy: string;
	type: string;
	costPerView: string;
	numberOfDaysRunning: string;
	adResourceUrl: string | null;
	description: string;
};

interface CreateProps {
	onCreateAd: (counts: { dailyCount: number; weeklyCount: number }) => void;
	isMenuOpen: boolean;
	dailyAdCount: number;
	weeklyAdCount: number;
}

function Create({
	onCreateAd,
	isMenuOpen,
	dailyAdCount,
	weeklyAdCount,
}: CreateProps) {
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();
	//const { user } = useKindeAuth();
	const incrementAdCount = useMutation(api.ads.incrementAdCounts);
	const checkAndResetLimit = useMutation(api.ads.checkAndResetLimits);
	const getUserLimit = useMutation(api.ads.getUserAdLimits);

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch('/api/auth/user');
			if (!response.ok) throw new Error('Failed to fetch user data');

			const data = await response.json();
			console.log('User data from API:', data);

			// Check if we have a valid token
			if (!data.idToken) {
				console.error('No ID token in user data');
				throw new Error('No authentication token found');
			}

			// Store token for later API calls
			sessionStorage.setItem('userToken', data.idToken);
			console.log('Token stored in sessionStorage:', data.idToken);

			//Set user data in state
			setUserData(data);
			return data;
		} catch (error) {
			console.error('Error fetching user data:', error);
			setError('Authentication failed');
			throw error;
		}
	}, []);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const [userLimits, setUserLimits] = useState<{
		dailyCount: number;
		weeklyCount: number;
		hasCredits?: boolean;
	}>({
		dailyCount: dailyAdCount,
		weeklyCount: weeklyAdCount,
		hasCredits: true, // Default value until we get real data
	});
	const [isLoading, setIsLoading] = useState(true);
	// Fetch and sync limits when component mounts
	const [userData, setUserData] = useState<{
		email: string;
		[key: string]: any;
	} | null>(null);
	// const user = useQuery(api.user.getUserByEmail);
	useEffect(() => {
		const fetchUserLimits = async () => {
			if (userData?.email) {
				try {
					// First check and reset limits if needed
					await checkAndResetLimit({ userEmail: userData.email });

					// Then fetch current limits
					const limits = await getUserLimit({
						userEmail: userData.email,
						// timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					});
					if (limits) {
						setUserLimits((prev) => ({
							...prev,
							dailyCount: limits.dailyCount,
							weeklyCount: limits.weeklyCount,
							hasCredits: limits.hasCredits,
						}));

						// Sync parent component with our data
						onCreateAd({
							dailyCount: 0, // Send 0 to avoid incrementing
							weeklyCount: 0, // Just syncing the state
						});
					}
				} catch (error) {
					console.error('Error fetching user limits:', error);
				}
			}
			setIsLoading(false);
		};

		fetchUserLimits();
	}, [userData, checkAndResetLimit, getUserLimit, onCreateAd]);

	// Use our local state for all limit checks
	const actualDailyCount = userLimits.dailyCount;
	const actualWeeklyCount = userLimits.weeklyCount;

	const [formData, setFormData] = useState({
		adName: '',
		teamId: '',
		type: '',
		costPerView: '',
		numberOfDaysRunning: '',
		adResourceUrl: '',
		adResource: null as File | null,
		description: '',
	});

	const [errors, setErrors] = useState({
		adName: '',
		teamId: '',
		costPerView: '',
		numberOfDaysRunning: '',
		adResource: '',
		description: '',
	});

	const [showDialog, setShowDialog] = useState(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);

	const validateAdName = useCallback((name: string) => {
		if (!name) return 'Ad name is required';
		if (name.length < 3) return 'Ad name must be at least 3 characters';
		if (name.length > 50) return 'Ad name cannot exceed 50 characters';
		return '';
	}, []);

	const validateTeamId = useCallback((teamId: string) => {
		if (!teamId) return 'Team ID is required';
		const teamIdRegex = /^[A-Za-z0-9]{6,10}$/;
		if (!teamIdRegex.test(teamId)) return 'Invalid Team ID format';
		return '';
	}, []);

	const validateCostPerView = useCallback((cost: string) => {
		if (cost === '') return '';
		const costNum = parseFloat(cost);
		if (isNaN(costNum) || costNum < 0) return 'Invalid cost';
		return '';
	}, []);

	const validateDays = useCallback((days: string) => {
		if (days === '') return '';
		const daysNum = parseInt(days, 10);
		if (isNaN(daysNum) || daysNum <= 0 || daysNum > 30)
			return 'Days must be between 1 and 30';
		return '';
	}, []);

	const validateAdResource = useCallback((type: string, file: File | null) => {
		if (type !== 'Text' && !file)
			return 'Resource file is required for this type';
		return '';
	}, []);

	const validateAdDescription = useCallback((description: string) => {
		if (!description) return 'Description is required';
		if (description.length < 10)
			return 'Description must be at least 10 characters';
		if (description.length > 500)
			return 'Description cannot exceed 500 characters';
		return '';
	}, []);

	const validateField = useCallback(
		(name: string, value: string | File | null) => {
			switch (name) {
				case 'adName':
					return validateAdName(value as string);
				case 'teamId':
					return validateTeamId(value as string);
				case 'costPerView':
					return validateCostPerView(value as string);
				case 'numberOfDaysRunning':
					return validateDays(value as string);
				case 'adResource':
					return validateAdResource(formData.type, value as File | null);
				case 'type':
					return validateAdResource(value as string, formData.adResource);
				case 'description':
					return validateAdDescription(value as string);
				default:
					return '';
			}
		},
		[
			formData.type,
			formData.adResource,
			validateAdName,
			validateTeamId,
			validateCostPerView,
			validateDays,
			validateAdResource,
			validateAdDescription,
		]
	);

	const handleChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			const { name, value } = e.target;
			const files = (e.target as HTMLInputElement).files;

			const newFormData = {
				...formData,
				[name]: files ? files[0] : value,
			};
			setFormData(newFormData);

			const error = validateField(name, files ? files[0] : value);

			setErrors((prev) => ({
				...prev,
				[name]: error,
			}));
		},
		[formData, validateField]
	);

	const isFormValid = useMemo(() => {
		// Only validate when the dialog is open
		if (!showDialog) return false;

		const newErrors = {
			adName: validateAdName(formData.adName),
			teamId: validateTeamId(formData.teamId),
			costPerView: validateCostPerView(formData.costPerView),
			numberOfDaysRunning: validateDays(formData.numberOfDaysRunning),
			adResource: validateAdResource(formData.type, formData.adResource),
			description: validateAdDescription(formData.description),
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => error === '');
	}, [
		showDialog,
		formData.adName,
		formData.teamId,
		formData.type,
		formData.costPerView,
		formData.numberOfDaysRunning,
		formData.adResource,
		formData.description,
		validateAdName,
		validateTeamId,
		validateCostPerView,
		validateDays,
		validateAdResource,
		validateAdDescription,
	]);

	const uploadFileToS3 = useCallback(async (file: File): Promise<string> => {
		const fileName = encodeURIComponent(file.name);
		const fileType = file.type;

		const base64Content = await new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result as string | null;
				if (result) {
					resolve(result.split(',')[1]);
				} else {
					reject('File reading failed');
				}
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});

		try {
			const res = await fetch('/api/uploadToS3', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fileName,
					fileType,
					fileContent: base64Content,
				}),
			});

			if (!res.ok) {
				const errorText = await res.text();
				throw new Error(`Server error: ${errorText}`);
			}

			const data = await res.json();
			return data.cloudFrontUrl;
		} catch (error) {
			console.error('Error uploading file to S3:', error);
			throw error;
		}
	}, []);

	const handleCreateAd = useCallback(async () => {
		try {
			// Ensure user is authenticated
			if (!userData || !userData.email) {
				toast({
					title: 'Authentication Error',
					description: 'You must be logged in to create an ad.',
					variant: 'destructive',
				});
				return;
			}

			// Get fresh user data to ensure we have the latest token
			const freshUserData = await fetchUserData();
			if (!freshUserData?.idToken) {
				toast({
					title: 'Authentication Error',
					description: 'Please log in again to create an ad.',
					variant: 'destructive',
				});
				return;
			}

			// Check limits using our local state that mirrors the database
			if (actualDailyCount >= 1) {
				toast({
					title: 'Daily Limit Reached',
					description:
						'You can only create one ad per day. Try again tomorrow.',
					variant: 'destructive',
				});
				return;
			}

			if (actualWeeklyCount >= 5) {
				toast({
					title: 'Weekly Limit Reached',
					description: "You've reached your weekly limit of 5 ads.",
					variant: 'destructive',
				});
				return;
			}

			// Check if user has credits
			if (!userLimits.hasCredits) {
				toast({
					title: 'No Credits',
					description:
						'Your ad will be created but you need to add credits to publish it.',
					variant: 'warning',
				});
				//			return;
			}

			// Validate all fields before submission
			const newErrors = {
				adName: validateAdName(formData.adName),
				teamId: validateTeamId(formData.teamId),
				costPerView: validateCostPerView(formData.costPerView),
				numberOfDaysRunning: validateDays(formData.numberOfDaysRunning),
				adResource: validateAdResource(formData.type, formData.adResource),
				description: validateAdDescription(formData.description),
			};

			setErrors(newErrors);

			if (Object.values(newErrors).some((error) => error !== '')) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Please fill in the required fields correctly.',
				});
				return;
			}

			let fileUrl = null;
			if (formData.adResource) {
				fileUrl = await uploadFileToS3(formData.adResource);
			}

			const payload: CreateAdPayload = {
				adName: formData.adName,
				teamId: formData.teamId,
				createdBy: userData.email,
				type: formData.type,
				costPerView: formData.costPerView,
				numberOfDaysRunning: formData.numberOfDaysRunning,
				adResourceUrl: fileUrl || '',
				description: formData.description,
			};

			// Get the token and log it for debugging
			let token = sessionStorage.getItem('userToken');
			console.log('Token from sessionStorage:', token);

			if (!token) {
				// Try to refresh the token
				const freshUserData = await fetchUserData();
				if (!freshUserData?.idToken) {
					toast({
						title: 'Authentication Error',
						description: 'No authentication token found. Please log in again.',
						variant: 'destructive',
					});
					return;
				}
				// Use the fresh token
				token = freshUserData.idToken;
			}

			const res = await fetch('/api/createAd', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			console.log('Response status:', res.status);
			const result = await res.json();
			console.log('Response data:', result);

			if (res.ok) {
				// Update the backend
				const updatedLimits = await incrementAdCount({
					userEmail: userData.email,
					dailyCount: 1,
					weeklyCount: 1,
				});

				// Update local state with the new values
				if (updatedLimits) {
					setUserLimits({
						dailyCount: updatedLimits.dailyCount,
						weeklyCount: updatedLimits.weeklyCount,
						hasCredits: updatedLimits.hasCredits,
					});
				} else {
					// Fallback if no response with values
					setUserLimits((prev) => ({
						...prev,
						dailyCount: prev.dailyCount + 1,
						weeklyCount: prev.weeklyCount + 1,
					}));
				}

				// Update parent component
				onCreateAd({
					dailyCount: 1,
					weeklyCount: 1,
				});

				// Dispatch custom event to trigger dashboard refresh
				const adCreatedEvent = new CustomEvent('adCreated', {
					detail: { success: true },
				});
				window.dispatchEvent(adCreatedEvent);

				toast({
					variant: 'default',
					title: 'Ad created successfully!',
					description: 'Your ad has been created and is ready to go.',
				});

				setShowDialog(false);
				setShowSuccessDialog(true);
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: result.error || 'Ad creation failed. Please try again.',
				});
			}
		} catch (error) {
			console.error('Error creating ad:', error);
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Ad creation failed. Please try again.',
			});
		}
	}, [
		formData,
		uploadFileToS3,
		onCreateAd,
		toast,
		actualDailyCount,
		actualWeeklyCount,
		userLimits.hasCredits,
		validateAdName,
		validateTeamId,
		validateCostPerView,
		validateDays,
		validateAdResource,
		validateAdDescription,
		incrementAdCount,
		userData,
		fetchUserData,
	]);

	// Only limit by quota for the initial button click, not form validity
	const isInitialClickDisabled = isLoading
		? false
		: actualDailyCount >= 1 || actualWeeklyCount >= 5;

	// Use this for the actual form submission button
	const isSubmitDisabled =
		!userData?.email ||
		actualDailyCount >= 1 ||
		actualWeeklyCount >= 5 ||
		// !userLimits.hasCredits ||
		!isFormValid;

	// Check if user is authenticated
	console.log('this is the: ', userData);
	const isAuthenticated = !!userData;
	//console.log('this is the: ', user);

	return (
		<div className='relative'>
			<button
				onClick={() => setShowDialog(true)}
				className='w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium'>
				<FileUp className='w-5 h-5' />
				<span>Create New Ad</span>
			</button>

			<AnimatePresence>
				{showDialog && (
					<Dialog open={showDialog} onOpenChange={setShowDialog}>
						<DialogContent className='max-w-2xl bg-gray-900/95 border border-slate-700/50 shadow-2xl rounded-xl backdrop-blur-sm'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								className='space-y-6'>
								<DialogHeader>
									<DialogTitle className='text-2xl font-bold text-white flex items-center space-x-3'>
										<FileUp className='w-6 h-6 text-purple-400' />
										<span>Create New Advertisement</span>
									</DialogTitle>
									<DialogDescription className='text-gray-400'>
										Fill in the details below to create your new advertisement
										campaign.
									</DialogDescription>
								</DialogHeader>

								{/* Limits Warning */}
								{(actualDailyCount >= 5 ||
									actualWeeklyCount >= 20 ||
									!userLimits.hasCredits) && (
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3'>
										<AlertCircle className='w-5 h-5 text-red-400 mt-0.5' />
										<div>
											<h4 className='font-medium text-red-400'>
												Limit Reached
											</h4>
											<p className='text-sm text-red-300/80'>
												{!userLimits.hasCredits
													? 'You have no remaining credits. Please upgrade your plan.'
													: actualDailyCount >= 5
														? 'You have reached your daily ad creation limit.'
														: 'You have reached your weekly ad creation limit.'}
											</p>
										</div>
									</motion.div>
								)}

								{/* Form Grid */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{/* Ad Name */}
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-300 flex items-center space-x-2'>
											<span>Ad Name</span>
											<Info className='w-4 h-4 text-gray-500 cursor-help' />
										</label>
										<input
											type='text'
											name='adName'
											value={formData.adName}
											onChange={handleChange}
											className={`w-full p-3 bg-gray-800/90 border ${
												errors.adName
													? 'border-red-500/50'
													: 'border-slate-600/50'
											} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
											placeholder='Enter ad name'
										/>
										{errors.adName && (
											<p className='text-red-400 text-sm'>{errors.adName}</p>
										)}
									</div>

									{/* Team ID */}
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-300 flex items-center space-x-2'>
											<span>Team ID</span>
											<Info className='w-4 h-4 text-gray-500 cursor-help' />
										</label>
										<input
											type='text'
											name='teamId'
											value={formData.teamId}
											onChange={handleChange}
											className={`w-full p-3 bg-gray-800/90 border ${
												errors.teamId
													? 'border-red-500/50'
													: 'border-slate-600/50'
											} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
											placeholder='Enter team ID'
										/>
										{errors.teamId && (
											<p className='text-red-400 text-sm'>{errors.teamId}</p>
										)}
									</div>

									{/* Ad Type */}
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-300'>
											Ad Type
										</label>
										<select
											name='type'
											value={formData.type}
											onChange={handleChange}
											className='w-full p-3 bg-gray-800/90 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50'>
											<option value='' className='bg-gray-900'>
												Select Type
											</option>
											<option value='Image' className='bg-gray-900'>
												Image
											</option>
											<option value='Video' className='bg-gray-900'>
												Video
											</option>
											<option value='Audio' className='bg-gray-900'>
												Audio
											</option>
											<option value='Text' className='bg-gray-900'>
												Text
											</option>
										</select>
									</div>

									{/* Cost Per View */}
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-300 flex items-center space-x-2'>
											<span>Cost Per View</span>
											<Info className='w-4 h-4 text-gray-500 cursor-help' />
										</label>
										<div className='relative'>
											<DollarSign className='absolute left-3 top-3.5 w-4 h-4 text-gray-500' />
											<input
												type='text'
												name='costPerView'
												value={formData.costPerView}
												onChange={handleChange}
												className={`w-full p-3 pl-10 bg-gray-800/90 border ${
													errors.costPerView
														? 'border-red-500/50'
														: 'border-slate-600/50'
												} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
												placeholder='0.00'
											/>
										</div>
										{errors.costPerView && (
											<p className='text-red-400 text-sm'>
												{errors.costPerView}
											</p>
										)}
									</div>

									{/* Duration */}
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-300 flex items-center space-x-2'>
											<span>Duration (Days)</span>
											<Info className='w-4 h-4 text-gray-500 cursor-help' />
										</label>
										<div className='relative'>
											<Clock className='absolute left-3 top-3.5 w-4 h-4 text-gray-500' />
											<input
												type='number'
												name='numberOfDaysRunning'
												value={formData.numberOfDaysRunning}
												onChange={handleChange}
												className={`w-full p-3 pl-10 bg-gray-800/90 border ${
													errors.numberOfDaysRunning
														? 'border-red-500/50'
														: 'border-slate-600/50'
												} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
												placeholder='Enter duration'
											/>
										</div>
										{errors.numberOfDaysRunning && (
											<p className='text-red-400 text-sm'>
												{errors.numberOfDaysRunning}
											</p>
										)}
									</div>

									{/* File Upload */}
									{formData.type && formData.type !== 'Text' && (
										<div className='space-y-2 col-span-2'>
											<label className='text-sm font-medium text-gray-300'>
												Upload Media
											</label>
											<div
												className={`border-2 border-dashed ${
													errors.adResource
														? 'border-red-500/50'
														: 'border-slate-600/50'
												} rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors bg-gray-800/50`}>
												<input
													type='file'
													name='adResource'
													onChange={handleChange}
													className='hidden'
													id='file-upload'
												/>
												<label
													htmlFor='file-upload'
													className='cursor-pointer flex flex-col items-center'>
													<Upload className='w-8 h-8 text-gray-400 mb-2' />
													<span className='text-gray-300'>
														{formData.adResource
															? formData.adResource.name
															: 'Click to upload or drag and drop'}
													</span>
													<span className='text-gray-500 text-sm mt-1'>
														Supported formats: PNG, JPG, MP4, MP3
													</span>
												</label>
											</div>
											{errors.adResource && (
												<p className='text-red-400 text-sm'>
													{errors.adResource}
												</p>
											)}
										</div>
									)}

									{/* Description */}
									<div className='col-span-2 space-y-2'>
										<label className='text-sm font-medium text-gray-300'>
											Description
										</label>
										<textarea
											name='description'
											value={formData.description}
											onChange={handleChange}
											rows={4}
											className={`w-full p-3 bg-gray-800/90 border ${
												errors.description
													? 'border-red-500/50'
													: 'border-slate-600/50'
											} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none`}
											placeholder='Enter ad description'
										/>
										{errors.description && (
											<p className='text-red-400 text-sm'>
												{errors.description}
											</p>
										)}
									</div>
								</div>

								<DialogFooter className='flex justify-between items-center pt-6 border-t border-slate-700/50'>
									<button
										onClick={() => setShowDialog(false)}
										className='px-4 py-2 text-gray-400 hover:text-white transition-colors'>
										Cancel
									</button>
									<button
										onClick={handleCreateAd}
										disabled={isSubmitDisabled || isLoading}
										className='px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'>
										{isLoading ? (
											<>
												<Loader2 className='w-4 h-4 animate-spin' />
												<span>Creating...</span>
											</>
										) : (
											<>
												<Send className='w-4 h-4' />
												<span>Create Ad</span>
											</>
										)}
									</button>
								</DialogFooter>
							</motion.div>
						</DialogContent>
					</Dialog>
				)}
			</AnimatePresence>

			{/* Success Dialog */}
			<AnimatePresence>
				{showSuccessDialog && (
					<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
						<DialogContent className='max-w-md bg-gray-900/95 border border-slate-700/50 shadow-2xl rounded-xl backdrop-blur-sm'>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className='text-center p-6'>
								<div className='w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Check className='w-8 h-8 text-green-400' />
								</div>
								<h3 className='text-xl font-semibold text-white mb-2'>
									Advertisement Created!
								</h3>
								<p className='text-gray-400 mb-6'>
									Your advertisement has been successfully created and is now
									being processed.
								</p>
								<button
									onClick={() => setShowSuccessDialog(false)}
									className='px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300'>
									Continue
								</button>
							</motion.div>
						</DialogContent>
					</Dialog>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Create;
