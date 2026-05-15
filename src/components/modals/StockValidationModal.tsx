
'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

interface StockIssue {
  id: string | number;
  name: string;
  requested: number;
  available: number;
}

interface StockValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  issues: StockIssue[];
  onProceed: () => void;
}

export default function StockValidationModal({ isOpen, onClose, issues, onProceed }: StockValidationModalProps) {
  const { updateQty, removeFromCart } = useCart();

  if (!isOpen) return null;

  const handleAdjustAll = () => {
    issues.forEach(issue => {
      if (issue.available <= 0) {
        removeFromCart(issue.id);
      } else {
        updateQty(issue.id, issue.available);
      }
    });
    onProceed();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md border border-white/10 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-[#D33740] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">Inventory Alert</p>
              <h2 className="font-serif text-2xl text-black">Limited Stock</h2>
            </div>
          </div>

          <p className="mb-8 text-[14px] leading-relaxed text-black/60">
            Some heritage pieces in your collection have limited availability. We have updated your cart to the maximum stock currently in our warehouse.
          </p>

          <div className="mb-8 space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between border-b border-black/5 pb-4 last:border-0">
                <div>
                  <h4 className="text-[13px] font-bold text-black">{issue.name}</h4>
                  <p className="text-[11px] text-black/40">Requested: {issue.requested} units</p>
                </div>
                <div className="text-right">
                  <span className={`text-[12px] font-bold ${issue.available <= 0 ? 'text-[#D33740]' : 'text-black'}`}>
                    {issue.available <= 0 ? 'Sold Out' : `${issue.available} Available`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleAdjustAll}
              className="group flex items-center justify-center gap-3 bg-black py-4 font-sans text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-[#D33740]"
            >
              Adjust & Proceed
            </button>
            <button 
              onClick={onClose}
              className="py-3 text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase hover:text-black transition-colors"
            >
              Return to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
