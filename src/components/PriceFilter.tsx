'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PriceFilterProps {
  absoluteMin: number;
  absoluteMax: number;
  onPriceChange?: (min: string, max: string) => void;
  initialMin?: string;
  initialMax?: string;
}

export default function PriceFilter({ 
  absoluteMin, 
  absoluteMax, 
  onPriceChange,
  initialMin = '',
  initialMax = ''
}: PriceFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [min, setMin] = useState(initialMin || searchParams.get('min') || '');
  const [max, setMax] = useState(initialMax || searchParams.get('max') || '');

  const parsedMin = parseInt(min);
  const parsedMax = parseInt(max);

  const minValRaw = isNaN(parsedMin) ? absoluteMin : Math.max(0, parsedMin);
  const maxValRaw = isNaN(parsedMax) ? absoluteMax : Math.max(0, parsedMax);
  
  // Ensure strict ordering for internal logic and slider
  const minVal = Math.min(minValRaw, maxValRaw);
  const maxVal = Math.max(minValRaw, maxValRaw);

  // Sync local state when URL params change externally (e.g. Clear Filters)
  useEffect(() => {
    setMin(searchParams.get('min') || '');
    setMax(searchParams.get('max') || '');
  }, [searchParams]);

  // Trigger instant client-side filtering
  useEffect(() => {
    if (onPriceChange) {
      onPriceChange(minVal.toString(), maxVal.toString());
    }
  }, [minVal, maxVal, onPriceChange]);

  // Debounced URL update for persistence - REDUCED delay to prevent click lag
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      const currentMin = searchParams.get('min') || '';
      const currentMax = searchParams.get('max') || '';

      if (min !== "" && minVal !== absoluteMin) params.set('min', minVal.toString()); else params.delete('min');
      if (max !== "" && maxVal !== absoluteMax) params.set('max', maxVal.toString()); else params.delete('max');

      // Reset to page 1 when filtering to avoid "Empty Page" confusion
      if (params.get('min') !== currentMin || params.get('max') !== currentMax) {
        params.delete('page');
        router.push(`/shop?${params.toString()}`, { scroll: false });
      }
    }, 400); // Drastically reduced from 1500ms to 400ms for responsiveness

    return () => clearTimeout(delayDebounceFn);
  }, [min, max, minVal, maxVal, absoluteMin, absoluteMax, router, searchParams]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(Number(e.target.value), maxVal - 1));
    setMin(value.toString());
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(minVal + 1, Number(e.target.value));
    setMax(value.toString());
  };

  const handleMinInputBlur = () => {
    if (min === '') return;
    const val = parseInt(min);
    if (!isNaN(val)) {
      if (val < 0) {
        setMin('0');
      } else if (val > maxValRaw) {
        setMin(maxValRaw.toString());
      }
    }
  };

  const handleMaxInputBlur = () => {
    if (max === '') return;
    const val = parseInt(max);
    if (!isNaN(val) && val < minValRaw) {
      setMax(minValRaw.toString());
    }
  };

  const getPercent = useCallback(
    (value: number) => {
      if (absoluteMax === absoluteMin) return 0;
      const percent = Math.round(((value - absoluteMin) / (absoluteMax - absoluteMin)) * 100);
      // Clamp between 0 and 100 to prevent overflow
      return Math.max(0, Math.min(100, percent));
    },
    [absoluteMin, absoluteMax]
  );


  return (
    <section>
      <p className="text-[10px] tracking-[0.3em] uppercase text-[#3A3530] font-sans mb-3">Price Range</p> {/* // CONTRAST FIX */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-[9px] tracking-[0.1em] uppercase text-[#595148] font-sans">Min</span> {/* // CONTRAST FIX */}
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#595148] group-focus-within:text-[#8C6E3F] transition-colors">₹</span> {/* // CONTRAST FIX */}
              <input 
                type="number" 
                min={0}
                max={maxValRaw}
                placeholder={absoluteMin.toLocaleString('en-IN')}
                value={min}
                onChange={(e) => setMin(e.target.value)}
                onBlur={handleMinInputBlur}
                className="h-10 w-full border border-[#C8C3BB] bg-white pl-6 pr-3 text-[11px] uppercase font-sans outline-none focus:border-black transition-all" // CONTRAST FIX
              />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] tracking-[0.1em] uppercase text-[#595148] font-sans">Max</span> {/* // CONTRAST FIX */}
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#595148] group-focus-within:text-[#8C6E3F] transition-colors">₹</span> {/* // CONTRAST FIX */}
              <input 
                type="number" 
                min={minValRaw}
                max={absoluteMax}
                placeholder={absoluteMax.toLocaleString('en-IN')} 
                value={max}
                onChange={(e) => setMax(e.target.value)}
                onBlur={handleMaxInputBlur}
                className="h-10 w-full border border-[#C8C3BB] bg-white pl-6 pr-3 text-[11px] uppercase font-sans outline-none focus:border-black transition-all" // CONTRAST FIX
              />
            </div>
          </div>
        </div>
        
        {/* Slider UI */}
        <div className="px-1 pt-4">
          <div className="relative w-full h-8 flex items-center">
            {/* The underlying track */}
            <div className="absolute w-full h-[3px] bg-[#C8C3BB] rounded-full" /> {/* // CONTRAST FIX */}
            
            {/* The active range bar */}
            <div 
              className="absolute h-[3px] bg-[#8C6E3F] rounded-full" // CONTRAST FIX
              style={{ 
                left: `${getPercent(minVal)}%`,
                width: `${getPercent(maxVal) - getPercent(minVal)}%`
              }}
            />

            {/* Min Slider Thumb */}
            <input
              type="range"
              min={absoluteMin}
              max={absoluteMax}
              value={minVal}
              onChange={handleMinChange}
              className={`absolute w-full h-2 appearance-none pointer-events-none bg-transparent z-[20]
               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto 
                [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#8C6E3F] 
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all 
                [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto 
                [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#8C6E3F] 
                [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md`} // CONTRAST FIX}
              style={{ zIndex: minVal > absoluteMax - (absoluteMax - absoluteMin) * 0.1 ? 21 : 20 }}
            />

            {/* Max Slider Thumb */}
            <input
              type="range"
              min={absoluteMin}
              max={absoluteMax}
              value={maxVal}
              onChange={handleMaxChange}
              className="absolute w-full h-2 appearance-none pointer-events-none bg-transparent z-[20]
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto 
                [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#8C6E3F] 
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all 
                [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto 
                [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#8C6E3F] 
                [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md" // CONTRAST FIX
            />
          </div>

          <div className="flex justify-between items-center mt-2 text-[10px] text-[#595148] font-sans uppercase tracking-[0.2em] font-medium"> {/* // CONTRAST FIX */}
            <span>₹{minVal.toLocaleString('en-IN')}</span>
            <span>₹{maxVal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
