import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle, 
  Play, 
  Download, 
  MessageCircle,
  Settings,
  Bell,
  BarChart3,
  FileText,
  Video,
  Code,
  Cloud,
  Shield
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    enrolledProgram: 'Digital Transformation',
    progress: 65,
    startDate: '2024-01-15',
    expectedCompletion: '2024-07-15'
  };

  const stats = [
    { label: 'Courses Completed', value: '8/12', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Hours Studied', value: '156', icon: Clock, color: 'text-blue-600' },
    { label: 'Assignments', value: '24/30', icon: FileText, color: 'text-yellow-600' },
    { label: 'Certificates', value: '3', icon: Award, color: 'text-yellow-600' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'course',
      title: 'Completed: React Fundamentals',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Submitted: E-commerce Project',
      time: '1 day ago',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'certificate',
      title: 'Earned: JavaScript Certificate',
      time: '3 days ago',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'live',
      title: 'Attended: Live Q&A Session',
      time: '1 week ago',
      icon: Video,
      color: 'text-yellow-600'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Live Coding Session',
      date: '2024-12-20',
      time: '10:00 AM',
      type: 'live',
      instructor: 'Dr. Sarah Chen'
    },
    {
      id: 2,
      title: 'Assignment Due: Final Project',
      date: '2024-12-25',
      time: '11:59 PM',
      type: 'assignment',
      instructor: 'Michael Rodriguez'
    },
    {
      id: 3,
      title: 'Mentor Session',
      date: '2024-12-22',
      time: '2:00 PM',
      type: 'mentor',
      instructor: 'Alex Thompson'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'React & Node.js Fundamentals',
      progress: 85,
      status: 'in-progress',
      nextLesson: 'State Management with Redux',
      instructor: 'Dr. Sarah Chen',
      duration: '4 weeks',
      icon: Code,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Database Design & Management',
      progress: 60,
      status: 'in-progress',
      nextLesson: 'Advanced Queries',
      instructor: 'Michael Rodriguez',
      duration: '3 weeks',
      icon: Shield,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Cloud Deployment',
      progress: 100,
      status: 'completed',
      nextLesson: 'Certificate Available',
      instructor: 'Alex Thompson',
      duration: '2 weeks',
      icon: Cloud,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'mentor', label: 'Mentor Sessions', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">{user.enrolledProgram} Program</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Program Progress</h2>
              <span className="text-2xl font-bold text-blue-600">{user.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${user.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Started: {user.startDate}</span>
              <span>Expected: {user.expectedCompletion}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <tab.icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                          <div className={`p-2 rounded-lg bg-white ${activity.color}`}>
                            <activity.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">My Courses</h3>
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${course.color}`}>
                                <course.icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{course.title}</h4>
                                <p className="text-sm text-gray-600">by {course.instructor}</p>
                                <p className="text-sm text-gray-500">{course.duration}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              course.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {course.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              {course.status === 'completed' ? 'View Certificate' : 'Continue'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'assignments' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No assignments available at the moment.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'certificates' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Certificates</h3>
                    <div className="text-center py-12">
                      <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No certificates earned yet.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'mentor' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Mentor Sessions</h3>
                    <div className="text-center py-12">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No mentor sessions scheduled.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                    <p className="text-sm text-gray-500">with {event.instructor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Play className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-900">Continue Learning</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Download Resources</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-gray-900">Contact Mentor</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-900">Account Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
