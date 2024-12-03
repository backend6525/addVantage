import React, { useState, useCallback } from 'react';
import {
	CreditCard,
	PhoneCall,
	CheckCircle,
	XCircle,
	Loader2,
	DollarSign,
} from 'lucide-react';
import axios from 'axios';

function WithdrawFunds() {
	const [withdrawMethod, setWithdrawMethod] = useState('bank');
	const [accountNumber, setAccountNumber] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [paypalEmail, setPaypalEmail] = useState('');
	const [withdrawalAmount, setWithdrawalAmount] = useState(500); // Example fixed withdrawal amount
	const [isLoading, setIsLoading] = useState(false);
	const [notification, setNotification] = useState({ message: '', type: '' });
	const [balance, setBalance] = useState(5000); // Example balance

	const validateInput = useCallback(() => {
		if (withdrawMethod === 'bank') {
			return /^\d{10,16}$/.test(accountNumber); // Validate bank account number
		} else if (withdrawMethod === 'mobile') {
			return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNumber); // Validate mobile number
		} else if (withdrawMethod === 'paypal') {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail); // Validate PayPal email
		}
		return false;
	}, [withdrawMethod, accountNumber, mobileNumber, paypalEmail]);

	const handleWithdraw = useCallback(async () => {
		setIsLoading(true);
		setNotification({ message: '', type: '' });

		setTimeout(async () => {
			if (validateInput()) {
				if (withdrawalAmount > balance) {
					setNotification({
						message: 'Insufficient funds for withdrawal.',
						type: 'error',
					});
				} else {
					setBalance((prevBalance) => prevBalance - withdrawalAmount);
					setNotification({
						message: `Withdrawal of $${withdrawalAmount} successful!`,
						type: 'success',
					});

					try {
						// Send request to backend API
						const response = await axios.post('/api/withdraw', {
							method: withdrawMethod,
							amount: withdrawalAmount,
							details:
								withdrawMethod === 'bank'
									? { accountNumber }
									: withdrawMethod === 'mobile'
										? { mobileNumber }
										: { paypalEmail },
						});
						console.log('Payout response:', response.data);
					} catch (error) {
						console.error('Payout error:', error);
						setNotification({
							message: 'Error processing payout. Please try again.',
							type: 'error',
						});
					}
				}
			} else {
				setNotification({
					message: 'Invalid details. Please check and try again.',
					type: 'error',
				});
			}
			setIsLoading(false);
		}, 2000);
	}, [
		validateInput,
		balance,
		withdrawalAmount,
		withdrawMethod,
		accountNumber,
		mobileNumber,
		paypalEmail,
	]);

	return (
		<div className='bg-gray-900 p-6 rounded-xl shadow-2xl max-w-md mx-auto relative overflow-hidden'>
			<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600'></div>

			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-white text-2xl font-bold'>Withdraw Funds</h2>
				<div className='text-gray-300'>
					Balance:{' '}
					<span className='text-green-400 font-semibold'>
						${balance.toLocaleString()}
					</span>
				</div>
			</div>

			{/* Withdraw Method Selection */}
			<div className='mb-4'>
				<label className='text-gray-300 block mb-2'>
					Select Withdrawal Method
				</label>
				<div className='flex space-x-2'>
					<button
						onClick={() => setWithdrawMethod('bank')}
						className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
							withdrawMethod === 'bank'
								? 'bg-blue-600 text-white'
								: 'bg-gray-700 text-gray-400 hover:bg-gray-600'
						}`}>
						<CreditCard className='w-5 h-5' />
						<span>Bank Account</span>
					</button>
					<button
						onClick={() => setWithdrawMethod('mobile')}
						className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
							withdrawMethod === 'mobile'
								? 'bg-green-600 text-white'
								: 'bg-gray-700 text-gray-400 hover:bg-gray-600'
						}`}>
						<PhoneCall className='w-5 h-5' />
						<span>Mobile Money</span>
					</button>
					<button
						onClick={() => setWithdrawMethod('paypal')}
						className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
							withdrawMethod === 'paypal'
								? 'bg-yellow-500 text-white'
								: 'bg-gray-700 text-gray-400 hover:bg-gray-600'
						}`}>
						<DollarSign className='w-5 h-5' />
						<span>PayPal</span>
					</button>
				</div>
			</div>

			{/* Input Section */}
			<div className='bg-gray-800 p-4 rounded-lg mb-4'>
				{withdrawMethod === 'bank' ? (
					<div>
						<label className='text-gray-300 block mb-2'>
							Bank Account Number
						</label>
						<input
							type='text'
							value={accountNumber}
							onChange={(e) => setAccountNumber(e.target.value)}
							className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Enter 10-16 digit account number'
							maxLength={16}
						/>
					</div>
				) : withdrawMethod === 'mobile' ? (
					<div>
						<label className='text-gray-300 block mb-2'>
							Mobile Phone Number
						</label>
						<input
							type='tel'
							value={mobileNumber}
							onChange={(e) => setMobileNumber(e.target.value)}
							className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
							placeholder='Enter mobile number with country code'
							maxLength={15}
						/>
					</div>
				) : (
					<div>
						<label className='text-gray-300 block mb-2'>PayPal Email</label>
						<input
							type='email'
							value={paypalEmail}
							onChange={(e) => setPaypalEmail(e.target.value)}
							className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
							placeholder='Enter your PayPal email address'
						/>
					</div>
				)}
			</div>

			{/* Withdrawal Amount Input */}
			<div className='bg-gray-800 p-4 rounded-lg mb-4'>
				<label className='text-gray-300 block mb-2'>Withdrawal Amount</label>
				<input
					type='number'
					value={withdrawalAmount}
					onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
					className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
					placeholder='Enter withdrawal amount'
				/>
			</div>

			{/* Withdraw Button */}
			<button
				onClick={handleWithdraw}
				disabled={isLoading}
				className='w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50'>
				{isLoading ? (
					<>
						<Loader2 className='w-5 h-5 animate-spin mr-2' />
						Processing...
					</>
				) : (
					'Withdraw'
				)}
			</button>

			{/* Notification */}
			{notification.message && (
				<div
					className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
						notification.type === 'success'
							? 'bg-green-600 text-white'
							: 'bg-red-600 text-white'
					}`}>
					{notification.type === 'success' ? (
						<CheckCircle className='w-6 h-6' />
					) : (
						<XCircle className='w-6 h-6' />
					)}
					<span>{notification.message}</span>
				</div>
			)}
		</div>
	);
}

export default WithdrawFunds;
