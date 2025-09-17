import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Globe, 
  Target, 
  Heart, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Play,
  Quote,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  Briefcase,
  Shield,
  Cloud,
  Database,
  Code,
  FolderOpen
} from 'lucide-react';

const Sponsorship: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState('gold');

  const programs = [
    {
      id: 1,
      title: 'Digital Transformation',
      description: 'Comprehensive digital skills program covering modern technologies and digital strategies',
      duration: '6 months',
      students: '500+',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      features: ['Digital Marketing', 'E-commerce', 'Digital Analytics', 'Social Media Strategy']
    },
    {
      id: 2,
      title: 'Cloud and DevOps',
      description: 'Master cloud computing, containerization, and DevOps practices for scalable infrastructure',
      duration: '8 months',
      students: '350+',
      icon: Cloud,
      color: 'from-green-500 to-green-600',
      features: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code']
    },
    {
      id: 3,
      title: 'Cyber Security & Ethical Hacking',
      description: 'Learn to protect systems and networks from cyber threats through ethical hacking techniques',
      duration: '7 months',
      students: '280+',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      features: ['Penetration Testing', 'Network Security', 'Incident Response', 'Security Auditing']
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'Master project management methodologies and tools for successful project delivery',
      duration: '5 months',
      students: '420+',
      icon: FolderOpen,
      color: 'from-purple-500 to-purple-600',
      features: ['Agile & Scrum', 'Risk Management', 'Team Leadership', 'Project Planning']
    }
  ];

  const sponsorshipTiers = [
    {
      id: 'bronze',
      name: 'Bronze Sponsor',
      amount: '$5,000',
      benefits: [
        'Logo placement on website',
        'Mention in course materials',
        'Access to 2 student profiles',
        'Quarterly progress reports',
        'Certificate of sponsorship'
      ],
      students: '5-10',
      color: 'from-yellow-600 to-yellow-700'
    },
    {
      id: 'silver',
      name: 'Silver Sponsor',
      amount: '$15,000',
      benefits: [
        'Logo placement on website and materials',
        'Booth at career fairs',
        'Access to 10 student profiles',
        'Monthly progress reports',
        'Speaking opportunity at events',
        'Customized recruitment support'
      ],
      students: '15-25',
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      amount: '$30,000',
      benefits: [
        'Premium logo placement',
        'Dedicated recruitment events',
        'Access to all student profiles',
        'Weekly progress reports',
        'Keynote speaking opportunities',
        'Custom curriculum input',
        'Priority hiring pipeline'
      ],
      students: '30-50',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'platinum',
      name: 'Platinum Sponsor',
      amount: '$50,000+',
      benefits: [
        'Exclusive partnership branding',
        'Custom training programs',
        'Direct access to top students',
        'Real-time progress tracking',
        'Executive speaking opportunities',
        'Curriculum co-development',
        'Guaranteed hiring pipeline',
        'Industry recognition'
      ],
      students: '50+',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const stats = [
    { number: '50+', label: 'Corporate Partners', icon: Briefcase },
    { number: '$2M+', label: 'Total Sponsorship', icon: DollarSign },
    { number: '1,000+', label: 'Students Placed', icon: Users },
    { number: '95%', label: 'Partner Satisfaction', icon: Star }
  ];

  const testimonials = [
    {
      company: 'TechCorp Solutions',
      representative: 'Sarah Johnson, CTO',
      image: '/api/placeholder/100/100',
      quote: 'Our partnership with TechAcademy has been transformative. We\'ve hired 25 exceptional developers who hit the ground running from day one.',
      rating: 5,
      studentsHired: 25,
      partnership: '2 years'
    },
    {
      company: 'CloudScale Technologies',
      representative: 'Michael Chen, VP Engineering',
      image: '/api/placeholder/100/100',
      quote: 'The quality of graduates from TechAcademy is outstanding. Their practical skills and industry readiness exceed our expectations.',
      rating: 5,
      studentsHired: 18,
      partnership: '3 years'
    },
    {
      company: 'SecureNet Inc.',
      representative: 'Emily Rodriguez, Security Director',
      image: '/api/placeholder/100/100',
      quote: 'TechAcademy\'s cybersecurity program produces top-tier talent. We\'ve built our entire security team with their graduates.',
      rating: 5,
      studentsHired: 12,
      partnership: '1.5 years'
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Access to Top Talent',
      description: 'Get first access to our best students through our exclusive recruitment pipeline.'
    },
    {
      icon: Target,
      title: 'Customized Training',
      description: 'Work with us to develop specialized curriculum that meets your specific needs.'
    },
    {
      icon: Award,
      title: 'Brand Recognition',
      description: 'Enhance your brand visibility among students and the tech community.'
    },
    {
      icon: Globe,
      title: 'Industry Leadership',
      description: 'Position your company as a leader in tech education and talent development.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Corporate Sponsorship
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partner with us to shape the future of tech education and access top talent. 
              Join our network of industry leaders committed to developing the next generation of tech professionals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Programs Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Specialized Programs
            </h2>
            <p className="text-gray-600">
              Support students in cutting-edge technology areas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div key={program.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {program.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{program.duration}</span>
                    <span>{program.students} students</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Sponsorship Tiers
            </h2>
            <p className="text-gray-600">
              Choose the sponsorship level that best fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorshipTiers.map((tier) => (
              <div
                key={tier.id}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                  selectedTier === tier.id ? 'ring-2 ring-primary-500 transform scale-105' : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${tier.color} rounded-t-xl -m-6 mb-6`}></div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{tier.amount}</div>
                  <div className="text-sm text-gray-600">{tier.students} students</div>
                </div>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  selectedTier === tier.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {selectedTier === tier.id ? 'Selected' : 'Select Tier'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-gray-600">
              Discover the advantages of becoming a TechAcademy sponsor
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              What Our Partners Say
            </h2>
            <p className="text-gray-600">
              Hear from our successful corporate partners
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary-600 mb-4" />
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-gray-600">
                      {testimonial.representative.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.representative}</h4>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{testimonial.studentsHired} students hired</span>
                      <span className="mx-2">•</span>
                      <span>{testimonial.partnership} partnership</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Become a Partner?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Join our network of industry leaders and help shape the future of tech education. 
            Contact us to discuss partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              <Mail className="mr-2 w-4 h-4" />
              Contact Partnership Team
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors">
              <Phone className="mr-2 w-4 h-4" />
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsorship;

