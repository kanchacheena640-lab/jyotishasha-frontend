"use client"; // 🚨 Client component banana zaroori hai hooks ke liye

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
      <Header /> 
      
      <main className="min-h-screen bg-[#020617] pt-20">
        {children}
      </main>
      
      <Footer />
    </I18nextProvider>
  );
}