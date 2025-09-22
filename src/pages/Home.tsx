import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Award, 
  Clock, 
  Star,
  Code,
  Cloud,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  Target,
  Shield,
  Rocket,
  Play
} from 'lucide-react';

const Home: React.FC = () => {
  const programs = [
    {
      id: 1,
      title: 'Digital Transformation',
      description: 'Master modern digital technologies and transform businesses with cutting-edge solutions',
      duration: '6 months',
      students: '1,200+',
      rating: 4.9,
      price: 'Free',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      features: ['React & Node.js', 'Database Design', 'API Development', 'Cloud Deployment'],
      badge: 'Most Popular'
    },
    {
      id: 2,
      title: 'Cloud & DevOps',
      description: 'Master AWS, Docker, Kubernetes, and CI/CD pipelines for modern infrastructure',
      duration: '7 months',
      students: '920+',
      rating: 4.9,
      price: '₹15,999',
      icon: Cloud,
      color: 'from-green-500 to-green-600',
      features: ['AWS & Azure', 'Docker & K8s', 'CI/CD', 'Infrastructure'],
      badge: 'High Demand'
    },
    {
      id: 3,
      title: 'Cyber Security',
      description: 'Learn ethical hacking, security protocols, and threat analysis for enterprise security',
      duration: '8 months',
      students: '750+',
      rating: 4.8,
      price: '₹18,999',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      features: ['Ethical Hacking', 'Security Protocols', 'Threat Analysis', 'Compliance'],
      badge: 'Certified'
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'Master Agile, Scrum, and modern project management tools for leadership roles',
      duration: '5 months',
      students: '650+',
      rating: 4.7,
      price: '₹12,999',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      features: ['Agile & Scrum', 'Project Tools', 'Team Leadership', 'Risk Management'],
      badge: 'Leadership'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Learn from industry professionals with 10+ years of experience in top tech companies',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Get certified by top tech companies and recognized institutions worldwide',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to course materials and mentorship',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Connect with international companies and remote work opportunities worldwide',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Trained', icon: Users },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '500+', label: 'Industry Partners', icon: Globe },
    { number: '50+', label: 'Expert Mentors', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-8 border border-blue-100">
              <span className="text-blue-700 font-medium text-sm">🚀 Launch Your Tech Career</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 leading-tight">
              TechAcademy
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Master cutting-edge technologies with our comprehensive programs. 
              From beginner to expert, we'll guide you through your tech journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/assessment"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/apply"
                className="group bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Award className="mr-2 h-5 w-5" />
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of technology programs designed to launch your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="group relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {program.badge && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {program.badge}
                    </div>
                  )}
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} mb-6`}>
                    <program.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-gray-900 font-semibold">{program.rating}</span>
                    </div>
                    <div className="text-gray-500 text-sm">{program.students} students</div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-gray-900">{program.price}</div>
                    <div className="text-gray-500 text-sm">{program.duration}</div>
                  </div>
                  
                  <Link
                    to="/apply"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose TechAcademy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the best learning experience with industry-leading features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-6 group-hover:bg-blue-50 transition-all duration-300 border border-gray-200">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <Rocket className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have launched their tech careers with TechAcademy
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/assessment"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/mentor-application"
                className="group bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Award className="mr-2 h-5 w-5" />
                Become a Mentor
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;