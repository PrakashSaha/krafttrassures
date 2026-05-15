'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onStartUpdate?: () => void;
}

export default function Pagination({ pageCount, currentPage, onStartUpdate }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={createPageUrl(i)}
          onClick={() => onStartUpdate?.()}
          className={`flex h-10 w-10 items-center justify-center border text-[11px] font-bold tracking-widest transition-all ${
            currentPage === i
              ? 'border-black bg-black text-white'
              : 'border-black/10 bg-white text-black hover:border-black'
          }`}
        >
          {i}
        </Link>
      );
    }
    return pages;
  };

  return (
    <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
      {/* Previous Button */}
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        onClick={() => onStartUpdate?.()}
        className={`flex h-10 w-10 items-center justify-center border border-black/10 bg-white text-black transition-all hover:border-black ${
          currentPage === 1 ? 'pointer-events-none opacity-30' : ''
        }`}
        aria-disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </Link>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {renderPageNumbers()}
      </div>

      {/* Next Button */}
      <Link
        href={createPageUrl(Math.min(pageCount, currentPage + 1))}
        onClick={() => onStartUpdate?.()}
        className={`flex h-10 w-10 items-center justify-center border border-black/10 bg-white text-black transition-all hover:border-black ${
          currentPage === pageCount ? 'pointer-events-none opacity-30' : ''
        }`}
        aria-disabled={currentPage === pageCount}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </Link>
    </nav>
  );
}
