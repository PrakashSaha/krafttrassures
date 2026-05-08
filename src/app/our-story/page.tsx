'use client';

import React from 'react';
import Link from 'next/link';

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main>
        {/* Section 1: Hero Section */}
        <section className="relative mx-auto max-w-[1440px] overflow-hidden px-6 pt-20 pb-32 lg:px-20">
          <div className="flex flex-col items-start gap-16 lg:flex-row">
            {/* LEFT: Text */}
            <div className="z-10 flex-1 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <p className="mb-4 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                Our Story
              </p>
              <h1 className="mb-8 font-serif text-4xl leading-tight text-black md:text-5xl lg:text-6xl">
                A Living Archive <br />
                Of Mountain Craft.
              </h1>
              <p className="mb-10 max-w-sm font-sans text-sm leading-relaxed text-black/60">
                Kraft Treasure brings the artistry of Arunachal Pradesh into contemporary collecting
                while preserving the people, place, and cultural memory behind every piece.
              </p>
              <Link
                href="/shop"
                className="btn-primary"
              >
                Collect The Pieces
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>

            {/* RIGHT: Overlapping Images */}
            <div className="relative min-h-[500px] flex-1 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="absolute top-0 right-0 z-10 aspect-[4/5] w-[75%] overflow-hidden shadow-2xl">
                <img
                  src="/images/img_93892b41c09914ab339b71a95c773150.png"
                  alt="Mountain Craft"
                  className="h-full w-full object-cover transition-transform duration-2000 hover:scale-105"
                />
              </div>
              <div className="absolute top-[60px] left-0 z-20 aspect-square w-[55%] shadow-2xl overflow-hidden border-4 border-white">
                <img
                  src="/images/img_b6b893bf9561c378a643cae02ba8ff63.png"
                  alt="Craft Detail"
                  className="h-full w-full object-cover transition-transform duration-2000 hover:scale-110"
                />
              </div>
              <div className="absolute right-[-20px] bottom-0 z-30 w-[260px] bg-white p-8 shadow-2xl md:right-[-40px] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                <p className="mb-3 text-[9px] font-bold tracking-widest text-[#C5AB7D] uppercase">Curatorial Principle</p>
                <h3 className="mb-3 font-serif text-xl leading-snug text-black">Context Should Travel With The Craft.</h3>
                <p className="font-sans text-[11px] leading-relaxed text-black/50">
                  Every piece is presented with origin, material memory, and the story of the hands behind it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Stats Section */}
        <section className="bg-black px-6 py-24 text-white lg:px-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                <p className="mb-6 text-[9px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Store Ledger</p>
                <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">The Numbers Only Matter Because They Represent People.</h2>
                <p className="max-w-md font-sans text-sm leading-relaxed text-white/50">
                  Scale is never the headline for us. These markers exist to show the depth of the ecosystem we are responsible for stewarding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#C5AB7D]/20 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                <StatCard value="26+" label="Tribal Lineages Referenced" desc="Each with its own material vocabulary, ceremonial codes, and craft memory." borderRight borderBottom />
                <StatCard value="180+" label="Artisan Relationships Nurtured" desc="Built through repeat sourcing, documentation, and fair-value collaboration." borderBottom />
                <StatCard value="100%" label="Provenance-First Curatorial Model" desc="We position origin, authorship, and context as essential parts of luxury." borderRight />
                <StatCard value="1" label="Promise Behind Every Object" desc="Nothing is detached from its maker, place, or purpose when it enters our collection." />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Origin Section */}
        <section className="mx-auto max-w-[1440px] overflow-hidden px-6 py-32 lg:px-20">
          <div className="mb-16 flex flex-col gap-16 lg:flex-row items-center">
            <div className="lg:w-[40%] animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <p className="mb-6 text-[9px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Why We Began</p>
              <h2 className="mb-8 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">Kraft Treasure Started With A Simple Refusal.</h2>
              <p className="font-sans text-[14px] leading-relaxed text-black/60">
                We refused to let heritage objects from Arunachal Pradesh be treated as anonymous souvenirs. Extraordinary craft existed, but its stories were either missing or misrepresented.
              </p>
            </div>

            <div className="flex gap-4 lg:w-[60%] h-[520px] animate-in fade-in slide-in-from-right-8 duration-1000 delay-400">
              <div className="flex-[1.8] overflow-hidden">
                <img src="/images/img_5b2209901953523b207d60b90672822f.jpeg" alt="Artisan" className="h-full w-full object-cover transition-transform duration-2000 hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <div className="h-[240px] overflow-hidden">
                  <img src="/images/img_d81156df7b760918a15333587af8dc1b.png" alt="Detail" className="h-full w-full object-cover transition-transform duration-2000 hover:scale-110" />
                </div>
                <div className="flex-1 bg-[#FAF7F2] p-8 border border-black/5">
                  <p className="mb-3 text-[9px] font-bold tracking-widest text-[#C5AB7D] uppercase">What We Protect</p>
                  <h4 className="mb-4 font-serif text-xl leading-snug text-black">Material knowledge, regional authorship, and the dignity of slow making.</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-black/5">
            <MethodCard num="01" title="Begin With Listening" desc="We study how an object is used, who makes it, and which parts of the tradition must remain intact." bg="bg-black" text="text-white" accent="bg-[#C5AB7D]" />
            <MethodCard num="02" title="Edit With Restraint" desc="We refine the presentation without redesigning the culture, symbolism, or logic behind the piece." bg="bg-white" text="text-black" accent="bg-[#D33740]" />
            <MethodCard num="03" title="Return Value To Source" desc="Value flows back through fair compensation, proper attribution, and long-term respect for the maker." bg="bg-[#FAF7F2]" text="text-black" accent="bg-black" />
          </div>
        </section>

        {/* Section 4: Philosophy Section */}
        <section className="overflow-hidden bg-[#F5F0E8] py-0">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col lg:flex-row">
              <div className="relative lg:w-[38%] min-h-[780px]">
                <img src="/images/img_5272ad50803a3ab605149781d666fb4b.png" alt="Heritage" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/90 p-10 text-white backdrop-blur-md">
                  <p className="mb-3 text-[9px] font-bold tracking-widest text-[#C5AB7D] uppercase">The Collective</p>
                  <p className="font-serif text-2xl leading-snug italic">"When craft is named properly, the maker is no longer invisible."</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-12 py-24 justify-center">
                <div className="mb-16">
                  <p className="mb-4 text-[9px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Craft Families</p>
                  <h2 className="mb-8 max-w-xl font-serif text-4xl leading-tight md:text-5xl">Different Materials, One Shared Principle: Make With Memory.</h2>
                  <p className="max-w-lg font-sans text-sm leading-relaxed text-black/50">
                    We curate across categories without flattening them into a single aesthetic. Each family of objects arrives with its own history and logic.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <PhilosophyItem img="/images/img_24c6b995e700c5e6965658f7714891d6.png" title="Sacred Wall Banner" desc="A devotional hanging that carries ceremonial symbolism and handcrafted detail." />
                  <PhilosophyItem img="/images/img_ea260192b5d5e7b46cb323470fd4fd8b.png" title="Lidded Tea Vessel" desc="A refined tabletop object shaped by ornament, utility, and everyday ritual." />
                  <PhilosophyItem img="/images/img_f08cce93af6994ee70cdee826c34c554.png" title="Deity Relief" desc="A sculptural wall piece where spiritual iconography meets material richness." />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Footer CTA */}
        <section className="mx-auto max-w-[1440px] px-6 py-32 lg:px-20">
          <div className="relative overflow-hidden bg-black px-10 py-24 text-center lg:text-left">
            <div className="absolute inset-0 opacity-20">
              <img src="/images/img_93892b41c09914ab339b71a95c773150.png" alt="BG" className="h-full w-full object-cover" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="lg:max-w-2xl">
                <p className="mb-6 text-[9px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Continue The Story</p>
                <h2 className="mb-6 font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl">Explore The Collection Or Discover Pieces Rooted In Heritage.</h2>
                <p className="font-sans text-sm leading-relaxed text-white/50">
                  Whether you are building a personal collection or simply learning the language of fine traditions, we can guide the next step.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-w-[240px]">
                <Link href="/shop" className="btn-primary w-full">Browse Collection</Link>
                <Link href="/contact" className="btn-outline w-full text-white border-white/20 hover:bg-white hover:text-black">Contact The Team</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .btn-primary {
          @apply group relative inline-flex items-center justify-center gap-2 bg-[#D33740] px-10 py-5 font-sans text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-white hover:text-black active:scale-[0.98];
        }
        .btn-outline {
          @apply inline-flex items-center justify-center border border-black/10 px-10 py-5 font-sans text-[11px] font-bold tracking-[0.3em] uppercase transition-all active:scale-[0.98];
        }
      `}</style>
    </div>
  );
}

function StatCard({ value, label, desc, borderRight, borderBottom }: any) {
  return (
    <div className={`p-8 ${borderRight ? 'sm:border-r' : ''} ${borderBottom ? 'border-b' : ''} border-[#C5AB7D]/20`}>
      <h4 className="mb-4 font-serif text-6xl text-[#C5AB7D] md:text-7xl">{value}</h4>
      <p className="mb-3 text-[10px] font-bold tracking-widest text-white uppercase">{label}</p>
      <p className="text-xs leading-relaxed text-white/40">{desc}</p>
    </div>
  );
}

function MethodCard({ num, title, desc, bg, text, accent }: any) {
  return (
    <div className={`flex gap-6 ${bg} ${text} p-8`}>
      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center ${accent} font-serif text-sm font-bold ${bg === 'bg-black' ? 'text-black' : 'text-white'}`}>
        {num}
      </div>
      <div>
        <h5 className={`mb-2 text-[9px] font-bold tracking-widest ${bg === 'bg-black' ? 'text-[#C5AB7D]' : 'text-black/40'} uppercase`}>Curatorial Method</h5>
        <p className="mb-3 font-serif text-lg">{title}</p>
        <p className={`text-xs leading-relaxed ${bg === 'bg-black' ? 'text-white/50' : 'text-black/50'}`}>{desc}</p>
      </div>
    </div>
  );
}

function PhilosophyItem({ img, title, desc }: any) {
  return (
    <div className="flex flex-col group">
      <div className="mb-5 aspect-[4/5] overflow-hidden">
        <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
      </div>
      <h5 className="mb-2 font-serif text-lg">{title}</h5>
      <p className="text-[12px] leading-relaxed text-black/50">{desc}</p>
    </div>
  );
}
