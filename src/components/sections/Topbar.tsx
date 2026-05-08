'use client';

import React from 'react';

const TOPBAR_ITEMS = [
  'All India fast delivery',
  'Easy returns and refunds',
];

export default function Topbar() {
  return (
    <div className="relative z-[60]">
      <div className="hidden w-full border-b border-white/10 bg-black py-3 text-white lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-12 px-12">
          {TOPBAR_ITEMS.map((item, index) => (
            <React.Fragment key={item}>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[#C5AB7D]" />
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
                  {item}
                </span>
              </div>
              {index < TOPBAR_ITEMS.length - 1 && (
                <div className="h-4 w-px bg-white/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
