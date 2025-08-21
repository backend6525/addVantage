'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/Tabs/Tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	Eye,
	ArrowUpRight,
	Activity,
	PieChart,
	Calendar,
	Video,
	PlayCircle,
	Trash2,
	Image as ImageIcon,
	Plus,
	RefreshCw,
} from 'lucide-react';
import { Product } from '@/app/dashboard/types/dashboard_types';
import { PublishedAdsTab } from './publishAdTab';

interface DashboardTabsProps {
	isMobile: boolean;
	products: Product[];
	publishedAds: Product[];
	loading: boolean;
	error: string | null;
	filteredProducts: Product[];
	handleTogglePublish: (id: string) => void;
	handleDelete: (id: string) => void;
	user: any;
	handleCreateVideoAd: () => void;
	handleProductClick: (id: string) => void;
	refreshData: () => void;
}

const ProductCardSkeleton = () => (
	<motion.div
		className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 animate-pulse'
		initial={{ opacity: 0.5 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1.5, repeat: Infinity }}>
		<div className='bg-slate-700/50 w-full h-32 rounded-lg mb-3' />
		<div className='bg-slate-700/50 w-3/4 h-4 rounded mb-2' />
		<div className='bg-slate-700/50 w-1/2 h-3 rounded mb-3' />
		<div className='bg-slate-700/50 w-full h-8 rounded-lg' />
	</motion.div>
);

const YourAdsTab = ({
	products,
	loading,
	error,
	filteredProducts,
	handleTogglePublish,
	handleDelete,
	isMobile,
	handleCreateVideoAd,
	handleProductClick,
	refreshData,
}: {
	products: Product[];
	loading: boolean;
	error: string | null;
	filteredProducts: Product[];
	handleTogglePublish: (id: string) => void;
	handleDelete: (id: string) => void;
	isMobile: boolean;
	handleCreateVideoAd: () => void;
	handleProductClick: (id: string) => void;
	refreshData: () => void;
}) => {
	const videoAds = products.filter((product) => product.type === 'video');
	const posterAds = filteredProducts.filter(
		(product) => product.type !== 'video'
	);
	const [selectedSection, setSelectedSection] = useState('poster');

	return (
		<div className='space-y-8'>
			<div>
				<div className='flex justify-between items-center mb-4'>
					<div className='flex items-center gap-4'>
						<h2 className='text-lg md:text-xl font-bold text-white flex items-center gap-2'>
							{selectedSection === 'poster' ? (
								<ImageIcon className='w-5 h-5 text-purple-400' />
							) : (
								<Video className='w-5 h-5 text-purple-400' />
							)}
							{selectedSection === 'poster' ? 'Poster Ads' : 'Video Ads'}
						</h2>
						<select
							value={selectedSection}
							onChange={(e) => setSelectedSection(e.target.value)}
							className='bg-slate-800/50 border border-slate-700 text-slate-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
							<option value='poster'>Poster Ads ({posterAds.length})</option>
							<option value='video'>Video Ads ({videoAds.length})</option>
						</select>
					</div>
					<div className='flex gap-2'>
						{selectedSection === 'video' && (
							<Button
								variant='outline'
								size='sm'
								className='bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50'
								onClick={handleCreateVideoAd}>
								<Plus className='w-4 h-4 mr-2' />
								New Video Ad
							</Button>
						)}
						<Button
							variant='outline'
							size='sm'
							className='bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50'
							onClick={refreshData}>
							<RefreshCw className='w-4 h-4 mr-2' />
							Refresh
						</Button>
					</div>
				</div>

				{loading ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
						{Array(4)
							.fill(0)
							.map((_, i) => (
								<ProductCardSkeleton key={i} />
							))}
					</div>
				) : selectedSection === 'poster' ? (
					posterAds.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
							{posterAds.map((product) => (
								<motion.div
									key={product.id}
									className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 shadow-lg overflow-hidden relative group cursor-pointer hover:shadow-purple-500/20 transition-shadow'
									whileHover={{ y: -5 }}
									transition={{ duration: 0.2 }}
									onClick={() => handleProductClick(product.id)}>
									{/* Poster Thumbnail */}
									<div
										id={`poster-${product.id}`}
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
															'Image failed to load:',
															product.adResourceUrl
														);
														const container = document.getElementById(
															`poster-${product.id}`
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
															'Image loaded successfully:',
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
											<Badge
												variant={product.isPublished ? 'default' : 'secondary'}
												className='ml-2'>
												{product.isPublished ? 'Live' : 'Draft'}
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
											variant={product.isPublished ? 'destructive' : 'default'}
											className='flex-1 hover:scale-[1.02] transition-transform'
											onClick={(e) => {
												e.stopPropagation();
												handleTogglePublish(product.id);
											}}>
											{product.isPublished ? 'Unpublish' : 'Publish'}
										</Button>
										<Button
											variant='outline'
											className='px-3 hover:scale-[1.05] transition-transform'
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(product.id);
											}}>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								</motion.div>
							))}
						</div>
					) : (
						<div className='text-center py-8'>
							<p className='text-gray-400'>No poster ads found</p>
						</div>
					)
				) : videoAds.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
						{videoAds.map((product) => (
							<motion.div
								key={product.id}
								className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 shadow-lg overflow-hidden relative group cursor-pointer hover:shadow-purple-500/20 transition-shadow'
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
										<Badge
											variant={product.isPublished ? 'default' : 'secondary'}
											className='ml-2'>
											{product.isPublished ? 'Live' : 'Draft'}
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
										variant={product.isPublished ? 'destructive' : 'default'}
										className='flex-1 hover:scale-[1.02] transition-transform'
										onClick={(e) => {
											e.stopPropagation();
											handleTogglePublish(product.id);
										}}>
										{product.isPublished ? 'Unpublish' : 'Publish'}
									</Button>
									<Button
										variant='outline'
										className='px-3 hover:scale-[1.05] transition-transform'
										onClick={(e) => {
											e.stopPropagation();
											handleDelete(product.id);
										}}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							</motion.div>
						))}
					</div>
				) : (
					<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
						<div className='bg-gradient-to-b from-slate-800/70 to-slate-900/70 p-8 rounded-xl border border-slate-700/50 mb-4 shadow-lg w-full max-w-md'>
							<div className='mx-auto bg-purple-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
								<Video className='h-6 w-6 text-purple-400' />
							</div>
							<h3 className='text-lg font-medium text-white mb-2'>
								No Video Ads Yet
							</h3>
							<p className='text-slate-400 text-sm'>
								Create your first video ad to engage your audience with dynamic
								content.
							</p>
							<Button
								className='mt-4 bg-purple-600 hover:bg-purple-700 hover:scale-[1.02] transition-transform'
								onClick={handleCreateVideoAd}>
								Create Video Ad
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
	isMobile,
	products,
	publishedAds,
	loading,
	error,
	filteredProducts,
	handleTogglePublish,
	handleDelete,
	user,
	handleCreateVideoAd,
	handleProductClick,
	refreshData,
}) => {
	const tabs = [
		{
			value: 'your-ads',
			label: isMobile ? 'Ads' : 'Your Ads',
			icon: <Eye className='w-3.5 h-3.5 md:w-4 md:h-4' />,
			notification: 0,
		},
		{
			value: 'published',
			label: isMobile ? 'Published' : 'Published Ads',
			icon: <ArrowUpRight className='w-3.5 h-3.5 md:w-4 md:h-4' />,
			notification: 2,
		},
		{
			value: 'billboard',
			label: 'Billboards',
			icon: <Activity className='w-3.5 h-3.5 md:w-4 md:h-4' />,
			notification: 0,
			comingSoon: true,
		},
		{
			value: 'tv_radio',
			label: isMobile ? 'TV/Radio' : 'TV & Radio',
			icon: <PieChart className='w-3.5 h-3.5 md:w-4 md:h-4' />,
			notification: 0,
			comingSoon: true,
		},
		{
			value: 'campaign',
			label: 'Campaigns',
			icon: <Calendar className='w-3.5 h-3.5 md:w-4 md:h-4' />,
			notification: 0,
			comingSoon: true,
		},
	];

	return (
		<div className='mt-6 md:mt-8'>
			<Tabs defaultValue='your-ads' className='w-full'>
				<div className={`sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md`}>
					<div className='w-full bg-gradient-to-r from-slate-800/90 via-slate-850/90 to-slate-900/90 shadow-2xl rounded-xl overflow-hidden relative border border-slate-700/50'>
						<div className='absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.2)_50%,transparent_75%)] bg-[length:400%_400%] animate-shine'></div>
						<TabsList className='w-full flex bg-transparent p-0 gap-1 rounded-t-lg border-b border-slate-700/50'>
							{tabs.map((tab) => (
								<TabsTrigger
									key={tab.value}
									value={tab.value}
									disabled={tab.comingSoon}
									className='group relative flex items-center justify-center min-w-[100px] px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-700/30 data-[state=active]:bg-slate-900/70 text-slate-400 hover:text-white data-[state=active]:text-white border-b-2 border-transparent data-[state=active]:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'>
									<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-purple-500/10 to-transparent'></div>
									<div className='flex items-center gap-1.5 md:gap-2'>
										{tab.icon}
										<span className='whitespace-nowrap'>{tab.label}</span>
										{tab.notification > 0 && (
											<span className='flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white'>
												{tab.notification}
											</span>
										)}
										{tab.comingSoon && (
											<span className='absolute -top-1 -right-1 flex h-3 w-3'>
												<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
												<span className='relative inline-flex rounded-full h-3 w-3 bg-purple-500'></span>
											</span>
										)}
									</div>
								</TabsTrigger>
							))}
						</TabsList>
					</div>
				</div>

				<div className='w-full mt-4 overflow-x-hidden'>
					<AnimatePresence mode='wait'>
						<TabsContent
							value='your-ads'
							className='data-[state=active]:animate-fadeIn'>
							<div className='overflow-x-hidden'>
								<YourAdsTab
									products={products}
									loading={loading}
									error={error}
									filteredProducts={filteredProducts}
									handleTogglePublish={handleTogglePublish}
									handleDelete={handleDelete}
									isMobile={isMobile}
									handleCreateVideoAd={handleCreateVideoAd}
									handleProductClick={handleProductClick}
									refreshData={refreshData}
								/>
							</div>
						</TabsContent>

						<TabsContent
							value='published'
							className='data-[state=active]:animate-fadeIn'>
							<div className='overflow-x-hidden'>
								<PublishedAdsTab
									publishedAds={publishedAds}
									handleTogglePublish={handleTogglePublish}
									handleDelete={handleDelete}
									user={user}
									isMobile={isMobile}
								/>
							</div>
						</TabsContent>

						{['billboard', 'tv_radio', 'campaign'].map((tab) => (
							<TabsContent
								key={tab}
								value={tab}
								className='data-[state=active]:animate-fadeIn'>
								<div className='flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center'>
									<div className='bg-gradient-to-b from-slate-800/70 to-slate-900/70 p-6 md:p-8 rounded-xl border border-slate-700/50 mb-4 shadow-lg w-full max-w-md mx-auto'>
										<div className='flex flex-col items-center gap-4'>
											<div className='relative'>
												<div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
												<div className='relative px-7 py-4 bg-black rounded-full leading-none flex items-center'>
													<span className='flex items-center space-x-5'>
														<span className='pr-6 text-gray-100'>
															Coming Soon
														</span>
														<span className='w-px h-6 bg-gray-700'></span>
														<span className='pl-6 text-purple-400'>
															Stay Tuned!
														</span>
													</span>
												</div>
											</div>
											<p className='text-gray-400 text-sm md:text-base'>
												We&apos;re working hard to bring you exciting new
												features. Check back soon!
											</p>
										</div>
									</div>
								</div>
							</TabsContent>
						))}
					</AnimatePresence>
				</div>
			</Tabs>
		</div>
	);
};
