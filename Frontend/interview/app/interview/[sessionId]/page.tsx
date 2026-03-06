'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { interview } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import QuestionCard from '@/components/QuestionCard';
import SpeechRecorder from '@/components/SpeechRecorder';
import { Question } from '@/types';
import toast from 'react-hot-toast';

export default function InterviewSession() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // In a real app, you'd fetch the session questions here
    // For now, we'll use the ones passed from the start endpoint
    const fetchSession = async () => {
      try {
        // You might want to add a getSession endpoint
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load interview');
        router.push('/dashboard');
      }
    };

    fetchSession();
  }, [sessionId, router]);

  const handleSubmitAnswer = async () => {
    if (!answer.trim() || !questions[currentIndex]) return;

    setSubmitting(true);
    try {
      const response = await interview.submitAnswer({
        sessionId,
        questionId: questions[currentIndex].id,
        answerText: answer,
      });

      if (response.data.completed) {
        setCompleted(true);
        toast.success('Interview completed!');
        router.push(`/results/${sessionId}`);
      } else {
        // Move to next question
        setCurrentIndex(prev => prev + 1);
        setAnswer('');
        toast.success('Answer submitted!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Interview Complete! 🎉</h2>
        <p className="text-gray-600 mb-6">Redirecting to your results...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No questions available</h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Question Card */}
        <div className="md:col-span-2">
          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={questions.length}
            answer={answer}
            onAnswerChange={setAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitting={submitting}
          />
        </div>

        {/* Speech Recorder Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Voice Input</h3>
            <SpeechRecorder
              onTranscript={setAnswer}
              isListening={isListening}
              setIsListening={setIsListening}
            />
            <p className="text-xs text-gray-500 text-center mt-4">
              Click the microphone and speak your answer. It will be converted to text automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}