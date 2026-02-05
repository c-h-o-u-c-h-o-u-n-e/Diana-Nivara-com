import React from 'react';
import EssentialsSection from './EssentialsSection';

interface EssentialsLocationProps {
  id?: string;
}

const EssentialsLocation: React.FC<EssentialsLocationProps> = React.memo(({ id }) => {
  return (
    <EssentialsSection title="Location" id={id}>
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
    </EssentialsSection>
  );
});

export default EssentialsLocation;
