import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
	PlusCircle,
	RefreshCw,
	Filter,
	Search,
	AlertCircle,
	Eye,
	ToggleLeft,
	ToggleRight,
	User,
	Clock,
} from 'lucide-react';

interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	title: string;
	description: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
	isPublished?: boolean;
	performance?: {
		views: number;
		clicks: number;
		ctr: number;
	};
	createdBy: string;
	startDate?: string;
	duration: number;
	isActive: boolean;
	daysRemaining?: number;
}

interface ProductCardProps {
	product: Product;
	onTogglePublish: (id: string) => void;
	isPublishedView?: boolean;
	creatorEmail?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onTogglePublish,
	isPublishedView = false,
	creatorEmail,
}) => {
	const router = useRouter();

	const handleViewDetails = () => {
		console.log('Navigating to product ID:', product.id);
		router.push(`/dashboard/product/${product.id}`);
	};

	const handlePublishToggle = async (e: React.MouseEvent) => {
		e.stopPropagation();

		if (!isPublishedView) {
			onTogglePublish(product.id);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-4 hover:border-blue-500/50 transition-all group relative'>
			{/* Publish Toggle */}
			{!isPublishedView && (
				<div
					className='absolute top-0.5 right-4 z-10 cursor-pointer group/toggle
                              bg-black/20 backdrop-blur-sm p-1 rounded-full
                              hover:bg-black/40 transition-all duration-200'
					onClick={handlePublishToggle}>
					{product.isPublished ? (
						<>
							<ToggleRight className='text-green-400 w-5 h-5' />
							<span
								className='absolute right-0 -top-8 bg-black/90 text-white text-xs px-2 py-1
                                           rounded opacity-0 group-hover/toggle:opacity-100 transition-opacity
                                           whitespace-nowrap'>
								Published
							</span>
						</>
					) : (
						<>
							<ToggleLeft className='text-gray-500 w-5 h-5' />
							<span
								className='absolute right-0 -top-8 bg-black/90 text-white text-xs px-2 py-1
                                           rounded opacity-0 group-hover/toggle:opacity-100 transition-opacity
                                           whitespace-nowrap'>
								Unpublished
							</span>
						</>
					)}
				</div>
			)}

			{/* Poster Image */}
			{product.adResourceUrl && (
				<div className='mb-4 rounded-lg overflow-hidden'>
					<Image
						src={product.adResourceUrl}
						alt={product.title}
						width={400}
						height={192}
						className='w-full h-48 object-cover'
						priority={false}
						quality={75}
					/>
				</div>
			)}

			<div className='flex justify-between items-start'>
				<div>
					<h3 className='text-lg font-semibold text-white/90 group-hover:text-blue-400 transition-colors'>
						{product.title}
					</h3>
					<p className='text-sm text-white/60 mt-1'>{product.type}</p>
				</div>
				<span
					className={`px-2 py-1 rounded-full text-xs font-medium ${
						product.numberOfDaysRunning &&
						parseInt(product.numberOfDaysRunning) > 7
							? 'bg-green-500/20 text-green-400'
							: 'bg-yellow-500/20 text-yellow-400'
					}`}>
					{product.numberOfDaysRunning} Days
				</span>
			</div>

			<p className='text-sm text-white/70'>{product.description}</p>

			<div className='flex justify-between items-center'>
				<div className='text-sm text-white/60'>
					Cost per View:{' '}
					<span className='font-semibold'>{product.costPerView || 'N/A'}</span>
				</div>
				<button
					onClick={handleViewDetails}
					className='flex items-center gap-2 px-4 py-2 rounded-lg
                              bg-blue-500/10 hover:bg-blue-500/20
                              text-blue-400 hover:text-blue-300
                              border border-blue-500/20 hover:border-blue-500/30
                              transition-all duration-200 group'>
					<Eye className='w-4 h-4 group-hover:scale-110 transition-transform' />
					<span className='text-sm font-medium'>View Details</span>
				</button>
			</div>

			{isPublishedView && creatorEmail && (
				<div className='mt-4 pt-4 border-t border-white/10'>
					<p className='text-sm text-white/60 flex items-center gap-2'>
						<User className='w-4 h-4' />
						Published by: {creatorEmail}
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default ProductCard;
