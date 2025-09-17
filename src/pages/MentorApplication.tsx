import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Upload, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Award,
  Clock,
  Star,
  Code,
  Database,
  Smartphone,
  Cloud,
  Shield,
  FolderOpen,
  Lightbulb,
  Users,
  Target,
  Heart
} from 'lucide-react';

const MentorApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    professionalInfo: {
      currentPosition: '',
      company: '',
      yearsExperience: '',
      industry: '',
      specializations: [] as string[],
      previousMentoring: false,
      mentoringExperience: ''
    },
    education: {
      degree: '',
      field: '',
      university: '',
      graduationYear: '',
      certifications: [] as string[]
    },
    availability: {
      hoursPerWeek: '',
      preferredTime: '',
      timezone: '',
      duration: '',
      startDate: ''
    },
    motivation: {
      whyMentor: '',
      teachingStyle: '',
      studentGoals: '',
      additionalInfo: ''
    },
    resume: null as File | null,
    coverLetter: null as File | null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const specializations = [
    { id: 'web-development', name: 'Web Development', icon: Code },
    { id: 'data-science', name: 'Data Science', icon: Database },
    { id: 'mobile-development', name: 'Mobile Development', icon: Smartphone },
    { id: 'cloud-devops', name: 'Cloud & DevOps', icon: Cloud },
    { id: 'cybersecurity', name: 'Cyber Security', icon: Shield },
    { id: 'project-management', name: 'Project Management', icon: FolderOpen },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: Target },
    { id: 'ui-ux', name: 'UI/UX Design', icon: Lightbulb }
  ];

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education', 
    'Gaming', 'Media', 'Consulting', 'Startup', 'Enterprise', 'Other'
  ];

  const timezones = [
    'PST (Pacific)', 'MST (Mountain)', 'CST (Central)', 'EST (Eastern)',
    'GMT (London)', 'CET (Central Europe)', 'IST (India)', 'JST (Japan)',
    'AEST (Australia)', 'Other'
  ];

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Professional Background', icon: Briefcase },
    { number: 3, title: 'Education & Certifications', icon: GraduationCap },
    { number: 4, title: 'Availability & Schedule', icon: Clock },
    { number: 5, title: 'Motivation & Goals', icon: Heart },
    { number: 6, title: 'Documents Upload', icon: Upload }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const handleSpecializationToggle = (specializationId: string) => {
    setFormData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        specializations: prev.professionalInfo.specializations.includes(specializationId)
          ? prev.professionalInfo.specializations.filter(id => id !== specializationId)
          : [...prev.professionalInfo.specializations, specializationId]
      }
    }));
  };

  const handleFileUpload = (field: 'resume' | 'coverLetter', file: File) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Website/Portfolio</label>
                <input
                  type="url"
                  value={formData.personalInfo.website}
                  onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Position *</label>
                <input
                  type="text"
                  required
                  value={formData.professionalInfo.currentPosition}
                  onChange={(e) => handleInputChange('professionalInfo', 'currentPosition', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <input
                  type="text"
                  required
                  value={formData.professionalInfo.company}
                  onChange={(e) => handleInputChange('professionalInfo', 'company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <select
                  required
                  value={formData.professionalInfo.yearsExperience}
                  onChange={(e) => handleInputChange('professionalInfo', 'yearsExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select experience level</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="15+">15+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                <select
                  required
                  value={formData.professionalInfo.industry}
                  onChange={(e) => handleInputChange('professionalInfo', 'industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Specializations * (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specializations.map(spec => {
                  const Icon = spec.icon;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => handleSpecializationToggle(spec.id)}
                      className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
                        formData.professionalInfo.specializations.includes(spec.id)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{spec.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Previous Mentoring Experience</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="previousMentoring"
                    checked={formData.professionalInfo.previousMentoring === true}
                    onChange={() => handleInputChange('professionalInfo', 'previousMentoring', true)}
                    className="mr-3"
                  />
                  Yes, I have mentoring experience
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="previousMentoring"
                    checked={formData.professionalInfo.previousMentoring === false}
                    onChange={() => handleInputChange('professionalInfo', 'previousMentoring', false)}
                    className="mr-3"
                  />
                  No, but I'm eager to start
                </label>
              </div>
            </div>

            {formData.professionalInfo.previousMentoring && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe your mentoring experience</label>
                <textarea
                  value={formData.professionalInfo.mentoringExperience}
                  onChange={(e) => handleInputChange('professionalInfo', 'mentoringExperience', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us about your previous mentoring experience..."
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Education & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Degree *</label>
                <select
                  required
                  value={formData.education.degree}
                  onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select degree</option>
                  <option value="high-school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
                <input
                  type="text"
                  required
                  value={formData.education.field}
                  onChange={(e) => handleInputChange('education', 'field', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">University/Institution *</label>
                <input
                  type="text"
                  required
                  value={formData.education.university}
                  onChange={(e) => handleInputChange('education', 'university', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                <input
                  type="number"
                  required
                  min="1950"
                  max="2024"
                  value={formData.education.graduationYear}
                  onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Certifications</label>
              <textarea
                value={formData.education.certifications.join('\n')}
                onChange={(e) => handleInputChange('education', 'certifications', e.target.value.split('\n').filter(cert => cert.trim()))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="List your professional certifications (one per line)..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Availability & Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hours per week you can commit *</label>
                <select
                  required
                  value={formData.availability.hoursPerWeek}
                  onChange={(e) => handleInputChange('availability', 'hoursPerWeek', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select hours</option>
                  <option value="1-2">1-2 hours</option>
                  <option value="3-5">3-5 hours</option>
                  <option value="6-10">6-10 hours</option>
                  <option value="11-15">11-15 hours</option>
                  <option value="15+">15+ hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred time of day *</label>
                <select
                  required
                  value={formData.availability.preferredTime}
                  onChange={(e) => handleInputChange('availability', 'preferredTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (6 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                  <option value="evening">Evening (6 PM - 12 AM)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone *</label>
                <select
                  required
                  value={formData.availability.timezone}
                  onChange={(e) => handleInputChange('availability', 'timezone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select timezone</option>
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commitment duration *</label>
                <select
                  required
                  value={formData.availability.duration}
                  onChange={(e) => handleInputChange('availability', 'duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select duration</option>
                  <option value="3-months">3 months</option>
                  <option value="6-months">6 months</option>
                  <option value="1-year">1 year</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred start date *</label>
                <input
                  type="date"
                  required
                  value={formData.availability.startDate}
                  onChange={(e) => handleInputChange('availability', 'startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Motivation & Goals</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to become a mentor? *</label>
                <textarea
                  required
                  value={formData.motivation.whyMentor}
                  onChange={(e) => handleInputChange('motivation', 'whyMentor', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us about your motivation to mentor students..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe your teaching/mentoring style *</label>
                <textarea
                  required
                  value={formData.motivation.teachingStyle}
                  onChange={(e) => handleInputChange('motivation', 'teachingStyle', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="How do you approach teaching and mentoring others?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What goals do you hope to help students achieve? *</label>
                <textarea
                  required
                  value={formData.motivation.studentGoals}
                  onChange={(e) => handleInputChange('motivation', 'studentGoals', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What specific outcomes do you want to help students reach?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional information</label>
                <textarea
                  value={formData.motivation.additionalInfo}
                  onChange={(e) => handleInputChange('motivation', 'additionalInfo', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Upload</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => e.target.files && handleFileUpload('resume', e.target.files[0])}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Choose File
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {formData.coverLetter ? formData.coverLetter.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => e.target.files && handleFileUpload('coverLetter', e.target.files[0])}
                      className="hidden"
                      id="cover-letter-upload"
                    />
                    <label
                      htmlFor="cover-letter-upload"
                      className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Choose File
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in becoming a mentor. We'll review your application and get back to you within 5-7 business days.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({
                personalInfo: {
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  location: '',
                  linkedin: '',
                  website: ''
                },
                professionalInfo: {
                  currentPosition: '',
                  company: '',
                  yearsExperience: '',
                  industry: '',
                  specializations: [],
                  previousMentoring: false,
                  mentoringExperience: ''
                },
                education: {
                  degree: '',
                  field: '',
                  university: '',
                  graduationYear: '',
                  certifications: []
                },
                availability: {
                  hoursPerWeek: '',
                  preferredTime: '',
                  timezone: '',
                  duration: '',
                  startDate: ''
                },
                motivation: {
                  whyMentor: '',
                  teachingStyle: '',
                  studentGoals: '',
                  additionalInfo: ''
                },
                resume: null,
                coverLetter: null
              });
            }}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apply as a Mentor
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share your expertise and help shape the next generation of tech professionals. 
              Join our community of industry experts and make a meaningful impact.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-primary-600 border-primary-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Become a Mentor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Make an Impact</h3>
              <p className="text-primary-100">Help students achieve their career goals and make a lasting difference in their lives.</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Professional Growth</h3>
              <p className="text-primary-100">Develop your leadership and communication skills while staying current with industry trends.</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-primary-100">Join a network of like-minded professionals and expand your professional connections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorApplication;

