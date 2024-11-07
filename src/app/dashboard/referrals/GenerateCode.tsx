import React, { useState } from "react";

const GenerateCodeCard: React.FC = () => {
	const [code, setCode] = useState("");
	const [copied, setCopied] = useState(false);

	const generateCode = () => {
		const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
		setCode(newCode);
		setCopied(false);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
	};

	return (
		<div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Generate a Shareable Code
			</h2>
			<button
				onClick={generateCode}
				className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-150 ease-in-out mb-4">
				Generate Code
			</button>
			{code && (
				<div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-inner flex justify-between items-center">
					<p className="text-lg font-semibold tracking-wider overflow-auto">
						{code}
					</p>
					<button
						onClick={handleCopy}
						className={`ml-4 px-4 py-2 rounded-lg font-semibold transition ${
							copied
								? "bg-green-500 text-white"
								: "bg-gray-700 text-gray-300 hover:bg-gray-600"
						}`}>
						{copied ? "Copied!" : "Copy"}
					</button>
				</div>
			)}
		</div>
	);
};

export default GenerateCodeCard;
