import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
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
  // Default colors if not provided
  const defaultColors = [
    '#4361ee', '#3a0ca3', '#4895ef', '#4cc9f0', '#560bad',
    '#f72585', '#7209b7', '#3f37c9', '#4cc9f0', '#480ca8'
  ];

  // Process data when it changes
  const [processedData, setProcessedData] = useState(() => {
    return {
      sortedData: [...data].sort((a, b) => b.value - a.value),
      totalValue: data.reduce((sum, item) => sum + item.value, 0)
    };
  });
  
  // Update processed data when props change
  useEffect(() => {
    setProcessedData({
      sortedData: [...data].sort((a, b) => b.value - a.value),
      totalValue: data.reduce((sum, item) => sum + item.value, 0)
    });
  }, [data]);
  
  // Track hover state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generate chart options
  const getChartOption = useCallback(() => {
    const { sortedData } = processedData;
    
    // Transform data for ECharts funnel chart
    const chartData = sortedData.map((item, index) => ({
      value: item.value,
      name: item.name,
      itemStyle: {
        color: item.color || defaultColors[index % defaultColors.length]
      }
    }));
    
    // Define the funnel chart option
    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}: ${params.value} (${params.percent}%)`;
        }
      },
      series: [{
        name: title,
        type: 'funnel',
        left: '10%',
        top: 10,
        bottom: 10,
        width: '80%',
        min: 0,
        maxSize: '100%',
        minSize: '20%',
        sort: 'descending',
        gap: variant === 'layered' ? 2 : 0,
        label: {
          show: showPercentages,
          position: 'inside',
          formatter: '{d}%',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff'
        },
        itemStyle: {
          borderColor: variant === 'layered' ? '#fff' : 'transparent',
          borderWidth: variant === 'layered' ? 1 : 0
        },
        emphasis: {
          label: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: chartData
      }]
    };
  }, [processedData, title, variant, showPercentages, defaultColors]);
  
  // Safe way to handle legend hover
  const handleLegendHover = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);
  
  const handleLegendLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);
  
  // Safely render legend
  const renderLegend = () => {
    const { sortedData, totalValue } = processedData;
    
    return (
      <div className="pyramid-legend">
        {sortedData.map((item, index) => (
          <div 
            key={`legend-${index}-${item.name}`}
            className={`pyramid-legend-item ${hoveredIndex === index ? 'active' : ''}`}
            onMouseEnter={() => handleLegendHover(index)}
            onMouseLeave={handleLegendLeave}
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
    );
  };

  // Helper function to lighten a color for gradients
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
            <div className="total-value">{processedData.totalValue.toLocaleString()}</div>
          </div>
        )}
        
        {/* Chart Component */}
        <div className="echarts-funnel-wrapper">
          {/* Render the chart only when data is available and not empty */}
          {processedData.sortedData.length > 0 && (
            <ReactEcharts
              option={getChartOption()}
              style={{ height: '260px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
              notMerge={true}
              lazyUpdate={true}
            />
          )}
          
          {/* Show placeholder when no data */}
          {processedData.sortedData.length === 0 && !isLoading && (
            <div className="no-data-placeholder">
              No data available
            </div>
          )}
        </div>
        
        {/* Legend */}
        {renderLegend()}
      </div>
    </WidgetCard>
  );
};

export default React.memo(PyramidChartWidget);
