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

// 		console.log('Received data:', { fileName, fileType, fileContent });

// 		if (!fileName || !fileType || !fileContent) {
// 			return NextResponse.json(
// 				{ error: 'Missing fileName, fileType, or fileContent' },
// 				{ status: 400 }
// 			);
// 		}

// 		const s3Params = {
// 			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
// 			Key: fileName,
// 			Body: Buffer.from(fileContent, 'base64'), // Decode base64 content
// 			ContentType: fileType,
// 		};

// 		const command = new PutObjectCommand(s3Params);
// 		await s3Client.send(command);
// 		console.log('File uploaded successfully');

// 		const cloudFrontUrl = `${process.env.CLOUDFRONT_DOMAIN_NAME}/${fileName}`;
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

// 		console.log('Received data:', { fileName, fileType, fileContent });

// 		if (!fileName || !fileType || !fileContent) {
// 			return NextResponse.json(
// 				{ error: 'Missing fileName, fileType, or fileContent' },
// 				{ status: 400 }
// 			);
// 		}

// 		// URL-encode the file name
// 		const encodedFileName = encodeURIComponent(fileName);

// 		const s3Params = {
// 			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
// 			Key: encodedFileName,
// 			Body: Buffer.from(fileContent, 'base64'), // Decode base64 content
// 			ContentType: fileType,
// 		};

// 		const command = new PutObjectCommand(s3Params);
// 		await s3Client.send(command);
// 		console.log('File uploaded successfully');

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

// 		// Single encoding for the file name
// 		const encodedFileName = encodeURIComponent(fileName);

// 		const s3Params = {
// 			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
// 			Key: encodedFileName, // Use encoded name here for S3
// 			Body: Buffer.from(fileContent, 'base64'), // Decode base64 content
// 			ContentType: fileType,
// 		};

// 		const command = new PutObjectCommand(s3Params);
// 		await s3Client.send(command);

// 		console.log('File uploaded successfully');

// 		// Construct CloudFront URL without re-encoding
// 		const cloudFrontUrl = `${process.env.CLOUDFRONT_DOMAIN_NAME}/${fileName}`;
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

// 		// URL-encode the file name only once
// 		const encodedFileName = encodeURIComponent(fileName);

// 		const s3Params = {
// 			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
// 			Key: encodedFileName,
// 			Body: Buffer.from(fileContent, 'base64'),
// 			ContentType: fileType,
// 		};

// 		const command = new PutObjectCommand(s3Params);
// 		await s3Client.send(command);

// 		console.log('File uploaded successfully');

// 		// Construct CloudFront URL using the encoded file name directly
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
//uploadToS3/route
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
	region: process.env.AWS_REGION || '',
	credentials: {
		accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY || '',
		secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY || '',
	},
});

export const POST = async (req: NextRequest) => {
	try {
		const { fileName, fileType, fileContent } = await req.json();

		if (!fileName || !fileType || !fileContent) {
			return NextResponse.json(
				{ error: 'Missing fileName, fileType, or fileContent' },
				{ status: 400 }
			);
		}

		// Single encoding for the file name
		const encodedFileName = encodeURIComponent(fileName);

		const s3Params = {
			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
			Key: encodedFileName, // Use encoded name here for S3
			Body: Buffer.from(fileContent, 'base64'), // Decode base64 content
			ContentType: fileType,
		};

		const command = new PutObjectCommand(s3Params);
		await s3Client.send(command);

		console.log('File uploaded successfully');

		// Construct CloudFront URL without re-encoding
		const cloudFrontUrl = `${process.env.CLOUDFRONT_DOMAIN_NAME}/${encodedFileName}`;
		return NextResponse.json({ cloudFrontUrl });
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('Error uploading file to S3:', errMessage);
		return NextResponse.json(
			{ error: `Error uploading file to S3: ${errMessage}` },
			{ status: 500 }
		);
	}
};
