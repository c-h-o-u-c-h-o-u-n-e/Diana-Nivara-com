import React from 'react';
import { useBookingForm } from '../hooks/useBookingForm';
import BookingHeader from '../components/Booking/BookingHeader';
import BookingPolicy from '../components/Booking/BookingPolicy';
import BookingForm from '../components/Booking/BookingForm';

/**
 * BookingPage component - Main booking page that orchestrates all booking components
 */
const BookingPage: React.FC = () => {
  // Use the custom hook for form logic
  const {
    formData,
    errors,
    isPending,
    mutationError,
    isSubmitted,
    days,
    months,
    years,
    handleChange,
    handleExperienceTypeChange,
    handleSubmit,
  } = useBookingForm();

  // Render thank you message if form is submitted
  if (isSubmitted) {
    return (
      <div className="w-full">
        <section
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '20px 32px',
            paddingTop: '24px', /* Match the profile title top spacing */
            backgroundColor: 'var(--color-bg-primary)',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '48px',
                  fontWeight: '400',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              Thank You
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'var(--color-text-primary)',
              }}
            >
              Your booking inquiry has been received.<br/>I will respond within 24 hours.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Render main booking page
  return (
    <div className="w-full">
      <section
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 32px',
          paddingTop: '24px', /* Match the profile title top spacing */
          backgroundColor: 'var(--color-bg-primary)',
        }}
        className="booking-section"
      >
        {/* Header with decorative lines */}
        <BookingHeader />

        {/* Introduction and cancellation policy */}
        <BookingPolicy />

        {/* Main booking form */}
        <BookingForm
          formData={formData}
          errors={errors}
          isPending={isPending}
          mutationError={mutationError}
          days={days}
          months={months}
          years={years}
          handleChange={handleChange}
          handleExperienceTypeChange={handleExperienceTypeChange}
          handleSubmit={handleSubmit}
        />
      </section>

      {/* Responsive Styles */}
      <style>{`
        /* Placeholder Styles */
        input::placeholder, textarea::placeholder {
          opacity: 0.6;
        }
        
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .booking-section {
            padding: 0px 20px !important;
          }
          
          .booking-title {
            font-size: 56px !important;
          }
          
          .booking-title-container div:first-child,
          .booking-title-container div:last-child {
            display: none !important;
          }
          
          .form-row-responsive,
          .date-row-responsive {
            grid-template-columns: 1fr !important;
          }

          .outcall-fields-container {
            max-height: 240px !important;
          }

          .outcall-fields-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
