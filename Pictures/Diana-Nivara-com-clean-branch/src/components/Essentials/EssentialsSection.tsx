import React, { ReactNode } from 'react';

interface EssentialsSectionProps {
  title: string;
  children: ReactNode;
  id?: string;
}

const EssentialsSection: React.FC<EssentialsSectionProps> = React.memo(({ title, children, id }) => {
  return (
    <div style={{ marginBottom: '56px' }} id={id || title.toLowerCase().replace(/\s+/g, '-')}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
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
          }}
          className="essentials-subtitle-line"
        />
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '40px',
            fontWeight: 'var(--font-heading-weight-medium)',
            color: 'var(--color-text-primary)',
            margin: '0',
            whiteSpace: 'nowrap',
          }}
          className="essentials-subtitle"
        >
          {title}
        </h3>
        <div
          style={{
            height: '1px',
            width: '40px',
            backgroundColor: 'var(--color-text-primary)',
            opacity: '0.8',
            marginLeft: '16px',
            borderRadius: '4px',
          }}
          className="essentials-subtitle-line"
        />
      </div>

      <div style={{ maxWidth: '100%' }}>
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
            font-size: 32px !important;
          }
          
          .essentials-subtitle-container {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
});

export default EssentialsSection;
