import React, { useEffect, useState } from 'react';
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
  Play,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Heart,
  MessageCircle,
  Briefcase
} from 'lucide-react';

const Home: React.FC = () => {
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior Software Engineer at Google",
      expertise: "Full Stack Development",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      students: "500+",
      specialties: ["React", "Node.js", "AWS", "Machine Learning"],
      quote: "Passionate about helping students build real-world applications"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Tech Lead at Microsoft",
      expertise: "Cloud Architecture",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      students: "750+",
      specialties: ["Azure", "DevOps", "Kubernetes", "Docker"],
      quote: "Building scalable systems and mentoring the next generation"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Data Scientist at Amazon",
      expertise: "AI & Machine Learning",
      experience: "6+ years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      students: "400+",
      specialties: ["Python", "TensorFlow", "Data Analysis", "Deep Learning"],
      quote: "Making AI accessible and practical for everyone"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Senior DevOps Engineer at Netflix",
      expertise: "Infrastructure & Automation",
      experience: "7+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      students: "600+",
      specialties: ["CI/CD", "Monitoring", "Security", "Scalability"],
      quote: "Automating everything and teaching best practices"
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "Product Manager at Meta",
      expertise: "Product Strategy",
      experience: "9+ years",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      students: "350+",
      specialties: ["Strategy", "User Research", "Analytics", "Leadership"],
      quote: "Building products that users love and teams that thrive"
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Cybersecurity Expert at IBM",
      expertise: "Security & Compliance",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      students: "800+",
      specialties: ["Security", "Compliance", "Risk Management", "Incident Response"],
      quote: "Protecting digital assets and teaching security fundamentals"
    }
  ];

  // Auto-scroll mentors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMentorIndex((prevIndex) => (prevIndex + 1) % mentors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mentors.length]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center fade-in-up">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-6 py-3 mb-8 border border-blue-200 shadow-lg">
              <span className="text-blue-700 font-semibold text-sm">🚀 Launch Your Tech Career</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                TechAcademy
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Master cutting-edge technologies with our comprehensive programs. 
              From beginner to expert, we'll guide you through your tech journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/assessment"
                className="btn-gradient text-lg px-8 py-4 flex items-center space-x-2 group"
              >
                <Zap className="h-5 w-5" />
                <span>Start Assessment</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/apply"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group"
              >
                <Award className="h-5 w-5" />
                <span>Apply Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl mb-4 shadow-lg hover:shadow-xl transition-all duration-300">
                    <stat.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Programs
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of technology programs designed to launch your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="group relative">
                <div className="card-gradient p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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

      {/* Mentors Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meet Our Expert Mentors
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry leaders and experienced professionals who are passionate about your success
            </p>
          </div>

          {/* Featured Mentor */}
          <div className="mb-16">
            <div className="card-gradient p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={mentors[currentMentorIndex].image}
                      alt={mentors[currentMentorIndex].name}
                      className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {mentors[currentMentorIndex].rating} ⭐
                    </div>
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{mentors[currentMentorIndex].name}</h3>
                  <p className="text-xl text-gray-600 mb-2">{mentors[currentMentorIndex].title}</p>
                  <p className="text-lg text-purple-600 font-semibold mb-4">{mentors[currentMentorIndex].expertise}</p>
                  <p className="text-gray-700 text-lg italic mb-6">"{mentors[currentMentorIndex].quote}"</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                    {mentors[currentMentorIndex].specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center md:justify-start gap-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-purple-600" />
                      <span>{mentors[currentMentorIndex].students} students</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-purple-600" />
                      <span>{mentors[currentMentorIndex].experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mentor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mentors.map((mentor, index) => (
              <div
                key={mentor.id}
                className={`card-gradient p-6 transition-all duration-500 ${
                  index === currentMentorIndex
                    ? 'ring-4 ring-purple-300 shadow-2xl scale-105'
                    : 'hover:shadow-xl hover:scale-105'
                }`}
              >
                <div className="text-center">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{mentor.title}</p>
                  <p className="text-purple-600 font-semibold text-sm mb-3">{mentor.expertise}</p>
                  <div className="flex justify-center items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{mentor.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">({mentor.students})</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {mentor.specialties.slice(0, 2).map((specialty, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Become a Mentor CTA */}
          <div className="text-center">
            <div className="card-gradient p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Become a Mentor</h3>
              <p className="text-gray-600 mb-6">
                Share your expertise and help shape the next generation of tech professionals. 
                Join our community of industry leaders and make a lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/mentor-application"
                  className="btn-gradient text-lg px-8 py-4 flex items-center space-x-2 group"
                >
                  <Heart className="h-5 w-5" />
                  <span>Apply as Mentor</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 group"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Learn More</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
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
                to="/signup"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Apply Now
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