import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

      const navigation = [
        { name: 'Home', href: '/', sectionId: 'hero' },
        { name: 'About Us', href: '/', sectionId: 'about' },
        { name: 'Programs', href: '/', sectionId: 'programs' },
        { name: 'Mentors', href: '/', sectionId: 'mentors' },
        { name: 'Placements', href: '/', sectionId: 'placements' },
        { name: 'Testimonials', href: '/', sectionId: 'testimonials' },
        { name: 'Contact Us', href: '/', sectionId: 'contact' }
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-yellow-500 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-all duration-300">
              TechAcademy
            </span>
          </Link>

          {/* Desktop Navigation - Full navigation for large screens */}
          <nav className="hidden lg:flex items-center space-x-1">
                {navigation.map((item) => {
                  // For homepage sections, check if we're on homepage
                  // For separate pages, check if current path matches
                  const isActive = item.sectionId 
                    ? location.pathname === '/' 
                    : location.pathname === item.href;
                  
                  // Unified styling for all navigation items with reduced padding
                  const unifiedClasses = `px-4 py-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer text-sm ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                  }`;
                  
                  return item.sectionId ? (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.sectionId)}
                      className={unifiedClasses}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={unifiedClasses}
                    >
                      {item.name}
                    </Link>
                  );
                })}
          </nav>

          {/* Medium Screen Navigation - Key items only */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
                {navigation.slice(0, 4).map((item) => {
                  // For homepage sections, check if we're on homepage
                  // For separate pages, check if current path matches
                  const isActive = item.sectionId 
                    ? location.pathname === '/' 
                    : location.pathname === item.href;
                  
                  // Unified styling for all navigation items with reduced padding
                  const unifiedClasses = `px-3 py-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer text-sm ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                  }`;
                  
                  return item.sectionId ? (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.sectionId)}
                      className={unifiedClasses}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={unifiedClasses}
                    >
                      {item.name}
                    </Link>
                  );
                })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/signup"
              className="btn-primary"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 border border-gray-200 shadow-lg">
                  {navigation.map((item) => {
                    // For homepage sections, check if we're on homepage
                    // For separate pages, check if current path matches
                    const isActive = item.sectionId 
                      ? location.pathname === '/' 
                      : location.pathname === item.href;
                    
                    // Unified styling for all navigation items (mobile)
                    const unifiedClasses = `block w-full text-left px-3 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-md' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                    }`;
                    
                    return item.sectionId ? (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.sectionId)}
                        className={unifiedClasses}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={unifiedClasses}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;