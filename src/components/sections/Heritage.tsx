'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Heritage() {
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
    <section ref={sectionRef} id="heritage" className="relative mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-16">
      <div className="relative w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className={`relative aspect-square overflow-hidden transition-all duration-1000 lg:aspect-auto lg:min-h-[600px] ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <img
              src="/images/img_6573ea3686d59d2d28fef8f1494d708a.jpeg"
              alt="Himalayan Heritage"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Content Side */}
          <div className={`bg-[#FAF7F2] flex flex-col justify-center p-8 transition-all duration-1000 lg:p-12 xl:p-16 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
            <p className="mb-4 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">
              Global Heritage
            </p>
            <h2 className="mb-8 font-serif text-3xl leading-tight text-black md:text-4xl lg:text-5xl">
              From the Himalayan Foothills to the World
            </h2>
            
            <div className="space-y-6 font-sans text-[13px] leading-relaxed text-black/60 sm:text-[14px]">
              <p>
                Nestled between the eastern Himalayas and the plains of Assam, Arunachal Pradesh is home to 26 major tribes and over 100 sub-tribes, each carrying distinct artistic traditions.
              </p>
              <p>
                Our curatorial team works directly with master artisans in remote villages, ensuring each piece represents the highest expression of its tradition while providing fair-trade compensation.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-black/5 pt-8">
              <StatItem value="26+" label="Tribal Communities" />
              <StatItem value="180+" label="Master Artisans" />
              <StatItem value="12" label="Countries Served" />
            </div>

            <div className="mt-10 flex">
              <Link href="/our-story" className="btn-primary">
                Know Our Story
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl text-black lg:text-5xl">{value}</p>
      <p className="mt-2 font-sans text-[9px] tracking-[0.2em] text-[#C5AB7D] uppercase font-bold">
        {label}
      </p>
    </div>
  );
}
