'use client';

import React from 'react';
import Link from 'next/link';

import { STORY_STEPS } from '@/lib/data';


export default function ArtisanStories() {
  return (
    <section id="artisan-stories" className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-12 lg:px-12 lg:pt-10 lg:pb-16">
      <div className="relative overflow-hidden bg-[#FAF7F2]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative min-h-[400px] lg:min-h-[550px] overflow-hidden">
            <img
              src="/images/img_8c34743a7b92154a6ceed277880a2e12.png"
              alt="Made by Hands. Carried by Heritage."
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-2000 hover:scale-105"
            />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-16">
            <p className="mb-6 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">
              Artisan Stories from Arunachal
            </p>
            <h2 className="mb-8 font-serif text-3xl leading-tight text-black md:text-4xl lg:text-5xl">
              Made by Hands.<br />Carried by Heritage.
            </h2>
            <p className="mb-10 max-w-xl font-sans text-[13px] leading-relaxed text-black/60 sm:text-[14px]">
              Behind every Kraft Treasure piece is an artisan family from Arunachal Pradesh, preserving ancestral skills in small village workshops. Your purchase directly supports local livelihoods and helps sustain the living heritage of our tribal communities.
            </p>
            
            {/* Steps Grid */}
            <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {STORY_STEPS.map((step) => (
                <div key={step.id}>
                  <p className="mb-4 font-serif text-4xl text-[#C5AB7D] opacity-80 lg:text-5xl">
                    {step.id}
                  </p>
                  <h3 className="mb-2 font-sans text-[11px] font-bold tracking-[0.1em] text-black uppercase">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[12px] leading-relaxed text-black/50">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex">
              <Link href="/our-story" className="btn-primary group">
                Learn Our Story
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
