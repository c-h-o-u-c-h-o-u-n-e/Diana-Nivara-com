import React from 'react';

interface CommonTitleProps {
  title: string;
}

const CommonTitle: React.FC<CommonTitleProps> = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '24px',
        marginBottom: '24px',
        width: '100%',
      }}
      className="common-title-container"
    >
      <div
        style={{
          height: '2px',
          flex: '1',
          backgroundColor: 'var(--color-text-primary)',
          marginRight: '16px',
          borderRadius: '4px',
        }}
      />
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-heading-weight-medium)',
          letterSpacing: '0.4px',
          fontSize: '54px',
          opacity: '95%',
          color: 'var(--color-text-primary)',
          margin: '0',
          whiteSpace: 'nowrap',
        }}
        className="common-title"
      >
        {title}
      </h3>
      <div
        style={{
          height: '2px',
          flex: '1',
          backgroundColor: 'var(--color-text-primary)',
          marginLeft: '16px',
          borderRadius: '4px',
        }}
      />

      {/* Responsive Styles */}
      <style>{`
        /* Mobile - ≤768px */
        @media (max-width: 768px) {
          .common-title {
            font-size: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(CommonTitle);
