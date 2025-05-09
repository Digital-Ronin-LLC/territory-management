import React from 'react';
import './DashboardHeader.css';

const DashboardHeader: React.FC = () => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-title">
        <div className="dashboard-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </div>
        <div className="title-info">
          <h1>IA Sales Director</h1>
          <p className="subtitle">IA Sales Director</p>
          <p className="view-info">As of May 7, 2025, 2:35 PM Viewing as Carrie Poindexter <a href="#">Change</a></p>
        </div>
      </div>
      <div className="dashboard-actions">
        <button className="action-button">Open</button>
        <button className="action-button">Refresh</button>
        <button className="action-button dropdown">
          <span className="dropdown-icon">▼</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
