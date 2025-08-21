import React, { ReactElement, ElementType, ReactNode } from 'react';
import {
	UserCircle,
	Sparkles,
	Heart,
	Zap,
	Star,
	Globe,
	Trophy,
	Rocket,
	Instagram,
	Twitter,
	Facebook,
	Youtube,
	Linkedin,
	SkipForward,
	Target,
	Users,
	Briefcase,
	Building2,
	CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import OptionCard from '../../components/ui/Cards/OptionCard';
import ProfileForm from '../../components/ui/Cards/ProfileForm';

interface Step {
	title: string;
	description: string;
	details: string;
	icon: React.ElementType;
	content: React.ReactNode;
	celebrationIcon?: React.ElementType;
}

interface StepProps {
	currentStep: number;
	userType: 'influencer' | 'business' | null;
	selectedPlatforms: string[];
	selectedCategories: string[];
	userData: any;
	isLoadingUserData: boolean;
	completedSteps: number[];
	markStepComplete: (step: number) => void;
	setUserType: (type: 'influencer' | 'business' | null) => void;
	setSelectedPlatforms: (platforms: string[]) => void;
	setSelectedCategories: (categories: string[]) => void;
	setCurrentStep: (step: number) => void;
}

// Social platforms data
const socialPlatforms = [
	{
		name: 'Instagram',
		icon: Instagram,
		color: 'from-pink-500 to-purple-500',
		bgColor: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20',
		description: 'Visual content & stories',
	},
	{
		name: 'Twitter',
		icon: Twitter,
		color: 'from-blue-400 to-blue-600',
		bgColor: 'bg-gradient-to-br from-blue-400/20 to-blue-600/20',
		description: 'Real-time updates',
	},
	{
		name: 'Facebook',
		icon: Facebook,
		color: 'from-blue-600 to-blue-800',
		bgColor: 'bg-gradient-to-br from-blue-600/20 to-blue-800/20',
		description: 'Community engagement',
	},
	{
		name: 'YouTube',
		icon: Youtube,
		color: 'from-red-500 to-red-700',
		bgColor: 'bg-gradient-to-br from-red-500/20 to-red-700/20',
		description: 'Video content',
	},
	{
		name: 'LinkedIn',
		icon: Linkedin,
		color: 'from-blue-700 to-blue-900',
		bgColor: 'bg-gradient-to-br from-blue-700/20 to-blue-900/20',
		description: 'Professional network',
	},
];

// Content categories data
const contentCategories = [
	{
		name: 'Lifestyle',
		icon: Heart,
		description: 'Daily life & personal brand',
	},
	{
		name: 'Technology',
		icon: Zap,
		description: 'Tech reviews & innovations',
	},
	{
		name: 'Fashion',
		icon: Star,
		description: 'Style & fashion trends',
	},
	{
		name: 'Food & Dining',
		icon: Target,
		description: 'Culinary experiences',
	},
	{
		name: 'Travel',
		icon: Globe,
		description: 'Adventures & destinations',
	},
	{
		name: 'Fitness & Health',
		icon: Trophy,
		description: 'Wellness & fitness',
	},
];

export const steps = (props: StepProps): Step[] => [
	{
		title: 'Role Selection',
		description: 'Choose Your Journey',
		details:
			'Are you here to monetize your influence or amplify your brand? Your path determines your experience.',
		icon: UserCircle,
		celebrationIcon: Sparkles,
		content: (
			<div className='grid md:grid-cols-2 gap-8'>
				<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
					<OptionCard
						title='Content Creator'
						description='Transform your passion into profit. Connect with brands, showcase your creativity, and build your empire.'
						value='influencer'
						onClick={() => {
							props.setUserType('influencer');
							props.markStepComplete(1);
						}}
						className='bg-gradient-to-br from-purple-500/15 to-pink-500/15 hover:from-purple-500/25 hover:to-pink-500/25 border-purple-500/20 hover:border-purple-500/40'
						selected={props.userType === 'influencer'}
					/>
				</motion.div>
				<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
					<OptionCard
						title='Brand Partner'
						description='Discover authentic voices for your brand. Launch campaigns that resonate and drive real results.'
						value='business'
						onClick={() => {
							props.setUserType('business');
							props.markStepComplete(1);
						}}
						className='bg-gradient-to-br from-blue-500/15 to-cyan-500/15 hover:from-blue-500/25 hover:to-cyan-500/25 border-blue-500/20 hover:border-blue-500/40'
						selected={props.userType === 'business'}
					/>
				</motion.div>
			</div>
		),
	},
	{
		title: 'Your Profile',
		description: 'Tell Your Story',
		details:
			'Share the essentials that make you unique. This helps us personalize your experience and connect you with the right opportunities.',
		icon: UserCircle,
		celebrationIcon: Heart,
		content: props.isLoadingUserData ? (
			<div className='flex justify-center items-center h-64'>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
					className='w-12 h-12 border-t-2 border-b-2 border-purple-400 rounded-full'
				/>
			</div>
		) : (
			<ProfileForm
				userType={props.userType || 'influencer'}
				selectedPlatforms={props.selectedPlatforms}
				onPlatformSelect={(platform: string) => {
					const newPlatforms = props.selectedPlatforms.includes(platform)
						? props.selectedPlatforms.filter((p) => p !== platform)
						: [...props.selectedPlatforms, platform];
					props.setSelectedPlatforms(newPlatforms);
				}}
				userData={props.userData}
				onSubmit={async (formData) => {
					// Handle form submission in parent component
					props.markStepComplete(2);
					props.setCurrentStep(Math.min(props.currentStep + 1, 5));
				}}
			/>
		),
	},
	{
		title: 'Digital Presence',
		description: 'Where You Shine',
		details:
			'Select your active platforms to showcase your reach and help us understand where your audience engages most.',
		icon: Globe,
		celebrationIcon: Zap,
		content: (
			<div className='space-y-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{socialPlatforms.map((platform) => (
						<motion.button
							key={platform.name}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => {
								const newPlatforms = props.selectedPlatforms.includes(
									platform.name
								)
									? props.selectedPlatforms.filter((p) => p !== platform.name)
									: [...props.selectedPlatforms, platform.name];

								props.setSelectedPlatforms(newPlatforms);

								if (
									newPlatforms.length > 0 &&
									!props.completedSteps.includes(3)
								) {
									props.markStepComplete(3);
								}
							}}
							className={`group relative overflow-hidden p-6 rounded-2xl border-2 transition-all duration-300 ${
								props.selectedPlatforms.includes(platform.name)
									? `border-purple-400 ${platform.bgColor} shadow-lg shadow-purple-500/20`
									: 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
							}`}>
							<div className='flex flex-col items-center gap-4'>
								<div
									className={`p-3 rounded-xl ${
										props.selectedPlatforms.includes(platform.name)
											? 'bg-white/10'
											: 'bg-gray-700/50'
									}`}>
									<platform.icon
										className={`w-8 h-8 transition-colors ${
											props.selectedPlatforms.includes(platform.name)
												? 'text-white'
												: 'text-gray-400 group-hover:text-gray-300'
										}`}
									/>
								</div>
								<div className='text-center'>
									<span className='font-semibold text-white block'>
										{platform.name}
									</span>
									<span className='text-sm text-gray-400 mt-1'>
										{platform.description}
									</span>
								</div>
								{props.selectedPlatforms.includes(platform.name) && (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className='absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center'>
										<CheckCircle className='w-4 h-4 text-white' />
									</motion.div>
								)}
							</div>
						</motion.button>
					))}
				</div>
				<div className='flex justify-center'>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => props.setCurrentStep(props.currentStep + 1)}
						className='flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors bg-gray-800/50 px-6 py-3 rounded-xl border border-gray-600 hover:border-purple-500/50'>
						<SkipForward className='w-5 h-5' />
						<span>Continue without platforms</span>
					</motion.button>
				</div>
			</div>
		),
	},
	{
		title: props.userType === 'influencer' ? 'Content Focus' : 'Brand Focus',
		description:
			props.userType === 'influencer'
				? 'Your Creative Niches'
				: 'Your Market Space',
		details:
			props.userType === 'influencer'
				? 'What topics ignite your creativity? Select your content focus areas to attract the right brand partnerships.'
				: 'Which industries align with your brand? This helps us match you with relevant creators and opportunities.',
		icon: Target,
		celebrationIcon: Star,
		content: (
			<div className='space-y-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{contentCategories.map((category) => (
						<motion.button
							key={category.name}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							onClick={() => {
								const newCategories = props.selectedCategories.includes(
									category.name
								)
									? props.selectedCategories.filter((c) => c !== category.name)
									: [...props.selectedCategories, category.name];

								props.setSelectedCategories(newCategories);

								if (
									newCategories.length > 0 &&
									!props.completedSteps.includes(4)
								) {
									props.markStepComplete(4);
								}
							}}
							className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
								props.selectedCategories.includes(category.name)
									? 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20'
									: 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-700/30'
							}`}>
							<div className='flex flex-col items-center gap-4'>
								<div
									className={`p-3 rounded-xl ${
										props.selectedCategories.includes(category.name)
											? 'bg-white/10'
											: 'bg-gray-700/50'
									}`}>
									<category.icon
										className={`w-8 h-8 transition-colors ${
											props.selectedCategories.includes(category.name)
												? 'text-purple-300'
												: 'text-gray-400 group-hover:text-gray-300'
										}`}
									/>
								</div>
								<div className='text-center'>
									<span className='font-semibold text-white block'>
										{category.name}
									</span>
									<span className='text-sm text-gray-400 mt-1'>
										{category.description}
									</span>
								</div>
								{props.selectedCategories.includes(category.name) && (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className='absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center'>
										<CheckCircle className='w-4 h-4 text-white' />
									</motion.div>
								)}
							</div>
							<div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-600/10 to-pink-600/10' />
						</motion.button>
					))}
				</div>
			</div>
		),
	},
	{
		title: 'Launch Ready',
		description: 'Your Journey Begins',
		details:
			"Everything is set up perfectly! You're ready to dive into your dashboard and start exploring opportunities.",
		icon: Rocket,
		celebrationIcon: Trophy,
		content: (
			<div className='space-y-8'>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/30 relative overflow-hidden'>
					<div className='relative z-10'>
						<div className='text-center mb-6'>
							<motion.div
								animate={{
									rotate: [0, 10, -10, 10, 0],
									scale: [1, 1.1, 1, 1.1, 1],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatDelay: 3,
								}}
								className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
								<Trophy className='w-8 h-8 text-white' />
							</motion.div>
							<h3 className='text-2xl font-bold text-white mb-2'>
								🎉 Welcome to the AdzPay Family!
							</h3>
							<p className='text-gray-300 text-lg'>
								You&apos;re all set to{' '}
								{props.userType === 'influencer'
									? 'start earning from your content'
									: 'launch powerful campaigns'}
							</p>
						</div>

						<div className='grid md:grid-cols-3 gap-4 text-center'>
							<div className='bg-white/5 p-4 rounded-xl'>
								<Users className='w-8 h-8 text-purple-400 mx-auto mb-2' />
								<p className='text-sm text-gray-300'>
									Connect with{' '}
									{props.userType === 'influencer'
										? 'top brands'
										: 'amazing creators'}
								</p>
							</div>
							<div className='bg-white/5 p-4 rounded-xl'>
								<Target className='w-8 h-8 text-pink-400 mx-auto mb-2' />
								<p className='text-sm text-gray-300'>
									Access premium opportunities
								</p>
							</div>
							<div className='bg-white/5 p-4 rounded-xl'>
								<Zap className='w-8 h-8 text-blue-400 mx-auto mb-2' />
								<p className='text-sm text-gray-300'>
									Start earning immediately
								</p>
							</div>
						</div>
					</div>

					{/* Background decoration */}
					<div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -translate-y-16 translate-x-16' />
					<div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full translate-y-12 -translate-x-12' />
				</motion.div>
			</div>
		),
	},
];
