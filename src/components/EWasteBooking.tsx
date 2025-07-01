
import React from 'react';
import UnifiedBookingForm from './UnifiedBookingForm';

interface EWasteBookingProps {
  onBack: () => void;
  onAccountDetails: () => void;
}

const EWasteBooking = ({ onBack, onAccountDetails }: EWasteBookingProps) => {
  return <UnifiedBookingForm onBack={onBack} defaultTab="ewaste" onAccountDetails={onAccountDetails} />;
};

export default EWasteBooking;
