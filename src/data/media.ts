import type { Category, ImageAsset } from '@/types/project';
import { folderImages, img } from '@/data/images';

/**
 * Home page media: hero slider backgrounds, the Interior Projects and
 * Architecture Projects carousels, the services images and video, and the
 * contact background. Raw files live in assets/raw/<folder>; run
 * `npm run images` after changing them.
 */
const two = (n: number) => String(n).padStart(2, '0');

export const heroSlides: readonly { image: ImageAsset }[] = [
  { image: img('hero', 'hero-01', 'Interior with a dark kitchen island and dining table') },
  { image: img('hero', 'hero-02', 'Interior living space') },
];

/** Interior Projects: every file in assets/raw/interior (interior-01, interior-02 …). */
export const interiorSlides: readonly ImageAsset[] = folderImages('interior', (n) => `Interior project ${n}`);

export const architectureSlides: readonly ImageAsset[] = Array.from({ length: 3 }, (_, i) =>
  img('architecture', `architecture-${two(i + 1)}`, `Architecture project ${i + 1}`),
);

/** Flat Projects: every file in assets/raw/flats (flat-01.jpg, flat-02.jpg …). The section hides when empty. */
export const flatSlides: readonly ImageAsset[] = folderImages('flats', (n) => `Flat project ${n}, building elevation`);

/** Commercial Projects: shops, showrooms and salons in assets/raw/commercial. The section hides when empty. */
export const commercialSlides: readonly ImageAsset[] = folderImages('commercial', (n) => `Commercial project ${n}`);

/** Corporate Offices: every file in assets/raw/offices (office-01.jpg, office-02.jpg …). The section hides when empty. */
export const officeSlides: readonly ImageAsset[] = folderImages('offices', (n) => `Corporate office project ${n}`);

export const servicesVideo = '/video/office.mp4';

/** One picture per service row; a row without a picture shows the video. */
export const servicesMedia: Readonly<Partial<Record<Category, ImageAsset>>> = {
  'residential-flat': img('services', 'bedroom-01', 'Bedroom with a blue headboard, study desk and sports wall art'),
  'industrial-project': img('services', 'dining-01', 'Dining nook with a white brick wall beside an open kitchen'),
  'interior-turnkey': img('services', 'living-01', 'Living room with teal sofas and a fluted feature wall'),
  'corporate-office': img('services', 'meeting-01', 'Meeting room with a long table and eight chairs'),
  'construction-turnkey': img('services', 'villa-01', 'Three-storey villa elevation with wood cladding and louvres'),
};
export const contactBackground = '/img/banners/contact.jpg';
