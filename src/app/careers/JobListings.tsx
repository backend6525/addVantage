// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
// 	MapPin,
// 	Calendar,
// 	Clock,
// 	Users,
// 	Briefcase,
// 	TrendingUp,
// 	Heart,
// 	Coffee,
// 	Zap,
// 	Star,
// 	ArrowRight,
// 	ChevronDown,
// 	Search,
// 	Filter,
// 	Globe,
// 	DollarSign,
// 	Award,
// 	Target,
// 	Rocket,
// 	Code,
// 	Palette,
// 	BarChart3,
// 	Headphones,
// 	Shield,
// 	Building,
// 	X,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

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

// // Sample job data
// const jobOpenings = [
// 	{
// 		id: 1,
// 		title: 'Senior Frontend Developer',
// 		department: 'Engineering',
// 		location: 'Remote / San Francisco',
// 		type: 'Full-time',
// 		experience: '5+ years',
// 		salary: '$120k - $180k',
// 		posted: '2 days ago',
// 		urgent: true,
// 		description:
// 			'Build beautiful, responsive user interfaces for our advertising platform using React, TypeScript, and modern web technologies.',
// 		requirements: [
// 			'5+ years of React and TypeScript experience',
// 			'Experience with modern CSS frameworks (Tailwind CSS preferred)',
// 			'Knowledge of state management (Redux, Zustand)',
// 			'Experience with testing frameworks (Jest, Cypress)',
// 			'Strong understanding of web performance optimization',
// 		],
// 		benefits: [
// 			'Remote work',
// 			'Health insurance',
// 			'Stock options',
// 			'401k matching',
// 		],
// 		icon: Code,
// 	},
// 	{
// 		id: 2,
// 		title: 'Product Designer',
// 		department: 'Design',
// 		location: 'New York / Remote',
// 		type: 'Full-time',
// 		experience: '3-5 years',
// 		salary: '$90k - $140k',
// 		posted: '1 week ago',
// 		urgent: false,
// 		description:
// 			'Design intuitive and engaging user experiences for our advertising platform, working closely with product and engineering teams.',
// 		requirements: [
// 			'3+ years of product design experience',
// 			'Proficiency in Figma and design systems',
// 			'Experience with user research and usability testing',
// 			'Strong portfolio showcasing web and mobile designs',
// 			'Understanding of design-to-development handoff processes',
// 		],
// 		benefits: [
// 			'Flexible hours',
// 			'Design budget',
// 			'Conference attendance',
// 			'Mentorship programs',
// 		],
// 		icon: Palette,
// 	},
// 	{
// 		id: 3,
// 		title: 'Marketing Analytics Manager',
// 		department: 'Marketing',
// 		location: 'Austin',
// 		type: 'Full-time',
// 		experience: '4-6 years',
// 		salary: '$85k - $120k',
// 		posted: '3 days ago',
// 		urgent: false,
// 		description:
// 			'Lead our marketing analytics efforts, driving data-driven decisions and optimizing our advertising campaigns for maximum ROI.',
// 		requirements: [
// 			'4+ years of marketing analytics experience',
// 			'Advanced SQL and data analysis skills',
// 			'Experience with Google Analytics, Facebook Ads, etc.',
// 			'Knowledge of attribution modeling',
// 			'Strong presentation and communication skills',
// 		],
// 		benefits: [
// 			'Performance bonuses',
// 			'Professional development',
// 			'Team retreats',
// 			'Gym membership',
// 		],
// 		icon: BarChart3,
// 	},
// 	{
// 		id: 4,
// 		title: 'Customer Success Manager',
// 		department: 'Customer Success',
// 		location: 'Remote',
// 		type: 'Full-time',
// 		experience: '2-4 years',
// 		salary: '$65k - $90k',
// 		posted: '5 days ago',
// 		urgent: false,
// 		description:
// 			'Help our clients succeed with our advertising platform, providing support, training, and strategic guidance.',
// 		requirements: [
// 			'2+ years of customer success experience',
// 			'Strong communication and problem-solving skills',
// 			'Experience with SaaS platforms',
// 			'Ability to manage multiple client relationships',
// 			'Data-driven approach to customer success',
// 		],
// 		benefits: [
// 			'Flexible schedule',
// 			'Travel opportunities',
// 			'Customer success bonus',
// 			'Learning stipend',
// 		],
// 		icon: Headphones,
// 	},
// 	{
// 		id: 5,
// 		title: 'DevOps Engineer',
// 		department: 'Engineering',
// 		location: 'Seattle',
// 		type: 'Full-time',
// 		experience: '3-5 years',
// 		salary: '$110k - $150k',
// 		posted: '1 day ago',
// 		urgent: true,
// 		description:
// 			'Build and maintain our cloud infrastructure, ensuring scalability, security, and reliability of our advertising platform.',
// 		requirements: [
// 			'3+ years of DevOps/SRE experience',
// 			'Experience with AWS, Docker, Kubernetes',
// 			'Knowledge of CI/CD pipelines',
// 			'Infrastructure as Code (Terraform preferred)',
// 			'Monitoring and observability tools experience',
// 		],
// 		benefits: [
// 			'On-call compensation',
// 			'Cloud certifications',
// 			'Home office setup',
// 			'Sabbatical program',
// 		],
// 		icon: Shield,
// 	},
// 	{
// 		id: 6,
// 		title: 'Sales Director',
// 		department: 'Sales',
// 		location: 'Chicago',
// 		type: 'Full-time',
// 		experience: '7+ years',
// 		salary: '$150k - $220k + commission',
// 		posted: '1 week ago',
// 		urgent: false,
// 		description:
// 			'Lead our sales team and drive revenue growth by building relationships with enterprise clients in the advertising space.',
// 		requirements: [
// 			'7+ years of B2B sales experience',
// 			'Experience selling to enterprise clients',
// 			'Track record of exceeding sales targets',
// 			'Strong leadership and team building skills',
// 			'Knowledge of advertising/marketing technology',
// 		],
// 		benefits: [
// 			'Uncapped commission',
// 			'Car allowance',
// 			'Sales trips',
// 			'Leadership development',
// 		],
// 		icon: Target,
// 	},
// ];

// const departments = [
// 	{ name: 'All', count: jobOpenings.length, icon: Building },
// 	{ name: 'Engineering', count: 2, icon: Code },
// 	{ name: 'Design', count: 1, icon: Palette },
// 	{ name: 'Marketing', count: 1, icon: BarChart3 },
// 	{ name: 'Customer Success', count: 1, icon: Headphones },
// 	{ name: 'Sales', count: 1, icon: Target },
// ];

// const locations = [
// 	'All Locations',
// 	'Remote',
// 	'San Francisco',
// 	'New York',
// 	'Austin',
// 	'Seattle',
// 	'Chicago',
// ];

// const benefits = [
// 	{
// 		icon: Heart,
// 		title: 'Health & Wellness',
// 		description: 'Comprehensive health, dental, and vision insurance',
// 	},
// 	{
// 		icon: Coffee,
// 		title: 'Work-Life Balance',
// 		description: 'Flexible hours and unlimited PTO policy',
// 	},
// 	{
// 		icon: Rocket,
// 		title: 'Growth Opportunities',
// 		description: 'Career development programs and mentorship',
// 	},
// 	{
// 		icon: DollarSign,
// 		title: 'Competitive Compensation',
// 		description: 'Top-tier salaries and equity packages',
// 	},
// 	{
// 		icon: Globe,
// 		title: 'Remote-First Culture',
// 		description: 'Work from anywhere with global team collaboration',
// 	},
// 	{
// 		icon: Award,
// 		title: 'Recognition Programs',
// 		description: 'Regular awards and performance bonuses',
// 	},
// ];

// const values = [
// 	{
// 		icon: Zap,
// 		title: 'Innovation First',
// 		description:
// 			'We push boundaries and embrace new technologies to solve complex advertising challenges.',
// 	},
// 	{
// 		icon: Users,
// 		title: 'Team Collaboration',
// 		description:
// 			'We believe diverse perspectives and inclusive teamwork drive the best outcomes.',
// 	},
// 	{
// 		icon: TrendingUp,
// 		title: 'Growth Mindset',
// 		description:
// 			'We invest in our people and encourage continuous learning and professional development.',
// 	},
// 	{
// 		icon: Heart,
// 		title: 'Customer Obsession',
// 		description:
// 			'We put our customers at the center of everything we do, ensuring their success is our success.',
// 	},
// ];

// export default function CareersPage() {
// 	const [selectedDepartment, setSelectedDepartment] = useState('All');
// 	const [selectedLocation, setSelectedLocation] = useState('All Locations');
// 	const [searchQuery, setSearchQuery] = useState('');
// 	const [showFilters, setShowFilters] = useState(false);
// 	const [selectedJob, setSelectedJob] = useState(null);

// 	const filteredJobs = jobOpenings.filter((job) => {
// 		const matchesDepartment =
// 			selectedDepartment === 'All' || job.department === selectedDepartment;
// 		const matchesLocation =
// 			selectedLocation === 'All Locations' ||
// 			job.location.includes(selectedLocation);
// 		const matchesSearch =
// 			job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// 			job.description.toLowerCase().includes(searchQuery.toLowerCase());

// 		return matchesDepartment && matchesLocation && matchesSearch;
// 	});

// 	const JobCard = ({ job, index }) => (
// 		<motion.div
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: index * 0.1, duration: 0.5 }}
// 			className='group relative bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer'
// 			onClick={() => setSelectedJob(job)}
// 			whileHover={{ y: -2 }}>
// 			{job.urgent && (
// 				<motion.div
// 					initial={{ scale: 0 }}
// 					animate={{ scale: 1 }}
// 					className='absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
// 					Urgent Hiring
// 				</motion.div>
// 			)}

// 			<div className='flex items-start justify-between mb-4'>
// 				<div className='flex items-center gap-3'>
// 					<div className='p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl'>
// 						<job.icon className='w-6 h-6 text-blue-400' />
// 					</div>
// 					<div>
// 						<h3 className='text-xl font-semibold text-white group-hover:text-blue-400 transition-colors'>
// 							{job.title}
// 						</h3>
// 						<p className='text-slate-400'>{job.department}</p>
// 					</div>
// 				</div>
// 				<ArrowRight className='w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors' />
// 			</div>

// 			<p className='text-slate-300 mb-4 line-clamp-2'>{job.description}</p>

// 			<div className='flex flex-wrap gap-3 mb-4'>
// 				<div className='flex items-center gap-1 text-sm text-slate-400'>
// 					<MapPin className='w-4 h-4' />
// 					{job.location}
// 				</div>
// 				<div className='flex items-center gap-1 text-sm text-slate-400'>
// 					<Briefcase className='w-4 h-4' />
// 					{job.type}
// 				</div>
// 				<div className='flex items-center gap-1 text-sm text-slate-400'>
// 					<Clock className='w-4 h-4' />
// 					{job.experience}
// 				</div>
// 			</div>

// 			<div className='flex items-center justify-between'>
// 				<div className='text-blue-400 font-semibold'>{job.salary}</div>
// 				<div className='text-sm text-slate-500'>Posted {job.posted}</div>
// 			</div>
// 		</motion.div>
// 	);

// 	const JobModal = ({ job, onClose }) => (
// 		<AnimatePresence>
// 			{job && (
// 				<motion.div
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					exit={{ opacity: 0 }}
// 					className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
// 					onClick={onClose}>
// 					<motion.div
// 						initial={{ opacity: 0, scale: 0.9, y: 20 }}
// 						animate={{ opacity: 1, scale: 1, y: 0 }}
// 						exit={{ opacity: 0, scale: 0.9, y: 20 }}
// 						className='bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto'
// 						onClick={(e) => e.stopPropagation()}>
// 						<div className='flex items-start justify-between mb-6'>
// 							<div className='flex items-center gap-4'>
// 								<div className='p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl'>
// 									<job.icon className='w-8 h-8 text-blue-400' />
// 								</div>
// 								<div>
// 									<h2 className='text-2xl font-bold text-white'>{job.title}</h2>
// 									<p className='text-slate-400'>{job.department}</p>
// 								</div>
// 							</div>
// 							<button
// 								onClick={onClose}
// 								className='p-2 hover:bg-slate-700/50 rounded-xl transition-colors'>
// 								<X className='w-6 h-6 text-slate-400' />
// 							</button>
// 						</div>

// 						<div className='grid md:grid-cols-3 gap-4 mb-6'>
// 							<div className='flex items-center gap-2 text-slate-300'>
// 								<MapPin className='w-4 h-4 text-blue-400' />
// 								{job.location}
// 							</div>
// 							<div className='flex items-center gap-2 text-slate-300'>
// 								<Briefcase className='w-4 h-4 text-blue-400' />
// 								{job.type}
// 							</div>
// 							<div className='flex items-center gap-2 text-slate-300'>
// 								<DollarSign className='w-4 h-4 text-blue-400' />
// 								{job.salary}
// 							</div>
// 						</div>

// 						<div className='space-y-6'>
// 							<div>
// 								<h3 className='text-lg font-semibold text-white mb-3'>
// 									Job Description
// 								</h3>
// 								<p className='text-slate-300 leading-relaxed'>
// 									{job.description}
// 								</p>
// 							</div>

// 							<div>
// 								<h3 className='text-lg font-semibold text-white mb-3'>
// 									Requirements
// 								</h3>
// 								<ul className='space-y-2'>
// 									{job.requirements.map((req, index) => (
// 										<li
// 											key={index}
// 											className='flex items-start gap-2 text-slate-300'>
// 											<div className='w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0' />
// 											{req}
// 										</li>
// 									))}
// 								</ul>
// 							</div>

// 							<div>
// 								<h3 className='text-lg font-semibold text-white mb-3'>
// 									Benefits
// 								</h3>
// 								<div className='flex flex-wrap gap-2'>
// 									{job.benefits.map((benefit, index) => (
// 										<span
// 											key={index}
// 											className='px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20'>
// 											{benefit}
// 										</span>
// 									))}
// 								</div>
// 							</div>
// 						</div>

// 						<div className='flex gap-4 mt-8'>
// 							<motion.button
// 								whileHover={{ scale: 1.02 }}
// 								whileTap={{ scale: 0.98 }}
// 								className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'>
// 								Apply Now
// 							</motion.button>
// 							<motion.button
// 								whileHover={{ scale: 1.02 }}
// 								whileTap={{ scale: 0.98 }}
// 								className='px-6 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-all duration-300'>
// 								Save Job
// 							</motion.button>
// 						</div>
// 					</motion.div>
// 				</motion.div>
// 			)}
// 		</AnimatePresence>
// 	);

// 	return (
// 		<div className='min-h-screen bg-slate-950'>
// 			{/* Background */}
// 			<div className='fixed inset-0 w-full h-full pointer-events-none'>
// 				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
// 				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent' />
// 				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent' />
// 			</div>

// 			<div className='relative z-10'>
// 				{/* Header */}
// 				<section className='pt-32 pb-16'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<motion.div
// 							initial={{ opacity: 0, y: 30 }}
// 							animate={{ opacity: 1, y: 0 }}
// 							transition={{ duration: 0.8 }}
// 							className='text-center max-w-4xl mx-auto'>
// 							<motion.h1
// 								className='text-5xl lg:text-7xl font-bold mb-6'
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ delay: 0.2 }}>
// 								<span className={DESIGN_TOKENS.gradient.text}>
// 									Join Our Mission
// 								</span>
// 							</motion.h1>
// 							<motion.p
// 								className='text-xl text-slate-300 mb-8 leading-relaxed'
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ delay: 0.4 }}>
// 								Help us revolutionize digital advertising with cutting-edge
// 								technology and innovative solutions. Join a team of passionate
// 								professionals building the future of AdTech.
// 							</motion.p>

// 							<motion.div
// 								className='flex flex-col sm:flex-row gap-4 justify-center items-center'
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ delay: 0.6 }}>
// 								<div className='flex items-center gap-2 text-slate-400'>
// 									<Users className='w-5 h-5 text-blue-400' />
// 									<span>200+ Team Members</span>
// 								</div>
// 								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
// 								<div className='flex items-center gap-2 text-slate-400'>
// 									<Globe className='w-5 h-5 text-purple-400' />
// 									<span>Remote-First Culture</span>
// 								</div>
// 								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
// 								<div className='flex items-center gap-2 text-slate-400'>
// 									<TrendingUp className='w-5 h-5 text-green-400' />
// 									<span>Rapidly Growing</span>
// 								</div>
// 							</motion.div>
// 						</motion.div>
// 					</div>
// 				</section>

// 				{/* Values Section */}
// 				<section className='py-16'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<motion.div
// 							initial={{ opacity: 0, y: 30 }}
// 							whileInView={{ opacity: 1, y: 0 }}
// 							viewport={{ once: true }}
// 							className='text-center mb-12'>
// 							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
// 								<span className={DESIGN_TOKENS.gradient.text}>Our Values</span>
// 							</h2>
// 							<p className='text-slate-400 text-lg max-w-2xl mx-auto'>
// 								The principles that guide everything we do and shape our culture
// 							</p>
// 						</motion.div>

// 						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
// 							{values.map((value, index) => (
// 								<motion.div
// 									key={value.title}
// 									initial={{ opacity: 0, y: 30 }}
// 									whileInView={{ opacity: 1, y: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ delay: index * 0.1 }}
// 									className='text-center group'>
// 									<motion.div
// 										whileHover={{ scale: 1.05, rotate: 5 }}
// 										className='w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all duration-300'>
// 										<value.icon className='w-8 h-8 text-blue-400' />
// 									</motion.div>
// 									<h3 className='text-xl font-semibold text-white mb-2'>
// 										{value.title}
// 									</h3>
// 									<p className='text-slate-400'>{value.description}</p>
// 								</motion.div>
// 							))}
// 						</div>
// 					</div>
// 				</section>

// 				{/* Benefits Section */}
// 				<section className='py-16 bg-slate-900/20'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<motion.div
// 							initial={{ opacity: 0, y: 30 }}
// 							whileInView={{ opacity: 1, y: 0 }}
// 							viewport={{ once: true }}
// 							className='text-center mb-12'>
// 							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
// 								<span className={DESIGN_TOKENS.gradient.text}>
// 									Why Join AdZPay?
// 								</span>
// 							</h2>
// 							<p className='text-slate-400 text-lg max-w-2xl mx-auto'>
// 								We offer competitive benefits and a culture that puts people
// 								first
// 							</p>
// 						</motion.div>

// 						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
// 							{benefits.map((benefit, index) => (
// 								<motion.div
// 									key={benefit.title}
// 									initial={{ opacity: 0, y: 30 }}
// 									whileInView={{ opacity: 1, y: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ delay: index * 0.1 }}
// 									whileHover={{ y: -5 }}
// 									className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300'>
// 									<div className='flex items-center gap-4 mb-4'>
// 										<div className='p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl'>
// 											<benefit.icon className='w-6 h-6 text-blue-400' />
// 										</div>
// 										<h3 className='text-xl font-semibold text-white'>
// 											{benefit.title}
// 										</h3>
// 									</div>
// 									<p className='text-slate-300'>{benefit.description}</p>
// 								</motion.div>
// 							))}
// 						</div>
// 					</div>
// 				</section>

// 				{/* Job Search and Filters */}
// 				<section className='py-16'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<motion.div
// 							initial={{ opacity: 0, y: 30 }}
// 							whileInView={{ opacity: 1, y: 0 }}
// 							viewport={{ once: true }}
// 							className='mb-12'>
// 							<h2 className='text-3xl lg:text-4xl font-bold text-center mb-8'>
// 								<span className={DESIGN_TOKENS.gradient.text}>
// 									Open Positions
// 								</span>
// 							</h2>

// 							{/* Search and Filters */}
// 							<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8'>
// 								<div className='flex flex-col lg:flex-row gap-4 items-center'>
// 									{/* Search */}
// 									<div className='relative flex-1 w-full lg:w-auto'>
// 										<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
// 										<input
// 											type='text'
// 											placeholder='Search jobs...'
// 											value={searchQuery}
// 											onChange={(e) => setSearchQuery(e.target.value)}
// 											className='w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
// 										/>
// 									</div>

// 									{/* Department Filter */}
// 									<div className='flex gap-2 flex-wrap'>
// 										{departments.map((dept) => (
// 											<motion.button
// 												key={dept.name}
// 												onClick={() => setSelectedDepartment(dept.name)}
// 												whileHover={{ scale: 1.02 }}
// 												whileTap={{ scale: 0.98 }}
// 												className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
// 													selectedDepartment === dept.name
// 														? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
// 														: 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
// 												}`}>
// 												<dept.icon className='w-4 h-4' />
// 												{dept.name} ({dept.count})
// 											</motion.button>
// 										))}
// 									</div>

// 									{/* Location Filter */}
// 									<select
// 										value={selectedLocation}
// 										onChange={(e) => setSelectedLocation(e.target.value)}
// 										className='px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'>
// 										{locations.map((location) => (
// 											<option
// 												key={location}
// 												value={location}
// 												className='bg-slate-700'>
// 												{location}
// 											</option>
// 										))}
// 									</select>
// 								</div>
// 							</div>

// 							{/* Results count */}
// 							<div className='flex items-center justify-between mb-6'>
// 								<p className='text-slate-400'>
// 									Found {filteredJobs.length} position
// 									{filteredJobs.length !== 1 ? 's' : ''}
// 								</p>
// 							</div>
// 						</motion.div>

// 						{/* Job Listings */}
// 						<div className='grid lg:grid-cols-2 gap-6'>
// 							{filteredJobs.map((job, index) => (
// 								<JobCard key={job.id} job={job} index={index} />
// 							))}
// 						</div>

// 						{filteredJobs.length === 0 && (
// 							<motion.div
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								className='text-center py-16'>
// 								<div className='w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4'>
// 									<Search className='w-12 h-12 text-slate-500' />
// 								</div>
// 								<h3 className='text-2xl font-semibold text-white mb-2'>
// 									No positions found
// 								</h3>
// 								<p className='text-slate-400 mb-6'>
// 									Try adjusting your search criteria or check back later for new
// 									opportunities.
// 								</p>
// 								<motion.button
// 									onClick={() => {
// 										setSelectedDepartment('All');
// 										setSelectedLocation('All Locations');
// 										setSearchQuery('');
// 									}}
// 									whileHover={{ scale: 1.02 }}
// 									whileTap={{ scale: 0.98 }}
// 									className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'>
// 									Clear Filters
// 								</motion.button>
// 							</motion.div>
// 						)}
// 					</div>
// 				</section>

// 				{/* Call to Action */}
// 				<section className='py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20'>
// 					<div className={DESIGN_TOKENS.spacing.container}>
// 						<motion.div
// 							initial={{ opacity: 0, y: 30 }}
// 							whileInView={{ opacity: 1, y: 0 }}
// 							viewport={{ once: true }}
// 							className='text-center'>
// 							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
// 								<span className={DESIGN_TOKENS.gradient.text}>
// 									Don&apos;t See Your Role?
// 								</span>
// 							</h2>
// 							<p className='text-slate-300 text-lg mb-8 max-w-2xl mx-auto'>
// 								We&apos;re always looking for talented individuals to join our
// 								team. Send us your resume and let us know how you&apos;d like to
// 								contribute.
// 							</p>
// 							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
// 								<motion.button
// 									whileHover={{ scale: 1.02 }}
// 									whileTap={{ scale: 0.98 }}
// 									className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300'>
// 									Send General Application
// 								</motion.button>
// 								<motion.button
// 									whileHover={{ scale: 1.02 }}
// 									whileTap={{ scale: 0.98 }}
// 									className='border border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-all duration-300'>
// 									Join Talent Pool
// 								</motion.button>
// 							</div>
// 						</motion.div>
// 					</div>
// 				</section>
// 			</div>

// 			{/* Job Modal */}
// 			<JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
// 		</div>
// 	);
// }

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
	MapPin,
	Calendar,
	Clock,
	Users,
	Briefcase,
	TrendingUp,
	Heart,
	Coffee,
	Zap,
	Star,
	ArrowRight,
	ChevronDown,
	Search,
	Filter,
	Globe,
	DollarSign,
	Award,
	Target,
	Rocket,
	Code,
	Palette,
	BarChart3,
	Headphones,
	Shield,
	Building,
	X,
	Send,
	Bookmark,
	Loader,
	ExternalLink,
} from 'lucide-react';
import Navigation from '@/app/components/ui/Navbar';

// Lazy load heavy components
const MotionDiv = dynamic(
	() => import('framer-motion').then((mod) => mod.motion.div),
	{ ssr: false }
);
const MotionButton = dynamic(
	() => import('framer-motion').then((mod) => mod.motion.button),
	{ ssr: false }
);
const AnimatePresence = dynamic(
	() => import('framer-motion').then((mod) => mod.AnimatePresence),
	{ ssr: false }
);

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

// Sample job data
const jobOpenings = [
	// ... (same job data as before)

	{
		id: 1,
		title: 'Senior Frontend Developer',
		department: 'Engineering',
		location: 'Remote / San Francisco',
		type: 'Full-time',
		experience: '5+ years',
		salary: '$120k - $180k',
		posted: '2 days ago',
		urgent: true,
		description:
			'Build beautiful, responsive user interfaces for our advertising platform using React, TypeScript, and modern web technologies.',
		requirements: [
			'5+ years of React and TypeScript experience',
			'Experience with modern CSS frameworks (Tailwind CSS preferred)',
			'Knowledge of state management (Redux, Zustand)',
			'Experience with testing frameworks (Jest, Cypress)',
			'Strong understanding of web performance optimization',
		],
		benefits: [
			'Remote work',
			'Health insurance',
			'Stock options',
			'401k matching',
		],
		icon: Code,
	},
	{
		id: 2,
		title: 'Product Designer',
		department: 'Design',
		location: 'New York / Remote',
		type: 'Full-time',
		experience: '3-5 years',
		salary: '$90k - $140k',
		posted: '1 week ago',
		urgent: false,
		description:
			'Design intuitive and engaging user experiences for our advertising platform, working closely with product and engineering teams.',
		requirements: [
			'3+ years of product design experience',
			'Proficiency in Figma and design systems',
			'Experience with user research and usability testing',
			'Strong portfolio showcasing web and mobile designs',
			'Understanding of design-to-development handoff processes',
		],
		benefits: [
			'Flexible hours',
			'Design budget',
			'Conference attendance',
			'Mentorship programs',
		],
		icon: Palette,
	},
	{
		id: 3,
		title: 'Marketing Analytics Manager',
		department: 'Marketing',
		location: 'Austin',
		type: 'Full-time',
		experience: '4-6 years',
		salary: '$85k - $120k',
		posted: '3 days ago',
		urgent: false,
		description:
			'Lead our marketing analytics efforts, driving data-driven decisions and optimizing our advertising campaigns for maximum ROI.',
		requirements: [
			'4+ years of marketing analytics experience',
			'Advanced SQL and data analysis skills',
			'Experience with Google Analytics, Facebook Ads, etc.',
			'Knowledge of attribution modeling',
			'Strong presentation and communication skills',
		],
		benefits: [
			'Performance bonuses',
			'Professional development',
			'Team retreats',
			'Gym membership',
		],
		icon: BarChart3,
	},
	{
		id: 4,
		title: 'Customer Success Manager',
		department: 'Customer Success',
		location: 'Remote',
		type: 'Full-time',
		experience: '2-4 years',
		salary: '$65k - $90k',
		posted: '5 days ago',
		urgent: false,
		description:
			'Help our clients succeed with our advertising platform, providing support, training, and strategic guidance.',
		requirements: [
			'2+ years of customer success experience',
			'Strong communication and problem-solving skills',
			'Experience with SaaS platforms',
			'Ability to manage multiple client relationships',
			'Data-driven approach to customer success',
		],
		benefits: [
			'Flexible schedule',
			'Travel opportunities',
			'Customer success bonus',
			'Learning stipend',
		],
		icon: Headphones,
	},
	{
		id: 5,
		title: 'DevOps Engineer',
		department: 'Engineering',
		location: 'Seattle',
		type: 'Full-time',
		experience: '3-5 years',
		salary: '$110k - $150k',
		posted: '1 day ago',
		urgent: true,
		description:
			'Build and maintain our cloud infrastructure, ensuring scalability, security, and reliability of our advertising platform.',
		requirements: [
			'3+ years of DevOps/SRE experience',
			'Experience with AWS, Docker, Kubernetes',
			'Knowledge of CI/CD pipelines',
			'Infrastructure as Code (Terraform preferred)',
			'Monitoring and observability tools experience',
		],
		benefits: [
			'On-call compensation',
			'Cloud certifications',
			'Home office setup',
			'Sabbatical program',
		],
		icon: Shield,
	},
	{
		id: 6,
		title: 'Sales Director',
		department: 'Sales',
		location: 'Chicago',
		type: 'Full-time',
		experience: '7+ years',
		salary: '$150k - $220k + commission',
		posted: '1 week ago',
		urgent: false,
		description:
			'Lead our sales team and drive revenue growth by building relationships with enterprise clients in the advertising space.',
		requirements: [
			'7+ years of B2B sales experience',
			'Experience selling to enterprise clients',
			'Track record of exceeding sales targets',
			'Strong leadership and team building skills',
			'Knowledge of advertising/marketing technology',
		],
		benefits: [
			'Uncapped commission',
			'Car allowance',
			'Sales trips',
			'Leadership development',
		],
		icon: Target,
	},
];

const departments = [
	{ name: 'All', count: jobOpenings.length, icon: Building },
	{ name: 'Engineering', count: 2, icon: Code },
	{ name: 'Design', count: 1, icon: Palette },
	{ name: 'Marketing', count: 1, icon: BarChart3 },
	{ name: 'Customer Success', count: 1, icon: Headphones },
	{ name: 'Sales', count: 1, icon: Target },
];

const locations = [
	'All Locations',
	'Remote',
	'San Francisco',
	'New York',
	'Austin',
	'Seattle',
	'Chicago',
];

const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract'];

const benefits = [
	{
		icon: Heart,
		title: 'Health & Wellness',
		description: 'Comprehensive health, dental, and vision insurance',
	},
	{
		icon: Coffee,
		title: 'Work-Life Balance',
		description: 'Flexible hours and unlimited PTO policy',
	},
	{
		icon: Rocket,
		title: 'Growth Opportunities',
		description: 'Career development programs and mentorship',
	},
	{
		icon: DollarSign,
		title: 'Competitive Compensation',
		description: 'Top-tier salaries and equity packages',
	},
	{
		icon: Globe,
		title: 'Remote-First Culture',
		description: 'Work from anywhere with global team collaboration',
	},
	{
		icon: Award,
		title: 'Recognition Programs',
		description: 'Regular awards and performance bonuses',
	},
];

const values = [
	{
		icon: Zap,
		title: 'Innovation First',
		description:
			'We push boundaries and embrace new technologies to solve complex advertising challenges.',
	},
	{
		icon: Users,
		title: 'Team Collaboration',
		description:
			'We believe diverse perspectives and inclusive teamwork drive the best outcomes.',
	},
	{
		icon: TrendingUp,
		title: 'Growth Mindset',
		description:
			'We invest in our people and encourage continuous learning and professional development.',
	},
	{
		icon: Heart,
		title: 'Customer Obsession',
		description:
			'We put our customers at the center of everything we do, ensuring their success is our success.',
	},
];

// Custom hook for filter state management
const useLocalStorageState = (key, defaultValue) => {
	const [state, setState] = useState(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(key);
			return stored ? JSON.parse(stored) : defaultValue;
		}
		return defaultValue;
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(state));
		}
	}, [key, state]);

	return [state, setState];
};

// Job Card Component
type JobCardProps = {
	job: {
		icon: React.ElementType;
		title: string;
		department: string;
		description: string;
		location: string;
		type: string;
		experience: string;
		salary: string;
		posted: string;
		urgent?: boolean;
	};
	index: number;
	onClick: () => void;
};

const JobCard: React.FC<JobCardProps> = React.memo(
	({ job, index, onClick }) => {
		return (
			<MotionDiv
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: index * 0.1, duration: 0.5 }}
				className='group relative bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer'
				onClick={onClick}
				whileHover={{ y: -2 }}
				role='article'
				aria-label={`Job opening: ${job.title}`}>
				{job.urgent && (
					<MotionDiv
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						className='absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
						Urgent Hiring
					</MotionDiv>
				)}

				<div className='flex items-start justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<div className='p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl'>
							<job.icon className='w-6 h-6 text-blue-400' />
						</div>
						<div>
							<h3 className='text-xl font-semibold text-white group-hover:text-blue-400 transition-colors'>
								{job.title}
							</h3>
							<p className='text-slate-400'>{job.department}</p>
						</div>
					</div>
					<ArrowRight className='w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors' />
				</div>

				<p className='text-slate-300 mb-4 line-clamp-2'>{job.description}</p>

				<div className='flex flex-wrap gap-3 mb-4'>
					<div className='flex items-center gap-1 text-sm text-slate-400'>
						<MapPin className='w-4 h-4' />
						{job.location}
					</div>
					<div className='flex items-center gap-1 text-sm text-slate-400'>
						<Briefcase className='w-4 h-4' />
						{job.type}
					</div>
					<div className='flex items-center gap-1 text-sm text-slate-400'>
						<Clock className='w-4 h-4' />
						{job.experience}
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='text-blue-400 font-semibold'>{job.salary}</div>
					<div className='text-sm text-slate-500'>Posted {job.posted}</div>
				</div>
			</MotionDiv>
		);
	}
);

JobCard.displayName = 'JobCard';

// Job Modal Component
const JobModal = ({ job, onClose, onApply }) => {
	const [isApplying, setIsApplying] = useState(false);
	const [applicationSent, setApplicationSent] = useState(false);

	const handleApply = async () => {
		setIsApplying(true);
		// Simulate application process
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsApplying(false);
		setApplicationSent(true);
		onApply(job);
	};

	return (
		<AnimatePresence>
			{job && (
				<MotionDiv
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
					onClick={onClose}>
					<MotionDiv
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className='bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto'
						onClick={(e) => e.stopPropagation()}
						role='dialog'
						aria-labelledby='job-title'
						aria-modal='true'>
						<div className='flex items-start justify-between mb-6'>
							<div className='flex items-center gap-4'>
								<div className='p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl'>
									<job.icon className='w-8 h-8 text-blue-400' />
								</div>
								<div>
									<h2 id='job-title' className='text-2xl font-bold text-white'>
										{job.title}
									</h2>
									<p className='text-slate-400'>{job.department}</p>
								</div>
							</div>
							<button
								onClick={onClose}
								className='p-2 hover:bg-slate-700/50 rounded-xl transition-colors'
								aria-label='Close job details'>
								<X className='w-6 h-6 text-slate-400' />
							</button>
						</div>

						<div className='grid md:grid-cols-3 gap-4 mb-6'>
							<div className='flex items-center gap-2 text-slate-300'>
								<MapPin className='w-4 h-4 text-blue-400' />
								{job.location}
							</div>
							<div className='flex items-center gap-2 text-slate-300'>
								<Briefcase className='w-4 h-4 text-blue-400' />
								{job.type}
							</div>
							<div className='flex items-center gap-2 text-slate-300'>
								<DollarSign className='w-4 h-4 text-blue-400' />
								{job.salary}
							</div>
						</div>

						<div className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold text-white mb-3'>
									Job Description
								</h3>
								<p className='text-slate-300 leading-relaxed'>
									{job.description}
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold text-white mb-3'>
									Requirements
								</h3>
								<ul className='space-y-2'>
									{job.requirements.map((req, index) => (
										<li
											key={index}
											className='flex items-start gap-2 text-slate-300'>
											<div className='w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0' />
											{req}
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold text-white mb-3'>
									Benefits
								</h3>
								<div className='flex flex-wrap gap-2'>
									{job.benefits.map((benefit, index) => (
										<span
											key={index}
											className='px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20'>
											{benefit}
										</span>
									))}
								</div>
							</div>
						</div>

						{!applicationSent ? (
							<div className='flex gap-4 mt-8'>
								<MotionButton
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={handleApply}
									disabled={isApplying}
									className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
									{isApplying ? (
										<>
											<Loader className='w-5 h-5 animate-spin' />
											Processing...
										</>
									) : (
										<>
											<Send className='w-5 h-5' />
											Apply Now
										</>
									)}
								</MotionButton>
								<MotionButton
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='px-6 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2'>
									<Bookmark className='w-5 h-5' />
									Save Job
								</MotionButton>
							</div>
						) : (
							<div className='mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl'>
								<div className='flex items-center gap-3 text-green-400'>
									<Star className='w-6 h-6' />
									<div>
										<h4 className='font-semibold'>Application Sent!</h4>
										<p className='text-sm'>We&apos;ll be in touch soon.</p>
									</div>
								</div>
							</div>
						)}
					</MotionDiv>
				</MotionDiv>
			)}
		</AnimatePresence>
	);
};

// Main Careers Page Component
export default function CareersPage() {
	const [selectedDepartment, setSelectedDepartment] = useLocalStorageState(
		'careers-department',
		'All'
	);
	const [selectedLocation, setSelectedLocation] = useLocalStorageState(
		'careers-location',
		'All Locations'
	);
	const [selectedType, setSelectedType] = useLocalStorageState(
		'careers-type',
		'All Types'
	);
	const [searchQuery, setSearchQuery] = useLocalStorageState(
		'careers-search',
		''
	);
	const [sortBy, setSortBy] = useLocalStorageState('careers-sort', 'newest');
	const [selectedJob, setSelectedJob] = useState(null);
	const [recentlyApplied, setRecentlyApplied] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Simulate loading
	useEffect(() => {
		setIsLoading(true);
		const timer = setTimeout(() => setIsLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	const filteredJobs = useMemo(() => {
		let filtered = jobOpenings.filter((job) => {
			const matchesDepartment =
				selectedDepartment === 'All' || job.department === selectedDepartment;
			const matchesLocation =
				selectedLocation === 'All Locations' ||
				job.location.includes(selectedLocation);
			const matchesType =
				selectedType === 'All Types' || job.type === selectedType;
			const matchesSearch =
				searchQuery === '' ||
				job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				job.department.toLowerCase().includes(searchQuery.toLowerCase());

			return (
				matchesDepartment && matchesLocation && matchesType && matchesSearch
			);
		});

		// Sort jobs
		switch (sortBy) {
			case 'newest':
				// Assuming newer jobs have lower IDs (for demo purposes)
				filtered.sort((a, b) => a.id - b.id);
				break;
			case 'oldest':
				filtered.sort((a, b) => b.id - a.id);
				break;
			case 'salary-high':
				// Extract numeric values from salary strings for sorting
				filtered.sort((a, b) => {
					const getMaxSalary = (salaryStr) =>
						parseInt(salaryStr.replace(/[^\d]/g, ''), 10);
					return getMaxSalary(b.salary) - getMaxSalary(a.salary);
				});
				break;
			case 'salary-low':
				filtered.sort((a, b) => {
					const getMinSalary = (salaryStr) => {
						const matches = salaryStr.match(/\$(\d+)k/);
						return matches ? parseInt(matches[1], 10) * 1000 : 0;
					};
					return getMinSalary(a.salary) - getMinSalary(b.salary);
				});
				break;
			default:
				break;
		}

		return filtered;
	}, [selectedDepartment, selectedLocation, selectedType, searchQuery, sortBy]);

	const handleApplyToJob = useCallback((job) => {
		setRecentlyApplied((prev) => [...prev, job.id]);
		// In a real app, you would send this to your analytics/backend
	}, []);

	const clearFilters = useCallback(() => {
		setSelectedDepartment('All');
		setSelectedLocation('All Locations');
		setSelectedType('All Types');
		setSearchQuery('');
		setSortBy('newest');
	}, [
		setSelectedDepartment,
		setSelectedLocation,
		setSelectedType,
		setSearchQuery,
		setSortBy,
	]);

	if (isLoading) {
		return (
			<div className='min-h-screen bg-slate-950 flex items-center justify-center'>
				<div className='text-center'>
					<Loader className='w-12 h-12 text-blue-400 animate-spin mx-auto mb-4' />
					<p className='text-slate-300'>Loading careers...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-slate-950'>
			{/* Background */}
			<div className='fixed inset-0 w-full h-full pointer-events-none'>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent' />
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent' />
			</div>
			<Navigation />

			<div className='relative z-10'>
				{/* Header */}
				<section className='pt-32 pb-16'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<MotionDiv
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='text-center max-w-4xl mx-auto'>
							<h1 className='text-5xl lg:text-7xl font-bold mb-6'>
								<span className={DESIGN_TOKENS.gradient.text}>
									Join Our Mission
								</span>
							</h1>
							<p className='text-xl text-slate-300 mb-8 leading-relaxed'>
								Help us revolutionize digital advertising with cutting-edge
								technology and innovative solutions. Join a team of passionate
								professionals building the future of AdTech.
							</p>

							<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
								<div className='flex items-center gap-2 text-slate-400'>
									<Users className='w-5 h-5 text-blue-400' />
									<span>200+ Team Members</span>
								</div>
								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
								<div className='flex items-center gap-2 text-slate-400'>
									<Globe className='w-5 h-5 text-purple-400' />
									<span>Remote-First Culture</span>
								</div>
								<div className='hidden sm:block w-1 h-1 bg-slate-600 rounded-full' />
								<div className='flex items-center gap-2 text-slate-400'>
									<TrendingUp className='w-5 h-5 text-green-400' />
									<span>Rapidly Growing</span>
								</div>
							</div>
						</MotionDiv>
					</div>
				</section>

				{/* Values Section */}
				<section className='py-16'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='text-center mb-12'>
							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
								<span className={DESIGN_TOKENS.gradient.text}>Our Values</span>
							</h2>
							<p className='text-slate-400 text-lg max-w-2xl mx-auto'>
								The principles that guide everything we do and shape our culture
							</p>
						</div>

						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{values.map((value, index) => (
								<MotionDiv
									key={value.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className='text-center group'>
									<MotionDiv
										whileHover={{ scale: 1.05, rotate: 5 }}
										className='w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all duration-300'>
										<value.icon className='w-8 h-8 text-blue-400' />
									</MotionDiv>
									<h3 className='text-xl font-semibold text-white mb-2'>
										{value.title}
									</h3>
									<p className='text-slate-400'>{value.description}</p>
								</MotionDiv>
							))}
						</div>
					</div>
				</section>

				{/* Benefits Section */}
				<section className='py-16 bg-slate-900/20'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='text-center mb-12'>
							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
								<span className={DESIGN_TOKENS.gradient.text}>
									Why Join AdZPay?
								</span>
							</h2>
							<p className='text-slate-400 text-lg max-w-2xl mx-auto'>
								We offer competitive benefits and a culture that puts people
								first
							</p>
						</div>

						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{benefits.map((benefit, index) => (
								<MotionDiv
									key={benefit.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ y: -5 }}
									className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300'>
									<div className='flex items-center gap-4 mb-4'>
										<div className='p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl'>
											<benefit.icon className='w-6 h-6 text-blue-400' />
										</div>
										<h3 className='text-xl font-semibold text-white'>
											{benefit.title}
										</h3>
									</div>
									<p className='text-slate-300'>{benefit.description}</p>
								</MotionDiv>
							))}
						</div>
					</div>
				</section>

				{/* Job Search and Filters */}
				<section className='py-16'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='mb-12'>
							<h2 className='text-3xl lg:text-4xl font-bold text-center mb-8'>
								<span className={DESIGN_TOKENS.gradient.text}>
									Open Positions
								</span>
							</h2>

							{/* Search and Filters */}
							<div className='bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8'>
								<div className='flex flex-col lg:flex-row gap-4 items-center'>
									{/* Search */}
									<div className='relative flex-1 w-full lg:w-auto'>
										<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
										<input
											type='text'
											placeholder='Search jobs...'
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className='w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
										/>
									</div>

									{/* Sort Dropdown */}
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className='px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'>
										<option value='newest' className='bg-slate-700'>
											Newest First
										</option>
										<option value='oldest' className='bg-slate-700'>
											Oldest First
										</option>
										<option value='salary-high' className='bg-slate-700'>
											Salary: High to Low
										</option>
										<option value='salary-low' className='bg-slate-700'>
											Salary: Low to High
										</option>
									</select>
								</div>

								<div className='flex flex-wrap gap-4 mt-4'>
									{/* Department Filter */}
									<div className='flex flex-col'>
										<label className='text-slate-400 text-sm mb-2'>
											Department
										</label>
										<div className='flex gap-2 flex-wrap'>
											{departments.map((dept) => (
												<MotionButton
													key={dept.name}
													onClick={() => setSelectedDepartment(dept.name)}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
														selectedDepartment === dept.name
															? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
															: 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
													}`}>
													<dept.icon className='w-4 h-4' />
													{dept.name} ({dept.count})
												</MotionButton>
											))}
										</div>
									</div>

									{/* Location Filter */}
									<div className='flex flex-col'>
										<label className='text-slate-400 text-sm mb-2'>
											Location
										</label>
										<select
											value={selectedLocation}
											onChange={(e) => setSelectedLocation(e.target.value)}
											className='px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'>
											{locations.map((location) => (
												<option
													key={location}
													value={location}
													className='bg-slate-700'>
													{location}
												</option>
											))}
										</select>
									</div>

									{/* Job Type Filter */}
									<div className='flex flex-col'>
										<label className='text-slate-400 text-sm mb-2'>
											Job Type
										</label>
										<select
											value={selectedType}
											onChange={(e) => setSelectedType(e.target.value)}
											className='px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'>
											{jobTypes.map((type) => (
												<option
													key={type}
													value={type}
													className='bg-slate-700'>
													{type}
												</option>
											))}
										</select>
									</div>
								</div>

								{(selectedDepartment !== 'All' ||
									selectedLocation !== 'All Locations' ||
									selectedType !== 'All Types' ||
									searchQuery !== '') && (
									<div className='mt-4'>
										<button
											onClick={clearFilters}
											className='text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1'>
											<X className='w-4 h-4' />
											Clear all filters
										</button>
									</div>
								)}
							</div>

							{/* Results count */}
							<div className='flex items-center justify-between mb-6'>
								<p className='text-slate-400'>
									Found {filteredJobs.length} position
									{filteredJobs.length !== 1 ? 's' : ''}
								</p>
								{recentlyApplied.length > 0 && (
									<div className='text-sm text-green-400 flex items-center gap-1'>
										<Star className='w-4 h-4' />
										{recentlyApplied.length} application
										{recentlyApplied.length !== 1 ? 's' : ''} submitted
									</div>
								)}
							</div>
						</div>

						{/* Job Listings */}
						<div className='grid lg:grid-cols-2 gap-6'>
							{filteredJobs.map((job, index) => (
								<JobCard
									key={job.id}
									job={job}
									index={index}
									onClick={() => setSelectedJob(job)}
								/>
							))}
						</div>

						{filteredJobs.length === 0 && (
							<div className='text-center py-16'>
								<div className='w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Search className='w-12 h-12 text-slate-500' />
								</div>
								<h3 className='text-2xl font-semibold text-white mb-2'>
									No positions found
								</h3>
								<p className='text-slate-400 mb-6'>
									Try adjusting your search criteria or check back later for new
									opportunities.
								</p>
								<MotionButton
									onClick={clearFilters}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'>
									Clear Filters
								</MotionButton>
							</div>
						)}
					</div>
				</section>

				{/* Call to Action */}
				<section className='py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20'>
					<div className={DESIGN_TOKENS.spacing.container}>
						<div className='text-center'>
							<h2 className='text-3xl lg:text-4xl font-bold mb-4'>
								<span className={DESIGN_TOKENS.gradient.text}>
									Don&apos;t See Your Role?
								</span>
							</h2>
							<p className='text-slate-300 text-lg mb-8 max-w-2xl mx-auto'>
								We&apos;re always looking for talented individuals to join our
								team. Send us your resume and let us know how you&apos;d like to
								contribute.
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<MotionButton
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2'>
									<Send className='w-5 h-5' />
									Send General Application
								</MotionButton>
								<MotionButton
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='border border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2'>
									<Users className='w-5 h-5' />
									Join Talent Pool
								</MotionButton>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Job Modal */}
			<JobModal
				job={selectedJob}
				onClose={() => setSelectedJob(null)}
				onApply={handleApplyToJob}
			/>
		</div>
	);
}
