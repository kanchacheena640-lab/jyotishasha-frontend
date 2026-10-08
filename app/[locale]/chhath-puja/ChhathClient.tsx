"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHHATH_MAX_YEAR,
  CHHATH_MIN_YEAR,
  fetchChhath,
  toChhathView,
  type ChhathDay,
  type ChhathLanguage,
  type ChhathView,
} from "@/lib/chhath/api";
import { CHHATH_CITIES, CHHATH_DEFAULT_CITY, chhathCityName } from "@/lib/chhath/cities";
import { CHHATH_DAY_COPY, CHHATH_UI, fill } from "@/lib/chhath/content";
import {
  MONTH_LABEL,
  PAKSHA_LABEL,
  alternativeSandhyaDates,
  formatChhathDate,
  formatChhathDateTime,
  showVariationNote,
  to12Hour,
} from "@/lib/chhath/format";
import { resolveInitialChhath } from "@/lib/chhath/resolveYear";

interface Props {
  lang: ChhathLanguage;
  initialYear: number;
  initialData: ChhathView | null;
}

type ViewState =
  | { kind: "ready"; data: ChhathView }
  | { kind: "loading" }
  | { kind: "error" };

const DAY_ACCENT: Record<string, string> = {
  nahay_khay: "from-amber-50 to-orange-50 border-amber-200",
  kharna: "from-orange-50 to-rose-50 border-orange-200",
  sandhya_arghya: "from-orange-100 to-rose-100 border-orange-300",
  usha_arghya: "from-yellow-50 to-amber-100 border-amber-300",
};

export default function ChhathClient({ lang, initialYear, initialData }: Props) {
  const t = (copy: Record<ChhathLanguage, string>) => copy[lang];

  const [baseYear, setBaseYear] = useState(initialYear);
  const [year, setYear] = useState(initialYear);
  const [city, setCity] = useState(CHHATH_DEFAULT_CITY);
  const [view, setView] = useState<ViewState>(
    initialData ? { kind: "ready", data: initialData } : { kind: "loading" }
  );
  const requestId = useRef(0);
  const defaultResolved = useRef(Boolean(initialData));
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(
    async (nextYear: number, nextCity: string) => {
      const id = ++requestId.current;
      controller.current?.abort();
      const ac = new AbortController();
      controller.current = ac;
      setView({ kind: "loading" });
      try {
        const data = await fetchChhath({ year: nextYear, city: nextCity, language: lang, signal: ac.signal });
        if (id === requestId.current) setView({ kind: "ready", data: toChhathView(data) });
      } catch {
        // Never keep showing the previous selection's dates for a failed request.
        if (id === requestId.current) setView({ kind: "error" });
      }
    },
    [lang]
  );

  // Server render failed: resolve the current/upcoming year in the browser.
  const resolveDefault = useCallback(async () => {
    const id = ++requestId.current;
    setView({ kind: "loading" });
    const resolved = await resolveInitialChhath(lang, new Date(), (p) => fetchChhath({ ...p, server: false }));
    if (id !== requestId.current) return;
    if (resolved.data) defaultResolved.current = true;
    setBaseYear(resolved.year);
    setYear(resolved.year);
    setView(resolved.data ? { kind: "ready", data: resolved.data } : { kind: "error" });
  }, [lang]);

  useEffect(() => {
    if (!initialData) void resolveDefault();
    return () => controller.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const years = [baseYear - 1, baseYear, baseYear + 1].filter(
    (y) => y >= CHHATH_MIN_YEAR && y <= CHHATH_MAX_YEAR
  );

  const onYear = (y: number) => {
    setYear(y);
    void load(y, city);
  };
  const onCity = (key: string) => {
    setCity(key);
    void load(year, key);
  };
  const onRetry = () => {
    if (!defaultResolved.current) {
      void resolveDefault();
    } else {
      void load(year, city);
    }
  };

  const cityName = chhathCityName(city, lang);

  return (
    <section aria-labelledby="chhath-calendar-title" className="mb-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <h2 id="chhath-calendar-title" className="text-2xl md:text-3xl font-bold text-[#7A1C1C]">
          {fill(t(CHHATH_UI.calendarTitle), { year })}
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wide text-[#7A1C1C]/80 mb-1">
              {t(CHHATH_UI.yearLabel)}
            </span>
            <div className="flex gap-2" role="group" aria-label={t(CHHATH_UI.yearLabel)}>
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => onYear(y)}
                  aria-pressed={y === year}
                  className={`min-h-[44px] px-4 rounded-full border text-sm font-semibold transition ${
                    y === year
                      ? "bg-[#7A1C1C] border-[#7A1C1C] text-white"
                      : "bg-white border-[#7A1C1C]/40 text-[#7A1C1C] hover:bg-[#FDE8D7]"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wide text-[#7A1C1C]/80 mb-1">
              {t(CHHATH_UI.cityLabel)}
            </span>
            <select
              value={city}
              onChange={(e) => onCity(e.target.value)}
              className="min-h-[44px] w-full sm:w-56 rounded-xl border border-[#7A1C1C]/40 bg-white px-3 text-sm font-medium text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/40"
            >
              {CHHATH_CITIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c[lang]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div aria-live="polite" aria-busy={view.kind === "loading"}>
        {view.kind === "loading" && <LoadingState lang={lang} />}
        {view.kind === "error" && <ErrorState lang={lang} onRetry={onRetry} />}
        {view.kind === "ready" && <ChhathResult data={view.data} lang={lang} cityName={cityName} />}
      </div>
    </section>
  );
}

function ChhathResult({ data, lang, cityName }: { data: ChhathView; lang: ChhathLanguage; cityName: string }) {
  const t = (copy: Record<ChhathLanguage, string>) => copy[lang];
  const alternatives = alternativeSandhyaDates(data);
  const monthLabel = MONTH_LABEL[data.lunar_month.amanta]?.[lang] ?? data.lunar_month.amanta;
  const pakshaLabel = PAKSHA_LABEL[data.lunar_month.paksha]?.[lang] ?? data.lunar_month.paksha;

  return (
    <div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="chhath-days">
        {data.days.map((day) => (
          <DayCard key={day.key} day={day} lang={lang} />
        ))}
      </ol>

      <dl className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-white border border-orange-100 px-4 py-3">
          <dt className="text-gray-500">{t(CHHATH_UI.lunarMonth)}</dt>
          <dd className="font-semibold text-[#2B2B2B]">
            {monthLabel} · {pakshaLabel}
          </dd>
        </div>
        <div className="rounded-xl bg-white border border-orange-100 px-4 py-3">
          <dt className="text-gray-500">{t(CHHATH_UI.shashthiWindow)} (IST)</dt>
          <dd className="font-semibold text-[#2B2B2B]">
            {lang === "hi"
              ? `${formatChhathDateTime(data.shashthi.start_ist, lang)} से ${formatChhathDateTime(data.shashthi.end_ist, lang)} तक`
              : `${formatChhathDateTime(data.shashthi.start_ist, lang)} to ${formatChhathDateTime(data.shashthi.end_ist, lang)}`}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-gray-500">{fill(t(CHHATH_UI.timesNote), { city: cityName })}</p>

      {showVariationNote(data) && (
        <aside
          className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          data-testid="chhath-variation-note"
        >
          <p className="font-semibold">{t(CHHATH_UI.variationTitle)}</p>
          <p className="mt-1">
            {t(CHHATH_UI.variationBody)}{" "}
            {alternatives.length > 0 &&
              fill(t(CHHATH_UI.variationAlt), {
                dates: alternatives.map((d) => formatChhathDate(d, lang)).join(", "),
              })}{" "}
            {t(CHHATH_UI.variationAdvice)}
          </p>
        </aside>
      )}
    </div>
  );
}

function DayCard({ day, lang }: { day: ChhathDay; lang: ChhathLanguage }) {
  const t = (copy: Record<ChhathLanguage, string>) => copy[lang];
  const copy = CHHATH_DAY_COPY[day.key];
  const isArghya = day.key === "sandhya_arghya" || day.key === "usha_arghya";
  const paksha = PAKSHA_LABEL[day.tithi_at_sunrise.paksha]?.[lang] ?? day.tithi_at_sunrise.paksha;

  return (
    <li
      className={`rounded-2xl border bg-gradient-to-br p-5 shadow-sm ${DAY_ACCENT[day.key] ?? ""}`}
      data-day={day.key}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#7A1C1C]/70">{t(copy.step)}</p>
      <h3 className="mt-1 text-xl font-bold text-[#7A1C1C]">{lang === "hi" ? day.name_hi : day.name_en}</h3>
      <p className="mt-2 text-lg font-semibold text-[#2B2B2B]" data-field="date">
        {formatChhathDate(day.date, lang)}
      </p>
      <p className="text-sm text-gray-600">{day.weekday_local || day.weekday}</p>

      {isArghya && day.arghya_time && (
        <p className="mt-3 rounded-lg bg-white/80 px-3 py-2 text-sm">
          <span className="block text-gray-500">
            {day.key === "sandhya_arghya" ? t(CHHATH_UI.sandhyaArghyaTime) : t(CHHATH_UI.ushaArghyaTime)}
          </span>
          <span className="text-lg font-bold text-[#7A1C1C]" data-field="arghya">
            {to12Hour(day.arghya_time)} IST
          </span>
        </p>
      )}

      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <dt className="text-gray-500">{t(CHHATH_UI.sunrise)}</dt>
          <dd className="font-semibold" data-field="sunrise">{to12Hour(day.sunrise)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">{t(CHHATH_UI.sunset)}</dt>
          <dd className="font-semibold" data-field="sunset">{to12Hour(day.sunset)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-gray-500">{t(CHHATH_UI.tithiAtSunrise)}</dt>
          <dd className="font-semibold">
            {lang === "hi" ? day.tithi_at_sunrise.name_hi : day.tithi_at_sunrise.name_en} · {paksha}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-sm leading-relaxed text-gray-700">{t(copy.summary)}</p>
    </li>
  );
}

function LoadingState({ lang }: { lang: ChhathLanguage }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="chhath-loading">
      <span className="sr-only">{CHHATH_UI.loading[lang]}</span>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-64 animate-pulse rounded-2xl border border-orange-100 bg-white/70" />
      ))}
    </div>
  );
}

function ErrorState({ lang, onRetry }: { lang: ChhathLanguage; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-white px-6 py-8 text-center" role="alert" data-testid="chhath-error">
      <p className="text-lg font-semibold text-[#7A1C1C]">{CHHATH_UI.errorTitle[lang]}</p>
      <p className="mt-2 text-sm text-gray-600">{CHHATH_UI.errorBody[lang]}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 min-h-[44px] rounded-full bg-[#7A1C1C] px-6 text-sm font-semibold text-white hover:bg-[#5e1414]"
      >
        {CHHATH_UI.retry[lang]}
      </button>
    </div>
  );
}
