import { AboutBand } from '@/components/home/AboutBand';
import { CategoryGalleries } from '@/components/home/CategoryGalleries';
import { Hero } from '@/components/home/Hero';
import { HomeContact } from '@/components/home/HomeContact';
import { ServicesRows } from '@/components/home/ServicesRows';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { heroSlides } from '@/data/media';
import { en } from '@/i18n/en';

/** One page: hero slider, About us, Interior / Architecture projects, Our Services, Contact us. */
export default function HomePage() {
  useDocumentMeta({ title: en.home.metaTitle, description: en.home.sub, image: heroSlides[0]?.image.src.card ?? '' });
  return (
    <>
      <Hero />
      <AboutBand />
      <CategoryGalleries />
      <ServicesRows />
      <HomeContact />
    </>
  );
}
