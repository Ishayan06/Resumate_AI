'use client';

import React, { useEffect, useState } from 'react';
import CountUp from './CountUp';

interface CountUpIntroProps {
  onComplete: () => void;
}

const CountUpIntro: React.FC<CountUpIntroProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Hide intro after countup completes (3 seconds)
    const timer = setTimeout(() => {
      setShowIntro(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black px-4">
      <div className="text-center w-full">
        {/* Responsive text sizes using Tailwind */}
        <div className="text-[12vh] sm:text-[15vh] md:text-[20vh] lg:text-[25vh] xl:text-[30vh] 2xl:text-[35vh] font-semibold text-purple-600 mb-2 sm:mb-4">
          <CountUp
            from={0}
            to={100}
            duration={2.8}
            direction="up"
            separator=""
            className="inline-block"
          />
          <span className="inline-block ml-1">%</span>
        </div>
        
        {/* Responsive loading text */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/60 tracking-wider px-2">
          LOADING EXPERIENCE
        </p>
      </div>
    </div>
  );
};

export default CountUpIntro;