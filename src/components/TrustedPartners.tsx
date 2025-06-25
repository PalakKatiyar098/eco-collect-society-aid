
import React from 'react';
import { Building, Users, Award, CheckCircle } from 'lucide-react';

const TrustedPartners = () => {
  const partners = [
    {
      name: 'Green Earth Recycling',
      logo: '🌱',
      description: 'Certified e-waste processing facility'
    },
    {
      name: 'EcoSafe Medical',
      logo: '🏥',
      description: 'Licensed biomedical waste treatment'
    },
    {
      name: 'City Municipal Corp',
      logo: '🏛️',
      description: 'Government partnership program'
    },
    {
      name: 'Tech Recyclers Ltd',
      logo: '💻',
      description: 'Electronics refurbishment experts'
    }
  ];

  const certifications = [
    {
      name: 'ISO 14001',
      icon: Award,
      description: 'Environmental Management'
    },
    {
      name: 'CPCB Authorized',
      icon: CheckCircle,
      description: 'Pollution Control Board'
    },
    {
      name: 'OSHA Compliant',
      icon: CheckCircle,
      description: 'Safety Standards'
    },
    {
      name: 'Zero Landfill',
      icon: Award,
      description: 'Sustainable Processing'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted Partners & Certifications</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with certified partners to ensure your waste is processed safely and responsibly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Partners</h3>
            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{partner.logo}</div>
                  <h4 className="font-medium text-gray-900 mb-1">{partner.name}</h4>
                  <p className="text-xs text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedPartners;
