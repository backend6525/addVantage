// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// // Use async function to define the GET handler
// export async function GET() {
// 	try {
// 		const session = await getKindeServerSession();

// 		// Call the getAccessToken function to retrieve the token
// 		const kindeAuthToken = await session?.getAccessToken();

// 		// Log the actual token for debugging purposes
// 		console.log("Kinde Auth Token:", kindeAuthToken);

// 		if (!kindeAuthToken) {
// 			return NextResponse.json(
// 				{ error: "Failed to retrieve Kinde auth token" },
// 				{ status: 401 }
// 			);
// 		}
// 		//const kindeDecoded = jwt.decode(kindeAuthToken);
// 		// Return the token in the JSON response
// 		console.log("Kinde Auth Token:", kindeAuthToken);
// 		return NextResponse.json({ token: kindeAuthToken });
// 	} catch (error) {
// 		console.error("Error retrieving Kinde auth token:", error);
// 		return NextResponse.json(
// 			{ error: "Internal Server Error" },
// 			{ status: 500 }
// 		);
// 	}
// }

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// // Secret key for signing the new JWT for Supabase (set in your environment)
// const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY as string;

// // Use async function to define the GET handler
// export async function GET() {
// 	try {
// 		// Fetch the Kinde session and token
// 		const session = await getKindeServerSession();
// 		const kindeAuthToken: any = await session?.getAccessToken();

// 		console.log("Kinde Auth Token:", kindeAuthToken);

// 		if (!kindeAuthToken) {
// 			return NextResponse.json(
// 				{ error: "Failed to retrieve Kinde auth token" },
// 				{ status: 401 }
// 			);
// 		}

// 		// Decode the Kinde Auth token to inspect its claims
// 		const kindeDecoded = jwt.decode(kindeAuthToken);

// 		if (!kindeDecoded || typeof kindeDecoded === "string") {
// 			return NextResponse.json(
// 				{ error: "Failed to decode Kinde auth token" },
// 				{ status: 400 }
// 			);
// 		}

// 		// Check for necessary claims (aud and sub)
// 		if (!kindeDecoded.sub || !kindeDecoded.aud) {
// 			console.error("Kinde token is missing 'sub' or 'aud' claims.");
// 			return NextResponse.json(
// 				{ error: "Kinde token missing 'sub' or 'aud'" },
// 				{ status: 400 }
// 			);
// 		}

// 		// Re-sign the token to add the required claims for Supabase
// 		const supabaseJwt = jwt.sign(
// 			{
// 				sub: kindeDecoded.sub, // Use the subject from the Kinde token
// 				aud: "authenticated", // Supabase expects 'authenticated'
// 				role: "authenticated", // Adding role (can be customized)
// 				iss: kindeDecoded.iss, // Set to your domain or issuer
// 				exp: Math.floor(Date.now() / 1000) + 60 * 20, // 15 min expiration
// 			},
// 			SUPABASE_SECRET_KEY, // Supabase secret for signing
// 			{ algorithm: "HS256" } // Ensure HS256 signing algorithm
// 		);

// 		console.log("Supabase JWT:", supabaseJwt);

// 		// Return the re-signed Supabase JWT in the response
// 		return NextResponse.json({ token: supabaseJwt });
// 	} catch (error) {
// 		console.error("Error retrieving or signing the Kinde token:", error);
// 		return NextResponse.json(
// 			{ error: "Internal Server Error" },
// 			{ status: 500 }
// 		);
// 	}
// }

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// // Ensure the Supabase secret key is defined
// const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY as string;
// if (!SUPABASE_SECRET_KEY) {
// 	throw new Error("Supabase secret key is missing.");
// }

// // Type definition for decoded Kinde token claims
// interface KindeTokenClaims {
// 	sub: string;
// 	aud: string[];
// 	iss: string;
// 	exp: number;
// }

// export async function GET() {
// 	try {
// 		// Fetch the Kinde session and token
// 		const session = await getKindeServerSession();
// 		const kindeAuthToken: any = await session?.getAccessToken();

// 		if (!kindeAuthToken) {
// 			return NextResponse.json(
// 				{ error: "Failed to retrieve Kinde auth token" },
// 				{ status: 401 } // Unauthorized error code
// 			);
// 		}

// 		// Decode the Kinde Auth token
// 		const kindeDecoded = jwt.decode(kindeAuthToken) as KindeTokenClaims | null;

// 		if (!kindeDecoded || typeof kindeDecoded !== "object") {
// 			return NextResponse.json(
// 				{ error: "Failed to decode Kinde auth token" },
// 				{ status: 400 } // Bad request error code
// 			);
// 		}

// 		// Check for necessary claims (aud and sub)
// 		if (!kindeDecoded.sub || !kindeDecoded.aud.length) {
// 			console.error("Kinde token is missing 'sub' or 'aud' claims.");
// 			return NextResponse.json(
// 				{ error: "Kinde token missing 'sub' or 'aud'" },
// 				{ status: 400 }
// 			);
// 		}

// 		// Set the expiration time to be based on Kinde token expiration if possible, otherwise default to 20 minutes
// 		const expiration = kindeDecoded.exp
// 			? kindeDecoded.exp
// 			: Math.floor(Date.now() / 1000) + 60 * 20; // Default 20 min expiration

// 		// Re-sign the token with required claims for Supabase
// 		const supabaseJwt = jwt.sign(
// 			{
// 				sub: kindeDecoded.sub, // Subject from Kinde token
// 				aud: "authenticated", // Supabase expects 'authenticated'
// 				role: "authenticated", // Role
// 				iss: kindeDecoded.iss, // Issuer from Kinde token
// 				exp: expiration, // Expiration time
// 			},
// 			SUPABASE_SECRET_KEY, // Use Supabase secret key to sign
// 			{ algorithm: "HS256" } // Symmetric signing algorithm (consider RS256 for production)
// 		);

// 		console.log("Supabase JWT created successfully.");

// 		// Return the re-signed Supabase JWT in the response
// 		return NextResponse.json({ token: supabaseJwt });
// 	} catch (error) {
// 		console.error("Error handling the Kinde token:", error);

// 		// Return 500 Internal Server Error for general issues
// 		return NextResponse.json(
// 			{ error: "Internal Server Error", details: error.message },
// 			{ status: 500 }
// 		);
// 	}
// }

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// //KINDE_CLIENT_SECRET
// // Ensure the Supabase secret key is defined
// const SUPABASE_SECRET_KEY = process.env.KINDE_CLIENT_SECRET as string;
// if (!SUPABASE_SECRET_KEY) {
// 	throw new Error("Supabase secret key is missing.");
// }

// // Type definition for decoded Kinde token claims
// interface KindeTokenClaims {
// 	sub: string;
// 	aud: string[];
// 	iss: string;
// 	exp: number;
// }

// export async function GET() {
// 	try {
// 		// Fetch the Kinde session and token
// 		const session = await getKindeServerSession();
// 		const kindeAuthToken: any = await session?.getAccessTokenRaw();

// 		if (!kindeAuthToken) {
// 			return NextResponse.json(
// 				{ error: "Failed to retrieve Kinde auth token" },
// 				{ status: 401 } // Unauthorized error code
// 			);
// 		}

// 		// Decode the Kinde Auth token
// 		const kindeDecoded = jwt.decode(kindeAuthToken) as KindeTokenClaims | null;
// 		console.log("The Decorded Token", kindeDecoded);

// 		if (!kindeDecoded || typeof kindeDecoded !== "object") {
// 			return NextResponse.json(
// 				{ error: "Failed to decode Kinde auth token" },
// 				{ status: 400 } // Bad request error code
// 			);
// 		}

// 		// Set the expiration time to be based on Kinde token expiration if possible, otherwise default to 20 minutes

// 		const expiration = kindeDecoded.exp
// 			? kindeDecoded.exp
// 			: Math.floor(Date.now() / 1000) + 60 * 20; // Default 20 min expiration

// 		// Re-sign the token with required claims for Supabase
// 		const supabaseJwt = jwt.sign(
// 			{
// 				sub: kindeDecoded.sub, // Subject from Kinde token
// 				aud: "authenticated", // Supabase expects 'authenticated'
// 				role: "authenticated", // Role
// 				iss: kindeDecoded.iss, // Issuer from Kinde token
// 				exp: expiration, // Expiration time
// 			},
// 			SUPABASE_SECRET_KEY, // Use Supabase secret key to sign
// 			{ algorithm: "HS256" } // Symmetric signing algorithm (consider RS256 for production)
// 		);

// 		console.log("Supabase JWT created successfully.", jwt.decode(supabaseJwt));

// 		// Return the re-signed Supabase JWT in the response
// 		return NextResponse.json({ token: supabaseJwt });
// 	} catch (error) {
// 		// Use type narrowing to handle the 'unknown' error type
// 		if (error instanceof Error) {
// 			console.error("Error handling the Kinde token:", error.message);
// 			return NextResponse.json(
// 				{ error: "Internal Server Error", details: error.message },
// 				{ status: 500 }
// 			);
// 		} else {
// 			console.error("Unexpected error:", error);
// 			return NextResponse.json(
// 				{ error: "Internal Server Error" },
// 				{ status: 500 }
// 			);
// 		}
// 	}
// }
