
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import ScheduledPickups from '@/components/ScheduledPickups';
import PastPickups from '@/components/PastPickups';

interface PickupsPageProps {
  onBack: () => void;
  defaultTab?: 'scheduled' | 'past';
}

const PickupsPage = ({ onBack, defaultTab = 'scheduled' }: PickupsPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Your Pickups</h1>
          </div>
          
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 h-12 bg-muted">
              <TabsTrigger 
                value="scheduled" 
                className="text-base py-3 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className="text-base py-3 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Past Pickups
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scheduled">
              <ScheduledPickups />
            </TabsContent>
            
            <TabsContent value="past">
              <PastPickups />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PickupsPage;
