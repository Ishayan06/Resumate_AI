'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PillNav from './PillNav';
import BackgroundWrapper from './BackgroundWrapper';
import CountUpIntro from './CountUpIntro';
import Magnet from './Magnet';
import TargetCursor from './TargetCursor';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const hideNav = pathname === '/chatbot';

  // Desktop nav
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Ai", href: "/chatbot" },
  ];

  const mobileNavItems = [...navItems];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowMainContent(true);
  };

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
      setShowMainContent(true);
    }
  }, []);

  useEffect(() => {
    if (!showIntro && showMainContent) {
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, [showIntro, showMainContent]);

  return (
    <>
      {/* Climate Crisis variable font */}
      <style>{`
        @font-face {
          font-family: 'Climate Crisis';
          src: url('/fonts/ClimateCrisis-Variable.woff2') format('woff2');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }

        .brand-title {
          font-family: 'Climate Crisis', sans-serif;
          font-variation-settings: 'YEAR' 2050;
          letter-spacing: 0.05em;
          line-height: 1;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          color: white;
          transition: font-variation-settings 0.4s ease, opacity 0.2s ease;
          padding: 0 0.25rem;
        }
        .brand-title:hover {
          font-variation-settings: 'YEAR' 1979;
          opacity: 0.85;
        }

        .login-btn {
          font-weight: 600;
          letter-spacing: 0.01em;
          font-size: clamp(0.75rem, 1.5vw, 0.875rem);
          background: transparent;
          border: 1.5px solid #4f6ef7;
          color: white;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(79, 110, 247, 0.3), inset 0 0 10px rgba(79, 110, 247, 0.05);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .login-btn:hover {
          border-color: #6b8bff;
          box-shadow: 0 0 18px rgba(79, 110, 247, 0.6), inset 0 0 14px rgba(79, 110, 247, 0.1);
          background: transparent;
        }
      `}</style>

      {/* Global target cursor */}
      <TargetCursor targetSelector=".cursor-target" spinDuration={3} hideDefaultCursor={false} />

      {showIntro && <CountUpIntro onComplete={handleIntroComplete} />}

      {showMainContent && (
        <BackgroundWrapper>

          {/* Top bar — hidden on /chatbot */}
          {!hideNav && (
            <div className="px-6 py-4">

              {/* ── DESKTOP layout ── */}
              <div className="hidden md:grid md:grid-cols-3 md:items-center">
                <div className="flex-shrink-0">
                  <Link href="/" className="brand-title cursor-target">
                    ResuMate
                  </Link>
                </div>
                <div className="flex justify-center brand-title">
                  <PillNav logo="/logo.avif" items={navItems} />
                </div>
                <div className="flex justify-end flex-shrink-0">
                  <Magnet padding={60} magnetStrength={3}>
                    <Link
                      href="/login"
                      className="login-btn cursor-target inline-flex items-center justify-center h-[42px] px-8"
                    >
                      Interview
                    </Link>
                  </Magnet>
                </div>
              </div>

              {/* ── MOBILE layout ── */}
              <div className="md:hidden flex flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <PillNav logo="/logo.avif" items={mobileNavItems} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <Link href="/" className="brand-title whitespace-nowrap">
                      ResuMate
                    </Link>
                  </div>
                  <div className="flex-shrink-0 w-[48px]" />
                </div>
              </div>

            </div>
          )}

          <main className="container mx-auto px-6 py-10">
            {children}
          </main>

          <Toaster position="top-right" />
        </BackgroundWrapper>
      )}
    </>
  );
}