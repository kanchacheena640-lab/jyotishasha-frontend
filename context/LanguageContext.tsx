"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "hi";

interface LangCtx {
  lang: Lang;
  setLang: (v: Lang) => void;
}

const LanguageContext = createContext<LangCtx | null>(null);

// ✅ Badlav: Ab ye initialLocale (props) accept karega
export function LanguageProvider({ 
  children, 
  initialLocale = "en" 
}: { 
  children: React.ReactNode; 
  initialLocale?: string; // 👈 Error yahan se solve hoga
}) {
  // ✅ Logic: Agar URL mein 'hi' hai, toh wahi default set hoga
  const [lang, setLang] = useState<Lang>((initialLocale === "hi" ? "hi" : "en") as Lang);

  // Sync logic (Optional): Agar URL change ho toh state update ho jaye
  useEffect(() => {
    if (initialLocale === "hi" || initialLocale === "en") {
      setLang(initialLocale as Lang);
    }
  }, [initialLocale]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}