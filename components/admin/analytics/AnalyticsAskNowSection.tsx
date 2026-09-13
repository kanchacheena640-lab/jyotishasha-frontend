"use client";

import { AnalyticsWindow, PlatformFilter, getAskNow } from "@/lib/admin/analyticsApi";
import { ErrorBlock, KpiCard, KpiGrid, LimitationsNote, LoadingBlock, RateText, SectionPanel, useAnalyticsSection } from "./shared";

export default function AnalyticsAskNowSection({ window, platform }: { window: AnalyticsWindow; platform: PlatformFilter }) {
  const { data, state, error, retry } = useAnalyticsSection(() => getAskNow(window, platform), [window.start, window.end, platform]);

  return (
    <SectionPanel title="Ask Now">
      {state === "loading" && <LoadingBlock rows={2} />}
      {state === "error" && <ErrorBlock message={error} onRetry={retry} />}
      {state === "ready" && data && (
        <div className="space-y-2">
          <KpiGrid>
            <KpiCard label="Entry Views" value={data.entry_views} />
            <KpiCard label="Questions Asked" value={data.questions_submitted} />
            <KpiCard label="Answers Delivered" value={data.answers_delivered} />
            <KpiCard label="Answers Failed" value={data.answers_failed} />
          </KpiGrid>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <RateText label="Delivery rate" value={data.delivery_rate} />
            <RateText label="Failure rate" value={data.failure_rate} />
          </div>
          <LimitationsNote limitations={data.limitations} />
        </div>
      )}
    </SectionPanel>
  );
}
