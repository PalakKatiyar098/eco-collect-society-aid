
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Upload, Recycle, Syringe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import SuccessModal from './SuccessModal';
import ProcessSteps from './ProcessSteps';
import QuickInfo from './QuickInfo';
import ConfirmationModal from './ConfirmationModal';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  wasteTypes: string[];
  additionalNotes: string;
  images: File[];
  date?: Date;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  wasteTypes?: string;
}

interface UnifiedBookingFormProps {
  onBack: () => void;
  defaultTab?: 'ewaste' | 'biomedical';
}

const UnifiedBookingForm = ({ onBack, defaultTab = 'ewaste' }: UnifiedBookingFormProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    wasteTypes: [],
    additionalNotes: '',
    images: [],
    date: new Date()
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const ewasteOptions = [
    'Computers & Laptops',
    'Mobile Phones',
    'Home Appliances',
    'Batteries',
    'Cables & Chargers',
    'Other Electronics'
  ];

  const biomedicalOptions = [
    'Sharps (Needles, Syringes)',
    'Expired Medications',
    'Contaminated Bandages',
    'Medical Gloves',
    'Test Strips',
    'Other Medical Waste'
  ];

  const wasteOptions = activeTab === 'ewaste' ? ewasteOptions : biomedicalOptions;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
    if (formData.wasteTypes.length === 0) newErrors.wasteTypes = 'At least one waste type must be selected';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setConfirmationModalOpen(true);
    }
  };

  const handleConfirmBooking = () => {
    console.log('Form submitted', { ...formData, wasteCategory: activeTab });
    setConfirmationModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    // Reset form to empty state
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      pincode: '',
      wasteTypes: [],
      additionalNotes: '',
      images: [],
      date: new Date()
    });
    setErrors({});
  };

  const handleWasteTypeToggle = (wasteType: string) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(wasteType)
        ? prev.wasteTypes.filter(type => type !== wasteType)
        : [...prev.wasteTypes, wasteType]
    }));
    if (errors.wasteTypes) {
      setErrors(prev => ({ ...prev, wasteTypes: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files!)]
      }));
    }
  };

  const currentColor = activeTab === 'ewaste' ? 'blue' : 'green';

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Waste Pickup</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a convenient pickup time for your waste. Our certified team will 
            handle everything safely and responsibly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="ewaste" className="flex items-center gap-2">
                      <Recycle className="w-4 h-4" />
                      E-Waste
                    </TabsTrigger>
                    <TabsTrigger value="biomedical" className="flex items-center gap-2">
                      <Syringe className="w-4 h-4" />
                      Biomedical
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Enter your full name"
                      className={cn("mt-1", errors.name && "border-red-500")}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      placeholder="youremail@example.com"
                      className={cn("mt-1", errors.email && "border-red-500")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="+91 9876543210"
                      className={cn("mt-1", errors.phone && "border-red-500")}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address Line 1 <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-gray-500 mb-1">Address details, society name</p>
                    <Input
                      type="text"
                      id="address"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, address: e.target.value }));
                        if (errors.address) setErrors(prev => ({ ...prev, address: undefined }));
                      }}
                      placeholder="Flat/House No, Society Name, Area"
                      className={cn("mt-1", errors.address && "border-red-500")}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <Label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                      PIN Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, pincode: e.target.value }));
                        if (errors.pincode) setErrors(prev => ({ ...prev, pincode: undefined }));
                      }}
                      placeholder="400001"
                      className={cn("mt-1", errors.pincode && "border-red-500")}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-3">
                      Type of {activeTab === 'ewaste' ? 'E-Waste' : 'Biomedical Waste'} <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {wasteOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleWasteTypeToggle(option)}
                          className={cn(
                            "px-3 py-2 rounded-full text-sm font-medium border transition-colors",
                            formData.wasteTypes.includes(option)
                              ? currentColor === 'blue' 
                                ? "bg-blue-100 text-blue-700 border-blue-300" 
                                : "bg-green-100 text-green-700 border-green-300"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.wasteTypes && <p className="text-red-500 text-sm mt-1">{errors.wasteTypes}</p>}
                  </div>

                  <div>
                    <Label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Preferred Pickup Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center" side="bottom">
                        <CalendarComponent
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      placeholder="Any special instructions or additional information..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach Images
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload images of your waste items</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        Choose Files
                      </Button>
                      {formData.images.length > 0 && (
                        <p className="text-sm text-gray-600 mt-2">
                          {formData.images.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className={cn(
                      "w-full text-white",
                      currentColor === 'blue' 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    Schedule Pickup
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <QuickInfo />
            <ProcessSteps type={activeTab as 'ewaste' | 'biomedical'} showLines={false} />
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={confirmationModalOpen} 
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleConfirmBooking}
        data={{ ...formData, societyName: formData.address }}
        type={activeTab as 'ewaste' | 'biomedical'}
      />

      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={handleSuccessModalClose}
        type={activeTab as 'ewaste' | 'biomedical'}
      />
    </div>
  );
};

export default UnifiedBookingForm;
