import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, User, MapPin, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'email' | 'otp' | 'register';

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [pincode, setPincode] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { login } = useAuth();

  const validateBangalorePincode = (pincode: string): boolean => {
    return /^560\d{3}$/.test(pincode);
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateIndianPhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
  };

  const formatPhoneNumber = (phone: string): string => {
    return '+91 ' + phone;
  };

  const handleSendOTP = () => {
    if (!email.trim()) {
      setErrors({ email: 'Email address is required' });
      return;
    }
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    console.log('Sending OTP to:', email);
    setStep('otp');
    setErrors({});
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
    
    console.log('Verifying OTP:', otp);
    
    // Simulate checking if user exists (50% chance user exists for demo)
    const userExists = Math.random() > 0.5;
    
    if (userExists) {
      // Existing user, log them in
      const userData = {
        id: '1',
        name: 'John Doe',
        phone: '+91 98765 43210',
        address: 'Sample Address, Bangalore',
        pincode: '560001'
      };
      login(userData);
      onClose();
      resetForm();
    } else {
      // New user, proceed to registration
      setStep('register');
    }
    setErrors({});
  };

  const handleRegister = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validateIndianPhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    if (!pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!validateBangalorePincode(pincode)) {
      newErrors.pincode = 'We currently serve only Bangalore. Please enter a valid Bangalore PIN code (560xxx)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fullAddress = addressLine2.trim() 
      ? `${addressLine1}, ${addressLine2}` 
      : addressLine1;

    const userData = {
      id: Date.now().toString(),
      name,
      phone: formatPhoneNumber(phone),
      address: fullAddress,
      pincode
    };
    
    login(userData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setName('');
    setPhone('');
    setAddressLine1('');
    setAddressLine2('');
    setPincode('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers, max 10 digits
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
    
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-4 sm:mx-auto w-[calc(100vw-2rem)] sm:w-full rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'email' && 'Login to Continue'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'register' && 'Complete Registration'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 'email' && (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <p className="text-gray-600">Enter your email address to continue</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <Button onClick={handleSendOTP} className="w-full bg-gray-700 hover:bg-gray-800">
                Send OTP
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="text-center">
                <p className="text-gray-600">Enter the 6-digit OTP sent to</p>
                <p className="font-medium">{email}</p>
              </div>
              
              <div className="space-y-2">
                <Label>Enter OTP</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      if (errors.otp) setErrors(prev => ({ ...prev, otp: undefined }));
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {errors.otp && <p className="text-red-500 text-sm text-center">{errors.otp}</p>}
              </div>

              <div className="space-y-3">
                <Button onClick={handleVerifyOTP} className="w-full bg-gray-700 hover:bg-gray-800">
                  Verify OTP
                </Button>
                <Button variant="ghost" onClick={() => setStep('email')} className="w-full hover:bg-gray-100">
                  Change Email
                </Button>
              </div>
            </>
          )}

          {step === 'register' && (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <p className="text-gray-600">Complete your profile to continue</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-600 text-sm">
                      +91
                    </div>
                    <Input
                      id="phone"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={cn(
                        "rounded-l-none border-l-0",
                        errors.phone && "border-red-500 focus-visible:ring-red-500"
                      )}
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    placeholder="Flat/House No, Building Name"
                    value={addressLine1}
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                      if (errors.addressLine1) setErrors(prev => ({ ...prev, addressLine1: undefined }));
                    }}
                    className={cn(errors.addressLine1 && "border-red-500 focus-visible:ring-red-500")}
                  />
                  {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    placeholder="Street, Area, Locality (Optional)"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    placeholder="560001"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      if (errors.pincode) setErrors(prev => ({ ...prev, pincode: undefined }));
                    }}
                    className={cn(errors.pincode && "border-red-500 focus-visible:ring-red-500")}
                  />
                  {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                </div>
              </div>

              <Button onClick={handleRegister} className="w-full bg-gray-700 hover:bg-gray-800">
                Complete Registration
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
