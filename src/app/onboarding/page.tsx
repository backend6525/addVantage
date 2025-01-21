'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ArrowRight,
	ArrowLeft,
	Building2,
	UserCircle,
	Briefcase,
	CheckCircle,
	ChevronRight,
	Rocket,
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

const steps: Step[] = [
	{
		title: 'Business Type',
		description: 'Choose Your Path',
		details:
			'Select the business model that best describes your organization. This helps us tailor the experience to your needs.',
		icon: Building2,
		content: (
			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<OptionCard
					title='Software as a Service'
					description='Cloud-based software solutions delivered on a subscription basis. Perfect for recurring revenue models.'
					value='saas'
					className='bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20'
				/>
				<OptionCard
					title='Infrastructure as a Service'
					description='Scalable cloud infrastructure resources. Ideal for businesses requiring flexible computing power.'
					value='iaas'
					className='bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20'
				/>
				<OptionCard
					title='Platform as a Service'
					description='Complete development and deployment environment in the cloud. Best for application developers.'
					value='paas'
					className='bg-gradient-to-br from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20'
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
		content: <ProfileForm />,
	},
	{
		title: 'Business Details',
		description: 'Your Business Identity',
		details:
			'Provide information about your business to help us better understand your needs and goals.',
		icon: Briefcase,
		content: (
			<div className='space-y-6 animate-in'>
				<div className='grid md:grid-cols-2 gap-6'>
					{/* Business Details Form - To be implemented */}
					<div className='p-6 rounded-xl bg-gray-800/50 border border-gray-700'>
						<h3 className='text-lg font-semibold mb-4'>Coming Soon</h3>
						<p className='text-gray-400'>
							Business details form will be available shortly.
						</p>
					</div>
				</div>
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

const OnboardingProcess: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const nextStep = () =>
		setCurrentStep((prev) => Math.min(prev + 1, steps.length));
	const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900'>
			<div className='container mx-auto px-4 py-12'>
				{/* Welcome Banner */}
				<div className='text-center mb-12'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<Rocket className='w-8 h-8 text-purple-400 animate-pulse' />
						<h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400'>
							Welcome to AdZPay
						</h1>
					</div>
					<p className='text-gray-400 max-w-2xl mx-auto'>
						Lets get your account set up and ready to go. This will only take a
						few minutes.
					</p>
				</div>

				{/* Progress Steps */}
				<div className='max-w-5xl mx-auto mb-12'>
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
				<div className='max-w-5xl mx-auto'>
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

								<button
									onClick={nextStep}
									className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all duration-300 ${
										currentStep === steps.length ? 'hidden' : ''
									}`}>
									{currentStep === steps.length ? 'Complete' : 'Continue'}
									<ChevronRight className='w-5 h-5' />
								</button>

								{currentStep === steps.length && (
									<button
										onClick={() => {
											// Handle completion
										}}
										className='flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-300'>
										Get Started
										<Rocket className='w-5 h-5' />
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
