'user client'

import React from 'react';
import LayoutEffect from '@/app/components/LayoutEffect';
import SectionWrapper from '@/app/components/SectionWrapper';
import Button from '../Button';

interface Plan {
    name: string;
    desc: string;
    price: number;
    isMostPop: boolean;
    features: string[];
}

const Pricing: React.FC = () => {
    const plans: Plan[] = [
        // ... (your plan objects)
        {
            name: "Basic plan",
            desc: "For users who want to discover new products and services ",
            price: 0,
            isMostPop: false,
            features: [
                "Access targeted ads",
                "Get 1 ad per day ",
                "Referral and commissions",
                "Join the addVantage community",
                "SMS & WhatsApp Campaigns",
                "Phone support",

            ],
        },
        {
            name: "Starter",
            desc: "Ideal for growing businesses",
            price: 11,
            isMostPop: true,
            features: [
                "Includes all Free plan features",
                "Share up to 5 ads per day",
                "Earn from referral",
                "Advanced statistics",
                "Support from the addVantage team",
                "Early access to new features",
            ],
        },
        {
            name: "Enterprise",
            desc: "Built for marketing managers",
            price: 100,
            isMostPop: false,
            features: [
                "Everything in Starter",
                "Share unlimited ads per day",
                "Receive personalized support ",
                "Sub-account Management",
                "Access in-depth reporting tools",
                "Personalized support",
            ],
        },
    ];

    const mostPopPricingBg = 'radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)';

    return (
        <SectionWrapper id="pricing" className="custom-screen">
            <div className="relative max-w-xl mx-auto text-center">
                <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                    Find a plan to power your business
                </h2>
            </div>
            <LayoutEffect
                className="duration-1000 delay-300"
                isInviewState={{
                    trueState: 'opacity-1',
                    falseState: 'opacity-0',
                }}
            >
                <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
                    {plans.map((item, idx) => (
                        <div
                            key={idx}
                            className={`relative flex-1 flex items-stretch flex-col rounded-xl border border-gray-800 mt-6 sm:mt-0 ${
                                item.isMostPop ? 'border border-purple-500' : ''
                            }`}
                            style={{
                                backgroundImage: item.isMostPop ? mostPopPricingBg : '',
                            }}
                        >
                            <div className="p-8 space-y-4 border-b border-gray-800 text-center">
                                <span className="text-purple-600 font-medium">{item.name}</span>
                                <div className="text-gray-50 text-3xl font-semibold">
                                    ${item.price}{' '}
                                    <span className="text-xl text-gray-400 font-normal">/mo</span>
                                </div>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    {item.features.map((featureItem, idx) => (
                                        <li key={idx} className="flex items-center gap-5 text-gray-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-indigo-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            {featureItem}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-8">
                                    <Button
                                        className={`w-full rounded-full text-white ring-offset-2 focus:ring ${
                                            item.isMostPop
                                                ? 'bg-purple-600 hover:bg-purple-500 focus:bg-purple-700 ring-purple-600'
                                                : 'bg-gray-800 hover:bg-gray-700 ring-gray-800'
                                        }`}
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </LayoutEffect>
        </SectionWrapper>
    );
};

export default Pricing;
