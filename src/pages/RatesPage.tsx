import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RatesLayout from '../components/Rates/RatesLayout';
import RatesTitle from '../components/Rates/RatesTitle';
import RatesIntroText from '../components/Rates/RatesIntroText';
import RatesTwoColumn from '../components/Rates/RatesTwoColumn';
import RatesSection from '../components/Rates/RatesSection';
import { pricingData } from '../constants/pricingData';
import { hasPricingData } from '../utils/hasPricingData';

export default function RatesPage() {
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
    <RatesLayout>
      <RatesTitle />
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
    </RatesLayout>
  );
}
