// import Image from "next/image";
// import { FaTwitch, FaInstagram, FaWhatsapp } from "react-icons/fa";
// import SidebarCard from "./sidebarCard";
// export default function Profile() {
// 	return (
// 		<div className="bg-black text-gray-100 min-h-screen pt-[6rem] ">
// 			{/* Profile Header Section */}
// 			<div className="relative">
// 				{/* Banner Image */}
// 				<div className="w-full h-64 bg-gray-700 overflow-hidden shadow-2xl">
// 					<Image
// 						src="/Banner.webp" // Replace with your image path
// 						alt="Banner Image"
// 						layout="fill"
// 						objectFit="cover"
// 						className="w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105"
// 					/>
// 				</div>

// 				{/* Profile Picture and Name */}
// 				<div className="absolute top-[12rem] left-4 md:left-8 lg:left-12 flex items-start">
// 					<div className="rounded-full w-32 h-32 md:w-40 md:h-40 bg-yellow-400 overflow-hidden border-4 border-gray-900 shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
// 						<Image
// 							src="/profile-pic.jpg" // Replace with your image path
// 							alt="Profile Image"
// 							width={128}
// 							height={128}
// 							className="object-cover"
// 						/>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Profile Info Section */}
// 			<div className="mt-24 flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl">
// 				<div className="flex flex-col mb-6 md:mb-0">
// 					<h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
// 						Spy Thirtythree
// 					</h1>
// 					<p className="text-gray-400">@Cameronwilliamson</p>
// 				</div>

// 				<div className="flex flex-col items-center mb-6 md:mb-0">
// 					<div className="flex items-center space-x-6">
// 						<div className="flex items-center">
// 							<FaTwitch className="text-blue-500 mr-2" />
// 							<p className="text-lg">
// 								<span className="text-sm">1845</span> Twitter
// 							</p>
// 						</div>
// 						<div className="flex items-center">
// 							<FaInstagram className="text-pink-500 mr-2" />
// 							<p className="text-lg">
// 								<span className="text-sm">1504</span> Instagram
// 							</p>
// 						</div>
// 						<div className="flex items-center">
// 							<FaWhatsapp className="text-green-500 mr-2" />
// 							<p className="text-lg">
// 								<span className="text-sm">1504</span> WhatsApp
// 							</p>
// 						</div>
// 					</div>
// 				</div>

// 				<div>
// 					<button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
// 						Follow
// 					</button>
// 				</div>
// 			</div>

// 			{/* Navigation Bar */}
// 			<div className="mt-8 flex justify-start md:justify-start space-x-8 border-b-2 border-gray-700 px-6">
// 				<a
// 					href="#"
// 					className="pb-2 border-b-4 border-blue-500 text-blue-500 font-semibold transition duration-200 hover:text-blue-400">
// 					History
// 				</a>
// 				<a
// 					href="#"
// 					className="pb-2 border-b-4 border-transparent text-gray-400 hover:border-blue-500 hover:text-blue-500 transition duration-200">
// 					Portfolio
// 				</a>
// 				<a
// 					href="#"
// 					className="pb-2 border-b-4 border-transparent text-gray-400 hover:border-blue-500 hover:text-blue-500 transition duration-200">
// 					Collection
// 				</a>
// 			</div>
// 		</div>
// 	);
// }
// components/Profile.js
import Image from "next/image";
import { FaTwitch, FaInstagram, FaWhatsapp } from "react-icons/fa";
import SidebarCard from "./sidebarCard";

export default function Profile() {
	return (
		<div className="bg-black text-gray-100 min-h-screen pt-[6rem] px-6">
			<div className="flex flex-col lg:flex-row lg:justify-between">
				{/* Main Profile Section */}
				<div className="flex-1">
					{/* Profile Header Section */}
					<div className="relative">
						{/* Banner Image */}
						<div className="w-full h-64 bg-gray-700 overflow-hidden shadow-2xl">
							<Image
								src="/Banner.webp" // Replace with your image path
								alt="Banner Image"
								layout="fill"
								objectFit="cover"
								className="w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105"
							/>
						</div>

						{/* Profile Picture and Name */}
						<div className="absolute top-[12rem] left-4 md:left-8 lg:left-12 flex items-start">
							<div className="rounded-full w-32 h-32 md:w-40 md:h-40 bg-yellow-400 overflow-hidden border-4 border-gray-900 shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
								<Image
									src="/profile-pic.jpg" // Replace with your image path
									alt="Profile Image"
									width={128}
									height={128}
									className="object-cover"
								/>
							</div>
						</div>
					</div>

					{/* Profile Info Section */}
					<div className="mt-24 flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl">
						<div className="flex flex-col mb-6 md:mb-0">
							<h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
								Spy Thirtythree
							</h1>
							<p className="text-gray-400">@Cameronwilliamson</p>
						</div>

						<div className="flex flex-col items-center mb-6 md:mb-0">
							<div className="flex items-center space-x-6">
								<div className="flex items-center">
									<FaTwitch className="text-blue-500 mr-2" />
									<p className="text-lg">
										<span className="text-sm">1845</span> Twitter
									</p>
								</div>
								<div className="flex items-center">
									<FaInstagram className="text-pink-500 mr-2" />
									<p className="text-lg">
										<span className="text-sm">1504</span> Instagram
									</p>
								</div>
								<div className="flex items-center">
									<FaWhatsapp className="text-green-500 mr-2" />
									<p className="text-lg">
										<span className="text-sm">1504</span> WhatsApp
									</p>
								</div>
							</div>
						</div>

						<div>
							<button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
								Follow
							</button>
						</div>
					</div>

					{/* Navigation Bar */}
					<div className="mt-8 flex justify-start md:justify-start space-x-8 border-b-2 border-gray-700 px-6">
						<a
							href="#"
							className="pb-2 border-b-4 border-blue-500 text-blue-500 font-semibold transition duration-200 hover:text-blue-400">
							History
						</a>
						<a
							href="#"
							className="pb-2 border-b-4 border-transparent text-gray-400 hover:border-blue-500 hover:text-blue-500 transition duration-200">
							Portfolio
						</a>
						<a
							href="#"
							className="pb-2 border-b-4 border-transparent text-gray-400 hover:border-blue-500 hover:text-blue-500 transition duration-200">
							Collection
						</a>
					</div>
				</div>

				{/* Sidebar Section */}
				<div className="mt-10 lg:mt-0 lg:ml-8 lg:w-[300px]">
					<SidebarCard />
				</div>
			</div>
		</div>
	);
}
