"use client";
import React from "react";
import { motion } from "framer-motion";
import BalanceDisplay from "./Balance";
import PortfolioItem from "./EarningPortfolio";
import KeyMetrics from "./KeyMetrics";
import TradeDeals from "./TradeDeals";
import WithdrawFunds from "./WithdrawFunds";

function Page() {
	return (
		<div className="bg-black min-h-screen flex flex-col">
			{/* Main Content Area */}
			<div className="flex flex-1 mt-[6rem] px-4">
				{" "}
				{/* Reduced margin-top and padding-x */}
				{/* Main Content */}
				<div className="flex-1">
					{/* Balance and Key Metrics */}
					<motion.div
						className="flex space-x-4 items-start"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}>
						<motion.div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-md">
							<BalanceDisplay />
						</motion.div>
						<motion.div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105">
							<KeyMetrics />
						</motion.div>
					</motion.div>
					{/* Portfolio and Trade Deals */}
					<motion.div
						className="grid grid-cols-2 gap-4 mt-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ staggerChildren: 0.2 }}>
						{/* Portfolio Items Section */}
						<motion.div
							className="space-y-4"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							<h2 className="text-white text-xl font-semibold mb-4">
								Portfolio Balance
							</h2>
							{/* Portfolio Items */}
							<motion.div
								className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105"
								whileHover={{ scale: 1.05 }}>
								<PortfolioItem
									icon="/usdc.png"
									name="Chaina TWN"
									value="$36,029.56"
									amount="36,029.0 USDC"
									change={-0.01}
								/>
							</motion.div>
							{/* Additional Portfolio Items */}
							<motion.div
								className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105"
								whileHover={{ scale: 1.05 }}>
								<PortfolioItem
									icon="/avax.png"
									name="Avalanche"
									value="$28,558.19"
									amount="1,558.5 AVAX"
									change={14.16}
								/>
							</motion.div>
							<motion.div
								className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105"
								whileHover={{ scale: 1.05 }}>
								<PortfolioItem
									icon="/ftt.png"
									name="FTX Token"
									value="$10,000.00"
									amount="409.71 FTT"
									change={9.75}
								/>
							</motion.div>
						</motion.div>
						{/* Trade Deals Section */}
						<motion.div
							className="pl-2 border-l border-gray-700"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							<motion.div>
								<TradeDeals />
							</motion.div>
							<motion.div
								className="space-y-4 mt-4 bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105"
								animate={{ y: [0, -10, 0] }}
								transition={{ duration: 1, repeat: 6 }}>
								<WithdrawFunds />
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default Page;
