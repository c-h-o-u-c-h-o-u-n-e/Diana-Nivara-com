import React from 'react';

interface CommonSectionTitleProps {
  title: string;
}

const CommonSectionTitle: React.FC<CommonSectionTitleProps> = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '24px',
        marginBottom: '24px',
        width: '100%',
        padding: '0 16px',
      }}
      className="section-title-container"
    >
      <div
        style={{
          height: '2px',
          flex: '1',
          backgroundColor: 'var(--color-text-primary)',
          marginRight: '16px',
          borderRadius: '4px',
        }}
        className="section-title-line"
      />
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-heading-weight-medium)',
          letterSpacing: '0.4px',
          fontSize: '54px',
          color: 'var(--color-text-primary)',
          margin: '0',
          whiteSpace: 'nowrap',
        }}
        className="section-title"
      >
        {title}
      </h2>
      <div
        style={{
          height: '2px',
          flex: '1',
          backgroundColor: 'var(--color-text-primary)',
          marginLeft: '16px',
          borderRadius: '4px',
        }}
        className="section-title-line"
      />
    </div>
  );
};

export default CommonSectionTitle;
