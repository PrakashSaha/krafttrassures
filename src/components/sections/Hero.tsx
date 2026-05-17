'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getStrapiMedia } from '@/lib/strapi';
import { Product } from '@/lib/types';

interface HeroSlide {
  title: string;
  subtitle: string;
  name: string;
  img: string;
  href: string;
}

export default function Hero({ slides }: { slides?: HeroSlide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const displaySlides = slides && slides.length > 0 ? slides : [];
  const activeSlide = displaySlides[currentIndex] || {
    title: "Ancient Artistry Meet Luxury",
    subtitle: "Discover original tribal crafts from Arunachal Pradesh.",
    name: "Craft Treasure",
    img: "",
    href: "/shop"
  };

  const rotateSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || displaySlides.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      if (direction === 'next') return (prev + 1) % displaySlides.length;
      return (prev - 1 + displaySlides.length) % displaySlides.length;
    });
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, displaySlides.length]);

  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(() => rotateSlide('next'), 6000);
    return () => clearInterval(timer);
  }, [rotateSlide, displaySlides.length]);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-white md:h-screen">
      {/* Background Split */}
      <div className="pointer-events-none absolute inset-0 flex flex-col md:flex-row">
        <div className="h-1/2 w-full bg-white md:h-full md:w-1/2" />
        <div className="h-1/2 w-full bg-[#FAF7F2] md:h-full md:w-1/2" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col md:flex-row">
        {/* Left Content */}
        <div className="flex w-full flex-col items-center justify-center px-6 pt-32 pb-24 text-center md:w-1/2 md:items-start md:py-0 md:text-left lg:px-12">
          <div key={currentIndex} className="w-full max-w-[600px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="mb-4 font-sans text-[10px] tracking-[0.4em] text-[#8C6E3F] uppercase md:text-xs"> {/* // CONTRAST FIX */}
              Authentic Arunachal Pradesh Handicrafts
            </p>
            <h2 className="mb-6 font-serif text-[40px] leading-[1.15] tracking-tight text-black sm:text-5xl md:text-[52px] lg:text-[60px] xl:text-[68px]">
              {activeSlide.title.includes('Artistry') ? (
                <>
                  {activeSlide.title.split('Artistry')[0]}
                  <span className="text-[#8C6E3F] italic">Artistry</span> {/* // CONTRAST FIX */}
                  {activeSlide.title.split('Artistry')[1]}
                </>
              ) : activeSlide.title}
            </h2>
            <p className="mb-10 max-w-[550px] font-sans text-[13px] leading-relaxed text-[#3A3530] sm:text-[14px] lg:text-[15px]"> {/* // CONTRAST FIX */}
              {activeSlide.subtitle}
            </p>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link href="/shop" className="group relative inline-flex items-center justify-center gap-2 bg-[#D33740] px-10 py-5 font-sans text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black hover:text-white active:scale-[0.98]">
                Explore Collections
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <Link href={activeSlide.href} className="inline-flex items-center justify-center border-2 border-black px-10 py-5 font-sans text-[11px] font-bold tracking-[0.3em] uppercase transition-all active:scale-[0.98] text-black"> {/* // CONTRAST FIX */}
                Shop This Piece
              </Link>
            </div>
          </div>
        </div>

        {/* Right Carousel */}
        <div className="relative flex min-h-[500px] bg-[#fff4b3] w-full items-center justify-center overflow-hidden md:min-h-screen md:w-1/2">
          <div className="group relative aspect-square w-full max-w-[380px] lg:max-w-[460px] 2xl:max-w-[500px]">
            {displaySlides.map((product, index) => (
              <div
                key={index}
                className={`absolute inset-0 overflow-hidden rounded-sm shadow-2xl transition-all duration-1000 ease-in-out ${
                  currentIndex === index ? 'z-10 scale-100 opacity-100' : 'z-0 scale-95 opacity-0'
                }`}
              >
                <Link href={product.href} className="block h-full w-full relative">
                  {product.img ? (
                    <Image
                      src={product.img || '/images/placeholder.png'}
                      alt={product.name}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/images/placeholder.png" 
                        alt="Kraft Treasure" 
                        fill 
                        className="object-cover opacity-30 grayscale"
                      />
                      <span className="relative z-10 font-serif text-[#C8C3BB] text-4xl">Kraft Treasure</span>
                    </div>
                  )}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent p-8">
                    <p className="mb-2 font-sans text-[10px] tracking-[0.3em] text-white/60 uppercase">Featured Piece</p>
                    <h3 className="font-serif text-xl text-white lg:text-2xl">{product.name}</h3>
                  </div>
                </Link>
              </div>
            ))}

            {/* Carousel Controls */}
            {displaySlides.length > 1 && (
              <div className="absolute right-6 bottom-6 z-30 flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <NavButton direction="prev" onClick={() => rotateSlide('prev')} />
                <NavButton direction="next" onClick={() => rotateSlide('next')} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function NavButton({ direction, onClick }: { direction: 'next' | 'prev', onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center border border-[#C8C3BB] bg-white/40 text-black shadow-lg backdrop-blur-md transition-all hover:bg-white active:scale-90" // CONTRAST FIX
      aria-label={`${direction} slide`}
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
