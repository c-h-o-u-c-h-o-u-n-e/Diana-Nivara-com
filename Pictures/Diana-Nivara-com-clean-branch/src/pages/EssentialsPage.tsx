import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EssentialsHeader from '../components/Essentials/EssentialsHeader';
import EssentialsAvailability from '../components/Essentials/EssentialsAvailability';
import EssentialsLocation from '../components/Essentials/EssentialsLocation';
import EssentialsVerification from '../components/Essentials/EssentialsVerification';
import EssentialsBoundaries from '../components/Essentials/EssentialsBoundaries';
import EssentialsHygiene from '../components/Essentials/EssentialsHygiene';
import EssentialsAtmosphere from '../components/Essentials/EssentialsAtmosphere';

export default function EssentialsPage() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash fragment in the URL
    if (location.hash) {
      // Get the element with the ID matching the hash fragment
      const id = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(id);
      
      if (element) {
        // Scroll to the element
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure the page is fully rendered
      } else {
        // If the element doesn't exist, scroll to the top
        window.scrollTo(0, 0);
      }
    } else {
      // If there's no hash fragment, scroll to the top
      window.scrollTo(0, 0);
    }
  }, [location]);

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
          position: 'relative',
          overflow: 'visible',
        }}
        className="essentials-section"
      >
        <EssentialsHeader />
        <EssentialsAvailability id="availability" />
        <EssentialsLocation id="location" />
        <EssentialsVerification id="verification" />
        <EssentialsBoundaries id="boundaries" />
        <EssentialsHygiene id="hygiene" />
        <EssentialsAtmosphere id="atmosphere" />
      </section>

      {/* Responsive Styles */}
      <style>{`
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .essentials-section {
            padding: 0px 20px !important;
          }
          
          .essentials-title {
            font-size: 56px !important;
          }
          
          .essentials-title-container div:first-child,
          .essentials-title-container div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
