import React from 'react';
import EssentialsSection from './EssentialsSection';

interface EssentialsBoundariesProps {
  id?: string;
}

const EssentialsBoundaries: React.FC<EssentialsBoundariesProps> = React.memo(({ id }) => {
  return (
    <EssentialsSection title="Boundaries & Energy" id={id}>
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
    </EssentialsSection>
  );
});

export default EssentialsBoundaries;
