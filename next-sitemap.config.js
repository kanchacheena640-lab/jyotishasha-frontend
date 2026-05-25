/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.jyotishasha.com',

  generateRobotsTxt: true,

  sitemapSize: 5000,

  changefreq: 'daily',

  priority: 0.7,

  exclude: [
    '/admin/*',
    '/login',
    '/processing',
    '/api/*',
    '/test-transit',
  ],

  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.jyotishasha.com/sitemap.xml',
    ],
  },
};