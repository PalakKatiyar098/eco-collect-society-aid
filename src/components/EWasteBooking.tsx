
import React from 'react';
import UnifiedBookingForm from './UnifiedBookingForm';

const EWasteBooking = ({ onBack }: { onBack: () => void }) => {
  return <UnifiedBookingForm onBack={onBack} defaultTab="ewaste" />;
};

export default EWasteBooking;
