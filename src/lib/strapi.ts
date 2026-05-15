import { cache } from 'react';
import { STORY_STEPS } from './data';
import { Product, Category } from './types';

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').trim().replace(/\/$/, '');
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN?.trim();

/**
 * Strapi v5 Response Flattener
 * Recursively extracts data from Strapi's nested structure
 */
function flattenAttributes(data: any): any {
  if (!data) return null;
  if (Array.isArray(data)) return data.map(flattenAttributes);
  
  // Handle the 'attributes' wrapper if present (v4 compatibility)
  let flattened = data.attributes ? { id: data.id, ...data.attributes } : data;
  
  // Handle the 'data' wrapper for relationships
  if (flattened.data !== undefined) {
    flattened = flattenAttributes(flattened.data);
  }

  // Recursively flatten all properties
  if (typeof flattened === 'object' && flattened !== null) {
    Object.keys(flattened).forEach(key => {
      if (key !== 'data') {
        flattened[key] = flattenAttributes(flattened[key]);
      }
    });
  }

  return flattened;
}

/**
 * Helper to fetch data from Strapi API
 */
export async function fetchStrapi(
  endpoint: string,
  query?: Record<string, any>,
  options: RequestInit = {}
) {
  let url = '';
  try {
    let queryString = '';
    if (query) {
      const buildQuery = (obj: any, prefix = ''): string[] => {
        return Object.entries(obj).flatMap(([key, value]) => {
          const fullKey = prefix ? `${prefix}[${key}]` : key;
          if (value === undefined || value === null || value === '') return [];
          
          if (Array.isArray(value)) {
            return value.flatMap((v, i) => {
              if (typeof v === 'object' && v !== null) {
                return buildQuery(v, `${fullKey}[${i}]`);
              }
              return [`${fullKey}[${i}]=${encodeURIComponent(String(v))}`];
            });
          } else if (typeof value === 'object') {
            return buildQuery(value, fullKey);
          }
          return [`${fullKey}=${encodeURIComponent(String(value))}`];
        });
      };
      
      const parts = buildQuery(query);
      if (parts.length > 0) queryString = '?' + parts.join('&');
    }
    
    url = `${STRAPI_URL}/api/${endpoint}${queryString}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = STRAPI_TOKEN.startsWith('Bearer ') ? STRAPI_TOKEN : `Bearer ${STRAPI_TOKEN}`;
    }
    
    const res = await fetch(url, {
      next: { revalidate: 60 },
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      strapiErrorLogger(res.status, url, errorText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('❌ Strapi Connection Refused:', url || endpoint);
    return null;
  }
}

/**
 * Logger for Strapi errors to avoid console clutter while maintaining visibility
 */
function strapiErrorLogger(status: number, url: string, errorText: string) {
  let message = '';
  try {
    const parsed = JSON.parse(errorText);
    message = parsed.error?.message || errorText;
  } catch (e) {
    message = errorText;
  }

  const msg = `Strapi [${status}] ${url}: ${message}`;
  if (status === 401 || status === 403) console.error(`🔒 AUTH: ${msg}`);
  else if (status === 404) console.warn(`⚠️ NOT FOUND: ${msg}`);
  else console.error(`❌ ERROR: ${msg}`);
}

/**
 * Helper to get the full URL for Strapi media
 */
export function getStrapiMedia(url: any) {
  if (!url) return null;
  
  if (typeof url !== 'string') {
    // Handle nested structures
    const rawUrl = url.url || url.attributes?.url || url.data?.attributes?.url || url.data?.url;
    if (rawUrl) return getStrapiMedia(rawUrl);
    if (Array.isArray(url)) return getStrapiMedia(url[0]);
    return null;
  }

  if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) return url;
  
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
  
  return `${baseUrl}${cleanPath}`;
}

/**
 * Standardizes category label extraction with fallbacks
 */
function extractCategoryLabel(categories: any): string {
  const catList = Array.isArray(categories) ? categories : (categories?.data || []);
  if (catList.length === 0) return 'Uncategorized';
  
  const first = catList[0];
  const label = first.label || first.attributes?.label || 'Uncategorized';
  return label;
}

const FALLBACK_CATEGORIES: Category[] = [
  { label: 'Show Pieces', slug: 'show-pieces', href: '/shop?category=show-pieces', image: null },
  { label: 'Home Decor', slug: 'home-decor', href: '/shop?category=home-decor', image: null },
  { label: 'Accessories', slug: 'accessories', href: '/shop?category=accessories', image: null },
];

/**
 * Fetch Hero Sliders
 */
export const getHeroSliders = cache(async () => {
  const response = await fetchStrapi('hero-sliders', { 
    'populate[products][populate]': 'image' 
  }, {
    next: { revalidate: 3600 }
  });
  
  if (!response?.data) return [];

  return response.data.flatMap((slider: any) => {
    const data = slider.attributes || slider;
    const products = flattenAttributes(data.products) || [];
    
    if (!Array.isArray(products)) return [];

    return products.map((product: any) => {
      // Ensure we have a valid slug before generating a slide
      if (!product.slug) return null;

      return {
        title: data.title || "Kraft Treasure",
        subtitle: data.subtitle || "Authentic Arunachal Pradesh Handicrafts",
        name: product.name || 'Untitled Piece',
        img: getStrapiMedia(product.image),
        href: `/product/${product.slug}`, 
      };
    }).filter(Boolean);
  });
});

/**
 * Fetch Products
 */
export const getProducts = cache(async (params?: Record<string, any>): Promise<Product[]> => {
  const response = await fetchStrapi('products', { 
    populate: ['image', 'categories'],
    ...params 
  }, {
    next: { revalidate: 300 }
  });
  
  if (!response?.data) return [];

  return response.data.map((item: any): Product => {
    const data = flattenAttributes(item);
    
    return {
      id: data.id,
      documentId: data.documentId,
      name: data.name,
      slug: data.slug,
      category: extractCategoryLabel(data.categories),
      price: data.price,
      image: getStrapiMedia(data.image),
      hoverImage: Array.isArray(data.image) && data.image.length > 1 ? getStrapiMedia(data.image[1]) : null,
      href: `/product/${data.slug}`,
      stock: data.quantity || 0,
    };
  });
});

/**
 * Fetch Products with Pagination Metadata
 */
export const getProductsWithMeta = cache(async (params?: Record<string, any>): Promise<{ products: Product[], meta: any }> => {
  const response = await fetchStrapi('products', { 
    populate: ['image', 'categories'],
    'pagination[withCount]': true,
    ...params 
  }, {
    next: { revalidate: 300 }
  });
  
  if (!response?.data) return { products: [], meta: { pagination: { total: 0, pageCount: 0, page: 1, pageSize: 12 } } };

  const products = response.data.map((item: any): Product => {
    const data = flattenAttributes(item);
    
    return {
      id: data.id,
      documentId: data.documentId,
      name: data.name,
      slug: data.slug,
      category: extractCategoryLabel(data.categories),
      price: data.price,
      image: getStrapiMedia(data.image),
      hoverImage: Array.isArray(data.image) && data.image.length > 1 ? getStrapiMedia(data.image[1]) : null,
      href: `/product/${data.slug}`,
      stock: data.quantity || 0,
    };
  });

  return { products, meta: response.meta };
});

/**
 * Fetch Single Product by Slug
 */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const response = await fetchStrapi('products', {
    'filters[slug][$eq]': slug,
    populate: ['image', 'categories'],
  });
  
  if (!response?.data || response.data.length === 0) return null;

  const data = flattenAttributes(response.data[0]);
  const images = Array.isArray(data.image) ? data.image : [data.image];
  const imageUrls = images.map(getStrapiMedia).filter(Boolean) as string[];

  return {
    id: data.id,
    documentId: data.documentId,
    name: data.name,
    slug: data.slug,
    category: extractCategoryLabel(data.categories),
    price: data.price,
    image: imageUrls[0] || null,
    thumbnails: imageUrls,
    material: data.material || 'Traditional Materials',
    origin: data.origin || 'Arunachal Pradesh',
    availability: (data.quantity === 0 || data.availability === 'out_of_stock') ? 'Sold Out' : 'In Stock',
    stock: data.quantity || 0,
    description: data.description || '',
    fullDescription: data.description || '',
    href: `/product/${data.slug}`,
  };
});

/**
 * Fetch Categories
 */
export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const response = await fetchStrapi('categories', { populate: 'image' });
    if (!response?.data) return FALLBACK_CATEGORIES;

    return response.data.map((item: any) => {
      const data = flattenAttributes(item);
      return {
        label: data.label,
        slug: data.slug,
        description: data.description,
        image: getStrapiMedia(data.image),
        href: `/shop?category=${data.slug}`,
      };
    });
  } catch (e) {
    return FALLBACK_CATEGORIES;
  }
});

/**
 * Fetch Testimonials
 */
export const getTestimonials = cache(async () => {
  const response = await fetchStrapi('testimonials');
  if (!response?.data) return [];

  return response.data.map((item: any) => {
    const data = flattenAttributes(item);
    return {
      id: data.id,
      author: data.author,
      content: data.content,
      rating: data.rating
    };
  });
});

/**
 * Fetch Story Steps
 */
export const getStorySteps = cache(async () => {
  const response = await fetchStrapi('story-steps');
  if (!response?.data) return [];

  return response.data.map((item: any) => {
    const data = flattenAttributes(item);
    return {
      id: data.stepNumber || data.id,
      title: data.title,
      desc: data.description
    };
  });
});

/**
 * Fetch Instagram Feed
 */
export const getInstagramFeeds = cache(async () => {
  const response = await fetchStrapi('instagram-feeds', { 
    populate: { image: { populate: '*' } } // Deep populate for media
  });
  if (!response?.data) return [];

  return response.data.map((item: any) => {
    const data = flattenAttributes(item);
    return {
      id: data.id,
      image: getStrapiMedia(data.image),
      link: data.link || '#'
    };
  });
});


