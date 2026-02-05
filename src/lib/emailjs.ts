/**
 * EmailJS integration for sending booking and contact form notifications
 */
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

// Initialize on module load
initEmailJS();

export interface BookingEmailData {
  name: string;
  age: number;
  email: string;
  phone?: string;
  experienceType: string;
  outCallLocation?: string;
  duration: string;
  preferredDate: string;
  timeWindow?: string;
  aboutYou: string;
  isCouple: boolean;
  socialHours?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

/**
 * Send booking notification email
 */
export const sendBookingNotification = async (bookingData: BookingEmailData): Promise<{ success: boolean; message?: string }> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    console.error('EmailJS configuration missing for booking notifications');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    // Prepare template parameters
    const templateParams = {
      to_email: import.meta.env.VITE_NOTIFICATION_EMAIL || 'your-email@example.com',
      from_name: bookingData.name,
      from_email: bookingData.email,
      client_name: bookingData.name,
      client_age: bookingData.age,
      client_email: bookingData.email,
      client_phone: bookingData.phone || 'Not provided',
      experience_type: bookingData.experienceType,
      outcall_location: bookingData.outCallLocation || 'N/A',
      duration: bookingData.duration,
      preferred_date: bookingData.preferredDate,
      time_window: bookingData.timeWindow || 'Not specified',
      about_client: bookingData.aboutYou,
      is_couple: bookingData.isCouple ? 'Yes' : 'No',
      social_hours: bookingData.socialHours || 'No thanks',
      submission_date: new Date().toLocaleString(),
    };

    const response = await emailjs.send(serviceId, templateId, templateParams);
    
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: 'Failed to send notification' };
    }
  } catch (error) {
    console.error('EmailJS booking notification error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

/**
 * Send contact form notification email
 */
export const sendContactNotification = async (contactData: ContactEmailData): Promise<{ success: boolean; message?: string }> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    console.error('EmailJS configuration missing for contact notifications');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    // Prepare template parameters
    const templateParams = {
      to_email: import.meta.env.VITE_NOTIFICATION_EMAIL || 'your-email@example.com',
      from_name: contactData.name,
      from_email: contactData.email,
      client_name: contactData.name,
      client_email: contactData.email,
      message: contactData.message,
      submission_date: new Date().toLocaleString(),
    };

    const response = await emailjs.send(serviceId, templateId, templateParams);
    
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: 'Failed to send message' };
    }
  } catch (error) {
    console.error('EmailJS contact notification error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

/**
 * Send confirmation email to client (optional)
 */
export const sendBookingConfirmation = async (bookingData: BookingEmailData): Promise<{ success: boolean; message?: string }> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;

  // This is optional - only send if confirmation template is configured
  if (!serviceId || !templateId) {
    return { success: true }; // Don't fail if confirmation isn't set up
  }

  try {
    const templateParams = {
      to_email: bookingData.email,
      to_name: bookingData.name,
      client_name: bookingData.name,
      preferred_date: bookingData.preferredDate,
      duration: bookingData.duration,
      experience_type: bookingData.experienceType,
    };

    const response = await emailjs.send(serviceId, templateId, templateParams);
    return { success: response.status === 200 };
  } catch (error) {
    console.error('EmailJS confirmation email error:', error);
    // Don't fail the main process if confirmation fails
    return { success: true };
  }
};
