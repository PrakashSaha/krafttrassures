'use client';

import React from 'react';

export default function TransactionsPage() {
  return (
    <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Finance</p>
        <h1 className="font-serif text-4xl text-black">Payment History</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-black/50">
          A secure archive of your financial transactions with Kraft Treasure.
        </p>
      </div>

      <div className="border-t border-black/5 pt-10">
        {/* Empty state */}
        <div className="border border-dashed border-black/10 bg-[#FAF7F2] py-24 text-center">
          <div className="mb-8 flex justify-center text-black/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
          <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">No Record Found</p>
          <p className="text-[14px] text-black/40">You do not have any past transactions recorded in our ledger.</p>
        </div>
      </div>
    </div>
  );
}
