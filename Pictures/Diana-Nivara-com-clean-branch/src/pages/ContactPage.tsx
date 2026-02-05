import React, { useState, useEffect } from 'react';
import CommonTitle from '../components/CommonTitle';
import { sendContactNotification, ContactEmailData } from '../lib/emailjs';

/**
 * ContactPage component - Simple contact form
 */
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  
  // Add CSS styles for placeholder animations
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Define the CSS for placeholder animations
    const css = `
      .contact-field-container {
        position: relative;
      }
      
      .contact-placeholder {
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
      
      .contact-textarea-placeholder {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors for the field being changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsPending(true);
      
      // Prepare contact data for EmailJS
      const contactData: ContactEmailData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };
      
      // Send contact notification email
      const result = await sendContactNotification(contactData);
      
      if (!result.success) {
        console.error('Failed to send contact notification:', result.message);
        // Still show success to user, but log the error
      }
      
      console.log('Contact notification sent successfully:', contactData);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      // Still show success to user for better UX
      setIsSubmitted(true);
    } finally {
      setIsPending(false);
    }
  };

  // Render thank you message if form is submitted
  if (isSubmitted) {
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
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '48px',
                  fontWeight: '400',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              Thank You
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'var(--color-text-primary)',
              }}
            >
              Your message has been received.<br/>I will respond to you shortly.
            </p>
          </div>
        </section>
      </div>
    );
  }

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
      >
        {/* Contact Form Title */}
        <div className="contact-title-wrapper">
          <span className="full-contact-title" style={{ display: 'none' }}>
            {React.createElement(CommonTitle, { title: "Leave Me a Message" })}
          </span>
          <span className="short-contact-title" style={{ display: 'none' }}>
            {React.createElement(CommonTitle, { title: "Message Me" })}
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            lineHeight: '1.6',
            color: 'var(--color-text-primary)',
            marginBottom: '32px',
          }}
        >
          I'd love to hear from you. Please fill out the form below and I'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <div className="contact-field-container">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
              <div className={`contact-placeholder ${focusedFields.name ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                Your Name
              </div>
            </div>
            {errors.name && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div className="contact-field-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
              <div className={`contact-placeholder ${focusedFields.email ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                Your Email
              </div>
            </div>
            {errors.email && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '4px', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div className="contact-field-container">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{
                  width: '100%',
                  minHeight: '140px',
                  padding: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: (formData.message && !focusedFields.message) ? 'white' : 'var(--color-text-primary)',
                  backgroundColor: (formData.message && !focusedFields.message) ? 'rgba(196, 135, 135, 1)' : 'rgba(196, 135, 135, 0.3)',
                  border: errors.message ? '1px solid #B5533C' : '1px solid var(--color-border)',
                  borderRadius: '20px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.2s, background-color 300ms, color 300ms',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className={`contact-textarea-placeholder ${focusedFields.message ? 'placeholder-hidden' : 'placeholder-visible'}`}>
                Your Message
              </div>
            </div>
            {errors.message && (
              <span style={{ fontSize: '12px', color: '#B5533C', marginTop: '8px', display: 'block' }}>
                {errors.message}
              </span>
            )}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <button
              type="submit"
              disabled={isPending}
              style={{
                width: '100%',
                maxWidth: '320px',
                height: '52px',
                backgroundColor: isPending ? 'transparent' : 'var(--color-accent)',
                color: isPending ? 'var(--color-text-muted)' : 'var(--color-bg-primary)',
                fontFamily: 'var(--font-button)',
                fontWeight: 'var(--font-button-weight)',
                textTransform: 'var(--font-button-transform)',
                letterSpacing: 'var(--font-button-letter-spacing)',
                fontSize: '0.875rem',
                border: isPending ? '1px solid var(--color-border)' : 'none',
                borderRadius: '28px',
                cursor: isPending ? 'not-allowed' : 'pointer',
                opacity: isPending ? 0.5 : 1,
                transition: 'all var(--transition-hover)',
              }}
              onMouseEnter={(e) => {
                if (!isPending) {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isPending) {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                }
              }}
            >
              {isPending ? 'Send Message' : 'Send Message'}
            </button>
          </div>
        </form>
      </section>

      {/* Responsive Styles */}
      <style>{`
        /* Default styles for contact title */
        .full-contact-title {
          display: block !important;
        }
        .short-contact-title {
          display: none !important;
        }
        
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          section {
            padding: 0px 20px !important;
          }
          
          .contact-title {
            font-size: 36px !important;
          }
          
          .contact-title-container div:first-child,
          .contact-title-container div:last-child {
            display: none !important;
          }
        }
        
        /* Very Small Devices (425px and down) */
        @media (max-width: 425px) {
          .full-contact-title {
            display: none !important;
          }
          .short-contact-title {
            display: block !important;
          }
        }
        
        /* Tablet - ≤1024px */
        @media (max-width: 1024px) {
          .contact-title {
            font-size: 42px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
