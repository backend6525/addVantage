import axios from 'axios';

export async function fetchFacebookMetrics(accessToken: string) {
	try {
		const response = await axios.get(
			`https://graph.facebook.com/v12.0/me/insights`,
			{
				params: {
					metric: 'page_fan_adds,page_impressions,page_engaged_users',
					access_token: accessToken,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching Facebook metrics:', error);
		throw new Error('Failed to fetch Facebook metrics');
	}
}
