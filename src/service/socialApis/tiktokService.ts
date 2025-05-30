import axios from 'axios';

export async function fetchTikTokMetrics(accessToken: string) {
	try {
		const response = await axios.get(
			'https://open-api.tiktok.com/v2/user/info/',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching TikTok metrics:', error);
		throw new Error('Failed to fetch TikTok metrics');
	}
}
