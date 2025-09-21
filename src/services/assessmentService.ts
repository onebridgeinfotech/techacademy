// ChatGPT Assessment Service
// Note: In production, you would integrate with OpenAI API
// For now, we'll use mock data for demonstration

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
  achievements: string[];
  experience: string[];
  education: string[];
}

export interface Question {
  id: string;
  question: string;
  type: 'technical' | 'general' | 'resume_based';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface Answer {
  questionId: string;
  answer: string;
  score?: number;
  feedback?: string;
}

export interface RoundResult {
  round: number;
  score: number;
  maxScore: number;
  passed: boolean;
  feedback: string;
  details: {
    correctness: number;
    depth: number;
    clarity: number;
    timeManagement?: number;
    efficiency?: number;
    codeQuality?: number;
  };
}

class AssessmentService {
  private masterPrompt = `You are an AI-powered assessment engine for an EdTech platform. 
You will control the entire flow of a 3-round candidate assessment:

1. Round 1 – Resume Parsing & Objective Test
   - Parse candidate's uploaded resume.
   - Extract skills, projects, certifications, achievements.
   - Generate 3–5 personalized questions from resume.
   - Generate 3–5 random industry questions (Python, Java, .NET, React.js, HTML).
   - Score answers (Correctness, Depth, Clarity).
   - Provide feedback and decide Pass/Fail.

2. Round 2 – Communication & Writing Test
   - Part A: Give a random scenario (customer complaint, missed deadline, crisis management).
   - Candidate writes an email reply → evaluate for Grammar, Tone, Clarity, Professionalism.
   - Part B: Assign a random speaking topic.
   - Candidate uploads audio/video → transcribe (via Whisper API) → evaluate for Fluency, Pronunciation, Confidence, Relevance.
   - Provide feedback and decide Pass/Fail.

3. Round 3 – Logical & Coding Test
   - Ask candidate to select track: Python, Java, .NET, HTML, React.js.
   - Generate one coding or logic challenge for chosen track.
   - Candidate submits code → run tests → evaluate for Correctness, Efficiency, Quality, Time Management.
   - Provide feedback and decide Pass/Fail.

4. Final Result
   - If passed all rounds → Generate personalized success email + admin notification.
   - If failed → Generate personalized rejection email + feedback.
   - Maintain log: Candidate name, round scores, strengths, weaknesses, final result.

Rules:
- Always be professional and encouraging.
- Adapt difficulty to freshers (beginner-friendly).
- Do not skip feedback.
- Use scoring rubrics fairly.
- You fully control progression (no manual approval needed).`;

  async parseResume(resumeText: string): Promise<ResumeData> {
    try {
      // Mock resume parsing - in production, integrate with OpenAI API
      const mockData: ResumeData = {
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        projects: ['E-commerce Website', 'Task Management App', 'Data Analysis Tool'],
        certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
        achievements: ['Dean\'s List', 'Hackathon Winner', 'Open Source Contributor'],
        experience: ['Software Developer at TechCorp', 'Intern at StartupXYZ'],
        education: ['Bachelor of Computer Science', 'Master of Software Engineering']
      };
      
      return mockData;
    } catch (error) {
      console.error('Error parsing resume:', error);
      throw new Error('Failed to parse resume');
    }
  }

  async generateQuestions(round: number, resumeData?: ResumeData, track?: string): Promise<Question[]> {
    try {
      // Mock question generation - in production, integrate with OpenAI API
      if (round === 1) {
        return [
          {
            id: 'q1',
            question: 'Explain the difference between let, const, and var in JavaScript.',
            type: 'technical',
            difficulty: 'medium',
            category: 'JavaScript'
          },
          {
            id: 'q2',
            question: 'What is the purpose of React hooks and how do they work?',
            type: 'technical',
            difficulty: 'medium',
            category: 'React'
          },
          {
            id: 'q3',
            question: 'Describe your experience with database design and normalization.',
            type: 'resume_based',
            difficulty: 'medium',
            category: 'Database'
          },
          {
            id: 'q4',
            question: 'What is the difference between SQL and NoSQL databases?',
            type: 'general',
            difficulty: 'easy',
            category: 'Database'
          },
          {
            id: 'q5',
            question: 'How would you handle a situation where your code is not working as expected?',
            type: 'general',
            difficulty: 'easy',
            category: 'Problem Solving'
          }
        ];
      } else if (round === 2) {
        return [
          {
            id: 'email',
            question: 'Write an email to a client explaining that their project delivery will be delayed by 2 days due to unexpected technical challenges.',
            type: 'communication',
            difficulty: 'medium',
            category: 'Email Writing'
          },
          {
            id: 'speaking',
            question: 'Present your most challenging project and how you overcame the difficulties.',
            type: 'communication',
            difficulty: 'medium',
            category: 'Speaking'
          }
        ];
      } else if (round === 3) {
        return [
          {
            id: 'coding',
            question: `Write a function that takes an array of integers and returns the two numbers that add up to a specific target sum. For example, if the array is [2, 7, 11, 15] and the target is 9, return [2, 7].`,
            type: 'coding',
            difficulty: 'medium',
            category: track || 'Python'
          }
        ];
      }
      
      return [];
    } catch (error) {
      console.error('Error generating questions:', error);
      throw new Error('Failed to generate questions');
    }
  }

  async evaluateAnswers(round: number, questions: Question[], answers: Answer[]): Promise<RoundResult> {
    try {
      // Mock evaluation - in production, integrate with OpenAI API
      const mockScores = [75, 82, 68, 90, 85]; // Random scores for demonstration
      const randomScore = mockScores[Math.floor(Math.random() * mockScores.length)];
      
      const mockFeedback = [
        'Good understanding of the concepts. Consider providing more detailed examples.',
        'Excellent technical knowledge. Well-structured response with clear explanations.',
        'Solid foundation but could benefit from more practical experience.',
        'Outstanding performance. Demonstrates strong problem-solving skills.',
        'Good attempt. Focus on improving code efficiency and best practices.'
      ];
      
      const randomFeedback = mockFeedback[Math.floor(Math.random() * mockFeedback.length)];
      
      return {
        round,
        score: randomScore,
        maxScore: 100,
        passed: randomScore >= (round === 1 ? 60 : 70),
        feedback: randomFeedback,
        details: {
          correctness: Math.floor(randomScore * 0.4),
          depth: Math.floor(randomScore * 0.3),
          clarity: Math.floor(randomScore * 0.3)
        }
      };
    } catch (error) {
      console.error('Error evaluating answers:', error);
      throw new Error('Failed to evaluate answers');
    }
  }

  async transcribeAudio(audioFile: File): Promise<string> {
    try {
      // Mock transcription - in production, integrate with Whisper API
      return 'This is a mock transcription of the audio recording. In production, this would be processed by OpenAI Whisper API.';
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async generateFinalResult(assessmentData: AssessmentData): Promise<{
    success: boolean;
    emailContent: string;
    adminNotification: string;
    analytics: any;
  }> {
    try {
      const allPassed = assessmentData.scores.round1! > 60 && 
                       assessmentData.scores.round2! > 70 && 
                       assessmentData.scores.round3! > 70;

      // Mock final result generation - in production, integrate with OpenAI API
      const emailContent = allPassed 
        ? `Congratulations ${assessmentData.candidateName}! You have successfully passed the TechAcademy Assessment. Your scores: Round 1: ${assessmentData.scores.round1}%, Round 2: ${assessmentData.scores.round2}%, Round 3: ${assessmentData.scores.round3}%. We will contact you soon with next steps.`
        : `Thank you for completing the TechAcademy Assessment, ${assessmentData.candidateName}. While you didn't pass this time, we encourage you to review the feedback and consider reapplying in the future. Your scores: Round 1: ${assessmentData.scores.round1}%, Round 2: ${assessmentData.scores.round2}%, Round 3: ${assessmentData.scores.round3}%.`;

      const adminNotification = `Assessment completed for ${assessmentData.candidateName} (${assessmentData.candidateEmail}). Result: ${allPassed ? 'PASSED' : 'FAILED'}. Scores: R1: ${assessmentData.scores.round1}%, R2: ${assessmentData.scores.round2}%, R3: ${assessmentData.scores.round3}%.`;
      
      return {
        success: allPassed,
        emailContent,
        adminNotification,
        analytics: {
          totalCandidates: 1,
          passRate: allPassed ? 100 : 0,
          averageScore: Math.round((assessmentData.scores.round1! + assessmentData.scores.round2! + assessmentData.scores.round3!) / 3)
        }
      };
    } catch (error) {
      console.error('Error generating final result:', error);
      throw new Error('Failed to generate final result');
    }
  }

  async runCodeTests(code: string, language: string, testCases: any[]): Promise<{
    passed: number;
    total: number;
    results: any[];
  }> {
    try {
      // Mock code execution - in production, integrate with Judge0 API
      const mockResults = {
        passed: Math.floor(Math.random() * testCases.length) + 1,
        total: testCases.length,
        results: [{
          stdout: 'Mock execution result',
          stderr: '',
          time: '0.1s',
          memory: '1024KB'
        }]
      };
      
      return mockResults;
    } catch (error) {
      console.error('Error running code tests:', error);
      throw new Error('Failed to run code tests');
    }
  }

  private getLanguageId(language: string): number {
    const languageMap: { [key: string]: number } = {
      'python': 71,
      'java': 62,
      'javascript': 63,
      'csharp': 51,
      'cpp': 54,
      'c': 50
    };
    return languageMap[language.toLowerCase()] || 71;
  }
}

export const assessmentService = new AssessmentService();
