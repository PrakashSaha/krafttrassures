'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface GridToggleProps {
  currentCols: string;
  onToggle: (cols: string) => void;
}

export default function GridToggle({ currentCols, onToggle }: GridToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleToggle = (cols: string) => {
    // Instant UI change
    onToggle(cols);

    // Sync with URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('cols', cols);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden lg:flex items-center gap-6">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#3A3530] font-sans">Columns</span> {/* // CONTRAST FIX */}
      <div className="flex items-center border border-[#C8C3BB] bg-[#FCFAF7]"> {/* // CONTRAST FIX */}
        <button 
          onClick={() => handleToggle('4')}
          className={`px-4 py-2 flex items-center gap-2 text-[11px] font-bold border-r border-[#C8C3BB] transition-all ${currentCols === '4' ? 'bg-white text-black shadow-sm' : 'bg-transparent text-[#595148] hover:text-black'}`} // CONTRAST FIX
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          4
        </button>
        <button 
          onClick={() => handleToggle('3')}
          className={`px-4 py-2 flex items-center gap-2 text-[11px] font-bold transition-all ${currentCols === '3' ? 'bg-white text-black shadow-sm' : 'bg-transparent text-[#595148] hover:text-black'}`} // CONTRAST FIX
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          3
        </button>
      </div>
    </div>
  );
}
