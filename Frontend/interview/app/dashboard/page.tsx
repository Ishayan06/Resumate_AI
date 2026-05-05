'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, getUser } from '@/lib/auth';
import { interview } from '@/lib/api';
import { PlayIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Folder from '@/components/Folder';

export default function Dashboard() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [averageScore, setAverageScore] = useState('--');

  const user = getUser();

  // -----------------------------
  // Auth check
  // -----------------------------
  useEffect(() => {

    if (!isAuthenticated()) {
      router.push('/login');
    }

  }, [router]);

  // -----------------------------
  // Fetch Dashboard Stats
  // -----------------------------
  useEffect(() => {

    const fetchDashboardStats = async () => {

      try {

        const response = await interview.getDashboardStats();

        setAverageScore(response.data.averageScore || '--');

      } catch (error) {

        console.error('Failed to fetch dashboard stats');

      }
    };

    fetchDashboardStats();

  }, []);

  // -----------------------------
  // Start Interview
  // -----------------------------
  const startInterview = async () => {

    setLoading(true);

    try {

      const response = await interview.start();

      router.push(`/interview/${response.data.sessionId}`);

    } catch (error: any) {

      toast.error(
        error.response?.data?.error ||
        'Please upload a resume first'
      );

      router.push('/upload-resume');

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="space-y-8">

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">

        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>

        <p className="text-indigo-100 mb-6">
          Ready to practice for your next interview?
          Start a new session or continue where you left off.
        </p>

        <button
          onClick={startInterview}
          disabled={loading}
          className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2"
        >
          <PlayIcon className="h-5 w-5" />

          <span>
            {loading ? 'Starting...' : 'Start New Interview'}
          </span>

        </button>

      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Resume Upload */}
        <Link
          href="/upload-resume"
          className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-start"
        >

          <div className="mb-4 transition-transform duration-300 group-hover:scale-105">

            <Folder
              color="#6366f1"
              size={1.1}
              items={[
                <div key="1" className="w-full h-full flex items-center justify-center p-1">
                  <div className="w-full space-y-1">
                    <div className="h-1 bg-indigo-200 rounded" />
                    <div className="h-1 bg-indigo-100 rounded w-3/4" />
                    <div className="h-1 bg-indigo-100 rounded w-1/2" />
                  </div>
                </div>,

                <div key="2" className="w-full h-full flex items-center justify-center p-1">
                  <div className="w-full space-y-1">
                    <div className="h-1 bg-gray-300 rounded" />
                    <div className="h-1 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>,

                null,
              ]}
            />

          </div>

          <h3 className="text-lg font-semibold mb-1">
            Upload Resume
          </h3>

          <p className="text-gray-500 text-sm">
            Upload or update your resume to get personalized questions
          </p>

          <span className="mt-3 text-xs text-indigo-500 font-medium group-hover:underline">
            Click to upload →
          </span>

        </Link>

        {/* Practice Interviews */}
        <div className="bg-white p-6 rounded-xl shadow-lg">

          <PlayIcon className="h-10 w-10 text-indigo-600 mb-3" />

          <h3 className="text-lg font-semibold mb-2">
            Practice Interviews
          </h3>

          <p className="text-gray-600 text-sm mb-3">
            Start your first interview today
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>

        </div>

        {/* Average Score */}
        <div className="bg-white p-6 rounded-xl shadow-lg">

          <ChartBarIcon className="h-10 w-10 text-indigo-600 mb-3" />

          <h3 className="text-lg font-semibold mb-2">
            Average Score
          </h3>

          <p className="text-3xl font-bold text-indigo-600">
            {averageScore}/10
          </p>

          <p className="text-gray-600 text-sm">
            Based on your completed interviews
          </p>

        </div>

      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Interview Tips 💡
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">
              STAR Method
            </h3>

            <p className="text-sm text-blue-600">
              Structure your answers:
              Situation, Task, Action, Result
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              Be Concise
            </h3>

            <p className="text-sm text-green-600">
              Keep answers to 2-3 minutes max
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">
              Use Examples
            </h3>

            <p className="text-sm text-purple-600">
              Always back up claims with real examples
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Practice Out Loud
            </h3>

            <p className="text-sm text-yellow-600">
              Speaking answers helps you prepare better
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}