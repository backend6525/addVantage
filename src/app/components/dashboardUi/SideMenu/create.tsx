// import React, { useState } from "react";
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

// function CreateAd({ onCreateAd }: any) {
// 	const [formData, setFormData] = useState({
// 		adName: "",
// 		teamId: "",
// 		createdBy: "",
// 		type: "",
// 		costPerView: "",
// 		numberOfDaysRunning: "",
// 		adResource: null,
// 	});

// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// 	) => {
// 		const { name, value } = e.target as HTMLInputElement;
// 		const files = (e.target as HTMLInputElement).files;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: files ? files[0] : value,
// 		}));
// 	};

// 	const isFormValid = () => {
// 		return formData.adName && formData.teamId && formData.createdBy;
// 	};

// 	return (
// 		<Dialog>
// 			<div className="w-full flex items-center px-4 py-2 bg-black text-white justify-start mt-3">
// 				<DialogTrigger>
// 					{/* Button to create Ad */}
// 					<Button className="bg-black text-white px-4 py-2 rounded">
// 						Create Ad
// 					</Button>
// 				</DialogTrigger>
// 			</div>
// 			<DialogContent className="p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl">
// 				<DialogHeader>
// 					<DialogTitle className="text-xl font-bold">Create Ad?</DialogTitle>
// 					<DialogDescription>
// 						Fill in the details below to create your ad.
// 					</DialogDescription>
// 				</DialogHeader>
// 				<div className="space-y-6">
// 					<Input
// 						name="adName"
// 						placeholder="Ad Name"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<Input
// 						name="teamId"
// 						placeholder="Team ID"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<Input
// 						name="createdBy"
// 						placeholder="Created By"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<select
// 						name="type"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white">
// 						<option value="">Select Type (optional)</option>
// 						<option value="Poster">Poster</option>
// 						<option value="Audio File">Audio File</option>
// 						<option value="Video">Video</option>
// 						<option value="Text">Text</option>
// 					</select>
// 					{formData.type && formData.type !== "Text" && (
// 						<Input
// 							type="file"
// 							name="adResource"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 					)}
// 					<Input
// 						name="costPerView"
// 						placeholder="Cost Per View (optional)"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<Input
// 						name="numberOfDaysRunning"
// 						placeholder="Number of Days Running (optional)"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 				</div>
// 				<DialogFooter className="mt-6 sm:justify-end">
// 					<DialogClose asChild>
// 						<Button
// 							type="button"
// 							disabled={!isFormValid()}
// 							onClick={() => onCreateAd(formData)}
// 							className="bg-violet-600 text-white px-4 py-2 rounded">
// 							Create
// 						</Button>
// 					</DialogClose>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }

// export default CreateAd;
//

// import React, { useState } from "react";
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
// import { useRouter } from "next/router";
// import { useConvex, useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function CreateAd({ onCreateAd }: any) {
// 	const [formData, setFormData] = useState({
// 		adName: "",
// 		teamId: "",
// 		createdBy: "",
// 		type: "",
// 		costPerView: "",
// 		numberOfDaysRunning: "",
// 		adResource: null,
// 	});

// 	const router = useRouter();
// 	const convex = useConvex();
// 	const createAd = useMutation(api.ads.createAd);

// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// 	) => {
// 		const { name, value } = e.target as HTMLInputElement;
// 		const files = (e.target as HTMLInputElement).files;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: files ? files[0] : value,
// 		}));
// 	};

// 	const isFormValid = () => {
// 		return formData.adName && formData.teamId && formData.createdBy;
// 	};

// 	const handleCreateAd = () => {
// 		createAd(formData).then((res) => {
// 			console.log(res);
// 			if (res) {
// 				router.push("/dashboard");
// 				toast("Ad created successfully");
// 			}
// 		});
// 	};

// 	return (
// 		<Dialog>
// 			<div className="w-full flex items-center px-4 py-2 bg-black text-white justify-start mt-3">
// 				<DialogTrigger>
// 					<Button className="bg-black text-white px-4 py-2 rounded">
// 						Create Ad
// 					</Button>
// 				</DialogTrigger>
// 			</div>
// 			<DialogContent className="p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl">
// 				<DialogHeader>
// 					<DialogTitle className="text-xl font-bold">Create Ad?</DialogTitle>
// 					<DialogDescription>
// 						Fill in the details below to create your ad.
// 					</DialogDescription>
// 				</DialogHeader>
// 				<div className="space-y-6">
// 					<Input
// 						name="adName"
// 						placeholder="Ad Name"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<Input
// 						name="teamId"
// 						placeholder="Team ID"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<Input
// 						name="createdBy"
// 						placeholder="Created By"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<select
// 						name="type"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white">
// 						<option value="">Select Type (optional)</option>
// 						<option value="Poster">Poster</option>
// 						<option value="Audio File">Audio File</option>
// 						<option value="Video">Video</option>
// 						<option value="Text">Text</option>
// 					</select>
// 					{formData.type && formData.type !== "Text" && (
// 						<Input
// 							type="file"
// 							name="adResource"
// 							onChange={handleChange}
// 							className="w-full p-2 border rounded bg-black text-white"
// 						/>
// 					)}
// 					<Input
// 						name="costPerView"
// 						placeholder="Cost Per View (optional)"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 					<Input
// 						name="numberOfDaysRunning"
// 						placeholder="Number of Days Running (optional)"
// 						onChange={handleChange}
// 						className="w-full p-2 border rounded bg-black text-white"
// 					/>
// 				</div>
// 				<DialogFooter className="mt-6 sm:justify-end">
// 					<DialogClose asChild>
// 						<Button
// 							type="button"
// 							disabled={!isFormValid()}
// 							onClick={handleCreateAd}
// 							className="bg-violet-600 text-white px-4 py-2 rounded">
// 							Create
// 						</Button>
// 					</DialogClose>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }

// export default CreateAd;

// import React, { useState } from "react";
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
// import { useRouter } from "next/router";
// import { useConvex, useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Create({ onCreateAd }: any) {
// 	const [formData, setFormData] = useState({
// 		adName: "",
// 		teamId: "",
// 		createdBy: "",
// 		type: "",
// 		costPerView: "",
// 		numberOfDaysRunning: "",
// 		adResource: null,
// 	});

// 	const router = useRouter();
// 	const convex = useConvex();
// 	const createAd = useMutation(api.ads.createAd);

// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// 	) => {
// 		const { name, value } = e.target as HTMLInputElement;
// 		const files = (e.target as HTMLInputElement).files;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: files ? files[0] : value,
// 		}));
// 	};

// 	const isFormValid = () => {
// 		return formData.adName && formData.teamId && formData.createdBy;
// 	};

// 	const handleCreateAd = () => {
// 		createAd(formData).then((res) => {
// 			console.log(res);
// 			if (res) {
// 				router.push("/dashboard");
// 				toast.success("Ad created successfully");
// 			}
// 		});
// 	};

// 	return (
// 		<>
// 			<Dialog>
// 				<div className="w-full flex items-center px-4 py-2 bg-black text-white justify-start mt-3">
// 					<DialogTrigger>
// 						<Button className="bg-black text-white px-4 py-2 rounded">
// 							Create Ad
// 						</Button>
// 					</DialogTrigger>
// 				</div>
// 				<DialogContent className="p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl">
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
// 								Create
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
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create({ onCreateAd }: any) {
	const [formData, setFormData] = useState({
		adName: "",
		teamId: "",
		createdBy: "",
		type: "",
		costPerView: "",
		numberOfDaysRunning: "",
		adResource: null,
	});

	const router = useRouter();
	const convex = useConvex();
	const createAd = useMutation(api.ads.createAd);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target as HTMLInputElement;
		const files = (e.target as HTMLInputElement).files;
		setFormData((prevData) => ({
			...prevData,
			[name]: files ? files[0] : value,
		}));
	};

	const isFormValid = () => {
		return formData.adName && formData.teamId && formData.createdBy;
	};

	const handleCreateAd = () => {
		if (typeof window !== "undefined") {
			createAd(formData).then((res) => {
				console.log(res);
				if (res) {
					router.push("/dashboard");
					toast.success("Ad created successfully");
				}
			});
		}
	};

	return (
		<>
			<Dialog>
				<div className="w-full flex items-center px-4 py-2 bg-black text-white justify-start mt-3">
					<DialogTrigger>
						<Button className="bg-black text-white px-4 py-2 rounded">
							Create Ad
						</Button>
					</DialogTrigger>
				</div>
				<DialogContent className="p-8 bg-black text-white rounded-lg shadow-lg max-w-2xl">
					<DialogHeader>
						<DialogTitle className="text-xl font-bold">Create Ad?</DialogTitle>
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
								Create
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
