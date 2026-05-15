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
export const ADORNMENTS_DATA = [
  {
    title: "Handcrafted Silver Jewelry",
    subtitle: "Traditional Elegance",
    priceText: "Starting from ₹12,500",
    image: "/images/img_a9132c04a3411b218b8addb9be42a9ba.png",
    href: "/shop?category=jewelry",
    large: true
  },
  {
    title: "Tribal Beadwork",
    subtitle: "Heritage Adornments",
    priceText: "From ₹4,200",
    image: "/images/img_2c787285a0939bbbc45bdf59b14ab08c.png",
    href: "/shop?category=beadwork"
  },
  {
    title: "Traditional Headgear",
    subtitle: "Cultural Pride",
    priceText: "From ₹8,900",
    image: "/images/img_93892b41c09914ab339b71a95c773150.png",
    href: "/shop?category=headgear"
  }
];
export const TRENDING_DATA: any[] = [];
export const COLLECTION_DATA: any[] = [];
