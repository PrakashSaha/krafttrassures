'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add subscription logic here
  };

  return (
    <footer className="border-t border-white/10 bg-black px-6 pt-20 pb-[50px] text-white lg:px-20">
      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        <div className="lg:col-span-1">
          <div className="mb-8 origin-left scale-110">
            <img
              alt="Kraft Treasure Logo"
              loading="lazy"
              width="260"
              height="96"
              decoding="async"
              data-nimg="1"
              className="h-16 w-auto object-contain lg:h-20"
              style={{ color: 'transparent' }}
              src="/images/img_a798301695a75446cda6944aecd9a0d9.jpeg"
            />
          </div>
          <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/60 transition-opacity hover:opacity-100">
            Authentic heritage craftsmanship from the tribal artisans of Arunachal Pradesh, curated
            for global connoisseurs of fine traditional art.
          </p>
          <div className="flex items-center gap-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none border border-white/10 bg-white/5 p-3 transition-all duration-500 hover:border-[#FFF4B3] hover:bg-[#FFF4B3] hover:text-black"
              href="https://www.instagram.com/krafttreasure/"
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
                className="lucide lucide-instagram h-5 w-5"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none border border-white/10 bg-white/5 p-3 transition-all duration-500 hover:border-[#FFF4B3] hover:bg-[#FFF4B3] hover:text-black"
              href="https://www.facebook.com/profile.php"
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
                className="lucide lucide-facebook h-5 w-5"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p className="mb-8 text-[12px] font-medium tracking-[0.4em] text-white uppercase">
            Quick Links
          </p>
          <ul className="space-y-4">
            {[
              { name: 'Home', href: '/' },
              { name: 'Shop', href: '/shop' },
              { name: 'Our Story', href: '/our-story' },
              { name: 'Contact', href: '/contact' },
              { name: 'My Account', href: '/account' },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  className="inline-block text-sm text-white/50 transition-all duration-300 hover:translate-x-1 hover:text-[#FFF4B3]"
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-8 text-[12px] font-medium tracking-[0.4em] text-white uppercase">
            Client Services
          </p>
          <ul className="space-y-4">
            {[
              { name: 'Shipping & Delivery', href: '/shipping' },
              { name: 'Returns & Exchanges', href: '/returns' },
              { name: 'Privacy Policy', href: '/privacy' },
              { name: 'Terms of Use', href: '/terms' },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  className="inline-block text-sm text-white/50 transition-all duration-300 hover:translate-x-1 hover:text-[#FFF4B3]"
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-8 text-[12px] font-medium tracking-[0.4em] text-white uppercase">
            Newsletter
          </p>
          <p className="mb-6 text-sm text-white/50">
            Subscribe to receive updates on new curated collections and artisan stories.
          </p>
          <form className="relative mt-2" onSubmit={handleSubmit}>
            <label
              htmlFor="newsletter-email"
              className="mb-2 block text-[10px] tracking-[0.22em] text-white/60 uppercase"
            >
              Email <span className="text-[#E31E25]">*</span>
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your Email Address"
              required
              className="w-full border-b border-white/10 bg-white/5 py-3 pr-10 text-sm transition-colors focus:border-[#E31E25] focus:outline-none disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-0 -translate-y-1/2 text-white transition-colors hover:text-[#E31E25] disabled:opacity-50"
              aria-label="Subscribe"
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
                className="lucide lucide-send h-4 w-4"
                aria-hidden="true"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
            </button>
          </form>
          <p className="mt-10 text-[10px] leading-relaxed text-white/30 italic">
            *Product imagery across our platform has been refined with advanced AI to ensure every
            intricate tribal detail is captured with museum-level clarity.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-6 sm:flex-row">
        <p className="text-[12px] text-white/80">© 2026 Kraft Treasure. All rights reserved.</p>
        <div className="flex items-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-white/80 transition-colors hover:text-[#FFF4B3]"
            href="https://www.theaquarious.com/"
          >
            Designed By Technology Partner
          </a>
        </div>
      </div>
    </footer>
  );
}
