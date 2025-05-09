import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector
} from 'recharts';
import WidgetCard from './WidgetCard';
import './PieChartWidget.css';

interface PieChartWidgetProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  centerText?: string;
  colors?: string[];
  isLoading?: boolean;
}

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ 
  title, 
  subtitle, 
  data, 
  centerText,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], 
  isLoading = false
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-pie-tooltip">
          <p className="tooltip-name">{payload[0].name}</p>
          <p className="tooltip-value">{payload[0].value}</p>
          <p className="tooltip-percent">{`(${(payload[0].percent * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="custom-legend">
        {payload.map((entry: any, index: number) => (
          <li 
            key={`item-${index}`} 
            className="legend-item"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            <span className="legend-icon" style={{ backgroundColor: entry.color }}></span>
            <span className="legend-text">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <WidgetCard title={title} subtitle={subtitle} isLoading={isLoading}>
      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              outerRadius={80}
              innerRadius={centerText ? 50 : 0}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationDuration={1000}
              animationBegin={200}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {centerText && (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="center-text"
              >
                {centerText}
              </text>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};

export default PieChartWidget;
