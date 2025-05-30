('');
import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar';

// Define the search input properties for the Navbar
interface HeaderProps {
	onMenuToggle: () => void;
	userStatus: {
		email: string;
		dailyAdCount: number;
		weeklyAdCount: number;
		dailyAdLimit: number;
		weeklyAdLimit: number;
		hasCredits: boolean;
		credits: number;
		accountType: 'free' | 'pro' | 'enterprise';
		lastLimitReset: string;
	};
}

function Header({ onMenuToggle, userStatus }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<Navbar
				search=''
				setIsMenuOpen={setIsMenuOpen}
				onMenuToggle={onMenuToggle}
				userStatus={{
					isOnline: true,
					lastSeen: new Date().toISOString(),
				}}
			/>
		</>
	);
}
export default Header;
