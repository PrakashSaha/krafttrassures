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
    console.error('Root Error Boundary:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF7F2] p-6 text-center">
      <div className="max-w-md animate-in fade-in zoom-in-95 duration-700">
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center bg-[#D33740] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
        </div>
        
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">System Interruption</p>
        <h1 className="mb-6 font-serif text-4xl text-black">Something went wrong</h1>
        
        <p className="mb-10 text-[14px] leading-relaxed text-black/50">
          An unexpected error occurred while preserving heritage craftsmanship. Our artisans are looking into it.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="w-full bg-black py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-[#D33740]"
          >
            Try again
          </button>
          
          <Link
            href="/"
            className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase hover:text-black transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 overflow-auto border border-black/5 bg-white p-4 text-left text-[10px] text-black/40">
            <p className="font-bold uppercase tracking-wider mb-2">Error Debug Info:</p>
            <pre className="font-mono">{error.message}</pre>
            {error.digest && <p className="mt-2">Digest: {error.digest}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
