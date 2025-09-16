import React, { useState } from 'react';
import { sendApplicationConfirmation, sendInterviewSchedule } from '../services/emailService';
import { 
  User, 
  Mail, 
  MapPin, 
  GraduationCap, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight,
  CreditCard,
  Gift,
  Clock,
  AlertCircle,
  Phone,
  Calendar,
  Award,
  Briefcase,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';

const ProgramApplication: React.FC = () => {
  const [programType, setProgramType] = useState<'free' | 'paid' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    programType: '',
    selectedProgram: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      aadhar: '',
      pan: ''
    },
    education: {
      highestQualification: '',
      fieldOfStudy: '',
      university: '',
      graduationYear: '',
      percentage: '',
      additionalEducation: ''
    },
    socialMedia: {
      linkedin: '',
      instagram: '',
      twitter: '',
      facebook: '',
      portfolio: ''
    },
    resume: null as File | null,
    paymentInfo: {
      amount: 0,
      gstAmount: 0,
      totalAmount: 0,
      paymentMethod: '',
      termsAccepted: false
    }
  });

  const programs = [
    {
      id: 'digital-free',
      name: 'Digital Transformation (Free)',
      type: 'free',
      duration: '6 months',
      description: 'Learn digital marketing, e-commerce, and analytics',
      features: ['Industry mentorship', 'Certificate', 'Job placement assistance']
    },
    {
      id: 'cloud-free',
      name: 'Cloud & DevOps (Free)',
      type: 'free',
      duration: '8 months',
      description: 'Master AWS, Docker, and Kubernetes',
      features: ['Hands-on projects', 'Industry certification', 'Career guidance']
    },
    {
      id: 'security-free',
      name: 'Cyber Security (Free)',
      type: 'free',
      duration: '7 months',
      description: 'Learn ethical hacking and security auditing',
      features: ['Lab access', 'Security tools', 'Industry projects']
    },
    {
      id: 'digital-paid',
      name: 'Digital Transformation (Premium)',
      type: 'paid',
      duration: '6 months',
      price: 29999,
      description: 'Advanced digital transformation with industry projects',
      features: ['1-on-1 mentorship', 'Premium certificate', 'Guaranteed placement']
    },
    {
      id: 'cloud-paid',
      name: 'Cloud & DevOps (Premium)',
      type: 'paid',
      duration: '8 months',
      price: 34999,
      description: 'Complete cloud infrastructure mastery',
      features: ['AWS certification', 'Real-world projects', 'Job guarantee']
    },
    {
      id: 'security-paid',
      name: 'Cyber Security (Premium)',
      type: 'paid',
      duration: '7 months',
      price: 32999,
      description: 'Advanced cybersecurity with penetration testing',
      features: ['CEH certification', 'Security lab', 'Industry mentorship']
    }
  ];

  const steps = [
    { number: 1, title: 'Select Program', icon: Gift },
    { number: 2, title: 'Personal Information', icon: User },
    { number: 3, title: 'Education Background', icon: GraduationCap },
    { number: 4, title: 'Social Media & Portfolio', icon: Globe },
    { number: 5, title: 'Document Upload', icon: Upload },
    { number: 6, title: 'Payment & Terms', icon: CreditCard }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleProgramSelect = (program: any) => {
    setFormData(prev => ({
      ...prev,
      programType: program.type,
      selectedProgram: program.id,
      paymentInfo: {
        ...prev.paymentInfo,
        amount: program.price || 0,
        gstAmount: program.price ? program.price * 0.18 : 0,
        totalAmount: program.price ? program.price * 1.18 : 0
      }
    }));
    setProgramType(program.type);
  };

  const handleFileUpload = (file: File) => {
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send application confirmation email
      await sendApplicationConfirmation(formData);
      
      // Send interview schedule email (with delay)
      setTimeout(async () => {
        await sendInterviewSchedule(formData);
      }, 2000);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
      // Handle error - show error message to user
    }
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Program</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program) => (
                <div
                  key={program.id}
                  onClick={() => handleProgramSelect(program)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.selectedProgram === program.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {program.type === 'free' ? (
                        <Gift className="w-6 h-6 text-green-600" />
                      ) : (
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        program.type === 'free' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {program.type === 'free' ? 'FREE' : 'PAID'}
                      </span>
                    </div>
                    {program.price && (
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{program.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {program.name}
                  </h4>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="space-y-2">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Duration: {program.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
                <textarea
                  required
                  value={formData.personalInfo.address}
                  onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.city}
                  onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.state}
                  onChange={(e) => handleInputChange('personalInfo', 'state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.pincode}
                  onChange={(e) => handleInputChange('personalInfo', 'pincode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.aadhar}
                  onChange={(e) => handleInputChange('personalInfo', 'aadhar', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number *</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.pan}
                  onChange={(e) => handleInputChange('personalInfo', 'pan', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Education Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification *</label>
                <select
                  required
                  value={formData.education.highestQualification}
                  onChange={(e) => handleInputChange('education', 'highestQualification', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select qualification</option>
                  <option value="10th">10th Standard</option>
                  <option value="12th">12th Standard</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
                <input
                  type="text"
                  required
                  value={formData.education.fieldOfStudy}
                  onChange={(e) => handleInputChange('education', 'fieldOfStudy', e.target.value)}
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
                  value={formData.education.graduationYear}
                  onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Percentage/CGPA *</label>
                <input
                  type="text"
                  required
                  value={formData.education.percentage}
                  onChange={(e) => handleInputChange('education', 'percentage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Education/Certifications</label>
                <textarea
                  value={formData.education.additionalEducation}
                  onChange={(e) => handleInputChange('education', 'additionalEducation', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="List any additional courses, certifications, or training..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media & Portfolio</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile *</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    required
                    value={formData.socialMedia.linkedin}
                    onChange={(e) => handleInputChange('socialMedia', 'linkedin', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={formData.socialMedia.instagram}
                      onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={formData.socialMedia.twitter}
                      onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://twitter.com/yourprofile"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={formData.socialMedia.facebook}
                      onChange={(e) => handleInputChange('socialMedia', 'facebook', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://facebook.com/yourprofile"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={formData.socialMedia.portfolio}
                      onChange={(e) => handleInputChange('socialMedia', 'portfolio', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Upload</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {formData.resume ? formData.resume.name : 'Click to upload or drag and drop your resume'}
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
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
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment & Terms</h3>
            
            {formData.programType === 'paid' ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Program Fee:</span>
                    <span>₹{formData.paymentInfo.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{formData.paymentInfo.gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span>₹{formData.paymentInfo.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={formData.paymentInfo.paymentMethod}
                    onChange={(e) => handleInputChange('paymentInfo', 'paymentMethod', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select payment method</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                    <option value="net-banking">Net Banking</option>
                    <option value="upi">UPI</option>
                    <option value="wallet">Digital Wallet</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center">
                  <Gift className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold text-green-900">Free Program Selected</h4>
                    <p className="text-green-700">No payment required. You will receive an email confirmation and interview schedule.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Terms & Conditions</h4>
              <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>1. Application Process:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>All applications will be reviewed within 48 hours</li>
                    <li>Auto-email confirmation will be sent upon submission</li>
                    <li>Interview scheduling will be initiated automatically</li>
                  </ul>
                  
                  <p><strong>2. Interview Process (3-4 Rounds):</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Round 1: Assessment Test (Technical & Logical)</li>
                    <li>Round 2: Communication Test (Written & Speaking)</li>
                    <li>Round 3: Logical Reasoning Test</li>
                    <li>Round 4: Face-to-Face Interview</li>
                  </ul>
                  
                  <p><strong>3. Program Assignment:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Internship program will be decided based on assessment results</li>
                    <li>Performance in all rounds will determine program placement</li>
                    <li>Final decision will be communicated within 7 days of completion</li>
                  </ul>
                  
                  <p><strong>4. Payment Terms (Paid Programs):</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Full payment required before program commencement</li>
                    <li>GST as applicable will be charged</li>
                    <li>Refund policy: 100% refund if cancelled within 7 days</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.paymentInfo.termsAccepted}
                  onChange={(e) => handleInputChange('paymentInfo', 'termsAccepted', e.target.checked)}
                  className="mt-1 mr-3"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I have read and agree to the terms and conditions, and understand the interview process and program assignment criteria.
                </label>
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
            Thank you for your application. You will receive an auto-email confirmation shortly.
            Our team will review your application and schedule your interview process within 48 hours.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ul className="text-sm text-blue-800 text-left space-y-1">
              <li>• Check your email for confirmation</li>
              <li>• Complete the assessment test (Round 1)</li>
              <li>• Attend communication test (Round 2)</li>
              <li>• Take logical reasoning test (Round 3)</li>
              <li>• Face-to-face interview (Round 4)</li>
            </ul>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setProgramType(null);
              setFormData({
                programType: '',
                selectedProgram: '',
                personalInfo: {
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  state: '',
                  pincode: '',
                  aadhar: '',
                  pan: ''
                },
                education: {
                  highestQualification: '',
                  fieldOfStudy: '',
                  university: '',
                  graduationYear: '',
                  percentage: '',
                  additionalEducation: ''
                },
                socialMedia: {
                  linkedin: '',
                  instagram: '',
                  twitter: '',
                  facebook: '',
                  portfolio: ''
                },
                resume: null,
                paymentInfo: {
                  amount: 0,
                  gstAmount: 0,
                  totalAmount: 0,
                  paymentMethod: '',
                  termsAccepted: false
                }
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
              Program Application
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Apply for our free or paid programs. Complete the application process and get ready for your tech career journey.
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
                  disabled={!formData.selectedProgram && currentStep === 1}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.paymentInfo.termsAccepted}
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

        {/* Interview Process Info */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Interview Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Assessment Test</h3>
              <p className="text-sm text-primary-100">Technical & Logical evaluation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Communication Test</h3>
              <p className="text-sm text-primary-100">Written & Speaking skills</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Logical Test</h3>
              <p className="text-sm text-primary-100">Reasoning & Problem solving</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Face-to-Face</h3>
              <p className="text-sm text-primary-100">Final interview round</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramApplication;
