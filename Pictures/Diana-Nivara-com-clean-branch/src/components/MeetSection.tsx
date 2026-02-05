import { useEffect, useRef, useState } from 'react';

interface MeetSectionProps {
  imageSrc: string;
  imageAlt?: string;
}

export default function MeetSection({ 
  imageSrc, 
  imageAlt = 'Diana Nivara' 
}: MeetSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Intersection Observer for fade-in animation when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '96px 32px',
        backgroundColor: 'var(--color-bg-primary)',
        position: 'relative',
        overflow: 'visible',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease',
      }}
      className="meet-section"
    >
      {/* Grid Layout - 55/45 Split */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '49.1% 45%',
          columnGap: '64px',
          alignItems: 'flex-start',
          rowGap: '32px',
        }}
        className="meet-grid"
      >
        {/* Text Column - Left */}
        <div className="meet-text-column">
          {/* Section Title */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-heading-weight-medium)',
              letterSpacing: '0.4px',
              fontSize: '44px',
              color: 'var(--color-text-primary)',
              marginBottom: '32px',
            }}
            className="meet-title"
          >
            Meet Diana Nivara
          </h2>

          {/* Body Text - Exact Copy without Emojis */}
          <div style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--color-text-primary)', opacity: '85%' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-body-weight-regular)',
                marginBottom: '24px',
              }}
            >
              I journey through life with an open mind and curious spirit, drawn to what goes unseen and the layers beneath the surface.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-body-weight-regular)',
                marginBottom: '24px',
              }}
            >
              I notice small details that make moments special. When presence and chemistry are shared, connection unfolds naturally. The moment itself becomes the reward.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-body-weight-regular)',
                marginBottom: '24px',
              }}
            >
              I bring warmth and magnetic energy that invites ease and intimacy. Time flows with mutual energy, allowing moments to feel alive and fully present.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-body-weight-regular)',
                marginBottom: '24px',
              }}
            >
              Versatile and intuitive, I follow a hedonistic, pleasure led approach. Time spent together is instinctive and responsive, shaped by shared energy and mutual enjoyment.
            </p>

            {/* Signature Image */}
            <div
              style={{
                marginTop: '0px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              <img
                src="images/Signature.png"
                alt="Diana Nivara Signature"
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  paddingRight: '0px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Image Column - Right */}
        <div className="meet-image-column">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="default-meet-image"
            style={{
              width: '100%',
              maxHeight: '800px',
              objectFit: 'cover',
              objectPosition: 'center center',
              borderRadius: '0',
              display: 'block',
            }}
          />
          <img
            src="images/Diana-Nivara-Gallery-12.webp"
            alt={imageAlt}
            loading="lazy"
            className="mobile-meet-image"
            style={{
              width: '100%',
              maxHeight: '800px',
              objectFit: 'cover',
              objectPosition: 'center center',
              borderRadius: '0',
              display: 'none',
            }}
          />
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .meet-section {
            padding: 48px 16px !important;
          }
          
          .meet-grid {
            grid-template-columns: 1fr !important;
            row-gap: 24px !important;
          }
          
          .meet-title {
            font-size: 32px !important;
            margin-bottom: 24px !important;
          }
          
          .meet-text-column p {
            font-size: 16px !important;
            margin-bottom: 16px !important;
          }
          
          .meet-image-column img {
            max-height: 400px !important;
          }
        }
        
        /* Very Small Devices (425px and down) */
        @media (max-width: 425px) {
          /* Reduce space between image and logo */
          .meet-section {
            padding-top: 0px !important;
            margin-top: -40px !important;
          }
          
          .meet-text-column div[style*="text-align: center"] {
            text-align: center !important;
            margin-top: 40px !important; /* Match space between signature and mailing list */
          }
          
          .meet-text-column img[src*="Signature.png"] {
            height: 100px !important; /* 50% smaller than the original 200px */
            padding-left: 0px !important; /* Remove left padding for center alignment */
            object-position: center center !important; /* Center the signature */
          }
          
          /* Switch images for small screens */
          .default-meet-image {
            display: none !important;
          }
          
          .mobile-meet-image {
            display: block !important;
          }
        }
        
        /* Tablet - ≤1024px */
        @media (max-width: 1024px) {
          .meet-section {
            padding: 96px 32px !important;
          }
          
          .meet-grid {
            grid-template-columns: 1fr 1fr !important;
            column-gap: 32px !important;
          }
        }
        
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .meet-section {
            padding: 64px 20px !important;
          }
          
          .meet-grid {
            grid-template-columns: 1fr !important;
            column-gap: 0 !important;
            row-gap: 32px !important;
          }
          
          .meet-title {
            font-size: 36px !important;
          }
          
          /* Ensure image appears before text on mobile for better visual flow */
          .meet-image-column {
            order: 1;
          }
          
          .meet-text-column {
            order: 2;
            margin-top: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
