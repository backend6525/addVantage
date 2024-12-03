// 'use client';
// import React from 'react';
// import InviteForm from './InviteForm';
// const Page: React.FC = () => {
// 	// Assuming you get the logged-in user's ID from a session or context
// 	const userId = 'example-user-id';

// 	return (
// 		<div className='min-h-screen  bg-gray-850 flex items-center justify-center'>
// 			<InviteForm userId={userId} />
// 		</div>
// 	);
// };

// export default Page;

// 'use client';

// import React from 'react';
// import { Award, Users, Share2, Gift, Sparkles } from 'lucide-react';
// import InviteForm from './InviteForm';

// const ReferralStatCard: React.FC<{
// 	icon: React.ElementType;
// 	title: string;
// 	value: string;
// }> = ({ icon: Icon, title, value }) => (
// 	<div className='bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-5 flex items-center space-x-4 hover:bg-white/10 transition-all'>
// 		<div className='bg-blue-500/20 p-3 rounded-full'>
// 			<Icon className='text-blue-400' size={24} />
// 		</div>
// 		<div>
// 			<p className='text-white/70 text-sm'>{title}</p>
// 			<h3 className='text-2xl font-bold text-white/90'>{value}</h3>
// 		</div>
// 	</div>
// );

// const Page: React.FC = () => {
// 	// Assuming you get the logged-in user's ID from a session or context
// 	const userId = 'example-user-id';

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-gray-900 to-black text-white'>
// 			<div className='container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8'>
// 				{/* Sidebar with Referral Stats */}
// 				<div className='lg:col-span-1 space-y-6'>
// 					<div className='bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-6'>
// 						<div className='flex items-center space-x-4 mb-6'>
// 							<Sparkles className='text-yellow-400' size={32} />
// 							<h2 className='text-2xl font-bold text-white/90'>
// 								Referral Dashboard
// 							</h2>
// 						</div>

// 						<div className='space-y-4'>
// 							<ReferralStatCard
// 								icon={Users}
// 								title='Total Referrals'
// 								value='24'
// 							/>
// 							<ReferralStatCard
// 								icon={Award}
// 								title='Rewards Earned'
// 								value='$240'
// 							/>
// 							<ReferralStatCard
// 								icon={Gift}
// 								title='Pending Rewards'
// 								value='$60'
// 							/>
// 						</div>
// 					</div>

// 					<div className='bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-6'>
// 						<div className='flex items-center space-x-4 mb-4'>
// 							<Share2 className='text-green-400' size={24} />
// 							<h3 className='text-xl font-bold text-white/90'>Referral Tips</h3>
// 						</div>
// 						<ul className='space-y-2 text-white/70 text-sm'>
// 							<li>• Invite friends to earn rewards</li>
// 							<li>• Share your unique referral link</li>
// 							<li>• Earn $10 for each successful referral</li>
// 						</ul>
// 					</div>
// 				</div>

// 				{/* Main Invite Form Section */}
// 				<div className='lg:col-span-2'>
// 					<InviteForm userId={userId} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Page;

'use client';

import React, { useState } from 'react';
import {
	Award,
	Users,
	Share2,
	Gift,
	Sparkles,
	Copy,
	Clock,
	TrendingUp,
	LogOut,
	CheckCircle,
	Settings,
} from 'lucide-react';
import InviteForm from './InviteForm';
import { motion } from 'framer-motion';

const ReferralStatCard: React.FC<{
	icon: React.ElementType;
	title: string;
	value: string;
}> = ({ icon: Icon, title, value }) => (
	<motion.div
		whileHover={{ scale: 1.03 }}
		className='bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-5 flex items-center space-x-4 hover:bg-white/10 transition-all'>
		<div className='bg-blue-500/20 p-3 rounded-full'>
			<Icon className='text-blue-400' size={24} />
		</div>
		<div>
			<p className='text-white/70 text-sm'>{title}</p>
			<h3 className='text-2xl font-bold text-white/90'>{value}</h3>
		</div>
	</motion.div>
);

const Page: React.FC = () => {
	const [copiedCode, setCopiedCode] = useState(false);
	const userId = 'example-user-id';
	const referralCode = 'REFER123BONUS';

	const handleCopyReferralCode = () => {
		navigator.clipboard.writeText(referralCode);
		setCopiedCode(true);
		setTimeout(() => setCopiedCode(false), 2000);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 md:pt-28 lg:pt-32'>
			<div className='container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Sidebar with Referral Stats and Additional Features */}
				<div className='lg:col-span-1 space-y-6'>
					{/* Referral Code Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-6'>
						<div className='flex justify-between items-center mb-4'>
							<div className='flex items-center space-x-4'>
								<Share2 className='text-green-400' size={24} />
								<h2 className='text-xl font-bold text-white/90'>
									Referral Code
								</h2>
							</div>
							<motion.button
								whileHover={{ scale: 1.1 }}
								onClick={handleCopyReferralCode}
								className='text-blue-400 hover:text-blue-300'>
								{copiedCode ? (
									<CheckCircle className='text-green-400' />
								) : (
									<Copy size={20} />
								)}
							</motion.button>
						</div>
						<div className='bg-white/10 rounded-lg p-3 flex justify-between items-center'>
							<code className='text-white/80 tracking-wider'>
								{referralCode}
							</code>
						</div>
					</motion.div>

					{/* Referral Stats */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-6'>
						<div className='flex items-center space-x-4 mb-6'>
							<Sparkles className='text-yellow-400' size={32} />
							<h2 className='text-2xl font-bold text-white/90'>
								Referral Dashboard
							</h2>
						</div>

						<div className='space-y-4'>
							<ReferralStatCard
								icon={Users}
								title='Total Referrals'
								value='24'
							/>
							<ReferralStatCard
								icon={Award}
								title='Rewards Earned'
								value='$240'
							/>
							<ReferralStatCard
								icon={Gift}
								title='Pending Rewards'
								value='$60'
							/>
						</div>
					</motion.div>

					{/* Additional Quick Actions */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className='bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-6'>
						<h3 className='text-xl font-bold text-white/90 mb-4 flex items-center space-x-2'>
							<TrendingUp className='text-purple-400' size={24} />
							<span>Quick Actions</span>
						</h3>
						<div className='space-y-3'>
							{[
								{
									icon: Clock,
									text: 'Referral History',
									color: 'text-blue-400',
								},
								{
									icon: Settings,
									text: 'Referral Settings',
									color: 'text-green-400',
								},
								{
									icon: LogOut,
									text: 'Invite Leaderboard',
									color: 'text-yellow-400',
								},
							].map((action, index) => (
								<motion.button
									key={index}
									whileHover={{ scale: 1.05 }}
									className='w-full flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all'>
									<action.icon className={action.color} size={20} />
									<span className='text-white/80'>{action.text}</span>
								</motion.button>
							))}
						</div>
					</motion.div>
				</div>

				{/* Main Invite Form Section */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className='lg:col-span-2'>
					<InviteForm userId={userId} />
				</motion.div>
			</div>
		</div>
	);
};

export default Page;
