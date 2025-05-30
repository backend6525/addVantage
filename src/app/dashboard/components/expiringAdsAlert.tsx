// components/ExpiringAdsAlert.tsx
'use client';
import React from 'react';
import { Product } from '@/app/dashboard/types/dashboard_types';
import { Clock } from 'lucide-react';

interface ExpiringAdsAlertProps {
	expiringAds: Product[];
	onSelectAd: (ad: Product) => void;
}

export const ExpiringAdsAlert = ({
	expiringAds,
	onSelectAd,
}: ExpiringAdsAlertProps) => {
	if (expiringAds.length === 0) return null;

	return (
		<div className='mb-6 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-center'>
			<Clock className='mr-4 text-yellow-500' />
			<div>
				<p className='text-yellow-400 font-semibold'>
					{expiringAds.length} Ad{expiringAds.length > 1 ? 's' : ''} Expiring
					Soon
				</p>
				<div className='flex space-x-2 mt-2'>
					{expiringAds.map((ad) => (
						<button
							key={ad.id}
							onClick={() => onSelectAd(ad)}
							className='bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 px-3 py-1 rounded-full text-sm'>
							{ad.title} ({ad.daysRemaining} days left)
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
