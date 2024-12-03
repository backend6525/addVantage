import React, { useState } from 'react';
import { Wallet, RefreshCw } from 'lucide-react';

// function Balance() {
// 	return (
// 		<div className="bg-gray-800 text-white p-4 rounded-lg">
// 			<h2 className="text-4xl">0 UGX</h2>
// 			<p className="text-sm">Balance</p>
// 		</div>
// 	);
// }

// export  Balance;

// Simulated components (you'd replace these with actual implementations)
function BalanceDisplay() {
	const [balance, setBalance] = useState(84597.45);

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-3'>
					<Wallet className='text-blue-400' />
					<h3 className='text-lg font-semibold text-gray-300'>Total Balance</h3>
				</div>
				<button className='text-gray-400 hover:text-white'>
					<RefreshCw className='w-5 h-5' />
				</button>
			</div>
			<div className='text-3xl font-bold text-white flex items-center space-x-2'>
				<span>${balance.toLocaleString()}</span>
				<span className='text-green-500 text-sm'>+2.5%</span>
			</div>
			<div className='text-sm text-gray-400'>Previous month: $82,345.12</div>
		</div>
	);
}
export default BalanceDisplay;
