import axios from 'axios';

export async function fetchTwitterMetrics(accessToken: string) {
	try {
		const response = await axios.get('https://api.twitter.com/2/users/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Twitter metrics:', error);
		throw new Error('Failed to fetch Twitter metrics');
	}
}
