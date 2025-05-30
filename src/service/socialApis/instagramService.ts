import axios from 'axios';

export async function fetchInstagramMetrics(accessToken: string) {
	try {
		const response = await axios.get('https://graph.instagram.com/me/media', {
			params: {
				fields: 'id,caption,like_count,comments_count',
				access_token: accessToken,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Instagram metrics:', error);
		throw new Error('Failed to fetch Instagram metrics');
	}
}
