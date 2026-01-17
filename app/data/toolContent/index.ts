import { rashiFinderContent } from "./rashiFinder";
import { lagnaFinderContent } from "./lagnaFinder";
import { grahDashaFinderContent } from "./grahDashaFinder";

import { planetOverviewContent } from "./planetOverview";
import { gemstoneSuggestionContent } from "./gemstoneSuggestion";

import { mangalDoshContent } from "./mangalDosh";
import { kaalsarpDoshContent } from "./kaalsarpDosh";
import { sadeSatiCalculatorContent } from "./sadeSatiCalculator";

import { parashariRajyogContent } from "./parashariRajyog";
import { neechbhangRajyogContent } from "./neechbhangRajyog";
import { gajakesariYogContent } from "./gajakesariYog";
import { panchMahapurushYogContent } from "./panchMahapurushYog";
import { chandraMangalYogContent } from "./chandraMangalYog";
import { dhanYogContent } from "./dhanYog";
import { rajyaSambandhContent } from "./rajyaSambandh";
import { dharmaKarmadhipatiYogContent } from "./dharmaKarmadhipatiYog";
import { vipreetRajyogContent } from "./vipreetRajyog";
import { lakshmiYogContent } from "./lakshmiYog";
import { shubhKartariYogContent } from "./shubhKartariYog";
import { adhiRajyogContent } from "./adhiRajyog";
import { kuberRajyogContent } from "./kuberRajyog";

import { careerPathContent } from "./careerPath";
import { marriagePathContent } from "./marriagePath";
import { foreignTravelContent } from "./foreignTravel";
import { businessPathContent } from "./businessPath";
import { governmentJobContent } from "./governmentJob";
import { loveLifeContent } from "./loveLife";

/**
 * 🔒 LOCKED TOOL CONTENT MAP
 * Single source of truth for all tool SEO + content
 */
export const toolContentMap: Record<string, any> = {
  // 🔮 Basic identity tools
  "rashi-finder": rashiFinderContent,
  "lagna-finder": lagnaFinderContent,
  "grah-dasha-finder": grahDashaFinderContent,

  // 🪐 Planetary tools
  "planet-overview": planetOverviewContent,
  "gemstone-suggestion": gemstoneSuggestionContent,

  // ⚠️ Dosh tools
  "mangal-dosh": mangalDoshContent,
  "kaalsarp-dosh": kaalsarpDoshContent,
  "sadhesati-calculator": sadeSatiCalculatorContent,

  // 👑 Yog tools
  "parashari-rajyog": parashariRajyogContent,
  "neechbhang-rajyog": neechbhangRajyogContent,
  "gajakesari-yog": gajakesariYogContent,
  "panch-mahapurush": panchMahapurushYogContent,
  "chandra-mangal": chandraMangalYogContent,
  "dhan-yog": dhanYogContent,
  "rajya-sambandh": rajyaSambandhContent,
  "dharma-karmadhipati": dharmaKarmadhipatiYogContent,
  "vipreet-rajyog": vipreetRajyogContent,
  "lakshmi-yog": lakshmiYogContent,
  "shubh-kartari": shubhKartariYogContent,
  "adhi-rajyog": adhiRajyogContent,
  "kuber-rajyog": kuberRajyogContent,

  // 🧭 Life guidance tools
  "career-path": careerPathContent,
  "marriage-path": marriagePathContent,
  "foreign-travel": foreignTravelContent,
  "business-path": businessPathContent,
  "government-job": governmentJobContent,
  "love-life": loveLifeContent,
};
