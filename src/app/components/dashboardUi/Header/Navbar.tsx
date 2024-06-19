import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Brand from '../../ui/Brand';

// Define a type for the search input properties
type SearchInputProps = {
  placeholder: string;
  // Add any other properties or event handlers you need for the search input
};

// Navigation data
const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/discovery', label: 'Discovery' },
  { href: '/customers', label: 'Customers' },
  { href: '/messages', label: 'Messages' },
  { href: '/help', label: 'Help' },
];

// Dropdown options data
// const dropdownOptions = [
//   { href: '/profile', label: 'Profile' },
//   { href: '/settings', label: 'Settings' },
//   { href: '/logout', label: 'Logout' },
// ];

const dropdownOptions = [
  { href: '/profile', label: 'Arnold Asiimwe', email: 'asiimwearnold25@gmail.com' },
  { href: '/settings', label: 'Settings' },
  { href: '/purchase-history', label: 'Purchase history' },
  { href: '/get-help', label: 'Get help' },
  { href: '/suggest-improvement', label: 'Suggest improvement' },
  { href: '/get-apps', label: 'Get the Canva Apps' },
  { href: '/refer-friends', label: 'Refer friends' },
  { href: '/create-team', label: 'Create a team' },
  { href: '/report-content', label: 'Report content' },
  { href: '/privacy-policy', label: 'Privacy policy' },
  { href: '/logout', label: 'Sign out' },
];

// Define a type for the Navbar props
type NavbarProps = {
  search: SearchInputProps;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ search, setIsMenuOpen }: NavbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="text-white text-xl">
           <Brand/> 
        </div>
      <ul className="hidden md:flex md:items-center space-x-4 lg:space-x-6 xl:space-x-8">
        {navItems.map((item) => (
          <li key={item.label} className="text-white hover:text-gray-300">
            <Link href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center ml-4">
        <input
          type="search"
          {...search}
          className="p-2 bg-gray-700 text-white placeholder-gray-400 rounded sm:w-48 md:w-64 lg:w-80 xl:w-96"
        />
        <button className="text-white hover:text-gray-300 ml-2">
          {/* Notification Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.708V4a1 1 0 10-2 0v.292A7.002 7.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m0 0a3.001 3.001 0 006 0M9 21h6" />
          </svg>
        </button>
        <div className="relative ml-4">
          <button
            className="flex items-center text-white hover:text-gray-300"
            onClick={toggleDropdown}
          >
            <div className="rounded-full overflow-hidden">
              {/* <Image
                src="https://via.placeholder.com/30"
                alt="User"
                width={30}
                height={30}
              /> */}
              <img 
                src="https://via.placeholder.com/30" 
                alt="User" 
                className="w-8 h-8 rounded-full"
              /> 
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
              {dropdownOptions.map((option, index) => (
                <Link key={index} href={option.href} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  {option.label === 'Arnold Asiimwe' ? (
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="User"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <div>{option.label}</div>
                        <div className="text-sm text-gray-500">{option.email}</div>
                      </div>
                    </div>
                  ) : (
                    option.label
                  )}
                </Link>
              ))}
            </div>
          )}
         
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
