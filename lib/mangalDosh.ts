// lib/mangalDosh.ts
// Presentation helpers for the Mangal Dosh calculator (/tools/mangal-dosh). The calculation itself lives in the
// backend (services/mangalik_dosh_logic.py) and is not changed here; these helpers only label what it returns.

/** Houses the backend engine reads Mangal Dosh from (MD_HOUSES), counted from the Lagna and from the Moon. */
export const ENGINE_MANGAL_DOSH_HOUSES: readonly number[] = [1, 2, 4, 7, 8, 12];

/** Backend status.strength values. */
export type MangalStrength = "None" | "Cancelled" | "Partial" | "Strong";

export interface MangalStatusView {
  label: string;
  tone: "clear" | "cancelled" | "partial" | "present" | "unknown";
}

export function mangalStatusView(strength: unknown, isHi: boolean): MangalStatusView {
  switch (strength) {
    case "None": return { label: isHi ? "मांगलिक नहीं" : "Not Manglik", tone: "clear" };
    case "Cancelled": return { label: isHi ? "मंगल दोष भंग" : "Mangal Dosh cancelled", tone: "cancelled" };
    case "Partial": return { label: isHi ? "आंशिक मंगल दोष" : "Partial Mangal Dosh", tone: "partial" };
    case "Strong": return { label: isHi ? "मंगल दोष प्रभावी" : "Mangal Dosh present", tone: "present" };
    default: return { label: isHi ? "स्थिति उपलब्ध नहीं" : "Status not available", tone: "unknown" };
  }
}

const EN_ORDINAL = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const HI_ORDINAL = ["", "पहले", "दूसरे", "तीसरे", "चौथे", "पाँचवें", "छठे", "सातवें", "आठवें", "नौवें", "दसवें", "ग्यारहवें", "बारहवें"];

export const isHouse = (n: unknown): n is number => typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= 12;
export const houseOrdinal = (n: number, isHi: boolean) => (isHi ? HI_ORDINAL[n] : EN_ORDINAL[n]) || String(n);

/** Existing planet-in-house guide for Mars in house n (EN /planet-in-house/mars-in-7th-house, HI under /hi). */
export const marsInHouseHref = (n: number, isHi: boolean) => `${isHi ? "/hi" : ""}/planet-in-house/mars-in-${EN_ORDINAL[n]}-house`;
