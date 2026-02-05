import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeHero from '../components/Home/HomeHero';
import HomeMeet from '../components/Home/HomeMeet';
import ProfileSidebarContent from '../components/ProfileSidebarContent';
import GalleryCarousel from '../components/GalleryCarousel';
import CommonSectionTitle from '../components/CommonSectionTitle';
import RatesIntroText from '../components/Rates/RatesIntroText';
import RatesTwoColumn from '../components/Rates/RatesTwoColumn';
import RatesSection from '../components/Rates/RatesSection';
import { pricingData } from '../constants/pricingData';
import { hasPricingData } from '../utils/hasPricingData';
import EssentialsAccordion from '../components/Essentials/EssentialsAccordion';
import BookingPolicy from '../components/Booking/BookingPolicy';

const MobileLandingPage: React.FC = () => {
  // Refs for each section for smooth scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ratesRef = useRef<HTMLDivElement>(null);
  const essentialsRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full mobile-landing-page">
      {/* Home Section */}
      <div ref={homeRef} id="home-section" className="section">
        <HomeHero
          imageSrc="images/Diana-Nivara-Hero-Mobile.webp"
          imageAlt="Diana Nivara"
        />
        <HomeMeet
          imageSrc="images/Diana-Nivara-Homepage.webp"
          imageAlt="Diana Nivara"
        />
      </div>

      {/* Profile Section */}
      <div id="profile-section" className="section">
        <CommonSectionTitle title="Profile" />
        <div className="section-content">
          <ProfileSidebarContent />
        </div>
      </div>

      {/* Gallery Section */}
      <div ref={galleryRef} id="gallery-section" className="section">
        <CommonSectionTitle title="Gallery" />
        <div className="section-content">
          <GalleryCarousel />
        </div>
      </div>

      {/* Rates Section */}
      <div ref={ratesRef} id="rates-section" className="section">
        <CommonSectionTitle title="Rates" />
        <div className="section-content">
          <RatesIntroText />

          {/* In-Call & Out-Call - Two Column Grid */}
          {(hasPricingData(pricingData.incall) || hasPricingData(pricingData.outcall)) && (
            <RatesTwoColumn id="incall-outcall">
              {/* Incall */}
              {hasPricingData(pricingData.incall) && (
                <RatesSection 
                  title="Incall" 
                  options={pricingData.incall} 
                />
              )}

              {/* Outcall */}
              {hasPricingData(pricingData.outcall) && (
                <RatesSection 
                  title="Outcall" 
                  options={pricingData.outcall} 
                />
              )}
            </RatesTwoColumn>
          )}

          {/* Social/Dinner/Drinks & Overnight - Two Column Grid */}
          {(hasPricingData(pricingData.socialDates) || hasPricingData(pricingData.overnight)) && (
            <RatesTwoColumn id="overnight">
              {/* Social/Dinner/Drinks */}
              {hasPricingData(pricingData.socialDates) && (
                <RatesSection 
                  title="Social / Dinner / Drinks"
                  price={pricingData.socialDates.price} 
                  description={pricingData.socialDates.description} 
                />
              )}

              {/* Overnight */}
              {hasPricingData(pricingData.overnight) && (
                <RatesSection 
                  title="Overnight" 
                  price={pricingData.overnight.price} 
                  description={pricingData.overnight.description} 
                />
              )}
            </RatesTwoColumn>
          )}

          {/* Couples & Duo - Two Column Grid */}
          {(hasPricingData(pricingData.couples) || hasPricingData(pricingData.duo)) && (
            <RatesTwoColumn id="couples-duo">
              {/* Couples */}
              {hasPricingData(pricingData.couples) && (
                <RatesSection 
                  title="Couples (Incall & Outcall)" 
                  price={pricingData.couples.price} 
                  description={pricingData.couples.description}
                  id="couples"
                />
              )}

              {/* Duo */}
              {hasPricingData(pricingData.duo) && (
                <RatesSection 
                  title="Duo Experience" 
                  options={pricingData.duo.options} 
                  basePrice={pricingData.duo.basePrice} 
                  description={pricingData.duo.description}
                  id="duo"
                />
              )}
            </RatesTwoColumn>
          )}
        </div>
      </div>

      {/* Essentials Section */}
      <div ref={essentialsRef} id="essentials-section" className="section">
        <CommonSectionTitle title="Essentials" />
        <div className="section-content">
          
          {/* Availability Accordion */}
          <EssentialsAccordion title="Availability" id="availability">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '90%',
                lineHeight: '1.6',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              These hours represent my typical availability, with a touch of flexibility possible.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.6',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
              Incall
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.6',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              Saturday & Sunday Afternoon: 10 AM – 6 PM
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.6',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
              Outcall
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
              }}
            >
              Monday to Friday Nights: From 9 PM, overnight available.<br/>
                Saturday & Sunday: All day (24h), overnight available
            </p>
          </EssentialsAccordion>
          
          {/* Location Accordion */}
          <EssentialsAccordion title="Location" id="location">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
              Incall
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              I host from a private, discreet apartment in central Montreal that is easily accessible.
              <br />
              The exact location is shared after booking.
              <br />
              Fresh linens, shower, and a comfortable space.
              <br />
              Street parking is convenient.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
                Outcall
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              For ease, comfort, and discretion, I often suggest hotels or motels for first-time encounters.
              <br />
              Location is considered individually with comfort and privacy in mind.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
              Travel Radius
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
              }}
            >
              Based in Montreal, I can travel up to 30 minutes each way (60 minutes round-trip) without additional consideration.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
              Travel Fee
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
              }}
            >
              I'm open to locations outside Montreal.
              <br />
              For longer journeys, a $40 travel consideration applies for every additional 30 minutes of round-trip travel.
            </p>
          </EssentialsAccordion>
          
          {/* Verification Accordion */}
          <EssentialsAccordion title="Verification & Confidentiality" id="verification">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
              Methods
            </p>

            <ul
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.3',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                A quick photo of your government-issued ID
              </li>
              <li style={{ marginBottom: '8px' }}>
                A selfie holding the ID
              </li>
              <li style={{ marginBottom: '8px' }}>
                Occasionally, a reference from another companion or LinkedIn profile screenshot
              </li>
            </ul>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                fontWeight: 'var(--font-body-weight-medium)',
              }}
            >
              Confidentiality Note
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
              }}
            >
              Everything shared is treated with care and complete discretion.
            </p>
          </EssentialsAccordion>
          
          {/* Boundaries Accordion */}
          <EssentialsAccordion title="Boundaries & Energy" id="boundaries">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
              }}
            >
              Our time together is guided by chemistry, connection, and mutual respect.<br/>
                I am warm, present, and engaged while always honoring comfort and personal boundaries.<br/>
                Moments unfold naturally, full GFE, with any specific preferences shared beforehand.
            </p>
          </EssentialsAccordion>
          
          {/* Hygiene Accordion */}
          <EssentialsAccordion title="Hygiene & Attire" id="hygiene">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
              }}
            >
              I arrive refreshed and fully engaged, and I value a shared attention to personal care and hygiene.<br/>
                I dress in elegance with short to mid-length dresses or skirts with heels.<br/>
                I don't take detailed outfit requests, but simple preferences can be mentioned beforehand.
            </p>
          </EssentialsAccordion>
          
          {/* Atmosphere Accordion */}
          <EssentialsAccordion title="Atmosphere" id="atmosphere">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                opacity: '80%',
                lineHeight: '1.9',
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
              }}
            >
              I'm happy to share a glass of wine or champagne in good company.<br/>
                I prefer a light, relaxed atmosphere so our time together feels effortless and enjoyable, free from the influence of&nbsp;substances.
            </p>
          </EssentialsAccordion>
        </div>
      </div>

      {/* Booking Section (Preview) */}
      <div ref={bookingRef} id="booking-section" className="section">
        <CommonSectionTitle title="Booking" />
        <div className="section-content">
          <BookingPolicy />

          {/* Book Time Together Button */}
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

      {/* Styles for the mobile landing page */}
      <style>{`
        .mobile-landing-page {
          scroll-behavior: smooth;
        }
        
        .section {
          padding-top: 40px;
          padding-bottom: 40px;
        }
        
        .section-content {
          padding: 0 16px;
        }
        
        /* Responsive styles for section titles */
        @media (max-width: 425px) {
          .section-title {
            font-size: 36px !important;
          }
        }
        
        .book-button-container {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          margin-bottom: 20px;
        }
        
        .book-button {
          display: inline-block;
          background-color: var(--color-accent-active);
          color: white;
          font-family: var(--font-body);
          font-size: 18px;
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          transition: background-color 0.3s ease;
          width: auto;
        }
        
        .book-button:hover {
          background-color: var(--color-accent-hover);
        }
        
        /* Mobile - ≤425px */
        @media (max-width: 425px) {
          .section {
            padding-top: 32px;
            padding-bottom: 32px;
          }
          
          .section-title h2 {
            font-size: 40px;
          }
          
          /* Add space before the mailing list */
          #booking-section {
            margin-bottom: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileLandingPage;
