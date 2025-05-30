import { NextRequest, NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
	region: process.env.AWS_REGION || '',
	credentials: {
		accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY || '',
		secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY || '',
	},
});

export const DELETE = async (req: NextRequest) => {
	try {
		const { fileName } = await req.json();
		console.log('Attempting to delete file from S3:', fileName);

		if (!fileName) {
			console.error('Missing fileName in request');
			return NextResponse.json({ error: 'Missing fileName' }, { status: 400 });
		}

		// Extract the file name from the URL if it's a full URL
		const fileKey = fileName.includes('/')
			? fileName.split('/').pop()
			: fileName;

		if (!fileKey) {
			console.error('Could not extract file key from:', fileName);
			return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
		}

		console.log('Extracted file key for S3 deletion:', fileKey);

		const s3Params = {
			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
			Key: fileKey,
		};

		console.log('S3 deletion parameters:', {
			bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
			key: fileKey,
		});

		const command = new DeleteObjectCommand(s3Params);
		await s3Client.send(command);

		console.log('Successfully deleted file from S3:', fileKey);
		return NextResponse.json({ success: true });
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : 'Unknown error';
		const requestBody = await req.json();
		console.error('Error deleting file from S3:', {
			error: errMessage,
			fileName: requestBody.fileName,
			timestamp: new Date().toISOString(),
		});
		return NextResponse.json(
			{ error: `Error deleting file from S3: ${errMessage}` },
			{ status: 500 }
		);
	}
};
