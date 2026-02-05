import React from 'react';

/**
 * BookingPolicy component - Displays introduction text and cancellation policy
 */
const BookingPolicy: React.FC = React.memo(() => {
  return (
    <div style={{ maxWidth: '1200px', marginBottom: '32px' }}>
      {/* Introduction Text */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          opacity: '90%',
          lineHeight: '1.9',
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
        }}
      >
        I welcome inquiries from those who are intentional and ready to make the time to connect.
        <br />
        I am inclusive of all genders, orientations, and backgrounds.
        <br />
        Before reaching out, I kindly ask that you review my availability, as this helps ensure a smooth booking experience.
        <br />
        I aim to respond within 24 hours, though occasionally it may take a little longer.
        <br />
        Advance notice is appreciated whenever possible.
        <br />
        All booking requests must be confirmed by email or phone before they are considered official.
      </p>

      {/* Cancellation Policy Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '48px',
          marginBottom: '24px',
        }}
        className="cancellation-title-container"
      >
        <div
          style={{
            height: '1px',
            width: '40px',
            backgroundColor: 'var(--color-text-primary)',
            opacity: '0.8',
            marginRight: '16px',
            borderRadius: '4px',
          }}
          className="cancellation-title-line"
        />
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '40px',
            fontWeight: 'var(--font-heading-weight-medium)',
            color: 'var(--color-text-primary)',
            margin: '0',
            whiteSpace: 'nowrap',
          }}
          className="cancellation-title"
        >
          Cancellation Policy
        </h3>
        <div
          style={{
            height: '1px',
            width: '40px',
            backgroundColor: 'var(--color-text-primary)',
            opacity: '0.8',
            marginLeft: '16px',
            borderRadius: '4px',
          }}
          className="cancellation-title-line"
        />
      </div>

      {/* Cancellation Policy Text */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          opacity: '90%',
          lineHeight: '1.9',
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
        }}
      >
        Life happens, and I completely understand if plans change.
        <br />
        Please provide 24 hours' notice so we can adjust accordingly.
        <br />
        I extend the same understanding if I must reschedule.
      </p>
      
      {/* Responsive Styles */}
      <style>{`
        /* Very Small Devices (425px and down) */
        @media (max-width: 425px) {
          .cancellation-title {
            font-size: 32px !important;
          }
          
          .cancellation-title-line {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
});

BookingPolicy.displayName = 'BookingPolicy';

export default BookingPolicy;
