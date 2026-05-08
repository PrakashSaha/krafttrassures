'use client';

import React from 'react';

const VALUES = [
  'Promote Craft',
  'Support the Artisan',
  'Preserve a Heritage',
];

export default function TrustedBy() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20 border-y border-black/5">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center text-center">
        <h2 className="mb-8 font-serif text-3xl text-black md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Trusted by Customers
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 font-sans text-sm tracking-[0.3em] text-black uppercase md:gap-8 md:text-base lg:text-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {VALUES.map((value, index) => (
            <React.Fragment key={value}>
              <div className="flex items-center gap-4">
                <span className="font-bold">{value}</span>
              </div>
              {index < VALUES.length - 1 && (
                <div className="h-1.5 w-1.5 rounded-full bg-[#D33740]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
