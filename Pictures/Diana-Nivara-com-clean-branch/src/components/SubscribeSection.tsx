import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { subscribeToBrevo } from '../lib/brevo';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showAddMeText, setShowAddMeText] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationHasRun, setAnimationHasRun] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const controls = useAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If animation has already run once, don't run it again
    if (animationHasRun) {
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitting(true);
    setIsAnimating(true);
    setShowAddMeText(false);
    setAnimationHasRun(true);
    
    // Show confetti after a short delay to allow text to fade out
    setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    
    // Start the filling animation
    await controls.start({
      scaleX: 1,
      transition: { duration: 0.75, ease: "easeInOut" }
    });
    
    try {
      const result = await subscribeToBrevo(email);
      
      if (result.success) {
        // Set up thank you message before unfilling
        setShowThankYou(true);
        
        // Start the unfilling animation
        await controls.start({
          scaleX: 0,
          transition: { duration: 0.75, ease: "easeInOut" }
        });
        
        setIsAnimating(false);
        setIsSubmitting(false);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
        await controls.start({
          scaleX: 0,
          transition: { duration: 0.25, ease: "easeInOut" }
        });
        setIsAnimating(false);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Something went wrong. Please try again.');
      await controls.start({
        scaleX: 0,
        transition: { duration: 0.25, ease: "easeInOut" }
      });
      setIsAnimating(false);
      setIsSubmitting(false);
    }
  };

  const handleSimpleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitting(true);
    
    try {
      const result = await subscribeToBrevo(email);
      
      if (result.success) {
        setShowThankYou(true);
        setIsSubmitting(false);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="subscribe-section"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-bg-)',
        padding: '64px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div className="subscribe-heading-container">
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '44px',
                fontWeight: 'var(--font-heading-weight-medium)',
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                lineHeight: '1',
              }}
              className="subscribe-heading"
            >

            </h3>
            
            {/* Horizontal line after title for mobile screens */}
            <div className="subscribe-title-line-after"></div>
          </div>
          
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-text-primary)',
              opacity: '85%',
              lineHeight: '1.7',
              marginBottom: '20px',
              marginTop: '0px',
              maxWidth: '600px',
              margin: '0 auto 20px',
            }}
          >
            Curious to see more of me and stay in touch?
            Through my private mailing list, I share personal notes,
            photos and updates you won't find anywhere else.
          </p>

          {/* Simple email input for small screens */}
          <div className="simple-subscribe-form">
            <form onSubmit={handleSimpleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                      setShowThankYou(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSimpleSubmit(e);
                      }
                    }}
                    placeholder="Enter your email here"
                    required
                    disabled={isSubmitting || showThankYou}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      paddingRight: '90px', /* Add padding to prevent text from going under the button */
                      fontFamily: 'var(--font-body)',
                      fontSize: '17px',
                      color: 'var(--color-text-primary)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--color-text-primary)',
                      borderRadius: '0px',
                      outline: 'none',
                      textAlign: 'left',
                    }}
                    onFocus={(e) => {
                      // Change border color to accent when focused
                      e.currentTarget.style.borderBottomColor = 'var(--color-accent)';
                      e.currentTarget.classList.remove('placeholder-visible');
                      e.currentTarget.classList.add('placeholder-hidden');
                    }}
                    onBlur={(e) => {
                      // Restore original border color when not focused
                      e.currentTarget.style.borderBottomColor = 'var(--color-text-primary)';
                      if (!e.currentTarget.value) {
                        e.currentTarget.classList.remove('placeholder-hidden');
                        e.currentTarget.classList.add('placeholder-visible');
                      }
                    }}
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || showThankYou}
                    className="mobile-add-me-button"
                    style={{
                      position: 'absolute',
                      right: '0',
                      height: '40px',
                      padding: '0 16px',
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-bg-primary)',
                      fontFamily: 'var(--font-button)',
                      fontWeight: 'var(--font-button-weight)',
                      textTransform: 'var(--font-button-transform)',
                      letterSpacing: 'var(--font-button-letter-spacing)',
                      fontSize: '0.9rem',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: isSubmitting || showThankYou ? 'not-allowed' : 'pointer',
                      transition: 'transform 300ms ease',
                      whiteSpace: 'nowrap',
                      zIndex: 2,
                    }}
                  >
                    <span 
                      style={{ 
                        display: 'inline-block',
                        transition: 'transform 300ms ease',
                      }}
                      className="add-me-text"
                    >
                      Add Me
                    </span>
                  </button>
                </div>
                
                {showThankYou && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      pointerEvents: 'none',
                      backgroundColor: 'var(--color-bg-)', /* Add background to hide placeholder */
                      zIndex: 1, /* Ensure it's above the input */
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '17px',
                        color: 'var(--color-accent)',
                        margin: 0,
                      }}
                    >
                      Thank you =)
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    color: '#B5533C',
                    margin: '8px 0 0 0',
                  }}
                >
                  {error}
                </p>
              )}
            </form>
          </div>

          {/* Animated form for larger screens */}
          <div className="animated-subscribe-form">
            <div style={{ height: '60px', marginBottom: '10px', position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '0px',
                    marginBottom: '8px',
                  }}
                  className="subscribe-form-row"
                >
                  <button
                    type="button"
                    style={{
                      height: '48px',
                      padding: '0 24px',
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-bg-primary)',
                      fontFamily: 'var(--font-button)',
                      fontWeight: 'var(--font-button-weight)',
                      textTransform: 'var(--font-button-transform)',
                      letterSpacing: 'var(--font-button-letter-spacing)',
                      fontSize: '0.9rem',
                      border: 'none',
                      borderTop: '1px solid var(--color-accent)',
                      borderBottom: '1px solid var(--color-accent)',
                      borderRadius: '28px 0 0 28px',
                      cursor: 'default',
                      pointerEvents: 'none',
                      transition: 'background-color var(--transition-hover)',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ position: 'relative' }}>
                      {isSubmitting ? 'Stay Connected' : 'Stay Connected'}
                    </span>
                  </button>

                  <div 
                    style={{ 
                      position: 'relative',
                      flex: 1,
                      height: '48px',
                    }}
                  >
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter your email here"
                      required
                      disabled={isAnimating || showThankYou}
                      style={{
                    width: '100%',
                    height: '100%',
                    padding: '0 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    color: 'var(--color-text-primary)',
                    opacity: showThankYou ? '0' : '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderTop: '4px solid var(--color-accent)',
                    borderBottom: '4px solid var(--color-accent)',
                    borderRadius: '0px',
                    outline: 'none',
                    position: 'relative',
                    zIndex: 0,
                    textAlign: 'center',
                      }}
                      onFocus={(e) => {
                        // Always keep border color as accent with 100% opacity
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                        e.currentTarget.classList.remove('placeholder-visible');
                        e.currentTarget.classList.add('placeholder-hidden');
                      }}
                      onBlur={(e) => {
                        // Always keep border color as accent with 100% opacity
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                        if (!e.currentTarget.value) {
                          e.currentTarget.classList.remove('placeholder-hidden');
                          e.currentTarget.classList.add('placeholder-visible');
                        }
                      }}
                    />
                    
                    {/* Thank you message that appears after animation */}
                    {showThankYou && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '16px',
                          zIndex: 2,
                          pointerEvents: 'none',
                          borderTop: '4px solid var(--color-accent)',
                          borderBottom: '4px solid var(--color-accent)',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '17px',
                            color: 'var(--color-accent)',
                            margin: 0,
                          }}
                        >
                          Thank you =)
                        </p>
                      </div>
                    )}
                    
                    {/* Animated fill overlay */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={controls}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--color-accent)',
                        originX: 0,
                        zIndex: 0,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isAnimating || animationHasRun}
                    style={{
                      height: '48px',
                      padding: '0 16px',
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-bg-primary)',
                      fontFamily: 'var(--font-button)',
                      fontWeight: 'var(--font-button-weight)',
                      textTransform: 'var(--font-button-transform)',
                      letterSpacing: 'var(--font-button-letter-spacing)',
                      fontSize: '0.9rem',
                      border: 'none',
                      borderTop: '1px solid var(--color-accent)',
                      borderBottom: '1px solid var(--color-accent)',
                      borderRadius: '0 28px 28px 0',
                      cursor: showAddMeText ? ((isSubmitting || isAnimating || animationHasRun) ? 'not-allowed' : 'pointer') : 'default',
                      transition: 'transform var(--transition-hover)',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {showConfetti && (
                      <img 
                        src="/icons/confetti.gif" 
                        alt="Confetti" 
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) scaleX(-1)',
                          width: '70%',
                          height: '70%',
                          objectFit: 'cover',
                          opacity: 0,
                          animation: 'fadeIn 0.3s forwards',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                    <span 
                      style={{ 
                        display: 'inline-block',
                        transition: 'transform 0.2s ease, opacity 0.3s ease',
                        opacity: showAddMeText ? 1 : 0,
                        position: 'relative',
                        zIndex: 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting && !isAnimating && showAddMeText) {
                          e.currentTarget.style.animation = 'pulsate 0.8s ease-in-out infinite';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting && !isAnimating && showAddMeText) {
                          e.currentTarget.style.animation = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      Add Me
                    </span>
                  </button>
                </div>

                {error && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '17px',
                      color: '#B5533C',
                      margin: '8px 0 0 0',
                    }}
                  >
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--color-text-muted)',
              opacity: '85%',
              lineHeight: '1.5',
              margin: '0 auto',
              maxWidth: '600px',
            }}
            className="privacy-text"
          >
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulsate {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .mobile-add-me-button:hover .add-me-text {
          animation: pulsate 300ms ease-in-out infinite;
        }
        
        @keyframes placeholderFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes placeholderFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        input::placeholder {
          transition: opacity 300ms ease;
        }
        
        input.placeholder-hidden::placeholder {
          opacity: 0;
          animation: placeholderFadeOut 300ms ease forwards;
        }
        
        input.placeholder-visible::placeholder {
          opacity: 1;
          animation: placeholderFadeIn 300ms ease forwards;
        }
        
        /* Ensure the input field itself remains visible */
        .simple-subscribe-form input {
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        /* Hide on larger screens, show on smaller screens */
        .subscribe-section {
          display: none;
        }
        
        /* By default, show animated form and hide simple form */
        .animated-subscribe-form {
          display: block;
        }
        
        .simple-subscribe-form {
          display: none;
        }
        
        /* Show on screens between 1025px and 1204px, and also 1024px and below */
        @media (max-width: 1204px) {
          .subscribe-section {
            display: block;
            padding: 48px 20px !important;
          }
          
          /* Show simple form and hide animated form on small screens */
          .animated-subscribe-form {
            display: none;
          }
          
          .simple-subscribe-form {
            display: block;
          }
        }
        
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .subscribe-section {
            padding: 40px 16px !important;
          }
          
          .subscribe-section h3 {
            font-size: 32px !important;
          }
          
          .subscribe-section p {
            font-size: 15px !important;
          }
        }
        
        /* Screens 1204px and down - Add centered title with horizontal lines on same line */
        @media (max-width: 1204px) {
          .subscribe-heading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 24px;
            margin-bottom: 32px;
            width: 100%;
            padding: 0 20px;
          }
          
          .subscribe-heading {
            font-size: 0; /* Hide any default content */
            margin: 0;
            position: relative;
          }
          
          .subscribe-heading::before {
            content: "";
            height: 2px;
            width: 100px;
            background-color: var(--color-text-primary);
            margin-right: 16px;
            border-radius: 4px;
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
          
          .subscribe-heading::after {
            content: "Join the Mailing List";
            font-family: var(--font-heading);
            font-weight: var(--font-heading-weight-medium);
            letter-spacing: 0.4px;
            font-size: 44px;
            color: var(--color-text-primary);
            line-height: 1.2;
            white-space: nowrap;
          }
          
          /* Use the separate line element as the right line */
          .subscribe-title-line-after {
            height: 2px;
            width: 100px;
            background-color: var(--color-text-primary);
            margin-left: 16px;
            border-radius: 4px;
            align-self: center;
          }
        }
        
        /* Responsive font sizes for smaller screens - match Meet section */
        @media (max-width: 768px) {
          .subscribe-heading::after {
            font-size: 36px !important;
          }
        }
        
        @media (max-width: 480px) {
          .subscribe-heading::after {
            font-size: 32px !important;
          }
        }
        
        /* Privacy text styles for mobile */
        @media (max-width: 1204px) {
          .privacy-text {
            display: flex;
            flex-direction: column;
            font-size: 0 !important; /* Hide the original text */
          }
          
          .privacy-text::after {
            content: "Unsubscribe anytime";
            display: block;
            font-size: 15px; /* Restore font size for pseudo-elements */
          }
          
          .privacy-text::before {
            content: "Your privacy is respected";
            display: block;
            font-size: 15px; /* Restore font size for pseudo-elements */
          }
        }
        
        /* Very Small Devices (425px and down) - Additional padding adjustment */
        @media (max-width: 425px) {
          .subscribe-section {
            padding-top: 8px !important; /* Reduced from 40px (removing 32px) */
          }
        }
      `}</style>
    </section>
  );
}
