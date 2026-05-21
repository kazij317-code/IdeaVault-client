import FeaturedIdeas from '@/components/FeaturedIdeas';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import PopularCategories from '@/components/PopularCategories';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedIdeas />

      <PopularCategories/>
      <Features />
    </div>
  );
}
