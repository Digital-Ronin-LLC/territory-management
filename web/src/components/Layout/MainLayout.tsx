import React, { useState, useEffect } from 'react';
import './MainLayout.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Toggle class on body for responsive styling
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-closed');
    } else {
      document.body.classList.remove('sidebar-closed');
    }
  };

  // Set initial body class based on sidebar state
  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.classList.add('sidebar-closed');
    } else {
      document.body.classList.remove('sidebar-closed');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-closed');
    };
  }, []);

  return (
    <div className="main-layout">
      <Sidebar isOpen={isSidebarOpen} />
      <Header toggleSidebar={toggleSidebar} />
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
