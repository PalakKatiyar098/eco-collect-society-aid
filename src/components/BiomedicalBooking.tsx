
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConfirmationModal from '@/components/ConfirmationModal';
import PaymentModal from '@/components/PaymentModal';
import SuccessModal from '@/components/SuccessModal';

interface BiomedicalBookingProps {
  onBack: () => void;
}

const BiomedicalBooking = ({ onBack }: BiomedicalBookingProps) => {
  const { toast } = useToast();
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    societyName: '',
    address: '',
    pincode: '',
    additionalInfo: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const wasteTypes = [
    'Used Syringes',
    'Expired Needles', 
    'Blood Glucose Strips',
    'Expired Medications',
    'Medical Gloves',
    'Surgical Masks',
    'Bandages & Gauze',
    'Thermometer',
    'Other Medical Waste'
  ];

  const handleWasteTypeToggle = (wasteType: string) => {
    setSelectedWasteTypes(prev => 
      prev.includes(wasteType)
        ? prev.filter(type => type !== wasteType)
        : [...prev, wasteType]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWasteTypes.length === 0) {
      toast({
        title: "Please select waste types",
        description: "Select at least one type of biomedical waste for pickup",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-orange-500 hover:text-orange-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Biomedical Waste Collection</h1>
        <p className="text-gray-600 mt-2">Safe and certified disposal of medical waste</p>
      </div>

      <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-2">Important Notice</h3>
        <p className="text-sm text-orange-700">
          Biomedical waste collection requires professional handling and certification. 
          A service fee of ₹299 covers safe disposal, transportation, and compliance documentation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-orange-500">Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Waste Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Biomedical Waste Types *</Label>
              <div className="flex flex-wrap gap-2">
                {wasteTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleWasteTypeToggle(type)}
                    className={`pill-option ${selectedWasteTypes.includes(type) ? 'selected border-orange-500 bg-orange-500' : ''}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            {/* Address Information */}
            <div className="space-y-2">
              <Label htmlFor="societyName">Society/Building Name *</Label>
              <Input
                id="societyName"
                required
                value={formData.societyName}
                onChange={(e) => setFormData(prev => ({ ...prev, societyName: e.target.value }))}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Flat no., Floor, Landmark, Area"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                placeholder="Quantity, special handling requirements, or other details"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Service Fee:</span>
                <span className="text-2xl font-bold text-orange-500">₹299</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Includes pickup, safe disposal, and certification
              </p>
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
              Proceed to Payment
            </Button>
          </form>
        </CardContent>
      </Card>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        data={{
          ...formData,
          wasteTypes: selectedWasteTypes
        }}
        type="biomedical"
      />

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        amount={299}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onBack();
        }}
        type="biomedical"
      />
    </div>
  );
};

export default BiomedicalBooking;
