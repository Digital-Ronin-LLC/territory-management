import React, { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './WidgetCard.css';

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isLoading?: boolean;
}

// Create a modal root element if it doesn't exist
let modalRoot: HTMLElement | null = null;
try {
  modalRoot = document.getElementById('widget-modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'widget-modal-root';
    document.body.appendChild(modalRoot);
  }
} catch (error) {
  console.error('Failed to create modal root element:', error);
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, subtitle, children, isLoading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  
  // Safe toggle expand function
  const toggleExpand = useCallback((e: React.MouseEvent) => {
    // Prevent event bubbling
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsExpanded(prev => !prev);
  }, []);
  
  // Handle body overflow when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('widget-expanded');
    } else {
      // Check if there are any other open modals before removing the class
      const expandedModals = document.querySelectorAll('.widget-overlay');
      if (expandedModals.length <= 1) {
        document.body.classList.remove('widget-expanded');
      }
    }
    
    // Add escape key handler
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    if (isExpanded) {
      window.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
      
      // Clean up when component unmounts and modal is expanded
      if (isExpanded) {
        const expandedModals = document.querySelectorAll('.widget-overlay');
        if (expandedModals.length <= 1) {
          document.body.classList.remove('widget-expanded');
        }
      }
    };
  }, [isExpanded]);
  
  // Handle clicking outside to close
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  }, []);
  
  // Expanded widget portal
  const renderExpandedWidget = () => {
    if (!isExpanded || !modalRoot) return null;
    
    try {
      return createPortal(
        <div className="widget-overlay" onClick={handleOverlayClick}>
          <div className="widget-modal">
            <div className="widget-header">
              <h3 className="widget-title">{title}</h3>
              <div className="widget-controls">
                <button 
                  className="widget-control" 
                  onClick={toggleExpand} 
                  aria-label="Close expanded view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
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
                <a href="#" className="widget-link" onClick={(e) => e.preventDefault()}>
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
        </div>,
        modalRoot
      );
    } catch (error) {
      console.error('Failed to render expanded widget:', error);
      return null;
    }
  };
  
  return (
    <>
      <div className="widget-card" ref={widgetRef}>
        <div className="widget-header">
          <h3 className="widget-title">{title}</h3>
          <div className="widget-controls">
            <button 
              className="widget-control" 
              onClick={toggleExpand} 
              aria-label="Expand widget"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
            <button className="widget-control" aria-label="Widget options" onClick={(e) => e.preventDefault()}>
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
            <a href="#" className="widget-link" onClick={(e) => e.preventDefault()}>
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
      
      {/* Portal for expanded widget */}
      {renderExpandedWidget()}
    </>
  );
};

export default React.memo(WidgetCard);
