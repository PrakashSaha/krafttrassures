interface FetchOptions extends RequestInit {
  token?: string;
  params?: Record<string, any>;
}

export async function fetchAPI(path: string, options: FetchOptions = {}) {
  const { token, params, ...customOptions } = options;

  // Automatically prepend /api if the path doesn't start with it
  // and ensure we don't double it if the caller already included it
  const cleanPath = path.startsWith('/api') ? path.substring(4) : path;
  let url = `/api/strapi${cleanPath}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => searchParams.append(`${key}[${index}]`, String(item)));
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
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
      if (res.status === 401) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('strapi-unauthorized'));
        }
      }
      console.error(`API Error [${options.method || 'GET'}] ${url}:`, JSON.stringify(data, null, 2));
      const error: any = new Error(data.error?.message || 'API Request Failed');
      error.status = res.status;
      throw error;
    }

    return data;
  } catch (error: any) {
    if (error.status !== 401) {
      console.error(`[API Fetch Error] ${url}:`, error.message || error);
    }
    throw error;
  }

}

/**
 * Formats a relation for Strapi v5, handling both numeric IDs and string documentIds.
 */
export function formatRelation(idOrDocId: string | number | undefined | null) {
  if (!idOrDocId) return null;
  
  // If it's a number, use the id key
  if (typeof idOrDocId === 'number') {
    return { connect: [{ id: idOrDocId }] };
  }
  
  // If it's a string that consists only of digits, it's likely a numeric ID
  if (typeof idOrDocId === 'string' && /^\d+$/.test(idOrDocId)) {
    return { connect: [{ id: parseInt(idOrDocId, 10) }] };
  }
  
  // Otherwise, treat it as a documentId
  return { connect: [{ documentId: String(idOrDocId) }] };
}
