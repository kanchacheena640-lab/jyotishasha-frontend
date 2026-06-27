export interface NakshatraFAQ {
  q: string;
  a: string;
  q_hi: string;
  a_hi: string;
}

export interface NakshatraPada {
  number: number;
  description: string;
  description_hi: string;
}

export interface NakshatraCompatibility {
  best: string[];
  best_hi: string[];
  average: string[];
  average_hi: string[];
  challenging: string[];
  challenging_hi: string[];
}

export interface NakshatraData {
  slug: string;
  name: string;
  name_hi: string;
  number: number;
  symbol: string;
  symbol_hi: string;
  deity: string;
  deity_hi: string;
  ruling_planet: string;
  ruling_planet_hi: string;
  element: string;
  element_hi: string;
  gana: string;
  gana_hi: string;
  rashi: string;
  rashi_hi: string;
  degree: string;

  introduction: string;
  introduction_hi: string;

  traits: string;
  traits_hi: string;

  love: string;
  love_hi: string;

  career: string;
  career_hi: string;

  health: string;
  health_hi: string;

  pada: NakshatraPada[];

  compatibility: NakshatraCompatibility;

  strengths: string;
  strengths_hi: string;
  weaknesses: string;
  weaknesses_hi: string;

  mythology: string;
  mythology_hi: string;

  male_traits: string;
  male_traits_hi: string;
  female_traits: string;
  female_traits_hi: string;

  born_in: string;
  born_in_hi: string;

  faqs: NakshatraFAQ[];
}
