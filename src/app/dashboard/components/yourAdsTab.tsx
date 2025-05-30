'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, KindeUser } from '@/app/dashboard/types/dashboard_types';
import ProductCard from '@/app/dashboard/components/productCard';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface YourAdsTabProps {
	products: Product[];
	loading: boolean;
	error: string | null;
	filteredProducts: Product[];
	handleTogglePublish: (id: string) => void;
	handleDelete: (id: string) => Promise<void>;
	user: KindeUser;
	skeletonComponent?: React.ElementType;
	isMobile?: boolean;
}

export const YourAdsTab = ({
	products,
	loading,
	error,
	skeletonComponent: SkeletonComponent,
	filteredProducts,
	handleTogglePublish,
	handleDelete,
	user,
}: YourAdsTabProps) => {
	if (loading) return <div className='text-center py-4'>Loading...</div>;

	if (error)
		return (
			<div className='flex items-center justify-center text-red-500 p-4'>
				<AlertCircle className='mr-2' />
				{error}
			</div>
		);

	return (
		<AnimatePresence>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
				{loading
					? Array.from({ length: 6 }).map((_, index) => (
							<div key={index}>
								{SkeletonComponent ? <SkeletonComponent /> : null}
							</div>
						))
					: filteredProducts.map((product) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3 }}>
								<ProductCard
									product={product}
									onTogglePublish={handleTogglePublish}
									onDelete={handleDelete}
									isPublishedView={false}
									creatorEmail={product.createdBy}
									user={user}
								/>
							</motion.div>
						))}
			</div>
		</AnimatePresence>
	);
};
