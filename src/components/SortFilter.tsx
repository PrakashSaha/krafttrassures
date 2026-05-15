'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page'); // Reset to page 1
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] tracking-[0.2em] uppercase text-[#4A4540] font-sans">Sort By</span> {/* // CONTRAST FIX */}
      <div className="relative">
        <select
          value={currentSort}
          onChange={handleChange}
          className="h-11 pl-4 pr-10 border border-[#C8C3BB] bg-[#FCFAF7] text-[11px] tracking-[0.1em] uppercase font-sans appearance-none focus:outline-none focus:border-black cursor-pointer" // CONTRAST FIX
        >
          <option value="newest">Featured Order</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#595148]"><path d="m6 9 6 6 6-6"/></svg> {/* // CONTRAST FIX */}
        </div>
      </div>
    </div>
  );
}
