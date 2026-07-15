'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState('/account');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegisterPass, setShowRegisterPass] = useState(false);
  const [showRegisterConfirmPass, setShowRegisterConfirmPass] = useState(false);
  const t = useTranslations('auth');

  // Redirect if already logged in
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      window.location.replace(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo]);

  React.useEffect(() => {
    setRedirectTo(new URLSearchParams(window.location.search).get('redirect') || '/account');
  }, []);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!STRAPI_URL) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Invalid credentials');
      }

      await login({ 
        ...data.user,
        jwt: data.jwt 
      });
      window.location.assign(redirectTo);
    } catch (err: any) {
      setLoginError(err.message);
      toast.error('Login Failed', {
        description: err.message,
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match');
      setRegLoading(false);
      return;
    }
    setRegLoading(true);

    try {
      const username = regEmail;
      
      const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email: regEmail,
          password: regPassword,
          // phone: regPhone // REMOVED: Saving separately below to avoid Strapi validation errors
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Registration failed:', {
          status: res.status,
          statusText: res.statusText,
        });
        throw new Error(data.error?.message || data.message || `Registration failed (${res.status}: ${res.statusText})`);
      }

      // If registration successful, manually update the phone number
      if (data.jwt && data.user?.id && regPhone) {
        try {
          await fetch(`${STRAPI_URL}/api/users/${data.user.id}`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.jwt}`
            },
            body: JSON.stringify({ phone: regPhone }),
          });
          // Update the user object in the data to include the phone
          data.user.phone = regPhone;
        } catch (updateErr) {
          console.error('Failed to save phone number during registration', updateErr);
          // We don't throw here so the user can still log in
        }
      }

      await login({ 
        ...data.user,
        jwt: data.jwt 
      });
      window.location.assign(redirectTo);
    } catch (err: any) {
      setRegError(err.message);
      toast.error('Registration Failed', {
        description: err.message,
      });
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      <div className="mx-auto max-w-[1100px] px-6 py-16 lg:px-12 lg:py-24">
        {/* Page Header */}
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Account Access</p>
          <h1 className="mb-4 font-serif text-4xl text-black lg:text-6xl">{isLoginView ? t('login_subtitle') : t('register_subtitle')}</h1>
          <p className="mx-auto max-w-md text-[14px] leading-relaxed text-black/50">
            {isLoginView 
              ? 'Sign in to access your curated archive and manage your treasures.' 
              : 'Begin your journey with Kraft Treasure and preserve heritage craftsmanship.'}
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="mx-auto mb-10 flex w-full max-w-[400px] border border-black/5 bg-white p-1.5 shadow-sm">
          <button 
            onClick={() => setIsLoginView(true)}
            className={`flex-1 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${isLoginView ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
          >
            {t('login_title')}
          </button>
          <button 
            onClick={() => setIsLoginView(false)}
            className={`flex-1 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${!isLoginView ? 'bg-[#D33740] text-white' : 'text-black/40 hover:text-black'}`}
          >
            {t('signup')}
          </button>
        </div>

        <div className="mx-auto max-w-[500px]">
            {isLoginView ? (
              /* Login Card */
              <div className="flex flex-col border border-black/5 bg-white p-8 shadow-xl lg:p-12 animate-in fade-in zoom-in-95 duration-700">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#D33740] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">{t('login_title')}</p>
                    <h2 className="font-serif text-2xl text-black">Member Login</h2>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                  {loginError && <div className="p-4 text-[12px] font-bold tracking-wider text-white bg-[#D33740] uppercase">{loginError}</div>}
                  <AuthField label={t('email')} type="email" value={loginEmail} onChange={(e: any) => setLoginEmail(e.target.value)} placeholder="your@email.com" required />
                  <div className="relative">
                    <AuthField label={t('password')} type={showLoginPass ? 'text' : 'password'} value={loginPassword} onChange={(e: any) => setLoginPassword(e.target.value)} placeholder="••••••••" required className="pr-12" />
                    <button type="button" onClick={() => setShowLoginPass(!showLoginPass)} className="absolute right-4 top-[38px] text-[#595148] hover:text-black transition-colors">
                      {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                    <div className="mt-2 text-right">
                      <Link href="/forgot-password" className="text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase hover:text-[#D33740]">{t('forgot')}</Link>
                    </div>
                  </div>
                  <button type="submit" disabled={loginLoading} className="btn-primary w-full mt-4 disabled:opacity-50">
                    {loginLoading ? 'Signing In...' : t('login_title')}
                  </button>
                </form>
                
                <div className="mt-8 text-center border-t border-black/5 pt-6">
                  <button 
                    onClick={() => setIsLoginView(false)}
                    className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase hover:text-[#D33740] transition-colors"
                  >
                    {t('no_account')}
                  </button>
                </div>
              </div>
            ) : (
              /* Register Card */
              <div className="flex flex-col border border-black/5 bg-white p-8 shadow-xl lg:p-12 animate-in fade-in zoom-in-95 duration-700">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] text-[#C5AB7D] uppercase">Join Us</p>
                    <h2 className="font-serif text-2xl text-black">{t('register_title')}</h2>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>
                  {regError && <div className="p-4 text-[12px] font-bold tracking-wider text-white bg-black uppercase">{regError}</div>}
                  
                  <AuthField label={t('email')} type="email" value={regEmail} onChange={(e: any) => setRegEmail(e.target.value)} placeholder="your@email.com" required />
                  <AuthField label="Phone Number" type="tel" value={regPhone} onChange={(e: any) => setRegPhone(e.target.value)} placeholder="Phone Number" required />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <AuthField label={t('password')} type={showRegisterPass ? 'text' : 'password'} value={regPassword} onChange={(e: any) => setRegPassword(e.target.value)} placeholder="••••••••" required className="pr-12" />
                      <button type="button" onClick={() => setShowRegisterPass(!showRegisterPass)} className="absolute right-4 top-[38px] text-[#595148] hover:text-black transition-colors">
                        {showRegisterPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    <div className="relative">
                      <AuthField label="Confirm" type={showRegisterConfirmPass ? 'text' : 'password'} value={regConfirmPassword} onChange={(e: any) => setRegConfirmPassword(e.target.value)} placeholder="••••••••" required className="pr-12" />
                      <button type="button" onClick={() => setShowRegisterConfirmPass(!showRegisterConfirmPass)} className="absolute right-4 top-[38px] text-[#595148] hover:text-black transition-colors">
                        {showRegisterConfirmPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={regLoading} className="btn-primary w-full mt-4 disabled:opacity-50">
                    {regLoading ? 'Creating Profile...' : t('signup')}
                  </button>
                </form>

                <div className="mt-8 text-center border-t border-black/5 pt-6">
                  <button 
                    onClick={() => setIsLoginView(true)}
                    className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase hover:text-black transition-colors"
                  >
                    {t('have_account')}
                  </button>
                </div>
              </div>
            )}
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

function AuthField({ label, className = "", ...props }: any) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#595148] uppercase">
        {label} {props.required && <span className="text-[#D33740]">*</span>}
      </label>
      <input
        {...props}
        className={`w-full border border-[#C8C3BB] bg-[#FAF7F2] px-4 py-4 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-[#595148]/40 ${className}`}
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
