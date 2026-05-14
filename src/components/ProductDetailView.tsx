'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

export default function ProductDetailView({ product }: { product: Product }) {
  const { user, toggleWishlist, isInWishlist } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = user && isInWishlist(product.id);

  const formattedPrice = typeof product.price === 'number' 
    ? `₹${product.price.toLocaleString('en-IN')}` 
    : product.price;

  const numericPrice = typeof product.price === 'number' 
    ? product.price 
    : parseInt((product.price as string).toString().replace(/[₹,]/g, '')) || 0;

  const handleWishlist = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    toggleWishlist({
      ...product,
      price: numericPrice,
    } as any);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: numericPrice,
      image: product.image,
      href: product.href,
    }, quantity);
    
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#595148] uppercase"> {/* // CONTRAST FIX */}
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#8C6E3F]">{product.category}</span> {/* // CONTRAST FIX */}
        </nav>

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Left: Images */}
          <div className="lg:w-1/2">
            <div className="relative mb-6 aspect-[4/5] overflow-hidden border border-[#C8C3BB] bg-white shadow-lg group">
              <Image
                src={mainImage || product.image || '/placeholder.jpg'}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {(product.thumbnails || []).map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(thumb)}
                  className={`aspect-square w-24 shrink-0 overflow-hidden border-2 transition-all duration-300 ${mainImage === thumb || (!mainImage && idx === 0) ? 'border-[#C5AB7D] shadow-md' : 'border-[#C8C3BB] hover:border-[#8C6E3F]'}`} // CONTRAST FIX
                >
                  <div className="relative h-full w-full">
                    <Image 
                      src={thumb} 
                      alt={`Thumbnail ${idx + 1}`} 
                      fill
                      className="object-cover" 
                      sizes="96px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col lg:w-1/2">
            <div className="mb-10">
              <p className="mb-4 text-[10px] font-bold tracking-[0.4em] text-[#8C6E3F] uppercase">{product.category}</p> {/* // CONTRAST FIX */}
              <h1 className="mb-6 font-serif text-4xl leading-tight text-black lg:text-6xl">{product.name}</h1>
              <div className="flex items-center gap-6">
                <p className="font-serif text-4xl text-black">{formattedPrice}</p>
                <span className="bg-[#D6F0DD] text-[#1A6B30] rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                  {product.availability || 'In Stock'}
                </span>
              </div>
            </div>

            <p className="mb-12 max-w-lg border-l-4 border-[#B0A99F] pl-8 font-sans text-[16px] leading-relaxed text-[#4A4540] italic"> {/* // CONTRAST FIX */}
              {product.description}
            </p>

            <div className="mb-12 grid grid-cols-2 gap-8 border-y border-[#C8C3BB] py-10">
              <MetaItem label="Material" value={product.material || 'Traditional'} />
              <MetaItem label="Heritage Origin" value={product.origin || 'Arunachal Pradesh'} />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-16 items-center border border-[#C8C3BB] bg-white shadow-sm shrink-0"> {/* // CONTRAST FIX */}
                <QuantityBtn label="-" onClick={() => setQuantity(Math.max(1, quantity - 1))} />
                <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                <QuantityBtn label="+" onClick={() => setQuantity(quantity + 1)} />
              </div>

              <button 
                onClick={handleAddToCart}
                className={`btn-primary flex-1 group h-16 bg-[#8C6E3F] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-black ${isAdding ? 'bg-black' : ''}`} // CONTRAST FIX
                disabled={isAdding}
              >
                {isAdding ? 'Added to Collection' : 'Add To Collection'}
              </button>

              <button
                onClick={handleWishlist}
                className={`flex h-16 w-16 items-center justify-center border border-[#C8C3BB] transition-all duration-300 ${isWishlisted ? 'bg-[#D33740] text-white border-[#D33740]' : 'bg-white text-black hover:bg-[#FAF7F2]'}`} // CONTRAST FIX
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>

            {/* Details Tabs */}
            <div className="mt-16">
              <div className="flex gap-12 border-b border-[#C8C3BB]"> {/* // CONTRAST FIX */}
                {['description', 'provenance'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-[#595148] hover:text-black'}`} // CONTRAST FIX
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-8 font-sans text-[15px] leading-relaxed text-[#3A3530]"> {/* // CONTRAST FIX */}
                {activeTab === 'description' ? product.fullDescription : 'Heritage documentation, artisan background, and cultural significance notes...'}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-[9px] font-bold tracking-[0.3em] text-[#595148] uppercase">{label}</p> {/* // CONTRAST FIX */}
      <p className="font-serif text-lg text-black">{value}</p>
    </div>
  );
}

function QuantityBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-full px-6 text-xl text-[#595148] hover:text-black hover:bg-black/5 transition-all"> {/* // CONTRAST FIX */}
      {label}
    </button>
  );
}
