'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const products = [
  {
    name: 'Ancient Green Deity Mask',
    img: 'img_2494a847f0389601eacab27aa7fb9c69.jpeg',
    href: '/product/ancient-green-deity-mask',
  },
  {
    name: 'Imperial Dragon Motif Teacup',
    img: 'img_d81156df7b760918a15333587af8dc1b.png',
    href: '/product/imperial-dragon-motif-teacup',
  },
  {
    name: 'Majestic Ritual Soul Mask',
    img: 'img_86a8927604bc9322fca261f48b29454a.jpeg',
    href: '/product/majestic-ritual-soul-mask',
  },
  {
    name: 'Monpa Ashtamangala',
    img: 'img_24c6b995e700c5e6965658f7714891d6.png',
    href: '/product/monpa-ashtamangala-eight-auspicious-symbols-embroidered-wall-hanging',
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-white md:h-screen">
      <div className="pointer-events-none absolute inset-0 flex flex-col md:flex-row">
        <div className="h-1/2 w-full bg-white md:h-full md:w-1/2"></div>
        <div className="h-1/2 w-full bg-[#FFF4B3] md:h-full md:w-1/2"></div>
      </div>
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col md:flex-row">
        <div className="flex w-full flex-col items-center justify-center px-6 pt-32 pb-24 text-center md:w-1/2 md:items-start md:py-0 md:text-left lg:px-12">
          <div className="w-full max-w-[600px]">
            <p
              className="mb-4 translate-y-0 font-sans text-[10px] tracking-[0.4em] uppercase opacity-100 transition-all duration-1000 md:text-xs"
              style={{ color: 'rgb(197, 171, 125)' }}
            >
              AUTHENTIC ARUNACHAL PRADESH HANDICRAFTS
            </p>
            <h2 className="mb-6 translate-y-0 font-serif text-[40px] leading-[1.15] tracking-tight text-black opacity-100 transition-all duration-1000 sm:text-5xl md:text-[52px] lg:text-[60px] xl:text-[68px]">
              <span className="block">
                <span className="mr-[0.25em] inline-block">Where</span>
                <span className="mr-[0.25em] inline-block">Ancient</span>
              </span>
              <span className="block">
                <span className="mr-[0.25em] inline-block text-[#C5AB7D] italic">Artistry</span>
                <span className="mr-[0.25em] inline-block">Meets</span>
              </span>
              <span className="block">
                <span className="mr-[0.25em] inline-block">Modern</span>
                <span className="mr-[0.25em] inline-block">Luxury</span>
              </span>
            </h2>
            <div className="mb-10 max-w-[480px] translate-y-0 font-sans text-[13px] leading-relaxed text-black/80 opacity-100 transition-all duration-1000 sm:text-[14px] lg:text-[15px]">
              <p className="mb-0 mb-4 font-sans text-[13px] leading-relaxed text-black/80 last:mb-0 sm:text-[14px] lg:text-[15px]">
                Discover original tribal crafts from Arunachal Pradesh, bamboo &amp; cane, handloom
                textiles, traditional jewellery, masks, and home décor-sourced directly from
                artisans and delivered with care.
              </p>
            </div>
            <div className="flex translate-y-0 flex-col justify-center gap-4 opacity-100 transition-all duration-1000 sm:flex-row md:justify-start md:gap-3 lg:gap-4">
              <Link
                className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase shadow-md transition-colors duration-500 md:min-w-[215px] md:px-4 lg:px-6 xl:min-w-[180px]"
                href="/shop"
              >
                <span className="relative z-20">EXPLORE COLLECTIONS</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
              </Link>
              <Link
                className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden border border-[#D33740] bg-transparent px-6 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-[#D33740] uppercase shadow-sm transition-all duration-500 md:min-w-[130px] md:px-4 lg:px-6 xl:min-w-[180px]"
                href="/shop"
              >
                <span className="relative z-20 font-medium transition-colors duration-500 group-hover:text-white">
                  SHOP NOW
                </span>
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden md:min-h-screen md:w-1/2">
          <div className="group relative aspect-square w-full max-w-[380px] scale-100 opacity-100 transition-all duration-700 ease-out lg:max-w-[460px] 2xl:max-w-[500px]">
            {products.map((product, index) => (
              <div
                key={index}
                className={`absolute inset-0 overflow-hidden rounded-sm shadow-xl transition-all duration-1000 ease-in-out ${currentIndex === index ? 'z-10 scale-100 opacity-100' : 'z-0 scale-95 opacity-0'}`}
              >
                <Link
                  className="block h-full w-full cursor-pointer"
                  aria-label={`Explore ${product.name} in the shop`}
                  href={product.href}
                >
                  <img
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="scale-110 object-cover transition-transform duration-1000 ease-out group-hover:scale-100"
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      inset: '0px',
                      color: 'transparent',
                    }}
                    src={`/images/${product.img}`}
                  />
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8">
                    <p className="mb-2 font-sans text-xs tracking-[0.3em] text-white uppercase">
                      Product
                    </p>
                    <h3 className="font-serif text-xl text-white md:text-lg lg:text-2xl">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}

            <div className="pointer-events-none absolute inset-0 z-20 rounded-sm border border-white/10"></div>
            <div className="absolute right-6 bottom-6 z-30 flex gap-3">
              <button
                type="button"
                className="cursor-pointer border border-black/10 bg-white/40 p-4 text-black shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white active:scale-95"
                aria-label="Previous image"
                onClick={prevSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="cursor-pointer border border-black/10 bg-white/40 p-4 text-black shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white active:scale-95"
                aria-label="Next image"
                onClick={nextSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
