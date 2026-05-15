import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
      <div className="flex flex-col items-center">
        {/* Elegant Logo Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-[#D33740] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-b-2 border-r-2 border-[#8C6E3F] animate-spin duration-1000"></div>
        </div>
        
        <p className="mt-8 font-serif text-[10px] tracking-[0.5em] text-[#8C6E3F] uppercase animate-pulse">
          Curating Heritage
        </p>
      </div>
    </div>
  );
}
