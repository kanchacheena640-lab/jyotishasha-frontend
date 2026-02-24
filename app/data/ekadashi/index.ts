import { EkadashiContent } from "@/types/ekadashi";

// Imports (Make sure file names match these paths)
import amalaki from "./amalaki-ekadashi";
import apara from "./apara-ekadashi";
import aja from "./aja-ekadashi";
import devshayani from "./devshayani-ekadashi";
import devutthana from "./devutthana-ekadashi";
import indira from "./indira-ekadashi";
import jaya from "./jaya-ekadashi";
import kamada from "./kamada-ekadashi";
import kamika from "./kamika-ekadashi";
import mokshada from "./mokshada-ekadashi";
import mohini from "./mohini-ekadashi";
import nirjala from "./nirjala-ekadashi";
import papmochini from "./papmochini-ekadashi"; // Updated to 'i'
import papankusha from "./papankusha-ekadashi";
import parsva from "./parsva-ekadashi";     // API calls it 'parsva'
import paushaPutrada from "./putrada-pausha-ekadashi";
import rama from "./rama-ekadashi";
import saphala from "./saphala-ekadashi";
import shattila from "./shattila-ekadashi";
import putradaShravana from "./putrada-shravana-ekadashi"; // API calls it 'putrada-shravana'
import utpanna from "./utpanna-ekadashi";
import varuthini from "./varuthini-ekadashi";
import vijaya from "./vijaya-ekadashi";
import yogini from "./yogini-ekadashi";
import padmini from "./padmini-ekadashi";
import parama from "./parama-ekadashi";

export const ekadashiList: EkadashiContent[] = [
  amalaki, apara, aja, devshayani, devutthana, indira, jaya, 
  kamada, kamika, mokshada, mohini, nirjala, papmochini, 
  papankusha, parsva, paushaPutrada, rama, saphala, shattila, 
  putradaShravana, utpanna, varuthini, vijaya, yogini, padmini, parama
];

export function getEkadashiContent(slug: string): EkadashiContent | null {
  // SEO URL (/papmochini-ekadashi) se API slug (papmochini) nikalne ke liye
  return ekadashiList.find((item) => item.slug === slug) || null;
}

export function getAllEkadashiSlugs(): string[] {
  return ekadashiList.map((item) => item.slug);
}