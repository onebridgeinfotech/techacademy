import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  Play, 
  ArrowRight, 
  User, 
  Award, 
  TrendingUp,
  CheckCircle,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  DollarSign
} from 'lucide-react';

const Testimonials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Stories', count: 24 },
    { id: 'career-change', name: 'Career Change', count: 8 },
    { id: 'salary-increase', name: 'Salary Increase', count: 12 },
    { id: 'promotion', name: 'Promotion', count: 6 },
    { id: 'entrepreneur', name: 'Entrepreneur', count: 4 }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      program: 'Digital Transformation',
      duration: '6 months',
      graduationDate: '2024-06-15',
      salaryBefore: '$75,000',
      salaryAfter: '$125,000',
      increase: '67%',
      category: 'salary-increase',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      video: 'https://example.com/video1',
      quote: 'TechAcademy completely transformed my career. From a marketing background to becoming a Senior Software Engineer at Google in just 6 months. The hands-on projects and industry mentorship were game-changers.',
      story: 'I was working in marketing for 5 years but always had a passion for technology. TechAcademy\'s Digital Transformation program gave me the skills and confidence to make the switch. The mentors were incredible, and the real-world projects prepared me perfectly for technical interviews.',
      achievements: [
        'Landed Senior Software Engineer role at Google',
        '67% salary increase in 6 months',
        'Led 3 major projects in first year',
        'Mentoring 2 junior developers'
      ],
      skills: ['React', 'Node.js', 'AWS', 'Machine Learning']
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      program: 'Cloud & DevOps',
      duration: '8 months',
      graduationDate: '2024-03-20',
      salaryBefore: '$65,000',
      salaryAfter: '$110,000',
      increase: '69%',
      category: 'career-change',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      video: 'https://example.com/video2',
      quote: 'Coming from a non-tech background, I never thought I could become a DevOps Engineer. TechAcademy made it possible with their comprehensive curriculum and amazing support system.',
      story: 'I was a restaurant manager for 8 years before joining TechAcademy. The Cloud & DevOps program taught me everything from Docker to Kubernetes. The hands-on labs and real-world projects gave me the confidence to apply for tech roles.',
      achievements: [
        'Successfully transitioned from restaurant management to tech',
        '69% salary increase',
        'Certified in AWS and Kubernetes',
        'Leading infrastructure projects at Amazon'
      ],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
    },
    {
      id: 3,
      name: 'Emily Johnson',
      role: 'Product Manager',
      company: 'Microsoft',
      location: 'Redmond, WA',
      program: 'Project Management',
      duration: '5 months',
      graduationDate: '2024-08-10',
      salaryBefore: '$80,000',
      salaryAfter: '$130,000',
      increase: '63%',
      category: 'promotion',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      video: 'https://example.com/video3',
      quote: 'TechAcademy\'s Project Management program helped me transition from a developer to a Product Manager. The business skills and leadership training were exactly what I needed.',
      story: 'I was a software developer for 4 years but wanted to move into product management. TechAcademy\'s program taught me not just technical skills but also business strategy, user research, and team leadership.',
      achievements: [
        'Promoted to Product Manager at Microsoft',
        '63% salary increase',
        'Leading a team of 8 developers',
        'Launched 2 successful products'
      ],
      skills: ['Agile', 'Scrum', 'Product Strategy', 'User Research']
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Founder & CEO',
      company: 'TechStart Solutions',
      location: 'Austin, TX',
      program: 'Full Stack Development',
      duration: '9 months',
      graduationDate: '2024-01-15',
      salaryBefore: '$0',
      salaryAfter: '$180,000',
      increase: 'Entrepreneur',
      category: 'entrepreneur',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      video: 'https://example.com/video4',
      quote: 'TechAcademy gave me the technical skills and business knowledge to start my own company. The entrepreneurship track was invaluable.',
      story: 'I had a business idea but no technical skills to build it. TechAcademy\'s Full Stack Development program taught me everything I needed to build and launch my startup. The mentorship program connected me with successful entrepreneurs.',
      achievements: [
        'Founded successful tech startup',
        'Raised $500K in seed funding',
        'Hired team of 5 developers',
        'Generating $50K monthly revenue'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'Business Strategy']
    },
    {
      id: 5,
      name: 'Lisa Zhang',
      role: 'Cybersecurity Analyst',
      company: 'IBM',
      location: 'New York, NY',
      program: 'Cyber Security',
      duration: '7 months',
      graduationDate: '2024-04-30',
      salaryBefore: '$55,000',
      salaryAfter: '$95,000',
      increase: '73%',
      category: 'career-change',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      video: 'https://example.com/video5',
      quote: 'The cybersecurity program at TechAcademy opened doors I never knew existed. The hands-on labs and real-world scenarios prepared me perfectly for my role at IBM.',
      story: 'I was working in customer service but always interested in cybersecurity. TechAcademy\'s program gave me the technical skills and certifications needed to break into the field. The ethical hacking labs were particularly valuable.',
      achievements: [
        'Successfully transitioned to cybersecurity',
        '73% salary increase',
        'Certified Ethical Hacker (CEH)',
        'Leading security audits at IBM'
      ],
      skills: ['Ethical Hacking', 'Network Security', 'Risk Assessment', 'Incident Response']
    },
    {
      id: 6,
      name: 'Alex Thompson',
      role: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      program: 'Generative AI & AI',
      duration: '9 months',
      graduationDate: '2024-07-22',
      salaryBefore: '$70,000',
      salaryAfter: '$140,000',
      increase: '100%',
      category: 'salary-increase',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      video: 'https://example.com/video6',
      quote: 'TechAcademy\'s AI program is cutting-edge. The focus on generative AI and real-world applications gave me a huge advantage in the job market.',
      story: 'I was a data analyst but wanted to specialize in AI. TechAcademy\'s program covered everything from machine learning fundamentals to advanced generative AI. The projects were industry-relevant and helped me build a strong portfolio.',
      achievements: [
        'Doubled my salary in 9 months',
        'Landed Data Scientist role at Netflix',
        'Published 2 research papers',
        'Leading AI initiatives for content recommendation'
      ],
      skills: ['Python', 'TensorFlow', 'Generative AI', 'Deep Learning']
    }
  ];

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === selectedCategory);

  const stats = [
    { label: 'Average Salary Increase', value: '73%', icon: TrendingUp },
    { label: 'Job Placement Rate', value: '94%', icon: CheckCircle },
    { label: 'Graduates Hired', value: '2,400+', icon: Briefcase },
    { label: 'Average Time to Job', value: '3.2 months', icon: Calendar }
  ];

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
              <span className="text-white font-semibold text-sm">⭐ Success Stories</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Student</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Real stories from real students who transformed their careers with TechAcademy. 
              See how our programs helped them achieve their dreams.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Content */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 hover:shadow-md'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-2xl font-bold text-green-600">{testimonial.increase}</div>
                      <div className="text-sm text-gray-500">increase</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-blue-600 mb-4" />
                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Program Info */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Program:</span>
                        <p className="font-semibold text-gray-900">{testimonial.program}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-semibold text-gray-900">{testimonial.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Graduated:</span>
                        <p className="font-semibold text-gray-900">{testimonial.graduationDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Salary:</span>
                        <p className="font-semibold text-gray-900">
                          {testimonial.salaryBefore} → {testimonial.salaryAfter}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                    <div className="space-y-2">
                      {testimonial.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Skills Gained:</h4>
                    <div className="flex flex-wrap gap-2">
                      {testimonial.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Video Button */}
                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      <Play className="h-5 w-5" />
                      <span>Watch Video</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <span>Read Full Story</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Write Your Success Story?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who have transformed their careers with TechAcademy. 
                  Start your journey today and become our next success story.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    Start Your Journey
                  </button>
                  <button className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    View Programs
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

export default Testimonials;
