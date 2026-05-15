'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { fetchAPI } from '@/lib/api';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

export interface CartItem extends Product {
  qty: number;
  cartId?: string; // Strapi documentId for syncing
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Omit<CartItem, 'qty'>, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQty: (productId: string | number, qty: number) => void;
  clearCart: () => void;
  checkout: (shippingAddress: any) => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Persistence
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedCart = localStorage.getItem('kt_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kt_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Sync with Strapi on login
  useEffect(() => {
    if (user?.jwt && user?.id) {
      const fetchCart = async () => {
        try {
          const data = await fetchAPI(`/api/carts`, {
            token: user.jwt,
            params: {
              'filters[user][documentId][$eq]': user.documentId || user.id,
              'populate': 'product.image'
            }
          });

          if (data?.data) {
            const remoteCart: CartItem[] = data.data.map((item: any) => ({
              id: item.product?.id,
              documentId: item.product?.documentId,
              slug: item.product?.slug,
              name: item.product?.name,
              category: item.product?.category,
              price: item.product?.price,
              qty: item.quantity,
              image: item.product?.image?.[0]?.url || '',
              cartId: item.documentId
            }));

            // Merge local and remote
            setCart(prev => {
              const combined = [...prev];
              remoteCart.forEach(remoteItem => {
                const idx = combined.findIndex(li => li.id === remoteItem.id);
                if (idx === -1) {
                  combined.push(remoteItem);
                } else {
                  combined[idx] = { ...combined[idx], cartId: remoteItem.cartId, qty: Math.max(combined[idx].qty, remoteItem.qty) };
                }
              });
              return combined;
            });
          }
        } catch (err: any) {
          console.error('Failed to fetch cart from Strapi', err);
          // If 401, the token is likely invalid - don't logout, just clear cart sync
          if (err.status === 401) {
            console.warn('Cart sync failed: Invalid token. Items will remain local-only.');
          }
        }
      };
      fetchCart();
    }
  }, [user]);

  const addToCart = useCallback(async (product: Omit<CartItem, 'qty'>, quantity: number = 1) => {
    let newItem: CartItem | null = null;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      newItem = { ...product, qty: quantity };
      return [...prev, newItem];
    });

    // Sync to Strapi
    if (user?.jwt && user?.id) {
      try {
        const existing = cart.find(item => item.id === product.id);
        if (existing?.cartId) {
          await fetchAPI(`/api/carts/${existing.cartId}`, {
            method: 'PUT',
            token: user.jwt,
            body: JSON.stringify({ data: { quantity: existing.qty + quantity } })
          });
        } else {
          const body = {
            data: {
              product: product.documentId || product.id,
              user: user.documentId || user.id,
              quantity: quantity,
              added_at: new Date().toISOString()
            }
          };
          const res = await fetchAPI('/api/carts', {
            method: 'POST',
            token: user.jwt,
            body: JSON.stringify(body)
          });
          if (res?.data?.documentId) {
             setCart(prev => prev.map(item => item.id === product.id ? { ...item, cartId: res.data.documentId } : item));
          }
        }
      } catch (err) {
        console.error('Failed to sync cart add', err);
      }
    }
    
    toast.success('Added to collection', {
      description: `${product.name} is now in your cart.`,
    });
  }, [user, cart]);

  const removeFromCart = useCallback(async (productId: string | number) => {
    const itemToRemove = cart.find(item => item.id === productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));

    if (user?.jwt && itemToRemove?.cartId) {
      try {
        await fetchAPI(`/api/carts/${itemToRemove.cartId}`, {
          method: 'DELETE',
          token: user.jwt
        });
      } catch (err) {
        console.error('Failed to sync cart remove', err);
      }
    }
    toast.info('Item removed from cart');
  }, [user, cart]);

  const updateQty = useCallback(async (productId: string | number, qty: number) => {
    const itemToUpdate = cart.find(item => item.id === productId);
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty: Math.max(1, qty) } : item))
    );

    if (user?.jwt && itemToUpdate?.cartId) {
      try {
        await fetchAPI(`/api/carts/${itemToUpdate.cartId}`, {
          method: 'PUT',
          token: user.jwt,
          body: JSON.stringify({ data: { quantity: Math.max(1, qty) } })
        });
      } catch (err) {
        console.error('Failed to sync cart update', err);
      }
    }
  }, [user, cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const clearCart = useCallback(async () => {
    const itemsToDelete = [...cart]; // Capture current items
    
    // Clear local state immediately for better UX
    setCart([]);
    if (typeof window !== 'undefined') localStorage.removeItem('kt_cart');

    if (user?.jwt && itemsToDelete.length > 0) {
      try {
        await Promise.all(itemsToDelete
          .filter(item => item.cartId)
          .map(item => 
            fetchAPI(`/api/carts/${item.cartId}`, {
              method: 'DELETE',
              token: user.jwt
            })
          )
        );
      } catch (err) {
        console.error('Failed to clear remote cart items', err);
      }
    }
    toast.info('Cart cleared');
  }, [user, cart]);

  const checkout = useCallback(async (shippingAddress: any) => {
    if (!user?.jwt || !user?.id || cart.length === 0) {
      throw new Error('Cannot checkout: user not logged in or cart empty');
    }

    const userId = user.documentId || user.id;

    try {
      // ✅ STEP 1: Create the Order (no product here)
      const orderPayload = {
        data: {
          totalAmount: cartTotal,
          paymentStatus: "Pending",
          shippingAddress: shippingAddress,
          user: userId,
        }
      };

      const orderRes = await fetchAPI("/api/orders", {
        method: "POST",
        token: user.jwt,
        body: JSON.stringify(orderPayload),
      });

      const orderId = orderRes.data.documentId || orderRes.data.id;

      // ✅ STEP 2: Create Order Items — product goes HERE
      await Promise.all(
        cart.map((item) =>
          fetchAPI("/api/order-items", {
            method: "POST",
            token: user.jwt,
            body: JSON.stringify({
              data: {
                quantity: item.qty,
                unit_price: item.price,
                total_price: item.price * item.qty,
                product_name: item.name,
                product: item.documentId || item.id,
                order: orderId,
                user: userId,
                added_at: new Date().toISOString(),
                publishedAt: new Date().toISOString(), // Required for draftAndPublish
              }
            }),
          })
        )
      );

      // ✅ STEP 3: Clear cart after success
      await clearCart();
      
      toast.success('Order placed successfully!', {
        description: 'Thank you for your acquisition. We will notify you when it ships.',
      });

      return orderRes.data;
    } catch (err: any) {
      console.error('Checkout failed', err);
      toast.error('Checkout failed', {
        description: err.message || 'Something went wrong. Please try again.',
      });
      throw err;
    }
  }, [user, cart, cartTotal, clearCart]);



  const value = useMemo(() => ({
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    checkout
  }), [cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart, checkout]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
