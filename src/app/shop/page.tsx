import React from 'react';
import Topbar from '@/components/sections/Topbar';
import { getProducts, getCategories, getProductsWithMeta } from '@/lib/strapi';
import Link from 'next/link';
import ProductListing from '@/components/ProductListing';
import Pagination from '@/components/Pagination';
import { Product } from '@/lib/types';
import { Metadata } from 'next';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category;

  if (category) {
    const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
      title: `${formattedCategory} | Kraft Treasure Shop`,
      description: `Discover our curated collection of handcrafted ${formattedCategory} from Arunachal Pradesh.`,
    };
  }

  return {
    title: 'Shop | Kraft Treasure Artisan Archive',
    description: 'Browse our full archive of authentic tribal handicrafts, pottery, and sacred deity masks.',
  };
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    category?: string; 
    q?: string; 
    sort?: string;
    min?: string;
    max?: string;
    cols?: string;
    page?: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category || '';
  const searchQuery = resolvedParams?.q || '';
  const currentSort = resolvedParams?.sort || 'newest';
  const minPrice = resolvedParams?.min || '';
  const maxPrice = resolvedParams?.max || '';
  const gridCols = resolvedParams?.cols || '4';
  const currentPage = parseInt(resolvedParams?.page || '1');
  const pageSize = 12;

  // Fetch data from Strapi with full filters and pagination
  const { products, meta } = await getProductsWithMeta({
    'filters[categories][slug][$eq]': currentCategory || undefined,
    'filters[name][$containsi]': searchQuery || undefined,
    'filters[price][$gte]': minPrice || undefined,
    'filters[price][$lte]': maxPrice || undefined,
    'sort[0]': currentSort === 'price_asc' ? 'price:asc' : currentSort === 'price_desc' ? 'price:desc' : 'createdAt:desc',
    'pagination[page]': currentPage,
    'pagination[pageSize]': pageSize,
  });

  const categories = await getCategories();

  // We still fetch absolute min/max for the slider range (from a broader query)
  // This could be optimized further with a specialized stats endpoint in Strapi
  const absoluteMin = 0;
  const absoluteMax = 500000; // Default max for the slider if not calculated

  // Pagination info from Strapi Meta
  const pageCount = meta?.pagination?.pageCount || 1;
  const totalItems = meta?.pagination?.total || 0;

  return (
    <div className="min-h-screen bg-white">
      <Topbar />

      {/* Hero Header */}
      <section className="mx-auto max-w-[1440px] px-6 pt-16 pb-12 text-center lg:px-12 lg:pt-24">
        <div className="max-w-5xl mx-auto">
          <p className="mb-4 font-sans text-[10px] font-bold tracking-[0.4em] text-[#C5AB7D] uppercase">Curated Shop</p>
          <h1 className="font-serif text-[34px] md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-tight mb-4">Shop the Living Craft Archive</h1>
          <p className="mx-auto mt-6 max-w-lg font-sans text-[12px] md:text-[14px] lg:text-[15px] leading-relaxed text-black/75">
            Browse handcrafted pieces from Kraft Treasure in a clean product-first catalog shaped by the same visual language as the homepage.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1440px] px-6 pb-28 lg:px-12 lg:pb-20">
        <ProductListing 
          initialProducts={products}
          categories={categories}
          absoluteMin={absoluteMin}
          absoluteMax={absoluteMax}
          initialMin={minPrice}
          initialMax={maxPrice}
          gridCols={gridCols}
          searchQuery={searchQuery}
          totalFound={totalItems}
        />
        
        <Pagination pageCount={pageCount} currentPage={currentPage} />
      </main>
    </div>
  );
}
