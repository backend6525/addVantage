// import Image from 'next/image';
// import { FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa';
// import { useState, useEffect } from 'react';

// interface UserData {
// 	name?: string;
// 	email?: string;
// 	picture?: string;
// 	balance?: number;
// 	credits?: number;
// }

// export default function SidebarCard() {
// 	const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH' | 'USD'>(
// 		'USD'
// 	);
// 	const [amount, setAmount] = useState<string>('');
// 	const [userData, setUserData] = useState<UserData | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	// Fetch user data from API
// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			try {
// 				setIsLoading(true);
// 				const response = await fetch('/api/auth/user');

// 				if (!response.ok) {
// 					throw new Error('Failed to fetch user data');
// 				}

// 				const data = await response.json();
// 				setUserData(data);
// 			} catch (err) {
// 				console.error('Error fetching user data:', err);
// 				setError('Failed to load user data');
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchUserData();
// 	}, []);

// 	const handleAmountChange = (value: string) => {
// 		// Only allow numbers and decimal point
// 		if (/^\d*\.?\d*$/.test(value)) {
// 			setAmount(value);
// 		}
// 	};

// 	const handleTopUp = () => {
// 		// TODO: Implement top up functionality
// 		console.log('Top up clicked');
// 	};

// 	const handleProcessToWallet = () => {
// 		// TODO: Implement wallet processing
// 		console.log('Process to wallet clicked');
// 	};

// 	if (isLoading) {
// 		return (
// 			<div className='bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl w-full p-6 text-center text-gray-100 border border-gray-700/50'>
// 				<div className='flex justify-center items-center h-40'>
// 					<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className='bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl w-full p-6 text-center text-gray-100 border border-gray-700/50'>
// 				<div className='text-red-400 mb-2'>Error loading profile</div>
// 				<button
// 					onClick={() => window.location.reload()}
// 					className='text-sm text-blue-400 hover:text-blue-300'>
// 					Try again
// 				</button>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl w-full p-6 text-center text-gray-100 border border-gray-700/50'>
// 			{/* Profile Picture */}
// 			<div className='flex justify-center'>
// 				<div className='w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 mb-4 border-4 border-gray-700/50'>
// 					{userData?.picture ? (
// 						<Image
// 							src={userData.picture}
// 							alt='Profile Picture'
// 							width={96}
// 							height={96}
// 							className='object-cover'
// 						/>
// 					) : (
// 						<div className='w-full h-full flex items-center justify-center text-white text-2xl font-bold'>
// 							{userData?.name?.charAt(0) || 'U'}
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			{/* User Info */}
// 			<div className='mb-4'>
// 				<h3 className='text-xl font-bold text-gray-100'>
// 					{userData?.name || 'User'}
// 				</h3>
// 				<p className='text-sm text-gray-400'>
// 					{userData?.email || 'No email provided'}
// 				</p>
// 			</div>

// 			{/* Balance Section */}
// 			<div className='bg-gray-700/50 rounded-lg p-4 mb-4'>
// 				<div className='text-gray-400 text-sm mb-1'>MY BALANCE</div>
// 				<div className='text-3xl font-bold text-gray-100 mb-2'>
// 					${userData?.balance?.toFixed(2) || '0.00'}
// 				</div>
// 				<div className='text-sm text-gray-400 mb-3'>
// 					Credits: {userData?.credits || 0}
// 				</div>
// 				<button
// 					onClick={handleTopUp}
// 					className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300'>
// 					+ TOP UP BALANCE
// 				</button>
// 			</div>

// 			{/* Navigation Buttons */}
// 			<div className='grid grid-cols-4 gap-2 mb-6'>
// 				{['BUY', 'SELL', 'SEND', 'EXCHANGE'].map((action) => (
// 					<button
// 						key={action}
// 						className={`px-3 py-2 rounded-lg text-sm font-medium transition duration-300 ${
// 							action === 'EXCHANGE'
// 								? 'bg-blue-500 text-white'
// 								: 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
// 						}`}>
// 						{action}
// 					</button>
// 				))}
// 			</div>

// 			{/* Coin Conversion Section */}
// 			<div className='bg-gray-700/50 rounded-lg p-4'>
// 				<div className='flex items-center justify-between mb-4'>
// 					<div className='flex items-center space-x-2'>
// 						<FaBitcoin className='text-orange-500' />
// 						<span>BTC</span>
// 					</div>
// 					<input
// 						type='text'
// 						value={selectedCoin === 'BTC' ? amount : ''}
// 						onChange={(e) => handleAmountChange(e.target.value)}
// 						placeholder='0'
// 						className='w-24 text-right bg-gray-800 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 text-gray-100 px-2 py-1'
// 					/>
// 				</div>
// 				<div className='flex items-center justify-between mb-4'>
// 					<div className='flex items-center space-x-2'>
// 						<FaDollarSign className='text-green-500' />
// 						<span>USD</span>
// 					</div>
// 					<input
// 						type='text'
// 						value={selectedCoin === 'USD' ? amount : ''}
// 						onChange={(e) => handleAmountChange(e.target.value)}
// 						placeholder='0.00'
// 						className='w-24 text-right bg-gray-800 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 text-gray-100 px-2 py-1'
// 					/>
// 				</div>
// 				<div className='flex items-center justify-between mb-4'>
// 					<div className='flex items-center space-x-2'>
// 						<FaEthereum className='text-blue-500' />
// 						<span>ETH</span>
// 					</div>
// 					<input
// 						type='text'
// 						value={selectedCoin === 'ETH' ? amount : ''}
// 						onChange={(e) => handleAmountChange(e.target.value)}
// 						placeholder='0.00'
// 						className='w-24 text-right bg-gray-800 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 text-gray-100 px-2 py-1'
// 					/>
// 				</div>

// 				{/* Process Button */}
// 				<button
// 					onClick={handleProcessToWallet}
// 					className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300'>
// 					PROCESS TO WALLET
// 				</button>
// 			</div>

// 			{/* Available Coins */}
// 			<div className='mt-4 text-gray-400 text-xs'>AVAILABLE COINS</div>
// 		</div>
// 	);
// }

import Image from 'next/image';
import {
	FaBitcoin,
	FaEthereum,
	FaDollarSign,
	FaExchangeAlt,
	FaArrowUp,
	FaArrowDown,
	FaPaperPlane,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface UserData {
	name?: string;
	email?: string;
	picture?: string;
	balance?: number;
	credits?: number;
}

export default function SidebarCard() {
	const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH' | 'USD'>(
		'USD'
	);
	const [amount, setAmount] = useState<string>('');
	const [userData, setUserData] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch user data from API
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/auth/user');

				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}

				const data = await response.json();
				setUserData(data);
			} catch (err) {
				console.error('Error fetching user data:', err);
				setError('Failed to load user data');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, []);

	const handleAmountChange = (value: string) => {
		// Only allow numbers and decimal point
		if (/^\d*\.?\d*$/.test(value)) {
			setAmount(value);
		}
	};

	const handleTopUp = () => {
		// TODO: Implement top up functionality
		console.log('Top up clicked');
	};

	const handleProcessToWallet = () => {
		// TODO: Implement wallet processing
		console.log('Process to wallet clicked');
	};

	const handleActionClick = (action: string) => {
		// TODO: Implement action functionality
		console.log(`${action} clicked`);
	};

	if (isLoading) {
		return (
			<div className='bg-gray-800 rounded-xl w-full p-6 text-center text-gray-100 border border-gray-700'>
				<div className='flex justify-center items-center h-40'>
					<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-gray-800 rounded-xl w-full p-6 text-center text-gray-100 border border-gray-700'>
				<div className='text-red-400 mb-2'>Error loading profile</div>
				<button
					onClick={() => window.location.reload()}
					className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors'>
					Try again
				</button>
			</div>
		);
	}

	return (
		<div className='bg-gray-800 rounded-xl w-full p-6 text-center text-gray-100 border border-gray-700'>
			{/* Profile Section */}
			<div className='flex flex-col items-center mb-6'>
				<div className='w-20 h-20 rounded-full overflow-hidden bg-gray-700 mb-3 border-2 border-gray-600'>
					{userData?.picture ? (
						<Image
							src={userData.picture}
							alt='Profile Picture'
							width={80}
							height={80}
							className='object-cover'
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-white text-xl font-bold'>
							{userData?.name?.charAt(0) || 'U'}
						</div>
					)}
				</div>
				<h3 className='text-lg font-bold text-white'>
					{userData?.name || 'User'}
				</h3>
				<p className='text-xs text-gray-400'>
					{userData?.email || 'No email provided'}
				</p>
			</div>

			{/* Balance Section */}
			<div className='bg-gray-700 rounded-lg p-4 mb-6'>
				<div className='flex justify-between items-center mb-2'>
					<span className='text-xs text-gray-400 uppercase tracking-wider'>
						Balance
					</span>
					<span className='text-xs text-gray-400'>
						Credits: {userData?.credits || 0}
					</span>
				</div>
				<div className='text-2xl font-bold text-white mb-4'>
					${userData?.balance?.toFixed(2) || '0.00'}
				</div>
				<button
					onClick={handleTopUp}
					className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center'>
					<FaArrowUp className='mr-2' />
					Top Up Balance
				</button>
			</div>

			{/* Quick Actions */}
			<div className='grid grid-cols-4 gap-2 mb-6'>
				<button
					onClick={() => handleActionClick('BUY')}
					className='flex flex-col items-center justify-center p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors'>
					<FaArrowDown className='text-green-400 mb-1' />
					<span className='text-xs'>Buy</span>
				</button>
				<button
					onClick={() => handleActionClick('SELL')}
					className='flex flex-col items-center justify-center p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors'>
					<FaArrowUp className='text-red-400 mb-1' />
					<span className='text-xs'>Sell</span>
				</button>
				<button
					onClick={() => handleActionClick('SEND')}
					className='flex flex-col items-center justify-center p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors'>
					<FaPaperPlane className='text-blue-400 mb-1' />
					<span className='text-xs'>Send</span>
				</button>
				<button
					onClick={() => handleActionClick('EXCHANGE')}
					className='flex flex-col items-center justify-center p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors'>
					<FaExchangeAlt className='text-white mb-1' />
					<span className='text-xs'>Exchange</span>
				</button>
			</div>

			{/* Coin Conversion Section */}
			<div className='mb-4'>
				<h4 className='text-sm font-medium text-gray-300 mb-3 text-left'>
					Currency Converter
				</h4>
				<div className='space-y-3'>
					{/* USD */}
					<div
						className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedCoin === 'USD' ? 'bg-blue-600/20 border border-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
						onClick={() => setSelectedCoin('USD')}>
						<div className='flex items-center'>
							<div className='bg-green-500/20 p-2 rounded-full mr-3'>
								<FaDollarSign className='text-green-400' />
							</div>
							<span className='text-sm'>USD</span>
						</div>
						<input
							type='text'
							value={selectedCoin === 'USD' ? amount : ''}
							onChange={(e) => handleAmountChange(e.target.value)}
							placeholder='0.00'
							className='w-20 bg-transparent text-right focus:outline-none text-sm'
						/>
					</div>

					{/* BTC */}
					<div
						className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedCoin === 'BTC' ? 'bg-blue-600/20 border border-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
						onClick={() => setSelectedCoin('BTC')}>
						<div className='flex items-center'>
							<div className='bg-orange-500/20 p-2 rounded-full mr-3'>
								<FaBitcoin className='text-orange-400' />
							</div>
							<span className='text-sm'>Bitcoin</span>
						</div>
						<input
							type='text'
							value={selectedCoin === 'BTC' ? amount : ''}
							onChange={(e) => handleAmountChange(e.target.value)}
							placeholder='0'
							className='w-20 bg-transparent text-right focus:outline-none text-sm'
						/>
					</div>

					{/* ETH */}
					<div
						className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedCoin === 'ETH' ? 'bg-blue-600/20 border border-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
						onClick={() => setSelectedCoin('ETH')}>
						<div className='flex items-center'>
							<div className='bg-blue-500/20 p-2 rounded-full mr-3'>
								<FaEthereum className='text-blue-400' />
							</div>
							<span className='text-sm'>Ethereum</span>
						</div>
						<input
							type='text'
							value={selectedCoin === 'ETH' ? amount : ''}
							onChange={(e) => handleAmountChange(e.target.value)}
							placeholder='0.00'
							className='w-20 bg-transparent text-right focus:outline-none text-sm'
						/>
					</div>
				</div>
			</div>

			{/* Process Button */}
			<button
				onClick={handleProcessToWallet}
				className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors text-sm font-medium'>
				Transfer to Wallet
			</button>

			{/* Available Coins */}
			<div className='mt-6 text-xs text-gray-400 uppercase tracking-wider'>
				Supported Currencies
			</div>
			<div className='flex justify-center space-x-4 mt-2'>
				<span className='text-xs text-gray-400'>USD</span>
				<span className='text-xs text-gray-400'>BTC</span>
				<span className='text-xs text-gray-400'>ETH</span>
			</div>
		</div>
	);
}
