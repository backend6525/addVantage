import axios from 'axios';

export async function fetchLinkedInMetrics(accessToken: string) {
	try {
		const response = await axios.get('https://api.linkedin.com/v2/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching LinkedIn metrics:', error);
		throw new Error('Failed to fetch LinkedIn metrics');
	}
}
