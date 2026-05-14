import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Premium Loader Container */}
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Symbol/Circle */}
        <div className="relative mb-8 h-20 w-20">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-[#D33740] animate-spin duration-[1500ms]"></div>
          
          {/* Inner Static Symbol (Simulated with a gold dot) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#C5AB7D] animate-pulse"></div>
          </div>
        </div>

        {/* Brand Text */}
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase animate-pulse">
            Kraft Treasure
          </p>
          <h2 className="mt-2 font-serif text-[18px] text-black tracking-wide">
            Curating Heritage...
          </h2>
        </div>
      </div>

      {/* Subtle Progress Bar at the bottom of the loader */}
      <div className="absolute bottom-0 left-0 h-1 bg-[#D33740]/10 w-full overflow-hidden">
        <div className="h-full bg-[#D33740] animate-shimmer-progress w-[40%]"></div>
      </div>
      
      <style>{`
        @keyframes shimmer-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .animate-shimmer-progress {
          animation: shimmer-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
