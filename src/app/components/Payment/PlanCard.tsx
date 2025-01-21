// import { Plan, BillingCycle, plans } from './PlanIcon';
// import { motion } from 'framer-motion';
// interface PlanCardsProps {
// 	selectedPlan: Plan & { billingCycle: BillingCycle };
// 	onSelect: (plan: Plan & { billingCycle: BillingCycle }) => void;
// 	billingCycle: BillingCycle;
// }

// export const PlanCards = ({
// 	selectedPlan,
// 	onSelect,
// 	billingCycle,
// }: PlanCardsProps) => (
// 	<div className='grid md:grid-cols-3 gap-6'>
// 		{plans.map((plan) => (
// 			<motion.div
// 				key={plan.name}
// 				onClick={() => onSelect({ ...plan, billingCycle })}
// 				className={`relative border rounded-2xl p-6 cursor-pointer transition-all
//                     ${
// 											selectedPlan.name === plan.name
// 												? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
// 												: 'bg-gray-800/60 border-gray-700 hover:bg-gray-800/80'
// 										}`}
// 				whileHover={{ scale: 1.02 }}
// 				whileTap={{ scale: 0.98 }}>
// 				{/* ... rest of your existing plan card rendering logic ... */}
// 			</motion.div>
// 		))}
// 	</div>
// );

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { CheckCircle2, Crown } from 'lucide-react';

// // Types imported from the existing file
// type BillingCycle = 'monthly' | 'annual';
// type Plan = {
// 	name: string;
// 	price: number;
// 	type: string;
// 	description: string;
// 	features: string[];
// 	icon: React.ReactNode;
// 	iconType: string;
// 	ctaText: string;
// };

// interface PlanCardsProps {
// 	selectedPlan: Plan & { billingCycle: BillingCycle };
// 	onSelect: (plan: Plan & { billingCycle: BillingCycle }) => void;
// 	billingCycle: BillingCycle;
// 	plans: Plan[];
// }

// export const PlanCards = ({
// 	selectedPlan,
// 	onSelect,
// 	billingCycle,
// 	plans,
// }: PlanCardsProps) => {
// 	const calculatePrice = (basePrice: number, cycle: BillingCycle): string => {
// 		if (cycle === 'annual') {
// 			const annualPrice = basePrice * 12;
// 			const discount = annualPrice * 0.2;
// 			return (annualPrice - discount).toFixed(2);
// 		}
// 		return basePrice.toFixed(2);
// 	};

// 	return (
// 		<div className='grid md:grid-cols-3 gap-6'>
// 			{plans.map((plan) => (
// 				<motion.div
// 					key={plan.name}
// 					onClick={() => onSelect({ ...plan, billingCycle })}
// 					className={`
//                         relative border rounded-2xl p-6 cursor-pointer transition-all
//                         ${
// 													selectedPlan.name === plan.name
// 														? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
// 														: 'bg-gray-800/60 border-gray-700 hover:bg-gray-800/80'
// 												}
//                     `}
// 					whileHover={{ scale: 1.02 }}
// 					whileTap={{ scale: 0.98 }}>
// 					{plan.type === 'Recommended' && (
// 						<div
// 							className='absolute -top-3 left-1/2 transform -translate-x-1/2
//                             bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs
//                             px-3 py-1 rounded-full flex items-center gap-1'>
// 							<Crown size={12} />
// 							Most Popular
// 						</div>
// 					)}

// 					<div className='flex justify-between items-center mb-4'>
// 						<div className='flex items-center gap-2'>
// 							{plan.icon}
// 							<h3 className='text-xl font-semibold'>{plan.name}</h3>
// 						</div>
// 						{selectedPlan.name === plan.name && (
// 							<CheckCircle2 className='text-green-500' />
// 						)}
// 					</div>

// 					<p className='text-sm text-gray-400 mb-4'>{plan.description}</p>

// 					<div className='text-3xl font-bold mb-6 text-blue-400'>
// 						${calculatePrice(plan.price, billingCycle)}
// 						<span className='text-sm text-gray-400 ml-2'>
// 							/{billingCycle === 'annual' ? 'year' : 'month'}
// 						</span>
// 						{billingCycle === 'annual' && plan.price > 0 && (
// 							<div className='text-sm text-green-500 mt-1'>
// 								Save ${(plan.price * 12 * 0.2).toFixed(2)} per year
// 							</div>
// 						)}
// 					</div>

// 					<ul className='space-y-3 text-gray-300 text-sm mb-6'>
// 						{plan.features.map((feature, index) => (
// 							<li key={index} className='flex items-center'>
// 								<CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
// 								{feature}
// 							</li>
// 						))}
// 					</ul>

// 					<button
// 						className={`
//                             w-full py-2 rounded-lg transition-colors
//                             ${
// 															plan.type === 'Recommended'
// 																? 'bg-blue-600 hover:bg-blue-700 text-white'
// 																: 'bg-gray-700 hover:bg-gray-600 text-gray-200'
// 														}
//                         `}>
// 						{plan.ctaText}
// 					</button>
// 				</motion.div>
// 			))}
// 		</div>
// 	);
// };

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Crown } from 'lucide-react';

// Types more generically defined
type BillingCycle = 'monthly' | 'annual';
type Plan = {
	name: string;
	price: number;
	type: string;
	description: string;
	features: string[];
	icon: React.ReactNode;
	iconType?: string;
	ctaText: string;
};

type SelectedPlan = Plan & { billingCycle: BillingCycle };

// interface PlanCardsProps {
// 	selectedPlan: SelectedPlan;
// 	onSelect: (plan: SelectedPlan) => void;
// 	billingCycle: BillingCycle;
// 	plans: Plan[];
// }

interface PlanCardsProps {
	selectedPlan: Plan & { billingCycle: BillingCycle };
	onSelect: React.Dispatch<
		React.SetStateAction<Plan & { billingCycle: BillingCycle }>
	>;
	billingCycle: BillingCycle;
	plans: Plan[];
}

export const PlanCards = ({
	selectedPlan,
	onSelect,
	billingCycle,
	plans,
}: PlanCardsProps) => {
	const calculatePrice = (basePrice: number, cycle: BillingCycle): string => {
		if (cycle === 'annual') {
			const annualPrice = basePrice * 12;
			const discount = annualPrice * 0.2;
			return (annualPrice - discount).toFixed(2);
		}
		return basePrice.toFixed(2);
	};

	return (
		<div className='grid md:grid-cols-3 gap-6'>
			{plans.map((plan) => (
				<motion.div
					key={plan.name}
					onClick={() => onSelect({ ...plan, billingCycle })}
					className={`
                        relative border rounded-2xl p-6 cursor-pointer transition-all
                        ${
													selectedPlan.name === plan.name
														? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
														: 'bg-gray-800/60 border-gray-700 hover:bg-gray-800/80'
												}
                    `}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}>
					{plan.type === 'Recommended' && (
						<div
							className='absolute -top-3 left-1/2 transform -translate-x-1/2
                            bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs
                            px-3 py-1 rounded-full flex items-center gap-1'>
							<Crown size={12} />
							Most Popular
						</div>
					)}

					<div className='flex justify-between items-center mb-4'>
						<div className='flex items-center gap-2'>
							{plan.icon}
							<h3 className='text-xl font-semibold'>{plan.name}</h3>
						</div>
						{selectedPlan.name === plan.name && (
							<CheckCircle2 className='text-green-500' />
						)}
					</div>

					<p className='text-sm text-gray-400 mb-4'>{plan.description}</p>

					<div className='text-3xl font-bold mb-6 text-blue-400'>
						${calculatePrice(plan.price, billingCycle)}
						<span className='text-sm text-gray-400 ml-2'>
							/{billingCycle === 'annual' ? 'year' : 'month'}
						</span>
						{billingCycle === 'annual' && plan.price > 0 && (
							<div className='text-sm text-green-500 mt-1'>
								Save ${(plan.price * 12 * 0.2).toFixed(2)} per year
							</div>
						)}
					</div>

					<ul className='space-y-3 text-gray-300 text-sm mb-6'>
						{plan.features.map((feature, index) => (
							<li key={index} className='flex items-center'>
								<CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
								{feature}
							</li>
						))}
					</ul>

					<button
						className={`
                            w-full py-2 rounded-lg transition-colors
                            ${
															plan.type === 'Recommended'
																? 'bg-blue-600 hover:bg-blue-700 text-white'
																: 'bg-gray-700 hover:bg-gray-600 text-gray-200'
														}
                        `}>
						{plan.ctaText}
					</button>
				</motion.div>
			))}
		</div>
	);
};
