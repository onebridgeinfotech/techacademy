import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Star, 
  ArrowRight,
  CheckCircle,
  Play,
  Download,
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  Target,
  Globe
} from 'lucide-react';

const Placements: React.FC = () => {
  const stats = [
    { number: '95%', label: 'Placement Rate', icon: Target, color: 'text-green-600' },
    { number: '$85K', label: 'Average Salary', icon: DollarSign, color: 'text-blue-600' },
    { number: '50+', label: 'Partner Companies', icon: Globe, color: 'text-purple-600' },
    { number: '2.5', label: 'Months Avg. to Job', icon: Calendar, color: 'text-orange-600' }
  ];

  const companies = [
    { name: 'Google', logo: 'G', students: 45, avgSalary: '$120K' },
    { name: 'Microsoft', logo: 'M', students: 38, avgSalary: '$110K' },
    { name: 'Amazon', logo: 'A', students: 52, avgSalary: '$105K' },
    { name: 'Apple', logo: 'A', students: 28, avgSalary: '$115K' },
    { name: 'Meta', logo: 'M', students: 35, avgSalary: '$125K' },
    { name: 'Netflix', logo: 'N', students: 22, avgSalary: '$130K' },
    { name: 'Uber', logo: 'U', students: 31, avgSalary: '$95K' },
    { name: 'Airbnb', logo: 'A', students: 19, avgSalary: '$100K' },
    { name: 'Spotify', logo: 'S', students: 15, avgSalary: '$90K' },
    { name: 'Tesla', logo: 'T', students: 12, avgSalary: '$110K' }
  ];

  const successStories = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Google',
      image: '/api/placeholder/100/100',
      quote: 'TechAcademy\'s placement support was incredible. They helped me prepare for interviews and connected me with the right opportunities. I landed my dream job at Google!',
      salary: '$125K',
      duration: '2 months',
      course: 'Full-Stack Development'
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist',
      company: 'Netflix',
      image: '/api/placeholder/100/100',
      quote: 'The career guidance and interview preparation at TechAcademy were top-notch. I went from having no tech background to becoming a data scientist at Netflix.',
      salary: '$130K',
      duration: '3 months',
      course: 'Data Science'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Mobile Developer',
      company: 'Airbnb',
      image: '/api/placeholder/100/100',
      quote: 'The hands-on projects and real-world experience I gained at TechAcademy made all the difference in my job search. I\'m now building amazing apps at Airbnb.',
      salary: '$110K',
      duration: '1.5 months',
      course: 'Mobile Development'
    }
  ];

  const placementProcess = [
    {
      step: 1,
      title: 'Career Assessment',
      description: 'We evaluate your skills, interests, and career goals to create a personalized placement strategy.',
      icon: Target
    },
    {
      step: 2,
      title: 'Resume & Portfolio Review',
      description: 'Our experts help you create a compelling resume and portfolio that stands out to employers.',
      icon: Briefcase
    },
    {
      step: 3,
      title: 'Interview Preparation',
      description: 'Mock interviews, technical assessments, and behavioral coaching to boost your confidence.',
      icon: Users
    },
    {
      step: 4,
      title: 'Company Matching',
      description: 'We connect you with our network of 50+ partner companies that match your profile.',
      icon: Globe
    },
    {
      step: 5,
      title: 'Job Placement',
      description: 'Ongoing support until you land your dream job with competitive salary and benefits.',
      icon: Award
    }
  ];

  const services = [
    {
      title: 'Resume & Portfolio Building',
      description: 'Professional resume writing and portfolio development services',
      features: ['ATS-optimized resumes', 'Portfolio website creation', 'LinkedIn profile optimization']
    },
    {
      title: 'Interview Preparation',
      description: 'Comprehensive interview coaching and technical assessment training',
      features: ['Mock interviews', 'Technical coding practice', 'Behavioral question prep']
    },
    {
      title: 'Job Search Strategy',
      description: 'Personalized job search plan and networking guidance',
      features: ['Job market analysis', 'Networking strategies', 'Application tracking']
    },
    {
      title: 'Salary Negotiation',
      description: 'Expert guidance on salary negotiation and benefits evaluation',
      features: ['Market research', 'Negotiation tactics', 'Benefits analysis']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Career Placements
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Launch your tech career with our comprehensive placement support. 95% of our graduates land their dream jobs within 3 months.
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
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Partner Companies */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Partner Companies
            </h2>
            <p className="text-gray-600">
              Top tech companies trust us to provide exceptional talent
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {companies.map((company, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary-600">{company.logo}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{company.students} students placed</p>
                <p className="text-sm font-medium text-green-600">{company.avgSalary} avg salary</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600">
              Hear from our graduates who landed their dream jobs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-gray-600">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.role} at {story.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{story.quote}"</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-green-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {story.salary}
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {story.duration}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Course: {story.course}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Process */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Placement Process
            </h2>
            <p className="text-gray-600">
              A proven 5-step process to land your dream job
            </p>
          </div>
          <div className="space-y-8">
            {placementProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Icon className="w-6 h-6 text-primary-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Placement Services
            </h2>
            <p className="text-gray-600">
              Comprehensive support to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Launch Your Career?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Join thousands of successful graduates who have transformed their careers with our placement support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors">
              <Download className="mr-2 w-4 h-4" />
              Download Placement Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placements;

