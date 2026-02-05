import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface EntryModalProps {
  onAccept: () => void;
}

export default function EntryModal({ onAccept }: EntryModalProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Lock body scroll when modal is visible
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }

    return () => {
      // Cleanup: unlock body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isVisible]);

  useEffect(() => {
    // Focus trap: focus on CTA button when modal opens
    const ctaButton = document.getElementById('entry-modal-cta');
    if (ctaButton && isVisible) {
      ctaButton.focus();
    }
  }, [isVisible]);

  const handleAccept = () => {
    // Set sessionStorage flag
    sessionStorage.setItem('ageGateAccepted', 'true');
    
    // Trigger exit animation
    setIsAnimatingOut(true);
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
      onAccept();
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter key triggers CTA
    if (e.key === 'Enter') {
      handleAccept();
    }
    
    // Disable ESC key
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-modal-title"
      aria-describedby="entry-modal-description"
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: 'var(--color-bg-primary)',
        opacity: isAnimatingOut ? 0 : 0.98,
        transition: isAnimatingOut ? 'opacity 200ms ease-in' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={(e) => {
        // Prevent click outside from closing modal
        e.stopPropagation();
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          padding: 'var(--spacing-8) var(--spacing-5)',
          textAlign: 'center',
          opacity: isAnimatingOut ? 0 : 1,
          transform: isAnimatingOut ? 'translateY(0)' : 'translateY(0)',
          animation: isAnimatingOut ? 'none' : 'entryModalFadeIn 300ms ease-out',
        }}
      >
        {/* Title */}
        <h1
          id="entry-modal-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-heading-weight-medium)',
            letterSpacing: 'var(--font-heading-letter-spacing)',
            color: 'var(--color-text-primary)',
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            lineHeight: '1.2',
            marginBottom: 'var(--spacing-6)',
          }}
        >
          Welcome
        </h1>

        {/* Body Text */}
        <p
          id="entry-modal-description"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-body-weight-regular)',
            color: 'var(--color-text-primary)',
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            lineHeight: '1.6',
            marginBottom: 'var(--spacing-8)',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 var(--spacing-4)',
          }}
        >
          It's a pleasure to have you here.
          <br />
          This space is reserved for adults 18 years and older.
        </p>

        {/* CTA Button */}
        <Link
          to="/"
          id="entry-modal-cta"
          onClick={handleAccept}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAccept();
            }
          }}
          style={{
            display: 'inline-block',
            height: '52px',
            padding: '0 clamp(24px, 6vw, 36px)',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
            fontFamily: 'var(--font-button)',
            fontWeight: 'var(--font-button-weight)',
            textTransform: 'var(--font-button-transform)',
            letterSpacing: 'var(--font-button-letter-spacing)',
            fontSize: 'clamp(14px, 3vw, 16px)',
            border: 'none',
            borderRadius: '28px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background-color var(--transition-hover)',
            lineHeight: '52px',
            textAlign: 'center',
            minWidth: 'clamp(180px, 50vw, 220px)',
            maxWidth: '90%',
            outline: 'none',
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
          aria-label="Confirm you are 18 years or older and enter the site"
        >
          Step Inside
        </Link>
      </div>

      {/* Keyframe animation styles injected inline */}
      <style>{`
        @keyframes entryModalFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
