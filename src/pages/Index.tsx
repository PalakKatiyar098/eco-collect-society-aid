
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recycle, Syringe, Leaf, Users, Shield, Phone } from 'lucide-react';
import EWasteBooking from '@/components/EWasteBooking';
import BiomedicalBooking from '@/components/BiomedicalBooking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Responsible Waste Collection
          <span className="block text-primary">For Your Community</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Safe, convenient, and eco-friendly pickup services for electronic and biomedical waste. 
          Helping societies maintain a cleaner, healthier environment.
        </p>
      </div>

      {/* Service Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="service-card group cursor-pointer" onClick={() => onSelectService('ewaste')}>
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Recycle className="w-8 h-8 text-primary group-hover:text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">E-Waste Collection</h3>
              <p className="text-gray-600">
                Phones, laptops, batteries, cables and other electronic items. 
                Free pickup service for your society.
              </p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3">
              Book E-Waste Pickup
            </Button>
          </CardContent>
        </Card>

        <Card className="service-card group cursor-pointer" onClick={() => onSelectService('biomedical')}>
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
              <Syringe className="w-8 h-8 text-orange-500 group-hover:text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">Biomedical Waste</h3>
              <p className="text-gray-600">
                Syringes, needles, expired medications and medical supplies. 
                Safe disposal with proper certification.
              </p>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
              Book Biomedical Pickup
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
          <p className="text-sm text-gray-600">Certified disposal methods that protect our environment</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Community Focused</h3>
          <p className="text-sm text-gray-600">Serving residential societies and apartment complexes</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-purple-100 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600" />
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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">About EcoCollect</h1>
          <p className="text-xl text-gray-600">
            Making waste management simple, safe, and sustainable for communities across India.
          </p>
        </div>

        <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
          <p>
            EcoCollect was founded with a simple mission: to make responsible waste disposal 
            accessible to every household and community. We understand the challenges societies 
            face in managing electronic and biomedical waste safely.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Mission</h2>
          <p>
            To create a cleaner, healthier environment by providing convenient, certified 
            waste collection services that ensure proper disposal and recycling of hazardous materials.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Partners</h2>
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Certified Recyclers</h3>
              <p className="text-gray-600 text-sm">
                We work with government-approved recycling facilities that follow 
                international standards for e-waste processing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Medical Waste Handlers</h3>
              <p className="text-gray-600 text-sm">
                Licensed biomedical waste management companies ensure safe disposal 
                with proper incineration and documentation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Local Authorities</h3>
              <p className="text-gray-600 text-sm">
                Partnering with municipal corporations and pollution control boards 
                for compliance and environmental protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Community Organizations</h3>
              <p className="text-gray-600 text-sm">
                Working with resident welfare associations to create awareness 
                and facilitate easy waste collection.
              </p>
            </div>
          </div>
        </div>
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
