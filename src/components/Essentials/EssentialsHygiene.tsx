import React from 'react';
import EssentialsSection from './EssentialsSection';

interface EssentialsHygieneProps {
  id?: string;
}

const EssentialsHygiene: React.FC<EssentialsHygieneProps> = React.memo(({ id }) => {
  return (
    <EssentialsSection title="Hygiene & Attire" id={id}>
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
    </EssentialsSection>
  );
});

export default EssentialsHygiene;
