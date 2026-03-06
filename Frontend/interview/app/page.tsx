'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { MicrophoneIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const router = useRouter();
  const authenticated = isAuthenticated();

  if (authenticated) {
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-white mb-4"> {/* Changed from text-white */}
          Master Your Interviews with{' '}
          <span className="text-indigo-600">AI Coach</span> {/* Changed from text-indigo-300 */}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"> {/* Changed from text-gray-200 */}
          Upload your resume, practice with AI-generated questions, and get instant feedback
        </p>
        <div className="space-x-4">
          <Link
            href="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition inline-block shadow-lg"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-lg text-lg font-medium transition inline-block"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center"> {/* Changed from bg-white/10 */}
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Resume</h3> {/* Changed from text-white */}
          <p className="text-gray-600"> {/* Changed from text-gray-200 */}
            Our AI analyzes your resume to extract skills and generate relevant questions
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center"> {/* Changed from bg-white/10 */}
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MicrophoneIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Voice Answers</h3> {/* Changed from text-white */}
          <p className="text-gray-600"> {/* Changed from text-gray-200 */}
            Speak your answers naturally - our speech-to-text converts them automatically
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center"> {/* Changed from bg-white/10 */}
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SparklesIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Feedback</h3> {/* Changed from text-white */}
          <p className="text-gray-600"> {/* Changed from text-gray-200 */}
            Get instant feedback on your answers with scores and improvement suggestions
          </p>
        </div>
      </div>
    </div>
  );
}