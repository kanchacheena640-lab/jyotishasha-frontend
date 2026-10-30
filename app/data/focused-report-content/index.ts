/**
 * F12-P2.1 -- registry of topics that have their own SEO content (keyed by
 * backend question_key). Topics not listed here keep the generic template.
 * Adding a topic: write <question_key>.ts against its backend prompt spec,
 * register it below, and run lib/focusedReportContent.test.ts.
 */
import type { FocusedReportSeoContent } from "./types";
import { newJobTiming } from "./new_job_timing";
import { marriageDelayReason } from "./marriage_delay_reason";
import { goingAbroadTiming } from "./going_abroad_timing";

export const FOCUSED_REPORT_SEO_CONTENT: Record<string, FocusedReportSeoContent> = {
  [newJobTiming.questionKey]: newJobTiming,
  [marriageDelayReason.questionKey]: marriageDelayReason,
  [goingAbroadTiming.questionKey]: goingAbroadTiming,
};

export { REPORT_SECTIONS, AI_DISCLOSURE } from "./types";
export type { FocusedReportSeoContent, FocusedReportInternalLink, Localized } from "./types";
