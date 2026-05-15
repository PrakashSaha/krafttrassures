export interface Product {
  id: string | number;
  documentId?: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string | null;
  hoverImage?: string | null;
  href: string;
  material?: string;
  origin?: string;
  availability?: string;
  description?: string;
  fullDescription?: string;
  thumbnails?: string[];
  stock?: number;
}

export interface WishlistProduct extends Product {
  wishlistId?: number | string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  label: string;
  slug: string;
  description?: string;
  image: string | null;
  href: string;
}

export interface Order {
  id: string | number;
  orderId: string;
  createdAt: string;
  items: any[];
  totalAmount: number;
  status: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line: string;
  city: string;
  state: string;
  pin: string;
}

export interface User {
  id: string | number;
  documentId?: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  jwt?: string;
}
