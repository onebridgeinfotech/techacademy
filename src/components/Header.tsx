import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User, BookOpen, Info, Mail, Award, Users } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: GraduationCap },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Internship Programs', href: '/internships', icon: BookOpen },
    { name: 'Placements', href: '/placements', icon: Award },
    { name: 'Sponsorship', href: '/sponsorship', icon: Users },
    { name: 'Contact Us', href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TechAcademy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

                  {/* Action Buttons */}
                  <div className="hidden md:flex items-center space-x-4">
                    <Link
                      to="/assessment"
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <Award className="w-4 h-4" />
                      <span>Start Assessment</span>
                    </Link>
                    <Link
                      to="/apply"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Award className="w-4 h-4" />
                      <span>Apply Now</span>
                    </Link>
                    <Link
                      to="/mentor-application"
                      className="flex items-center space-x-2 bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors duration-200"
                    >
                      <Users className="w-4 h-4" />
                      <span>Become a Mentor</span>
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
                      <Link
                        to="/assessment"
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 mt-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Award className="w-5 h-5" />
                        <span>Start Assessment</span>
                      </Link>
                      <Link
                        to="/apply"
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Award className="w-5 h-5" />
                        <span>Apply Now</span>
                      </Link>
              <Link
                to="/mentor-application"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-white bg-secondary-600 hover:bg-secondary-700 transition-colors duration-200 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-5 h-5" />
                <span>Become a Mentor</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
