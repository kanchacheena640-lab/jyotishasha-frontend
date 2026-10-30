/**
 * F12-P2.1 -- topic-specific SEO content for Focused Reports.
 *
 * One file per topic (app/data/focused-report-content/<question_key>.ts),
 * registered in ./index.ts. A topic with an entry here is rendered with its
 * own title, H1, introduction, analysed factors, reading guide, FAQs and
 * internal links instead of the shared generic template
 * (focusedReportsConfig.ts::buildGenericFocusedReportConfig).
 *
 * GROUNDING RULE: every astrological claim must come from the backend's own
 * definition of that report -- modules/focused_reports/prompt_specs.py
 * (focus, timing, boundaries, archetype, remedies), the *_keys.py horizons
 * and house sets, and master_contract.py (the PDF's section headings).
 * `grounding` records those facts; lib/focusedReportContent.test.ts checks
 * them against the backend when it is checked out beside this repo.
 *
 * Indexing is NOT controlled here: every focused page stays noindex until a
 * separate, reviewed rollout step.
 */
import type { FocusedReportFaq } from "../focusedReportsConfig";

export type Localized = { en: string; hi: string };

/** Report shapes from the backend's master_contract.py::SECTIONS. */
export type ReportArchetype = "TIMING" | "DIAGNOSTIC" | "DIRECTION" | "COMPATIBILITY";

export interface FocusedReportInternalLink {
  /** English path; the Hindi page links to `/hi${path}` when `localized`. */
  path: string;
  /** true when a /hi version of the target exists (the /reports catalogue is English-only). */
  localized: boolean;
  label: Localized;
}

export interface FocusedReportSeoContent {
  questionKey: string;
  /** Internal note: the search intent this page serves and the related pages it must not duplicate. */
  searchIntent: string;
  seoTitle: Localized;
  metaDescription: Localized;
  h1: Localized;
  intro: { en: string[]; hi: string[] };
  /** What the report actually reads in the chart -- from the prompt spec's evidence requirements. */
  analyzes: { en: string[]; hi: string[] };
  /** General, buyer-independent guidance on reading this kind of question. */
  readingGuide: { heading: Localized; points: { en: string[]; hi: string[] } };
  /** How this page differs from the related free guide / broader report. */
  differentiation: Localized;
  internalLinks: FocusedReportInternalLink[];
  benefits: { en: string[]; hi: string[] };
  sections: {
    whatItTellsYou: Localized;
    howJyotishApproachesIt: Localized;
    whoItIsFor: Localized;
    whatYouReceive: Localized;
    trustAndLimitations: Localized;
  };
  faqs: FocusedReportFaq[];
  grounding: {
    archetype: ReportArchetype;
    /** null when the backend supplies no timing evidence for this key (e.g. dual-chart compatibility overviews). */
    horizonMonths: number | null;
    /** Natal houses the backend reads for this key, when it defines them explicitly (else null). */
    houses: number[] | null;
    transits: string[];
    /** Natal planets the backend reads as birth-chart placements (not transits), when it lists them explicitly
     * (e.g. life_keys.py LIFE_NATAL_PLANETS). Naming one of these in the copy is not a transit claim. */
    natalPlanets?: string[];
    remedies: false;
  };
}

/** The PDF's section headings for each archetype, verbatim from
 * modules/focused_reports/master_contract.py::SECTIONS. */
export const REPORT_SECTIONS: Record<ReportArchetype, { en: string[]; hi: string[] }> = {
  TIMING: {
    en: ["Direct Answer", "Why Your Chart Says This", "Strongest Periods", "Slower or Watch Period", "What You Should Do", "Bottom Line"],
    hi: ["सीधा जवाब", "आपकी Chart ऐसा क्यों कहती है", "सबसे मजबूत समय", "धीमा या ध्यान रखने वाला समय", "आपको क्या करना चाहिए", "सीधी बात"],
  },
  DIAGNOSTIC: {
    en: ["Direct Answer", "Main Astrological Factors", "Why This Phase Feels Difficult", "When Pressure May Ease", "What You Can Do", "Bottom Line"],
    hi: ["सीधा जवाब", "मुख्य ज्योतिषीय कारण", "यह समय कठिन क्यों लगता है", "दबाव कब कम हो सकता है", "आप क्या कर सकते हैं", "सीधी बात"],
  },
  DIRECTION: {
    en: ["Direct Answer", "Natural Strengths and Tendencies", "Most Relevant Directions", "Current Timing Context", "Practical Focus", "Bottom Line"],
    hi: ["सीधा जवाब", "ताकतें और रुझान", "सबसे उपयोगी दिशाएँ", "अभी के समय का संदर्भ", "व्यावहारिक ध्यान", "सीधी बात"],
  },
  COMPATIBILITY: {
    en: ["Direct Answer", "Where Your Charts Support Each Other", "Differences That Need Care", "Practical Relationship Focus", "Bottom Line"],
    hi: ["सीधा जवाब", "चार्ट में तालमेल के संकेत", "किन फर्कों पर ध्यान दें", "रिश्ते के लिए उपयोगी ध्यान", "सीधी बात"],
  },
};

/** How a focused report is actually produced: the backend calculates the
 * chart facts; an AI language model writes the explanation from them
 * (modules/focused_reports/dispatcher.py -> report_ai_client). */
export const AI_DISCLOSURE: { heading: Localized; body: Localized } = {
  heading: { en: "How this report is written", hi: "यह रिपोर्ट कैसे लिखी जाती है" },
  body: {
    en: "Jyotishasha's software first calculates your chart: planetary positions, house and lord facts, Dasha periods and transit dates. The written explanation in your PDF is then generated by an AI language model that is instructed to use only those calculated facts and never to invent a position or a date. Individual reports are not written or reviewed by an astrologer.",
    hi: "Jyotishasha का सॉफ़्टवेयर पहले आपकी कुंडली की गणना करता है: ग्रहों की स्थिति, भाव और भावेश के तथ्य, दशा की अवधियाँ और गोचर की तारीखें। इसके बाद आपकी PDF की लिखित व्याख्या एक AI भाषा मॉडल तैयार करता है, जिसे केवल इन्हीं गणना किए गए तथ्यों का उपयोग करने और कोई भी स्थिति या तारीख न गढ़ने का निर्देश दिया गया है। व्यक्तिगत रिपोर्ट किसी ज्योतिषी द्वारा लिखी या जाँची नहीं जाती।",
  },
};
