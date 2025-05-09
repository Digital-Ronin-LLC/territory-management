import React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import WidgetCard from './WidgetCard';
import './FunnelChartWidget.css';

interface FunnelChartWidgetProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  isLoading?: boolean;
}

const FunnelChartWidget: React.FC<FunnelChartWidgetProps> = ({ title, subtitle, data, isLoading = false }) => {
  // Sort data by value in descending order for the funnel effect
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // Calculate total value
  const totalValue = sortedData.reduce((sum, item) => sum + item.value, 0);
  
  // Generate colors for the funnel segments
  const colors = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
    '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'
  ];
  
  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="funnel-chart-container">
        <div className="funnel-wrapper">
          {sortedData.map((item, index) => {
            // Calculate percentage for width and tooltip
            const percentage = totalValue ? Math.round((item.value / totalValue) * 100) : 0;
            // Calculate width percentage - add min width to ensure visibility
            const widthPercentage = 30 + (percentage * 0.7);
            
            return (
              <div 
                key={index} 
                className="funnel-segment"
                style={{ 
                  width: `${widthPercentage}%`,
                  backgroundColor: colors[index % colors.length]
                }}
                title={`${item.name}: ${item.value} (${percentage}%)`}
              >
                <div className="funnel-data">
                  <div className="funnel-label">{item.name}</div>
                  <div className="funnel-value">{item.value}</div>
                  <div className="funnel-percentage">{percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="funnel-legend">
          {sortedData.map((item, index) => (
            <div key={index} className="funnel-legend-item">
              <span 
                className="funnel-legend-color" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              <span className="funnel-legend-text">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
};

export default FunnelChartWidget;
