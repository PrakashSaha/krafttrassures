'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface User {
  name: string;
  email: string;
  [key: string]: any;
}

export interface WishlistProduct {
  id: number | string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface AuthContextType {
  user: User | null;
  wishlist: WishlistProduct[];
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  addToWishlist: (product: WishlistProduct) => void;
  removeFromWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Persistence management
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('kt_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          const storedWishlist = localStorage.getItem(`kt_wishlist_${parsedUser.email}`);
          if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.error('Failed to parse auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('kt_user', JSON.stringify(userData));
    
    try {
      const storedWishlist = localStorage.getItem(`kt_wishlist_${userData.email}`);
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    } catch {
      setWishlist([]);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setWishlist([]);
    localStorage.removeItem('kt_user');
  }, []);

  const addToWishlist = useCallback((product: WishlistProduct) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const updated = [...prev, product];
      if (user) localStorage.setItem(`kt_wishlist_${user.email}`, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const removeFromWishlist = useCallback((productId: number | string) => {
    setWishlist((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      if (user) localStorage.setItem(`kt_wishlist_${user.email}`, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const isInWishlist = useCallback(
    (productId: number | string) => wishlist.some((p) => p.id === productId),
    [wishlist]
  );

  const contextValue = useMemo(() => ({
    user,
    wishlist,
    loading,
    login,
    logout,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }), [user, wishlist, loading, login, logout, addToWishlist, removeFromWishlist, isInWishlist]);

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
