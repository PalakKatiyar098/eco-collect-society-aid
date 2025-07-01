
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Package, FileText, Image, Scale } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ScheduledPickups = () => {
  const { user } = useAuth();
  
  // Mock data for scheduled pickups with more details
  const scheduledPickups = [
    {
      id: '1',
      type: 'E-Waste',
      items: ['Mobile Phones', 'Batteries', 'Cables'],
      quantity: '10-25 kg',
      status: 'Scheduled',
      scheduledDate: '2024-01-15',
      pickupDate: '2024-01-17',
      address: user?.address || 'Sample Address',
      pincode: user?.pincode || '560001',
      notes: 'Please call before arriving. Items are in the security office.',
      hasImages: true,
      color: 'blue'
    }
  ];

  if (scheduledPickups.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No scheduled pickups</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scheduledPickups.map((pickup) => (
        <Card key={pickup.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{pickup.type} Pickup</h3>
                <Badge 
                  variant="secondary" 
                  className={`mt-2 ${pickup.color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                >
                  {pickup.status}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Scheduled: {pickup.scheduledDate} | Pickup: {pickup.pickupDate}</span>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p>{pickup.address}</p>
                  <p>PIN: {pickup.pincode}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Scale className="w-4 h-4" />
                <span>Quantity: {pickup.quantity}</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Waste Items:</p>
                <div className="flex flex-wrap gap-2">
                  {pickup.items.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {pickup.notes && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="font-medium">Additional Notes:</p>
                    <p>{pickup.notes}</p>
                  </div>
                </div>
              )}
              
              {pickup.hasImages && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Image className="w-4 h-4" />
                  <span>Images attached</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScheduledPickups;
