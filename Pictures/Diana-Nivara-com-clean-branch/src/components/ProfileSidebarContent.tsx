import { Link } from 'react-router-dom';

// Profile data in exact order as specified
const profileData = [
  { label: 'Ethnicity', value: 'Italian & Belgian' },
  { label: 'Hometown', value: 'Montreal' },
  { label: 'Languages', value: 'English (mother tongue)\nFrench (second language)' },
  { label: 'Education', value: 'University educated' },
  { label: 'Age', value: '36' },
  { label: 'Height', value: '5\'9\'\'' },
  { label: 'Hair', value: 'Long curly dark brown\nw/ red highlights' },
  { label: 'Eyes', value: 'Green' },
  { label: 'Bust', value: 'Small' },
  { label: 'Body type', value: 'Naturally athletic' },
  { label: 'Lifestyle', value: 'Active, smoke & cannabis free' },
  { label: 'Interests', value: 'Sports, wellness, fine dining' },
  { label: 'Best Assets', value: 'Eyes, smile, legs, feet\nand my personality' },
];

export default function ProfileSidebarContent() {
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: 'var(--color-bg-primary)',
        borderRadius: '0',
        position: 'relative',
        overflow: 'visible',
      }}
      className="profile-box-section"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
        className="profile-box-grid"
      >
        {/* Profile Data Column */}
        <div
          style={{
            width: '100%',
            textAlign: 'left',
          }}
          className="profile-box-data-column"
        >
          {/* Profile Data Rows */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxWidth: '600px',
            }}
          >
            {profileData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  alignItems: 'baseline',
                }}
              >
                {/* Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    fontWeight: 'var(--font-body-weight-medium)',
                    color: 'var(--color-text-muted)',
                      opacity: '60%',
                    textAlign: 'right',
                    paddingRight: '24px',
                  }}
                >
                  {item.label}
                </span>

                {/* Value */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                      opacity: '90%',
                    fontWeight: 'var(--font-body-weight-regular)',
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTA - Book Our Time Together */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '40px',
            }}
          >
            <Link
              to="/booking"
              style={{
                display: 'inline-block',
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
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Screens 508px to 824px - Single line for Hair and Best Assets */
        @media (min-width: 508px) and (max-width: 824px) {
          .profile-box-data-column > div > div:nth-child(7) > span:nth-child(2),
          .profile-box-data-column > div > div:nth-child(13) > span:nth-child(2) {
            white-space: nowrap !important;
          }
        }
        
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          /* Full-width CTA on mobile */
          .profile-box-cta {
            display: block !important;
            text-align: center !important;
            width: 80% !important;
          }
        }
      `}</style>
    </section>
  );
}
