import { NakshatraData } from "./types";

import ashwiniData from "./ashwini";
import bharaniData from "./bharani";
import krittikaData from "./krittika";
import rohiniData from "./rohini";
import mrigashiraData from "./mrigashira";
import ardraData from "./ardra";
import punarvasuData from "./punarvasu";
import pushyaData from "./pushya";
import ashleshaData from "./ashlesha";
import maghaData from "./magha";
import purvaPhalguniData from "./purva-phalguni";
import uttaraPhalguniData from "./uttara-phalguni";
import hastaData from "./hasta";
import chitraData from "./chitra";
import swatiData from "./swati";
import vishakhaData from "./vishakha";
import anuradhaData from "./anuradha";
import jyeshthaData from "./jyeshtha";
import mulaData from "./mula";
import purvaAshadhaData from "./purva-ashadha";
import uttaraAshadhaData from "./uttara-ashadha";
import shravanaData from "./shravana";
import dhanishthaData from "./dhanishtha";
import shatabhishaData from "./shatabhisha";
import purvaBhadrapadaData from "./purva-bhadrapada";
import uttaraBhadrapadaData from "./uttara-bhadrapada";
import revatiData from "./revati";

export const nakshatraList: NakshatraData[] = [
  ashwiniData,
  bharaniData,
  krittikaData,
  rohiniData,
  mrigashiraData,
  ardraData,
  punarvasuData,
  pushyaData,
  ashleshaData,
  maghaData,
  purvaPhalguniData,
  uttaraPhalguniData,
  hastaData,
  chitraData,
  swatiData,
  vishakhaData,
  anuradhaData,
  jyeshthaData,
  mulaData,
  purvaAshadhaData,
  uttaraAshadhaData,
  shravanaData,
  dhanishthaData,
  shatabhishaData,
  purvaBhadrapadaData,
  uttaraBhadrapadaData,
  revatiData,
];

export function getNakshatraContent(slug: string): NakshatraData | null {
  return nakshatraList.find((item) => item.slug === slug) || null;
}

export function getAllNakshatraSlugs(): string[] {
  return nakshatraList.map((item) => item.slug);
}

export type { NakshatraData, NakshatraFAQ } from "./types";
