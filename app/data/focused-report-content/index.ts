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
// F12-P2.2 batch
import { promotionTiming } from "./promotion_timing";
import { careerGrowthDelayReason } from "./career_growth_delay_reason";
import { jobChangeNow } from "./job_change_now";
import { debtPressureEasing } from "./debt_pressure_easing";
import { businessStartTiming } from "./business_start_timing";
import { studyAbroad } from "./study_abroad";
import { foreignSettlementTiming } from "./foreign_settlement_timing";
import { propertyPurchaseTiming } from "./property_purchase_timing";

export const FOCUSED_REPORT_SEO_CONTENT: Record<string, FocusedReportSeoContent> = {
  [newJobTiming.questionKey]: newJobTiming,
  [marriageDelayReason.questionKey]: marriageDelayReason,
  [goingAbroadTiming.questionKey]: goingAbroadTiming,
  [promotionTiming.questionKey]: promotionTiming,
  [careerGrowthDelayReason.questionKey]: careerGrowthDelayReason,
  [jobChangeNow.questionKey]: jobChangeNow,
  [debtPressureEasing.questionKey]: debtPressureEasing,
  [businessStartTiming.questionKey]: businessStartTiming,
  [studyAbroad.questionKey]: studyAbroad,
  [foreignSettlementTiming.questionKey]: foreignSettlementTiming,
  [propertyPurchaseTiming.questionKey]: propertyPurchaseTiming,
};

export { REPORT_SECTIONS, AI_DISCLOSURE } from "./types";
export type { FocusedReportSeoContent, FocusedReportInternalLink, Localized } from "./types";
