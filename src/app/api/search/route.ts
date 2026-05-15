import { NextResponse } from 'next/server';
import { getProductsWithMeta } from '@/lib/strapi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');

  // We now allow fetching without filters to support the "All Items" initial view
  const isInitialLoad = !query && !category;

  try {
    const filters: any = {
      filters: {}
    };
    
    // Add Search Query Filter
    if (query) {
      filters.filters.$or = [
        { name: { $containsi: query } },
        { description: { $containsi: query } }
      ];
    }

    // Add Category Filter
    if (category) {
      filters.filters.categories = {
        slug: { $eq: category }
      };
    }

    filters['pagination[page]'] = page;
    filters['pagination[pageSize]'] = 8; // Small chunks for smooth infinite scroll

    const { products, meta } = await getProductsWithMeta(filters);

    return NextResponse.json({ products, meta });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
