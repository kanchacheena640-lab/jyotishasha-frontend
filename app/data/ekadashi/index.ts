import { EkadashiContent } from "@/types/ekadashi";
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
import papmochani from "./papmochani-ekadashi";
import papankusha from "./papankusha-ekadashi";
import parivartini from "./parivartini-ekadashi";
import paushaPutrada from "./pausha-putrada-ekadashi";
import rama from "./rama-ekadashi";
import safala from "./safala-ekadashi";
import shattila from "./shattila-ekadashi";
import shravanaPutrada from "./shravana-putrada-ekadashi";
import utpanna from "./utpanna-ekadashi";
import varuthini from "./varuthini-ekadashi";
import vijaya from "./vijaya-ekadashi";
import yogini from "./yogini-ekadashi";

export const ekadashiList: EkadashiContent[] = [
  amalaki,
  apara,
  aja,
  devshayani,
  devutthana,
  indira,
  jaya,
  kamada,
  kamika,
  mokshada,
  mohini,
  nirjala,
  papmochani,
  papankusha,
  parivartini,
  paushaPutrada,
  rama,
  safala,
  shattila,
  shravanaPutrada,
  utpanna,
  varuthini,
  vijaya,
  yogini,
];

export function getEkadashiContent(
  slug: string
): EkadashiContent | null {
  return (
    ekadashiList.find(
      (item) => item.slug === slug
    ) || null
  );
}

export function getAllEkadashiSlugs(): string[] {
  return ekadashiList.map(
    (item) => item.slug
  );
}
