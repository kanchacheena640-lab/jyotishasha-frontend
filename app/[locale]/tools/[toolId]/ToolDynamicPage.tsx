'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // 👈 Translation ke liye zaroori
import ToolInputForm, { FormData } from '@/components/ToolInputForm';
import ToolResultSection from '@/components/ToolResultSection';
import { fetchFullKundali } from '@/utils/fetchFullKundali';
import { fetchLifeTool } from '@/utils/fetchLifeTool';
import { parseToolResponse, ParsedResult } from '@/utils/parseToolResponse';

export default function ToolDynamicPage() {
  const { toolId, locale } = useParams() as { toolId: string; locale?: string };
  const { i18n } = useTranslation();
  
  // 🔹 Current language detect karo (i18n state ya URL param se)
  const currentLang = (locale === 'hi' || i18n.language?.startsWith('hi')) ? 'hi' : 'en';

  const [kundaliData, setKundaliData] = useState<any>(null);
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    console.log(`📨 Fetching ${toolId} in ${currentLang} language...`);
    if (!toolId) return;

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
    } catch (error) {
      console.error("❌ Data fetching error:", error);
      // Yahan aap koi error message state set kar sakte hain
    }
  };

  return (
    <div className="space-y-6">
      {!submitted && <ToolInputForm toolId={toolId} onSubmit={handleSubmit} />}
      
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