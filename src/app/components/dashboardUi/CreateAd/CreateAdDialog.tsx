// // // // CreateAdDialog.tsx

import { motion, AnimatePresence } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog';
import { FormErrors } from './types';
import {
	Info,
	CloudUpload,
	CheckCircle,
	X,
	ArrowRight,
	ArrowLeft,
} from 'lucide-react';
import { useState, useRef } from 'react';

interface CreateAdDialogProps {
	formData: any;
	errors: FormErrors;
	userEmail?: string;
	handleChange: (
		e: React.ChangeEvent<any> | { target: { name: string; value: any } }
	) => void;
	handleCreateAd: () => void;
	setShowDialog: (show: boolean) => void;
	isSubmitDisabled: boolean;
	isSubmitting: boolean;
}

export const CreateAdDialog = ({
	formData,
	errors,
	userEmail,
	handleChange,
	handleCreateAd,
	setShowDialog,
	isSubmitDisabled,
	isSubmitting,
}: CreateAdDialogProps) => {
	const [dragActive, setDragActive] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 2;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		if (files && files[0]) {
			handleChange({
				target: {
					name,
					value: files[0],
				},
			});
		}
	};

	// Drag and drop event handlers
	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleChange({
				target: {
					name: 'adResource',
					value: e.dataTransfer.files[0],
				},
			});
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const goToNextStep = () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
		}
	};

	const goToPreviousStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	// Check if the current step form is valid
	const isStepOneValid = () => {
		return (
			formData.adName &&
			formData.teamId &&
			formData.description &&
			formData.type &&
			!errors.adName &&
			!errors.teamId &&
			!errors.description &&
			!errors.type
		);
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				staggerChildren: 0.1,
				ease: [0.16, 1, 0.3, 1],
			},
		},
		exit: {
			opacity: 0,
			x: -100,
			transition: { duration: 0.3 },
		},
	};

	const containerVariantsRight = {
		hidden: { opacity: 0, x: 100 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
				staggerChildren: 0.1,
				ease: [0.16, 1, 0.3, 1],
			},
		},
		exit: {
			opacity: 0,
			x: -100,
			transition: { duration: 0.3 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10, scale: 0.98 },
		visible: { opacity: 1, y: 0, scale: 1 },
	};

	return (
		<Dialog open={true} onOpenChange={setShowDialog}>
			<DialogContent className='max-w-2xl bg-gray-900/95 border border-slate-700/50 shadow-2xl rounded-xl backdrop-blur-sm'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='space-y-6 relative'>
					{/* Background gradient effect */}
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none' />

					<DialogHeader className='mb-6 space-y-2 relative'>
						<motion.div variants={itemVariants}>
							<DialogTitle className='text-2xl font-bold text-white flex items-center space-x-3'>
								Create Advertisement
								<div className='w-full h-px bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 mt-3' />
							</DialogTitle>
						</motion.div>
						<motion.div variants={itemVariants}>
							<DialogDescription className='text-gray-400'>
								Craft your campaign with precision using our professional
								advertising suite
							</DialogDescription>
						</motion.div>
					</DialogHeader>

					{/* Progress Bar */}
					<div className='mb-6'>
						<div className='flex justify-between items-center mb-2'>
							<span className='text-xs font-medium text-gray-400'>
								Step {currentStep} of {totalSteps}
							</span>
							<span className='text-xs font-medium text-gray-400'>
								{currentStep === 1 ? 'Campaign Details' : 'Media & Pricing'}
							</span>
						</div>
						<div className='w-full bg-slate-800 rounded-full h-2 overflow-hidden'>
							<motion.div
								className='bg-purple-600 h-full rounded-full'
								initial={{
									width: `${((currentStep - 1) / totalSteps) * 100}%`,
								}}
								animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
								transition={{ duration: 0.3 }}
							/>
						</div>
					</div>

					<AnimatePresence mode='wait'>
						{currentStep === 1 && (
							<motion.div
								key='step1'
								variants={containerVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								className='space-y-6'>
								{/* Form Grid */}
								<motion.div
									className='grid grid-cols-1 md:grid-cols-2 gap-4'
									variants={itemVariants}>
									{/* Ad Name Field */}
									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-1'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-1'>
												Ad Name
												<div className='text-gray-400 cursor-help ml-1'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.adName && (
												<span className='text-red-400 text-xs font-medium'>
													{errors.adName}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.adName ? 'border-red-500' : 'border-slate-700/50'} bg-slate-800/70 rounded-lg border overflow-hidden`}>
											<input
												name='adName'
												placeholder='Global Summer Campaign'
												value={formData.adName}
												onChange={handleChange}
												className='bg-transparent w-full p-3 text-white outline-none placeholder-gray-500 transition-all focus:ring-2 focus:ring-purple-500/30'
											/>
										</div>
									</div>

									{/* Team ID Field */}
									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-1'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-1'>
												Team ID
												<div className='text-gray-400 cursor-help ml-1'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.teamId && (
												<span className='text-red-400 text-xs font-medium'>
													{errors.teamId}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.teamId ? 'border-red-500' : 'border-slate-700/50'} bg-slate-800/70 rounded-lg border overflow-hidden`}>
											<input
												name='teamId'
												placeholder='Enter team identifier'
												value={formData.teamId}
												onChange={handleChange}
												className='bg-transparent w-full p-3 text-white outline-none placeholder-gray-500 transition-all focus:ring-2 focus:ring-purple-500/30'
											/>
										</div>
									</div>
								</motion.div>

								{/* Description field */}
								<motion.div variants={itemVariants} className='space-y-2'>
									<div className='flex items-center justify-between mb-1'>
										<label className='text-gray-300 text-sm font-medium flex items-center gap-1'>
											Campaign Narrative
											<div className='text-gray-400 cursor-help ml-1'>
												<Info className='w-4 h-4' />
											</div>
										</label>
										{errors.description && (
											<span className='text-red-400 text-xs font-medium'>
												{errors.description}
											</span>
										)}
									</div>
									<div
										className={`relative ${errors.description ? 'border-red-500' : 'border-slate-700/50'} bg-slate-800/70 rounded-lg border overflow-hidden`}>
										<textarea
											name='description'
											placeholder='Describe your campaign objectives and key messages...'
											value={formData.description}
											onChange={handleChange}
											rows={3}
											className='bg-transparent w-full p-3 text-white outline-none placeholder-gray-500 transition-all focus:ring-2 focus:ring-purple-500/30 resize-none'
										/>
									</div>
								</motion.div>

								{/* Creator Email Field */}
								{userEmail && (
									<motion.div variants={itemVariants} className='space-y-2'>
										<label className='text-gray-300 text-sm font-medium flex items-center gap-1'>
											Account Credentials
											<div className='text-gray-400 cursor-help ml-1'>
												<Info className='w-4 h-4' />
											</div>
										</label>
										<div className='relative bg-slate-800/70 rounded-lg border border-slate-700/50 p-3 flex justify-between items-center'>
											<span className='text-gray-400'>{userEmail}</span>
											<div className='text-green-400 text-xs font-medium flex items-center gap-1.5'>
												<CheckCircle className='w-4 h-4' />
												<span>Verified</span>
											</div>
										</div>
									</motion.div>
								)}

								{/* Ad Type Selector */}
								<motion.div variants={itemVariants} className='space-y-2'>
									<div className='space-y-1.5'>
										<div className='flex items-center justify-between mb-1'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-1'>
												Media Format
												<div className='text-gray-400 cursor-help ml-1'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.type && (
												<span className='text-red-400 text-xs font-medium'>
													{errors.type}
												</span>
											)}
										</div>

										<div
											className={`relative ${errors.type ? 'border-red-500' : 'border-slate-700/50'} bg-slate-800/70 rounded-lg border overflow-hidden`}>
											<select
												name='type'
												value={formData.type}
												onChange={handleChange}
												className='w-full p-3 bg-transparent text-white appearance-none outline-none transition-all focus:ring-2 focus:ring-purple-500/30'>
												<option value='' disabled className='bg-gray-900'>
													Select Media Type
												</option>
												<option value='Poster' className='bg-gray-900'>
													Poster
												</option>
												<option value='Audio File' className='bg-gray-900'>
													Audio File
												</option>
												<option value='Video' className='bg-gray-900'>
													Video
												</option>
												<option value='Text' className='bg-gray-900'>
													Text
												</option>
											</select>
											<div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='16'
													height='16'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													className='text-gray-400'>
													<polyline points='6 9 12 15 18 9'></polyline>
												</svg>
											</div>
										</div>
									</div>
								</motion.div>

								{/* Step Navigation */}
								<motion.div variants={itemVariants}>
									<DialogFooter className='mt-6 flex justify-between gap-3'>
										<motion.button
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => setShowDialog(false)}
											className='px-5 py-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors flex items-center gap-2 font-medium border border-slate-700/50'>
											<X className='w-4 h-4 text-gray-400' />
											<span>Cancel</span>
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
											onClick={goToNextStep}
											disabled={!isStepOneValid()}
											className='px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg'>
											<span>Next Step</span>
											<ArrowRight className='w-4 h-4 text-white' />
										</motion.button>
									</DialogFooter>
								</motion.div>
							</motion.div>
						)}

						{currentStep === 2 && (
							<motion.div
								key='step2'
								variants={containerVariantsRight}
								initial='hidden'
								animate='visible'
								exit='exit'
								className='space-y-6'>
								{/* File Upload Section */}
								{formData.type && formData.type !== 'Text' && (
									<motion.div
										variants={itemVariants}
										className={`border-2 border-dashed ${
											dragActive
												? 'border-purple-500 bg-purple-900/20'
												: 'border-slate-700/50 bg-slate-800/50 hover:border-purple-500/50'
										} rounded-lg transition-colors group overflow-hidden`}
										whileHover={{ scale: 1.005 }}
										onDragEnter={handleDrag}
										onDragLeave={handleDrag}
										onDragOver={handleDrag}
										onDrop={handleDrop}>
										<div className='p-4 space-y-3'>
											<div className='flex items-center justify-between'>
												<label className='text-gray-300 text-sm font-medium'>
													Media Asset
												</label>
												{errors.adResource && (
													<span className='text-red-400 text-xs font-medium'>
														{errors.adResource}
													</span>
												)}
											</div>
											<div
												className='flex flex-col items-center justify-center py-6 rounded-lg cursor-pointer relative'
												onClick={handleButtonClick}>
												<motion.div
													whileHover={{ scale: 1.05 }}
													className={`p-3 ${
														dragActive
															? 'bg-purple-800/70 border-purple-600'
															: 'bg-slate-700/70 border-slate-600 group-hover:border-purple-400'
													} rounded-full mb-3 border transition-colors`}>
													<CloudUpload
														className={`w-6 h-6 ${
															dragActive
																? 'text-purple-400'
																: 'text-gray-300 group-hover:text-purple-400'
														} transition-colors`}
													/>
												</motion.div>
												<p className='text-gray-400 text-center text-sm mb-2'>
													{formData.adResource
														? 'Asset ready for upload'
														: 'Drag & drop or browse files'}
												</p>
												<div className='text-white text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-lg transition-all transform hover:scale-105'>
													{formData.adResource ? 'Change File' : 'Select Asset'}
												</div>
												{formData.adResource && (
													<p className='text-purple-400 text-xs mt-3 flex items-center gap-1'>
														<CheckCircle className='w-4 h-4' />
														Selected: {formData.adResource.name}
													</p>
												)}
											</div>
											<input
												type='file'
												name='adResource'
												onChange={handleFileChange}
												className='hidden'
												id='file-upload'
												ref={fileInputRef}
											/>
										</div>
									</motion.div>
								)}

								{/* Pricing & Duration */}
								<motion.div
									className='grid grid-cols-1 md:grid-cols-2 gap-4'
									variants={itemVariants}>
									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-1'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-1'>
												Engagement Cost
												<div className='text-gray-400 cursor-help ml-1'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.costPerView && (
												<span className='text-red-400 text-xs font-medium'>
													{errors.costPerView}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.costPerView ? 'border-red-500' : 'border-slate-700/50'} bg-slate-800/70 rounded-lg border overflow-hidden flex items-center`}>
											<span className='text-gray-400 ml-3'>$</span>
											<input
												name='costPerView'
												placeholder='0.00'
												value={formData.costPerView}
												onChange={handleChange}
												className='bg-transparent w-full p-3 text-white outline-none placeholder-gray-500 transition-all focus:ring-2 focus:ring-purple-500/30'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-1'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-1'>
												Campaign Lifespan
												<div className='text-gray-400 cursor-help ml-1'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.numberOfDaysRunning && (
												<span className='text-red-400 text-xs font-medium'>
													{errors.numberOfDaysRunning}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.numberOfDaysRunning ? 'border-red-500' : 'border-slate-700/50'} bg-slate-800/70 rounded-lg border overflow-hidden flex items-center`}>
											<input
												name='numberOfDaysRunning'
												placeholder='30'
												value={formData.numberOfDaysRunning}
												onChange={handleChange}
												className='bg-transparent w-full p-3 text-white outline-none placeholder-gray-500 transition-all focus:ring-2 focus:ring-purple-500/30'
											/>
											<span className='text-gray-400 mr-3'>days</span>
										</div>
									</div>
								</motion.div>

								{/* Footer Buttons */}
								<motion.div variants={itemVariants}>
									<DialogFooter className='mt-6 flex justify-between gap-3'>
										<motion.button
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
											onClick={goToPreviousStep}
											className='px-5 py-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors flex items-center gap-2 font-medium border border-slate-700/50'>
											<ArrowLeft className='w-4 h-4 text-gray-400' />
											<span>Previous</span>
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
											disabled={isSubmitDisabled || isSubmitting}
											onClick={handleCreateAd}
											className='px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg relative'>
											{isSubmitting ? (
												<>
													<div className='animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2'></div>
													<span>Processing...</span>
												</>
											) : (
												<>
													<CheckCircle className='w-4 h-4 text-white' />
													<span>Launch Campaign</span>
												</>
											)}
										</motion.button>
									</DialogFooter>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
};
