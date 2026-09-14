"use client";

import "@/i18n";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function RelationshipReportRedirect() {
  const { i18n, ready } = useTranslation("reports");
  const params = useParams();
  const router = useRouter();
  // Match ReportsPageClient: generic report URLs have no locale segment,
  // so the selected language can live only in client-side i18next state.
  const currentLang = (params?.locale === "hi" || i18n.language?.startsWith("hi"))
    ? "hi" : "en";

  useEffect(() => {
    if (ready) {
      router.replace(`/${currentLang}/love/report/relationship_future_report`);
    }
  }, [currentLang, ready, router]);

  return null;
}
