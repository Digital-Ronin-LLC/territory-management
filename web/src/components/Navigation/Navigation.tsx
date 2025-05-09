import React from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="app-title">
        <div className="app-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm12 10H9v-2h6v2zm0-4H9V9h6v2z"/>
          </svg>
        </div>
        <span>Territory Management</span>
      </div>
      <ul className="nav-items">
        <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Accounts</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Contacts</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Sales Plan</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Calendar</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Tasks</a></li>
        <li className="nav-item active"><a href="#" className="nav-link">Dashboards</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Reports</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Sales Team Setup</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Deployment Scoring Model</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Knowledge</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Goals</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Files</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;
