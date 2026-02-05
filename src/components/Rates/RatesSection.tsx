import React from 'react';
import { PriceOption } from '../../constants/pricingData';
import RatesPriceList from './RatesPriceList';

interface RatesSectionProps {
  title: string;
  price?: string;
  description?: string;
  options?: PriceOption[];
  basePrice?: string;
  id?: string;
}

const RatesSection = React.memo(({ title, price, description, options, basePrice, id }: RatesSectionProps) => {
  return (
    <div id={id || title.toLowerCase().replace(/\s+/g, '-')}>
      <style>
        {`
          @media (max-width: 480px) {
            .rates-section-title {
              font-size: 32px !important;
            }
          }
          
          @media (max-width: 425px) {
            .rates-section-line-before {
              width: 20px !important;
            }
            .rates-section-line-after {
              margin-left: 26px !important;
            }
          }
          
          @media (max-width: 404px) {
            .rates-section-title {
              font-size: 26px !important;
            }
          }
        `}
      </style>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <div
          className="rates-section-line-before"
          style={{
            height: '1px',
            width: '30px',
            backgroundColor: 'var(--color-text-primary)',
            opacity: '0.8',
            marginRight: '16px',
            borderRadius: '4px',
          }}
        />
        <h3
          className="rates-section-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '40px',
            opacity: '90%',
            fontWeight: 'var(--font-heading-weight-medium)',
            color: 'var(--color-text-primary)',
            margin: '0',
          }}
        >
          {title}
        </h3>
        <div
          className="rates-section-line-after"
          style={{
            height: '1px',
            flex: '1',
            backgroundColor: 'var(--color-text-primary)',
            opacity: '0.8',
            marginLeft: '16px',
            borderRadius: '4px',
          }}
        />
      </div>

      {options && options.length > 0 ? (
        <RatesPriceList options={options} />
      ) : null}

      {price && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 'var(--font-body-weight-regular)',
            color: 'var(--color-text-primary)',
          }}
        >
          {price}
        </div>
      )}

      {basePrice && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 'var(--font-body-weight-regular)',
            color: 'var(--color-text-primary)',
            marginTop: options && options.length > 0 ? '8px' : '0'
          }}
        >
          {basePrice}
        </div>
      )}

      {description && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            opacity: '90%',
            lineHeight: '1.6',
            color: 'var(--color-text-muted)',
            marginTop: '12px',
          }}
        >
          {description.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < description.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      )}
    </div>
  );
});

RatesSection.displayName = 'RatesSection';

export default RatesSection;
