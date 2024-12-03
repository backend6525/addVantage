import axios from 'axios';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const getPayPalAccessToken = async (
	clientId = process.env.PAYPAL_CLIENT_ID,
	clientSecret = process.env.PAYPAL_CLIENT_SECRET
) => {
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

const sendPayout = async (recipientEmail, amount, clientId, clientSecret) => {
	try {
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
							value: amount.toString(),
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
	} catch (error) {
		console.error(
			'Error sending payout:',
			error.response?.data || error.message
		);
		throw new Error('Failed to send payout');
	}
};

export { sendPayout };
