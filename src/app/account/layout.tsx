'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface NavItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

import { ACCOUNT_NAV } from '@/lib/data';
import {
  DashboardIcon,
  UserIcon,
  MapPinIcon,
  HeartIcon,
  LockIcon,
  PackageIcon,
  CreditCardIcon
} from '@/components/AccountIcons';

const ICON_MAP: Record<string, React.ReactNode> = {
  '/account': <DashboardIcon />,
  '/account/profile': <UserIcon />,
  '/account/address': <MapPinIcon />,
  '/account/wishlist': <HeartIcon />,
  '/account/password': <LockIcon />,
  '/account/orders': <PackageIcon />,
  '/account/transactions': <CreditCardIcon />,
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  const NAV = ACCOUNT_NAV.map(item => ({
    ...item,
    icon: ICON_MAP[item.href] || <DashboardIcon />
  }));

  const activeItem = NAV.find((n) => n.href === pathname) ?? NAV[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 lg:py-20">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Desktop Sidebar */}
          <aside className="hidden w-[280px] shrink-0 lg:block animate-in fade-in slide-in-from-left-4 duration-1000">
            <p className="mb-6 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Menu</p>
            <div className="border border-black/5 bg-white p-4 shadow-sm">
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
                <button
                  onClick={() => { logout(); router.push('/'); }}
                  className="btn-dark mt-6 w-full group"
                >
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </button>
              </nav>
            </div>
          </aside>

          {/* Mobile Dropdown */}
          <div className="lg:hidden animate-in fade-in slide-in-from-top-4 duration-700">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex w-full items-center justify-between border border-black/5 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#D33740]">{activeItem.icon}</span>
                <span className="text-[13px] font-bold uppercase tracking-wider">{activeItem.label}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {mobileOpen && (
              <div className="mt-2 border border-black/5 bg-white p-3 shadow-xl">
                <nav className="flex flex-col gap-1.5">
                  {NAV.map((item) => (
                    <NavItem key={item.href} {...item} isActive={pathname === item.href} onClick={() => setMobileOpen(false)} />
                  ))}
                  <button
                    onClick={() => { logout(); router.push('/'); }}
                    className="mt-2 flex w-full items-center justify-center gap-2 bg-[#D33740] py-4 text-[10px] font-bold tracking-[0.3em] text-white uppercase"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Page Content */}
          <main className="min-w-0 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ label, href, icon, isActive, onClick }: { label: string; href: string; icon: React.ReactNode; isActive: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 border px-6 py-4 text-[11px] font-bold tracking-[0.1em] transition-all duration-300 uppercase ${
        isActive
          ? 'border-[#D33740] bg-white text-black shadow-md ring-1 ring-[#D33740]'
          : 'border-black bg-white/50 text-black/40 hover:bg-white hover:text-black hover:shadow-sm'
      }`}
    >
      <span className={isActive ? 'text-[#D33740]' : 'text-black/20'}>{icon}</span>
      {label}
    </Link>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#D33740] border-t-transparent" />
    </div>
  );
}
