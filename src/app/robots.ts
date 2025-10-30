import type { MetadataRoute } from 'next';
import env from '@/env';

export default function robots(): MetadataRoute.Robots {
  // Disable crawling for preview and development environments
  // This aligns with the X-Robots-Tag header set in next.config.mjs
  const isPreviewOrDevelopment =
    process.env.VERCEL_ENV === 'preview' ||
    process.env.VERCEL_ENV === 'development';

  if (isPreviewOrDevelopment) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    };
  }

  // Production rules - allow only specific routes
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/'],
    },
    sitemap: `${env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
