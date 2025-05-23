import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-title-container">
        <h1 className="sidebar-title">Territory Management</h1>
      </div>
      
      <nav className="sidebar-navigation">
        <ul className="menu-items">
          <li className="menu-item active">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-tachometer-alt"></i>
              <span className="menu-text">Dashboard</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-users"></i>
              <span className="menu-text">Accounts</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-address-book"></i>
              <span className="menu-text">Contacts</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-chart-line"></i>
              <span className="menu-text">Sales Plan</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-calendar"></i>
              <span className="menu-text">Calendar</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-tasks"></i>
              <span className="menu-text">Tasks</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-file-alt"></i>
              <span className="menu-text">Reports</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon fa fa-cog"></i>
              <span className="menu-text">Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
