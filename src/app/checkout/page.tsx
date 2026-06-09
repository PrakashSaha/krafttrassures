'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, cartTotal, clearCart, checkout, updateQty, validateCartStock } = useCart();
  const router = useRouter();
  const t = useTranslations('checkout');

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'test'>('test');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  useEffect(() => {
    if (razorpayKey) {
      setPaymentMethod('razorpay');
    }
  }, [razorpayKey]);

  useEffect(() => {
    // Dynamic Razorpay SDK loading
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error('Razorpay SDK failed to load.');
      toast.error('Failed to load payment gateway SDK. Please check your internet connection.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!user) return; // Middleware handles redirection

    if (cart.length === 0) {
      router.push('/shop');
      return;
    }

    const loadAddresses = async () => {
      try {
        const data = await fetchAPI('/api/addresses', {
          token: user.jwt,
          params: { 'filters[owner][documentId][$eq]': user.documentId }
        });
        if (data?.data) {
          const mapped = data.data.map((item: any) => ({
            id: item.id,
            ...(item.attributes || item)
          }));
          setAddresses(mapped);
          if (mapped.length > 0) setSelectedAddressId(mapped[0].id);
        }
      } catch (err: any) {
        console.error('Failed to load addresses', err);
        if (err.status === 403) {
          toast.error('Access denied: Please ensure Address permissions are enabled in Strapi.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [user, cart.length, router]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a shipping address');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Validate stock availability immediately before placing order
      const stockCheck = await validateCartStock();
      if (stockCheck.hasIssue) {
        const issueList = stockCheck.issues.map((i: any) => `${i.name} (Only ${i.available} available)`).join(', ');
        toast.error('Acquisition halted due to inventory shortage', {
          description: `The following items in your collection do not have enough stock: ${issueList}`
        });
        setProcessing(false);
        return;
      }

      const selectedAddress = addresses.find(a => a.id === selectedAddressId);
      if (!selectedAddress) {
        toast.error('Please select a valid shipping address');
        setProcessing(false);
        return;
      }
      
      if (paymentMethod === 'razorpay') {
        if (!razorpayLoaded && !(window as any).Razorpay) {
          toast.error('Payment gateway is still initializing. Please wait a moment.');
          setProcessing(false);
          return;
        }

        const totalAmount = Math.round(cartTotal * 1.18);

        const options = {
          key: razorpayKey,
          amount: totalAmount * 100, // Amount in paise
          currency: 'INR',
          name: 'Kraft Treasure',
          description: 'Acquisition of premium heritage pieces',
          handler: async function (response: any) {
            try {
              setProcessing(true);
              const order = await checkout(selectedAddress, {
                transactionId: response.razorpay_payment_id,
                paymentStatus: 'Paid'
              });
              
              if (order) {
                router.push(`/account/orders`);
              }
            } catch (err: any) {
              setError(err.message || 'Failed to complete order checkout.');
            } finally {
              setProcessing(false);
            }
          },
          prefill: {
            name: selectedAddress.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Customer'),
            email: user?.email || '',
            contact: selectedAddress.phone || user?.phone || '',
          },
          theme: {
            color: '#D33740', // Brand Red
          },
          modal: {
            ondismiss: function() {
              setProcessing(false);
              toast.info('Payment cancelled.');
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        const order = await checkout(selectedAddress);
        if (order) {
          router.push(`/account/orders`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading && cart.length > 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FAF7F2]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D33740] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 pt-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.4em] text-[#8C6E3F] uppercase">{t('secure_checkout')}</p>
            <h1 className="font-serif text-4xl text-black">{t('subtitle')}</h1>
          </div>
          <Link href="/shop" className="text-[11px] font-bold tracking-[0.2em] text-[#3A3530] uppercase hover:text-[#D33740] transition-colors">
            {t('back_to_cart')}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
          {/* Left Column: Details */}
          <div className="space-y-10">
            {/* Address Section */}
            <section className="bg-white p-8 shadow-sm border border-[#C8C3BB]">
              <div className="mb-8 flex items-center justify-between border-b border-[#C8C3BB] pb-5">
                <h2 className="font-serif text-2xl text-black">{t('shipping')}</h2>
                <Link href="/account/address" className="group inline-flex w-max items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-3 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500 disabled:opacity-70 disabled:cursor-not-allowed">
                  Manage Addresses
                </Link>
              </div>

              {addresses.length === 0 ? (
                <div className="rounded-sm border border-dashed border-[#B0A99F] bg-[#FAF7F2] p-8 text-center">
                  <p className="mb-6 text-[14px] text-[#3A3530]">No saved addresses found in your account.</p>
                  <Link href="/account/address" className="btn-dark inline-block">
                    Add New Address
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`relative cursor-pointer border p-5 transition-all ${
                        selectedAddressId === addr.id 
                          ? 'border-[#D33740] bg-[#D33740]/[0.02]' 
                          : 'border-[#C8C3BB] bg-white hover:border-[#B0A99F]'
                      }`}
                    >
                      {selectedAddressId === addr.id && (
                        <div className="absolute top-3 right-3 text-[#D33740]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                      <p className="mb-2 font-serif text-[16px] text-black">{addr.name}</p>
                      <p className="text-[13px] leading-relaxed text-[#3A3530]">
                        {addr.line}, {addr.city}<br />
                        {addr.state} - {addr.pin}<br />
                        T: {addr.phone}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
            
            {/* Cart Review Section */}
            <section className="space-y-8 bg-white p-8 shadow-sm border border-[#C8C3BB]">
              <div className="border-b border-[#C8C3BB] pb-5">
                <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.35em] text-[#8C6E3F]">Your Cart</p>
                <h2 className="text-[30px] font-serif text-black md:text-[34px]">Review Every Piece Before Checkout</h2>
              </div>
              
              <div className="space-y-8">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-[100px_minmax(0,1fr)_32px] gap-4 border-b border-[#C8C3BB] pb-8 sm:grid-cols-[118px_minmax(0,1fr)_40px] sm:gap-6 last:border-0 last:pb-0"
                  >
                    <Link className="relative aspect-[4/5] overflow-hidden bg-zinc-100" href={`/product/${item.productId}`}>
                      <Image 
                        alt={item.name} 
                        src={item.image || '/placeholder.jpg'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100px, 118px"
                      />
                    </Link>
                    
                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="mb-1 text-[10px] font-sans uppercase tracking-[0.3em] text-[#8C6E3F]">{item.category}</p>
                      <Link 
                        className="text-lg font-serif leading-tight text-black transition-colors hover:text-[#D33740] md:text-[22px]" 
                        href={`/product/${item.productId}`}
                      >
                        {item.name}
                      </Link>
                      <p className="mt-3 text-[20px] font-sans font-semibold text-black md:text-[22px]">
                        ₹<span className="notranslate">{item.price.toLocaleString('en-IN')}</span>
                      </p>
                      
                      <div className="mt-4 inline-flex w-fit self-start border border-[#C8C3BB]">
                        <button 
                          type="button" 
                          onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                          className="flex h-11 w-11 items-center justify-center border-r border-[#C8C3BB] text-[#595148] transition-colors hover:bg-[#FAF7F2] hover:text-black"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path></svg>
                        </button>
                        <span className="flex h-11 w-11 items-center justify-center text-sm font-sans text-black"><span className="notranslate">{item.qty || 1}</span></span>
                        <button 
                          type="button" 
                          onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                          className="flex h-11 w-11 items-center justify-center border-l border-[#C8C3BB] text-[#595148] transition-colors hover:bg-[#FAF7F2] hover:text-black"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 shadow-sm border border-[#C8C3BB]">
              <h2 className="mb-8 border-b border-[#C8C3BB] pb-5 font-serif text-2xl text-black">Payment Method</h2>
              
              <div className="space-y-4">
                {/* Razorpay Option */}
                <div
                  onClick={() => {
                    if (razorpayKey) setPaymentMethod('razorpay');
                    else toast.error('Razorpay is disabled: Missing API Key in .env file.');
                  }}
                  className={`relative flex items-center justify-between border p-5 transition-all ${
                    !razorpayKey 
                      ? 'border-[#E5E2DC] bg-[#F7F6F3] opacity-60 cursor-not-allowed' 
                      : paymentMethod === 'razorpay'
                        ? 'border-[#D33740] bg-[#D33740]/[0.02] cursor-pointer'
                        : 'border-[#C8C3BB] bg-white hover:border-[#B0A99F] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      !razorpayKey ? 'bg-zinc-400' : 'bg-[#D33740]'
                    } text-white`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-black flex items-center gap-2">
                        Razorpay Secure Gateway
                        {!razorpayKey && (
                          <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-600">Unconfigured</span>
                        )}
                      </p>
                      <p className="text-[12px] text-[#595148]">Cards, Netbanking, UPI & Wallets</p>
                    </div>
                  </div>
                  {paymentMethod === 'razorpay' && razorpayKey && (
                    <div className="text-[#D33740]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </div>

                {/* Info Notice when Razorpay is disabled */}
                {!razorpayKey && (
                  <div className="border border-dashed border-[#C5AB7D] bg-[#FAF8F5] p-4 text-[12px] leading-relaxed text-[#8C6E3F]">
                    <span className="font-bold">Developer Notice:</span> The Razorpay Secure Gateway is currently unconfigured. Add <code className="rounded bg-amber-50 px-1 font-mono text-[#D33740]">NEXT_PUBLIC_RAZORPAY_KEY_ID</code> to your local <code className="font-mono">.env</code> file in <code className="font-mono">ktfrontend</code> directory to activate live client testing.
                  </div>
                )}

                {/* Test Sandbox Option */}
                <div
                  onClick={() => setPaymentMethod('test')}
                  className={`flex items-center justify-between border p-5 cursor-pointer transition-all ${
                    paymentMethod === 'test'
                      ? 'border-[#D33740] bg-[#D33740]/[0.02]'
                      : 'border-[#C8C3BB] bg-white hover:border-[#B0A99F]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8C6E3F] text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-black">Test Mode Payment</p>
                      <p className="text-[12px] text-[#595148]">Mock instant validation for development checkout</p>
                    </div>
                  </div>
                  {paymentMethod === 'test' && (
                    <div className="text-[#D33740]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="sticky top-28 h-fit">
            <aside className="border border-[#C8C3BB] bg-[#F9F6F1] p-6 lg:p-8">
              <div className="border-b border-[#C8C3BB] pb-5">
                <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.35em] text-[#8C6E3F]">{t('summary')}</p>
                <h2 className="text-[30px] font-serif text-black">{t('summary')}</h2>
              </div>

              <div className="mt-8 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-sm font-sans">
                    <div className="min-w-0">
                      <p className="truncate text-black">{item.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#3A3530]">Qty <span className="notranslate">{item.qty}</span></p>
                    </div>
                    <p className="shrink-0 text-black">₹<span className="notranslate">{(item.price * item.qty).toLocaleString('en-IN')}</span></p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-[#B0A99F] pt-5">
                <div className="flex items-center justify-between text-sm font-sans">
                  <span className="text-[#3A3530]">{t('subtotal')}</span>
                  <span className="font-medium text-black">₹<span className="notranslate">{cartTotal.toLocaleString('en-IN')}</span></span>
                </div>
                <div className="flex items-center justify-between text-sm font-sans">
                  <span className="text-[#3A3530]">{t('tax')}</span>
                  <span className="font-medium text-black">₹<span className="notranslate">{Math.round(cartTotal * 0.18).toLocaleString('en-IN')}</span></span>
                </div>
                <div className="flex justify-between text-[#3A3530]">
                  <span>Shipping</span>
                  <span className="bg-[#D6F0DD] text-[#1A6B30] rounded-full px-3 py-0.5 text-xs font-medium uppercase tracking-widest">Complimentary</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#C8C3BB] pt-6">
                <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-black">{t('total')}</span>
                <span className="text-[28px] font-sans font-semibold text-black">₹<span className="notranslate">{Math.round(cartTotal * 1.18).toLocaleString('en-IN')}</span></span>
              </div>

              {error && (
                <div className="mt-6 rounded-sm bg-red-50 p-4 text-[13px] text-red-600">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={processing || addresses.length === 0}
                className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500 disabled:bg-[#D6D1CB] disabled:text-[#8A8480] disabled:border-[#C8C3BB] disabled:cursor-not-allowed"
              >
                <span className="relative z-20">
                  {processing ? 'Processing...' : t('place_order')}
                </span>
                {!processing && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                )}
                <span className="absolute inset-0 z-10 -translate-x-[101%] bg-[#8C6E3F] transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
              </button>

              <div className="mt-5 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-[#D33740]">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1-1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <p className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#3A3530]">{t('secure_checkout')}</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
