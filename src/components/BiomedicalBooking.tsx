
import React from 'react';
import UnifiedBookingForm from './UnifiedBookingForm';

const BiomedicalBooking = ({ onBack }: { onBack: () => void }) => {
  return <UnifiedBookingForm onBack={onBack} defaultTab="biomedical" />;
};

export default BiomedicalBooking;
