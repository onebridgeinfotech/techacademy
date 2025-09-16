// Email Service for Program Applications
// This would integrate with your email service provider (SendGrid, AWS SES, etc.)

export interface ApplicationData {
  programType: 'free' | 'paid';
  selectedProgram: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    aadhar: string;
    pan: string;
  };
  education: {
    highestQualification: string;
    fieldOfStudy: string;
    university: string;
    graduationYear: string;
    percentage: string;
    additionalEducation: string;
  };
  socialMedia: {
    linkedin: string;
    instagram: string;
    twitter: string;
    facebook: string;
    portfolio: string;
  };
  paymentInfo: {
    amount: number;
    gstAmount: number;
    totalAmount: number;
    paymentMethod: string;
    termsAccepted: boolean;
  };
}

export const sendApplicationConfirmation = async (data: ApplicationData): Promise<boolean> => {
  try {
    // This would be replaced with actual email service integration
    console.log('Sending application confirmation email to:', data.personalInfo.email);
    
    const emailContent = {
      to: data.personalInfo.email,
      subject: `Application Confirmation - ${data.selectedProgram}`,
      html: generateConfirmationEmail(data)
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const sendInterviewSchedule = async (data: ApplicationData): Promise<boolean> => {
  try {
    console.log('Sending interview schedule email to:', data.personalInfo.email);
    
    const emailContent = {
      to: data.personalInfo.email,
      subject: 'Interview Schedule - TechAcademy Program',
      html: generateInterviewScheduleEmail(data)
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Interview schedule email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send interview schedule email:', error);
    return false;
  }
};

const generateConfirmationEmail = (data: ApplicationData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Application Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .program-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        .interview-steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .step { display: flex; align-items: center; margin: 10px 0; padding: 10px; background: #f1f5f9; border-radius: 5px; }
        .step-number { background: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; }
        .cta-button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Application Received!</h1>
          <p>Thank you for applying to TechAcademy</p>
        </div>
        
        <div class="content">
          <h2>Dear ${data.personalInfo.firstName} ${data.personalInfo.lastName},</h2>
          
          <p>We're excited to inform you that your application for our <strong>${data.selectedProgram}</strong> program has been successfully received!</p>
          
          <div class="program-info">
            <h3>Program Details:</h3>
            <p><strong>Program Type:</strong> ${data.programType === 'free' ? 'Free Program' : 'Paid Program'}</p>
            <p><strong>Selected Program:</strong> ${data.selectedProgram}</p>
            ${data.programType === 'paid' ? `
              <p><strong>Amount:</strong> ₹${data.paymentInfo.amount.toLocaleString()}</p>
              <p><strong>GST (18%):</strong> ₹${data.paymentInfo.gstAmount.toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ₹${data.paymentInfo.totalAmount.toLocaleString()}</p>
            ` : ''}
          </div>
          
          <h3>What Happens Next?</h3>
          <p>Our team will review your application within 48 hours. You will receive an email with your interview schedule and next steps.</p>
          
          <div class="interview-steps">
            <h3>Interview Process (3-4 Rounds):</h3>
            <div class="step">
              <div class="step-number">1</div>
              <div>
                <strong>Assessment Test</strong><br>
                <small>Technical & Logical evaluation</small>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div>
                <strong>Communication Test</strong><br>
                <small>Written & Speaking skills assessment</small>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div>
                <strong>Logical Reasoning Test</strong><br>
                <small>Problem-solving and analytical skills</small>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div>
                <strong>Face-to-Face Interview</strong><br>
                <small>Final interview with our panel</small>
              </div>
            </div>
          </div>
          
          <p><strong>Program Assignment:</strong> Based on your performance in all rounds, we will assign you to the most suitable internship program.</p>
          
          <div style="text-align: center;">
            <a href="#" class="cta-button">Check Application Status</a>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us at <strong>info@techacademy.com</strong> or call us at <strong>+1 (555) 123-4567</strong>.</p>
          
          <p>Best regards,<br>
          <strong>TechAcademy Team</strong></p>
        </div>
        
        <div class="footer">
          <p>© 2024 TechAcademy. All rights reserved.</p>
          <p>123 Tech Street, Innovation District, San Francisco, CA 94105</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateInterviewScheduleEmail = (data: ApplicationData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Interview Schedule</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .schedule { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .interview-round { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 10px 0; }
        .round-header { font-weight: bold; color: #1f2937; margin-bottom: 10px; }
        .round-details { color: #6b7280; font-size: 14px; }
        .cta-button { background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📅 Interview Schedule</h1>
          <p>Your interview process has been scheduled</p>
        </div>
        
        <div class="content">
          <h2>Dear ${data.personalInfo.firstName} ${data.personalInfo.lastName},</h2>
          
          <p>Congratulations! Your application has been reviewed and approved. We're excited to schedule your interview process for the <strong>${data.selectedProgram}</strong> program.</p>
          
          <div class="schedule">
            <h3>Your Interview Schedule:</h3>
            
            <div class="interview-round">
              <div class="round-header">Round 1: Assessment Test</div>
              <div class="round-details">
                <strong>Date:</strong> [To be scheduled within 48 hours]<br>
                <strong>Duration:</strong> 90 minutes<br>
                <strong>Format:</strong> Online test<br>
                <strong>Topics:</strong> Technical knowledge, logical reasoning, basic programming concepts
              </div>
            </div>
            
            <div class="interview-round">
              <div class="round-header">Round 2: Communication Test</div>
              <div class="round-details">
                <strong>Date:</strong> [To be scheduled after Round 1]<br>
                <strong>Duration:</strong> 60 minutes<br>
                <strong>Format:</strong> Online video call<br>
                <strong>Topics:</strong> Written communication, speaking skills, presentation abilities
              </div>
            </div>
            
            <div class="interview-round">
              <div class="round-header">Round 3: Logical Reasoning Test</div>
              <div class="round-details">
                <strong>Date:</strong> [To be scheduled after Round 2]<br>
                <strong>Duration:</strong> 45 minutes<br>
                <strong>Format:</strong> Online test<br>
                <strong>Topics:</strong> Problem-solving, analytical thinking, pattern recognition
              </div>
            </div>
            
            <div class="interview-round">
              <div class="round-header">Round 4: Face-to-Face Interview</div>
              <div class="round-details">
                <strong>Date:</strong> [To be scheduled after Round 3]<br>
                <strong>Duration:</strong> 30-45 minutes<br>
                <strong>Format:</strong> Video call with panel<br>
                <strong>Topics:</strong> Final assessment, program fit, career goals discussion
              </div>
            </div>
          </div>
          
          <p><strong>Important Notes:</strong></p>
          <ul>
            <li>You will receive individual calendar invites for each round</li>
            <li>Please ensure you have a stable internet connection and a quiet environment</li>
            <li>All rounds must be completed within 2 weeks of the first round</li>
            <li>Results will be communicated within 7 days of completing all rounds</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="#" class="cta-button">View Full Schedule</a>
          </div>
          
          <p>If you need to reschedule any round, please contact us at least 24 hours in advance at <strong>info@techacademy.com</strong>.</p>
          
          <p>Good luck with your interviews!</p>
          
          <p>Best regards,<br>
          <strong>TechAcademy Admissions Team</strong></p>
        </div>
        
        <div class="footer">
          <p>© 2024 TechAcademy. All rights reserved.</p>
          <p>123 Tech Street, Innovation District, San Francisco, CA 94105</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

