'use client';

import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product & { delay?: string };
  isVisible?: boolean;
}

export const ProductCard = memo(({ product, isVisible = true }: ProductCardProps) => {
  const { user, toggleWishlist, isInWishlist } = useAuth();
  const router = useRouter();

  const priceValue = typeof product.price === 'number' 
    ? product.price.toLocaleString('en-IN') 
    : String(product.price).replace('₹', '');

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      router.push('/login');
      return;
    }

    toggleWishlist(product);
  }, [user, product, toggleWishlist, router]);


  const { addToCart } = useCart();

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      router.push('/login');
      return;
    }

    addToCart(product);
    
    // If the item is in the wishlist, remove it when adding to cart
    if (isInWishlist(product.id)) {
      toggleWishlist(product);
      toast.success('Moved to collection', {
        description: `${product.name} has been moved from your wishlist to the cart.`,
      });
    }
  }, [product, addToCart, isInWishlist, toggleWishlist, user, router]);

  return (
    <Link
      href={product.href}
      className={`group block transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: isVisible ? product.delay : '0s' }}
    >
      <div className="relative mb-4 aspect-[4/5] overflow-hidden border border-[#C8C3BB] bg-zinc-50">
        <Image
          src={product.image || '/images/placeholder.png'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="absolute inset-0 object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute top-4 right-4 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            <button
              onClick={handleWishlist}
              className="action-icon-btn"
              title={user ? (isInWishlist(product.id) ? 'Remove' : 'Add to wishlist') : 'Login to wishlist'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={user && isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
            </button>
            <button onClick={handleAddToCart} className="action-icon-btn" title="Add to collection">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>
            </button>
          </div>
          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="bg-white py-3 text-center text-[10px] font-bold tracking-[0.2em] text-black uppercase hover:bg-black hover:text-white transition-colors">
              View Details
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-1">
        <p className="text-[9px] font-semibold tracking-[0.3em] text-[#8C6E3F] uppercase">{product.category}</p>
        <h3 className="font-serif text-[15px] text-black group-hover:text-[#D33740] transition-colors line-clamp-1">{product.name}</h3>
        <p className="font-serif text-[#B8860B] tracking-tight">
          <span className="text-[18px] font-bold">₹</span>
          <span className="text-[20px] font-bold ml-1">{priceValue}</span>
        </p>
      </div>

    </Link>
  );
});

export default ProductCard;
