// import React from 'react';
// import PaymentComponent from '@/app/components/paymentComponent';

// function Page() {
// 	// Example: Define the amount to be paid
// 	const amount = 100; // Replace with the dynamic amount as needed

// 	// Handle successful payment
// 	const handleSuccess = (details: any) => {
// 		console.log('Payment successful!', details);
// 		alert(`Payment successful for $${amount}`);
// 	};

// 	// Handle payment error
// 	const handleError = (error: any) => {
// 		console.error('Payment failed!', error);
// 		alert('Payment failed! Please try again.');
// 	};

// 	return (
// 		<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
// 			<h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Make a Payment</h1>
// 			<PaymentComponent
// 				amount={amount}
// 				onSuccess={handleSuccess}
// 				onError={handleError}
// 			/>
// 		</div>
// 	);
// }

// export default Page;

'use client';

import React, { useState } from 'react';
import PaymentComponent from '@/app/components/paymentComponent';

function Page() {
	// Example: Define the amount to be paid
	const [amount, setAmount] = useState(100); // You can make this dynamic

	// Handle successful payment
	const handleSuccess = (details: any) => {
		console.log('Payment successful!', details);
		alert(`Payment successful for $${amount}`);
	};

	// Handle payment error
	const handleError = (error: any) => {
		console.error('Payment failed!', error);
		alert('Payment failed! Please try again.');
	};

	return (
		<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
			<h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Make a Payment</h1>
			<PaymentComponent
				amount={amount}
				onSuccess={handleSuccess}
				onError={handleError}
			/>
		</div>
	);
}

export default Page;
