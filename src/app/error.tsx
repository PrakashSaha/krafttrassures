'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

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
