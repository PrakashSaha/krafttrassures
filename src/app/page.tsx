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

export default async function Home() {
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

  return (
    <>
      <main className="min-h-screen bg-white">
        <Hero slides={heroSlides} />
        <Intro />
        <Collections categories={categories} />
        <Trending products={trendingProducts} />
        <Heritage />
        <Marquee />
        <NewArrivals products={newArrivals} />
        <Adornments items={adornmentItems} />
        <Testimonials reviews={testimonials} />
        <ArtisanStories steps={storySteps} />
        <TimelessTreasures products={treasureProducts} />
        <TrustedBy />
        <Instagram posts={instagramFeeds} />
        <Features />
      </main>
    </>
  );
}
