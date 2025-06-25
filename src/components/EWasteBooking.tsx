import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import SuccessModal from './SuccessModal';
import ProcessSteps from './ProcessSteps';
import QuickInfo from './QuickInfo';

const EWasteBooking = ({ onBack }: { onBack: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [society, setSociety] = useState('');
  const [address, setAddress] = useState('');
  const [ewasteType, setEwasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [terms, setTerms] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back
        </Button>
        
        <ProcessSteps type="ewaste" />
        
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
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Pickup Details</h2>
                  <p className="text-gray-600">Choose your waste type and fill in your information</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="society" className="block text-sm font-medium text-gray-700">
                      Society Name
                    </Label>
                    <Input
                      type="text"
                      id="society"
                      value={society}
                      onChange={(e) => setSociety(e.target.value)}
                      placeholder="Your Society Name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Full Address
                    </Label>
                    <Input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat no, Building, Street, Area"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ewasteType" className="block text-sm font-medium text-gray-700">
                      Type of E-Waste
                    </Label>
                    <Select value={ewasteType} onValueChange={setEwasteType}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select E-Waste Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics (TV, Fridge, etc.)</SelectItem>
                        <SelectItem value="it_equipment">IT Equipment (Computers, Laptops)</SelectItem>
                        <SelectItem value="small_appliances">Small Appliances (Microwave, Iron)</SelectItem>
                        <SelectItem value="cables_batteries">Cables and Batteries</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Approximate Quantity (in kgs)
                    </Label>
                    <Input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter Quantity"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700">
                      Pickup Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={terms} onCheckedChange={setTerms} />
                    <Label htmlFor="terms" className="text-sm font-medium text-gray-700">
                      I agree to the terms and conditions
                    </Label>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Submitting...' : 'Book E-Waste Pickup'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <QuickInfo />
          </div>
        </div>
      </div>

      <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} type="ewaste" />
    </div>
  );
};

export default EWasteBooking;
