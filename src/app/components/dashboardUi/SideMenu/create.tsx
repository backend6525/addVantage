// import React, { useState, useEffect } from "react";
// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/app/components/ui/DialogPopup/dialog";
// import Button from "../../ui/Button";
// import Input from "../../ui/Input";
// //import { useRouter } from "next/navigation";
// import { useConvex, useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiFilePlus } from "react-icons/fi";
// import { supabase } from "@/lib/superbase/supabaseClient"; // Supabase client

// import { uploadFileToSupabase } from "@/lib/superbase/supabaseClient";

// function Create({ onCreateAd, isMenuOpen }: any) {
// 	const [isClient, setIsClient] = useState(false);
// 	const [formData, setFormData] = useState({
// 		adName: "",
// 		teamId: "",
// 		createdBy: "",
// 		type: "",
// 		costPerView: "",
// 		numberOfDaysRunning: "",
// 		adResource: null, // File object for upload
// 	});
// 	const [showSuccessDialog, setShowSuccessDialog] = useState(false); // State for success dialog

// 	const convex = useConvex();
// 	const createAd = useMutation(api.ads.createAd);

// 	// Ensure this runs on the client side only
// 	useEffect(() => {
// 		setIsClient(true);
// 		testSupabaseConnection();
// 	}, []);

// 	// Test Supabase connection on load
// 	const testSupabaseConnection = async () => {
// 		const { data, error } = await supabase.storage.from("ad-resources").list();
// 		if (error) {
// 			console.error("Error connecting to Supabase:", error.message);
// 		} else {
// 			console.log("Connection to Supabase successful:", data);
// 		}
// 	};

// 	// Handle form input changes
// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// 	) => {
// 		const { name, value } = e.target;
// 		const files = (e.target as HTMLInputElement).files;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: files ? files[0] : value, // Store file if uploaded
// 		}));
// 	};

// 	// Form validation
// 	const isFormValid = () => {
// 		return formData.adName && formData.teamId && formData.createdBy;
// 	};

// 	const fetchKindeAuthToken = async () => {
// 		try {
// 			const response = await fetch("/api/auth/kindeToken");
// 			const data = await response.json();

// 			if (!response.ok) {
// 				throw new Error(data.error || "Failed to retrieve Kinde auth token");
// 			}

// 			return data.token;
// 		} catch (error) {
// 			console.error("Error fetching Kinde auth token:", error);
// 			toast.error("Failed to authenticate. Please try again.");
// 			return null;
// 		}
// 	};

// 	const handleCreateAd = async () => {
// 		// Fetch Kinde auth token via the backend API
// 		const kindeAuthToken = await fetchKindeAuthToken();

// 		if (!kindeAuthToken) {
// 			toast.error("Failed to fetch authentication token.");
// 			return;
// 		}

// 		// Proceed with file upload if adResource is provided
// 		if (formData.adResource) {
// 			try {
// 				// Ensure the file has a valid extension and construct the file path
// 				const fileExtension = formData.adName.split(".").pop();
// 				const filePath = `public/${formData.adName}.${fileExtension}`; // Store with the ad name as part of the path

// 				// Use the custom uploadFileToSupabase function to upload the file with token
// 				const fileUrl = await uploadFileToSupabase(
// 					formData.adResource,
// 					kindeAuthToken
// 				);

// 				if (!fileUrl) {
// 					toast.error("Failed to upload file.");
// 					return;
// 				}

// 				// Prepare the payload for ad creation, using the file URL
// 				const payload = {
// 					...formData,
// 					adResource: fileUrl, // Use the public URL of the uploaded file
// 				};

// 				// Call the mutation to create the ad with the file URL
// 				await createAd(payload);
// 				toast.success("Ad created successfully!");
// 				setShowSuccessDialog(true); // Show success dialog
// 			} catch (error) {
// 				console.error("Error uploading file:", error);
// 				toast.error("File upload failed. Please try again.");
// 			}
// 		} else {
// 			// Handle case where there is no file to upload (e.g., text-based ads)
// 			try {
// 				await createAd(formData);
// 				toast.success("Ad created successfully!");
// 				setShowSuccessDialog(true); // Show success dialog
// 			} catch (error) {
// 				console.error("Error creating ad:", error);
// 				toast.error("Ad creation failed. Please try again.");
// 			}
// 		}
// 	};

// 	// Only render on the client side
// 	if (!isClient) {
// 		return null;
// 	}

// 	return (
// 		<>
// 			<Dialog>
// 				<DialogTrigger>
// 					<div className="text-white pl-2 py-2 rounded w-full flex items-center">
// 						<FiFilePlus size={25} />
// 						{isMenuOpen && <span className="ml-3 text-white">Create Ad</span>}
// 					</div>
// 				</DialogTrigger>

// 				<DialogContent className="p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
// 					<DialogHeader>
// 						<DialogTitle className="text-xl font-bold">Create Ad?</DialogTitle>
// 						<DialogDescription>
// 							Fill in the details below to create your ad.
// 						</DialogDescription>
// 					</DialogHeader>

// 					<div className="space-y-6">
// 						<Input
// 							name="adName"
// 							placeholder="Ad Name"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<Input
// 							name="teamId"
// 							placeholder="Team ID"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<Input
// 							name="createdBy"
// 							placeholder="Created By"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<select
// 							name="type"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white">
// 							<option value="">Select Type (optional)</option>
// 							<option value="Poster">Poster</option>
// 							<option value="Audio File">Audio File</option>
// 							<option value="Video">Video</option>
// 							<option value="Text">Text</option>
// 						</select>
// 						{formData.type && formData.type !== "Text" && (
// 							<Input
// 								type="file"
// 								name="adResource"
// 								onChange={handleChange}
// 								className="w-full p-2 border rounded bg-black text-white"
// 							/>
// 						)}
// 						<Input
// 							name="costPerView"
// 							placeholder="Cost Per View (optional)"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<Input
// 							name="numberOfDaysRunning"
// 							placeholder="Number of Days Running (optional)"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 					</div>

// 					<DialogFooter className="mt-6 sm:justify-end">
// 						<DialogClose asChild>
// 							<Button
// 								type="button"
// 								disabled={!isFormValid()}
// 								onClick={handleCreateAd}
// 								className="bg-violet-600 text-white px-4 py-2 rounded">
// 								Create Ad
// 							</Button>
// 						</DialogClose>
// 					</DialogFooter>
// 				</DialogContent>
// 			</Dialog>

// 			{/* Success Dialog */}
// 			<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
// 				<DialogContent className="p-8 bg-green-600 text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
// 					<DialogHeader>
// 						<DialogTitle className="text-xl font-bold">Success!</DialogTitle>
// 						<DialogDescription>
// 							Your ad has been created successfully.
// 						</DialogDescription>
// 					</DialogHeader>
// 					<DialogFooter className="mt-6 sm:justify-end">
// 						<DialogClose asChild>
// 							<Button
// 								type="button"
// 								className="bg-white text-green-600 px-4 py-2 rounded"
// 								onClick={() => setShowSuccessDialog(false)}>
// 								Close
// 							</Button>
// 						</DialogClose>
// 					</DialogFooter>
// 				</DialogContent>
// 			</Dialog>

// 			<ToastContainer />
// 		</>
// 	);
// }

// export default Create;

// import React, { useState, useEffect } from "react";
// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/app/components/ui/DialogPopup/dialog";
// import Button from "../../ui/Button";
// import Input from "../../ui/Input";
// import { useConvex, useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiFilePlus } from "react-icons/fi";
// // AWS S3 import
// import { uploadFileToS3 } from "@/lib/aws/s3Client";

// function Create({ onCreateAd, isMenuOpen }: any) {
// 	const [isClient, setIsClient] = useState(false);
// 	const [formData, setFormData] = useState({
// 		adName: "",
// 		teamId: "",
// 		createdBy: "",
// 		type: "",
// 		costPerView: "",
// 		numberOfDaysRunning: "",
// 		adResource: null, // File object for upload
// 	});
// 	const [showSuccessDialog, setShowSuccessDialog] = useState(false); // State for success dialog

// 	const convex = useConvex();
// 	const createAd = useMutation(api.ads.createAd);

// 	// Ensure this runs on the client side only
// 	useEffect(() => {
// 		setIsClient(true);
// 	}, []);

// 	// Handle form input changes
// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// 	) => {
// 		const { name, value } = e.target;
// 		const files = (e.target as HTMLInputElement).files;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: files ? files[0] : value, // Store file if uploaded
// 		}));
// 	};

// 	// Form validation
// 	const isFormValid = () => {
// 		return formData.adName && formData.teamId && formData.createdBy;
// 	};

// const handleCreateAd = async () => {
// 	if (formData.adResource) {
// 		try {
// 			// Upload to AWS S3
// 			const fileUrl = await uploadFileToS3(formData.adResource, "public");

// 			if (!fileUrl) {
// 				toast.error("Failed to upload file.");
// 				return;
// 			}

// 			// Prepare the payload for ad creation, using the file URL
// 			const payload = {
// 				...formData,
// 				adResource: fileUrl, // Use the public URL of the uploaded file
// 			};

// 			// Call the mutation to create the ad with the file URL
// 			await createAd(payload);
// 			toast.success("Ad created successfully!");
// 			setShowSuccessDialog(true); // Show success dialog
// 		} catch (error) {
// 			console.error("Error uploading file to S3:", error);
// 			toast.error("File upload failed. Please try again.");
// 		}
// 	} else {
// 		// Handle case where there is no file to upload (e.g., text-based ads)
// 		try {
// 			await createAd(formData);
// 			toast.success("Ad created successfully!");
// 			setShowSuccessDialog(true); // Show success dialog
// 		} catch (error) {
// 			console.error("Error creating ad:", error);
// 			toast.error("Ad creation failed. Please try again.");
// 		}
// 	}
// };

// const handleCreateAd = async () => {
// 	// Check if the form has an adResource file
// 	if (formData.adResource) {
// 		try {
// 			// Upload the file to S3
// 			const fileUrl = await uploadFileToS3(formData.adResource, "public");

// 			if (!fileUrl) {
// 				toast.error("Failed to upload file.");
// 				return;
// 			}

// 			console.log("File uploaded to S3, URL:", fileUrl);

// 			// Prepare the payload with the S3 URL for adResource
// 			const payload = {
// 				...formData,
// 				adResource: fileUrl, // Pass the S3 file URL here
// 			};

// 			// Call the mutation to create the ad with the file URL
// 			await createAd(payload);
// 			toast.success("Ad created successfully!");
// 			setShowSuccessDialog(true); // Show success dialog
// 		} catch (error) {
// 			console.error("Error uploading file to S3:", error);
// 			toast.error("File upload failed. Please try again.");
// 		}
// 	} else {
// 		// Handle case where there is no file to upload (e.g., text-based ads)
// 		try {
// 			await createAd(formData); // Ensure formData does not expect a file URL for text ads
// 			toast.success("Ad created successfully!");
// 			setShowSuccessDialog(true); // Show success dialog
// 		} catch (error) {
// 			console.error("Error creating ad:", error);
// 			toast.error("Ad creation failed. Please try again.");
// 		}
// 	}
// 	// };
// 	const uploadFileToS3 = async (file: File) => {
// 		const fileName = encodeURIComponent(file.name);
// 		const fileType = file.type;

// 		// Step 1: Get signed URL from backend
// 		const res = await fetch("/api/uploadToS3", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				fileName,
// 				fileType,
// 			}),
// 		});

// 		const { uploadUrl } = await res.json();

// 		// Step 2: Upload file to S3 using the signed URL
// 		const upload = await fetch(uploadUrl, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": fileType,
// 			},
// 			body: file,
// 		});

// 		if (upload.ok) {
// 			return uploadUrl.split("?")[0]; // Return the public URL without query params
// 		} else {
// 			throw new Error("Upload failed.");
// 		}
// 	};
// 	// Only render on the client side
// 	if (!isClient) {
// 		return null;
// 	}

// 	return (
// 		<>
// 			<Dialog>
// 				<DialogTrigger>
// 					<div className="text-white pl-2 py-2 rounded w-full flex items-center">
// 						<FiFilePlus size={25} />
// 						{isMenuOpen && <span className="ml-3 text-white">Create Ad</span>}
// 					</div>
// 				</DialogTrigger>

// 				<DialogContent className="p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
// 					<DialogHeader>
// 						<DialogTitle className="text-xl font-bold">Create Ad?</DialogTitle>
// 						<DialogDescription>
// 							Fill in the details below to create your ad.
// 						</DialogDescription>
// 					</DialogHeader>

// 					<div className="space-y-6">
// 						<Input
// 							name="adName"
// 							placeholder="Ad Name"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<Input
// 							name="teamId"
// 							placeholder="Team ID"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<Input
// 							name="createdBy"
// 							placeholder="Created By"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<select
// 							name="type"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white">
// 							<option value="">Select Type (optional)</option>
// 							<option value="Poster">Poster</option>
// 							<option value="Audio File">Audio File</option>
// 							<option value="Video">Video</option>
// 							<option value="Text">Text</option>
// 						</select>
// 						{formData.type && formData.type !== "Text" && (
// 							<Input
// 								type="file"
// 								name="adResource"
// 								onChange={handleChange}
// 								className="w-full p-2 border rounded bg-black text-white"
// 							/>
// 						)}
// 						<Input
// 							name="costPerView"
// 							placeholder="Cost Per View (optional)"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 						<Input
// 							name="numberOfDaysRunning"
// 							placeholder="Number of Days Running (optional)"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 					</div>

// 					<DialogFooter className="mt-6 sm:justify-end">
// 						<DialogClose asChild>
// 							<Button
// 								type="button"
// 								disabled={!isFormValid()}
// 								onClick={handleCreateAd}
// 								className="bg-violet-600 text-white px-4 py-2 rounded">
// 								Create Ad
// 							</Button>
// 						</DialogClose>
// 					</DialogFooter>
// 				</DialogContent>
// 			</Dialog>

// 			{/* Success Dialog */}
// 			<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
// 				<DialogContent className="p-8 bg-green-600 text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
// 					<DialogHeader>
// 						<DialogTitle className="text-xl font-bold">Success!</DialogTitle>
// 						<DialogDescription>
// 							Your ad has been created successfully.
// 						</DialogDescription>
// 					</DialogHeader>
// 					<DialogFooter className="mt-6 sm:justify-end">
// 						<DialogClose asChild>
// 							<Button
// 								type="button"
// 								className="bg-white text-green-600 px-4 py-2 rounded"
// 								onClick={() => setShowSuccessDialog(false)}>
// 								Close
// 							</Button>
// 						</DialogClose>
// 					</DialogFooter>
// 				</DialogContent>
// 			</Dialog>

// 			<ToastContainer />
// 		</>
// 	);
// }

// export default Create;

import React, { useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/DialogPopup/dialog";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiFilePlus } from "react-icons/fi";

function Create({ onCreateAd, isMenuOpen }: any) {
	const [formData, setFormData] = useState({
		adName: "",
		teamId: "",
		createdBy: "",
		type: "",
		costPerView: "",
		numberOfDaysRunning: "",
		adResource: null, // File object for upload
	});
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);

	const convex = useConvex();
	const createAd = useMutation(api.ads.createAd);

	// Handle form input changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const files = (e.target as HTMLInputElement).files;
		setFormData((prevData) => ({
			...prevData,
			[name]: files ? files[0] : value, // Store file if uploaded
		}));
	};

	// Form validation
	const isFormValid = () => {
		return formData.adName && formData.teamId && formData.createdBy;
	};

	// Upload file to S3 using signed URL
	// const uploadFileToS3 = async (file: File) => {
	// 	const fileName = encodeURIComponent(file.name);
	// 	const fileType = file.type;

	// 	try {
	// 		// Step 1: Get signed URL from the backend API
	// 		const res = await fetch("/api/uploadToS3", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				fileName,
	// 				fileType,
	// 			}),
	// 		});

	// 		const { uploadUrl } = await res.json();

	// 		// Step 2: Upload file to S3 using the signed URL
	// 		const upload = await fetch(uploadUrl, {
	// 			method: "PUT",
	// 			headers: {
	// 				"Content-Type": fileType,
	// 			},
	// 			body: file,
	// 		});

	// 		if (!upload.ok) {
	// 			throw new Error("File upload failed.");
	// 		}

	// 		return uploadUrl.split("?")[0]; // Return the public URL without query params
	// 	} catch (error) {
	// 		console.error("Error uploading file to S3:", error);
	// 		throw error;
	// 	}
	// };

	// const uploadFileToS3 = async (file: File) => {
	// 	const fileName = encodeURIComponent(file.name);
	// 	const fileType = file.type;

	// 	try {
	// 		// Step 1: Get signed URL from the backend API
	// 		const res = await fetch("/api/uploadToS3", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				fileName,
	// 				fileType,
	// 			}),
	// 		});

	// 		const data = await res.json();
	// 		console.log("Signed URL response:", data); // Log the response

	// 		if (!data.uploadUrl) {
	// 			throw new Error("Failed to get signed URL");
	// 		}
	// 		//"putObject", s3Params
	// 		// Step 2: Upload file to S3 using the signed URL
	// 		const upload = await fetch(data.uploadUrl, {
	// 			method: "PUT",
	// 			headers: {
	// 				"Content-Type": fileType,
	// 			},
	// 			body: file,
	// 		});

	// 		if (!upload.ok) {
	// 			throw new Error("File upload failed.");
	// 		}

	// 		return data.uploadUrl.split("?")[0]; // Return the public URL without query params
	// 	} catch (error) {
	// 		console.error("Error uploading file to S3:", error);
	// 		throw error;
	// 	}
	// };

	const uploadFileToS3 = async (file: File) => {
		const fileName = encodeURIComponent(file.name);
		const fileType = file.type;

		try {
			// Step 1: Get signed URL from the backend API
			const res = await fetch("/api/uploadToS3", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fileName,
					fileType,
				}),
			});

			const data = await res.json();
			console.log("Signed URL response:", data); // Check if uploadUrl is valid

			if (!data.uploadUrl) {
				throw new Error("Failed to get signed URL");
			}

			// Step 2: Upload file to S3 using the signed URL
			console.log("Uploading to S3 using URL:", data.uploadUrl);
			const upload = await fetch(data.uploadUrl, {
				method: "PUT",
				headers: {
					"Content-Type": fileType,
					"Content-Length": file.size.toString(), // Add this line
				},
				body: file, // Upload the actual file content
			});

			if (!upload.ok) {
				throw new Error("File upload failed.");
			}

			console.log("File successfully uploaded");
			return data.uploadUrl.split("?")[0]; // Return the public URL without query params
		} catch (error) {
			console.error("Error uploading file to S3:", error);
			throw error;
		}
	};

	// Handle ad creation
	const handleCreateAd = async () => {
		try {
			// Proceed with file upload if adResource is provided
			let fileUrl = null;
			if (formData.adResource) {
				fileUrl = await uploadFileToS3(formData.adResource); // Get file URL from S3
			}

			// Prepare the payload for ad creation
			const payload = {
				...formData,
				adResource: fileUrl || "", // Use file URL if available, otherwise empty string
			};

			// Call the mutation to create the ad
			await createAd(payload);
			toast.success("Ad created successfully!");
			setShowSuccessDialog(true); // Show success dialog
		} catch (error) {
			console.error("Error creating ad:", error);
			toast.error("Ad creation failed. Please try again.");
		}
	};

	return (
		<>
			<Dialog>
				<DialogTrigger>
					<div className="text-white pl-2 py-2 rounded w-full flex items-center">
						<FiFilePlus size={25} />
						{isMenuOpen && <span className="ml-3 text-white">Create Ad</span>}
					</div>
				</DialogTrigger>

				<DialogContent className="p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
					<DialogHeader>
						<DialogTitle className="text-xl font-bold">Create Ad</DialogTitle>
						<DialogDescription>
							Fill in the details below to create your ad.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-6">
						<Input
							name="adName"
							placeholder="Ad Name"
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white"
						/>
						<Input
							name="teamId"
							placeholder="Team ID"
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white"
						/>
						<Input
							name="createdBy"
							placeholder="Created By"
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white"
						/>
						<select
							name="type"
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white">
							<option value="">Select Type (optional)</option>
							<option value="Poster">Poster</option>
							<option value="Audio File">Audio File</option>
							<option value="Video">Video</option>
							<option value="Text">Text</option>
						</select>
						{formData.type && formData.type !== "Text" && (
							<Input
								type="file"
								name="adResource"
								onChange={handleChange}
								className="w-full p-2 border rounded bg-black text-white"
							/>
						)}
						<Input
							name="costPerView"
							placeholder="Cost Per View (optional)"
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white"
						/>
						<Input
							name="numberOfDaysRunning"
							placeholder="Number of Days Running (optional)"
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white"
						/>
					</div>

					<DialogFooter className="mt-6 sm:justify-end">
						<DialogClose asChild>
							<Button
								type="button"
								disabled={!isFormValid()}
								onClick={handleCreateAd}
								className="bg-violet-600 text-white px-4 py-2 rounded">
								Create Ad
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Success Dialog */}
			<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
				<DialogContent className="p-8 bg-green-600 text-white rounded-lg shadow-lg max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
					<DialogHeader>
						<DialogTitle className="text-xl font-bold">Success!</DialogTitle>
						<DialogDescription>
							Your ad has been created successfully.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-6 sm:justify-end">
						<DialogClose asChild>
							<Button
								type="button"
								className="bg-white text-green-600 px-4 py-2 rounded"
								onClick={() => setShowSuccessDialog(false)}>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<ToastContainer />
		</>
	);
}

export default Create;
