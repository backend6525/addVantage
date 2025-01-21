// import { NextResponse } from 'next/server';
// import { Redis } from '@upstash/redis';
// import { headers } from 'next/headers';

// const redis = new Redis({
// 	url: process.env.UPSTASH_REDIS_REST_URL!,
// 	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });

// interface RateLimitConfig {
// 	maxRequests: number; // Maximum requests allowed
// 	windowMs: number; // Time window in milliseconds
// }

// export async function rateLimit(
// 	request: Request,
// 	config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 } // Default: 10 requests per minute
// ) {
// 	try {
// 		const headersList = headers();
// 		const ip = headersList.get('x-forwarded-for') || 'anonymous';
// 		const key = `rate-limit:${ip}`;

// 		// Get the current requests count
// 		const requests = (await redis.get<number>(key)) || 0;

// 		if (requests >= config.maxRequests) {
// 			return NextResponse.json(
// 				{ error: 'Too many requests, please try again later.' },
// 				{ status: 429 }
// 			);
// 		}

// 		// Increment requests count
// 		if (requests === 0) {
// 			// First request, set expiry
// 			await redis.set(key, 1, { px: config.windowMs });
// 		} else {
// 			await redis.incr(key);
// 		}

// 		return null; // Continue with the request
// 	} catch (error) {
// 		console.error('Rate limit error:', error);
// 		return null; // Continue on error
// 	}
// }

import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

// Create Redis client
const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Enhanced rate limit configuration
export interface RateLimitConfig {
	identifier?: (request: Request) => Promise<string> | string;
	maxRequests: number;
	windowMs: number;
	blockDurationMs?: number;
}

// Default configuration
const DEFAULT_CONFIG: RateLimitConfig = {
	maxRequests: 10,
	windowMs: 60000, // 1 minute
	blockDurationMs: 300000, // 5 minutes block after exceeding limit
};

// Enhanced rate limiting function
export async function advancedRateLimit(
	request: Request,
	config: Partial<RateLimitConfig> = {}
): Promise<NextResponse | null> {
	const mergedConfig: RateLimitConfig = { ...DEFAULT_CONFIG, ...config };

	try {
		// Determine unique identifier
		const headersList = headers();
		const defaultIdentifier = headersList.get('x-forwarded-for') || 'anonymous';
		const identifierFn = mergedConfig.identifier || (() => defaultIdentifier);
		const identifier = await (typeof identifierFn === 'function'
			? identifierFn(request)
			: identifierFn);

		// Construct redis keys
		const requestKey = `rate-limit:requests:${identifier}`;
		const blockKey = `rate-limit:block:${identifier}`;

		// Check if currently blocked
		const isBlocked = await redis.exists(blockKey);
		if (isBlocked) {
			const blockTimeRemaining = await redis.ttl(blockKey);
			return NextResponse.json(
				{
					error: 'Too many requests. Please try again later.',
					retryAfter: blockTimeRemaining,
					blockDuration: mergedConfig.blockDurationMs,
				},
				{
					status: 429,
					headers: {
						'Retry-After': blockTimeRemaining.toString(),
					},
				}
			);
		}

		// Get current request count
		const currentRequests = (await redis.get<number>(requestKey)) || 0;

		// Check if max requests exceeded
		if (currentRequests >= mergedConfig.maxRequests) {
			// Block the identifier
			await redis.set(blockKey, '1', {
				ex: Math.floor(mergedConfig.blockDurationMs! / 1000),
			});

			return NextResponse.json(
				{
					error: 'Rate limit exceeded. Try again later.',
					retryAfter: Math.floor(mergedConfig.blockDurationMs! / 1000),
					blockDuration: mergedConfig.blockDurationMs,
				},
				{
					status: 429,
					headers: {
						'Retry-After': Math.floor(
							mergedConfig.blockDurationMs! / 1000
						).toString(),
					},
				}
			);
		}

		// Increment request count
		await redis
			.multi()
			.incr(requestKey)
			.expire(requestKey, Math.floor(mergedConfig.windowMs / 1000))
			.exec();

		return null; // Allow the request
	} catch (error) {
		console.error('Advanced rate limit error:', error);
		return null; // Default to allowing the request on error
	}
}

// Helper function to create route-specific rate limiters
export function createRateLimiter(config: Partial<RateLimitConfig>) {
	return (request: Request) => advancedRateLimit(request, config);
}
