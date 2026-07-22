'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { fetchAPI, formatRelation } from '@/lib/api';
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
  checkout: (shippingAddress: any, customDetails?: { transactionId?: string; paymentStatus?: string; shippingCharge?: number }) => Promise<any>;
  validateCartStock: () => Promise<{ hasIssue: boolean; issues: any[] }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);


  // Sync with Strapi on login / user session change
  useEffect(() => {
    const handleLogout = () => setCart([]);
    if (typeof window !== 'undefined') {
      window.addEventListener('auth-logout', handleLogout);
      return () => window.removeEventListener('auth-logout', handleLogout);
    }
  }, []);

  useEffect(() => {
    if (!user?.jwt || !user?.documentId) {
      return;
    }

    const syncCart = async () => {
      try {
        // 1. Fetch remote cart items from CMS
        const res = await fetchAPI('/carts', {
          token: user.jwt,
          params: { 'populate': 'product.image' }
        });

        if (!res?.data) return;

        // 2. Map remote cart items to CartItem format
        const remoteCart: CartItem[] = res.data.map((item: any) => {
          const product = item.product;
          if (!product) return null;

          let imgUrl = '';
          if (product.image) {
            const imageData = product.image.data || product.image;
            const imgArray = Array.isArray(imageData) ? imageData : [imageData];
            const firstImg = imgArray[0]?.attributes || imgArray[0];
            const url = firstImg?.url;
            const baseUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://kraft.slingverse.in').replace(/\/$/, '');
            imgUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : '';
          }

          return {
            id: product.id,
            productId: product.documentId || product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            qty: item.quantity,
            image: imgUrl,
            cartId: item.documentId || item.id
          };
        }).filter(Boolean) as CartItem[];

        // 3. Merge local and remote carts seamlessly
        setCart(prevLocal => {
          const merged = [...prevLocal];
          const handledRemoteIds = new Set<string | number>();

          const updatedLocal = merged.map(localItem => {
            const remoteItem = remoteCart.find(r => r.id === localItem.id);
            if (remoteItem) {
              handledRemoteIds.add(remoteItem.id);
              const maxQty = Math.max(localItem.qty, remoteItem.qty);
              
              // Sync the higher quantity to the backend in the background if local was higher
              if (localItem.qty > remoteItem.qty && remoteItem.cartId) {
                fetchAPI(`/api/carts/${remoteItem.cartId}`, {
                  method: 'PUT',
                  token: user.jwt,
                  body: JSON.stringify({ data: { quantity: maxQty } })
                }).catch(err => console.error('Failed to sync updated quantity to backend:', err));
              }

              return {
                ...localItem,
                cartId: remoteItem.cartId,
                qty: maxQty
              };
            } else {
              // Local-only item: Upload it to backend in background
              // If it already has a cartId, it means it was deleted remotely.
              if (localItem.cartId) {
                return null;
              }

              const body = {
                data: {
                  product: formatRelation(localItem.productId || localItem.id),
                  quantity: localItem.qty,
                  added_at: new Date().toISOString()
                }
              };
              fetchAPI('/carts', {
                method: 'POST',
                token: user.jwt,
                body: JSON.stringify(body)
              }).then(postRes => {
                if (postRes?.data?.documentId) {
                  setCart(current => current.map(item => item.id === localItem.id ? { ...item, cartId: postRes.data.documentId } : item));
                }
              }).catch(err => console.error('Failed to upload local item to backend:', err));

              return localItem;
            }
          }).filter(Boolean) as CartItem[];

          const newRemoteItems = remoteCart.filter(r => !handledRemoteIds.has(r.id));
          return [...updatedLocal, ...newRemoteItems];
        });
      } catch (err: any) {
        if (err.status !== 401) {
          console.error('Failed to sync cart with backend:', err);
        }
      }
    };

    syncCart();
  }, [user]);

  // Add Item to Cart (Immediate local update, background server sync)
  const addToCart = useCallback(async (product: Omit<CartItem, 'qty'>, quantity: number = 1) => {
    let finalQty = quantity;
    let existingItem: CartItem | undefined;

    setCart((prev) => {
      existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        finalQty = existingItem.qty + quantity;
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: finalQty } : item
        );
      }
      return [...prev, { ...product, qty: quantity }];
    });

    toast.success('Added to collection', {
      description: `${product.name} is now in your cart.`,
    });

    if (user?.jwt && user?.documentId) {
      try {
        const itemInCart = cart.find((item) => item.id === product.id);
        if (itemInCart?.cartId) {
          await fetchAPI(`/api/carts/${itemInCart.cartId}`, {
            method: 'PUT',
            token: user.jwt,
            body: JSON.stringify({ data: { quantity: finalQty } })
          });
        } else {
          const body = {
            data: {
              product: formatRelation(product.productId || (product as any).documentId),
              quantity: quantity,
              added_at: new Date().toISOString()
            }
          };
          const res = await fetchAPI('/carts', {
            method: 'POST',
            token: user.jwt,
            body: JSON.stringify(body)
          });
          if (res?.data?.documentId) {
            setCart(prev => prev.map(item => item.id === product.id ? { ...item, cartId: res.data.documentId } : item));
          }
        }
      } catch (err) {
        console.error('Failed to sync cart add to Strapi:', err);
      }
    }
  }, [user, cart]);

  // Remove Item from Cart (Immediate local update, background server sync)
  const removeFromCart = useCallback(async (productId: string | number) => {
    const itemToRemove = cart.find(item => item.id === productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast.info('Item removed from cart');

    if (user?.jwt && itemToRemove?.cartId) {
      try {
        await fetchAPI(`/api/carts/${itemToRemove.cartId}`, {
          method: 'DELETE',
          token: user.jwt
        });
      } catch (err) {
        console.error('Failed to sync cart remove from Strapi:', err);
      }
    }
  }, [user, cart]);

  // Update Item Quantity (Immediate local update, background server sync)
  const updateQty = useCallback(async (productId: string | number, qty: number) => {
    const targetQty = Math.max(1, qty);
    const itemToUpdate = cart.find(item => item.id === productId);
    
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty: targetQty } : item))
    );

    if (user?.jwt && itemToUpdate?.cartId) {
      try {
        await fetchAPI(`/api/carts/${itemToUpdate.cartId}`, {
          method: 'PUT',
          token: user.jwt,
          body: JSON.stringify({ data: { quantity: targetQty } })
        });
      } catch (err) {
        console.error('Failed to sync cart quantity update to Strapi:', err);
      }
    }
  }, [user, cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const clearCart = useCallback(async () => {
    const itemsToDelete = [...cart];
    setCart([]);

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
        console.error('Failed to clear remote cart items:', err);
      }
    }
    toast.info('Cart cleared');
  }, [user, cart]);

  // Checkout E-commerce Flow (Creates Order -> Creates Order Items -> Clears Cart)
  const checkout = useCallback(async (shippingAddress: any, customDetails?: { transactionId?: string; paymentStatus?: string; shippingCharge?: number }) => {
    if (!user?.jwt || !user?.id || cart.length === 0) {
      throw new Error('Cannot checkout: user not logged in or cart empty');
    }

    try {
      // 1. Create the Order
      const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const orderPayload = {
        data: {
          orderId: `KT-${uniqueSuffix}`,
          transactionId: customDetails?.transactionId || `TXN-${uniqueSuffix}`,
          totalAmount: cartTotal + (customDetails?.shippingCharge || 0),
          paymentStatus: customDetails?.paymentStatus || 'Pending',
          shippingAddress: shippingAddress,
          owner: formatRelation(user.documentId),
          publishedAt: new Date().toISOString(),
        }
      };

      const orderRes = await fetchAPI('/api/orders', {
        method: 'POST',
        token: user.jwt,
        body: JSON.stringify(orderPayload),
      });


      const orderId = orderRes.data.documentId || orderRes.data.id;

      // 2. Create Order Items linking to the Order and Product
      await Promise.all(
        cart.map((item) =>
          fetchAPI('/api/order-items', {
            method: 'POST',
            token: user.jwt,
            body: JSON.stringify({
              data: {
                quantity: item.qty,
                unitPrice: item.price,
                totalPrice: item.price * item.qty,
                productName: item.name,
                product: formatRelation(item.productId),
                order: formatRelation(orderId),
                owner: formatRelation(user.documentId),
                addedAt: new Date().toISOString(),
                publishedAt: new Date().toISOString(), 
              }
            }),
          })
        )
      );

      // 3. Clear cart after successful order creation
      await clearCart();
      
      toast.success('Order placed successfully!', {
        description: 'Thank you for your acquisition. We will notify you when it ships.',
      });

      return orderRes.data;
    } catch (err: any) {
      console.error('Checkout failed:', err);
      toast.error('Checkout failed', {
        description: err.message || 'Something went wrong. Please try again.',
      });
      throw err;
    }
  }, [user, cart, cartTotal, clearCart]);

  // Validate Cart Stock
  const validateCartStock = useCallback(async () => {
    if (cart.length === 0) return { hasIssue: false, issues: [] };

    try {
      const productIds = cart.map(item => item.productId || item.id).filter(Boolean);
      
      const res = await fetchAPI('/products', {
        params: {
          'filters[documentId][$in]': productIds,
          'fields': ['name', 'quantity']
        }
      });

      const latestProducts = res.data || [];
      const issues = [];

      for (const cartItem of cart) {
        const liveProduct = latestProducts.find((p: any) => 
          String(p.documentId || p.id) === String(cartItem.productId || cartItem.id)
        );
        
        const stock = liveProduct?.quantity ?? liveProduct?.attributes?.quantity ?? 0;

        if (cartItem.qty > stock) {
          issues.push({
            id: cartItem.id,
            name: cartItem.name,
            requested: cartItem.qty,
            available: stock
          });
        }
      }

      return {
        hasIssue: issues.length > 0,
        issues
      };
    } catch (err) {
      console.error('[STOCK-CHECK] Validation failed:', err);
      return { hasIssue: false, issues: [] };
    }
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    checkout,
    validateCartStock
  }), [cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart, checkout, validateCartStock]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
