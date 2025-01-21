import React, { useState, useEffect, useCallback } from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card/Card';

interface Props {
	basePrice: number;
	onCurrencyChange?: (data: {
		currency: string;
		convertedPrice: number;
	}) => void;
}

// Currency conversion rates (mock data, would typically come from an API)
const CURRENCY_RATES = {
	USD: 1,
	EUR: 0.85,
	GBP: 0.73,
	JPY: 148.5,
	CAD: 1.35,
	AUD: 1.52,
	CNY: 7.23,
};

export const InternationalPaymentSupport = ({
	basePrice,
	onCurrencyChange,
}: Props) => {
	const [selectedCurrency, setSelectedCurrency] = useState('USD');

	const handleCurrencyChange = useCallback(
		(value: string) => {
			setSelectedCurrency(value);
			const convertedPrice = basePrice * (CURRENCY_RATES[value] || 1);
			onCurrencyChange?.({
				currency: value,
				convertedPrice: parseFloat(convertedPrice.toFixed(2)),
			});
		},
		[basePrice, onCurrencyChange]
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>International Payment Options</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					<Select defaultValue='USD' onValueChange={handleCurrencyChange}>
						<SelectTrigger>
							<SelectValue placeholder='Select Currency' />
						</SelectTrigger>
						<SelectContent>
							{Object.keys(CURRENCY_RATES).map((currency) => (
								<SelectItem key={currency} value={currency}>
									{currency}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<div className='text-sm text-gray-400'>
						Converted Price: {selectedCurrency}{' '}
						{(basePrice * (CURRENCY_RATES[selectedCurrency] || 1)).toFixed(2)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default InternationalPaymentSupport;
