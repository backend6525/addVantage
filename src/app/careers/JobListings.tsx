import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, X } from 'lucide-react';

const jobCategories = [
	'Engineering',
	'Product',
	'Marketing',
	'Sales',
	'Design',
	'Operations',
];

const jobListings = [
	{
		id: 1,
		title: 'Senior Software Engineer',
		department: 'Engineering',
		location: 'Remote',
		type: 'Full-time',
		description:
			'We are seeking a talented Senior Software Engineer to join our core platform team. You will be responsible for designing and implementing scalable backend infrastructure.',
		requirements: [
			'5+ years of software engineering experience',
			'Expert in Python and React',
			'Strong understanding of distributed systems',
			'Experience with cloud platforms (AWS/GCP)',
		],
		benefits: [
			'Competitive salary',
			'Equity compensation',
			'Full health coverage',
			'Flexible work environment',
		],
	},
	{
		id: 2,
		title: 'Product Designer',
		department: 'Design',
		location: 'San Francisco, CA',
		type: 'Full-time',
		description:
			'Join our design team to create intuitive and beautiful user experiences for our financial platform.',
		requirements: [
			'Portfolio demonstrating UI/UX expertise',
			'3+ years of product design experience',
			'Proficiency in Figma and design systems',
			'Understanding of design thinking principles',
		],
		benefits: [
			'Competitive design salary',
			'Creative workspace',
			'Professional development budget',
			'Design-focused culture',
		],
	},
	{
		id: 3,
		title: 'Growth Marketing Manager',
		department: 'Marketing',
		location: 'Hybrid',
		type: 'Full-time',
		description:
			'Drive user acquisition and engagement strategies for our rapidly growing fintech platform.',
		requirements: [
			'4+ years of growth marketing experience',
			'Performance marketing expertise',
			'Data-driven approach to marketing',
			'Experience with B2B/B2C acquisition channels',
		],
		benefits: [
			'Performance bonuses',
			'Learning and development programs',
			'Dynamic work environment',
			'Comprehensive health benefits',
		],
	},
];

function JobListings() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [selectedJob, setSelectedJob] = useState(null);

	const filteredJobs =
		selectedCategory === 'All'
			? jobListings
			: jobListings.filter((job) => job.department === selectedCategory);

	return (
		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white'>
			<div className='container mx-auto px-4 pt-24'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='space-y-8'>
					<h1 className='text-4xl font-bold mb-8 text-center'>
						Join the AdsPay Team
					</h1>

					{/* Category Filters */}
					<div className='flex flex-wrap justify-center gap-4 mb-8'>
						{['All', ...jobCategories].map((category) => (
							<motion.button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`
                  px-4 py-2 rounded-full text-sm 
                  ${
										selectedCategory === category
											? 'bg-blue-600 text-white'
											: 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
									}
                `}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{category}
							</motion.button>
						))}
					</div>

					{/* Job Listings Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredJobs.map((job) => (
							<motion.div
								key={job.id}
								onClick={() => setSelectedJob(job)}
								className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform'
								whileHover={{ scale: 1.02 }}>
								<div className='flex justify-between items-center mb-4'>
									<Briefcase className='text-blue-400' />
									<span className='text-green-500 text-sm bg-green-500/20 px-2 py-1 rounded-full'>
										{job.type}
									</span>
								</div>
								<h3 className='text-xl font-semibold mb-2'>{job.title}</h3>
								<div className='space-y-2 text-gray-400 text-sm'>
									<div className='flex items-center space-x-2'>
										<MapPin size={16} />
										<span>{job.location}</span>
									</div>
									<div className='flex items-center space-x-2'>
										<Clock size={16} />
										<span>{job.department}</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Job Detail Modal */}
				<AnimatePresence>
					{selectedJob && (
						<motion.div
							className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							<motion.div
								className='bg-gray-800 rounded-2xl max-w-2xl w-full p-8 relative'
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}>
								<button
									onClick={() => setSelectedJob(null)}
									className='absolute top-4 right-4 text-gray-400 hover:text-white'>
									<X />
								</button>
								<h2 className='text-3xl font-bold mb-4'>{selectedJob.title}</h2>
								<div className='flex items-center space-x-4 mb-6 text-gray-400'>
									<div className='flex items-center space-x-2'>
										<MapPin size={16} />
										<span>{selectedJob.location}</span>
									</div>
									<div className='flex items-center space-x-2'>
										<Clock size={16} />
										<span>{selectedJob.type}</span>
									</div>
								</div>

								<div className='space-y-6'>
									<div>
										<h3 className='text-xl font-semibold mb-3'>
											Job Description
										</h3>
										<p className='text-gray-300'>{selectedJob.description}</p>
									</div>

									<div className='grid md:grid-cols-2 gap-6'>
										<div>
											<h3 className='text-xl font-semibold mb-3'>
												Requirements
											</h3>
											<ul className='list-disc pl-5 space-y-2 text-gray-300'>
												{selectedJob.requirements.map((req, index) => (
													<li key={index}>{req}</li>
												))}
											</ul>
										</div>
										<div>
											<h3 className='text-xl font-semibold mb-3'>Benefits</h3>
											<ul className='list-disc pl-5 space-y-2 text-gray-300'>
												{selectedJob.benefits.map((benefit, index) => (
													<li key={index}>{benefit}</li>
												))}
											</ul>
										</div>
									</div>

									<button className='w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors'>
										<span>Apply Now</span>
										<ArrowRight />
									</button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default JobListings;
