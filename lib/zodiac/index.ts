// 1. Imports
import { ariesHoroscope } from "./aries";
import { taurusHoroscope } from "./taurus";
import { geminiHoroscope } from "./gemini";
import { cancerHoroscope } from "./cancer";
import { leoHoroscope } from "./leo";
import { virgoHoroscope } from "./virgo";
import { libraHoroscope } from "./libra";
import { scorpioHoroscope } from "./scorpio";
import { sagittariusHoroscope } from "./sagittarius";
import { capricornHoroscope } from "./capricorn";
import { aquariusHoroscope } from "./aquarius";
import { piscesHoroscope } from "./pisces";

// 2. Interface Definition
export interface ZodiacContent {
  name: string;
  name_hi: string;
  title: string;
  nature: string;
  nature_hi: string;
  love: string;
  love_hi: string;
  finance: string;
  finance_hi: string;
  compatibility: string;
  compatibility_hi: string;
  essentials: string;
  essentials_hi: string;
}

// 3. Main Data Mapping
export const zodiacData: Record<string, ZodiacContent> = {
  aries: ariesHoroscope as ZodiacContent,
  taurus: taurusHoroscope as ZodiacContent,
  gemini: geminiHoroscope as ZodiacContent,
  cancer: cancerHoroscope as ZodiacContent,
  leo: leoHoroscope as ZodiacContent,
  virgo: virgoHoroscope as ZodiacContent,
  libra: libraHoroscope as ZodiacContent,
  scorpio: scorpioHoroscope as ZodiacContent,
  sagittarius: sagittariusHoroscope as ZodiacContent,
  capricorn: capricornHoroscope as ZodiacContent,
  aquarius: aquariusHoroscope as ZodiacContent,
  pisces: piscesHoroscope as ZodiacContent,
};

// 4. Types
export type ZodiacSign = keyof typeof zodiacData;