import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import mockData from '../../utils/mockData';
import { formatNumber, formatCurrency } from '../../utils/chartUtils';
import PyramidChartWidget from '../../components/PyramidChartWidget'; // Assuming this component exists

const Dashboard: React.FC = () => {
  const [data, setData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // You can fetch actual data here if needed
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="chart-item">
        <PyramidChartWidget
          title="My Team's Agency Prod Commitments YTD"
          subtitle="View Report (My Team's Agency Prod Commitments YTD)"
          data={data.agencyProdCommitments}
          isLoading={isLoading}
          variant="gradient"
          labelPosition="right"
          totalLabel="Total Agencies"
        />
      </div>
      
      <div className="chart-item">
        <PyramidChartWidget
          title="My Update AMSP Task Completed in 30days"
          subtitle="View Report (My Update AMSP Task Completed in 30days)"
          data={[
            { name: 'On-Time', value: data.updateAmspTask.onTime, color: '#4CAF50' },
            { name: 'Overdue', value: data.updateAmspTask.overdue, color: '#FF5733' }
          ]}
          isLoading={isLoading}
          labelPosition="right"
          variant="layered"
          totalLabel="Total Tasks"
        />
      </div>
    </div>
  );
};

export default Dashboard;