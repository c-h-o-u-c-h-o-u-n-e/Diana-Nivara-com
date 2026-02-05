import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { subscribeToBrevo } from '../lib/brevo';

export default function Footer() {
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

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: 'var(--color-bg-)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        padding: '64px 32px 32px',
      }}
      className="global-footer"
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '20% 20% 48.7%',
            gap: '48px',
            marginBottom: '32px',
            marginLeft: '32px',
            alignItems: 'start',
          }}
          className="footer-main-grid"
        >
          <div>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'opacity 300ms ease',
                display: 'inline-block',
                marginBottom: '24px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              aria-label="Diana Nivara - Home"
            >
              <span
                style={{
                  fontFamily: 'Luckyfield',
                  fontSize: '44px',
                  color: 'var(--color-text-primary)',
                  lineHeight: '1',
                }}
              >
                Diana Nivara
              </span>
            </Link>
            
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                marginTop: '0px',
              }}
              aria-label="Footer navigation column 1"
            >
              <Link
                to="/gallery"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Profile & Gallery
              </Link>

              <Link
                to="/rates#incall-outcall"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Incalls & Outcalls
              </Link>

              <Link
                to="/rates#overnight"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Overnight Bookings
              </Link>

              <Link
                to="/rates#couples"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Couples Bookings
              </Link>

              <Link
                to="/rates#duo"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Duo Experience
              </Link>
            </nav>
          </div>

          <div>
            <div style={{ 
              height: '68px',
              visibility: 'hidden' 
            }}>
              <span style={{ fontSize: '44px' }}>Spacer</span>
            </div>
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                marginTop: '0px',
              }}
              aria-label="Footer navigation column 2"
            >
              <Link
                to="/booking"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                  marginBottom: '0px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Book Our Time Together
              </Link>
              <Link
                to="/essentials#availability"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Availability
              </Link>

              <Link
                to="/essentials#location"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Location
              </Link>

              <Link
                to="/essentials#verification"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Confidentiality
              </Link>

              <Link
                to="/essentials#boundaries"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  opacity: '85%',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                Etiquette
              </Link>
            </nav>
          </div>

          <div className="footer-third-column">
            {/* Subscribe section moved to a separate component for small screens */}
            <div className="desktop-subscribe-section">
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '44px',
                  fontWeight: 'var(--font-heading-weight-medium)',
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                  lineHeight: '1',
                  textAlign: 'right',
                }}
                className="footer-subscribe-heading"
              >
                Subscribe to the Mailing List
              </h3>

              <div style={{ 
                height: '7px',
                visibility: 'hidden' 
              }}>
                <span style={{ fontSize: '44px' }}></span>
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
                  textAlign: 'right',
                }}
                className="footer-subscribe-text"
              >
                  Curious to see more of me and stay in touch?<br/>Through my private mailing list, I share personal notes,<br/>photos and updates you won't find anywhere else.
              </p>

              <div style={{ height: '60px', marginBottom: '10px', position: 'relative' }}>
                <form onSubmit={handleSubmit} style={{ width: '90%', marginLeft: 'auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0px',
                      marginBottom: '8px',
                    }}
                    className="footer-form-row"
                  >
                    <button
                      type="button"
                      style={{
                        height: '48px',
                        padding: '0 24px',
                        paddingRight: '50px',
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
                        position: 'relative',
                        zIndex: 1,
                        marginRight: '-10px',
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
                        zIndex: 2,
                        marginLeft: '-30px',
                      }}
                    >
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        background: 'var(--color-accent)',
                        borderRadius: '12px',
                        padding: '4px',
                        paddingLeft: '-0px',
                      }}>
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
                            backgroundColor: 'var(--color-bg-primary)',
                            border: 'none',
                            borderRadius: '8px',
                            outline: 'none',
                            position: 'relative',
                            zIndex: 0,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.classList.remove('placeholder-visible');
                            e.currentTarget.classList.add('placeholder-hidden');
                          }}
                          onBlur={(e) => {
                            if (!e.currentTarget.value) {
                              e.currentTarget.classList.remove('placeholder-hidden');
                              e.currentTarget.classList.add('placeholder-visible');
                            }
                          }}
                        />
                      </div>
                      
                      {/* Thank you message that appears after animation */}
                      {showThankYou && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            width: 'calc(100% - 8px)',
                            height: 'calc(100% - 8px)',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '16px',
                            zIndex: 2,
                            pointerEvents: 'none',
                            backgroundColor: 'var(--color-bg-primary)',
                            borderRadius: '8px',
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
                        marginLeft: '-10px',
                        zIndex: 1,
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
                        textAlign: 'right',
                      }}
                    >
                      {error}
                    </p>
                  )}
                </form>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--color-text-muted)',
                  opacity: '85%',
                  lineHeight: '1.5',
                  margin: 0,
                  textAlign: 'right',
                }}
              >
                Your privacy is respected. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
          }}
        >
          <p
            className="copyright-text"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            <span className="copyright-line">© 2026 Diana Nivara</span>
            <span className="copyright-separator"> · </span>
            <span className="website-by-line">Website by{' '}
              <a
                href="mailto:c.chapdelaine@mail.com"
                style={{
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
              >
                Charlotte Chapdelaine
              </a>
            </span>
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
        
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .global-footer {
            padding: 40px 16px 24px !important;
          }
          
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            margin-left: 0 !important;
          }
          
          .footer-main-grid > div:first-child span {
            font-size: 36px !important;
          }
          
          .footer-form-row {
            flex-direction: column !important;
          }
          
          .footer-form-row button {
            width: 100% !important;
          }
          
          .footer-main-grid h3 {
            font-size: 32px !important;
          }
          
          .footer-main-grid p {
            font-size: 15px !important;
          }
        }
        
        /* Very Small Devices (small phones, 425px and down) */
        @media (max-width: 425px) {
          .footer-main-grid {
            display: none !important;
          }
          
          .global-footer {
            padding: 24px 16px !important;
            border-top: none !important;
          }
          
          .global-footer div[style*="borderTop"] {
            border-top: none !important;
            padding-top: 0 !important;
          }
          
          .copyright-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .copyright-separator {
            display: none !important;
          }
        }
        
        /* Hide footer for screens 1204px and down */
        @media (max-width: 1204px) {
          .global-footer {
            display: none !important;
          }
        }
        
        /* Small Devices (tablets, 768px and down) */
        @media (max-width: 768px) {
          .global-footer {
            padding: 24px 16px !important;
            border-top: none !important;
          }
          
          .footer-main-grid {
            display: none !important;
          }
          
          .global-footer div[style*="borderTop"] {
            border-top: none !important;
            padding-top: 0 !important;
          }
        }
        
        /* Hide the subscribe section in footer on screens 1024px and down */
        @media (max-width: 1024px) {
          .desktop-subscribe-section {
            display: none !important;
          }
        }
        
        /* Medium Devices (tablets and small desktops, 992px and down) */
        @media (max-width: 992px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 20px !important;
            margin-left: 0 !important;
          }
          
          .footer-subscribe-heading {
            font-size: 32px !important;
          }
          
          .footer-subscribe-text br {
            display: none;
          }
          
          .footer-form-row {
            flex-direction: column !important;
          }
          
          .footer-form-row button {
            width: 100% !important;
          }
        }
        
        /* Large Devices (large desktops, 1200px and down) */
        @media (max-width: 1200px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 20px !important;
            margin-left: 0 !important;
          }
          
          .footer-subscribe-heading {
            font-size: 36px !important;
          }
          
          .footer-subscribe-text br {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}
