import React from "react";

const UpCard = () => {
	return (
		<div className="bg-black text-white p-6 rounded-lg shadow-lg text-center">
			<div className="mb-4">
				{/* Replace with your 3D graphic */}
				<img
					src="/i-rem2.png"
					alt="3D Graphic"
					className="mx-auto w-24 h-auto"
				/>
			</div>
			<h2 className="text-1xl  mb-4">Explore pro Features</h2>
			<button className="bg-blue-800 hover:bg-blue-600 text-white  py-2 px-9 rounded">
				Upgrade
			</button>
		</div>
	);
};

export default UpCard;
