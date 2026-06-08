'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '../ProductCard';
import { useTranslations } from 'next-intl';
import { Product } from '@/lib/types';

export default function Trending({ products }: { products?: Product[] }) {
  const t = useTranslations('sections');
  const [isVisible, setIsVisible] = useState(true);
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

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-20 lg:px-12">
      <div className={`mb-12 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">{t('trending_subtitle')}</p>
        <h2 className="font-serif text-3xl leading-tight text-black md:text-4xl lg:text-5xl">{t('trending_title')}</h2>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {displayProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} isVisible={isVisible} priority={index < 4} />
        ))}
      </div>

      <div className={`flex justify-center transition-all delay-700 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Link 
          href="/shop" 
          className="group relative inline-flex items-center justify-center gap-2 bg-[#D33740] px-10 py-5 font-sans text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black hover:text-white active:scale-[0.98]"
        >
          View All Products
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>

    </section>
  );
}
