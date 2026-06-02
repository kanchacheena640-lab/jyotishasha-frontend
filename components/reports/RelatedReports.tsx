"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

type Report = {
  slug: string;
  title: {
    en: string;
    hi: string;
  };
  image: string;
  price: number;
};

type Props = {
  reports: Report[];
};

export default function RelatedReports({
  reports,
}: Props) {
  const { i18n } = useTranslation();

  const lang =
    i18n.language?.startsWith("hi")
      ? "hi"
      : "en";

  if (!reports?.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {lang === "hi"
            ? "आपके लिए सुझाई गई रिपोर्ट्स"
            : "Recommended For You"}
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          {lang === "hi"
            ? "इस रिपोर्ट को देखने वाले उपयोगकर्ता ये रिपोर्ट्स भी देखते हैं"
            : "Users interested in this report also explore"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link
            key={report.slug}
            href={`/reports/${report.slug}`}
            className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81]
            border border-purple-900/50 rounded-2xl overflow-hidden
            hover:border-purple-500 transition-all duration-300
            transform hover:-translate-y-1"
          >
            <div className="h-44 w-full overflow-hidden">
              <img
                src={report.image}
                alt={report.title[lang]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-4 text-center">
              <div className="text-white text-base md:text-lg font-bold leading-snug min-h-[3rem] flex items-center justify-center">
                {report.title[lang]}
              </div>

              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mt-2">
                <span className="text-yellow-400 text-sm md:text-base font-bold">
                  ₹{report.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}