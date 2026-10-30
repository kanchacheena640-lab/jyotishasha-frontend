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
// F12-P2.5 batch
import { examPreparationPeriod } from "./exam_preparation_period";
import { higherEducationTiming } from "./higher_education_timing";
import { salaryGrowthTiming } from "./salary_growth_timing";
import { incomeIncreaseTiming } from "./income_increase_timing";
import { ownHomeTiming } from "./own_home_timing";
import { relocationTiming } from "./relocation_timing";
// F12-P2.6 batch
import { careerImprovementTiming } from "./career_improvement_timing";
import { nextStrongCareerPeriod } from "./next_strong_career_period";
import { workRecognitionTiming } from "./work_recognition_timing";
import { financialImprovementTiming } from "./financial_improvement_timing";
import { financialPressureEasing } from "./financial_pressure_easing";
import { businessGrowthTiming } from "./business_growth_timing";
// F12-P2.7 batch
import { bestCareerYears } from "./best_career_years";
import { jobSearchStartTiming } from "./job_search_start_timing";
import { jobGapEasing } from "./job_gap_easing";
import { moneyGrowthPeriods } from "./money_growth_periods";
import { businessExpansionTiming } from "./business_expansion_timing";
import { businessSlowdownEasing } from "./business_slowdown_easing";
// F12-P2.8 batch
import { bestBusinessPeriods } from "./best_business_periods";
import { newVenturePartnershipTiming } from "./new_venture_partnership_timing";
import { strongestMarriagePeriods } from "./strongest_marriage_periods";
import { marriageChancesTiming } from "./marriage_chances_timing";
import { marriageDelayEasing } from "./marriage_delay_easing";
import { marriageTalksCurrentPeriod } from "./marriage_talks_current_period";
// F12-P2.9 batch
import { relationshipToMarriageWindow } from "./relationship_to_marriage_window";
import { relationshipLeadToMarriage } from "./relationship_lead_to_marriage";
import { longTermCompatibility } from "./long_term_compatibility";
import { kundaliMatchForMarriage } from "./kundali_match_for_marriage";
import { rightTimeToConsiderMarriage } from "./right_time_to_consider_marriage";
import { relationshipStrengthsRisks } from "./relationship_strengths_risks";

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
  [examPreparationPeriod.questionKey]: examPreparationPeriod,
  [higherEducationTiming.questionKey]: higherEducationTiming,
  [salaryGrowthTiming.questionKey]: salaryGrowthTiming,
  [incomeIncreaseTiming.questionKey]: incomeIncreaseTiming,
  [ownHomeTiming.questionKey]: ownHomeTiming,
  [relocationTiming.questionKey]: relocationTiming,
  [careerImprovementTiming.questionKey]: careerImprovementTiming,
  [nextStrongCareerPeriod.questionKey]: nextStrongCareerPeriod,
  [workRecognitionTiming.questionKey]: workRecognitionTiming,
  [financialImprovementTiming.questionKey]: financialImprovementTiming,
  [financialPressureEasing.questionKey]: financialPressureEasing,
  [businessGrowthTiming.questionKey]: businessGrowthTiming,
  [bestCareerYears.questionKey]: bestCareerYears,
  [jobSearchStartTiming.questionKey]: jobSearchStartTiming,
  [jobGapEasing.questionKey]: jobGapEasing,
  [moneyGrowthPeriods.questionKey]: moneyGrowthPeriods,
  [businessExpansionTiming.questionKey]: businessExpansionTiming,
  [businessSlowdownEasing.questionKey]: businessSlowdownEasing,
  [bestBusinessPeriods.questionKey]: bestBusinessPeriods,
  [newVenturePartnershipTiming.questionKey]: newVenturePartnershipTiming,
  [strongestMarriagePeriods.questionKey]: strongestMarriagePeriods,
  [marriageChancesTiming.questionKey]: marriageChancesTiming,
  [marriageDelayEasing.questionKey]: marriageDelayEasing,
  [marriageTalksCurrentPeriod.questionKey]: marriageTalksCurrentPeriod,
  [relationshipToMarriageWindow.questionKey]: relationshipToMarriageWindow,
  [relationshipLeadToMarriage.questionKey]: relationshipLeadToMarriage,
  [longTermCompatibility.questionKey]: longTermCompatibility,
  [kundaliMatchForMarriage.questionKey]: kundaliMatchForMarriage,
  [rightTimeToConsiderMarriage.questionKey]: rightTimeToConsiderMarriage,
  [relationshipStrengthsRisks.questionKey]: relationshipStrengthsRisks,
};

export { REPORT_SECTIONS, AI_DISCLOSURE } from "./types";
export type { FocusedReportSeoContent, FocusedReportInternalLink, Localized } from "./types";
