/**
 * Canonical origin of the live site, without a trailing slash. Used for the
 * canonical link, Open Graph URL and structured data. Must match the address
 * in index.html, public/robots.txt and public/sitemap.xml. Change all four
 * together if the site moves to a custom domain.
 */
export const SITE_URL = 'https://unityquickkraft.vercel.app';

/** 1200 x 630 share image in public/. */
export const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;
