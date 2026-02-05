import React from 'react';
import GalleryGrid from '../GalleryGrid';

const GalleryGridSection = React.memo(() => {
  return (
    <div id="gallery-section" className="gallery-section">
      <GalleryGrid />

      {/* Gallery Section Styles */}
      <style>{`
        .gallery-section {
          margin-right: 46px; /* Match the envelope width */
        }
        
        /* Tablet - ≤1024px */
        @media (max-width: 1024px) {
          .gallery-section {
            margin-right: 0 !important; /* Remove margin on tablet */
          }
        }
      `}</style>
    </div>
  );
});

GalleryGridSection.displayName = 'GalleryGridSection';

export default GalleryGridSection;
