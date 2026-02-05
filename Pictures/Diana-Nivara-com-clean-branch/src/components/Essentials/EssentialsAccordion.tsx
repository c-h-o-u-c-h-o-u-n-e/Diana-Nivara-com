import React, { ReactNode, useState } from 'react';

interface EssentialsAccordionProps {
  title: string;
  children: ReactNode;
  id?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
}

const EssentialsAccordion: React.FC<EssentialsAccordionProps> = ({ 
  title, 
  children, 
  id,
  isOpen,
  defaultOpen = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  
  // If isOpen is provided, it controls the component (controlled component)
  const expanded = isOpen !== undefined ? isOpen : isExpanded;
  
  const toggleAccordion = () => {
    if (isOpen === undefined) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div 
      style={{ marginBottom: '16px' }} 
      id={id || title.toLowerCase().replace(/\s+/g, '-')}
      className="essentials-accordion"
    >
      <button
        onClick={toggleAccordion}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '12px 0',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        aria-expanded={expanded}
        aria-controls={`accordion-content-${id || title.toLowerCase().replace(/\s+/g, '-')}`}
        className="essentials-accordion-header"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          className="essentials-subtitle-container"
        >
          <div
            style={{
              height: '1px',
              width: '40px',
              backgroundColor: 'var(--color-text-primary)',
              opacity: '0.8',
              marginRight: '16px',
              borderRadius: '4px',
              display: expanded ? 'block' : 'none',
            }}
            className="essentials-subtitle-line"
          />
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '32px',
              fontWeight: 'var(--font-heading-weight-medium)',
              color: 'var(--color-text-primary)',
              margin: '0',
              whiteSpace: 'nowrap',
            }}
            className="essentials-subtitle"
          >
            {title}
          </h3>
        </div>
        
        {/* Chevron icon that rotates based on expanded state */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <path 
            d="M6 9L12 15L18 9" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {/* Accordion content */}
      <div
        id={`accordion-content-${id || title.toLowerCase().replace(/\s+/g, '-')}`}
        style={{
          maxHeight: expanded ? '1000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          opacity: expanded ? 1 : 0,
          visibility: expanded ? 'visible' : 'hidden',
          marginTop: expanded ? '16px' : '0',
        }}
        className="essentials-accordion-content"
      >
        {children}
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Very Small Devices (425px and down) */
        @media (max-width: 425px) {
          .essentials-subtitle-line {
            display: none !important;
          }
          
          .essentials-subtitle {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EssentialsAccordion;
