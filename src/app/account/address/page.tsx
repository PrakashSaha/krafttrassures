'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAPI, formatRelation } from '@/lib/api';
import { Address } from '@/lib/types';
import { toast } from 'sonner';


export default function AddressPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', phone: '', line: '', city: '', state: '', pin: ''
  });

  const resetForm = () => {
    setForm({ name: '', phone: '', line: '', city: '', state: '', pin: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const fetchAddresses = async () => {
    if (!user?.jwt || !user?.documentId) return;
    try {
      const data = await fetchAPI('/api/addresses', {
        token: user.jwt,
        params: {
          // Owner filter injected by middleware
        }
      });
      if (data && data.data) {
        setAddresses(data.data.map((item: any) => ({
          id: item.documentId || item.id, // Use documentId
          name: item.attributes?.name || item.name,
          phone: item.attributes?.phone || item.phone,
          line: item.attributes?.line || item.line,
          city: item.attributes?.city || item.city,
          state: item.attributes?.state || item.state,
          pin: item.attributes?.pin || item.pin,
        })));
      }
    } catch (err) {
      console.error('Failed to fetch addresses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TEMPORARY DEBUG
    console.log('[SAVE ADDRESS DEBUG]', {
      userId: user?.id,
      userDocumentId: user?.documentId,
      jwt: user?.jwt ? '✓ present' : '✗ missing',
    });

    if (!user?.jwt || !user?.documentId) {
      toast.error('Session error: please sign in again');
      console.error('Missing jwt or documentId on user', user);
      return;
    }
    
    // Use documentId/owner pattern for Strapi v5
    const addressData = { 
      ...form, 
      // Omit owner: injected by middleware
    };

    try {
      const endpoint = editingId ? `/api/addresses/${editingId}` : '/api/addresses';
      const method = editingId ? 'PUT' : 'POST';

      await fetchAPI(endpoint, {
        method,
        token: user.jwt,
        body: JSON.stringify({ data: addressData })
      });

      toast.success(editingId ? 'Address updated' : 'Address saved');
      resetForm();
      fetchAddresses();
    } catch (err: any) {
      toast.error('Failed to save address');
      console.error('Error saving address', err);
    }
  };

  const handleEdit = (addr: Address) => {
    setForm({
      name: addr.name, phone: addr.phone, line: addr.line,
      city: addr.city, state: addr.state, pin: addr.pin
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!user?.jwt || !confirm('Are you sure you want to remove this address?')) return;
    
    try {
      await fetchAPI(`/api/addresses/${id}`, {
        method: 'DELETE',
        token: user.jwt
      });
      fetchAddresses();
    } catch (err) {
      console.error('Error deleting address', err);
    }
  };

  return (
    <div className="border border-[#a39d92] bg-white p-8 lg:p-12 shadow-sm animate-in fade-in duration-1000">
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-[#8C6E3F] uppercase">Account Shipping</p> {/* // CONTRAST FIX */}
        <h1 className="font-serif text-4xl text-black">Saved Addresses</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-[#4A4540]"> {/* // CONTRAST FIX */}
          Manage your delivery destinations for heritage artifacts.
        </p>
      </div>

      <div className="border-t border-[#C8C3BB] pt-10"> {/* // CONTRAST FIX */}
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
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
          <div className="mb-12 border border-[#C8C3BB] bg-[#FAF7F2] p-8 animate-in slide-in-from-top-4 duration-500"> {/* // CONTRAST FIX */}
            <h3 className="mb-8 font-serif text-2xl text-black">{editingId ? 'Edit Destination' : 'New Destination'}</h3>
            <form className="space-y-6" onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <AddressField label="Recipient Name" value={form.name} onChange={(e: any) => setForm({...form, name: e.target.value})} placeholder="Artifact Recipient Name" required />
                <AddressField label="Recipient Phone" value={form.phone} onChange={(e: any) => setForm({...form, phone: e.target.value})} placeholder="10-digit delivery number" type="tel" required />
              </div>
              <AddressField label="Address Line" value={form.line} onChange={(e: any) => setForm({...form, line: e.target.value})} placeholder="Street address, colony, or landmark" required />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <AddressField label="City" value={form.city} onChange={(e: any) => setForm({...form, city: e.target.value})} placeholder="City" required />
                <AddressField label="State" value={form.state} onChange={(e: any) => setForm({...form, state: e.target.value})} placeholder="State" required />
                <AddressField label="Pincode" value={form.pin} onChange={(e: any) => setForm({...form, pin: e.target.value})} placeholder="6-digit code" required />
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={resetForm} className="px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-[#595148] uppercase hover:text-black">Cancel</button> {/* // CONTRAST FIX */}
                <button type="submit" className="bg-[#D33740] px-10 py-4 text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-lg shadow-[#D33740]/10 hover:bg-black transition-all">
                  {editingId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="border border-dashed border-[#C8C3BB] bg-[#FAF7F2] py-24 text-center"> {/* // CONTRAST FIX */}
            <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#8C6E3F] uppercase">No Saved Locations</p> {/* // CONTRAST FIX */}
            <p className="text-[14px] text-[#595148]">Add your first delivery address to keep checkout faster next time.</p> {/* // CONTRAST FIX */}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {addresses.map((addr) => (
              <div key={addr.id} className="group relative border bg-[#FAF7F2] p-6 border-[#686257] transition-all">
                <p className="font-serif text-lg text-black mb-1 pr-16">{addr.name}</p>
                <p className="text-[14px] text-[#4A4540] leading-relaxed pr-8">{addr.line}, {addr.city}, {addr.state} - {addr.pin}</p> {/* // CONTRAST FIX */}
                <p className="mt-4 text-[12px] font-bold text-[#595148]">{addr.phone}</p> {/* // CONTRAST FIX */}
                <div className="mt-6 flex items-center border-t border-black pt-4">
                  <button 
                    onClick={() => handleEdit(addr)} 
                    className="flex flex-1 items-center justify-center gap-2 py-1 text-[10px] font-bold tracking-[0.1em] text-[#595148] uppercase hover:text-black transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    Edit
                  </button>
                  <div className="h-4 w-[1px] bg-black" />
                  <button 
                    onClick={() => handleDelete(addr.id)} 
                    className="flex flex-1 items-center justify-center gap-2 py-1 text-[10px] font-bold tracking-[0.1em] text-[#D33740]/60 hover:text-[#D33740] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AddressField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#595148] uppercase">{label}</label> {/* // CONTRAST FIX */}
      <input
        {...props}
        className="w-full border border-[#C8C3BB] bg-white px-4 py-4 text-[14px] text-black outline-none focus:border-black transition-all placeholder:text-[#595148]" // CONTRAST FIX
      />
    </div>
  );
}
