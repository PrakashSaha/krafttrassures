'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Topbar from '@/components/sections/Topbar';
import Link from 'next/link';

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Topbar />
      <Header />

      <main>
        {/* Section 1: Hero Section */}
        <section className="relative mx-auto max-w-[1440px] overflow-hidden px-6 pt-20 pb-32 lg:px-20">
          <div className="flex flex-col items-start gap-16 lg:flex-row">
            {/* LEFT: Text */}
            <div className="z-10 flex-1 pt-10">
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
                className="inline-flex items-center gap-3 bg-[#D33740] px-8 py-4 font-sans text-[10px] tracking-[0.3em] text-white uppercase transition-colors hover:bg-black"
              >
                Collect The Pieces <span>→</span>
              </Link>
            </div>

            {/* RIGHT: Overlapping Images with floating card */}
            <div className="relative min-h-[500px] flex-1">
              {/* BACK image - landscape, top-right, larger */}
              <div className="absolute top-0 right-0 z-10 aspect-[4/5] w-[75%]">
                <img
                  src="/images/img_93892b41c09914ab339b71a95c773150.png"
                  alt="Mountain Craft Landscape"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* FRONT image - craft/instrument, bottom-left, smaller, overlapping */}
              <div className="absolute top-[60px] left-0 z-20 aspect-square w-[55%] shadow-xl">
                <img
                  src="/images/img_b6b893bf9561c378a643cae02ba8ff63.png"
                  alt="Craft Instrument"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Card - bottom right, overlapping both images */}
              <div className="absolute right-[-20px] bottom-0 z-30 w-[260px] bg-white p-8 shadow-2xl md:right-[-40px]">
                <p className="mb-3 text-[9px] tracking-widest text-[#C5AB7D] uppercase">
                  Curatorial Principle
                </p>
                <h3 className="mb-3 font-serif text-xl leading-snug text-black">
                  Context Should Travel With The Craft.
                </h3>
                <p className="font-sans text-[11px] leading-relaxed text-black/50">
                  Every piece is presented with origin, material memory, and the story of the hands
                  behind it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Stats Section */}
        <section className="bg-black px-6 py-24 text-white lg:px-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Left: Heading + description */}
              <div>
                <p className="mb-6 text-[9px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                  Store Ledger
                </p>
                <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
                  The Numbers Only Matter Because They Represent People.
                </h2>
                <p className="max-w-md font-sans text-sm leading-relaxed text-white/50">
                  Scale is never the headline for us. These markers exist to show the depth of the
                  ecosystem we are responsible for stewarding.
                </p>
              </div>

              {/* Right: 2x2 Stats grid */}
              <div className="grid grid-cols-2 border border-[#C5AB7D]/30">
                {/* Stat 1 */}
                <div className="border-r border-b border-[#C5AB7D]/30 p-8">
                  <h4 className="mb-4 font-serif text-6xl text-[#C5AB7D] md:text-7xl">26+</h4>
                  <p className="mb-3 text-[10px] tracking-widest text-white uppercase">
                    Major Tribal Lineages
                    <br />
                    Referenced
                  </p>
                  <p className="text-xs leading-relaxed text-white/50">
                    Each with its own material vocabulary, ceremonial codes, and craft memory.
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="border-b border-[#C5AB7D]/30 p-8">
                  <h4 className="mb-4 font-serif text-6xl text-[#C5AB7D] md:text-7xl">180+</h4>
                  <p className="mb-3 text-[10px] tracking-widest text-white uppercase">
                    Artisan Relationships
                    <br />
                    Nurtured
                  </p>
                  <p className="text-xs leading-relaxed text-white/50">
                    Built through repeat sourcing, documentation, and fair-value collaboration.
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="border-r border-[#C5AB7D]/30 p-8">
                  <h4 className="mb-4 font-serif text-6xl text-[#C5AB7D] md:text-7xl">100%</h4>
                  <p className="mb-3 text-[10px] tracking-widest text-white uppercase">
                    Provenance-First Curatorial
                    <br />
                    Model
                  </p>
                  <p className="text-xs leading-relaxed text-white/50">
                    We position origin, authorship, and context as essential parts of luxury.
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="p-8">
                  <h4 className="mb-4 font-serif text-6xl text-[#C5AB7D] md:text-7xl">1</h4>
                  <p className="mb-3 text-[10px] tracking-widest text-white uppercase">
                    Promise Behind Every
                    <br />
                    Object
                  </p>
                  <p className="text-xs leading-relaxed text-white/50">
                    Nothing is detached from its maker, place, or purpose when it enters our
                    collection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Origin Section - "How It Started" */}
        <section className="mx-auto max-w-[1440px] overflow-hidden px-6 py-32 lg:px-20">
          {/* TOP ROW: Left Text | Right Images + Card */}
          <div className="mb-16 flex flex-col gap-16 lg:flex-row">
            {/* LEFT: Text content only */}
            <div className="flex flex-col justify-center lg:w-[40%]">
              <p className="mb-6 text-[9px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                Why We Began
              </p>
              <h2 className="mb-8 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                Kraft Treasure Started With A Simple Refusal.
              </h2>
              <p className="font-sans text-sm leading-relaxed text-black/60">
                We refused to let heritage objects from Arunachal Pradesh be treated as anonymous
                souvenirs or stripped-down design references. The deeper we traveled, the clearer
                the gap became: extraordinary craft existed, but its stories were either missing or
                misrepresented.
              </p>
            </div>

            {/* RIGHT: Large image + small image + yellow card */}
            <div className="flex gap-4 lg:w-[60%]">
              {/* Large image - tall, left */}
              <div className="flex-[1.8]">
                <img
                  src="/images/img_5b2209901953523b207d60b90672822f.jpeg"
                  alt="Artisan at work"
                  className="h-full w-full object-cover"
                  style={{ minHeight: '520px' }}
                />
              </div>

              {/* Right column: small image + yellow card stacked */}
              <div className="flex flex-1 flex-col gap-4">
                <img
                  src="/images/img_d81156df7b760918a15333587af8dc1b.png"
                  alt="Craft Detail"
                  className="w-full object-cover"
                  style={{ height: '240px' }}
                />
                {/* Yellow card */}
                <div className="flex-1 bg-[#FFF8E1] p-6">
                  <p className="mb-3 text-[9px] tracking-widest text-[#C5AB7D] uppercase">
                    What We Protect
                  </p>
                  <h4 className="mb-4 font-serif text-xl leading-snug text-black">
                    Material knowledge, regional authorship, and the dignity of slow making.
                  </h4>
                  <p className="text-xs leading-relaxed text-black/50">
                    Our platform exists to make those values visible to buyers who care about more
                    than surface beauty.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: 3 horizontal cards */}
          <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
            {/* Card 1: Black */}
            <div className="flex gap-6 bg-black p-8 text-white">
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center bg-[#C5AB7D] font-serif text-sm font-bold text-black">
                  01
                </span>
              </div>
              <div>
                <h5 className="mb-2 text-[9px] tracking-widest text-[#C5AB7D] uppercase">
                  Curatorial Method
                </h5>
                <p className="mb-3 font-serif text-lg">Begin With Listening</p>
                <p className="text-xs leading-relaxed text-white/50">
                  We study how an object is used, who makes it, and which parts of the tradition
                  must remain intact.
                </p>
              </div>
            </div>

            {/* Card 2: Light grey/white */}
            <div className="flex gap-6 bg-[#F0EEE9] p-8 text-black">
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center bg-[#D33740] font-serif text-sm font-bold text-white">
                  02
                </span>
              </div>
              <div>
                <h5 className="mb-2 text-[9px] tracking-widest text-black/40 uppercase">
                  Curatorial Method
                </h5>
                <p className="mb-3 font-serif text-lg">Edit With Restraint</p>
                <p className="text-xs leading-relaxed text-black/50">
                  We refine the presentation without redesigning the culture, symbolism, or logic
                  behind the piece.
                </p>
              </div>
            </div>

            {/* Card 3: Cream/yellow */}
            <div className="flex gap-6 bg-[#FFF8E1] p-8 text-black">
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center bg-black font-serif text-sm font-bold text-white">
                  03
                </span>
              </div>
              <div>
                <h5 className="mb-2 text-[9px] tracking-widest text-black/40 uppercase">
                  Curatorial Method
                </h5>
                <p className="mb-3 font-serif text-lg">Return Value To Source</p>
                <p className="text-xs leading-relaxed text-black/50">
                  Value flows back through fair compensation, proper attribution, and long-term
                  respect for the maker.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Philosophy Section */}
        <section className="overflow-hidden bg-[#F5F0E8] py-0">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col lg:flex-row">
              {/* LEFT: Large portrait with quote overlay - full height, no padding */}
              <div className="relative flex-shrink-0 lg:w-[38%]">
                <img
                  src="/images/img_5272ad50803a3ab605149781d666fb4b.png"
                  alt="Elderly Tribal Woman"
                  className="h-full w-full object-cover"
                  style={{ minHeight: '780px' }}
                />
                {/* Dark overlay quote at bottom */}
                <div className="absolute right-0 bottom-0 left-0 bg-black/80 p-8 text-white">
                  <p className="mb-3 text-[9px] tracking-widest text-[#C5AB7D] uppercase">
                    The Collective
                  </p>
                  <p className="font-serif text-xl leading-snug italic">
                    "When craft is named properly, the maker is no longer invisible."
                  </p>
                </div>
              </div>

              {/* RIGHT: Header + 3 product cards */}
              <div className="flex flex-1 flex-col px-12 py-16">
                {/* Header - top of right column */}
                <div className="mb-10">
                  <p className="mb-4 text-[9px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                    Craft Families
                  </p>
                  <h2 className="mb-6 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
                    Different Materials, One Shared Principle: Make With Memory.
                  </h2>
                  <p className="max-w-lg font-sans text-sm leading-relaxed text-black/50">
                    We curate across categories without flattening them into a single aesthetic.
                    Each family of objects arrives with its own history and logic.
                  </p>
                </div>

                {/* 3 Product Cards - below header */}
                <div className="grid flex-1 grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="flex flex-col">
                    <div className="mb-4 aspect-[4/5] w-full overflow-hidden">
                      <img
                        src="/images/img_24c6b995e700c5e6965658f7714891d6.png"
                        alt="Sacred Wall Banner"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h5 className="mb-2 font-serif text-lg">Sacred Wall Banner</h5>
                    <p className="text-xs leading-relaxed text-black/50">
                      A devotional hanging that carries ceremonial symbolism, clear memory, and
                      handcrafted detail.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="flex flex-col">
                    <div className="mb-4 aspect-[4/5] w-full overflow-hidden">
                      <img
                        src="/images/img_ea260192b5d5e7b46cb323470fd4fd8b.png"
                        alt="Lidded Tea Vessel"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h5 className="mb-2 font-serif text-lg">Lidded Tea Vessel</h5>
                    <p className="text-xs leading-relaxed text-black/50">
                      A refined tabletop object shaped by ornament, utility, and the quiet pleasure
                      of everyday ritual.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="flex flex-col">
                    <div className="mb-4 aspect-[4/5] w-full overflow-hidden">
                      <img
                        src="/images/img_f08cce93af6994ee70cdee826c34c554.png"
                        alt="Turquoise Deity Relief"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h5 className="mb-2 font-serif text-lg">Turquoise Deity Relief</h5>
                    <p className="text-xs leading-relaxed text-black/50">
                      A sculptural wall piece where spiritual iconography meets material richness
                      and presence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Commitments Section */}
        <section className="mx-auto max-w-[1440px] px-6 py-32 lg:px-20">
          <div className="flex flex-col gap-20 lg:flex-row">
            {/* LEFT: heading + italic quote */}
            <div className="lg:w-1/3">
              <p className="mb-6 text-[9px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                What We Stand For
              </p>
              <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl">
                Four Commitments Shape Every Decision On The Platform.
              </h2>
              <p className="mb-10 font-sans text-sm leading-relaxed text-black/50">
                These are not brand adjectives. They are operating rules that help us decide what
                belongs in the collection and how it should be presented.
              </p>
              {/* Collector Promise italic quote */}
              <div className="border-l-2 border-[#C5AB7D] pl-6">
                <p className="mb-3 text-[9px] tracking-widest text-[#C5AB7D] uppercase">
                  Collector Promise
                </p>
                <p className="font-serif text-sm leading-relaxed text-black/70 italic">
                  Every object should feel culturally grounded before it ever feels luxurious.
                </p>
              </div>
            </div>

            {/* RIGHT: 2x2 commitment cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:w-2/3">
              <div className="group border border-black/8 bg-white p-8 transition-colors hover:border-[#C5AB7D]">
                <div className="mb-6 flex h-10 w-10 items-center justify-center bg-[#F9F2EA] transition-colors group-hover:bg-[#C5AB7D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#C5AB7D] group-hover:text-white"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h4 className="mb-3 font-serif text-base">Verified provenance</h4>
                <p className="text-xs leading-relaxed text-black/50">
                  Provenance authorship, origin, and narrative documentation so the object stays
                  anchored to its source.
                </p>
              </div>
              <div className="group border border-black/8 bg-white p-8 transition-colors hover:border-[#C5AB7D]">
                <div className="mb-6 flex h-10 w-10 items-center justify-center bg-[#F9F2EA] transition-colors group-hover:bg-[#C5AB7D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#C5AB7D] group-hover:text-white"
                  >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                </div>
                <h4 className="mb-3 font-serif text-base">Respectful commerce</h4>
                <p className="text-xs leading-relaxed text-black/50">
                  Fair-value collaboration matters because preservation fails when the maker is
                  under-recognised or underpaid.
                </p>
              </div>
              <div className="group border border-black/8 bg-white p-8 transition-colors hover:border-[#C5AB7D]">
                <div className="mb-6 flex h-10 w-10 items-center justify-center bg-[#F9F2EA] transition-colors group-hover:bg-[#C5AB7D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#C5AB7D] group-hover:text-white"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h4 className="mb-3 font-serif text-base">Material honesty</h4>
                <p className="text-xs leading-relaxed text-black/50">
                  Natural materials are not just visual choices. They are local knowledge systems
                  shaped by geography and use.
                </p>
              </div>
              <div className="bg-[#D33740] p-8 text-white">
                <div className="mb-6 flex h-10 w-10 items-center justify-center bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h4 className="mb-3 font-serif text-base">Modern presentation</h4>
                <p className="text-xs leading-relaxed text-white/75">
                  Luxury for us means rigor, beauty, and curation without letting tradition into
                  commerce or trend theatre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Footer CTA */}
        <section className="mx-auto max-w-[1440px] px-6 pb-32 lg:px-20">
          <div className="relative overflow-hidden bg-[#1A1A1A] px-10 py-24">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <img
                src="/images/img_93892b41c09914ab339b71a95c773150.png"
                alt="Background Texture"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="lg:max-w-xl">
                <p className="mb-6 text-[9px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                  Continue The Story
                </p>
                <h2 className="mb-6 font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
                  Explore The Collection Or Discover Pieces Rooted In Heritage.
                </h2>
                <p className="font-sans text-sm leading-relaxed text-white/50">
                  Whether you are building a personal collection, sourcing a statement piece, or
                  simply learning the language of fine traditions, we can guide the next step.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col gap-4">
                <Link
                  href="/shop"
                  className="flex items-center gap-3 bg-[#D33740] px-10 py-4 font-sans text-[10px] tracking-[0.3em] whitespace-nowrap text-white uppercase transition-all hover:bg-white hover:text-black"
                >
                  Browse Collection <span>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 border border-white/30 px-10 py-4 font-sans text-[10px] tracking-[0.3em] whitespace-nowrap text-white uppercase transition-all hover:bg-white hover:text-black"
                >
                  Contact The Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
