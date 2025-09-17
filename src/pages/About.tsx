import React from 'react';
import { 
  Users, 
  Award, 
  Globe, 
  Target, 
  Heart, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Play,
  Quote,
  Star
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay at the forefront of technology, constantly updating our curriculum to reflect the latest industry trends and best practices.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive learning environment where students can collaborate, network, and grow together.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in education, ensuring every student receives world-class training and support.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our instructors are passionate about technology and teaching, bringing real-world experience to every lesson.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/api/placeholder/300/300',
      bio: 'Former Google engineer with 10+ years in tech education. Passionate about democratizing access to quality tech education.',
      linkedin: '#'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Data Science',
      image: '/api/placeholder/300/300',
      bio: 'PhD in Computer Science from Stanford. Former data scientist at Netflix and Uber. Expert in machine learning and AI.',
      linkedin: '#'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Lead Mobile Developer',
      image: '/api/placeholder/300/300',
      bio: 'iOS and Android expert with 8+ years experience. Former senior developer at Airbnb. Specializes in cross-platform development.',
      linkedin: '#'
    },
    {
      name: 'Jennifer Lee',
      role: 'DevOps & Cloud Architect',
      image: '/api/placeholder/300/300',
      bio: 'AWS Solutions Architect with 12+ years experience. Former infrastructure lead at Spotify. Expert in scalable systems.',
      linkedin: '#'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Trained', icon: Users },
    { number: '95%', label: 'Job Placement Rate', icon: Award },
    { number: '50+', label: 'Industry Partners', icon: Globe },
    { number: '4.9/5', label: 'Student Satisfaction', icon: Target }
  ];

  const testimonials = [
    {
      name: 'Emily Watson',
      role: 'Software Engineer at Google',
      image: '/api/placeholder/100/100',
      quote: 'TechAcademy transformed my career. The hands-on approach and industry-relevant curriculum helped me land my dream job at Google within 6 months of graduation.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'Data Scientist at Netflix',
      image: '/api/placeholder/100/100',
      quote: 'The instructors are world-class and the projects are challenging. I went from having no tech background to becoming a data scientist at a top tech company.',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      role: 'Full-Stack Developer at Airbnb',
      image: '/api/placeholder/100/100',
      quote: 'The community at TechAcademy is incredible. The support from instructors and fellow students made all the difference in my learning journey.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About TechAcademy
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to democratize tech education and help people from all backgrounds 
              launch successful careers in technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At TechAcademy, we believe that everyone deserves access to world-class tech education. 
                Our mission is to bridge the gap between traditional education and the rapidly evolving 
                tech industry by providing practical, hands-on training that prepares students for real-world challenges.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're committed to creating an inclusive learning environment where students from all 
                backgrounds can thrive and build successful careers in technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Our Story
                </button>
                <button className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
                  Download Brochure
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Our Vision</h3>
                      <p className="text-gray-600">To be the world's leading tech education platform</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Our Values</h3>
                      <p className="text-gray-600">Excellence, Innovation, and Community</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Our Impact</h3>
                      <p className="text-gray-600">10,000+ successful career transitions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
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

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do at TechAcademy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry experts and passionate educators dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <span className="text-sm font-medium">Connect on LinkedIn</span>
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our successful graduates who have transformed their careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary-600 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-gray-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start your journey to a successful tech career today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Explore Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

