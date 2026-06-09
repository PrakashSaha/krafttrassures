'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ProductCard } from '../ProductCard';
import { useTranslations } from 'next-intl';
import { Product } from '@/lib/types';


export default function TimelessTreasures({ products }: { products?: Product[] }) {
  const t = useTranslations('sections');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  const displayProducts = products && products.length > 0 ? products : [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, displayProducts.length - visibleCount);

  const slide = useCallback((direction: 'next' | 'prev') => {
    setCurrentIndex((prev) => {
      if (direction === 'next') return prev >= maxIndex ? 0 : prev + 1;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  }, [maxIndex]);

  return (
    <section className="mx-auto w-full max-w-[1440px] overflow-hidden px-6 pt-12 pb-20 lg:px-12">
      <div className="mx-auto mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="text-left">
          <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">{t('treasures_subtitle')}</p>
          <h2 className="font-serif text-3xl leading-tight text-black md:text-4xl lg:text-5xl">{t('treasures_title')}</h2>
        </div>
        <Link href="/shop" className="btn-primary group">
          View Products
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>

      <div className="group/carousel relative">
        <div className="overflow-hidden">
          <div
            className="-ml-4 flex transition-transform duration-500 ease-out lg:-ml-5"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] lg:pl-5"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Arrows */}
        <div className="hidden lg:block">
          <NavButton direction="prev" onClick={() => slide('prev')} position="left" />
          <NavButton direction="next" onClick={() => slide('next')} position="right" />
        </div>
        
        {/* Mobile Arrows */}
        <div className="mt-12 flex justify-center gap-4 lg:hidden">
          <button onClick={() => slide('prev')} className="mobile-nav-btn" aria-label="Previous">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <button onClick={() => slide('next')} className="mobile-nav-btn" aria-label="Next">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        </div>
      </div>

    </section>
  );
}

function NavButton({ direction, onClick, position }: { direction: 'next' | 'prev', onClick: () => void, position: 'left' | 'right' }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-[40%] ${position}-2 z-40 -translate-y-1/2 border border-black/10 bg-white p-4 text-black shadow-xl transition-all hover:bg-black hover:text-white active:scale-90`}
      aria-label={`${direction} item`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'prev' ? (
          <>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </>
        ) : (
          <>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </>
        )}
      </svg>
    </button>
  );
}
