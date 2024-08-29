// import React from 'react';
// import Button from '../../ui/Button';

// function BottomSidemenu() {
//   const menuList = [
//     {
//       id: 1,
//       name: 'Github',
//       icon: 'icon',
//       path: '',
//     },
//     {
//       id: 2,
//       name: 'Github',
//       icon: 'icon',
//       path: '',
//     },
//     {
//       id: 3,
//       name: 'Archive',
//       icon: 'icon',
//       path: '',
//     },
//   ];

//   return (
//     <div>
//       {menuList.map((menu) => (
//         <h2 key={menu.id} className='py-2'>
//           <menu.icon />{menu.name}
//         </h2>
//       ))}

//     </div>
//   );
// }

// export default BottomSidemenu;
import React from "react";
import { FiGithub, FiArchive } from "react-icons/fi"; // Import icons

function BottomSidemenu() {
	const menuList = [
		{
			id: 1,
			name: "GitHub",
			icon: FiGithub, // Use a valid icon component
			path: "https://github.com",
		},
		{
			id: 2,
			name: "Docs",
			icon: FiGithub, // Use a different icon or change label to "Docs"
			path: "https://docs.github.com",
		},
		{
			id: 3,
			name: "Archive",
			icon: FiArchive, // Use a valid icon component
			path: "/archive",
		},
	];

	return (
		<div className="mt-6">
			{menuList.map((menu) => (
				<a
					key={menu.id}
					href={menu.path}
					className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
					target="_blank"
					rel="noopener noreferrer">
					<menu.icon className="mr-3" size={20} />
					<span className="font-medium">{menu.name}</span>
				</a>
			))}
		</div>
	);
}

export default BottomSidemenu;
