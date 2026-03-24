import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en').then((module) => module.default),
  hi: () => import('../dictionaries/hi').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'hi') => {
  // Agar locale undefined ho ya galat ho, toh default 'en' load hoga
  return dictionaries[locale]?.() ?? dictionaries.en();
};