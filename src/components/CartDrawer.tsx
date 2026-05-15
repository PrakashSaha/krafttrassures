'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { CartItem } from '@/lib/types';

import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();
  const isEmpty = cart.length === 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-[100] flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C8C3BB] px-6 py-5"> {/* // CONTRAST FIX */}
          <h2 className="font-serif text-xl text-black">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-[#3A3530] hover:text-black transition-colors" // CONTRAST FIX
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center bg-black/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#595148]"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg> {/* // CONTRAST FIX */}
              </div>
              <p className="mb-1 text-[9px] font-semibold tracking-[0.3em] text-[#3A3530] uppercase">Your Cart</p> {/* // CONTRAST FIX */}
              <h3 className="mb-3 font-serif text-2xl text-black">Bag Is Empty</h3>
              <p className="mb-8 text-[13px] leading-relaxed text-[#3A3530]">Add pieces to your bag to review them here before moving to checkout.</p> {/* // CONTRAST FIX */}
              <Link
                href="/shop"
                onClick={onClose}
                className="btn-primary inline-flex items-center gap-2"
              >
                Explore The Shop
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          ) : (
            <div className="flex-1 divide-y divide-[#C8C3BB] px-6"> {/* // CONTRAST FIX */}
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-6">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-zinc-100 border border-[#C8C3BB]">
                    <Image 
                      src={item.image || '/placeholder.jpg'} 
                      alt={item.name} 
                      fill
                      className="object-cover" 
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col h-24 justify-between">
                    <div>
                      <p className="mb-0.5 text-[9px] font-semibold tracking-[0.2em] text-[#8C6E3F] uppercase">{item.category}</p> {/* // CONTRAST FIX */}
                      <h3 className="mb-1 line-clamp-1 font-serif text-[14px] text-black uppercase tracking-tight">{item.name}</h3>
                      <p className="text-[12px] font-bold text-[#B8860B]">₹ {<span className="text-[18px] font-bold text-[#B8860B]">{item.price.toLocaleString('en-IN')}</span>}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#C8C3BB]"> {/* // CONTRAST FIX */}
                        <button 
                          onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                          className="flex h-7 w-7 items-center justify-center text-black/70 hover:bg-black/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                        </button>
                        <span className="flex h-7 w-8 items-center justify-center text-[11px] font-bold text-black border-x border-[#C8C3BB]"> {/* // CONTRAST FIX */}
                          {item.qty || 1}
                        </span>
                        <button 
                          onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                          className="flex h-7 w-7 items-center justify-center text-black/70 hover:bg-black/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-[#595148] hover:text-[#D33740] transition-colors"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#C8C3BB] bg-[#FAF7F2] px-6 py-5"> {/* // CONTRAST FIX */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-black uppercase">Subtotal</span>
            <span className="font-serif font-bold text-[#B8860B]">
              <span className="text-[16px]">₹</span>
              <span className="text-[18px] ml-1">{cartTotal.toLocaleString('en-IN')}</span>
            </span>
          </div>
          <Link href="/checkout" onClick={onClose} className="btn-dark block text-center mb-3">Checkout</Link>
          <button onClick={onClose} className="w-full py-2 text-[10px] font-semibold tracking-[0.3em] text-[#3A3530] uppercase hover:text-black transition-colors"> {/* // CONTRAST FIX */}
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
