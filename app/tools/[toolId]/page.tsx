'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import ToolInputForm, { FormData } from '@/components/ToolInputForm';
import ToolResultSection from '@/components/ToolResultSection';
import { fetchFullKundali } from '@/utils/fetchFullKundali';
import { fetchLifeTool } from '@/utils/fetchLifeTool';
import { parseToolResponse, ParsedResult } from '@/utils/parseToolResponse';

export default function ToolDynamicPage() {
  const { toolId } = useParams() as { toolId: string };
  const [kundaliData, setKundaliData] = useState<any>(null);
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    console.log("📨 Tool page received formData:", formData);
    if (!toolId) return;

    const LIFE_TOOL_IDS = ['career-path', 'marriage-path', 'foreign-travel', 'government-job', 'business-path', 'love-life',]; // extend later

    let data;
    if (LIFE_TOOL_IDS.includes(toolId)) {
      const [kundali, lifeTool] = await Promise.all([
        fetchFullKundali({ ...formData, toolId }),
        fetchLifeTool({ ...formData, toolId }),
      ]);

      data = { ...lifeTool, ...kundali };
    } else {
      data = await fetchFullKundali({ ...formData, toolId });
    }

    setKundaliData(data);
    const parsed = await parseToolResponse(data, toolId);
    setResult(parsed);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {!submitted && <ToolInputForm toolId={toolId} onSubmit={handleSubmit} />}
      {kundaliData && result && (
        <ToolResultSection kundaliData={kundaliData} result={result} />
      )}
    </div>
  );
}
