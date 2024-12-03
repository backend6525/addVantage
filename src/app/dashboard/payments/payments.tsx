'use client';

import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Table, Input, Button, Modal, message, DatePicker, Spin } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { useRouter } from 'next/navigation';
import moment, { Moment } from 'moment';
import { Dayjs } from 'dayjs';
import axios from 'axios';

// Type definitions for payment record
interface PaymentRecord {
	id: string;
	user: string;
	amount: number;
	date: string;
	status: string;
}

// Type definitions for payment metrics
interface PaymentMetrics {
	totalPayout: number;
	pending: number;
	successful: number;
}

// PayPal Payment ComponentPAYPAL_CLIENT_ID
const PaymentComponent = ({
	amount,
	onSuccess,
	onError,
}: {
	amount: number;
	onSuccess: (details: any) => void;
	onError: (error: any) => void;
}) => {
	return (
		<PayPalScriptProvider
			options={{
				clientId: process.env.PAYPAL_CLIENT_ID || '',
				intent: 'capture',
				currency: 'USD',
			}}>
			<PayPalButtons
				createOrder={(data, actions) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								amount: {
									currency_code: 'USD',
									value: amount.toString(),
								},
							},
						],
					});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then((details) => {
						onSuccess(details);
					});
				}}
				onError={(err) => {
					onError(err);
				}}
			/>
		</PayPalScriptProvider>
	);
};

// Full Payments Page Component
const PaymentsPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
	const [filteredHistory, setFilteredHistory] = useState<PaymentRecord[]>([]);
	const [metrics, setMetrics] = useState<PaymentMetrics>({
		totalPayout: 0,
		pending: 0,
		successful: 0,
	});
	const [auditLog, setAuditLog] = useState<string[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(
		null
	);
	const { RangePicker } = DatePicker;

	// Date conversion utility
	const convertToMoment = (date: Dayjs | null): Moment | null => {
		return date ? moment(date.toDate()) : null;
	};

	// Fetch user role and validate access
	// useEffect(() => {
	// 	const checkAuthorization = async () => {
	// 		try {
	// 			const { data } = await axios.get('/api/auth/user');
	// 			if (data.role === 'admin' || data.role === 'staff') {
	// 				setIsAuthorized(true);
	// 			} else {
	// 				router.push('/403');
	// 			}
	// 		} catch (error) {
	// 			console.error('Authorization check failed:', error);
	// 			router.push('/login');
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};
	// 	checkAuthorization();
	// }, [router]);

	useEffect(() => {
		const checkAuthorization = async () => {
			try {
				// Fetch user information from the API
				const { data } = await axios.get('/api/auth/user');

				// Validate user role
				if (data.role === 'admin' || data.role === 'staff') {
					setIsAuthorized(true);
				} else {
					router.push('/403'); // Redirect to forbidden page
				}
			} catch (error) {
				console.error('Authorization check failed:', error);
				router.push('/login'); // Redirect to login page
			} finally {
				setIsLoading(false);
			}
		};
		checkAuthorization();
	}, [router]);

	// Fetch initial data (payment metrics and history)
	useEffect(() => {
		if (!isAuthorized) return;

		const fetchData = async () => {
			try {
				const [metricsRes, historyRes] = await Promise.all([
					axios.get('/api/payments/metrics'),
					axios.get('/api/payments/history'),
				]);
				setMetrics(metricsRes.data);
				setPaymentHistory(historyRes.data);
				setFilteredHistory(historyRes.data);
				setAuditLog((prev) => [
					...prev,
					`Loaded payment history and metrics on ${new Date().toLocaleString()}.`,
				]);
			} catch (error) {
				message.error('Failed to fetch payment data!');
				console.error(error);
			}
		};

		fetchData();
	}, [isAuthorized]);

	// Retry payment
	const handleRetryPayment = (payment: PaymentRecord) => {
		setSelectedPayment(payment);
		setIsModalVisible(true);
	};

	// Date range filter
	const handleDateFilter: RangePickerProps['onChange'] = (
		dates,
		dateStrings
	) => {
		if (!dates) {
			setFilteredHistory(paymentHistory);
			return;
		}

		// Safely convert Dayjs to Moment
		const [startDate, endDate] = dates.map(convertToMoment);

		if (!startDate || !endDate) return;

		setFilteredHistory(
			paymentHistory.filter((record) =>
				moment(record.date).isBetween(startDate, endDate, 'days', '[]')
			)
		);

		setAuditLog((prev) => [
			...prev,
			`Filtered payments between ${dateStrings[0]} and ${dateStrings[1]}.`,
		]);
	};

	// Search filter
	const handleSearchFilter = (value: string) => {
		setFilteredHistory(
			paymentHistory.filter((record) =>
				record.user.toLowerCase().includes(value.toLowerCase())
			)
		);
	};

	if (isLoading) return <Spin size='large' style={{ marginTop: '20%' }} />;

	if (!isAuthorized) return null;

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-6'>Payments Dashboard</h1>

			{/* Metrics */}
			<div className='grid grid-cols-3 gap-4 mb-6'>
				<div className='bg-gray-100 p-4 rounded'>
					<h3 className='text-lg'>Total Payout</h3>
					<p className='text-xl font-semibold'>
						${metrics.totalPayout.toLocaleString()}
					</p>
				</div>
				<div className='bg-gray-100 p-4 rounded'>
					<h3 className='text-lg'>Pending Payments</h3>
					<p className='text-xl font-semibold'>{metrics.pending}</p>
				</div>
				<div className='bg-gray-100 p-4 rounded'>
					<h3 className='text-lg'>Successful Payments</h3>
					<p className='text-xl font-semibold'>{metrics.successful}</p>
				</div>
			</div>

			{/* Search & Filter */}
			<div className='flex justify-between mb-6'>
				<Input.Search
					placeholder='Search user or payment'
					onSearch={handleSearchFilter}
					style={{ width: '300px' }}
				/>
				<RangePicker onChange={handleDateFilter} />
			</div>

			{/* Payment History Table */}
			<Table
				dataSource={filteredHistory}
				columns={[
					{
						title: 'User',
						dataIndex: 'user',
						key: 'user',
						sorter: (a, b) => a.user.localeCompare(b.user),
					},
					{
						title: 'Amount ($)',
						dataIndex: 'amount',
						key: 'amount',
						sorter: (a, b) => a.amount - b.amount,
						render: (amount) => `$${amount.toLocaleString()}`,
					},
					{
						title: 'Date',
						dataIndex: 'date',
						key: 'date',
						sorter: (a, b) => moment(a.date).diff(moment(b.date)),
					},
					{
						title: 'Status',
						dataIndex: 'status',
						key: 'status',
						filters: [
							{ text: 'Successful', value: 'Successful' },
							{ text: 'Pending', value: 'Pending' },
						],
						onFilter: (value, record) => record.status === value,
					},
					{
						title: 'Actions',
						key: 'actions',
						render: (_, record) => (
							<Button
								type='link'
								disabled={record.status === 'Successful'}
								onClick={() => handleRetryPayment(record)}>
								Retry
							</Button>
						),
					},
				]}
				rowKey='id'
			/>

			{/* Payment Modal */}
			<Modal
				title='Retry Payment'
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}>
				{selectedPayment && (
					<>
						<p>Retry payment for {selectedPayment.user}?</p>
						<PaymentComponent
							amount={selectedPayment.amount}
							onSuccess={(details) => {
								message.success('Payment successful!');
								setIsModalVisible(false);
								// Optionally, you might want to refresh payment history here
							}}
							onError={(error) => {
								message.error('Payment failed!');
								setIsModalVisible(false);
							}}
						/>
					</>
				)}
			</Modal>

			{/* Audit Log */}
			<div className='mt-6'>
				<h2 className='text-xl font-semibold mb-4'>Audit Log</h2>
				<ul className='bg-gray-50 p-4 rounded'>
					{auditLog.map((log, index) => (
						<li key={index} className='mb-2'>
							{log}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PaymentsPage;
