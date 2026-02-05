import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

// Navigation items in exact order as specified
const navigationItems = [
  { name: 'Gallery', path: '/gallery' },
  { name: 'Rates', path: '/rates' },
  { name: 'Essentials', path: '/essentials' },
  { name: 'Booking', path: '/booking' },
];

// Navigation items for small mobile view (425px and less)
const mobileSmallNavigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Rates', path: '/rates' },
  { name: 'Essentials', path: '/essentials' },
  { name: 'Booking', path: '/booking' },
];

export default function Header() {
  const isMobile = useIsMobile(825); // Use hamburger menu for screens 824px and less
  const isMobileSmall = useIsMobile(425); // Check if screen width is 425px or less
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Track scroll position to apply shadow after scrolling ≥ 8px
    const handleScroll = () => {
      const scrolled = window.scrollY >= 8;
      if (scrolled !== hasScrolled) {
        setHasScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        height: '80px',
        backgroundColor: 'var(--color-bg-primary)',
        boxShadow: hasScrolled ? '0 2px 12px rgba(0, 0, 0, 0.08)' : 'none',
        transition: 'box-shadow 200ms ease',
      }}
    >
      {/* Inner wrapper with max-width and padding */}
      <div
        style={{
          maxWidth: '1200px',
          height: '100%',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          className="header-logo-link"
          aria-label="Diana Nivara - Home"
        >
          <span
            style={{
              fontFamily: 'Luckyfield',
              fontSize: '64px',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
            }}
            className="header-logo"
          >
            Diana Nivara
          </span>
        </Link>

        {/* Add styles for logo hover */}
        <style>{`
          .header-logo-link {
            color: var(--color-text-primary);
            opacity: 1;
            transition: color 300ms ease, opacity 300ms ease;
          }
          
          .header-logo-link:hover {
            color: var(--color-accent-active);
            opacity: 0.8;
          }
        `}</style>

        {/* Right side container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Navigation Tabs */}
          <nav
            id="main-nav"
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              height: '100%',
            }}
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '48px',
                    fontWeight: 400,
                    letterSpacing: '0.08rem',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    whiteSpace: 'nowrap',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Add styles for navigation items */}
          <style>{`
            .nav-item {
              color: var(--color-text-primary);
              opacity: 1;
              transition: color 300ms ease, opacity 300ms ease;
            }
            
            .nav-item:hover:not(.nav-item-active) {
              color: var(--color-accent-active);
              opacity: 0.8;
            }
            
            .nav-item-active {
              color: var(--color-accent-active);
              opacity: 1;
            }
          `}</style>

          {/* Email Icon Link - Now links to Contact page */}
          <div
            onClick={() => navigate('/contact')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '12px',
              height: '100%',
              cursor: 'pointer',
            }}
            className="header-email"
            aria-label="Contact Diana Nivara"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/contact');
              }
            }}
          >
            {/* Inline SVG Email Icon */}
            <svg 
              width="46" 
              height="46" 
              viewBox="0 0 1200 1200" 
              style={{
                fill: 'currentColor',
                transition: 'fill 300ms ease, opacity 300ms ease',
              }}
              className="email-icon"
            >
              <path d="m504.38 446.86c30.371 22.84 61.426 32.781 95.578 47.102 8.2422 14.598 25.504 23.234 43.16 10.973 100.22-69.641 267.88-196.7 224.64-339.86-18.371-60.832-76.656-94.062-138.41-84.816-53.672 8.0312-92.52 41.883-124.95 81.93-23.078-43.238-55.344-80.715-107.55-88.523-66.066-9.8633-119.41 44.125-129.22 106.22-10.867 68.797 23.406 140 63.852 193.64 20.824 27.625 45.207 52.535 72.898 73.344zm-36.91-307.03c53.777-15.191 83.312 59.34 97.926 96.738 10.617 27.152 43.992 32.809 60.988 7.9648 26.07-38.125 55.766-84.117 103.3-96.5 58.418-15.191 89.273 35.906 75.336 88.312-24.566 92.414-120.57 160.87-195.26 211.55-7.6992 5.2227-12.078 12.078-13.887 19.32-73.609-39.047-136.01-120.77-159.51-197.59-11.93-39.168-22.957-114.55 31.098-129.8z"/>
              <path d="m82.484 1058c10.023 29.34 35.934 34.535 63.77 35.855 46.129 2.1641 92.414 2.7031 138.59 3.5586 115.46 2.1641 230.98 2.7578 346.46 1.4375 103.52-1.1875 207.31-3.0312 310.51-11.379 41.184-3.3242 125.89 0.30469 153.65-38.586 12.434-17.406 14.73-43.582 17.828-64.023 5.9219-39.23 9.5078-78.855 12.316-118.42 6.4102-91.016-2.9414-384.67-7.0273-389.7-2.5977-6.3555-7.5938-11.945-15.664-15.707-55.938-26.02-113.5-56.992-172.89-74.23-17.973-5.207-34.352 19.781-19.055 32.758 29.262 24.805 62.254 46.152 95.656 66.5-147.39 69.461-290.72 149.57-427.51 237.91-142.2-62.609-280.48-132.32-416.19-207.81 42.477-28.129 84.988-56.203 127.2-84.688 35.828-24.16 2.0586-82.656-34.074-58.285-51.852 34.973-107.92 67.82-156.54 107.09-22.152 17.895-17.695 40.484-18.078 67.254-0.67187 47.445-0.87109 94.867-0.89844 142.31-0.027344 83.883 0.64453 167.78-0.27734 251.66-0.41016 35.965-9.5352 82.195 2.2148 116.5zm989.77-532.81c0.30469 3.1641 2.9141 65.988 3.0586 94.617 0.43359 75.691-1.5938 151.44-5.6445 227.04-1.8047 33.797-9.2422 116.68-10.84 124.5-57.586-57.535-301.49-272.16-311.13-279.09 52.223-30.703 322.93-167.74 324.55-167.07zm-490.35 264.16c23.078 0 48.289-25.266 67.066-37.094 15.785-9.9414 31.648-19.727 47.566-29.406 27.402 17.855 48.75 45.508 71.039 68.953 29.129 30.621 59.578 60.039 89.5 89.883 49.016 48.91 99.496 96.305 148.09 145.59-13.266 1.7812-785.93 10.301-807.56 9.5859 51.375-52.828 271.33-273.73 289.8-287.08 3.1367 1.4531 67.605 39.562 94.492 39.562zm-439.73-10.996c0.83203-73.254 1.7539-146.52 3.6016-219.73 87.203 57.496 280.17 162.36 284.95 164.64-4.5117 3.4805-9.0195 7.0273-13.676 10.562-29.434 22.484-57.18 46.695-84.871 71.312-65.883 58.617-131.27 117.55-193.19 180.37 0.12109-2.1094 2.6914-162.74 3.1797-207.15z"/>
            </svg>
          </div>

          {/* Add styles for email icon hover */}
          <style>{`
            .header-email {
              color: var(--color-text-primary);
              opacity: 0.95;
              transition: color 300ms ease, opacity 300ms ease;
            }
            
            .header-email:hover {
              color: var(--color-accent-active);
              opacity: 1.0;
            }
          `}</style>
        </div>
      </div>

      {/* Mobile Menu Button - Only visible on mobile */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1001,
            padding: '8px',
          }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: mobileMenuOpen ? 'transparent' : 'var(--color-text-primary)',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-text-primary)',
                position: 'absolute',
                left: 0,
                top: mobileMenuOpen ? 0 : '-8px',
                transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-text-primary)',
                position: 'absolute',
                left: 0,
                bottom: mobileMenuOpen ? 0 : '-8px',
                transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
        </button>
      )}

          {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          ref={menuRef}
          id="mobile-menu"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'var(--color-bg-primary)',
            zIndex: 1000,
            display: mobileMenuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px',
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            {/* Use different navigation items based on screen size */}
            {(isMobileSmall && location.pathname === '/' ? mobileSmallNavigationItems : navigationItems).map((item) => {
              const isActive = location.pathname === item.path;
              
              // For small mobile screens (425px and less), use section IDs for navigation within the landing page
              if (isMobileSmall && location.pathname === '/') {
                const sectionId = item.name.toLowerCase() + '-section';
                
                return (
                  <a
                    key={item.path}
                    href={`#${sectionId}`}
                    className={`nav-item`}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '36px',
                      fontWeight: 400,
                      letterSpacing: '0.08rem',
                      textDecoration: 'none',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      // Smooth scroll to the section
                      const section = document.getElementById(sectionId);
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.name}
                  </a>
                );
              }
              
              // For larger screens or non-home pages, use regular routing
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '36px',
                    fontWeight: 400,
                    letterSpacing: '0.08rem',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Email Icon in Mobile Menu */}
          <div
            onClick={() => {
              navigate('/contact');
              setMobileMenuOpen(false);
            }}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: '20px',
            }}
            className="header-email"
            aria-label="Contact Diana Nivara"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/contact');
                setMobileMenuOpen(false);
              }
            }}
          >
            <svg 
              width="46" 
              height="46" 
              viewBox="0 0 1200 1200" 
              style={{
                fill: 'currentColor',
                transition: 'fill 300ms ease, opacity 300ms ease',
              }}
              className="email-icon"
            >
              <path d="m504.38 446.86c30.371 22.84 61.426 32.781 95.578 47.102 8.2422 14.598 25.504 23.234 43.16 10.973 100.22-69.641 267.88-196.7 224.64-339.86-18.371-60.832-76.656-94.062-138.41-84.816-53.672 8.0312-92.52 41.883-124.95 81.93-23.078-43.238-55.344-80.715-107.55-88.523-66.066-9.8633-119.41 44.125-129.22 106.22-10.867 68.797 23.406 140 63.852 193.64 20.824 27.625 45.207 52.535 72.898 73.344zm-36.91-307.03c53.777-15.191 83.312 59.34 97.926 96.738 10.617 27.152 43.992 32.809 60.988 7.9648 26.07-38.125 55.766-84.117 103.3-96.5 58.418-15.191 89.273 35.906 75.336 88.312-24.566 92.414-120.57 160.87-195.26 211.55-7.6992 5.2227-12.078 12.078-13.887 19.32-73.609-39.047-136.01-120.77-159.51-197.59-11.93-39.168-22.957-114.55 31.098-129.8z"/>
              <path d="m82.484 1058c10.023 29.34 35.934 34.535 63.77 35.855 46.129 2.1641 92.414 2.7031 138.59 3.5586 115.46 2.1641 230.98 2.7578 346.46 1.4375 103.52-1.1875 207.31-3.0312 310.51-11.379 41.184-3.3242 125.89 0.30469 153.65-38.586 12.434-17.406 14.73-43.582 17.828-64.023 5.9219-39.23 9.5078-78.855 12.316-118.42 6.4102-91.016-2.9414-384.67-7.0273-389.7-2.5977-6.3555-7.5938-11.945-15.664-15.707-55.938-26.02-113.5-56.992-172.89-74.23-17.973-5.207-34.352 19.781-19.055 32.758 29.262 24.805 62.254 46.152 95.656 66.5-147.39 69.461-290.72 149.57-427.51 237.91-142.2-62.609-280.48-132.32-416.19-207.81 42.477-28.129 84.988-56.203 127.2-84.688 35.828-24.16 2.0586-82.656-34.074-58.285-51.852 34.973-107.92 67.82-156.54 107.09-22.152 17.895-17.695 40.484-18.078 67.254-0.67187 47.445-0.87109 94.867-0.89844 142.31-0.027344 83.883 0.64453 167.78-0.27734 251.66-0.41016 35.965-9.5352 82.195 2.2148 116.5zm989.77-532.81c0.30469 3.1641 2.9141 65.988 3.0586 94.617 0.43359 75.691-1.5938 151.44-5.6445 227.04-1.8047 33.797-9.2422 116.68-10.84 124.5-57.586-57.535-301.49-272.16-311.13-279.09 52.223-30.703 322.93-167.74 324.55-167.07zm-490.35 264.16c23.078 0 48.289-25.266 67.066-37.094 15.785-9.9414 31.648-19.727 47.566-29.406 27.402 17.855 48.75 45.508 71.039 68.953 29.129 30.621 59.578 60.039 89.5 89.883 49.016 48.91 99.496 96.305 148.09 145.59-13.266 1.7812-785.93 10.301-807.56 9.5859 51.375-52.828 271.33-273.73 289.8-287.08 3.1367 1.4531 67.605 39.562 94.492 39.562zm-439.73-10.996c0.83203-73.254 1.7539-146.52 3.6016-219.73 87.203 57.496 280.17 162.36 284.95 164.64-4.5117 3.4805-9.0195 7.0273-13.676 10.562-29.434 22.484-57.18 46.695-84.871 71.312-65.883 58.617-131.27 117.55-193.19 180.37 0.12109-2.1094 2.6914-162.74 3.1797-207.15z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          header {
            height: 70px !important;
            position: relative !important; /* Make header non-sticky on mobile */
          }
          
          .header-logo {
            font-size: 32px !important;
          }
          
          header > div {
            padding: 0 16px !important;
          }
        }
        
        /* Mobile/Hamburger menu styles - ≤824px */
        @media (max-width: 824px) {
          header {
            height: 80px !important;
            position: relative !important; /* Make header non-sticky on mobile */
          }
          
          /* Hide desktop nav on mobile */
          #main-nav {
            display: none !important;
          }
          
          /* Hide email on mobile */
          .header-email:not(#mobile-menu .header-email) {
            display: none !important;
          }
          
          /* Adjust logo size on mobile */
          .header-logo {
            font-size: 36px !important;
          }
          
          /* Adjust padding on mobile */
          header > div {
            padding: 0 20px !important;
          }
        }
        
        /* Tablet styles - 825px to 1080px */
        @media (min-width: 825px) and (max-width: 1080px) {
          header {
            height: 100px !important;
          }
          
          /* Show email icon on tablet */
          .header-email:not(#mobile-menu .header-email) {
            display: flex !important;
          }
          
          /* Adjust logo size on tablet */
          .header-logo {
            font-size: 40px !important;
          }
          
          /* Adjust navigation font size on tablet */
          .nav-item {
            font-size: 36px !important;
          }
          
          #main-nav {
            gap: 24px !important;
          }
        }
        
        /* Desktop - >1080px */
        @media (min-width: 1081px) {
          .header-email {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
