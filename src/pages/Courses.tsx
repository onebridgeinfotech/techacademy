import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Code,
  Database,
  Smartphone,
  Cloud,
  CheckCircle,
  Play,
  Download,
  Shield,
  Project
} from 'lucide-react';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses', icon: Code },
    { id: 'digital', name: 'Digital Transformation', icon: Code },
    { id: 'cloud', name: 'Cloud & DevOps', icon: Cloud },
    { id: 'security', name: 'Cyber Security', icon: Shield },
    { id: 'management', name: 'Project Management', icon: Project },
    { id: 'web', name: 'Web Development', icon: Code },
    { id: 'data', name: 'Data Science', icon: Database }
  ];

  const courses = [
    {
      id: 1,
      title: 'Full-Stack Web Development Bootcamp',
      description: 'Master modern web technologies including React, Node.js, MongoDB, and deployment strategies. Build real-world projects and create a professional portfolio.',
      category: 'web',
      duration: '6 months',
      students: '1,200+',
      rating: 4.9,
      price: '$2,999',
      originalPrice: '$3,999',
      level: 'Beginner to Advanced',
      instructor: 'Sarah Johnson',
      image: '/api/placeholder/400/250',
      features: [
        'React & Redux',
        'Node.js & Express',
        'MongoDB & Mongoose',
        'RESTful APIs',
        'Authentication & Security',
        'Deployment & DevOps'
      ],
      modules: 12,
      projects: 8,
      certificate: true
    },
    {
      id: 2,
      title: 'Data Science & Machine Learning',
      description: 'Learn Python, pandas, scikit-learn, and TensorFlow. Analyze data, build predictive models, and create data visualizations.',
      category: 'data',
      duration: '8 months',
      students: '850+',
      rating: 4.8,
      price: '$3,499',
      originalPrice: '$4,499',
      level: 'Intermediate',
      instructor: 'Dr. Michael Chen',
      image: '/api/placeholder/400/250',
      features: [
        'Python & Pandas',
        'Machine Learning',
        'Deep Learning',
        'Data Visualization',
        'Statistics & Probability',
        'Big Data Tools'
      ],
      modules: 16,
      projects: 10,
      certificate: true
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps using React Native and Flutter. Learn app design, state management, and app store deployment.',
      category: 'mobile',
      duration: '5 months',
      students: '650+',
      rating: 4.7,
      price: '$2,799',
      originalPrice: '$3,299',
      level: 'Beginner',
      instructor: 'Alex Rodriguez',
      image: '/api/placeholder/400/250',
      features: [
        'React Native',
        'Flutter & Dart',
        'iOS & Android',
        'App Design',
        'State Management',
        'App Store Deployment'
      ],
      modules: 10,
      projects: 6,
      certificate: true
    },
    {
      id: 4,
      title: 'Cloud Computing & DevOps',
      description: 'Master AWS, Docker, Kubernetes, and CI/CD pipelines. Learn infrastructure as code and cloud security best practices.',
      category: 'cloud',
      duration: '7 months',
      students: '920+',
      rating: 4.9,
      price: '$3,299',
      originalPrice: '$4,199',
      level: 'Intermediate',
      instructor: 'Jennifer Lee',
      image: '/api/placeholder/400/250',
      features: [
        'AWS & Azure',
        'Docker & Kubernetes',
        'CI/CD Pipelines',
        'Infrastructure as Code',
        'Monitoring & Logging',
        'Security & Compliance'
      ],
      modules: 14,
      projects: 7,
      certificate: true
    },
    {
      id: 5,
      title: 'Frontend Development Mastery',
      description: 'Deep dive into modern frontend technologies including React, Vue.js, TypeScript, and advanced CSS techniques.',
      category: 'web',
      duration: '4 months',
      students: '1,100+',
      rating: 4.8,
      price: '$2,499',
      originalPrice: '$2,999',
      level: 'Beginner to Intermediate',
      instructor: 'David Kim',
      image: '/api/placeholder/400/250',
      features: [
        'React & Vue.js',
        'TypeScript',
        'Advanced CSS',
        'Web Performance',
        'Testing & Debugging',
        'Build Tools'
      ],
      modules: 8,
      projects: 5,
      certificate: true
    },
    {
      id: 6,
      title: 'Backend Development with Python',
      description: 'Learn Django, FastAPI, PostgreSQL, and microservices architecture. Build scalable backend systems and APIs.',
      category: 'web',
      duration: '5 months',
      students: '780+',
      rating: 4.7,
      price: '$2,699',
      originalPrice: '$3,299',
      level: 'Intermediate',
      instructor: 'Emily Watson',
      image: '/api/placeholder/400/250',
      features: [
        'Django & FastAPI',
        'PostgreSQL',
        'Microservices',
        'API Design',
        'Authentication',
        'Testing & Deployment'
      ],
      modules: 10,
      projects: 6,
      certificate: true
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of tech courses designed to launch your career
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Course Image */}
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-xl flex items-center justify-center">
                  <div className="text-6xl text-primary-600">
                    {course.category === 'web' && <Code />}
                    {course.category === 'data' && <Database />}
                    {course.category === 'mobile' && <Smartphone />}
                    {course.category === 'cloud' && <Cloud />}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                {course.originalPrice && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Save ${parseInt(course.originalPrice.replace('$', '')) - parseInt(course.price.replace('$', ''))}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Course Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
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
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {course.rating}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {course.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <span>{course.modules} Modules</span>
                    <span>{course.projects} Projects</span>
                    {course.certificate && (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Certificate
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">{course.originalPrice}</span>
                    )}
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>

                {/* Instructor */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-gray-600">
                          {course.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Instructor</p>
                        <p className="text-xs text-gray-500">{course.instructor}</p>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our team of experts can help you choose the right course for your career goals. 
            Get personalized recommendations and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Talk to an Advisor
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors">
              <Download className="mr-2 w-4 h-4" />
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
