import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Briefcase, 
  Award, 
  TrendingUp, 
  Heart, 
  Mail,
  Zap,
  Sparkles
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Us', href: '/about', icon: Users },
    { name: 'Programs', href: '/courses', icon: Briefcase },
    { name: 'Internships', href: '/internships', icon: Award },
    { name: 'Placements', href: '/placements', icon: TrendingUp },
    { name: 'Sponsorship', href: '/sponsorship', icon: Heart },
    { name: 'Contact Us', href: '/contact', icon: Mail }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/assessment"
              className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-green-500/25 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>Start Assessment</span>
            </Link>
            <Link
              to="/apply"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <Award className="h-4 w-4" />
              <span>Apply Now</span>
            </Link>
            <Link
              to="/mentor-application"
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Become a Mentor</span>
            </Link>
            <Link
              to="/login"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 transition-colors duration-300 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md rounded-lg mt-2 border border-white/20">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-3 border-t border-white/20">
                <Link
                  to="/assessment"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                >
                  <Zap className="h-5 w-5" />
                  <span>Start Assessment</span>
                </Link>
                <Link
                  to="/apply"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <Award className="h-5 w-5" />
                  <span>Apply Now</span>
                </Link>
                <Link
                  to="/mentor-application"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <Users className="h-5 w-5" />
                  <span>Become a Mentor</span>
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <span>Login</span>
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