'use client';

import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import PriceFilter from './PriceFilter';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import SearchFilter from './SearchFilter';
import GridToggle from './GridToggle';
import Link from 'next/link';
import { Product, Category } from '@/lib/types';

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
  totalFound
}: ProductListingProps) {
  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);
  const [cols, setCols] = useState(gridCols);

  // Sync state with props when they change (e.g. on navigation)
  useEffect(() => {
    setMinPrice(initialMin);
    setMaxPrice(initialMax);
    setCols(gridCols);
  }, [initialMin, initialMax, gridCols]);

  const products = initialProducts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
      {/* Filter Rail Sidebar */}
      <aside className="hidden lg:block lg:sticky lg:top-28">
        <div className="border border-[#C8C3BB] bg-[#FCFAF7] p-6 lg:p-7 shadow-[0_14px_40px_-32px_rgba(0,0,0,0.35)]"> {/* // CONTRAST FIX */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#C8C3BB]"> {/* // CONTRAST FIX */}
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#8C6E3F] font-sans mb-2">Filter Rail</p> {/* // CONTRAST FIX */}
              <h2 className="text-xl font-serif text-black">Refine Listing</h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-sans text-[#3A3530] hover:text-black transition-colors"> {/* // CONTRAST FIX */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Clear
            </Link>
          </div>

          <div className="pt-6 space-y-8">
            {/* Categories */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#3A3530] font-sans mb-3">Categories</p> {/* // CONTRAST FIX */}
              <CategoryFilter categories={categories} />
            </section>

            {/* Availability */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#3A3530] font-sans mb-3">Availability</p> {/* // CONTRAST FIX */}
              <div className="space-y-2">
                <label className="flex items-center justify-between px-4 py-3 border border-[#C8C3BB] bg-white text-[11px] tracking-[0.16em] uppercase font-sans cursor-pointer"> {/* // CONTRAST FIX */}
                  <span>All availability</span>
                  <input type="radio" name="stock" defaultChecked className="h-3 w-3 border-[#C8C3BB] text-[#8C6E3F] focus:ring-0" /> {/* // CONTRAST FIX */}
                </label>
                <label className="flex items-center justify-between px-4 py-3 border border-[#C8C3BB] bg-white/70 text-[#3A3530] text-[11px] tracking-[0.16em] uppercase font-sans cursor-pointer hover:bg-white transition-colors"> {/* // CONTRAST FIX */}
                  <span>In stock</span>
                  <input type="radio" name="stock" className="h-3 w-3 border-[#C8C3BB] text-[#8C6E3F] focus:ring-0" /> {/* // CONTRAST FIX */}
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
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="space-y-8 relative">
        {/* Toolbar */}
        <section className="border-y border-[#C8C3BB] py-5 flex flex-col gap-4 lg:flex-row lg:items-center"> {/* // CONTRAST FIX */}
          <div className="flex items-center gap-8 lg:border-r lg:border-[#C8C3BB] lg:pr-8"> {/* // CONTRAST FIX */}
            <h2 className="text-xl font-serif text-black whitespace-nowrap">{totalFound} Pieces Found</h2>
          </div>
          
          <div className="flex-1 min-w-0 px-0 lg:px-8">
            <SearchFilter />
          </div>

          <div className="flex items-center gap-8 lg:border-l lg:border-[#C8C3BB] lg:pl-8"> {/* // CONTRAST FIX */}
            <SortFilter />
            <GridToggle currentCols={cols} onToggle={setCols} />
          </div>
        </section>

        {/* Product Grid */}
        <div className={`grid grid-cols-2 gap-6 lg:gap-8 ${cols === '3' ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <div className="col-span-full py-40 text-center">
              <p className="mb-8 font-serif text-3xl text-[#C8C3BB] uppercase tracking-widest">Archive Empty</p> {/* // CONTRAST FIX */}
              <Link href="/shop" className="inline-flex border-2 border-black px-12 py-5 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all text-black"> {/* // CONTRAST FIX */}
                Reset Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
