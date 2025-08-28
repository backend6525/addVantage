// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import {
// 	Calendar,
// 	Clock,
// 	User,
// 	Tag,
// 	TrendingUp,
// 	Eye,
// 	MessageCircle,
// 	Share2,
// 	Search,
// 	Filter,
// 	ChevronRight,
// 	ArrowRight,
// 	BookOpen,
// 	Zap,
// 	Target,
// 	BarChart3,
// 	Smartphone,
// 	Globe,
// 	Shield,
// 	Lightbulb,
// 	Code,
// 	Users,
// 	Heart,
// 	Star,
// 	X,
// 	ArrowLeft,
// 	Bookmark,
// 	ThumbsUp,
// 	ThumbsDown,
// 	Copy,
// 	Facebook,
// 	Twitter,
// 	Linkedin,
// 	Mail,
// 	Home,
// 	ChevronDown,
// 	ChevronUp,
// 	Play,
// 	Headphones,
// 	Monitor,
// 	Camera,
// } from 'lucide-react';
// import Navigation from '@/app/components/ui/Navbar';

// // Custom hook for detecting clicks outside a component
// const useOutsideClick = (callback) => {
// 	const ref = useRef(null);

// 	useEffect(() => {
// 		const handleClick = (event) => {
// 			if (ref.current && !ref.current.contains(event.target)) {
// 				callback();
// 			}
// 		};

// 		document.addEventListener('mousedown', handleClick);
// 		document.addEventListener('touchend', handleClick);

// 		return () => {
// 			document.removeEventListener('mousedown', handleClick);
// 			document.removeEventListener('touchend', handleClick);
// 		};
// 	}, [callback]);

// 	return ref;
// };

// // Design tokens matching the landing page
// const DESIGN_TOKENS = {
// 	animation: {
// 		duration: 0.6,
// 		ease: [0.25, 0.46, 0.45, 0.94],
// 		spring: { type: 'spring', damping: 25, stiffness: 400 },
// 		micro: { duration: 0.15, ease: 'easeOut' },
// 		stagger: { delayChildren: 0.1, staggerChildren: 0.05 },
// 	},
// 	spacing: {
// 		section: { mobile: 'py-8', desktop: 'py-12 lg:py-16' },
// 		container: 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto',
// 	},
// 	gradient: {
// 		primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600',
// 		secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
// 		text: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
// 		border: 'bg-gradient-to-r from-blue-500/50 to-purple-500/50',
// 	},
// };

// // Expanded blog data with more posts
// const blogPosts = [
// 	{
// 		id: 1,
// 		title: 'The Future of Programmatic Advertising: AI and Machine Learning',
// 		excerpt:
// 			'Explore how artificial intelligence and machine learning are revolutionizing programmatic advertising, making campaigns smarter and more efficient.',
// 		content: `
//       <p>Artificial intelligence and machine learning are fundamentally transforming the landscape of programmatic advertising. As we move deeper into 2024, these technologies are not just supporting tools—they're becoming the backbone of sophisticated advertising strategies that deliver unprecedented precision and efficiency.</p>

//       <h2>The AI Revolution in Ad Tech</h2>
//       <p>The integration of AI in programmatic advertising represents a paradigm shift from traditional rule-based systems to intelligent, self-learning platforms. Machine learning algorithms now analyze vast datasets in real-time, identifying patterns and opportunities that human operators might miss.</p>

//       <p>This transformation enables advertisers to:</p>
//       <ul>
//         <li>Predict user behavior with remarkable accuracy</li>
//         <li>Optimize bids in microseconds based on countless variables</li>
//         <li>Personalize ad experiences at scale</li>
//         <li>Reduce ad fraud through advanced detection mechanisms</li>
//       </ul>

//       <h2>Real-Time Decision Making</h2>
//       <p>Modern AI-powered platforms can process millions of bid requests per second, making split-second decisions about whether to bid, how much to bid, and which creative to serve. This level of automation and intelligence was unimaginable just a few years ago.</p>

//       <blockquote>
//         <p>"The future of advertising lies not in replacing human creativity, but in augmenting human intelligence with machine precision." - Industry Expert</p>
//       </blockquote>

//       <h2>Challenges and Opportunities</h2>
//       <p>While AI presents incredible opportunities, it also brings challenges. Privacy regulations, data quality, and the need for transparency in AI decision-making are all critical considerations for modern advertisers.</p>

//       <p>The most successful campaigns of the future will be those that effectively combine human insight with machine intelligence, creating advertising experiences that are both highly relevant and genuinely valuable to consumers.</p>
//     `,
// 		author: {
// 			name: 'Sarah Chen',
// 			avatar: '/api/placeholder/40/40',
// 			role: 'Head of Product',
// 			bio: 'Sarah leads product development at AdZPay with over 10 years of experience in ad tech and machine learning. She specializes in developing AI-driven solutions that help advertisers achieve better ROI and user engagement.',
// 		},
// 		category: 'Technology',
// 		tags: ['AI', 'Machine Learning', 'Programmatic', 'AdTech'],
// 		publishDate: '2024-01-15',
// 		readTime: 8,
// 		views: 2340,
// 		comments: 23,
// 		likes: 156,
// 		featured: true,
// 		image: '/api/placeholder/600/400',
// 		icon: Zap,
// 	},
// 	{
// 		id: 2,
// 		title: '5 Key Metrics Every Digital Marketer Should Track in 2024',
// 		excerpt:
// 			'Discover the essential KPIs that matter most for measuring campaign success and optimizing your advertising ROI.',
// 		content: `
//       <p>In the rapidly evolving digital marketing landscape, tracking the right metrics can make the difference between campaign success and failure. As we navigate 2024, certain key performance indicators have emerged as critical benchmarks for measuring and optimizing advertising effectiveness.</p>

//       <h2>1. Customer Acquisition Cost (CAC)</h2>
//       <p>Understanding how much it costs to acquire a new customer is fundamental to sustainable growth. CAC helps you evaluate the efficiency of your marketing spend and identify the most cost-effective channels.</p>

//       <h2>2. Return on Ad Spend (ROAS)</h2>
//       <p>ROAS provides immediate insight into campaign profitability. A healthy ROAS varies by industry, but generally, a 4:1 ratio is considered good, meaning $4 in revenue for every $1 spent on advertising.</p>

//       <h2>3. Customer Lifetime Value (CLV)</h2>
//       <p>CLV helps you understand the long-term value of your marketing investments. When compared with CAC, it reveals whether your acquisition strategies are sustainable.</p>

//       <h2>4. Attribution Accuracy</h2>
//       <p>With the decline of third-party cookies, understanding which touchpoints drive conversions has become more challenging and more important than ever.</p>

//       <h2>5. Brand Lift Metrics</h2>
//       <p>Beyond direct response, measuring brand awareness, consideration, and preference helps evaluate the full impact of your advertising efforts.</p>
//     `,
// 		author: {
// 			name: 'Mike Rodriguez',
// 			avatar: '/api/placeholder/40/40',
// 			role: 'Marketing Director',
// 			bio: 'Mike specializes in performance marketing and analytics with a focus on data-driven growth strategies. He has helped dozens of companies optimize their advertising ROI through strategic metric tracking.',
// 		},
// 		category: 'Analytics',
// 		tags: ['KPIs', 'ROI', 'Analytics', 'Metrics'],
// 		publishDate: '2024-01-12',
// 		readTime: 6,
// 		views: 1890,
// 		comments: 18,
// 		likes: 94,
// 		featured: false,
// 		image: '/api/placeholder/600/400',
// 		icon: BarChart3,
// 	},
// 	{
// 		id: 3,
// 		title: 'Privacy-First Advertising: Navigating the Cookieless Future',
// 		excerpt:
// 			'Learn how to adapt your advertising strategies for a world without third-party cookies while maintaining campaign effectiveness.',
// 		content: `
//       <p>The advertising industry stands at a crossroads. With the gradual phase-out of third-party cookies and increasing privacy regulations, marketers must fundamentally rethink their approach to audience targeting and measurement.</p>

//       <h2>The Privacy Revolution</h2>
//       <p>Consumer privacy concerns and regulatory frameworks like GDPR and CCPA have accelerated the shift toward privacy-first advertising. This transformation isn't just about compliance—it's about building sustainable, trust-based relationships with consumers.</p>

//       <h2>First-Party Data Strategies</h2>
//       <p>The future belongs to brands that can effectively collect, manage, and activate their first-party data. This includes:</p>
//       <ul>
//         <li>Building comprehensive customer data platforms</li>
//         <li>Creating value exchanges that encourage data sharing</li>
//         <li>Developing privacy-compliant data collection practices</li>
//       </ul>

//       <h2>Alternative Targeting Methods</h2>
//       <p>Contextual advertising is experiencing a renaissance as brands move away from behavioral targeting. By focusing on content relevance rather than user tracking, contextual advertising offers a privacy-friendly alternative that can be highly effective.</p>

//       <h2>Preparing for the Future</h2>
//       <p>Success in the cookieless world requires a holistic approach that prioritizes transparency, value creation, and genuine consumer benefit. Brands that embrace these principles will not only comply with evolving regulations but also build stronger, more sustainable customer relationships.</p>
//     `,
// 		author: {
// 			name: 'Emily Johnson',
// 			avatar: '/api/placeholder/40/40',
// 			role: 'Privacy Engineer',
// 			bio: 'Emily is a privacy expert helping companies navigate the complex landscape of data protection and advertising compliance. She has advised over 50 companies on GDPR and CCPA implementation.',
// 		},
// 		category: 'Privacy',
// 		tags: ['Privacy', 'Cookies', 'GDPR', 'Compliance'],
// 		publishDate: '2024-01-10',
// 		readTime: 10,
// 		views: 3120,
// 		comments: 31,
// 		likes: 203,
// 		featured: true,
// 		image: '/api/placeholder/600/400',
// 		icon: Shield,
// 	},
// 	{
// 		id: 4,
// 		title: 'Mobile-First Advertising Strategies That Actually Work',
// 		excerpt:
// 			'Mobile devices drive over 60% of digital ad spend. Learn the strategies that convert mobile users into customers.',
// 		content: `
//       <p>Mobile advertising has evolved from an afterthought to the primary focus of digital marketing strategies. With mobile devices accounting for over 60% of digital ad spend globally, understanding how to effectively reach and convert mobile users has never been more critical.</p>

//       <h2>The Mobile Revolution</h2>
//       <p>Mobile-first isn't just about responsive design—it's about fundamentally rethinking how we approach advertising for smaller screens, touch interfaces, and on-the-go consumption patterns.</p>

//       <h2>Creative Best Practices</h2>
//       <p>Mobile creative requires a different approach. Vertical video content, snackable messaging, and thumb-friendly interactions are essential for success in the mobile environment.</p>

//       <h2>Location-Based Targeting</h2>
//       <p>Mobile devices offer unique targeting opportunities through location data. Geo-fencing, proximity targeting, and location-based personalization can dramatically improve campaign performance.</p>

//       <h2>App vs. Mobile Web</h2>
//       <p>Understanding the differences between in-app and mobile web advertising is crucial for optimizing your mobile strategy and budget allocation.</p>
//     `,
// 		author: {
// 			name: 'David Kim',
// 			avatar: '/api/placeholder/40/40',
// 			role: 'Mobile Strategy Lead',
// 			bio: 'David has been at the forefront of mobile advertising innovation for over 8 years, helping brands optimize their mobile-first marketing strategies.',
// 		},
// 		category: 'Mobile',
// 		tags: ['Mobile', 'App Marketing', 'Location', 'Creative'],
// 		publishDate: '2024-01-08',
// 		readTime: 7,
// 		views: 1650,
// 		comments: 15,
// 		likes: 89,
// 		featured: false,
// 		image: '/api/placeholder/600/400',
// 		icon: Smartphone,
// 	},
// 	{
// 		id: 5,
// 		title: 'Connected TV Advertising: The New Frontier of Digital Marketing',
// 		excerpt:
// 			"CTV advertising combines the reach of traditional TV with the targeting precision of digital. Here's how to get started.",
// 		content: `
//       <p>Connected TV (CTV) advertising represents the perfect marriage of traditional television's broad reach and digital advertising's precise targeting capabilities. As cord-cutting continues to reshape how consumers watch content, CTV has emerged as a critical channel for reaching audiences at scale.</p>

//       <h2>The CTV Landscape</h2>
//       <p>The CTV ecosystem includes streaming services, smart TVs, and connected devices. Understanding the nuances of each platform is essential for developing effective campaigns.</p>

//       <h2>Targeting Capabilities</h2>
//       <p>Unlike traditional TV, CTV allows for household-level targeting, demographic segmentation, and behavioral targeting while maintaining the premium environment of television content.</p>

//       <h2>Creative Considerations</h2>
//       <p>CTV creative requires a different approach than traditional digital video. Longer formats, living room viewing contexts, and multi-screen experiences all influence creative strategy.</p>

//       <h2>Measurement and Attribution</h2>
//       <p>CTV offers sophisticated measurement capabilities that bridge the gap between brand awareness and performance marketing objectives.</p>
//     `,
// 		author: {
// 			name: 'Lisa Wang',
// 			avatar: '/api/placeholder/40/40',
// 			role: 'CTV Specialist',
// 			bio: 'Lisa is a leading expert in connected TV advertising with extensive experience helping brands navigate the streaming advertising landscape.',
// 		},
// 		category: 'Technology',
// 		tags: ['CTV', 'Streaming', 'Video', 'TV'],
// 		publishDate: '2024-01-05',
// 		readTime: 9,
// 		views: 2100,
// 		comments: 19,
// 		likes: 134,
// 		featured: false,
// 		image: '/api/placeholder/600/400',
// 		icon: Monitor,
// 	},
// 	{
// 		id: 6,
// 		title: 'Creative Testing: How to Find Winning Ad Variations',
// 		excerpt:
// 			'Systematic creative testing can improve campaign performance by 2-3x. Learn the frameworks top advertisers use.',
// 		content: `
//       <p>Creative testing is often the difference between mediocre and exceptional campaign performance. The most successful advertisers use systematic approaches to test and optimize their creative assets, often seeing 2-3x improvements in key metrics.</p>

//       <h2>Testing Methodologies</h2>
//       <p>From A/B testing to multivariate analysis, understanding which testing approach fits your goals and budget is crucial for meaningful results.</p>

//       <h2>What to Test</h2>
//       <p>Headlines, visuals, calls-to-action, and formats all impact performance. We'll explore which elements typically have the highest impact on results.</p>

//       <h2>Statistical Significance</h2>
//       <p>Proper test design and statistical analysis ensure your results are actionable and reliable, not just random noise.</p>

//       <h2>Scaling Winners</h2>
//       <p>Once you've identified winning creative variations, scaling them effectively across channels and audiences is key to maximizing ROI.</p>
//     `,
// 		author: {
// 			name: 'Alex Thompson',
// 			avatar: '/api/placeholder/40/40',
// 			role: 'Creative Strategist',
// 			bio: 'Alex specializes in creative optimization and testing methodologies, helping brands discover high-performing ad variations through systematic experimentation.',
// 		},
// 		category: 'Creative',
// 		tags: ['Creative', 'Testing', 'Optimization', 'A/B Testing'],
// 		publishDate: '2024-01-03',
// 		readTime: 5,
// 		views: 1420,
// 		comments: 12,
// 		likes: 76,
// 		featured: false,
// 		image: '/api/placeholder/600/400',
// 		icon: Camera,
// 	},
// ];

// const categories = [
// 	{ name: 'All', count: blogPosts.length, icon: BookOpen },
// 	{
// 		name: 'Technology',
// 		count: blogPosts.filter((p) => p.category === 'Technology').length,
// 		icon: Zap,
// 	},
// 	{
// 		name: 'Analytics',
// 		count: blogPosts.filter((p) => p.category === 'Analytics').length,
// 		icon: BarChart3,
// 	},
// 	{
// 		name: 'Privacy',
// 		count: blogPosts.filter((p) => p.category === 'Privacy').length,
// 		icon: Shield,
// 	},
// 	{
// 		name: 'Mobile',
// 		count: blogPosts.filter((p) => p.category === 'Mobile').length,
// 		icon: Smartphone,
// 	},
// 	{
// 		name: 'Creative',
// 		count: blogPosts.filter((p) => p.category === 'Creative').length,
// 		icon: Lightbulb,
// 	},
// ];

// const trendingTags = [
// 	'AI',
// 	'Privacy',
// 	'Programmatic',
// 	'Mobile',
// 	'Analytics',
// 	'ROI',
// 	'Attribution',
// 	'CTV',
// 	'Creative',
// 	'Testing',
// ];

// export default function BlogsPage() {
// 	const [selectedCategory, setSelectedCategory] = useState('All');
// 	const [searchQuery, setSearchQuery] = useState('');
// 	const [currentView, setCurrentView] = useState('list'); // 'list' or 'article'
// 	const [selectedPost, setSelectedPost] = useState(null);
// 	const [sortBy, setSortBy] = useState('latest');
// 	const [isLiked, setIsLiked] = useState(false);
// 	const [isBookmarked, setIsBookmarked] = useState(false);
// 	const [showComments, setShowComments] = useState(false);
// 	const [showShareMenu, setShowShareMenu] = useState(false);

// 	const filteredPosts = blogPosts
// 		.filter((post) => {
// 			const matchesCategory =
// 				selectedCategory === 'All' || post.category === selectedCategory;
// 			const matchesSearch =
// 				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// 				post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
// 				post.tags.some((tag) =>
// 					tag.toLowerCase().includes(searchQuery.toLowerCase())
// 				);

// 			return matchesCategory && matchesSearch;
// 		})
// 		.sort((a, b) => {
// 			switch (sortBy) {
// 				case 'popular':
// 					return b.views - a.views;
// 				case 'comments':
// 					return b.comments - a.comments;
// 				case 'latest':
// 				default:
// 					return (
// 						new Date(b.publishDate).getTime() -
// 						new Date(a.publishDate).getTime()
// 					);
// 			}
// 		});

// 	const featuredPosts = blogPosts.filter((post) => post.featured);

// 	const formatDate = (dateString) => {
// 		const date = new Date(dateString);
// 		return date.toLocaleDateString('en-US', {
// 			year: 'numeric',
// 			month: 'long',
// 			day: 'numeric',
// 		});
// 	};

// 	const openArticle = (post) => {
// 		setSelectedPost(post);
// 		setCurrentView('article');
// 		window.scrollTo({ top: 0, behavior: 'smooth' });
// 	};

// 	const closeArticle = () => {
// 		setCurrentView('list');
// 		setSelectedPost(null);
// 		setIsLiked(false);
// 		setIsBookmarked(false);
// 		setShowComments(false);
// 		setShowShareMenu(false);
// 	};

// 	const handleShare = (platform) => {
// 		const url = window.location.href;
// 		const title = selectedPost?.title || 'AdZPay Insights';
// 		const text =
// 			selectedPost?.excerpt || 'Check out this article from AdZPay Insights';

// 		const shareUrls = {
// 			twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
// 			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
// 			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
// 			email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`,
// 			copy: url,
// 		};

// 		if (platform === 'copy') {
// 			navigator.clipboard.writeText(url);
// 			setShowShareMenu(false);
// 		} else {
// 			window.open(shareUrls[platform], '_blank', 'width=600,height=400');
// 		}
// 	};

// 	const ShareMenu = ({ onClose }) => {
// 		const shareMenuRef = useOutsideClick(onClose);

// 		return (
// 			<div
// 				ref={shareMenuRef}
// 				className='absolute right-0 top-12 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl p-3 min-w-48 z-50 share-menu-container'>
// 				<div className='space-y-1'>
// 					<button
// 						onClick={() => handleShare('twitter')}
// 						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
// 						<Twitter className='w-4 h-4' />
// 						Share on Twitter
// 					</button>
// 					<button
// 						onClick={() => handleShare('facebook')}
// 						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
// 						<Facebook className='w-4 h-4' />
// 						Share on Facebook
// 					</button>
// 					<button
// 						onClick={() => handleShare('linkedin')}
// 						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
// 						<Linkedin className='w-4 h-4' />
// 						Share on LinkedIn
// 					</button>
// 					<button
// 						onClick={() => handleShare('email')}
// 						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
// 						<Mail className='w-4 h-4' />
// 						Share via Email
// 					</button>
// 					<hr className='border-slate-700/50 my-2' />
// 					<button
// 						onClick={() => handleShare('copy')}
// 						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
// 						<Copy className='w-4 h-4' />
// 						Copy Link
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	};

// 	const ArticleView = ({ post }) => (
// 		<div className='min-h-screen'>
// 			{/* Navigation Bar */}
// 			<div className='sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50'>
// 				<div className='max-w-4xl mx-auto px-4 sm:px-6 py-4'>
// 					<div className='flex items-center justify-between'>
// 						<button
// 							onClick={closeArticle}
// 							className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors hover:scale-105 active:scale-95'>
// 							<ArrowLeft className='w-5 h-5' />
// 							Back to Articles
// 						</button>

// 						<div className='flex items-center gap-2'>
// 							<button
// 								onClick={() => setIsBookmarked(!isBookmarked)}
// 								className={`p-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
// 									isBookmarked
// 										? 'bg-blue-500/20 text-blue-400'
// 										: 'bg-slate-700/50 text-slate-400 hover:text-white'
// 								}`}>
// 								<Bookmark
// 									className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`}
// 								/>
// 							</button>
// 							<div className='relative'>
// 								<button
// 									onClick={() => setShowShareMenu(!showShareMenu)}
// 									className='p-2 bg-slate-700/50 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95'>
// 									<Share2 className='w-5 h-5' />
// 								</button>
// 								{showShareMenu && (
// 									<ShareMenu onClose={() => setShowShareMenu(false)} />
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Article Header */}
// 			<div className='max-w-4xl mx-auto px-4 sm:px-6 py-12'>
// 				<div className='mb-12'>
// 					{/* Category and Reading Info */}
// 					<div className='flex items-center gap-4 mb-6'>
// 						<div className='flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20'>
// 							<post.icon className='w-4 h-4' />
// 							{post.category}
// 						</div>
// 						<div className='flex items-center gap-4 text-slate-400 text-sm'>
// 							<div className='flex items-center gap-1'>
// 								<Clock className='w-4 h-4' />
// 								{post.readTime} min read
// 							</div>
// 							<div className='flex items-center gap-1'>
// 								<Eye className='w-4 h-4' />
// 								{post.views.toLocaleString()} views
// 							</div>
// 						</div>
// 					</div>

// 					{/* Title */}
// 					<h1 className='text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight'>
// 						{post.title}
// 					</h1>

// 					{/* Author Info */}
// 					<div className='flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-slate-700/50'>
// 						<div className='flex items-center gap-4'>
// 							<div className='w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
// 								<User className='w-8 h-8 text-blue-400' />
// 							</div>
// 							<div>
// 								<p className='text-white font-semibold text-lg'>
// 									{post.author.name}
// 								</p>
// 								<p className='text-slate-400'>{post.author.role}</p>
// 								<p className='text-slate-500 text-sm mt-1'>
// 									Published on {formatDate(post.publishDate)}
// 								</p>
// 							</div>
// 						</div>

// 						{/* Action Buttons */}
// 						<div className='flex items-center gap-3'>
// 							<button
// 								onClick={() => setIsLiked(!isLiked)}
// 								className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
// 									isLiked
// 										? 'bg-red-500/20 text-red-400 border border-red-500/30'
// 										: 'bg-slate-700/50 text-slate-400 hover:text-white border border-slate-600/50'
// 								}`}>
// 								<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
// 								{post.likes + (isLiked ? 1 : 0)}
// 							</button>
// 							<div className='relative'>
// 								<button
// 									onClick={() => setShowShareMenu(!showShareMenu)}
// 									className='flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95 border border-slate-600/50'>
// 									<Share2 className='w-4 h-4' />
// 									Share
// 								</button>
// 								{showShareMenu && (
// 									<ShareMenu onClose={() => setShowShareMenu(false)} />
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Hero Image */}
// 				<div className='aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl mb-12 flex items-center justify-center'>
// 					<post.icon className='w-24 h-24 text-blue-400/60' />
// 				</div>

// 				{/* Article Content */}
// 				<div className='prose prose-invert prose-blue max-w-none mb-12'>
// 					<div
// 						className='text-slate-300 leading-relaxed text-lg prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-ul:my-4 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-blue-500/50 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400'
// 						dangerouslySetInnerHTML={{ __html: post.content }}
// 					/>
// 				</div>

// 				{/* Tags */}
// 				<div className='flex flex-wrap gap-3 mb-12 pb-8 border-b border-slate-700/50'>
// 					{post.tags.map((tag) => (
// 						<button
// 							key={tag}
// 							onClick={() => {
// 								setSearchQuery(tag);
// 								closeArticle();
// 							}}
// 							className='px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer'>
// 							#{tag}
// 						</button>
// 					))}
// 				</div>

// 				{/* Author Bio */}
// 				<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-12'>
// 					<h3 className='text-2xl font-bold text-white mb-4'>
// 						About the Author
// 					</h3>
// 					<div className='flex items-start gap-6'>
// 						<div className='w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
// 							<User className='w-10 h-10 text-blue-400' />
// 						</div>
// 						<div>
// 							<h4 className='text-xl font-semibold text-white mb-2'>
// 								{post.author.name}
// 							</h4>
// 							<p className='text-blue-400 mb-3'>{post.author.role}</p>
// 							<p className='text-slate-300 leading-relaxed'>
// 								{post.author.bio}
// 							</p>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Comments Section */}
// 				<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8'>
// 					<div className='flex items-center justify-between mb-6'>
// 						<h3 className='text-2xl font-bold text-white flex items-center gap-2'>
// 							<MessageCircle className='w-6 h-6 text-blue-400' />
// 							Comments ({post.comments})
// 						</h3>
// 						<button
// 							onClick={() => setShowComments(!showComments)}
// 							className='flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all hover:scale-105 active:scale-95'>
// 							{showComments ? 'Hide' : 'Show'} Comments
// 							{showComments ? (
// 								<ChevronUp className='w-4 h-4' />
// 							) : (
// 								<ChevronDown className='w-4 h-4' />
// 							)}
// 						</button>
// 					</div>

// 					{showComments && (
// 						<div className='space-y-6'>
// 							{/* Comment Form */}
// 							<div className='bg-slate-700/30 rounded-xl p-6'>
// 								<h4 className='text-lg font-semibold text-white mb-4'>
// 									Join the discussion
// 								</h4>
// 								<div className='space-y-4'>
// 									<textarea
// 										placeholder='Share your thoughts...'
// 										className='w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none h-24 transition-all'
// 									/>
// 									<div className='flex justify-between items-center'>
// 										<p className='text-slate-400 text-sm'>
// 											Be respectful and constructive
// 										</p>
// 										<button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all'>
// 											Post Comment
// 										</button>
// 									</div>
// 								</div>
// 							</div>

// 							{/* Sample Comments */}
// 							<div className='space-y-4'>
// 								{[
// 									{
// 										id: 1,
// 										user: 'Marketing Pro',
// 										time: '2 hours ago',
// 										comment:
// 											'This is a really insightful article! The points about AI in advertising are particularly interesting. Thanks for sharing.',
// 										likes: 12,
// 									},
// 									{
// 										id: 2,
// 										user: 'Data Analyst',
// 										time: '4 hours ago',
// 										comment:
// 											"Great breakdown of the metrics that matter. I've been struggling with attribution accuracy lately, so this comes at the perfect time.",
// 										likes: 8,
// 									},
// 									{
// 										id: 3,
// 										user: 'AdTech Enthusiast',
// 										time: '6 hours ago',
// 										comment:
// 											'The privacy-first approach is definitely the way forward. Looking forward to more articles on this topic!',
// 										likes: 15,
// 									},
// 								].map((comment) => (
// 									<div
// 										key={comment.id}
// 										className='bg-slate-700/20 rounded-xl p-6'>
// 										<div className='flex items-start gap-4'>
// 											<div className='w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
// 												<User className='w-5 h-5 text-blue-400' />
// 											</div>
// 											<div className='flex-1'>
// 												<div className='flex items-center gap-3 mb-2'>
// 													<p className='font-semibold text-white'>
// 														{comment.user}
// 													</p>
// 													<p className='text-slate-400 text-sm'>
// 														{comment.time}
// 													</p>
// 												</div>
// 												<p className='text-slate-300 mb-3'>{comment.comment}</p>
// 												<div className='flex items-center gap-4'>
// 													<button className='flex items-center gap-1 text-slate-400 hover:text-white transition-colors hover:scale-105 active:scale-95'>
// 														<ThumbsUp className='w-4 h-4' />
// 														{comment.likes}
// 													</button>
// 													<button className='text-slate-400 hover:text-white transition-colors hover:scale-105 active:scale-95'>
// 														Reply
// 													</button>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			{/* Related Articles */}
// 			<div className='bg-slate-900/50 py-16'>
// 				<div className='max-w-6xl mx-auto px-4 sm:px-6'>
// 					<h3 className='text-3xl font-bold text-white mb-8 text-center'>
// 						Related Articles
// 					</h3>
// 					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
// 						{blogPosts
// 							.filter(
// 								(p) =>
// 									p.id !== post.id &&
// 									(p.category === post.category ||
// 										p.tags.some((tag) => post.tags.includes(tag)))
// 							)
// 							.slice(0, 3)
// 							.map((relatedPost, index) => (
// 								<div
// 									key={relatedPost.id}
// 									className='group cursor-pointer'
// 									onClick={() => openArticle(relatedPost)}>
// 									<div className='bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1'>
// 										<div className='aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center'>
// 											<relatedPost.icon className='w-12 h-12 text-blue-400/60' />
// 										</div>
// 										<div className='p-6'>
// 											<h4 className='font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2'>
// 												{relatedPost.title}
// 											</h4>
// 											<p className='text-slate-300 text-sm line-clamp-2 mb-3'>
// 												{relatedPost.excerpt}
// 											</p>
// 											<div className='flex items-center justify-between text-xs text-slate-400'>
// 												<span>{relatedPost.author.name}</span>
// 												<span>{relatedPost.readTime} min read</span>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							))}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);

// 	const BlogCard = ({ post, index, featured = false }) => (
// 		<div
// 			className={`group cursor-pointer ${featured ? 'lg:col-span-2' : ''}`}
// 			onClick={() => openArticle(post)}>
// 			<div className='bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 h-full flex flex-col hover:-translate-y-1'>
// 				{/* Image */}
// 				<div className='relative aspect-video overflow-hidden'>
// 					<div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center'>
// 						<post.icon className='w-16 h-16 text-blue-400/60' />
// 					</div>
// 					{post.featured && (
// 						<div className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
// 							Featured
// 						</div>
// 					)}
// 					<div className='absolute top-4 right-4 flex gap-2'>
// 						<div className='bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full'>
// 							{post.category}
// 						</div>
// 					</div>
// 				</div>

// 				{/* Content */}
// 				<div className='p-6 flex-1 flex flex-col'>
// 					<div className='flex items-center gap-4 mb-4 text-sm text-slate-400'>
// 						<div className='flex items-center gap-2'>
// 							<div className='w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
// 								<User className='w-4 h-4 text-blue-400' />
// 							</div>
// 							{post.author.name}
// 						</div>
// 						<div className='flex items-center gap-1'>
// 							<Calendar className='w-4 h-4' />
// 							{formatDate(post.publishDate)}
// 						</div>
// 						<div className='flex items-center gap-1'>
// 							<Clock className='w-4 h-4' />
// 							{post.readTime} min
// 						</div>
// 					</div>

// 					<h2
// 						className={`font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2 ${
// 							featured ? 'text-2xl lg:text-3xl' : 'text-xl'
// 						}`}>
// 						{post.title}
// 					</h2>

// 					<p className='text-slate-300 mb-4 flex-1 line-clamp-3'>
// 						{post.excerpt}
// 					</p>

// 					{/* Tags */}
// 					<div className='flex flex-wrap gap-2 mb-4'>
// 						{post.tags.slice(0, 3).map((tag) => (
// 							<span
// 								key={tag}
// 								className='px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs border border-blue-500/20'>
// 								#{tag}
// 							</span>
// 						))}
// 						{post.tags.length > 3 && (
// 							<span className='text-slate-500 text-xs'>
// 								+{post.tags.length - 3} more
// 							</span>
// 						)}
// 					</div>

// 					{/* Stats */}
// 					<div className='flex items-center justify-between text-sm text-slate-400'>
// 						<div className='flex items-center gap-4'>
// 							<div className='flex items-center gap-1'>
// 								<Eye className='w-4 h-4' />
// 								{post.views.toLocaleString()}
// 							</div>
// 							<div className='flex items-center gap-1'>
// 								<MessageCircle className='w-4 h-4' />
// 								{post.comments}
// 							</div>
// 							<div className='flex items-center gap-1'>
// 								<Heart className='w-4 h-4' />
// 								{post.likes}
// 							</div>
// 						</div>
// 						<ArrowRight className='w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors' />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);

// 	// Blog List View
// 	const BlogListView = () => (
// 		<div className='min-h-screen bg-slate-950'>
// 			{/* Background */}
// 			<div className='fixed inset-0 w-full h-full pointer-events-none'>
// 				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
// 				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent' />
// 				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent' />
// 			</div>

// 			<div className='relative z-10'>
// 				{/* Header */}
// 				<Navigation />
// 				<section className='pt-32 pb-16'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<div className='text-center max-w-4xl mx-auto'>
// 							<h1 className='text-5xl lg:text-7xl font-bold mb-6'>
// 								<span className={DESIGN_TOKENS.gradient.text}>
// 									AdZPay Insights
// 								</span>
// 							</h1>
// 							<p className='text-xl text-slate-300 mb-8 leading-relaxed'>
// 								Stay ahead of the curve with expert insights, industry trends,
// 								and actionable strategies for the evolving world of digital
// 								advertising.
// 							</p>

// 							<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
// 								<div className='flex items-center gap-2 text-slate-400'>
// 									<BookOpen className='w-5 h-5 text-blue-400' />
// 									<span>{blogPosts.length} Articles</span>
// 								</div>
// 								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
// 								<div className='flex items-center gap-2 text-slate-400'>
// 									<Users className='w-5 h-5 text-purple-400' />
// 									<span>Expert Authors</span>
// 								</div>
// 								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
// 								<div className='flex items-center gap-2 text-slate-400'>
// 									<TrendingUp className='w-5 h-5 text-green-400' />
// 									<span>Updated Weekly</span>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</section>

// 				{/* Featured Posts */}
// 				{featuredPosts.length > 0 && (
// 					<section className='pb-16'>
// 						<div className={DESIGN_TOKENS.spacing.container}>
// 							<div className='mb-12'>
// 								<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
// 									<span className={DESIGN_TOKENS.gradient.text}>
// 										Featured Articles
// 									</span>
// 								</h2>
// 								<p className='text-slate-400 text-lg'>
// 									Hand-picked content from our editorial team
// 								</p>
// 							</div>

// 							<div className='grid lg:grid-cols-2 gap-8'>
// 								{featuredPosts.map((post, index) => (
// 									<BlogCard key={post.id} post={post} index={index} featured />
// 								))}
// 							</div>
// 						</div>
// 					</section>
// 				)}

// 				{/* Search and Filters */}
// 				<section className='pb-8'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
// 							<div className='flex flex-col lg:flex-row gap-6'>
// 								{/* Search */}
// 								<div className='flex-1'>
// 									<div className='relative'>
// 										<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
// 										<input
// 											type='text'
// 											placeholder='Search articles, tags, or authors...'
// 											value={searchQuery}
// 											onChange={(e) => setSearchQuery(e.target.value)}
// 											className='w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
// 										/>
// 									</div>
// 								</div>

// 								{/* Categories */}
// 								<div className='flex gap-2 flex-wrap'>
// 									{categories.map((category) => (
// 										<button
// 											key={category.name}
// 											onClick={() => setSelectedCategory(category.name)}
// 											className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
// 												selectedCategory === category.name
// 													? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
// 													: 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
// 											}`}>
// 											<category.icon className='w-4 h-4' />
// 											{category.name} ({category.count})
// 										</button>
// 									))}
// 								</div>

// 								{/* Sort */}
// 								<select
// 									value={sortBy}
// 									onChange={(e) => setSortBy(e.target.value)}
// 									className='px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'>
// 									<option value='latest'>Latest</option>
// 									<option value='popular'>Most Popular</option>
// 									<option value='comments'>Most Discussed</option>
// 								</select>
// 							</div>

// 							{/* Results count */}
// 							<div className='mt-4 pt-4 border-t border-slate-700/50'>
// 								<p className='text-slate-400'>
// 									Found {filteredPosts.length} article
// 									{filteredPosts.length !== 1 ? 's' : ''}
// 									{searchQuery && (
// 										<span> matching &quot;{searchQuery}&quot;</span>
// 									)}
// 								</p>
// 							</div>
// 						</div>
// 					</div>
// 				</section>

// 				{/* Main Content */}
// 				<section className='pb-16'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<div className='grid lg:grid-cols-3 gap-8'>
// 							{/* Articles Grid */}
// 							<div className='lg:col-span-2'>
// 								{filteredPosts.length > 0 ? (
// 									<div className='grid gap-8'>
// 										{filteredPosts.map((post, index) => (
// 											<BlogCard key={post.id} post={post} index={index} />
// 										))}
// 									</div>
// 								) : (
// 									<div className='text-center py-16'>
// 										<div className='w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4'>
// 											<Search className='w-12 h-12 text-slate-500' />
// 										</div>
// 										<h3 className='text-2xl font-semibold text-white mb-2'>
// 											No articles found
// 										</h3>
// 										<p className='text-slate-400 mb-6'>
// 											Try adjusting your search criteria or browse different
// 											categories.
// 										</p>
// 										<button
// 											onClick={() => {
// 												setSelectedCategory('All');
// 												setSearchQuery('');
// 											}}
// 											className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95'>
// 											Clear Filters
// 										</button>
// 									</div>
// 								)}
// 							</div>

// 							{/* Sidebar */}
// 							<div className='space-y-8'>
// 								{/* Trending Tags */}
// 								<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
// 									<h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
// 										<TrendingUp className='w-5 h-5 text-blue-400' />
// 										Trending Tags
// 									</h3>
// 									<div className='flex flex-wrap gap-2'>
// 										{trendingTags.map((tag) => (
// 											<button
// 												key={tag}
// 												onClick={() => setSearchQuery(tag)}
// 												className='px-3 py-1 bg-slate-700/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-full text-sm transition-all duration-200 border border-slate-600/50 hover:border-blue-500/30 hover:scale-105 active:scale-95'>
// 												#{tag}
// 											</button>
// 										))}
// 									</div>
// 								</div>

// 								{/* Newsletter Signup */}
// 								<div className='bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6'>
// 									<h3 className='text-xl font-semibold text-white mb-2'>
// 										Stay Updated
// 									</h3>
// 									<p className='text-slate-300 mb-4 text-sm'>
// 										Get the latest insights delivered straight to your inbox.
// 									</p>
// 									<div className='space-y-3'>
// 										<input
// 											type='email'
// 											placeholder='Enter your email'
// 											className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
// 										/>
// 										<button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95'>
// 											Subscribe
// 										</button>
// 									</div>
// 									<p className='text-xs text-slate-400 mt-3'>
// 										Join 10,000+ marketers getting weekly insights
// 									</p>
// 								</div>

// 								{/* Popular Articles */}
// 								<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
// 									<h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
// 										<TrendingUp className='w-5 h-5 text-green-400' />
// 										Popular This Week
// 									</h3>
// 									<div className='space-y-4'>
// 										{blogPosts
// 											.sort((a, b) => b.views - a.views)
// 											.slice(0, 3)
// 											.map((post, index) => (
// 												<div
// 													key={post.id}
// 													className='flex items-start gap-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors cursor-pointer group'
// 													onClick={() => openArticle(post)}>
// 													<div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center'>
// 														<span className='text-blue-400 font-semibold text-sm'>
// 															{index + 1}
// 														</span>
// 													</div>
// 													<div className='flex-1 min-w-0'>
// 														<h4 className='text-white text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors'>
// 															{post.title}
// 														</h4>
// 														<div className='flex items-center gap-2 mt-1 text-xs text-slate-400'>
// 															<Eye className='w-3 h-3' />
// 															{post.views.toLocaleString()}
// 														</div>
// 													</div>
// 												</div>
// 											))}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</section>

// 				{/* Call to Action */}
// 				<section className='py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<div className='text-center'>
// 							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
// 								<span className={DESIGN_TOKENS.gradient.text}>
// 									Want to Contribute?
// 								</span>
// 							</h2>
// 							<p className='text-slate-300 text-lg mb-8 max-w-2xl mx-auto'>
// 								Share your expertise with our community. We&apos;re always
// 								looking for industry experts to contribute valuable insights and
// 								thought leadership content.
// 							</p>
// 							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
// 								<button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95'>
// 									Submit an Article
// 								</button>
// 								<button className='border border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 active:scale-95'>
// 									Content Guidelines
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	);

// 	// Main render logic
// 	if (currentView === 'article' && selectedPost) {
// 		return <ArticleView post={selectedPost} />;
// 	}

// 	return <BlogListView />;
// }

'use client';

import React, { useState, useEffect, useRef } from 'react';
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
	ArrowLeft,
	Bookmark,
	ThumbsUp,
	ThumbsDown,
	Copy,
	Facebook,
	Twitter,
	Linkedin,
	Mail,
	Home,
	ChevronDown,
	ChevronUp,
	Play,
	Headphones,
	Monitor,
	Camera,
	ChevronLeft,
} from 'lucide-react';
import Navigation from '@/app/components/ui/Navbar';

// Custom hook for detecting clicks outside a component
const useOutsideClick = (callback) => {
	const ref = useRef(null);

	useEffect(() => {
		const handleClick = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('touchend', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('touchend', handleClick);
		};
	}, [callback]);

	return ref;
};

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

// Expanded blog data with more posts
const blogPosts = [
	{
		id: 1,
		title: 'The Future of Programmatic Advertising: AI and Machine Learning',
		excerpt:
			'Explore how artificial intelligence and machine learning are revolutionizing programmatic advertising, making campaigns smarter and more efficient.',
		content: `
      <p>Artificial intelligence and machine learning are fundamentally transforming the landscape of programmatic advertising. As we move deeper into 2024, these technologies are not just supporting tools—they're becoming the backbone of sophisticated advertising strategies that deliver unprecedented precision and efficiency.</p>

      <h2>The AI Revolution in Ad Tech</h2>
      <p>The integration of AI in programmatic advertising represents a paradigm shift from traditional rule-based systems to intelligent, self-learning platforms. Machine learning algorithms now analyze vast datasets in real-time, identifying patterns and opportunities that human operators might miss.</p>

      <p>This transformation enables advertisers to:</p>
      <ul>
        <li>Predict user behavior with remarkable accuracy</li>
        <li>Optimize bids in microseconds based on countless variables</li>
        <li>Personalize ad experiences at scale</li>
        <li>Reduce ad fraud through advanced detection mechanisms</li>
      </ul>

      <h2>Real-Time Decision Making</h2>
      <p>Modern AI-powered platforms can process millions of bid requests per second, making split-second decisions about whether to bid, how much to bid, and which creative to serve. This level of automation and intelligence was unimaginable just a few years ago.</p>

      <blockquote>
        <p>"The future of advertising lies not in replacing human creativity, but in augmenting human intelligence with machine precision." - Industry Expert</p>
      </blockquote>

      <h2>Challenges and Opportunities</h2>
      <p>While AI presents incredible opportunities, it also brings challenges. Privacy regulations, data quality, and the need for transparency in AI decision-making are all critical considerations for modern advertisers.</p>

      <p>The most successful campaigns of the future will be those that effectively combine human insight with machine intelligence, creating advertising experiences that are both highly relevant and genuinely valuable to consumers.</p>
    `,
		author: {
			name: 'Sarah Chen',
			avatar: '/api/placeholder/40/40',
			role: 'Head of Product',
			bio: 'Sarah leads product development at AdZPay with over 10 years of experience in ad tech and machine learning. She specializes in developing AI-driven solutions that help advertisers achieve better ROI and user engagement.',
		},
		category: 'Technology',
		tags: ['AI', 'Machine Learning', 'Programmatic', 'AdTech'],
		publishDate: '2024-01-15',
		readTime: 8,
		views: 2340,
		comments: 23,
		likes: 156,
		featured: true,
		image: '/api/placeholder/600/400',
		icon: Zap,
	},
	{
		id: 2,
		title: '5 Key Metrics Every Digital Marketer Should Track in 2024',
		excerpt:
			'Discover the essential KPIs that matter most for measuring campaign success and optimizing your advertising ROI.',
		content: `
      <p>In the rapidly evolving digital marketing landscape, tracking the right metrics can make the difference between campaign success and failure. As we navigate 2024, certain key performance indicators have emerged as critical benchmarks for measuring and optimizing advertising effectiveness.</p>

      <h2>1. Customer Acquisition Cost (CAC)</h2>
      <p>Understanding how much it costs to acquire a new customer is fundamental to sustainable growth. CAC helps you evaluate the efficiency of your marketing spend and identify the most cost-effective channels.</p>

      <h2>2. Return on Ad Spend (ROAS)</h2>
      <p>ROAS provides immediate insight into campaign profitability. A healthy ROAS varies by industry, but generally, a 4:1 ratio is considered good, meaning $4 in revenue for every $1 spent on advertising.</p>

      <h2>3. Customer Lifetime Value (CLV)</h2>
      <p>CLV helps you understand the long-term value of your marketing investments. When compared with CAC, it reveals whether your acquisition strategies are sustainable.</p>

      <h2>4. Attribution Accuracy</h2>
      <p>With the decline of third-party cookies, understanding which touchpoints drive conversions has become more challenging and more important than ever.</p>

      <h2>5. Brand Lift Metrics</h2>
      <p>Beyond direct response, measuring brand awareness, consideration, and preference helps evaluate the full impact of your advertising efforts.</p>
    `,
		author: {
			name: 'Mike Rodriguez',
			avatar: '/api/placeholder/40/40',
			role: 'Marketing Director',
			bio: 'Mike specializes in performance marketing and analytics with a focus on data-driven growth strategies. He has helped dozens of companies optimize their advertising ROI through strategic metric tracking.',
		},
		category: 'Analytics',
		tags: ['KPIs', 'ROI', 'Analytics', 'Metrics'],
		publishDate: '2024-01-12',
		readTime: 6,
		views: 1890,
		comments: 18,
		likes: 94,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: BarChart3,
	},
	{
		id: 3,
		title: 'Privacy-First Advertising: Navigating the Cookieless Future',
		excerpt:
			'Learn how to adapt your advertising strategies for a world without third-party cookies while maintaining campaign effectiveness.',
		content: `
      <p>The advertising industry stands at a crossroads. With the gradual phase-out of third-party cookies and increasing privacy regulations, marketers must fundamentally rethink their approach to audience targeting and measurement.</p>

      <h2>The Privacy Revolution</h2>
      <p>Consumer privacy concerns and regulatory frameworks like GDPR and CCPA have accelerated the shift toward privacy-first advertising. This transformation isn't just about compliance—it's about building sustainable, trust-based relationships with consumers.</p>

      <h2>First-Party Data Strategies</h2>
      <p>The future belongs to brands that can effectively collect, manage, and activate their first-party data. This includes:</p>
      <ul>
        <li>Building comprehensive customer data platforms</li>
        <li>Creating value exchanges that encourage data sharing</li>
        <li>Developing privacy-compliant data collection practices</li>
      </ul>

      <h2>Alternative Targeting Methods</h2>
      <p>Contextual advertising is experiencing a renaissance as brands move away from behavioral targeting. By focusing on content relevance rather than user tracking, contextual advertising offers a privacy-friendly alternative that can be highly effective.</p>

      <h2>Preparing for the Future</h2>
      <p>Success in the cookieless world requires a holistic approach that prioritizes transparency, value creation, and genuine consumer benefit. Brands that embrace these principles will not only comply with evolving regulations but also build stronger, more sustainable customer relationships.</p>
    `,
		author: {
			name: 'Emily Johnson',
			avatar: '/api/placeholder/40/40',
			role: 'Privacy Engineer',
			bio: 'Emily is a privacy expert helping companies navigate the complex landscape of data protection and advertising compliance. She has advised over 50 companies on GDPR and CCPA implementation.',
		},
		category: 'Privacy',
		tags: ['Privacy', 'Cookies', 'GDPR', 'Compliance'],
		publishDate: '2024-01-10',
		readTime: 10,
		views: 3120,
		comments: 31,
		likes: 203,
		featured: true,
		image: '/api/placeholder/600/400',
		icon: Shield,
	},
	{
		id: 4,
		title: 'Mobile-First Advertising Strategies That Actually Work',
		excerpt:
			'Mobile devices drive over 60% of digital ad spend. Learn the strategies that convert mobile users into customers.',
		content: `
      <p>Mobile advertising has evolved from an afterthought to the primary focus of digital marketing strategies. With mobile devices accounting for over 60% of digital ad spend globally, understanding how to effectively reach and convert mobile users has never been more critical.</p>

      <h2>The Mobile Revolution</h2>
      <p>Mobile-first isn't just about responsive design—it's about fundamentally rethinking how we approach advertising for smaller screens, touch interfaces, and on-the-go consumption patterns.</p>

      <h2>Creative Best Practices</h2>
      <p>Mobile creative requires a different approach. Vertical video content, snackable messaging, and thumb-friendly interactions are essential for success in the mobile environment.</p>

      <h2>Location-Based Targeting</h2>
      <p>Mobile devices offer unique targeting opportunities through location data. Geo-fencing, proximity targeting, and location-based personalization can dramatically improve campaign performance.</p>

      <h2>App vs. Mobile Web</h2>
      <p>Understanding the differences between in-app and mobile web advertising is crucial for optimizing your mobile strategy and budget allocation.</p>
    `,
		author: {
			name: 'David Kim',
			avatar: '/api/placeholder/40/40',
			role: 'Mobile Strategy Lead',
			bio: 'David has been at the forefront of mobile advertising innovation for over 8 years, helping brands optimize their mobile-first marketing strategies.',
		},
		category: 'Mobile',
		tags: ['Mobile', 'App Marketing', 'Location', 'Creative'],
		publishDate: '2024-01-08',
		readTime: 7,
		views: 1650,
		comments: 15,
		likes: 89,
		featured: false,
		image: '/api/placeholder/600/400',
		icon: Smartphone,
	},
	{
		id: 5,
		title: 'Connected TV Advertising: The New Frontier of Digital Marketing',
		excerpt:
			"CTV advertising combines the reach of traditional TV with the targeting precision of digital. Here's how to get started.",
		content: `
      <p>Connected TV (CTV) advertising represents the perfect marriage of traditional television's broad reach and digital advertising's precise targeting capabilities. As cord-cutting continues to reshape how consumers watch content, CTV has emerged as a critical channel for reaching audiences at scale.</p>

      <h2>The CTV Landscape</h2>
      <p>The CTV ecosystem includes streaming services, smart TVs, and connected devices. Understanding the nuances of each platform is essential for developing effective campaigns.</p>

      <h2>Targeting Capabilities</h2>
      <p>Unlike traditional TV, CTV allows for household-level targeting, demographic segmentation, and behavioral targeting while maintaining the premium environment of television content.</p>

      <h2>Creative Considerations</h2>
      <p>CTV creative requires a different approach than traditional digital video. Longer formats, living room viewing contexts, and multi-screen experiences all influence creative strategy.</p>

      <h2>Measurement and Attribution</h2>
      <p>CTV offers sophisticated measurement capabilities that bridge the gap between brand awareness and performance marketing objectives.</p>
    `,
		author: {
			name: 'Lisa Wang',
			avatar: '/api/placeholder/40/40',
			role: 'CTV Specialist',
			bio: 'Lisa is a leading expert in connected TV advertising with extensive experience helping brands navigate the streaming advertising landscape.',
		},
		category: 'Technology',
		tags: ['CTV', 'Streaming', 'Video', 'TV'],
		publishDate: '2024-01-05',
		readTime: 9,
		views: 2100,
		comments: 19,
		likes: 134,
		featured: true,
		image: '/api/placeholder/600/400',
		icon: Monitor,
	},
	{
		id: 6,
		title: 'Creative Testing: How to Find Winning Ad Variations',
		excerpt:
			'Systematic creative testing can improve campaign performance by 2-3x. Learn the frameworks top advertisers use.',
		content: `
      <p>Creative testing is often the difference between mediocre and exceptional campaign performance. The most successful advertisers use systematic approaches to test and optimize their creative assets, often seeing 2-3x improvements in key metrics.</p>

      <h2>Testing Methodologies</h2>
      <p>From A/B testing to multivariate analysis, understanding which testing approach fits your goals and budget is crucial for meaningful results.</p>

      <h2>What to Test</h2>
      <p>Headlines, visuals, calls-to-action, and formats all impact performance. We'll explore which elements typically have the highest impact on results.</p>

      <h2>Statistical Significance</h2>
      <p>Proper test design and statistical analysis ensure your results are actionable and reliable, not just random noise.</p>

      <h2>Scaling Winners</h2>
      <p>Once you've identified winning creative variations, scaling them effectively across channels and audiences is key to maximizing ROI.</p>
    `,
		author: {
			name: 'Alex Thompson',
			avatar: '/api/placeholder/40/40',
			role: 'Creative Strategist',
			bio: 'Alex specializes in creative optimization and testing methodologies, helping brands discover high-performing ad variations through systematic experimentation.',
		},
		category: 'Creative',
		tags: ['Creative', 'Testing', 'Optimization', 'A/B Testing'],
		publishDate: '2024-01-03',
		readTime: 5,
		views: 1420,
		comments: 12,
		likes: 76,
		featured: true,
		image: '/api/placeholder/600/400',
		icon: Camera,
	},
];

const categories = [
	{ name: 'All', count: blogPosts.length, icon: BookOpen },
	{
		name: 'Technology',
		count: blogPosts.filter((p) => p.category === 'Technology').length,
		icon: Zap,
	},
	{
		name: 'Analytics',
		count: blogPosts.filter((p) => p.category === 'Analytics').length,
		icon: BarChart3,
	},
	{
		name: 'Privacy',
		count: blogPosts.filter((p) => p.category === 'Privacy').length,
		icon: Shield,
	},
	{
		name: 'Mobile',
		count: blogPosts.filter((p) => p.category === 'Mobile').length,
		icon: Smartphone,
	},
	{
		name: 'Creative',
		count: blogPosts.filter((p) => p.category === 'Creative').length,
		icon: Lightbulb,
	},
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
	'Creative',
	'Testing',
];

export default function BlogsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentView, setCurrentView] = useState('list'); // 'list' or 'article'
	const [selectedPost, setSelectedPost] = useState(null);
	const [sortBy, setSortBy] = useState('latest');
	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [showShareMenu, setShowShareMenu] = useState(false);
	const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

	const featuredScrollRef = useRef(null);
	const featuredPosts = blogPosts.filter((post) => post.featured);

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

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const openArticle = (post) => {
		setSelectedPost(post);
		setCurrentView('article');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const closeArticle = () => {
		setCurrentView('list');
		setSelectedPost(null);
		setIsLiked(false);
		setIsBookmarked(false);
		setShowComments(false);
		setShowShareMenu(false);
	};

	const handleShare = (platform) => {
		const url = window.location.href;
		const title = selectedPost?.title || 'AdZPay Insights';
		const text =
			selectedPost?.excerpt || 'Check out this article from AdZPay Insights';

		const shareUrls = {
			twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
			email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`,
			copy: url,
		};

		if (platform === 'copy') {
			navigator.clipboard.writeText(url);
			setShowShareMenu(false);
		} else {
			window.open(shareUrls[platform], '_blank', 'width=600,height=400');
		}
	};

	const scrollFeatured = (direction) => {
		if (featuredScrollRef.current) {
			const container = featuredScrollRef.current;
			const scrollAmount = container.offsetWidth * 0.5; // Scroll by half container width
			container.scrollBy({
				left: direction * scrollAmount,
				behavior: 'smooth',
			});

			// Update current index
			const newIndex = Math.max(
				0,
				Math.min(
					currentFeaturedIndex + direction,
					Math.ceil(featuredPosts.length / 2) - 1
				)
			);
			setCurrentFeaturedIndex(newIndex);
		}
	};

	const ShareMenu = ({ onClose }) => {
		const shareMenuRef = useOutsideClick(onClose);

		return (
			<div
				ref={shareMenuRef}
				className='absolute right-0 top-12 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl p-3 min-w-48 z-50 share-menu-container'>
				<div className='space-y-1'>
					<button
						onClick={() => handleShare('twitter')}
						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
						<Twitter className='w-4 h-4' />
						Share on Twitter
					</button>
					<button
						onClick={() => handleShare('facebook')}
						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
						<Facebook className='w-4 h-4' />
						Share on Facebook
					</button>
					<button
						onClick={() => handleShare('linkedin')}
						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
						<Linkedin className='w-4 h-4' />
						Share on LinkedIn
					</button>
					<button
						onClick={() => handleShare('email')}
						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
						<Mail className='w-4 h-4' />
						Share via Email
					</button>
					<hr className='border-slate-700/50 my-2' />
					<button
						onClick={() => handleShare('copy')}
						className='w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors'>
						<Copy className='w-4 h-4' />
						Copy Link
					</button>
				</div>
			</div>
		);
	};

	const ArticleView = ({ post }) => (
		<div className='min-h-screen'>
			{/* Navigation Bar */}
			<div className='sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 py-4'>
					<div className='flex items-center justify-between'>
						<button
							onClick={closeArticle}
							className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors hover:scale-105 active:scale-95'>
							<ArrowLeft className='w-5 h-5' />
							Back to Articles
						</button>

						<div className='flex items-center gap-2'>
							<button
								onClick={() => setIsBookmarked(!isBookmarked)}
								className={`p-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
									isBookmarked
										? 'bg-blue-500/20 text-blue-400'
										: 'bg-slate-700/50 text-slate-400 hover:text-white'
								}`}>
								<Bookmark
									className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`}
								/>
							</button>
							<div className='relative'>
								<button
									onClick={() => setShowShareMenu(!showShareMenu)}
									className='p-2 bg-slate-700/50 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95'>
									<Share2 className='w-5 h-5' />
								</button>
								{showShareMenu && (
									<ShareMenu onClose={() => setShowShareMenu(false)} />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Article Header */}
			<div className='max-w-4xl mx-auto px-4 sm:px-6 py-12'>
				<div className='mb-12'>
					{/* Category and Reading Info */}
					<div className='flex items-center gap-4 mb-6'>
						<div className='flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20'>
							<post.icon className='w-4 h-4' />
							{post.category}
						</div>
						<div className='flex items-center gap-4 text-slate-400 text-sm'>
							<div className='flex items-center gap-1'>
								<Clock className='w-4 h-4' />
								{post.readTime} min read
							</div>
							<div className='flex items-center gap-1'>
								<Eye className='w-4 h-4' />
								{post.views.toLocaleString()} views
							</div>
						</div>
					</div>

					{/* Title */}
					<h1 className='text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight'>
						{post.title}
					</h1>

					{/* Author Info */}
					<div className='flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-slate-700/50'>
						<div className='flex items-center gap-4'>
							<div className='w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
								<User className='w-8 h-8 text-blue-400' />
							</div>
							<div>
								<p className='text-white font-semibold text-lg'>
									{post.author.name}
								</p>
								<p className='text-slate-400'>{post.author.role}</p>
								<p className='text-slate-500 text-sm mt-1'>
									Published on {formatDate(post.publishDate)}
								</p>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex items-center gap-3'>
							<button
								onClick={() => setIsLiked(!isLiked)}
								className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
									isLiked
										? 'bg-red-500/20 text-red-400 border border-red-500/30'
										: 'bg-slate-700/50 text-slate-400 hover:text-white border border-slate-600/50'
								}`}>
								<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
								{post.likes + (isLiked ? 1 : 0)}
							</button>
							<div className='relative'>
								<button
									onClick={() => setShowShareMenu(!showShareMenu)}
									className='flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95 border border-slate-600/50'>
									<Share2 className='w-4 h-4' />
									Share
								</button>
								{showShareMenu && (
									<ShareMenu onClose={() => setShowShareMenu(false)} />
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Hero Image */}
				<div className='aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl mb-12 flex items-center justify-center'>
					<post.icon className='w-24 h-24 text-blue-400/60' />
				</div>

				{/* Article Content */}
				<div className='prose prose-invert prose-blue max-w-none mb-12'>
					<div
						className='text-slate-300 leading-relaxed text-lg prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-ul:my-4 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-blue-500/50 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400'
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</div>

				{/* Tags */}
				<div className='flex flex-wrap gap-3 mb-12 pb-8 border-b border-slate-700/50'>
					{post.tags.map((tag) => (
						<button
							key={tag}
							onClick={() => {
								setSearchQuery(tag);
								closeArticle();
							}}
							className='px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer'>
							#{tag}
						</button>
					))}
				</div>

				{/* Author Bio */}
				<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-12'>
					<h3 className='text-2xl font-bold text-white mb-4'>
						About the Author
					</h3>
					<div className='flex items-start gap-6'>
						<div className='w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
							<User className='w-10 h-10 text-blue-400' />
						</div>
						<div>
							<h4 className='text-xl font-semibold text-white mb-2'>
								{post.author.name}
							</h4>
							<p className='text-blue-400 mb-3'>{post.author.role}</p>
							<p className='text-slate-300 leading-relaxed'>
								{post.author.bio}
							</p>
						</div>
					</div>
				</div>

				{/* Comments Section */}
				<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8'>
					<div className='flex items-center justify-between mb-6'>
						<h3 className='text-2xl font-bold text-white flex items-center gap-2'>
							<MessageCircle className='w-6 h-6 text-blue-400' />
							Comments ({post.comments})
						</h3>
						<button
							onClick={() => setShowComments(!showComments)}
							className='flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all hover:scale-105 active:scale-95'>
							{showComments ? 'Hide' : 'Show'} Comments
							{showComments ? (
								<ChevronUp className='w-4 h-4' />
							) : (
								<ChevronDown className='w-4 h-4' />
							)}
						</button>
					</div>

					{showComments && (
						<div className='space-y-6'>
							{/* Comment Form */}
							<div className='bg-slate-700/30 rounded-xl p-6'>
								<h4 className='text-lg font-semibold text-white mb-4'>
									Join the discussion
								</h4>
								<div className='space-y-4'>
									<textarea
										placeholder='Share your thoughts...'
										className='w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none h-24 transition-all'
									/>
									<div className='flex justify-between items-center'>
										<p className='text-slate-400 text-sm'>
											Be respectful and constructive
										</p>
										<button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all'>
											Post Comment
										</button>
									</div>
								</div>
							</div>

							{/* Sample Comments */}
							<div className='space-y-4'>
								{[
									{
										id: 1,
										user: 'Marketing Pro',
										time: '2 hours ago',
										comment:
											'This is a really insightful article! The points about AI in advertising are particularly interesting. Thanks for sharing.',
										likes: 12,
									},
									{
										id: 2,
										user: 'Data Analyst',
										time: '4 hours ago',
										comment:
											"Great breakdown of the metrics that matter. I've been struggling with attribution accuracy lately, so this comes at the perfect time.",
										likes: 8,
									},
									{
										id: 3,
										user: 'AdTech Enthusiast',
										time: '6 hours ago',
										comment:
											'The privacy-first approach is definitely the way forward. Looking forward to more articles on this topic!',
										likes: 15,
									},
								].map((comment) => (
									<div
										key={comment.id}
										className='bg-slate-700/20 rounded-xl p-6'>
										<div className='flex items-start gap-4'>
											<div className='w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center'>
												<User className='w-5 h-5 text-blue-400' />
											</div>
											<div className='flex-1'>
												<div className='flex items-center gap-3 mb-2'>
													<p className='font-semibold text-white'>
														{comment.user}
													</p>
													<p className='text-slate-400 text-sm'>
														{comment.time}
													</p>
												</div>
												<p className='text-slate-300 mb-3'>{comment.comment}</p>
												<div className='flex items-center gap-4'>
													<button className='flex items-center gap-1 text-slate-400 hover:text-white transition-colors hover:scale-105 active:scale-95'>
														<ThumbsUp className='w-4 h-4' />
														{comment.likes}
													</button>
													<button className='text-slate-400 hover:text-white transition-colors hover:scale-105 active:scale-95'>
														Reply
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Related Articles */}
			<div className='bg-slate-900/50 py-16'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6'>
					<h3 className='text-3xl font-bold text-white mb-8 text-center'>
						Related Articles
					</h3>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{blogPosts
							.filter(
								(p) =>
									p.id !== post.id &&
									(p.category === post.category ||
										p.tags.some((tag) => post.tags.includes(tag)))
							)
							.slice(0, 3)
							.map((relatedPost, index) => (
								<div
									key={relatedPost.id}
									className='group cursor-pointer'
									onClick={() => openArticle(relatedPost)}>
									<div className='bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1'>
										<div className='aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center'>
											<relatedPost.icon className='w-12 h-12 text-blue-400/60' />
										</div>
										<div className='p-6'>
											<h4 className='font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2'>
												{relatedPost.title}
											</h4>
											<p className='text-slate-300 text-sm line-clamp-2 mb-3'>
												{relatedPost.excerpt}
											</p>
											<div className='flex items-center justify-between text-xs text-slate-400'>
												<span>{relatedPost.author.name}</span>
												<span>{relatedPost.readTime} min read</span>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);

	const BlogCard = ({ post, index, featured = false }) => (
		<div
			className={`group cursor-pointer ${featured ? 'flex-shrink-0 w-full md:w-1/2 px-4' : ''}`}
			onClick={() => openArticle(post)}>
			<div className='bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 h-full flex flex-col hover:-translate-y-1'>
				{/* Image */}
				<div className='relative aspect-video overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center'>
						<post.icon className='w-16 h-16 text-blue-400/60' />
					</div>
					{post.featured && (
						<div className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
							Featured
						</div>
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
							<div className='flex items-center gap-1'>
								<Heart className='w-4 h-4' />
								{post.likes}
							</div>
						</div>
						<ArrowRight className='w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors' />
					</div>
				</div>
			</div>
		</div>
	);

	// Blog List View
	const BlogListView = () => (
		<div className='min-h-screen bg-slate-950'>
			{/* Background */}
			<div className='fixed inset-0 w-full h-full pointer-events-none'>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent' />
			</div>

			<div className='relative z-10'>
				{/* Header */}
				<Navigation />
				<section className='pt-32 pb-16'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='text-center max-w-4xl mx-auto'>
							<h1 className='text-5xl lg:text-7xl font-bold mb-6'>
								<span className={DESIGN_TOKENS.gradient.text}>
									AdZPay Insights
								</span>
							</h1>
							<p className='text-xl text-slate-300 mb-8 leading-relaxed'>
								Stay ahead of the curve with expert insights, industry trends,
								and actionable strategies for the evolving world of digital
								advertising.
							</p>

							<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
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
							</div>
						</div>
					</div>
				</section>

				{/* Featured Posts */}
				{featuredPosts.length > 0 && (
					<section className='pb-16'>
						<div className={DESIGN_TOKENS.spacing.container}>
							<div className='mb-12'>
								<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
									<span className={DESIGN_TOKENS.gradient.text}>
										Featured Articles
									</span>
								</h2>
								<p className='text-slate-400 text-lg'>
									Hand-picked content from our editorial team
								</p>
							</div>

							<div className='relative'>
								{/* Navigation Arrows */}
								{featuredPosts.length > 2 && (
									<>
										<button
											onClick={() => scrollFeatured(-1)}
											className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95 -translate-x-1/2'
											aria-label='Previous featured articles'>
											<ChevronLeft className='w-6 h-6 text-white' />
										</button>
										<button
											onClick={() => scrollFeatured(1)}
											className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95 translate-x-1/2'
											aria-label='Next featured articles'>
											<ChevronRight className='w-6 h-6 text-white' />
										</button>
									</>
								)}

								{/* Featured Posts Carousel */}
								<div
									ref={featuredScrollRef}
									className='flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4'
									style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
									{featuredPosts.map((post, index) => (
										<BlogCard
											key={post.id}
											post={post}
											index={index}
											featured
										/>
									))}
								</div>
							</div>
						</div>
					</section>
				)}

				{/* Search and Filters */}
				<section className='pb-8'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
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
										<button
											key={category.name}
											onClick={() => setSelectedCategory(category.name)}
											className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
												selectedCategory === category.name
													? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
													: 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
											}`}>
											<category.icon className='w-4 h-4' />
											{category.name} ({category.count})
										</button>
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
						</div>
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
									<div className='text-center py-16'>
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
										<button
											onClick={() => {
												setSelectedCategory('All');
												setSearchQuery('');
											}}
											className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95'>
											Clear Filters
										</button>
									</div>
								)}
							</div>

							{/* Sidebar */}
							<div className='space-y-8'>
								{/* Trending Tags */}
								<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
									<h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
										<TrendingUp className='w-5 h-5 text-blue-400' />
										Trending Tags
									</h3>
									<div className='flex flex-wrap gap-2'>
										{trendingTags.map((tag) => (
											<button
												key={tag}
												onClick={() => setSearchQuery(tag)}
												className='px-3 py-1 bg-slate-700/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-full text-sm transition-all duration-200 border border-slate-600/50 hover:border-blue-500/30 hover:scale-105 active:scale-95'>
												#{tag}
											</button>
										))}
									</div>
								</div>

								{/* Newsletter Signup */}
								<div className='bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6'>
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
										<button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95'>
											Subscribe
										</button>
									</div>
									<p className='text-xs text-slate-400 mt-3'>
										Join 10,000+ marketers getting weekly insights
									</p>
								</div>

								{/* Popular Articles */}
								<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6'>
									<h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
										<TrendingUp className='w-5 h-5 text-green-400' />
										Popular This Week
									</h3>
									<div className='space-y-4'>
										{blogPosts
											.sort((a, b) => b.views - a.views)
											.slice(0, 3)
											.map((post, index) => (
												<div
													key={post.id}
													className='flex items-start gap-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors cursor-pointer group'
													onClick={() => openArticle(post)}>
													<div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center'>
														<span className='text-blue-400 font-semibold text-sm'>
															{index + 1}
														</span>
													</div>
													<div className='flex-1 min-w-0'>
														<h4 className='text-white text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors'>
															{post.title}
														</h4>
														<div className='flex items-center gap-2 mt-1 text-xs text-slate-400'>
															<Eye className='w-3 h-3' />
															{post.views.toLocaleString()}
														</div>
													</div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className='py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='text-center'>
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
								<button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95'>
									Submit an Article
								</button>
								<button className='border border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 active:scale-95'>
									Content Guidelines
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);

	// Main render logic
	if (currentView === 'article' && selectedPost) {
		return <ArticleView post={selectedPost} />;
	}

	return <BlogListView />;
}
