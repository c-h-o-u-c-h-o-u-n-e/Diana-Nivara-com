import React from 'react';
import EssentialsSection from './EssentialsSection';

interface EssentialsVerificationProps {
  id?: string;
}

const EssentialsVerification: React.FC<EssentialsVerificationProps> = React.memo(({ id }) => {
  return (
    <EssentialsSection title="Verification & Confidentiality" id={id}>
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
    </EssentialsSection>
  );
});

export default EssentialsVerification;
