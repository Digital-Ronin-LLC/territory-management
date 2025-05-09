import React, { ReactNode, useState } from 'react';
import './WidgetCard.css';

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isLoading?: boolean;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, subtitle, children, isLoading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`widget-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="widget-header">
        <h3 className="widget-title">{title}</h3>
        <div className="widget-controls">
          <button className="widget-control" onClick={toggleExpand}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isExpanded 
                ? <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                : <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              }
            </svg>
          </button>
          <button className="widget-control">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div className={`widget-content ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="widget-loader"></div>}
        {children}
      </div>
      {subtitle && (
        <div className="widget-footer">
          <a href="#" className="widget-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            {subtitle}
          </a>
        </div>
      )}
    </div>
  );
};

export default WidgetCard;
