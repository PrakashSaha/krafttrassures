'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Heritage() {
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

  return (
    <section
      ref={sectionRef}
      id="heritage"
      className="relative mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-16"
    >
      <div className="relative w-full overflow-hidden">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div
            className={`relative aspect-square overflow-hidden transition-all duration-1000 lg:aspect-auto lg:min-h-[600px] ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            <img
              alt="From the Himalayan Foothills to the World"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="object-cover"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                inset: '0px',
                color: 'transparent',
              }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/img_6573ea3686d59d2d28fef8f1494d708a.jpeg"
            />
          </div>
          <div
            className={`bg-card flex flex-col justify-center p-8 transition-all duration-1000 lg:p-12 xl:p-16 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <p className="text-primary mb-4 font-sans text-xs tracking-[0.4em] uppercase">
              Global Heritage
            </p>
            <h2 className="text-foreground mb-6 font-serif text-3xl leading-tight text-balance md:text-4xl lg:text-5xl">
              <span>From the Himalayan Foothills to the World</span>
            </h2>
            <div className="space-y-4 font-sans text-[12px] leading-relaxed text-black/80 md:text-[14px] lg:text-[16px]">
              <p className="mb-0 mb-4 font-sans text-[12px] leading-relaxed text-black/80 last:mb-0 md:text-[14px] lg:text-[16px]">
                Nestled between the eastern Himalayas and the plains of Assam, Arunachal Pradesh is
                home to 26 major tribes and over 100 sub-tribes, each carrying distinct artistic
                traditions that predate written history.
              </p>
              <p className="mb-0 mb-4 font-sans text-[12px] leading-relaxed text-black/80 last:mb-0 md:text-[14px] lg:text-[16px]">
                Our curatorial team works directly with master artisans in remote villages
                accessible only by days of travel, ensuring each piece represents the highest
                expression of its tradition while providing fair-trade compensation that sustains
                entire communities.
              </p>
              <p className="mb-0 mb-4 font-sans text-[12px] leading-relaxed text-black/80 last:mb-0 md:text-[14px] lg:text-[16px]">
                Every artifact comes with complete provenance documentation, artisan biography, and
                a certificate of authenticity verified by the Arunachal Pradesh State Museum.
              </p>
            </div>
            <div className="border-border mt-10 grid grid-cols-3 gap-6 border-t pt-8">
              <div>
                <p className="text-primary font-serif text-3xl lg:text-5xl">
                  <span>26+</span>
                </p>
                <p className="text-muted-foreground mt-2 font-sans text-[10px] tracking-[0.2em] uppercase">
                  Tribal Communities
                </p>
              </div>
              <div>
                <p className="text-primary font-serif text-3xl lg:text-5xl">
                  <span>180+</span>
                </p>
                <p className="text-muted-foreground mt-2 font-sans text-[10px] tracking-[0.2em] uppercase">
                  Master Artisans
                </p>
              </div>
              <div>
                <p className="text-primary font-serif text-3xl lg:text-5xl">
                  <span>12</span>
                </p>
                <p className="text-muted-foreground mt-2 font-sans text-[10px] tracking-[0.2em] uppercase">
                  Countries Served
                </p>
              </div>
            </div>
            <div className="mt-8 flex">
              <Link
                className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase shadow-md transition-colors duration-500"
                href="/our-story"
              >
                <span className="relative z-20">Know Our Story</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
