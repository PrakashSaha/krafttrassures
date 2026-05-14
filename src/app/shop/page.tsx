import React from 'react';
import Topbar from '@/components/sections/Topbar';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/strapi';
import Link from 'next/link';
import ProductListing from '@/components/ProductListing';
import { Product } from '@/lib/types';

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
  }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category || '';
  const searchQuery = resolvedParams?.q || '';
  const currentSort = resolvedParams?.sort || 'newest';
  const minPrice = resolvedParams?.min || '';
  const maxPrice = resolvedParams?.max || '';
  const gridCols = resolvedParams?.cols || '4';

  // Fetch data from Strapi (omitting price filters to calculate absolute range)
  const [allMatchingProducts, categories] = await Promise.all([
    getProducts({
      'filters[categories][slug][$eq]': currentCategory || undefined,
      'filters[name][$containsi]': searchQuery || undefined,
      'sort[0]': currentSort === 'price_asc' ? 'price:asc' : currentSort === 'price_desc' ? 'price:desc' : 'createdAt:desc',
      'pagination[pageSize]': 100,
    }),
    getCategories(),
  ]);

  // Calculate absolute min/max from all matching products for placeholders
  const prices: (number | string)[] = allMatchingProducts.map((p: Product) => p.price).filter((p: any) => p != null);
  const numericPrices: number[] = prices.map(p => typeof p === 'string' ? parseFloat(p.replace(/[₹,]/g, '')) : Number(p));
  const absoluteMin = numericPrices.length > 0 ? Math.min(...numericPrices) : 0;
  const absoluteMax = numericPrices.length > 0 ? Math.max(...numericPrices) : 0;

  // Filter products for display based on user-selected price range
  const products = allMatchingProducts.filter((p: Product) => {
    const price = typeof p.price === 'string' ? parseFloat((p.price as string).replace(/[₹,]/g, '')) : (p.price as number) || 0;
    const min = minPrice ? parseInt(minPrice) : -Infinity;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    return price >= min && price <= max;
  });

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
          initialProducts={allMatchingProducts}
          categories={categories}
          absoluteMin={absoluteMin}
          absoluteMax={absoluteMax}
          initialMin={minPrice}
          initialMax={maxPrice}
          gridCols={gridCols}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}
