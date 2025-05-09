import React from 'react';
import './DashboardTabs.css';

const DashboardTabs: React.FC = () => {
  return (
    <div className="dashboard-tabs">
      <div className="tab">My Tasks</div>
      <div className="tab">My Team's Tasks</div>
      <div className="tab active">Dashboard</div>
    </div>
  );
}

export default DashboardTabs;
