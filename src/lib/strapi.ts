const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error('CRITICAL FAILURE: NEXT_PUBLIC_STRAPI_URL is not defined. The application cannot communicate with the backend.');
}
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
import { cache } from 'react';
import { STORY_STEPS } from './data';
import { Product, Category } from './types';

/**
 * Helper to fetch data from Strapi API
 */
export async function fetchStrapi(
  endpoint: string,
  query?: Record<string, any>,
  options: RequestInit = {}
) {
  try {
    // Build the query string manually
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
              return [`${fullKey}[${i}]=${encodeURIComponent(v)}`];
            });
          } else if (typeof value === 'object') {
            return buildQuery(value, fullKey);
          }
          return [`${fullKey}=${encodeURIComponent(value as string)}`];
        });
      };
      
      const parts = buildQuery(query);
      if (parts.length > 0) queryString = '?' + parts.join('&');
    }
    
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}${queryString}`, {
      next: { revalidate: 60 }, // Default revalidation: 1 minute
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        ...options.headers,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Strapi warning: Endpoint not found (${endpoint})`);
      } else {
        console.error(`Strapi error: ${res.statusText} (${res.status}) on ${STRAPI_URL}/api/${endpoint}${queryString}`);
      }
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Strapi fetch error:', error);
    return null;
  }
}

/**
 * Helper to get the full URL for Strapi media
 * Handles both relative and absolute URLs
 */
export function getStrapiMedia(url: any) {
  if (!url) return null;
  
  // If we were passed an object or array instead of a string, try to find the url inside it
  if (typeof url !== 'string') {
    if (Array.isArray(url)) return getStrapiMedia(url[0]);
    if (url.url) return getStrapiMedia(url.url);
    if (url.attributes?.url) return getStrapiMedia(url.attributes.url);
    if (url.data?.attributes?.url) return getStrapiMedia(url.data.attributes.url);
    if (url.data?.url) return getStrapiMedia(url.data.url);
    return null;
  }

  if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) return url;
  
  // Ensure we have a clean relative path
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  return `${baseUrl}${cleanUrl}`;
}

/**
 * Fetch Hero Sliders
 */
export const getHeroSliders = cache(async () => {
  // Explicitly populate products and their images
  const response = await fetchStrapi('hero-sliders', { 
    'populate[products][populate]': 'image' 
  }, {
    next: { revalidate: 3600 } // Cache sliders for 1 hour
  });
  if (!response || !response.data) return [];

  // Create slides by flat-mapping all products within all sliders
  return response.data.flatMap((item: any) => {
    const data = item.attributes || item;
    const products = data.products?.data || data.categories || data.products;
    
    if (!products || !Array.isArray(products)) return [];

    return products.map((product: any) => {
      const productData = product.attributes || product;
      return {
        title: data.title || "Kraft Treasure",
        subtitle: data.subtitle || "Authentic Arunachal Pradesh Handicrafts",
        name: productData.name || '',
        img: getStrapiMedia(productData.image) || null,
        href: `/product/${productData.slug || ''}`, 
      };
    });
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
    next: { revalidate: 300 } // Cache products for 5 minutes
  });
  if (!response || !response.data) return [];

  return response.data.map((item: any): Product => {
    const data = item.attributes || item;
    const categories = data.categories?.data || data.categories;
    
    return {
      id: item.id,
      documentId: item.documentId,
      name: data.name,
      slug: data.slug,
      category: (Array.isArray(categories) && categories.length > 0) 
        ? (categories[0]?.attributes?.label || categories[0]?.label || 'Uncategorized') 
        : 'Uncategorized',
      price: data.price,
      image: getStrapiMedia(data.image) || null,
      hoverImage: Array.isArray(data.image) && data.image.length > 1 ? getStrapiMedia(data.image[1]) : null,
      href: `/product/${data.slug}`,
    };
  });
});

/**
 * Fetch Single Product by Slug
 */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const response = await fetchStrapi('products', {
    'filters[slug][$eq]': slug,
    populate: ['image', 'categories'],
  });
  
  if (!response || !response.data || response.data.length === 0) return null;

  const item = response.data[0];
  const data = item.attributes || item;
  const categories = data.categories?.data || data.categories;
  
  // In your schema, 'image' is a multi-media field (gallery)
  const images = Array.isArray(data.image) ? data.image : [data.image];
  const imageUrls = images.map((img: any) => getStrapiMedia(img)).filter(Boolean) as string[];

  return {
    id: item.id,
    documentId: item.documentId,
    name: data.name,
    slug: data.slug,
    category: Array.isArray(categories) ? (categories[0]?.attributes?.label || categories[0]?.label) : 'Uncategorized',
    price: data.price,
    image: imageUrls[0] || null,
    thumbnails: imageUrls,
    material: data.material || 'Traditional Materials',
    origin: data.origin || 'Arunachal Pradesh',
    availability: data.availability === 'out_of_stock' ? 'Sold Out' : 'In Stock',
    description: data.description || '',
    fullDescription: data.description || '', // Using description as fallback
    href: `/product/${data.slug}`,
  };
});

/**
 * Fetch Categories
 */
export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const response = await fetchStrapi('categories', { 
      populate: 'image'
    }, {
      next: { revalidate: 3600 } // Cache categories for 1 hour
    });
    
    if (!response || !response.data) {
      console.warn('No categories found in Strapi, check if data is published');
      return [];
    }

    return response.data.map((item: any) => {
      const data = item.attributes || item;
      return {
        label: data.label,
        slug: data.slug,
        description: data.description,
        image: getStrapiMedia(data.image),
        href: `/shop?category=${data.slug}`,
      };
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});

/**
 * Fetch Testimonials
 */
export async function getTestimonials() {
  const response = await fetchStrapi('testimonials');
  if (!response || !response.data) return [];

  return response.data.map((item: any) => {
    const data = item.attributes || item;
    return {
      id: item.id,
      author: data.author,
      content: data.content,
      rating: data.rating
    };
  });
}

/**
 * Fetch Story Steps
 */
export async function getStorySteps() {
  try {
    const response = await fetchStrapi('story-steps');
    if (!response || !response.data || response.data.length === 0) {
      return [];
    }

    return response.data.map((item: any) => {
      const data = item.attributes || item;
      return {
        id: data.stepNumber || item.id,
        title: data.title,
        desc: data.description
      };
    });
  } catch (error) {
    return [];
  }
}

/**
 * Fetch Instagram Feed
 */
export const getInstagramFeeds = cache(async () => {
  const response = await fetchStrapi('instagram-feeds', { populate: '*' });
  if (!response || !response.data) return [];

  return response.data.map((item: any) => {
    const data = item.attributes || item;
    return {
      id: item.id,
      image: getStrapiMedia(data.image) || null,
      link: data.link || '#'
    };
  });
});
