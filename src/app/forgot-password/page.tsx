'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/authApi';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      toast.success('OTP Sent', {
        description: `We've sent a 6-digit code to ${email}.`,
      });
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error('Error', {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[450px] animate-in fade-in zoom-in-95 duration-700">
        {/* Branding/Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block mb-8">
             <h1 className="font-serif text-2xl tracking-tighter text-black uppercase">Kraft Treasure</h1>
          </Link>
          <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Security</p>
          <h2 className="font-serif text-4xl text-black">Forgot Password?</h2>
          <p className="mt-4 text-[14px] leading-relaxed text-black/50">
            Enter the email associated with your account and we'll send you an OTP to reset your password.
          </p>
        </div>

        {/* Form Card */}
        <div className="border border-black/5 bg-white p-8 shadow-xl lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#595148] uppercase">
                Email Address <span className="text-[#D33740]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full border border-[#C8C3BB] bg-[#FAF7F2] px-4 py-4 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-[#595148]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 bg-[#D33740] py-5 font-sans text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-black/5 pt-6">
            <Link 
              href="/login"
              className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase hover:text-black transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
