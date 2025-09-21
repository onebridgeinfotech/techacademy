// Notification Service for Assessment Results
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface NotificationData {
  candidateName: string;
  candidateEmail: string;
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
  strengths: string[];
  weaknesses: string[];
  passed: boolean;
  adminEmail: string;
}

export interface SlackNotification {
  text: string;
  attachments: Array<{
    color: string;
    fields: Array<{
      title: string;
      value: string;
      short: boolean;
    }>;
  }>;
}

class NotificationService {
  private emailService: 'sendgrid' | 'ses' | 'gmail' = 'sendgrid';
  private slackWebhookUrl?: string;

  constructor() {
    this.emailService = (process.env.REACT_APP_EMAIL_SERVICE as any) || 'sendgrid';
    this.slackWebhookUrl = process.env.REACT_APP_SLACK_WEBHOOK_URL;
  }

  async sendCandidateEmail(data: NotificationData): Promise<boolean> {
    try {
      const template = this.generateCandidateEmailTemplate(data);
      
      switch (this.emailService) {
        case 'sendgrid':
          return await this.sendWithSendGrid(data.candidateEmail, template);
        case 'ses':
          return await this.sendWithSES(data.candidateEmail, template);
        case 'gmail':
          return await this.sendWithGmail(data.candidateEmail, template);
        default:
          throw new Error('Invalid email service');
      }
    } catch (error) {
      console.error('Error sending candidate email:', error);
      return false;
    }
  }

  async sendAdminNotification(data: NotificationData): Promise<boolean> {
    try {
      const template = this.generateAdminEmailTemplate(data);
      
      // Send email to admin
      const emailSent = await this.sendEmail(data.adminEmail, template);
      
      // Send Slack notification if configured
      if (this.slackWebhookUrl) {
        await this.sendSlackNotification(data);
      }
      
      return emailSent;
    } catch (error) {
      console.error('Error sending admin notification:', error);
      return false;
    }
  }

  private generateCandidateEmailTemplate(data: NotificationData): EmailTemplate {
    const { candidateName, scores, feedback, strengths, weaknesses, passed } = data;
    
    const subject = passed 
      ? `🎉 Congratulations! You've passed the TechAcademy Assessment`
      : `Thank you for completing the TechAcademy Assessment`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .score-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .score { font-size: 24px; font-weight: bold; color: #4CAF50; }
          .feedback { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 10px 0; }
          .strengths { color: #4CAF50; }
          .weaknesses { color: #f44336; }
          .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${passed ? '🎉 Congratulations!' : 'Assessment Complete'}</h1>
            <p>Dear ${candidateName},</p>
          </div>
          
          <div class="content">
            ${passed ? `
              <p>We're excited to inform you that you have successfully passed the TechAcademy Assessment!</p>
              <p>Your performance across all rounds demonstrates strong technical skills and communication abilities.</p>
            ` : `
              <p>Thank you for completing the TechAcademy Assessment. While you didn't pass this time, we appreciate your effort and encourage you to continue learning.</p>
            `}
            
            <h3>Your Assessment Results:</h3>
            <div class="score-card">
              <h4>Round 1: Technical Assessment</h4>
              <div class="score">${scores.round1 || 0}%</div>
              <div class="feedback">${feedback.round1 || 'No feedback available'}</div>
            </div>
            
            <div class="score-card">
              <h4>Round 2: Communication Assessment</h4>
              <div class="score">${scores.round2 || 0}%</div>
              <div class="feedback">${feedback.round2 || 'No feedback available'}</div>
            </div>
            
            <div class="score-card">
              <h4>Round 3: Coding Assessment</h4>
              <div class="score">${scores.round3 || 0}%</div>
              <div class="feedback">${feedback.round3 || 'No feedback available'}</div>
            </div>
            
            ${strengths.length > 0 ? `
              <h4>Your Strengths:</h4>
              <ul class="strengths">
                ${strengths.map(strength => `<li>${strength}</li>`).join('')}
              </ul>
            ` : ''}
            
            ${weaknesses.length > 0 ? `
              <h4>Areas for Improvement:</h4>
              <ul class="weaknesses">
                ${weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
              </ul>
            ` : ''}
            
            ${passed ? `
              <p>Next steps will be communicated to you within 2-3 business days.</p>
              <a href="#" class="button">View Full Results</a>
            ` : `
              <p>We encourage you to review the feedback and consider reapplying in the future.</p>
              <a href="#" class="button">Learn More</a>
            `}
          </div>
          
          <div class="footer">
            <p>Best regards,<br>TechAcademy Team</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      ${subject}
      
      Dear ${candidateName},
      
      ${passed ? 
        'Congratulations! You have successfully passed the TechAcademy Assessment.' :
        'Thank you for completing the TechAcademy Assessment.'
      }
      
      Your Results:
      - Round 1 (Technical): ${scores.round1 || 0}%
      - Round 2 (Communication): ${scores.round2 || 0}%
      - Round 3 (Coding): ${scores.round3 || 0}%
      
      ${strengths.length > 0 ? `Strengths: ${strengths.join(', ')}` : ''}
      ${weaknesses.length > 0 ? `Areas for Improvement: ${weaknesses.join(', ')}` : ''}
      
      ${passed ? 
        'Next steps will be communicated within 2-3 business days.' :
        'We encourage you to review the feedback and consider reapplying.'
      }
      
      Best regards,
      TechAcademy Team
    `;

    return { subject, html, text };
  }

  private generateAdminEmailTemplate(data: NotificationData): EmailTemplate {
    const { candidateName, candidateEmail, scores, passed } = data;
    
    const subject = `Assessment Result: ${candidateName} - ${passed ? 'PASSED' : 'FAILED'}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${passed ? '#4CAF50' : '#f44336'}; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .score-card { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #4CAF50; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Assessment Result: ${passed ? 'PASSED' : 'FAILED'}</h2>
            <p>Candidate: ${candidateName}</p>
          </div>
          
          <div class="content">
            <h3>Candidate Information:</h3>
            <p><strong>Name:</strong> ${candidateName}</p>
            <p><strong>Email:</strong> ${candidateEmail}</p>
            <p><strong>Status:</strong> ${passed ? 'PASSED' : 'FAILED'}</p>
            
            <h3>Assessment Scores:</h3>
            <div class="score-card">
              <strong>Round 1 (Technical):</strong> ${scores.round1 || 0}%
            </div>
            <div class="score-card">
              <strong>Round 2 (Communication):</strong> ${scores.round2 || 0}%
            </div>
            <div class="score-card">
              <strong>Round 3 (Coding):</strong> ${scores.round3 || 0}%
            </div>
            
            <p><strong>Action Required:</strong> ${passed ? 'Schedule next steps' : 'Send rejection feedback'}</p>
          </div>
          
          <div class="footer">
            <p>TechAcademy Assessment System</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      ${subject}
      
      Candidate: ${candidateName}
      Email: ${candidateEmail}
      Status: ${passed ? 'PASSED' : 'FAILED'}
      
      Scores:
      - Round 1 (Technical): ${scores.round1 || 0}%
      - Round 2 (Communication): ${scores.round2 || 0}%
      - Round 3 (Coding): ${scores.round3 || 0}%
      
      Action Required: ${passed ? 'Schedule next steps' : 'Send rejection feedback'}
    `;

    return { subject, html, text };
  }

  private async sendWithSendGrid(email: string, template: EmailTemplate): Promise<boolean> {
    // Mock email sending - in production, integrate with SendGrid API
    console.log('Mock email sent to:', email);
    console.log('Subject:', template.subject);
    console.log('Content:', template.text);
    return true;
  }

  private async sendWithSES(email: string, template: EmailTemplate): Promise<boolean> {
    // Mock email sending - in production, integrate with AWS SES
    console.log('Mock SES email sent to:', email);
    return true;
  }

  private async sendWithGmail(email: string, template: EmailTemplate): Promise<boolean> {
    // Mock email sending - in production, integrate with Gmail API
    console.log('Mock Gmail sent to:', email);
    return true;
  }

  private async sendEmail(email: string, template: EmailTemplate): Promise<boolean> {
    switch (this.emailService) {
      case 'sendgrid':
        return await this.sendWithSendGrid(email, template);
      case 'ses':
        return await this.sendWithSES(email, template);
      case 'gmail':
        return await this.sendWithGmail(email, template);
      default:
        return false;
    }
  }

  private async sendSlackNotification(data: NotificationData): Promise<boolean> {
    // Mock Slack notification - in production, integrate with Slack webhook
    console.log('Mock Slack notification sent:', data.candidateName, data.passed ? 'PASSED' : 'FAILED');
    return true;
  }

  async sendBulkNotifications(notifications: NotificationData[]): Promise<{
    successful: number;
    failed: number;
    errors: string[];
  }> {
    const results = {
      successful: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const notification of notifications) {
      try {
        const candidateSent = await this.sendCandidateEmail(notification);
        const adminSent = await this.sendAdminNotification(notification);
        
        if (candidateSent && adminSent) {
          results.successful++;
        } else {
          results.failed++;
          results.errors.push(`Failed to send notifications for ${notification.candidateName}`);
        }
      } catch (error) {
        results.failed++;
        results.errors.push(`Error sending notifications for ${notification.candidateName}: ${error}`);
      }
    }

    return results;
  }
}

export const notificationService = new NotificationService();
