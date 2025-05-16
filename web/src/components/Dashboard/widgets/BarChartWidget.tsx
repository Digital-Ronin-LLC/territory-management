import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import WidgetCard from './WidgetCard';
import './BarChartWidget.css';

//Add more states and colors as needed

interface BarChartWidgetProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  isLoading?: boolean;
  colorByName?: boolean;
  labelPosition?: 'right' | 'inside';
}

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ 
  title, 
  subtitle, 
  data, 
  isLoading = false,
  colorByName = false,
  labelPosition = 'right'
}) => {
  // State colors mapping
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
    'NY': '#CC33CC',
    'NJ': '#33CCFF',
    'PA': '#FF66CC',
    'IL': '#99CC33',
    'MI': '#FF99CC'
  };
  
  // Fallback colors if state not found
  const fallbackColors = [
    '#3399FF', '#33CCCC', '#33CC66', '#FFCC33', '#FF9933', 
    '#FF6633', '#CC6699', '#9966CC', '#6666FF', '#6699FF'
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-bar-tooltip">
          <div className="tooltip-label">{payload[0].payload.name}</div>
          <div className="tooltip-value">{payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  // Get color based on name or index
  const getBarColor = (entry: any, index: number) => {
    if (colorByName) {
      // Use state color or fallback to the state's first 2 characters
      const stateKey = entry.name.substring(0, 2).toUpperCase();
      return stateColors[stateKey] || stateColors[entry.name] || fallbackColors[index % fallbackColors.length];
    }
    return entry.color || fallbackColors[index % fallbackColors.length];
  };

  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="bar-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 15,
              right: 60, // Increased to make room for values
              left: 100,
              bottom: 5
            }}
            barCategoryGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tickLine={false}
              axisLine={true}
              stroke="#ccc"
              fontSize={12}
              domain={[0, 'dataMax + 20']} // Add space for labels
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              width={100}
              fontSize={12}
              tick={{ fill: '#333' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]} 
              barSize={24}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry, index)}
                  cursor="pointer"
                />
              ))}
              {labelPosition === 'inside' ? (
                <LabelList 
                  dataKey="value" 
                  position="insideRight" 
                  fill="white" 
                  fontSize={12} 
                  fontWeight={600}
                />
              ) : (
                <LabelList 
                  dataKey="value" 
                  position="right" 
                  fill="#333" 
                  fontSize={12} 
                  fontWeight={500}
                  offset={10}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};

export default BarChartWidget;
