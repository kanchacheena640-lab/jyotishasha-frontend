import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";
import AdminAwareLayout from "@/components/AdminAwareLayout";
import "react-datepicker/dist/react-datepicker.css";

import { LanguageProvider } from "@/context/LanguageContext";
import LocationProvider from "@/components/location/LocationProvider";
import StickyAppDownloadCTA from "@/components/StickyAppDownloadCTA";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params?.locale || "en";

  return (
    <>
      {/* Google Tag Manager - Best Practice */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=GTM-WLP7T2DP'+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WLP7T2DP');
          `,
        }}
      />

      {/* Optional: GTM Noscript fallback (recommended for SEO & compliance) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WLP7T2DP"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <LanguageProvider initialLocale={locale}>
        <LocationProvider>
          <AdminAwareLayout>
            {children}
          </AdminAwareLayout>
        </LocationProvider>
      </LanguageProvider>

      {/* Sticky CTA */}
      <StickyAppDownloadCTA 
        utm={{ 
          source: "site_global", 
          medium: "sticky_cta", 
          campaign: "app_download" 
        }} 
      />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917007012255"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 z-50 bottom-[88px] md:bottom-4 
                   bg-green-500 hover:bg-green-600 text-white 
                   px-5 py-3.5 rounded-full shadow-xl flex items-center gap-2.5 
                   transition-all hover:scale-105 active:scale-95"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl" />
        <span className="font-medium text-sm md:text-base">Chat with us</span>
      </a>
    </>
  );
}