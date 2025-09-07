'use client';

import { useEffect, useState } from 'react';
import i18n from '@/i18n'; // ✅ Adjust path based on your file
// OR from 'i18next' if directly configured globally

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const currentLang = i18n.language || 'en';
    setLanguage(currentLang);
    i18n.changeLanguage(currentLang); // ✅ now this will work
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  if (!language) return null;

  return (
    <div
      onClick={toggleLanguage}
      suppressHydrationWarning={true}
      className="cursor-pointer bg-[#1e1b4b] rounded-full px-1 py-1 flex items-center justify-between"
    >
      <div
        className={`px-1 py-1 font-semibold rounded-full transition-all duration-300 ${
          language === 'en' ? 'bg-white text-[#1e1b4b]' : 'text-white'
        }`}
      >
        EN
      </div>
      <div
        className={`px-1 py-1 font-semibold rounded-full transition-all duration-300 ${
          language === 'hi' ? 'bg-white text-[#1e1b4b]' : 'text-white'
        }`}
      >
        HI
      </div>
    </div>
  );
}
