"use client";

import React, { useState } from "react";
import Notification, { NotificationProps } from "./Notification";
import GenerateCodeCard from "./GenerateCode";
import { Tooltip } from "react-tooltip";

interface InviteFormProps {
	userId: string;
}

const InviteForm: React.FC<InviteFormProps> = ({ userId }) => {
	const [friendEmail, setFriendEmail] = useState("");
	const [notification, setNotification] = useState<NotificationProps | null>(
		null
	);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [activeOption, setActiveOption] = useState<"email" | "code">("email");

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleInvite = async () => {
		if (!validateEmail(friendEmail)) {
			setIsEmailValid(false);
			setNotification({
				message: "Please enter a valid email address.",
				type: "error",
			});
			return;
		}

		setIsEmailValid(true);
		setNotification(null);

		try {
			const response = await fetch("/api/inviteFriend", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ friendEmail, userId }),
			});

			const data = await response.json();

			if (data.success) {
				setNotification({ message: data.message, type: "success" });
			} else {
				setNotification({ message: data.message, type: "error" });
			}
		} catch (error) {
			setNotification({
				message: "Something went wrong. Please try again.",
				type: "error",
			});
		}
	};

	return (
		<div className="max-w-5xl mx-auto bg-gray-850 p-10 rounded-lg shadow-lg space-y-8 text-white">
			{notification && (
				<Notification message={notification.message} type={notification.type} />
			)}

			<h2 className="text-3xl font-bold mb-4">
				Invite a Friend or Generate a Referral Code
			</h2>
			<p className="text-gray-400 mb-4">
				You can invite your friends via email or generate a referral code they
				can use to sign up.
			</p>

			<div className="flex justify-center mb-6">
				<button
					className={`px-4 py-2 rounded-t-lg font-semibold ${
						activeOption === "email"
							? "bg-blue-600 text-white"
							: "bg-gray-850 text-gray-400"
					}`}
					onClick={() => setActiveOption("email")}>
					Invite via Email
				</button>
				<button
					className={`px-4 py-2 rounded-t-lg font-semibold ml-2 ${
						activeOption === "code"
							? "bg-blue-600 text-white"
							: "bg-gray-800 text-gray-400"
					}`}
					onClick={() => setActiveOption("code")}>
					Generate Referral Code
				</button>
			</div>

			{activeOption === "email" && (
				<div className="w-full">
					<h3 className="text-2xl font-bold mb-4">Invite a Friend via Email</h3>
					<div className="mb-4 relative">
						<label className="block text-gray-400">Friends Email</label>
						<input
							type="email"
							value={friendEmail}
							onChange={(e) => setFriendEmail(e.target.value)}
							placeholder="Enter your friend's email"
							className={`w-full p-3 border ${
								isEmailValid ? "border-gray-600" : "border-red-500"
							} rounded mt-2 bg-gray-850 text-white`}
						/>
						{!isEmailValid && (
							<span className="text-red-500 text-sm">
								Please enter a valid email address.
							</span>
						)}
					</div>
					<button
						onClick={handleInvite}
						className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-150 ease-in-out">
						Invite Friend
					</button>
				</div>
			)}

			{activeOption === "code" && (
				<div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-gray-850 p-6 rounded-lg shadow-md mx-auto">
					<GenerateCodeCard />
				</div>
			)}
		</div>
	);
};

export default InviteForm;
