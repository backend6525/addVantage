import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilePlus } from 'react-icons/fi';
import { useToast } from '@/app/components/ui/toast/use-toast';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { CreateAdDialog } from './CreateAdDialog';
import { SuccessDialog } from './SuccessDialog';
import { useUserData } from './useUserData';
import {
	validateAdName,
	validateTeamId,
	validateCostPerView,
	validateDays,
	validateAdResource,
	validateAdDescription,
} from './validators';
import { uploadFileToS3 } from './apiService';
import { FormErrors, CreateAdPayload } from './types';
import { Dialog } from '@radix-ui/react-dialog';

interface CreateProps {
	onCreateAd: (limits: { dailyCount: number; weeklyCount: number }) => void;
	isMenuOpen: boolean;
	dailyAdCount: number;
	weeklyAdCount: number;
	hasCredits: boolean;
	userEmail: string;
}

export const Create = ({
	onCreateAd,
	isMenuOpen,
	dailyAdCount,
	weeklyAdCount,
	hasCredits,
	userEmail,
}: CreateProps) => {
	// Initialize toast
	const { toast } = useToast();

	// Initialize Convex mutations
	const checkAndResetLimit = useMutation(api.ads.checkAndResetLimits);
	const incrementAdCount = useMutation(api.ads.incrementAdCounts);

	// State initialization
	const [userLimits, setUserLimits] = useState<{
		dailyCount: number;
		weeklyCount: number;
		hasCredits?: boolean;
	}>({
		dailyCount: dailyAdCount,
		weeklyCount: weeklyAdCount,
		hasCredits: hasCredits,
	});

	const [isLoading, setIsLoading] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [hasCreatedAd, setHasCreatedAd] = useState(false);

	// Custom hooks
	const { userData, fetchUserData } = useUserData();

	// Fetch user data on mount
	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	// Update userLimits when props change
	useEffect(() => {
		setUserLimits({
			dailyCount: dailyAdCount,
			weeklyCount: weeklyAdCount,
			hasCredits: hasCredits,
		});
	}, [dailyAdCount, weeklyAdCount, hasCredits]);

	// Reset success dialog state when component mounts
	useEffect(() => {
		setShowSuccessDialog(false);
		setHasCreatedAd(false);
	}, []);

	// Form state management
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

	const [errors, setErrors] = useState<FormErrors>({
		type: '',
		adName: '',
		teamId: '',
		costPerView: '',
		numberOfDaysRunning: '',
		adResource: '',
		description: '',
	});

	// Form validation
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
		[formData.type, formData.adResource]
	);

	// Form change handler
	const handleChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			const { name, value } = e.target;
			const files = (e.target as HTMLInputElement).files;

			setFormData((prev) => ({
				...prev,
				[name]: files ? files[0] : value,
			}));

			setErrors((prev) => ({
				...prev,
				[name]: validateField(name, files ? files[0] : value),
			}));
		},
		[validateField]
	);

	// Form validation check
	const isFormValid = useMemo(() => {
		if (!showDialog) return false;

		const newErrors = {
			adName: validateAdName(formData.adName),
			teamId: validateTeamId(formData.teamId),
			costPerView: validateCostPerView(formData.costPerView),
			numberOfDaysRunning: validateDays(formData.numberOfDaysRunning),
			adResource: validateAdResource(formData.type, formData.adResource),
			description: validateAdDescription(formData.description),
			// type: validateAdDescription(formData.type),
			type: formData.type ? '' : 'Please select a media format',
		};

		setErrors(newErrors);
		return Object.values(newErrors).every((error) => error === '');
	}, [
		showDialog,
		formData.adName,
		formData.teamId,
		formData.costPerView,
		formData.numberOfDaysRunning,
		formData.type,
		formData.adResource,
		formData.description,
	]);

	// Submit logic
	const handleCreateAd = useCallback(async () => {
		try {
			if (!userEmail) {
				toast({
					title: 'Authentication Error',
					description: 'You must be logged in to create an ad.',
					variant: 'destructive',
				});
				return;
			}

			// Check limits using our local state that mirrors the database
			if (userLimits.dailyCount >= 1) {
				toast({
					title: 'Daily Limit Reached',
					description:
						'You can only create one ad per day. Try again tomorrow.',
					variant: 'destructive',
				});
				return;
			}

			if (userLimits.weeklyCount >= 5) {
				toast({
					title: 'Weekly Limit Reached',
					description: "You've reached your weekly limit of 5 ads.",
					variant: 'destructive',
				});
				return;
			}

			// Validate form data
			const newErrors = {
				adName: validateAdName(formData.adName),
				teamId: validateTeamId(formData.teamId),
				costPerView: validateCostPerView(formData.costPerView),
				numberOfDaysRunning: validateDays(formData.numberOfDaysRunning),
				adResource: validateAdResource(formData.type, formData.adResource),
				description: validateAdDescription(formData.description),
				type: formData.type ? '' : 'Please select a media format',
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
				createdBy: userEmail,
				type: formData.type,
				costPerView: formData.costPerView,
				numberOfDaysRunning: formData.numberOfDaysRunning,
				adResourceUrl: fileUrl || '',
				description: formData.description,
			};

			// Create the ad
			const res = await fetch('/api/createAd', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				throw new Error('Failed to create ad');
			}

			// Increment the ad counts
			try {
				console.log(`Incrementing ad counts for user: ${userEmail}`);
				const updatedLimits = await incrementAdCount({
					userId: userEmail,
				});

				console.log(`Updated limits for user ${userEmail}:`, updatedLimits);

				// Update local state with the new values
				setUserLimits({
					dailyCount: userLimits.dailyCount + 1,
					weeklyCount: userLimits.weeklyCount + 1,
					hasCredits: userLimits.hasCredits,
				});

				// Update parent component
				onCreateAd({ dailyCount: 1, weeklyCount: 1 });

				// Dispatch custom event to trigger dashboard refresh
				const adCreatedEvent = new CustomEvent('adCreated', {
					detail: { adId: res.headers.get('x-ad-id') },
				});
				window.dispatchEvent(adCreatedEvent);

				// Show success message
				toast({
					variant: 'default',
					title: 'Ad created successfully!',
					description: 'Your ad has been created and is ready to go.',
				});

				// Close the dialog and show success dialog
				setShowDialog(false);
				setHasCreatedAd(true);
				setShowSuccessDialog(true);
			} catch (error) {
				console.error(
					`Error incrementing ad counts for user ${userEmail}:`,
					error
				);
				if (error instanceof Error) {
					toast({
						variant: 'destructive',
						title: 'Limit Error',
						description: error.message,
					});
				} else {
					toast({
						variant: 'destructive',
						title: 'Error',
						description: 'Failed to update ad limits',
					});
				}
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
		userEmail,
		userLimits,
		incrementAdCount,
		onCreateAd,
		toast,
		validateAdName,
		validateTeamId,
		validateCostPerView,
		validateDays,
		validateAdResource,
		validateAdDescription,
		uploadFileToS3,
	]);

	// Handler for closing success dialog
	const handleCloseSuccessDialog = useCallback(() => {
		setShowSuccessDialog(false);
		setHasCreatedAd(false); // Reset the ad creation flag
	}, []);

	// Derived state
	const isInitialClickDisabled =
		isLoading || userLimits.dailyCount >= 1 || userLimits.weeklyCount >= 5;

	const isSubmitDisabled = isInitialClickDisabled || !isFormValid;
	const isAuthenticated = !!userData;

	return (
		<div className='relative'>
			<div className='container mx-auto pl-0.5 ml-1 pb-1'>
				<button
					onClick={() => setShowDialog(true)}
					disabled={isLoading}
					className={`w-full flex items-center justify-center p-3 rounded-xl bg-slate-800/70 border border-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 ${
						!isMenuOpen ? 'px-2' : 'px-4'
					}`}>
					{isLoading ? (
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
							className='w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full'
						/>
					) : (
						<>
							<FiFilePlus size={20} />
							{isMenuOpen && (
								<span className='ml-2 text-sm font-medium'>Create Ad</span>
							)}
						</>
					)}
				</button>

				{showDialog && (
					<CreateAdDialog
						formData={formData}
						errors={errors}
						userEmail={userEmail}
						handleChange={handleChange}
						handleCreateAd={handleCreateAd}
						setShowDialog={setShowDialog}
						isSubmitDisabled={!isFormValid}
						isSubmitting={isLoading}
					/>
				)}

				{showSuccessDialog && (
					<SuccessDialog
						onClose={handleCloseSuccessDialog}
						className='bg-slate-800/90 border border-slate-700/50 text-white'
					/>
				)}
			</div>
		</div>
	);
};
