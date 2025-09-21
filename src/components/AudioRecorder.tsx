import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw, Download, Upload } from 'lucide-react';

interface AudioRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  onTranscriptionComplete?: (transcript: string) => void;
  maxDuration?: number; // in seconds
  autoTranscribe?: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  onTranscriptionComplete,
  maxDuration = 120, // 2 minutes default
  autoTranscribe = true
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete?.(blob);
        
        if (autoTranscribe) {
          transcribeAudio(blob);
        }

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= maxDuration) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);

    } catch (error) {
      setError('Failed to access microphone. Please check permissions.');
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscript('');
    setRecordingTime(0);
    setError(null);
  };

  const transcribeAudio = async (blob: Blob) => {
    setIsTranscribing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');
      formData.append('model', 'whisper-1');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const result = await response.json();
      const transcriptText = result.text || '';
      setTranscript(transcriptText);
      onTranscriptionComplete?.(transcriptText);
    } catch (error) {
      setError('Failed to transcribe audio. Please try again.');
      console.error('Error transcribing audio:', error);
    } finally {
      setIsTranscribing(false);
    }
  };

  const downloadRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recording-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const uploadAudio = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAudioBlob(file);
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        onRecordingComplete?.(file);
        
        if (autoTranscribe) {
          transcribeAudio(file);
        }
      }
    };
    input.click();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Recording</h3>
        <p className="text-sm text-gray-600">
          Record your response for up to {Math.floor(maxDuration / 60)} minutes
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {!isRecording && !audioBlob && (
          <button
            onClick={startRecording}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Mic className="h-5 w-5" />
            <span>Start Recording</span>
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Square className="h-5 w-5" />
            <span>Stop Recording</span>
          </button>
        )}

        {audioBlob && !isRecording && (
          <div className="flex items-center space-x-2">
            <button
              onClick={isPlaying ? pauseRecording : playRecording}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={resetRecording}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Recording Timer */}
      {isRecording && (
        <div className="text-center mb-4">
          <div className="text-2xl font-mono text-red-600">
            {formatTime(recordingTime)}
          </div>
          <div className="text-sm text-gray-500">
            Recording in progress...
          </div>
        </div>
      )}

      {/* Audio Player */}
      {audioUrl && (
        <div className="mb-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            controls
            className="w-full"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={uploadAudio}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Audio</span>
        </button>

        {audioBlob && (
          <button
            onClick={downloadRecording}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        )}

        {audioBlob && !autoTranscribe && (
          <button
            onClick={() => transcribeAudio(audioBlob)}
            disabled={isTranscribing}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            <span>{isTranscribing ? 'Transcribing...' : 'Transcribe'}</span>
          </button>
        )}
      </div>

      {/* Transcription */}
      {isTranscribing && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-600">Transcribing audio...</span>
          </div>
        </div>
      )}

      {transcript && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transcription
          </label>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700">{transcript}</p>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="text-center">
        {audioBlob && (
          <div className="text-sm text-green-600">
            ✓ Recording complete ({formatTime(recordingTime)})
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
