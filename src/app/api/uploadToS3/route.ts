import { NextRequest, NextResponse } from "next/server";
import {
	S3Client,
	PutObjectCommand,
	ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
	region: process.env.AWS_REGION || "", // Default to "us-east-1" if undefined
	credentials: {
		accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY || "",
		secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY || "",
	},
});

const generateSignedUrl = async (s3Params: any) => {
	const command = new PutObjectCommand(s3Params);
	return getSignedUrl(s3Client, command, { expiresIn: 180 });
};

export const POST = async (req: NextRequest) => {
	try {
		const { fileName, fileType } = await req.json();

		if (!fileName || !fileType) {
			console.error("Missing fileName or fileType");
			return NextResponse.json(
				{ error: "Missing fileName or fileType" },
				{ status: 400 }
			);
		}

		console.log("Environment variables:");
		console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_IAM_USER_ACCESS_KEY);
		console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_IAM_USER_SECRET_KEY);
		console.log("AWS_REGION:", process.env.AWS_REGION);
		console.log("AWS_BUCKET_NAME:", process.env.NEXT_PUBLIC_AWS_BUCKET_NAME);

		const s3Params = {
			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
			Key: fileName,
			ContentType: fileType,
			ACL: ObjectCannedACL.public_read, // Use the correct enum value
		};

		try {
			let uploadUrl;
			for (let attempt = 1; attempt <= 3; attempt++) {
				try {
					uploadUrl = await generateSignedUrl(s3Params);
					break; // Exit loop if successful
				} catch (error: any) {
					// Type assertion
					console.error(`Attempt ${attempt} failed: ${error.message}`);
					if (attempt === 3) throw error; // Rethrow after final attempt
				}
			}
			console.log("Signed URL generated successfully:", uploadUrl);
			return NextResponse.json({ uploadUrl });
		} catch (error: any) {
			// Type assertion
			console.error("Error creating signed URL:", error);
			return NextResponse.json(
				{ error: `Error creating signed URL: ${error.message}` },
				{ status: 500 }
			);
		}
	} catch (error: any) {
		// Type assertion
		console.error("Error parsing request body:", error);
		return NextResponse.json(
			{ error: `Invalid request body: ${error.message}` },
			{ status: 500 }
		);
	}
};
