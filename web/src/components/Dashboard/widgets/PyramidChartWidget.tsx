import React, { useEffect, useState } from 'react';
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

  // Sort data by value in descending order for the funnel effect
  const [sortedData, setSortedData] = useState([...data].sort((a, b) => b.value - a.value));
  
  // Calculate total value for percentages
  const totalValue = sortedData.reduce((sum, item) => sum + item.value, 0);
  
  // Update sorted data when data changes
  useEffect(() => {
    setSortedData([...data].sort((a, b) => b.value - a.value));
  }, [data]);

  // Transform data for ECharts funnel chart
  const transformedData = sortedData.map(item => ({
    value: item.value,
    name: item.name,
    itemStyle: {
      color: item.color || defaultColors[sortedData.indexOf(item) % defaultColors.length]
    }
  }));

  // Prepare options for ECharts
  const getOption = () => {
    // Determine the label position
    const labelPosition2 = labelPosition === 'right' ? 'right' : 'left';
    
    // Define the funnel chart option
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const { name, value, percent } = params;
          return `${name}: ${value} (${percent}%)`;
        }
      },
      legend: {
        show: false, // Hide default legend, we'll use custom legend
      },
      series: [{
        name: title,
        type: 'funnel',
        left: '10%',
        top: 10,
        bottom: 10,
        width: '80%',
        min: 0,
        max: totalValue,
        minSize: '20%',
        maxSize: '100%',
        sort: 'descending',
        gap: variant === 'layered' ? 2 : 0, // Gap between segments based on variant
        funnelAlign: 'center',
        label: {
          show: showPercentages,
          position: 'inside',
          formatter: (params: any) => {
            return `${params.percent}%`;
          },
          fontWeight: 'bold',
          color: '#fff',
          fontSize: 12,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
        },
        emphasis: {
          label: {
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          borderColor: variant === 'layered' ? '#fff' : 'transparent',
          borderWidth: variant === 'layered' ? 1 : 0,
          // Apply gradient based on variant
          color: (params: any) => {
            if (variant === 'gradient') {
              const baseColor = params.data.itemStyle.color;
              return {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: baseColor },
                  { offset: 1, color: lightenColor(baseColor, 30) }
                ]
              };
            }
            return params.data.itemStyle.color;
          }
        },
        data: transformedData
      }]
    };
    
    return option;
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

  // Handle legend hover to highlight corresponding funnel segment
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Get chart instance for highlighting
  const [chartInstance, setChartInstance] = useState<any>(null);
  
  const onChartReady = (instance: any) => {
    setChartInstance(instance);
  };

  // Effect to handle highlight when hoveredIndex changes
  useEffect(() => {
    if (chartInstance && hoveredIndex !== null) {
      // Highlight the segment
      chartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: hoveredIndex
      });
    } else if (chartInstance && hoveredIndex === null) {
      // Remove all highlights
      chartInstance.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      });
    }
  }, [hoveredIndex, chartInstance]);

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
        
        {/* ECharts Funnel Chart */}
        <div className="echarts-funnel-wrapper">
          <ReactEcharts
            option={getOption()}
            style={{ height: '260px', width: '100%' }}
            onChartReady={onChartReady}
            notMerge={true}
            lazyUpdate={false}
          />
        </div>
        
        {/* Custom Legend */}
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
