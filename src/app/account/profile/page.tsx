'use client';

import React, { useState } from 'react';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: 'Pifoba',
    lastName: 'Pifoba',
    email: 'pifoba2567@codoteam.com',
    phone: '',
  });

  return (
    <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Profile</p>
        <h1 className="font-serif text-4xl text-black">Personal Details</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-black/50">
          Update your personal details for shipping, invoices, and heritage collection management.
        </p>
      </div>

      <div className="border-t border-black/5 pt-10">
        <div className="mb-10 flex justify-end">
          <button
            onClick={() => setEditing(!editing)}
            className={`flex items-center gap-2 border px-6 py-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-all active:scale-[0.98] ${
              editing ? 'border-[#D33740] text-[#D33740] hover:bg-[#D33740] hover:text-white' : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            {editing ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                Cancel
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Profile
              </>
            )}
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setEditing(false); }} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <ProfileField label="First Name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} disabled={!editing} />
            <ProfileField label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} disabled={!editing} />
          </div>

          <ProfileField label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} disabled={!editing} required />

          <div>
            <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">Phone Number</label>
            <div className={`flex border border-black/5 bg-[#FAF7F2] transition-colors ${editing ? 'focus-within:border-[#C5AB7D]' : ''}`}>
              <span className="flex items-center border-r border-black/5 px-4 py-4 text-[13px] text-black/40 font-bold tracking-tight">🇮🇳 +91</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!editing}
                placeholder="Enter 10-digit number"
                className="flex-1 bg-transparent px-4 py-4 text-[14px] text-black outline-none disabled:cursor-not-allowed placeholder:text-black/10"
              />
            </div>
          </div>

          {editing && (
            <div className="flex justify-end pt-6">
              <button type="submit" className="bg-[#D33740] px-12 py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black active:scale-[0.98] shadow-xl shadow-[#D33740]/10">
                Save Archive Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function ProfileField({ label, value, onChange, disabled, type = 'text', required }: any) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">
        {label} {required && <span className="text-[#D33740]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border border-black/5 bg-[#FAF7F2] px-4 py-4 text-[14px] text-black outline-none transition-all disabled:cursor-not-allowed focus:border-[#C5AB7D] placeholder:text-black/10"
      />
    </div>
  );
}
