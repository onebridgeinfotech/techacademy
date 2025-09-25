import React from 'react';
import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using TechAcademy's platform, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, you may not use our services",
        "We reserve the right to modify these terms at any time, with changes taking effect immediately upon posting",
        "Your continued use of our services constitutes acceptance of any modifications",
        "These terms apply to all users, including students, mentors, and visitors"
      ]
    },
    {
      icon: Users,
      title: "User Accounts and Responsibilities",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "You are responsible for all activities that occur under your account",
        "You must be at least 18 years old to create an account, or have parental consent if under 18",
        "You agree to use our platform only for lawful purposes and in accordance with these terms"
      ]
    },
    {
      icon: Shield,
      title: "Intellectual Property Rights",
      content: [
        "All course materials, content, and resources are protected by copyright and other intellectual property laws",
        "You may not reproduce, distribute, or create derivative works without written permission",
        "You retain ownership of any original content you create and share on our platform",
        "By posting content, you grant us a license to use, display, and distribute your content for educational purposes",
        "We respect the intellectual property rights of others and expect our users to do the same",
        "Report any copyright infringement to our designated agent"
      ]
    },
    {
      icon: Scale,
      title: "Payment Terms and Refunds",
      content: [
        "All program fees are due before course commencement unless alternative arrangements are made",
        "We accept major credit cards, bank transfers, and approved payment plans",
        "Refunds are available within 14 days of enrollment, minus any processing fees",
        "No refunds will be provided after 14 days or if more than 20% of course content has been accessed",
        "Payment plans must be completed according to the agreed schedule",
        "Late payment fees may apply for overdue payments"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: [
        "Sharing account credentials with others or allowing unauthorized access",
        "Attempting to hack, disrupt, or damage our platform or systems",
        "Posting inappropriate, offensive, or illegal content",
        "Violating any applicable laws or regulations while using our services",
        "Engaging in any form of harassment, discrimination, or inappropriate behavior",
        "Using our platform for commercial purposes without authorization"
      ]
    },
    {
      icon: CheckCircle,
      title: "Limitation of Liability",
      content: [
        "Our services are provided 'as is' without warranties of any kind",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid for our services",
        "We do not guarantee specific learning outcomes or job placement results",
        "You use our services at your own risk and discretion",
        "Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you"
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
              <span className="text-white font-semibold text-sm">📋 Terms of Service</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Terms of</span>{' '}
              <span className="text-yellow-500">
                Service
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Please read these terms carefully before using TechAcademy. These terms govern 
              your use of our platform and services.
            </p>

            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 shadow-lg">
              <span className="text-white font-semibold text-sm">
                Last Updated: {lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
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

            {/* Governing Law */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Governing Law and Dispute Resolution
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    These Terms of Service are governed by the laws of the State of California, 
                    United States, without regard to conflict of law principles.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Any disputes arising from these terms or your use of our services will be 
                    resolved through binding arbitration in accordance with the rules of the 
                    American Arbitration Association.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You waive any right to participate in class action lawsuits or class-wide 
                    arbitration against TechAcademy.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200 shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">legal@techacademy.com</p>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
