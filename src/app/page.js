import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Topbar from '@/components/sections/Topbar';
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

export default function Home() {
  return (
    <>
      <Topbar />
      <Header />
      <main className="bg-background text-foreground min-h-screen">
        <Hero />
        <Intro />
        <Collections />
        <Trending />
        <Heritage />
        <Marquee />
        <NewArrivals />
        <Adornments />
        <Testimonials />
        <ArtisanStories />
        <TimelessTreasures />
        <TrustedBy />
        <Instagram />
        <Features />
      </main>
      <Footer />
    </>
  );
}
