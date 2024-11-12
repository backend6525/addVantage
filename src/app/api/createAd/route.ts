// import { NextApiRequest, NextApiResponse } from 'next';
// import convex from '@/lib/convex/convexClient';
// import { api } from '../../../../convex/_generated/api';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	if (req.method === 'POST') {
// 		const {
// 			adName,
// 			teamId,
// 			createdBy,
// 			type,
// 			costPerView,
// 			numberOfDaysRunning,
// 			adResourceUrl,
// 		} = req.body;

// 		try {
// 			// Call the mutation directly with the arguments
// 			const result = await convex.mutation(api.ads.createAd, {
// 				adName,
// 				teamId,
// 				createdBy,
// 				type,
// 				costPerView,
// 				numberOfDaysRunning,
// 				adResourceUrl,
// 			});

// 			res.status(200).json(result);
// 		} catch (error) {
// 			console.error('Error creating ad:', error);
// 			res.status(500).json({ error: 'Failed to create ad' });
// 		}
// 	} else {
// 		res.setHeader('Allow', ['POST']);
// 		res.status(405).end(`Method ${req.method} Not Allowed`);
// 	}
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// const s3Client = new S3Client({
// 	region: process.env.AWS_REGION || '',
// 	credentials: {
// 		accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY || '',
// 		secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY || '',
// 	},
// });

// export const POST = async (req: NextRequest) => {
// 	try {
// 		const { fileName, fileType, fileContent } = await req.json();

// 		if (!fileName || !fileType || !fileContent) {
// 			return NextResponse.json(
// 				{ error: 'Missing fileName, fileType, or fileContent' },
// 				{ status: 400 }
// 			);
// 		}

// 		const encodedFileName = encodeURIComponent(fileName);

// 		const s3Params = {
// 			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
// 			Key: encodedFileName,
// 			Body: Buffer.from(fileContent, 'base64'),
// 			ContentType: fileType,
// 		};

// 		const command = new PutObjectCommand(s3Params);
// 		await s3Client.send(command);

// 		const cloudFrontUrl = `${process.env.CLOUDFRONT_DOMAIN_NAME}/${encodedFileName}`;
// 		return NextResponse.json({ cloudFrontUrl });
// 	} catch (error) {
// 		const errMessage = error instanceof Error ? error.message : 'Unknown error';
// 		console.error('Error uploading file to S3:', errMessage);
// 		return NextResponse.json(
// 			{ error: `Error uploading file to S3: ${errMessage}` },
// 			{ status: 500 }
// 		);
// 	}
// };

// // createAd/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// const s3Client = new S3Client({
// 	region: process.env.AWS_REGION || '',
// 	credentials: {
// 		accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY || '',
// 		secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY || '',
// 	},
// });

// export const POST = async (req: NextRequest) => {
// 	try {
// 		const { fileName, fileType, fileContent } = await req.json();

// 		// Log parsed data for verification
// 		console.log('Received payload:', { fileName, fileType, fileContent });

// 		if (!fileName || !fileType || !fileContent) {
// 			return NextResponse.json(
// 				{ error: 'Missing fileName, fileType, or fileContent' },
// 				{ status: 400 }
// 			);
// 		}

// 		const encodedFileName = encodeURIComponent(fileName);

// 		const s3Params = {
// 			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
// 			Key: encodedFileName,
// 			Body: Buffer.from(fileContent, 'base64'),
// 			ContentType: fileType,
// 		};

// 		const command = new PutObjectCommand(s3Params);
// 		await s3Client.send(command);

// 		const cloudFrontUrl = `${process.env.CLOUDFRONT_DOMAIN_NAME}/${encodedFileName}`;
// 		return NextResponse.json({ cloudFrontUrl });
// 	} catch (error) {
// 		const errMessage = error instanceof Error ? error.message : 'Unknown error';
// 		console.error('Error uploading file to S3:', errMessage);
// 		return NextResponse.json(
// 			{ error: `Error uploading file to S3: ${errMessage}` },
// 			{ status: 500 }
// 		);
// 	}
// };

// import { NextRequest, NextResponse } from 'next/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';

// const convexClient = new ConvexHttpClient(process.env.CONVEX_URL || '');

// export const POST = async (req: NextRequest) => {
// 	try {
// 		const {
// 			adName,
// 			teamId,
// 			createdBy,
// 			type,
// 			costPerView,
// 			numberOfDaysRunning,
// 			fileUrl,
// 		} = await req.json();

// 		// Log parsed data for verification
// 		console.log('Received payload:', {
// 			adName,
// 			teamId,
// 			createdBy,
// 			type,
// 			costPerView,
// 			numberOfDaysRunning,
// 			fileUrl,
// 		});

// 		if (
// 			!adName ||
// 			!teamId ||
// 			!createdBy ||
// 			!type ||
// 			!costPerView ||
// 			!numberOfDaysRunning
// 		) {
// 			return NextResponse.json(
// 				{ error: 'Missing required fields' },
// 				{ status: 400 }
// 			);
// 		}

// 		const payload = {
// 			adName,
// 			teamId,
// 			createdBy,
// 			type,
// 			costPerView,
// 			numberOfDaysRunning,
// 			adResourceUrl: fileUrl || '',
// 		};

// 		// Call the Convex mutation
// 		const response = await convexClient.mutation(api.createAd, payload);

// 		return NextResponse.json(response);
// 	} catch (error) {
// 		const errMessage = error instanceof Error ? error.message : 'Unknown error';
// 		console.error('Error creating ad in Convex:', errMessage);
// 		return NextResponse.json(
// 			{ error: `Error creating ad in Convex: ${errMessage}` },
// 			{ status: 500 }
// 		);
// 	}
// };

import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
//import convex from '@/lib/convex/convexClient';

const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);
export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();

		console.log('Received payload:', body);
		const {
			adName,
			teamId,
			createdBy,
			type,
			costPerView,
			numberOfDaysRunning,
			adResourceUrl,
		} = body;

		if (
			!adName ||
			!teamId ||
			!createdBy ||
			!type ||
			!costPerView ||
			!numberOfDaysRunning ||
			!adResourceUrl
		) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		const payload = body;

		// Corrected API path
		const response = await convexClient.mutation(api.ads.createAds, payload);
		console.log('Response from Convex mutation:', response);

		return NextResponse.json(response);
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('Error creating ad in Convex:', errMessage);
		return NextResponse.json(
			{ error: `Error creating ad in Convex: ${errMessage}` },
			{ status: 500 }
		);
	}
};
