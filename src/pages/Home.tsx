import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Award, 
  Clock, 
  Star,
  Code,
  Database,
  Smartphone,
  Cloud,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  Sparkles,
  Target,
  Shield,
  Rocket
} from 'lucide-react';

const Home: React.FC = () => {
  const programs = [
    {
      id: 1,
      title: 'Digital Transformation',
      description: 'Master modern digital technologies and transform businesses',
      duration: '6 months',
      students: '1,200+',
      rating: 4.9,
      price: 'Free',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      features: ['React & Node.js', 'Database Design', 'API Development', 'Cloud Deployment'],
      badge: 'Most Popular'
    },
    {
      id: 2,
      title: 'Cloud & DevOps',
      description: 'Master AWS, Docker, Kubernetes, and CI/CD pipelines',
      duration: '7 months',
      students: '920+',
      rating: 4.9,
      price: '₹15,999',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      features: ['AWS & Azure', 'Docker & K8s', 'CI/CD', 'Infrastructure'],
      badge: 'High Demand'
    },
    {
      id: 3,
      title: 'Cyber Security',
      description: 'Learn ethical hacking, security protocols, and threat analysis',
      duration: '8 months',
      students: '750+',
      rating: 4.8,
      price: '₹18,999',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      features: ['Ethical Hacking', 'Security Protocols', 'Threat Analysis', 'Compliance'],
      badge: 'Certified'
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'Master Agile, Scrum, and modern project management tools',
      duration: '5 months',
      students: '650+',
      rating: 4.7,
      price: '₹12,999',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      features: ['Agile & Scrum', 'Project Tools', 'Team Leadership', 'Risk Management'],
      badge: 'Leadership'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Learn from industry professionals with 10+ years of experience',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Get certified by top tech companies and recognized institutions',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to course materials',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Connect with international companies and remote work opportunities',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">🚀 Launch Your Tech Career</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              TechAcademy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Master cutting-edge technologies with our comprehensive programs. 
              From beginner to expert, we'll guide you through your tech journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/assessment"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/apply"
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Programs
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Choose from our comprehensive range of technology programs designed to launch your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="group relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                  {program.badge && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {program.badge}
                    </div>
                  )}
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} mb-6`}>
                    <program.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{program.title}</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">{program.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-blue-200">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-white font-semibold">{program.rating}</span>
                    </div>
                    <div className="text-blue-200 text-sm">{program.students} students</div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-white">{program.price}</div>
                    <div className="text-blue-200 text-sm">{program.duration}</div>
                  </div>
                  
                  <Link
                    to="/apply"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group"
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose TechAcademy?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We provide the best learning experience with industry-leading features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:bg-white/20 transition-all duration-300">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <Rocket className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have launched their tech careers with TechAcademy
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/assessment"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/mentor-application"
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
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