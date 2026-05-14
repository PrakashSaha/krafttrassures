import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ADORNMENTS_DATA } from '@/lib/data';

interface AdornmentCardProps {
  title: string;
  subtitle: string;
  priceText: string;
  image: string;
  href: string;
  large?: boolean;
}

export default function Adornments() {
  const largeCard = ADORNMENTS_DATA.find(card => card.large);
  const smallCards = ADORNMENTS_DATA.filter(card => !card.large);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-20 lg:px-12">
      <div className="grid min-h-[600px] grid-cols-1 gap-4 lg:h-[700px] lg:grid-cols-2 lg:gap-6">
        {largeCard && <AdornmentCard {...largeCard} />}
        <div className="flex flex-col gap-4 lg:gap-6">
          {smallCards.map((card, idx) => (
            <AdornmentCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AdornmentCard({ title, subtitle, priceText, image, href, large }: AdornmentCardProps) {
  return (
    <div className={`group relative overflow-hidden bg-zinc-100 ${large ? 'h-[500px] lg:h-full' : 'min-h-[300px] flex-1'}`}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-8 z-20 flex flex-col justify-end text-white">
        <p className="mb-2 font-sans text-[10px] tracking-[0.4em] text-white/80 uppercase">
          {subtitle}
        </p>
        <h3 className={`font-serif leading-tight ${large ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} mb-3`}>
          {title}
        </h3>
        <p className="mb-6 font-sans text-[12px] tracking-wide text-white/60">
          {priceText}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 border-b border-white/20 pb-1 font-sans text-[10px] tracking-[0.2em] uppercase transition-all hover:border-white hover:gap-3"
        >
          Explore Collection
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  );
}
