
import React from 'react';
import { Clock, Users, MapPin, Shield } from 'lucide-react';

const QuickInfo = () => {
  return (
    <div className="bg-neutral-50 rounded-lg p-6 space-y-6">
      <h3 className="font-semibold text-gray-900">Quick Info</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Pickup Hours
          </h4>
          <p className="text-sm text-gray-600">Monday - Saturday: 9 AM - 7 PM</p>
          <p className="text-sm text-gray-600">Sunday: 10 AM - 5 PM</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Response Time
          </h4>
          <p className="text-sm text-gray-600">We'll confirm within 24 hours</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Service Areas
          </h4>
          <p className="text-sm text-gray-600">Available across major cities</p>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-4">
        <h4 className="font-semibold text-primary mb-3">Why Choose Us?</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Certified waste management
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Doorstep collection
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Environmentally responsible
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Competitive pricing
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuickInfo;
