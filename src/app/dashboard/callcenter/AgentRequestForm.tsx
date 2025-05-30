// 'use client';

// import React, { useState } from 'react';
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from '@/components/ui/card';
// import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const AgentRequestForm = () => {
// 	const [currentStep, setCurrentStep] = useState(1);
// 	const [formData, setFormData] = useState({
// 		businessName: '',
// 		industry: '',
// 		agentsRequired: 1,
// 		duration: '1-month',
// 		callVolume: '',
// 		targetMarket: '',
// 		languages: ['English'],
// 		workingHours: '9-5',
// 		specialRequirements: '',
// 	});

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		});
// 	};

// 	const handleNext = () => {
// 		if (currentStep < 4) {
// 			setCurrentStep(currentStep + 1);
// 		}
// 	};

// 	const handlePrevious = () => {
// 		if (currentStep > 1) {
// 			setCurrentStep(currentStep - 1);
// 		}
// 	};

// 	const plans = [
// 		{
// 			name: 'Starter',
// 			agents: '1-2',
// 			price: '$299',
// 			features: [
// 				'Basic Agent Training',
// 				'Up to 100 Calls/Day',
// 				'Email Support',
// 				'Weekly Reports',
// 			],
// 		},
// 		{
// 			name: 'Professional',
// 			agents: '3-5',
// 			price: '$799',
// 			features: [
// 				'Advanced Training',
// 				'Up to 500 Calls/Day',
// 				'24/7 Support',
// 				'Custom Scripts',
// 				'Dedicated Manager',
// 			],
// 		},
// 		{
// 			name: 'Enterprise',
// 			agents: '6+',
// 			price: 'Custom',
// 			features: [
// 				'Elite Training',
// 				'Unlimited Calls',
// 				'Dedicated Manager',
// 				'Custom Integration',
// 				'Advanced Analytics',
// 			],
// 		},
// 	];

// 	const renderStep = () => {
// 		switch (currentStep) {
// 			case 1:
// 				return (
// 					<div className='space-y-4'>
// 						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 							<div className='space-y-2'>
// 								<label className='text-sm font-medium text-gray-700'>
// 									Business Name
// 								</label>
// 								<input
// 									type='text'
// 									name='businessName'
// 									value={formData.businessName}
// 									onChange={handleChange}
// 									className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 									placeholder='Enter your business name'
// 								/>
// 							</div>
// 							<div className='space-y-2'>
// 								<label className='text-sm font-medium text-gray-700'>
// 									Industry
// 								</label>
// 								<select
// 									name='industry'
// 									value={formData.industry}
// 									onChange={handleChange}
// 									className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
// 									<option value=''>Select Industry</option>
// 									<option value='technology'>Technology</option>
// 									<option value='healthcare'>Healthcare</option>
// 									<option value='retail'>Retail</option>
// 									<option value='finance'>Finance</option>
// 									<option value='other'>Other</option>
// 								</select>
// 							</div>
// 						</div>
// 						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 							<div className='space-y-2'>
// 								<label className='text-sm font-medium text-gray-700'>
// 									Target Market
// 								</label>
// 								<input
// 									type='text'
// 									name='targetMarket'
// 									value={formData.targetMarket}
// 									onChange={handleChange}
// 									className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 									placeholder='e.g., Small businesses, Healthcare providers'
// 								/>
// 							</div>
// 							<div className='space-y-2'>
// 								<label className='text-sm font-medium text-gray-700'>
// 									Project Duration
// 								</label>
// 								<select
// 									name='duration'
// 									value={formData.duration}
// 									onChange={handleChange}
// 									className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
// 									<option value='1-month'>1 Month</option>
// 									<option value='3-months'>3 Months</option>
// 									<option value='6-months'>6 Months</option>
// 									<option value='12-months'>12 Months</option>
// 								</select>
// 							</div>
// 						</div>
// 					</div>
// 				);
// 			case 2:
// 				return (
// 					<div className='space-y-4'>
// 						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
// 							<div className='space-y-2'>
// 								<label className='text-sm font-medium text-gray-700'>
// 									Agents Required
// 								</label>
// 								<select
// 									name='agentsRequired'
// 									value={formData.agentsRequired}
// 									onChange={handleChange}
// 									className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
// 									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
// 										<option key={num} value={num}>
// 											{num} Agent{num > 1 ? 's' : ''}
// 										</option>
// 									))}
// 								</select>
// 							</div>
// 							<div className='space-y-2'>
// 								<label className='text-sm font-medium text-gray-700'>
// 									Daily Call Volume
// 								</label>
// 								<input
// 									type='text'
// 									name='callVolume'
// 									value={formData.callVolume}
// 									onChange={handleChange}
// 									className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 									placeholder='Estimated calls per day'
// 								/>
// 							</div>
// 							<div className='space-y-2'>
// 								<label className='text-sm font-medium text-gray-700'>
// 									Working Hours
// 								</label>
// 								<select
// 									name='workingHours'
// 									value={formData.workingHours}
// 									onChange={handleChange}
// 									className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
// 									<option value='9-5'>Standard (9AM-5PM)</option>
// 									<option value='24-7'>24/7 Coverage</option>
// 									<option value='custom'>Custom Hours</option>
// 								</select>
// 							</div>
// 						</div>
// 						<div className='space-y-2'>
// 							<label className='text-sm font-medium text-gray-700'>
// 								Languages Required
// 							</label>
// 							<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
// 								{['English', 'Spanish', 'French', 'German'].map((lang) => (
// 									<div key={lang} className='flex items-center'>
// 										<input
// 											type='checkbox'
// 											id={lang}
// 											checked={formData.languages.includes(lang)}
// 											onChange={(e) => {
// 												if (e.target.checked) {
// 													setFormData({
// 														...formData,
// 														languages: [...formData.languages, lang],
// 													});
// 												} else {
// 													setFormData({
// 														...formData,
// 														languages: formData.languages.filter(
// 															(l) => l !== lang
// 														),
// 													});
// 												}
// 											}}
// 											className='h-4 w-4 text-blue-600 rounded focus:ring-blue-500'
// 										/>
// 										<label
// 											htmlFor={lang}
// 											className='ml-2 text-sm text-gray-700'>
// 											{lang}
// 										</label>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 						<div className='space-y-2'>
// 							<label className='text-sm font-medium text-gray-700'>
// 								Special Requirements
// 							</label>
// 							<textarea
// 								name='specialRequirements'
// 								value={formData.specialRequirements}
// 								onChange={handleChange}
// 								rows={2}
// 								className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 								placeholder='Any specific requirements for your call agents'></textarea>
// 						</div>
// 					</div>
// 				);
// 			case 3:
// 				return (
// 					<div className='space-y-4'>
// 						<div className='bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4'>
// 							<p className='text-sm text-blue-700'>
// 								Based on your requirements, we recommend our{' '}
// 								<span className='font-bold'>Professional Plan</span>.
// 							</p>
// 						</div>
// 						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
// 							{plans.map((plan, index) => (
// 								<Card
// 									key={index}
// 									className={`border ${
// 										plan.name === 'Professional'
// 											? 'border-blue-600 ring-1 ring-blue-100'
// 											: 'border-gray-100'
// 									} shadow-sm`}>
// 									<CardContent className='p-4'>
// 										<div className='space-y-3'>
// 											<div className='flex items-center justify-between'>
// 												<h3 className='font-semibold'>{plan.name}</h3>
// 												{plan.name === 'Professional' && (
// 													<span className='px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full'>
// 														Recommended
// 													</span>
// 												)}
// 											</div>
// 											<div className='space-y-1'>
// 												<div className='text-2xl font-bold'>{plan.price}</div>
// 												<div className='text-xs text-gray-500'>
// 													per month for {plan.agents} Agents
// 												</div>
// 											</div>
// 											<div className='space-y-2'>
// 												{plan.features.map((feature, i) => (
// 													<div key={i} className='flex items-center text-xs'>
// 														<CheckCircle className='h-3 w-3 text-blue-600 mr-2' />
// 														<span className='text-gray-600'>{feature}</span>
// 													</div>
// 												))}
// 											</div>
// 											<Button
// 												onClick={() => setCurrentStep(4)}
// 												className={`w-full text-sm py-1 ${
// 													plan.name === 'Professional'
// 														? 'bg-blue-600 hover:bg-blue-700'
// 														: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// 												}`}>
// 												Select
// 											</Button>
// 										</div>
// 									</CardContent>
// 								</Card>
// 							))}
// 						</div>
// 					</div>
// 				);
// 			case 4:
// 				return (
// 					<div className='space-y-4'>
// 						<div className='bg-green-50 border border-green-100 rounded-lg p-4'>
// 							<h3 className='text-base font-semibold text-green-800 mb-2'>
// 								Complete Your Request
// 							</h3>
// 							<p className='text-sm text-green-700 mb-4'>
// 								Well reach out shortly with your custom solution details.
// 							</p>
// 							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 								<div className='space-y-2'>
// 									<label className='text-sm font-medium text-gray-700'>
// 										Your Name
// 									</label>
// 									<input
// 										type='text'
// 										className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 										placeholder='Enter your full name'
// 									/>
// 								</div>
// 								<div className='space-y-2'>
// 									<label className='text-sm font-medium text-gray-700'>
// 										Email Address
// 									</label>
// 									<input
// 										type='email'
// 										className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 										placeholder='your@email.com'
// 									/>
// 								</div>
// 							</div>
// 							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
// 								<div className='space-y-2'>
// 									<label className='text-sm font-medium text-gray-700'>
// 										Phone Number
// 									</label>
// 									<input
// 										type='tel'
// 										className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 										placeholder='Your phone number'
// 									/>
// 								</div>
// 								<div className='space-y-2'>
// 									<label className='text-sm font-medium text-gray-700'>
// 										Preferred Contact Method
// 									</label>
// 									<select className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
// 										<option value='email'>Email</option>
// 										<option value='phone'>Phone</option>
// 										<option value='both'>Both</option>
// 									</select>
// 								</div>
// 							</div>
// 							<div className='mt-4'>
// 								<Button className='w-full bg-blue-600 hover:bg-blue-700'>
// 									Submit Request
// 								</Button>
// 							</div>
// 						</div>
// 					</div>
// 				);
// 			default:
// 				return null;
// 		}
// 	};

// 	return (
// 		<Card className='max-w-3xl mx-auto'>
// 			<CardHeader>
// 				<CardTitle>Request Call Center Agents</CardTitle>
// 				<CardDescription>
// 					Complete this form to request call center agents for your business
// 				</CardDescription>
// 			</CardHeader>
// 			<CardContent>
// 				{/* Progress Steps */}
// 				<div className='mb-8'>
// 					<div className='flex justify-between items-center'>
// 						{[1, 2, 3, 4].map((step) => (
// 							<div key={step} className='flex flex-col items-center relative'>
// 								<div
// 									className={`w-10 h-10 flex items-center justify-center rounded-full ${
// 										currentStep >= step
// 											? 'bg-blue-600 text-white'
// 											: 'bg-gray-200 text-gray-600'
// 									}`}>
// 									{step}
// 								</div>
// 								<div
// 									className={`text-xs mt-2 ${
// 										currentStep >= step ? 'text-blue-600' : 'text-gray-500'
// 									}`}>
// 									{step === 1
// 										? 'Business Info'
// 										: step === 2
// 											? 'Requirements'
// 											: step === 3
// 												? 'Plan Selection'
// 												: 'Completion'}
// 								</div>
// 								{step < 4 && (
// 									<div
// 										className={`absolute top-5 w-full h-0.5 left-1/2 ${
// 											currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
// 										}`}></div>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				{/* Step Content */}
// 				{renderStep()}
// 			</CardContent>
// 			<CardFooter className='flex justify-between border-t p-4'>
// 				{currentStep > 1 && (
// 					<Button
// 						onClick={handlePrevious}
// 						className='flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800'>
// 						<ArrowLeft className='h-4 w-4 mr-2' />
// 						Previous
// 					</Button>
// 				)}
// 				{currentStep < 3 && (
// 					<Button
// 						onClick={handleNext}
// 						className='flex items-center ml-auto bg-blue-600 hover:bg-blue-700'>
// 						Next
// 						<ArrowRight className='h-4 w-4 ml-2' />
// 					</Button>
// 				)}
// 				{currentStep === 4 && (
// 					<p className='text-sm text-gray-500 italic ml-auto'>
// 						Your information is secure and will never be shared.
// 					</p>
// 				)}
// 			</CardFooter>
// 		</Card>
// 	);
// };

// export default AgentRequestForm;

import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AgentRequest = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		businessName: '',
		industry: '',
		agentsRequired: 1,
		duration: '1-month',
		callVolume: '',
		targetMarket: '',
		languages: ['English'],
		workingHours: '9-5',
		specialRequirements: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleNext = () => {
		if (currentStep < 4) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const plans = [
		{
			name: 'Starter',
			agents: '1-2',
			price: '$299',
			features: [
				'Basic Agent Training',
				'Up to 100 Calls/Day',
				'Email Support',
				'Weekly Reports',
			],
		},
		{
			name: 'Professional',
			agents: '3-5',
			price: '$799',
			features: [
				'Advanced Training',
				'Up to 500 Calls/Day',
				'24/7 Support',
				'Custom Scripts',
				'Dedicated Manager',
			],
		},
		{
			name: 'Enterprise',
			agents: '6+',
			price: 'Custom',
			features: [
				'Elite Training',
				'Unlimited Calls',
				'Dedicated Manager',
				'Custom Integration',
				'Advanced Analytics',
			],
		},
	];

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Business Name
								</label>
								<input
									type='text'
									name='businessName'
									value={formData.businessName}
									onChange={handleChange}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									placeholder='Enter your business name'
								/>
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Industry
								</label>
								<select
									name='industry'
									value={formData.industry}
									onChange={handleChange}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
									<option value=''>Select Industry</option>
									<option value='technology'>Technology</option>
									<option value='healthcare'>Healthcare</option>
									<option value='retail'>Retail</option>
									<option value='finance'>Finance</option>
									<option value='other'>Other</option>
								</select>
							</div>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Target Market
								</label>
								<input
									type='text'
									name='targetMarket'
									value={formData.targetMarket}
									onChange={handleChange}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									placeholder='e.g., Small businesses, Healthcare providers'
								/>
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Project Duration
								</label>
								<select
									name='duration'
									value={formData.duration}
									onChange={handleChange}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
									<option value='1-month'>1 Month</option>
									<option value='3-months'>3 Months</option>
									<option value='6-months'>6 Months</option>
									<option value='1-year'>1 Year</option>
									<option value='custom'>Custom</option>
								</select>
							</div>
						</div>
					</div>
				);
			case 2:
				return (
					<div className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Number of Agents Required
								</label>
								<input
									type='number'
									name='agentsRequired'
									value={formData.agentsRequired}
									onChange={handleChange}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									placeholder='Enter number of agents'
									min='1'
								/>
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Call Volume
								</label>
								<input
									type='text'
									name='callVolume'
									value={formData.callVolume}
									onChange={handleChange}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									placeholder='e.g., 100 calls/day'
								/>
							</div>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Languages
								</label>
								<input
									type='text'
									name='languages'
									value={formData.languages.join(', ')}
									onChange={(e) => {
										const languages = e.target.value
											.split(',')
											.map((lang) => lang.trim());
										setFormData({ ...formData, languages });
									}}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									placeholder='e.g., English, Spanish, French'
								/>
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-300'>
									Working Hours
								</label>
								<input
									type='text'
									name='workingHours'
									value={formData.workingHours}
									onChange={handleChange}
									className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									placeholder='e.g., 9 AM - 5 PM'
								/>
							</div>
						</div>
					</div>
				);
			case 3:
				return (
					<div className='space-y-4'>
						<div className='space-y-2'>
							<label className='text-sm font-medium text-gray-300'>
								Special Requirements
							</label>
							<textarea
								name='specialRequirements'
								value={formData.specialRequirements}
								onChange={handleChange}
								className='w-full px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
								placeholder='Any special requirements or notes'
								rows={4}
							/>
						</div>
					</div>
				);
			case 4:
				return (
					<div className='space-y-6'>
						<h3 className='text-xl font-semibold text-gray-300'>
							Select a Plan
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{plans.map((plan, index) => (
								<Card key={index} className='bg-gray-800/50 border-gray-700'>
									<CardHeader>
										<CardTitle className='text-gray-300'>{plan.name}</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='text-gray-400'>
											<p className='text-2xl font-bold'>{plan.price}</p>
											<p className='text-sm mt-2'>{`For ${plan.agents} agents`}</p>
											<ul className='mt-4 space-y-2'>
												{plan.features.map((feature, i) => (
													<li key={i} className='flex items-center'>
														<CheckCircle className='w-4 h-4 mr-2 text-green-500' />
														<span>{feature}</span>
													</li>
												))}
											</ul>
										</div>
									</CardContent>
									<CardFooter>
										<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
											Select Plan
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<Card className='max-w-3xl mx-auto bg-gray-900/50 border-gray-800'>
			<CardHeader>
				<CardTitle className='text-gray-300'>Agent Request Form</CardTitle>
			</CardHeader>
			<CardContent>{renderStep()}</CardContent>
			<CardFooter className='flex justify-between'>
				<Button
					onClick={handlePrevious}
					disabled={currentStep === 1}
					className='flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white'>
					<ArrowLeft className='w-4 h-4' />
					Previous
				</Button>
				<Button
					onClick={handleNext}
					disabled={currentStep === 4}
					className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white'>
					Next
					<ArrowRight className='w-4 h-4' />
				</Button>
			</CardFooter>
		</Card>
	);
};

export default AgentRequest;
