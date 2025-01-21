import React from 'react';
import { format } from 'date-fns';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Download } from 'lucide-react';

const TaxAndInvoiceCalculator = ({ plan, billingCycle, paymentMethod }) => {
	const calculateTax = (basePrice) => {
		// Simplified tax calculation (this would typically come from a backend)
		const taxRates = {
			US: 0.08, // 8% tax rate
			CA: 0.13, // 13% tax rate
			EU: 0.2, // 20% VAT
		};

		// Default to US tax rate
		const taxRate = taxRates['US'];
		const taxAmount = basePrice * taxRate;

		return {
			basePrice,
			taxRate: taxRate * 100,
			taxAmount,
			totalPrice: basePrice + taxAmount,
		};
	};

	const generateInvoicePDF = () => {
		// In a real app, this would call a backend service to generate a PDF
		alert('Invoice PDF generation would happen here');
	};

	const taxCalculation = calculateTax(plan.price);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Invoice and Tax Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<p className='text-sm text-gray-500'>Plan</p>
							<p>{plan.name}</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Billing Cycle</p>
							<p className='capitalize'>{billingCycle}</p>
						</div>
					</div>

					<div className='border-t pt-4'>
						<div className='flex justify-between'>
							<span>Base Price</span>
							<span>${taxCalculation.basePrice.toFixed(2)}</span>
						</div>
						<div className='flex justify-between'>
							<span>Tax Rate</span>
							<span>{taxCalculation.taxRate}%</span>
						</div>
						<div className='flex justify-between'>
							<span>Tax Amount</span>
							<span>${taxCalculation.taxAmount.toFixed(2)}</span>
						</div>
						<div className='flex justify-between font-bold mt-2'>
							<span>Total Price</span>
							<span>${taxCalculation.totalPrice.toFixed(2)}</span>
						</div>
					</div>

					<div className='mt-4'>
						<Button
							onClick={generateInvoicePDF}
							className='w-full'
							variant='outline'>
							<Download className='mr-2 h-4 w-4' />
							Download Invoice
						</Button>
					</div>

					<div className='text-xs text-gray-500 mt-2'>
						Invoice Date: {format(new Date(), 'PPP')}
						<br />
						Payment Method: {paymentMethod}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TaxAndInvoiceCalculator;
