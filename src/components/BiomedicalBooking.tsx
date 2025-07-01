
import React from 'react';
import UnifiedBookingForm from './UnifiedBookingForm';

interface BiomedicalBookingProps {
  onBack: () => void;
  onAccountDetails: () => void;
}

const BiomedicalBooking = ({ onBack, onAccountDetails }: BiomedicalBookingProps) => {
  return <UnifiedBookingForm onBack={onBack} defaultTab="biomedical" onAccountDetails={onAccountDetails} />;
};

export default BiomedicalBooking;
