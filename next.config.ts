import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io',
      },
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pinecone.io',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year for static CDN assets
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
};

export default nextConfig;
