// Resume Parser Service
// Note: In production, you would integrate with PDF parsing libraries
// For now, we'll use mock data for demonstration

export interface ParsedResume {
  text: string;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  certifications: string[];
  achievements: string[];
  contact: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
}

class ResumeParserService {
  async parseResume(file: File): Promise<ParsedResume> {
    try {
      // Mock resume parsing - in production, integrate with PDF parsing libraries
      const mockText = `John Doe
Software Developer
john.doe@email.com
(555) 123-4567
New York, NY

EXPERIENCE
Software Developer at TechCorp (2020-2023)
- Developed web applications using React and Node.js
- Implemented RESTful APIs and database design
- Collaborated with cross-functional teams

EDUCATION
Bachelor of Computer Science
University of Technology (2016-2020)

SKILLS
JavaScript, React, Node.js, Python, SQL, AWS, Git

PROJECTS
E-commerce Website - Built using React and Node.js
Task Management App - Full-stack application with MongoDB
Data Analysis Tool - Python-based data visualization`;

      const parsedData = this.extractStructuredData(mockText);
      
      return {
        text: mockText,
        ...parsedData
      };
    } catch (error) {
      console.error('Error parsing resume:', error);
      throw new Error('Failed to parse resume');
    }
  }

  // Mock parsing methods - in production, integrate with PDF parsing libraries
  private async parsePDF(file: File): Promise<string> {
    return 'Mock PDF content';
  }

  private async parseWord(file: File): Promise<string> {
    return 'Mock Word document content';
  }

  private async parseText(file: File): Promise<string> {
    return 'Mock text file content';
  }

  private extractStructuredData(text: string): Omit<ParsedResume, 'text'> {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return {
      skills: this.extractSkills(text),
      experience: this.extractExperience(text),
      education: this.extractEducation(text),
      projects: this.extractProjects(text),
      certifications: this.extractCertifications(text),
      achievements: this.extractAchievements(text),
      contact: this.extractContact(text)
    };
  }

  private extractSkills(text: string): string[] {
    const skillKeywords = [
      'JavaScript', 'Python', 'Java', 'C++', 'C#', 'React', 'Angular', 'Vue',
      'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'ASP.NET',
      'HTML', 'CSS', 'Bootstrap', 'Tailwind', 'SASS', 'LESS',
      'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins',
      'Git', 'GitHub', 'GitLab', 'JIRA', 'Confluence',
      'Agile', 'Scrum', 'DevOps', 'CI/CD', 'Microservices'
    ];

    const foundSkills: string[] = [];
    const lowerText = text.toLowerCase();

    skillKeywords.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });

    return Array.from(new Set(foundSkills));
  }

  private extractExperience(text: string): string[] {
    const experienceRegex = /(?:experience|work history|employment|professional experience)/i;
    const lines = text.split('\n');
    const experience: string[] = [];
    let inExperienceSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (experienceRegex.test(line)) {
        inExperienceSection = true;
        continue;
      }
      
      if (inExperienceSection) {
        if (line.match(/^\d{4}/) || line.match(/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)) {
          experience.push(line);
        } else if (line.length > 10 && !line.match(/^(education|skills|certifications|projects)/i)) {
          experience.push(line);
        }
      }
    }

    return experience;
  }

  private extractEducation(text: string): string[] {
    const educationRegex = /(?:education|academic|qualification|degree)/i;
    const lines = text.split('\n');
    const education: string[] = [];
    let inEducationSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (educationRegex.test(line)) {
        inEducationSection = true;
        continue;
      }
      
      if (inEducationSection) {
        if (line.match(/bachelor|master|phd|diploma|certificate|degree/i)) {
          education.push(line);
        }
      }
    }

    return education;
  }

  private extractProjects(text: string): string[] {
    const projectRegex = /(?:projects|portfolio|work samples)/i;
    const lines = text.split('\n');
    const projects: string[] = [];
    let inProjectSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (projectRegex.test(line)) {
        inProjectSection = true;
        continue;
      }
      
      if (inProjectSection) {
        if (line.length > 10 && !line.match(/^(skills|experience|education|certifications)/i)) {
          projects.push(line);
        }
      }
    }

    return projects;
  }

  private extractCertifications(text: string): string[] {
    const certRegex = /(?:certifications|certificates|licenses)/i;
    const lines = text.split('\n');
    const certifications: string[] = [];
    let inCertSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (certRegex.test(line)) {
        inCertSection = true;
        continue;
      }
      
      if (inCertSection) {
        if (line.match(/certified|certificate|license|aws|azure|google|microsoft/i)) {
          certifications.push(line);
        }
      }
    }

    return certifications;
  }

  private extractAchievements(text: string): string[] {
    const achievementRegex = /(?:achievements|awards|honors|recognition)/i;
    const lines = text.split('\n');
    const achievements: string[] = [];
    let inAchievementSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (achievementRegex.test(line)) {
        inAchievementSection = true;
        continue;
      }
      
      if (inAchievementSection) {
        if (line.length > 10 && !line.match(/^(skills|experience|education|certifications|projects)/i)) {
          achievements.push(line);
        }
      }
    }

    return achievements;
  }

  private extractContact(text: string): ParsedResume['contact'] {
    const contact: ParsedResume['contact'] = {};
    
    // Extract email
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) {
      contact.email = emailMatch[1];
    }
    
    // Extract phone
    const phoneRegex = /(\+?[\d\s\-\(\)]{10,})/;
    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) {
      contact.phone = phoneMatch[1];
    }
    
    // Extract name (usually at the beginning)
    const lines = text.split('\n').slice(0, 5);
    for (const line of lines) {
      if (line.length > 2 && line.length < 50 && !line.match(/@|phone|email|address/i)) {
        contact.name = line;
        break;
      }
    }
    
    return contact;
  }
}

export const resumeParserService = new ResumeParserService();
