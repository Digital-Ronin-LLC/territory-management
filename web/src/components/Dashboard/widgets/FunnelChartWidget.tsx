import React from 'react';
import './FunnelChartWidget.css';
import WidgetCard from './WidgetCard';

interface FunnelChartWidgetProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  isLoading?: boolean;
  showPercentages?: boolean;
  labelPosition?: 'left' | 'right';
}

const FunnelChartWidget: React.FC<FunnelChartWidgetProps> = ({ 
  title, 
  subtitle, 
  data, 
  isLoading = false,
  showPercentages = true,
  labelPosition = 'left'
}) => {
  // Sort data by value in descending order for the funnel effect
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // Calculate total value for percentages
  const totalValue = sortedData.reduce((sum, item) => sum + item.value, 0);
  
  // Generate colors if not provided
  const defaultColors = [
    '#3399FF', '#33CCCC', '#33CC66', '#FFCC33', '#FF9933', 
    '#FF6633', '#CC6699', '#9966CC', '#6666FF', '#6699FF'
  ];

  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="modern-funnel-container">
        {sortedData.map((item, index) => {
          // Calculate percentage
          const percentage = totalValue ? Math.round((item.value / totalValue) * 100) : 0;
          // Calculate width percentage - ensure even small values are visible
          const minWidth = 40; // Minimum width percentage
          const maxWidth = 100; // Maximum width percentage
          const widthPercentage = minWidth + ((maxWidth - minWidth) * (item.value / (sortedData[0]?.value || 1)));
          
          // Use provided color or default
          const segmentColor = item.color || defaultColors[index % defaultColors.length];
          
          return (
            <div className="funnel-segment-wrapper" key={index}>
              {labelPosition === 'left' && (
                <div className="funnel-label left">
                  <span className="funnel-name">{item.name}</span>
                </div>
              )}
              
              <div 
                className="modern-funnel-segment"
                style={{ 
                  width: `${widthPercentage}%`,
                  backgroundColor: segmentColor
                }}
              >
                <span className="funnel-value">{item.value}</span>
                {showPercentages && (
                  <span className="funnel-percentage">{percentage}%</span>
                )}
              </div>
              
              {labelPosition === 'right' && (
                <div className="funnel-label right">
                  <span className="funnel-name">{item.name}</span>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Progress Bar at Bottom */}
        <div className="funnel-progress-container">
          <div className="funnel-progress-bar">
            {sortedData.map((item, index) => {
              const percentage = totalValue ? (item.value / totalValue) * 100 : 0;
              const segmentColor = item.color || defaultColors[index % defaultColors.length];
              
              return (
                <div 
                  key={index}
                  className="funnel-progress-segment"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: segmentColor
                  }}
                  title={`${item.name}: ${percentage.toFixed(1)}%`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </WidgetCard>
  );
};

export default FunnelChartWidget;
