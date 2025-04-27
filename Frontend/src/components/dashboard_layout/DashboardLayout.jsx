import React from 'react';
import Navbar from './DashboardNavbar';


function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;