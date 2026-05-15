'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchFilter({ onStartUpdate }: { onStartUpdate?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // Only trigger if query is different from searchParams 'q'
    if (query === (searchParams.get('q') || '')) return;

    const delayDebounceFn = setTimeout(() => {
      onStartUpdate?.();
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      params.delete('page'); // Reset to page 1 when SEARCHING
      router.replace(`/shop?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="relative group">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#595148] group-focus-within:text-[#8C6E3F] transition-colors"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg> {/* // CONTRAST FIX */}
      <input 
        type="text" 
        placeholder="SEARCH THE ARCHIVE..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-11 pl-10 pr-4 bg-[#FCFAF7] border border-[#C8C3BB] text-[10px] tracking-[0.16em] uppercase font-sans placeholder:text-[#595148] focus:outline-none focus:border-black transition-all" // CONTRAST FIX
      />
    </div>
  );
}
