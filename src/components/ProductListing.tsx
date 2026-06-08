/* eslint-disable react-hooks/set-state-in-effect */ // Disabled as refactoring these specific effects could cause regressions
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import PriceFilter from './PriceFilter';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import SearchFilter from './SearchFilter';
import GridToggle from './GridToggle';
import Link from 'next/link';
import Pagination from './Pagination';
import { Product, Category } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface ProductListingProps {
  initialProducts: Product[];
  categories: Category[];
  absoluteMin: number;
  absoluteMax: number;
  initialMin?: string;
  initialMax?: string;
  gridCols: string;
  searchQuery: string;
  totalFound: number;
  pageCount: number;
  currentPage: number;
}

export default function ProductListing({
  initialProducts,
  categories,
  absoluteMin,
  absoluteMax,
  initialMin = '',
  initialMax = '',
  gridCols,
  searchQuery,
  totalFound,
  pageCount,
  currentPage
}: ProductListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);
  const [cols, setCols] = useState(gridCols);
  const [isUpdating, setIsUpdating] = useState(false);
  const t = useTranslations('shop');

  const stockFilter = searchParams.get('stock') || 'all';

  // Sync state and manage loading state when products change
  useEffect(() => {
    // If we were updating, ensure a minimum smooth transition
    const timer = setTimeout(() => {
      setIsUpdating(false);
    }, 600);

    setMinPrice(initialMin);
    setMaxPrice(initialMax);
    setCols(gridCols);

    return () => clearTimeout(timer);
  }, [initialProducts, initialMin, initialMax, gridCols]);

  const handleStockChange = (value: string) => {
    setIsUpdating(true);
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'in') {
      params.set('stock', 'true');
    } else {
      params.delete('stock');
    }
    params.delete('page'); // Reset to page 1
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  const products = initialProducts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
      {/* Filter Rail Sidebar */}
      <aside className="hidden lg:block lg:sticky lg:top-28">
        <div className="border border-[#C8C3BB] bg-[#FCFAF7] p-6 lg:p-7 shadow-[0_14px_40px_-32px_rgba(0,0,0,0.35)]"> {/* // CONTRAST FIX */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#C8C3BB]"> {/* // CONTRAST FIX */}
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#8C6E3F] font-sans mb-2">{t('filters')}</p> {/* // CONTRAST FIX */}
              <h2 className="text-xl font-serif text-black">{t('filters')}</h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-sans text-[#3A3530] hover:text-black transition-colors"> {/* // CONTRAST FIX */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              {t('clear_all')}
            </Link>
          </div>

          <div className="pt-6 space-y-8">
            {/* Categories */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#3A3530] font-sans mb-3">{t('categories')}</p> {/* // CONTRAST FIX */}
              <CategoryFilter categories={categories} onStartUpdate={() => setIsUpdating(true)} />
            </section>

            {/* Availability */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#3A3530] font-sans mb-3">Availability</p> {/* // CONTRAST FIX */}
              <div className="space-y-2">
                <label className={`flex items-center justify-between px-4 py-3 border border-[#C8C3BB] text-[11px] tracking-[0.16em] uppercase font-sans cursor-pointer transition-colors ${stockFilter !== 'true' ? 'bg-white font-bold text-black' : 'bg-white/70 hover:bg-white text-[#3A3530]'}`}> {/* // CONTRAST FIX */}
                  <span>All availability</span>
                  <input 
                    type="radio" 
                    name="stock" 
                    checked={stockFilter !== 'true'} 
                    onChange={() => handleStockChange('all')}
                    className="h-3 w-3 border-[#C8C3BB] text-[#8C6E3F] focus:ring-0" 
                  />
                </label>
                <label className={`flex items-center justify-between px-4 py-3 border border-[#C8C3BB] text-[11px] tracking-[0.16em] uppercase font-sans cursor-pointer transition-colors ${stockFilter === 'true' ? 'bg-white font-bold text-black' : 'bg-white/70 hover:bg-white text-[#3A3530]'}`}> {/* // CONTRAST FIX */}
                  <span>In stock</span>
                  <input 
                    type="radio" 
                    name="stock" 
                    checked={stockFilter === 'true'} 
                    onChange={() => handleStockChange('in')}
                    className="h-3 w-3 border-[#C8C3BB] text-[#8C6E3F] focus:ring-0" 
                  />
                </label>
              </div>
            </section>

            {/* Price Filter */}
            <PriceFilter 
              absoluteMin={absoluteMin} 
              absoluteMax={absoluteMax} 
              initialMin={minPrice}
              initialMax={maxPrice}
              onPriceChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              onStartUpdate={() => setIsUpdating(true)}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="space-y-8 relative">
        {/* Toolbar */}
        <section className="border-y border-[#C8C3BB] py-5 flex flex-col gap-4 lg:flex-row lg:items-center"> {/* // CONTRAST FIX */}
          <div className="flex items-center gap-8 lg:border-r lg:border-[#C8C3BB] lg:pr-8"> {/* // CONTRAST FIX */}
            <h2 className="text-xl font-serif text-black whitespace-nowrap">{totalFound} {t('results')}</h2>
          </div>
          
          <div className="flex-1 min-w-0 px-0 lg:px-8">
            <SearchFilter onStartUpdate={() => setIsUpdating(true)} />
          </div>

          <div className="flex items-center gap-8 lg:border-l lg:border-[#C8C3BB] lg:pl-8"> {/* // CONTRAST FIX */}
            <SortFilter onStartUpdate={() => setIsUpdating(true)} />
            <GridToggle currentCols={cols} onToggle={setCols} />
          </div>
        </section>

        {/* Product Grid with Loading Overlay */}
        <div className="relative">
          {isUpdating && (
            <div className="absolute inset-0 z-50 flex items-start justify-center pt-32 bg-white/60 backdrop-blur-[2px] transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C5AB7D] border-t-transparent" />
                <p className="text-[10px] font-bold tracking-[0.3em] text-black uppercase animate-pulse">Updating Archive...</p>
              </div>
            </div>
          )}
          <div className={`grid grid-cols-2 gap-6 lg:gap-8 transition-all duration-700 ${isUpdating ? 'opacity-20 translate-y-2' : 'opacity-100 translate-y-0 animate-in fade-in slide-in-from-bottom-2'} ${cols === '3' ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
          {products.length > 0 ? (
            products.map((p, index) => (
              <ProductCard key={p.id} product={p} priority={index < 8} />
            ))
          ) : (
            <div className="col-span-full py-40 text-center">
              <p className="mb-8 font-serif text-3xl text-[#C8C3BB] uppercase tracking-widest">{t('no_results')}</p> {/* // CONTRAST FIX */}
              <Link href="/shop" className="inline-flex border-2 border-black px-12 py-5 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all text-black"> {/* // CONTRAST FIX */}
                {t('clear_all')}
              </Link>
            </div>
          )}
        </div>
      </div>

        <div className={`mt-16 transition-opacity duration-300 ${isUpdating ? 'opacity-30' : 'opacity-100'}`}>
          <Pagination 
            pageCount={pageCount} 
            currentPage={currentPage} 
            onStartUpdate={() => setIsUpdating(true)} 
          />
        </div>
      </div>
    </div>
  );
}
