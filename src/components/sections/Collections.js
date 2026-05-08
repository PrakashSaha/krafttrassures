'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Collections() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const collectionItems = [
    {
      title: 'Ceremonial Pottery',
      desc: 'Perfect for holding altar offerings.',
      image: '/images/img_6f7deacbf0b665554ad82954468ac046.jpeg',
      delay: '0.1s',
    },
    {
      title: 'Cups and Plates',
      desc: 'Hand-finished porcelain and ritual vessels',
      image: '/images/img_6f7deacbf0b665554ad82954468ac046.png',
      delay: '0.2s',
    },
    {
      title: 'Decorative Ceramics',
      desc: 'Metalwork that reflects the blessings of ancestors.',
      image: '/images/img_80562aee7c8a6801b8187db048b6820e.jpeg',
      delay: '0.3s',
    },
    {
      title: 'Figurine & Sculpture',
      desc: 'Abundance and the blessings of the Himalayas to your home.',
      image: '/images/img_80562aee7c8a6801b8187db048b6820e.png',
      delay: '0.4s',
    },
    {
      title: 'Jewellery & Adornment',
      desc: 'A beautiful piece of Himalayan heritage and adornment.',
      image: '/images/img_585ed4af2ec8b815204939c92c061c8a.jpeg',
      delay: '0.5s',
    },
    {
      title: 'Show Pieces',
      desc: 'Sculptural heritage objects',
      image: '/images/img_f08cce93af6994ee70cdee826c34c554.png',
      delay: '0.6s',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-16 lg:px-12 lg:pt-14 lg:pb-20"
    >
      <div
        className={`mb-10 transition-all duration-1000 lg:mb-14 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <div className="mb-5 flex">
              <span className="font-sans text-[10px] tracking-[0.35em] text-[#B8894A] uppercase">
                Curated Collections
              </span>
            </div>
            <h2 className="font-serif text-[42px] leading-[0.98] text-black sm:text-5xl lg:text-[64px]">
              <span className="block whitespace-nowrap">Three Worlds of </span>
              <span className="block whitespace-nowrap"> Artisanship</span>
            </h2>
          </div>
          <div className="lg:flex lg:justify-end">
            <div className="max-w-[34rem] text-[13px] leading-[1.8] text-black/82 sm:text-[15px] lg:pt-1">
              <p className="mb-0 mb-4 text-[13px] leading-[1.8] text-black/82 last:mb-0 sm:text-[15px]">
                As the premier digital gateway to Arunachal Pradesh's artistic heritage, Kraft
                Treasure connects you directly with tribal master weavers and carvers. Each
                collection represents a distinct tradition of craft, preserved through generations
                and reimagined for the contemporary connoisseur, now delivered from the hills to
                your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {collectionItems.map((item, index) => (
          <Link
            key={index}
            className={`group relative block overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: isVisible ? item.delay : '0s' }}
            href="/shop"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-zinc-100 lg:aspect-[0.82]">
              <img
                alt={item.title}
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  inset: '0px',
                  color: 'transparent',
                }}
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80"></div>
              <div className="absolute right-0 bottom-0 left-0 flex h-full flex-col justify-end p-5 lg:p-7">
                <div className="mt-auto">
                  <h3 className="mb-1.5 font-serif text-xl text-white transition-transform duration-500 group-hover:-translate-y-1 lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 font-sans text-xs leading-relaxed text-white/90 transition-transform duration-500 group-hover:-translate-y-1 lg:text-sm">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-white">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase">
                      Explore Category
                    </span>
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
                      className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover:translate-x-2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        className={`flex justify-center pt-10 transition-all delay-700 duration-1000 lg:pt-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <Link
          className="group relative inline-flex min-w-[220px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-8 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase shadow-md transition-colors duration-500"
          href="/categories"
        >
          <span className="relative z-20">View All Categories</span>
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
    </section>
  );
}
