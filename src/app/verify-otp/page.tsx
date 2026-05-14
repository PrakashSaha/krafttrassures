'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/services/authApi';
import { toast } from 'sonner';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes (600 seconds)
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Resend Cooldown Countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) value = value[0]; // Only take first char
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setResendCooldown(30);
      setTimer(600);
      toast.success('New OTP Sent');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter the full 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const data = await authApi.verifyOtp(email, otpString);
      toast.success('OTP Verified');
      router.push(`/reset-password?token=${data.resetToken}`);
    } catch (err: any) {
      toast.error('Verification Failed', {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] p-8">
        <div className="text-center">
          <p className="mb-4 text-black/50">Missing email reference.</p>
          <Link href="/forgot-password" className="text-[#D33740] font-bold uppercase tracking-widest text-[11px]">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-700">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Verification</p>
          <h2 className="font-serif text-4xl text-black">Enter OTP</h2>
          <p className="mt-4 text-[14px] leading-relaxed text-black/50">
            We've sent a 6-digit code to <span className="font-bold text-black">{email}</span>. Please enter it below.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className={`h-2 w-2 rounded-full ${timer > 60 ? 'bg-green-500' : 'bg-[#D33740] animate-pulse'}`} />
            <span className="text-[12px] font-bold text-black font-mono">Expires in: {formatTime(timer)}</span>
          </div>
        </div>

        <div className="border border-black/5 bg-white p-8 shadow-xl lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-between gap-2 sm:gap-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-14 w-full border border-[#C8C3BB] bg-[#FAF7F2] text-center font-serif text-2xl text-black outline-none focus:border-black transition-all"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || timer <= 0}
              className="w-full bg-black py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-[#D33740] disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>

          <div className="mt-10 flex flex-col items-center border-t border-black/5 pt-8">
             <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || loading}
                className="text-[10px] font-bold tracking-[0.2em] text-black uppercase hover:text-[#D33740] disabled:opacity-30 transition-colors"
             >
                {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : 'Resend Code'}
             </button>
             <Link 
              href="/forgot-password"
              className="mt-4 text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase hover:text-black transition-colors"
            >
              Change Email
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
