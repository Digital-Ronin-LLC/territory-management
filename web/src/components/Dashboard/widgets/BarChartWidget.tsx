import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell
} from 'recharts';
import WidgetCard from './WidgetCard';
import './BarChartWidget.css';

interface BarChartWidgetProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  isLoading?: boolean;
}

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ title, subtitle, data, isLoading = false }) => {
  // Color array for the bars
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value, height } = props;
    return (
      <text 
        x={x + width + 5} 
        y={y + height / 2} 
        fill="#666" 
        fontSize={12} 
        textAnchor="start" 
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          <p className="tooltip-value">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="bar-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 20,
              right: 50,
              left: 100,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tickLine={false}
              axisLine={true}
              stroke="#ccc"
              fontSize={12}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              width={100}
              fontSize={12}
              tick={{fill: '#333'}}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]} 
              barSize={24}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList dataKey="value" content={renderCustomBarLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};

export default BarChartWidget;
