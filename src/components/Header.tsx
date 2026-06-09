'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SearchModal from './SearchModal';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getCategories } from '@/lib/strapi';
import { Category } from '@/lib/types';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header({ initialCategories = [] }: { initialCategories?: Category[] }) {
  const t = useTranslations('nav');
  const { user, wishlist, logout, loading } = useAuth();
  const { cart, cartCount } = useCart();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isExtended, setIsExtended] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Sync categories if initialCategories changes (though unlikely for a layout prop)
  useEffect(() => {
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
    }
  }, [initialCategories]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push('/');
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      {/* Announcement Bar */}
      <div className="relative z-[60]">
        <div className="hidden w-full border-b border-white/10 bg-black py-3 text-white lg:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-12 px-12">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C5AB7D]" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
                All India fast delivery
              </span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C5AB7D]" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
                Easy returns and refunds
              </span>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 right-0 left-0 z-50 border-b border-[#C8C3BB] bg-white/95 shadow-sm backdrop-blur-md"> {/* // CONTRAST FIX */}
        <div className="relative mx-auto w-full max-w-[1440px]">
          <nav className="flex items-center justify-between px-6 py-3 lg:px-12 lg:py-4">
            {/* Logo & Main Nav */}
            <div className="flex items-center gap-6 xl:gap-12">
              <Link className="transition-opacity hover:opacity-80" href="/">
                <Image
                  alt="Kraft Treasure Logo"
                  width={150}
                  height={56}
                  className="h-11 w-auto object-contain lg:h-14"
                  src="/images/img_a798301695a75446cda6944aecd9a0d9.jpeg"
                  priority
                  style={{ width: 'auto' }}
                />
              </Link>
              
              <div className="hidden items-center gap-4 lg:flex xl:gap-8">
                <Link href="/" className="nav-link">{t('home')}</Link>
                
                {/* Shop Mega Menu */}
                <div className="group py-4">
                  <Link href="/shop" className="nav-link flex items-center gap-1">
                    Shop
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                  </Link>
                  <div className="invisible absolute top-full right-0 left-0 w-full origin-top scale-y-95 bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:scale-y-100 group-hover:opacity-100">
                    <div className="mx-auto max-w-[1440px] px-12 py-12">
                      <div className="mx-auto max-w-6xl">
                        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-12 transition-all duration-700 ${!isExtended ? 'max-h-[200px] overflow-hidden' : 'max-h-[1000px]'}`}>
                          {(isExtended ? categories : categories.slice(0, 5)).map((item) => (
                            <Link key={item.slug} href={`/shop?category=${item.slug}`} className="group/item flex flex-col items-center">
                              <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-full border border-[#C8C3BB] bg-zinc-50 shadow-sm transition-all duration-500 group-hover/item:border-[#8C6E3F] group-hover/item:shadow-md">
                                <Image 
                                  src={item.image || '/images/placeholder.png'} 
                                  alt={item.label} 
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover/item:scale-110" 
                                  sizes="128px"
                                />
                              </div>
                              <h4 className="text-[10px] font-bold tracking-[0.2em] text-black uppercase text-center">{item.label}</h4>
                            </Link>
                          ))}
                          
                          {/* Extend / More Button */}
                          {!isExtended && categories.length > 5 && (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                setIsExtended(true);
                              }}
                              className="group/item flex flex-col items-center"
                            >
                              <div className="relative mb-3 flex aspect-square w-full items-center justify-center rounded-full border-2 border-dashed border-[#C8C3BB] bg-white transition-all duration-500 hover:border-[#8C6E3F] hover:bg-[#FAF7F2]">
                                <div className="flex flex-col items-center gap-1 text-[#8C6E3F]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                  <span className="text-[9px] font-bold tracking-widest uppercase">More</span>
                                </div>
                              </div>
                              <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#8C6E3F] uppercase">All Categories</h4>
                            </button>
                          )}
                          
                          {isExtended && (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                setIsExtended(false);
                              }}
                              className="col-span-full mx-auto mt-8 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-[#8C6E3F] uppercase hover:text-black transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                              Show Less
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/our-story" className="nav-link">{t('about')}</Link>
                <Link href="/contact" className="nav-link">{t('contact')}</Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              <LanguageSwitcher />

              {/* Search */}
              <button onClick={() => setSearchOpen(true)} className="icon-btn" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg>
              </button>

              {/* Profile */}
                {loading ? (
                  <div className="h-8 w-8 animate-pulse bg-zinc-100 rounded-full" />
                ) : user ? (
                  <div className="relative" ref={profileRef}>
                    <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-1.5">
                      <span className="flex h-8 w-8 items-center justify-center bg-[#D33740] text-[12px] font-bold text-white uppercase">
                        {(user.firstName || user.username || 'U')[0]}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-black transition-transform ${profileOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg> {/* // CONTRAST FIX */}
                    </button>
                    {profileOpen && (
                      <div className="absolute right-0 top-full mt-3 w-52 border border-[#C8C3BB] bg-white shadow-2xl"> {/* // CONTRAST FIX */}
                        <div className="border-b border-[#C8C3BB] px-5 py-4"> {/* // CONTRAST FIX */}
                          <p className="text-[9px] font-semibold tracking-[0.25em] text-[#3A3530] uppercase">Signed In</p> {/* // CONTRAST FIX */}
                          <p className="font-serif text-[14px] text-black">{user.firstName || user.username}</p>
                        </div>
                        <nav className="py-1">
                          {[
                            { label: 'Dashboard', href: '/account' },
                            { label: 'My Profile', href: '/account/profile' },
                            { label: 'My Address', href: '/account/address' },
                            { label: 'My Wishlist', href: '/account/wishlist' },
                            { label: 'My Orders', href: '/account/orders' },
                            { label: 'My Transactions', href: '/account/transactions' },
                          ].map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setProfileOpen(false)} className="dropdown-link">
                              {item.label}
                            </Link>
                          ))}
                        </nav>
                        <div className="border-t border-[#C8C3BB] px-5 py-3"> {/* // CONTRAST FIX */}
                          <button onClick={handleLogout} className="flex items-center gap-2 text-[12px] font-medium text-[#D33740] hover:text-black transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="icon-btn" aria-label="Login">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </Link>
                )}

              {/* Wishlist */}
              <Link href="/account/wishlist" className="icon-btn relative" aria-label="Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
                {wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D33740] text-[9px] font-bold text-white shadow-sm ring-2 ring-white animate-in zoom-in duration-300">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} className="icon-btn relative" aria-label="Cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white shadow-sm ring-2 ring-white animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button onClick={() => setMobileMenuOpen(true)} className="icon-btn lg:hidden" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
              </button>
            </div>
          </nav>
        </div>

      </header>
    </>
  );
}
