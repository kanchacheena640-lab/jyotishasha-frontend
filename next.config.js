/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Yahan se i18n hata diya gaya hai taaki App Router ([locale]) chal sake

  async rewrites() {
    return [
      // ✅ Backend API proxy
      {
        source: '/api/:path*', 
        destination: 'https://jyotishasha-backend.onrender.com/api/:path*', 
      },
      // ✅ Planet → Ascendant → House rewrite (ALL planets)
     
    ];
  },

  async redirects() {
    return [
      {
        source: '/tools/free-kundali',
        destination: '/free-kundali',
        permanent: true,
      },
       // ✅ Holi year redirect
      {
        source: '/holi/:year(\\d{4})',
        destination: '/holi-:year',
        permanent: true,
      },
      {
        source: '/:planet-transit/:ascendant/house/:house(\\d+)',
        destination: '/:planet-transit/:ascendant/house-:house',
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'astroblog.in' },
      { protocol: 'https', hostname: 'www.astroblog.in' },
      { protocol: 'https', hostname: 'jyotishasha-backend.onrender.com' },
    ],
  },
};

module.exports = nextConfig;