
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, FileText, Image, Scale } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PastPickups = () => {
  const { user } = useAuth();
  
  // Mock data for past pickups with more details
  const pastPickups = [
    {
      id: '2',
      type: 'Biomedical',
      items: ['Syringes', 'Expired Medications', 'Test Strips'],
      quantity: '1-5 kg',
      status: 'Completed',
      scheduledDate: '2023-12-18',
      completedDate: '2023-12-20',
      address: user?.address || 'Sample Address',
      pincode: user?.pincode || '560001',
      notes: 'Diabetes care waste disposal.',
      hasImages: false,
      color: 'green'
    },
    {
      id: '3',
      type: 'E-Waste',
      items: ['Laptop', 'Cables', 'Old Phone'],
      quantity: '5-10 kg',
      status: 'Completed',
      scheduledDate: '2023-11-08',
      completedDate: '2023-11-10',
      address: user?.address || 'Sample Address',
      pincode: user?.pincode || '560001',
      notes: 'Old electronics from home office cleanup.',
      hasImages: true,
      color: 'blue'
    }
  ];

  if (pastPickups.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No pickup history</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pastPickups.map((pickup) => (
        <Card key={pickup.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{pickup.type} Pickup</h3>
                <Badge variant="secondary" className="mt-2 bg-gray-100 text-gray-800">
                  {pickup.status}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Scheduled: {pickup.scheduledDate} | Completed: {pickup.completedDate}</span>
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
                  <span>Images were attached</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PastPickups;
