'use client';

import React, { useState, useEffect } from 'react';
import {
	Calendar,
	Clock,
	User,
	Tag,
	TrendingUp,
	Eye,
	MessageCircle,
	Share2,
	Search,
	Filter,
	ChevronRight,
	ArrowRight,
	BookOpen,
	Zap,
	Target,
	BarChart3,
	Smartphone,
	Globe,
	Shield,
	Lightbulb,
	Code,
	Users,
	Heart,
	Star,
	X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/app/components/ui/Navbar';

// Design tokens matching the landing page
const DESIGN_TOKENS = {
	animation: {
		duration: 0.6,
		ease: [0.25, 0.46, 0.45, 0.94],
		spring: { type: 'spring', damping: 25, stiffness: 400 },
		micro: { duration: 0.15, ease: 'easeOut' },
		stagger: { delayChildren: 0.1, staggerChildren: 0.05 },
	},
	spacing: {
		section: { mobile: 'py-8', desktop: 'py-12 lg:py-16' },
		container: 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto',
	},
	gradient: {
		primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600',
		secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
		text: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
		border: 'bg-gradient-to-r from-blue-500/50 to-purple-500/50',
	},
};

// Sample blog data
const blogPosts = [
	{
		id: 1,
		title: 'The Future of Programmatic Advertising: AI and Machine Learning',
		excerpt:
			'Explore how artificial intelligence and machine learning are revolutionizing programmatic advertising, making campaigns smarter and more efficient.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'Sarah Chen',
			avatar: '/api/placeholder/40/40',
			role: 'Head of Product',
		},
		category: 'Technology',
		tags: ['AI', 'Machine Learning', 'Programmatic', 'AdTech'],
		publishDate: '2024-01-15',
		readTime: 8,
		views: 2340,
		comments: 23,
		featured: true,
		image: '/api/placeholder/600/400',
		icon: Zap,
	},
	{
		id: 2,
		title: '5 Key Metrics Every Digital Marketer Should Track in 2024',
		excerpt:
			'Discover the essential KPIs that matter most for measuring campaign success and optimizing your advertising ROI.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'Mike Rodriguez',
			avatar: '/api/placeholder/40/40',
			role: 'Marketing Director',
		},
		category: 'Analytics',
		tags: ['KPIs', 'ROI', 'Analytics', 'Metrics'],
		publishDate: '2024-01-12',
		readTime: 6,
		views: 1890,
		comments: 18,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: BarChart3,
	},
	{
		id: 3,
		title: 'Privacy-First Advertising: Navigating the Cookieless Future',
		excerpt:
			'Learn how to adapt your advertising strategies for a world without third-party cookies while maintaining campaign effectiveness.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'Emily Johnson',
			avatar: '/api/placeholder/40/40',
			role: 'Privacy Engineer',
		},
		category: 'Privacy',
		tags: ['Privacy', 'Cookies', 'GDPR', 'Compliance'],
		publishDate: '2024-01-10',
		readTime: 10,
		views: 3120,
		comments: 31,
		featured: true,
		image: '/api/placeholder/600/400',
		icon: Shield,
	},
	{
		id: 4,
		title: 'Mobile-First Advertising: Optimizing for the Smartphone Era',
		excerpt:
			'Mobile devices dominate digital interactions. Discover best practices for creating mobile-optimized advertising campaigns.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'David Park',
			avatar: '/api/placeholder/40/40',
			role: 'Mobile Strategist',
		},
		category: 'Mobile',
		tags: ['Mobile', 'Responsive', 'UX', 'Optimization'],
		publishDate: '2024-01-08',
		readTime: 7,
		views: 1650,
		comments: 14,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: Smartphone,
	},
	{
		id: 5,
		title: 'Building High-Performance Ad Creatives That Convert',
		excerpt:
			'Learn the art and science of creating compelling ad creatives that capture attention and drive conversions.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'Lisa Thompson',
			avatar: '/api/placeholder/40/40',
			role: 'Creative Director',
		},
		category: 'Creative',
		tags: ['Creative', 'Design', 'Conversion', 'A/B Testing'],
		publishDate: '2024-01-05',
		readTime: 9,
		views: 2100,
		comments: 27,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: Lightbulb,
	},
	{
		id: 6,
		title: 'Cross-Channel Attribution: Understanding the Customer Journey',
		excerpt:
			'Dive deep into attribution modeling and learn how to track customer interactions across multiple touchpoints.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'Alex Kim',
			avatar: '/api/placeholder/40/40',
			role: 'Data Scientist',
		},
		category: 'Analytics',
		tags: ['Attribution', 'Customer Journey', 'Analytics', 'Data'],
		publishDate: '2024-01-03',
		readTime: 12,
		views: 1430,
		comments: 19,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: Target,
	},
	{
		id: 7,
		title: 'The Rise of Connected TV Advertising',
		excerpt:
			'Connected TV is transforming how we reach audiences. Explore the opportunities and challenges in CTV advertising.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'Rachel Green',
			avatar: '/api/placeholder/40/40',
			role: 'CTV Specialist',
		},
		category: 'Technology',
		tags: ['CTV', 'OTT', 'Video', 'Streaming'],
		publishDate: '2024-01-01',
		readTime: 8,
		views: 1820,
		comments: 22,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: Globe,
	},
	{
		id: 8,
		title: 'Real-Time Bidding: Maximizing Efficiency in Programmatic',
		excerpt:
			'Understanding RTB mechanics and optimization strategies to improve campaign performance and reduce costs.',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		author: {
			name: 'Tom Wilson',
			avatar: '/api/placeholder/40/40',
			role: 'Programmatic Lead',
		},
		category: 'Technology',
		tags: ['RTB', 'Programmatic', 'Bidding', 'Optimization'],
		publishDate: '2023-12-28',
		readTime: 11,
		views: 1290,
		comments: 15,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: Code,
	},
];

const categories = [
	{ name: 'All', count: blogPosts.length, icon: BookOpen },
	{ name: 'Technology', count: 3, icon: Zap },
	{ name: 'Analytics', count: 2, icon: BarChart3 },
	{ name: 'Privacy', count: 1, icon: Shield },
	{ name: 'Mobile', count: 1, icon: Smartphone },
	{ name: 'Creative', count: 1, icon: Lightbulb },
];

const trendingTags = [
	'AI',
	'Privacy',
	'Programmatic',
	'Mobile',
	'Analytics',
	'ROI',
	'Attribution',
	'CTV',
];

const authors = [
	{
		name: 'Sarah Chen',
		posts: 3,
		avatar: '/api/placeholder/60/60',
		role: 'Head of Product',
	},
	{
		name: 'Mike Rodriguez',
		posts: 2,
		avatar: '/api/placeholder/60/60',
		role: 'Marketing Director',
	},
	{
		name: 'Emily Johnson',
		posts: 2,
		avatar: '/api/placeholder/60/60',
		role: 'Privacy Engineer',
	},
	{
		name: 'David Park',
		posts: 1,
		avatar: '/api/placeholder/60/60',
		role: 'Mobile Strategist',
	},
];

export default function BlogsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedPost, setSelectedPost] = useState(null);
	const [sortBy, setSortBy] = useState('latest');

	const filteredPosts = blogPosts
		.filter((post) => {
			const matchesCategory =
				selectedCategory === 'All' || post.category === selectedCategory;
			const matchesSearch =
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.tags.some((tag) =>
					tag.toLowerCase().includes(searchQuery.toLowerCase())
				);

			return matchesCategory && matchesSearch;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'popular':
					return b.views - a.views;
				case 'comments':
					return b.comments - a.comments;
				case 'latest':
				default:
					return (
						new Date(b.publishDate).getTime() -
						new Date(a.publishDate).getTime()
					);
			}
		});

	const featuredPosts = blogPosts.filter((post) => post.featured);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const BlogCard = ({ post, index, featured = false }) => (
		<motion.article
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1, duration: 0.5 }}
			className={`group cursor-pointer ${featured ? 'lg:col-span-2' : ''}`}
			onClick={() => setSelectedPost(post)}>
			<motion.div
				whileHover={{ y: -5 }}
				className='bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 h-full flex flex-col'>
				{/* Image */}
				<div className='relative aspect-video overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center'>
						<post.icon className='w-16 h-16 text-blue-400/60' />
					</div>
					{post.featured && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
							Featured
						</motion.div>
					)}
					<div className='absolute top-4 right-4 flex gap-2'>
						<div className='bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full'>
							{post.category}
						</div>
					</div>
				</div>

				{/* Content */}
				<div className='p-6 flex-1 flex flex-col'>
					<div className='flex items-center gap-4 mb-4 text-sm text-slate-400'>
						<div className='flex items-center gap-2'>
							<div className='w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
								<User className='w-4 h-4 text-blue-400' />
							</div>
							{post.author.name}
						</div>
						<div className='flex items-center gap-1'>
							<Calendar className='w-4 h-4' />
							{formatDate(post.publishDate)}
						</div>
						<div className='flex items-center gap-1'>
							<Clock className='w-4 h-4' />
							{post.readTime} min
						</div>
					</div>

					<h2
						className={`font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2 ${
							featured ? 'text-2xl lg:text-3xl' : 'text-xl'
						}`}>
						{post.title}
					</h2>

					<p className='text-slate-300 mb-4 flex-1 line-clamp-3'>
						{post.excerpt}
					</p>

					{/* Tags */}
					<div className='flex flex-wrap gap-2 mb-4'>
						{post.tags.slice(0, 3).map((tag) => (
							<span
								key={tag}
								className='px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs border border-blue-500/20'>
								#{tag}
							</span>
						))}
						{post.tags.length > 3 && (
							<span className='text-slate-500 text-xs'>
								+{post.tags.length - 3} more
							</span>
						)}
					</div>

					{/* Stats */}
					<div className='flex items-center justify-between text-sm text-slate-400'>
						<div className='flex items-center gap-4'>
							<div className='flex items-center gap-1'>
								<Eye className='w-4 h-4' />
								{post.views.toLocaleString()}
							</div>
							<div className='flex items-center gap-1'>
								<MessageCircle className='w-4 h-4' />
								{post.comments}
							</div>
						</div>
						<ArrowRight className='w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors' />
					</div>
				</div>
			</motion.div>
		</motion.article>
	);

	const BlogModal = ({ post, onClose }) => (
		<AnimatePresence>
			{post && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
					onClick={onClose}>
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className='bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto'
						onClick={(e) => e.stopPropagation()}>
						{/* Header */}
						<div className='flex items-start justify-between mb-6'>
							<div className='flex items-center gap-3'>
								<div className='p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl'>
									<post.icon className='w-6 h-6 text-blue-400' />
								</div>
								<div className='bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm'>
									{post.category}
								</div>
							</div>
							<button
								onClick={onClose}
								className='p-2 hover:bg-slate-700/50 rounded-xl transition-colors'>
								<X className='w-6 h-6 text-slate-400' />
							</button>
						</div>

						{/* Title */}
						<h1 className='text-3xl lg:text-4xl font-bold text-white mb-6'>
							{post.title}
						</h1>

						{/* Meta info */}
						<div className='flex flex-wrap gap-6 mb-6 pb-6 border-b border-slate-700/50'>
							<div className='flex items-center gap-3'>
								<div className='w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
									<User className='w-6 h-6 text-blue-400' />
								</div>
								<div>
									<p className='text-white font-medium'>{post.author.name}</p>
									<p className='text-slate-400 text-sm'>{post.author.role}</p>
								</div>
							</div>

							<div className='flex items-center gap-6 text-slate-400'>
								<div className='flex items-center gap-2'>
									<Calendar className='w-4 h-4' />
									{formatDate(post.publishDate)}
								</div>
								<div className='flex items-center gap-2'>
									<Clock className='w-4 h-4' />
									{post.readTime} min read
								</div>
								<div className='flex items-center gap-2'>
									<Eye className='w-4 h-4' />
									{post.views.toLocaleString()} views
								</div>
							</div>
						</div>

						{/* Hero Image */}
						<div className='aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl mb-8 flex items-center justify-center'>
							<post.icon className='w-24 h-24 text-blue-400/60' />
						</div>

						{/* Content */}
						<div className='prose prose-invert prose-blue max-w-none mb-8'>
							<p className='text-lg text-slate-300 leading-relaxed mb-6'>
								{post.excerpt}
							</p>
							<p className='text-slate-300 leading-relaxed'>{post.content}</p>

							{/* Mock additional content */}
							<p className='text-slate-300 leading-relaxed mt-6'>
								In today&apos;s rapidly evolving digital landscape, staying
								ahead of the curve requires a deep understanding of emerging
								technologies and consumer behavior patterns. This comprehensive
								analysis explores the key factors driving change in our industry
								and provides actionable insights for marketing professionals.
							</p>

							<h3 className='text-2xl font-bold text-white mt-8 mb-4'>
								Key Takeaways
							</h3>
							<ul className='text-slate-300 space-y-2'>
								<li>
									Understanding the importance of data-driven decision making in
									modern advertising
								</li>
								<li>
									Implementing privacy-first strategies that respect user
									preferences
								</li>
								<li>
									Leveraging emerging technologies to create more personalized
									experiences
								</li>
								<li>
									Building sustainable and scalable advertising operations
								</li>
							</ul>
						</div>

						{/* Tags */}
						<div className='flex flex-wrap gap-2 mb-8'>
							{post.tags.map((tag) => (
								<span
									key={tag}
									className='px-3 py-2 bg-blue-500/10 text-blue-400 rounded-xl text-sm border border-blue-500/20'>
									#{tag}
								</span>
							))}
						</div>

						{/* Actions */}
						<div className='flex items-center justify-between pt-6 border-t border-slate-700/50'>
							<div className='flex items-center gap-4'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors'>
									<Heart className='w-4 h-4' />
									Like
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors'>
									<Share2 className='w-4 h-4' />
									Share
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors'>
									<MessageCircle className='w-4 h-4' />
									Comment ({post.comments})
								</motion.button>
							</div>

							<div className='flex items-center gap-2 text-slate-400'>
								<Star className='w-4 h-4' />
								<span>Add to reading list</span>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<div className='min-h-screen bg-slate-950'>
			{/* Background */}
			<div className='fixed inset-0 w-full h-full pointer-events-none'>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent' />
			</div>

			<div className='relative z-10'>
				{/* Header */}
				<section className='pt-32 pb-16'>
					<Navigation />
					<div className={DESIGN_TOKENS.spacing.container}>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='text-center max-w-4xl mx-auto'>
							<motion.h1
								className='text-5xl lg:text-7xl font-bold mb-6'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}>
								<span className={DESIGN_TOKENS.gradient.text}>
									AdZPay Insights
								</span>
							</motion.h1>
							<motion.p
								className='text-xl text-slate-300 mb-8 leading-relaxed'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}>
								Stay ahead of the curve with expert insights, industry trends,
								and actionable strategies for the evolving world of digital
								advertising.
							</motion.p>

							<motion.div
								className='flex flex-col sm:flex-row gap-4 justify-center items-center'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}>
								<div className='flex items-center gap-2 text-slate-400'>
									<BookOpen className='w-5 h-5 text-blue-400' />
									<span>{blogPosts.length} Articles</span>
								</div>
								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
								<div className='flex items-center gap-2 text-slate-400'>
									<Users className='w-5 h-5 text-purple-400' />
									<span>Expert Authors</span>
								</div>
								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
								<div className='flex items-center gap-2 text-slate-400'>
									<TrendingUp className='w-5 h-5 text-green-400' />
									<span>Updated Weekly</span>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Featured Posts */}
				{featuredPosts.length > 0 && (
					<section className='pb-16'>
						<div className={DESIGN_TOKENS.spacing.container}>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className='mb-12'>
								<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
									<span className={DESIGN_TOKENS.gradient.text}>
										Featured Articles
									</span>
								</h2>
								<p className='text-slate-400 text-lg'>
									Hand-picked content from our editorial team
								</p>
							</motion.div>

							<div className='grid lg:grid-cols-2 gap-8'>
								{featuredPosts.map((post, index) => (
									<BlogCard key={post.id} post={post} index={index} featured />
								))}
							</div>
						</div>
					</section>
				)}

				{/* Search and Filters */}
				<section className='pb-8'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
							<div className='flex flex-col lg:flex-row gap-6'>
								{/* Search */}
								<div className='flex-1'>
									<div className='relative'>
										<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
										<input
											type='text'
											placeholder='Search articles, tags, or authors...'
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className='w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
										/>
									</div>
								</div>

								{/* Categories */}
								<div className='flex gap-2 flex-wrap'>
									{categories.map((category) => (
										<motion.button
											key={category.name}
											onClick={() => setSelectedCategory(category.name)}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
												selectedCategory === category.name
													? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
													: 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
											}`}>
											<category.icon className='w-4 h-4' />
											{category.name} ({category.count})
										</motion.button>
									))}
								</div>

								{/* Sort */}
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className='px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'>
									<option value='latest'>Latest</option>
									<option value='popular'>Most Popular</option>
									<option value='comments'>Most Discussed</option>
								</select>
							</div>

							{/* Results count */}
							<div className='mt-4 pt-4 border-t border-slate-700/50'>
								<p className='text-slate-400'>
									Found {filteredPosts.length} article
									{filteredPosts.length !== 1 ? 's' : ''}
									{searchQuery && (
										<span> matching &quot;{searchQuery}&quot;</span>
									)}
								</p>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Main Content */}
				<section className='pb-16'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='grid lg:grid-cols-3 gap-8'>
							{/* Articles Grid */}
							<div className='lg:col-span-2'>
								{filteredPosts.length > 0 ? (
									<div className='grid gap-8'>
										{filteredPosts.map((post, index) => (
											<BlogCard key={post.id} post={post} index={index} />
										))}
									</div>
								) : (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className='text-center py-16'>
										<div className='w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4'>
											<Search className='w-12 h-12 text-slate-500' />
										</div>
										<h3 className='text-2xl font-semibold text-white mb-2'>
											No articles found
										</h3>
										<p className='text-slate-400 mb-6'>
											Try adjusting your search criteria or browse different
											categories.
										</p>
										<motion.button
											onClick={() => {
												setSelectedCategory('All');
												setSearchQuery('');
											}}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'>
											Clear Filters
										</motion.button>
									</motion.div>
								)}
							</div>

							{/* Sidebar */}
							<div className='space-y-8'>
								{/* Trending Tags */}
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
									<h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
										<TrendingUp className='w-5 h-5 text-blue-400' />
										Trending Tags
									</h3>
									<div className='flex flex-wrap gap-2'>
										{trendingTags.map((tag) => (
											<motion.button
												key={tag}
												onClick={() => setSearchQuery(tag)}
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className='px-3 py-1 bg-slate-700/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-full text-sm transition-all duration-200 border border-slate-600/50 hover:border-blue-500/30'>
												#{tag}
											</motion.button>
										))}
									</div>
								</motion.div>

								{/* Top Authors */}
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.1 }}
									className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
									<h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
										<Users className='w-5 h-5 text-purple-400' />
										Top Authors
									</h3>
									<div className='space-y-4'>
										{authors.map((author, index) => (
											<motion.div
												key={author.name}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}
												className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors cursor-pointer'>
												<div className='w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
													<User className='w-6 h-6 text-blue-400' />
												</div>
												<div className='flex-1'>
													<p className='text-white font-medium'>
														{author.name}
													</p>
													<p className='text-slate-400 text-sm'>
														{author.role}
													</p>
												</div>
												<div className='text-slate-400 text-sm'>
													{author.posts} post{author.posts !== 1 ? 's' : ''}
												</div>
											</motion.div>
										))}
									</div>
								</motion.div>

								{/* Newsletter Signup */}
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
									className='bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6'>
									<h3 className='text-xl font-semibold text-white mb-2'>
										Stay Updated
									</h3>
									<p className='text-slate-300 mb-4 text-sm'>
										Get the latest insights delivered straight to your inbox.
									</p>
									<div className='space-y-3'>
										<input
											type='email'
											placeholder='Enter your email'
											className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
										/>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'>
											Subscribe
										</motion.button>
									</div>
									<p className='text-xs text-slate-400 mt-3'>
										Join 10,000+ marketers getting weekly insights
									</p>
								</motion.div>

								{/* Recent Activity */}
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
									<h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
										<Clock className='w-5 h-5 text-green-400' />
										Recent Activity
									</h3>
									<div className='space-y-3'>
										<div className='flex items-start gap-3 text-sm'>
											<div className='w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0' />
											<div>
												<p className='text-slate-300'>
													New article published by Sarah Chen
												</p>
												<p className='text-slate-500'>2 hours ago</p>
											</div>
										</div>
										<div className='flex items-start gap-3 text-sm'>
											<div className='w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0' />
											<div>
												<p className='text-slate-300'>
													Mobile advertising guide updated
												</p>
												<p className='text-slate-500'>1 day ago</p>
											</div>
										</div>
										<div className='flex items-start gap-3 text-sm'>
											<div className='w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0' />
											<div>
												<p className='text-slate-300'>
													Privacy compliance checklist added
												</p>
												<p className='text-slate-500'>3 days ago</p>
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className='py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-center'>
							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
								<span className={DESIGN_TOKENS.gradient.text}>
									Want to Contribute?
								</span>
							</h2>
							<p className='text-slate-300 text-lg mb-8 max-w-2xl mx-auto'>
								Share your expertise with our community. We&apos;re always
								looking for industry experts to contribute valuable insights and
								thought leadership content.
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300'>
									Submit an Article
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='border border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-all duration-300'>
									Content Guidelines
								</motion.button>
							</div>
						</motion.div>
					</div>
				</section>
			</div>

			{/* Blog Modal */}
			<BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
		</div>
	);
}
