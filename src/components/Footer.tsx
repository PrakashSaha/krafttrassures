'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES_LINKS } from '@/lib/data';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="border-t border-white/10 bg-black px-6 pt-20 pb-[50px] text-white lg:px-20 font-sans">
      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <div className="mb-8 origin-left scale-110">
            <img
              alt="Kraft Treasure"
              className="h-16 w-auto object-contain lg:h-20"
              src="/images/img_a798301695a75446cda6944aecd9a0d9.jpeg"
            />
          </div>
          <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/60">
            Authentic heritage craftsmanship from the tribal artisans of Arunachal Pradesh, curated
            for global connoisseurs of fine traditional art.
          </p>
          <div className="flex items-center gap-4">
            <SocialLink href="https://www.instagram.com/krafttreasure/" icon="instagram" />
            <SocialLink href="https://www.facebook.com/profile.php" icon="facebook" />
          </div>
        </div>

        {/* Links Sections */}
        <FooterLinks title="Quick Links" links={FOOTER_QUICK_LINKS} />

        <FooterLinks title="Client Services" links={FOOTER_SERVICES_LINKS} />


        {/* Newsletter Section */}
        <div>
          <p className="mb-8 text-[12px] font-medium tracking-[0.4em] text-white uppercase">
            Newsletter
          </p>
          <p className="mb-6 text-sm text-white/50">
            Subscribe to receive updates on new curated collections and artisan stories.
          </p>
          <form className="relative mt-2" onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email-footer" className="mb-2 block text-[10px] tracking-[0.22em] text-white/60 uppercase">
              Email <span className="text-[#D33740]">*</span>
            </label>
            <input
              id="newsletter-email-footer"
              type="email"
              placeholder="Your Email Address"
              required
              className="w-full border-b border-white/10 bg-white/5 py-3 pr-10 text-sm transition-colors focus:border-[#D33740] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="absolute bottom-3 right-0 text-white hover:text-[#D33740] transition-colors" aria-label="Subscribe">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
        <p className="text-[12px] text-white/40">© 2026 Kraft Treasure. All rights reserved.</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-white/40 transition-colors hover:text-[#D33740]"
          href="https://www.theaquarious.com/"
        >
          Designed By Technology Partner
        </a>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-8 text-[12px] font-medium tracking-[0.4em] text-white uppercase">{title}</p>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-sm text-white/50 transition-all hover:translate-x-1 hover:text-white">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: 'instagram' | 'facebook' }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="border border-white/10 bg-white/5 p-3 transition-all hover:bg-white hover:text-black"
      href={href}
    >
      {icon === 'instagram' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
      )}
    </a>
  );
}
