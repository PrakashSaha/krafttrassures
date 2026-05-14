'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Review {
  id: number | string;
  author: string;
  content: string;
  rating?: number;
}

export default function Testimonials({ reviews }: { reviews?: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const displayReviews = reviews && reviews.length > 0 ? reviews : [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, displayReviews.length - visibleCount);

  const rotate = useCallback((direction: 'next' | 'prev') => {
    setCurrentIndex((prev) => {
      if (direction === 'next') return prev >= maxIndex ? 0 : prev + 1;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(() => rotate('next'), 6000);
    return () => clearInterval(timer);
  }, [rotate]);

  return (
    <section className="mx-auto w-full max-w-[1440px] overflow-hidden px-6 pt-6 pb-20 lg:px-12">
      <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">Voices of Appreciation</p>
        <h2 className="font-serif text-3xl text-black md:text-4xl">What Our Connoisseurs Say</h2>
      </div>

      <div className="group relative">
        <div className="overflow-hidden">
          <div
            className="-ml-4 flex transition-transform duration-500 ease-out md:-ml-8 lg:-ml-12"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {displayReviews.map((t) => (
              <div key={t.id} className="w-full flex-none py-4 pl-4 md:w-1/2 md:pl-8 lg:w-1/3 lg:pl-12">
                <div className="group relative flex h-full flex-col items-center border border-black/5 bg-[#FAF7F2] p-8 text-center transition-all duration-500 hover:shadow-xl">
                  <div className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
                  <div className="relative z-10 flex h-full flex-col items-center">
                    <div className="mb-8 flex gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => <StarIcon key={i} />)}
                    </div>
                    <p className="mb-8 flex-1 font-serif text-lg leading-relaxed text-black italic md:text-xl">
                      "{t.content}"
                    </p>
                    <div className="mt-auto">
                      <p className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#C5AB7D] uppercase">
                        {t.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:block">
          <NavButton direction="prev" onClick={() => rotate('prev')} position="left" />
          <NavButton direction="next" onClick={() => rotate('next')} position="right" />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-12 flex justify-center gap-3">
        {[...Array(maxIndex + 1)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-[#D33740]' : 'w-2 bg-black/10'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#D33740" stroke="none" className="text-[#D33740]">
      <path d="M12 1.7L15 8.1L22 9.1L17 14L18.2 21L12 17.7L5.8 21L7 14L2 9.1L9 8.1L12 1.7Z" />
    </svg>
  );
}

function NavButton({ direction, onClick, position }: { direction: 'next' | 'prev', onClick: () => void, position: 'left' | 'right' }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 ${position}-0 z-20 -translate-y-1/2 bg-white p-4 text-black shadow-2xl opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black hover:text-white ${position === 'left' ? '-translate-x-4 group-hover:translate-x-0' : 'translate-x-4 group-hover:translate-x-0'}`}
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
