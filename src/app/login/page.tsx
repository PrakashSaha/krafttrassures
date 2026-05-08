'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/sections/Topbar';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegisterPass, setShowRegisterPass] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = loginEmail.split('@')[0];
    login({ name: name.charAt(0).toUpperCase() + name.slice(1), email: loginEmail });
    router.push('/account');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const name = `${regFirstName} ${regLastName}`.trim() || regEmail.split('@')[0];
    login({ name, email: regEmail });
    router.push('/account');
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <Topbar />
      
      <div className="mx-auto max-w-[1100px] px-6 py-16 lg:px-12 lg:py-24">
        {/* Page Header */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Access</p>
          <h1 className="mb-6 font-serif text-4xl text-black lg:text-6xl">Login Or Register</h1>
          <p className="max-w-md text-[14px] leading-relaxed text-black/50">
            Sign in to access your curated archive, or create a new profile to begin your journey with Kraft Treasure.
          </p>
        </div>

        {/* Auth Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Login Card */}
          <div className="flex flex-col border border-black/5 bg-white p-8 shadow-sm lg:p-12 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-[#D33740] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">Sign In</p>
                <h2 className="font-serif text-2xl text-black">Member Login</h2>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <AuthField label="Email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="your@email.com" required />
              <div className="relative">
                <AuthField label="Password" type={showLoginPass ? 'text' : 'password'} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowLoginPass(!showLoginPass)} className="absolute right-4 top-[38px] text-black/30 hover:text-black">
                  {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                <div className="mt-2 text-right">
                  <Link href="#" className="text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase hover:text-[#D33740]">Forgot Password?</Link>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full mt-4">Login</button>
            </form>
          </div>

          {/* Register Card */}
          <div className="flex flex-col border border-black/5 bg-white p-8 shadow-sm lg:p-12 animate-in fade-in slide-in-from-right-8 duration-1000 delay-400">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">Join Us</p>
                <h2 className="font-serif text-2xl text-black">Create Account</h2>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4">
                <AuthField label="First Name" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)} placeholder="First Name" required />
                <AuthField label="Last Name" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} placeholder="Last Name" />
              </div>
              <AuthField label="Email" type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="your@email.com" required />
              <div className="relative">
                <AuthField label="Password" type={showRegisterPass ? 'text' : 'password'} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowRegisterPass(!showRegisterPass)} className="absolute right-4 top-[38px] text-black/30 hover:text-black">
                  {showRegisterPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <button type="submit" className="btn-secondary w-full mt-4">Register</button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-primary {
          @apply group flex items-center justify-center gap-3 bg-[#D33740] py-5 font-sans text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black active:scale-[0.98];
        }
        .btn-secondary {
          @apply group flex items-center justify-center gap-3 bg-black py-5 font-sans text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-[#D33740] active:scale-[0.98];
        }
      `}</style>
    </main>
  );
}

function AuthField({ label, ...props }: any) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
        {label} {props.required && <span className="text-[#D33740]">*</span>}
      </label>
      <input
        {...props}
        className="w-full border border-black/5 bg-[#FAF7F2] px-4 py-4 text-[13px] text-black outline-none focus:border-[#C5AB7D] transition-colors placeholder:text-black/20"
      />
    </div>
  );
}

function EyeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}

function EyeOffIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}
