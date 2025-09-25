import React from 'react';
import { Shield, Lock, Eye, Database, Users, Globe } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and educational background",
        "Account Information: Username, password (encrypted), and profile preferences",
        "Learning Data: Course progress, assessment results, and interaction with our platform",
        "Technical Information: IP address, browser type, device information, and usage analytics",
        "Communication Data: Messages sent through our platform and support interactions"
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our educational services and platform functionality",
        "Personalize your learning experience and recommend relevant content",
        "Process payments and manage your account and subscriptions",
        "Send important updates about your courses and platform changes",
        "Provide customer support and respond to your inquiries",
        "Analyze usage patterns to improve our services and develop new features"
      ]
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share information with trusted service providers who assist in platform operations",
        "Information may be shared with mentors and instructors for educational purposes",
        "We may disclose information if required by law or to protect our rights and safety",
        "Aggregated, anonymized data may be used for research and analytics purposes"
      ]
    },
    {
      icon: Database,
      title: "Data Security",
      content: [
        "We implement industry-standard encryption for data transmission and storage",
        "Access to personal information is restricted to authorized personnel only",
        "Regular security audits and updates to protect against vulnerabilities",
        "Secure backup systems to prevent data loss",
        "Employee training on data protection and privacy best practices"
      ]
    },
    {
      icon: Users,
      title: "Your Rights",
      content: [
        "Access: Request a copy of your personal information we hold",
        "Correction: Update or correct inaccurate personal information",
        "Deletion: Request deletion of your personal information (subject to legal requirements)",
        "Portability: Receive your data in a structured, machine-readable format",
        "Opt-out: Unsubscribe from marketing communications at any time",
        "Restriction: Request limitation of processing of your personal information"
      ]
    },
    {
      icon: Globe,
      title: "International Transfers",
      content: [
        "Your data may be transferred to and processed in countries other than your own",
        "We ensure appropriate safeguards are in place for international transfers",
        "We comply with applicable data protection laws including GDPR and CCPA",
        "Data processing agreements with international service providers",
        "Regular review of international data transfer practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30 shadow-lg">
              <span className="text-white font-semibold text-sm">🔒 Privacy Policy</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Privacy</span>{' '}
              <span className="text-yellow-500">
                Policy
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your personal information when you use TechAcademy.
            </p>

            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 shadow-lg">
              <span className="text-white font-semibold text-sm">
                Last Updated: {lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <section.icon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 ml-6">
                      {section.title}
                    </h2>
                  </div>
                  
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4"></div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Contact Information */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Us About Privacy
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact our Privacy Team:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">privacy@techacademy.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">123 Tech Street, Silicon Valley, CA 94000</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                    <p className="text-gray-600">Within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates Notice */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Policy Updates
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new Privacy Policy on this page and updating 
                  the "Last Updated" date. We encourage you to review this Privacy Policy 
                  periodically for any changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
