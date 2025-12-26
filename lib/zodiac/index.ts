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

export const zodiacData = {
  aries: ariesHoroscope,
  taurus: taurusHoroscope,
  gemini: geminiHoroscope,
  cancer: cancerHoroscope,
  leo: leoHoroscope,
  virgo: virgoHoroscope,
  libra: libraHoroscope,
  scorpio: scorpioHoroscope,
  sagittarius: sagittariusHoroscope,
  capricorn: capricornHoroscope,
  aquarius: aquariusHoroscope,
  pisces: piscesHoroscope,
};

export type ZodiacSign = keyof typeof zodiacData;
