
import React from 'react';
import { Building } from 'lucide-react';

const TrustedPartners = () => {
  const partners = [
    {
      name: 'Waste Management Corp',
      type: 'Processing Partner',
    },
    {
      name: 'Green Recycling Ltd',
      type: 'E-Waste Specialist',
    },
    {
      name: 'BioSafe Solutions',
      type: 'Biomedical Expert',
    },
    {
      name: 'EcoLogistics',
      type: 'Transportation',
    },
  ];

  const certifications = [
    {
      name: 'Pollution Control Board',
      description: 'Authorized by State Pollution Control Board for waste handling',
    },
    {
      name: 'ISO 14001',
      description: 'Environmental management system certification',
    },
    {
      name: 'Biomedical License',
      description: 'Licensed for biomedical waste collection and transport',
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Trusted Partners</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          We work with certified waste management companies, recycling facilities, and logistics partners 
          to ensure your waste is handled responsibly from pickup to final processing.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building className="w-6 h-6 text-neutral-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
              <p className="text-sm text-gray-600">{partner.type}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Certifications & Compliance</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{cert.name}</h3>
              <p className="text-sm text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedPartners;
