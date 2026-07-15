import { cache } from 'react';
import { STORY_STEPS } from './data';
import { Product, Category } from './types';

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').trim().replace(/\/$/, '');
const STRAPI_TOKEN = (process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN)?.trim();

/**
 * Fetch Adornments (Homepage Featured Blocks)
 */
export const getAdornments = cache(async (locale?: string) => {
  const response = await fetchStrapi('adornments', {
    locale,
    populate: ['image'] // Strapi v5 handles media population simply if top-level
  });
  if (!response?.data) return [];

  return response.data.map((item: any) => {
    const data = flattenAttributes(item);
    return {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      priceText: data.priceText,
      image: getStrapiMedia(data.image),
      href: data.href,
      large: data.large
    };
  });
});

/**
 * Strapi v5 Response Flattener
 * Recursively extracts data from Strapi's nested structure
 */
function flattenAttributes(data: any): any {
  if (!data) return null;
  
  // Handle the 'data' wrapper if present (Strapi v4/v5 relationship structure)
  if (data.data !== undefined) {
    return flattenAttributes(data.data);
  }

  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }
  
  // Handle the 'attributes' wrapper if present (v4 compatibility)
  let flattened = data.attributes ? { id: data.id, ...data.attributes } : data;
  
  // Recursively flatten all properties
  if (typeof flattened === 'object' && flattened !== null) {
    Object.keys(flattened).forEach(key => {
      // Don't re-flatten the 'id' or 'documentId'
      if (key !== 'id' && key !== 'documentId') {
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
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      strapiErrorLogger(res.status, url, errorText);
      return null;
    }

    return await res.json();
  } catch (error: any) {
    console.error('❌ Strapi Connection Refused:', url || endpoint, error.message);
    
    // Prevent Next.js build from failing if the backend (e.g., Render free tier) is asleep during deployment
    if (process.env.npm_lifecycle_event === 'build' || process.env.CI) {
      console.warn('⚠️ Swallowing error during build phase to prevent deployment failure.');
      return null;
    }

    // Throw error at runtime so Next.js error boundary catches it and shows the Server Down page
    throw new Error('fetch failed: Connection Refused to backend server');
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
export const getHeroSliders = cache(async (locale?: string) => {
  const response = await fetchStrapi('hero-sliders', { 
    locale,
    // Explicit deep population for Strapi v5 relations
    populate: {
      products: {
        populate: ['image', 'thumbnail']
      }
    }
  }, {
    next: { revalidate: 0 } // bypass next cache in dev for direct CMS updates
  });
  
  if (!response?.data) return [];

  return response.data.flatMap((item: any) => {
    const data = flattenAttributes(item);
    if (!data) return [];
    
    const products = data.products || [];
    if (!Array.isArray(products)) return [];
    
    return products.map((item: any) => {
      const product = mapProduct(item);
      return {
        title: data.title || "Ancient Artistry Meet Luxury",
        subtitle: data.subtitle || "Authentic Arunachal Pradesh Handicrafts",
        name: product.name,
        img: product.thumbnail || product.image || '',
        href: product.href, 
      };
    }).filter(Boolean);
  });
});

/**
 * Fetch Products
 */
export const getProducts = cache(async (params?: Record<string, any>): Promise<Product[]> => {
  const response = await fetchStrapi('products', { 
    populate: ['image', 'thumbnail', 'categories'],
    ...params 
  }, {
    next: { revalidate: 0 }
  });
  
  if (!response?.data) return [];

  return response.data.map((item: any): Product => {
    const data = flattenAttributes(item);
    
    return {
      id: data.id,
      productId: data.documentId,
      name: data.name,
      category: extractCategoryLabel(data.categories),
      price: data.price,
      image: getStrapiMedia(data.image),
      thumbnail: getStrapiMedia(data.thumbnail),
      hoverImage: Array.isArray(data.image) && data.image.length > 1 ? getStrapiMedia(data.image[1]) : null,
      href: `/product/${data.documentId}`,
      stock: data.quantity || 0,
      availability: (data.quantity || 0) > 0 ? 'In Stock' : 'Sold Out',
    };
  });
});

/**
 * Fetch Products with Pagination Metadata
 */
export const getProductsWithMeta = cache(async (params?: Record<string, any>): Promise<{ products: Product[], meta: any }> => {
  const response = await fetchStrapi('products', { 
    populate: ['image', 'thumbnail', 'categories'],
    'pagination[withCount]': true,
    ...params 
  }, {
    next: { revalidate: 0 }
  });
  
  if (!response?.data) return { products: [], meta: { pagination: { total: 0, pageCount: 0, page: 1, pageSize: 12 } } };

  const products = response.data.map((item: any): Product => {
    const data = flattenAttributes(item);
    
    return {
      id: data.id,
      productId: data.documentId,
      name: data.name,
      category: extractCategoryLabel(data.categories),
      price: data.price,
      image: getStrapiMedia(data.image),
      thumbnail: getStrapiMedia(data.thumbnail),
      hoverImage: Array.isArray(data.image) && data.image.length > 1 ? getStrapiMedia(data.image[1]) : null,
      href: `/product/${data.documentId}`,
      stock: data.quantity || 0,
      availability: (data.quantity || 0) > 0 ? 'In Stock' : 'Sold Out',
    };
  });

  return { products, meta: response.meta };
});


/**
 * Fetch Single Product by ID (Uses Strapi documentId)
 */
export const getProductById = cache(async (productId: string): Promise<Product | null> => {
  const response = await fetchStrapi('products', {
    'filters[documentId][$eq]': productId,
    populate: ['image', 'thumbnail', 'categories'],
  }, {
    next: { revalidate: 0 }
  });
  
  if (!response?.data || response.data.length === 0) return null;

  return mapProduct(response.data[0]);
});

/**
 * Internal helper to map Strapi product data to Product interface
 */
function mapProduct(item: any): Product {
  const data = flattenAttributes(item);
  const images = Array.isArray(data.image) ? data.image : [data.image];
  const imageUrls = images.map(getStrapiMedia).filter(Boolean) as string[];

  return {
    id: data.id,
    productId: data.documentId,
    name: data.name,
    category: extractCategoryLabel(data.categories),
    price: data.price,
    image: imageUrls[0] || null,
    thumbnail: getStrapiMedia(data.thumbnail),
    thumbnails: imageUrls,
    material: data.material || 'Traditional Materials',
    origin: data.origin || data.otherOrigin || 'Arunachal Pradesh',
    otherOrigin: data.otherOrigin,
    size: data.size,
    availability: (data.quantity > 0) ? 'In Stock' : 'Sold Out',
    stock: data.quantity || 0,
    description: data.description || '',
    fullDescription: data.longDescription || '',
    cosmic_story: data.cosmic_story || '',
    ancient_utility: data.ancient_utility || '',
    modern_utility: data.modern_utility || '',
    href: `/product/${data.documentId}`,
  };
}

// Export as getProductBySlug for backward compatibility during transition if needed
export const getProductBySlug = getProductById;

/**
 * Fetch Categories
 */
export const getCategories = cache(async (locale?: string): Promise<Category[]> => {
  try {
    const response = await fetchStrapi('categories', { locale, populate: 'image' });
    if (!response?.data) return FALLBACK_CATEGORIES;

    return response.data.map((item: any) => {
      const data = flattenAttributes(item);
      return {
        label: data.label,
        slug: data.slug,
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
export const getTestimonials = cache(async (locale?: string) => {
  const response = await fetchStrapi('testimonials', { locale });
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
export const getStorySteps = cache(async (locale?: string) => {
  const response = await fetchStrapi('story-steps', { locale });
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
export const getInstagramFeeds = cache(async (locale?: string) => {
  const response = await fetchStrapi('instagram-feeds', { 
    locale,
    populate: ['image'] 
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

/**
 * Fetch Articles with Locale
 */
export const getArticles = cache(async (locale?: string) => {
  const response = await fetchStrapi('articles', { 
    locale,
    populate: ['coverImage']
  });
  if (!response?.data) return [];

  return response.data.map((item: any) => {
    const data = flattenAttributes(item);
    return {
      id: data.id,
      documentId: data.documentId,
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      publishedAt: data.publishedAt,
      coverImage: getStrapiMedia(data.coverImage),
    };
  });
});

/**
 * Fetch Article By Slug with Locale
 */
export const getArticleBySlug = cache(async (slug: string, locale?: string) => {
  const response = await fetchStrapi('articles', { 
    locale,
    'filters[slug][$eq]': slug,
    populate: ['coverImage']
  });
  if (!response?.data || response.data.length === 0) return null;

  const data = flattenAttributes(response.data[0]);
  return {
    id: data.id,
    documentId: data.documentId,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    content: data.content,
    publishedAt: data.publishedAt,
    coverImage: getStrapiMedia(data.coverImage),
  };
});
