import React from 'react';
import EssentialsSection from './EssentialsSection';

interface EssentialsAvailabilityProps {
  id?: string;
}

const EssentialsAvailability: React.FC<EssentialsAvailabilityProps> = React.memo(({ id }) => {
  return (
    <EssentialsSection title="Availability" id={id}>
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
    </EssentialsSection>
  );
});

export default EssentialsAvailability;
