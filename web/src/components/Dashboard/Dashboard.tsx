import React, { useState, useEffect } from 'react';
import mockData from '../../utils/mockData';
import { formatNumber, formatCurrency } from '../../utils/chartUtils';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';
import MetricCard from './widgets/MetricCard';
import BarChartWidget from './widgets/BarChartWidget';
import PieChartWidget from './widgets/PieChartWidget';
import FunnelChartWidget from './widgets/FunnelChartWidget';
import ColumnChartWidget from './widgets/ColumnChartWidget';
import DashboardTabs from './DashboardTabs';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState(mockData);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="dashboard-container">
      <DashboardTabs />
      <DashboardHeader />
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Top row */}
          <div className="dashboard-row">
            <MetricCard 
              title="YTD Quote Count" 
              value={formatNumber(data.quotePremium.quoteCount)}
              subtitle="View Report (Production KPI Report)" 
              isLoading={isLoading}
            />
            <MetricCard 
              title="YTD New Quote Premium" 
              value={formatCurrency(data.quotePremium.quotePremium)}
              subtitle="View Report (Production KPI Report)" 
              isLoading={isLoading}
            />
            <PieChartWidget
              title="My Team's Call Average Report"
              subtitle="View Report (My Team's Call Average Report)"
              data={data.callAverage.data}
              centerText={data.callAverage.average.toString()}
              colors={['#5aaafa', '#8cd211', '#41d6c3', '#ba8ff7']}
              isLoading={isLoading}
            />
            <PieChartWidget
              title="My Team Sales Activities"
              subtitle="View Report (My Team Sales Activities)"
              data={data.salesActivities.breakdown}
              centerText={formatNumber(data.salesActivities.total)}
              colors={data.salesActivities.breakdown.map(item => item.color)}
              isLoading={isLoading}
            />
          </div>
          
          {/* Second row */}
          <div className="dashboard-row">
            <MetricCard 
              title="YTD New Application Count" 
              value={formatNumber(data.quotePremium.appCount)}
              subtitle="View Report (Production KPI Report)" 
              isLoading={isLoading}
            />
            <MetricCard 
              title="YTD New App Premium" 
              value={formatCurrency(data.quotePremium.appPremium)}
              subtitle="View Report (Production KPI Report)" 
              isLoading={isLoading}
            />
            <ColumnChartWidget
              title="My Team's Completed Call Notes by LOB"
              subtitle="View Report (My Team's Completed Call Notes by LOB)"
              data={data.callNotesByLOB}
              isLoading={isLoading}
            />
            <FunnelChartWidget
              title="Agencies AMSP Not Updated in 12 Team"
              subtitle="View Report (Agencies AMSP Not Updated in 12 Team)"
              data={data.amspNotUpdated}
              isLoading={isLoading}
            />
          </div>
          
          {/* Third row */}
          <div className="dashboard-row">
            <BarChartWidget
              title="Agencies Not Reached With Field - My Team"
              subtitle="View Report (Agencies Not Reached With Field - My Team)"
              data={data.agenciesNotReached}
              isLoading={isLoading}
            />
            <BarChartWidget
              title="My Team's Open commitments"
              subtitle="View Report (My Team's Open commitments)"
              data={data.openCommitments}
              isLoading={isLoading}
            />
            <FunnelChartWidget
              title="My Review Locations Completed 30days"
              subtitle="View Report (My Review Locations Completed 30days)"
              data={[{ name: 'Overdue', value: data.reviewLocations.overdue }]}
              isLoading={isLoading}
            />
          </div>
          
          {/* Fourth row */}
          <div className="dashboard-row">
            <FunnelChartWidget
              title="My Onboarding Task Completed in 5days"
              subtitle="View Report (My Onboarding Task Completed in 5days)"
              data={[
                { name: 'On-Time', value: data.onboardingTask.onTime },
                { name: 'Overdue', value: data.onboardingTask.overdue }
              ]}
              isLoading={isLoading}
            />
            <FunnelChartWidget
              title="My Team's Agencies with Field Visit YTD"
              subtitle="View Report (My Team's Agencies with Field Visit YTD)"
              data={[
                { name: 'Yes', value: data.fieldVisit.contactedAgencies },
                { name: 'No', value: data.fieldVisit.notContactedAgencies }
              ]}
              isLoading={isLoading}
            />
            <FunnelChartWidget
              title="My Update AMSP Task Completed in 30days"
              subtitle="View Report (My Update AMSP Task Completed in 30days)"
              data={[
                { name: 'Overdue', value: data.amspTaskCompletion.overdue }
              ]}
              isLoading={isLoading}
            />
          </div>
          
          {/* Fifth row */}
          <div className="dashboard-row">
            <PieChartWidget
              title="Field Visit w/i 90 Days New Appt"
              subtitle="View Report (Field Visit w/i 90 Days New Appt)"
              data={[
                { name: 'Field visit in last 90', value: data.fieldVisitIn90Days.visitInLast90 },
                { name: 'No field visit in last 90', value: data.fieldVisitIn90Days.noVisitInLast90 }
              ]}
              centerText={formatNumber(data.fieldVisitIn90Days.total)}
              colors={['#5aaafa', '#41d6c3']}
              isLoading={isLoading}
            />
            <ColumnChartWidget
              title="Prospect Agent Conversion Report"
              subtitle="View Report (Prospect Agent Conversion Report)"
              data={data.prospectConversion}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
