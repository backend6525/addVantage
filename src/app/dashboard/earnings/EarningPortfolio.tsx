import React from "react";

interface EarningPortfolioProps {
	icon: string;
	name: string;
	value: string;
	amount: string;
	change: number;
}

function EarningPortfolio({
	icon,
	name,
	value,
	amount,
	change,
}: EarningPortfolioProps) {
	return (
		<div className="flex items-center justify-between p-4  text-white rounded-lg">
			<div className="flex items-center">
				<img src={icon} alt={name} className="w-10 h-10 mr-4" />
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-xs">{amount}</p>
				</div>
			</div>
			<div>
				<p className="font-semibold">{value}</p>
				<p
					className={`text-sm ${change > 0 ? "text-green-400" : "text-red-400"}`}>
					{change}%
				</p>
			</div>
		</div>
	);
}

export default EarningPortfolio;
