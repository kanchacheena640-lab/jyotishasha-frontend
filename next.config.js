/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Yahan se i18n hata diya gaya hai taaki App Router ([locale]) chal sake

  async rewrites() {
    return [
      // ✅ Backend API proxy (legacy direct-to-Flask endpoints, e.g.
      // /api/full-kundali). Explicitly excludes /api/admin/* -- those
      // are the Next.js Admin BFF routes (app/api/admin/**/route.ts:
      // auth, app-version, users), which must always be served by this
      // app's own filesystem routes, never proxied straight to Flask
      // (architecture requirement: browser -> BFF -> Flask, never
      // browser -> Flask directly, for anything admin-gated). Users
      // Module U2 found this rule's original unrestricted `/api/:path*`
      // form was intercepting the new nested /api/admin/users/[id]
      // route under local testing -- narrowed here, verified by direct
      // reproduction of the bug and the fix.
      {
        source: '/api/:path((?!admin/).*)',
        destination: 'https://jyotishasha-backend.onrender.com/api/:path',
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