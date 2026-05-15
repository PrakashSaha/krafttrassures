'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

export default function AccountWishlistPage() {
  const { wishlist, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();

  const [loadingItems, setLoadingItems] = React.useState<Set<string | number>>(new Set());

  const handleAction = async (id: string | number, action: () => Promise<void>) => {
    setLoadingItems(prev => new Set(prev).add(id));
    try {
      await action();
    } finally {
      // Small delay to prevent flicker for fast requests
      setTimeout(() => {
        setLoadingItems(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 300);
    }
  };

  return (
    <div className="border border-[#C8C3BB] bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000"> {/* // CONTRAST FIX */}
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#8C6E3F] uppercase">Account Archive</p> {/* // CONTRAST FIX */}
        <h1 className="font-serif text-4xl text-black">Saved Items</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-[#4A4540]"> {/* // CONTRAST FIX */}
          Items you have curated for later from our heritage collections.
        </p>
      </div>

      <div className="border-t border-[#C8C3BB] pt-10"> {/* // CONTRAST FIX */}
        {wishlist.length === 0 ? (
          <div className="border border-dashed border-[#C8C3BB] bg-[#FAF7F2] py-20 text-center"> {/* // CONTRAST FIX */}
            <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#8C6E3F] uppercase">Empty Archive</p> {/* // CONTRAST FIX */}
            <p className="text-[14px] text-[#595148]">Browse our collection and save your favourite pieces.</p> {/* // CONTRAST FIX */}
            <Link href="/shop" className="mt-8 inline-block text-[11px] font-bold tracking-[0.2em] text-[#D33740] uppercase hover:text-black transition-colors">Return to Collections</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {wishlist.map((item) => (
              <div 
                key={item.id} 
                className={`group border border-[#C8C3BB] bg-[#FAF7F2] p-5 transition-all hover:shadow-md hover:border-[#B0A99F] ${loadingItems.has(item.id) ? 'opacity-50 cursor-wait' : ''}`} // CONTRAST FIX
              >
                <div className="flex gap-6">
                  <Link href={`/product/${item.productId}`} className="shrink-0 overflow-hidden shadow-sm">
                    <div className="relative h-[120px] w-[90px]">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="90px" />
                    </div>
                  </Link>
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="mb-1 line-clamp-2 font-serif text-[15px] text-black hover:text-[#D33740] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#8C6E3F] uppercase">{item.category}</p> {/* // CONTRAST FIX */}
                      <p className="font-serif text-[15px] text-black">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                      <button 
                        disabled={loadingItems.has(item.id)}
                        onClick={() => handleAction(item.id, async () => {
                          addToCart(item as any);
                          await removeFromWishlist(item.id, item.wishlistId);
                        })}
                        className="text-[10px] font-bold tracking-[0.2em] text-[#D33740] uppercase hover:text-black transition-colors disabled:text-[#8A8480]" // CONTRAST FIX
                      >
                        {loadingItems.has(item.id) ? 'Moving...' : 'Add to Cart'}
                      </button>
                      <button 
                        disabled={loadingItems.has(item.id)}
                        onClick={() => handleAction(item.id, () => removeFromWishlist(item.id, item.wishlistId))}
                        className="p-2 text-[#595148] hover:text-[#D33740] transition-colors disabled:opacity-30"
                        aria-label="Remove from wishlist"
                      >
                        {loadingItems.has(item.id) ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
