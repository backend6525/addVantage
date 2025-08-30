// 'use client';
// import React, { useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import {
// 	Tabs,
// 	TabsContent,
// 	TabsList,
// 	TabsTrigger,
// } from '@/components/ui/Tabs/Tabs';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import {
// 	Eye,
// 	ArrowUpRight,
// 	Activity,
// 	PieChart,
// 	Calendar,
// 	Video,
// 	PlayCircle,
// 	Trash2,
// 	Image as ImageIcon,
// 	Plus,
// 	RefreshCw,
// } from 'lucide-react';
// import { Product } from '@/app/dashboard/types/dashboard_types';
// import { PublishedAdsTab } from './publishAdTab';

// interface DashboardTabsProps {
// 	isMobile: boolean;
// 	products: Product[];
// 	publishedAds: Product[];
// 	loading: boolean;
// 	error: string | null;
// 	filteredProducts: Product[];
// 	handleTogglePublish: (id: string) => void;
// 	handleDelete: (id: string) => void;
// 	user: any;
// 	handleCreateVideoAd: () => void;
// 	handleProductClick: (id: string) => void;
// 	refreshData: () => void;
// }

// const ProductCardSkeleton = () => (
// 	<motion.div
// 		className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 animate-pulse'
// 		initial={{ opacity: 0.5 }}
// 		animate={{ opacity: 1 }}
// 		transition={{ duration: 1.5, repeat: Infinity }}>
// 		<div className='bg-slate-700/50 w-full h-32 rounded-lg mb-3' />
// 		<div className='bg-slate-700/50 w-3/4 h-4 rounded mb-2' />
// 		<div className='bg-slate-700/50 w-1/2 h-3 rounded mb-3' />
// 		<div className='bg-slate-700/50 w-full h-8 rounded-lg' />
// 	</motion.div>
// );

// const YourAdsTab = ({
// 	products,
// 	loading,
// 	error,
// 	filteredProducts,
// 	handleTogglePublish,
// 	handleDelete,
// 	isMobile,
// 	handleCreateVideoAd,
// 	handleProductClick,
// 	refreshData,
// }: {
// 	products: Product[];
// 	loading: boolean;
// 	error: string | null;
// 	filteredProducts: Product[];
// 	handleTogglePublish: (id: string) => void;
// 	handleDelete: (id: string) => void;
// 	isMobile: boolean;
// 	handleCreateVideoAd: () => void;
// 	handleProductClick: (id: string) => void;
// 	refreshData: () => void;
// }) => {
// 	const videoAds = products.filter((product) => product.type === 'video');
// 	const posterAds = filteredProducts.filter(
// 		(product) => product.type !== 'video'
// 	);
// 	const [selectedSection, setSelectedSection] = useState('poster');

// 	return (
// 		<div className='space-y-8'>
// 			<div>
// 				<div className='flex justify-between items-center mb-4'>
// 					<div className='flex items-center gap-4'>
// 						<h2 className='text-lg md:text-xl font-bold text-white flex items-center gap-2'>
// 							{selectedSection === 'poster' ? (
// 								<ImageIcon className='w-5 h-5 text-purple-400' />
// 							) : (
// 								<Video className='w-5 h-5 text-purple-400' />
// 							)}
// 							{selectedSection === 'poster' ? 'Poster Ads' : 'Video Ads'}
// 						</h2>
// 						<select
// 							value={selectedSection}
// 							onChange={(e) => setSelectedSection(e.target.value)}
// 							className='bg-slate-800/50 border border-slate-700 text-slate-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
// 							<option value='poster'>Poster Ads ({posterAds.length})</option>
// 							<option value='video'>Video Ads ({videoAds.length})</option>
// 						</select>
// 					</div>
// 					<div className='flex gap-2'>
// 						{selectedSection === 'video' && (
// 							<Button
// 								variant='outline'
// 								size='sm'
// 								className='bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50'
// 								onClick={handleCreateVideoAd}>
// 								<Plus className='w-4 h-4 mr-2' />
// 								New Video Ad
// 							</Button>
// 						)}
// 						<Button
// 							variant='outline'
// 							size='sm'
// 							className='bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50'
// 							onClick={refreshData}>
// 							<RefreshCw className='w-4 h-4 mr-2' />
// 							Refresh
// 						</Button>
// 					</div>
// 				</div>

// 				{loading ? (
// 					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
// 						{Array(4)
// 							.fill(0)
// 							.map((_, i) => (
// 								<ProductCardSkeleton key={i} />
// 							))}
// 					</div>
// 				) : selectedSection === 'poster' ? (
// 					posterAds.length > 0 ? (
// 						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
// 							{posterAds.map((product) => (
// 								<motion.div
// 									key={product.id}
// 									className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 shadow-lg overflow-hidden relative group cursor-pointer hover:shadow-purple-500/20 transition-shadow'
// 									whileHover={{ y: -5 }}
// 									transition={{ duration: 0.2 }}
// 									onClick={() => handleProductClick(product.id)}>
// 									{/* Poster Thumbnail */}
// 									<div
// 										id={`poster-${product.id}`}
// 										className='relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-700/30 to-slate-800/30 aspect-square'>
// 										{product.adResourceUrl ? (
// 											<div className='relative w-full h-full'>
// 												<Image
// 													src={product.adResourceUrl}
// 													alt={product.title}
// 													fill
// 													className='object-cover'
// 													onError={() => {
// 														console.log(
// 															'Image failed to load:',
// 															product.adResourceUrl
// 														);
// 														const container = document.getElementById(
// 															`poster-${product.id}`
// 														);
// 														if (container) {
// 															container.innerHTML = `
//                                 <div class="w-full h-full flex items-center justify-center bg-slate-700/50">
//                                   <svg class="h-12 w-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                                   </svg>
//                                 </div>
//                               `;
// 														}
// 													}}
// 													onLoad={() => {
// 														console.log(
// 															'Image loaded successfully:',
// 															product.adResourceUrl
// 														);
// 													}}
// 													unoptimized={true}
// 												/>
// 											</div>
// 										) : (
// 											<div className='w-full h-full flex items-center justify-center'>
// 												<ImageIcon className='h-12 w-12 text-slate-500' />
// 											</div>
// 										)}
// 										<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
// 									</div>

// 									{/* Ad Info */}
// 									<div className='mb-4'>
// 										<div className='flex justify-between items-start'>
// 											<h3 className='text-white font-semibold text-lg truncate'>
// 												{product.title}
// 											</h3>
// 											<Badge
// 												variant={product.isPublished ? 'default' : 'secondary'}
// 												className='ml-2'>
// 												{product.isPublished ? 'Live' : 'Draft'}
// 											</Badge>
// 										</div>
// 										<p className='text-slate-400 text-sm mt-2 line-clamp-2'>
// 											{product.description}
// 										</p>
// 									</div>

// 									{/* Ad Stats */}
// 									<div className='grid grid-cols-3 gap-2 mb-4'>
// 										<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
// 											<p className='text-white font-bold'>
// 												{product.performance?.views || 0}
// 											</p>
// 											<p className='text-slate-500 text-xs'>Views</p>
// 										</div>
// 										<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
// 											<p className='text-white font-bold'>
// 												{product.performance?.clicks || 0}
// 											</p>
// 											<p className='text-slate-500 text-xs'>Clicks</p>
// 										</div>
// 										<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
// 											<p className='text-white font-bold'>
// 												{product.performance?.ctr
// 													? product.performance.ctr.toFixed(2)
// 													: '0.00'}
// 												%
// 											</p>
// 											<p className='text-slate-500 text-xs'>CTR</p>
// 										</div>
// 									</div>

// 									{/* Ad Actions */}
// 									<div className='flex space-x-3'>
// 										<Button
// 											variant={product.isPublished ? 'destructive' : 'default'}
// 											className='flex-1 hover:scale-[1.02] transition-transform'
// 											onClick={(e) => {
// 												e.stopPropagation();
// 												handleTogglePublish(product.id);
// 											}}>
// 											{product.isPublished ? 'Unpublish' : 'Publish'}
// 										</Button>
// 										<Button
// 											variant='outline'
// 											className='px-3 hover:scale-[1.05] transition-transform'
// 											onClick={(e) => {
// 												e.stopPropagation();
// 												handleDelete(product.id);
// 											}}>
// 											<Trash2 className='h-4 w-4' />
// 										</Button>
// 									</div>
// 								</motion.div>
// 							))}
// 						</div>
// 					) : (
// 						<div className='text-center py-8'>
// 							<p className='text-gray-400'>No poster ads found</p>
// 						</div>
// 					)
// 				) : videoAds.length > 0 ? (
// 					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
// 						{videoAds.map((product) => (
// 							<motion.div
// 								key={product.id}
// 								className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 shadow-lg overflow-hidden relative group cursor-pointer hover:shadow-purple-500/20 transition-shadow'
// 								whileHover={{ y: -5 }}
// 								transition={{ duration: 0.2 }}
// 								onClick={() => handleProductClick(product.id)}>
// 								{/* Video Thumbnail */}
// 								<div className='relative mb-4 rounded-lg overflow-hidden'>
// 									<div className='bg-gradient-to-br from-purple-900/30 to-pink-900/30 w-full aspect-video flex items-center justify-center'>
// 										<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
// 										<PlayCircle className='h-12 w-12 text-white/80 z-10' />
// 									</div>
// 									<div className='absolute top-2 right-2'>
// 										<Badge variant='destructive' className='px-2 py-1'>
// 											<Video className='w-3 h-3 mr-1' />
// 											Video
// 										</Badge>
// 									</div>
// 								</div>

// 								{/* Video Info */}
// 								<div className='mb-4'>
// 									<div className='flex justify-between items-start'>
// 										<h3 className='text-white font-semibold text-lg truncate'>
// 											{product.title}
// 										</h3>
// 										<Badge
// 											variant={product.isPublished ? 'default' : 'secondary'}
// 											className='ml-2'>
// 											{product.isPublished ? 'Live' : 'Draft'}
// 										</Badge>
// 									</div>
// 									<p className='text-slate-400 text-sm mt-2 line-clamp-2'>
// 										{product.description}
// 									</p>
// 								</div>

// 								{/* Video Stats */}
// 								<div className='grid grid-cols-3 gap-2 mb-4'>
// 									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
// 										<p className='text-white font-bold'>
// 											{product.performance?.views || 0}
// 										</p>
// 										<p className='text-slate-500 text-xs'>Views</p>
// 									</div>
// 									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
// 										<p className='text-white font-bold'>
// 											{product.performance?.clicks || 0}
// 										</p>
// 										<p className='text-slate-500 text-xs'>Clicks</p>
// 									</div>
// 									<div className='text-center p-2 bg-slate-800/50 rounded-lg'>
// 										<p className='text-white font-bold'>
// 											{product.performance?.ctr
// 												? product.performance.ctr.toFixed(2)
// 												: '0.00'}
// 											%
// 										</p>
// 										<p className='text-slate-500 text-xs'>CTR</p>
// 									</div>
// 								</div>

// 								{/* Video Actions */}
// 								<div className='flex space-x-3'>
// 									<Button
// 										variant={product.isPublished ? 'destructive' : 'default'}
// 										className='flex-1 hover:scale-[1.02] transition-transform'
// 										onClick={(e) => {
// 											e.stopPropagation();
// 											handleTogglePublish(product.id);
// 										}}>
// 										{product.isPublished ? 'Unpublish' : 'Publish'}
// 									</Button>
// 									<Button
// 										variant='outline'
// 										className='px-3 hover:scale-[1.05] transition-transform'
// 										onClick={(e) => {
// 											e.stopPropagation();
// 											handleDelete(product.id);
// 										}}>
// 										<Trash2 className='h-4 w-4' />
// 									</Button>
// 								</div>
// 							</motion.div>
// 						))}
// 					</div>
// 				) : (
// 					<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
// 						<div className='bg-gradient-to-b from-slate-800/70 to-slate-900/70 p-8 rounded-xl border border-slate-700/50 mb-4 shadow-lg w-full max-w-md'>
// 							<div className='mx-auto bg-purple-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
// 								<Video className='h-6 w-6 text-purple-400' />
// 							</div>
// 							<h3 className='text-lg font-medium text-white mb-2'>
// 								No Video Ads Yet
// 							</h3>
// 							<p className='text-slate-400 text-sm'>
// 								Create your first video ad to engage your audience with dynamic
// 								content.
// 							</p>
// 							<Button
// 								className='mt-4 bg-purple-600 hover:bg-purple-700 hover:scale-[1.02] transition-transform'
// 								onClick={handleCreateVideoAd}>
// 								Create Video Ad
// 							</Button>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export const DashboardTabs: React.FC<DashboardTabsProps> = ({
// 	isMobile,
// 	products,
// 	publishedAds,
// 	loading,
// 	error,
// 	filteredProducts,
// 	handleTogglePublish,
// 	handleDelete,
// 	user,
// 	handleCreateVideoAd,
// 	handleProductClick,
// 	refreshData,
// }) => {
// 	const tabs = [
// 		{
// 			value: 'your-ads',
// 			label: isMobile ? 'Ads' : 'Your Ads',
// 			icon: <Eye className='w-3.5 h-3.5 md:w-4 md:h-4' />,
// 			notification: 0,
// 		},
// 		{
// 			value: 'published',
// 			label: isMobile ? 'Published' : 'Published Ads',
// 			icon: <ArrowUpRight className='w-3.5 h-3.5 md:w-4 md:h-4' />,
// 			notification: 2,
// 		},
// 		{
// 			value: 'billboard',
// 			label: 'Billboards',
// 			icon: <Activity className='w-3.5 h-3.5 md:w-4 md:h-4' />,
// 			notification: 0,
// 			comingSoon: true,
// 		},
// 		{
// 			value: 'tv_radio',
// 			label: isMobile ? 'TV/Radio' : 'TV & Radio',
// 			icon: <PieChart className='w-3.5 h-3.5 md:w-4 md:h-4' />,
// 			notification: 0,
// 			comingSoon: true,
// 		},
// 		{
// 			value: 'campaign',
// 			label: 'Campaigns',
// 			icon: <Calendar className='w-3.5 h-3.5 md:w-4 md:h-4' />,
// 			notification: 0,
// 			comingSoon: true,
// 		},
// 	];

// 	return (
// 		<div className='mt-6 md:mt-8'>
// 			<Tabs defaultValue='your-ads' className='w-full'>
// 				<div className={`sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md`}>
// 					<div className='w-full bg-gradient-to-r from-slate-800/90 via-slate-850/90 to-slate-900/90 shadow-2xl rounded-xl overflow-hidden relative border border-slate-700/50'>
// 						<div className='absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.2)_50%,transparent_75%)] bg-[length:400%_400%] animate-shine'></div>
// 						<TabsList className='w-full flex bg-transparent p-0 gap-1 rounded-t-lg border-b border-slate-700/50'>
// 							{tabs.map((tab) => (
// 								<TabsTrigger
// 									key={tab.value}
// 									value={tab.value}
// 									disabled={tab.comingSoon}
// 									className='group relative flex items-center justify-center min-w-[100px] px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-700/30 data-[state=active]:bg-slate-900/70 text-slate-400 hover:text-white data-[state=active]:text-white border-b-2 border-transparent data-[state=active]:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'>
// 									<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-purple-500/10 to-transparent'></div>
// 									<div className='flex items-center gap-1.5 md:gap-2'>
// 										{tab.icon}
// 										<span className='whitespace-nowrap'>{tab.label}</span>
// 										{tab.notification > 0 && (
// 											<span className='flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white'>
// 												{tab.notification}
// 											</span>
// 										)}
// 										{tab.comingSoon && (
// 											<span className='absolute -top-1 -right-1 flex h-3 w-3'>
// 												<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
// 												<span className='relative inline-flex rounded-full h-3 w-3 bg-purple-500'></span>
// 											</span>
// 										)}
// 									</div>
// 								</TabsTrigger>
// 							))}
// 						</TabsList>
// 					</div>
// 				</div>

// 				<div className='w-full mt-4 overflow-x-hidden'>
// 					<AnimatePresence mode='wait'>
// 						<TabsContent
// 							value='your-ads'
// 							className='data-[state=active]:animate-fadeIn'>
// 							<div className='overflow-x-hidden'>
// 								<YourAdsTab
// 									products={products}
// 									loading={loading}
// 									error={error}
// 									filteredProducts={filteredProducts}
// 									handleTogglePublish={handleTogglePublish}
// 									handleDelete={handleDelete}
// 									isMobile={isMobile}
// 									handleCreateVideoAd={handleCreateVideoAd}
// 									handleProductClick={handleProductClick}
// 									refreshData={refreshData}
// 								/>
// 							</div>
// 						</TabsContent>

// 						<TabsContent
// 							value='published'
// 							className='data-[state=active]:animate-fadeIn'>
// 							<div className='overflow-x-hidden'>
// 								<PublishedAdsTab
// 									publishedAds={publishedAds}
// 									handleTogglePublish={handleTogglePublish}
// 									handleDelete={handleDelete}
// 									user={user}
// 									isMobile={isMobile}
// 								/>
// 							</div>
// 						</TabsContent>

// 						{['billboard', 'tv_radio', 'campaign'].map((tab) => (
// 							<TabsContent
// 								key={tab}
// 								value={tab}
// 								className='data-[state=active]:animate-fadeIn'>
// 								<div className='flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center'>
// 									<div className='bg-gradient-to-b from-slate-800/70 to-slate-900/70 p-6 md:p-8 rounded-xl border border-slate-700/50 mb-4 shadow-lg w-full max-w-md mx-auto'>
// 										<div className='flex flex-col items-center gap-4'>
// 											<div className='relative'>
// 												<div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
// 												<div className='relative px-7 py-4 bg-black rounded-full leading-none flex items-center'>
// 													<span className='flex items-center space-x-5'>
// 														<span className='pr-6 text-gray-100'>
// 															Coming Soon
// 														</span>
// 														<span className='w-px h-6 bg-gray-700'></span>
// 														<span className='pl-6 text-purple-400'>
// 															Stay Tuned!
// 														</span>
// 													</span>
// 												</div>
// 											</div>
// 											<p className='text-gray-400 text-sm md:text-base'>
// 												We&apos;re working hard to bring you exciting new
// 												features. Check back soon!
// 											</p>
// 										</div>
// 									</div>
// 								</div>
// 							</TabsContent>
// 						))}
// 					</AnimatePresence>
// 				</div>
// 			</Tabs>
// 		</div>
// 	);
// };

'use client';
import React, { useState } from 'react';
import {
	Eye,
	ArrowUpRight,
	Activity,
	PieChart,
	Calendar,
	Video,
	PlayCircle,
	Trash2,
	ImageIcon,
	Plus,
	RefreshCw,
	TrendingUp,
	BarChart3,
	Users,
	Clock,
	Edit3,
	Share2,
	MoreVertical,
	Search,
	Grid3X3,
	List,
	Zap,
	Target,
	DollarSign,
	Sparkles,
	Filter,
} from 'lucide-react';

// Enhanced Product Card Skeleton with better animations
const ProductCardSkeleton = () => (
	<div className='relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-hidden'>
		<div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer' />
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='bg-white/10 w-20 h-6 rounded-full' />
				<div className='bg-white/10 w-8 h-8 rounded-full' />
			</div>
			<div className='bg-white/10 w-full h-48 rounded-xl' />
			<div className='space-y-3'>
				<div className='bg-white/10 w-3/4 h-5 rounded' />
				<div className='bg-white/10 w-1/2 h-4 rounded' />
				<div className='grid grid-cols-2 gap-3'>
					<div className='bg-white/10 w-full h-12 rounded-lg' />
					<div className='bg-white/10 w-full h-12 rounded-lg' />
				</div>
				<div className='bg-white/10 w-full h-10 rounded-lg' />
			</div>
		</div>
	</div>
);

// Enhanced Action Dropdown
const ActionDropdown = ({ product, onEdit, onDelete, onPublish, onShare }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='relative'>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
				className='p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group'>
				<MoreVertical className='w-4 h-4 text-gray-400 group-hover:text-white transition-colors' />
			</button>
			{isOpen && (
				<>
					<div
						className='fixed inset-0 z-40'
						onClick={() => setIsOpen(false)}
					/>
					<div className='absolute right-0 top-full mt-2 w-48 bg-slate-800/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
						<div className='p-2 space-y-1'>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onEdit?.(product.id);
									setIsOpen(false);
								}}
								className='flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'>
								<Edit3 className='w-4 h-4' />
								Edit Ad
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onShare?.(product.id);
									setIsOpen(false);
								}}
								className='flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'>
								<Share2 className='w-4 h-4' />
								Share Ad
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onPublish?.(product.id);
									setIsOpen(false);
								}}
								className={`flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-all duration-200 ${
									product.isPublished
										? 'text-red-400 hover:text-red-300'
										: 'text-green-400 hover:text-green-300'
								}`}>
								<Zap className='w-4 h-4' />
								{product.isPublished ? 'Unpublish' : 'Publish'}
							</button>
							<div className='h-px bg-white/10 my-1' />
							<button
								onClick={(e) => {
									e.stopPropagation();
									onDelete?.(product.id);
									setIsOpen(false);
								}}
								className='flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200'>
								<Trash2 className='w-4 h-4' />
								Delete Ad
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

// Enhanced Product Card
const EnhancedProductCard = ({
	product,
	onClick,
	onEdit,
	onDelete,
	onPublish,
	onShare,
}) => {
	const [imageError, setImageError] = useState(false);

	return (
		<div
			className='group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2'
			onClick={() => onClick?.(product.id)}>
			{/* Animated background gradient */}
			<div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

			{/* Header with status and actions */}
			<div className='flex items-start justify-between mb-4 relative z-10'>
				<div className='flex items-center gap-3'>
					{product.type === 'video' ? (
						<div className='p-2.5 bg-red-500/20 rounded-xl border border-red-500/30'>
							<Video className='w-5 h-5 text-red-400' />
						</div>
					) : (
						<div className='p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30'>
							<ImageIcon className='w-5 h-5 text-blue-400' />
						</div>
					)}
					<div
						className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${
							product.isPublished
								? 'bg-green-500/20 text-green-400 border-green-500/30'
								: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
						}`}>
						{product.isPublished ? 'Live' : 'Draft'}
					</div>
				</div>
				<ActionDropdown
					product={product}
					onEdit={onEdit}
					onDelete={onDelete}
					onPublish={onPublish}
					onShare={onShare}
				/>
			</div>

			{/* Enhanced Media Section */}
			<div className='relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 aspect-video group-hover:scale-[1.02] transition-transform duration-300'>
				{product.type === 'video' ? (
					<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-pink-900/40 relative'>
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]' />
						<PlayCircle className='w-16 h-16 text-white/90 drop-shadow-lg z-10' />
						<div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent' />
					</div>
				) : product.adResourceUrl && !imageError ? (
					<div className='relative w-full h-full'>
						<img
							src={product.adResourceUrl}
							alt={product.title}
							className='w-full h-full object-cover'
							onError={() => setImageError(true)}
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
					</div>
				) : (
					<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700/30 to-slate-800/30'>
						<ImageIcon className='w-12 h-12 text-gray-500' />
					</div>
				)}

				{/* Media type badge */}
				<div className='absolute top-3 right-3'>
					<div className='bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10'>
						<span className='text-xs text-white font-semibold'>
							{product.type === 'video' ? 'Video' : 'Image'}
						</span>
					</div>
				</div>

				{/* Hover overlay */}
				<div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
					<div className='text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30'>
						Click to view
					</div>
				</div>
			</div>

			{/* Enhanced Content */}
			<div className='space-y-4 relative z-10'>
				<div>
					<h3 className='text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors'>
						{product.title}
					</h3>
					<p className='text-gray-400 text-sm line-clamp-2 leading-relaxed'>
						{product.description}
					</p>
				</div>

				{/* Enhanced Performance Metrics */}
				<div className='grid grid-cols-3 gap-3'>
					<div className='bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors'>
						<div className='flex items-center gap-2 mb-1'>
							<Eye className='w-4 h-4 text-blue-400' />
							<span className='text-xs text-gray-400 font-medium'>Views</span>
						</div>
						<p className='text-lg font-bold text-white'>
							{product.performance?.views
								? product.performance.views > 999
									? `${(product.performance.views / 1000).toFixed(1)}K`
									: product.performance.views.toLocaleString()
								: '0'}
						</p>
					</div>
					<div className='bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors'>
						<div className='flex items-center gap-2 mb-1'>
							<Target className='w-4 h-4 text-green-400' />
							<span className='text-xs text-gray-400 font-medium'>Clicks</span>
						</div>
						<p className='text-lg font-bold text-white'>
							{product.performance?.clicks || 0}
						</p>
					</div>
					<div className='bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors'>
						<div className='flex items-center gap-2 mb-1'>
							<BarChart3 className='w-4 h-4 text-purple-400' />
							<span className='text-xs text-gray-400 font-medium'>CTR</span>
						</div>
						<p className='text-lg font-bold text-white'>
							{product.performance?.ctr
								? `${product.performance.ctr.toFixed(1)}%`
								: '0%'}
						</p>
					</div>
				</div>

				{/* Enhanced Actions */}
				<div className='flex items-center justify-between pt-4 border-t border-white/10'>
					<div className='flex items-center gap-2'>
						<DollarSign className='w-4 h-4 text-green-400' />
						<span className='text-sm font-semibold text-white'>
							Budget: ${(product.budget || 0).toLocaleString()}
						</span>
					</div>
					<div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit?.(product.id);
							}}
							className='p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group/btn'>
							<Edit3 className='w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors' />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onPublish?.(product.id);
							}}
							className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 ${
								product.isPublished
									? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
									: 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
							}`}>
							{product.isPublished ? 'Pause' : 'Launch'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Enhanced Your Ads Tab
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
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [viewMode, setViewMode] = useState('grid');

	const videoAds = products.filter((product) => product.type === 'video');
	const posterAds = filteredProducts.filter(
		(product) => product.type !== 'video'
	);

	// Filter logic
	const getFilteredProducts = () => {
		let filtered = filteredProducts;

		if (searchTerm) {
			filtered = filtered.filter(
				(product) =>
					product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (selectedType !== 'all') {
			filtered = filtered.filter((product) => product.type === selectedType);
		}

		return filtered;
	};

	const displayProducts = getFilteredProducts();

	return (
		<div className='space-y-8'>
			{/* Content Area */}
			{loading ? (
				<div
					className={`grid gap-6 ${
						viewMode === 'grid'
							? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
							: 'grid-cols-1'
					}`}>
					{Array(6)
						.fill(0)
						.map((_, i) => (
							<ProductCardSkeleton key={i} />
						))}
				</div>
			) : displayProducts.length > 0 ? (
				<div
					className={`grid gap-6 ${
						viewMode === 'grid'
							? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
							: 'grid-cols-1 max-w-4xl mx-auto'
					}`}>
					{displayProducts.map((product) => (
						<EnhancedProductCard
							key={product.id}
							product={product}
							onClick={handleProductClick}
							onEdit={(id) => console.log('Edit:', id)}
							onDelete={handleDelete}
							onPublish={handleTogglePublish}
							onShare={(id) => console.log('Share:', id)}
						/>
					))}
				</div>
			) : (
				<div className='text-center py-16'>
					<div className='bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto'>
						<div className='mb-6'>
							<div className='w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
								<Search className='w-10 h-10 text-purple-400' />
							</div>
							<h3 className='text-xl font-semibold text-white mb-3'>
								No ads found
							</h3>
							<p className='text-gray-400 leading-relaxed'>
								{searchTerm || selectedType !== 'all'
									? 'Try adjusting your search or filter criteria'
									: 'Create your first ad to get started with your campaigns'}
							</p>
						</div>
						{searchTerm || selectedType !== 'all' ? (
							<button
								onClick={() => {
									setSearchTerm('');
									setSelectedType('all');
								}}
								className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105'>
								Clear Filters
							</button>
						) : (
							<button
								onClick={handleCreateVideoAd}
								className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg'>
								<Plus className='w-4 h-4 mr-2 inline' />
								Create Your First Ad
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

// Enhanced Published Ads Tab
const PublishedAdsTab = ({
	publishedAds,
	handleTogglePublish,
	handleDelete,
	user,
	isMobile,
	handleProductClick, // Added this prop
}) => {
	return (
		<div className='space-y-8'>
			{publishedAds.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{publishedAds.map((product) => (
						<EnhancedProductCard
							key={product.id}
							product={product}
							onClick={handleProductClick} // Fixed: Now using handleProductClick
							onEdit={(id) => console.log('Edit:', id)}
							onDelete={handleDelete}
							onPublish={handleTogglePublish}
							onShare={(id) => console.log('Share:', id)}
						/>
					))}
				</div>
			) : (
				<div className='text-center py-16'>
					<div className='bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto'>
						<ArrowUpRight className='w-16 h-16 text-green-400 mx-auto mb-6' />
						<h3 className='text-xl font-semibold text-white mb-3'>
							No Published Ads
						</h3>
						<p className='text-gray-400'>
							Publish some ads to start reaching your audience
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

// Main Dashboard Tabs Component
export const DashboardTabs = ({
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
	const [activeTab, setActiveTab] = useState('your-ads');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [viewMode, setViewMode] = useState('grid');

	const tabs = [
		{
			value: 'your-ads',
			label: isMobile ? 'Ads' : 'Your Ads',
			icon: <Eye className='w-4 h-4' />,
			count: products.length,
		},
		{
			value: 'published',
			label: isMobile ? 'Published' : 'Published Ads',
			icon: <ArrowUpRight className='w-4 h-4' />,
			count: publishedAds.length,
		},
		{
			value: 'billboard',
			label: 'Billboards',
			icon: <Activity className='w-4 h-4' />,
			comingSoon: true,
		},
		{
			value: 'tv_radio',
			label: isMobile ? 'TV/Radio' : 'TV & Radio',
			icon: <PieChart className='w-4 h-4' />,
			comingSoon: true,
		},
		{
			value: 'campaign',
			label: 'Campaigns',
			icon: <Calendar className='w-4 h-4' />,
			comingSoon: true,
		},
	];

	// Filter logic for Your Ads tab
	const getFilteredProducts = () => {
		let filtered = filteredProducts;

		if (searchTerm) {
			filtered = filtered.filter(
				(product) =>
					product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (selectedType !== 'all') {
			filtered = filtered.filter((product) => product.type === selectedType);
		}

		return filtered;
	};

	const displayProducts = getFilteredProducts();

	// Get tab-specific title and subtitle
	const getTabContent = () => {
		switch (activeTab) {
			case 'your-ads':
				return {
					title: 'Your Advertisements',
					subtitle: 'Manage and optimize your ad campaigns',
					icon: <Sparkles className='w-6 h-6 text-purple-400' />,
					showControls: true,
					showSearch: true,
				};
			case 'published':
				return {
					title: 'Published Campaigns',
					subtitle: 'Your live advertisements reaching audiences',
					icon: <ArrowUpRight className='w-6 h-6 text-green-400' />,
					showControls: false,
					showSearch: false,
				};
			case 'billboard':
				return {
					title: 'Billboard Campaigns',
					subtitle: 'Outdoor advertising for maximum visibility',
					icon: <Activity className='w-6 h-6 text-yellow-400' />,
					showControls: false,
					showSearch: false,
				};
			case 'tv_radio':
				return {
					title: 'TV & Radio Campaigns',
					subtitle: 'Broadcast advertising across media channels',
					icon: <PieChart className='w-6 h-6 text-blue-400' />,
					showControls: false,
					showSearch: false,
				};
			case 'campaign':
				return {
					title: 'Campaign Management',
					subtitle: 'Organize and track your marketing initiatives',
					icon: <Calendar className='w-6 h-6 text-pink-400' />,
					showControls: false,
					showSearch: false,
				};
			default:
				return {
					title: 'Your Advertisements',
					subtitle: 'Manage and optimize your ad campaigns',
					icon: <Sparkles className='w-6 h-6 text-purple-400' />,
					showControls: true,
					showSearch: true,
				};
		}
	};

	const tabContent = getTabContent();

	return (
		<div className='mt-8 space-y-8'>
			{/* Integrated Tab Navigation and Header */}
			<div className='bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden'>
				{/* Tab Navigation */}
				<div className='flex items-center overflow-x-auto scrollbar-hide border-b border-white/10'>
					{tabs.map((tab) => (
						<button
							key={tab.value}
							onClick={() => !tab.comingSoon && setActiveTab(tab.value)}
							disabled={tab.comingSoon}
							className={`relative flex items-center gap-3 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap min-w-fit ${
								activeTab === tab.value
									? 'text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b-2 border-purple-500'
									: tab.comingSoon
										? 'text-gray-500 cursor-not-allowed'
										: 'text-gray-400 hover:text-white hover:bg-white/5'
							}`}>
							{tab.icon}
							<span>{tab.label}</span>
							{tab.count !== undefined && (
								<span className='px-2 py-1 bg-white/10 rounded-full text-xs font-semibold'>
									{tab.count}
								</span>
							)}
							{tab.comingSoon && (
								<div className='absolute -top-1 -right-1 flex'>
									<span className='w-3 h-3 bg-purple-500 rounded-full animate-pulse' />
									<span className='absolute w-3 h-3 bg-purple-400 rounded-full animate-ping' />
								</div>
							)}
						</button>
					))}
				</div>

				{/* Integrated Header Content */}
				<div className='p-6'>
					<div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6'>
						<div>
							<h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-3'>
								{tabContent.icon}
								{tabContent.title}
							</h2>
							<p className='text-gray-400'>{tabContent.subtitle}</p>
						</div>
						{tabContent.showControls && (
							<div className='flex items-center gap-3'>
								<div className='flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10'>
									<button
										onClick={() => setViewMode('grid')}
										className={`p-2 rounded-md transition-colors ${
											viewMode === 'grid'
												? 'bg-purple-500/20 text-purple-400'
												: 'text-gray-400 hover:text-white'
										}`}>
										<Grid3X3 className='w-4 h-4' />
									</button>
									<button
										onClick={() => setViewMode('list')}
										className={`p-2 rounded-md transition-colors ${
											viewMode === 'list'
												? 'bg-purple-500/20 text-purple-400'
												: 'text-gray-400 hover:text-white'
										}`}>
										<List className='w-4 h-4' />
									</button>
								</div>
								<button
									onClick={handleCreateVideoAd}
									className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg'>
									<Plus className='w-4 h-4 mr-2 inline' />
									Create Ad
								</button>
							</div>
						)}
					</div>

					{/* Search and Filter Bar - Only for Your Ads */}
					{tabContent.showSearch && (
						<div className='flex flex-col sm:flex-row gap-4'>
							<div className='relative flex-1'>
								<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
								<input
									type='text'
									placeholder='Search your ads...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-200'
								/>
							</div>
							<div className='flex gap-3'>
								<select
									value={selectedType}
									onChange={(e) => setSelectedType(e.target.value)}
									className='px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 min-w-[120px]'>
									<option value='all'>All Types</option>
									<option value='poster'>Poster Ads</option>
									<option value='video'>Video Ads</option>
								</select>
								<button
									onClick={refreshData}
									className='px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group'>
									<RefreshCw className='w-4 h-4 group-hover:rotate-180 transition-transform duration-500' />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Tab Content */}
			<div className='relative'>
				{activeTab === 'your-ads' && (
					<div className='space-y-8'>
						{loading ? (
							<div
								className={`grid gap-6 ${
									viewMode === 'grid'
										? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
										: 'grid-cols-1'
								}`}>
								{Array(6)
									.fill(0)
									.map((_, i) => (
										<ProductCardSkeleton key={i} />
									))}
							</div>
						) : displayProducts.length > 0 ? (
							<div
								className={`grid gap-6 ${
									viewMode === 'grid'
										? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
										: 'grid-cols-1 max-w-4xl mx-auto'
								}`}>
								{displayProducts.map((product) => (
									<EnhancedProductCard
										key={product.id}
										product={product}
										onClick={handleProductClick}
										onEdit={(id) => console.log('Edit:', id)}
										onDelete={handleDelete}
										onPublish={handleTogglePublish}
										onShare={(id) => console.log('Share:', id)}
									/>
								))}
							</div>
						) : (
							<div className='text-center py-16'>
								<div className='bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto'>
									<div className='mb-6'>
										<div className='w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
											<Search className='w-10 h-10 text-purple-400' />
										</div>
										<h3 className='text-xl font-semibold text-white mb-3'>
											No ads found
										</h3>
										<p className='text-gray-400 leading-relaxed'>
											{searchTerm || selectedType !== 'all'
												? 'Try adjusting your search or filter criteria'
												: 'Create your first ad to get started with your campaigns'}
										</p>
									</div>
									{searchTerm || selectedType !== 'all' ? (
										<button
											onClick={() => {
												setSearchTerm('');
												setSelectedType('all');
											}}
											className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105'>
											Clear Filters
										</button>
									) : (
										<button
											onClick={handleCreateVideoAd}
											className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg'>
											<Plus className='w-4 h-4 mr-2 inline' />
											Create Your First Ad
										</button>
									)}
								</div>
							</div>
						)}
					</div>
				)}

				{activeTab === 'published' && (
					<div className='space-y-8'>
						{publishedAds.length > 0 ? (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{publishedAds.map((product) => (
									<EnhancedProductCard
										key={product.id}
										product={product}
										onClick={handleProductClick} // Fixed: Now using handleProductClick
										onEdit={(id) => console.log('Edit:', id)}
										onDelete={handleDelete}
										onPublish={handleTogglePublish}
										onShare={(id) => console.log('Share:', id)}
									/>
								))}
							</div>
						) : (
							<div className='text-center py-16'>
								<div className='bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto'>
									<ArrowUpRight className='w-16 h-16 text-green-400 mx-auto mb-6' />
									<h3 className='text-xl font-semibold text-white mb-3'>
										No Published Ads
									</h3>
									<p className='text-gray-400'>
										Publish some ads to start reaching your audience
									</p>
								</div>
							</div>
						)}
					</div>
				)}

				{['billboard', 'tv_radio', 'campaign'].includes(activeTab) && (
					<div className='text-center py-16'>
						<div className='bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/20 max-w-lg mx-auto'>
							<div className='relative mb-8'>
								<div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 animate-pulse' />
								<div className='relative w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl'>
									<Zap className='w-10 h-10 text-white' />
								</div>
							</div>
							<h3 className='text-2xl font-semibold text-white mb-4'>
								Coming Soon
							</h3>
							<p className='text-gray-400 mb-8 leading-relaxed'>
								We&apos;re working on exciting new features to enhance your
								advertising experience. Stay tuned for updates!
							</p>
							<div className='inline-flex items-center px-6 py-3 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30 font-medium'>
								<Clock className='w-4 h-4 mr-2' />
								Stay tuned for updates
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

// Add custom CSS for shimmer animation
const styles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .animate-in {
    animation-fill-mode: both;
  }

  .fade-in {
    animation-name: fadeIn;
  }

  .slide-in-from-top-2 {
    animation-name: slideInFromTop;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-8px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
	const styleElement = document.createElement('style');
	styleElement.textContent = styles;
	document.head.appendChild(styleElement);
}
