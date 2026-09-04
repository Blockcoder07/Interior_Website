/** Data model for images and services. */

export type Category =
  | 'residential-flat'
  | 'commercial-building'
  | 'industrial-project'
  | 'interior-turnkey'
  | 'corporate-office'
  | 'construction-turnkey';

/** Room kind inferred from a raw filename by scripts/process-images.mjs. */
export type RoomKind =
  | 'living'
  | 'dining'
  | 'kitchen'
  | 'master-bedroom'
  | 'bedroom'
  | 'kids-room'
  | 'guest-bedroom'
  | 'pooja'
  | 'bathroom'
  | 'balcony'
  | 'utility'
  | 'study'
  | 'wardrobe'
  | 'foyer'
  | 'terrace'
  | 'reception'
  | 'workstation'
  | 'cabin'
  | 'conference'
  | 'pantry';

export interface ImageVariantSet {
  full: string;
  card: string;
  thumb: string;
}

export interface ImageAsset {
  /** '{folder}/{name}' */
  id: string;
  src: ImageVariantSet; // 1600 / 800 / 400 px wide, jpg
  webp: ImageVariantSet;
  width: number;
  height: number;
  lqip: string; // data URI, 20px blur placeholder
  alt: string;
  roomKind?: RoomKind;
  credit?: string;
  variantOf?: string;
}
