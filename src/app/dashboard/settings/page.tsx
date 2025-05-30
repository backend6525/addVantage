'use client';

import { useState } from 'react';
import { withAuth } from '@/app/components/auth/withAuth';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/Tabs/Tabs';
import {
	MessageSquare,
	User,
	CreditCard,
	Key,
	Bell,
	Settings,
	Sun,
	Globe,
	Lock,
	ChevronRight,
	LogOut,
	Users,
	History,
	LayoutTemplate,
	Zap,
	Feather,
	Shield,
	Palette,
	Globe as LanguageIcon,
	UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserSettings } from './use-user-settings';
import {
	ProfileTab,
	BillingTab,
	SecurityTab,
	NotificationsTab,
	PreferencesTab,
} from './setting-tab';
import { Avatar } from './ui-components';

function PremiumSettingsPage() {
	const { user, handleSave, handleNotificationToggle, handleTwoFactorToggle } =
		useUserSettings();
	const [activeTab, setActiveTab] = useState('profile');
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	const sidebarItems = [
		{
			name: 'Profile',
			icon: <User className='h-5 w-5 text-blue-400' />,
			value: 'profile',
			// description: 'Manage your personal details',
		},
		{
			name: 'Billing',
			icon: <CreditCard className='h-5 w-5 text-green-400' />,
			value: 'billing',
			// description: 'Payment and subscription',
		},
		{
			name: 'Security',
			icon: <Shield className='h-5 w-5 text-red-400' />,
			value: 'security',
			// description: 'Protect your account',
		},
		{
			name: 'Notifications',
			icon: <Bell className='h-5 w-5 text-purple-400' />,
			value: 'notifications',
			// description: 'Communication preferences',
		},
		{
			name: 'Preferences',
			icon: <Feather className='h-5 w-5 text-indigo-400' />,
			value: 'preferences',
			// description: 'Customize your experience',
		},
		{
			name: 'Theme',
			icon: <Palette className='h-5 w-5 text-yellow-400' />,
			value: 'theme',
			// description: 'Personalize your interface',
		},
		{
			name: 'Language',
			icon: <LanguageIcon className='h-5 w-5 text-teal-400' />,
			value: 'language',
			// description: 'Select your preferred language',
		},
		{
			name: 'Privacy',
			icon: <Lock className='h-5 w-5 text-pink-400' />,
			value: 'privacy',
			// description: 'Data and privacy controls',
		},
	];

	return (
		<div className='flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden mt-10'>
			{/* Header with Elegant Blur and Depth */}
			<header className='sticky top-0 z-50 backdrop-blur-xl bg-gray-900/90 border-b border-gray-800/50 shadow-2xl'>
				<div className='px-8 py-5 flex items-center justify-between'>
					<div className='flex items-center space-x-4'>
						<div className='bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl shadow-lg'>
							<Settings className='h-7 w-7 text-white' />
						</div>
						<h1 className='text-3xl font-bold tracking-tight'>
							Account <span className='text-blue-400 ml-1'>Control Center</span>
						</h1>
					</div>

					<div className='flex space-x-4 items-center'>
						<div className='bg-gray-800/60 px-5 py-3 rounded-xl border border-gray-700/50 flex items-center space-x-3 shadow-md'>
							<Avatar
								src={user.avatar}
								name={user.name}
								size='md'
								className='ring-2 ring-blue-500'
							/>
							<div>
								<div className='flex items-center'>
									<span className='font-semibold text-white mr-2'>
										{user.name}
									</span>
									<span className='bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs'>
										{user.plan}
									</span>
								</div>
								<p className='text-xs text-gray-400'>{user.email}</p>
							</div>
						</div>
						<Button
							variant='outline'
							className='bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 text-white'>
							<Users className='mr-2 h-4 w-4 text-blue-400' /> Support
						</Button>
						<Button
							variant='destructive'
							className='bg-red-500/80 hover:bg-red-600/90'>
							<LogOut className='mr-2 h-4 w-4' /> Logout
						</Button>
					</div>
				</div>

				{/* Navigation Tabs with Enhanced Design */}
				<div className='px-8 pb-5'>
					{/* <Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'>
						<TabsList className='flex bg-gray-800/60 backdrop-blur-sm rounded-2xl p-1.5 shadow-xl border border-gray-700/50'>
							{sidebarItems.slice(0, 5).map((item) => (
								<TabsTrigger
									key={item.value}
									value={item.value}
									className={`py-3 px-6 rounded-xl transition-all duration-300 ease-in-out flex items-center flex-1 justify-center ${
										activeTab === item.value
											? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-2xl'
											: 'text-gray-400 hover:text-white hover:bg-gray-700/50'
									}`}>
									{item.icon}
									<span className='ml-2 font-medium'>{item.name}</span>
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs> */}
				</div>
			</header>

			{/* Main Content Area with Refined Sidebar */}
			<div className='flex flex-1 overflow-hidden'>
				{/* Collapsible Sidebar with Detailed Interactions */}

				<div
					className={`transition-all duration-500 ease-in-out border-r border-gray-800/50 bg-gray-900/30 backdrop-blur-xl overflow-y-auto ${
						isSidebarCollapsed ? 'w-20' : 'w-80'
					}`}>
					<div className='p-6'>
						{/* Sidebar Navigation with Hover and Active States */}
						<div className='space-y-4'>
							{sidebarItems.map((item) => (
								<button
									key={item.name}
									onClick={() => setActiveTab(item.value)}
									className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 group ${
										activeTab === item.value
											? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300'
											: 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
									} ${
										isSidebarCollapsed ? 'justify-center' : 'justify-between'
									}`}>
									<div className='flex items-center space-x-3'>
										{item.icon}
										{!isSidebarCollapsed && (
											<div>
												<span className='font-medium'>{item.name}</span>
												{/* <p className='text-xs text-gray-500 group-hover:text-gray-300'>
													{item.description}
												</p> */}
											</div>
										)}
									</div>
									{activeTab === item.value && !isSidebarCollapsed && (
										<ChevronRight className='h-4 w-4 text-blue-400' />
									)}
								</button>
							))}
						</div>

						{/* Sidebar Collapse Toggle with Animated Icon */}
						<button
							onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
							className='w-full mt-6 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300 flex items-center justify-center'
							title={
								isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'
							}>
							<ChevronRight
								className={`h-5 w-5 text-gray-300 transition-transform ${
									isSidebarCollapsed ? 'rotate-180' : ''
								}`}
							/>
						</button>
					</div>
				</div>

				{/* Main Content Area with Soft Background */}

				<div className='flex-1 overflow-y-auto bg-gradient-to-br from-gray-900/50 to-gray-900/80 p-8'>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsContent value='profile'>
							<ProfileTab user={user} onSave={handleSave} />
						</TabsContent>
						<TabsContent value='billing'>
							<BillingTab user={user} onUpgrade={() => {}} />
						</TabsContent>
						<TabsContent value='security'>
							<SecurityTab
								user={user}
								onTwoFactorToggle={handleTwoFactorToggle}
							/>
						</TabsContent>
						<TabsContent value='notifications'>
							<NotificationsTab
								user={user}
								onNotificationToggle={handleNotificationToggle}
							/>
						</TabsContent>
						<TabsContent value='preferences'>
							<PreferencesTab user={user} onSave={handleSave} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default withAuth(PremiumSettingsPage);
