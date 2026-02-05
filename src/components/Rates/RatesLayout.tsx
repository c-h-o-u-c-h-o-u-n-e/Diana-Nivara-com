import React, { ReactNode } from 'react';

interface RatesLayoutProps {
  children: ReactNode;
}

const RatesLayout = React.memo(({ children }: RatesLayoutProps) => {
  return (
    <div className="w-full">
      <section
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 32px',
          backgroundColor: 'var(--color-bg-primary)',
          position: 'relative',
          overflow: 'visible',
          paddingTop: '24px', /* Match the profile title top spacing */
        }}
        className="rates-section"
      >
        {children}
      </section>

      {/* Responsive Styles */}
      <style>{`
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .rates-section {
            padding: 0px 20px !important;
          }
          
          .rates-title {
            font-size: 56px !important;
          }
          
          .rates-two-column {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          
          .rates-title-container div:first-child,
          .rates-title-container div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
});

RatesLayout.displayName = 'RatesLayout';

export default RatesLayout;
