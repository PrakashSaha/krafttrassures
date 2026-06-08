/* eslint-disable react-hooks/set-state-in-effect */ // Disabled as refactoring these specific effects could cause regressions
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, Category } from '@/lib/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.categories) setCategories(data.categories);
      } catch (err) {
        console.error('Failed to fetch categories for search:', err);
      }
    };
    fetchCategories();
  }, []);

  // Modal focus, body lock, Escape key listener, and initial fetch trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Trigger initial fetch when modal opens
      setResults([]);
      setPage(1);
      setHasMore(false);
      setIsLoading(true);
      fetch('/api/search?page=1')
        .then(async r => {
          if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
          return r.json();
        })
        .then(data => {
          if (data.products) {
            setResults(data.products);
            setHasMore(data.meta?.pagination?.page < data.meta?.pagination?.pageCount);
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Initial search fetch error:', err);
          setIsLoading(false);
        });
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setActiveCategory(null);
      setPage(1);
      setHasMore(false);
    }
    return () => { 
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle Real-Time Search (query/category changes only)
  useEffect(() => {
    // Don't run on initial mount — the isOpen effect handles that
    if (!isOpen) return;

    setResults([]);
    setPage(1);
    setHasMore(false);

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (activeCategory) params.set('category', activeCategory);
        params.set('page', '1');

        const res = await fetch(`/api/search?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        
        if (data.products) {
          setResults(data.products);
          setHasMore(data.meta?.pagination?.page < data.meta?.pagination?.pageCount);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Search error:', err);
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 250);
    return () => clearTimeout(debounce);
  }, [query, activeCategory]);

  // Load More logic
  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    const nextPage = page + 1;
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (activeCategory) params.set('category', activeCategory);
      params.set('page', nextPage.toString());

      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (data.products) {
        setResults(prev => [...prev, ...data.products]);
        setPage(nextPage);
        setHasMore(data.meta.pagination.page < data.meta.pagination.pageCount);
      }
    } catch (err) {
      console.error('Load more error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, page]);

  const isSearching = query.trim() !== '' || activeCategory !== null;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div 
        className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 pb-10 cursor-pointer"
        onClick={onClose}
      >
        <div 
          className="relative flex w-full max-w-[780px] max-h-[80vh] flex-col rounded-sm bg-[#FAF7F2] shadow-2xl animate-in zoom-in-95 duration-300 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="flex-shrink-0 px-7 pt-8 lg:px-10">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-semibold tracking-[0.35em] text-[#8C6E3F] uppercase">Search</p>
                <h2 className="font-serif text-3xl text-black lg:text-4xl">Find A Piece</h2>
              </div>
              <button onClick={onClose} className="text-[#3A3530] hover:text-[#D33740] transition-colors" aria-label="Close search">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="mb-5 flex items-center gap-3 border border-[#D33740] bg-white px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3A3530]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, artisan names"
                className="flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#595148]"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[#3A3530] hover:text-black"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
              )}
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`chip ${activeCategory === null ? 'active' : ''}`}
              >
                All Items
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                  className={`chip ${activeCategory === cat.slug ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-7 pb-6 lg:px-10 custom-scrollbar">
            {isLoading && page === 1 ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4 text-[#8C6E3F]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Consulting Archive...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-[#C8C3BB] animate-in fade-in slide-in-from-bottom-2 duration-700">
                {results.map((p) => (
                  <Link key={p.id} href={`/product/${p.productId}`} onClick={onClose} className="group flex items-center gap-4 py-3.5 hover:bg-black/[0.015] transition-colors">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden bg-zinc-100">
                      <Image src={p.image || '/images/placeholder.png'} alt={p.name} fill className="object-cover transition-transform group-hover:scale-110" sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-[9px] font-semibold tracking-[0.2em] text-[#8C6E3F] uppercase">{p.category}</p>
                      <p className="line-clamp-1 font-serif text-[14px] text-black group-hover:text-[#D33740] transition-colors">{p.name}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-serif text-[14px] font-medium text-black">
                        {p.price ? <span className="notranslate">₹{p.price.toLocaleString('en-IN')}</span> : 'Price on Inquiry'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#595148] group-hover:text-[#D33740] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                    </div>
                  </Link>
                ))}

                <div ref={observerTarget} className="py-6 flex justify-center">
                  {isLoading && page > 1 && (
                    <div className="flex items-center gap-3 text-[#8C6E3F]">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span className="text-[9px] font-bold tracking-widest uppercase">Loading More...</span>
                    </div>
                  )}
                </div>
              </div>
            ) : isSearching ? (
              <div className="py-10 text-center">
                <p className="font-serif text-xl text-[#595148]">No pieces found</p>
                <p className="mt-1 text-[12px] text-[#595148]">Try a different search or browse all collections</p>
              </div>
            ) : (
               <div className="py-20 flex flex-col items-center justify-center gap-4 text-[#8C6E3F]">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D33740] border-t-transparent" />
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase animate-pulse">Initializing Collection...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
