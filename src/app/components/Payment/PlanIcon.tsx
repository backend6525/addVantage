// import React from 'react';
// import { Users, Crown, Shield } from 'lucide-react';

// // Option 1: Define a type for icon components
// export type IconComponent = React.ComponentType<{ className?: string }>;

// interface PlanIconProps {
// 	className?: string;
// }

// export const PlanIcon: React.FC<PlanIconProps> = ({ className }) => (
// 	<Users className={className || 'w-5 h-5 text-blue-400'} />
// );

// export const BasicIcon: React.FC<PlanIconProps> = ({ className }) => (
// 	<Users className={className || 'w-5 h-5 text-blue-400'} />
// );

// export const ProIcon: React.FC<PlanIconProps> = ({ className }) => (
// 	<Crown className={className || 'w-5 h-5 text-blue-400'} />
// );

// export const EnterpriseIcon: React.FC<PlanIconProps> = ({ className }) => (
// 	<Shield className={className || 'w-5 h-5 text-blue-400'} />
// );

// export type BillingCycle = 'monthly' | 'annual';

// export interface Plan {
// 	name: string;
// 	type: 'Free' | 'Recommended' | 'Custom';
// 	price: number;
// 	features: string[];
// 	description: string;
// 	icon: JSX.Element;
// 	iconType: 'basic' | 'pro' | 'enterprise';
// 	ctaText: string;
// }

// export const plans: Plan[] = [
// 	{
// 		name: 'Basic',
// 		type: 'Free',
// 		price: 0,
// 		features: ['Feature 1', 'Feature 2'],
// 		description: 'Get started with basic features',
// 		icon: <BasicIcon />,
// 		iconType: 'basic'| 'pro' | 'enterprise'
// 		ctaText: 'Get Started',
// 	},
// 	// Add other plans as needed
// ];

import React from 'react';
import { Users, Crown, Shield } from 'lucide-react';

export type BillingCycle = 'monthly' | 'annual';

export interface Plan {
	name: string;
	type: 'Free' | 'Recommended' | 'Custom';
	price: number;
	features: string[];
	description: string;
	icon: JSX.Element;
	iconType: 'basic' | 'pro' | 'enterprise';
	ctaText: string;
}

export type IconComponent = React.ComponentType<{ className?: string }>;

export const PlanIcon: React.FC<PlanIconProps> = ({ className }) => (
	<Users className={className || 'w-5 h-5 text-blue-400'} />
);

interface PlanIconProps {
	className?: string;
}

export const BasicIcon: React.FC<PlanIconProps> = ({ className }) => (
	<Users className={className || 'w-5 h-5 text-blue-400'} />
);

export const ProIcon: React.FC<PlanIconProps> = ({ className }) => (
	<Crown className={className || 'w-5 h-5 text-yellow-400'} />
);

export const EnterpriseIcon: React.FC<PlanIconProps> = ({ className }) => (
	<Shield className={className || 'w-5 h-5 text-purple-400'} />
);
