// Authentication Service for Assessment System
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  profileComplete: boolean;
  assessmentCompleted: boolean;
  assessmentScore?: number;
  createdAt: string;
  lastLoginAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  resume?: File;
  skills?: string[];
  experience?: string[];
  education?: string[];
  projects?: string[];
  certifications?: string[];
}

class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  constructor() {
    // Load user from localStorage on initialization
    this.loadUserFromStorage();
  }

  async signup(data: SignupData): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Validate input
      if (!data.name || !data.email || !data.password) {
        return { success: false, error: 'All required fields must be filled' };
      }

      if (!this.isValidEmail(data.email)) {
        return { success: false, error: 'Invalid email format' };
      }

      if (data.password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long' };
      }

      // Check if user already exists
      const existingUser = this.getUserByEmail(data.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: this.generateUserId(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        location: data.location,
        profileComplete: false,
        assessmentCompleted: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      // Save user to localStorage (in production, this would be an API call)
      this.saveUser(newUser);
      this.setCurrentUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Failed to create account' };
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const user = this.getUserByEmail(credentials.email);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // In a real app, you'd verify the password hash
      // For now, we'll just check if the user exists
      this.setCurrentUser(user);
      this.updateLastLogin(user.id);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  }

  async updateProfile(profileData: ProfileData): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'User not authenticated' };
      }

      // Update user profile
      const updatedUser: User = {
        ...this.currentUser,
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        profileComplete: this.isProfileComplete(profileData)
      };

      this.saveUser(updatedUser);
      this.setCurrentUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Failed to update profile' };
    }
  }

  async uploadResume(resumeFile: File): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'User not authenticated' };
      }

      // Validate file
      if (!this.isValidResumeFile(resumeFile)) {
        return { success: false, error: 'Invalid file format. Please upload PDF, DOC, or DOCX files.' };
      }

      if (resumeFile.size > 10 * 1024 * 1024) { // 10MB limit
        return { success: false, error: 'File size too large. Maximum size is 10MB.' };
      }

      // In a real app, you'd upload to a cloud storage service
      // For now, we'll just mark the profile as complete
      const updatedUser: User = {
        ...this.currentUser,
        profileComplete: true
      };

      this.saveUser(updatedUser);
      this.setCurrentUser(updatedUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to upload resume' };
    }
  }

  canStartAssessment(): boolean {
    return this.currentUser?.profileComplete === true && !this.currentUser?.assessmentCompleted;
  }

  hasCompletedAssessment(): boolean {
    return this.currentUser?.assessmentCompleted === true;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  private setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private loadUserFromStorage(): void {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
  }

  private saveUser(user: User): void {
    try {
      const users = this.getAllUsers();
      const existingIndex = users.findIndex(u => u.id === user.id);
      
      if (existingIndex >= 0) {
        users[existingIndex] = user;
      } else {
        users.push(user);
      }
      
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  private getAllUsers(): User[] {
    try {
      const stored = localStorage.getItem('users');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  }

  private getUserByEmail(email: string): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.email === email) || null;
  }

  private updateLastLogin(userId: string): void {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex >= 0) {
      users[userIndex].lastLoginAt = new Date().toISOString();
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  private generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidResumeFile(file: File): boolean {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return allowedTypes.includes(file.type);
  }

  private isProfileComplete(profileData: ProfileData): boolean {
    return !!(
      profileData.name &&
      profileData.email &&
      profileData.phone &&
      profileData.location
    );
  }
}

export const authService = new AuthService();

