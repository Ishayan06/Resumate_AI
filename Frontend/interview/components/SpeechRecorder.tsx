'use client';

import React, { useState, useEffect } from 'react';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';

interface SpeechRecorderProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function SpeechRecorder({ onTranscript, isListening, setIsListening }: SpeechRecorderProps) {
  const [recognition, setRecognition] = useState<any>(null);
  const [finalTranscript, setFinalTranscript] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          let interimTranscript = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (final) {
            setFinalTranscript(prev => prev + final);
            onTranscript(finalTranscript + final + interimTranscript);
          } else {
            onTranscript(finalTranscript + interimTranscript);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setFinalTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={toggleListening}
        className={`p-6 rounded-full transition-all transform hover:scale-110 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isListening ? (
          <StopIcon className="h-8 w-8 text-white" />
        ) : (
          <MicrophoneIcon className="h-8 w-8 text-white" />
        )}
      </button>
      <p className="text-sm text-gray-600">
        {isListening ? 'Recording... Click to stop' : 'Click to start recording'}
      </p>
    </div>
  );
}