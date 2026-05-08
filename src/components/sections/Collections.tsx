'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { COLLECTION_DATA } from '@/lib/data';


export default function Collections() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="collections" className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-16 lg:px-12 lg:pt-14 lg:pb-20">
      {/* Header */}
      <div className={`mb-10 transition-all duration-1000 lg:mb-14 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <span className="font-sans text-[10px] tracking-[0.35em] text-[#B8894A] uppercase block mb-5">Curated Collections</span>
            <h2 className="font-serif text-[42px] leading-[0.98] text-black sm:text-5xl lg:text-[64px]">
              Three Worlds of <br /> Artisanship
            </h2>
          </div>
          <div className="lg:flex lg:justify-end">
            <p className="max-w-[34rem] text-[13px] leading-[1.8] text-black/80 sm:text-[15px] lg:pt-1">
              As the premier digital gateway to Arunachal Pradesh's artistic heritage, Kraft Treasure connects you directly with tribal master weavers and carvers. Each collection represents a distinct tradition of craft, preserved through generations and reimagined for the contemporary connoisseur.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {COLLECTION_DATA.map((item, index) => (
          <Link
            key={index}
            href="/shop"
            className={`group relative block overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: isVisible ? item.delay : '0s' }}
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-zinc-100 lg:aspect-[0.82]">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-7">
                <h3 className="mb-1.5 font-serif text-xl text-white transition-transform duration-500 group-hover:-translate-y-1 lg:text-2xl">{item.title}</h3>
                <p className="mb-4 line-clamp-2 font-sans text-xs leading-relaxed text-white/90 transition-transform duration-500 group-hover:-translate-y-1 lg:text-sm">{item.desc}</p>
                <div className="flex items-center gap-2 text-white">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Explore Category</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Button */}
      <div className={`flex justify-center pt-10 transition-all delay-700 duration-1000 lg:pt-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Link href="/shop" className="btn-primary group">
          View All Categories
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>

    </section>
  );
}
