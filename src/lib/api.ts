const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error('CRITICAL FAILURE: NEXT_PUBLIC_STRAPI_URL is not defined. The application cannot communicate with the backend.');
}

interface FetchOptions extends RequestInit {
  token?: string;
  params?: Record<string, any>;
}

export async function fetchAPI(path: string, options: FetchOptions = {}) {
  const { token, params, ...customOptions } = options;

  // Automatically prepend /api if the path doesn't start with it
  // and ensure we don't double it if the caller already included it
  const cleanPath = path.startsWith('/api') ? path.substring(4) : path;
  let url = `${STRAPI_URL}/api${cleanPath}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    url += `?${searchParams.toString()}`;
  }

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...customOptions,
      headers: {
        ...defaultHeaders,
        ...customOptions.headers,
      },
    });

    // Handle empty responses (204 No Content — e.g. for DELETE requests)
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      console.error(`API Error [${options.method || 'GET'}] ${url}:`, JSON.stringify(data, null, 2));
      const error: any = new Error(data.error?.message || 'API Request Failed');
      error.status = res.status;
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error(`[API Fetch Error] ${url}:`, error.message || error);
    throw error;
  }
}
