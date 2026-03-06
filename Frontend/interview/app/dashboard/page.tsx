'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, getUser } from '@/lib/auth';
import { interview } from '@/lib/api';
import { DocumentTextIcon, PlayIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const startInterview = async () => {
    setLoading(true);
    try {
      const response = await interview.start();
      router.push(`/interview/${response.data.sessionId}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Please upload a resume first');
      router.push('/upload-resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-indigo-100 mb-6">
          Ready to practice for your next interview? Start a new session or continue where you left off.
        </p>
        
        <button
          onClick={startInterview}
          disabled={loading}
          className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2"
        >
          <PlayIcon className="h-5 w-5" />
          <span>{loading ? 'Starting...' : 'Start New Interview'}</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/upload-resume" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <DocumentTextIcon className="h-10 w-10 text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
          <p className="text-gray-600 text-sm">
            Upload or update your resume to get personalized questions
          </p>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <PlayIcon className="h-10 w-10 text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Practice Interviews</h3>
          <p className="text-gray-600 text-sm mb-3">
            Start your first interview today
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <ChartBarIcon className="h-10 w-10 text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-indigo-600">--/10</p>
          <p className="text-gray-600 text-sm">Complete an interview to see your score</p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Interview Tips 💡</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">STAR Method</h3>
            <p className="text-sm text-blue-600">
              Structure your answers: Situation, Task, Action, Result
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Be Concise</h3>
            <p className="text-sm text-green-600">
              Keep answers to 2-3 minutes max
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Use Examples</h3>
            <p className="text-sm text-purple-600">
              Always back up claims with real examples
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Practice Out Loud</h3>
            <p className="text-sm text-yellow-600">
              Speaking answers helps you prepare better
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}