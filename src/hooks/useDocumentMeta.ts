import { useEffect } from 'react';
import { business } from '@/data/business';

interface Meta {
  title: string;
  description: string;
  /** Absolute or root-relative image path for og:image. */
  image?: string;
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

/** Per-route <title>, description and OG tags — Section 12. */
export function useDocumentMeta({ title, description, image }: Meta): void {
  useEffect(() => {
    const full = `${title} | ${business.shortName}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', window.location.href.split('#')[0] ?? window.location.href);
    if (image) setMeta('property', 'og:image', new URL(image, window.location.origin).toString());
  }, [title, description, image]);
}
