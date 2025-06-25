
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConfirmationModal from '@/components/ConfirmationModal';
import SuccessModal from '@/components/SuccessModal';

interface EWasteBookingProps {
  onBack: () => void;
}

const EWasteBooking = ({ onBack }: EWasteBookingProps) => {
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
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const wasteTypes = [
    'Mobile Phones',
    'Laptops/Computers',
    'Batteries',
    'Chargers & Cables',
    'Small Appliances',
    'Tablets',
    'TVs/Monitors',
    'Printers',
    'Other Electronics'
  ];

  const handleWasteTypeToggle = (wasteType: string) => {
    setSelectedWasteTypes(prev => 
      prev.includes(wasteType)
        ? prev.filter(type => type !== wasteType)
        : [...prev, wasteType]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (uploadedImages.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive"
      });
      return;
    }
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWasteTypes.length === 0) {
      toast({
        title: "Please select waste types",
        description: "Select at least one type of e-waste for pickup",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">E-Waste Collection</h1>
        <p className="text-gray-600 mt-2">Schedule a free pickup for your electronic waste</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Waste Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select E-Waste Types *</Label>
              <div className="flex flex-wrap gap-2">
                {wasteTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleWasteTypeToggle(type)}
                    className={`pill-option ${selectedWasteTypes.includes(type) ? 'selected' : ''}`}
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

            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Upload Images (Optional)</Label>
              <p className="text-sm text-gray-600">Upload photos of your e-waste items (Max 5 images)</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload images</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                placeholder="Any specific instructions or additional details"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3">
              Schedule Pickup
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
          wasteTypes: selectedWasteTypes,
          images: uploadedImages
        }}
        type="ewaste"
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onBack();
        }}
        type="ewaste"
      />
    </div>
  );
};

export default EWasteBooking;
