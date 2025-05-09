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
  Cell
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

  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="column-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 70
            }}
            barGap={8}
            barSize={title.includes('Stacked') ? 30 : 16}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              scale="band" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={70}
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
