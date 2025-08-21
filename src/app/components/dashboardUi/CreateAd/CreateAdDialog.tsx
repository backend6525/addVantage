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
