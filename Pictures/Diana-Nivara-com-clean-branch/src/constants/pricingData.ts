// Duration options
export const durations = ['1 hour', '1.5 hours', '2 hours', '3 hours', 'Overnight'];

// Social hours options
export const socialHoursOptions = ['No thanks', '1 hour', '2 hours', '3 hours', '4 hours'];

// Month names
export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Days of the week
export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export interface PriceOption {
  duration: string;
  price: number;
}

export interface PriceSection {
  price?: string;
  options?: PriceOption[];
  basePrice?: string;
  description?: string;
}

export interface PricingData {
  incall: PriceOption[];
  outcall: PriceOption[];
  socialDates: PriceSection;
  overnight: PriceSection;
  couples: PriceSection;
  duo: PriceSection;
}

// Base rates for incall (used in booking calculations)
export const incallRates = {
  '1 hour': 300,
  '1.5 hours': 450,
  '2 hours': 550,
  '3 hours': 800,
  'overnight': 2000
};

// Base rates for outcall (used in booking calculations)
export const outcallRates = {
  '1 hour': 350,
  '1.5 hours': 500,
  '2 hours': 600,
  '3 hours': 850,
  'overnight': 2000
};

// Additional rates (used in booking calculations)
export const socialHourRate = 150; // per hour
export const coupleRate = 100; // additional per hour

// Define pricing data for each section (used in rates display)
export const pricingData: PricingData = {
  incall: [
    { duration: '1 Hour', price: incallRates['1 hour'] },
    { duration: '1.5 Hours', price: incallRates['1.5 hours'] },
    { duration: '2 Hours', price: incallRates['2 hours'] },
    { duration: '3 Hours', price: incallRates['3 hours'] }
  ],
  outcall: [
    { duration: '1 Hour', price: outcallRates['1 hour'] },
    { duration: '1.5 Hours', price: outcallRates['1.5 hours'] },
    { duration: '2 Hours', price: outcallRates['2 hours'] },
    { duration: '3 Hours', price: outcallRates['3 hours'] }
  ],
  socialDates: {
    price: `${socialHourRate} / hr`,
    description: 'Conversation, presence, and shared moments, before or after outcall, without public displays of affection.'
  },
  overnight: {
    price: `${incallRates['overnight'].toLocaleString()}`,
    description: 'A full night together (e.g., 9 PM–7 AM).\nEnjoy extended, uninterrupted time full of indulgent intimate moments.'
  },
  couples: {
    price: `+${coupleRate} / hr`,
    description: ''
  },
  duo: {
    options: [
      { duration: '2 Hours', price: 1000 }
    ],
    basePrice: '+400 / hr',
    description: 'The duo experience offers the presence of two attentive, harmonious companions, creating a dynamic that is both playful and deeply immersive.'
  }
};
