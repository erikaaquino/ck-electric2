import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Production WordPress on Kinsta
      {
        protocol: 'https',
        hostname: '*.kinsta.cloud',
      },
      // Google image proxy (used in some WP setups)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Stock images fallback
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Local DevKinsta development
      {
        protocol: 'http',
        hostname: 'testing2.local',
      },
      {
        protocol: 'https',
        hostname: 'testing2.local',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
