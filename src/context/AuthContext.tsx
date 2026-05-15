'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAPI } from '@/lib/api';
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

  // Persistence management - LOAD from local storage immediately to prevent logout flash
  // Consolidating startup logic into a single resilient effect below (line 103)

  const fetchUserWishlist = useCallback(async (token: string, userDocId: string) => {
    try {
      const data = await fetchAPI('/wishlists', {
        token,
        params: { 
          'filters[user][documentId][$eq]': userDocId,
          'populate[product][populate]': 'image' 
        }
      });
      
      if (data && data.data) {
        const mappedProducts = data.data.map((item: any) => {
          const product = item.product || item.attributes?.product;
          if (!product) return null;
          
          const pData = product.attributes || product;
          
          let imgUrl = '';
          if (pData.image) {
              const imageData = pData.image.data || pData.image;
              const imgArray = Array.isArray(imageData) ? imageData : [imageData];
              const firstImg = imgArray[0]?.attributes || imgArray[0];
              const url = firstImg?.url;
              const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
              if (!baseUrl) throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
              imgUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : '';
          }
          
          const wishlistId = item.documentId || item.id;
          
          return {
            id: product.id,
            productId: pData.productId || product.documentId || pData.documentId,
            wishlistId: wishlistId,
            name: pData.name || '',
            category: pData.category || 'Product',
            price: pData.price || 0,
            image: imgUrl,
            href: `/product/${pData.productId || pData.documentId || product.documentId || ''}`
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

  // Persistence management via /api/auth/me
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

        if (localUser.jwt) {
          try {
            const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
            const res = await fetch(`${STRAPI_URL}/api/users/me?populate=*`, {
              headers: { 'Authorization': `Bearer ${localUser.jwt}` },
            });

            if (res.ok) {
              const freshData = await res.json();
              const updatedUser = { ...localUser, ...freshData };
              setUser(updatedUser);
              localStorage.setItem('kt_user', JSON.stringify(updatedUser));
              
              if (updatedUser.jwt && (updatedUser.documentId || updatedUser.id)) {
                await fetchUserWishlist(updatedUser.jwt, updatedUser.documentId || updatedUser.id);
              }
            } else if (res.status === 401) {
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
      // Set the token in HTTP-only cookie via our API route
      await fetch('/api/auth/set-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: userData.jwt }),
      });

      const rawUser = (userData as any).data?.attributes || (userData as any).attributes || (userData as any).data || userData;
      const normalizedUser = {
        ...rawUser,
        firstName: rawUser.firstName || rawUser.first_name || rawUser.firstname,
        lastName: rawUser.lastName || rawUser.last_name || rawUser.lastname,
        jwt: userData.jwt || rawUser.jwt
      };
      
      setUser(normalizedUser);
      localStorage.setItem('kt_user', JSON.stringify(normalizedUser));
      
      if (userData.jwt && (userData.documentId || userData.id)) {
        await fetchUserWishlist(userData.jwt, (userData.documentId || userData.id).toString());
        toast.success(`Welcome back, ${userData.firstName || userData.username}!`, {
          description: 'You have successfully signed in.',
        });
      }
    } catch (error) {
      console.error('Login refactor error:', error);
      toast.error('Login failed during session setup');
    }
  }, [fetchUserWishlist]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/clear-token', { method: 'POST' });
      setUser(null);
      setWishlist([]);
      localStorage.removeItem('kt_user');
      toast.info('Signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const wishlistRef = React.useRef(wishlist);
  useEffect(() => {
    wishlistRef.current = wishlist;
  }, [wishlist]);

  const addToWishlist = useCallback(async (product: WishlistProduct) => {
    if (wishlistRef.current.some((p) => String(p.id) === String(product.id))) return;

    setWishlist(prev => [...prev, product]);
    toast.success('Added to wishlist', {
      description: `${product.name} is now in your archive.`,
    });
    
    if (user?.jwt && (user?.documentId || user?.id)) {
      try {
        const body = {
          data: {
            user: user.documentId || user.id,
            product: product.productId || product.id,
            added_at: new Date().toISOString()
          }
        };
        
        const res = await fetchAPI('/wishlists', {
          method: 'POST',
          token: user.jwt,
          body: JSON.stringify(body)
        });

        const entry = res.data?.data || res.data || res;
        // Strapi v5 often puts ID at the top level of the data object
        const newWishlistId = entry.documentId || entry.id || (entry.attributes?.documentId);


        if (newWishlistId) {
          setWishlist(prev => prev.map(p => 
            String(p.id) === String(product.id) ? { ...p, wishlistId: newWishlistId } : p
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
        const res = await fetchAPI(`/wishlists/${wishlistId}`, {
          method: 'DELETE',
          token: user.jwt
        });
        toast.success('Successfully removed from server archive');
      } catch (error: any) {
        console.error(`[WISHLIST] DELETE failed for ${wishlistId}:`, error);
        
        // If it's a 404, the item is already gone from the server
        if (error.status === 404) {
          console.warn(`[WISHLIST] Item ${wishlistId} already gone from server (404)`);
          return;
        }

        toast.error('Failed to sync removal with server');
        // Rollback local state if server delete failed
        setWishlist(prev => {
          if (!prev.find(p => String(p.id) === String(productId))) {
            return [...prev, itemToRemove];
          }
          return prev;
        });
      }
    } else {
      const reason = !user?.jwt ? 'Missing JWT' : 'Missing wishlistId';
        toast.error(`Sync error: ${reason}`);
    }
  }, [user]);

  const toggleWishlist = useCallback(async (product: Product) => {
    const isCurrentlyIn = wishlistRef.current.some(p => String(p.id) === String(product.id));
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
