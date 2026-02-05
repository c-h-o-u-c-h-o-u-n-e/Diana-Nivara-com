import React from 'react';
import CommonTitle from '../CommonTitle';

/**
 * BookingHeader component - Displays the main booking title with decorative lines
 */
const BookingHeader: React.FC = React.memo(() => {
  return <CommonTitle title="Booking" />;
});

BookingHeader.displayName = 'BookingHeader';

export default BookingHeader;
