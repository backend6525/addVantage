// src/lib/aws/s3Client.ts
import AWS from "aws-sdk";

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY,
	secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY,
	// region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const uploadFileToS3 = async (file: File, folder: string) => {
	const fileName = `${folder}/${file.name}`;
	const params = {
		Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
		Key: fileName,
		Body: file,
		ACL: "public-read", // Allows public access to the file
		ContentType: file.type, // Ensure the file is served correctly
	};

	try {
		const data = await s3.upload(params).promise();
		return data.Location; // Return the public URL of the uploaded file
	} catch (error) {
		console.error("Error uploading file to S3:", error);
		throw error;
	}
};
