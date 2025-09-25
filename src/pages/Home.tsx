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
  Globe,
  Zap,
  Target,
  Shield,
  Rocket,
  GraduationCap,
  Heart,
  MessageCircle,
  Briefcase,
  Send
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
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      features: ['Agile & Scrum', 'Project Tools', 'Team Leadership', 'Risk Management'],
      badge: 'Leadership'
    },
    {
      id: 5,
      title: 'Generative AI & AI',
      description: 'Master cutting-edge AI technologies including ChatGPT, GPT-4, and generative AI models for real-world applications',
      duration: '9 months',
      students: '850+',
      rating: 4.9,
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600',
      features: ['Generative AI', 'ChatGPT Integration', 'AI Model Training', 'Real AI Projects'],
      badge: 'AI Future'
    },
    {
      id: 6,
      title: 'Full Stack Development',
      description: 'Master both frontend and backend development with modern frameworks and technologies',
      duration: '8 months',
      students: '1,100+',
      rating: 4.8,
      icon: Code,
      color: 'from-orange-500 to-orange-600',
      features: ['React & Node.js', 'Database Design', 'API Development', 'Cloud Deployment'],
      badge: 'Most Popular'
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark Blue Background */}
      <section id="hero" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              Bridge the Gap Between
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-8 leading-tight">
              Academics & Industry
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your career through project-led training, real-world internships, and industry mentorship that guarantees job readiness.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/signup"
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center group"
              >
                <span>Join Next Cohort</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center group"
              >
                <span>Apply Now</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white text-lg">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">✨</span>
                <span>Internship-to-Job Pathway</span>
              </div>
              <div className="hidden sm:block text-blue-300">•</div>
              <div className="flex items-center">
                <Code className="w-5 h-5 text-blue-400 mr-2" />
                <span>Live Projects</span>
              </div>
              <div className="hidden sm:block text-blue-300">•</div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-400 mr-2" />
                <span>Industry Mentors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Mission & Target Audience Section - Modern Design */}
      <section id="about" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Advanced Background Graphics */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Enhanced Mission Content */}
            <div className="space-y-10">
              {/* Main heading with better typography */}
              <div className="space-y-6">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 mb-6">
                  <span className="text-yellow-400 font-semibold text-sm">🚀 Transforming Education</span>
                </div>

                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="text-white">Revolutionizing</span>{' '}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Technical Education
                  </span>
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  At Tech Academy Pvt Ltd, we're on a mission to transform how technical education works.
                  We bridge the critical gap between traditional academics and real industry demands.
                </p>
              </div>

              {/* Enhanced mission card */}
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We believe that the best way to learn technology is by doing. Our academy focuses on
                  project-led training that mirrors real workplace scenarios, ensuring our graduates
                  are not just educated, but truly job-ready.
                </p>

                {/* Mission highlights */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 text-sm">Project-Based Learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 text-sm">Industry Mentorship</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 text-sm">Hands-on Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 text-sm">Job-Ready Skills</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Target Audience Cards */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-bold text-white mb-4">
                  Who We Serve
                </h3>
                <p className="text-gray-400 text-lg">
                  Tailored programs for every stage of your career journey
                </p>
              </div>

              <div className="space-y-6">
                {/* Fresh Graduates - Enhanced Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-2xl font-bold text-white mb-3">Fresh Graduates</h4>
                        <p className="text-gray-300 text-lg mb-4">Transform theoretical knowledge into practical skills</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">Theory to Practice</span>
                          <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">Real Projects</span>
                          <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">Industry Exposure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working Professionals - Enhanced Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-2xl font-bold text-white mb-3">Working Professionals</h4>
                        <p className="text-gray-300 text-lg mb-4">Upskill with cutting-edge technologies and methodologies</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium">Advanced Skills</span>
                          <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium">Career Growth</span>
                          <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium">Leadership</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Switchers - Enhanced Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Rocket className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-2xl font-bold text-white mb-3">Career Switchers</h4>
                        <p className="text-gray-300 text-lg mb-4">Transition smoothly into tech with comprehensive support</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium">Complete Support</span>
                          <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium">Smooth Transition</span>
                          <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium">Mentorship</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-6 py-3 mb-8 border border-blue-200 shadow-lg">
              <span className="text-blue-700 font-semibold text-sm">✨ What Makes Us Unique</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Why Choose TechAcademy?
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the unique advantages that set us apart in the world of technical education
            </p>
          </div>

          {/* Unique Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Feature 1 - Industry Partnerships */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Industry Partnerships</h3>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  Direct collaboration with 500+ leading tech companies including Google, Microsoft, Amazon, and Meta for real-world project exposure.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Live Projects</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Industry Mentors</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Job Placements</span>
                </div>
              </div>
            </div>

            {/* Feature 2 - Project-Based Learning */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Project-Based Learning</h3>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  Build 15+ real-world projects during your program, from concept to deployment, mirroring actual industry workflows and standards.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Real Projects</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Portfolio Building</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">GitHub Ready</span>
                </div>
              </div>
            </div>

            {/* Feature 3 - Personalized Mentorship */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">1:1 Mentorship</h3>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  Get personalized guidance from industry experts with 1:1 mentorship sessions, career coaching, and continuous support throughout your journey.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Personal Coach</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Career Guidance</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Feature 4 - Job Guarantee */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Job Guarantee</h3>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  We're so confident in our program that we offer a 100% job placement guarantee within 6 months of graduation, or your money back.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">100% Placement</span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">Money Back</span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">6 Months</span>
                </div>
              </div>
            </div>

            {/* Feature 5 - Cutting-Edge Curriculum */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Latest Technologies</h3>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  Learn the most in-demand technologies including AI/ML, Cloud Computing, DevOps, and modern frameworks that employers are actively seeking.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">AI/ML</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">Cloud</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">DevOps</span>
                </div>
              </div>
            </div>

            {/* Feature 6 - Flexible Learning */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Flexible Schedule</h3>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  Study at your own pace with flexible schedules, recorded sessions, and 24/7 access to learning materials that fit your lifestyle.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">Self-Paced</span>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">24/7 Access</span>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">Recorded Sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact in Numbers Section */}
      <section id="placements" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30 shadow-lg">
              <span className="text-white font-semibold text-sm">📊 Our Impact</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-white">Our Impact in</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Numbers
              </span>
            </h2>

            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              See the measurable impact we've made in transforming careers and building the next generation of tech professionals
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div className="text-xl text-white font-semibold">Students Trained</div>
              <div className="text-blue-200 text-sm mt-2">Across all programs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-xl text-white font-semibold">Job Placement Rate</div>
              <div className="text-blue-200 text-sm mt-2">Within 6 months</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-xl text-white font-semibold">Industry Partners</div>
              <div className="text-blue-200 text-sm mt-2">Including FAANG</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-xl text-white font-semibold">Expert Mentors</div>
              <div className="text-blue-200 text-sm mt-2">From top companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section - Auto-Scroll */}
      <section id="programs" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-6 py-3 mb-8 border border-blue-200 shadow-lg">
              <span className="text-blue-700 font-semibold text-sm">💼 Our Programs</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Launch Your Career
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our comprehensive range of technology programs designed to launch your career
            </p>
          </div>

          {/* Auto-Scrolling Programs */}
          <div className="relative overflow-hidden">
            <div className="flex space-x-6 auto-scroll">
              {/* Duplicate programs for seamless scrolling */}
              {[...programs, ...programs, ...programs].map((program, index) => (
                <div key={`${program.id}-${index}`} className="group relative flex-shrink-0 w-80 pt-4">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>

                  {/* Main Card - Fixed Height */}
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                    {/* Badge */}
                    {program.badge && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20 whitespace-nowrap">
                        {program.badge}
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>

                    {/* Description - Fixed Height */}
                    <p className="text-gray-700 text-base mb-6 leading-relaxed flex-grow min-h-[4.5rem]">{program.description}</p>

                    {/* Features - Fixed Height */}
                    <div className="space-y-3 mb-6 min-h-[8rem]">
                      {program.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rating and Students */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="ml-2 text-gray-900 font-bold text-lg">{program.rating}</span>
                      </div>
                      <div className="text-gray-600 text-sm font-medium">{program.students} students</div>
                    </div>

                    {/* Duration Only */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="text-gray-600 text-sm font-medium">Duration</div>
                        <div className="text-gray-900 font-bold text-lg">{program.duration}</div>
                      </div>
                    </div>

                    {/* Enroll Button - Fixed at Bottom */}
                    <div className="mt-auto">
                      <Link
                        to="/signup"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Mentors Section */}
      <section id="mentors" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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

        </div>
      </section>

      {/* Combined CTA Section - Ready to Transform & Become a Mentor */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30 shadow-lg">
              <span className="text-blue-600 font-semibold text-sm">🚀 Take Action</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Ready to Make Your Move?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking to transform your career or share your expertise as a mentor, 
              we have the perfect path for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ready to Transform Your Career */}
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-white/50 h-full flex flex-col">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Ready to Transform Your Career?
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Join thousands of successful graduates who have launched their tech careers with TechAcademy
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Link
                      to="/signup"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                    >
                      <Zap className="inline-block mr-2 h-5 w-5" />
                      Apply Now
                      <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/assessment"
                      className="block w-full bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300"
                    >
                      Take Assessment
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Become a Mentor */}
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-white/50 h-full flex flex-col">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-6">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Become a Mentor
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Share your expertise and help shape the next generation of tech professionals. 
                      Join our community of industry leaders and make a lasting impact.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Link
                      to="/mentor-application"
                      className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                    >
                      <Heart className="inline-block mr-2 h-5 w-5" />
                      Apply as Mentor
                      <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="block w-full bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50 py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3 mb-8 border border-white/20 shadow-lg">
              <span className="text-blue-600 font-semibold text-sm"> Student Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hear From Our Graduates
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how TechAcademy has transformed careers and lives through cutting-edge education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Alice Johnson',
                role: 'Software Engineer',
                company: 'Tech Solutions Inc.',
                quote: 'TechAcademy transformed my career. The hands-on projects and expert mentors were invaluable. I landed my dream job with a significant salary increase!',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                rating: 5,
                salaryIncrease: '40%'
              },
              {
                name: 'Bob Williams',
                role: 'Cloud Architect',
                company: 'Global Innovations',
                quote: 'The Cloud & DevOps program is top-notch. I gained advanced skills that led to a promotion and a substantial raise.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                rating: 5,
                salaryIncrease: '30%'
              },
              {
                name: 'Carol Davis',
                role: 'Cybersecurity Analyst',
                company: 'SecureNet Corp.',
                quote: 'I highly recommend TechAcademy for anyone serious about cybersecurity. The practical labs prepared me for real-world challenges.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                rating: 4,
                salaryIncrease: 'Entry Level'
              }
            ].map((testimonial, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-4 border-blue-500 shadow-md mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-blue-600 font-medium">{testimonial.role}</p>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">+{testimonial.salaryIncrease} salary increase</span>
                </div>
                
                <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3 mb-8 border border-white/20 shadow-lg">
              <span className="text-white font-semibold text-sm"> Get In Touch</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Ready to Start Your Journey?
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about our programs? Want to learn more about our assessment process? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-blue-200">info@techacademy.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-blue-200">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-blue-200">123 Tech Street, Silicon Valley, CA 94000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <Link
                    to="/signup"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Your Application
                  </Link>
                  <Link
                    to="/assessment"
                    className="block w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300"
                  >
                    Take Assessment
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                />
                
                <select className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300">
                  <option value="">Select Program Interest</option>
                  <option value="fullstack">Full Stack Development</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="data">Data Science</option>
                  <option value="ai">AI & Generative</option>
                  <option value="cybersecurity">Cybersecurity</option>
                </select>
                
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 resize-none"
                ></textarea>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;