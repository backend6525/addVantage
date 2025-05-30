const config = {
	providers: [
		{
			domain: 'addvantage.kinde.com',
			applicationID: process.env.KINDE_CLIENT_ID ?? '',
			tokenVerification: {
				issuer: 'https://addvantage.kinde.com',
				audience: '',
				algorithms: ['RS256'],
				jwksUrl: 'https://addvantage.kinde.com/.well-known/jwks.json',
				customClaims: {
					azp: process.env.KINDE_CLIENT_ID ?? '',
				},
			},
		},
	],
} as const;

export default config;
