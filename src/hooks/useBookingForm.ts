import { useReducer, useState, useEffect } from 'react';
import { FormData, validateForm, getDaysForSelectedMonth, getMonthsForSelectedYear, shouldShowNextYear, getAvailableYears, getMonthName } from '../utils/bookingHelpers';
import { bookingFormReducer, setField } from '../reducers/bookingFormReducer';
import { sendBookingNotification, sendBookingConfirmation, BookingEmailData } from '../lib/emailjs';


interface UseBookingFormReturn {
  formData: FormData;
  errors: Record<string, string>;
  isPending: boolean;
  mutationError: { message: string } | null;
  isSubmitted: boolean;
  days: string[];
  months: string[];
  years: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleExperienceTypeChange: (type: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

/**
 * Custom hook for booking form logic
 */
export const useBookingForm = (): UseBookingFormReturn => {
  // Get current date information
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // 0-based (0 = January, 11 = December)
  const currentYear = currentDate.getFullYear();
  
  // Initialize form state with default values
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const initialFormState: FormData = {
    name: '',
    age: '',
    email: '',
    phone: '',
    day: currentDay.toString(), // Pre-select current day
    month: getMonthName(currentMonth), // Pre-select current month
    year: currentYear.toString(), // Pre-select current year
    timeWindow: '', // Available time window
    duration: '',
    experienceType: '',
    outCallLocation: '',
    isCouple: false,
    socialHours: 'No thanks',
    aboutYou: '',
  };

  // Form state using reducer
  const [formData, dispatch] = useReducer(bookingFormReducer, initialFormState);
  
  // Other state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);
  const [mutationError, setMutationError] = useState<{message: string} | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate available days, months, and years
  const days = getDaysForSelectedMonth(formData, currentDay, currentMonth, currentYear);
  const months = getMonthsForSelectedYear(formData, currentMonth, currentYear);
  const showNextYearOption = shouldShowNextYear(currentMonth);
  const years = getAvailableYears(currentYear, showNextYearOption);

  /**
   * Handle form field changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    dispatch(setField(name as keyof FormData, type === 'checkbox' ? checked : value));


    // Clear errors for the field being changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Handle experience type change
   */
  const handleExperienceTypeChange = (type: string) => {
    dispatch(setField('experienceType', type));
    
    // Clear outcall location if switching to incall
    if (type === 'Incall') {
      dispatch(setField('outCallLocation', ''));
    }


    // Clear experience type error if it exists
    if (errors.experienceType) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.experienceType;
        return newErrors;
      });
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsPending(true);
      setMutationError(null);
      
      // Prepare booking data for EmailJS
      const preferredDate = `${formData.day} ${formData.month} ${formData.year}`;
      const bookingData: BookingEmailData = {
        name: formData.name.trim(),
        age: parseInt(formData.age, 10),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        experienceType: formData.experienceType,
        outCallLocation: formData.outCallLocation.trim() || undefined,
        duration: formData.duration,
        preferredDate: preferredDate,
        timeWindow: formData.timeWindow.trim() || undefined,
        aboutYou: formData.aboutYou.trim(),
        isCouple: formData.isCouple,
        socialHours: formData.socialHours,
      };
      
      // Send booking notification email
      const notificationResult = await sendBookingNotification(bookingData);
      
      if (!notificationResult.success) {
        setMutationError({ message: notificationResult.message || 'Failed to send booking notification. Please try again.' });
        return;
      }
      
      // Optionally send confirmation email to client
      await sendBookingConfirmation(bookingData);
      
      console.log('Booking notification sent successfully:', bookingData);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit booking inquiry:', err);
      setMutationError({ message: 'Failed to submit booking inquiry. Please try again.' });
    } finally {
      setIsPending(false);
    }
  };

  return {
    formData,
    errors,
    isPending,
    mutationError,
    isSubmitted,
    days,
    months,
    years,
    handleChange,
    handleExperienceTypeChange,
    handleSubmit,
  };
};
