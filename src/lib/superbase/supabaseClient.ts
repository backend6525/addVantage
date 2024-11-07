// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export async function uploadFileToSupabase(file: File, token: any) {
// 	try {
// 		const fileExt = file.name.split(".").pop();
// 		const fileName = `${Date.now()}.${fileExt}`;
// 		const filePath = `${fileName}`; // Remove redundant "ad-resources" from path

// 		console.log("Uploading file:", file.name, "with token:", token);

// 		// Check if user is authenticated
// 		if (!token) {
// 			console.error(
// 				"No authentication token found. Ensure the user is logged in."
// 			);
// 			return null;
// 		}

// 		// Perform the upload using Supabase storage API
// 		const { data: uploadData, error: uploadError } = await supabase.storage
// 			.from("ad-resources") // Bucket name only here
// 			.upload(filePath, file, {
// 				cacheControl: "3600",
// 				upsert: false,
// 			});

// 		if (uploadError) {
// 			console.error("File upload error:", uploadError.message);
// 			return null;
// 		}

// 		console.log("Upload successful:", uploadData);

// 		// Retrieve the public URL of the uploaded file
// 		const { data } = supabase.storage
// 			.from("ad-resources")
// 			.getPublicUrl(filePath);

// 		if (!data?.publicUrl) {
// 			console.error("Error: Failed to retrieve public URL.");
// 			return null;
// 		}

// 		console.log("Public URL:", data.publicUrl);
// 		return data.publicUrl; // Return the public URL
// 	} catch (err) {
// 		console.error("Unexpected error during file upload:", err);
// 		return null;
// 	}
// }

// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export async function uploadFileToSupabase(file: File, token: string | null) {
// 	try {
// 		// Ensure token is passed and set in the client before uploading
// 		if (!token) {
// 			console.error(
// 				"No authentication token found. Ensure the user is logged in."
// 			);
// 			return null;
// 		}

// 		// Set the authorization token for future requests
// 		supabase.auth.setAuth(token); // Dynamically set the JWT for the request

// 		// File path construction
// 		const fileExt = file.name.split(".").pop();
// 		const fileName = `${Date.now()}.${fileExt}`;
// 		const filePath = `${fileName}`; // Adjusted path

// 		console.log("Uploading file:", file.name, "with token:", token);

// 		// Perform the upload using Supabase storage API
// 		const { data: uploadData, error: uploadError } = await supabase.storage
// 			.from("ad-resources") // Ensure the bucket name is correct
// 			.upload(filePath, file, {
// 				cacheControl: "3600",
// 				upsert: false,
// 			});

// 		if (uploadError) {
// 			console.error("File upload error:", uploadError.message);
// 			return null;
// 		}

// 		console.log("Upload successful:", uploadData);

// 		// Retrieve the public URL of the uploaded file
// 		const { data } = supabase.storage
// 			.from("ad-resources")
// 			.getPublicUrl(filePath);

// 		if (!data?.publicUrl) {
// 			console.error("Error: Failed to retrieve public URL.");
// 			return null;
// 		}

// 		console.log("Public URL:", data.publicUrl);
// 		return data.publicUrl; // Return the public URL
// 	} catch (err) {
// 		console.error("Unexpected error during file upload:", err);
// 		return null;
// 	}
// }

// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export async function uploadFileToSupabase(file: File, token: string | null) {
// 	try {
// 		// Ensure token is passed
// 		if (!token) {
// 			console.error(
// 				"No authentication token found. Ensure the user is logged in."
// 			);
// 			return null;
// 		}

// 		// File path construction
// 		const fileExt = file.name.split(".").pop();
// 		const fileName = `${Date.now()}.${fileExt}`;
// 		const filePath = `${fileName}`; // Adjusted path

// 		console.log("Uploading file:", file.name, "with token:", token);

// 		// Perform the upload using Supabase storage API, and pass the JWT token in headers
// 		const { data: uploadData, error: uploadError } = await supabase.storage
// 			.from("ad-resources")
// 			.upload(filePath, file, {
// 				cacheControl: "3600",
// 				upsert: false,
// 				headers: {
// 					Authorization: `Bearer ${token}`, // Pass JWT token in the headers
// 				},
// 			});

// 		if (uploadError) {
// 			console.error("File upload error:", uploadError.message);
// 			return null;
// 		}

// 		console.log("Upload successful:", uploadData);

// 		// Retrieve the public URL of the uploaded file
// 		const { data } = supabase.storage
// 			.from("ad-resources")
// 			.getPublicUrl(filePath);

// 		if (!data?.publicUrl) {
// 			console.error("Error: Failed to retrieve public URL.");
// 			return null;
// 		}

// 		console.log("Public URL:", data.publicUrl);
// 		return data.publicUrl; // Return the public URL
// 	} catch (err) {
// 		console.error("Unexpected error during file upload:", err);
// 		return null;
// 	}
// }

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFileToSupabase(file: File, token: string | null) {
	try {
		// Ensure token is passed
		if (!token) {
			console.error(
				"No authentication token found. Ensure the user is logged in."
			);
			return null;
		}

		// Set the JWT token in Supabase's auth session
		await supabase.auth.setSession({
			access_token: token, // Set the JWT token from KindeAuth
			refresh_token: "", // KindeAuth may not provide a refresh token; pass an empty string
		});

		// File path construction
		const fileExt = file.name.split(".").pop();
		const fileName = `${Date.now()}.${fileExt}`;
		const filePath = `${fileName}`; // Adjusted path

		console.log("Uploading file:", file.name, "with token:", token);

		// Perform the upload using Supabase storage API
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from("ad-resources") // Ensure the bucket name is correct
			.upload(filePath, file, {
				cacheControl: "3600",
				upsert: false,
			});

		if (uploadError) {
			console.error("File upload error:", uploadError.message);
			return null;
		}

		console.log("Upload successful:", uploadData);

		// Retrieve the public URL of the uploaded file
		const { data } = supabase.storage
			.from("ad-resources")
			.getPublicUrl(filePath);

		if (!data?.publicUrl) {
			console.error("Error: Failed to retrieve public URL.");
			return null;
		}

		console.log("Public URL:", data.publicUrl);
		return data.publicUrl; // Return the public URL
	} catch (err) {
		console.error("Unexpected error during file upload:", err);
		return null;
	}
}
