import { useState } from 'react';
import Lightbox from './Lightbox';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

// Gallery images using the correct file names
const galleryImages: GalleryImage[] = [
  { id: 'gallery1', src: 'images/Diana-Nivara-Gallery-01.webp', alt: 'Diana Nivara gallery image 1' },
  { id: 'gallery2', src: 'images/Diana-Nivara-Gallery-02.webp', alt: 'Diana Nivara gallery image 2' },
  { id: 'gallery3', src: 'images/Diana-Nivara-Gallery-03.webp', alt: 'Diana Nivara gallery image 3' },
  { id: 'gallery4', src: 'images/Diana-Nivara-Gallery-04.webp', alt: 'Diana Nivara gallery image 4' },
  { id: 'gallery5', src: 'images/Diana-Nivara-Gallery-05.webp', alt: 'Diana Nivara gallery image 5' },
  { id: 'gallery6', src: 'images/Diana-Nivara-Gallery-06.webp', alt: 'Diana Nivara gallery image 6' },
  { id: 'gallery7', src: 'images/Diana-Nivara-Gallery-07.webp', alt: 'Diana Nivara gallery image 7' },
  { id: 'gallery8', src: 'images/Diana-Nivara-Gallery-08.webp', alt: 'Diana Nivara gallery image 8' },
  { id: 'gallery9', src: 'images/Diana-Nivara-Gallery-09.webp', alt: 'Diana Nivara gallery image 9' },
  { id: 'gallery10', src: 'images/Diana-Nivara-Gallery-10.webp', alt: 'Diana Nivara gallery image 10' },
  { id: 'gallery11', src: 'images/Diana-Nivara-Gallery-11.webp', alt: 'Diana Nivara gallery image 11' },
  { id: 'gallery12', src: 'images/Diana-Nivara-Gallery-12.webp', alt: 'Diana Nivara gallery image 12' },
];

export default function GalleryGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [focusedThumbnailIndex, setFocusedThumbnailIndex] = useState<number | null>(null);

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
    setFocusedThumbnailIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    
    // Return focus to the originating thumbnail
    if (focusedThumbnailIndex !== null) {
      setTimeout(() => {
        const thumbnail = document.getElementById(`gallery-thumbnail-${focusedThumbnailIndex}`);
        if (thumbnail) {
          thumbnail.focus();
        }
      }, 100);
    }
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    } else {
      setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="gallery-section"
    >
      {/* Section Title with Decorative Lines */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '24px',
          marginBottom: '24px',
          width: '100%',
        }}
        className="gallery-title-container"
      >
        <div
          style={{
            height: '2px',
            flex: '1',
            backgroundColor: 'var(--color-text-primary)',
            marginRight: '16px',
            borderRadius: '4px',
          }}
        />
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-heading-weight-medium)',
            letterSpacing: '0.4px',
            fontSize: '54px',
            color: 'var(--color-text-primary)',
            margin: '0',
            whiteSpace: 'nowrap',
          }}
          className="gallery-title"
        >
          Gallery
        </h2>
        <div
          style={{
            height: '2px',
            flex: '1',
            backgroundColor: 'var(--color-text-primary)',
            marginLeft: '16px',
            borderRadius: '4px',
          }}
        />
      </div>

      {/* Grid Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
        className="gallery-grid"
      >
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            id={`gallery-thumbnail-${index}`}
            onClick={() => handleThumbnailClick(index)}
            style={{
              width: '100%',
              cursor: 'pointer',
              border: 'none',
              padding: 0,
              background: 'none',
              position: 'relative',
            }}
            aria-label={`View ${image.alt} in fullscreen, image ${index + 1} of ${galleryImages.length}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '0',
              }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          activeIndex={activeImageIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigate}
        />
      )}

      {/* Responsive Styles */}
      <style>{`
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .gallery-title {
            font-size: 28px !important;
          }
          
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          .gallery-title-container {
            margin-bottom: 16px !important;
          }
        }
        
        /* Tablet - ≤1023px */
        @media (max-width: 1023px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        /* Mobile - ≤767px */
        @media (max-width: 767px) {
          .gallery-title {
            font-size: 36px !important;
          }
          
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
