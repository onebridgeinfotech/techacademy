import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Cloud, 
  Shield, 
  Target, 
  Star, 
  Clock, 
  Users, 
  CheckCircle,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
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
      category: 'development',
      features: ['React & Node.js', 'Database Design', 'API Development', 'Cloud Deployment'],
      badge: 'Most Popular',
      instructor: 'Dr. Sarah Johnson',
      level: 'Beginner to Intermediate'
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
      category: 'cloud',
      features: ['AWS & Azure', 'Docker & K8s', 'CI/CD', 'Infrastructure'],
      badge: 'High Demand',
      instructor: 'Michael Chen',
      level: 'Intermediate to Advanced'
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
      category: 'security',
      features: ['Ethical Hacking', 'Security Protocols', 'Threat Analysis', 'Compliance'],
      badge: 'Certified',
      instructor: 'Alex Rodriguez',
      level: 'Intermediate to Advanced'
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
      color: 'from-yellow-500 to-yellow-600',
      category: 'management',
      features: ['Agile & Scrum', 'Project Tools', 'Team Leadership', 'Risk Management'],
      badge: 'Leadership',
      instructor: 'Emily Davis',
      level: 'All Levels'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Programs' },
    { id: 'development', name: 'Development' },
    { id: 'cloud', name: 'Cloud & DevOps' },
    { id: 'security', name: 'Security' },
    { id: 'management', name: 'Management' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Programs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our comprehensive range of technology programs designed to launch your career
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="group relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                  {course.badge && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {course.badge}
                    </div>
                  )}
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${course.color} mb-6`}>
                    <course.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{course.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-gray-900 font-semibold">{course.rating}</span>
                      </div>
                      <div className="text-gray-500 text-sm">{course.students} students</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">{course.price}</div>
                      <div className="text-gray-500 text-sm">{course.duration}</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Instructor: {course.instructor}</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/apply"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group"
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with TechAcademy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/apply"
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;