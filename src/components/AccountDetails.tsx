
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, MapPin, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const AccountDetails = () => {
  const { user, updateUser } = useAuth();
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    addressLine1: user?.address?.split(',')[0]?.trim() || '',
    addressLine2: user?.address?.split(',').slice(1).join(',').trim() || '',
    pincode: user?.pincode || ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasChanges, setHasChanges] = useState(false);

  const validateBangalorePincode = (pincode: string): boolean => {
    return /^560\d{3}$/.test(pincode);
  };

  const validatePhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
    
    // Check if there are changes
    const originalValues = {
      name: user?.name || '',
      phone: user?.phone || '',
      addressLine1: user?.address?.split(',')[0]?.trim() || '',
      addressLine2: user?.address?.split(',').slice(1).join(',').trim() || '',
      pincode: user?.pincode || ''
    };
    
    const newForm = { ...editForm, [field]: value };
    const hasChanges = Object.keys(newForm).some(key => 
      newForm[key as keyof typeof newForm] !== originalValues[key as keyof typeof originalValues]
    );
    
    setHasChanges(hasChanges);
    
    // Clear errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!editForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!editForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(editForm.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!editForm.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    if (!editForm.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!validateBangalorePincode(editForm.pincode)) {
      newErrors.pincode = 'We currently serve only Bangalore. Please enter a valid Bangalore PIN code (560xxx)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fullAddress = editForm.addressLine2.trim() 
      ? `${editForm.addressLine1}, ${editForm.addressLine2}` 
      : editForm.addressLine1;

    updateUser({
      name: editForm.name,
      phone: editForm.phone,
      address: fullAddress,
      pincode: editForm.pincode
    });
    setHasChanges(false);
    setErrors({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={editForm.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{user?.email}</span>
          </div>
          <p className="text-xs text-gray-500">Email address cannot be changed</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-l-md border border-r-0">+91</span>
            <Input
              id="phone"
              value={editForm.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              className={cn(
                "rounded-l-none",
                errors.phone && "border-red-500 focus-visible:ring-red-500"
              )}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            placeholder="Flat/House No, Building Name"
            value={editForm.addressLine1}
            onChange={(e) => handleInputChange('addressLine1', e.target.value)}
            className={cn(errors.addressLine1 && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            id="addressLine2"
            placeholder="Street, Area, Locality (Optional)"
            value={editForm.addressLine2}
            onChange={(e) => handleInputChange('addressLine2', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">PIN Code</Label>
          <Input
            id="pincode"
            value={editForm.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            className={cn(errors.pincode && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
        </div>

        <Button 
          onClick={handleSave} 
          disabled={!hasChanges}
          className="w-full bg-gray-700 hover:bg-gray-800 disabled:bg-gray-300"
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
