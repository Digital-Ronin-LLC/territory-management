import React from 'react';
import WidgetCard from './WidgetCard';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  isLoading?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  isLoading = false,
  trend 
}) => {
  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="metric-container">
        <div className="metric-value">
          {isLoading ? <div className="loading-pulse"></div> : value}
        </div>
        
        {trend && !isLoading && (
          <div className={`metric-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            <span className="trend-icon">
              {trend.isPositive ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </span>
            <span className="trend-value">{trend.value}%</span>
            <span className="trend-period">vs last month</span>
          </div>
        )}
      </div>
    </WidgetCard>
  );
};

export default MetricCard;
