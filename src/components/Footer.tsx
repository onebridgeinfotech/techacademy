import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">TechAcademy</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering the next generation of tech professionals with cutting-edge education 
              and hands-on experience in modern technologies.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/placements" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Placements
                </Link>
              </li>
              <li>
                <Link to="/sponsorship" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sponsorship
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Internship Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Internship Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/internships/software-development" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Software Development
                </Link>
              </li>
              <li>
                <Link to="/internships/cloud-devops" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cloud & DevOps
                </Link>
              </li>
              <li>
                <Link to="/internships/data-science" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/internships/product-management" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Product Management
                </Link>
              </li>
              <li>
                <Link to="/internships/ai-generative" className="text-gray-300 hover:text-white transition-colors text-sm">
                  AI & Generative
                </Link>
              </li>
              <li>
                <Link to="/internships/digital-marketing" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/internships/cybersecurity" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">info@techacademy.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">123 Tech Street, Silicon Valley, CA 94000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} TechAcademy. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;