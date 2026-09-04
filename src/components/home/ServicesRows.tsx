import { GalleryImage } from '@/components/gallery/GalleryImage';
import { servicesMedia, servicesVideo, servicesVideoPoster } from '@/data/media';
import { RATE_DISCLAIMER, services } from '@/data/services';
import { formatRate } from '@/lib/format';
import { cn } from '@/lib/cn';
import { en } from '@/i18n/en';

/**
 * "Our Services": each row pairs a service with its picture (or the muted
 * looping video when it has none), alternating picture-left / text-left.
 */
export function ServicesRows() {
  return (
    <section id="services" className="container-site section" aria-labelledby="services-h">
      <h2 id="services-h" className="heading-gold mb-12">
        {en.services.ourServices}
      </h2>
      <div className="flex flex-col gap-14 lg:gap-20">
        {services.map((s, i) => {
          const textLeft = i % 2 === 1;
          const picture = servicesMedia[s.category];
          const media = picture ? (
            <GalleryImage
              image={picture}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full rounded"
              style={{ aspectRatio: `${picture.width} / ${picture.height}` }}
            />
          ) : (
            <video
              src={servicesVideo}
              poster={servicesVideoPoster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controlsList="nodownload"
              className="aspect-[16/9] w-full rounded object-cover"
              aria-hidden="true"
            />
          );
          return (
            <article key={s.category} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className={cn(textLeft && 'lg:order-2')}>{media}</div>
              <div className={cn(textLeft ? 'lg:order-1 lg:pr-12' : 'lg:pl-4')}>
                <h3 className="font-heading text-[1.75rem] font-medium leading-tight text-brass sm:text-[2.25rem]">
                  {String(i + 1).padStart(2, '0')} {s.name}
                </h3>
                <p className="mt-4 text-body text-ink">{s.summary}</p>
                <p className="mt-2 text-body text-ink">{s.discipline}.</p>
                <p className="mt-4 text-body-sm text-graphite">
                  {s.ratePerSqft === null ? en.services.onEnquiry : formatRate(s.ratePerSqft)} · {RATE_DISCLAIMER}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
