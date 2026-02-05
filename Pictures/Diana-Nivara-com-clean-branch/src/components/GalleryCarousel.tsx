import { useState, useEffect } from 'react';
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

export default function GalleryCarousel() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  // Autoplay functionality - disabled
  useEffect(() => {
    // Autoplay is disabled - images change only manually
    return;
  }, [autoplay, lightboxOpen]);

  const handleImageClick = () => {
    setLightboxOpen(true);
    setAutoplay(false);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    setAutoplay(false);
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

      {/* Carousel Container */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          marginBottom: '20px',
        }}
        className="carousel-container"
      >
        {/* Main Image */}
        <div
          style={{
            width: '100%',
            position: 'relative',
            aspectRatio: '3/4',
            overflow: 'hidden',
            borderRadius: '4px',
          }}
          className="carousel-main-image"
        >
          <img
            src={galleryImages[activeImageIndex].src}
            alt={galleryImages[activeImageIndex].alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onClick={handleImageClick}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate('prev');
          }}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
          aria-label="Previous image"
          className="carousel-arrow carousel-arrow-prev"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate('next');
          }}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
          aria-label="Next image"
          className="carousel-arrow carousel-arrow-next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            position: 'absolute',
            bottom: '15px',
            left: '0',
            right: '0',
          }}
          className="carousel-indicators"
        >
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(index);
                setAutoplay(false);
              }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: index === activeImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === activeImageIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* Image Counter */}
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--color-text-muted)',
          marginBottom: '20px',
        }}
      >
        {activeImageIndex + 1} / {galleryImages.length}
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
          
          .carousel-main-image {
            aspect-ratio: 2/3 !important;
          }
          
          .carousel-arrow {
            width: 36px !important;
            height: 36px !important;
          }
          
          .carousel-indicators {
            bottom: 10px !important;
          }
        }
        
        /* Mobile - ≤767px */
        @media (max-width: 767px) {
          .gallery-title {
            font-size: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
