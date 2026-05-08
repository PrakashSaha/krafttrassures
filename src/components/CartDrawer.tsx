'use client';

import React from 'react';
import Link from 'next/link';

interface CartItem {
  id: string | number;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
}

export default function CartDrawer({ isOpen, onClose, items = [] }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isEmpty = items.length === 0;

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
        <div className="flex items-center justify-between border-b border-black/8 px-6 py-5">
          <h2 className="font-serif text-xl text-black">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-black/40 hover:text-black transition-colors"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>
              </div>
              <p className="mb-1 text-[9px] font-semibold tracking-[0.3em] text-black/40 uppercase">Your Cart</p>
              <h3 className="mb-3 font-serif text-2xl text-black">Bag Is Empty</h3>
              <p className="mb-8 text-[13px] leading-relaxed text-black/40">Add pieces to your bag to review them here before moving to checkout.</p>
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
            <div className="flex-1 divide-y divide-black/[0.06] px-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-5">
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-zinc-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-[9px] font-semibold tracking-[0.2em] text-[#C5AB7D] uppercase">{item.category}</p>
                    <p className="mb-2 line-clamp-2 font-serif text-[13px] text-black">{item.name}</p>
                    <p className="text-[12px] font-medium text-black">₹{item.price.toLocaleString('en-IN')}</p>
                    <p className="mt-0.5 text-[11px] text-black/40">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-black/8 bg-[#FAF7F2] px-6 py-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-black uppercase">Subtotal</span>
            <span className="font-serif text-[16px] font-medium text-black">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <Link href="#" className="btn-dark block text-center mb-3">Checkout</Link>
          <button onClick={onClose} className="w-full py-2 text-[10px] font-semibold tracking-[0.3em] text-black/50 uppercase hover:text-black transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
