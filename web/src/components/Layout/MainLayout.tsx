import React, { useState } from 'react';
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
  };

  return (
    <div className="main-layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content-area">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
