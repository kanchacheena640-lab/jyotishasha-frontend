module.exports = {
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
    localeDetection: false, // 👈 YE LINE ADD ki in new implementation
  },
  ns: ['common', 'home'],       // 👍 यह अब बाहर है
  defaultNS: 'common',
};