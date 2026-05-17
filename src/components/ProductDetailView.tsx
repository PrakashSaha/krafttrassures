'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

export default function ProductDetailView({ 
  product, 
  relatedProducts = [] 
}: { 
  product: Product; 
  relatedProducts?: Product[];
}) {
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
    if (!user) {
      router.push('/login');
      return;
    }

    setIsAdding(true);
    
    // Smooth delay for 'premium' feel
    setTimeout(() => {
      addToCart({
        id: product.id,
        productId: product.productId,
        name: product.name,
        category: product.category,
        price: numericPrice,
        image: product.image,
        href: product.href,
      }, quantity);
      setIsAdding(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#595148] uppercase">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#8C6E3F]">{product.category}</span>
        </nav>

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Left: Images */}
          <div className="lg:w-1/2">
            <div className="relative mb-6 aspect-[4/5] overflow-hidden border border-[#C8C3BB] bg-white shadow-lg group flex items-center justify-center">
              <Image
                src={mainImage || product.image || '/images/placeholder.png'}
                alt={product.name}
                fill
                priority
                loading="eager"
                className={`transition-transform duration-[2000ms] group-hover:scale-105 ${!(mainImage || product.image) ? 'p-12 opacity-20' : 'object-cover'}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: (mainImage || product.image) ? 'cover' : 'contain' }}
              />
              {!(mainImage || product.image) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#C8C3BB]">
                   <span className="font-serif text-2xl">Kraft Treasure</span>
                   <span className="text-[10px] mt-2 tracking-[0.2em] uppercase">Archive Piece</span>
                </div>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {(product.thumbnails || []).map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(thumb)}
                  className={`aspect-square w-24 shrink-0 overflow-hidden border-2 transition-all duration-300 ${mainImage === thumb || (!mainImage && idx === 0) ? 'border-[#C5AB7D] shadow-md' : 'border-[#C8C3BB] hover:border-[#8C6E3F]'}`}
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
              <p className="mb-4 text-[10px] font-bold tracking-[0.4em] text-[#8C6E3F] uppercase">{product.category}</p>
              <h1 className="mb-6 font-serif text-4xl leading-tight text-black lg:text-6xl">{product.name}</h1>
              <div className="flex items-center gap-6">
                <p className="font-serif font-bold text-[#B8860B] tracking-tight">
                  <span className="text-[36px]">₹</span>
                  <span className="text-[38px] ml-1">{typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : String(product.price).replace('₹', '')}</span>
                </p>
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${
                  product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-[#D6F0DD] text-[#1A6B30]'
                }`}>
                  {product.stock === 0 ? 'Sold Out' : (product.availability || 'In Stock')}
                </span>
                {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
                  <span className="text-[10px] font-bold tracking-widest text-[#D33740] uppercase animate-pulse">
                    Only {product.stock} left in stock!
                  </span>
                )}
              </div>
            </div>

            <p className="mb-12 max-w-lg border-l-4 border-[#B0A99F] pl-8 font-sans text-[16px] leading-relaxed text-[#4A4540] italic">
              {product.description}
            </p>

            <div className="mb-12 grid grid-cols-2 gap-8 border-y border-[#C8C3BB] py-10">
              <MetaItem label="Material" value={product.material || 'Traditional'} />
              <MetaItem label="Size / Dimensions" value={product.size || 'Standard'} />
              <MetaItem label="Heritage Origin" value={product.origin || 'Arunachal Pradesh'} />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-16 items-center border border-[#C8C3BB] bg-white shadow-sm shrink-0">
                <QuantityBtn label="-" onClick={() => setQuantity(Math.max(1, quantity - 1))} />
                <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                <QuantityBtn 
                  label="+" 
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))} 
                  disabled={product.stock !== undefined && quantity >= product.stock}
                />
              </div>

              <button 
                onClick={handleAddToCart}
                className={`btn-primary flex-1 group h-16 text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all 
                  ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : 'bg-[#8C6E3F] hover:bg-black'} 
                  ${isAdding ? 'bg-black' : ''}`}
                disabled={isAdding || product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : (isAdding ? 'Added to Collection' : 'Add To Collection')}
              </button>

              <button
                onClick={handleWishlist}
                className={`flex h-16 w-16 items-center justify-center border border-[#C8C3BB] transition-all duration-300 ${isWishlisted ? 'bg-[#D33740] text-white border-[#D33740]' : 'bg-white text-black hover:bg-[#FAF7F2]'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION: Description Tabs --- */}
        <div className="mt-24 border-t border-[#C8C3BB] pt-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-12 border-b border-[#C8C3BB]">
              {['description', 'provenance'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-[#595148] hover:text-black'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="mt-8 border-2 border-[#C5AB7D] bg-white p-10 shadow-sm">
              <div className="font-sans text-[16px] leading-relaxed text-[#3A3530]">
                {activeTab === 'description' ? (
                  <div className="space-y-4">
                    <p className="font-serif text-xl italic text-[#8C6E3F] mb-6 border-b border-[#C5AB7D]/20 pb-4">
                      {product.description || "No summary available."}
                    </p>
                    <div className="prose prose-sm max-w-none text-[#4A4540]">
                      {product.fullDescription || "No detailed description provided."}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#8C6E3F]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Authenticity Guaranteed</span>
                    </div>
                    <p className="italic font-serif text-lg text-black/70">
                      This piece originates from {product.origin || 'the heart of Arunachal Pradesh'}. Every artifact in our collection is hand-vetted for traditional accuracy and artisan integrity.
                    </p>
                    <p>
                      The provenance of this piece traces back to master craftsmen who utilize techniques passed down through generations. Documentation regarding the specific artisan group or region can be requested upon acquisition.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION: Related Products --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">More to Explore</p>
                <h2 className="font-serif text-3xl text-black">You May Also Like</h2>
              </div>
              <Link href="/shop" className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-[#8C6E3F] transition-colors">
                View Entire Collection
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
              {relatedProducts.map(relProduct => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-[9px] font-bold tracking-[0.3em] text-[#595148] uppercase">{label}</p>
      <p className="font-serif text-lg text-black">{value}</p>
    </div>
  );
}

function QuantityBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="h-full px-6 text-xl text-[#595148] hover:text-black hover:bg-black/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
