'use client';

import LiquidEther from '@/components/LiquidEther';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'interview' | 'dashboard' | 'results';
}

export default function BackgroundWrapper({ children, variant = 'default' }: BackgroundWrapperProps) {
  // Original React Bits colors - EXACT as in the example
  const colors = ['#5227FF', '#FF9FFC', '#B19EEF'];

  return (
    <div className="relative min-h-screen w-full">
      {/* Liquid Ether Background - Pure original */}
      <div className="fixed inset-0">
        <LiquidEther 
          colors={colors}
          autoSpeed={0.5}        // Original speed
          autoIntensity={2.2}     // Original intensity
          mouseForce={20}         // Original mouse force
          cursorSize={100}        // Original cursor size
          resolution={0.5}        // Original resolution
          autoDemo={true}
        />
      </div>
      
      {/* NO OVERLAY - pure original look */}
      
      {/* Content with semi-transparent cards to show background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}