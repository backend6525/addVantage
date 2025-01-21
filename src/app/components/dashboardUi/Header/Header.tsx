('');
import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar';

// Define the search input properties for the Navbar

function Header() {
	const searchInput = {
		placeholder: 'Search dashboard tasks',
		// Add any other properties or event handlers you need for the search input
	};
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<Navbar search={searchInput} setIsMenuOpen={setIsMenuOpen} />
		</>
	);
}
export default Header;
