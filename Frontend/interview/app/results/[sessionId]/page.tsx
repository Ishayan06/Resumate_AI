'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { interview } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import { InterviewResult } from '@/types';
import { ChartBarIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Results() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<InterviewResult | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchResults();
  }, [sessionId, router]);

  const fetchResults = async () => {
    try {
      const response = await interview.getResults(sessionId);
      setResults(response.data);
    } catch (error: any) {
      toast.error('Failed to load results');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Results not found</h2>
        <Link
          href="/dashboard"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Interview Results</h1>
        <p className="text-gray-600">
          Completed on {new Date(results.session.endTime).toLocaleDateString()}
        </p>
      </div>

      {/* Score Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <ChartBarIcon className="h-12 w-12 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-4xl font-bold text-indigo-600">{results.averageScore}/10</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Questions Completed</p>
              <p className="text-4xl font-bold text-green-600">
                {results.session.completedQuestions}/{results.session.totalQuestions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Feedback */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Overall Feedback</h2>
        <p className="text-gray-700">{results.overallFeedback}</p>
      </div>

      {/* Keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-lg mb-3 text-green-600">Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {results.keywords.strengths.map((keyword, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-lg mb-3 text-red-600">Areas to Improve</h3>
          <div className="flex flex-wrap gap-2">
            {results.keywords.weaknesses.map((keyword, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Answers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Detailed Answers</h2>
        <div className="space-y-4">
          {results.answers.map((answer, index) => (
            <div key={answer.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">Question {index + 1}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  answer.score >= 8 ? 'bg-green-100 text-green-800' :
                  answer.score >= 5 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Score: {answer.score}/10
                </span>
              </div>
              <p className="text-gray-700 mb-2">{answer.answer_text}</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <span className="font-medium">Feedback:</span> {answer.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/dashboard"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Back to Dashboard
        </Link>
        <Link
          href="/upload-resume"
          className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition"
        >
          Practice Again
        </Link>
      </div>
    </div>
  );
}