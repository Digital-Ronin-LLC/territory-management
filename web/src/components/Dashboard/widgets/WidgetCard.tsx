import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './WidgetCard.css';

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isLoading?: boolean;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, subtitle, children, isLoading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRoot = useRef<HTMLDivElement | null>(null);
  
  // Create a div for portal if it doesn't exist
  useEffect(() => {
    // Check if modal root already exists
    let root = document.getElementById('widget-modal-root');
    
    if (!root) {
      // Create a new div element for the modal root
      root = document.createElement('div');
      root.id = 'widget-modal-root';
      document.body.appendChild(root);
    }
    
    modalRoot.current = root as HTMLDivElement;
    
    return () => {
      // Cleanup only if we created it and there are no other expanded widgets
      if (document.querySelectorAll('.widget-modal').length === 0) {
        if (root && root.parentNode) {
          root.parentNode.removeChild(root);
        }
      }
    };
  }, []);
  
  // Handle body overflow when widget is expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('widget-expanded');
    } else {
      // Small timeout to prevent flickering during transition
      const timeout = setTimeout(() => {
        if (!document.querySelectorAll('.widget-overlay').length) {
          document.body.classList.remove('widget-expanded');
        }
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [isExpanded]);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (!isExpanded) {
      // Save current scroll position
      const scrollPos = window.scrollY;
      
      // Clone content for modal to prevent state conflicts
      if (widgetRef.current && contentRef.current) {
        setIsExpanded(true);
        
        // Restore scroll position to prevent jump
        window.scrollTo(0, scrollPos);
      }
    } else {
      setIsExpanded(false);
    }
  };
  
  // Handle clicking outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };
  
  // Expanded modal content
  const ExpandedWidget = () => {
    if (!isExpanded || !modalRoot.current) return null;
    
    return createPortal(
      <div className="widget-overlay" onClick={handleOverlayClick}>
        <div className="widget-modal">
          <div className="widget-header">
            <h3 className="widget-title">{title}</h3>
            <div className="widget-controls">
              <button className="widget-control" onClick={toggleExpand} aria-label="Close expanded view">
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
      </div>,
      modalRoot.current
    );
  };
  
  return (
    <>
      <div className="widget-card" ref={widgetRef}>
        <div className="widget-header">
          <h3 className="widget-title">{title}</h3>
          <div className="widget-controls">
            <button className="widget-control" onClick={toggleExpand} aria-label="Expand widget">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
            <button className="widget-control" aria-label="Widget options">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
        <div className={`widget-content ${isLoading ? 'loading' : ''}`} ref={contentRef}>
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
      
      {/* Portal for expanded widget */}
      <ExpandedWidget />
    </>
  );
};

export default WidgetCard;
