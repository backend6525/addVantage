'use client';

import { ReactNode, useEffect } from 'react';
import { KindeProvider, useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import {
	ConvexProvider,
	ConvexReactClient,
	AuthTokenFetcher,
} from 'convex/react';

const convex = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const ConvexKindeProvider = ({ children }: { children: ReactNode }) => {
	const { getAccessToken } = useKindeAuth();

	useEffect(() => {
		const fetchToken: AuthTokenFetcher = async () => {
			try {
				const token = await getAccessToken();
				return token?.toString() || null;
			} catch (error) {
				console.error('Error fetching token:', error);
				return null;
			}
		};

		if (typeof getAccessToken === 'function') {
			convex.setAuth(fetchToken);
		}
	}, [getAccessToken]);

	return (
		<KindeProvider
			domain={process.env.NEXT_PUBLIC_KINDE_DOMAIN as string}
			clientId={process.env.NEXT_PUBLIC_KINDE_CLIENT_ID as string}
			redirectUri={process.env.NEXT_PUBLIC_KINDE_REDIRECT_URI as string}
			audience='convex'>
			<ConvexProvider client={convex}>{children}</ConvexProvider>
		</KindeProvider>
	);
};

export default ConvexKindeProvider;
