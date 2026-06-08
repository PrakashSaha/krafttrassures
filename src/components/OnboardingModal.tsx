/* eslint-disable react-hooks/set-state-in-effect */\n/* eslint-disable react-hooks/immutability */\n// Disabled specific rules as refactoring could cause regressions or false positives\n'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function OnboardingModal() {
  const { user, updateUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    addressName: '',
    addressPhone: '',
    addressLine: '',
    addressCity: '',
    addressState: '',
    addressPin: '',
  });

  // Track the current user ID to detect when to reset the form
  const [lastUserId, setLastUserId] = useState<string | number | null>(null);

  useEffect(() => {
    // Show modal if user is logged in but hasn't set their first name
    if (user && !user.firstName && !loading) {
      setIsOpen(true);
      
      // Reset form if this is a different user than before
      if (user.id !== lastUserId) {
        setForm({
          firstName: '',
          lastName: '',
          addressName: '',
          addressPhone: user.phone || '',
          addressLine: '',
          addressCity: '',
          addressState: '',
          addressPin: '',
        });
        setLastUserId(user.id);
      }
    } else {
      setIsOpen(false);
    }
  }, [user, loading, lastUserId]);

  // Sync Address Name with First + Last name automatically
  useEffect(() => {
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    setForm(prev => ({
      ...prev,
      addressName: fullName
    }));
  }, [form.firstName, form.lastName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!form.firstName) {
      toast.error('First Name is required');
      return;
    }

    setLoading(true);
    try {
      // 1. Update User Profile — use numeric id for standard users-permissions endpoint
      const userId = user.id;
      await fetchAPI(`/api/users/${userId}`, {
        method: 'PUT',
        token: user.jwt,
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
        })
      });

      // 2. Create Initial Address
      await fetchAPI('/api/addresses', {
        method: 'POST',
        token: user.jwt,
        body: JSON.stringify({
          data: {
            name: form.addressName || `${form.firstName} ${form.lastName}`.trim(),
            phone: form.addressPhone,
            line: form.addressLine,
            city: form.addressCity,
            state: form.addressState,
            pin: form.addressPin,
            // Omit owner: injected by middleware
          }
        })
      });

      // 3. Update Context
      updateUser({
        firstName: form.firstName,
        lastName: form.lastName,
      });

      toast.success('Profile completed!', {
        description: 'Welcome to Kraft Treasure.'
      });
      setIsOpen(false);
    } catch (err) {
      console.error('Onboarding failed', err);
      toast.error('Failed to save profile', {
        description: 'Please try again or skip for now.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md animate-in fade-in duration-500" />
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
        <div className="my-8 w-full max-w-[600px] bg-[#FAF7F2] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">
          
          <div className="p-8 lg:p-12">
            <div className="mb-10 text-center">
              <p className="mb-2 text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Profile Setup</p>
              <h2 className="font-serif text-4xl text-black">Complete Your Account</h2>
              <p className="mt-3 text-[13px] text-black/50">Please provide your details to begin your journey with us.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Section */}
              <div className="space-y-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase border-b border-black/5 pb-2">Personal Information</p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <OnboardingField label="First Name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required />
                  <OnboardingField label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-5 pt-2">
                <p className="text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase border-b border-black/5 pb-2">Delivery Address</p>
                
                <OnboardingField label="Full Name for Delivery" value={form.addressName} onChange={(v) => setForm({ ...form, addressName: v })} required />
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <OnboardingField label="Contact Number" value={form.addressPhone} onChange={(v) => setForm({ ...form, addressPhone: v })} required />
                  <OnboardingField label="Pincode" value={form.addressPin} onChange={(v) => setForm({ ...form, addressPin: v })} required />
                </div>

                <OnboardingField label="Address Line (House, Street, Area)" value={form.addressLine} onChange={(v) => setForm({ ...form, addressLine: v })} required />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <OnboardingField label="City" value={form.addressCity} onChange={(v) => setForm({ ...form, addressCity: v })} required />
                  <OnboardingField label="State" value={form.addressState} onChange={(v) => setForm({ ...form, addressState: v })} required />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D33740] py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Finalizing Setup...' : 'Complete Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function OnboardingField({ label, value, onChange, required, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div className="group">
      <label className="mb-2 block text-[9px] font-bold tracking-[0.2em] text-[#595148] uppercase transition-colors group-focus-within:text-black">
        {label} {required && <span className="text-[#D33740]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border-b border-[#C8C3BB] bg-transparent py-2 text-[14px] text-black outline-none transition-all focus:border-black placeholder:text-black/10"
      />
    </div>
  );
}
