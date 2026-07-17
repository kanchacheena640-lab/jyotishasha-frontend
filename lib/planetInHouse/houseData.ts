export const ORDINALS = [
  "1st", "2nd", "3rd", "4th", "5th", "6th",
  "7th", "8th", "9th", "10th", "11th", "12th",
] as const

export type HouseOrdinal = typeof ORDINALS[number]

export const HOUSE_LABELS: Array<{ label: string; label_hi: string }> = [
  { label: "1st House",  label_hi: "प्रथम भाव" },
  { label: "2nd House",  label_hi: "द्वितीय भाव" },
  { label: "3rd House",  label_hi: "तृतीय भाव" },
  { label: "4th House",  label_hi: "चतुर्थ भाव" },
  { label: "5th House",  label_hi: "पंचम भाव" },
  { label: "6th House",  label_hi: "षष्ठ भाव" },
  { label: "7th House",  label_hi: "सप्तम भाव" },
  { label: "8th House",  label_hi: "अष्टम भाव" },
  { label: "9th House",  label_hi: "नवम भाव" },
  { label: "10th House", label_hi: "दशम भाव" },
  { label: "11th House", label_hi: "एकादश भाव" },
  { label: "12th House", label_hi: "द्वादश भाव" },
]
