import { useEffect } from 'react';
import { business } from '@/data/business';
import { SHARE_IMAGE, SITE_URL } from '@/data/site';

interface Meta {
  title: string;
  description: string;
  /** Absolute or root-relative image path for og:image; defaults to the site share image. */
  image?: string;
  /** Path of the page, e.g. '/' — used for the canonical and og:url. */
  path?: string;
  /** Keep the page out of search results (404 and the like). */
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-route <title>, description, canonical and social tags. The static tags
 * in index.html cover crawlers that do not run JavaScript; this keeps them in
 * step once the app has rendered.
 */
export function useDocumentMeta({ title, description, image, path = '/', noindex = false }: Meta): void {
  useEffect(() => {
    const full = title.includes(business.shortName) ? title : `${title} | ${business.legalName}`;
    const url = `${SITE_URL}${path}`;
    const img = image ? new URL(image, SITE_URL).toString() : SHARE_IMAGE;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setLink('canonical', url);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
  }, [title, description, image, path, noindex]);
}
