import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: '❓',
      questions: [
        {
          id: 1,
          question: 'What is TechAcademy?',
          answer: 'TechAcademy is a premier technology education platform that offers comprehensive programs in software development, cloud computing, cybersecurity, and more. We provide hands-on training with industry experts to help you launch your tech career.'
        },
        {
          id: 2,
          question: 'How is TechAcademy different from other online courses?',
          answer: 'Unlike traditional online courses, TechAcademy offers: 1:1 mentorship with industry professionals, hands-on project experience, career placement support, and industry-aligned curriculum designed with input from top tech companies like Google, Microsoft, and Amazon.'
        },
        {
          id: 3,
          question: 'Do I need prior programming experience?',
          answer: 'No prior experience required! Our programs are designed for beginners to advanced learners. We provide comprehensive learning paths that start from the basics and progress to advanced topics.'
        }
      ]
    },
    {
      id: 'programs',
      title: 'Programs & Courses',
      icon: '📚',
      questions: [
        {
          id: 4,
          question: 'What programs do you offer?',
          answer: 'We offer 6 comprehensive programs: Digital Transformation, Cloud & DevOps, Cyber Security, Project Management, Generative AI & AI, and Full Stack Development. Each program is 5-9 months long with hands-on projects.'
        },
        {
          id: 5,
          question: 'How long are the programs?',
          answer: 'Program durations vary: Digital Transformation (6 months), Cloud & DevOps (7 months), Cyber Security (8 months), Project Management (5 months), Generative AI & AI (9 months), and Full Stack Development (8 months).'
        },
        {
          id: 6,
          question: 'Can I switch between programs?',
          answer: 'Yes, you can switch programs within the first 2 weeks of enrollment. Our academic advisors will help you find the best program match for your career goals.'
        }
      ]
    },
    {
      id: 'admissions',
      title: 'Admissions & Enrollment',
      icon: '🎓',
      questions: [
        {
          id: 7,
          question: 'How do I apply?',
          answer: 'The application process is simple: 1) Complete our online assessment, 2) Submit your profile and resume, 3) Schedule an interview with our admissions team, 4) Receive your acceptance letter. The entire process takes 3-5 business days.'
        },
        {
          id: 8,
          question: 'What are the admission requirements?',
          answer: 'Requirements include: High school diploma or equivalent, basic computer skills, commitment to the program duration, and completion of our assessment. No prior programming experience is required.'
        },
        {
          id: 9,
          question: 'Is there an application fee?',
          answer: 'No application fee required! We believe in making quality education accessible. The assessment and application process is completely free.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Support & Resources',
      icon: '🛠️',
      questions: [
        {
          id: 10,
          question: 'What support do you provide?',
          answer: 'We provide comprehensive support including: 1:1 mentorship sessions, 24/7 technical support, career guidance, job placement assistance, and access to our alumni network of 10,000+ graduates.'
        },
        {
          id: 11,
          question: 'How do I contact support?',
          answer: 'You can reach our support team via: Live chat on our website, email at support@techacademy.com, phone at +1 (555) 123-4567, or through your student portal. We typically respond within 2 hours during business hours.'
        },
        {
          id: 12,
          question: 'Do you offer career services?',
          answer: 'Yes! Our career services include: Resume building workshops, interview preparation, job placement assistance, networking events, and connections with 500+ hiring partners including Google, Microsoft, Amazon, and more.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical & Platform',
      icon: '💻',
      questions: [
        {
          id: 13,
          question: 'What technical requirements do I need?',
          answer: 'You need: A computer with 8GB RAM minimum, stable internet connection (10 Mbps recommended), modern web browser (Chrome, Firefox, Safari), and a webcam for live sessions. We provide cloud-based development environments.'
        },
        {
          id: 14,
          question: 'Can I access materials offline?',
          answer: 'Yes! All course materials, videos, and resources are available for download. You can study offline and sync your progress when you\'re back online.'
        },
        {
          id: 15,
          question: 'What if I miss a live session?',
          answer: 'All live sessions are recorded and available for replay within 24 hours. You can watch them at your convenience and ask questions in our discussion forums.'
        }
      ]
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <span className="text-white font-semibold text-sm">❓ FAQ</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Frequently Asked</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Find answers to common questions about our programs, admissions, and support. 
              Can't find what you're looking for? Contact our support team.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.id} className="mb-16">
              <div className="flex items-center mb-8">
                <span className="text-4xl mr-4">{category.icon}</span>
                <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item) => (
                  <div key={item.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/90 transition-all duration-500 hover:shadow-xl">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        )}
                      </button>
                      
                      {openItems.includes(item.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Support CTA */}
          <div className="text-center mt-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our support team is here to help! Get in touch with us and we'll respond within 2 hours during business hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/assessment"
                    className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Start Assessment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
