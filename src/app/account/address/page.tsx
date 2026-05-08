'use client';

import React, { useState } from 'react';

interface Address {
  id: number;
  name: string;
  phone: string;
  line: string;
  city: string;
  state: string;
  pin: string;
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Shipping</p>
        <h1 className="font-serif text-4xl text-black">Saved Addresses</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-black/50">
          Manage your delivery destinations for heritage artifacts.
        </p>
      </div>

      <div className="border-t border-black/5 pt-10">
        <button
          onClick={() => setShowForm(!showForm)}
          className={`mb-10 flex items-center gap-3 border px-6 py-4 text-[10px] font-bold tracking-[0.25em] uppercase transition-all active:scale-[0.98] ${
            showForm ? 'border-[#D33740] text-[#D33740] hover:bg-[#D33740] hover:text-white' : 'border-black text-black hover:bg-black hover:text-white'
          }`}
        >
          {showForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              Cancel
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add New Address
            </>
          )}
        </button>

        {showForm && (
          <div className="mb-12 border border-black/5 bg-[#FAF7F2] p-8 animate-in slide-in-from-top-4 duration-500">
            <h3 className="mb-8 font-serif text-2xl text-black">New Destination</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <AddressField label="Full Name" placeholder="Artifact Recipient Name" required />
                <AddressField label="Phone" placeholder="10-digit number" type="tel" required />
              </div>
              <AddressField label="Address Line" placeholder="Street address, colony, or landmark" required />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <AddressField label="City" placeholder="City" required />
                <AddressField label="State" placeholder="State" required />
                <AddressField label="Pincode" placeholder="6-digit code" required />
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase hover:text-black">Cancel</button>
                <button type="submit" className="bg-[#D33740] px-10 py-4 text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-lg shadow-[#D33740]/10 hover:bg-black transition-all">Save Address</button>
              </div>
            </form>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="border border-dashed border-black/10 bg-[#FAF7F2] py-24 text-center">
            <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">No Saved Locations</p>
            <p className="text-[14px] text-black/40">Add your first delivery address to keep checkout faster next time.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {addresses.map((addr) => (
              <div key={addr.id} className="border border-black/5 bg-[#FAF7F2] p-6 hover:border-[#C5AB7D]/30 transition-all">
                <p className="font-serif text-lg text-black mb-1">{addr.name}</p>
                <p className="text-[14px] text-black/50 leading-relaxed">{addr.line}, {addr.city}, {addr.state} - {addr.pin}</p>
                <p className="mt-4 text-[12px] font-bold text-black/40">{addr.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AddressField({ label, ...props }: any) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">{label}</label>
      <input
        {...props}
        className="w-full border border-black/5 bg-white px-4 py-4 text-[14px] text-black outline-none focus:border-[#C5AB7D] transition-all placeholder:text-black/10"
      />
    </div>
  );
}
