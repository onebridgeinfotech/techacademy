// Chatbot Service for TechAcademy
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'error';
}

export interface ChatbotConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface ChatbotResponse {
  message: string;
  suggestions?: string[];
  error?: string;
}

class ChatbotService {
  private config: ChatbotConfig;
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 500
    };
  }

  // Update API key
  updateApiKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }

  // Get conversation history
  getConversationHistory(): ChatMessage[] {
    return this.conversationHistory;
  }

  // Clear conversation
  clearConversation() {
    this.conversationHistory = [];
  }

  // Add message to history
  private addMessage(content: string, role: 'user' | 'assistant', type: 'text' | 'suggestion' | 'error' = 'text'): ChatMessage {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
      type
    };
    this.conversationHistory.push(message);
    return message;
  }

  // Generate system prompt for TechAcademy
  private getSystemPrompt(): string {
    return `You are TechAcademy AI Assistant, a helpful chatbot for a technology education platform. Your role is to:

1. **Course Information**: Provide details about our programs:
   - Digital Transformation (6 months, Free)
   - Cloud & DevOps (7 months, ₹15,999)
   - Cyber Security (8 months, ₹18,999)
   - Project Management (5 months, ₹12,999)

2. **Admissions**: Help with application process, requirements, and enrollment
3. **Technical Support**: Answer questions about courses, assessments, and learning paths
4. **General Support**: Provide information about internships, placements, and mentorship

Guidelines:
- Be friendly, professional, and encouraging
- Provide accurate information about TechAcademy
- If you don't know something, admit it and suggest contacting support
- Keep responses concise but helpful
- Always maintain a positive, educational tone
- Suggest relevant courses or next steps when appropriate

Current TechAcademy features:
- 3-round assessment system (Resume, Communication, Coding)
- Expert mentors with 10+ years experience
- Industry certifications
- Flexible learning options
- Global opportunities
- 95% success rate with 10,000+ students trained`;
  }

  // Send message to LLM
  async sendMessage(userMessage: string): Promise<ChatbotResponse> {
    try {
      if (!this.config.apiKey) {
        return {
          message: "Please configure your API key first. Go to settings to add your OpenAI API key.",
          error: "API key not configured"
        };
      }

      // Add user message to history
      this.addMessage(userMessage, 'user');

      // Prepare messages for API
      const messages = [
        { role: 'system', content: this.getSystemPrompt() },
        ...this.conversationHistory.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: messages,
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from AI');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Add AI response to history
      this.addMessage(aiResponse, 'assistant');

      // Generate suggestions based on the conversation
      const suggestions = this.generateSuggestions(userMessage, aiResponse);

      return {
        message: aiResponse,
        suggestions: suggestions
      };

    } catch (error: any) {
      console.error('Chatbot error:', error);
      
      // Add error message to history
      this.addMessage(`Error: ${error.message}`, 'assistant', 'error');

      return {
        message: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team.",
        error: error.message
      };
    }
  }

  // Generate contextual suggestions
  private generateSuggestions(userMessage: string, aiResponse: string): string[] {
    const suggestions: string[] = [];
    const message = userMessage.toLowerCase();
    const response = aiResponse.toLowerCase();

    // Course-related suggestions
    if (message.includes('course') || message.includes('program') || message.includes('learn')) {
      suggestions.push('Tell me about Digital Transformation program');
      suggestions.push('What are the Cloud & DevOps course details?');
      suggestions.push('How do I apply for Cyber Security program?');
    }

    // Assessment-related suggestions
    if (message.includes('assessment') || message.includes('test') || message.includes('exam')) {
      suggestions.push('How does the 3-round assessment work?');
      suggestions.push('What should I prepare for the coding test?');
      suggestions.push('Tell me about the resume evaluation process');
    }

    // Application-related suggestions
    if (message.includes('apply') || message.includes('enroll') || message.includes('admission')) {
      suggestions.push('What documents do I need to apply?');
      suggestions.push('How long does the application process take?');
      suggestions.push('What are the eligibility requirements?');
    }

    // General suggestions if no specific context
    if (suggestions.length === 0) {
      suggestions.push('What programs do you offer?');
      suggestions.push('How do I start the assessment?');
      suggestions.push('Tell me about your mentors');
      suggestions.push('What are the course fees?');
    }

    return suggestions.slice(0, 3); // Return max 3 suggestions
  }

  // Get quick responses for common queries
  getQuickResponses(): { label: string; message: string }[] {
    return [
      { label: 'Course Info', message: 'Tell me about your programs' },
      { label: 'Assessment', message: 'How does the assessment work?' },
      { label: 'Apply Now', message: 'How do I apply for a program?' },
      { label: 'Fees', message: 'What are the course fees?' },
      { label: 'Mentors', message: 'Tell me about your expert mentors' },
      { label: 'Support', message: 'I need help with my application' }
    ];
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.config.apiKey;
  }

  // Get configuration
  getConfig(): ChatbotConfig {
    return { ...this.config };
  }

  // Update configuration
  updateConfig(newConfig: Partial<ChatbotConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}

// Export singleton instance
export const chatbotService = new ChatbotService();
export default chatbotService;
