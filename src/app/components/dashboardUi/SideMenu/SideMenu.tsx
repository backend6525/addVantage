import React from 'react'
import Link from 'next/link';

const navItems = [
    { href: '/', label: 'AddStudio' },
    // { href: '/discovery', label: 'BulkSms' },
    { href: '/', label: 'Earnings' },
    // { href: '/discovery', label: 'BuyIndex' },
    // { href: '/', label: '' },
    // { href: '/discovery', label: 'Discovery' },
    // ... other nav items
  ];
// ... other imports

const SideMenu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <aside className={`${isMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-gray-800 p-4`}>
      <ul className="py-32">
        {navItems.map((item) => (
          <li key={item.label} className="px-4 py-2">
            <Link href={item.href} className="text-white hover:text-gray-300">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;