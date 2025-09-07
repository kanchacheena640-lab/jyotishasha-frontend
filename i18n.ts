// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "./locales/en/common.json";
import commonHi from "./locales/hi/common.json";
import toolsEn from "./locales/en/tools.json";
import toolsHi from "./locales/hi/tools.json";
import reportsEn from "./locales/en/reports.json";
import reportsHi from "./locales/hi/reports.json";
import horoscopeEn from "./locales/en/horoscope.json";
import horoscopeHi from "./locales/hi/horoscope.json";

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn,
        tools: toolsEn,
        reports: reportsEn,
        horoscope: horoscopeEn,
      },
      hi: {
        common: commonHi,
        tools: toolsHi,
        reports: reportsHi,
        horoscope: horoscopeHi,
      },
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["common", "tools", "reports", "horoscope"],
    defaultNS: "common",

    // ✅ Hydration-safe: disable Suspense on both server & client
    react: { useSuspense: false },

    interpolation: { escapeValue: false },

    // Optional niceties
    returnNull: false,     // show keys/fallbacks instead of null
    cleanCode: true,       // trim whitespace in keys
    debug: false,
  });

export default i18n;
