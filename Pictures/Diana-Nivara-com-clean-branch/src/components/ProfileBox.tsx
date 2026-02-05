import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface ProfileBoxProps {
  imageSrc: string;
  imageAlt?: string;
}

// Profile data in exact order as specified
const profileData = [
  { label: 'Ethnicity', value: 'Italian & Belgian' },
  { label: 'Hometown', value: 'Montreal' },
  { label: 'Languages', value: 'English (mother tongue), French (second language)' },
  { label: 'Education', value: 'University educated' },
  { label: 'Age', value: '36' },
  { label: 'Height', value: '5\'9\'\'' },
  { label: 'Hair', value: 'Long curly dark brown w/ red highlights' },
  { label: 'Eyes', value: 'Green' },
  { label: 'Bust', value: 'Small' },
  { label: 'Body type', value: 'Naturally athletic' },
  { label: 'Lifestyle', value: 'Active, smoke & cannabis free' },
  { label: 'Interests', value: 'Sports, wellness, fine dining' },
  { label: 'Best Assets', value: 'Eyes, smile, legs, feet, and my personality' },
];

export default function ProfileBox({ 
  imageSrc, 
  imageAlt = 'Diana Nivara' 
}: ProfileBoxProps) {
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
        padding: '64px 32px',
        backgroundColor: 'var(--color-bg-primary)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '0',
        position: 'relative',
        overflow: 'visible',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease',
      }}
      className="profile-box-section"
    >
      {/* Grid Layout - 40/60 Split */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          columnGap: '48px',
          alignItems: 'center',
        }}
        className="profile-box-grid"
      >
        {/* Image Column - Left */}
        <div className="profile-box-image-column">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            style={{
              width: '100%',
              maxHeight: '520px',
              objectFit: 'cover',
              objectPosition: 'center center',
              borderRadius: '0',
              display: 'block',
            }}
          />
        </div>

        {/* Data Column - Right */}
        <div
          style={{
            maxWidth: '640px',
            textAlign: 'left',
          }}
          className="profile-box-data-column"
        >
          {/* Section Title */}
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-heading-weight-medium)',
              letterSpacing: '0.4px',
              fontSize: '24px',
              color: 'var(--color-text-primary)',
              marginBottom: '24px',
            }}
          >
            Profile
          </h3>

          {/* Profile Data Rows */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {profileData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                }}
              >
                {/* Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-body-weight-medium)',
                    color: 'var(--color-text-muted)',
                    flexShrink: 0,
                  }}
                >
                  {item.label}:
                </span>

                {/* Value */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 'var(--font-body-weight-regular)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTA - Book Our Time Together */}
          <Link
            to="/booking"
            style={{
              display: 'inline-block',
              marginTop: '40px',
              height: '52px',
              padding: '0 36px',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg-primary)',
              fontFamily: 'var(--font-button)',
              fontWeight: 'var(--font-button-weight)',
              textTransform: 'var(--font-button-transform)',
              letterSpacing: 'var(--font-button-letter-spacing)',
              fontSize: '0.875rem',
              border: 'none',
              borderRadius: '28px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background-color var(--transition-hover)',
              lineHeight: '52px',
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
            className="profile-box-cta"
          >
            Book Our Time Together
          </Link>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Tablet - ≤1024px */
        @media (max-width: 1024px) {
          .profile-box-section {
            padding: 64px 32px !important;
          }
          
          .profile-box-grid {
            grid-template-columns: 1fr 1fr !important;
            column-gap: 32px !important;
          }
        }
        
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .profile-box-section {
            padding: 48px 20px !important;
          }
          
          .profile-box-grid {
            grid-template-columns: 1fr !important;
            column-gap: 0 !important;
            row-gap: 32px !important;
          }
          
          /* Ensure image appears before data on mobile */
          .profile-box-image-column {
            order: 1;
          }
          
          .profile-box-data-column {
            order: 2;
          }
          
          /* Center image on mobile */
          .profile-box-image-column img {
            margin: 0 auto;
          }
          
          /* Full-width CTA on mobile */
          .profile-box-cta {
            display: block !important;
            text-align: center !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
