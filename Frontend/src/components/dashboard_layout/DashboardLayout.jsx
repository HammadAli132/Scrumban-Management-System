import React, { useEffect } from 'react';
import Navbar from './DashboardNavbar';
import { useNavigate } from 'react-router-dom';

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user"); // check if session exists
    if (!isAuthenticated) {
      navigate("/"); // redirect to home if authenticated
    }
  }, [navigate]);

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