
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { User, Calendar, Clock, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AccountSidebarProps {
  children: React.ReactNode;
  onAccountDetails: () => void;
  onScheduledPickups: () => void;
  onPastPickups: () => void;
}

const AccountSidebar = ({ 
  children, 
  onAccountDetails, 
  onScheduledPickups, 
  onPastPickups 
}: AccountSidebarProps) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const handleMenuClick = (action: () => void) => {
    action();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Account Menu</h2>
          </div>
          
          <div className="flex-1 p-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start h-12 px-4 hover:bg-gray-100"
                onClick={() => handleMenuClick(onAccountDetails)}
              >
                <User className="w-5 h-5 mr-3" />
                Account Details
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start h-12 px-4 hover:bg-gray-100"
                onClick={() => handleMenuClick(onScheduledPickups)}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Scheduled Pickups
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start h-12 px-4 hover:bg-gray-100"
                onClick={() => handleMenuClick(onPastPickups)}
              >
                <Clock className="w-5 h-5 mr-3" />
                Past Pickups
              </Button>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-red-600 hover:text-red-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountSidebar;
