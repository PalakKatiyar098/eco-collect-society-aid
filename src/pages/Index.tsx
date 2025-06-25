import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recycle, Syringe, Leaf, Users, Shield, Phone, Award, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EWasteBooking from '@/components/EWasteBooking';
import BiomedicalBooking from '@/components/BiomedicalBooking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImpactStats from '@/components/ImpactStats';
import TrustedPartners from '@/components/TrustedPartners';
import ProcessSteps from '@/components/ProcessSteps';

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'ewaste' | 'biomedical' | 'about' | 'education'>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'ewaste':
        return <EWasteBooking onBack={() => setActiveSection('home')} />;
      case 'biomedical':
        return <BiomedicalBooking onBack={() => setActiveSection('home')} />;
      case 'about':
        return <AboutSection />;
      case 'education':
        return <EducationSection />;
      default:
        return <HomeSection onSelectService={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderContent()}
      <Footer />
    </div>
  );
};

const HomeSection = ({ onSelectService }: { onSelectService: (section: 'ewaste' | 'biomedical') => void }) => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Holistic Solutions
          <span className="block text-primary">For Every Sector</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          EcoCollect provides professional waste management services across various sectors, ensuring compliance with 
          waste regulations and driving sustainability goals through resource recovery. By leveraging cutting-edge technology 
          and a deep understanding of all types of waste management, we offer customised solutions that address 
          the specific needs of our clients.
        </p>
      </div>

      {/* Service Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="service-card group cursor-pointer hover:border-primary/30" onClick={() => onSelectService('ewaste')}>
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
              <Recycle className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">E-Waste Collection</h3>
              <p className="text-gray-600">
                Phones, laptops, batteries, cables and other electronic items. 
                Free pickup service for your society.
              </p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              Book E-Waste Pickup
            </Button>
          </CardContent>
        </Card>

        <Card className="service-card group cursor-pointer hover:border-primary/30" onClick={() => onSelectService('biomedical')}>
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-lg flex items-center justify-center">
              <Syringe className="w-8 h-8 text-orange-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">Biomedical Waste</h3>
              <p className="text-gray-600">
                Syringes, needles, expired medications and medical supplies. 
                Safe disposal with proper certification.
              </p>
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              Book Biomedical Pickup
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Process Steps */}
      <ProcessSteps type="general" />

      {/* Education Section with Tabs */}
      <div className="bg-neutral-50 rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn About Responsible Waste Disposal</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Understanding proper waste disposal is crucial for environmental protection and 
            community health. Learn about the different types of waste and why proper handling matters.
          </p>
        </div>

        <Tabs defaultValue="ewaste" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="ewaste" className="text-base">E-Waste</TabsTrigger>
            <TabsTrigger value="biomedical" className="text-base">Biomedical Waste</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ewaste" className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Recycle className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">What is E-Waste?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Electronic waste (e-waste) refers to discarded electrical or electronic devices. 
                These items contain valuable materials that can be recycled and hazardous substances 
                that need proper handling.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Common E-Waste Items:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Mobile phones and tablets</li>
                  <li>Computers and laptops</li>
                  <li>TVs and monitors</li>
                  <li>Kitchen appliances</li>
                  <li>Batteries and chargers</li>
                  <li>Printers and scanners</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Why Proper Disposal Matters</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Environmental Impact:</h4>
                  <p className="text-sm text-gray-600">
                    E-waste contains toxic materials like lead, mercury, and cadmium that can 
                    contaminate soil and water if not properly disposed of.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Resource Recovery:</h4>
                  <p className="text-sm text-gray-600">
                    Proper recycling recovers valuable materials like gold, silver, and rare earth 
                    elements, reducing the need for mining.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="biomedical" className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Syringe className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">What is Biomedical Waste?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Biomedical waste includes any waste that contains infectious material or potentially 
                infectious substances such as blood and other body fluids.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Items We Collect:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Used syringes and needles</li>
                  <li>Expired medications</li>
                  <li>Blood glucose test strips</li>
                  <li>Medical gloves and masks</li>
                  <li>Bandages and gauze</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Health Risks</h3>
              </div>
              <p className="text-sm text-gray-600">
                Improper disposal of medical waste can spread infections and contaminate 
                water sources. Professional handling ensures community safety and regulatory compliance.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Did You Know?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">95%</div>
              <p className="text-sm text-gray-700">of e-waste materials can be recycled</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">1 ton</div>
              <p className="text-sm text-gray-700">of e-waste contains more gold than 17 tons of ore</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">50M</div>
              <p className="text-sm text-gray-700">tons of e-waste generated globally each year</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About EcoCollect</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're committed to making waste disposal convenient, safe, and environmentally 
              responsible for residential societies across India.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-gray-600">
                EcoCollect was founded with a simple yet powerful mission: to bridge the gap 
                between residential communities and proper waste management services. We 
                believe that every household should have access to safe, convenient, and 
                environmentally responsible waste disposal options.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Community First</h4>
                    <p className="text-sm text-gray-600">We prioritize the health and convenience of residential communities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Safety & Compliance</h4>
                    <p className="text-sm text-gray-600">All operations follow strict safety protocols and regulatory standards</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Leaf className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Environmental Impact</h4>
                    <p className="text-sm text-gray-600">Committed to reducing environmental footprint through proper recycling</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Impact</h3>
              <ImpactStats />
            </div>
          </div>

          <TrustedPartners />
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
          <p className="text-sm text-gray-600">Certified disposal methods that protect our environment</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-gray-900">Community Focused</h3>
          <p className="text-sm text-gray-600">Serving residential societies and apartment complexes</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-gray-900">Safe & Secure</h3>
          <p className="text-sm text-gray-600">Trained professionals with proper safety equipment</p>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">About EcoCollect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to making waste disposal convenient, safe, and environmentally 
            responsible for residential societies across India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
              EcoCollect was founded with a simple yet powerful mission: to bridge the gap 
              between residential communities and proper waste management services. We 
              believe that every household should have access to safe, convenient, and 
              environmentally responsible waste disposal options.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community First</h3>
                  <p className="text-sm text-gray-600">We prioritize the health and convenience of residential communities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Safety & Compliance</h3>
                  <p className="text-sm text-gray-600">All operations follow strict safety protocols and regulatory standards</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Leaf className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Environmental Impact</h3>
                  <p className="text-sm text-gray-600">Committed to reducing environmental footprint through proper recycling</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-50 rounded-xl p-8">
            <ImpactStats />
          </div>
        </div>

        <TrustedPartners />
      </div>
    </div>
  );
};

const EducationSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Waste Education Center</h1>
          <p className="text-xl text-gray-600">
            Learn about proper waste disposal and its impact on our environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Recycle className="w-6 h-6" />
              E-Waste Facts
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Why E-Waste Matters</h3>
                <p className="text-sm">
                  Electronic waste contains valuable materials like gold, silver, and rare earth elements. 
                  Proper recycling recovers these materials and prevents toxic substances from harming the environment.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Common E-Waste Items</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Mobile phones and chargers</li>
                  <li>Laptops and computers</li>
                  <li>Batteries (all types)</li>
                  <li>Cables and adapters</li>
                  <li>Small appliances</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
              <Syringe className="w-6 h-6" />
              Biomedical Waste Safety
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Health Risks</h3>
                <p className="text-sm">
                  Improper disposal of medical waste can spread infections and contaminate 
                  water sources. Professional handling ensures community safety.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Items We Collect</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Used syringes and needles</li>
                  <li>Expired medications</li>
                  <li>Blood glucose test strips</li>
                  <li>Medical gloves and masks</li>
                  <li>Bandages and gauze</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Did You Know?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">95%</div>
              <p className="text-sm text-gray-700">of e-waste materials can be recycled</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">1 ton</div>
              <p className="text-sm text-gray-700">of e-waste contains more gold than 17 tons of ore</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50M</div>
              <p className="text-sm text-gray-700">tons of e-waste generated globally each year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
