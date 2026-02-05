import React, { useState, useEffect } from 'react';
import CustomSelect from '../../components/CustomSelect';
import { FormData, formatPhoneNumber, isFormValid, validateForm } from '../../utils/bookingHelpers';
import { durations, socialHoursOptions } from '../../constants/pricingData';
import { useToast } from '../../hooks/use-toast';

interface BookingFormProps {
  formData: FormData;
  errors: Record<string, string>;
  isPending: boolean;
  mutationError: { message: string } | null;
  days: string[];
  months: string[];
  years: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleExperienceTypeChange: (type: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

/**
 * BookingForm component - Main form with all fields
 */
const BookingForm: React.FC<BookingFormProps> = React.memo(({
  formData,
  errors,
  isPending,
  mutationError,
  days,
  months,
  years,
  handleChange,
  handleExperienceTypeChange,
  handleSubmit
}) => {
  // State to track which fields have focus
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  
  // Toast hook for showing validation messages
  const { toast } = useToast();
  
  // Add CSS styles for placeholder animations
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Define the CSS for placeholder animations
    const css = `
      .form-field-container {
        position: relative;
      }
      
      .placeholder {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        font-family: var(--font-body);
        font-size: 18px;
        color: var(--color-text-muted);
        pointer-events: none;
        transition: opacity 300ms ease;
      }
      
      .textarea-placeholder {
        position: absolute;
        left: 16px;
        top: 16px;
        font-family: var(--font-body);
        font-size: 18px;
        color: var(--color-text-muted);
        pointer-events: none;
        transition: opacity 300ms ease;
      }
      
      .placeholder-hidden {
        opacity: 0;
      }
      
      .placeholder-visible {
        opacity: 1;
      }
    `;
    
    // Set the CSS content
    styleEl.textContent = css;
    
    // Append to the document head
    document.head.appendChild(styleEl);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // Handle input focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    
    // Update border color for all 4 borders
    if (!errors[name as keyof typeof errors]) {
      e.currentTarget.style.borderColor = 'var(--color-accent)';
    }
    
    // Update focused state
    setFocusedFields(prev => ({ ...prev, [name]: true }));
  };
  
  // Handle input blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Update border color for all 4 borders
    if (!errors[name as keyof typeof errors]) {
      e.currentTarget.style.borderColor = 'var(--color-border)';
    }
    
    // Update focused state - only if the field is empty
    if (!value.trim()) {
      setFocusedFields(prev => ({ ...prev, [name]: false }));
    }
  };

  // Custom submit handler that shows validation messages via toast
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If form is valid, proceed with normal submission
    if (isFormValid(formData) && !isPending) {
      await handleSubmit(e);
      return;
    }
    
    // If form is invalid, show validation errors via toast
    const validationErrors = validateForm(formData);
    const errorMessages = Object.values(validationErrors);
    
    if (errorMessages.length > 0) {
      // Show the first error message in a toast
      toast({
        title: "Please complete the following:",
        description: errorMessages[0],
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Book Our Time Together Section Title */}
      <div
        id="book-time"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '64px',
          marginBottom: '32px',
        }}
        className="book-time-title-container"
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
          className="book-time-title-line"
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
          className="book-time-title"
        >
          Book Our Time Together
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
          className="book-time-title-line"
        />
      </div>

      {/* Personal Information */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row-responsive">
          {/* Name */}
          <div>
              <div className="form-field-container">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: (formData.name && !focusedFields.name) ? 'white' : 'var(--color-text-primary)',
                    backgroundColor: (formData.name && !focusedFields.name) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                    border: errors.name ? '1px solid #B5533C' : '1px solid var(--color-border)',
                    borderRadius: '20px',
                    outline: 'none',
                    transition: 'border-color 0.2s, background-color 300ms, color 300ms',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className={`placeholder ${focusedFields.name ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                  Name
                </div>
              </div>
            {errors.name && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>

          {/* Age */}
          <div>
              <div className="form-field-container">
                <input
                  type="text"
                  inputMode="numeric"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 2) {
                      value = value.slice(0, 2);
                    }
                    handleChange({
                      ...e,
                      target: { ...e.target, name: 'age', value }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  required
                  autoComplete="off"
                  maxLength={2}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: (formData.age && !focusedFields.age) ? 'white' : 'var(--color-text-primary)',
                    backgroundColor: (formData.age && !focusedFields.age) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                    border: errors.age ? '1px solid #B5533C' : '1px solid var(--color-border)',
                    borderRadius: '20px',
                    outline: 'none',
                    transition: 'border-color 0.2s, background-color 300ms, color 300ms',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {/* Default Age placeholder */}
                <div className={`placeholder ${focusedFields.age ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                  Age
                </div>
                {/* Years Old placeholder - appears when focused or filled */}
                <div 
                  className={`placeholder ${(focusedFields.age || formData.age) ? 'placeholder-visible' : 'placeholder-hidden'}`}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: 'var(--color-text-muted)',
                    pointerEvents: 'none',
                    transition: 'opacity 300ms ease',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Years Old
                </div>
              </div>
            {errors.age && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
                {errors.age}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-responsive">
          {/* Email */}
          <div>
              <div className="form-field-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: (formData.email && !focusedFields.email) ? 'white' : 'var(--color-text-primary)',
                    backgroundColor: (formData.email && !focusedFields.email) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                    border: errors.email ? '1px solid #B5533C' : '1px solid var(--color-border)',
                    borderRadius: '20px',
                    outline: 'none',
                    transition: 'border-color 0.2s, background-color 300ms, color 300ms',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className={`placeholder ${focusedFields.email ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                  Email
                </div>
              </div>
            {errors.email && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
              <div className="form-field-container">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const formattedValue = formatPhoneNumber(e.target.value);
                    handleChange({
                      ...e,
                      target: { ...e.target, name: 'phone', value: formattedValue }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  autoComplete="tel"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: (formData.phone && !focusedFields.phone) ? 'white' : 'var(--color-text-primary)',
                    backgroundColor: (formData.phone && !focusedFields.phone) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '20px',
                    outline: 'none',
                    transition: 'border-color 0.2s, background-color 300ms, color 300ms',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className={`placeholder ${focusedFields.phone ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                  Phone (optional)
                </div>
              </div>
          </div>
        </div>

        {/* Couple Checkbox */}
        <div style={{ marginTop: '36px', marginLeft: '16px', marginBottom: '84px' }}>
          <label
            htmlFor="isCouple"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="isCouple"
                name="isCouple"
                checked={formData.isCouple}
                onChange={handleChange}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              />
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  border: `1px solid ${formData.isCouple ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  backgroundColor: formData.isCouple ? 'var(--color-accent)' : 'transparent',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  pointerEvents: 'none',
                }}
              >
                {formData.isCouple && (
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L4.5 8.5L11 1.5"
                      stroke="var(--color-bg-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                marginLeft: '6px',
                color: 'var(--color-text-primary)',
              }}
              className="couple-booking-text"
            >
              <span className="full-couple-text">We would like to book as a couple</span>
              <span className="short-couple-text">Book as a couple</span>
            </span>
          </label>
        </div>
      </div>

      {/* Booking Details */}
      <div style={{ marginBottom: '16px' }}>
        {/* When should I reserve time for us? Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
          }}
          className="when-title-container"
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
            className="when-title-line"
          />
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '40px',
              fontWeight: 'var(--font-heading-weight-medium)',
              color: 'var(--color-text-primary)',
              margin: '0',
              whiteSpace: 'nowrap',
            }}
            className="when-title"
          >
            <span className="full-when-title">When should I reserve time for us?</span>
            <span className="short-when-title">When and where?</span>
          </h4>
          <div
            style={{
              height: '1px',
              width: '40px',
              backgroundColor: 'var(--color-text-primary)',
              opacity: '0.8',
              marginLeft: '16px',
              borderRadius: '4px',
            }}
            className="when-title-line"
          />
        </div>

        {/* Date Selection */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 2fr', gap: '16px' }} className="date-row-responsive">
            <CustomSelect
              id="day"
              name="day"
              value={formData.day}
              onChange={(value) => handleChange({ target: { name: 'day', value } } as any)}
              options={days}
              placeholder="Day"
              error={!!errors.date}
            />

            <CustomSelect
              id="month"
              name="month"
              value={formData.month}
              onChange={(value) => {
                // If a day is selected and we change month, adjust the day if needed
                handleChange({ target: { name: 'month', value } } as any);
              }}
              options={months}
              placeholder="Month"
              error={!!errors.date}
            />

            <CustomSelect
              id="year"
              name="year"
              value={formData.year}
              onChange={(value) => {
                // If month and day are selected and we change year, adjust the day if needed
                handleChange({ target: { name: 'year', value } } as any);
              }}
              options={years}
              placeholder="Year"
              error={!!errors.date}
            />
            
            {/* Time Window Input */}
            <div className="form-field-container">
              <input
                type="text"
                id="timeWindow"
                name="timeWindow"
                value={formData.timeWindow}
                onChange={handleChange}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: (formData.timeWindow && !focusedFields.timeWindow) ? 'white' : 'var(--color-text-primary)',
                  backgroundColor: (formData.timeWindow && !focusedFields.timeWindow) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '20px',
                  outline: 'none',
                  transition: 'border-color 0.2s, background-color 300ms, color 300ms',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className={`placeholder ${focusedFields.timeWindow ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                Enter your available time window
              </div>
            </div>
          </div>
          {errors.date && (
            <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
              {errors.date}
            </span>
          )}
        </div>

        {/* Duration and Experience Type */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row-responsive">
          <div>
            <CustomSelect
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={(value) => handleChange({ target: { name: 'duration', value } } as any)}
              options={durations}
              placeholder="Duration"
              error={!!errors.duration}
            />
            {errors.duration && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
                {errors.duration}
              </span>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', gap: '0', height: '48px', position: 'relative' }}>
              <button
                type="button"
                onClick={() => handleExperienceTypeChange('Incall')}
                style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: formData.experienceType === 'Incall' ? 'rgba(196, 135, 135, 0.3)' : 'transparent',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  border: '1px solid var(--color-border)',
                  borderRight: 'none',
                  borderTopLeftRadius: '20px',
                  borderBottomLeftRadius: '20px',
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
                onMouseEnter={(e) => {
                  if (formData.experienceType !== 'Incall') {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 122, 107, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.experienceType !== 'Incall') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgba(196, 135, 135, 0.3)';
                  }
                }}
              >
                Incall
              </button>
              
              {/* Center Divider */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '0',
                  width: '1px',
                  height: '100%',
                  backgroundColor: 'var(--color-border)',
                  pointerEvents: 'none',
                }}
              />
              
              <button
                type="button"
                onClick={() => handleExperienceTypeChange('Outcall')}
                style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: formData.experienceType === 'Outcall' ? 'rgba(196, 135, 135, 0.3)' : 'transparent',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  border: '1px solid var(--color-border)',
                  borderLeft: 'none',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                  borderTopRightRadius: '20px',
                  borderBottomRightRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
                onMouseEnter={(e) => {
                  if (formData.experienceType !== 'Outcall') {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 122, 107, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.experienceType !== 'Outcall') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgba(196, 135, 135, 0.3)';
                  }
                }}
              >
                Outcall
              </button>
            </div>
            {errors.experienceType && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
                {errors.experienceType}
              </span>
            )}
          </div>
        </div>

        {/* Outcall Location & Social Time - Animated */}
        <div
          style={{
            maxHeight: formData.experienceType === 'Outcall' ? '200px' : '0',
            opacity: formData.experienceType === 'Outcall' ? 1 : 0,
            overflow: formData.experienceType === 'Outcall' ? 'visible' : 'hidden',
            transition: 'max-height 300ms ease, opacity 300ms ease',
            marginTop: formData.experienceType === 'Outcall' ? '16px' : '0',
            marginBottom: formData.experienceType === 'Outcall' ? '16px' : '0',
          }}
          className="outcall-fields-container"
          data-active={formData.experienceType === 'Outcall' ? 'true' : 'false'}
        >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                alignItems: 'flex-start',
              }}
              className="outcall-fields-row"
            >
            {/* Outcall Location Field */}
            <div className="form-field-container">
              <input
                type="text"
                id="outCallLocation"
                name="outCallLocation"
                value={formData.outCallLocation}
                onChange={handleChange}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: (formData.outCallLocation && !focusedFields.outCallLocation) ? 'white' : 'var(--color-text-primary)',
                  backgroundColor: (formData.outCallLocation && !focusedFields.outCallLocation) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '20px',
                  outline: 'none',
                  transition: 'border-color 0.2s, background-color 300ms, color 300ms',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className={`placeholder ${focusedFields.outCallLocation ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                Outcall Location (optional)
              </div>
            </div>

            {/* Social Time Option - Right Aligned */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '48px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Add social time <span style={{ color: 'var(--color-accent)' }}>* </span>:
                </span>
                <div style={{ width: '265px' }}>
                  <CustomSelect
                    id="socialHours"
                    name="socialHours"
                    value={formData.socialHours}
                    onChange={(value) => handleChange({ target: { name: 'socialHours', value } } as any)}
                    options={socialHoursOptions}
                    placeholder="Select"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Time Description - Full Width, Right Aligned */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '26px', marginBottom: '84px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--color-text-primary)',
                opacity: '80%',
                textAlign: 'right',
                margin: '0',
                maxWidth: '100%',
              }}
            >
              <span style={{ color: 'var(--color-accent)' }}>*</span> Social time is shared moments, before or after outcall, without public displays of affection.
            </p>
          </div>
        </div>
      </div>


      {/* About You */}
      <div 
        style={{ 
          marginBottom: '40px',
          marginTop: '80px'
        }}
        className="about-you-section"
      >
        {/* Tell Me More About You Section Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
              marginTop: '82px',
          }}
          className="about-you-title-container"
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
            className="about-you-title-line"
          />
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '40px',
              fontWeight: 'var(--font-heading-weight-medium)',
              color: 'var(--color-text-primary)',
              margin: '0',
              whiteSpace: 'nowrap',
            }}
            className="about-you-title"
          >
            Tell Me More About You
          </h4>
          <div
            style={{
              height: '1px',
              width: '40px',
              backgroundColor: 'var(--color-text-primary)',
              opacity: '0.8',
              marginLeft: '16px',
              borderRadius: '4px',
            }}
            className="about-you-title-line"
          />
        </div>

        <label
          htmlFor="aboutYou"
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--color-text-primary)',
            marginBottom: '40px',
          }}
        >
          I'd love to hear a little about you and what your expectations are for our time together.
        </label>
        <div>
          <div className="form-field-container">
            <textarea
              id="aboutYou"
              name="aboutYou"
              value={formData.aboutYou}
              onChange={handleChange}
              required
              rows={6}
              maxLength={475}
              style={{
                width: '100%',
                minHeight: '140px',
                padding: '16px',
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                lineHeight: '1.6',
                color: (formData.aboutYou && !focusedFields.aboutYou) ? 'white' : 'var(--color-text-primary)',
                backgroundColor: (formData.aboutYou && !focusedFields.aboutYou) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                border: errors.aboutYou ? '1px solid #B5533C' : '1px solid var(--color-border)',
                borderRadius: '20px',
                outline: 'none',
                resize: 'none',
                transition: 'border-color 0.2s, background-color 300ms, color 300ms',
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div className={`textarea-placeholder ${focusedFields.aboutYou ? 'placeholder-hidden' : 'placeholder-visible'}`}>
              Tell me more...
            </div>
          </div>
          {errors.aboutYou && (
            <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '8px', display: 'block' }}>
              {errors.aboutYou}
            </span>
          )}
        </div>
      </div>


      {/* Responsive Styles */}
      <style>{`
        /* Default styles for text variations */
        .full-couple-text, .full-when-title {
          display: inline;
        }
        .short-couple-text, .short-when-title {
          display: none;
        }
        
        /* Very Small Devices (425px and down) */
        @media (max-width: 425px) {
          /* Switch text variations */
          .full-couple-text, .full-when-title {
            display: none;
          }
          .short-couple-text, .short-when-title {
            display: inline;
          }
          
          /* Book Our Time Together section */
          .book-time-title {
            font-size: 32px !important;
          }
          
          .book-time-title-line {
            display: none !important;
          }
          
          /* When section */
          .when-title {
            font-size: 32px !important;
          }
          
          .when-title-line {
            display: none !important;
          }
          
          /* About You section */
          .about-you-title {
            font-size: 32px !important;
          }
          
          .about-you-title-line {
            display: none !important;
          }
          
          .about-you-section {
            padding-top: 0px !important;
            transition: margin-top 300ms ease, transform 300ms ease;
          }
          
          /* Always show outcall fields on small screens */
          .outcall-fields-container {
            max-height: 200px !important;
            opacity: 0.5 !important;
            overflow: visible !important;
            margin-top: 16px !important;
            margin-bottom: 16px !important;
            pointer-events: none !important;
          }
          
          /* When outcall is selected, make fields active */
          .outcall-fields-container[data-active="true"] {
            opacity: 1 !important;
            pointer-events: auto !important;
          }
          
          /* No need to push the About You section down since fields are always visible */
          .about-you-section {
            margin-top: 85px !important;
          }
        }
      `}</style>
      
      {/* Submit Button - Styled like Hero CTA */}
      <div style={{ 
        textAlign: 'center',
        marginBottom: '32px',
        marginTop: '32px'
      }}>
        <button
          type="submit"
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
            fontSize: '16px',
            border: 'none',
            borderRadius: '28px',
            cursor: 'pointer',
            transition: 'background-color var(--transition-hover)',
            lineHeight: '52px',
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
          aria-label="Submit booking inquiry"
        >
          {isPending ? 'Submit' : 'Submit'}
        </button>
      </div>

      {mutationError && (
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#FEE',
            border: '1px solid #B5533C',
            borderRadius: '0',
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            color: '#B5533C',
            textAlign: 'center',
          }}
        >
          Error: {mutationError.message}
        </div>
      )}
    </form>
  );
});

BookingForm.displayName = 'BookingForm';

export default BookingForm;
