import { monthNames, daysOfWeek, incallRates, outcallRates, socialHourRate, coupleRate } from '../constants/pricingData';

/**
 * Format phone number based on input
 */
export const formatPhoneNumber = (value: string): string => {
  if (value.startsWith('+')) {
    // Allow international format with +, spaces, hyphens, parentheses, and #
    return value.replace(/[^\d+\s\-()#]/g, '');
  } else {
    // For non-international format, remove non-digits and format with hyphens
    const digits = value.replace(/\D/g, '');
    if (digits.length > 0) {
      const parts = [];
      // First group of 3 digits
      if (digits.length > 0) parts.push(digits.substring(0, 3));
      // Second group of 3 digits
      if (digits.length > 3) parts.push(digits.substring(3, 6));
      // Remaining digits (no limit)
      if (digits.length > 6) parts.push(digits.substring(6));
      return parts.join('-');
    }
    return digits;
  }
};

// Types for form data
export interface FormData {
  name: string;
  age: string;
  email: string;
  phone: string;
  day: string;
  month: string;
  year: string;
  timeWindow: string;
  duration: string;
  experienceType: string;
  outCallLocation: string;
  isCouple: boolean;
  socialHours: string;
  aboutYou: string;
}


/**
 * Get month name from index
 */
export const getMonthName = (monthIndex: number): string => {
  return monthNames[monthIndex];
};


/**
 * Generate available days based on selected month and year
 */
export const getDaysForSelectedMonth = (formData: FormData, currentDay: number, currentMonth: number, currentYear: number): string[] => {
  if (!formData.month) {
    return [];
  }
  
  const selectedMonthIndex = monthNames.indexOf(formData.month);
  
  // If year is not selected, use current year for calculation
  const selectedYear = formData.year ? parseInt(formData.year) : currentYear;
  
  // Get number of days in the selected month
  const daysInMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();
  
  // If selected month and year are current month and year, filter out past days
  if (selectedYear === currentYear && selectedMonthIndex === currentMonth) {
    return Array.from({ length: daysInMonth - currentDay + 1 }, (_, i) => (currentDay + i).toString());
  }
  
  // Otherwise, return all days in the month
  return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
};

/**
 * Generate available months based on selected year
 */
export const getMonthsForSelectedYear = (formData: FormData, currentMonth: number, currentYear: number): string[] => {
  if (!formData.year) {
    // If no year selected, return all months
    return [...monthNames];
  }
  
  const selectedYear = parseInt(formData.year);
  
  // If selected year is current year, filter out past months
  if (selectedYear === currentYear) {
    return monthNames.slice(currentMonth);
  }
  
  // Otherwise, return all months
  return [...monthNames];
};

/**
 * Determine if next year should be shown in options
 */
export const shouldShowNextYear = (currentMonth: number): boolean => {
  // Show next year if we're in Sept, Oct, Nov, or Dec (months 8-11)
  return currentMonth >= 8; // September is month 8 (0-based)
};

/**
 * Get available years based on current date
 */
export const getAvailableYears = (currentYear: number, showNextYear: boolean): string[] => {
  return showNextYear 
    ? [currentYear.toString(), (currentYear + 1).toString()] 
    : [currentYear.toString()];
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate the entire form
 */
export const validateForm = (formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.age) {
    errors.age = 'Age is required';
  } else {
    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 18) {
      errors.age = 'You must be 18 or older';
    }
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email';
  }

  if (!formData.duration) {
    errors.duration = 'Duration is required';
  }

  if (!formData.experienceType) {
    errors.experienceType = 'Please select experience type';
  }

  if (!formData.day || !formData.month || !formData.year) {
    errors.date = 'Please select a complete date';
  }

  if (!formData.aboutYou.trim()) {
    errors.aboutYou = 'Please tell us about yourself';
  }

  return errors;
};

/**
 * Check if the form is valid
 */
export const isFormValid = (formData: FormData): boolean => {
  return (
    formData.name.trim().length >= 2 &&
    formData.age &&
    parseInt(formData.age, 10) >= 18 &&
    validateEmail(formData.email) &&
    formData.duration &&
    formData.experienceType &&
    formData.day &&
    formData.month &&
    formData.year &&
    formData.aboutYou.trim().length > 0
  );
};
