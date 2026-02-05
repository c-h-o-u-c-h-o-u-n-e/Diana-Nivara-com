import { Link } from 'react-router-dom';

interface HeroSectionProps {
  imageSrc: string;
  imageSrcSet?: string;
  imageAlt?: string;
}

export default function HeroSection({ 
  imageSrc, 
  imageSrcSet,
  imageAlt = 'Diana Nivara' 
}: HeroSectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '90vh',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-primary)',
        marginBottom: 'var(--spacing-12)',
      }}
      className="hero-section"
    >
      {/* Hero Image - Full Bleed */}
      <img
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
        alt={imageAlt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
        loading="eager"
      />

      {/* Dark Overlay for Text Readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.35)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Text Overlay Container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          maxWidth: '580px',
          width: '90%',
          zIndex: 2,
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
        className="hero-text-container"
      >
        {/* Hero Line - Primary Statement */}
        <h1
          style={{
            fontFamily: 'Luckyfield',
            fontWeight: 'var(--font-heading-weight-medium)',
            letterSpacing: 'var(--font-heading-letter-spacing)',
            fontSize: '38px',
            lineHeight: '1.6',
            color: 'var(--color-bg-primary)',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.35)',
            marginBottom: 'var(--spacing-3)',
            maxWidth: '740px',
            transform: 'rotate(-4deg)',
          }}
          className="hero-headline"
        >
          I create private, meaningful connections guided by presence and chemistry<br/>where mutual pleasure and enjoyment<br/>are the focus.
        </h1>
      </div>

      {/* Primary CTA - "An Invitation" - Separate positioning */}
      <Link
        to="/booking"
        style={{
          position: 'absolute',
          top: '75%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'inline-block',
          height: '52px',
          padding: '0 36px',
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-bg-primary)',
          fontFamily: 'var(--font-button)',
          fontWeight: 'var(--font-button-weight)',
          textTransform: 'var(--font-button-transform)',
          letterSpacing: 'var(--font-button-letter-spacing)',
          fontSize: '16px',
          border: 'none',
          borderRadius: '28px',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'background-color var(--transition-hover)',
          lineHeight: '52px',
          zIndex: 2,
          textAlign: 'center',
          minWidth: '220px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent-active)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
        }}
        aria-label="Navigate to booking page"
        className="hero-cta-button"
      >
        <span className="book-text-full">Book Our Time Together</span>
        <span className="book-text-short">Book Me</span>
      </Link>

      {/* Responsive Styles */}
      <style>{`
        @font-face {
          font-family: 'HelloKetta';
          src: url('/fonts/HelloKetta-Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        
        /* Desktop - >1024px (default styles) */
        
        /* Tablet - 769px-1024px */
        @media (max-width: 1024px) {
          .hero-section {
            height: 80vh !important;
          }
          
          .hero-headline {
            font-size: 38px !important;
          }
        }
        
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .hero-section {
            height: 70vh !important;
            margin-bottom: var(--spacing-8) !important;
          }
          
          .hero-headline {
            font-size: 30px !important;
          }
          
          /* CTA full-width on mobile */
          .hero-cta-button {
            width: 70% !important;
          }
        }
        
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .hero-section {
            height: 60vh !important;
            margin-bottom: var(--spacing-6) !important;
          }
          
          .hero-headline {
            font-size: 24px !important;
            line-height: 1.4 !important;
          }
          
          .hero-cta-button {
            width: 80% !important;
            padding: 0 20px !important;
            font-size: 14px !important;
          }
        }
        
        /* Hide hero section completely on screens 425px and smaller */
        @media (max-width: 425px) {
          .hero-section {
            display: none !important;
          }
        }
        
        /* Book text responsive display */
        .book-text-short {
          display: none;
        }
        
        .book-text-full {
          display: inline;
        }
        
        /* Show short text for screens smaller than 384px */
        @media (max-width: 383px) {
          .book-text-full {
            display: none;
          }
          
          .book-text-short {
            display: inline;
          }
        }
        
        /* Focus state for CTA */
        .hero-cta-button:focus-visible {
          outline: 2px solid var(--color-bg-primary) !important;
          outline-offset: 4px !important;
        }
      `}</style>
    </section>
  );
}
