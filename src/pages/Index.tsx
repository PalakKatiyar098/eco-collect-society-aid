
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Recycle, Heart, Shield, Users, Leaf, Award, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UnifiedBookingForm from '@/components/UnifiedBookingForm';
import AccountDetailsPage from './AccountDetailsPage';
import PickupsPage from './PickupsPage';
import ImpactStats from '@/components/ImpactStats';
import TrustedPartners from '@/components/TrustedPartners';

type Section = 'home' | 'ewaste' | 'biomedical' | 'about' | 'education' | 'account-details' | 'pickups';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'ewaste':
        return <UnifiedBookingForm onBack={() => setActiveSection('home')} onAccountDetails={() => setActiveSection('account-details')} defaultTab="ewaste" />;
      case 'biomedical':
        return <UnifiedBookingForm onBack={() => setActiveSection('home')} onAccountDetails={() => setActiveSection('account-details')} defaultTab="biomedical" />;
      case 'account-details':
        return <AccountDetailsPage onBack={() => setActiveSection('home')} />;
      case 'pickups':
        return <PickupsPage onBack={() => setActiveSection('home')} />;
      default:
        return <HomePage onSectionChange={setActiveSection} />;
    }
  };

  return renderContent();
};

const HomePage = ({ onSectionChange }: { onSectionChange: (section: Section) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeSection="home" 
        onSectionChange={onSectionChange}
        onAccountNavigation={(view) => {
          if (view === 'profile') {
            onSectionChange('account-details');
          } else {
            onSectionChange('pickups');
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Responsible Waste Collection for
              <span className="text-primary block">Modern Societies</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional e-waste and biomedical waste management services. 
              Safe, certified, and convenient pickup from your doorstep.
            </p>

            <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Recycle className="w-4 h-4 text-primary" />
                <span>Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" />
                <span>Sustainable</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 text-lg"
                onClick={() => onSectionChange('ewaste')}
              >
                Schedule E-Waste Pickup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => onSectionChange('biomedical')}
              >
                Biomedical Waste Pickup
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Waste Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional collection and disposal services for both electronic and biomedical waste,
              ensuring environmental safety and regulatory compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="service-card group cursor-pointer" onClick={() => onSectionChange('ewaste')}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <Recycle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">E-Waste Collection</h3>
                <p className="text-gray-600 mb-6">
                  Responsible disposal of electronic devices, computers, phones, and other digital equipment.
                  Certified data destruction and component recycling.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Computers & Laptops
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Mobile Devices & Tablets
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Home Appliances
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Batteries & Components
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="service-card group cursor-pointer" onClick={() => onSectionChange('biomedical')}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Biomedical Waste</h3>
                <p className="text-gray-600 mb-6">
                  Safe collection and disposal of medical waste from homes, clinics, and healthcare facilities.
                  Compliant with all safety regulations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Sharps & Needles
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Expired Medications
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Contaminated Materials
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Medical Equipment
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <ImpactStats />

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, efficient process to get your waste collected safely and responsibly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="process-step">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule Pickup</h3>
              <p className="text-gray-600">
                Book your waste collection online or through our app. Choose your preferred date and time slot.
              </p>
            </div>

            <div className="process-step">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Prepare Items</h3>
              <p className="text-gray-600">
                Safely pack your waste items following our guidelines. We'll provide containers for biomedical waste.
              </p>
            </div>

            <div className="process-step">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe Collection</h3>
              <p className="text-gray-600">
                Our certified team collects your waste and provides you with a collection certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education-section" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Proper Waste Disposal Matters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding the impact of responsible waste management on our environment and community health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Environmental Protection</h3>
                <p className="text-gray-600 text-sm">
                  Proper e-waste disposal prevents toxic materials from contaminating soil and groundwater, 
                  protecting our ecosystem for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Health & Safety</h3>
                <p className="text-gray-600 text-sm">
                  Biomedical waste contains pathogens and chemicals that can cause serious health risks 
                  if not handled by trained professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <Recycle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Resource Recovery</h3>
                <p className="text-gray-600 text-sm">
                  Electronic devices contain valuable materials like gold, silver, and rare earth elements 
                  that can be recovered and reused.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <TrustedPartners />

      {/* About Section */}
      <section id="about-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              About EcoCollect Society Aid
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              We are a certified waste management company specializing in the safe collection and disposal 
              of electronic and biomedical waste. Our mission is to make responsible waste disposal 
              accessible and convenient for residential societies and healthcare facilities.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Certified & Licensed</h3>
                <p className="text-gray-600 text-sm">
                  All our operations are certified by environmental authorities and comply with national regulations.
                </p>
              </div>
              
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Experienced Team</h3>
                <p className="text-gray-600 text-sm">
                  Our trained professionals have years of experience in safe waste handling and disposal.
                </p>
              </div>
              
              <div className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
                <p className="text-gray-600 text-sm">
                  We follow strict safety protocols to ensure the wellbeing of our team and your community.
                </p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-neutral-50 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">help@ecocollect.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Service Area</p>
                    <p className="text-gray-600">Bangalore, Karnataka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
