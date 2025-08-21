// components/PublishedAdsTab.tsx
'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, KindeUser } from '@/app/dashboard/types/dashboard_types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Image as ImageIcon, Video, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PublishedAdsTabProps {
	publishedAds: Product[];
	handleTogglePublish: (id: string) => void;
	handleDelete?: (id: string) => void;
	user: KindeUser;
	isMobile?: boolean;
}

export const PublishedAdsTab = ({
	publishedAds,
	handleTogglePublish,
	handleDelete,
	user,
	isMobile,
}: PublishedAdsTabProps) => {
	const router = useRouter();

	const handleProductClick = (productId: string) => {
		router.push(`/dashboard/product/${productId}`);
	};

	// Separate video and poster ads
	const videoAds = publishedAds.filter((product) => product.type === 'video');
	const posterAds = publishedAds.filter((product) => product.type !== 'video');

	return (
		<div className='space-y-8'>
			{/* Poster Ads Section */}
			<div>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-lg md:text-xl font-bold text-white flex items-center gap-2'>
						<ImageIcon className='w-5 h-5 text-purple-400' />
						Published Poster Ads
						<Badge variant='outline' className='ml-2'>
							{posterAds.length}
						</Badge>
					</h2>
				</div>

				{posterAds.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
						{posterAds.map((product) => (
							<motion.div
								key={product.id}
								className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 shadow-lg overflow-hidden relative group cursor-pointer'
								whileHover={{ y: -5 }}
								transition={{ duration: 0.2 }}
								onClick={() => handleProductClick(product.id)}>
								{/* Poster Thumbnail */}
								<div
									id={`published-poster-${product.id}`}
									className='relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-700/30 to-slate-800/30 aspect-square'>
									{product.adResourceUrl ? (
										<div className='relative w-full h-full'>
											<Image
												src={product.adResourceUrl}
												alt={product.title}
												fill
												className='object-cover'
												onError={() => {
													console.log(
														'Published image failed to load:',
														product.adResourceUrl
													);
													// Fallback to placeholder icon if image fails to load
													const container = document.getElementById(
														`published-poster-${product.id}`
													);
													if (container) {
														container.innerHTML = `
															<div class="w-full h-full flex items-center justify-center bg-slate-700/50">
																<svg class="h-12 w-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
																</svg>
															</div>
														`;
													}
												}}
												onLoad={() => {
													console.log(
														'Published image loaded successfully:',
														product.adResourceUrl
													);
												}}
												unoptimized={true}
											/>
										</div>
									) : (
										<div className='w-full h-full flex items-center justify-center'>
											<ImageIcon className='h-12 w-12 text-slate-500' />
										</div>
									)}
									<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
								</div>

								{/* Ad Info */}
								<div className='mb-4'>
									<div className='flex justify-between items-start'>
										<h3 className='text-white font-semibold text-lg truncate'>
											{product.title}
										</h3>
										<Badge variant='default' className='ml-2'>
											Live
										</Badge>
									</div>
									<p className='text-slate-400 text-sm mt-2 line-clamp-2'>
										{product.description}
									</p>
								</div>

								{/* Ad Stats */}
								<div className='grid grid-cols-3 gap-2 mb-4'>
									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
										<p className='text-white font-bold'>
											{product.performance?.views || 0}
										</p>
										<p className='text-slate-500 text-xs'>Views</p>
									</div>
									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
										<p className='text-white font-bold'>
											{product.performance?.clicks || 0}
										</p>
										<p className='text-slate-500 text-xs'>Clicks</p>
									</div>
									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
										<p className='text-white font-bold'>
											{product.performance?.ctr
												? product.performance.ctr.toFixed(2)
												: '0.00'}
											%
										</p>
										<p className='text-slate-500 text-xs'>CTR</p>
									</div>
								</div>

								{/* Ad Actions */}
								<div className='flex space-x-3'>
									<Button
										variant='destructive'
										className='flex-1'
										onClick={(e) => {
											e.stopPropagation();
											handleTogglePublish(product.id);
										}}>
										Unpublish
									</Button>
									{handleDelete && (
										<Button
											variant='outline'
											className='px-3'
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(product.id);
											}}>
											<Trash2 className='h-4 w-4' />
										</Button>
									)}
								</div>
							</motion.div>
						))}
					</div>
				) : (
					<div className='text-center py-8'>
						<p className='text-gray-400'>No published poster ads found</p>
					</div>
				)}
			</div>

			{/* Video Ads Section */}
			<div className='border-t border-slate-700/50 pt-8'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-lg md:text-xl font-bold text-white flex items-center gap-2'>
						<Video className='w-5 h-5 text-purple-400' />
						Published Video Ads
						<Badge variant='outline' className='ml-2'>
							{videoAds.length}
						</Badge>
					</h2>
				</div>

				{videoAds.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
						{videoAds.map((product) => (
							<motion.div
								key={product.id}
								className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 shadow-lg overflow-hidden relative group cursor-pointer'
								whileHover={{ y: -5 }}
								transition={{ duration: 0.2 }}
								onClick={() => handleProductClick(product.id)}>
								{/* Video Thumbnail */}
								<div className='relative mb-4 rounded-lg overflow-hidden'>
									<div className='bg-gradient-to-br from-purple-900/30 to-pink-900/30 w-full aspect-video flex items-center justify-center'>
										<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
										<PlayCircle className='h-12 w-12 text-white/80 z-10' />
									</div>
									<div className='absolute top-2 right-2'>
										<Badge variant='destructive' className='px-2 py-1'>
											<Video className='w-3 h-3 mr-1' />
											Video
										</Badge>
									</div>
								</div>

								{/* Video Info */}
								<div className='mb-4'>
									<div className='flex justify-between items-start'>
										<h3 className='text-white font-semibold text-lg truncate'>
											{product.title}
										</h3>
										<Badge variant='default' className='ml-2'>
											Live
										</Badge>
									</div>
									<p className='text-slate-400 text-sm mt-2 line-clamp-2'>
										{product.description}
									</p>
								</div>

								{/* Video Stats */}
								<div className='grid grid-cols-3 gap-2 mb-4'>
									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
										<p className='text-white font-bold'>
											{product.performance?.views || 0}
										</p>
										<p className='text-slate-500 text-xs'>Views</p>
									</div>
									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
										<p className='text-white font-bold'>
											{product.performance?.clicks || 0}
										</p>
										<p className='text-slate-500 text-xs'>Clicks</p>
									</div>
									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
										<p className='text-white font-bold'>
											{product.performance?.ctr
												? product.performance.ctr.toFixed(2)
												: '0.00'}
											%
										</p>
										<p className='text-slate-500 text-xs'>CTR</p>
									</div>
								</div>

								{/* Video Actions */}
								<div className='flex space-x-3'>
									<Button
										variant='destructive'
										className='flex-1'
										onClick={(e) => {
											e.stopPropagation();
											handleTogglePublish(product.id);
										}}>
										Unpublish
									</Button>
									{handleDelete && (
										<Button
											variant='outline'
											className='px-3'
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(product.id);
											}}>
											<Trash2 className='h-4 w-4' />
										</Button>
									)}
								</div>
							</motion.div>
						))}
					</div>
				) : (
					<div className='text-center py-8'>
						<p className='text-gray-400'>No published video ads found</p>
					</div>
				)}
			</div>
		</div>
	);
};
