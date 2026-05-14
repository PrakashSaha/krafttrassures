'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Product } from '@/lib/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_PRODUCTS: Product[] = [
  { id: 1, slug: 'monpa-rangzen-rang-dun', name: 'Monpa Rangzen Rang-Dun – Colorful Floral Mandala Painted Tongue Drum', category: 'Musical Instrument', price: 3499, image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png', href: '/product/monpa-rangzen-rang-dun' },
  { id: 2, slug: 'sacred-ceremonial-wall-mask', name: 'Sacred Ceremonial Wall Mask', category: 'Masks', price: 3100, image: '/images/img_b6b893bf9561c378a643cae02ba8ff63.png', href: '/product/sacred-ceremonial-wall-mask' },
  { id: 3, slug: 'monpa-zang-dong', name: 'Monpa Zang Dong – Sacred Yellow Lacquered Offering Bowl Set', category: 'Ceremonial Pottery', price: 2499, image: '/images/img_8c34743a7b92154a6ceed277880a2e12.png', href: '/product/monpa-zang-dong' },
  { id: 4, slug: 'sacred-tawang-monastery-banner', name: 'Sacred Tawang Monastery Banner', category: 'Others', price: 3600, image: '/images/img_ea260192b5d5e7b46cb323470fd4fd8b.png', href: '/product/sacred-tawang-monastery-banner' },
  { id: 5, slug: 'monpa-traditional-woven-thangka', name: 'Monpa Traditional Woven Thangka', category: 'Textile & Weaving', price: 6800, image: '/images/img_5272ad50803a3ab605149781d666fb4b.png', href: '/product/monpa-traditional-woven-thangka' },
  { id: 6, slug: 'traditional-deity-mask', name: 'Traditional Deity Mask – Hand-Carved Wooden Ceremonial Piece', category: 'Masks', price: 4200, image: '/images/img_f08cce93af6994ee70cdee826c34c554.png', href: '/product/traditional-deity-mask' },
  { id: 7, slug: 'arunachal-tribal-necklace', name: 'Arunachal Tribal Beaded Necklace', category: 'Necklaces', price: 1899, image: '/images/img_5b2209901953523b207d60b90672822f.jpeg', href: '/product/arunachal-tribal-necklace' },
  { id: 8, slug: 'brass-singing-bowl', name: 'Himalayan Brass Singing Bowl – Meditation & Healing', category: 'Show Pieces', price: 2800, image: '/images/img_80562aee7c8a6801b8187db048b6820e.png', href: '/product/brass-singing-bowl' },
  { id: 9, slug: 'monpa-wall-hanging', name: 'Monpa Ceremonial Wall Hanging – Prayer Flag Weave', category: 'Wall Decor & Hanging', price: 3200, image: '/images/img_24c6b995e700c5e6965658f7714891d6.png', href: '/product/monpa-wall-hanging' },
  { id: 10, slug: 'terracotta-figurine', name: 'Terracotta Tribal Figurine – Arunachal Heritage', category: 'Figurine & Sculpture', price: 1650, image: '/images/img_93892b41c09914ab339b71a95c773150.png', href: '/product/terracotta-figurine' },
];

const CATEGORIES = [
  'Show Pieces',
  'Textile & Weaving',
  'Wall Decor & Hanging',
  'Necklaces',
  'Others',
  'Figurine & Sculpture',
  'Masks',
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setActiveCategory(null);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesQuery = query.trim() === '' || 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === null || p.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const displayedProducts = query.trim() === '' && activeCategory === null ? ALL_PRODUCTS.slice(0, 6) : filtered;
  const isSearching = query.trim() !== '' || activeCategory !== null;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 pb-10">
        <div className="relative flex w-full max-w-[780px] max-h-[80vh] flex-col rounded-sm bg-[#FAF7F2] shadow-2xl animate-in zoom-in-95 duration-300">
          
          <div className="flex-shrink-0 px-7 pt-8 lg:px-10">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-semibold tracking-[0.35em] text-[#8C6E3F] uppercase">Search</p> {/* // CONTRAST FIX */}
                <h2 className="font-serif text-3xl text-black lg:text-4xl">Find A Piece</h2>
              </div>
              <button onClick={onClose} className="close-btn" aria-label="Close search">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="mb-5 flex items-center gap-3 border border-[#D33740] bg-white px-4 py-3 focus-within:ring-1 ring-[#D33740]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3A3530]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg> {/* // CONTRAST FIX */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, artisan names"
                className="flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#595148]" // CONTRAST FIX
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[#3A3530] hover:text-black"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button> // CONTRAST FIX
              )}
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`chip ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-7 pb-6 lg:px-10">
            {displayedProducts.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-serif text-xl text-[#595148]">No pieces found</p> {/* // CONTRAST FIX */}
                <p className="mt-1 text-[12px] text-[#595148]">Try a different search or browse all collections</p> {/* // CONTRAST FIX */}
              </div>
            ) : (
              <div className="divide-y divide-[#C8C3BB]"> {/* // CONTRAST FIX */}
                {displayedProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} onClick={onClose} className="group flex items-center gap-4 py-3.5 hover:bg-black/[0.015] transition-colors">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden bg-zinc-100">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform group-hover:scale-110" sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-[9px] font-semibold tracking-[0.2em] text-[#8C6E3F] uppercase">{p.category}</p> {/* // CONTRAST FIX */}
                      <p className="line-clamp-1 font-serif text-[14px] text-black group-hover:text-[#D33740] transition-colors">{p.name}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-serif text-[14px] font-medium text-black">
                        ₹{p.price?.toLocaleString('en-IN')}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#595148] group-hover:text-[#D33740] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg> {/* // CONTRAST FIX */}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

    </>
  );
}
