import type { ImageAsset } from '@/types/project';
import { generatedImages } from '@/data/images.generated';

/**
 * Resolve a processed image by folder and file name, attaching the alt text.
 * Throws at module load if the asset is missing, so a typo fails loudly in dev.
 */
export function img(folder: string, name: string, alt: string): ImageAsset {
  const found = generatedImages[folder]?.find((a) => a.id === `${folder}/${name}`);
  if (!found) throw new Error(`Image not generated: ${folder}/${name}. Run "npm run images".`);
  return { ...found, alt };
}

/**
 * Every processed image in a folder, in filename order. `alt` receives the
 * 1-based position and the file name (without folder), so a lookup table of
 * written descriptions can be used with a generic fallback.
 */
export function folderImages(folder: string, alt: (n: number, name: string) => string): ImageAsset[] {
  return (generatedImages[folder] ?? []).map((a, i) => ({ ...a, alt: alt(i + 1, a.id.slice(folder.length + 1)) }));
}
