import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import SuccessModal from './SuccessModal';
import ProcessSteps from './ProcessSteps';
import QuickInfo from './QuickInfo';

const EWasteBooking = ({ onBack }: { onBack: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [society, setSociety] = useState('');
  const [city, setCity] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted', { name, email, phone, society, city, wasteType, isUrgent });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your E-Waste Pickup</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a convenient pickup time for your electronic waste. We ensure safe and responsible recycling.
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
                      placeholder="Your Society/Apartment Name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </Label>
                    <Input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Your City"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
                      Type of E-Waste
                    </Label>
                    <Select value={wasteType} onValueChange={setWasteType}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select Waste Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computers">Computers & Laptops</SelectItem>
                        <SelectItem value="phones">Mobile Phones</SelectItem>
                        <SelectItem value="appliances">Home Appliances</SelectItem>
                        <SelectItem value="other">Other Electronic Waste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={isUrgent}
                      onCheckedChange={(checked) => setIsUrgent(checked === true)}
                    />
                    <Label htmlFor="urgent" className="text-sm font-medium">
                      Urgent pickup required (within 24 hours)
                    </Label>
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
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center" side="bottom">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={date => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button type="submit" className="w-full">
                    Book E-Waste Pickup
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

      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)}
        type="ewaste"
      />
    </div>
  );
};

export default EWasteBooking;
