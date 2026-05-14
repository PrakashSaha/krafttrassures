import React from 'react';
import Topbar from '@/components/sections/Topbar';
import { getCategories } from '@/lib/strapi';
import Link from 'next/link';
import Image from 'next/image';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Topbar />
      <main className="min-h-screen bg-[#FAF7F2] py-20 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16 lg:mb-24 text-center">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#B8894A] uppercase block mb-6">Explore Our Craft</span>
            <h1 className="font-serif text-5xl lg:text-7xl text-black mb-8">The Archive</h1>
            <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-black/60">
              Discover the diverse traditions of Arunachal Pradesh. Each category represents a unique facet of tribal heritage, from the geometric precision of Wancho woodcarving to the vibrant stories woven into Monpa textiles.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group relative block overflow-hidden bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={item.label} 
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-200">
                      <span className="font-sans text-xs text-black/20 uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                    <h3 className="mb-2 font-serif text-3xl text-white transition-transform duration-500 group-hover:-translate-y-2">{item.label}</h3>
                    {item.description && (
                      <p className="mb-6 line-clamp-3 font-sans text-sm leading-relaxed text-white/80 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-white border-t border-white/20 pt-6 mt-2">
                      <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold">Discover Pieces</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
