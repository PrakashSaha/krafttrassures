'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAPI, formatRelation } from '@/lib/api';
import { User, WishlistProduct, Product } from '@/lib/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  wishlist: WishlistProduct[];
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  addToWishlist: (product: WishlistProduct) => Promise<void>;
  removeFromWishlist: (productId: number | string, wishlistEntryId?: number | string) => Promise<void>;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number | string) => boolean;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserWishlist = useCallback(async (token: string, userId: string | number) => {
    try {
      const data = await fetchAPI('/wishlists', {
        token,
        params: { 
          'populate[product][populate]': 'image' 
        }
      });
      
      if (data && data.data) {
        const mappedProducts = data.data.map((item: any) => {
          const product = item.product || item.attributes?.product;
          if (!product) return null;
          
          const pData = product.attributes || product;
          const prodId = product.id || pData.id;
          const docId = product.documentId || pData.documentId;
          
          let imgUrl = '';
          if (pData.image) {
              const imageData = pData.image.data || pData.image;
              const imgArray = Array.isArray(imageData) ? imageData : [imageData];
              const firstImg = imgArray[0]?.attributes || imgArray[0];
              const url = firstImg?.url;
              const baseUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://kraft.slingverse.in').replace(/\/$/, '');
              imgUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : '';
          }
          
          const wishlistId = item.documentId || item.id;
          
          return {
            id: prodId,
            productId: docId || prodId,
            wishlistId: wishlistId,
            name: pData.name || '',
            category: pData.category || 'Product',
            price: pData.price || 0,
            image: imgUrl,
            href: `/product/${docId || prodId}`
          };
        }).filter(Boolean);
        
        const uniqueProducts = mappedProducts.reduce((acc: any[], current: any) => {
          if (!acc.find(item => String(item.id) === String(current.id))) {
            return acc.concat([current]);
          }
          return acc;
        }, []);

        setWishlist(uniqueProducts);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist', error);
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    const startup = async () => {
      const storedUser = localStorage.getItem('kt_user');
      if (!storedUser) {
        setLoading(false);
        return;
      }

      try {
        const localUser = JSON.parse(storedUser);
        setUser(localUser);
        setLoading(false);

        if (localUser.jwt) {
          try {
            const res = await fetch('/api/strapi/users/me?fields=id,documentId,username,email,firstName,lastName,phone', {
              headers: { 'Authorization': `Bearer ${localUser.jwt}` },
            });

            if (res.ok) {
              const freshData = await res.json();
              
              let documentId = freshData.documentId || localUser.documentId;
              let numericId = freshData.id || localUser.id || freshData.userId;
              

              // If documentId still missing or looks like an ID, it might be nested or we need another strategy
              if (!documentId || documentId === String(numericId) || /^\d+$/.test(String(documentId))) {
                try {
                  const me = await fetchAPI('/users/me', { token: localUser.jwt });
                  documentId = me.documentId || me.id; // Fallback
                } catch (e) {
                  console.error('Failed to fetch /users/me on hydration', e);
                }
              }

              const updatedUser = { 
                ...localUser, 
                ...freshData, 
                id: numericId,
                documentId 
              };
              
              setUser(updatedUser);
              localStorage.setItem('kt_user', JSON.stringify(updatedUser));
              
              if (updatedUser.jwt && updatedUser.documentId) {
                void fetchUserWishlist(updatedUser.jwt, updatedUser.documentId);
              }
            } else if (res.status === 401 || res.status === 403) {
              setUser(null);
              localStorage.removeItem('kt_user');
            }
          } catch (fetchErr) {
            // Keep local state on network error
          }
        }
      } catch (e) {
        localStorage.removeItem('kt_user');
      } finally {
        setLoading(false);
      }
    };

    startup();
  }, [fetchUserWishlist]);

  const login = useCallback(async (userData: User) => {
    try {
      const res = await fetch('/api/auth/set-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: userData.jwt }),
      });
      if (!res.ok) {
        throw new Error('Failed to set authentication token');
      }

      const rawUser = (userData as any).data?.attributes || (userData as any).attributes || (userData as any).data || userData;
      
      const documentId = rawUser.documentId || userData.documentId || rawUser.id || userData.id;

      const normalizedUser: User = {
        ...rawUser,
        id: rawUser.id || userData.id,
        documentId: String(documentId || rawUser.documentId || ''), 
        firstName: rawUser.firstName || rawUser.first_name || rawUser.firstname,
        lastName: rawUser.lastName || rawUser.last_name || rawUser.lastname,
        jwt: userData.jwt || rawUser.jwt
      };
      
      
      setUser(normalizedUser);
      localStorage.setItem('kt_user', JSON.stringify(normalizedUser));
      
      if (normalizedUser.jwt && normalizedUser.documentId) {
        void fetchUserWishlist(normalizedUser.jwt, normalizedUser.documentId);
        toast.success(`Welcome back, ${normalizedUser.firstName || normalizedUser.username}!`, {
          description: 'You have successfully signed in.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed during session setup');
    }
  }, [fetchUserWishlist]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/clear-token', { method: 'POST' });
      setUser(null);
      setWishlist([]);
      localStorage.removeItem('kt_user');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-logout'));
      }
      toast.info('Signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('strapi-unauthorized', handleUnauthorized);
      return () => window.removeEventListener('strapi-unauthorized', handleUnauthorized);
    }
  }, [logout]);


  const wishlistRef = React.useRef(wishlist);
  useEffect(() => {
    wishlistRef.current = wishlist;
  }, [wishlist]);

  const addToWishlist = useCallback(async (product: WishlistProduct) => {
    const productDocumentId = product.productId || (product as any).documentId;
    if (!productDocumentId) {
      console.error('Cannot add to wishlist: Missing product documentId');
      return;
    }

    if (wishlistRef.current.some((p) => String(p.productId) === String(productDocumentId) || String(p.id) === String(product.id))) return;

    setWishlist(prev => [...prev, product]);
    toast.success('Added to wishlist', {
      description: `${product.name} is now in your archive.`,
    });
    
    if (user?.jwt && user?.documentId) {
      try {
        const body = {
          data: {
            // Omit owner: injected by middleware
            product: formatRelation(productDocumentId),
            added_at: new Date().toISOString()
          }
        };
        
        const res = await fetchAPI('/wishlists', {
          method: 'POST',
          token: user.jwt,
          body: JSON.stringify(body)
        });

        // Strapi v5 returns { data: { id, documentId, ... } }
        const entry = res.data || res;
        const newWishlistId = entry.documentId || entry.id;

        if (newWishlistId) {
          setWishlist(prev => prev.map(p => 
            String(p.productId) === String(productDocumentId) ? { ...p, wishlistId: newWishlistId } : p
          ));
        }
      } catch (error: any) {
        console.error('Failed to add to Strapi wishlist', error);
        setWishlist(prev => prev.filter(p => String(p.id) !== String(product.id)));
      }
    }
  }, [user]);

  const removeFromWishlist = useCallback(async (productId: number | string, wishlistEntryId?: number | string) => {
    const itemToRemove = wishlistRef.current.find(p => String(p.id) === String(productId));
    if (!itemToRemove) return;

    const wishlistId = wishlistEntryId || itemToRemove.wishlistId;
    const updated = wishlistRef.current.filter(p => String(p.id) !== String(productId));
    setWishlist(updated);
    toast.info('Removed from wishlist');

    if (user?.jwt && wishlistId) {
      try {
        await fetchAPI(`/wishlists/${wishlistId}`, {
          method: 'DELETE',
          token: user.jwt
        });
        toast.success('Successfully removed from server archive');
      } catch (error: any) {
        console.error(`[WISHLIST] DELETE failed for ${wishlistId}:`, error);
        if (error.status === 404) return;

        toast.error('Failed to sync removal with server');
        setWishlist(prev => {
          if (!prev.find(p => String(p.id) === String(productId))) {
            return [...prev, itemToRemove];
          }
          return prev;
        });
      }
    }
  }, [user]);

  const toggleWishlist = useCallback(async (product: Product) => {
    const productDocumentId = product.productId || (product as any).documentId;
    const isCurrentlyIn = wishlistRef.current.some(p => 
      (p.productId && String(p.productId) === String(productDocumentId)) || 
      String(p.id) === String(product.id)
    );

    if (isCurrentlyIn) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product as WishlistProduct);
    }
  }, [addToWishlist, removeFromWishlist]);

  const isInWishlist = useCallback(
    (productId: number | string) => wishlist.some((p) => String(p.id) === String(productId)),
    [wishlist]
  );

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    wishlist,
    loading,
    login,
    logout,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    isAuthenticated: !!user,
    updateUser
  }), [user, wishlist, loading, login, logout, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, updateUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
