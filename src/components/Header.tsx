
import React from 'react';
import { Button } from '@/components/ui/button';
import { Recycle, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: 'home' | 'ewaste' | 'biomedical' | 'about' | 'education') => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (action: string) => {
    if (action === 'learn') {
      scrollToSection('education-section');
    } else if (action === 'about') {
      scrollToSection('about-section');
    } else if (action === 'schedule-pickup') {
      onSectionChange('ewaste');
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'learn', label: 'Learn' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => onSectionChange('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EcoCollect</h1>
              <p className="text-xs text-gray-500">Society Aid</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-primary hover:bg-primary/5"
              >
                {item.label}
              </button>
            ))}
            <Button 
              className="bg-gray-700 hover:bg-gray-800 text-white"
              onClick={() => handleNavClick('schedule-pickup')}
            >
              Schedule Pickup
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 text-gray-600 hover:text-primary hover:bg-primary/5"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                className="mt-2 bg-gray-700 hover:bg-gray-800 text-white"
                onClick={() => handleNavClick('schedule-pickup')}
              >
                Schedule Pickup
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
