'use client';
import { ReactNode } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexProviderWithAuth0 } from 'convex/react-auth0';
import { Auth0Provider } from '@auth0/auth0-react';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<Auth0Provider
			domain={process.env.AUTH0_ISSUER_BASE_URL!}
			clientId={process.env.AUTH0_CLIENT_ID!}
			authorizationParams={{
				redirect_uri:
					typeof window === 'undefined' ? undefined : window.location.origin,
			}}
			useRefreshTokens={true}
			cacheLocation='localstorage'>
			<ConvexProviderWithAuth0 client={convex}>
				{children}
			</ConvexProviderWithAuth0>
		</Auth0Provider>
	);
}
