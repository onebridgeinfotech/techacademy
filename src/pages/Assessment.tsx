import React, { useState, useEffect, useRef } from 'react';
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
  Lock,
  AlertTriangle,
  Camera,
  CameraOff,
  Play,
  Pause,
  Send,
  Award,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { assessmentService, AssessmentData } from '../services/assessmentService';
import { resumeParserService, ParsedResume } from '../services/resumeParser';
import { authService } from '../services/authService';
import ProtectedRoute from '../components/ProtectedRoute';

// Enhanced interfaces for comprehensive assessment
interface ObjectiveQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
}

interface CommunicationTest {
  written: {
    scenario: string;
    sampleAnswer: string;
    evaluationRubric: string[];
  };
  spoken: {
    prompt: string;
    evaluationRubric: string[];
    timeLimit: number;
  };
}

interface CodingProblem {
  id: string;
  problem: string;
  inputExample: string;
  expectedOutput: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  evaluationCriteria: string[];
  timeLimit: number;
}

interface ProctoringViolation {
  id: string;
  type: 'camera_off' | 'head_movement' | 'multiple_faces' | 'screen_share';
  timestamp: string;
  severity: 'warning' | 'critical';
  description: string;
}

interface AssessmentResult {
  candidateId: string;
  name: string;
  email: string;
  resumeHighlights: string[];
  objectiveTest: {
    score: number;
    pass: boolean;
    timeTaken: string;
    questionsAnswered: number;
  };
  communicationTest: {
    written: number;
    spoken: number;
    pass: boolean;
  };
  codingTest: {
    score: number;
    language: string;
    pass: boolean;
  };
  proctoringViolations: number;
  finalStatus: 'Passed' | 'Failed';
  eligibleForInterview: boolean;
  sponsorshipApproved: boolean;
  assessmentDate: string;
}

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [resumeData, setResumeData] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(authService.getCurrentUser());

  // Resume Upload
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [candidateInfo, setCandidateInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  // Objective Test
  const [objectiveQuestions, setObjectiveQuestions] = useState<ObjectiveQuestion[]>([]);
  const [objectiveAnswers, setObjectiveAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [objectiveTimeLeft, setObjectiveTimeLeft] = useState(30 * 60); // 30 minutes
  const [objectiveScore, setObjectiveScore] = useState(0);

  // Communication Test
  const [communicationTest, setCommunicationTest] = useState<CommunicationTest | null>(null);
  const [emailResponse, setEmailResponse] = useState('');
  const [speakingTopic, setSpeakingTopic] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [communicationScores, setCommunicationScores] = useState({ written: 0, spoken: 0 });

  // Coding Test
  const [codingProblems, setCodingProblems] = useState<CodingProblem[]>([]);
  const [currentCodingProblem, setCurrentCodingProblem] = useState(0);
  const [codeSolutions, setCodeSolutions] = useState<{ [key: string]: string }>({});
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [codingScore, setCodingScore] = useState(0);

  // Proctoring
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [violations, setViolations] = useState<ProctoringViolation[]>([]);
  const [headMovementCount, setHeadMovementCount] = useState(0);
  const [lastHeadMovement, setLastHeadMovement] = useState<Date | null>(null);

  // Results
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const tracks = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'csharp', name: 'C#', icon: '🔷' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'php', name: 'PHP', icon: '🐘' }
  ];

  // Proctoring functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 1280, 
          height: 720,
          facingMode: 'user'
        }, 
        audio: false 
      });
      setCameraStream(stream);
      setIsCameraOn(true);
      startProctoring();
    } catch (error) {
      setError('Camera access denied. Assessment cannot proceed without camera.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraOn(false);
    }
  };

  const startProctoring = () => {
    // Simulate head movement detection
    const interval = setInterval(() => {
      // Mock head movement detection
      const hasMovement = Math.random() > 0.95; // 5% chance of movement
      if (hasMovement) {
        const now = new Date();
        if (lastHeadMovement && (now.getTime() - lastHeadMovement.getTime()) > 30000) {
          setHeadMovementCount(prev => prev + 1);
          addViolation('head_movement', 'warning', 'Head movement detected for more than 30 seconds');
        }
        setLastHeadMovement(now);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const addViolation = (type: ProctoringViolation['type'], severity: ProctoringViolation['severity'], description: string) => {
    const violation: ProctoringViolation = {
      id: `violation_${Date.now()}`,
      type,
      timestamp: new Date().toISOString(),
      severity,
      description
    };
    setViolations(prev => [...prev, violation]);

    if (severity === 'critical' || violations.length >= 3) {
      setError('Assessment terminated due to proctoring violations.');
      setCurrentStep(0);
    }
  };

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

  const generateObjectiveQuestions = async () => {
    setLoading(true);
    try {
      // Generate 30 adaptive questions based on resume
      const questions = await assessmentService.generateObjectiveQuestions(resumeData);
      setObjectiveQuestions(questions);
      setCurrentStep(2);
    } catch (error) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateCommunicationTest = async () => {
    setLoading(true);
    try {
      const test = await assessmentService.generateCommunicationTest(resumeData);
      setCommunicationTest(test);
      setCurrentStep(3);
    } catch (error) {
      setError('Failed to generate communication test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateCodingProblems = async () => {
    setLoading(true);
    try {
      const problems = await assessmentService.generateCodingProblems(selectedLanguage, resumeData);
      setCodingProblems(problems);
      setCurrentStep(4);
    } catch (error) {
      setError('Failed to generate coding problems. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitObjectiveTest = async () => {
    setLoading(true);
    try {
      const score = await assessmentService.evaluateObjectiveTest(objectiveQuestions, objectiveAnswers);
      setObjectiveScore(score);
      
      if (score >= 27) { // 90% of 30 questions
        setCurrentStep(3);
        generateCommunicationTest();
      } else {
        setError('Objective test failed. Score: ' + score + '/30. Minimum required: 27/30');
      }
    } catch (error) {
      setError('Failed to evaluate objective test.');
    } finally {
      setLoading(false);
    }
  };

  const submitCommunicationTest = async () => {
    setLoading(true);
    try {
      const scores = await assessmentService.evaluateCommunicationTest(
        emailResponse, 
        audioBlob, 
        communicationTest!
      );
      setCommunicationScores(scores);
      
      if (scores.written >= 90 && scores.spoken >= 90) {
        setCurrentStep(4);
        generateCodingProblems();
      } else {
        setError('Communication test failed. Written: ' + scores.written + ', Spoken: ' + scores.spoken);
      }
    } catch (error) {
      setError('Failed to evaluate communication test.');
    } finally {
      setLoading(false);
    }
  };

  const submitCodingTest = async () => {
    setLoading(true);
    try {
      const score = await assessmentService.evaluateCodingTest(codingProblems, codeSolutions);
      setCodingScore(score);
      
      if (score >= 90) {
        generateFinalResults();
      } else {
        setError('Coding test failed. Score: ' + score + '/100. Minimum required: 90/100');
      }
    } catch (error) {
      setError('Failed to evaluate coding test.');
    } finally {
      setLoading(false);
    }
  };

  const generateFinalResults = async () => {
    const result: AssessmentResult = {
      candidateId: `TECH${Date.now()}`,
      name: candidateInfo.name,
      email: candidateInfo.email,
      resumeHighlights: resumeData?.skills || [],
      objectiveTest: {
        score: objectiveScore,
        pass: objectiveScore >= 27,
        timeTaken: `${Math.floor((30 * 60 - objectiveTimeLeft) / 60)}:${((30 * 60 - objectiveTimeLeft) % 60).toString().padStart(2, '0')}`,
        questionsAnswered: Object.keys(objectiveAnswers).length
      },
      communicationTest: {
        written: communicationScores.written,
        spoken: communicationScores.spoken,
        pass: communicationScores.written >= 90 && communicationScores.spoken >= 90
      },
      codingTest: {
        score: codingScore,
        language: selectedLanguage,
        pass: codingScore >= 90
      },
      proctoringViolations: violations.length,
      finalStatus: (objectiveScore >= 27 && communicationScores.written >= 90 && 
                   communicationScores.spoken >= 90 && codingScore >= 90) ? 'Passed' : 'Failed',
      eligibleForInterview: (objectiveScore >= 27 && communicationScores.written >= 90 && 
                           communicationScores.spoken >= 90 && codingScore >= 90),
      sponsorshipApproved: (objectiveScore >= 27 && communicationScores.written >= 90 && 
                          communicationScores.spoken >= 90 && codingScore >= 90),
      assessmentDate: new Date().toISOString()
    };

    setResults(result);
    setShowResults(true);
    
    // Send email notification
    await assessmentService.sendResultEmail(result);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) { // 5 minutes
            mediaRecorder.stop();
            setIsRecording(false);
            clearInterval(timer);
            return 300;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      setError('Microphone access denied.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  // Timer for objective test
  useEffect(() => {
    if (currentStep === 2 && objectiveTimeLeft > 0) {
      const timer = setTimeout(() => {
        setObjectiveTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep === 2 && objectiveTimeLeft === 0) {
      submitObjectiveTest();
    }
  }, [currentStep, objectiveTimeLeft]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!authService.canStartAssessment()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <Lock className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Not Available</h2>
          <p className="text-gray-600 mb-6">
            You need to complete your profile and be approved to start the assessment.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                results.finalStatus === 'Passed' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {results.finalStatus === 'Passed' ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Assessment {results.finalStatus}
              </h1>
              <p className="text-gray-600">
                Candidate ID: {results.candidateId}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Objective Test</h3>
                <p className="text-2xl font-bold text-blue-600">{results.objectiveTest.score}/30</p>
                <p className="text-sm text-blue-700">
                  {results.objectiveTest.pass ? 'Passed' : 'Failed'} • {results.objectiveTest.timeTaken}
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Communication</h3>
                <p className="text-2xl font-bold text-green-600">
                  {results.communicationTest.written}% / {results.communicationTest.spoken}%
                </p>
                <p className="text-sm text-green-700">
                  {results.communicationTest.pass ? 'Passed' : 'Failed'}
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Coding Test</h3>
                <p className="text-2xl font-bold text-purple-600">{results.codingTest.score}%</p>
                <p className="text-sm text-purple-700">
                  {results.codingTest.pass ? 'Passed' : 'Failed'} • {results.codingTest.language}
                </p>
              </div>
            </div>

            {results.finalStatus === 'Passed' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">🎉 Congratulations!</h3>
                <p className="text-green-700 mb-4">
                  You have successfully passed all assessment rounds and are eligible for the final interview.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-green-600">✅ Eligible for Final Interview</p>
                  <p className="text-sm text-green-600">✅ Sponsorship Approved</p>
                  <p className="text-sm text-green-600">✅ Next Steps: Team Interview</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-red-900 mb-2">Assessment Not Passed</h3>
                <p className="text-red-700 mb-4">
                  You can retake the assessment after 30 days. We'll send you detailed feedback and improvement suggestions.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-red-600">❌ Not Eligible for Interview</p>
                  <p className="text-sm text-red-600">❌ Sponsorship Not Approved</p>
                  <p className="text-sm text-red-600">⏰ Retake Available: 30 days</p>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Tech Academy Assessment</h1>
              <div className="flex items-center space-x-2">
                {isCameraOn ? (
                  <Camera className="h-5 w-5 text-green-500" />
                ) : (
                  <CameraOff className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-600">
                  {violations.length} violations
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Resume Upload</span>
              <span>Objective Test</span>
              <span>Communication</span>
              <span>Coding Test</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Step 1: Resume Upload */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Upload & Profile Setup</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resume (PDF, DOC, DOCX)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </label>
                    {resumeFile && (
                      <p className="mt-2 text-sm text-gray-600">{resumeFile.name}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={candidateInfo.name}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={candidateInfo.email}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={candidateInfo.phone}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={candidateInfo.location}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Assessment Rules</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Camera must be ON throughout the assessment</li>
                    <li>• No external help or resources allowed</li>
                    <li>• Assessment is proctored and monitored</li>
                    <li>• Violations will result in automatic failure</li>
                  </ul>
                </div>

                <button
                  onClick={async () => {
                    await startCamera();
                    generateObjectiveQuestions();
                  }}
                  disabled={!resumeFile || !candidateInfo.name || !candidateInfo.email || loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Starting Assessment...' : 'Start Assessment'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Objective Test */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Objective Test</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-lg font-semibold text-blue-600">
                      {Math.floor(objectiveTimeLeft / 60)}:{(objectiveTimeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {objectiveQuestions.length}
                  </div>
                </div>
              </div>

              {objectiveQuestions.length > 0 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {objectiveQuestions[currentQuestionIndex].question}
                    </h3>
                    <div className="space-y-3">
                      {objectiveQuestions[currentQuestionIndex].options.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`question_${objectiveQuestions[currentQuestionIndex].id}`}
                            value={option}
                            checked={objectiveAnswers[objectiveQuestions[currentQuestionIndex].id] === option}
                            onChange={(e) => setObjectiveAnswers(prev => ({
                              ...prev,
                              [objectiveQuestions[currentQuestionIndex].id]: e.target.value
                            }))}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(objectiveQuestions.length - 1, prev + 1))}
                      disabled={currentQuestionIndex === objectiveQuestions.length - 1}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>

                  <button
                    onClick={submitObjectiveTest}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Objective Test
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Communication Test */}
          {currentStep === 3 && communicationTest && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Communication Test</h2>
              
              <div className="space-y-8">
                {/* Written Communication */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-4">Written Communication</h3>
                  <p className="text-blue-700 mb-4">{communicationTest.written.scenario}</p>
                  <textarea
                    value={emailResponse}
                    onChange={(e) => setEmailResponse(e.target.value)}
                    placeholder="Write your response here..."
                    className="w-full h-32 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Spoken Communication */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-4">Spoken Communication</h3>
                  <p className="text-green-700 mb-4">{communicationTest.spoken.prompt}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                          isRecording 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                      </button>
                      {isRecording && (
                        <span className="text-sm text-gray-600">
                          {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')} / 5:00
                        </span>
                      )}
                    </div>
                    
                    {audioBlob && (
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Recording completed</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={submitCommunicationTest}
                  disabled={!emailResponse || !audioBlob || loading}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Communication Test
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Coding Test */}
          {currentStep === 4 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Coding Test</h2>
              
              {codingProblems.length === 0 ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Programming Language
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          onClick={() => setSelectedLanguage(track.id)}
                          className={`p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors ${
                            selectedLanguage === track.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{track.icon}</div>
                          <div className="font-medium">{track.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={generateCodingProblems}
                    disabled={!selectedLanguage || loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Generate Coding Problems
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Problem {currentCodingProblem + 1}: {codingProblems[currentCodingProblem].problem}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Input Example:
                        </label>
                        <pre className="bg-gray-100 p-3 rounded text-sm">
                          {codingProblems[currentCodingProblem].inputExample}
                        </pre>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Output:
                        </label>
                        <pre className="bg-gray-100 p-3 rounded text-sm">
                          {codingProblems[currentCodingProblem].expectedOutput}
                        </pre>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Solution:
                        </label>
                        <textarea
                          value={codeSolutions[codingProblems[currentCodingProblem].id] || ''}
                          onChange={(e) => setCodeSolutions(prev => ({
                            ...prev,
                            [codingProblems[currentCodingProblem].id]: e.target.value
                          }))}
                          placeholder="Write your code here..."
                          className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentCodingProblem(prev => Math.max(0, prev - 1))}
                      disabled={currentCodingProblem === 0}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentCodingProblem(prev => Math.min(codingProblems.length - 1, prev + 1))}
                      disabled={currentCodingProblem === codingProblems.length - 1}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>

                  <button
                    onClick={submitCodingTest}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Coding Test
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Assessment;