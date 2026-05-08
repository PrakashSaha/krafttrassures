'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  thumbnails: string[];
  material: string;
  origin: string;
  availability: string;
  description: string;
  fullDescription: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'monpa-rangzen-rang-dun',
    name: 'Monpa Rangzen Rang-Dun – Tongue Drum',
    category: 'Musical Instrument',
    price: '₹3,499',
    image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
    thumbnails: ['/images/img_9f9a8b413ddac6051a530306ccddb534.png', '/images/img_b6b893bf9561c378a643cae02ba8ff63.png'],
    material: 'Tuned steel',
    origin: 'Tawang District',
    availability: 'In Stock',
    description: 'This hand-painted tongue drum features vibrant floral mandala patterns and produces resonant, meditative tones.',
    fullDescription: 'Discover deep relaxation and spiritual connection with this Monpa Rangzen Rang-Dun. Crafted from tuned steel and hand-painted by master artisans, the drum is adorned with intricate floral mandalas that represent the blooming spirituality of the mountains.',
  },
  {
    id: 2,
    slug: 'sacred-ceremonial-wall-mask',
    name: 'Sacred Ceremonial Wall Mask',
    category: 'Masks',
    price: '₹3,100',
    image: '/images/img_2494a847f0389601eacab27aa7fb9c69.png',
    thumbnails: ['/images/img_2494a847f0389601eacab27aa7fb9c69.png', '/images/img_585ed4af2ec8b815204939c92c061c8a.png'],
    material: 'Hand-carved wood',
    origin: 'West Kameng District',
    availability: 'In Stock',
    description: 'A traditional ceremonial mask representing sacred mountain deities, carved from single-block wood.',
    fullDescription: 'This Sacred Ceremonial Wall Mask is an authentic artifact from the tribal heartlands of Arunachal Pradesh. Each mask is hand-carved by hereditary artisans from the Monpa community.',
  },
];

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Artifact Not Found</h1>
          <Link href="/shop" className="text-[11px] font-bold tracking-[0.2em] text-[#D33740] uppercase">Back To Shop</Link>
        </div>
      </div>
    );
  }

  const isWishlisted = user && isInWishlist(product.id);

  const handleWishlist = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: parseInt(product.price.replace(/[₹,]/g, '')),
        image: product.image,
      });
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: parseInt(product.price.replace(/[₹,]/g, '')),
      image: product.image,
    }, quantity);
    
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-black/30 uppercase animate-in fade-in duration-700">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#C5AB7D]">{product.category}</span>
        </nav>

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Left: Images */}
          <div className="lg:w-1/2 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="mb-6 aspect-[4/5] overflow-hidden border border-black/5 bg-white shadow-lg group">
              <img
                src={mainImage || product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-2000 group-hover:scale-105"
              />
            </div>
            <div className="flex gap-4">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(thumb)}
                  className={`aspect-square w-24 overflow-hidden border-2 transition-all duration-300 ${mainImage === thumb || (!mainImage && idx === 0) ? 'border-[#C5AB7D] shadow-md' : 'border-black/5 hover:border-[#C5AB7D]/50'}`}
                >
                  <img src={thumb} alt="thumb" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col lg:w-1/2 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="mb-10">
              <p className="mb-4 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">{product.category}</p>
              <h1 className="mb-6 font-serif text-4xl leading-tight text-black lg:text-6xl">{product.name}</h1>
              <div className="flex items-center gap-6">
                <p className="font-serif text-4xl text-black">{product.price}</p>
                <span className="bg-[#FAF7F2] border border-black/5 px-4 py-1.5 text-[10px] font-bold tracking-widest text-green-600 uppercase">
                  {product.availability}
                </span>
              </div>
            </div>

            <p className="mb-12 max-w-lg border-l-4 border-[#C5AB7D]/20 pl-8 font-sans text-[16px] leading-relaxed text-black/50 italic">
              {product.description}
            </p>

            <div className="mb-12 grid grid-cols-2 gap-8 border-y border-black/5 py-10">
              <MetaItem label="Material" value={product.material} />
              <MetaItem label="Heritage Origin" value={product.origin} />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-16 items-center border border-black/5 bg-white shadow-sm shrink-0">
                <QuantityBtn label="-" onClick={() => setQuantity(Math.max(1, quantity - 1))} />
                <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                <QuantityBtn label="+" onClick={() => setQuantity(quantity + 1)} />
              </div>

              <button 
                onClick={handleAddToCart}
                className={`btn-primary flex-1 group ${isAdding ? 'bg-black' : ''}`}
                disabled={isAdding}
              >
                {isAdding ? 'Added to Collection' : 'Add To Collection'}
              </button>

              <button
                onClick={handleWishlist}
                className={`flex h-16 w-16 items-center justify-center border border-black/5 transition-all duration-300 ${isWishlisted ? 'bg-[#D33740] text-white' : 'bg-white text-black hover:bg-[#FAF7F2]'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>

            {/* Details Tabs */}
            <div className="mt-16">
              <div className="flex gap-12 border-b border-black/5">
                {['description', 'provenance'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-black/30 hover:text-black'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-8 font-sans text-[15px] leading-relaxed text-black/60">
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
      <p className="mb-2 text-[9px] font-bold tracking-[0.3em] text-black/30 uppercase">{label}</p>
      <p className="font-serif text-lg text-black">{value}</p>
    </div>
  );
}

function QuantityBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-full px-6 text-xl text-black/40 hover:text-black hover:bg-black/5 transition-all">
      {label}
    </button>
  );
}
