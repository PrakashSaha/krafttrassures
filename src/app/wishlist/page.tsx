'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="animate-pulse font-serif text-2xl text-black/20">Archiving...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24">
        {/* Page Header */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Saved Pieces</p>
          <h1 className="font-serif text-5xl text-black lg:text-7xl">Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center py-32 text-center animate-in fade-in duration-1000 delay-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-8 text-black/10">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            <p className="mb-3 font-serif text-3xl text-black/40">Your archive is empty</p>
            <p className="mb-10 max-w-sm text-[14px] leading-relaxed text-black/40">
              Collect pieces that resonate with your space. Your saved treasures will wait for you here.
            </p>
            <Link href="/shop" className="btn-primary group">
              Explore The Shop
            </Link>
          </div>
        ) : (
          <div className="animate-in fade-in duration-1000 delay-300">
            <div className="mb-10 flex items-center justify-between border-b border-black/5 pb-6">
              <p className="text-[11px] font-bold tracking-[0.1em] text-black/40 uppercase">
                {wishlist.length} saved artifact{wishlist.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((item) => (
                <ProductCard
                  key={item.id}
                  product={{
                    ...item,
                    price: item.price,
                    href: `/product/${item.slug}`
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

