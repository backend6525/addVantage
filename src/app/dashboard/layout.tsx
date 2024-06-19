
'use client'


// layouts/DashboardLayout.tsx
import React, { ReactNode, useState } from 'react';
import Header from '../components/dashboardUi/Header';
import SideMenu from '../components/dashboardUi/SideMenu';
import Footer from '../components/dashboardUi/Footer'; // Make sure you have a Footer component

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define searchProps based on your requirements
  const searchProps = {
    placeholder: 'Search...',
    // ... other properties
  };

  return (
    <div className="dark:bg-black dark:text-bodydark flex flex-col min-h-screen">
      <div  style={{ position: 'sticky', top: 0 }} >
      <Header  />
      </div>
      
      <div className="flex flex-1  " >
{/*         
        <SideMenu isMenuOpen={isMenuOpen} /> */}
          <SideMenu isMenuOpen={isMenuOpen} />
        <main className="flex-1">{children}</main>
      </div>
      <Footer /> {/* Your footer component */}
    </div>
  );
};

export default DashboardLayout;








