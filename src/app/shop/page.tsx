'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/sections/Topbar';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/data';


export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Topbar />

      <main className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        {/* Page Header */}
        <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="mb-4 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Curated Shop</p>
          <h1 className="mb-6 font-serif text-4xl text-black md:text-6xl lg:text-7xl">The Living Craft Archive</h1>
          <p className="mx-auto max-w-2xl font-sans text-[15px] leading-relaxed text-black/50">
            Browse handcrafted treasures from Arunachal Pradesh, directly from artisan village workshops to your home.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Filter Rail */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="sticky top-24 border border-black/5 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
                <h2 className="text-[10px] font-bold tracking-widest text-[#C5AB7D] uppercase">Filter Rail</h2>
                <button className="text-[9px] font-bold tracking-widest text-black/30 uppercase hover:text-black transition-colors">Clear</button>
              </div>

              <div className="space-y-10">
                <FilterGroup label="Categories">
                  <select className="w-full bg-[#FAF7F2] p-4 text-[12px] font-bold uppercase tracking-wider outline-none focus:ring-1 focus:ring-[#C5AB7D] appearance-none cursor-pointer">
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Availability">
                  <div className="space-y-3 mt-4">
                    <Checkbox id="in-stock" label="In Stock" />
                    <Checkbox id="pre-order" label="Pre-order" />
                  </div>
                </FilterGroup>

                <FilterGroup label="Price Range">
                  <div className="flex items-center gap-3 mt-4">
                    <input type="text" placeholder="Min" className="w-full border border-black/5 bg-[#FAF7F2] p-3 text-[12px] text-center outline-none focus:border-[#C5AB7D]" />
                    <span className="text-black/20">—</span>
                    <input type="text" placeholder="Max" className="w-full border border-black/5 bg-[#FAF7F2] p-3 text-[12px] text-center outline-none focus:border-[#C5AB7D]" />
                  </div>
                </FilterGroup>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-10 flex flex-col items-center justify-between gap-6 border-b border-black/5 pb-8 md:flex-row">
              <p className="font-serif text-[15px] text-black/60">{PRODUCTS.length} Pieces Found</p>

              <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
                {/* Search */}
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Search Artifacts..."
                    className="w-full border border-black/10 bg-white py-3 pr-4 pl-12 text-[12px] outline-none focus:ring-1 focus:ring-[#C5AB7D]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="absolute top-1/2 left-4 -translate-y-1/2 text-black/20" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-2 border-l border-black/5 pl-4">
                  <ViewButton active={viewMode === 'grid'} onClick={() => setViewMode('grid')} icon={<GridIcon />} />
                  <ViewButton active={viewMode === 'list'} onClick={() => setViewMode('list')} icon={<ListIcon />} />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className={`grid gap-x-8 gap-y-16 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-24 flex justify-center pb-20">
              <button className="group relative inline-flex min-w-[220px] items-center justify-center gap-3 border border-black/10 bg-transparent px-10 py-5 font-sans text-[11px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-black hover:text-white active:scale-[0.98]">
                Load More Pieces
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180 duration-500"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-4 block text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">{label}</label>
      {children}
    </div>
  );
}

function Checkbox({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <input type="checkbox" id={id} className="h-4 w-4 cursor-pointer border-black/10 text-[#D33740] focus:ring-0" />
      <label htmlFor={id} className="cursor-pointer text-[12px] font-medium text-black/60 hover:text-black transition-colors">{label}</label>
    </div>
  );
}

function ViewButton({ active, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-2 transition-all ${active ? 'bg-black text-white shadow-md' : 'text-black/20 hover:text-black/40'}`}
    >
      {icon}
    </button>
  );
}

const GridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>;
