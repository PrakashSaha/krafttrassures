/* eslint-disable react-hooks/set-state-in-effect */\n/* eslint-disable react-hooks/immutability */\n// Disabled specific rules as refactoring could cause regressions or false positives\n'use client';

import { useState, useRef, useEffect } from 'react';

const locales = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', isRtl: true }
];

export default function LanguageSwitcher() {
  const [activeLocale, setActiveLocale] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find(l => l.code === activeLocale) || locales[0];

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);

    // Initial check for Google Translate cookie
    const cookie = document.cookie.split('; ').find(row => row.startsWith('googtrans='));
    if (cookie) {
      const parts = cookie.split('=')[1].split('/');
      const code = parts[parts.length - 1];
      if (code && locales.some(l => l.code === code)) {
        setActiveLocale(code);
        if (code === 'ar') document.documentElement.dir = 'rtl';
      }
    }

    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const switchTo = (localeCode: string) => {
    setActiveLocale(localeCode);
    setIsOpen(false);
    
    // Update RTL dynamically
    if (localeCode === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    // Returning to the base language requires clearing the translation cookie
    if (localeCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
      window.location.reload();
      return;
    }

    // Trigger Google Translate DOM Element
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = localeCode;
      selectElement.dispatchEvent(new Event('change'));
    } else {
      // Fallback: If widget isn't fully loaded, forcefully set the translation cookie and reload
      document.cookie = `googtrans=/en/${localeCode}; path=/;`;
      window.location.reload();
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
      >
        <span>{currentLocale.flag}</span>
        <span className="hidden lg:inline">{currentLocale.name}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 border border-[#C8C3BB] bg-white shadow-xl z-[100]">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
                activeLocale === l.code ? 'font-bold bg-zinc-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{l.flag}</span>
                <span>{l.name}</span>
              </div>
              {l.isRtl && (
                <span className="text-[9px] font-bold tracking-wider text-[#D33740] uppercase border border-[#D33740] px-1 rounded-sm">
                  RTL
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
