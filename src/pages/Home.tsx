import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
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
  Zap
} from 'lucide-react';

const Home: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      description: 'Master modern web technologies including React, Node.js, and databases',
      duration: '6 months',
      students: '1,200+',
      rating: 4.9,
      price: '$2,999',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      features: ['React & Node.js', 'Database Design', 'API Development', 'Deployment']
    },
    {
      id: 2,
      title: 'Data Science & Analytics',
      description: 'Learn Python, machine learning, and data visualization techniques',
      duration: '8 months',
      students: '850+',
      rating: 4.8,
      price: '$3,499',
      icon: Database,
      color: 'from-green-500 to-green-600',
      features: ['Python & R', 'Machine Learning', 'Data Visualization', 'Statistics']
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps with React Native and Flutter',
      duration: '5 months',
      students: '650+',
      rating: 4.7,
      price: '$2,799',
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600',
      features: ['React Native', 'Flutter', 'iOS & Android', 'App Store']
    },
    {
      id: 4,
      title: 'Cloud Computing & DevOps',
      description: 'Master AWS, Docker, Kubernetes, and CI/CD pipelines',
      duration: '7 months',
      students: '920+',
      rating: 4.9,
      price: '$3,299',
      icon: Cloud,
      color: 'from-orange-500 to-orange-600',
      features: ['AWS & Azure', 'Docker & K8s', 'CI/CD', 'Infrastructure']
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Trained', icon: Users },
    { number: '95%', label: 'Job Placement Rate', icon: Award },
    { number: '50+', label: 'Industry Partners', icon: Globe },
    { number: '4.9/5', label: 'Average Rating', icon: Star }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Industry-Relevant Curriculum',
      description: 'Our courses are designed with input from top tech companies to ensure you learn the most in-demand skills.'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience at leading tech companies.'
    },
    {
      icon: Award,
      title: 'Career Support',
      description: 'Get personalized career guidance, resume reviews, and interview preparation to land your dream job.'
    },
    {
      icon: Zap,
      title: 'Hands-On Projects',
      description: 'Build real-world projects and create a portfolio that showcases your skills to employers.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Launch Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Tech Career
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed">
                Master in-demand skills with industry experts and land your dream job in tech. 
                Join thousands of successful graduates who transformed their careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-all duration-200"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-primary-200 rounded w-3/4"></div>
                      <div className="h-4 bg-primary-200 rounded w-1/2"></div>
                      <div className="h-4 bg-primary-200 rounded w-5/6"></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>✨ Building the future of technology</p>
                    <p>🚀 One line of code at a time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TechAcademy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your tech career journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of tech courses designed for modern careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`h-2 bg-gradient-to-r ${course.color} rounded-t-xl`}></div>
                  <div className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Learn More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who have already started their journey to success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-all duration-200"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
