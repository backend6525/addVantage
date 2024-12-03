import axios from 'axios';

const getPayPalAccessToken = async (
	clientId: string,
	clientSecret: string
): Promise<string> => {
	const response = await axios.post(
		'https://api-m.sandbox.paypal.com/v1/oauth2/token',
		new URLSearchParams({ grant_type: 'client_credentials' }),
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			auth: {
				username: clientId,
				password: clientSecret,
			},
		}
	);

	return response.data.access_token;
};

const sendPayout = async (
	recipientEmail: string,
	amount: number,
	clientId: string,
	clientSecret: string
): Promise<any> => {
	// Get Access Token
	const accessToken = await getPayPalAccessToken(clientId, clientSecret);

	// Send Payout Request
	const response = await axios.post(
		'https://api-m.sandbox.paypal.com/v1/payments/payouts',
		{
			sender_batch_header: {
				sender_batch_id: `batch_${Date.now()}`,
				email_subject: 'You have a payout!',
			},
			items: [
				{
					recipient_type: 'EMAIL',
					amount: {
						value: amount.toFixed(2), // Ensure 2 decimal points
						currency: 'USD',
					},
					receiver: recipientEmail,
					note: 'Thanks for your participation!',
				},
			],
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	return response.data;
};

export { getPayPalAccessToken, sendPayout };
