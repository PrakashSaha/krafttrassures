'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isServerDown, setIsServerDown] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
    
    // Check if the error is related to network/connection failure
    if (
      error.message?.toLowerCase().includes('fetch failed') ||
      error.message?.toLowerCase().includes('failed to fetch') ||
      error.message?.toLowerCase().includes('network error') ||
      error.message?.toLowerCase().includes('econnrefused')
    ) {
      setIsServerDown(true);
    }
  }, [error]);

  if (isServerDown) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF7F2] px-6 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute w-[500px] h-[500px] bg-[#D33740]/5 rounded-full blur-3xl animate-pulse top-[-100px] left-[-100px]" style={{ animationDuration: '4s' }}></div>
        <div className="absolute w-[300px] h-[300px] bg-[#D33740]/10 rounded-full blur-2xl animate-pulse bottom-[-50px] right-[-50px]" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        
        <div className="z-10 flex flex-col items-center max-w-lg text-center">
          {/* Animated SVG Icon */}
          <div className="relative mb-8 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="absolute inset-0 bg-[#D33740]/20 rounded-full blur-xl scale-150 animate-pulse group-hover:bg-[#D33740]/30 transition-all duration-500"></div>
            <div className="relative bg-white p-6 rounded-full shadow-lg border border-[#D33740]/20 animate-bounce" style={{ animationDuration: '2s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D33740" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
                <path d="M5 12h14" />
                <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <path d="M12 18h.01" strokeWidth="3" strokeLinecap="round" className="animate-ping" style={{ transformOrigin: 'center' }} />
                <path d="M8 12v6" strokeOpacity="0.2" />
                <path d="M16 12v6" strokeOpacity="0.2" />
              </svg>
            </div>
          </div>

          <h2 className="font-serif text-4xl mb-4 text-[#3A3530] tracking-tight">System Updating</h2>
          <p className="mb-8 font-sans text-[#595148] leading-relaxed text-lg">
            Our backend servers are currently taking a quick breather or undergoing maintenance. 
            We're working hard to reconnect the dots. Please check back in a moment!
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row justify-center w-full">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center bg-[#D33740] px-10 py-4 font-sans text-xs font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-[#A92A32] hover:scale-105 active:scale-95 shadow-md group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-500"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Try Reconnecting
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <div className="max-w-md text-center">
        <h2 className="font-serif text-3xl mb-4 text-[#D33740]">Something went wrong</h2>
        <p className="mb-8 font-sans text-black/50 leading-relaxed">
          We encountered an unexpected error while preparing your experience. 
          Our artisans are looking into it.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center bg-black px-10 py-4 font-sans text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-[#D33740]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-black/10 px-10 py-4 font-sans text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
