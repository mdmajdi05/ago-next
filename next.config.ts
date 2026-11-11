import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  // Disable streamed metadata for every user agent. Next.js otherwise moves
  // <title>, <meta> and the canonical link into the body for user agents that
  // are not in its HTML-limited bot list; several crawlers then report the
  // directives as "outside <head>" and may ignore them.
  htmlLimitedBots: /.*/,
  outputFileTracingIncludes: {
    '/**': ['./src/data/static/products/legacy-catalog.json'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agoaviation.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.agoaviation.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Performance headers for caching and security
  async redirects() {
    return [
      {
        source: '/sitemap-index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
