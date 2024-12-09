'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnlineStatus from '@/app/components/online/OnlineStatus';
import {
	ChevronLeft,
	Share2,
	Star,
	Clock,
	BarChart2,
	Target,
	User,
	Heart,
	ExternalLink,
	Award,
	MessageCircle,
	Info,
	Globe,
	MapPin,
	DollarSign,
	Zap,
	Users,
	TrendingUp,
	LucideIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Publisher {
	id: string;
	name: string;
	email?: string;
	location?: string;
	logoUrl?: string;
	totalAds?: number;
	rating?: number;
}

interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	title: string;
	description: string;
	createdBy?: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
	publisher?: Publisher;
}

interface ProductDetails extends Product {
	publishDate?: string;
	interestedUsers?: string[];
	rating?: number;
	totalViews?: number;
	isOnline?: boolean;
	targetAudience?: string[];
	adCampaignDetails?: {
		objective: string;
		budget: string;
		platform: string;
	};
	tags?: string[];
}

interface MetricCardProps {
	icon: LucideIcon;
	label: string;
	value: string | number;
	color: string;
}

const LoadingState = () => (
	<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white flex items-center justify-center'>
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className='text-2xl font-semibold flex items-center space-x-4'>
			<span className='animate-pulse'>Loading details...</span>
		</motion.div>
	</div>
);

const ErrorState = ({ error }: { error: string | null }) => (
	<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white flex items-center justify-center'>
		<motion.div className='text-center'>
			<div className='text-4xl text-red-500 mb-4'>Oops!</div>
			<div className='text-2xl text-red-400'>
				{error || 'Product not found'}
			</div>
			{/* ... rest of component ... */}
		</motion.div>
	</div>
);

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const [product, setProduct] = useState<ProductDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isLiked, setIsLiked] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCurrentUserPublisher, setIsCurrentUserPublisher] = useState(false);
	const router = useRouter();

	// Global error boundary
	useEffect(() => {
		const handleError = (error: ErrorEvent) => {
			console.error('Global error:', error);
			setError('An unexpected error occurred');
		};

		window.addEventListener('error', handleError);
		return () => window.removeEventListener('error', handleError);
	}, []);

	// useEffect(() => {
	// 	const fetchProductDetails = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const response = await fetch(`/api/product?id=${id}`);
	// 			if (!response.ok) {
	// 				throw new Error('Failed to fetch product details');
	// 			}
	// 			const data: ProductDetails = await response.json();
	// 			setProduct(data);

	// 			// Check if current user is the publisher (mock implementation)
	// 			const currentUserId = localStorage.getItem('userId');
	// 			setIsCurrentUserPublisher(currentUserId === data.createdBy);
	// 		} catch (err) {
	// 			console.error('Error:', err);
	// 			setError('Could not load product details. Please try again later.');
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchProductDetails();
	// }, [id]);

	// Enhanced data fetching
	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/product?id=${id}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: ProductDetails = await response.json();
				setProduct(data);

				const currentUserId = localStorage.getItem('userId');
				setIsCurrentUserPublisher(currentUserId === data.createdBy);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'An unexpected error occurred'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchProductDetails();
	}, [id]);

	// const handleSendMessage = () => {
	// 	// Implement message routing or modal
	// 	router.push(`/messages/new?to=${product?.publisher?.id}`);
	// };

	// Enhanced message handling
	const handleSendMessage = async () => {
		try {
			setIsSubmitting(true);
			await router.push(`/messages/new?to=${product?.publisher?.id}`);
		} catch (error) {
			console.error('Navigation failed:', error);
			setError('Failed to open messaging');
		} finally {
			setIsSubmitting(false);
		}
	};

	// const MetricCard = ({ icon: Icon, label, value, color }: any) => (
	// 	<motion.div
	// 		whileHover={{ scale: 1.05 }}
	// 		className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
	// 		<div className='text-white/60 text-sm mb-1 flex items-center gap-2'>
	// 			<Icon className={`w-4 h-4 ${color}`} />
	// 			{label}
	// 		</div>
	// 		<div className='text-xl font-semibold'>{value}</div>
	// 	</motion.div>
	// );

	// Memoized components
	const MetricCard = React.memo(
		({ icon: Icon, label, value, color }: MetricCardProps) => (
			<motion.div
				whileHover={{ scale: 1.05 }}
				className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
				<div className='text-white/60 text-sm mb-1 flex items-center gap-2'>
					<Icon className={`w-4 h-4 ${color}`} />
					{label}
				</div>
				<div className='text-xl font-semibold'>{value}</div>
			</motion.div>
		)
	);

	MetricCard.displayName = 'MetricCard';

	if (loading) return <LoadingState />;
	if (error || !product) return <ErrorState error={error} />;

	return (
		// <div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white'>
		// 	{/* Header Bar */}
		// 	<motion.div
		// 		initial={{ y: -20, opacity: 0 }}
		// 		animate={{ y: 0, opacity: 1 }}
		// 		className='sticky top-16 z-30 bg-black/50 backdrop-blur-lg border-b border-white/10'>
		// 		<div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
		// 			<motion.button
		// 				whileHover={{ scale: 1.05 }}
		// 				whileTap={{ scale: 0.95 }}
		// 				onClick={() => router.back()}
		// 				className='flex items-center gap-2 text-white/70 hover:text-white transition-colors'>
		// 				<ChevronLeft className='w-5 h-5' />
		// 				<span>Back</span>
		// 			</motion.button>

		// 			<div className='flex items-center gap-4'>
		// 				<OnlineStatus
		// 					isOnline={product.isOnline || false}
		// 					isOwner={isCurrentUserPublisher}
		// 					resourceId={product.id}
		// 					resourceType='product'
		// 					onStatusChange={(status) => {
		// 						setProduct((prev) =>
		// 							prev ? { ...prev, isOnline: status } : null
		// 						);
		// 					}}
		// 				/>
		// 				<motion.button
		// 					whileHover={{ scale: 1.05 }}
		// 					whileTap={{ scale: 0.95 }}
		// 					onClick={() => setIsLiked(!isLiked)}
		// 					className={`p-2 rounded-full ${
		// 						isLiked ? 'bg-red-500/20 text-red-500' : 'bg-white/10'
		// 					}`}>
		// 					<Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
		// 				</motion.button>
		// 				<motion.button
		// 					whileHover={{ scale: 1.05 }}
		// 					whileTap={{ scale: 0.95 }}
		// 					className='p-2 rounded-full bg-white/10'>
		// 					<Share2 className='w-5 h-5' />
		// 				</motion.button>
		// 			</div>
		// 		</div>
		// 	</motion.div>

		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white'>
			{/* Header Bar */}
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className='sticky top-16 z-30 bg-black/50 backdrop-blur-lg border-b border-white/10'>
				<div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
					<motion.button
						aria-label='Go back'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => router.back()}
						className='flex items-center gap-2 text-white/70 hover:text-white transition-colors'>
						<ChevronLeft className='w-5 h-5' />
						<span>Back</span>
					</motion.button>

					<div className='flex items-center gap-4'>
						<OnlineStatus
							isOnline={product?.isOnline || false}
							isOwner={isCurrentUserPublisher}
							resourceId={product?.id || ''}
							resourceType='product'
							onStatusChange={(status) => {
								setProduct((prev) =>
									prev ? { ...prev, isOnline: status } : null
								);
							}}
						/>
						<motion.button
							aria-label={isLiked ? 'Unlike' : 'Like'}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsLiked(!isLiked)}
							className={`p-2 rounded-full ${
								isLiked ? 'bg-red-500/20 text-red-500' : 'bg-white/10'
							}`}>
							<Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
						</motion.button>
						<motion.button
							aria-label='Share'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='p-2 rounded-full bg-white/10'>
							<Share2 className='w-5 h-5' />
						</motion.button>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 py-8'>
				<div className='grid lg:grid-cols-2 gap-12'>
					{/* Left Column */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className='space-y-6'>
						<div className='rounded-2xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-gray-800 to-gray-900 aspect-video group'>
							{product.adResourceUrl ? (
								// <Image
								// 	src={product.adResourceUrl}
								// 	alt={product.title}
								// 	fill
								// 	className='object-cover transition-transform group-hover:scale-105'
								// />

								<Image
									src={product.adResourceUrl}
									alt={product.title}
									fill
									sizes='(max-width: 768px) 100vw, 50vw'
									priority={true}
									loading='eager'
									className='object-cover transition-transform group-hover:scale-105'
									onError={(e) => {
										console.error('Image failed to load:', e);
										// Optionally set a fallback image
										(e.target as HTMLImageElement).src = '/fallback-image.jpg';
									}}
								/>
							) : (
								<div className='w-full h-full flex items-center justify-center'>
									<Globe className='w-16 h-16 text-gray-500' />
								</div>
							)}
							{product.tags && (
								<div className='absolute bottom-4 left-4 flex flex-wrap gap-2'>
									{product.tags.map((tag) => (
										<span
											key={tag}
											className='bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium'>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>

						{/* Metrics Grid */}
						<div className='grid grid-cols-3 gap-4'>
							<MetricCard
								icon={Star}
								label='Rating'
								value={product.rating?.toFixed(1) || 'N/A'}
								color='text-yellow-400'
							/>
							<MetricCard
								icon={BarChart2}
								label='Views'
								value={product.totalViews?.toLocaleString() || '0'}
								color='text-blue-400'
							/>
							<MetricCard
								icon={Heart}
								label='Interested'
								value={product.interestedUsers?.length || 0}
								color='text-red-400'
							/>
						</div>
					</motion.div>

					{/* Right Column */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className='space-y-8'>
						<div>
							<h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
								{product.title}
							</h1>
							<p className='text-lg text-white/70 leading-relaxed'>
								{product.description}
							</p>
						</div>

						{/* Publisher Card */}
						{product.publisher && (
							// <motion.div
							// 	whileHover={{ scale: 1.02 }}
							// 	className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-4'>
							// 	<div className='flex items-center justify-between'>
							// 		<div className='flex items-center gap-4'>
							// 			{product.publisher.logoUrl ? (
							// 				<Image
							// 					src={product.publisher.logoUrl}
							// 					alt={product.publisher.name}
							// 					width={48}
							// 					height={48}
							// 					className='rounded-full'
							// 				/>
							// 			) : (
							// 				<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
							// 					<Globe className='w-6 h-6 text-white' />
							// 				</div>
							// 			)}
							// 			<div>
							// 				<h3 className='font-semibold text-lg'>
							// 					{product.publisher.name}
							// 				</h3>
							// 				{product.publisher.location && (
							// 					<p className='text-sm text-white/60 flex items-center gap-1'>
							// 						<MapPin className='w-4 h-4' />
							// 						{product.publisher.location}
							// 					</p>
							// 				)}
							// 			</div>
							// 		</div>
							// 		{!isCurrentUserPublisher && (
							// 			<motion.button
							// 				whileHover={{ scale: 1.05 }}
							// 				whileTap={{ scale: 0.95 }}
							// 				onClick={handleSendMessage}
							// 				className='bg-blue-500/20 text-blue-400 p-3 rounded-full hover:bg-blue-500/30 transition-colors'>
							// 				<MessageCircle className='w-5 h-5' />
							// 			</motion.button>
							// 		)}
							// 	</div>
							// </motion.div>
							<motion.div
								whileHover={{ scale: 1.02 }}
								className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-4'>
								{/* ... existing publisher content ... */}
								{!isCurrentUserPublisher && (
									<motion.button
										aria-label='Send message to publisher'
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={handleSendMessage}
										disabled={isSubmitting}
										className={`bg-blue-500/20 text-blue-400 p-3 rounded-full hover:bg-blue-500/30 transition-colors ${
											isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
										}`}>
										<MessageCircle className='w-5 h-5' />
									</motion.button>
								)}
							</motion.div>
						)}

						{/* Campaign Details */}
						<div className='grid grid-cols-2 gap-6'>
							<div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
								<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
									<Award className='text-amber-500' />
									Ad Details
								</h3>
								<div className='space-y-3 text-white/70'>
									<div className='flex items-center justify-between'>
										<span className='flex items-center gap-2'>
											<DollarSign className='w-4 h-4 text-green-400' />
											Cost per View
										</span>
										<span>{product.costPerView || 'N/A'}</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='flex items-center gap-2'>
											<Info className='w-4 h-4 text-blue-400' />
											Type
										</span>
										<span>{product.type}</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='flex items-center gap-2'>
											<Clock className='w-4 h-4 text-purple-400' />
											Published
										</span>
										<span>{product.publishDate || 'Not specified'}</span>
									</div>
								</div>
							</div>

							{product.adCampaignDetails && (
								<div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
									<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
										<Target className='text-cyan-500' />
										Campaign
									</h3>
									<div className='space-y-3 text-white/70'>
										<div className='flex items-center justify-between'>
											<span className='flex items-center gap-2'>
												<Zap className='w-4 h-4 text-yellow-400' />
												Objective
											</span>
											<span>{product.adCampaignDetails.objective}</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='flex items-center gap-2'>
												<Users className='w-4 h-4 text-pink-400' />
												Platform
											</span>
											<span>{product.adCampaignDetails.platform}</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='flex items-center gap-2'>
												<TrendingUp className='w-4 h-4 text-green-400' />
												Budget
											</span>
											<span>{product.adCampaignDetails.budget}</span>
										</div>
										<Link
											href={`/campaign/${product.id}`}
											className='text-blue-400 hover:text-blue-300 flex items-center mt-4'>
											View Details
											<ExternalLink className='ml-1 w-4 h-4' />
										</Link>
									</div>
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;
