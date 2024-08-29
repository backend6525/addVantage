import React from "react";

const comparisonData = {
	imageSrc: "https://via.placeholder.com/50",
	title: "Get Detailed Comparison Insights",
	description:
		"Its now possible, you can advertise on a daily charge of 1000ugx",
	buttonText: "Create Add",
};

const ComparisonCard = () => {
	return (
		<div className="flex items-center bg-blue-50 p-4 rounded-md shadow-md">
			<div className="flex items-center space-x-4">
				<img
					src={comparisonData.imageSrc}
					alt="Comparison Icon"
					className="w-12 h-12"
				/>
				<div>
					<h2 className="text-lg font-bold">{comparisonData.title}</h2>
					<p className="text-sm text-gray-600">{comparisonData.description}</p>
				</div>
			</div>
			<div className="ml-auto">
				<div className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
					{comparisonData.buttonText}
				</div>
			</div>
		</div>
	);
};

export default ComparisonCard;
