import React, { ReactNode, CSSProperties } from 'react';

interface RatesTwoColumnProps {
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
}

const RatesTwoColumn = React.memo(({ children, id, style }: RatesTwoColumnProps) => {
  return (
    <div
      id={id}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '96px',
        marginBottom: '56px',
        ...style
      }}
      className="rates-two-column"
    >
      {children}
    </div>
  );
});

RatesTwoColumn.displayName = 'RatesTwoColumn';

export default RatesTwoColumn;
