'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Crown, Star, Shield, BarChart2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SettingsPanelProps {
	isConfigOpen: boolean;
	isMobile: boolean;
	onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
	isConfigOpen,
	isMobile,
	onClose,
}) => {
	return (
		<AnimatePresence>
			{isConfigOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='fixed inset-0 bg-black/30 z-40'
						onClick={onClose}
					/>

					<motion.div
						initial={{ x: isMobile ? '100%' : 320, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: isMobile ? '100%' : 320, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className={`fixed right-0 ${isMobile ? 'top-0' : 'top-[60px]'} bottom-0 w-full ${
							isMobile ? '' : 'md:w-[320px]'
						} bg-gray-800/70 backdrop-blur-md overflow-y-auto z-[100] border-l border-gray-700/50`}>
						<div className='p-4'>
							<div className='flex items-center justify-between mb-4 md:mb-6'>
								<h2 className='text-lg md:text-xl font-bold text-white flex items-center gap-2'>
									<Settings className='w-4 h-4 md:w-5 md:h-5 text-purple-400' />
									<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
										Dashboard Settings
									</span>
								</h2>
								<button
									onClick={onClose}
									className='p-1 md:p-2 hover:bg-gray-700/50 rounded-full transition-colors hover:scale-110'>
									<X className='w-4 h-4 md:w-5 md:h-5 text-gray-400' />
								</button>
							</div>

							<div className='space-y-4'>
								{/* Theme Settings */}
								<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
									<h3 className='text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center gap-2'>
										<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-purple-500'></span>
										Theme Settings
									</h3>

									<div className='space-y-2 md:space-y-3'>
										<div className='flex items-center justify-between'>
											<span className='text-xs text-gray-300'>Dark Mode</span>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-gray-600/50 rounded-full relative cursor-pointer'>
												<div className='absolute left-0.5 top-0.5 md:left-1 md:top-1 bg-purple-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='flex items-center justify-between'>
											<span className='text-xs text-gray-300'>Animations</span>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-purple-500/50 rounded-full relative cursor-pointer'>
												<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-purple-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='pt-1 md:pt-2'>
											<p className='text-xs text-gray-400 mb-1 md:mb-2'>
												Color Theme
											</p>
											<div className='flex gap-1 md:gap-2'>
												{['purple', 'blue', 'green', 'amber', 'rose'].map(
													(color) => (
														<button
															key={color}
															className={`w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform hover:scale-110 ${
																color === 'purple'
																	? 'bg-purple-500 ring-1 md:ring-2 ring-purple-300 ring-offset-1 ring-offset-gray-800'
																	: color === 'blue'
																		? 'bg-blue-500'
																		: color === 'green'
																			? 'bg-green-500'
																			: color === 'amber'
																				? 'bg-amber-500'
																				: 'bg-rose-500'
															}`}></button>
													)
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Ad Settings */}
								<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
									<h3 className='text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center gap-2'>
										<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-blue-500'></span>
										Ad Settings
									</h3>

									<div className='space-y-2 md:space-y-3'>
										<div className='flex items-center justify-between'>
											<span className='text-xs text-gray-300'>
												Auto-extend Ads
											</span>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-gray-600/50 rounded-full relative cursor-pointer'>
												<div className='absolute left-0.5 top-0.5 md:left-1 md:top-1 bg-gray-400 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='flex items-center justify-between'>
											<span className='text-xs text-gray-300'>
												Ad Analytics
											</span>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-blue-500/50 rounded-full relative cursor-pointer'>
												<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-blue-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='pt-1 md:pt-2'>
											<p className='text-xs text-gray-400 mb-1 md:mb-2'>
												Default Ad Duration
											</p>
											<select className='w-full bg-gray-700/50 border border-gray-600/30 rounded-md text-xs p-1 md:p-2 text-gray-300 focus:ring-1 md:focus:ring-2 focus:ring-blue-500 focus:outline-none'>
												<option>7 days</option>
												<option>14 days</option>
												<option>30 days</option>
												<option>60 days</option>
											</select>
										</div>
									</div>
								</div>

								{/* Notification Preferences */}
								<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
									<h3 className='text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center gap-2'>
										<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500'></span>
										Notification Preferences
									</h3>

									<div className='space-y-2 md:space-y-3'>
										<div className='flex items-center justify-between'>
											<span className='text-xs text-gray-300'>
												Email Alerts
											</span>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-green-500/50 rounded-full relative cursor-pointer'>
												<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='flex items-center justify-between'>
											<span className='text-xs text-gray-300'>
												Push Notifications
											</span>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-green-500/50 rounded-full relative cursor-pointer'>
												<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='flex items-center justify-between'>
											<span className='text-xs text-gray-300'>
												Expiring Ads Alert
											</span>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-green-500/50 rounded-full relative cursor-pointer'>
												<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>
									</div>
								</div>

								{/* Premium Features */}
								<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
									<div className='flex items-start justify-between mb-2 md:mb-3'>
										<div>
											<h3 className='text-xs md:text-sm font-semibold text-white flex items-center gap-2'>
												<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-amber-500'></span>
												Premium Features
											</h3>
											<p className='text-xs text-gray-400 mt-1'>
												Upgrade to unlock powerful tools
											</p>
										</div>
										<Badge className='bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs'>
											<Crown className='w-3 h-3 mr-1' />
											PRO
										</Badge>
									</div>

									<div className='space-y-2 md:space-y-3'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<Zap className='w-4 h-4 text-amber-400' />
												<span className='text-xs text-gray-300'>
													Advanced Analytics
												</span>
											</div>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-amber-500/50 rounded-full relative cursor-pointer'>
												<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-amber-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<Star className='w-4 h-4 text-amber-400' />
												<span className='text-xs text-gray-300'>
													AI Recommendations
												</span>
											</div>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-amber-500/50 rounded-full relative cursor-pointer'>
												<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-amber-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<BarChart2 className='w-4 h-4 text-gray-400' />
												<span className='text-xs text-gray-300'>
													Campaign Automation
												</span>
											</div>
											<div className='w-8 h-4 md:w-10 md:h-5 bg-gray-600/50 rounded-full relative cursor-pointer'>
												<div className='absolute left-0.5 top-0.5 md:left-1 md:top-1 bg-gray-400 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
											</div>
										</div>

										<div className='pt-2'>
											<Button
												variant='outline'
												className='w-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 hover:text-white hover:bg-amber-500/30 text-xs md:text-sm hover:scale-[1.02] transition-transform'>
												<Shield className='w-4 h-4 mr-2' />
												Upgrade to Premium
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
