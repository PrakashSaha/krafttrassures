'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileMenu({ isOpen, onClose, onSearchOpen }: MobileMenuProps) {
  const { user, wishlist } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-black/5">
        <Link href="/" onClick={onClose}>
          <img
            src="/images/img_a798301695a75446cda6944aecd9a0d9.jpeg"
            alt="Kraft Treasure"
            className="h-10 w-auto object-contain"
          />
        </Link>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-black uppercase"
        >
          Close
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mb-10 grid grid-cols-3 gap-2">
          <button
            onClick={() => { onClose(); onSearchOpen(); }}
            className="action-btn"
          >
            Search
          </button>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="action-btn flex items-center justify-center relative"
          >
            Wishlist
            {wishlist && wishlist.length > 0 && (
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D33740] text-[9px] font-bold text-white shadow-sm ring-1 ring-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href={user ? "/account" : "/login"}
            onClick={onClose}
            className="action-btn flex items-center justify-center"
          >
            {user ? 'Account' : 'Login'}
          </Link>
        </div>

        <nav className="flex flex-col gap-6 mb-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="font-serif text-4xl text-black hover:text-[#D33740] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/shop"
          onClick={onClose}
          className="flex w-full items-center justify-center bg-[#D33740] py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase shadow-lg shadow-[#D33740]/20 active:scale-[0.98] transition-all"
        >
          View All Products
        </Link>
      </div>

      {/* Socials */}
      <div className="px-6 py-8 border-t border-black/5 flex items-center gap-6">
        <SocialIcon href="#" icon="instagram" />
        <SocialIcon href="#" icon="facebook" />
      </div>

      <style jsx>{`
        .action-btn {
          @apply h-14 border border-black/10 bg-white text-[11px] font-bold tracking-[0.2em] text-black uppercase transition-colors active:bg-black active:text-white;
        }
      `}</style>
    </div>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: 'instagram' | 'facebook' }) {
  return (
    <Link href={href} className="text-black hover:text-[#D33740] transition-colors">
      {icon === 'instagram' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      )}
    </Link>
  );
}
