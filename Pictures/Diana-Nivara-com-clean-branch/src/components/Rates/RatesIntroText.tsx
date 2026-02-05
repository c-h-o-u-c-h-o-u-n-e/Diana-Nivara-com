import React from 'react';

const RatesIntroText = React.memo(() => {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '17px',
        opacity: '90%',
        lineHeight: '1.9',
        color: 'var(--color-text-primary)',
        margin: '0 auto 40px',
        maxWidth: '800px',
        textAlign: 'center',
      }}
    >
      Our time spent together is full GFE, chemistry-focused, with a natural, unforced dynamic.<br/>
      For requests that are more defined, please share them beforehand to ensure alignment.
    </p>
  );
});

RatesIntroText.displayName = 'RatesIntroText';

export default RatesIntroText;
