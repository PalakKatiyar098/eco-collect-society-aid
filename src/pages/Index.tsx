
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Shield, Recycle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EWasteBooking from '@/components/EWasteBooking';
import BiomedicalBooking from '@/components/BiomedicalBooking';
import ImpactStats from '@/components/ImpactStats';
import TrustedPartners from '@/components/TrustedPartners';
import AccountDetailsPage from './AccountDetailsPage';
import PickupsPage from './PickupsPage';

type Section = 'home' | 'ewaste' | 'biomedical' | 'about' | 'education';
type AccountView = 'profile' | 'ongoing' | 'history';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [accountView, setAccountView] = useState<AccountView>('profile');

  useEffect(() => {
    if (activeSection === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const handleBack = () => {
    setActiveSection('home');
  };

  const handleAccountNavigation = (view: AccountView) => {
    setAccountView(view);
    if (view === 'profile') {
      setActiveSection('profile' as Section);
    } else if (view === 'ongoing') {
      setActiveSection('pickups-ongoing' as Section);
    } else if (view === 'history') {
      setActiveSection('pickups-history' as Section);
    }
  };

  // Render different sections based on activeSection
  if (activeSection === 'ewaste') {
    return <EWasteBooking onBack={handleBack} onAccountDetails={() => handleAccountNavigation('profile')} />;
  }

  if (activeSection === 'biomedical') {
    return <BiomedicalBooking onBack={handleBack} onAccountDetails={() => handleAccountNavigation('profile')} />;
  }

  if (activeSection === 'profile') {
    return <AccountDetailsPage onBack={handleBack} />;
  }

  if (activeSection === 'pickups-ongoing') {
    return <PickupsPage onBack={handleBack} defaultTab="scheduled" />;
  }

  if (activeSection === 'pickups-history') {
    return <PickupsPage onBack={handleBack} defaultTab="past" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onAccountNavigation={handleAccountNavigation}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn Your Waste Into
              <span className="text-primary block">Environmental Impact</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional e-waste and biomedical waste collection service for societies. 
              Safe, certified, and environmentally responsible disposal.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
              onClick={() => setActiveSection('ewaste')}
            >
              Schedule Pickup Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white" id="about-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EcoCollect?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make waste management simple, safe, and sustainable for your community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Certified</h3>
              <p className="text-gray-600">Licensed disposal partners ensuring compliance with all regulations</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure</h3>
              <p className="text-gray-600">Safe handling and transportation with complete documentation</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable</h3>
              <p className="text-gray-600">Environmentally responsible recycling and disposal methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <ImpactStats />

      {/* Education Section */}
      <section className="py-16 bg-gray-50" id="education-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn About Proper Waste Disposal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding proper waste management helps protect our environment and community health
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">E-Waste Disposal</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Never throw electronics in regular trash
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Remove batteries before disposal
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Wipe personal data from devices
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Use certified recycling services
                </li>
              </ul>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setActiveSection('ewaste')}
              >
                Schedule E-Waste Pickup
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Biomedical Waste Safety</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Separate sharps in puncture-proof containers
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Never mix with household waste
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Dispose expired medications properly
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Use professional disposal services
                </li>
              </ul>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveSection('biomedical')}
              >
                Schedule Biomedical Pickup
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustedPartners />
      <Footer />
    </div>
  );
};

export default Index;
