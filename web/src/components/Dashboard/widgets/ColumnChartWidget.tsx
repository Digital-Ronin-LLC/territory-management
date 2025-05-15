import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import WidgetCard from './WidgetCard';
import './ColumnChartWidget.css';

interface ColumnChartWidgetProps {
  title: string;
  subtitle?: string;
  data: Array<Record<string, any>>;
  isLoading?: boolean;
}

const ColumnChartWidget: React.FC<ColumnChartWidgetProps> = ({ title, subtitle, data, isLoading = false }) => {
  // Extract the keys that aren't 'name' to use them as data keys for bars
  const keys = Object.keys(data[0] || {}).filter(key => key !== 'name');
  
  // Generate colors for bars
  const baseColors = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
    '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'
  ];
  
  // Create a derived colors array to ensure we have enough colors
  const colors = keys.map((_, index) => baseColors[index % baseColors.length]);
  
  // Transform data to ensure categories are displayed correctly
  // This is particularly important for the Prospect Agent Conversion Report
  const transformedData = [...data].map(item => {
    // Create a copy of the original item
    const newItem = { ...item };
    
    // Check if this is the prospect conversion report by checking the title
    if (title.includes("Prospect Agent Conversion")) {
      // Create a new property for each name that exists, with its value
      // This ensures categories are correctly positioned in the chart
      const nameParts = newItem.name.split(' - ');
      if (nameParts.length > 1) {
        // Use the first part as the main category
        newItem.category = nameParts[0];
        // Use the second part as the subcategory if it exists
        if (nameParts[1]) {
          newItem.subcategory = nameParts[1];
        }
      } else {
        newItem.category = newItem.name;
      }
    }
    
    return newItem;
  });
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-column-tooltip">
          <p className="tooltip-title">{label}</p>
          <div className="tooltip-items">
            {payload.map((item: any, index: number) => (
              <div key={index} className="tooltip-item">
                <span className="tooltip-color" style={{ backgroundColor: item.color }}></span>
                <span className="tooltip-key">{item.name}:</span>
                <span className="tooltip-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="column-legend">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="column-legend-item">
            <span className="legend-icon" style={{ backgroundColor: entry.color }}></span>
            <span className="legend-text">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  const getDataKey = () => {
    // For Prospect Agent Conversion, use the category field instead
    if (title.includes("Prospect Agent Conversion")) {
      return "category";
    }
    return "name";
  };

  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="column-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={transformedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 70
            }}
            barGap={8}
            barSize={title.includes('Stacked') ? 30 : 16}
            maxBarSize={50}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey={getDataKey()}
              scale="band" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0} // Show all ticks
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {keys.map((key, index) => (
              <Bar 
                key={key} 
                dataKey={key} 
                name={key}
                fill={colors[index]}
                radius={[3, 3, 0, 0]}
                stackId={title.includes('Stacked') ? 'stack' : undefined}
                animationDuration={1500}
                animationBegin={index * 200}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};

export default ColumnChartWidget;
