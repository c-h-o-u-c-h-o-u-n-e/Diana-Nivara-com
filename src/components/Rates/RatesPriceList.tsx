import React from 'react';
import { PriceOption } from '../../constants/pricingData';

interface RatesPriceListProps {
  options: PriceOption[];
}

const RatesPriceList = React.memo(({ options }: RatesPriceListProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {options.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 'var(--font-body-weight-regular)',
            color: 'var(--color-text-primary)',
          }}
        >
          <span>{item.duration}</span>
          <span>{item.price}</span>
        </div>
      ))}
    </div>
  );
});

RatesPriceList.displayName = 'RatesPriceList';

export default RatesPriceList;
