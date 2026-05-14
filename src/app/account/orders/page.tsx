'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchAPI } from '@/lib/api';
import { Order } from '@/lib/types';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.jwt || !user?.id) {
      setLoading(false);
      return;
    }
    fetchAPI('/api/orders', {
      token: user.jwt,
      params: {
        'filters[user][id][$eq]': user.id,
        'sort': 'createdAt:desc'
      }
    })
    .then(data => {
      if (data && data.data) {
        setOrders(data.data.map((item: any): Order => ({
          id: item.id,
          orderId: item.attributes?.orderId || item.orderId,
          createdAt: item.attributes?.createdAt || item.createdAt,
          totalAmount: item.attributes?.totalAmount || item.totalAmount,
          status: item.attributes?.status || item.status,
          items: item.attributes?.items || item.items || []
        })));
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch orders', err);
      setLoading(false);
    });
  }, [user]);
  return (
    <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Activity</p>
        <h1 className="font-serif text-4xl text-black">My Orders</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-black/50">
          Track and manage your curated heritage artifact acquisitions.
        </p>
      </div>

      <div className="border-t border-black/5 pt-10">
        {/* Desktop Table Header */}
        <div className="mb-6 hidden grid-cols-5 gap-4 sm:grid px-4">
          {['Artifact ID', 'Date', 'Items', 'Total', 'Status'].map((h) => (
            <p key={h} className="text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">
              {h}
            </p>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="border border-dashed border-black/10 bg-[#FAF7F2] py-24 text-center">
            <div className="mb-8 flex justify-center text-black/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 10a4 4 0 0 1-8 0" /><path d="M3.103 6.034h17.794" />
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
              </svg>
            </div>
            <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">No Acquisitions Found</p>
            <p className="mb-10 text-[14px] text-black/40">You haven't placed any orders in our archive yet.</p>
            <Link href="/shop" className="group relative inline-flex items-center justify-center gap-3 bg-black px-10 py-4 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-[#D33740] active:scale-[0.98]">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center border border-black/5 bg-[#FAF7F2] p-4 text-[14px]">
                <p className="font-serif text-black">{order.orderId}</p>
                <p className="text-black/60">{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-black/60">{order.items?.length || 0} items</p>
                <p className="font-bold text-black">₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5AB7D]">{order.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
