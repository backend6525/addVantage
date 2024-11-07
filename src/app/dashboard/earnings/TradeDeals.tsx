// components/TradeDeals.js
// import { Line } from "react-chartjs-2";
// const TradeDeals = () => {
// 	const data = {
// 		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
// 		datasets: [
// 			{
// 				label: "Trade Performance",
// 				data: [5, 15, 9, 20, 18, 25],
// 				fill: false,
// 				backgroundColor: "rgba(75,192,192,0.2)",
// 				borderColor: "rgba(75,192,192,1)",
// 			},
// 		],
// 	};

// 	const options = {
// 		maintainAspectRatio: false,
// 		responsive: true,
// 	};

// 	return (
// 		<div className="bg-gray-800 text-white p-4 rounded-lg">
// 			<h3 className="mb-2">Trade deals</h3>
// 			<div style={{ height: "200px" }}>
// 				<Line data={data} options={options} />
// 			</div>
// 			<div className="flex mt-4 space-x-2">
// 				<button className="bg-red-500 p-2 rounded">Close position</button>
// 				<button className="bg-yellow-500 p-2 rounded">Adjust leverage</button>
// 				<button className="bg-green-500 p-2 rounded">Stop profit</button>
// 			</div>
// 		</div>
// 	);
// };

// export default TradeDeals;
import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const TradeDeals = () => {
	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "Trade Performance",
				data: [5, 15, 9, 20, 18, 25],
				fill: false,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
			},
		],
	};

	const options = {
		maintainAspectRatio: false,
		responsive: true,
	};

	return (
		<div className="bg-gray-800 text-white p-4 rounded-lg">
			<h3 className="mb-2">Trade deals</h3>
			<div style={{ height: "200px" }}>
				<Line data={data} options={options} />
			</div>
			<div className="flex mt-4 space-x-2">
				<button className="bg-red-500 p-2 rounded">Close position</button>
				<button className="bg-yellow-500 p-2 rounded">Adjust leverage</button>
				<button className="bg-green-500 p-2 rounded">Stop profit</button>
			</div>
		</div>
	);
};

export default TradeDeals;
