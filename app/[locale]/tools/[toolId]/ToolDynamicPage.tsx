'use client';

// i18next is otherwise only initialized as a side effect of Header's lazy,
// ssr:false LanguageSwitcher chunk, which loads well after this component's
// first render -- useTranslation() below would subscribe before init() ever
// ran, and i18next's later, out-of-render init events could then crash React
// internals. Importing the init module directly here guarantees it runs
// (via normal ES module evaluation order) before this component's own body
// -- and therefore before useTranslation() -- ever executes.
import '@/i18n';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next'; // 👈 Translation ke liye zaroori
import ToolInputForm, { FormData } from '@/components/ToolInputForm';
// The result UI (all 27 tools' result blocks) is only needed after a successful calculation: loaded on demand
// instead of in every tool page's first-load JavaScript.
const ToolResultSection = dynamic(() => import('@/components/ToolResultSection'));
import { fetchFullKundali } from '@/utils/fetchFullKundali';
import { fetchLifeTool } from '@/utils/fetchLifeTool';
import { parseToolResponse, ParsedResult } from '@/utils/parseToolResponse';
import { WebsiteEvents } from '@/lib/websiteEvents';

export default function ToolDynamicPage({ submitLabel }: { submitLabel?: string } = {}) {
  const { toolId, locale } = useParams() as { toolId: string; locale?: string };
  const { i18n } = useTranslation();
  
  // 🔹 Current language detect karo (i18n state ya URL param se)
  const currentLang = (locale === 'hi' || i18n.language?.startsWith('hi')) ? 'hi' : 'en';

  const [kundaliData, setKundaliData] = useState<any>(null);
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  // Calculation in progress / failed: shown to the visitor (no analytics change).
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const formLocale: 'en' | 'hi' = locale === 'hi' ? 'hi' : 'en';

  const handleSubmit = async (formData: FormData) => {
    if (!toolId) return;

    // Task 13B -- the meaningful Generate/submit action for THIS tool.
    // Fires unconditionally on submit, before the API call and
    // regardless of eventual success/failure -- mirrors Free Kundali's
    // own cta_click placement (FreeKundaliClient.tsx: fires at submit,
    // never gated on the result). `toolId` is a safe, stable,
    // developer-defined slug (app/data/toolsData.ts) -- never user-
    // entered text -- and is only ever reachable here because the
    // server-rendered parent (app/[locale]/tools/[toolId]/page.tsx)
    // already gated this whole component behind a known toolContentMap
    // entry; an unrecognized toolId never reaches this form at all.
    // Carries no birth data/PII -- only the tool identity, exactly like
    // Free Kundali's own cta_id/screen_name. page_path is attached
    // automatically by WebsiteEvents itself (Task 9A), no extra code
    // needed here.
    WebsiteEvents.ctaClick(`tools_${toolId}_generate`, `tools_${toolId}`);

    setFailed(false);
    setLoading(true);

    // 🔹 API ko bhasha batana zaroori hai taaki result Hindi mein aaye
    const requestData = { ...formData, toolId, lang: currentLang };

    const LIFE_TOOL_IDS = ['career-path', 'marriage-path', 'foreign-travel', 'government-job', 'business-path', 'love-life'];

    let data;
    try {
      if (LIFE_TOOL_IDS.includes(toolId)) {
        // Dono calls mein language pass kar rahe hain
        const [kundali, lifeTool] = await Promise.all([
          fetchFullKundali(requestData),
          fetchLifeTool(requestData),
        ]);
        data = { ...lifeTool, ...kundali };
      } else {
        data = await fetchFullKundali(requestData);
      }

      setKundaliData(data);

      // 🔹 Parser ko bhi bhasha batayein taaki headings/labels translate ho sakein
      const parsed = await parseToolResponse(data, toolId, currentLang);
      setResult(parsed);
      setSubmitted(true);

      // Task 13B -- successful completion ONLY: reached exclusively
      // after fetchFullKundali/fetchLifeTool resolved without throwing
      // AND a usable parsed result was produced AND the success state
      // was actually committed (setResult/setSubmitted just above).
      // Never fires from the catch block below, never on a validation/
      // API failure (fetchFullKundali throws for both -- see that
      // file's own isValid check and `if (!res.ok) throw`), never on
      // page load or result re-render. One real user submission that
      // truly succeeds produces exactly one feature_used, mirroring
      // Free Kundali's own "featureUsed only after successful
      // generation" rule. No birth data, no calculated chart/planet
      // data, no generated interpretation text -- only the tool
      // identity, exactly like Free Kundali's own "kundali_generate".
      WebsiteEvents.featureUsed(`tool_${toolId}_generate`);
    } catch (error) {
      // A failed calculation is shown to the visitor (the form stays, so they can retry).
      // Task 13B adds no error-path analytics; a failed calculation deliberately produces no feature_used at all.
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!submitted && failed && (
        <p role="alert" data-testid="tool-calc-error" className="max-w-xl mx-auto rounded-xl border border-[#C0392B]/40 bg-[#FDF0EE] px-4 py-3 text-[15px] leading-snug text-[#8A2A1F]">
          {formLocale === 'hi'
            ? 'अभी गणना नहीं हो सकी। कृपया अपना विवरण जाँचें और थोड़ी देर बाद फिर से कोशिश करें।'
            : "We couldn't calculate this right now. Please check your details and try again in a minute."}
        </p>
      )}
      {!submitted && <ToolInputForm toolId={toolId} onSubmit={handleSubmit} locale={formLocale} submitLabel={submitLabel} busy={loading} />}
      
      {kundaliData && result ? (
        <div className="space-y-6">
          <ToolResultSection
            kundaliData={kundaliData}
            result={result}
          />

          {/* 🔎 Authority / EEAT (Bilingual logic) */}
          <p className="text-sm text-gray-500 leading-relaxed italic border-t border-gray-800 pt-4">
            {currentLang === 'hi' 
              ? "यह विश्लेषण शास्त्रीय वैदिक ज्योतिष सिद्धांतों, जन्म कुंडली गणना और ज्‍योतिष आशा अनुसंधान पद्धति का उपयोग करके तैयार किया गया है।"
              : "This analysis is generated using classical Vedic astrology principles, birth chart calculations, and Jyotishasha research methodology."
            }
          </p>
        </div>
      ) : null}
    </div>
  );
}