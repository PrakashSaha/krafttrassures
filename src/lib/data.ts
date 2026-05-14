import { Product } from './types';

// UI Navigation and Static Links
export const FOOTER_QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Contact', href: '/contact' },
  { name: 'My Account', href: '/account' },
];

export const FOOTER_SERVICES_LINKS = [
  { name: 'Shipping & Delivery', href: '/shipping' },
  { name: 'Returns & Exchanges', href: '/returns' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' },
];

export const ACCOUNT_NAV = [
  { label: 'Dashboard', href: '/account' },
  { label: 'My Profile', href: '/account/profile' },
  { label: 'My Address', href: '/account/address' },
  { label: 'My Wishlist', href: '/account/wishlist' },
  { label: 'My Orders', href: '/account/orders' },
  { label: 'My Transaction', href: '/account/transactions' },
];

// Fallback arrays (kept empty for production, ensuring CMS is the source of truth)
export const CATEGORIES: string[] = [];
export const PRODUCTS: Product[] = [];
export const NEW_ARRIVALS_DATA: Product[] = [];
export const SHOP_NAV_CATEGORIES: any[] = [];
export const HERO_DATA: any[] = [];
export const TREASURE_DATA: any[] = [];
export const INSTAGRAM_POSTS: any[] = [];
export const STORY_STEPS: any[] = [];
export const ADORNMENTS_DATA: any[] = [];
export const TRENDING_DATA: any[] = [];
export const COLLECTION_DATA: any[] = [];
