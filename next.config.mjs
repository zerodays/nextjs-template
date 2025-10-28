/** @type {import('next').NextConfig} */
const nextConfig = {
  // This allows importing markdown files as raw strings
  // Example: import markdown from './file.md';
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },

  // Turbopack configuration for markdown files
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
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

export default nextConfig;
