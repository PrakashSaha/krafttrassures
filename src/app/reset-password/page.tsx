'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/services/authApi';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    if (!password) return { label: '', color: 'bg-transparent', score: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', color: 'bg-[#D33740]', score };
    if (score <= 3) return { label: 'Medium', color: 'bg-[#C5AB7D]', score };
    return { label: 'Strong', color: 'bg-green-600', score };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      toast.success('Success', {
        description: 'Your password has been reset successfully.',
      });
      router.push('/login?reset=success');
    } catch (err: any) {
      toast.error('Reset Failed', {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] p-8">
        <div className="text-center">
          <p className="mb-4 text-black/50">Missing reset token.</p>
          <Link href="/forgot-password" className="text-[#D33740] font-bold uppercase tracking-widest text-[11px]">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-700">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Security Update</p>
          <h2 className="font-serif text-4xl text-black">Reset Password</h2>
          <p className="mt-4 text-[14px] leading-relaxed text-black/50">
            Please enter a strong new password for your account.
          </p>
        </div>

        <div className="border border-black/5 bg-white p-8 shadow-xl lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#595148] uppercase">
                New Password <span className="text-[#D33740]">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-[#C8C3BB] bg-[#FAF7F2] px-4 py-4 pr-12 text-[13px] text-black outline-none focus:border-black transition-colors"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-[#595148] hover:text-black transition-colors"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              
              {/* Strength Meter */}
              {password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-black/40">Strength: {passwordStrength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-black/5 overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ${passwordStrength.color}`} 
                        style={{ width: `${(passwordStrength.score / 4) * 100}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#595148] uppercase">
                Confirm Password <span className="text-[#D33740]">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-[#C8C3BB] bg-[#FAF7F2] px-4 py-4 text-[13px] text-black outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D33740] py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function EyeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}

function EyeOffIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}
