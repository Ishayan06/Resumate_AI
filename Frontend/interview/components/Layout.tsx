'use client';

import React from 'react';
import Navbar from './Navbar';
import BackgroundWrapper from './BackgroundWrapper'; // Add this import
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundWrapper>  {/* Wrap everything with BackgroundWrapper */}
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Toaster position="top-right" />
    </BackgroundWrapper>
  );
}