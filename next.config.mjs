import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  headers: () => {
    // Disable indexing for Vercel preview deployments. For more information, see:
    // https://vercel.com/guides/are-vercel-preview-deployment-indexed-by-search-engines
    const headers = [];
    if (
      process.env.VERCEL_ENV === 'preview' ||
      process.env.VERCEL_ENV === 'development'
    ) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
};

export default withSentryConfig(nextConfig, {
  org: 'zerodays',
  project: 'nextjs-template',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
