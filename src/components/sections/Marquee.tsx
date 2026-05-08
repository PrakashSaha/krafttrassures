'use client';

import React from 'react';

const MARQUEE_TEXTS = [
  'Ethically Sourced & Handcrafted',
  'Ancient Traditions, Modern Luxury',
  'Discover the Soul of Arunachal Pradesh',
  'Heritage Artistry Delivered Worldwide',
];

export default function Marquee() {
  return (
    <div className="relative z-20 mt-10 mb-12 overflow-hidden border-y border-black/5 bg-[#FAF7F2] py-8">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex items-center">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {MARQUEE_TEXTS.map((text, idx) => (
                <div key={idx} className="mx-12 flex items-center gap-6">
                  <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-black uppercase md:text-xs">
                    {text}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-[#D33740]" />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
