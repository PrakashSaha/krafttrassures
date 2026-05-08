'use client';

import { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const testimonials = [
    {
      id: 1,
      name: 'Ananya Sharma',
      text: 'The intricate beadwork on the necklace I ordered is breathtaking. You can truly feel the soul of Arunachal in every piece.',
      delay: '0s',
    },
    {
      id: 2,
      name: 'Rahul Mukherjee',
      text: "Exceptional craftsmanship. The singing bowl has the most resonant frequency I've ever experienced. A true masterpiece.",
      delay: '0.2s',
    },
    {
      id: 3,
      name: 'Priyanka Gogoi',
      text: 'Finally, a platform that brings the authentic tribal arts of our region to the world. The quality is peerless and ethical.',
      delay: '0.4s',
    },
    {
      id: 4,
      name: 'Siddharth Verma',
      text: 'The bamboo lamp adds such a warm, organic feel to my living room. Fast delivery and beautiful packaging.',
      delay: '0.6s',
    },
    {
      id: 5,
      name: 'Meera Das',
      text: "I bought a traditional handloom shawl, and the quality is outstanding. It's a piece of art I'll cherish forever.",
      delay: '0.8s',
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = testimonials.length - visibleCount;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating, maxIndex]);

  return (
    <section className="mx-auto w-full max-w-[1440px] overflow-hidden px-6 pt-6 pb-20 lg:px-12">
      <div className="translate-y-0 opacity-100 transition-all duration-1000">
        <div className="mb-10 text-center">
          <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">
            Voices of Appreciation
          </p>
          <h2 className="font-serif text-3xl text-black md:text-4xl">What Our Connoisseurs Say</h2>
        </div>

        <div className="group relative">
          <div className="w-full cursor-grab overflow-hidden active:cursor-grabbing">
            <div
              className="-ml-4 flex transition-transform duration-500 ease-out md:-ml-8 lg:-ml-12"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-none py-4 pl-4 md:w-1/2 md:pl-8 lg:w-1/3 lg:pl-12"
                >
                  <div
                    className="group relative flex h-full flex-col items-center overflow-hidden border border-zinc-100/50 bg-zinc-50 p-8 text-center transition-all duration-500"
                    style={{ transitionDelay: testimonial.delay }}
                  >
                    <div className="absolute inset-0 z-0 translate-y-full bg-[#FFF4B3] transition-transform duration-500 ease-in-out group-hover:translate-y-0"></div>
                    <div className="relative z-10 flex h-full flex-col items-center">
                      <div className="mb-8 flex gap-1">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                      </div>
                      <p className="mb-8 flex-1 font-serif text-lg leading-relaxed text-black italic md:text-xl">
                        "{testimonial.text}"
                      </p>
                      <div className="mt-auto">
                        <p className="font-sans text-sm font-semibold tracking-wider text-black uppercase">
                          {testimonial.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 z-20 -translate-x-4 -translate-y-1/2 bg-white p-3 text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-black hover:text-white"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 z-20 translate-x-4 -translate-y-1/2 bg-white p-3 text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-black hover:text-white"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-[#D33740]' : 'bg-zinc-300 hover:bg-zinc-400'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-star h-3.5 w-3.5 fill-[#E31E25] text-[#E31E25]"
      aria-hidden="true"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}
