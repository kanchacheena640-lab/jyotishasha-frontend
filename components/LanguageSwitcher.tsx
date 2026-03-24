'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import i18n from '@/i18n'; 

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<string | null>(null);
  const pathname = usePathname(); 
  const router = useRouter();

  useEffect(() => {
    let currentLang = 'en'; // Default is always English

    if (pathname.startsWith('/reports')) {
      // Reports page (Locale ke bahar)
      currentLang = i18n.language?.startsWith('hi') ? 'hi' : 'en';
    } else {
      // Normal pages: Agar '/hi' hai toh Hindi, baaki sab kuch English
      currentLang = pathname.startsWith('/hi') ? 'hi' : 'en';
    }

    setLanguage(currentLang);
    i18n.changeLanguage(currentLang);
  }, [pathname, i18n.language]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    
    // 1. i18next badlo aur state update karo
    i18n.changeLanguage(newLang);
    setLanguage(newLang);

    // 2. 🛡️ THE SHIELD: Reports page par URL mat chhedo
    if (pathname.startsWith('/reports')) {
      return; 
    }

    // 3. 🚀 SEO-FRIENDLY URL LOGIC (No more '/en')
    // Sabse pehle agar URL mein galti se '/en' fasa hai toh use nikal do
    const cleanPathname = pathname.replace(/^\/en(\/|$)/, '/') || '/';
    
    let newPath = cleanPathname;

    if (newLang === 'hi') {
      // English se Hindi jana hai: '/tools' -> '/hi/tools', '/' -> '/hi'
      newPath = cleanPathname === '/' ? '/hi' : `/hi${cleanPathname}`;
    } else {
      // Hindi se English aana hai: '/hi/tools' -> '/tools', '/hi' -> '/'
      newPath = cleanPathname.replace(/^\/hi(\/|$)/, '/') || '/';
      
      // Clean up double slashes just in case (e.g. '//tools' -> '/tools')
      newPath = newPath.replace(/\/\//g, '/');
      if (newPath.length > 1 && newPath.endsWith('/')) {
        newPath = newPath.slice(0, -1);
      }
    }

    router.push(newPath); 
  };

  if (!language) return null;

  return (
    <div
      onClick={toggleLanguage}
      className="cursor-pointer bg-[#1e1b4b] rounded-full px-1 py-1 flex items-center justify-between w-16 shadow-inner border border-purple-800/50 hover:border-purple-500 transition-colors"
    >
      <div
        className={`px-2 py-1 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 ${
          language === 'en' ? 'bg-white text-[#1e1b4b] shadow-sm' : 'text-gray-400'
        }`}
      >
        EN
      </div>
      <div
        className={`px-2 py-1 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 ${
          language === 'hi' ? 'bg-white text-[#1e1b4b] shadow-sm' : 'text-gray-400'
        }`}
      >
        HI
      </div>
    </div>
  );
}