import React from "react";

export interface NotificationProps {
	message: string;
	type: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
	return (
		<div
			className={`mt-4 p-4 rounded ${
				type === "success"
					? "bg-green-100 text-green-800"
					: "bg-red-100 text-red-800"
			}`}>
			{message}
		</div>
	);
};

export default Notification;
