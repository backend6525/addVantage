import { Product, KindeUser } from '@/app/dashboard/types/dashboard_types';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
	Eye,
	ToggleLeft,
	ToggleRight,
	User,
	TrendingUp,
	Calendar,
	DollarSign,
	Clock,
	BarChart2,
	Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
	product: Product;
	onTogglePublish: (id: string) => void;
	onDelete?: (id: string) => void;
	isPublishedView?: boolean;
	creatorEmail?: string;
	user: KindeUser;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onTogglePublish,
	onDelete,
	isPublishedView = false,
	creatorEmail,
	user,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleViewDetails = async () => {
		try {
			setIsLoading(true);
			const userEmail = user?.email;

			if (!userEmail) {
				throw new Error('User email is required');
			}

			router.push(
				`/dashboard/product/${product.id}?email=${encodeURIComponent(userEmail)}`
			);
		} catch (error) {
			console.error('Error navigating to product details:', error);
			toast.error('Failed to view product details');
		} finally {
			setIsLoading(false);
		}
	};

	const handlePublishToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isPublishedView) onTogglePublish(product.id);
	};

	const handleDelete = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!onDelete) return;

		try {
			setIsDeleting(true);
			await onDelete(product.id);
			toast.success('Ad deleted successfully');
		} catch (error) {
			console.error('Error deleting ad:', error);
			toast.error('Failed to delete ad');
		} finally {
			setIsDeleting(false);
		}
	};

	const getStatusInfo = () => {
		const days = parseInt(product.numberOfDaysRunning || '0');
		if (days > 30) return { color: 'emerald', label: 'Long-running' };
		if (days > 14) return { color: 'teal', label: 'Established' };
		if (days > 7) return { color: 'amber', label: 'Stable' };
		return { color: 'blue', label: 'New' };
	};

	const status = getStatusInfo();
	const canDelete = user.email === product.createdBy;

	const isCreator = user?.email === creatorEmail;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className='group relative bg-slate-800/40 rounded-xl overflow-hidden border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300'>
			{/* Glass effect overlay */}
			<div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

			{/* Image Section */}
			<div className='relative h-48'>
				{product.adResourceUrl && (
					<>
						<Image
							src={product.adResourceUrl}
							alt={product.title}
							fill
							className='object-cover transition-transform duration-500 group-hover:scale-105'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							priority={false}
							quality={85}
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent' />
					</>
				)}

				{/* Overlay Controls */}
				<div className='absolute top-3 left-3 right-3 flex justify-between items-start z-10'>
					{/* Status Badge */}
					<div
						className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
						bg-${status.color}-500/20 text-${status.color}-400 border border-${status.color}-500/30
						backdrop-blur-sm shadow-lg`}>
						<Clock className='w-3.5 h-3.5' />
						<span>
							{product.numberOfDaysRunning}d • {status.label}
						</span>
					</div>

					{/* Action Buttons */}
					<div className='flex items-center gap-2'>
						{/* Delete Button */}
						{canDelete && onDelete && (
							<button
								onClick={handleDelete}
								disabled={isDeleting}
								className='p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-red-500/60 transition-all
									group-hover:scale-105 shadow-lg border border-slate-700/50 disabled:opacity-50'>
								{isDeleting ? (
									<div className='w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin' />
								) : (
									<Trash2 className='w-4 h-4 text-red-400' />
								)}
							</button>
						)}

						{/* Publish Toggle */}
						{!isPublishedView && (
							<button
								onClick={handlePublishToggle}
								className='p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all
									group-hover:scale-105 shadow-lg border border-slate-700/50'>
								{product.isPublished ? (
									<ToggleRight className='w-5 h-5 text-emerald-400' />
								) : (
									<ToggleLeft className='w-5 h-5 text-slate-400' />
								)}
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className='p-5 space-y-4'>
				{/* Header */}
				<div className='space-y-2'>
					<div className='flex items-start justify-between gap-2'>
						<h3 className='text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-1'>
							{product.title}
						</h3>
						<span className='px-2 py-1 text-xs font-medium text-slate-300 bg-slate-700/50 rounded-md border border-slate-600/50'>
							{product.type}
						</span>
					</div>
					<p className='text-sm text-slate-300/80 line-clamp-2'>
						{product.description}
					</p>
				</div>

				{/* Metrics Grid */}
				<div className='grid grid-cols-2 gap-3'>
					<div className='bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 group-hover:border-blue-500/30 transition-colors'>
						<div className='flex items-center gap-2'>
							<div className='p-1.5 rounded-md bg-blue-500/10'>
								<DollarSign className='w-4 h-4 text-blue-400' />
							</div>
							<div>
								<p className='text-xs text-slate-400'>Cost/View</p>
								<p className='text-sm font-medium text-white mt-0.5'>
									${product.costPerView || '0.00'}
								</p>
							</div>
						</div>
					</div>

					<div className='bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 group-hover:border-purple-500/30 transition-colors'>
						<div className='flex items-center gap-2'>
							<div className='p-1.5 rounded-md bg-purple-500/10'>
								<BarChart2 className='w-4 h-4 text-purple-400' />
							</div>
							<div>
								<p className='text-xs text-slate-400'>Engagement</p>
								<p className='text-sm font-medium text-white mt-0.5'>
									{Math.floor(Math.random() * 100)}%
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className='px-5 pb-5 flex items-center justify-between'>
				{isPublishedView && creatorEmail && (
					<div className='flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50'>
						<User className='w-3.5 h-3.5 text-slate-500' />
						<span className='truncate max-w-[120px]'>{creatorEmail}</span>
					</div>
				)}

				<button
					onClick={handleViewDetails}
					disabled={isLoading}
					className={`ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg
						bg-gradient-to-r from-blue-600/80 to-purple-600/80
						hover:from-blue-500 hover:to-purple-500
						text-white border border-blue-400/30
						transition-all duration-300 shadow-lg
						${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-purple-500/20'}`}>
					{isLoading ? (
						<div className='w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin' />
					) : (
						<Eye className='w-4 h-4 transition-transform group-hover:scale-110' />
					)}
					<span className='text-sm font-medium'>
						{isLoading ? 'Loading...' : 'View Details'}
					</span>
				</button>
			</div>

			<div className='flex justify-between items-center mt-4'>
				<Button
					onClick={() => onTogglePublish(product.id)}
					variant={product.isPublished ? 'destructive' : 'default'}
					size='sm'
					className='text-xs'>
					{product.isPublished ? 'Unpublish' : 'Publish'}
				</Button>

				{isCreator && (
					<Button
						onClick={() => onDelete(product.id)}
						variant='destructive'
						size='sm'
						className='text-xs'>
						<Trash2 className='w-4 h-4 mr-1' />
						Delete
					</Button>
				)}
			</div>
		</motion.div>
	);
};

export default ProductCard;
