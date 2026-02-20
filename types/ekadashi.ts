export interface EkadashiContent {
  slug: string;

  name: {
    en: string;
    hi: string;
  };

  month: string;

  paksha: "Krishna" | "Shukla";

  intro: {
    en: string;
    hi: string;
  };

  significance: {
    en: string;
    hi: string;
  };

  vidhi: {
    en: string[];
    hi: string[];
  };

  parana: {
    en: string;
    hi: string;
  };

  benefits: {
    en: string[];
    hi: string[];
  };

  faq: {
    en: { q: string; a: string }[];
    hi: { q: string; a: string }[];
  };

  astrologicalSignificance: {
    en: string;
    hi: string;
  };

  videoUrl?: string;
}