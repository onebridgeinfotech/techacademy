import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Mic, 
  Video, 
  Code, 
  CheckCircle, 
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Lock
} from 'lucide-react';
import { assessmentService, AssessmentData } from '../services/assessmentService';
import { resumeParserService, ParsedResume } from '../services/resumeParser';
import { authService } from '../services/authService';
import ProtectedRoute from '../components/ProtectedRoute';

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [resumeData, setResumeData] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(authService.getCurrentUser());

  // Step 1: Resume Upload
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [candidateInfo, setCandidateInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  // Step 2: Questions and Answers
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Step 3: Communication Test
  const [emailScenario, setEmailScenario] = useState('');
  const [emailResponse, setEmailResponse] = useState('');
  const [speakingTopic, setSpeakingTopic] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Step 4: Coding Test
  const [selectedTrack, setSelectedTrack] = useState('');
  const [codingChallenge, setCodingChallenge] = useState('');
  const [codeSolution, setCodeSolution] = useState('');

  // Results
  const [results, setResults] = useState<any>(null);

  const tracks = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'csharp', name: 'C#', icon: '🔷' },
    { id: 'cpp', name: 'C++', icon: '⚡' }
  ];

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setLoading(true);

    try {
      const parsedResume = await resumeParserService.parseResume(file);
      setResumeData(parsedResume);
      
      // Auto-fill candidate info from resume
      setCandidateInfo({
        name: parsedResume.contact.name || '',
        email: parsedResume.contact.email || '',
        phone: parsedResume.contact.phone || '',
        location: parsedResume.contact.location || ''
      });
    } catch (error) {
      setError('Failed to parse resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startAssessment = async () => {
    if (!resumeData || !candidateInfo.name || !candidateInfo.email) {
      setError('Please upload resume and fill in required information.');
      return;
    }

    setLoading(true);
    try {
      const newAssessmentData: AssessmentData = {
        candidateId: Date.now().toString(),
        candidateName: candidateInfo.name,
        candidateEmail: candidateInfo.email,
        resumeText: resumeData.text,
        currentRound: 1,
        totalRounds: 3,
        scores: {},
        feedback: {},
        status: 'in_progress',
        strengths: [],
        weaknesses: []
      };

      setAssessmentData(newAssessmentData);
      await generateQuestions(1);
      setCurrentStep(2);
    } catch (error) {
      setError('Failed to start assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateQuestions = async (round: number) => {
    try {
      const generatedQuestions = await assessmentService.generateQuestions(
        round, 
        resumeData || undefined, 
        selectedTrack
      );
      setQuestions(generatedQuestions);
    } catch (error) {
      setError('Failed to generate questions. Please try again.');
    }
  };

  const handleAnswerSubmit = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    // All questions answered, evaluate
    setLoading(true);
    try {
      const answersArray = questions.map(q => ({
        questionId: q.id,
        answer: answers[q.id] || ''
      }));

      const result = await assessmentService.evaluateAnswers(
        assessmentData!.currentRound,
        questions,
        answersArray
      );

      // Update assessment data
      const updatedData = {
        ...assessmentData!,
        scores: {
          ...assessmentData!.scores,
          [`round${assessmentData!.currentRound}`]: result.score
        },
        feedback: {
          ...assessmentData!.feedback,
          [`round${assessmentData!.currentRound}`]: result.feedback
        },
        currentRound: assessmentData!.currentRound + 1
      };

      setAssessmentData(updatedData);

      if (result.passed) {
        if (assessmentData!.currentRound === 1) {
          // Move to Round 2
          await generateQuestions(2);
          setCurrentStep(3);
        } else if (assessmentData!.currentRound === 2) {
          // Move to Round 3
          setCurrentStep(4);
        } else {
          // Assessment complete
          await completeAssessment(updatedData);
        }
      } else {
        // Failed, show results
        await completeAssessment(updatedData);
      }
    } catch (error) {
      setError('Failed to evaluate answers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommunicationTest = async () => {
    setLoading(true);
    try {
      const answersArray = [
        { questionId: 'email', answer: emailResponse },
        { questionId: 'speaking', answer: audioBlob ? 'Audio recorded' : '' }
      ];

      const result = await assessmentService.evaluateAnswers(2, questions, answersArray);
      
      const updatedData = {
        ...assessmentData!,
        scores: {
          ...assessmentData!.scores,
          round2: result.score
        },
        feedback: {
          ...assessmentData!.feedback,
          round2: result.feedback
        },
        currentRound: 3
      };

      setAssessmentData(updatedData);

      if (result.passed) {
        setCurrentStep(4);
      } else {
        await completeAssessment(updatedData);
      }
    } catch (error) {
      setError('Failed to evaluate communication test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodingTest = async () => {
    setLoading(true);
    try {
      const answersArray = [
        { questionId: 'coding', answer: codeSolution }
      ];

      const result = await assessmentService.evaluateAnswers(3, questions, answersArray);
      
      const updatedData = {
        ...assessmentData!,
        scores: {
          ...assessmentData!.scores,
          round3: result.score
        },
        feedback: {
          ...assessmentData!.feedback,
          round3: result.feedback
        },
        status: 'completed'
      };

      setAssessmentData(updatedData);
      await completeAssessment(updatedData);
    } catch (error) {
      setError('Failed to evaluate coding test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeAssessment = async (data: AssessmentData) => {
    try {
      const finalResult = await assessmentService.generateFinalResult(data);
      setResults(finalResult);
      setCurrentStep(5);
    } catch (error) {
      setError('Failed to generate final results. Please try again.');
    }
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(blob);
        };

        mediaRecorder.start();
        setIsRecording(true);

        // Stop recording after 2 minutes
        setTimeout(() => {
          mediaRecorder.stop();
          setIsRecording(false);
        }, 120000);
      })
      .catch(error => {
        setError('Failed to access microphone. Please check permissions.');
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  // Check if user can start assessment
  if (!authService.canStartAssessment()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Locked</h2>
            <p className="text-gray-600 mb-6">
              You need to complete your profile and upload your resume before starting the assessment.
            </p>
            <div className="space-y-4">
              {!user?.profileComplete && (
                <div className="flex items-center text-orange-600">
                  <XCircle className="h-5 w-5 mr-2" />
                  <span>Complete your profile</span>
                </div>
              )}
              {!user?.profileComplete && (
                <div className="flex items-center text-orange-600">
                  <XCircle className="h-5 w-5 mr-2" />
                  <span>Upload your resume</span>
                </div>
              )}
            </div>
            <div className="mt-6 space-x-4">
              <button
                onClick={() => navigate('/signup?step=2')}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
              >
                Complete Profile
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Processing your assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireProfile={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
            <span className="text-sm font-medium text-gray-700">{currentStep}/5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Resume Upload */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Start Your Assessment</h1>
            
            <div className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Your Resume
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your resume here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX files</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
                {resumeFile && (
                  <div className="mt-4 flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>{resumeFile.name}</span>
                  </div>
                )}
              </div>

              {/* Candidate Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={candidateInfo.name}
                    onChange={(e) => setCandidateInfo({...candidateInfo, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={candidateInfo.email}
                    onChange={(e) => setCandidateInfo({...candidateInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={candidateInfo.phone}
                    onChange={(e) => setCandidateInfo({...candidateInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={candidateInfo.location}
                    onChange={(e) => setCandidateInfo({...candidateInfo, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your location"
                  />
                </div>
              </div>

              <button
                onClick={startAssessment}
                disabled={!resumeFile || !candidateInfo.name || !candidateInfo.email}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Start Assessment
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Round 1 - Technical Questions */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Round 1: Technical Assessment</h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {questions[currentQuestionIndex] && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {questions[currentQuestionIndex].question}
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {questions[currentQuestionIndex].category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {questions[currentQuestionIndex].difficulty}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    value={answers[questions[currentQuestionIndex].id] || ''}
                    onChange={(e) => setAnswers({
                      ...answers,
                      [questions[currentQuestionIndex].id]: e.target.value
                    })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Type your answer here..."
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={handleAnswerSubmit}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Submit Answers' : 'Next Question'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Round 2 - Communication Test */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Round 2: Communication Assessment</h2>
            
            <div className="space-y-8">
              {/* Email Writing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Part A: Email Writing</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">{emailScenario}</p>
                </div>
                <textarea
                  value={emailResponse}
                  onChange={(e) => setEmailResponse(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Write your email response here..."
                />
              </div>

              {/* Speaking Test */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Part B: Speaking Test</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">Topic: {speakingTopic}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Record yourself speaking about this topic for 2-3 minutes.
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isRecording 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <XCircle className="h-5 w-5" />
                        <span>Stop Recording</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5" />
                        <span>Start Recording</span>
                      </>
                    )}
                  </button>
                  
                  {audioBlob && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Recording Complete</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleCommunicationTest}
                disabled={!emailResponse || !audioBlob}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Communication Test
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Round 3 - Coding Test */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Round 3: Coding Assessment</h2>
            
            <div className="space-y-6">
              {/* Track Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Programming Track</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => setSelectedTrack(track.id)}
                      className={`p-4 border-2 rounded-lg text-center hover:bg-gray-50 ${
                        selectedTrack === track.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{track.icon}</div>
                      <div className="font-medium">{track.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coding Challenge */}
              {selectedTrack && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Coding Challenge</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700">{codingChallenge}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Solution
                    </label>
                    <textarea
                      value={codeSolution}
                      onChange={(e) => setCodeSolution(e.target.value)}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                      placeholder="Write your code solution here..."
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleCodingTest}
                disabled={!selectedTrack || !codeSolution}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Coding Solution
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Results */}
        {currentStep === 5 && results && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              {results.success ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {results.success ? 'Congratulations!' : 'Assessment Complete'}
              </h2>
              <p className="text-gray-600">
                {results.success 
                  ? 'You have successfully completed the assessment!' 
                  : 'Thank you for completing the assessment.'
                }
              </p>
            </div>

            <div className="space-y-6">
              {/* Scores */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {assessmentData?.scores.round1 || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Round 1: Technical</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {assessmentData?.scores.round2 || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Round 2: Communication</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {assessmentData?.scores.round3 || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Round 3: Coding</div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{results.emailContent}</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Print Results
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Assessment;
