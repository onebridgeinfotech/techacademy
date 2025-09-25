import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  Search,
  TrendingUp,
  BookOpen,
  Code,
  Cloud,
  Shield,
  Zap,
  Target,
  Clock,
  Eye
} from 'lucide-react';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'tech-trends', name: 'Tech Trends', icon: TrendingUp },
    { id: 'programming', name: 'Programming', icon: Code },
    { id: 'cloud', name: 'Cloud & DevOps', icon: Cloud },
    { id: 'security', name: 'Cybersecurity', icon: Shield },
    { id: 'ai', name: 'AI & ML', icon: Zap },
    { id: 'career', name: 'Career Tips', icon: Target }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Software Development: What Every Developer Should Know",
      excerpt: "Explore how artificial intelligence is revolutionizing software development, from automated code generation to intelligent debugging tools that are changing the industry landscape.",
      content: "Artificial intelligence is transforming software development at an unprecedented pace. From GitHub Copilot to advanced debugging tools, AI is becoming an integral part of the development process...",
      author: "Dr. Sarah Chen",
      authorRole: "AI Research Director",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      publishDate: "2024-12-15",
      readTime: "8 min read",
      category: "ai",
      tags: ["AI", "Machine Learning", "Software Development", "Future Tech"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      views: 2847,
      likes: 156,
      featured: true
    },
    {
      id: 2,
      title: "Mastering Cloud Architecture: A Complete Guide for 2024",
      excerpt: "Learn the essential principles of cloud architecture design, from microservices to serverless computing, and how to build scalable, resilient applications.",
      content: "Cloud architecture has evolved significantly in recent years. Understanding the fundamental principles of designing scalable, resilient systems is crucial for modern developers...",
      author: "Michael Rodriguez",
      authorRole: "Senior Cloud Architect",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      publishDate: "2024-12-12",
      readTime: "12 min read",
      category: "cloud",
      tags: ["Cloud Computing", "AWS", "Architecture", "DevOps"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      views: 1923,
      likes: 89,
      featured: true
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices: Protecting Your Applications in 2024",
      excerpt: "Essential cybersecurity practices every developer should implement to protect applications from modern threats and vulnerabilities.",
      content: "Cybersecurity is no longer an afterthought in software development. With the increasing sophistication of cyber threats, developers must integrate security practices from the ground up...",
      author: "Alex Thompson",
      authorRole: "Cybersecurity Expert",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      publishDate: "2024-12-10",
      readTime: "10 min read",
      category: "security",
      tags: ["Cybersecurity", "Best Practices", "Application Security", "Threats"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
      views: 1456,
      likes: 67,
      featured: false
    },
    {
      id: 4,
      title: "React 18 vs Vue 3: Which Framework Should You Choose in 2024?",
      excerpt: "A comprehensive comparison of React 18 and Vue 3, analyzing performance, developer experience, and ecosystem to help you make the right choice.",
      content: "The frontend framework landscape continues to evolve rapidly. React 18 and Vue 3 represent the latest in modern JavaScript frameworks, each with unique strengths...",
      author: "Emma Wilson",
      authorRole: "Frontend Developer",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      publishDate: "2024-12-08",
      readTime: "15 min read",
      category: "programming",
      tags: ["React", "Vue.js", "JavaScript", "Frontend"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      views: 3201,
      likes: 134,
      featured: false
    },
    {
      id: 5,
      title: "From Bootcamp to Tech Lead: A Career Journey Guide",
      excerpt: "Learn how to navigate your career from coding bootcamp graduate to technical leadership role, with practical advice and real-world insights.",
      content: "Transitioning from a coding bootcamp to a technical leadership role requires strategic planning, continuous learning, and developing both technical and soft skills...",
      author: "David Park",
      authorRole: "Engineering Manager",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      publishDate: "2024-12-05",
      readTime: "18 min read",
      category: "career",
      tags: ["Career Development", "Leadership", "Tech Leadership", "Career Growth"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      views: 4567,
      likes: 203,
      featured: true
    },
    {
      id: 6,
      title: "The Rise of Edge Computing: What Developers Need to Know",
      excerpt: "Understanding edge computing trends and how they're reshaping application development and deployment strategies.",
      content: "Edge computing is revolutionizing how we think about application architecture. By bringing computation closer to data sources, we're seeing new possibilities for real-time applications...",
      author: "Lisa Zhang",
      authorRole: "Edge Computing Specialist",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      publishDate: "2024-12-03",
      readTime: "11 min read",
      category: "tech-trends",
      tags: ["Edge Computing", "IoT", "Real-time", "Infrastructure"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      views: 1789,
      likes: 92,
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30 shadow-lg">
              <span className="text-white font-semibold text-sm">📰 TechAcademy Blog</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Latest</span>{' '}
              <span className="text-yellow-500">
                Insights
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Stay updated with the latest trends in technology, programming, and career development. 
              Expert insights from industry leaders and successful graduates.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-yellow-600 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 hover:shadow-md'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/50 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views.toLocaleString()}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                              <p className="text-gray-500 text-xs">{post.authorRole}</p>
                            </div>
                          </div>
                          <Link
                            to={`/blog/${post.id}`}
                            className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group"
                          >
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-yellow-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/50 hover:bg-white/90 transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">{post.author}</p>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                      >
                        Read
                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-yellow-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Get the latest tech insights, career tips, and industry trends delivered to your inbox. 
                  Join 10,000+ developers who trust TechAcademy for their learning journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-yellow-600 hover:from-blue-700 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
