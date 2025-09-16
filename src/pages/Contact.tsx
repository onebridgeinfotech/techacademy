import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          interest: ''
        });
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Tech Street', 'Innovation District', 'San Francisco, CA 94105'],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@techacademy.com', 'support@techacademy.com'],
      action: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
      action: 'Schedule Call'
    }
  ];

  const faqs = [
    {
      question: 'What courses do you offer?',
      answer: 'We offer comprehensive courses in Web Development, Data Science, Mobile Development, and Cloud Computing. Each program is designed with industry input and includes hands-on projects.'
    },
    {
      question: 'How long are the courses?',
      answer: 'Our courses range from 4-8 months depending on the program. We offer both full-time and part-time options to accommodate different schedules.'
    },
    {
      question: 'Do you provide job placement assistance?',
      answer: 'Yes! We have a 95% job placement rate and provide career support including resume reviews, interview preparation, and connections to our network of 50+ industry partners.'
    },
    {
      question: 'What are the prerequisites?',
      answer: 'Most of our courses are designed for beginners, though some advanced programs may require basic programming knowledge. We offer preparatory courses for those who need them.'
    },
    {
      question: 'Do you offer financial aid?',
      answer: 'Yes, we offer various financing options including payment plans, scholarships, and income-share agreements. Contact our admissions team to learn more about available options.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our courses or programs? We're here to help you start your tech career journey.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                        Area of Interest
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select an option</option>
                        <option value="web-development">Web Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="mobile-development">Mobile Development</option>
                        <option value="cloud-computing">Cloud Computing</option>
                        <option value="general-inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 w-5 h-5" />
                        Send Message
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-1 transition-colors">
                          {info.action}
                          <ArrowRight className="inline w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule a Call
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Live Chat
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                  <Mail className="mr-2 w-5 h-5" />
                  Email Support
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.slice(0, 3).map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                  View All FAQs
                  <ArrowRight className="inline w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Our Campus</h3>
              <p className="text-gray-600">123 Tech Street, Innovation District, San Francisco, CA 94105</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                Get Directions
                <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

