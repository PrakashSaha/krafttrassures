'use client';

import React from 'react';
import Link from 'next/link';

import {
  PackageIcon,
  HeartIcon,
  MapPinIcon,
  ShopIcon,
  CreditCardIcon,
  ClockIcon
} from '@/components/AccountIcons';

const STATS = [
  { label: 'Total Orders', value: 0, color: 'text-[#D33740]', icon: <PackageIcon /> },
  { label: 'Wishlist Items', value: 3, color: 'text-[#C5AB7D]', icon: <HeartIcon /> },
  { label: 'Saved Addresses', value: 0, color: 'text-black/30', icon: <MapPinIcon /> },
];

const QUICK_LINKS = [
  { label: 'Browse Products', desc: 'Explore our heritage catalog', href: '/shop', icon: <ShopIcon /> },
  { label: 'My Transactions', desc: 'View payment history', href: '/account/transactions', icon: <CreditCardIcon /> },
  { label: 'Manage Addresses', desc: 'Add or edit shipping details', href: '/account/address', icon: <MapPinIcon /> },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-black p-10 lg:p-14">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/img_93892b41c09914ab339b71a95c773150.png" alt="BG" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10">
          <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Welcome Back</p>
          <h1 className="mb-4 font-serif text-3xl text-white lg:text-5xl">Pifoba Pifoba</h1>
          <p className="max-w-md text-[14px] leading-relaxed text-white/50">
            Manage your curated collections, track your heritage artifacts, and update your personal profile.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="border border-black/5 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className={`mb-6 ${s.color}`}>{s.icon}</div>
            <p className="mb-1 font-serif text-5xl text-black">{s.value}</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#C5AB7D] uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="border border-black/5 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-black/5 px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="text-[#C5AB7D]"><ClockIcon /></div>
            <h2 className="font-serif text-lg text-black">Recent Orders</h2>
          </div>
          <Link href="/account/orders" className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#D33740] uppercase hover:text-black transition-colors">
            View All <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="px-8 py-16 text-center">
          <p className="text-[14px] text-black/30 font-medium italic">You haven't placed any orders yet.</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {QUICK_LINKS.map((q) => (
          <Link key={q.label} href={q.href} className="group flex items-start gap-5 border border-black/5 bg-white p-6 transition-all hover:border-[#C5AB7D] hover:shadow-lg">
            <div className="text-[#C5AB7D] shrink-0 group-hover:scale-110 transition-transform">{q.icon}</div>
            <div>
              <p className="mb-1 font-serif text-base text-black group-hover:text-[#D33740] transition-colors">{q.label}</p>
              <p className="text-[12px] text-black/40 leading-relaxed">{q.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

