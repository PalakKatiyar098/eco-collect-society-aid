
import React from 'react';
import UnifiedBookingForm from './UnifiedBookingForm';

const BiomedicalBooking = ({ onBack, onAccountDetails }: { onBack: () => void; onAccountDetails: () => void }) => {
  return <UnifiedBookingForm onBack={onBack} onAccountDetails={onAccountDetails} defaultTab="biomedical" />;
};

export default BiomedicalBooking;
