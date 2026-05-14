import React from 'react';
import { getProductBySlug } from '@/lib/strapi';
import ProductDetailView from '@/components/ProductDetailView';
import Link from 'next/link';
import Topbar from '@/components/sections/Topbar';

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Piece Not Found</h1>
          <p className="mb-8 font-sans text-black/50">This item might have been moved or removed from our archive.</p>
          <Link href="/shop" className="inline-flex border border-black/10 px-12 py-5 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all">
            Back To Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <ProductDetailView product={product} />
    </>
  );
}
