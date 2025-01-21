import React, { useState } from 'react';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/checkbox';

// Validation Schemas
const billingInfoSchema = z.object({
	firstName: z.string().min(2, 'First name is required'),
	lastName: z.string().min(2, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
	billingAddress: z.object({
		street: z.string().min(3, 'Street address is required'),
		city: z.string().min(2, 'City is required'),
		state: z.string().min(2, 'State is required'),
		postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code'),
		country: z.string().min(2, 'Country is required'),
	}),
	termsAccepted: z
		.boolean()
		.refine((val) => val, 'You must accept terms and conditions'),
});

// Payment Method Specific Schemas
const cardPaymentSchema = z.object({
	cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
	expiryDate: z
		.string()
		.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date'),
	cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
});

const paypalSchema = z.object({
	paypalEmail: z.string().email('Invalid PayPal email'),
});

const cryptoSchema = z.object({
	cryptoAddress: z.string().min(26, 'Invalid crypto wallet address'),
});

const PaymentDetailsForm = ({ paymentMethod, selectedPlan, onSubmit }) => {
	const [isProcessing, setIsProcessing] = useState(false);

	// Combine schemas based on payment method
	const getValidationSchema = () => {
		const baseSchema = billingInfoSchema;
		switch (paymentMethod) {
			case 'card':
				return baseSchema.merge(cardPaymentSchema);
			case 'paypal':
				return baseSchema.merge(paypalSchema);
			case 'crypto':
				return baseSchema.merge(cryptoSchema);
			default:
				return baseSchema;
		}
	};

	const form = useForm({
		resolver: zodResolver(getValidationSchema()),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			billingAddress: {
				street: '',
				city: '',
				state: '',
				postalCode: '',
				country: '',
			},
			termsAccepted: false,
			// Conditional fields based on payment method
			...(paymentMethod === 'card'
				? {
						cardNumber: '',
						expiryDate: '',
						cvv: '',
					}
				: {}),
			...(paymentMethod === 'paypal'
				? {
						paypalEmail: '',
					}
				: {}),
			...(paymentMethod === 'crypto'
				? {
						cryptoAddress: '',
					}
				: {}),
		},
	});

	const handleSubmit = async (data) => {
		setIsProcessing(true);
		try {
			await onSubmit(data);
		} catch (error) {
			// Handle submission errors
			console.error('Submission error', error);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				{/* Personal Information Section */}
				<div className='grid md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder='John' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder='Doe' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Contact Information */}
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='john.doe@example.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Payment Method Specific Fields */}
				{paymentMethod === 'card' && (
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='cardNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Card Number</FormLabel>
									<FormControl>
										<Input placeholder='1234 5678 9012 3456' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Add more card-specific fields */}
					</div>
				)}

				{paymentMethod === 'paypal' && (
					<FormField
						control={form.control}
						name='paypalEmail'
						render={({ field }) => (
							<FormItem>
								<FormLabel>PayPal Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='paypal@example.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{paymentMethod === 'crypto' && (
					<FormField
						control={form.control}
						name='cryptoAddress'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Crypto Wallet Address</FormLabel>
								<FormControl>
									<Input placeholder='0x1234...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Terms and Conditions */}
				<FormField
					control={form.control}
					name='termsAccepted'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>
								I accept the Terms of Service and Privacy Policy
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button type='submit' disabled={isProcessing} className='w-full'>
					{isProcessing ? 'Processing...' : 'Complete Purchase'}
				</Button>
			</form>
		</Form>
	);
};

export default PaymentDetailsForm;
