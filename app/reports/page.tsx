"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { reportsData } from "../data/reportsData";
import { updateReportsData } from "../data/updateReportsData";  // 👈 import price
import { useTranslation } from "react-i18next";


function sanitizeReports(data: any): typeof reportsData {
  if (!Array.isArray(data)) return [];
  return data
    .filter(r => r && (r.slug || r.title)) // must have identity
    .map(r => ({
      slug: r.slug ?? "",
      title: r.title ?? "Untitled Report",
      category: r.category ?? "Other",
      description: r.description ?? "",
      fullDescription: r.fullDescription ?? "",
      badge: typeof r.badge === "string" ? r.badge : null,
      offer: r.offer ? "true" : "false",
      price: typeof r.price === "number" ? r.price : null,
      basePrice: typeof r.basePrice === "number" ? r.basePrice : null,
      image: typeof r.image === "string" ? r.image : "/images/report-placeholder.jpg"
    }));
}

export default function ReportsPage() {
  const { t } = useTranslation("reports");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalReport, setModalReport] = useState<null | typeof reportsData[0]>(null);
  const [reports, setReports] = useState(reportsData);

  // 👇 Add this useEffect
  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const updated = await updateReportsData();
        if (!isMounted) return;
        const safe = sanitizeReports(updated);
        setReports(safe.length > 0 ? safe : reportsData);
      } catch (err) {
        console.error("Failed to load reports:", err);
        setReports(reportsData);
      }
    }
    load();
    return () => { isMounted = false };
  }, []);

  const categories = ["All", ...new Set(reports.map((r) => r.category))];

  const filteredReports =
    selectedCategory === "All"
      ? reports
      : reports.filter((r) => r.category === selectedCategory);

  const handleBuyNow = (slug: string) => {
    router.push(`/reports/${slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        {t("reports_page.heading", { defaultValue: "Personalized Reports" })}
      </h1>

      {/* Category Filter */}
      <div className="sticky top-[72px] md:top-[80px] z-20 flex flex-wrap justify-center gap-3 mb-8 py-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600"
            }`}
          >
            {t(`reports_page.categories.${cat.toLowerCase()}`, { defaultValue: cat })}
          </button>
        ))}
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredReports.map((report, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden border border-gray-200"
          >
            {/* 🏷️ Badge */}
            {report.badge && (
              <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {report.badge}
              </span>
            )}

            <img
              src={report.image}
              alt={t(`${report.slug}.title`, { defaultValue: report.title })}
              className="w-full h-44 object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                {t(`${report.slug}.title`, { defaultValue: report.title })}
              </h3>
              <p className="text-gray-600 mb-4">
                {t(`${report.slug}.desc`, { defaultValue: report.description })}
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setModalReport(report)}
                  className="border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-100"
                >
                  {t("common.know_more", { defaultValue: "Know More" })}
                </button>

                <button
                  onClick={() => handleBuyNow(report.slug)}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  {t("common.buy_now", { defaultValue: "Buy Now" })}{" "}
                  {report.offer ? (
                    <>
                      ₹{report.price ?? "—"}{" "}
                      <span className="line-through text-sm text-gray-300">
                        ₹{report.basePrice ?? ""}
                      </span>
                    </>
                  ) : (
                    <>₹{report.price ?? "—"}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {modalReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setModalReport(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2 text-purple-800">
              {t(`${modalReport.slug}.title`, { defaultValue: modalReport.title })}
            </h2>
            <p className="text-gray-700 mb-4">
              {t(`${modalReport.slug}.fullDescription`, { defaultValue: modalReport.fullDescription })}
            </p>
            <button
              onClick={() => handleBuyNow(modalReport.slug)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
            >
              {t("common.buy_now", { defaultValue: "Buy Now" })}{" "}
              {modalReport.offer ? (
                <>
                  ₹{modalReport.price}{" "}
                  <span className="line-through text-sm text-gray-300">₹{modalReport.basePrice}</span>
                </>
              ) : (
                <>₹{modalReport.price}</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
