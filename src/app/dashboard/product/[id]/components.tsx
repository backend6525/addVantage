'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Star,
	Heart,
	Flag,
	Share2,
	Download,
	ExternalLink,
	Eye,
	Send,
	User,
	MapPin,
	ChevronLeft,
	Settings,
	HelpCircle,
	Info,
	Award,
	Clock,
	Zap,
	Users as UsersIcon,
	TrendingUp,
	Calendar,
	Target,
	DollarSign,
	MessageCircle,
	BarChart2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import OnlineStatus from '@/app/components/online/OnlineStatus';
import { MetricCardProps, Publisher } from './interfaces';

export const LoadingState = () => (
	<div className='flex items-center justify-center h-screen bg-slate-800/70'>
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className='text-white text-2xl font-semibold flex items-center space-x-4'>
			<span className='animate-pulse'>Loading details...</span>
		</motion.div>
	</div>
);

export const ErrorState = ({ error }: { error: string | null }) => (
	<div className='flex items-center justify-center h-screen bg-slate-800/70'>
		<motion.div className='text-center text-white'>
			<div className='text-4xl text-red-500 mb-4'>Oops!</div>
			<div className='text-2xl text-red-400'>
				{error || 'Product not found'}
			</div>
			<button
				onClick={() => window.history.back()}
				className='mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors'>
				Go Back
			</button>
		</motion.div>
	</div>
);

export const MetricCard = ({
	icon: Icon,
	label,
	value,
	color,
}: MetricCardProps) => (
	<motion.div
		whileHover={{ scale: 1.05 }}
		className='p-4 rounded-xl bg-slate-700/50 border border-slate-600'>
		<div className='text-slate-300 text-sm mb-1 flex items-center gap-2'>
			<Icon className={`w-4 h-4 ${color}`} />
			{label}
		</div>
		<div className='text-xl font-semibold text-white'>{value}</div>
	</motion.div>
);

export const SocialLinks = ({ links }: { links: Publisher['socialLinks'] }) => {
	if (!links || links.length === 0) return null;

	return (
		<div className='flex flex-wrap gap-3 mt-4'>
			{links.map(({ platform, url, icon: Icon }) => (
				<motion.a
					key={platform}
					href={url}
					target='_blank'
					rel='noopener noreferrer'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className='p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors'
					aria-label={`Visit ${platform}`}>
					<Icon className='w-5 h-5 text-slate-300' />
				</motion.a>
			))}
		</div>
	);
};

export const ReportAdModal = ({
	isOpen,
	onClose,
	onSubmit,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (reason: string, description: string) => void;
}) => {
	const [reason, setReason] = useState('');
	const [description, setDescription] = useState('');

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				className='bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700'>
				<h3 className='text-xl font-semibold mb-4 text-white'>Report Ad</h3>

				<div className='mb-4'>
					<label className='block text-slate-300 mb-2 text-sm'>
						Reason for reporting
					</label>
					<select
						value={reason}
						onChange={(e) => setReason(e.target.value)}
						className='w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white'>
						<option value=''>Select a reason</option>
						<option value='inappropriate'>Inappropriate content</option>
						<option value='misleading'>Misleading information</option>
						<option value='offensive'>Offensive content</option>
						<option value='spam'>Spam</option>
						<option value='other'>Other</option>
					</select>
				</div>

				<div className='mb-6'>
					<label className='block text-slate-300 mb-2 text-sm'>
						Additional details
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full p-3 bg-slate-700 border border-slate-600 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white'
						placeholder='Please provide more details about the issue...'
					/>
				</div>

				<div className='flex justify-end gap-3'>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white'>
						Cancel
					</button>
					<button
						onClick={() => {
							onSubmit(reason, description);
							onClose();
						}}
						disabled={!reason}
						className={`px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors text-white ${
							!reason ? 'opacity-50 cursor-not-allowed' : ''
						}`}>
						Submit Report
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};
