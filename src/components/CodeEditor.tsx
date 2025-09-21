import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, Download, Upload } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => Promise<any>;
  readOnly?: boolean;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  initialCode = '',
  onCodeChange,
  onRun,
  readOnly = false,
  height = '400px'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const languageTemplates: { [key: string]: string } = {
    python: `# Python Solution
def solution():
    # Write your code here
    pass

# Test your solution
if __name__ == "__main__":
    result = solution()
    print(result)`,
    java: `// Java Solution
public class Solution {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello World!");
    }
}`,
    javascript: `// JavaScript Solution
function solution() {
    // Write your code here
    return "Hello World!";
}

// Test your solution
console.log(solution());`,
    csharp: `// C# Solution
using System;

class Program {
    static void Main() {
        // Write your code here
        Console.WriteLine("Hello World!");
    }
}`,
    cpp: `// C++ Solution
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello World!" << endl;
    return 0;
}`
  };

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    } else {
      setCode(languageTemplates[language] || '');
    }
  }, [language, initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = async () => {
    if (!onRun) return;
    
    setIsRunning(true);
    setError('');
    setOutput('');

    try {
      const result = await onRun(code);
      setOutput(result.output || result.stdout || 'Code executed successfully');
    } catch (err: any) {
      setError(err.message || 'An error occurred while running the code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(languageTemplates[language] || '');
    setOutput('');
    setError('');
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${language === 'javascript' ? 'js' : language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.py,.java,.js,.cs,.cpp,.c';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setCode(content);
          onCodeChange?.(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const getLanguageMode = (lang: string) => {
    const modes: { [key: string]: string } = {
      python: 'python',
      java: 'java',
      javascript: 'javascript',
      csharp: 'csharp',
      cpp: 'cpp',
      c: 'c'
    };
    return modes[lang] || 'text';
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {language.toUpperCase()} Editor
          </span>
          <span className="text-xs text-gray-500">
            {code.split('\n').length} lines
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {!readOnly && (
            <>
              <button
                onClick={handleLoad}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                title="Load from file"
              >
                <Upload className="h-4 w-4" />
                <span>Load</span>
              </button>
              
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                title="Save to file"
              >
                <Download className="h-4 w-4" />
                <span>Save</span>
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                title="Reset code"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </>
          )}
          
          {onRun && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center space-x-1 px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <Square className="h-4 w-4" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Run</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          ref={editorRef}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          readOnly={readOnly}
          className="w-full font-mono text-sm leading-relaxed resize-none focus:outline-none"
          style={{ 
            height,
            padding: '16px',
            lineHeight: '1.5',
            tabSize: 2
          }}
          placeholder={`Enter your ${language} code here...`}
        />
        
        {/* Line Numbers */}
        <div 
          className="absolute left-0 top-0 bg-gray-50 text-gray-400 text-sm font-mono select-none pointer-events-none"
          style={{ 
            width: '40px',
            height: '100%',
            padding: '16px 8px',
            lineHeight: '1.5'
          }}
        >
          {code.split('\n').map((_, index) => (
            <div key={index} className="text-right">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Output Panel */}
      {(output || error) && (
        <div className="border-t border-gray-300">
          <div className="bg-gray-50 px-4 py-2">
            <span className="text-sm font-medium text-gray-700">Output</span>
          </div>
          <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm">
            {error ? (
              <div className="text-red-400">{error}</div>
            ) : (
              <pre className="whitespace-pre-wrap">{output}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
