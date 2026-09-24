"use client"; // 🚨 Client component banana zaroori hai hooks ke liye

import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

// 🌐 i18n ko yahan bhi initialize karna padega kyunki ye locale se bahar hai
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en', 
    resources: {
      en: { translation: {} },
      hi: { translation: {} }
    }
  });
}

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nextProvider i18n={i18n}>
      {/* Reports Ads P0.2A -- the EXISTING Google Tag Manager container
          (GTM-WLP7T2DP, the same one app/[locale]/layout.tsx loads) for this
          separate /reports route tree, so the original-report funnel and
          purchase events reach GTM. Consent ordering is unchanged: the root
          layout's beforeInteractive consent-default script always runs first.
          It cannot double-load: it uses the SAME Script id as the [locale]
          layout (Next.js runs a given id once per document, including across
          client-side navigation between the two trees) AND self-checks for an
          existing gtm.js tag for this container before injecting. */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              if (d.querySelector('script[src*="googletagmanager.com/gtm.js?id='+i+'"]')) return;
              w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WLP7T2DP');
          `,
        }}
      />
      <Header />
      
      <main className="min-h-screen bg-[#020617] pt-20">
        {children}
      </main>
      
      <Footer />
    </I18nextProvider>
  );
}