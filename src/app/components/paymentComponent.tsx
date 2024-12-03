import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

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
			options={{ clientId: process.env.PAYPAL_CLIENT_ID || '' }}>
			<PayPalButtons
				createOrder={(data, actions) => {
					return actions.order.create({
						intent: 'CAPTURE', // Required intent field
						purchase_units: [
							{
								amount: {
									currency_code: 'USD', // Specify the currency code
									value: amount.toString(), // Ensure the value is a string
								},
							},
						],
					});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then((details) => {
						onSuccess(details); // Trigger the success callback
					});
				}}
				onError={(err) => {
					onError(err); // Trigger the error callback
				}}
			/>
		</PayPalScriptProvider>
	);
};

export default PaymentComponent;
