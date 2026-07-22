import React from 'react';
import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Collections from '@/components/sections/Collections';
import Trending from '@/components/sections/Trending';
import Heritage from '@/components/sections/Heritage';
import Marquee from '@/components/sections/Marquee';
import NewArrivals from '@/components/sections/NewArrivals';
import Adornments from '@/components/sections/Adornments';
import Testimonials from '@/components/sections/Testimonials';
import ArtisanStories from '@/components/sections/ArtisanStories';
import TimelessTreasures from '@/components/sections/TimelessTreasures';
import TrustedBy from '@/components/sections/TrustedBy';
import Instagram from '@/components/sections/Instagram';
import Features from '@/components/sections/Features';
import { getHeroSliders, getProducts, getCategories, getTestimonials, getStorySteps, getInstagramFeeds, getAdornments } from '@/lib/strapi';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<any> }): Promise<Metadata> {
  
  const t = await getTranslations('hero');
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function Home({ params }: { params: Promise<any> }) {
  
  // Parallel fetching for all sections
  const [
    heroSlides, 
    trendingProducts,
    newArrivals,
    categories, 
    testimonials, 
    storySteps, 
    instagramFeeds,
    treasureProducts,
    adornmentItems
  ] = await Promise.all([
    getHeroSliders(),
    getProducts({ 'pagination[pageSize]': 5, 'sort[0]': 'updatedAt:desc' }),
    getProducts({ 'pagination[pageSize]': 8, 'sort[0]': 'createdAt:desc' }),
    getCategories(),
    getTestimonials(),
    getStorySteps(),
    getInstagramFeeds(),
    getProducts({ 'pagination[pageSize]': 10, 'sort[0]': 'price:desc' }),
    getAdornments()
  ]);

  // Keep the storefront complete while optional CMS sections are being curated.
  const productsWithImages = [...newArrivals, ...trendingProducts, ...treasureProducts]
    .filter((product, index, products) =>
      Boolean(product.thumbnail || product.image) &&
      products.findIndex(({ id }) => id === product.id) === index
    );

  const displayedHeroSlides = heroSlides.length > 0 ? heroSlides : productsWithImages.slice(0, 5).map((product) => ({
    title: 'Ancient Artistry Meets Luxury',
    subtitle: product.description || 'Discover original tribal crafts from Arunachal Pradesh.',
    name: product.name,
    img: product.thumbnail || product.image || '',
    href: product.href,
  }));

  const displayedAdornments = adornmentItems.length > 0 ? adornmentItems : productsWithImages.slice(0, 4).map((product) => ({
    title: product.name,
    subtitle: product.category,
    priceText: `₹${product.price.toLocaleString('en-IN')}`,
    image: product.thumbnail || product.image || '',
    href: product.href,
  }));

  const displayedInstagramFeeds = instagramFeeds.some(({ image }) => image)
    ? instagramFeeds.filter(({ image }) => image)
    : productsWithImages.slice(0, 4).map((product) => ({
        id: product.id,
        image: product.thumbnail || product.image || '',
        link: product.href,
      }));

  return (
    <>
      <main className="min-h-screen bg-white">
        <Hero slides={displayedHeroSlides} />
        <Intro />
        <Collections categories={categories} />
        <Trending products={trendingProducts} />
        <Heritage />
        <Marquee />
        <NewArrivals products={newArrivals} />
        <Adornments items={displayedAdornments} />
        <Testimonials reviews={testimonials} />
        <ArtisanStories steps={storySteps} />
        <TimelessTreasures products={treasureProducts} />
        <TrustedBy />
        <Instagram posts={displayedInstagramFeeds} />
        <Features />
      </main>
    </>
  );
}
