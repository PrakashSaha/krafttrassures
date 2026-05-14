'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ProductCard } from '../ProductCard';
import { Product } from '@/lib/types';

export default function NewArrivals({ products }: { products?: Product[] }) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const sectionRef = useRef<HTMLElement>(null);

  const displayProducts = products && products.length > 0 ? products : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else if (window.innerWidth < 1280) setVisibleCount(3);
      else setVisibleCount(4);
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
    <section ref={sectionRef} className="w-full overflow-hidden bg-white pt-[70px] pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <div className={`mb-8 flex flex-col justify-between gap-6 transition-all duration-1000 lg:mb-12 lg:flex-row lg:items-end ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div>
            <p className="mb-4 font-sans text-xs tracking-[0.4em] text-[#C5AB7D] uppercase">Freshly Curated</p>
            <h2 className="font-serif text-3xl leading-tight text-black md:text-5xl lg:text-6xl">New Arrivals</h2>
          </div>
          <Link 
            href="/shop" 
            className="group relative inline-flex items-center justify-center gap-2 bg-[#D33740] px-10 py-5 font-sans text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black hover:text-white active:scale-[0.98]"
          >
            View All Pieces
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="-ml-6 flex transition-transform duration-500 ease-out lg:-ml-8"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {displayProducts.map((product) => (
                <div key={product.id} className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] lg:pl-8">
                  <ProductCard product={product} isVisible={isVisible} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-12 flex justify-center gap-4 transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <NavButton onClick={() => slide('prev')} direction="prev" />
          <NavButton onClick={() => slide('next')} direction="next" />
        </div>
      </div>

    </section>
  );
}

function NavButton({ onClick, direction }: { onClick: () => void, direction: 'next' | 'prev' }) {
  return (
    <button
      onClick={onClick}
      className="border border-black/10 bg-white p-4 text-black shadow-sm transition-all hover:bg-black hover:text-white active:scale-90"
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
