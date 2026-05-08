'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Trending() {
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
      name: 'Tribal Sun Guardian Shield',
      category: 'Show Pieces',
      price: '₹8,500',
      image: '/images/img_b8726ae1fd40b63d1df281ea827f866a.jpeg',
      hoverImage: '/images/img_b8726ae1fd40b63d1df281ea827f866a.png',
      href: '/product/tribal-sun-guardian-shield',
      delay: '0.1s',
    },
    {
      id: 2,
      name: 'Serene Buddha Head Sculpture',
      category: 'Show Pieces',
      price: '₹9,400',
      image: '/images/img_bb7cfcba6be6e6e066f5a39b2ed4023b.jpeg',
      hoverImage: '/images/img_bb7cfcba6be6e6e066f5a39b2ed4023b.png',
      href: '/product/serene-buddha-head-sculpture',
      delay: '0.2s',
    },
    {
      id: 3,
      name: 'Sacred Tawang Monastery Banner',
      category: 'others',
      price: '₹3,600',
      image: '/images/img_fe5868b7fbd6b79af0cae09fae05a834.jpeg',
      hoverImage: '/images/img_fe5868b7fbd6b79af0cae09fae05a834.png',
      href: '/product/sacred-tawang-monastery-banner',
      delay: '0.3s',
    },
    {
      id: 4,
      name: 'Sacred Geometric Steel Tongue Drum',
      category: 'Show Pieces',
      price: '₹6,800',
      image: '/images/img_b6b893bf9561c378a643cae02ba8ff63.jpeg',
      hoverImage: '/images/img_b6b893bf9561c378a643cae02ba8ff63.png',
      href: '/product/sacred-geometric-steel-tongue-drum',
      delay: '0.4s',
    },
    {
      id: 5,
      name: 'Majestic Ritual Soul Mask',
      category: 'Masks',
      price: '₹12,400',
      image: '/images/img_86a8927604bc9322fca261f48b29454a.png',
      hoverImage: '/images/img_86a8927604bc9322fca261f48b29454a.png',
      href: '/product/majestic-ritual-soul-mask',
      delay: '0.5s',
    },
  ];

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-20 lg:px-12">
      <div
        className={`mb-12 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">
          Most Wanted
        </p>
        <h2 className="font-serif text-3xl leading-tight text-black md:text-4xl lg:text-5xl">
          Trending Products
        </h2>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            className={`group block transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: isVisible ? product.delay : '0s' }}
            href={product.href}
          >
            <div className="relative mb-4 aspect-[4/5] overflow-hidden border border-zinc-100/50 bg-zinc-50">
              <img
                alt={product.name}
                loading="lazy"
                className="object-cover opacity-100 transition-opacity duration-700 group-hover:opacity-0"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  inset: '0px',
                  color: 'transparent',
                }}
                src={product.image}
              />
              <img
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  inset: '0px',
                  color: 'transparent',
                }}
                src={product.hoverImage}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute top-4 right-4 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <button
                    type="button"
                    className="bg-white p-3 text-black shadow-sm transition-colors hover:bg-black hover:text-white"
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
                      className="lucide lucide-heart h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="bg-white p-3 text-black shadow-sm transition-colors hover:bg-black hover:text-white"
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
                      className="lucide lucide-shopping-bag h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M16 10a4 4 0 0 1-8 0" />
                      <path d="M3.103 6.034h17.794" />
                      <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="border border-black/10 bg-white px-5 py-3 text-center font-sans text-[10px] tracking-[0.2em] text-black uppercase shadow-sm transition-colors duration-300 hover:bg-black hover:text-white">
                    View Details
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-0.5 text-center">
              <p className="text-muted-foreground font-sans text-[9px] tracking-[0.3em] uppercase">
                {product.category}
              </p>
              <h3 className="text-foreground line-clamp-1 font-serif text-sm transition-colors hover:text-[#C5AB7D] lg:text-base">
                {product.name}
              </h3>
              <p className="text-primary text-base font-semibold lg:text-lg">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div
        className={`flex justify-center transition-all delay-700 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <Link
          className="group relative inline-flex min-w-[200px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-8 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase shadow-md transition-colors duration-500"
          href="/shop"
        >
          <span className="relative z-20">View All Products</span>
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
    </section>
  );
}
