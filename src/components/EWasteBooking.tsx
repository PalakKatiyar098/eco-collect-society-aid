
import React from 'react';
import UnifiedBookingForm from './UnifiedBookingForm';

const EWasteBooking = ({ onBack, onAccountDetails }: { onBack: () => void; onAccountDetails: () => void }) => {
  return <UnifiedBookingForm onBack={onBack} onAccountDetails={onAccountDetails} defaultTab="ewaste" />;
};

export default EWasteBooking;
