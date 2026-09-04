import { Carousel } from '@/components/ui/Carousel';
import { architectureSlides, flatSlides, interiorSlides, officeSlides } from '@/data/media';
import type { ImageAsset } from '@/types/project';
import { en } from '@/i18n/en';

function Gallery({ id, title, images }: { id?: string; title: string; images: readonly ImageAsset[] }) {
  if (images.length === 0) return null;
  return (
    <div id={id}>
      <h3 className="heading-orange mb-6">{title}</h3>
      <Carousel slides={images.map((image) => ({ image }))} label={title} />
    </div>
  );
}

/** Interior, Architecture, Flat and Corporate Office projects as fade carousels. */
export function CategoryGalleries() {
  const t = en.home.galleries;
  return (
    <section id="work" className="container-site pb-section-sm lg:pb-section-lg" aria-labelledby="galleries-h">
      <h2 id="galleries-h" className="sr-only">
        {t.title}
      </h2>
      <div className="flex flex-col gap-16">
        <Gallery title={t.interiors} images={interiorSlides} />
        <Gallery title={t.architecture} images={architectureSlides} />
        <Gallery id="flats" title={t.flats} images={flatSlides} />
        <Gallery id="offices" title={t.offices} images={officeSlides} />
      </div>
    </section>
  );
}
