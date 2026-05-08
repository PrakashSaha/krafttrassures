'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Topbar from '@/components/sections/Topbar';
import Link from 'next/link';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const products = [
    {
      id: 1,
      name: 'Monpa Rangzen Rang-Dun – Colorful Floral Mandala Painted Tongue Drum',
      category: 'Musical Instrument',
      price: '₹3,499',
      image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
      href: '/product/monpa-rangzen-rang-dun',
    },
    {
      id: 2,
      name: 'Sacred Ceremonial Wall Mask',
      category: 'Masks',
      price: '₹3,100',
      image: '/images/img_2494a847f0389601eacab27aa7fb9c69.png',
      href: '/product/sacred-ceremonial-wall-mask',
    },
    {
      id: 3,
      name: 'Monpa Zang Bum – Sacred Ceremonial Pottery',
      category: 'Ceremonial Pottery',
      price: '₹2,499',
      image: '/images/img_04927e860f65c51b5946f8b1b24831da.png',
      href: '/product/monpa-zang-bum',
    },
    {
      id: 4,
      name: 'Sacred Taming Monastery Wall Hanging',
      category: 'Others',
      price: '₹3,800',
      image: '/images/img_a798301695a75446cda6944aecd9a0d9.jpeg',
      href: '/product/sacred-taming-monastery',
    },
    {
      id: 5,
      name: 'Sacred Geometric Steel Tongs',
      category: 'Sacred Pieces',
      price: '₹6,000',
      image: '/images/img_d81156df7b760918a15333587af8dc1b.png',
      href: '/product/sacred-geometric-steel-tongs',
    },
    {
      id: 6,
      name: 'Imperial Dragon Motif Teacup',
      category: 'Cups and Plates',
      price: '₹1,800',
      image: '/images/img_d81156df7b760918a15333587af8dc1b.png',
      href: '/product/imperial-dragon-motif-teacup',
    },
    {
      id: 7,
      name: 'Monpa Pot-Pu – Blue & White Decorative Ceramic',
      category: 'Decorative Ceramics',
      price: '₹1,599',
      image: '/images/img_86a8927604bc9322fca261f48b29454a.png',
      href: '/product/monpa-pot-pu',
    },
    {
      id: 8,
      name: 'Monpa Mahakala – Sacred Deity Mask',
      category: 'Masks',
      price: '₹4,999',
      image: '/images/img_86a8927604bc9322fca261f48b29454a.png',
      href: '/product/monpa-mahakala',
    },
    {
      id: 9,
      name: 'Monpa Hand-Painted Tribal Musical Instrument',
      category: 'Musical Instrument',
      price: '₹3,299',
      image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
      href: '/product/monpa-hand-painted',
    },
    {
      id: 10,
      name: 'Monpa Gkar Bum – Golden Ceremonial Vessel',
      category: 'Ceremonial Pottery',
      price: '₹3,499',
      image: '/images/img_a9132c04a3411b218b8addb9be42a9ba.png',
      href: '/product/monpa-gkar-bum',
    },
    {
      id: 11,
      name: 'Monpa Golden Dragon Figurine – Hand-Cast Celestial Guardian',
      category: 'Figurine & Sculpture',
      price: '₹5,499',
      image: '/images/img_a9132c04a3411b218b8addb9be42a9ba.png',
      href: '/product/monpa-golden-dragon',
    },
    {
      id: 12,
      name: 'Monpa Thangka – Hand-Woven Textile Wall Art',
      category: 'Textile & Weaving',
      price: '₹3,700',
      image: '/images/img_86a8927604bc9322fca261f48b29454a.png',
      href: '/product/monpa-thangka',
    },
    {
      id: 13,
      name: 'Monpa Bhutan – Green Teacup Set',
      category: 'Wooden Ware',
      price: '₹6,499',
      image: '/images/img_d81156df7b760918a15333587af8dc1b.png',
      href: '/product/monpa-bhutan',
    },
    {
      id: 14,
      name: 'Monpa Gkar Bum – Blue & White Ceramic Jar',
      category: 'Decorative Ceramics',
      price: '₹1,899',
      image: '/images/img_a9132c04a3411b218b8addb9be42a9ba.png',
      href: '/product/monpa-gkar-bum-blue',
    },
    {
      id: 15,
      name: 'Tribal Red Bead Necklace',
      category: 'Jewellery',
      price: '₹3,200',
      image: '/images/img_2494a847f0389601eacab27aa7fb9c69.png',
      href: '/product/tribal-red-bead',
    },
    {
      id: 16,
      name: 'Patterned Steel Tongue Drum',
      category: 'Shop Pieces',
      price: '₹2,800',
      image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
      href: '/product/patterned-steel',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Topbar />
      <Header />

      <main className="mx-auto max-w-[1440px] px-6 py-12 lg:px-20">
        {/* Hero/Title Section */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase">
            Curated Shop
          </p>
          <h1 className="mb-6 font-serif text-4xl text-black md:text-6xl">
            Shop the Living Craft Archive
          </h1>
          <p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-black/60">
            Browse handcrafted pieces from Kraft Treasure in a clean product-first catalog inspired
            by the same visual language as the homepage.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filter Sidebar */}
          <aside className="w-50 flex-shrink-0 lg:w-70">
            <div className="sticky top-24 border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between border-b border-black/5">
                <h2 className="text-xs font-medium tracking-widest text-[#C5AB7D] uppercase">
                  Filter Rail
                </h2>
                <button className="flex items-center gap-1 text-[10px] tracking-widest text-black/40 uppercase transition-colors hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-rotate-ccw h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                  Clear
                </button>
              </div>

              <h3 className="mb-6 font-serif text-lg">Refine Listing</h3>

              <div className="space-y-8">
                <div>
                  <label className="mb-3 block text-[10px] tracking-[0.2em] text-black/50 uppercase">
                    Categories
                  </label>
                  <select className="w-full cursor-pointer appearance-none border-none bg-[#F5F5F5] p-3 text-xs outline-none focus:ring-1 focus:ring-[#C5AB7D]">
                    <option>All Categories</option>
                    <option>Masks</option>
                    <option>Ceremonial Pottery</option>
                    <option>Musical Instrument</option>
                    <option>Sacred Pieces</option>
                    <option>Cups and Plates</option>
                    <option>Decorative Ceramics</option>
                    <option>Figurine & Sculpture</option>
                    <option>Textile & Weaving</option>
                    <option>Wooden Ware</option>
                    <option>Jewellery</option>
                    <option>Others</option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-[10px] tracking-[0.2em] text-black/50 uppercase">
                    Availability
                  </label>
                  <select className="mb-3 w-full cursor-pointer appearance-none border-none bg-[#F5F5F5] p-3 text-xs outline-none focus:ring-1 focus:ring-[#C5AB7D]">
                    <option>All Availability</option>
                    <option>In Stock</option>
                    <option>Pre-order</option>
                  </select>
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="in-stock"
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#D33740]"
                    />
                    <label
                      htmlFor="in-stock"
                      className="cursor-pointer font-sans text-xs text-black/70"
                    >
                      In Stock
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-4 block text-[10px] tracking-[0.2em] text-black/50 uppercase">
                    Price
                  </label>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex-1">
                      <p className="mb-1 text-[9px] text-black/40">MIN</p>
                      <input
                        type="text"
                        placeholder="₹500"
                        className="w-full border border-black/10 bg-white p-2 text-center text-xs outline-none focus:border-[#C5AB7D]"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-[9px] text-black/40">MAX</p>
                      <input
                        type="text"
                        placeholder="₹25000"
                        className="w-full border border-black/10 bg-white p-2 text-center text-xs outline-none focus:border-[#C5AB7D]"
                      />
                    </div>
                  </div>
                  <div className="relative mt-6 h-1 rounded-full bg-black/10">
                    <div className="absolute right-0 left-0 h-1 rounded-full bg-[#C5AB7D]"></div>
                    <div className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 cursor-pointer rounded-full border-2 border-[#C5AB7D] bg-white shadow-sm"></div>
                    <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 cursor-pointer rounded-full border-2 border-[#C5AB7D] bg-white shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-10 flex flex-col items-center justify-between gap-6 border-b border-black/5 pb-6 md:flex-row">
              <p className="font-serif text-sm text-black/80">{products.length} Pieces Found</p>

              <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Search Artifacts"
                    className="w-full border border-black/10 bg-white py-2 pr-4 pl-10 text-xs outline-none focus:ring-1 focus:ring-[#C5AB7D]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-black/30"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest text-black/40 uppercase">
                      Sort By
                    </span>
                    <select className="cursor-pointer border-none bg-transparent text-[10px] font-medium tracking-widest uppercase outline-none focus:ring-0">
                      <option>Featured Order</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest Arrivals</option>
                    </select>
                  </div>

                  <div className="mx-2 h-4 w-px bg-black/10"></div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'text-black' : 'text-black/20 hover:text-black/40'}`}
                      aria-label="Grid view"
                    >
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
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 transition-colors ${viewMode === 'list' ? 'text-black' : 'text-black/20 hover:text-black/40'}`}
                      aria-label="List view"
                    >
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
                        <line x1="3" x2="21" y1="6" y2="6" />
                        <line x1="3" x2="21" y1="12" y2="12" />
                        <line x1="3" x2="21" y1="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div
              className={`grid gap-x-6 gap-y-10 ${
                viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'
              }`}
            >
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  className={`group flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row items-center gap-8'}`}
                >
                  <div
                    className={`relative overflow-hidden bg-[#F0F0F0] ${viewMode === 'grid' ? 'mb-5 aspect-[2/3]' : 'aspect-square w-48 flex-shrink-0'}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Icons */}
                    <div className="absolute top-4 right-4 z-10 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur-md transition-colors hover:bg-black hover:text-white">
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
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur-md transition-colors hover:bg-black hover:text-white">
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
                          <path d="M16 3h5v5" />
                          <path d="M8 21H3v-5" />
                          <path d="M21 3 14 10" />
                          <path d="M3 21l7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* View Details Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="border border-black bg-white px-6 py-3 font-sans text-[10px] tracking-[0.2em] text-black uppercase transition-all hover:bg-black hover:text-white">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="font-sans text-[9px] tracking-[0.3em] text-[#C5AB7D] uppercase">
                      {product.category}
                    </p>
                    <h3 className="line-clamp-1 font-serif text-sm text-black transition-colors group-hover:text-[#D33740] md:text-base">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-black/60">{product.price}</p>
                    {viewMode === 'list' && (
                      <p className="mt-4 line-clamp-2 max-w-xl text-sm text-black/50">
                        Handcrafted by master artisans from Arunachal Pradesh, this authentic piece
                        preserves age-old tribal traditions for modern heritage homes.
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination/Load More */}
            <div className="mt-20 flex justify-center pb-20">
              <button className="border border-black/10 bg-transparent px-12 py-4 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 hover:border-black hover:bg-black hover:text-white">
                Load More Pieces
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
