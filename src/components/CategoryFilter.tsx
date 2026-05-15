'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  label: string;
  slug: string;
}

export default function CategoryFilter({ categories, onStartUpdate }: { categories: Category[], onStartUpdate?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onStartUpdate?.();
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to page 1
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative">
      <select
        value={currentCategory}
        onChange={handleChange}
        className="w-full h-12 px-4 border border-[#C8C3BB] bg-white text-[11px] tracking-[0.16em] uppercase font-sans appearance-none focus:outline-none focus:border-black cursor-pointer" // CONTRAST FIX
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#595148]"><path d="m6 9 6 6 6-6"/></svg> {/* // CONTRAST FIX */}
      </div>
    </div>
  );
}
