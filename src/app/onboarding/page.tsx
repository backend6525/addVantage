'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { steps } from './components/OnboardingSteps';
import OnboardingNavigation from './components/OnboardingNavigation';
import CelebrationEffects from './components/CelebrationEffects';
import ProgressSteps from './ProgressSteps';
import WelcomeBanner from './WelcomeBanner';
import ParticlesBackground from './ParticlesBackground';
import MotivationMessage from './MotivationMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

const OnboardingProcess: React.FC = () => {
	const router = useRouter();
	const convex = useConvex();
	const [currentStep, setCurrentStep] = useState(1);
	const [userType, setUserType] = useState<'influencer' | 'business' | null>(
		null
	);
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<any>(null);
	const [isLoadingUserData, setIsLoadingUserData] = useState(true);
	const [showCelebration, setShowCelebration] = useState(false);
	const [completedSteps, setCompletedSteps] = useState<number[]>([]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoadingUserData(true);
				const response = await fetch('/api/auth/user');
				if (!response.ok) throw new Error('Failed to fetch user data');

				const data = await response.json();
				const userDataObj = data?.data || data;

				if (userDataObj) {
					setUserData(userDataObj);
					if (userDataObj._id)
						sessionStorage.setItem('userId', userDataObj._id);
					if (userDataObj.email)
						sessionStorage.setItem('userEmail', userDataObj.email);
					if (userDataObj.userType) {
						setUserType(userDataObj.userType);
						markStepComplete(1);
					}
					if (userDataObj.platforms) {
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

	useEffect(() => {
		const saveUserData = async () => {
			if (!userData?._id) return;
			try {
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

	const markStepComplete = (stepIndex: number) => {
		if (!completedSteps.includes(stepIndex)) {
			setCompletedSteps((prev) => [...prev, stepIndex]);
			setShowCelebration(true);
			setTimeout(() => setShowCelebration(false), 2000);
		}
	};

	const handleComplete = async () => {
		try {
			setIsLoading(true);
			const userId = sessionStorage.getItem('userId') || userData?._id;
			if (!userId) throw new Error('No user ID found');

			await convex.mutation(api.user.completeOnboarding, { userId });
			sessionStorage.setItem('onboardingCompleted', 'true');
			markStepComplete(5);

			setTimeout(() => router.push('/dashboard'), 1500);
		} catch (error) {
			console.error('Error completing onboarding:', error);
			alert('Failed to complete onboarding. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const stepProps = {
		currentStep,
		userType,
		selectedPlatforms,
		selectedCategories,
		userData,
		isLoadingUserData,
		completedSteps,
		markStepComplete,
		setUserType,
		setSelectedPlatforms,
		setSelectedCategories,
		setCurrentStep,
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 relative overflow-hidden'>
			<CelebrationEffects show={showCelebration} />
			<ParticlesBackground />

			<div className='container mx-auto px-4 py-12 relative z-10'>
				<WelcomeBanner />
				<ProgressSteps
					currentStep={currentStep}
					completedSteps={completedSteps}
					steps={steps(stepProps)}
				/>

				<div className='max-w-5xl mx-auto'>
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, y: 30, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -30, scale: 0.95 }}
						transition={{ duration: 0.4, type: 'spring' }}
						className='bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-10 shadow-2xl relative overflow-hidden'>
						<div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-20 translate-x-20' />
						<div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full translate-y-16 -translate-x-16' />

						<div className='relative z-10'>
							{steps(stepProps)[currentStep - 1].content}

							<OnboardingNavigation
								currentStep={currentStep}
								steps={steps(stepProps)}
								userType={userType}
								isLoading={isLoading}
								onNext={() =>
									setCurrentStep((prev) =>
										Math.min(prev + 1, steps(stepProps).length)
									)
								}
								onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
								onComplete={handleComplete}
							/>
						</div>
					</motion.div>
				</div>

				<AnimatePresence>
					{currentStep > 1 && <MotivationMessage currentStep={currentStep} />}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default OnboardingProcess;
