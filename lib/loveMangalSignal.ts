// lib/loveMangalSignal.ts
// Plain-language view of the backend's Mangal Dosh comparison (modules/love/mangal_dosh_comparator.py):
//   GREEN   -> both charts carry similar Mangal energy, or neither has an effective Mangal Dosh
//   RED     -> the two charts differ in Mangal Dosh strength
//   UNKNOWN -> the backend could not evaluate one of the charts
//   absent  -> not calculated (full birth details missing for one person)
// The raw codes are never shown to visitors.

export type MangalTone = "balanced" | "mismatch" | "unavailable";

export interface MangalSignalView {
  tone: MangalTone;
  label: string;
  /** Shown when the comparison could not be made. */
  explanation?: string;
}

export function mangalSignalView(mangal: unknown, isHi: boolean): MangalSignalView {
  const signal = mangal && typeof mangal === "object" ? (mangal as { signal?: unknown }).signal : undefined;
  if (signal === "GREEN") return { tone: "balanced", label: isHi ? "संतुलित" : "Balanced" };
  if (signal === "RED") return { tone: "mismatch", label: isHi ? "असमान" : "Mismatch" };
  return {
    tone: "unavailable",
    label: isHi ? "उपलब्ध नहीं" : "Not available",
    explanation: isHi
      ? "मंगल दोष की तुलना के लिए दोनों की पूरी जन्म जानकारी (तिथि, समय और स्थान) चाहिए।"
      : "Comparing Mangal Dosh needs both people's full birth details (date, time and place).",
  };
}

export const MANGAL_TONE_CLASS: Record<MangalTone, string> = {
  balanced: "bg-green-500/10 text-green-400 border-green-500/30",
  mismatch: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  unavailable: "bg-white/5 text-gray-300 border-white/20",
};
