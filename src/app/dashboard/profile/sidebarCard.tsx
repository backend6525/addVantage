import Image from "next/image";
import { FaBitcoin, FaEthereum, FaDollarSign } from "react-icons/fa";

export default function SidebarCard() {
	return (
		<div className="bg-gray-800 shadow-lg rounded-lg w-80 p-6 text-center text-gray-100">
			{/* Profile Picture */}
			<div className="flex justify-center">
				<div className="w-20 h-20 rounded-full overflow-hidden bg-yellow-300 mb-4">
					<Image
						src="/profile-pic.jpg" // Replace with your image path
						alt="Profile Picture"
						width={80}
						height={80}
						className="object-cover"
					/>
				</div>
			</div>

			{/* Balance Section */}
			<div className="text-gray-400 text-sm mb-2">MY BALANCE</div>
			<div className="text-3xl font-bold text-gray-100 mb-4">$0</div>
			<button className="border-dashed border-2 border-gray-500 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700">
				+ TOP UP BALANCE
			</button>

			{/* Navigation Buttons */}
			<div className="mt-6 flex justify-around text-gray-400 text-sm font-semibold">
				<button className="focus:outline-none">BUY</button>
				<button className="focus:outline-none">SELL</button>
				<button className="focus:outline-none">SEND</button>
				<button className="bg-gray-700 text-white px-4 py-1 rounded-lg">
					EXCHANGE
				</button>
			</div>

			{/* Coin Conversion Section */}
			<div className="mt-6">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-2">
						<FaBitcoin className="text-orange-500" />
						<span>BTC</span>
					</div>
					<input
						type="number"
						placeholder="0"
						className="w-24 text-right bg-gray-700 border-b-2 border-gray-500 focus:outline-none text-gray-100"
					/>
				</div>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-2">
						<FaDollarSign className="text-blue-500" />
						<span>USD</span>
					</div>
					<input
						type="number"
						placeholder="0.0000"
						className="w-24 text-right bg-gray-700 border-b-2 border-gray-500 focus:outline-none text-gray-100"
					/>
				</div>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-2">
						<FaEthereum className="text-green-500" />
						<span>ETH</span>
					</div>
					<input
						type="number"
						placeholder="0.0000"
						className="w-24 text-right bg-gray-700 border-b-2 border-gray-500 focus:outline-none text-gray-100"
					/>
				</div>
			</div>

			{/* Process Button */}
			<button className="bg-gray-700 text-white w-full py-3 rounded-lg mt-4">
				PROCESS TO WALLET
			</button>

			{/* Available Coins */}
			<div className="mt-6 text-gray-400 text-xs">AVAILABLE COIN</div>
		</div>
	);
}
