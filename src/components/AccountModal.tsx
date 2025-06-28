
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Phone, Clock, Package, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal = ({ isOpen, onClose }: AccountModalProps) => {
  const { user, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    address: user?.address || '',
    pincode: user?.pincode || ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateBangalorePincode = (pincode: string): boolean => {
    return /^560\d{3}$/.test(pincode);
  };

  const handleSaveProfile = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!editForm.name.trim()) newErrors.name = 'Name is required';
    if (!editForm.address.trim()) newErrors.address = 'Address is required';
    if (!editForm.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!validateBangalorePincode(editForm.pincode)) {
      newErrors.pincode = 'We currently serve only Bangalore. Please enter a valid Bangalore PIN code (560xxx)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateUser(editForm);
    setIsEditing(false);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      address: user?.address || '',
      pincode: user?.pincode || ''
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  // Mock data for pickup requests
  const ongoingPickups = [
    {
      id: '1',
      type: 'E-Waste',
      items: ['Mobile Phones', 'Batteries'],
      status: 'Confirmed',
      date: '2024-01-15',
      color: 'blue'
    }
  ];

  const pastPickups = [
    {
      id: '2',
      type: 'Biomedical',
      items: ['Syringes', 'Expired Medications'],
      status: 'Completed',
      date: '2023-12-20',
      color: 'green'
    },
    {
      id: '3',
      type: 'E-Waste',
      items: ['Laptop', 'Cables'],
      status: 'Completed',
      date: '2023-11-10',
      color: 'blue'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mx-4 sm:mx-auto w-[calc(100vw-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            My Account
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Details
                  </span>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Full Name</Label>
                      <Input
                        id="edit-name"
                        value={editForm.name}
                        onChange={(e) => {
                          setEditForm(prev => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-address">Address</Label>
                      <Input
                        id="edit-address"
                        value={editForm.address}
                        onChange={(e) => {
                          setEditForm(prev => ({ ...prev, address: e.target.value }));
                          if (errors.address) setErrors(prev => ({ ...prev, address: undefined }));
                        }}
                        className={cn(errors.address && "border-red-500 focus-visible:ring-red-500")}
                      />
                      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-pincode">PIN Code</Label>
                      <Input
                        id="edit-pincode"
                        value={editForm.pincode}
                        onChange={(e) => {
                          setEditForm(prev => ({ ...prev, pincode: e.target.value }));
                          if (errors.pincode) setErrors(prev => ({ ...prev, pincode: undefined }));
                        }}
                        className={cn(errors.pincode && "border-red-500 focus-visible:ring-red-500")}
                      />
                      {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="flex-1">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{user?.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{user?.phone}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p>{user?.address}</p>
                        <p className="text-sm text-gray-600">PIN: {user?.pincode}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-4">
            {ongoingPickups.length > 0 ? (
              ongoingPickups.map((pickup) => (
                <Card key={pickup.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{pickup.type} Pickup</h3>
                        <p className="text-sm text-gray-600">Scheduled: {pickup.date}</p>
                      </div>
                      <Badge variant="secondary" className={`${pickup.color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {pickup.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pickup.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No ongoing pickups</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {pastPickups.length > 0 ? (
              pastPickups.map((pickup) => (
                <Card key={pickup.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{pickup.type} Pickup</h3>
                        <p className="text-sm text-gray-600">Completed: {pickup.date}</p>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        {pickup.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pickup.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pickup history</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal;
