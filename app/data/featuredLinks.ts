export type FeaturedLink = {
  title: string;
  title_hi: string;
  // path after the locale prefix — e.g. "/planet-in-house/sun-in-10th-house"
  // Update this array to control which strategic pages get homepage authority links
  path: string;
};

export const featuredLinks: FeaturedLink[] = [
  {
    title: "Sun in 10th House",
    title_hi: "सूर्य दशम भाव में",
    path: "/planet-in-house/sun-in-10th-house",
  },
  {
    title: "Saturn Retrograde",
    title_hi: "वक्री शनि का प्रभाव",
    path: "/retrograde-saturn",
  },
  {
    title: "Rohini Nakshatra",
    title_hi: "रोहिणी नक्षत्र",
    path: "/nakshatra/rohini",
  },
  {
    title: "Today's Rahu Kaal",
    title_hi: "आज का राहु काल",
    path: "/rahu-kaal",
  },
  {
    title: "Ekadashi 2026",
    title_hi: "एकादशी 2026",
    path: "/ekadashi",
  },
  {
    title: "Property Muhurat",
    title_hi: "गृह प्रवेश मुहूर्त",
    path: "/panchang/muhurat/grah-pravesh-muhurat",
  },
];
