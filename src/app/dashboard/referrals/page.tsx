"use client";
import React from "react";
import InviteForm from "./InviteForm";
const ReferralPage: React.FC = () => {
	// Assuming you get the logged-in user's ID from a session or context
	const userId = "example-user-id";

	return (
		<div className="min-h-screen  bg-gray-850 flex items-center justify-center">
			<InviteForm userId={userId} />
		</div>
	);
};

export default ReferralPage;
