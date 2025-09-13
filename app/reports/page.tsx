"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { reportsData } from "../data/reportsData";
import { useTranslation } from "react-i18next";

export default function ReportsPage() {
  const { t } = useTranslation("reports");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalReport, setModalReport] = useState<null | typeof reportsData[0]>(null);

  const categories = ["All", ...new Set(reportsData.map((r) => r.category))];

  const filteredReports =
    selectedCategory === "All"
      ? reportsData
      : reportsData.filter((r) => r.category === selectedCategory);

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
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden border border-gray-200"
          >
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
                      ₹{report.final_price}{" "}
                      <span className="line-through text-sm text-gray-300">₹{report.price}</span>
                    </>
                  ) : (
                    <>₹{report.price}</>
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
                  ₹{modalReport.final_price}{" "}
                  <span className="line-through text-sm text-gray-300">₹{modalReport.price}</span>
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
