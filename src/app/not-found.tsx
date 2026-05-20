import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="max-w-lg text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="mb-6 font-sans text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">
            404 Error
          </p>
          <h1 className="mb-8 font-serif text-5xl text-black lg:text-7xl">Lost in the Archive</h1>
          <p className="mb-12 font-sans text-[15px] leading-relaxed text-black/50">
            The heritage piece or collection you are looking for does not exist in our current
            digital archive. It may have been relocated or removed.
          </p>
          <Link
            href="/"
            className="btn-primary group"
          >
            Return to Homepage
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
