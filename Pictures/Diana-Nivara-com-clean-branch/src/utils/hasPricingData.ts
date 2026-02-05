import { PriceOption, PriceSection } from '../constants/pricingData';

/**
 * Helper function to check if a section has pricing data
 */
export const hasPricingData = (section: PriceOption[] | PriceSection): boolean => {
  if (Array.isArray(section)) {
    return section.length > 0;
  }
  return Boolean(section && (section.price || (section.options && section.options.length > 0) || section.basePrice));
};
