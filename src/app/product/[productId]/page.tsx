import { getProductById } from '@/lib/strapi';
import ProductDetailView from '@/components/ProductDetailView';
import Link from 'next/link';
import Topbar from '@/components/sections/Topbar';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return {
      title: 'Product Not Found | Kraft Treasure',
    };
  }

  return {
    title: `${product.name} | Kraft Treasure`,
    description: product.description?.substring(0, 160) || `Explore the authentic ${product.name} handcrafted in Arunachal Pradesh.`,
    openGraph: {
      title: product.name,
      description: product.description?.substring(0, 160),
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProductById(productId);

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

  // Fetch related products from the same category
  const { getProducts } = await import('@/lib/strapi');
  const relatedProducts = await getProducts({
    'filters[categories][label][$eq]': product.category,
    'filters[documentId][$ne]': product.productId, // Don't show current product
    'pagination[pageSize]': 4
  });

  return (
    <>
      <Topbar />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
