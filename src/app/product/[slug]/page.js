'use client';

import { useState, use } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Topbar from '@/components/sections/Topbar';
import Link from 'next/link';

// Mock product data populated from the shop page
const products = [
  {
    id: 1,
    slug: 'monpa-rangzen-rang-dun',
    name: 'Monpa Rangzen Rang-Dun – Colorful Floral Mandala Painted Tongue Drum',
    category: 'Musical Instrument',
    price: '₹3,499',
    image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
    thumbnails: [
      '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
      '/images/img_b6b893bf9561c378a643cae02ba8ff63.png',
    ],
    material: 'Tuned steel',
    origin: 'Tawang District',
    availability: 'In Stock',
    description:
      'This hand-painted tongue drum features vibrant floral mandala patterns and produces resonant, meditative tones. It is traditionally used in Monpa cultural ceremonies and personal meditation.',
    fullDescription:
      'Discover deep relaxation and spiritual connection with this Monpa Rangzen Rang-Dun. Crafted from tuned steel and hand-painted by master artisans, the drum is adorned with intricate floral mandalas that represent the blooming spirituality of the mountains.\n\nIt produces highly resonant, meditative tones that are traditionally utilized in Himalayan healing practices and spiritual rituals. The precision tuning ensures a harmonious and calming soundscape.\n\nWhether used for music therapy or personal meditation, this drum offers a profound auditory experience. It bridges the gap between musical instrument and spiritual tool.',
  },
  {
    id: 2,
    slug: 'sacred-ceremonial-wall-mask',
    name: 'Sacred Ceremonial Wall Mask',
    category: 'Masks',
    price: '₹3,100',
    image: '/images/img_2494a847f0389601eacab27aa7fb9c69.png',
    thumbnails: [
      '/images/img_2494a847f0389601eacab27aa7fb9c69.png',
      '/images/img_585ed4af2ec8b815204939c92c061c8a.png',
    ],
    material: 'Hand-carved wood',
    origin: 'West Kameng District',
    availability: 'In Stock',
    description:
      'A traditional ceremonial mask representing sacred mountain deities, carved from single-block wood and finished with organic pigments.',
    fullDescription:
      'This Sacred Ceremonial Wall Mask is an authentic artifact from the tribal heartlands of Arunachal Pradesh. Each mask is hand-carved by hereditary artisans from the Monpa community, using techniques passed down through generations.\n\nThe mask represents powerful protective spirits and is traditionally used in the Cham dances and other monastic rituals. The wood is seasoned naturally and finished with pigments derived from mountain minerals and local flora.\n\nPerfect as a centerpiece for a heritage-inspired space, this mask brings a sense of ancient protection and cultural depth to any home.',
  },
  {
    id: 3,
    slug: 'monpa-zang-bum',
    name: 'Monpa Zang Bum – Sacred Ceremonial Pottery',
    category: 'Ceremonial Pottery',
    price: '₹2,499',
    image: '/images/img_04927e860f65c51b5946f8b1b24831da.png',
    thumbnails: [
      '/images/img_04927e860f65c51b5946f8b1b24831da.png',
      '/images/img_a9132c04a3411b218b8addb9be42a9ba.png',
    ],
    material: 'Hand-fired clay',
    origin: 'Tawang District',
    availability: 'In Stock',
    description:
      'Traditionally used for sacred libations, this ceramic vessel features ancient motifs and a hand-applied glaze finish.',
    fullDescription:
      "The Monpa Zang Bum is more than just a vessel; it is a repository of ceremonial history. Hand-shaped from locally sourced river clay, this pottery piece undergoes a multi-day firing process in traditional wood kilns.\n\nThe vessel's shape and the intricate motifs etched onto its surface are symbolic of abundance and spiritual purity. In Himalayan households, such pieces are used during important lunar festivals and life-cycle rituals.\n\nIts tactile surface and organic imperfections are markers of its slow, deliberate creation, making it a unique collectible for those who value authentic material culture.",
  },
  {
    id: 16,
    slug: 'patterned-steel',
    name: 'Sacred Geometric Steel Tongue Drum',
    category: 'Shop Pieces',
    price: '₹6,800',
    image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
    thumbnails: [
      '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
      '/images/img_b6b893bf9561c378a643cae02ba8ff63.png',
    ],
    material: 'Tuned steel',
    origin: 'Papum Pare District',
    availability: 'In Stock',
    description:
      'This tuned steel tongue drum features sacred geometric patterns and produces resonant, meditative tones. It is traditionally used in Tibetan healing and spiritual rituals.',
    fullDescription:
      'Discover deep relaxation and spiritual connection with this Sacred Geometric Steel Tongue Drum. Crafted from tuned steel in the Papum Pare District, the drum is adorned with intricate sacred geometric patterns.\n\nIt produces highly resonant, meditative tones that are traditionally utilized in Tibetan healing practices and spiritual rituals. The precision tuning ensures a harmonious and calming soundscape.\n\nWhether used for music therapy or personal meditation, this drum offers a profound auditory experience. It bridges the gap between musical instrument and spiritual tool.',
  },
];

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Find product by slug with a fallback
  const product = products.find((p) => p.slug === slug) || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    category: 'Collection Piece',
    price: '₹2,800',
    image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
    thumbnails: ['/images/img_9f9a8b413ddac6051a530306ccddb534.png'],
    material: 'Natural materials',
    origin: 'Arunachal Pradesh',
    availability: 'In Stock',
    description: 'An authentic handcrafted piece from our heritage collection.',
    fullDescription:
      'This authentic handcrafted piece is part of our heritage collection, representing the rich tribal artistry of Arunachal Pradesh. Every detail is meticulously finished by master artisans to ensure quality and cultural integrity.',
  };

  const relatedProducts = [
    {
      id: 4,
      name: 'Tribal Sun Guardian Shield',
      category: 'CURM PIECES',
      price: '₹8,500',
      image: '/images/img_a798301695a75446cda6944aecd9a0d9.jpeg',
      href: '/product/sacred-taming-monastery',
    },
    {
      id: 3,
      name: 'Serene Buddha Head Sculpture',
      category: 'SHOW PIECES',
      price: '₹9,400',
      image: '/images/img_04927e860f65c51b5946f8b1b24831da.png',
      href: '/product/monpa-zang-bum',
    },
    {
      id: 16,
      name: 'Patterned Steel Tongue Drum',
      category: 'DRUM PIECES',
      price: '₹2,800',
      image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
      href: '/product/patterned-steel',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Topbar />
      <Header />

      <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-20 lg:py-12">
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center gap-2 text-[10px] tracking-widest text-black/40 uppercase">
          <Link href="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <span>/</span>
          <span className="text-black/20 uppercase">{product.category}</span>
        </nav>

        <div className="mb-24 flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Left: Product Images */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="group aspect-[4/5] overflow-hidden border border-black/5 bg-white shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="flex gap-4">
              {product.thumbnails?.map((thumb, idx) => (
                <button
                  key={idx}
                  className="aspect-square w-20 overflow-hidden border border-black/5 bg-white transition-all duration-300 hover:border-[#C5AB7D] lg:w-24"
                >
                  <img
                    src={thumb}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover opacity-80 transition-opacity hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col lg:w-1/2">
            <div className="mb-8">
              <p className="mb-4 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                {product.category}
              </p>
              <h1 className="mb-6 font-serif text-4xl leading-tight text-black lg:text-5xl">
                {product.name}
              </h1>
              <p className="font-serif text-3xl text-[#C5AB7D]">{product.price}</p>
            </div>

            <p className="mb-10 max-w-lg border-l-2 border-[#C5AB7D]/20 py-1 pl-6 font-sans text-[15px] leading-relaxed text-black/60">
              {product.description}
            </p>

            {/* Product Meta */}
            <div className="mb-12 grid grid-cols-2 gap-y-8 border-t border-b border-black/5 py-10 sm:grid-cols-3">
              <div>
                <p className="mb-2 text-[9px] tracking-[0.3em] text-black/40 uppercase">Material</p>
                <p className="font-sans text-sm font-medium text-black">{product.material}</p>
              </div>
              <div>
                <p className="mb-2 text-[9px] tracking-[0.3em] text-black/40 uppercase">Origin</p>
                <p className="font-sans text-sm font-medium text-black">{product.origin}</p>
              </div>
              <div>
                <p className="mb-2 text-[9px] tracking-[0.3em] text-black/40 uppercase">
                  Availability
                </p>
                <p className="flex items-center gap-2 font-sans text-sm font-medium text-black">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  {product.availability}
                </p>
              </div>
            </div>

            {/* Actions - Refined for better UI/UX */}
            <div className="mb-10 flex flex-col items-stretch gap-4 sm:flex-row">
              {/* Quantity Selector */}
              <div className="flex h-14 items-center border border-black/10 bg-white/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-full items-center justify-center px-5 text-black transition-colors hover:bg-black/5"
                  aria-label="Decrease quantity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-10 text-center font-sans text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-full items-center justify-center px-5 text-black transition-colors hover:bg-black/5"
                  aria-label="Increase quantity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5v14" />
                  </svg>
                </button>
              </div>

              {/* Add To Cart */}
              <button className="flex min-h-[56px] flex-1 items-center justify-center gap-3 bg-[#D33740] px-8 py-4 font-sans text-[10px] tracking-[0.3em] whitespace-nowrap text-white uppercase shadow-lg shadow-[#D33740]/10 transition-all duration-500 hover:bg-black hover:shadow-[#D33740]/20 active:scale-[0.98] sm:px-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Add To Cart
              </button>

              {/* Wishlist */}
              <button className="group flex h-14 shrink-0 items-center justify-center gap-3 border border-black/10 px-8 transition-all duration-300 hover:border-[#D33740] hover:bg-[#D33740] hover:text-white active:scale-[0.98]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all group-hover:fill-current"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase">
                  Wishlist
                </span>
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-8 border-t border-black/5 pt-10">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.15em] text-black/40 uppercase">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C5AB7D]/30">
                  <svg
                    className="text-[#C5AB7D]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                Authenticity Guaranteed
              </div>
              <div className="flex items-center gap-3 text-[10px] tracking-[0.15em] text-black/40 uppercase">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C5AB7D]/30">
                  <svg
                    className="text-[#C5AB7D]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2ZM2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4M6 10v4M18 10v4" />
                  </svg>
                </div>
                Insured Shipping Across India
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-24 pt-12">
          <div className="mb-16 flex gap-12 border-b border-black/5">
            <button
              onClick={() => setActiveTab('description')}
              className={`relative pb-5 font-sans text-[10px] tracking-[0.3em] uppercase transition-all ${activeTab === 'description' ? 'font-semibold text-black' : 'text-black/30 hover:text-black/60'}`}
            >
              Product Description
              {activeTab === 'description' && (
                <div className="absolute right-0 bottom-[-1px] left-0 h-[2px] bg-[#C5AB7D]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`relative pb-5 font-sans text-[10px] tracking-[0.3em] uppercase transition-all ${activeTab === 'shipping' ? 'font-semibold text-black' : 'text-black/30 hover:text-black/60'}`}
            >
              Shipping & Returns
              {activeTab === 'shipping' && (
                <div className="absolute right-0 bottom-[-1px] left-0 h-[2px] bg-[#C5AB7D]"></div>
              )}
            </button>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' ? (
              <div className="animate-fadeIn space-y-8">
                <h2 className="max-w-2xl font-serif text-3xl leading-tight text-black lg:text-4xl">
                  Discover deep relaxation and spiritual connection with this {product.name}
                </h2>
                <div className="space-y-6 border-l-2 border-[#FAF7F2] pl-10 font-sans text-[15px] leading-relaxed whitespace-pre-line text-black/60">
                  {product.fullDescription}
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn space-y-6 font-sans text-[15px] leading-relaxed text-black/60">
                <p>
                  We take immense care in packing our fragile heritage pieces. Every order is
                  meticulously wrapped in multi-layered protective materials and secured in
                  specialized crates if necessary.
                </p>
                <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-2">
                  <div className="border border-black/5 bg-white p-6 shadow-sm">
                    <h4 className="mb-4 font-serif text-xs tracking-widest uppercase">
                      Delivery Timeline
                    </h4>
                    <p className="text-sm">
                      Standard delivery within India: 7-12 business days depending on the tribal
                      cluster origin.
                    </p>
                  </div>
                  <div className="border border-black/5 bg-white p-6 shadow-sm">
                    <h4 className="mb-4 font-serif text-xs tracking-widest uppercase">
                      Return Policy
                    </h4>
                    <p className="text-sm">
                      Due to the rare and handcrafted nature of our pieces, returns are accepted
                      only for transit damage verified within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Artisan Section */}
        <section className="mb-32 overflow-hidden border border-black/5 bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center p-12 lg:w-1/2 lg:p-24">
              <p className="mb-8 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                Arunachal Pradesh Artisans
              </p>
              <h2 className="mb-10 font-serif text-4xl leading-tight text-black lg:text-5xl">
                Living craft traditions carried forward by tribal communities
              </h2>
              <p className="mb-10 max-w-md font-sans text-[15px] leading-relaxed text-black/60">
                Kraft Treasure curates from community makers and artisan families across Arunachal
                Pradesh, ensuring each release remains rooted in regional material culture, ritual
                references, and hand-finished character.
              </p>
              <ul className="mb-12 space-y-6">
                {[
                  'Direct sourcing from artisan-led clusters and family workshops.',
                  'Small-batch pieces selected for provenance, finish, and authenticity.',
                  'Collections shaped by heritage context instead of mass-market repetition.',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 border-b border-black/5 pb-4 font-sans text-xs text-black/70 italic"
                  >
                    <span className="font-bold text-[#D33740]">0{idx + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/our-story"
                className="inline-flex w-fit items-center gap-4 bg-[#D33740] px-10 py-5 font-sans text-[10px] tracking-[0.4em] text-white uppercase shadow-lg shadow-[#D33740]/10 transition-all duration-500 hover:bg-black"
              >
                Read Our Story <span>→</span>
              </Link>
            </div>
            <div className="group relative lg:w-1/2">
              <img
                src="/images/img_5b2209901953523b207d60b90672822f.jpeg"
                alt="Artisans at work"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0"></div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="pb-24">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <p className="mb-4 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase">
                You May Also Appreciate
              </p>
              <h2 className="font-serif text-4xl leading-tight text-black">
                From the Same Collection
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-4 bg-[#D33740] px-10 py-4 font-sans text-[10px] tracking-[0.3em] text-white uppercase shadow-lg shadow-[#D33740]/10 transition-all duration-500 hover:bg-black md:flex"
            >
              View All Pieces <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {relatedProducts.map((rel) => (
              <Link key={rel.id} href={rel.href} className="group flex flex-col">
                <div className="relative mb-8 aspect-[4/5] overflow-hidden border border-black/5 bg-[#F5F5F5]">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  {/* Quick view button */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="border border-black/5 bg-white px-6 py-3 font-sans text-[9px] tracking-[0.2em] text-black uppercase shadow-xl">
                      Explore Piece
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-sans text-[9px] font-medium tracking-[0.4em] text-[#C5AB7D] uppercase">
                    {rel.category}
                  </p>
                  <h3 className="font-serif text-lg leading-snug text-black transition-colors duration-300 group-hover:text-[#D33740]">
                    {rel.name}
                  </h3>
                  <p className="font-sans text-sm text-black/60">{rel.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/shop"
            className="mt-16 flex w-full items-center justify-center gap-4 bg-[#D33740] px-10 py-5 font-sans text-[10px] tracking-[0.3em] text-white uppercase shadow-lg transition-all hover:bg-black md:hidden"
          >
            View All Pieces <span>→</span>
          </Link>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
