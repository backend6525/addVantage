import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/DialogPopup/dialog';
import { FiFilePlus, FiAlertCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import { useToast } from '@/app/components/ui/toast/use-toast';

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

function Create({ onCreateAd = () => {}, isMenuOpen }: any) {
	const { toast } = useToast();
	const [formData, setFormData] = useState({
		adName: '',
		teamId: '',
		createdBy: '',
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
		createdBy: '',
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

	const validateEmail = useCallback((email: string) => {
		if (!email) return 'Email is required';
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) return 'Invalid email format';
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
				case 'createdBy':
					return validateEmail(value as string);
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
			validateEmail,
			validateCostPerView,
			validateDays,
			validateAdResource,
			validateAdDescription,
		]
	);

	// const handleChange = useCallback(
	// 	(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	// 		const { name, value } = e.target;
	// 		const files = (e.target as HTMLInputElement).files;

	// 		const newFormData = {
	// 			...formData,
	// 			[name]: files ? files[0] : value,
	// 		};
	// 		setFormData(newFormData);

	// 		const error = validateField(name, files ? files[0] : value);

	// 		setErrors((prev) => ({
	// 			...prev,
	// 			[name]: error,
	// 		}));
	// 	},
	// 	[formData, validateField]
	// );

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
		const newErrors = {
			adName: validateAdName(formData.adName),
			teamId: validateTeamId(formData.teamId),
			createdBy: validateEmail(formData.createdBy),
			costPerView: validateCostPerView(formData.costPerView),
			numberOfDaysRunning: validateDays(formData.numberOfDaysRunning),
			adResource: validateAdResource(formData.type, formData.adResource),
			description: validateAdDescription(formData.description),
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => error === '');
	}, [
		formData.adName,
		formData.teamId,
		formData.createdBy,
		formData.type,
		formData.costPerView,
		formData.numberOfDaysRunning,
		formData.adResource,
		formData.description,
		validateAdName,
		validateTeamId,
		validateEmail,
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
			if (!isFormValid) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Please fill in the required fields.',
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
				createdBy: formData.createdBy,
				type: formData.type,
				costPerView: formData.costPerView,
				numberOfDaysRunning: formData.numberOfDaysRunning,
				adResourceUrl: fileUrl || '',
				description: formData.description,
			};

			const res = await fetch('/api/createAd', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			const result = await res.json();

			if (res.ok) {
				toast({
					variant: 'default',
					title: 'Ad created successfully!',
					description: 'Your ad has been created and is ready to go.',
				});
				setShowDialog(false);
				setShowSuccessDialog(true);
				onCreateAd();
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
	}, [isFormValid, formData, uploadFileToS3, onCreateAd]);

	return (
		<div className=' '>
			<div className='container mx-auto px-4 py-2'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className={`
						flex items-center p-0.7 rounded-lg hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group
						${!isMenuOpen ? 'justify-center w-full' : ''}
					`}
					onClick={() => setShowDialog(true)}>
					<div className='bg-blue-500/20 p-2.5 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300'>
						<FiFilePlus
							size={24}
							className='text-blue-400 group-hover:text-blue-300'
						/>
					</div>
					{isMenuOpen && (
						<span className='ml-3 text-gray-300 font-medium group-hover:text-blue-300 transition-colors duration-300'>
							Create Ad
						</span>
					)}
				</motion.div>

				<Dialog open={showDialog} onOpenChange={setShowDialog}>
					<DialogContent className='bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl max-w-2xl p-8 border border-gray-700 shadow-2xl'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}>
							<DialogHeader>
								<DialogTitle className='text-2xl font-bold text-blue-400'>
									Create Ad
								</DialogTitle>
								<DialogDescription className='text-gray-400'>
									Fill in the details carefully to create your ad.
								</DialogDescription>
							</DialogHeader>

							<div className='space-y-6 mt-6'>
								<div>
									<label className='text-gray-400 text-sm mb-2 block'>
										Ad Name
									</label>
									<input
										name='adName'
										placeholder='Enter ad name'
										onChange={handleChange}
										className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'
									/>
									{errors.adName && (
										<p className='text-red-400 text-sm mt-1'>{errors.adName}</p>
									)}
								</div>
								<div>
									<label className='text-gray-400 text-sm mb-2 block'>
										Description
									</label>
									<textarea
										name='description'
										placeholder='Enter ad description'
										onChange={handleChange}
										className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'
										rows={4}
									/>
									{errors.description && (
										<p className='text-red-400 text-sm mt-1'>
											{errors.description}
										</p>
									)}
								</div>

								<div>
									<label className='text-gray-400 text-sm mb-2 block'>
										Team ID
									</label>
									<input
										name='teamId'
										placeholder='Enter team ID'
										onChange={handleChange}
										className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'
									/>
									{errors.teamId && (
										<p className='text-red-400 text-sm mt-1'>{errors.teamId}</p>
									)}
								</div>

								<div>
									<label className='text-gray-400 text-sm mb-2 block'>
										Creator Email
									</label>
									<input
										name='createdBy'
										placeholder='johndoe@gmail.com'
										onChange={handleChange}
										className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'
									/>
									{errors.createdBy && (
										<p className='text-red-400 text-sm mt-1'>
											{errors.createdBy}
										</p>
									)}
								</div>

								<div>
									<label className='text-gray-400 text-sm mb-2 block'>
										Ad Type
									</label>
									<select
										name='type'
										onChange={handleChange}
										className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'>
										<option value=''>Select Type</option>
										<option value='Poster'>Poster</option>
										<option value='Audio File'>Audio File</option>
										<option value='Video'>Video</option>
										<option value='Text'>Text</option>
									</select>
								</div>

								{formData.type && formData.type !== 'Text' && (
									<div>
										<label className='text-gray-400 text-sm mb-2 block'>
											Ad Resource
										</label>
										<input
											type='file'
											name='adResource'
											onChange={handleChange}
											className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'
										/>
									</div>
								)}

								<div className='grid md:grid-cols-2 gap-4'>
									<div>
										<label className='text-gray-400 text-sm mb-2 block'>
											Cost Per View
										</label>
										<input
											name='costPerView'
											placeholder='Optional'
											onChange={handleChange}
											className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'
										/>
									</div>
									<div>
										<label className='text-gray-400 text-sm mb-2 block'>
											Days Running
										</label>
										<input
											name='numberOfDaysRunning'
											placeholder='Optional'
											onChange={handleChange}
											className='w-full bg-gray-700/50 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500'
										/>
									</div>
								</div>
							</div>

							<DialogFooter className='mt-8 flex justify-end space-x-4'>
								<button
									onClick={() => setShowDialog(false)}
									className='bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600'>
									Cancel
								</button>
								<button
									disabled={!isFormValid}
									onClick={handleCreateAd}
									className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'>
									Create Ad
								</button>
							</DialogFooter>
						</motion.div>
					</DialogContent>
				</Dialog>
				{/* 
				<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
					<DialogContent className='bg-gradient-to-br from-green-600 to-green-800 text-white rounded-2xl max-w-md p-8'>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}>
							<div className='text-center'>
								<FiAlertCircle size={64} className='mx-auto mb */}

				<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
					<DialogContent className='bg-gradient-to-br from-green-600 to-green-800 text-white rounded-2xl max-w-md p-8'>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}>
							<div className='text-center'>
								<FiAlertCircle size={64} className='mx-auto mb-4 text-white' />
								<DialogTitle className='text-2xl font-bold mb-2'>
									Ad Created Successfully!
								</DialogTitle>
								<DialogDescription className='text-white/80'>
									Your ad has been created and is ready to go.
								</DialogDescription>
								<div className='mt-6'>
									<button
										onClick={() => setShowSuccessDialog(false)}
										className='bg-white text-green-700 px-6 py-2 rounded-lg hover:bg-gray-100'>
										Close
									</button>
								</div>
							</div>
						</motion.div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default Create;
