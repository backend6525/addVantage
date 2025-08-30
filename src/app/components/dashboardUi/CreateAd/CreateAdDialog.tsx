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
	Play,
	Clock,
	FileVideo,
	Image,
	Volume2,
	Type,
	AlertTriangle,
	Mail,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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
	const [videoDuration, setVideoDuration] = useState<number | null>(null);
	const [showEnterpriseContact, setShowEnterpriseContact] = useState(false);
	const totalSteps = 2;
	const fileInputRef = useRef<HTMLInputElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	// Video duration validation
	useEffect(() => {
		if (
			formData.adResource &&
			formData.type === 'Video' &&
			formData.adResource.type?.startsWith('video/')
		) {
			const video = document.createElement('video');
			video.preload = 'metadata';
			video.onloadedmetadata = () => {
				setVideoDuration(video.duration);
				if (video.duration > 60) {
					setShowEnterpriseContact(true);
				} else {
					setShowEnterpriseContact(false);
				}
			};
			video.src = URL.createObjectURL(formData.adResource);
		} else {
			setVideoDuration(null);
			setShowEnterpriseContact(false);
		}
	}, [formData.adResource, formData.type]);

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

	// Get media type icon and info
	const getMediaTypeInfo = () => {
		switch (formData.type) {
			case 'Video':
				return {
					icon: <FileVideo className='w-5 h-5' />,
					color: 'text-blue-400',
					bgColor: 'bg-blue-500/20',
					borderColor: 'border-blue-500/30',
					description: 'Video advertisements with up to 1-minute duration',
				};
			case 'Poster':
				return {
					icon: <Image className='w-5 h-5' />,
					color: 'text-green-400',
					bgColor: 'bg-green-500/20',
					borderColor: 'border-green-500/30',
					description: 'Static image advertisements in various formats',
				};
			case 'Audio File':
				return {
					icon: <Volume2 className='w-5 h-5' />,
					color: 'text-orange-400',
					bgColor: 'bg-orange-500/20',
					borderColor: 'border-orange-500/30',
					description: 'Audio advertisements and voice campaigns',
				};
			case 'Text':
				return {
					icon: <Type className='w-5 h-5' />,
					color: 'text-purple-400',
					bgColor: 'bg-purple-500/20',
					borderColor: 'border-purple-500/30',
					description: 'Text-based advertisements and announcements',
				};
			default:
				return {
					icon: <CloudUpload className='w-5 h-5' />,
					color: 'text-gray-400',
					bgColor: 'bg-gray-500/10',
					borderColor: 'border-gray-500/20',
					description: 'Select a media type to continue',
				};
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const formatDuration = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
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

	const mediaTypeInfo = getMediaTypeInfo();

	return (
		<Dialog open={true} onOpenChange={setShowDialog}>
			<DialogContent className='max-w-2xl bg-gray-900/95 border border-slate-700/50 shadow-2xl rounded-xl backdrop-blur-sm overflow-hidden'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='space-y-6 relative'>
					{/* Background gradient effect */}
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none' />

					<DialogHeader className='mb-6 space-y-3 relative bg-gradient-to-b from-slate-800/50 to-transparent pb-4 rounded-t-xl px-6 pt-6'>
						<motion.div variants={itemVariants}>
							<DialogTitle className='text-2xl font-bold text-white flex items-center justify-between'>
								<span>Create Advertisement</span>
								{formData.type && (
									<div
										className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${mediaTypeInfo.bgColor} ${mediaTypeInfo.borderColor} border shadow-sm`}>
										<span className={mediaTypeInfo.color}>
											{mediaTypeInfo.icon}
										</span>
										<span
											className={`text-sm font-medium ${mediaTypeInfo.color}`}>
											{formData.type}
										</span>
									</div>
								)}
							</DialogTitle>
							<div className='w-full h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mt-4' />
						</motion.div>
						<motion.div variants={itemVariants}>
							<DialogDescription className='text-gray-400 text-sm leading-relaxed'>
								{formData.type
									? mediaTypeInfo.description
									: 'Craft your campaign with precision using our professional advertising suite'}
							</DialogDescription>
						</motion.div>
					</DialogHeader>

					{/* Progress Bar */}
					<motion.div variants={itemVariants} className='mb-6 px-6'>
						<div className='flex justify-between items-center mb-3'>
							<span className='text-xs font-medium text-gray-400'>
								Step {currentStep} of {totalSteps}
							</span>
							<span className='text-xs font-medium text-gray-400'>
								{currentStep === 1 ? 'Campaign Details' : 'Media & Pricing'}
							</span>
						</div>
						<div className='w-full bg-slate-800/70 rounded-full h-2.5 overflow-hidden border border-slate-700/30 shadow-inner'>
							<motion.div
								className='bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 h-full rounded-full shadow-lg'
								initial={{
									width: `${((currentStep - 1) / totalSteps) * 100}%`,
								}}
								animate={{
									width: `${(currentStep / totalSteps) * 100}%`,
									backgroundPosition: ['0% 50%', '100% 50%'],
								}}
								transition={{
									width: { duration: 0.4, ease: 'easeInOut' },
									backgroundPosition: {
										duration: 2,
										repeat: Infinity,
										ease: 'linear',
									},
								}}
							/>
						</div>
					</motion.div>

					<AnimatePresence mode='wait'>
						{currentStep === 1 && (
							<motion.div
								key='step1'
								variants={containerVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								className='space-y-6 px-6 pb-6'>
								{/* Form Grid */}
								<motion.div
									className='grid grid-cols-1 md:grid-cols-2 gap-5'
									variants={itemVariants}>
									{/* Ad Name Field */}
									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-2'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
												Ad Name
												<div
													className='text-gray-500 cursor-help'
													title='Choose a memorable name for your campaign'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.adName && (
												<span className='text-red-400/90 text-xs font-medium flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded'>
													<AlertTriangle className='w-3 h-3' />
													{errors.adName}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.adName ? 'border-red-400 shadow-red-500/10' : 'border-slate-700/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30'} bg-slate-800/70 rounded-lg border transition-all duration-200 focus-within:shadow-lg`}>
											<input
												name='adName'
												placeholder='Global Summer Campaign'
												value={formData.adName}
												onChange={handleChange}
												className='bg-transparent w-full p-3.5 text-white outline-none placeholder-gray-500 transition-all'
											/>
										</div>
									</div>

									{/* Team ID Field */}
									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-2'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
												Team ID
												<div
													className='text-gray-500 cursor-help'
													title='Your team or organization identifier'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.teamId && (
												<span className='text-red-400/90 text-xs font-medium flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded'>
													<AlertTriangle className='w-3 h-3' />
													{errors.teamId}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.teamId ? 'border-red-400 shadow-red-500/10' : 'border-slate-700/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30'} bg-slate-800/70 rounded-lg border transition-all duration-200 focus-within:shadow-lg`}>
											<input
												name='teamId'
												placeholder='Enter team identifier'
												value={formData.teamId}
												onChange={handleChange}
												className='bg-transparent w-full p-3.5 text-white outline-none placeholder-gray-500 transition-all'
											/>
										</div>
									</div>
								</motion.div>

								{/* Description field */}
								<motion.div variants={itemVariants} className='space-y-2'>
									<div className='flex items-center justify-between mb-2'>
										<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
											Campaign Narrative
											<div
												className='text-gray-500 cursor-help'
												title='Describe your campaign objectives and target audience'>
												<Info className='w-4 h-4' />
											</div>
										</label>
										{errors.description && (
											<span className='text-red-400/90 text-xs font-medium flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded'>
												<AlertTriangle className='w-3 h-3' />
												{errors.description}
											</span>
										)}
									</div>
									<div
										className={`relative ${errors.description ? 'border-red-400 shadow-red-500/10' : 'border-slate-700/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30'} bg-slate-800/70 rounded-lg border transition-all duration-200 focus-within:shadow-lg`}>
										<textarea
											name='description'
											placeholder='Describe your campaign objectives, target audience, and key messages...'
											value={formData.description}
											onChange={handleChange}
											rows={4}
											className='bg-transparent w-full p-3.5 text-white outline-none placeholder-gray-500 transition-all resize-none'
										/>
									</div>
								</motion.div>

								{/* Creator Email Field */}
								{userEmail && (
									<motion.div variants={itemVariants} className='space-y-2'>
										<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
											Account Credentials
											<div
												className='text-gray-500 cursor-help'
												title='Your verified account email'>
												<Info className='w-4 h-4' />
											</div>
										</label>
										<div className='relative bg-slate-800/70 rounded-lg border border-slate-700/50 p-4 flex justify-between items-center'>
											<span className='text-gray-300 font-medium'>
												{userEmail}
											</span>
											<div className='text-green-400 text-xs font-medium flex items-center gap-1.5 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20'>
												<CheckCircle className='w-4 h-4' />
												<span>Verified</span>
											</div>
										</div>
									</motion.div>
								)}

								{/* Ad Type Selector */}
								<motion.div variants={itemVariants} className='space-y-2'>
									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-2'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
												Media Format
												<div
													className='text-gray-500 cursor-help'
													title='Choose the type of media for your advertisement'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.type && (
												<span className='text-red-400/90 text-xs font-medium flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded'>
													<AlertTriangle className='w-3 h-3' />
													{errors.type}
												</span>
											)}
										</div>

										<div
											className={`relative ${errors.type ? 'border-red-400 shadow-red-500/10' : 'border-slate-700/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30'} bg-slate-800/70 rounded-lg border transition-all duration-200 focus-within:shadow-lg`}>
											<select
												name='type'
												value={formData.type}
												onChange={handleChange}
												className='w-full p-3.5 bg-transparent text-white appearance-none outline-none transition-all'>
												<option value='' disabled className='bg-slate-900'>
													Select Media Type
												</option>
												<option value='Poster' className='bg-slate-900'>
													📸 Poster
												</option>
												<option value='Audio File' className='bg-slate-900'>
													🔊 Audio File
												</option>
												<option value='Video' className='bg-slate-900'>
													🎥 Video
												</option>
												<option value='Text' className='bg-slate-900'>
													📝 Text
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
									<DialogFooter className='mt-8 flex justify-between gap-3'>
										<motion.button
											whileHover={{
												scale: 1.02,
												boxShadow: '0 4px 12px -6px rgba(168, 85, 247, 0.3)',
											}}
											whileTap={{
												scale: 0.98,
												boxShadow: '0 2px 6px -4px rgba(168, 85, 247, 0.3)',
											}}
											onClick={() => setShowDialog(false)}
											className='px-6 py-2.5 rounded-lg bg-slate-800/80 text-gray-300 hover:bg-slate-700 transition-all duration-200 flex items-center gap-2 font-medium border border-slate-700/50 hover:border-slate-600'>
											<X className='w-4 h-4 text-gray-400' />
											<span>Cancel</span>
										</motion.button>
										<motion.button
											whileHover={{
												scale: 1.02,
												boxShadow: '0 4px 20px -6px rgba(168, 85, 247, 0.5)',
											}}
											whileTap={{
												scale: 0.98,
												boxShadow: '0 2px 10px -4px rgba(168, 85, 247, 0.5)',
											}}
											onClick={goToNextStep}
											disabled={!isStepOneValid()}
											className='px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-lg disabled:shadow-none'>
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
								className='space-y-6 px-6 pb-6'>
								{/* Video Duration Warning */}
								{formData.type === 'Video' && (
									<motion.div
										variants={itemVariants}
										className='bg-blue-500/10 border border-blue-500/20 rounded-lg p-4'>
										<div className='flex items-start gap-3'>
											<div className='p-2 bg-blue-500/20 rounded-lg'>
												<Clock className='w-5 h-5 text-blue-400' />
											</div>
											<div className='space-y-2'>
												<h4 className='text-blue-400 font-medium text-sm'>
													Video Duration Policy
												</h4>
												<p className='text-gray-300 text-xs leading-relaxed'>
													Videos are limited to 60 seconds (1 minute) for
													standard campaigns. Longer videos require special
													approval from our development team.
												</p>
												{videoDuration && videoDuration > 60 && (
													<div className='flex items-center gap-2 text-amber-400 text-xs mt-2'>
														<AlertTriangle className='w-4 h-4' />
														<span>
															Current video is {formatDuration(videoDuration)} -
															exceeds 1 minute limit
														</span>
													</div>
												)}
											</div>
										</div>
									</motion.div>
								)}

								{/* Enterprise Contact for Long Videos */}
								{showEnterpriseContact && (
									<motion.div
										variants={itemVariants}
										className='bg-amber-500/10 border border-amber-500/20 rounded-lg p-4'>
										<div className='flex items-start gap-3'>
											<div className='p-2 bg-amber-500/20 rounded-lg'>
												<Mail className='w-5 h-5 text-amber-400' />
											</div>
											<div className='space-y-3'>
												<h4 className='text-amber-400 font-medium text-sm'>
													Extended Video Request
												</h4>
												<p className='text-gray-300 text-xs leading-relaxed'>
													Your video exceeds our standard 1-minute limit. For
													extended video campaigns, please contact our
													development team for special arrangements.
												</p>
												<button className='text-xs bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors'>
													Contact Dev Team
												</button>
											</div>
										</div>
									</motion.div>
								)}

								{/* File Upload Section */}
								{formData.type && formData.type !== 'Text' && (
									<motion.div
										variants={itemVariants}
										className={`border-2 border-dashed ${
											dragActive
												? 'border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/10'
												: 'border-slate-700/50 bg-slate-800/30 hover:border-purple-500/50 hover:bg-slate-800/50'
										} rounded-xl transition-all duration-300 group overflow-hidden`}
										whileHover={{ scale: 1.002 }}
										onDragEnter={handleDrag}
										onDragLeave={handleDrag}
										onDragOver={handleDrag}
										onDrop={handleDrop}>
										<div className='p-6 space-y-4'>
											<div className='flex items-center justify-between'>
												<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
													<span className={mediaTypeInfo.color}>
														{mediaTypeInfo.icon}
													</span>
													Media Asset
												</label>
												{errors.adResource && (
													<span className='text-red-400/90 text-xs font-medium flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded'>
														<AlertTriangle className='w-3 h-3' />
														{errors.adResource}
													</span>
												)}
											</div>
											<div
												className='flex flex-col items-center justify-center py-8 rounded-xl cursor-pointer relative bg-gradient-to-br from-slate-900/20 to-slate-800/10 border-2 border-dashed border-slate-700/50'
												onClick={handleButtonClick}>
												<motion.div
													whileHover={{ scale: 1.05, rotate: 5 }}
													className={`p-4 ${
														dragActive
															? 'bg-purple-600/30 border-purple-500'
															: 'bg-slate-700/50 border-slate-600 group-hover:border-purple-400 group-hover:bg-purple-600/10'
													} rounded-full mb-4 border-2 transition-all duration-300`}>
													<CloudUpload
														className={`w-8 h-8 ${
															dragActive
																? 'text-purple-400'
																: 'text-gray-300 group-hover:text-purple-400'
														} transition-colors duration-300`}
													/>
												</motion.div>
												<p className='text-gray-400 text-center text-sm mb-3 max-w-xs'>
													{formData.adResource
														? 'Asset ready for upload'
														: `Drag & drop your ${formData.type.toLowerCase()} or browse files`}
												</p>
												<motion.div
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className='text-white text-sm font-medium px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-lg transition-all transform'>
													{formData.adResource ? 'Change File' : 'Select Asset'}
												</motion.div>
												{formData.adResource && (
													<div className='mt-4 space-y-2 text-center'>
														<p className='text-purple-400 text-sm flex items-center justify-center gap-2 font-medium'>
															<CheckCircle className='w-4 h-4' />
															{formData.adResource.name}
														</p>
														<div className='flex items-center justify-center gap-4 text-xs text-gray-400'>
															<span>
																Size: {formatFileSize(formData.adResource.size)}
															</span>
															{videoDuration && (
																<span
																	className={`flex items-center gap-1 px-2 py-1 rounded-full ${videoDuration > 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
																	<Clock className='w-3 h-3' />
																	{formatDuration(videoDuration)}
																</span>
															)}
														</div>
													</div>
												)}
											</div>
											<input
												type='file'
												name='adResource'
												onChange={handleFileChange}
												className='hidden'
												id='file-upload'
												ref={fileInputRef}
												accept={
													formData.type === 'Video'
														? 'video/*'
														: formData.type === 'Poster'
															? 'image/*'
															: formData.type === 'Audio File'
																? 'audio/*'
																: '*/*'
												}
											/>
										</div>
									</motion.div>
								)}

								{/* Pricing & Duration */}
								<motion.div
									className='grid grid-cols-1 md:grid-cols-2 gap-5'
									variants={itemVariants}>
									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-2'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
												Engagement Cost
												<div
													className='text-gray-500 cursor-help'
													title='Cost per view or interaction'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.costPerView && (
												<span className='text-red-400/90 text-xs font-medium flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded'>
													<AlertTriangle className='w-3 h-3' />
													{errors.costPerView}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.costPerView ? 'border-red-400 shadow-red-500/10' : 'border-slate-700/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30'} bg-slate-800/70 rounded-lg border transition-all duration-200 focus-within:shadow-lg flex items-center`}>
											<span className='text-gray-400 ml-4 font-medium'>$</span>
											<input
												name='costPerView'
												placeholder='0.00'
												value={formData.costPerView}
												onChange={handleChange}
												className='bg-transparent w-full p-3.5 text-white outline-none placeholder-gray-500 transition-all'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<div className='flex items-center justify-between mb-2'>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
												Campaign Lifespan
												<div
													className='text-gray-500 cursor-help'
													title='Number of days the campaign will run'>
													<Info className='w-4 h-4' />
												</div>
											</label>
											{errors.numberOfDaysRunning && (
												<span className='text-red-400/90 text-xs font-medium flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded'>
													<AlertTriangle className='w-3 h-3' />
													{errors.numberOfDaysRunning}
												</span>
											)}
										</div>
										<div
											className={`relative ${errors.numberOfDaysRunning ? 'border-red-400 shadow-red-500/10' : 'border-slate-700/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30'} bg-slate-800/70 rounded-lg border transition-all duration-200 focus-within:shadow-lg flex items-center`}>
											<input
												name='numberOfDaysRunning'
												placeholder='30'
												value={formData.numberOfDaysRunning}
												onChange={handleChange}
												className='bg-transparent w-full p-3.5 text-white outline-none placeholder-gray-500 transition-all'
											/>
											<span className='text-gray-400 mr-4 font-medium'>
												days
											</span>
										</div>
									</div>
								</motion.div>

								{/* Video Preview (if video is selected) */}
								{formData.adResource &&
									formData.type === 'Video' &&
									formData.adResource.type?.startsWith('video/') && (
										<motion.div
											variants={itemVariants}
											className='space-y-3'
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3 }}>
											<label className='text-gray-300 text-sm font-medium flex items-center gap-2'>
												<Play className='w-4 h-4 text-blue-400' />
												Video Preview
											</label>
											<div className='bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/30 relative group'>
												<video
													ref={videoRef}
													src={URL.createObjectURL(formData.adResource)}
													controls
													className='w-full max-h-64 bg-slate-900'
													preload='metadata'
												/>
												<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-3 pt-6'>
													<div className='flex items-center justify-between text-xs'>
														<span className='text-gray-300 truncate max-w-[60%]'>
															{formData.adResource.name}
														</span>
														{videoDuration && (
															<span
																className={`flex items-center gap-1 px-2 py-1 rounded-full ${videoDuration > 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
																<Clock className='w-3 h-3' />
																{formatDuration(videoDuration)}
															</span>
														)}
													</div>
												</div>
											</div>
										</motion.div>
									)}

								{/* Campaign Summary */}
								<motion.div
									variants={itemVariants}
									className='bg-slate-800/30 rounded-xl p-5 border border-slate-700/30 shadow-sm'>
									<h4 className='text-gray-300 text-sm font-medium mb-4 flex items-center gap-2 pb-2 border-b border-slate-700/50'>
										<CheckCircle className='w-4 h-4 text-green-400' />
										Campaign Summary
									</h4>
									<div className='grid grid-cols-2 gap-4 text-sm'>
										{[
											{
												label: 'Campaign',
												value: formData.adName || 'Not specified',
												icon: null,
											},
											{
												label: 'Media Type',
												value: formData.type || 'Not selected',
												icon: mediaTypeInfo.icon,
											},
											{
												label: 'Duration',
												value: `${formData.numberOfDaysRunning || '0'} days`,
												icon: null,
											},
											{
												label: 'Cost per view',
												value: `$${formData.costPerView || '0.00'}`,
												icon: null,
											},
										].map((item, index) => (
											<div key={index} className='flex items-start gap-3'>
												{item.icon && (
													<span
														className={`p-1.5 rounded-lg ${mediaTypeInfo.bgColor} ${mediaTypeInfo.color}`}>
														{item.icon}
													</span>
												)}
												<div>
													<span className='text-gray-400 text-xs'>
														{item.label}
													</span>
													<p className='text-white font-medium mt-0.5'>
														{item.value}
													</p>
												</div>
											</div>
										))}
									</div>
								</motion.div>

								{/* Footer Buttons */}
								<motion.div variants={itemVariants}>
									<DialogFooter className='mt-8 flex justify-between gap-3'>
										<motion.button
											whileHover={{
												scale: 1.02,
												boxShadow: '0 4px 12px -6px rgba(168, 85, 247, 0.3)',
											}}
											whileTap={{
												scale: 0.98,
												boxShadow: '0 2px 6px -4px rgba(168, 85, 247, 0.3)',
											}}
											onClick={goToPreviousStep}
											className='px-6 py-2.5 rounded-lg bg-slate-800/80 text-gray-300 hover:bg-slate-700 transition-all duration-200 flex items-center gap-2 font-medium border border-slate-700/50 hover:border-slate-600'>
											<ArrowLeft className='w-4 h-4 text-gray-400' />
											<span>Previous</span>
										</motion.button>
										<motion.button
											whileHover={{
												scale: 1.02,
												boxShadow: '0 4px 20px -6px rgba(168, 85, 247, 0.5)',
											}}
											whileTap={{
												scale: 0.98,
												boxShadow: '0 2px 10px -4px rgba(168, 85, 247, 0.5)',
											}}
											disabled={
												isSubmitDisabled ||
												isSubmitting ||
												(videoDuration && videoDuration > 60)
											}
											onClick={handleCreateAd}
											className='px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-lg disabled:shadow-none relative overflow-hidden'>
											{isSubmitting ? (
												<>
													<div className='animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full'></div>
													<span>Processing Campaign...</span>
												</>
											) : videoDuration && videoDuration > 60 ? (
												<>
													<AlertTriangle className='w-4 h-4 text-amber-400' />
													<span>Video Too Long</span>
												</>
											) : (
												<>
													<CheckCircle className='w-4 h-4 text-white' />
													<span>Launch Campaign</span>
												</>
											)}
											{isSubmitting && (
												<div className='absolute inset-0 bg-gradient-to-r from-purple-600/30 to-purple-700/30 flex items-center justify-center'>
													<motion.div
														animate={{
															rotate: 360,
															scale: [1, 1.1, 1],
														}}
														transition={{
															rotate: {
																duration: 1,
																ease: 'linear',
																repeat: Infinity,
															},
															scale: {
																duration: 1.5,
																repeat: Infinity,
																repeatType: 'reverse',
															},
														}}
														className='w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full'
													/>
												</div>
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

// import { motion, AnimatePresence } from 'framer-motion';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// } from '@/app/components/ui/dialog';
// import { FormErrors } from './types';
// import {
// 	Info,
// 	CloudUpload,
// 	CheckCircle,
// 	X,
// 	ArrowRight,
// 	ArrowLeft,
// 	Play,
// 	Clock,
// 	FileVideo,
// 	Image,
// 	Volume2,
// 	Type,
// 	AlertTriangle,
// 	Mail,
// 	Eye,
// 	Target,
// 	Calendar,
// 	DollarSign,
// 	Upload,
// 	Sparkles,
// } from 'lucide-react';
// import { useState, useRef, useEffect } from 'react';

// interface CreateAdDialogProps {
// 	formData: any;
// 	errors: FormErrors;
// 	userEmail?: string;
// 	handleChange: (
// 		e: React.ChangeEvent<any> | { target: { name: string; value: any } }
// 	) => void;
// 	handleCreateAd: () => void;
// 	setShowDialog: (show: boolean) => void;
// 	isSubmitDisabled: boolean;
// 	isSubmitting: boolean;
// }

// export const CreateAdDialog = ({
// 	formData,
// 	errors,
// 	userEmail,
// 	handleChange,
// 	handleCreateAd,
// 	setShowDialog,
// 	isSubmitDisabled,
// 	isSubmitting,
// }: CreateAdDialogProps) => {
// 	const [dragActive, setDragActive] = useState(false);
// 	const [currentStep, setCurrentStep] = useState(1);
// 	const [videoDuration, setVideoDuration] = useState<number | null>(null);
// 	const [showEnterpriseContact, setShowEnterpriseContact] = useState(false);
// 	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// 	const totalSteps = 2;
// 	const fileInputRef = useRef<HTMLInputElement>(null);
// 	const videoRef = useRef<HTMLVideoElement>(null);

// 	// Video duration validation
// 	useEffect(() => {
// 		if (
// 			formData.adResource &&
// 			formData.type === 'Video' &&
// 			formData.adResource.type?.startsWith('video/')
// 		) {
// 			const video = document.createElement('video');
// 			video.preload = 'metadata';
// 			video.onloadedmetadata = () => {
// 				setVideoDuration(video.duration);
// 				if (video.duration > 60) {
// 					setShowEnterpriseContact(true);
// 				} else {
// 					setShowEnterpriseContact(false);
// 				}
// 			};
// 			const url = URL.createObjectURL(formData.adResource);
// 			setPreviewUrl(url);
// 			video.src = url;
// 		} else if (formData.adResource && formData.type === 'Poster') {
// 			const url = URL.createObjectURL(formData.adResource);
// 			setPreviewUrl(url);
// 			setVideoDuration(null);
// 			setShowEnterpriseContact(false);
// 		} else {
// 			setVideoDuration(null);
// 			setPreviewUrl(null);
// 			setShowEnterpriseContact(false);
// 		}
// 	}, [formData.adResource, formData.type]);

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, files } = e.target;
// 		if (files && files[0]) {
// 			handleChange({
// 				target: {
// 					name,
// 					value: files[0],
// 				},
// 			});
// 		}
// 	};

// 	// Drag and drop event handlers
// 	const handleDrag = (e: React.DragEvent) => {
// 		e.preventDefault();
// 		e.stopPropagation();

// 		if (e.type === 'dragenter' || e.type === 'dragover') {
// 			setDragActive(true);
// 		} else if (e.type === 'dragleave') {
// 			setDragActive(false);
// 		}
// 	};

// 	const handleDrop = (e: React.DragEvent) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		setDragActive(false);

// 		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// 			handleChange({
// 				target: {
// 					name: 'adResource',
// 					value: e.dataTransfer.files[0],
// 				},
// 			});
// 		}
// 	};

// 	const handleButtonClick = () => {
// 		fileInputRef.current?.click();
// 	};

// 	const goToNextStep = () => {
// 		if (currentStep < totalSteps) {
// 			setCurrentStep(currentStep + 1);
// 		}
// 	};

// 	const goToPreviousStep = () => {
// 		if (currentStep > 1) {
// 			setCurrentStep(currentStep - 1);
// 		}
// 	};

// 	// Check if the current step form is valid
// 	const isStepOneValid = () => {
// 		return (
// 			formData.adName &&
// 			formData.teamId &&
// 			formData.description &&
// 			formData.type &&
// 			!errors.adName &&
// 			!errors.teamId &&
// 			!errors.description &&
// 			!errors.type
// 		);
// 	};

// 	// Get media type icon and info
// 	const getMediaTypeInfo = () => {
// 		switch (formData.type) {
// 			case 'Video':
// 				return {
// 					icon: <FileVideo className='w-5 h-5' />,
// 					color: 'text-blue-400',
// 					bgColor: 'bg-blue-500/20',
// 					borderColor: 'border-blue-500/30',
// 					gradientFrom: 'from-blue-500/20',
// 					gradientTo: 'to-cyan-500/20',
// 					description: 'Engaging video content with up to 1-minute duration',
// 					tips: 'High-impact visual storytelling',
// 				};
// 			case 'Poster':
// 				return {
// 					icon: <Image className='w-5 h-5' />,
// 					color: 'text-emerald-400',
// 					bgColor: 'bg-emerald-500/20',
// 					borderColor: 'border-emerald-500/30',
// 					gradientFrom: 'from-emerald-500/20',
// 					gradientTo: 'to-green-500/20',
// 					description: 'Eye-catching static visuals in various formats',
// 					tips: 'Perfect for brand awareness',
// 				};
// 			case 'Audio File':
// 				return {
// 					icon: <Volume2 className='w-5 h-5' />,
// 					color: 'text-orange-400',
// 					bgColor: 'bg-orange-500/20',
// 					borderColor: 'border-orange-500/30',
// 					gradientFrom: 'from-orange-500/20',
// 					gradientTo: 'to-amber-500/20',
// 					description: 'Compelling audio content and voice campaigns',
// 					tips: 'Ideal for radio and podcast placements',
// 				};
// 			case 'Text':
// 				return {
// 					icon: <Type className='w-5 h-5' />,
// 					color: 'text-violet-400',
// 					bgColor: 'bg-violet-500/20',
// 					borderColor: 'border-violet-500/30',
// 					gradientFrom: 'from-violet-500/20',
// 					gradientTo: 'to-purple-500/20',
// 					description: 'Concise text-based messages and announcements',
// 					tips: 'Quick to create, easy to update',
// 				};
// 			default:
// 				return {
// 					icon: <CloudUpload className='w-5 h-5' />,
// 					color: 'text-gray-400',
// 					bgColor: 'bg-gray-500/10',
// 					borderColor: 'border-gray-500/20',
// 					gradientFrom: 'from-gray-500/10',
// 					gradientTo: 'to-slate-500/10',
// 					description: 'Select a media type to continue',
// 					tips: '',
// 				};
// 		}
// 	};

// 	const formatFileSize = (bytes: number) => {
// 		if (bytes === 0) return '0 Bytes';
// 		const k = 1024;
// 		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// 		const i = Math.floor(Math.log(bytes) / Math.log(k));
// 		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// 	};

// 	const formatDuration = (seconds: number) => {
// 		const mins = Math.floor(seconds / 60);
// 		const secs = Math.floor(seconds % 60);
// 		return `${mins}:${secs.toString().padStart(2, '0')}`;
// 	};

// 	// Enhanced animation variants
// 	const containerVariants = {
// 		hidden: { opacity: 0, y: 30, scale: 0.98 },
// 		visible: {
// 			opacity: 1,
// 			y: 0,
// 			scale: 1,
// 			transition: {
// 				duration: 0.6,
// 				staggerChildren: 0.08,
// 				ease: [0.16, 1, 0.3, 1],
// 			},
// 		},
// 		exit: {
// 			opacity: 0,
// 			x: -50,
// 			scale: 0.98,
// 			transition: { duration: 0.3, ease: 'easeInOut' },
// 		},
// 	};

// 	const containerVariantsRight = {
// 		hidden: { opacity: 0, x: 50, scale: 0.98 },
// 		visible: {
// 			opacity: 1,
// 			x: 0,
// 			scale: 1,
// 			transition: {
// 				duration: 0.6,
// 				staggerChildren: 0.08,
// 				ease: [0.16, 1, 0.3, 1],
// 			},
// 		},
// 		exit: {
// 			opacity: 0,
// 			x: -50,
// 			scale: 0.98,
// 			transition: { duration: 0.3, ease: 'easeInOut' },
// 		},
// 	};

// 	const itemVariants = {
// 		hidden: { opacity: 0, y: 20, scale: 0.96 },
// 		visible: {
// 			opacity: 1,
// 			y: 0,
// 			scale: 1,
// 			transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
// 		},
// 	};

// 	const mediaTypeInfo = getMediaTypeInfo();

// 	return (
// 		<Dialog open={true} onOpenChange={setShowDialog}>
// 			<DialogContent className='max-w-3xl bg-gradient-to-br from-slate-900/98 via-gray-900/95 to-slate-900/98 border border-slate-700/40 shadow-2xl rounded-2xl backdrop-blur-xl overflow-hidden'>
// 				<motion.div
// 					variants={containerVariants}
// 					initial='hidden'
// 					animate='visible'
// 					className='space-y-8 relative'>
// 					{/* Enhanced background effects */}
// 					<div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1)_0%,transparent_50%)] pointer-events-none' />
// 					<div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none' />
// 					<div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent' />

// 					{/* Enhanced Header */}
// 					<DialogHeader className='space-y-4 relative px-8 pt-8'>
// 						<motion.div variants={itemVariants}>
// 							<div className='flex items-center justify-between'>
// 								<div className='space-y-2'>
// 									<DialogTitle className='text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent flex items-center gap-3'>
// 										<div className='p-2 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30'>
// 											<Sparkles className='w-6 h-6 text-purple-400' />
// 										</div>
// 										Create Advertisement
// 									</DialogTitle>
// 									<DialogDescription className='text-gray-400 text-base leading-relaxed max-w-lg'>
// 										{formData.type
// 											? mediaTypeInfo.description +
// 												(mediaTypeInfo.tips ? ` • ${mediaTypeInfo.tips}` : '')
// 											: 'Build compelling campaigns that captivate your audience and drive meaningful engagement'}
// 									</DialogDescription>
// 								</div>
// 								{formData.type && (
// 									<motion.div
// 										initial={{ opacity: 0, scale: 0.8 }}
// 										animate={{ opacity: 1, scale: 1 }}
// 										className={`flex items-center gap-3 px-4 py-3 rounded-xl ${mediaTypeInfo.bgColor} ${mediaTypeInfo.borderColor} border shadow-lg backdrop-blur-sm`}>
// 										<span className={mediaTypeInfo.color}>
// 											{mediaTypeInfo.icon}
// 										</span>
// 										<div className='text-left'>
// 											<span
// 												className={`text-sm font-semibold ${mediaTypeInfo.color} block`}>
// 												{formData.type}
// 											</span>
// 											<span className='text-xs text-gray-400'>
// 												Media Format
// 											</span>
// 										</div>
// 									</motion.div>
// 								)}
// 							</div>
// 						</motion.div>
// 					</DialogHeader>

// 					{/* Enhanced Progress Section */}
// 					<motion.div variants={itemVariants} className='px-8'>
// 						<div className='relative'>
// 							<div className='flex justify-between items-center mb-4'>
// 								<div className='flex items-center gap-3'>
// 									<span className='text-sm font-semibold text-gray-300'>
// 										Step {currentStep} of {totalSteps}
// 									</span>
// 									<div className='h-4 w-px bg-gradient-to-b from-purple-500/50 to-transparent' />
// 									<span className='text-sm text-gray-400 font-medium'>
// 										{currentStep === 1 ? 'Campaign Details' : 'Media & Launch'}
// 									</span>
// 								</div>
// 								<div className='text-xs text-gray-500 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50'>
// 									{Math.round((currentStep / totalSteps) * 100)}% Complete
// 								</div>
// 							</div>

// 							{/* Enhanced Progress Bar */}
// 							<div className='relative w-full bg-slate-800/70 rounded-full h-3 overflow-hidden border border-slate-700/40 shadow-inner'>
// 								<motion.div
// 									className='h-full rounded-full relative overflow-hidden'
// 									style={{
// 										background:
// 											'linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
// 									}}
// 									initial={{
// 										width: `${((currentStep - 1) / totalSteps) * 100}%`,
// 									}}
// 									animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
// 									transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
// 									<motion.div
// 										className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent'
// 										animate={{
// 											x: ['-100%', '100%'],
// 										}}
// 										transition={{
// 											duration: 2,
// 											repeat: Infinity,
// 											ease: 'linear',
// 										}}
// 									/>
// 								</motion.div>
// 							</div>

// 							{/* Step indicators */}
// 							<div className='flex justify-between mt-3'>
// 								{Array.from({ length: totalSteps }, (_, i) => (
// 									<motion.div
// 										key={i}
// 										className={`flex items-center gap-2 ${
// 											i + 1 <= currentStep ? 'text-purple-400' : 'text-gray-500'
// 										}`}
// 										initial={{ opacity: 0.5 }}
// 										animate={{
// 											opacity: i + 1 <= currentStep ? 1 : 0.5,
// 											scale: i + 1 === currentStep ? 1.1 : 1,
// 										}}
// 										transition={{ duration: 0.3 }}>
// 										<div
// 											className={`w-2 h-2 rounded-full ${
// 												i + 1 <= currentStep
// 													? 'bg-purple-400 shadow-lg shadow-purple-400/50'
// 													: 'bg-gray-600'
// 											}`}
// 										/>
// 										<span className='text-xs font-medium'>
// 											{i === 0 ? 'Details' : 'Launch'}
// 										</span>
// 									</motion.div>
// 								))}
// 							</div>
// 						</div>
// 					</motion.div>

// 					<AnimatePresence mode='wait'>
// 						{currentStep === 1 && (
// 							<motion.div
// 								key='step1'
// 								variants={containerVariants}
// 								initial='hidden'
// 								animate='visible'
// 								exit='exit'
// 								className='space-y-7 px-8'>
// 								{/* Enhanced Form Grid */}
// 								<motion.div
// 									className='grid grid-cols-1 lg:grid-cols-2 gap-6'
// 									variants={itemVariants}>
// 									{/* Enhanced Ad Name Field */}
// 									<div className='space-y-3'>
// 										<div className='flex items-center justify-between'>
// 											<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 												<Target className='w-4 h-4 text-purple-400' />
// 												Campaign Name
// 											</label>
// 											{errors.adName && (
// 												<motion.span
// 													initial={{ opacity: 0, x: 10 }}
// 													animate={{ opacity: 1, x: 0 }}
// 													className='text-red-400 text-xs font-medium flex items-center gap-1 bg-red-500/15 px-3 py-1.5 rounded-lg border border-red-500/30'>
// 													<AlertTriangle className='w-3 h-3' />
// 													{errors.adName}
// 												</motion.span>
// 											)}
// 										</div>
// 										<div className='relative group'>
// 											<div
// 												className={`relative ${
// 													errors.adName
// 														? 'border-red-400/60 shadow-red-500/20 shadow-lg'
// 														: 'border-slate-600/50 group-focus-within:border-purple-400/70 group-focus-within:shadow-purple-500/25 group-focus-within:shadow-lg'
// 												} bg-gradient-to-br from-slate-800/80 to-slate-800/60 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden`}>
// 												<input
// 													name='adName'
// 													placeholder='Summer Brand Boost 2025'
// 													value={formData.adName}
// 													onChange={handleChange}
// 													className='bg-transparent w-full p-4 text-white placeholder-gray-400 outline-none transition-all font-medium'
// 												/>
// 												<div className='absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300' />
// 											</div>
// 										</div>
// 									</div>

// 									{/* Enhanced Team ID Field */}
// 									<div className='space-y-3'>
// 										<div className='flex items-center justify-between'>
// 											<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 												<Eye className='w-4 h-4 text-purple-400' />
// 												Team Identifier
// 											</label>
// 											{errors.teamId && (
// 												<motion.span
// 													initial={{ opacity: 0, x: 10 }}
// 													animate={{ opacity: 1, x: 0 }}
// 													className='text-red-400 text-xs font-medium flex items-center gap-1 bg-red-500/15 px-3 py-1.5 rounded-lg border border-red-500/30'>
// 													<AlertTriangle className='w-3 h-3' />
// 													{errors.teamId}
// 												</motion.span>
// 											)}
// 										</div>
// 										<div className='relative group'>
// 											<div
// 												className={`relative ${
// 													errors.teamId
// 														? 'border-red-400/60 shadow-red-500/20 shadow-lg'
// 														: 'border-slate-600/50 group-focus-within:border-purple-400/70 group-focus-within:shadow-purple-500/25 group-focus-within:shadow-lg'
// 												} bg-gradient-to-br from-slate-800/80 to-slate-800/60 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden`}>
// 												<input
// 													name='teamId'
// 													placeholder='team-marketing-001'
// 													value={formData.teamId}
// 													onChange={handleChange}
// 													className='bg-transparent w-full p-4 text-white placeholder-gray-400 outline-none transition-all font-medium'
// 												/>
// 												<div className='absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300' />
// 											</div>
// 										</div>
// 									</div>
// 								</motion.div>

// 								{/* Enhanced Description field */}
// 								<motion.div variants={itemVariants} className='space-y-3'>
// 									<div className='flex items-center justify-between'>
// 										<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 											<Type className='w-4 h-4 text-purple-400' />
// 											Campaign Narrative
// 											<div
// 												className='text-gray-500 cursor-help hover:text-gray-400 transition-colors'
// 												title='Describe your campaign objectives, target audience, and key messaging strategy'>
// 												<Info className='w-4 h-4' />
// 											</div>
// 										</label>
// 										{errors.description && (
// 											<motion.span
// 												initial={{ opacity: 0, x: 10 }}
// 												animate={{ opacity: 1, x: 0 }}
// 												className='text-red-400 text-xs font-medium flex items-center gap-1 bg-red-500/15 px-3 py-1.5 rounded-lg border border-red-500/30'>
// 												<AlertTriangle className='w-3 h-3' />
// 												{errors.description}
// 											</motion.span>
// 										)}
// 									</div>
// 									<div className='relative group'>
// 										<div
// 											className={`relative ${
// 												errors.description
// 													? 'border-red-400/60 shadow-red-500/20 shadow-lg'
// 													: 'border-slate-600/50 group-focus-within:border-purple-400/70 group-focus-within:shadow-purple-500/25 group-focus-within:shadow-lg'
// 											} bg-gradient-to-br from-slate-800/80 to-slate-800/60 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden`}>
// 											<textarea
// 												name='description'
// 												placeholder='Craft a compelling narrative that captures your brand essence and resonates with your target audience. Describe your campaign goals, key messages, and the emotional connection you want to create...'
// 												value={formData.description}
// 												onChange={handleChange}
// 												rows={4}
// 												className='bg-transparent w-full p-4 text-white placeholder-gray-400 outline-none transition-all resize-none font-medium leading-relaxed'
// 											/>
// 											<div className='absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/3 to-purple-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300' />
// 										</div>
// 									</div>
// 								</motion.div>

// 								{/* Enhanced Creator Email Field */}
// 								{userEmail && (
// 									<motion.div variants={itemVariants} className='space-y-3'>
// 										<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 											<Mail className='w-4 h-4 text-purple-400' />
// 											Account Credentials
// 										</label>
// 										<div className='relative bg-gradient-to-br from-slate-800/80 to-slate-800/60 rounded-xl border border-slate-600/50 p-5 backdrop-blur-sm'>
// 											<div className='flex justify-between items-center'>
// 												<div className='flex items-center gap-3'>
// 													<div className='p-2 bg-green-500/20 rounded-lg border border-green-500/30'>
// 														<CheckCircle className='w-5 h-5 text-green-400' />
// 													</div>
// 													<div>
// 														<span className='text-white font-semibold block'>
// 															{userEmail}
// 														</span>
// 														<span className='text-gray-400 text-xs'>
// 															Verified Account
// 														</span>
// 													</div>
// 												</div>
// 												<div className='text-green-400 text-xs font-semibold flex items-center gap-2 bg-green-500/15 px-4 py-2 rounded-full border border-green-500/30'>
// 													<div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
// 													<span>Active</span>
// 												</div>
// 											</div>
// 										</div>
// 									</motion.div>
// 								)}

// 								{/* Enhanced Media Type Selector */}
// 								<motion.div variants={itemVariants} className='space-y-3'>
// 									<div className='flex items-center justify-between'>
// 										<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 											<CloudUpload className='w-4 h-4 text-purple-400' />
// 											Media Format
// 										</label>
// 										{errors.type && (
// 											<motion.span
// 												initial={{ opacity: 0, x: 10 }}
// 												animate={{ opacity: 1, x: 0 }}
// 												className='text-red-400 text-xs font-medium flex items-center gap-1 bg-red-500/15 px-3 py-1.5 rounded-lg border border-red-500/30'>
// 												<AlertTriangle className='w-3 h-3' />
// 												{errors.type}
// 											</motion.span>
// 										)}
// 									</div>

// 									{/* Custom Media Type Grid */}
// 									<div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
// 										{[
// 											{
// 												value: 'Video',
// 												icon: FileVideo,
// 												label: 'Video',
// 												color: 'blue',
// 											},
// 											{
// 												value: 'Poster',
// 												icon: Image,
// 												label: 'Poster',
// 												color: 'emerald',
// 											},
// 											{
// 												value: 'Audio File',
// 												icon: Volume2,
// 												label: 'Audio',
// 												color: 'orange',
// 											},
// 											{
// 												value: 'Text',
// 												icon: Type,
// 												label: 'Text',
// 												color: 'violet',
// 											},
// 										].map((type) => {
// 											const isSelected = formData.type === type.value;
// 											return (
// 												<motion.div
// 													key={type.value}
// 													whileHover={{ scale: 1.02, y: -2 }}
// 													whileTap={{ scale: 0.98 }}
// 													onClick={() =>
// 														handleChange({
// 															target: { name: 'type', value: type.value },
// 														})
// 													}
// 													className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
// 														isSelected
// 															? `border-${type.color}-400/70 bg-gradient-to-br from-${type.color}-500/20 to-${type.color}-600/10 shadow-lg shadow-${type.color}-500/20`
// 															: 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600/70 hover:bg-slate-800/70'
// 													}`}>
// 													<div className='text-center space-y-3'>
// 														<div
// 															className={`mx-auto w-10 h-10 rounded-lg flex items-center justify-center ${
// 																isSelected
// 																	? `bg-${type.color}-500/30 border border-${type.color}-400/50`
// 																	: 'bg-slate-700/50 group-hover:bg-slate-700/70'
// 															} transition-all duration-300`}>
// 															<type.icon
// 																className={`w-5 h-5 ${
// 																	isSelected
// 																		? `text-${type.color}-400`
// 																		: 'text-gray-400 group-hover:text-gray-300'
// 																} transition-colors`}
// 															/>
// 														</div>
// 														<span
// 															className={`text-sm font-medium block ${
// 																isSelected
// 																	? `text-${type.color}-300`
// 																	: 'text-gray-300 group-hover:text-white'
// 															} transition-colors`}>
// 															{type.label}
// 														</span>
// 													</div>
// 													{isSelected && (
// 														<motion.div
// 															initial={{ scale: 0 }}
// 															animate={{ scale: 1 }}
// 															className='absolute top-2 right-2'>
// 															<CheckCircle
// 																className={`w-5 h-5 text-${type.color}-400`}
// 															/>
// 														</motion.div>
// 													)}
// 												</motion.div>
// 											);
// 										})}
// 									</div>
// 								</motion.div>
// 							</motion.div>
// 						)}

// 						{currentStep === 2 && (
// 							<motion.div
// 								key='step2'
// 								variants={containerVariantsRight}
// 								initial='hidden'
// 								animate='visible'
// 								exit='exit'
// 								className='space-y-7 px-8'>
// 								{/* Video Duration Warning */}
// 								{formData.type === 'Video' && (
// 									<motion.div
// 										variants={itemVariants}
// 										className='relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5 backdrop-blur-sm'>
// 										<div className='flex items-start gap-4'>
// 											<div className='p-3 bg-blue-500/20 rounded-xl border border-blue-400/30'>
// 												<Clock className='w-6 h-6 text-blue-400' />
// 											</div>
// 											<div className='space-y-3 flex-1'>
// 												<h4 className='text-blue-300 font-semibold text-base flex items-center gap-2'>
// 													Video Duration Guidelines
// 													<Info className='w-4 h-4 text-blue-400/70 cursor-help' />
// 												</h4>
// 												<p className='text-gray-300 text-sm leading-relaxed'>
// 													Videos are optimized for 60 seconds or less for
// 													maximum engagement. Longer content requires enterprise
// 													approval and may have different pricing structures.
// 												</p>
// 												{videoDuration && videoDuration > 60 && (
// 													<motion.div
// 														initial={{ opacity: 0, y: 5 }}
// 														animate={{ opacity: 1, y: 0 }}
// 														className='flex items-center gap-2 text-amber-300 text-sm mt-3 p-3 bg-amber-500/15 rounded-lg border border-amber-500/30'>
// 														<AlertTriangle className='w-4 h-4' />
// 														<span className='font-medium'>
// 															Current video: {formatDuration(videoDuration)} -
// 															Requires enterprise review
// 														</span>
// 													</motion.div>
// 												)}
// 											</div>
// 										</div>
// 									</motion.div>
// 								)}

// 								{/* Enhanced Enterprise Contact */}
// 								{showEnterpriseContact && (
// 									<motion.div
// 										variants={itemVariants}
// 										initial={{ opacity: 0, scale: 0.95 }}
// 										animate={{ opacity: 1, scale: 1 }}
// 										className='relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 backdrop-blur-sm'>
// 										<div className='flex items-start gap-4'>
// 											<div className='p-3 bg-amber-500/20 rounded-xl border border-amber-400/30'>
// 												<Mail className='w-6 h-6 text-amber-400' />
// 											</div>
// 											<div className='space-y-4 flex-1'>
// 												<h4 className='text-amber-300 font-semibold text-base'>
// 													Enterprise Video Request
// 												</h4>
// 												<p className='text-gray-300 text-sm leading-relaxed'>
// 													Your video exceeds our standard duration limits. Our
// 													development team can accommodate extended content with
// 													custom pricing and delivery options.
// 												</p>
// 												<motion.button
// 													whileHover={{ scale: 1.05 }}
// 													whileTap={{ scale: 0.95 }}
// 													className='bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 px-4 py-2.5 rounded-lg border border-amber-500/40 hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-200 flex items-center gap-2 font-medium text-sm'>
// 													<Mail className='w-4 h-4' />
// 													Contact Enterprise Team
// 												</motion.button>
// 											</div>
// 										</div>
// 									</motion.div>
// 								)}

// 								{/* Enhanced File Upload Section */}
// 								{formData.type && formData.type !== 'Text' && (
// 									<motion.div variants={itemVariants} className='space-y-4'>
// 										<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 											<Upload className='w-4 h-4 text-purple-400' />
// 											Media Asset Upload
// 											{errors.adResource && (
// 												<motion.span
// 													initial={{ opacity: 0, x: 10 }}
// 													animate={{ opacity: 1, x: 0 }}
// 													className='text-red-400 text-xs font-medium flex items-center gap-1 bg-red-500/15 px-3 py-1.5 rounded-lg border border-red-500/30 ml-auto'>
// 													<AlertTriangle className='w-3 h-3' />
// 													{errors.adResource}
// 												</motion.span>
// 											)}
// 										</label>

// 										<motion.div
// 											className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden ${
// 												dragActive
// 													? 'border-purple-400/70 bg-gradient-to-br from-purple-900/30 to-purple-800/20 shadow-xl shadow-purple-500/20'
// 													: formData.adResource
// 														? `border-${mediaTypeInfo.color.split('-')[1]}-400/50 bg-gradient-to-br ${mediaTypeInfo.gradientFrom} ${mediaTypeInfo.gradientTo}`
// 														: 'border-slate-600/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 hover:border-purple-500/50 hover:from-purple-900/20 hover:to-purple-800/10'
// 											} group cursor-pointer`}
// 											whileHover={{ scale: 1.01 }}
// 											onDragEnter={handleDrag}
// 											onDragLeave={handleDrag}
// 											onDragOver={handleDrag}
// 											onDrop={handleDrop}
// 											onClick={handleButtonClick}>
// 											<div className='p-8'>
// 												{formData.adResource ? (
// 													// File uploaded state
// 													<div className='space-y-6'>
// 														<div className='flex items-center justify-center'>
// 															<motion.div
// 																initial={{ scale: 0 }}
// 																animate={{ scale: 1 }}
// 																className={`p-4 ${mediaTypeInfo.bgColor} rounded-2xl border ${mediaTypeInfo.borderColor} shadow-lg`}>
// 																{mediaTypeInfo.icon}
// 															</motion.div>
// 														</div>

// 														<div className='text-center space-y-3'>
// 															<h4 className='text-white font-semibold text-lg'>
// 																Asset Ready
// 															</h4>
// 															<p
// 																className={`${mediaTypeInfo.color} text-sm font-medium truncate max-w-md mx-auto`}>
// 																{formData.adResource.name}
// 															</p>

// 															<div className='flex items-center justify-center gap-6 text-sm'>
// 																<div className='flex items-center gap-2 text-gray-300'>
// 																	<div className='w-2 h-2 bg-gray-400 rounded-full' />
// 																	<span>
// 																		{formatFileSize(formData.adResource.size)}
// 																	</span>
// 																</div>
// 																{videoDuration && (
// 																	<div
// 																		className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
// 																			videoDuration > 60
// 																				? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
// 																				: 'bg-green-500/20 text-green-400 border border-green-500/30'
// 																		}`}>
// 																		<Clock className='w-4 h-4' />
// 																		<span className='font-medium'>
// 																			{formatDuration(videoDuration)}
// 																		</span>
// 																	</div>
// 																)}
// 															</div>
// 														</div>

// 														{/* Media Preview */}
// 														{previewUrl && formData.type === 'Poster' && (
// 															<motion.div
// 																initial={{ opacity: 0, y: 10 }}
// 																animate={{ opacity: 1, y: 0 }}
// 																className='bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50 max-h-48'>
// 																<img
// 																	src={previewUrl}
// 																	alt='Preview'
// 																	className='w-full h-full object-cover'
// 																/>
// 															</motion.div>
// 														)}

// 														<motion.button
// 															whileHover={{ scale: 1.05 }}
// 															whileTap={{ scale: 0.95 }}
// 															className='mx-auto block text-white text-sm font-medium px-6 py-3 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600/50 shadow-lg transition-all'>
// 															Change Asset
// 														</motion.button>
// 													</div>
// 												) : (
// 													// Upload prompt state
// 													<div className='text-center space-y-6'>
// 														<motion.div
// 															animate={
// 																dragActive
// 																	? { scale: 1.1, rotate: 5 }
// 																	: { scale: 1, rotate: 0 }
// 															}
// 															className={`mx-auto p-6 rounded-2xl border-2 transition-all duration-300 ${
// 																dragActive
// 																	? 'bg-purple-600/30 border-purple-400/70 shadow-lg shadow-purple-500/30'
// 																	: 'bg-slate-700/40 border-slate-600/50 group-hover:border-purple-400/50 group-hover:bg-purple-600/20'
// 															}`}>
// 															<CloudUpload
// 																className={`w-10 h-10 mx-auto transition-all duration-300 ${
// 																	dragActive
// 																		? 'text-purple-300'
// 																		: 'text-gray-300 group-hover:text-purple-400'
// 																}`}
// 															/>
// 														</motion.div>

// 														<div className='space-y-3'>
// 															<h4 className='text-white text-lg font-semibold'>
// 																{dragActive
// 																	? 'Drop your file here'
// 																	: `Upload ${formData.type}`}
// 															</h4>
// 															<p className='text-gray-400 text-sm max-w-sm mx-auto leading-relaxed'>
// 																{dragActive
// 																	? 'Release to upload your media asset'
// 																	: `Drag and drop your ${formData.type.toLowerCase()} file or click to browse from your device`}
// 															</p>
// 														</div>

// 														<motion.div
// 															whileHover={{ scale: 1.05 }}
// 															whileTap={{ scale: 0.95 }}
// 															className='inline-flex items-center gap-3 text-white text-sm font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-xl hover:shadow-purple-500/30 transition-all'>
// 															<CloudUpload className='w-5 h-5' />
// 															<span>Select {formData.type}</span>
// 														</motion.div>
// 													</div>
// 												)}
// 											</div>

// 											<input
// 												type='file'
// 												name='adResource'
// 												onChange={handleFileChange}
// 												className='hidden'
// 												id='file-upload'
// 												ref={fileInputRef}
// 												accept={
// 													formData.type === 'Video'
// 														? 'video/*'
// 														: formData.type === 'Poster'
// 															? 'image/*'
// 															: formData.type === 'Audio File'
// 																? 'audio/*'
// 																: '*/*'
// 												}
// 											/>
// 										</motion.div>
// 									</motion.div>
// 								)}

// 								{/* Enhanced Pricing & Duration */}
// 								<motion.div
// 									className='grid grid-cols-1 lg:grid-cols-2 gap-6'
// 									variants={itemVariants}>
// 									{/* Cost per view */}
// 									<div className='space-y-3'>
// 										<div className='flex items-center justify-between'>
// 											<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 												<DollarSign className='w-4 h-4 text-purple-400' />
// 												Cost Per Engagement
// 											</label>
// 											{errors.costPerView && (
// 												<motion.span
// 													initial={{ opacity: 0, x: 10 }}
// 													animate={{ opacity: 1, x: 0 }}
// 													className='text-red-400 text-xs font-medium flex items-center gap-1 bg-red-500/15 px-3 py-1.5 rounded-lg border border-red-500/30'>
// 													<AlertTriangle className='w-3 h-3' />
// 													{errors.costPerView}
// 												</motion.span>
// 											)}
// 										</div>
// 										<div className='relative group'>
// 											<div
// 												className={`relative ${
// 													errors.costPerView
// 														? 'border-red-400/60 shadow-red-500/20 shadow-lg'
// 														: 'border-slate-600/50 group-focus-within:border-purple-400/70 group-focus-within:shadow-purple-500/25 group-focus-within:shadow-lg'
// 												} bg-gradient-to-br from-slate-800/80 to-slate-800/60 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden flex items-center`}>
// 												<div className='p-4 border-r border-slate-700/50 bg-slate-700/30'>
// 													<DollarSign className='w-5 h-5 text-green-400' />
// 												</div>
// 												<input
// 													name='costPerView'
// 													placeholder='0.25'
// 													value={formData.costPerView}
// 													onChange={handleChange}
// 													className='bg-transparent flex-1 p-4 text-white placeholder-gray-400 outline-none transition-all font-medium'
// 												/>
// 												<div className='p-4 text-gray-400 text-sm border-l border-slate-700/50'>
// 													per view
// 												</div>
// 												<div className='absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/3 to-purple-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300' />
// 											</div>
// 										</div>
// 									</div>

// 									{/* Campaign duration */}
// 									<div className='space-y-3'>
// 										<div className='flex items-center justify-between'>
// 											<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 												<Calendar className='w-4 h-4 text-purple-400' />
// 												Campaign Duration
// 											</label>
// 											{errors.numberOfDaysRunning && (
// 												<motion.span
// 													initial={{ opacity: 0, x: 10 }}
// 													animate={{ opacity: 1, x: 0 }}
// 													className='text-red-400 text-xs font-medium flex items-center gap-1 bg-red-500/15 px-3 py-1.5 rounded-lg border border-red-500/30'>
// 													<AlertTriangle className='w-3 h-3' />
// 													{errors.numberOfDaysRunning}
// 												</motion.span>
// 											)}
// 										</div>
// 										<div className='relative group'>
// 											<div
// 												className={`relative ${
// 													errors.numberOfDaysRunning
// 														? 'border-red-400/60 shadow-red-500/20 shadow-lg'
// 														: 'border-slate-600/50 group-focus-within:border-purple-400/70 group-focus-within:shadow-purple-500/25 group-focus-within:shadow-lg'
// 												} bg-gradient-to-br from-slate-800/80 to-slate-800/60 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden flex items-center`}>
// 												<input
// 													name='numberOfDaysRunning'
// 													placeholder='30'
// 													value={formData.numberOfDaysRunning}
// 													onChange={handleChange}
// 													className='bg-transparent flex-1 p-4 text-white placeholder-gray-400 outline-none transition-all font-medium'
// 												/>
// 												<div className='p-4 border-l border-slate-700/50 bg-slate-700/30'>
// 													<Calendar className='w-5 h-5 text-purple-400' />
// 												</div>
// 												<div className='p-4 text-gray-400 text-sm border-l border-slate-700/50'>
// 													days
// 												</div>
// 												<div className='absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/3 to-purple-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300' />
// 											</div>
// 										</div>
// 									</div>
// 								</motion.div>

// 								{/* Enhanced Video Preview */}
// 								{formData.adResource &&
// 									formData.type === 'Video' &&
// 									formData.adResource.type?.startsWith('video/') && (
// 										<motion.div
// 											variants={itemVariants}
// 											className='space-y-4'
// 											initial={{ opacity: 0, y: 20 }}
// 											animate={{ opacity: 1, y: 0 }}
// 											transition={{ duration: 0.5 }}>
// 											<label className='text-gray-200 text-sm font-semibold flex items-center gap-2'>
// 												<Play className='w-4 h-4 text-blue-400' />
// 												Video Preview
// 											</label>
// 											<div className='relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/40 shadow-xl group'>
// 												<video
// 													ref={videoRef}
// 													src={previewUrl || ''}
// 													controls
// 													className='w-full max-h-72 bg-slate-900'
// 													preload='metadata'
// 												/>
// 												<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-transparent p-4 pt-8'>
// 													<div className='flex items-center justify-between'>
// 														<div className='space-y-1'>
// 															<span className='text-white font-medium text-sm block truncate max-w-xs'>
// 																{formData.adResource.name}
// 															</span>
// 															<span className='text-gray-400 text-xs'>
// 																{formatFileSize(formData.adResource.size)}
// 															</span>
// 														</div>
// 														{videoDuration && (
// 															<div
// 																className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
// 																	videoDuration > 60
// 																		? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
// 																		: 'bg-green-500/30 text-green-300 border border-green-500/50'
// 																} backdrop-blur-sm`}>
// 																<Clock className='w-4 h-4' />
// 																<span>{formatDuration(videoDuration)}</span>
// 															</div>
// 														)}
// 													</div>
// 												</div>
// 											</div>
// 										</motion.div>
// 									)}

// 								{/* Enhanced Campaign Summary */}
// 								<motion.div
// 									variants={itemVariants}
// 									className='relative overflow-hidden bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-700/60 rounded-2xl p-6 border border-slate-600/40 shadow-xl backdrop-blur-sm'>
// 									<div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full -translate-y-16 translate-x-16' />

// 									<div className='relative space-y-5'>
// 										<div className='flex items-center gap-3 pb-4 border-b border-slate-700/50'>
// 											<div className='p-2 bg-green-500/20 rounded-lg border border-green-500/30'>
// 												<CheckCircle className='w-5 h-5 text-green-400' />
// 											</div>
// 											<h4 className='text-white font-semibold text-lg'>
// 												Campaign Overview
// 											</h4>
// 										</div>

// 										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 											{[
// 												{
// 													label: 'Campaign Name',
// 													value: formData.adName || 'Not specified',
// 													icon: <Target className='w-4 h-4' />,
// 													color: 'text-purple-400',
// 												},
// 												{
// 													label: 'Media Format',
// 													value: formData.type || 'Not selected',
// 													icon: mediaTypeInfo.icon,
// 													color: mediaTypeInfo.color,
// 												},
// 												{
// 													label: 'Campaign Duration',
// 													value: `${formData.numberOfDaysRunning || '0'} days`,
// 													icon: <Calendar className='w-4 h-4' />,
// 													color: 'text-blue-400',
// 												},
// 												{
// 													label: 'Cost Per View',
// 													value: `${formData.costPerView || '0.00'}`,
// 													icon: <DollarSign className='w-4 h-4' />,
// 													color: 'text-green-400',
// 												},
// 											].map((item, index) => (
// 												<motion.div
// 													key={index}
// 													className='flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/30 hover:bg-slate-800/70 transition-all duration-200'
// 													whileHover={{ scale: 1.02 }}>
// 													<div
// 														className={`p-2 rounded-lg bg-slate-700/50 ${item.color}`}>
// 														{item.icon}
// 													</div>
// 													<div className='flex-1'>
// 														<span className='text-gray-400 text-xs font-medium uppercase tracking-wide block'>
// 															{item.label}
// 														</span>
// 														<p className='text-white font-semibold text-sm mt-1'>
// 															{item.value}
// 														</p>
// 													</div>
// 												</motion.div>
// 											))}
// 										</div>

// 										{/* Estimated reach */}
// 										{formData.costPerView && formData.numberOfDaysRunning && (
// 											<motion.div
// 												initial={{ opacity: 0, y: 10 }}
// 												animate={{ opacity: 1, y: 0 }}
// 												className='mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20'>
// 												<div className='flex items-center gap-3'>
// 													<Eye className='w-5 h-5 text-purple-400' />
// 													<div>
// 														<span className='text-purple-300 text-sm font-semibold block'>
// 															Estimated Daily Budget
// 														</span>
// 														<span className='text-gray-300 text-xs'>
// 															Based on ${formData.costPerView}/view for{' '}
// 															{formData.numberOfDaysRunning} days
// 														</span>
// 													</div>
// 												</div>
// 											</motion.div>
// 										)}
// 									</div>
// 								</motion.div>
// 							</motion.div>
// 						)}
// 					</AnimatePresence>

// 					{/* Enhanced Footer Navigation */}
// 					<motion.div variants={itemVariants} className='px-8 pb-8'>
// 						<DialogFooter className='flex justify-between gap-4'>
// 							{currentStep === 1 ? (
// 								<>
// 									<motion.button
// 										whileHover={{ scale: 1.02 }}
// 										whileTap={{ scale: 0.98 }}
// 										onClick={() => setShowDialog(false)}
// 										className='px-6 py-3 rounded-xl bg-slate-800/80 text-gray-300 hover:bg-slate-700/90 hover:text-white transition-all duration-200 flex items-center gap-2 font-medium border border-slate-700/50 hover:border-slate-600/70 shadow-lg'>
// 										<X className='w-4 h-4' />
// 										<span>Cancel</span>
// 									</motion.button>
// 									<motion.button
// 										whileHover={{
// 											scale: 1.02,
// 											boxShadow: '0 8px 25px -8px rgba(168, 85, 247, 0.6)',
// 										}}
// 										whileTap={{ scale: 0.98 }}
// 										onClick={goToNextStep}
// 										disabled={!isStepOneValid()}
// 										className='px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 font-semibold shadow-xl disabled:shadow-none relative overflow-hidden'>
// 										<span>Continue Setup</span>
// 										<ArrowRight className='w-5 h-5' />
// 										{!isStepOneValid() && (
// 											<div className='absolute inset-0 bg-slate-900/20' />
// 										)}
// 									</motion.button>
// 								</>
// 							) : (
// 								<>
// 									<motion.button
// 										whileHover={{ scale: 1.02 }}
// 										whileTap={{ scale: 0.98 }}
// 										onClick={goToPreviousStep}
// 										className='px-6 py-3 rounded-xl bg-slate-800/80 text-gray-300 hover:bg-slate-700/90 hover:text-white transition-all duration-200 flex items-center gap-2 font-medium border border-slate-700/50 hover:border-slate-600/70 shadow-lg'>
// 										<ArrowLeft className='w-4 h-4' />
// 										<span>Back to Details</span>
// 									</motion.button>
// 									<motion.button
// 										whileHover={{
// 											scale:
// 												isSubmitting || (videoDuration && videoDuration > 60)
// 													? 1
// 													: 1.02,
// 											boxShadow:
// 												isSubmitting || (videoDuration && videoDuration > 60)
// 													? 'none'
// 													: '0 8px 25px -8px rgba(168, 85, 247, 0.6)',
// 										}}
// 										whileTap={{
// 											scale:
// 												isSubmitting || (videoDuration && videoDuration > 60)
// 													? 1
// 													: 0.98,
// 										}}
// 										disabled={
// 											isSubmitDisabled ||
// 											isSubmitting ||
// 											(videoDuration && videoDuration > 60)
// 										}
// 										onClick={handleCreateAd}
// 										className='px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 font-semibold shadow-xl disabled:shadow-none relative overflow-hidden min-w-[180px] justify-center'>
// 										{isSubmitting ? (
// 											<>
// 												<motion.div
// 													animate={{ rotate: 360 }}
// 													transition={{
// 														duration: 1,
// 														repeat: Infinity,
// 														ease: 'linear',
// 													}}
// 													className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
// 												/>
// 												<span>Launching...</span>
// 											</>
// 										) : videoDuration && videoDuration > 60 ? (
// 											<>
// 												<AlertTriangle className='w-5 h-5 text-amber-300' />
// 												<span>Duration Exceeded</span>
// 											</>
// 										) : (
// 											<>
// 												<Sparkles className='w-5 h-5' />
// 												<span>Launch Campaign</span>
// 											</>
// 										)}

// 										{isSubmitting && (
// 											<div className='absolute inset-0 bg-gradient-to-r from-purple-600/40 to-purple-700/40 flex items-center justify-center'>
// 												<motion.div
// 													animate={{
// 														scale: [1, 1.2, 1],
// 														opacity: [0.5, 1, 0.5],
// 													}}
// 													transition={{
// 														duration: 2,
// 														repeat: Infinity,
// 														ease: 'easeInOut',
// 													}}
// 													className='w-8 h-8 rounded-full bg-white/20'
// 												/>
// 											</div>
// 										)}
// 									</motion.button>
// 								</>
// 							)}
// 						</DialogFooter>
// 					</motion.div>
// 				</motion.div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };
