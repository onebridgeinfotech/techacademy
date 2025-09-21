// Coding Sandbox Service
export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface CodeResult {
  success: boolean;
  output: string;
  error?: string;
  testResults: {
    passed: number;
    total: number;
    details: Array<{
      testCase: TestCase;
      passed: boolean;
      actualOutput: string;
      expectedOutput: string;
    }>;
  };
  executionTime: number;
  memoryUsage: number;
}

export interface LanguageConfig {
  id: string;
  name: string;
  extension: string;
  template: string;
  testCases: TestCase[];
}

class CodingSandboxService {
  private languageConfigs: { [key: string]: LanguageConfig } = {
    python: {
      id: 'python',
      name: 'Python',
      extension: 'py',
      template: `def solution():
    # Write your code here
    pass

# Test your solution
if __name__ == "__main__":
    result = solution()
    print(result)`,
      testCases: [
        {
          input: '5',
          expected: '25',
          description: 'Test with input 5'
        },
        {
          input: '10',
          expected: '100',
          description: 'Test with input 10'
        }
      ]
    },
    java: {
      id: 'java',
      name: 'Java',
      extension: 'java',
      template: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello World!");
    }
}`,
      testCases: [
        {
          input: '5',
          expected: '25',
          description: 'Test with input 5'
        }
      ]
    },
    javascript: {
      id: 'javascript',
      name: 'JavaScript',
      extension: 'js',
      template: `function solution() {
    // Write your code here
    return "Hello World!";
}

// Test your solution
console.log(solution());`,
      testCases: [
        {
          input: '5',
          expected: '25',
          description: 'Test with input 5'
        }
      ]
    },
    csharp: {
      id: 'csharp',
      name: 'C#',
      extension: 'cs',
      template: `using System;

class Program {
    static void Main() {
        // Write your code here
        Console.WriteLine("Hello World!");
    }
}`,
      testCases: [
        {
          input: '5',
          expected: '25',
          description: 'Test with input 5'
        }
      ]
    },
    cpp: {
      id: 'cpp',
      name: 'C++',
      extension: 'cpp',
      template: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello World!" << endl;
    return 0;
}`,
      testCases: [
        {
          input: '5',
          expected: '25',
          description: 'Test with input 5'
        }
      ]
    }
  };

  async runCode(
    code: string, 
    language: string, 
    testCases?: TestCase[]
  ): Promise<CodeResult> {
    const startTime = Date.now();
    
    try {
      // Mock code execution - in production, integrate with Judge0 API
      const mockResult = {
        success: Math.random() > 0.3, // 70% success rate
        output: 'Mock execution output\nResult: Success',
        error: Math.random() > 0.8 ? 'Mock compilation error' : undefined,
        testResults: {
          passed: Math.floor(Math.random() * (testCases?.length || 3)) + 1,
          total: testCases?.length || 3,
          details: testCases?.map(tc => ({
            testCase: tc,
            passed: Math.random() > 0.3,
            actualOutput: 'Mock output',
            expectedOutput: tc.expected
          })) || []
        },
        memoryUsage: Math.floor(Math.random() * 1000) + 500
      };
      
      const executionTime = Date.now() - startTime;
      
      return {
        success: mockResult.success,
        output: mockResult.output,
        error: mockResult.error,
        testResults: mockResult.testResults,
        executionTime,
        memoryUsage: mockResult.memoryUsage
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        testResults: {
          passed: 0,
          total: testCases?.length || 0,
          details: []
        },
        executionTime: Date.now() - startTime,
        memoryUsage: 0
      };
    }
  }

  private async executeWithJudge0(
    code: string, 
    language: string, 
    testCases?: TestCase[]
  ): Promise<any> {
    // Mock Judge0 execution - in production, integrate with Judge0 API
    return {
      success: true,
      output: 'Mock execution output',
      testResults: {
        passed: testCases?.length || 0,
        total: testCases?.length || 0,
        details: []
      },
      memoryUsage: 1024
    };
  }

  private async runTestCases(
    code: string, 
    language: string, 
    testCases: TestCase[]
  ): Promise<any> {
    const results = [];
    let passed = 0;

    for (const testCase of testCases) {
      try {
        const result = await this.executeWithJudge0(code, language, [testCase]);
        const passed = result.success && result.output.trim() === testCase.expected.trim();
        
        results.push({
          testCase,
          passed,
          actualOutput: result.output,
          expectedOutput: testCase.expected
        });

        if (passed) {
          passed++;
        }
      } catch (error) {
        results.push({
          testCase,
          passed: false,
          actualOutput: '',
          expectedOutput: testCase.expected
        });
      }
    }

    return {
      passed,
      total: testCases.length,
      details: results
    };
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

  getLanguageConfig(language: string): LanguageConfig {
    return this.languageConfigs[language] || this.languageConfigs.python;
  }

  getSupportedLanguages(): LanguageConfig[] {
    return Object.values(this.languageConfigs);
  }

  // Alternative: Use local Docker container for code execution
  async runCodeLocally(
    code: string, 
    language: string, 
    testCases?: TestCase[]
  ): Promise<CodeResult> {
    const startTime = Date.now();
    
    try {
      // This would require a backend service running Docker containers
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          testCases
        })
      });

      if (!response.ok) {
        throw new Error('Failed to execute code');
      }

      const result = await response.json();
      
      return {
        success: result.success,
        output: result.output,
        error: result.error,
        testResults: result.testResults,
        executionTime: Date.now() - startTime,
        memoryUsage: result.memoryUsage || 0
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        testResults: {
          passed: 0,
          total: testCases?.length || 0,
          details: []
        },
        executionTime: Date.now() - startTime,
        memoryUsage: 0
      };
    }
  }
}

export const codingSandboxService = new CodingSandboxService();
