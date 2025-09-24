// Enhanced ChatGPT Assessment Service
// Comprehensive assessment system with all 3 phases

export interface AssessmentData {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  resumeText?: string;
  currentRound: number;
  totalRounds: number;
  scores: {
    round1?: number;
    round2?: number;
    round3?: number;
  };
  feedback: {
    round1?: string;
    round2?: string;
    round3?: string;
  };
  status: 'in_progress' | 'completed' | 'failed';
  strengths: string[];
  weaknesses: string[];
}

export interface ResumeData {
  skills: string[];
  projects: string[];
  certifications: string[];
  experience: string[];
  education: string[];
  gpa?: number;
}

export interface ObjectiveQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
}

export interface CommunicationTest {
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

export interface CodingProblem {
  id: string;
  problem: string;
  inputExample: string;
  expectedOutput: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  evaluationCriteria: string[];
  timeLimit: number;
}

export interface AssessmentResult {
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

// Mock data for demonstration - in production, integrate with OpenAI API
const mockObjectiveQuestions: ObjectiveQuestion[] = [
  {
    id: 'q1',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 'O(log n)',
    topic: 'Data Structures',
    difficulty: 'easy',
    timeLimit: 60
  },
  {
    id: 'q2',
    question: 'Which of the following is NOT a valid Python data type?',
    options: ['list', 'tuple', 'array', 'dictionary'],
    correctAnswer: 'array',
    topic: 'Python',
    difficulty: 'easy',
    timeLimit: 60
  },
  {
    id: 'q3',
    question: 'What does SQL stand for?',
    options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'System Query Language'],
    correctAnswer: 'Structured Query Language',
    topic: 'Database',
    difficulty: 'easy',
    timeLimit: 60
  },
  {
    id: 'q4',
    question: 'Which design pattern ensures only one instance of a class exists?',
    options: ['Factory', 'Singleton', 'Observer', 'Builder'],
    correctAnswer: 'Singleton',
    topic: 'OOP',
    difficulty: 'medium',
    timeLimit: 60
  },
  {
    id: 'q5',
    question: 'What is the purpose of a foreign key in a database?',
    options: ['To ensure data integrity', 'To improve query performance', 'To store encrypted data', 'To create backups'],
    correctAnswer: 'To ensure data integrity',
    topic: 'Database',
    difficulty: 'medium',
    timeLimit: 60
  }
];

const mockCommunicationTest: CommunicationTest = {
  written: {
    scenario: "Write a professional email to your mentor requesting a 2-day extension on your current project deadline. The project is a web application and you need more time to implement the authentication feature properly.",
    sampleAnswer: "Subject: Request for Project Deadline Extension\n\nDear [Mentor Name],\n\nI hope this email finds you well. I am writing to request a 2-day extension on the web application project deadline.\n\nI have made significant progress on the core functionality, but I need additional time to properly implement the authentication feature. This is a critical component that requires careful attention to security best practices.\n\nI am confident that with the extra time, I can deliver a more robust and secure solution. I will provide regular updates on my progress.\n\nThank you for your understanding.\n\nBest regards,\n[Your Name]",
    evaluationRubric: ['Professional tone', 'Clear request', 'Justification provided', 'Proper email format', 'Grammar and spelling']
  },
  spoken: {
    prompt: "Introduce yourself and explain your learning journey in technology. Describe your favorite project and the technologies you used. Speak for 3-5 minutes.",
    evaluationRubric: ['Clarity of speech', 'Confidence level', 'Technical vocabulary', 'Structure and flow', 'Engagement'],
    timeLimit: 300
  }
};

const mockCodingProblems: CodingProblem[] = [
  {
    id: 'cp1',
    problem: 'Write a function to find the factorial of a number using recursion.',
    inputExample: 'factorial(5)',
    expectedOutput: '120',
    difficulty: 'easy',
    language: 'python',
    evaluationCriteria: ['Correctness', 'Code efficiency', 'Readability', 'Edge cases'],
    timeLimit: 900
  },
  {
    id: 'cp2',
    problem: 'Implement a function to check if a string is a palindrome.',
    inputExample: 'isPalindrome("racecar")',
    expectedOutput: 'True',
    difficulty: 'easy',
    language: 'python',
    evaluationCriteria: ['Correctness', 'Code efficiency', 'Readability', 'Edge cases'],
    timeLimit: 900
  },
  {
    id: 'cp3',
    problem: 'Create a class to represent a bank account with deposit, withdraw, and balance methods.',
    inputExample: 'account = BankAccount(1000)\naccount.deposit(500)\naccount.withdraw(200)',
    expectedOutput: 'Balance: 1300',
    difficulty: 'medium',
    language: 'python',
    evaluationCriteria: ['Class design', 'Method implementation', 'Error handling', 'Code organization'],
    timeLimit: 1200
  }
];

class AssessmentService {
  // Generate 30 adaptive objective questions based on resume
  async generateObjectiveQuestions(resumeData: any): Promise<ObjectiveQuestion[]> {
    // In production, use OpenAI API to generate questions based on resume
    // For now, return mock questions with some adaptation
    const questions = [...mockObjectiveQuestions];
    
    // Add more questions to reach 30
    for (let i = 6; i <= 30; i++) {
      questions.push({
        id: `q${i}`,
        question: `Sample question ${i}: What is the output of this code?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option B',
        topic: 'Programming',
        difficulty: i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy',
        timeLimit: 60
      });
    }
    
    return questions;
  }

  // Generate communication test based on resume
  async generateCommunicationTest(resumeData: any): Promise<CommunicationTest> {
    // In production, customize based on resume
    return mockCommunicationTest;
  }

  // Generate coding problems based on selected language and resume
  async generateCodingProblems(language: string, resumeData: any): Promise<CodingProblem[]> {
    // In production, generate problems based on language and resume
    return mockCodingProblems.map(problem => ({
      ...problem,
      language: language
    }));
  }

  // Evaluate objective test answers
  async evaluateObjectiveTest(questions: ObjectiveQuestion[], answers: { [key: string]: string }): Promise<number> {
    let score = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  }

  // Evaluate communication test
  async evaluateCommunicationTest(
    writtenResponse: string, 
    audioBlob: Blob | null, 
    test: CommunicationTest
  ): Promise<{ written: number; spoken: number }> {
    // In production, use AI to evaluate responses
    // For now, return mock scores
    const writtenScore = Math.min(95, 70 + Math.random() * 25);
    const spokenScore = Math.min(95, 70 + Math.random() * 25);
    
    return {
      written: Math.round(writtenScore),
      spoken: Math.round(spokenScore)
    };
  }

  // Evaluate coding test
  async evaluateCodingTest(problems: CodingProblem[], solutions: { [key: string]: string }): Promise<number> {
    // In production, use AI to evaluate code
    // For now, return mock score
    return Math.min(100, 80 + Math.random() * 20);
  }

  // Generate final assessment result
  async generateFinalResult(data: any): Promise<AssessmentResult> {
    // In production, generate comprehensive result
    return {
      candidateId: data.candidateId,
      name: data.name,
      email: data.email,
      resumeHighlights: data.resumeHighlights || [],
      objectiveTest: data.objectiveTest,
      communicationTest: data.communicationTest,
      codingTest: data.codingTest,
      proctoringViolations: data.proctoringViolations || 0,
      finalStatus: data.finalStatus,
      eligibleForInterview: data.eligibleForInterview,
      sponsorshipApproved: data.sponsorshipApproved,
      assessmentDate: new Date().toISOString()
    };
  }

  // Send result email
  async sendResultEmail(result: AssessmentResult): Promise<void> {
    // In production, send actual email
    console.log('Sending result email:', result);
    
    if (result.finalStatus === 'Passed') {
      // Send congratulatory email
      console.log('Sending congratulatory email to:', result.email);
    } else {
      // Send failure email with feedback
      console.log('Sending failure email to:', result.email);
    }
  }

  // Generate questions for specific round
  async generateQuestions(round: number, resumeData: any): Promise<any[]> {
    // In production, generate questions based on round and resume
    return [];
  }

  // Evaluate answers for specific round
  async evaluateAnswers(round: number, questions: any[], answers: any[]): Promise<any> {
    // In production, evaluate answers using AI
    return { score: 85, feedback: 'Good performance' };
  }

  // Check if candidate can start assessment
  canStartAssessment(): boolean {
    // In production, check database for eligibility
    return true;
  }

  // Get assessment data
  async getAssessmentData(candidateId: string): Promise<AssessmentData | null> {
    // In production, fetch from database
    return null;
  }

  // Save assessment data
  async saveAssessmentData(data: AssessmentData): Promise<void> {
    // In production, save to database
    console.log('Saving assessment data:', data);
  }

  // Generate feedback report
  async generateFeedbackReport(result: AssessmentResult): Promise<string> {
    const feedback = `
Assessment Feedback Report
========================

Candidate: ${result.name}
Assessment Date: ${result.assessmentDate}
Final Status: ${result.finalStatus}

Objective Test: ${result.objectiveTest.score}/30 (${result.objectiveTest.pass ? 'Passed' : 'Failed'})
Communication Test: Written ${result.communicationTest.written}%, Spoken ${result.communicationTest.spoken}% (${result.communicationTest.pass ? 'Passed' : 'Failed'})
Coding Test: ${result.codingTest.score}% (${result.codingTest.pass ? 'Passed' : 'Failed'})

Strengths:
- Strong technical foundation
- Good problem-solving skills
- Effective communication

Areas for Improvement:
- Practice more coding problems
- Improve time management
- Enhance technical vocabulary

Recommendations:
- Complete online coding challenges
- Practice system design concepts
- Improve communication skills

Next Steps:
${result.finalStatus === 'Passed' ? 
  '- Eligible for final interview\n- Prepare for technical discussion\n- Review company culture' : 
  '- Retake assessment after 30 days\n- Focus on weak areas\n- Practice regularly'
}
    `;
    
    return feedback;
  }
}

export const assessmentService = new AssessmentService();