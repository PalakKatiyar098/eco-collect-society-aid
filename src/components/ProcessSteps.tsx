
import React from 'react';
import { Truck, Package, Recycle, Award } from 'lucide-react';

const ProcessSteps = ({ type }: { type: 'ewaste' | 'biomedical' }) => {
  const steps = type === 'ewaste' ? [
    {
      number: 1,
      title: 'Collection',
      description: 'Safe pickup from your doorstep',
      icon: Truck
    },
    {
      number: 2,
      title: 'Sorting',
      description: 'Categorization by material type',
      icon: Package
    },
    {
      number: 3,
      title: 'Processing',
      description: 'Safe dismantling and recycling',
      icon: Recycle
    },
    {
      number: 4,
      title: 'Recovery',
      description: 'Materials reused in new products',
      icon: Award
    }
  ] : [
    {
      number: 1,
      title: 'Collection',
      description: 'Secure pickup with safety protocols',
      icon: Truck
    },
    {
      number: 2,
      title: 'Transport',
      description: 'Licensed vehicle transportation',
      icon: Package
    },
    {
      number: 3,
      title: 'Treatment',
      description: 'Safe incineration and disposal',
      icon: Recycle
    },
    {
      number: 4,
      title: 'Certification',
      description: 'Compliance documentation provided',
      icon: Award
    }
  ];

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Our {type === 'ewaste' ? 'E-Waste' : 'Biomedical Waste'} Process
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={step.number} className="process-step relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-neutral-200 transform -translate-y-1/2 z-10" />
              )}
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold text-sm">{step.number}</span>
              </div>
              <div className="mb-2">
                <IconComponent className="w-5 h-5 text-primary mx-auto mb-2" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessSteps;
