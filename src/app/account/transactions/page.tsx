'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAPI } from '@/lib/api';

export default function TransactionsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.jwt) {
      return;
    }

    fetchAPI('/api/orders', { token: user.jwt, params: { sort: 'createdAt:desc' } })
      .then(data => setTransactions(data?.data || []))
      .catch(error => console.error('Failed to fetch transactions', error))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Finance</p>
        <h1 className="font-serif text-4xl text-black">Payment History</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-black/50">
          A secure archive of your financial transactions with Kraft Treasure.
        </p>
      </div>

      <div className="border-t border-black/5 pt-10">
        {loading ? (
          <p className="py-20 text-center text-sm text-black/40">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <div className="border border-dashed border-black/10 bg-[#FAF7F2] py-24 text-center">
          <div className="mb-8 flex justify-center text-black/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
          <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">No Record Found</p>
          <p className="text-[14px] text-black/40">You do not have any past transactions recorded in our ledger.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map(transaction => {
              const item = transaction.attributes || transaction;
              const status = item.paymentStatus || 'Pending';
              const statusColor = status === 'Paid' ? 'text-green-700 bg-green-50' : status === 'Failed' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50';

              return (
                <div key={transaction.documentId || transaction.id} className="grid gap-3 border border-black/5 bg-[#FAF7F2] p-5 sm:grid-cols-4 sm:items-center">
                  <div>
                    <p className="text-[9px] font-bold tracking-wider text-black/30 uppercase">Transaction</p>
                    <p className="mt-1 text-sm text-black">{item.transactionId || item.orderId}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-wider text-black/30 uppercase">Date</p>
                    <p className="mt-1 text-sm text-black/60">{new Date(item.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-wider text-black/30 uppercase">Amount</p>
                    <p className="mt-1 font-semibold text-black">₹{Number(item.totalAmount || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className={`inline-block px-3 py-1 text-[9px] font-bold tracking-wider uppercase ${statusColor}`}>{status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
