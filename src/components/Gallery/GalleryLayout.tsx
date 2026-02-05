import React from 'react';

export interface GalleryLayoutProps {
  children: [React.ReactNode, React.ReactNode]; // Exactly two children: left and right content
}

const GalleryLayout = React.memo(({ children }: GalleryLayoutProps) => {
  // Destructure the children array for better readability
  const [leftContent, rightContent] = children;

  return (
    <div className="w-full" style={{ marginBottom: '72px' }}>
      {/* Gallery Page Layout - 35/65 Split */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '35% 65%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 32px',
          gap: '48px',
          position: 'relative',
        }}
        className="gallery-page-layout"
      >
        {/* Left Content */}
        {leftContent}

        {/* Right Content */}
        {rightContent}
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Tablet - ≤1024px */
        @media (max-width: 1024px) {
          .gallery-page-layout {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
            padding: 64px 32px !important;
          }
        }
        
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .gallery-page-layout {
            padding: 0px 20px !important;
            gap: 48px !important;
          }
        }
        
        /* Very Small Devices (425px and down) */
        @media (max-width: 425px) {
          .gallery-page-layout {
            padding-top: 0px !important;
            margin-top: 0px !important; /
          }
        }
      `}</style>
    </div>
  );
});

GalleryLayout.displayName = 'GalleryLayout';

export default GalleryLayout;
