import React, { useState } from 'react';
import './PyramidChartWidget.css';
import WidgetCard from './WidgetCard';

interface PyramidChartWidgetProps {
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
  variant?: 'gradient' | 'flat' | 'layered';
  showTotal?: boolean;
  totalLabel?: string;
}

const PyramidChartWidget: React.FC<PyramidChartWidgetProps> = ({ 
  title, 
  subtitle, 
  data, 
  isLoading = false,
  showPercentages = true,
  labelPosition = 'right',
  variant = 'gradient',
  showTotal = true,
  totalLabel = 'Total'
}) => {
  // Sort data by value in descending order for the pyramid effect
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // Calculate total value for percentages
  const totalValue = sortedData.reduce((sum, item) => sum + item.value, 0);
  
  // Generate colors if not provided
  const defaultColors = [
    '#4361ee', '#3a0ca3', '#4895ef', '#4cc9f0', '#560bad',
    '#f72585', '#7209b7', '#3f37c9', '#4cc9f0', '#480ca8'
  ];

  // State for hovered segment
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper function to determine color based on variant
  const getSegmentStyle = (item: any, index: number) => {
    const baseColor = item.color || defaultColors[index % defaultColors.length];
    
    let style: React.CSSProperties = {
      backgroundColor: baseColor,
    };
    
    if (variant === 'gradient') {
      // Add gradient effect
      style.background = `linear-gradient(135deg, ${baseColor}, ${lightenColor(baseColor, 30)})`;
    } else if (variant === 'layered') {
      // Add shadow for layered effect only when hovered
      style.boxShadow = hoveredIndex === index ? `0 4px 8px rgba(0, 0, 0, 0.15)` : 'none';
    }
    
    if (hoveredIndex === index) {
      // Enhanced hover effect
      style.transform = 'translateY(-2px)';
      style.zIndex = 5;
    }
    
    return style;
  };

  // Helper function to lighten a color
  const lightenColor = (color: string, percent: number) => {
    // Remove the # if it exists
    let hex = color.replace('#', '');
    
    // Convert to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Lighten
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="pyramid-chart-container">
        {/* Total Display at the Top */}
        {showTotal && (
          <div className="pyramid-total">
            <div className="total-label">{totalLabel}</div>
            <div className="total-value">{totalValue.toLocaleString()}</div>
          </div>
        )}
        
        {/* Pyramid Segments */}
        <div className={`pyramid-wrapper ${variant}`}>
          {sortedData.map((item, index) => {
            // Calculate percentage for width
            const percentage = totalValue ? (item.value / totalValue) * 100 : 0;
            
            // Calculate width percentage - ensure even small values are visible
            const maxWidth = 100;
            const minWidth = sortedData.length > 1 ? 25 : 50;
            
            // Calculate funnel width based on position in the sorted array
            const position = index / (sortedData.length - 1 || 1);
            const widthPercentage = sortedData.length > 1 
              ? minWidth + ((maxWidth - minWidth) * (1 - position))
              : maxWidth;
            
            return (
              <div className="pyramid-segment-wrapper" key={index}>
                {labelPosition === 'left' && (
                  <div className="pyramid-label left">
                    <span className="pyramid-label-name">{item.name}</span>
                    <span className="pyramid-label-value">{item.value.toLocaleString()}</span>
                  </div>
                )}
                
                <div 
                  className={`pyramid-segment ${variant}`}
                  style={{
                    ...getSegmentStyle(item, index),
                    width: `${widthPercentage}%`,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {showPercentages && (
                    <span className="pyramid-percentage">
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
                
                {labelPosition === 'right' && (
                  <div className="pyramid-label right">
                    <span className="pyramid-label-name">{item.name}</span>
                    <span className="pyramid-label-value">{item.value.toLocaleString()}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="pyramid-legend">
          {sortedData.map((item, index) => (
            <div 
              key={index} 
              className="pyramid-legend-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span 
                className="pyramid-legend-color" 
                style={{ backgroundColor: item.color || defaultColors[index % defaultColors.length] }}
              ></span>
              <span className="pyramid-legend-text">{item.name}</span>
              <span className="pyramid-legend-value">
                {item.value.toLocaleString()}
                {showPercentages && totalValue > 0 && (
                  <span className="pyramid-legend-percentage">
                    ({((item.value / totalValue) * 100).toFixed(1)}%)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
};

export default PyramidChartWidget;
