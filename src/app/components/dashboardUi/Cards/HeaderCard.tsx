import React, { useRef } from "react";
import {
	SocialIcon1,
	SocialIcon2,
	SocialIcon3,
	SocialIcon4,
	SocialIcon5,
} from "./SocialIcons";
import "./styles/headercard.css";

const HeaderCard = () => {
	const scrollRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container

	const handleScroll = (direction: string) => {
		if (scrollRef.current) {
			// Cast firstChild to HTMLElement to access clientWidth
			const firstIcon = scrollRef.current.firstChild as HTMLElement | null;
			const scrollAmount = firstIcon?.clientWidth || 150; // Adjust based on the width of the icons

			if (direction === "left") {
				scrollRef.current.scrollLeft -= scrollAmount; // Scroll left
			} else {
				scrollRef.current.scrollLeft += scrollAmount; // Scroll right
			}
		}
	};

	return (
		<div className="headercard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{/* Card 1 */}
			<div className="glass-card flex flex-col items-center justify-center p-6 relative">
				<h2 className="text-lg font-bold text-white">Choose platform</h2>
				<input
					type="text"
					placeholder="Search your content or Canva's"
					className="glass-input w-full mt-4 p-2 rounded"
				/>
				<div className="relative w-full mt-4">
					{/* Social Icons Container */}
					<div
						className="icon-container flex space-x-8 overflow-hidden scroll-smooth"
						ref={scrollRef}>
						<div className="icon-wrapper">
							<SocialIcon1 />
						</div>
						<div className="icon-wrapper">
							<SocialIcon2 />
						</div>
						<div className="icon-wrapper">
							<SocialIcon3 />
						</div>
						<div className="icon-wrapper">
							<SocialIcon4 />
						</div>
						<div className="icon-wrapper">
							<SocialIcon5 />
						</div>
						<div className="icon-wrapper">
							<SocialIcon5 />
						</div>
						{/* Add more icons as needed */}
					</div>

					{/* Navigation Buttons */}
					<button
						className="nav-button left-button"
						onClick={() => handleScroll("left")}>
						&#9664;
					</button>
					<button
						className="nav-button right-button"
						onClick={() => handleScroll("right")}>
						&#9654;
					</button>
				</div>
			</div>

			{/* Card 2 */}
			<div className="glass-card flex flex-col items-center justify-center p-6">
				<h3 className="text-lg font-semibold text-white">Expense Breakdown</h3>
				<div className="w-full bg-gray-700 rounded-full mt-4 h-4 overflow-hidden">
					<div className="bg-purple-500 h-full w-2/3"></div>
				</div>
				<div className="flex justify-between w-full mt-4 text-white text-sm">
					<span>Billing: 57%</span>
					<span>Others: 43%</span>
				</div>
			</div>

			{/* Card 3 */}
			<div className="glass-card flex flex-col items-center justify-center p-6">
				<h3 className="text-lg font-semibold text-white">Cashflow</h3>
				<div className="chart-placeholder w-full mt-4 h-32 bg-gray-700"></div>
				<div className="w-full flex justify-between items-center mt-4 text-white text-sm">
					<span>Inflow: $38,318.00</span>
					<span>Outflow: $17,254.00</span>
				</div>
			</div>
		</div>
	);
};

export default HeaderCard;
