import React, { useState } from 'react';
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
  Calendar,
  MapPin,
  DollarSign,
  Briefcase
} from 'lucide-react';

const Internships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Programs', icon: Briefcase },
    { id: 'web', name: 'Web Development', icon: Code },
    { id: 'data', name: 'Data Science', icon: Database },
    { id: 'mobile', name: 'Mobile Development', icon: Smartphone },
    { id: 'cloud', name: 'Cloud & DevOps', icon: Cloud }
  ];

  const internships = [
    {
      id: 1,
      title: 'Full-Stack Development Internship',
      company: 'TechCorp Solutions',
      description: 'Work on real-world web applications using React, Node.js, and modern development practices. Gain hands-on experience in agile development methodologies.',
      category: 'web',
      duration: '3 months',
      stipend: '$2,000/month',
      location: 'San Francisco, CA',
      type: 'Remote',
      startDate: '2024-02-01',
      requirements: ['Basic React knowledge', 'JavaScript proficiency', 'Git experience'],
      benefits: ['Mentorship program', 'Certificate of completion', 'Job placement assistance'],
      icon: Code,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Data Science Research Internship',
      company: 'DataInsights Inc.',
      description: 'Analyze large datasets, build machine learning models, and create data visualizations. Work with industry experts on cutting-edge AI projects.',
      category: 'data',
      duration: '4 months',
      stipend: '$2,500/month',
      location: 'New York, NY',
      type: 'Hybrid',
      startDate: '2024-03-01',
      requirements: ['Python programming', 'Statistics knowledge', 'SQL basics'],
      benefits: ['Research publication opportunity', 'Conference attendance', 'Industry networking'],
      icon: Database,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Mobile App Development Internship',
      company: 'AppVenture Studios',
      description: 'Develop iOS and Android applications using React Native and Flutter. Learn app design, testing, and deployment to app stores.',
      category: 'mobile',
      duration: '3 months',
      stipend: '$1,800/month',
      location: 'Austin, TX',
      type: 'On-site',
      startDate: '2024-02-15',
      requirements: ['JavaScript knowledge', 'Mobile development interest', 'UI/UX basics'],
      benefits: ['App store publishing', 'Portfolio development', 'Startup experience'],
      icon: Smartphone,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 4,
      title: 'Cloud Infrastructure Internship',
      company: 'CloudScale Technologies',
      description: 'Work with AWS, Docker, and Kubernetes to build scalable cloud infrastructure. Learn DevOps practices and automation tools.',
      category: 'cloud',
      duration: '4 months',
      stipend: '$2,200/month',
      location: 'Seattle, WA',
      type: 'Remote',
      startDate: '2024-03-15',
      requirements: ['Linux basics', 'Networking knowledge', 'Scripting experience'],
      benefits: ['AWS certification', 'DevOps training', 'Production experience'],
      icon: Cloud,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Frontend Development Internship',
      company: 'DesignTech Agency',
      description: 'Create beautiful, responsive web interfaces using React, TypeScript, and modern CSS. Work with design teams on client projects.',
      category: 'web',
      duration: '3 months',
      stipend: '$1,900/month',
      location: 'Los Angeles, CA',
      type: 'Hybrid',
      startDate: '2024-02-01',
      requirements: ['HTML/CSS proficiency', 'JavaScript basics', 'Design sense'],
      benefits: ['Client project experience', 'Design collaboration', 'Portfolio building'],
      icon: Code,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 6,
      title: 'Backend Development Internship',
      company: 'ServerLogic Corp',
      description: 'Build robust backend systems using Python, Django, and PostgreSQL. Learn API development, database design, and system architecture.',
      category: 'web',
      duration: '4 months',
      stipend: '$2,100/month',
      location: 'Chicago, IL',
      type: 'On-site',
      startDate: '2024-03-01',
      requirements: ['Python programming', 'Database concepts', 'API understanding'],
      benefits: ['System architecture', 'Database optimization', 'Scalability training'],
      icon: Database,
      color: 'from-green-500 to-green-600'
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || internship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Internship Programs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gain real-world experience with our industry partners. Apply for internships that will kickstart your tech career.
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
                  placeholder="Search internships..."
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

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredInternships.map((internship) => {
            const Icon = internship.icon;
            return (
              <div key={internship.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Header */}
                <div className={`h-2 bg-gradient-to-r ${internship.color} rounded-t-xl`}></div>
                <div className="p-6">
                  {/* Company & Title */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-600">{internship.company}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        internship.type === 'Remote' ? 'bg-green-100 text-green-800' :
                        internship.type === 'Hybrid' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {internship.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {internship.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {internship.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Starts {new Date(internship.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <div className="space-y-1">
                      {internship.requirements.map((req, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <div className="space-y-1">
                      {internship.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                    Apply Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Want to Host an Internship?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Partner with us to provide valuable internship opportunities to our students. 
            Help shape the next generation of tech professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Become a Partner
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors">
              <Play className="mr-2 w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internships;

