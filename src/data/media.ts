import type { ImageAsset } from '@/types/project';
import { folderImages, img } from '@/data/images';

/**
 * Home page media: hero slider backgrounds, the Interior Projects and
 * Architecture Projects carousels, the services image and video, and the
 * contact background. Raw files live in assets/raw/<folder>; run
 * `npm run images` after changing them.
 */
const two = (n: number) => String(n).padStart(2, '0');

export const heroSlides: readonly { image: ImageAsset }[] = [
  { image: img('hero', 'hero-01', 'Interior with a dark kitchen island and dining table') },
  { image: img('hero', 'hero-02', 'Interior living space') },
];

export const interiorSlides: readonly ImageAsset[] = Array.from({ length: 24 }, (_, i) =>
  img('interior', `interior-${two(i + 1)}`, `Interior project ${i + 1}`),
);

export const architectureSlides: readonly ImageAsset[] = Array.from({ length: 3 }, (_, i) =>
  img('architecture', `architecture-${two(i + 1)}`, `Architecture project ${i + 1}`),
);

/** Flat Projects: every file in assets/raw/flats (flat-01.jpg, flat-02.jpg …). The section hides when empty. */
export const flatSlides: readonly ImageAsset[] = folderImages('flats', (n) => `Flat project ${n}, building elevation`);

/** Corporate Offices: every file in assets/raw/offices (office-01.jpg, office-02.jpg …). The section hides when empty. */
export const officeSlides: readonly ImageAsset[] = folderImages('offices', (n) => `Corporate office project ${n}`);

export const servicesImage: ImageAsset = img('services', 'office-01', 'Office interior with workstations');

export const servicesVideo = '/video/office.mp4';
export const contactBackground = '/img/banners/contact.jpg';
