import type { MetadataRoute } from 'next';
import env from '@/env';
import { LOCALES } from '@/i18n/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  const routes = ['/']; // Add routes here

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '/' ? 1 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
