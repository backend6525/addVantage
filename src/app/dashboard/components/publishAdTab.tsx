// components/PublishedAdsTab.tsx
'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, KindeUser } from '@/app/dashboard/types/dashboard_types';
import ProductCard from '@/app/dashboard/components/productCard';

interface PublishedAdsTabProps {
	publishedAds: Product[];
	handleTogglePublish: (id: string) => void;
	user: KindeUser;
	isMobile?: boolean;
}

export const PublishedAdsTab = ({
	publishedAds,
	handleTogglePublish,
	user,
}: PublishedAdsTabProps) => {
	return (
		<motion.div
			layout
			className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
			<AnimatePresence>
				{publishedAds.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onTogglePublish={handleTogglePublish}
						isPublishedView={true}
						creatorEmail={product.createdBy}
						user={user}
					/>
				))}
			</AnimatePresence>
		</motion.div>
	);
};
