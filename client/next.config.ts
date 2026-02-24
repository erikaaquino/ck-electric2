import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['testing2.local'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'testing2.local',
      },
      {
        protocol: 'https',
        hostname: 'testing2.local',
      },
    ],
  },
};

export default nextConfig;
