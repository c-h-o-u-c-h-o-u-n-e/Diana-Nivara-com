import { useEffect, useRef, useState } from 'react';

interface LightboxProps {
  images: Array<{ id: string; src: string; alt: string }>;
  activeIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  useEffect(() => {
    // Lock body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // Focus trap: focus on lightbox container
    if (lightboxRef.current) {
      lightboxRef.current.focus();
    }

    return () => {
      // Cleanup: unlock body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  useEffect(() => {
    // Preload next and previous images
    const nextIndex = (activeIndex + 1) % images.length;
    const prevIndex = (activeIndex - 1 + images.length) % images.length;

    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    preloadImage(images[nextIndex].src);
    preloadImage(images[prevIndex].src);
  }, [activeIndex, images]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowRight') {
      onNavigate('next');
    } else if (e.key === 'ArrowLeft') {
      onNavigate('prev');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close only if clicking the backdrop, not the image
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleImageZoneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // Left third: previous image
    if (clickX < width / 3) {
      onNavigate('prev');
    }
    // Right third: next image
    else if (clickX > (2 * width) / 3) {
      onNavigate('next');
    }
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNavigate('next');
    } else if (isRightSwipe) {
      onNavigate('prev');
    }
  };

  const currentImage = images[activeIndex];

  return (
    <div
      ref={lightboxRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${currentImage.alt}, image ${activeIndex + 1} of ${images.length}`}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9000,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isClosing ? 0 : 1,
        transition: isClosing ? 'opacity 150ms ease-out' : 'none',
      }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '32px',
          height: '32px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          zIndex: 9001,
        }}
        className="lightbox-close-button"
        aria-label="Close lightbox"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 8L8 24M8 8L24 24"
            stroke="var(--color-bg-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Image Container with Click Zones */}
      <div
        onClick={handleImageZoneClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        className="lightbox-image-container"
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
          className="lightbox-image"
        />
      </div>

      {/* Navigation Indicators */}
      <div 
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
        }}
        className="lightbox-indicators"
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // Navigate to this specific image
              while (activeIndex !== index) {
                onNavigate(activeIndex < index ? 'next' : 'prev');
              }
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === activeIndex ? 'var(--color-bg-primary)' : 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
            aria-label={`View image ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .lightbox-close-button {
            top: 16px !important;
            right: 16px !important;
          }
          
          .lightbox-image-container {
            maxWidth: 95vw !important;
            maxHeight: 80vh !important;
          }
          
          .lightbox-image {
            maxWidth: 95vw !important;
            maxHeight: 80vh !important;
          }
          
          .lightbox-indicators {
            bottom: 16px !important;
          }
        }
      `}</style>

      {/* Screen Reader Announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        Image {activeIndex + 1} of {images.length}
      </div>
    </div>
  );
}
