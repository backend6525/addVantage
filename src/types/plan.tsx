import React from 'react';
import { Users } from 'lucide-react';

// export interface Plan {
//     name: string;
//     type: 'Free' | 'Recommended' | 'Custom';
//     price: number;
//     features: string[];
//     description: string;
//     icon: JSX.Element;
//     ctaText: string;
// }

// export const plans: Plan[] = [
//     {
//         name: 'Basic',
//         type: 'Free',
//         price: 0,
//         features: ['Feature 1', 'Feature 2'],
//         description: 'Get started with basic features',
//         icon: <Users className="w-5 h-5 text-blue-400" />,
//         ctaText: 'Get Started'
//     },
//     // ... update other plans similarly
// ];

export interface Plan {
    name: string;
    type: 'Free' | 'Recommended' | 'Custom';
    price: number;
    features: string[];
    description: string;
    icon: JSX.Element;
    ctaText: string;
}

export const plans: Plan[] = [
    {
        name: 'Basic',
        type: 'Free',
        price: 0,
        features: ['Feature 1', 'Feature 2'],
        description: 'Get started with basic features',
        icon: <Users className="w-5 h-5 text-blue-400" />,
        ctaText: 'Get Started'
    },
    // ... update other plans similarly
];