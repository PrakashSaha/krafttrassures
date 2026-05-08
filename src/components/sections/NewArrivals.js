'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function NewArrivals() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const products = [
    {
      id: 1,
      name: 'Monpa Dung Kar – Sacred Painted Ceremonial Conch Shell on Stand',
      category: 'Ritual Object',
      price: '₹4,299',
      image: '/images/img_04927e860f65c51b5946f8b1b24831da.png',
      href: '/product/monpa-dung-kar-sacred-painted-ceremonial-conch-shell-on-stand',
      delay: '0.1s',
    },
    {
      id: 2,
      name: 'Monpa Golden Dragon Figurine – Hand-Cast Celestial Guardian',
      category: 'Figurine & Sculpture',
      price: '₹5,499',
      image: '/images/img_a9132c04a3411b218b8addb9be42a9ba.png',
      href: '/product/monpa-golden-dragon-figurine-hand-cast-celestial-guardian',
      delay: '0.2s',
    },
    {
      id: 3,
      name: 'Majestic Ritual Soul Mask',
      category: 'Masks',
      price: '₹12,400',
      image: '/images/img_86a8927604bc9322fca261f48b29454a.png',
      href: '/product/majestic-ritual-soul-mask',
      delay: '0.3s',
    },
    {
      id: 4,
      name: 'Imperial Dragon Motif Teacup',
      category: 'Cups and Plates',
      price: '₹1,800',
      image: '/images/img_d81156df7b760918a15333587af8dc1b.png',
      href: '/product/imperial-dragon-motif-teacup',
      delay: '0.4s',
    },
    {
      id: 5,
      name: 'Ancient Green Deity Mask',
      category: 'Masks',
      price: '₹4,500',
      image: '/images/img_2494a847f0389601eacab27aa7fb9c69.png',
      href: '/product/ancient-green-deity-mask',
      delay: '0.5s',
    },
    {
      id: 6,
      name: 'Monpa Rangzen Rang-Dun – Colorful Floral Mandala Painted Tongue Drum',
      category: 'Musical Instrument',
      price: '₹3,499',
      image: '/images/img_9f9a8b413ddac6051a530306ccddb534.png',
      href: '/product/monpa-rangzen-rang-dun-colorful-floral-mandala-painted-tongue-drum',
      delay: '0.6s',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-white pt-[70px] pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <div
          className={`mb-8 flex flex-col justify-between gap-6 transition-all duration-1000 lg:mb-12 lg:flex-row lg:items-end ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div>
            <p className="mb-4 font-sans text-xs tracking-[0.4em] text-[#C5AB7D] uppercase">
              Freshly Curated
            </p>
            <h2 className="font-serif text-3xl leading-tight text-black md:text-5xl lg:text-6xl">
              New Arrivals
            </h2>
          </div>
          <Link
            className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase shadow-md transition-colors duration-500"
            href="/shop"
          >
            <span className="relative z-20">View All Pieces</span>
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
              className="lucide lucide-arrow-right relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
          </Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="-ml-6 flex transition-transform duration-500 ease-out lg:-ml-8"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_25%] lg:pl-8"
                >
                  <Link
                    className={`group block transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: isVisible ? product.delay : '0s' }}
                    href={product.href}
                  >
                    <div className="bg-card relative mb-5 aspect-[4/5] overflow-hidden">
                      <img
                        alt={product.name}
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          inset: '0px',
                          color: 'transparent',
                        }}
                        src={product.image}
                      />
                      <div className="bg-background/40 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="text-foreground border-foreground/40 border px-6 py-3 font-sans text-xs tracking-[0.2em] uppercase backdrop-blur-sm transition-colors duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                          View Details
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1 font-sans text-[10px] tracking-[0.3em] uppercase">
                        {product.category}
                      </p>
                      <h2 className="text-foreground group-hover:text-primary mb-2 line-clamp-1 font-serif text-base transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-primary font-sans text-sm">{product.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`mt-12 flex justify-center gap-4 transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <button
            onClick={prevSlide}
            className="border-border border bg-white p-4 text-black shadow-sm transition-all duration-300 hover:bg-black hover:text-white"
            aria-label="Previous item"
          >
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
              className="lucide lucide-chevron-left h-5 w-5"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="border-border border bg-white p-4 text-black shadow-sm transition-all duration-300 hover:bg-black hover:text-white"
            aria-label="Next item"
          >
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
              className="lucide lucide-chevron-right h-5 w-5"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
