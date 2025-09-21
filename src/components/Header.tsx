import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Programs', href: '/courses' },
    { name: 'Internships', href: '/internships' },
    { name: 'Placements', href: '/placements' },
    { name: 'Sponsorship', href: '/sponsorship' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              TechAcademy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/assessment"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Assessment
            </Link>
            <Link
              to="/apply"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Apply Now
            </Link>
            <Link
              to="/mentor-application"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Become a Mentor
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition-colors duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 border border-gray-200 shadow-lg">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Link
                  to="/assessment"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                >
                  Start Assessment
                </Link>
                <Link
                  to="/apply"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  Apply Now
                </Link>
                <Link
                  to="/mentor-application"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                >
                  Become a Mentor
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  Login
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