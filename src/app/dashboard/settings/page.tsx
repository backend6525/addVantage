"use client";
import { api } from "../../../../convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { Toaster } from "@/app/components/sonner";
import { toast } from "sonner";

function SettingsPage() {
	const router = useRouter();
	const convex = useConvex();
	const { user }: any = useKindeBrowserClient();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		themeColor: "",
		language: "English",
		timeZone: "",
		dateFormat: "",
		preferences: "",
		twoFactorAuth: false,
		profilePicture: null,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, files } = e.target as HTMLInputElement;
		const file = (e.target as HTMLInputElement).files?.[0];
		setFormData((prevData) => ({
			...prevData,
			[name]: file || value,
		}));
	};

	const handleSaveSettings = () => {
		// Handle saving settings logic (e.g., API calls, validation, etc.)
		console.log("Saving settings:", formData);
		toast("Settings saved successfully!");
	};

	const handleProfilePictureClick = () => {
		fileInputRef.current?.click();
	};

	useEffect(() => {
		if (user) {
			// Fetch user settings and update formData
		}
	}, [user]);

	return (
		<div className="px-8 md:px-16 my-16 pt-7">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="flex flex-col items-center pl-40">
					<h2 className="font-bold text-[40px] py-3">Settings</h2>

					<div className="mt-7 w-full space-y-6">
						<div className="flex flex-col items-center">
							<div className="border border-gray-300 rounded-full p-1">
								<img
									src={
										formData.profilePicture
											? URL.createObjectURL(formData.profilePicture)
											: "/default-avatar.png"
									}
									alt="Profile Picture"
									className="w-32 h-32 rounded-full object-cover cursor-pointer"
									onClick={handleProfilePictureClick}
								/>
							</div>
							<input
								type="file"
								name="profilePicture"
								ref={fileInputRef}
								onChange={handleChange}
								className="hidden"
							/>
						</div>
					</div>
				</div>

				<div className="mt-7 w-full space-y-6 pt-32">
					<Input
						name="fullName"
						placeholder="Full Name"
						value={formData.fullName}
						onChange={handleChange}
						className="w-full p-2 border rounded bg-black text-white"
					/>
					<Input
						name="email"
						placeholder="Email Address"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border rounded bg-black text-white"
					/>
					<Input
						name="password"
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						className="w-full p-2 border rounded bg-black text-white"
					/>
					<Input
						name="timeZone"
						placeholder="Time Zone"
						value={formData.timeZone}
						onChange={handleChange}
						className="w-full p-2 border rounded bg-black text-white"
					/>
					<div className="flex items-center">
						<input
							type="checkbox"
							name="twoFactorAuth"
							checked={formData.twoFactorAuth}
							onChange={(e) =>
								setFormData((prevData) => ({
									...prevData,
									twoFactorAuth: e.target.checked,
								}))
							}
							className="mr-2"
						/>
						<label htmlFor="twoFactorAuth">
							Enable Two-Factor Authentication
						</label>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
				<div className="space-y-4 flex flex-col pl-[20rem] pt-11">
					<h3 className="font-bold text-lg pb-20">Theme Color</h3>
					<h3 className="font-bold text-lg  pb-20">Language & Region</h3>
					<h3 className="font-bold text-lg  pb-20">Time and Date Format</h3>
					<h3 className="font-bold text-lg  pb-20 pt-6">Preferences</h3>
					<h3 className="font-bold text-lg pb-20 text-red-600 pt-7">
						Danger Zone
					</h3>
				</div>
				<div className="space-y-4 pt-8">
					<div className="pb-20">
						<select
							name="themeColor"
							value={formData.themeColor}
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white">
							<option value="">Select Theme Color</option>
							<option value="light">Light</option>
							<option value="dark">Dark</option>
						</select>
					</div>
					<div className="pb-20">
						<select
							name="language"
							value={formData.language}
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white">
							<option value="English">English</option>
							<option value="Spanish">Spanish</option>
							{/* Add more languages as needed */}
						</select>
					</div>
					<div className="pb-20">
						<Input
							name="dateFormat"
							placeholder="Date Format"
							value={formData.dateFormat}
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white"
						/>
					</div>
					<div className="pb-20">
						<Input
							name="preferences"
							placeholder="Preferences"
							value={formData.preferences}
							onChange={handleChange}
							className="w-full p-2 border rounded bg-black text-white"
						/>
					</div>
					<div className="pb-20">
						<Button className="bg-red-600 text-white w-full">
							Delete Account
						</Button>
					</div>
					<div className="flex justify-end">
						<Button
							className=" mt-9 w-full md:w-auto text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={handleSaveSettings}>
							Save Settings
						</Button>
						{/* <Toaster /> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
