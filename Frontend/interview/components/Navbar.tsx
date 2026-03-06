'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated, logout, getUser } from '@/lib/auth';
import { MicrophoneIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const authenticated = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <MicrophoneIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              AI Interview Coach
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    pathname === '/dashboard'
                      ? 'bg-indigo-600 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </Link>
                <span className="text-sm text-white/60">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    pathname === '/login'
                      ? 'bg-indigo-600 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}