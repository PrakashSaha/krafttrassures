'use client';

import React, { useState } from 'react';

export default function PasswordPage() {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPass !== form.confirm) {
      setStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    setStatus({ type: 'success', message: 'Credential archive updated successfully!' });
    setForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setStatus({ type: '', message: '' }), 4000);
  };

  return (
    <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Security</p>
        <h1 className="font-serif text-4xl text-black">Update Password</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-black/50">
          Ensure your digital archive access remains secure with a strong password.
        </p>
      </div>

      <div className="border-t border-black/5 pt-10">
        {status.message && (
          <div className={`mb-8 px-6 py-4 text-[12px] font-bold tracking-wide uppercase border ${
            status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">
          <PasswordField label="Current Password" value={form.current} onChange={(v) => setForm({ ...form, current: v })} required />
          <PasswordField label="New Password" value={form.newPass} onChange={(v) => setForm({ ...form, newPass: v })} required />
          <PasswordField label="Confirm New Password" value={form.confirm} onChange={(v) => setForm({ ...form, confirm: v })} required />
          
          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-black px-12 py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-[#D33740] active:scale-[0.98] shadow-xl shadow-black/5">
              Secure Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, required }: any) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">
        {label} {required && <span className="text-[#D33740]">*</span>}
      </label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder="••••••••"
        className="w-full border border-black/5 bg-[#FAF7F2] px-4 py-4 text-[14px] text-black outline-none transition-all focus:border-[#C5AB7D] placeholder:text-black/10"
      />
    </div>
  );
}
