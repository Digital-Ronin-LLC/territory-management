import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import mockData from '../../utils/mockData';
import { formatNumber, formatCurrency } from '../../utils/chartUtils';
import MetricCard from '../../components/Dashboard/widgets/MetricCard';
import BarChartWidget from '../../components/Dashboard/widgets/BarChartWidget';
import PieChartWidget from '../../components/Dashboard/widgets/PieChartWidget';
import PyramidChartWidget from '../../components/Dashboard/widgets/PyramidChartWidget';
import ColumnChartWidget from '../../components/Dashboard/widgets/ColumnChartWidget';

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

  // Transform AMSP data to include colors by state
  const amspNotUpdatedColored = data.amspNotUpdated.map(item => ({
    ...item,
    color: getStateColor(item.name)
  }));

  // Transform agencies not reached with field to include colors by state
  const agenciesNotReachedColored = data.agenciesNotReached.map(item => {
    // Extract state from name if it contains a state code
    let stateName = null;
    const stateMatch = item.name.match(/\b(AK|AL|AR|AZ|CA|CO|CT|FL|GA|IA|IL|NY|OH|TX|WA)\b/);
    if (stateMatch) {
      stateName = stateMatch[0];
    }
    
    return {
      ...item,
      color: stateName ? getStateColor(stateName) : undefined
    };
  });

  // Helper function to get colors for states
  function getStateColor(stateName: string): string {
    const stateColors: Record<string, string> = {
      'AZ': '#3399FF',
      'AK': '#33CCCC', 
      'CA': '#FFCC33',
      'AL': '#FF6633',
      'AR': '#9966CC',
      'CO': '#33CC66',
      'CT': '#6666FF',
      'FL': '#FF9933',
      'GA': '#CC6699',
      'IA': '#6699FF',
      'OH': '#33CC33',
      'TX': '#FF6666',
      'VA': '#9999FF',
      'WA': '#66CCCC',
      'OR': '#CCCC33',
      'NY': '#CC33CC'
    };
    
    return stateColors[stateName] || '#6699CC';
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>IA Sales Director Dashboard</h1>
          <p className="dashboard-subtitle">
            View and analyze your sales performance metrics
          </p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-refresh">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            <span>Refresh Data</span>
          </button>
          <div className="dropdown">
            <button className="btn btn-dropdown">
              <span>Time Period</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="metrics-container">
        <div className="metric-item">
          <MetricCard 
            title="YTD Quote Count" 
            value={formatNumber(data.quotePremium.quoteCount)}
            subtitle="View Report (Production KPI Report)" 
            isLoading={isLoading}
            color="#2196F3"
            trend={{ value: 5.2, isPositive: true }}
          />
        </div>
        <div className="metric-item">
          <MetricCard 
            title="YTD New Quote Premium" 
            value={formatCurrency(data.quotePremium.quotePremium)}
            subtitle="View Report (Production KPI Report)" 
            isLoading={isLoading}
            color="#4CAF50"
            trend={{ value: 7.8, isPositive: true }}
          />
        </div>
        <div className="metric-item">
          <MetricCard 
            title="YTD New Application Count" 
            value={formatNumber(data.quotePremium.appCount)}
            subtitle="View Report (Production KPI Report)" 
            isLoading={isLoading}
            color="#FF9800"
            trend={{ value: 3.4, isPositive: true }}
          />
        </div>
        <div className="metric-item">
          <MetricCard 
            title="YTD New App Premium" 
            value={formatCurrency(data.quotePremium.appPremium)}
            subtitle="View Report (Production KPI Report)" 
            isLoading={isLoading}
            color="#9C27B0"
            trend={{ value: 2.1, isPositive: false }}
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-item">
          <PyramidChartWidget
            title="Agencies AMSP Not Updated in 12 Team"
            subtitle="View Report (Agencies AMSP Not Updated in 12 Team)"
            data={amspNotUpdatedColored.slice(0, 5)}
            isLoading={isLoading}
            labelPosition="right"
            variant="gradient"
            showTotal={true}
          />
        </div>
        <div className="chart-item">
          <BarChartWidget
            title="Agencies Not Reached With Field - My Team"
            subtitle="View Report (Agencies Not Reached With Field - My Team)"
            data={agenciesNotReachedColored.slice(0, 5)}
            isLoading={isLoading}
            colorByName={true}
            labelPosition="right"
          />
        </div>
        <div className="chart-item">
          <BarChartWidget
            title="My Team's Open commitments"
            subtitle="View Report (My Team's Open commitments)"
            data={data.openCommitments.map(item => ({
              ...item,
              color: getStateColor(item.name.split('-')[1].trim())
            }))}
            isLoading={isLoading}
            labelPosition="right"
          />
        </div>
        <div className="chart-item">
          <PieChartWidget
            title="My Team's Call Average Report"
            subtitle="View Report (My Team's Call Average Report)"
            data={data.callAverage.data}
            centerText={data.callAverage.average.toString()}
            colors={['#5aaafa', '#8cd211', '#41d6c3', '#ba8ff7']}
            isLoading={isLoading}
          />
        </div>
        <div className="chart-item">
          <PieChartWidget
            title="My Team Sales Activities"
            subtitle="View Report (My Team Sales Activities)"
            data={data.salesActivities.breakdown}
            centerText={formatNumber(data.salesActivities.total)}
            colors={data.salesActivities.breakdown.map(item => item.color)}
            isLoading={isLoading}
          />
        </div>
        <div className="chart-item">
          <ColumnChartWidget
            title="My Team's Completed Call Notes by LOB"
            subtitle="View Report (My Team's Completed Call Notes by LOB)"
            data={data.callNotesByLOB}
            isLoading={isLoading}
          />
        </div>
        <div className="chart-item">
          <PyramidChartWidget
            title="My Review Locations Completed 30days"
            subtitle="View Report (My Review Locations Completed 30days)"
            data={[
              { name: 'Overdue', value: data.reviewLocations.overdue, color: '#FF5733' }
            ]}
            isLoading={isLoading}
            labelPosition="right"
            variant="layered"
            totalLabel="Total Locations"
          />
        </div>
        <div className="chart-item">
          <PyramidChartWidget
            title="My Onboarding Task Completed in 5days"
            subtitle="View Report (My Onboarding Task Completed in 5days)"
            data={[
              { name: 'On-Time', value: data.onboardingTask.onTime, color: '#4CAF50' },
              { name: 'Overdue', value: data.onboardingTask.overdue, color: '#FF5733' }
            ]}
            isLoading={isLoading}
            labelPosition="right"
            variant="flat"
            totalLabel="Total Tasks"
          />
        </div>
        <div className="chart-item">
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
        </div>
        <div className="chart-item">
          <ColumnChartWidget
            title="Prospect Agent Conversion Report"
            subtitle="View Report (Prospect Agent Conversion Report)"
            data={data.prospectConversion}
            isLoading={isLoading}
          />
        </div>
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
    </div>
  );
};

export default Dashboard;