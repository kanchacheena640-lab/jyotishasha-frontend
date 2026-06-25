"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  MONTH_MAP,
} from "@/lib/months";

import AnnualMonthCalendar from "./AnnualMonthCalendar";

import AnnualSEOContent from "./AnnualSEOContent";
import AnnualFAQ from "./AnnualFAQ";
import AnnualMuhuratSchemas
  from "./AnnualMuhuratSchemas";
import RelatedMuhurat
  from "./RelatedMuhurat";
import AnnualFAQSchema
  from "./AnnualFAQSchema";

import {
  getAnnualFaqs,
} from "@/app/data/annualFaqs";

import OtherYears
  from "./OtherYears";


type Props = {
  slug: string;
  locale: string;
  year: number;
  topic: any;
};

export default function AnnualMuhuratPage({
  slug,
  locale,
  year,
  topic,
}: Props) {

  const [selectedMonth, setSelectedMonth] =
    useState<string | null>(null);

  const [isMobile, setIsMobile] =
    useState(false);

  const [auspiciousDates, setAuspiciousDates] =
    useState<number[]>([]);
  
    const months =
      Object.entries(MONTH_MAP).map(
        ([month, num]) => ({
          month,
          year,
          monthNumber: num,
        })
      );

  useEffect(() => {

    const check = () =>
        setIsMobile(
        window.innerWidth < 768
        );

    check();

    window.addEventListener(
        "resize",
        check
    );

    return () =>
        window.removeEventListener(
        "resize",
        check
        );

    }, []);

    useEffect(() => {

  if (!selectedMonth) return;

  const selected =
    months.find(
      (m) => m.month === selectedMonth
    );

  if (!selected) return;

  const loadMuhurat = async () => {

    try {

      const res = await fetch(
        "https://jyotishasha-backend.onrender.com/api/muhurth/month",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            activity: topic.activity,
            month: selected.monthNumber,
            year: selected.year,
            latitude: 26.8467,
            longitude: 80.9462,
            language: locale,
          }),
        }
      );

      const data =
        await res.json();

      const dates =
        (data.results || []).map(
          (item: any) =>
            Number(
              item.date.split("-")[2]
            )
        );

      setAuspiciousDates(
        dates
      );
      

    } catch (err) {

      setAuspiciousDates([]);

    }

  };

  loadMuhurat();

}, [selectedMonth, locale, topic.activity]);

  const monthRows = isMobile
    ? months.map((month) => [month])
    : Array.from(
        {
            length: Math.ceil(
            months.length / 3
            ),
        },
        (_, i) =>
            months.slice(
            i * 3,
            i * 3 + 3
            )
        );
    const faqs =
      getAnnualFaqs(
        slug,
        locale,
        year
      );

  return (
  <>
    <AnnualMuhuratSchemas
      title={
        locale === "hi"
          ? topic.title_hi
          : topic.title
      }
      year={year}
      locale={locale}
      slug={slug}
    />

    <AnnualFAQSchema
      faqs={faqs}
    />

    <article className="max-w-6xl mx-auto px-4 py-10 text-white">

      <h1 className="text-4xl font-bold mb-3">
        {locale === "hi"
          ? topic.title_hi
          : topic.title}{" "}
        {year}
      </h1>

      <p className="text-gray-400 mb-4">
        {locale === "hi"
          ? `${year} के लिए पंचांग गणनाओं पर आधारित।`
          : `Based on Panchang calculations for ${year}.`}
      </p>

    <p className="text-gray-300 leading-7 mb-8 max-w-4xl">
      {locale === "hi"
        ? topic.description_hi
        : topic.description}
    </p>

    <div className="space-y-6">

  {monthRows.map((row, rowIndex) => {

    const selectedInRow =
      row.find(
        (m) => m.month === selectedMonth
      );

    return (

      <div key={rowIndex}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {row.map((item) => (

            <button
              key={item.month}
              onClick={() =>
                setSelectedMonth(
                  selectedMonth === item.month
                    ? null
                    : item.month
                )
              }
              className={`w-full rounded-xl p-5 border transition-all ${
                selectedMonth === item.month
                  ? "border-purple-500 bg-purple-900/30"
                  : "border-white/10 bg-white/5"
              }`}
            >

              <div className="font-semibold capitalize">
                {item.month}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {item.year}
              </div>

            </button>

          ))}

        </div>


        {selectedInRow && (
          <>

          <AnnualMonthCalendar
            month={selectedInRow.month}
            year={selectedInRow.year}
            slug={slug}
            locale={locale}
            auspiciousDates={auspiciousDates}
          />
    
          </>
        )}

      </div>

    );

  })}

</div>
        <OtherYears
          slug={slug}
          locale={locale}
          year={year}
        />

  <AnnualSEOContent
    slug={slug}
    locale={locale}
    year={year}
  />

  <AnnualFAQ
    activityName={topic.title}
    slug={slug}
    year={year}
    locale={locale}
  />

  <RelatedMuhurat
    locale={locale}
    year={year}
  />

    </article>
  </>
);
}