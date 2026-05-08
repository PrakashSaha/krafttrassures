'use client';

import React from 'react';
import Link from 'next/link';

const WISHLIST = [
  { id: 2, slug: 'sacred-ceremonial-wall-mask', name: 'Sacred Ceremonial Wall Mask', category: 'Masks', price: 3100, image: '/images/img_b6b893bf9561c378a643cae02ba8ff63.png' },
  { id: 3, slug: 'monpa-zang-dong', name: 'Monpa Zang Dong – Sacred Yellow Lacquered Offering Bowl Set', category: 'Ceremonial Pottery', price: 2499, image: '/images/img_8c34743a7b92154a6ceed277880a2e12.png' },
  { id: 4, slug: 'sacred-tawang-monastery-banner', name: 'Sacred Tawang Monastery Banner', category: 'Others', price: 3600, image: '/images/img_ea260192b5d5e7b46cb323470fd4fd8b.png' },
];

export default function AccountWishlistPage() {
  return (
    <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Archive</p>
        <h1 className="font-serif text-4xl text-black">Saved Items</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-black/50">
          Items you have curated for later from our heritage collections.
        </p>
      </div>

      <div className="border-t border-black/5 pt-10">
        {WISHLIST.length === 0 ? (
          <div className="border border-dashed border-black/10 bg-[#FAF7F2] py-20 text-center">
            <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">Empty Archive</p>
            <p className="text-[14px] text-black/40">Browse our collection and save your favourite pieces.</p>
            <Link href="/shop" className="mt-8 inline-block text-[11px] font-bold tracking-[0.2em] text-[#D33740] uppercase hover:text-black transition-colors">Return to Collections</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {WISHLIST.map((item) => (
              <div key={item.id} className="group border border-black/5 bg-[#FAF7F2] p-5 transition-all hover:shadow-md hover:border-[#C5AB7D]/30">
                <div className="flex gap-6">
                  <Link href={`/product/${item.slug}`} className="shrink-0 overflow-hidden shadow-sm">
                    <div className="h-[120px] w-[90px]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  </Link>
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="mb-1 line-clamp-2 font-serif text-[15px] text-black hover:text-[#D33740] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#C5AB7D] uppercase">{item.category}</p>
                      <p className="font-serif text-[15px] text-black">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                      <button className="text-[10px] font-bold tracking-[0.2em] text-[#D33740] uppercase hover:text-black transition-colors">Add to Cart</button>
                      <button className="text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase hover:text-[#D33740] transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
