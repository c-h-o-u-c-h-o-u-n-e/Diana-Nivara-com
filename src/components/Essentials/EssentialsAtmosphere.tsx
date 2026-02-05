import React from 'react';
import EssentialsSection from './EssentialsSection';

interface EssentialsAtmosphereProps {
  id?: string;
}

const EssentialsAtmosphere: React.FC<EssentialsAtmosphereProps> = React.memo(({ id }) => {
  return (
    <EssentialsSection title="Atmosphere" id={id}>
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
    </EssentialsSection>
  );
});

export default EssentialsAtmosphere;
