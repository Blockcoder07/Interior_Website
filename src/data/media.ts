import type { Category, ImageAsset } from '@/types/project';
import { folderImages, img } from '@/data/images';

/**
 * Home page media: hero slider backgrounds, the project carousels, the
 * services images and video, and the contact background. Raw files live in
 * assets/raw/<folder>; run `npm run images` after changing them. Alt text is
 * written per file below; a file without an entry gets a generic line.
 */
const two = (n: number) => String(n).padStart(2, '0');

const describe = (table: Record<string, string>, fallback: (n: number) => string) => (n: number, name: string) =>
  table[name] ?? fallback(n);

export const heroSlides: readonly { image: ImageAsset }[] = [
  { image: img('hero', 'hero-01', 'Executive cabin with a white desk, leather chairs and a wall-sized architectural sketch') },
  { image: img('hero', 'hero-02', 'Lounge with a grey sofa, round wooden table and a geometric feature wall') },
];

const interiorAlt: Record<string, string> = {
  'interior-01': 'Double-height hall with ring-shaped wooden pendant lights beside a wooden door',
  'interior-02': 'Window seat with cushions and indoor plants beside a wooden armchair',
  'interior-03': 'Wooden staircase behind an open shelving partition',
  'interior-04': 'Grey L-shaped sofa against a panelled feature wall',
  'interior-05': 'Study corner with blue cabinets, white desk and a round mirror',
  'interior-06': 'Balcony lounge with rattan chairs, a side table and sheer curtains',
  'interior-07': 'Bedroom with an arched headboard niche and wooden wardrobes',
  'interior-08': 'White modular kitchen with handleless cabinets and a window',
  'interior-09': 'Living room with a wooden slat partition and a round coffee table',
  'interior-10': 'White kitchen with a black backsplash and built-in oven',
  'interior-11': 'Entrance foyer with a cluster of shaped mirrors and a wooden console',
  'interior-12': 'Bedroom with a round porthole window, wooden bed and floral panel',
  'interior-13': 'Home mandir with a golden Ganesha idol, carved arch and hanging bells',
  'interior-14': 'Bedroom with a grey bed, wooden wardrobe and a floating shelf',
  'interior-15': 'Dining area with grey chairs, a teal bench and a lit ceiling cove',
  'interior-16': 'White L-shaped kitchen with a breakfast counter and bar stools',
  'interior-17': 'Living room with a sage-green sofa and a wooden display partition',
  'interior-18': 'TV unit with wooden shelves, a wall clock and potted plants',
  'interior-19': 'Bedroom with a teal bed, white wardrobe and round wooden accents',
  'interior-20': 'Open living room with a pink sofa, dining table and a kitchen beyond',
  'interior-21': "Children's bedroom with a Captain America shield above a city-skyline headboard",
  'interior-22': 'Bedroom with a green upholstered bed and a wooden panelled wall',
  'interior-23': 'Dining room with green chairs, a display shelf and a marble table',
  'interior-24': 'Living room with a teal sofa and a grey panelled wall with brass wall art',
  'interior-25': 'Teal L-shaped sofa with round wall plates and sheer curtains',
  'interior-26': 'Bedroom with a blue feature wall, round headboard cushions and pendant lamps',
  'interior-27': 'Dining nook with a white brick wall, wall clock and a round-window partition',
  'interior-28': 'Living room with a pink L-shaped sofa and a fluted wall with a lit cove',
  'interior-29': 'Living and dining area with a teal sofa and gold-lined wall panels',
  'interior-30': 'Bedroom with a teal headboard and a circular niche in the panelled wall',
  'interior-31': 'Dining area with pink chairs and an arched wall panel',
  'interior-32': 'White modular kitchen with a chimney hood and a marble backsplash',
  'interior-33': 'Living room with a TV on a marble wall beside a staircase',
  'interior-34': 'Bedroom with a pink bed, dark wooden panelling and round mirrors',
  'interior-35': 'Living room with a pink sofa and arched wall panels',
  'interior-36': 'Dining table with blue chairs beside a wooden wardrobe',
  'interior-37': 'Living room with a teal sofa and a sunburst wall panel',
  'interior-38': 'TV unit with a red back panel and a curved lit ceiling',
};

export const interiorSlides: readonly ImageAsset[] = folderImages('interior', describe(interiorAlt, (n) => `Interior project ${n}`));

const architectureAlt: Record<string, string> = {
  'architecture-01': 'Three-storey house with an exposed brick facade, glass balcony and rooftop pergola',
  'architecture-02': 'White house with a brick accent wall and a perforated jali screen on the front',
  'architecture-03': 'Cream two-storey house with a corner balcony, wooden soffit and trees',
};
export const architectureSlides: readonly ImageAsset[] = Array.from({ length: 3 }, (_, i) => {
  const name = `architecture-${two(i + 1)}`;
  return img('architecture', name, architectureAlt[name] ?? `Architecture project ${i + 1}`);
});

const flatAlt: Record<string, string> = {
  'flat-01': 'Three-storey villa with wood cladding, louvred screen and a rooftop pergola at dusk',
  'flat-02': 'Grey two-storey villa with wooden slats and a lit porch at night',
  'flat-03': 'White villa with a lattice pergola over the terrace',
  'flat-04': 'Modern villa with a wooden entrance canopy and a blue car in the drive',
  'flat-05': 'Two-storey villa with stone cladding and a cantilevered balcony',
  'flat-06': 'Villa with a wooden accent wall and glass balcony railing at dusk',
  'flat-07': 'Corner villa with terracotta accents and a tree-lined street',
  'flat-08': 'Villa with an orange brick feature wall and a compound gate',
  'flat-09': 'Aerial view of a villa with a terrace pergola and lawn',
  'flat-10': 'Villa with a lit entrance porch and boundary wall at evening',
  'flat-11': 'Aerial view of a villa plot with parking and a rooftop pool',
  'flat-12': 'Villa elevation with wood-finish panels and a garden at evening',
  'flat-13': 'White three-storey villa with a lattice screen and balconies',
  'flat-14': 'White villa with a rooftop pergola and a wide terrace',
};
export const flatSlides: readonly ImageAsset[] = folderImages('flats', describe(flatAlt, (n) => `Flat project ${n}, building elevation`));

const commercialAlt: Record<string, string> = {
  'commercial-01': 'Garment store with fabric rolls displayed in circular frames beside a staircase',
  'commercial-02': 'Garment store counter with a lit base and shelves of folded fabric',
  'commercial-03': 'Garment store with a metal-slat staircase screen and herringbone flooring',
  'commercial-04': 'Optical showroom with branded display cabinets and pink seating',
  'commercial-05': 'Optical showroom with a circular mirror partition and lit shelving',
  'commercial-06': 'Optical showroom seating area with brand names on the wall',
  'commercial-07': 'Salon with black styling chairs and lit mirrors along a grey wall',
  'commercial-08': 'Salon with two styling stations and framed portraits',
  'commercial-09': 'Salon reception with a product shelf and a lit arch mirror',
  'commercial-10': 'Salon lounge with dark walls and a display of bottles',
  'commercial-11': 'Salon bar counter with stools and wall-mounted bottle display',
  'commercial-12': 'Salon styling chairs with backlit mirrors and a product wall',
};
export const commercialSlides: readonly ImageAsset[] = folderImages('commercial', describe(commercialAlt, (n) => `Commercial project ${n}`));

const officeAlt: Record<string, string> = {
  'office-01': 'Executive cabin with a white desk, two leather visitor chairs and a wall sketch',
};
export const officeSlides: readonly ImageAsset[] = folderImages('offices', describe(officeAlt, (n) => `Corporate office project ${n}`));

/** 720p, 25 fps, silent, about 5 MB; the poster shows until it plays. */
export const servicesVideo = '/video/office.mp4';
export const servicesVideoPoster = '/video/office-poster.jpg';

/** One picture per service row; a row without a picture shows the video. */
export const servicesMedia: Readonly<Partial<Record<Category, ImageAsset>>> = {
  'residential-flat': img('services', 'bedroom-01', 'Bedroom with a blue headboard, study desk and sports wall art'),
  'industrial-project': img('services', 'dining-01', 'Dining nook with a white brick wall beside an open kitchen'),
  'interior-turnkey': img('services', 'living-01', 'Living room with teal sofas and a fluted feature wall'),
  'corporate-office': img('services', 'cabin-01', 'Executive cabin with a white desk, leather chairs and a wall sketch'),
  'construction-turnkey': img('services', 'villa-01', 'Three-storey villa elevation with wood cladding and louvres'),
};
export const contactBackground = '/img/banners/contact.jpg';
