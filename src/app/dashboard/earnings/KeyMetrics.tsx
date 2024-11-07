import React from "react";

function KeyMetrics() {
	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="bg-gray-800 text-white p-4 rounded-lg">
				<h3 className="text-lg">Trades</h3>
				<p className="text-xl">140 ↑</p>
				<p className="text-sm text-green-400">+5% / 24h</p>
			</div>
			<div className="bg-gray-800 text-white p-4 rounded-lg">
				<h3 className="text-lg">Revenue</h3>
				<p className="text-xl">$1,790.00 ↑</p>
				<p className="text-sm text-green-400">+4.29%</p>
			</div>
			<div className="bg-gray-800 text-white p-4 rounded-lg">
				<h3 className="text-lg">Marginal profit</h3>
				<p className="text-xl">$1,000.95 ↓</p>
				<p className="text-sm text-red-400">-2.85%</p>
			</div>
		</div>
	);
}

export default KeyMetrics;
