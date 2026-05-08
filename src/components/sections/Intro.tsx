'use client';

import React from 'react';

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-[80px] lg:px-12">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute top-[-10%] left-[-5%] aspect-square w-1/3 rotate-[-12deg]">
          <img
            src="/images/img_8dfabc30d59d4b172f1aec28f3d60aba.png"
            alt="Decoration"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="absolute right-[-5%] bottom-[-10%] aspect-square w-1/3 rotate-[12deg]">
          <img
            src="/images/img_93892b41c09914ab339b71a95c773150.png"
            alt="Decoration"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-8 font-serif text-[28px] leading-tight text-black sm:text-[34px] md:text-[38px] lg:text-[44px] xl:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Authentic Arunachal Pradesh Artifacts <br className="hidden lg:block" />
          Handmade Heritage for Modern Homes
        </h2>
        <div className="font-sans text-[13px] leading-relaxed text-black/60 sm:text-[15px] lg:text-[16px] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <p>
            Arunachal Pradesh is known for its rich tribal craftsmanship where every artifact carries a cultural story, shaped by the hills, forests, and community traditions. From bamboo and cane utility artifacts to handloom textiles, bead jewellery, and ritual-inspired masks, these products are created using time-tested techniques passed across generations. At Kraft Treasure, we bring these genuine Arunachal artifacts online directly sourced from artisan communities, so you can own handmade décor and lifestyle pieces that feel rooted, sustainable, and truly original.
          </p>
        </div>
      </div>
    </section>
  );
}
