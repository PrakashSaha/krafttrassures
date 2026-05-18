import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AdornmentItem {
  title: string;
  subtitle: string;
  priceText: string;
  image: string;
  href: string;
}

interface AdornmentsProps {
  items: AdornmentItem[];
}

export default function Adornments({ items }: AdornmentsProps) {
  // Limit to max 5 items
  const displayItems = items?.slice(0, 5) || [];
  
  if (displayItems.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-16">
      <div className="mb-16 text-center lg:text-left">
        <p className="mb-4 text-[11px] font-medium tracking-[0.5em] text-[#C5AB7D] uppercase">Heritage Collection</p>
        <h2 className="font-serif text-5xl text-zinc-900 lg:text-6xl tracking-tight">Curated Adornments</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 h-auto lg:h-[850px]">
        {displayItems.map((item, idx) => (
          <AdornmentCard 
            key={idx} 
            {...item} 
            index={idx}
            total={displayItems.length}
          />
        ))}
      </div>
    </section>
  );
}

function AdornmentCard({ title, subtitle, priceText, image, href, index, total }: AdornmentItem & { index: number; total: number }) {
  // Refined Bento Grid Span Logic for Cleanliness (Referencing Image 2)
  let spanClasses = "";
  
  if (total === 1) {
    spanClasses = "lg:col-span-4 lg:row-span-2";
  } else if (total === 2) {
    spanClasses = "lg:col-span-2 lg:row-span-2";
  } else if (total === 3) {
    if (index === 0) spanClasses = "lg:col-span-2 lg:row-span-2"; // Tall Left
    else spanClasses = "lg:col-span-2 lg:row-span-1"; // Stacked Right
  } else if (total === 4) {
    if (index === 0) spanClasses = "lg:col-span-2 lg:row-span-2"; // Tall Left
    else if (index === 1) spanClasses = "lg:col-span-2 lg:row-span-1"; // Top Right
    else spanClasses = "lg:col-span-1 lg:row-span-1"; // Bottom Right 1 & 2
  } else if (total === 5) {
    if (index === 0) spanClasses = "lg:col-span-2 lg:row-span-2"; // Tall Left
    else if (index === 1) spanClasses = "lg:col-span-2 lg:row-span-1"; // Top Right
    else if (index === 2) spanClasses = "lg:col-span-1 lg:row-span-1"; // Bottom Right 1
    else if (index === 3) spanClasses = "lg:col-span-1 lg:row-span-1"; // Bottom Right 2
    else spanClasses = "lg:col-span-4 lg:row-span-1 mt-4"; // wide footer-like item if 5th exists
  }

  return (
    <Link 
      href={href}
      className={`group relative flex flex-col overflow-hidden bg-zinc-100 transition-all duration-1000 ease-in-out hover:shadow-3xl ${spanClasses} min-h-[400px]`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
      
      {/* Sophisticated Atmospheric Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-60" />
      
      {/* Interactive Border */}
      <div className="absolute inset-0 z-20 border border-white/0 transition-all duration-700" />

      <div className="absolute inset-8 lg:inset-12 z-30 flex flex-col justify-end">
        <div className="transform transition-all duration-700">
          <p className="mb-3 font-sans text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase">
            {subtitle}
          </p>
          <h3 className="mb-4 font-serif text-3xl leading-[1.1] text-white lg:text-4xl group-hover:text-[#C5AB7D] transition-colors duration-500">
            {title}
          </h3>
          <p className="font-sans text-[13px] tracking-wide text-white/60">
              {priceText}
            </p>
            
            <div className="inline-flex items-center gap-3 text-white/90 font-sans text-[10px] tracking-[0.3em] uppercase">
              <span className="border-b border-white/30 pb-1 group-hover:border-[#C5AB7D] transition-colors">Explore Collection</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
        </div>
      </div>
    </Link>
  );
}


