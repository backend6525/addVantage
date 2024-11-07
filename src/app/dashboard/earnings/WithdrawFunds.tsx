// import React, { useState } from "react";

// function WithdrawFunds() {
// 	const [withdrawMethod, setWithdrawMethod] = useState("bank");
// 	const [accountNumber, setAccountNumber] = useState("");
// 	const [mobileNumber, setMobileNumber] = useState("");

// 	const handleWithdraw = () => {
// 		if (withdrawMethod === "bank" && accountNumber) {
// 			alert(`Withdraw to Bank Account: ${accountNumber}`);
// 		} else if (withdrawMethod === "mobile" && mobileNumber) {
// 			alert(`Withdraw to Mobile Phone: ${mobileNumber}`);
// 		} else {
// 			alert("Please enter a valid account or mobile number.");
// 		}
// 	};

// 	return (
// 		<div className="bg-gray-800 p-6 rounded-lg shadow-md">
// 			{/* Input Fields */}
// 			<h2 className="text-white text-xl mb-4">Withdraw Funds</h2>
// 			<label className="text-gray-300">Select Method:</label>
// 			<select
// 				value={withdrawMethod}
// 				onChange={(e) => setWithdrawMethod(e.target.value)}
// 				className="w-full p-2 bg-gray-700 text-white rounded mt-2">
// 				<option value="bank">Bank Account</option>
// 				<option value="mobile">Mobile Phone</option>
// 			</select>

// 			{withdrawMethod === "bank" && (
// 				<div className="mt-4">
// 					<label className="text-gray-300">Bank Account Number:</label>
// 					<input
// 						type="text"
// 						value={accountNumber}
// 						onChange={(e) => setAccountNumber(e.target.value)}
// 						className="w-full p-2 bg-gray-700 text-white rounded mt-2"
// 						placeholder="Enter your bank account number"
// 					/>
// 				</div>
// 			)}

// 			{withdrawMethod === "mobile" && (
// 				<div className="mt-4">
// 					<label className="text-gray-300">Mobile Phone Number:</label>
// 					<input
// 						type="text"
// 						value={mobileNumber}
// 						onChange={(e) => setMobileNumber(e.target.value)}
// 						className="w-full p-2 bg-gray-700 text-white rounded mt-2"
// 						placeholder="Enter your mobile phone number"
// 					/>
// 				</div>
// 			)}

// 			{/* Conditionally Render the Bank Visa Card */}
// 			{withdrawMethod === "bank" && (
// 				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 mt-6 rounded-lg shadow-lg text-white">
// 					<div className="flex justify-between items-center mb-4">
// 						<div className="text-lg">Bank Visa</div>
// 						<div className="text-sm">VISA</div>
// 					</div>
// 					<div className="mb-4">
// 						<div className="text-sm text-gray-300">Card Number</div>
// 						<div className="text-xl tracking-widest">**** **** **** 1234</div>
// 					</div>
// 					<div className="flex justify-between items-center">
// 						<div>
// 							<div className="text-sm text-gray-300">Expiration Date</div>
// 							<div className="text-md">12/25</div>
// 						</div>
// 						<div>
// 							<div className="text-sm text-gray-300">Card Holder</div>
// 							<div className="text-md">John Doe</div>
// 						</div>
// 					</div>
// 				</div>
// 			)}

// 			{/* Withdraw Button */}
// 			<button
// 				onClick={handleWithdraw}
// 				className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4">
// 				Withdraw
// 			</button>
// 		</div>
// 	);
// }

// export default WithdrawFunds;

// WithdrawFunds.js
import React, { useState } from "react";

function WithdrawFunds() {
	const [withdrawMethod, setWithdrawMethod] = useState("bank");
	const [accountNumber, setAccountNumber] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [notification, setNotification] = useState({ message: "", type: "" });

	const handleWithdraw = () => {
		setIsLoading(true); // Show loading animation
		setNotification({ message: "", type: "" }); // Clear any existing notifications

		// Simulate a transaction delay
		setTimeout(() => {
			setIsLoading(false); // Hide loading animation

			if (withdrawMethod === "bank" && accountNumber) {
				setNotification({ message: "Withdrawal successful!", type: "success" });
			} else if (withdrawMethod === "mobile" && mobileNumber) {
				setNotification({ message: "Withdrawal successful!", type: "success" });
			} else {
				setNotification({
					message: "Withdrawal failed. Please enter valid details.",
					type: "error",
				});
			}
		}, 2000); // Simulate a 2-second transaction time
	};

	return (
		<div className="bg-gray-800 p-6 rounded-lg shadow-md relative">
			<h2 className="text-white text-xl mb-4">Withdraw Funds</h2>

			{/* Withdraw Method Selection */}
			<label className="text-gray-300">Select Method:</label>
			<select
				value={withdrawMethod}
				onChange={(e) => setWithdrawMethod(e.target.value)}
				className="w-full p-2 bg-gray-700 text-white rounded mt-2">
				<option value="bank">Bank Account</option>
				<option value="mobile">Mobile Phone</option>
			</select>

			{/* Bank Account Input */}
			{withdrawMethod === "bank" && (
				<div className="mt-4">
					<label className="text-gray-300">Bank Account Number:</label>
					<input
						type="text"
						value={accountNumber}
						onChange={(e) => setAccountNumber(e.target.value)}
						className="w-full p-2 bg-gray-700 text-white rounded mt-2"
						placeholder="Enter your bank account number"
					/>
				</div>
			)}

			{/* Mobile Phone Input */}
			{withdrawMethod === "mobile" && (
				<div className="mt-4">
					<label className="text-gray-300">Mobile Phone Number:</label>
					<input
						type="text"
						value={mobileNumber}
						onChange={(e) => setMobileNumber(e.target.value)}
						className="w-full p-2 bg-gray-700 text-white rounded mt-2"
						placeholder="Enter your mobile phone number"
					/>
				</div>
			)}

			{/* Bank Visa Card Display */}
			{withdrawMethod === "bank" && (
				<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 mt-6 rounded-lg shadow-xl text-white">
					<div className="flex justify-between items-center mb-4">
						<div className="text-lg font-bold">Bank Visa</div>
						<div className="text-sm font-semibold">VISA</div>
					</div>
					<div className="mb-4">
						<div className="text-sm text-gray-300">Card Number</div>
						<div className="text-xl tracking-widest">**** **** **** 1234</div>
					</div>
					<div className="flex justify-between items-center">
						<div>
							<div className="text-sm text-gray-300">Expiration Date</div>
							<div className="text-md">12/25</div>
						</div>
						<div>
							<div className="text-sm text-gray-300">Card Holder</div>
							<div className="text-md">John Doe</div>
						</div>
					</div>
				</div>
			)}

			{/* Withdraw Button */}
			<button
				onClick={handleWithdraw}
				className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4">
				Withdraw
			</button>

			{/* Loading Animation */}
			{isLoading && (
				<div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
					<div className="text-white">Processing Transaction...</div>
				</div>
			)}

			{/* Notification Pop-up */}
			{notification.message && (
				<div
					className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
						notification.type === "success" ? "bg-green-500" : "bg-red-500"
					}`}>
					{notification.type === "success" ? (
						<div className="flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"></path>
							</svg>
							{notification.message}
						</div>
					) : (
						<div className="flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"></path>
							</svg>
							{notification.message}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default WithdrawFunds;
