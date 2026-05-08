'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const treasureProducts = [
  {
    id: 1,
    name: 'Monpa Drolma – Green Tara Divine Goddess Ceremonial Mask',
    category: 'Wooden Mask',
    price: '₹6,499',
    image: '/images/img_8a4cf15dbca0bac08815b09d51cb335f.png',
    href: '/product/monpa-drolma-green-tara-divine-goddess-ceremonial-mask',
    delay: '0.1s',
  },
  {
    id: 2,
    name: 'Imperial Dragon Motif Teacup',
    category: 'Cups and Plates',
    price: '₹1,800',
    image: '/images/img_d81156df7b760918a15333587af8dc1b.png',
    href: '/product/imperial-dragon-motif-teacup',
    delay: '0.2s',
  },
  {
    id: 3,
    name: 'Monpa Ashtamangala – Eight Auspicious Symbols Embroidered Wall Hanging',
    category: 'Wall Decor & Hanging',
    price: '₹2,999',
    image: '/images/img_24c6b995e700c5e6965658f7714891d6.png',
    href: '/product/monpa-ashtamangala-eight-auspicious-symbols-embroidered-wall-hanging',
    delay: '0.3s',
  },
  {
    id: 4,
    name: 'Monpa Dung Kar – Sacred Painted Ceremonial Conch Shell on Stand',
    category: 'Ritual Object',
    price: '₹4,299',
    image: '/images/img_04927e860f65c51b5946f8b1b24831da.png',
    href: '/product/monpa-dung-kar-sacred-painted-ceremonial-conch-shell-on-stand',
    delay: '0.4s',
  },
  {
    id: 5,
    name: 'Monpa Golden Dragon Figurine – Hand-Cast Celestial Guardian',
    category: 'Figurine & Sculpture',
    price: '₹5,499',
    image: '/images/img_a9132c04a3411b218b8addb9be42a9ba.png',
    href: '/product/monpa-golden-dragon-figurine-hand-cast-celestial-guardian',
    delay: '0.5s',
  },
];

export default function TimelessTreasures() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

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

  const maxIndex = Math.max(0, treasureProducts.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] overflow-hidden px-6 pt-12 pb-20 lg:px-12">
      <div className="mx-auto mb-12 flex max-w-[1440px] translate-y-0 flex-col justify-between gap-8 opacity-100 transition-all duration-1000 md:flex-row md:items-end">
        <div className="text-left">
          <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">
            Timeless Treasures
          </p>
          <h2 className="font-serif text-3xl leading-tight text-black md:text-4xl lg:text-5xl">
            Heritage Decors For Lifetime
          </h2>
        </div>
        <Link
          className="group relative inline-flex min-w-[200px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-8 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase shadow-md transition-colors duration-500"
          href="/shop"
        >
          <span className="relative z-20">View Products</span>
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
      </div>

      <div className="group/carousel relative mx-auto max-w-[1440px]">
        <div className="overflow-hidden">
          <div
            className="-ml-4 flex transition-transform duration-500 ease-out lg:-ml-5"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {treasureProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] lg:pl-5"
              >
                <Link
                  className="group block translate-y-0 opacity-100 transition-all duration-1000"
                  style={{ transitionDelay: product.delay }}
                  href={product.href}
                >
                  <div className="relative mb-4 aspect-[4/5] overflow-hidden border border-zinc-100/50 bg-zinc-50">
                    <img
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={product.image}
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute top-4 right-4 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                        <button
                          type="button"
                          className="bg-white p-3 text-black shadow-sm transition-colors hover:bg-black hover:text-white"
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
                            className="lucide lucide-heart h-4 w-4"
                            aria-hidden="true"
                          >
                            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="bg-white p-3 text-black shadow-sm transition-colors hover:bg-black hover:text-white"
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
                            className="lucide lucide-shopping-bag h-4 w-4"
                            aria-hidden="true"
                          >
                            <path d="M16 10a4 4 0 0 1-8 0" />
                            <path d="M3.103 6.034h17.794" />
                            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="border border-black/10 bg-white px-5 py-3 text-center font-sans text-[10px] tracking-[0.2em] text-black uppercase shadow-sm transition-colors duration-300 hover:bg-black hover:text-white">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0.5 text-center">
                    <p className="text-muted-foreground font-sans text-[9px] tracking-[0.3em] uppercase">
                      {product.category}
                    </p>
                    <h3 className="text-foreground line-clamp-1 font-serif text-sm transition-colors hover:text-[#C5AB7D] lg:text-base">
                      {product.name}
                    </h3>
                    <p className="text-primary text-base font-semibold lg:text-lg">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={prevSlide}
            className="border-border text-foreground absolute top-[40%] left-2 z-40 -translate-y-1/2 border bg-white p-4 shadow-xl transition-all duration-300 hover:bg-black hover:text-white"
            aria-label="Previous item"
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
            onClick={nextSlide}
            className="border-border text-foreground absolute top-[40%] right-2 z-40 -translate-y-1/2 border bg-white p-4 shadow-xl transition-all duration-300 hover:bg-black hover:text-white"
            aria-label="Next item"
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
        <div className="mt-12 flex justify-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={prevSlide}
            className="border-border text-foreground border bg-white p-4 shadow-sm transition-all duration-300 hover:bg-black hover:text-white"
            aria-label="Previous item"
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
            onClick={nextSlide}
            className="border-border text-foreground border bg-white p-4 shadow-sm transition-all duration-300 hover:bg-black hover:text-white"
            aria-label="Next item"
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
    </section>
  );
}
