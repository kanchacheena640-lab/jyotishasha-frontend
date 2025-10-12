const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
      },
    ];
  },
 // 👇 Added: allow AstroBlog images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'astroblog.in',
      },
      {
        protocol: 'https',
        hostname: 'www.astroblog.in',
      },
    ],
  },
};
module.exports = nextConfig;
