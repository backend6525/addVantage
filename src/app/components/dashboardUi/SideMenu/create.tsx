import React, { useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/DialogPopup/dialog';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiFilePlus } from 'react-icons/fi';

type CreateAdPayload = {
	adName: string;
	teamId: string;
	createdBy: string;
	type: string;
	costPerView: string;
	numberOfDaysRunning: string;
	adResourceUrl: string | null;
};

function Create({ onCreateAd = () => {}, isMenuOpen }: any) {
	const [formData, setFormData] = useState({
		adName: '',
		teamId: '',
		createdBy: '',
		type: '',
		costPerView: '',
		numberOfDaysRunning: '',
		adResourceUrl: '',
		adResource: null as File | null,
	});
	const [showDialog, setShowDialog] = useState(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);

	// Handle form input changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const files = (e.target as HTMLInputElement).files;
		setFormData((prevData) => ({
			...prevData,
			[name]: files ? files[0] : value, // Store file if uploaded
		}));
		console.log('Updated form data:', formData);
	};

	// Form validation
	const isFormValid = () => {
		return formData.adName && formData.teamId && formData.createdBy;
	};

	// Upload file to S3
	const uploadFileToS3 = async (file: File): Promise<string> => {
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

		console.log('Prepared payload for S3:', {
			fileName,
			fileType,
			fileContent: base64Content,
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
			console.log('File uploaded to S3. Received data:', data);
			return data.cloudFrontUrl;
		} catch (error) {
			console.error('Error uploading file to S3:', error);
			throw error;
		}
	};

	const handleCreateAd = async () => {
		try {
			if (!isFormValid()) {
				toast.error('Please fill in the required fields.');
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
			};

			console.log('Final payload to be sent:', payload);

			const res = await fetch('/api/createAd', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			const result = await res.json();

			if (res.ok) {
				toast.success('Ad created successfully!');
				setShowDialog(false); // Close the form dialog
				setShowSuccessDialog(true); // Open the success dialog
				onCreateAd();
			} else {
				toast.error(result.error || 'Ad creation failed. Please try again.');
			}
		} catch (error) {
			console.error('Error creating ad:', error);
			toast.error('Ad creation failed. Please try again.');
		}
	};

	return (
		<>
			{/* Dialog trigger and dialog content */}
			<div
				onClick={() => setShowDialog(true)}
				className='text-white pl-2 py-2 rounded w-full flex items-center cursor-pointer'>
				<FiFilePlus size={25} />
				{isMenuOpen && <span className='ml-3 text-white'>Create Ad</span>}
			</div>

			<Dialog open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent className='p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
					<DialogHeader>
						<DialogTitle className='text-xl font-bold'>Create Ad</DialogTitle>
						<DialogDescription>
							Fill in the details below to create your ad.
						</DialogDescription>
					</DialogHeader>

					<div className='space-y-6'>
						<Input
							name='adName'
							placeholder='Ad Name'
							onChange={handleChange}
							className='w-full p-2 border rounded bg-black text-white'
						/>
						<Input
							name='teamId'
							placeholder='Team ID'
							onChange={handleChange}
							className='w-full p-2 border rounded bg-black text-white'
						/>
						<Input
							name='createdBy'
							placeholder='Created By'
							onChange={handleChange}
							className='w-full p-2 border rounded bg-black text-white'
						/>
						<select
							name='type'
							onChange={handleChange}
							className='w-full p-2 border rounded bg-black text-white'>
							<option value=''>Select Type (optional)</option>
							<option value='Poster'>Poster</option>
							<option value='Audio File'>Audio File</option>
							<option value='Video'>Video</option>
							<option value='Text'>Text</option>
						</select>
						{formData.type && formData.type !== 'Text' && (
							<Input
								type='file'
								name='adResource'
								onChange={handleChange}
								className='w-full p-2 border rounded bg-black text-white'
							/>
						)}
						<Input
							name='costPerView'
							placeholder='Cost Per View (optional)'
							onChange={handleChange}
							className='w-full p-2 border rounded bg-black text-white'
						/>
						<Input
							name='numberOfDaysRunning'
							placeholder='Number of Days Running (optional)'
							onChange={handleChange}
							className='w-full p-2 border rounded bg-black text-white'
						/>
					</div>

					<DialogFooter className='mt-6 sm:justify-end'>
						<DialogClose asChild>
							<Button
								type='button'
								disabled={!isFormValid()}
								onClick={handleCreateAd}
								className='bg-violet-600 text-white px-4 py-2 rounded'>
								Create Ad
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Success dialog */}
			<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
				<DialogContent className='p-8 bg-green-600 text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
					<DialogHeader>
						<DialogTitle className='text-xl font-bold'>Success!</DialogTitle>
						<DialogDescription>
							Your ad has been created successfully.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className='mt-6 sm:justify-end'>
						<DialogClose asChild>
							<Button
								type='button'
								className='bg-white text-green-600 px-4 py-2 rounded'
								onClick={() => setShowSuccessDialog(false)}>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<ToastContainer />
		</>
	);
}

export default Create;
