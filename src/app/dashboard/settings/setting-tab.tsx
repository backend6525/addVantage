'use client';

import { useState } from 'react';
import { TabsContent } from '@/components/ui/Tabs/Tabs';
import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/Switch/index';
import { Input } from '@/components/ui/input';
import Label from '@/components/ui/Lable/Lable';
import { Textarea } from '@/components/ui/textarea';
import {
	Avatar as AvatarBase,
	AvatarImage,
	AvatarFallback,
} from '@radix-ui/react-avatar';
import {
	Camera,
	Wallet,
	Shield,
	CreditCard as CreditCardIcon,
	Calendar,
	CheckCircle,
	AlertCircle,
	Edit,
	Upload,
	Save,
	X,
	User,
} from 'lucide-react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

// Enhanced Avatar Component with More Features
export const Avatar = ({
	src,
	name,
	size = 'md',
	className,
	editable = false,
	onEditClick,
}: {
	src: string;
	name: string;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
	editable?: boolean;
	onEditClick?: () => void;
}) => (
	<div className='relative inline-block'>
		<AvatarPrimitive.Root
			className={cn(
				'relative rounded-full overflow-hidden group',
				size === 'lg' ? 'h-24 w-24' : size === 'md' ? 'h-16 w-16' : 'h-12 w-12',
				className
			)}>
			<AvatarPrimitive.Image
				src={src}
				alt={name}
				className='w-full h-full object-cover'
			/>
			<AvatarPrimitive.Fallback className='bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center h-full w-full text-sm font-medium'>
				{name.slice(0, 2).toUpperCase()}
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
		{editable && (
			<button
				onClick={onEditClick}
				className='absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all transform group-hover:scale-105'>
				<Edit size={16} />
			</button>
		)}
	</div>
);

// Enhanced Badge Component with More Variants
export const Badge = ({
	children,
	variant = 'default',
	className,
}: {
	children: React.ReactNode;
	variant?: 'default' | 'outline' | 'success' | 'warning' | 'premium';
	className?: string;
}) => (
	<span
		className={cn(
			'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
			variant === 'outline'
				? 'border border-gray-700 text-gray-300'
				: variant === 'success'
					? 'bg-green-500/20 text-green-400'
					: variant === 'warning'
						? 'bg-amber-500/20 text-amber-400'
						: variant === 'premium'
							? 'bg-purple-500/20 text-purple-400'
							: 'bg-blue-500/20 text-blue-400',
			className
		)}>
		{children}
	</span>
);

// Premium Profile Tab
export const ProfileTab = ({ user, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: user.name,
		email: user.email,
		location: user.location || '',
		phone: user.phone || '',
		bio: user.bio || '',
		avatar: user.avatar,
	});

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setProfileData((prev) => ({ ...prev, [id]: value }));
	};

	const handleAvatarUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileData((prev) => ({
					...prev,
					avatar: reader.result as string,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		onSave('profile', profileData);
		setIsEditing(false);
	};

	return (
		<TabsContent value='profile' className='space-y-6 animate-in fade-in-50'>
			<Card className='bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-xl border border-gray-700/50 shadow-2xl'>
				<CardHeader className='pb-4 border-b border-gray-700/50'>
					<div className='flex justify-between items-center'>
						<div>
							<CardTitle className='text-2xl font-bold text-white flex items-center'>
								<User className='mr-3 text-blue-400' />
								Profile Information
							</CardTitle>
							<CardDescription className='text-gray-400 mt-2'>
								Manage your personal details and account preferences
							</CardDescription>
						</div>
						<div className='flex items-center space-x-3'>
							<Badge variant='premium'>{user.plan} Plan</Badge>
							{!isEditing ? (
								<Button
									variant='outline'
									onClick={() => setIsEditing(true)}
									className='bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 text-white'>
									<Edit size={16} className='mr-2' /> Edit Profile
								</Button>
							) : (
								<div className='flex space-x-2'>
									<Button
										variant='outline'
										onClick={() => setIsEditing(false)}
										className='bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'>
										<X size={16} className='mr-2' /> Cancel
									</Button>
									<Button
										onClick={handleSave}
										className='bg-blue-600 hover:bg-blue-700'>
										<Save size={16} className='mr-2' /> Save Changes
									</Button>
								</div>
							)}
						</div>
					</div>
				</CardHeader>
				<CardContent className='space-y-6 pt-6'>
					<div className='flex flex-col md:flex-row gap-8'>
						<div className='flex flex-col items-center space-y-4'>
							<div className='relative group'>
								<Avatar
									src={profileData.avatar}
									name={profileData.name}
									size='lg'
									className='h-32 w-32 border-4 border-gray-700 shadow-xl group-hover:opacity-80 transition-all'
									editable={isEditing}
									onEditClick={() => {
										const input = document.createElement('input');
										input.type = 'file';
										input.accept = 'image/*';
										input.onchange = handleAvatarUpload;
										input.click();
									}}
								/>
							</div>
							{isEditing && (
								<p className='text-sm text-gray-400 text-center'>
									Click avatar to upload new profile picture
								</p>
							)}
						</div>
						<div className='flex-1 space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{['fullName', 'email', 'location', 'phone'].map((field) => (
									<div key={field} className='space-y-2'>
										<Label
											htmlFor={field}
											className='text-gray-300 font-medium'>
											{field === 'fullName'
												? 'Full Name'
												: field === 'email'
													? 'Email Address'
													: field.charAt(0).toUpperCase() + field.slice(1)}
										</Label>
										<Input
											id={field}
											value={profileData[field === 'fullName' ? 'name' : field]}
											onChange={handleInputChange}
											disabled={!isEditing}
											className={cn(
												'bg-gray-800/50 border-gray-700 text-white',
												!isEditing && 'cursor-default opacity-70',
												isEditing && 'focus:border-blue-500 focus:ring-blue-500'
											)}
										/>
									</div>
								))}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='bio' className='text-gray-300 font-medium'>
									Personal Bio
								</Label>
								<Textarea
									id='bio'
									value={profileData.bio}
									onChange={handleInputChange}
									disabled={!isEditing}
									placeholder='Tell us a little about yourself'
									className={cn(
										'min-h-24 bg-gray-800/50 border-gray-700 text-white',
										!isEditing && 'cursor-default opacity-70',
										isEditing && 'focus:border-blue-500 focus:ring-blue-500'
									)}
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

// // Enhanced Billing Tab
// export const BillingTab = ({ user }) => (
// 	<TabsContent value='billing' className='space-y-6 animate-in fade-in-50'>
// 		<Card className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg'>
// 			<CardHeader className='pb-4'>
// 				<div className='flex items-center justify-between'>
// 					<div>
// 						<CardTitle className='text-xl text-white'>
// 							Subscription Plan
// 						</CardTitle>
// 						<CardDescription className='text-gray-400'>
// 							Manage your subscription and billing information
// 						</CardDescription>
// 					</div>
// 					<Badge
// 						variant={user.plan === 'Pro' ? 'success' : 'default'}
// 						className='text-sm py-1 px-3'>
// 						{user.plan} Plan
// 					</Badge>
// 				</div>
// 			</CardHeader>
// 			<CardContent className='space-y-6'>
// 				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
// 					<Card className='bg-gray-700/50 border border-gray-600 hover:border-blue-500 transition-all'>
// 						<CardHeader className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 pb-2'>
// 							<div className='flex items-center space-x-2'>
// 								<Wallet className='h-5 w-5 text-blue-400' />
// 								<CardTitle className='text-base text-white'>Free</CardTitle>
// 							</div>
// 						</CardHeader>
// 						<CardContent className='pt-4'>
// 							<p className='text-2xl font-bold text-white'>
// 								$0<span className='text-sm font-normal text-gray-400'>/mo</span>
// 							</p>
// 							<div className='mt-3 space-y-2 text-sm'>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>Basic features</span>
// 								</div>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>Up to 5 projects</span>
// 								</div>
// 								<div className='flex items-center'>
// 									<AlertCircle className='h-4 w-4 text-gray-500 mr-2' />
// 									<span className='text-gray-500'>No priority support</span>
// 								</div>
// 							</div>
// 						</CardContent>
// 						<CardFooter className='pt-0'>
// 							<Button
// 								variant='outline'
// 								className='w-full text-gray-300 border-gray-600 hover:bg-gray-700/50'
// 								disabled={user.plan === 'Free'}>
// 								{user.plan === 'Free' ? 'Current Plan' : 'Downgrade'}
// 							</Button>
// 						</CardFooter>
// 					</Card>

// 					<Card className='bg-gray-700/50 border border-blue-500 shadow-md relative'>
// 						<div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-full'>
// 							Popular
// 						</div>
// 						<CardHeader className='bg-gradient-to-br from-blue-700/50 to-blue-800/50 pb-2'>
// 							<div className='flex items-center space-x-2'>
// 								<Shield className='h-5 w-5 text-blue-400' />
// 								<CardTitle className='text-base text-white'>Pro</CardTitle>
// 							</div>
// 						</CardHeader>
// 						<CardContent className='pt-4'>
// 							<p className='text-2xl font-bold text-white'>
// 								$12
// 								<span className='text-sm font-normal text-gray-400'>/mo</span>
// 							</p>
// 							<div className='mt-3 space-y-2 text-sm'>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>All Free features</span>
// 								</div>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>Unlimited projects</span>
// 								</div>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>Priority support</span>
// 								</div>
// 							</div>
// 						</CardContent>
// 						<CardFooter className='pt-0'>
// 							<Button
// 								className='w-full bg-blue-600 hover:bg-blue-700'
// 								disabled={user.plan === 'Pro'}>
// 								{user.plan === 'Pro' ? 'Current Plan' : 'Upgrade'}
// 							</Button>
// 						</CardFooter>
// 					</Card>

// 					<Card className='bg-gray-700/50 border border-gray-600 hover:border-blue-500 transition-all'>
// 						<CardHeader className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 pb-2'>
// 							<div className='flex items-center space-x-2'>
// 								<Shield className='h-5 w-5 text-indigo-400' />
// 								<CardTitle className='text-base text-white'>
// 									Enterprise
// 								</CardTitle>
// 							</div>
// 						</CardHeader>
// 						<CardContent className='pt-4'>
// 							<p className='text-2xl font-bold text-white'>
// 								$49
// 								<span className='text-sm font-normal text-gray-400'>/mo</span>
// 							</p>
// 							<div className='mt-3 space-y-2 text-sm'>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>All Pro features</span>
// 								</div>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>Advanced security</span>
// 								</div>
// 								<div className='flex items-center'>
// 									<CheckCircle className='h-4 w-4 text-green-400 mr-2' />
// 									<span className='text-gray-300'>24/7 support</span>
// 								</div>
// 							</div>
// 						</CardContent>
// 						<CardFooter className='pt-0'>
// 							<Button
// 								variant='outline'
// 								className='w-full text-gray-300 border-gray-600 hover:bg-gray-700/50'
// 								disabled={user.plan === 'Enterprise'}>
// 								{user.plan === 'Enterprise' ? 'Current Plan' : 'Contact Sales'}
// 							</Button>
// 						</CardFooter>
// 					</Card>
// 				</div>

// 				<div className='pt-6 border-t border-gray-700/50'>
// 					<h3 className='text-lg font-medium text-white mb-4'>
// 						Payment Method
// 					</h3>
// 					<div className='flex items-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
// 						<div className='mr-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md p-2 text-white'>
// 							<CreditCardIcon size={24} />
// 						</div>
// 						<div className='flex-1'>
// 							<div className='flex justify-between'>
// 								<p className='font-medium text-white'>•••• •••• •••• 4242</p>
// 								<Badge
// 									variant='outline'
// 									className='border-gray-600 text-gray-300'>
// 									Default
// 								</Badge>
// 							</div>
// 							<div className='flex text-sm text-gray-400 mt-1'>
// 								<span>Expires {user.cardExpiry || '09/2025'}</span>
// 							</div>
// 						</div>
// 						<Button
// 							variant='ghost'
// 							size='sm'
// 							className='ml-4 text-gray-300 hover:bg-gray-700/50'>
// 							Change
// 						</Button>
// 					</div>
// 				</div>

// 				<div className='pt-6 border-t border-gray-700/50'>
// 					<h3 className='text-lg font-medium text-white mb-4'>
// 						Billing History
// 					</h3>
// 					<div className='overflow-x-auto'>
// 						<table className='min-w-full divide-y divide-gray-700/50'>
// 							<thead>
// 								<tr className='bg-gray-700/50'>
// 									<th
// 										scope='col'
// 										className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 										Date
// 									</th>
// 									<th
// 										scope='col'
// 										className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 										Amount
// 									</th>
// 									<th
// 										scope='col'
// 										className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 										Status
// 									</th>
// 									<th
// 										scope='col'
// 										className='px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 										Invoice
// 									</th>
// 								</tr>
// 							</thead>
// 							<tbody className='bg-gray-800/50 divide-y divide-gray-700/50'>
// 								<tr>
// 									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 										Mar 1, 2025
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 										$12.00
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap'>
// 										<Badge
// 											variant='success'
// 											className='bg-green-500/20 text-green-400'>
// 											Paid
// 										</Badge>
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
// 										<Button
// 											variant='ghost'
// 											size='sm'
// 											className='text-blue-400 hover:bg-gray-700/50'>
// 											Download
// 										</Button>
// 									</td>
// 								</tr>
// 								<tr>
// 									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 										Feb 1, 2025
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 										$12.00
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap'>
// 										<Badge
// 											variant='success'
// 											className='bg-green-500/20 text-green-400'>
// 											Paid
// 										</Badge>
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
// 										<Button
// 											variant='ghost'
// 											size='sm'
// 											className='text-blue-400 hover:bg-gray-700/50'>
// 											Download
// 										</Button>
// 									</td>
// 								</tr>
// 								<tr>
// 									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 										Jan 1, 2025
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 										$12.00
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap'>
// 										<Badge
// 											variant='success'
// 											className='bg-green-500/20 text-green-400'>
// 											Paid
// 										</Badge>
// 									</td>
// 									<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
// 										<Button
// 											variant='ghost'
// 											size='sm'
// 											className='text-blue-400 hover:bg-gray-700/50'>
// 											Download
// 										</Button>
// 									</td>
// 								</tr>
// 							</tbody>
// 						</table>
// 					</div>
// 				</div>
// 			</CardContent>
// 		</Card>
// 	</TabsContent>
// );

export const BillingTab = ({ user, onUpgrade }) => {
	return (
		<TabsContent value='billing' className='space-y-6 animate-in fade-in-50'>
			<Card className='bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-xl border border-gray-700/50 shadow-2xl'>
				<CardHeader className='pb-4 border-b border-gray-700/50'>
					<div className='flex justify-between items-center'>
						<div>
							<CardTitle className='text-2xl font-bold text-white flex items-center'>
								<Wallet className='mr-3 text-blue-400' />
								Subscription & Billing
							</CardTitle>
							<CardDescription className='text-gray-400 mt-2'>
								Manage your subscription plan and payment details
							</CardDescription>
						</div>
						<Badge variant='premium'>{user.plan} Plan</Badge>
					</div>
				</CardHeader>

				<CardContent className='space-y-6 pt-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[
							{
								name: 'Free',
								price: 0,
								features: [
									{
										text: 'Basic features',
										icon: CheckCircle,
										color: 'text-green-400',
									},
									{
										text: 'Up to 5 projects',
										icon: CheckCircle,
										color: 'text-green-400',
									},
									{
										text: 'No priority support',
										icon: AlertCircle,
										color: 'text-gray-500',
									},
								],
								variant: user.plan === 'Free' ? 'current' : 'default',
							},
							{
								name: 'Pro',
								price: 12,
								features: [
									{
										text: 'All Free features',
										icon: CheckCircle,
										color: 'text-green-400',
									},
									{
										text: 'Unlimited projects',
										icon: CheckCircle,
										color: 'text-green-400',
									},
									{
										text: 'Priority support',
										icon: CheckCircle,
										color: 'text-green-400',
									},
								],
								variant: user.plan === 'Pro' ? 'current' : 'default',
								popular: true,
							},
							{
								name: 'Enterprise',
								price: 49,
								features: [
									{
										text: 'All Pro features',
										icon: CheckCircle,
										color: 'text-green-400',
									},
									{
										text: 'Advanced security',
										icon: CheckCircle,
										color: 'text-green-400',
									},
									{
										text: '24/7 support',
										icon: CheckCircle,
										color: 'text-green-400',
									},
								],
								variant: user.plan === 'Enterprise' ? 'current' : 'default',
							},
						].map((plan) => (
							<Card
								key={plan.name}
								className={`
                                    bg-gray-800/50 border 
                                    ${
																			plan.variant === 'current'
																				? 'border-blue-500 shadow-md'
																				: 'border-gray-700 hover:border-blue-500'
																		}
                                    relative transition-all
                                `}>
								{plan.popular && (
									<div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-full'>
										Popular
									</div>
								)}
								<CardHeader className='pb-2'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center space-x-2'>
											{plan.name === 'Free' && (
												<Wallet className='h-5 w-5 text-blue-400' />
											)}
											{plan.name === 'Pro' && (
												<Shield className='h-5 w-5 text-blue-400' />
											)}
											{plan.name === 'Enterprise' && (
												<Shield className='h-5 w-5 text-indigo-400' />
											)}
											<CardTitle className='text-base text-white'>
												{plan.name} Plan
											</CardTitle>
										</div>
									</div>
								</CardHeader>
								<CardContent className='pt-4'>
									<p className='text-2xl font-bold text-white'>
										${plan.price}
										<span className='text-sm font-normal text-gray-400'>
											/mo
										</span>
									</p>
									<div className='mt-4 space-y-2 text-sm'>
										{plan.features.map((feature, index) => (
											<div key={index} className='flex items-center'>
												<feature.icon
													className={`h-4 w-4 mr-2 ${feature.color}`}
												/>
												<span className='text-gray-300'>{feature.text}</span>
											</div>
										))}
									</div>
								</CardContent>
								<CardFooter className='pt-0'>
									<Button
										onClick={() => onUpgrade && onUpgrade(plan.name)}
										className={`
                                            w-full 
                                            ${
																							plan.variant === 'current'
																								? 'bg-blue-600 cursor-default'
																								: 'bg-gray-700 hover:bg-gray-600'
																						}
                                        `}
										disabled={plan.variant === 'current'}>
										{plan.variant === 'current'
											? 'Current Plan'
											: plan.name === 'Enterprise'
												? 'Contact Sales'
												: 'Choose Plan'}
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>

					{/* Payment Method Section */}
					<div className='pt-6 border-t border-gray-700/50'>
						<h3 className='text-lg font-medium text-white mb-4 flex items-center'>
							<CreditCardIcon className='mr-3 text-blue-400' />
							Payment Method
						</h3>
						<div className='flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-lg'>
							<div className='mr-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md p-2 text-white'>
								<CreditCardIcon size={24} />
							</div>
							<div className='flex-1'>
								<div className='flex justify-between items-center'>
									<p className='font-medium text-white'>•••• •••• •••• 4242</p>
									<Badge variant='outline'>Default</Badge>
								</div>
								<div className='flex text-sm text-gray-400 mt-1'>
									<Calendar className='mr-2 h-4 w-4' />
									<span>Expires {user.cardExpiry || '09/2025'}</span>
								</div>
							</div>
							<Button
								variant='outline'
								className='ml-4 text-gray-300 border-gray-700 hover:bg-gray-700/50'>
								Change Payment
							</Button>
						</div>
					</div>

					{/* Billing History Section */}
					<div className='pt-6 border-t border-gray-700/50'>
						<h3 className='text-lg font-medium text-white mb-4 flex items-center'>
							<Calendar className='mr-3 text-blue-400' />
							Billing History
						</h3>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead>
									<tr className='bg-gray-800/50 border-b border-gray-700'>
										{['Date', 'Amount', 'Status', 'Invoice'].map((header) => (
											<th
												key={header}
												className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{[
										{ date: 'Mar 1, 2025', amount: 12.0 },
										{ date: 'Feb 1, 2025', amount: 12.0 },
										{ date: 'Jan 1, 2025', amount: 12.0 },
									].map((transaction, index) => (
										<tr
											key={index}
											className='border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors'>
											<td className='px-4 py-4 text-sm text-gray-300'>
												{transaction.date}
											</td>
											<td className='px-4 py-4 text-sm text-gray-300'>
												${transaction.amount.toFixed(2)}
											</td>
											<td className='px-4 py-4'>
												<Badge variant='success'>Paid</Badge>
											</td>
											<td className='px-4 py-4 text-right'>
												<Button
													variant='ghost'
													size='sm'
													className='text-blue-400 hover:bg-gray-700/50'>
													Download
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

// // Notifications Tab
export const NotificationsTab = ({ user, onNotificationToggle }) => (
	<TabsContent
		value='notifications'
		className='space-y-6 animate-in fade-in-50'>
		<Card className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg'>
			<CardHeader className='pb-4'>
				<CardTitle className='text-xl text-white'>Notifications</CardTitle>
				<CardDescription className='text-gray-400'>
					Manage your notification preferences
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label className='text-gray-300'>Email Notifications</Label>
						<div className='space-y-3'>
							<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
								<div>
									<p className='text-sm font-medium text-white'>
										Product Updates
									</p>
									<p className='text-xs text-gray-400'>
										Receive updates about new features and improvements
									</p>
								</div>
								<Switch
									checked={user.notifications.productUpdates}
									onCheckedChange={(checked) =>
										onNotificationToggle('productUpdates', checked)
									}
									className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600'
								/>
							</div>
							<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
								<div>
									<p className='text-sm font-medium text-white'>
										Security Alerts
									</p>
									<p className='text-xs text-gray-400'>
										Receive important security notifications
									</p>
								</div>
								<Switch
									checked={user.notifications.securityAlerts}
									onCheckedChange={(checked) =>
										onNotificationToggle('securityAlerts', checked)
									}
									className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600'
								/>
							</div>
							<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
								<div>
									<p className='text-sm font-medium text-white'>
										Promotional Offers
									</p>
									<p className='text-xs text-gray-400'>
										Receive special offers and discounts
									</p>
								</div>
								<Switch
									checked={user.notifications.promotionalOffers}
									onCheckedChange={(checked) =>
										onNotificationToggle('promotionalOffers', checked)
									}
									className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600'
								/>
							</div>
						</div>
					</div>
					<div className='space-y-2'>
						<Label className='text-gray-300'>Push Notifications</Label>
						<div className='space-y-3'>
							<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
								<div>
									<p className='text-sm font-medium text-white'>New Messages</p>
									<p className='text-xs text-gray-400'>
										Notify me about new messages
									</p>
								</div>
								<Switch
									checked={user.notifications.newMessages}
									onCheckedChange={(checked) =>
										onNotificationToggle('newMessages', checked)
									}
									className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600'
								/>
							</div>
							<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
								<div>
									<p className='text-sm font-medium text-white'>Reminders</p>
									<p className='text-xs text-gray-400'>
										Notify me about upcoming events
									</p>
								</div>
								<Switch
									checked={user.notifications.reminders}
									onCheckedChange={(checked) =>
										onNotificationToggle('reminders', checked)
									}
									className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600'
								/>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex justify-end pt-2 border-t border-gray-700/50'>
				<Button
					onClick={() => onNotificationToggle('save')}
					className='bg-blue-600 hover:bg-blue-700'>
					Save Changes
				</Button>
			</CardFooter>
		</Card>
	</TabsContent>
);

// Preferences Tab
export const PreferencesTab = ({ user, onSave }) => (
	<TabsContent value='preferences' className='space-y-6 animate-in fade-in-50'>
		<Card className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg'>
			<CardHeader className='pb-4'>
				<CardTitle className='text-xl text-white'>Preferences</CardTitle>
				<CardDescription className='text-gray-400'>
					Customize your application preferences
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label className='text-gray-300'>Theme</Label>
						<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
							<div>
								<p className='text-sm font-medium text-white'>Dark Mode</p>
								<p className='text-xs text-gray-400'>
									Enable or disable dark mode
								</p>
							</div>
							<Switch
								checked={user.preferences?.darkMode ?? false} // Fallback to `false` if `preferences` or `darkMode` is undefined
								onCheckedChange={(checked) =>
									onSave('preferences', {
										...user.preferences, // Ensure existing preferences are preserved
										darkMode: checked,
									})
								}
								className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600'
							/>
						</div>
					</div>
					<div className='space-y-2'>
						<Label className='text-gray-300'>Language</Label>
						<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
							<div>
								<p className='text-sm font-medium text-white'>Language</p>
								<p className='text-xs text-gray-400'>
									Select your preferred language
								</p>
							</div>
							<select
								defaultValue={user.preferences?.language ?? 'en'} // Fallback to `'en'` if `preferences` or `language` is undefined
								onChange={(e) =>
									onSave('preferences', {
										...user.preferences, // Ensure existing preferences are preserved
										language: e.target.value,
									})
								}
								className='bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500'>
								<option value='en'>English</option>
								<option value='es'>Spanish</option>
								<option value='fr'>French</option>
								<option value='de'>German</option>
							</select>
						</div>
					</div>
					<div className='space-y-2'>
						<Label className='text-gray-300'>Timezone</Label>
						<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
							<div>
								<p className='text-sm font-medium text-white'>Timezone</p>
								<p className='text-xs text-gray-400'>Set your local timezone</p>
							</div>
							<select
								defaultValue={user.preferences?.timezone ?? 'UTC'} // Fallback to `'UTC'` if `preferences` or `timezone` is undefined
								onChange={(e) =>
									onSave('preferences', {
										...user.preferences, // Ensure existing preferences are preserved
										timezone: e.target.value,
									})
								}
								className='bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500'>
								<option value='UTC'>UTC</option>
								<option value='PST'>PST (Pacific Standard Time)</option>
								<option value='EST'>EST (Eastern Standard Time)</option>
								<option value='CET'>CET (Central European Time)</option>
							</select>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex justify-end pt-2 border-t border-gray-700/50'>
				<Button
					onClick={() => onSave('preferences')}
					className='bg-blue-600 hover:bg-blue-700'>
					Save Changes
				</Button>
			</CardFooter>
		</Card>
	</TabsContent>
);

export const SecurityTab = ({ user, onTwoFactorToggle }) => (
	<TabsContent value='security' className='space-y-6 animate-in fade-in-50'>
		<Card className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg'>
			<CardHeader className='pb-4'>
				<CardTitle className='text-xl text-white'>Security</CardTitle>
				<CardDescription className='text-gray-400'>
					Manage your account security settings
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label className='text-gray-300'>Two-Factor Authentication</Label>
						<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
							<div>
								<p className='text-sm font-medium text-white'>
									Enable two-factor authentication
								</p>
								<p className='text-xs text-gray-400'>
									Add an extra layer of security to your account
								</p>
							</div>
							<Switch
								checked={user.twoFactorEnabled}
								onCheckedChange={(checked) => onTwoFactorToggle(checked)}
								className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600'
							/>
						</div>
					</div>
					<div className='space-y-2'>
						<Label className='text-gray-300'>Password</Label>
						<div className='space-y-3'>
							<div className='flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600 rounded-lg'>
								<div>
									<p className='text-sm font-medium text-white'>
										Change Password
									</p>
									<p className='text-xs text-gray-400'>
										Update your current password
									</p>
								</div>
								<Button
									variant='outline'
									className='text-gray-300 border-gray-600 hover:bg-gray-700/50'>
									Change
								</Button>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex justify-end pt-2 border-t border-gray-700/50'>
				<Button
					onClick={() => onTwoFactorToggle(user.twoFactorEnabled)}
					className='bg-blue-600 hover:bg-blue-700'>
					Save Changes
				</Button>
			</CardFooter>
		</Card>
	</TabsContent>
);
