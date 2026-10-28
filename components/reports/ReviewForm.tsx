"use client";

import { useEffect, useState } from "react";
import { reportsData } from "@/app/data/reportsData";
import { getReportProductPath } from "@/lib/reportProductSeo";
import { BACKEND_URL } from "@/lib/reportReviews";

type Lang = "en" | "hi";
type OwnReview = { rating: number; body: string; display_name: string; status: string; edits_left: number };
type Eligibility = { product: string; product_name: string; default_display_name: string; review: OwnReview | null };

const T = {
  title: { en: "Review your report", hi: "अपनी रिपोर्ट की समीक्षा करें" },
  loading: { en: "Checking your review link…", hi: "आपका समीक्षा लिंक जाँचा जा रहा है…" },
  missing: { en: "This review link is incomplete. Please open the link from your report email.", hi: "यह समीक्षा लिंक अधूरा है। कृपया अपनी रिपोर्ट ईमेल वाला लिंक खोलें।" },
  errors: {
    invalid_token: { en: "This review link is not valid. Please use the link from your report email.", hi: "यह समीक्षा लिंक मान्य नहीं है। कृपया अपनी रिपोर्ट ईमेल वाला लिंक उपयोग करें।" },
    expired_token: { en: "This review link has expired.", hi: "इस समीक्षा लिंक की अवधि समाप्त हो गई है।" },
    not_paid: { en: "Reviews open once your payment is confirmed and your report is delivered.", hi: "भुगतान की पुष्टि और रिपोर्ट मिलने के बाद ही समीक्षा की जा सकती है।" },
    not_delivered: { en: "Reviews open once your report has been delivered to your email.", hi: "रिपोर्ट आपके ईमेल पर पहुँचने के बाद ही समीक्षा की जा सकती है।" },
    reviews_disabled: { en: "Reviews are temporarily unavailable. Please try again later.", hi: "समीक्षाएँ अभी उपलब्ध नहीं हैं। कृपया बाद में प्रयास करें।" },
    rate_limited: { en: "Too many attempts. Please try again in a while.", hi: "बहुत अधिक प्रयास। कृपया कुछ देर बाद प्रयास करें।" },
    edit_limit_reached: { en: "You have already edited this review the maximum number of times.", hi: "आप इस समीक्षा को अधिकतम बार संपादित कर चुके हैं।" },
    invalid_rating: { en: "Please choose a rating from 1 to 5 stars.", hi: "कृपया 1 से 5 स्टार के बीच रेटिंग चुनें।" },
    invalid_body_length: { en: "Please write between 20 and 2000 characters.", hi: "कृपया 20 से 2000 अक्षरों के बीच लिखें।" },
    invalid_display_name: { en: "Display name: letters and spaces only, up to 40 characters.", hi: "प्रदर्शित नाम: केवल अक्षर और स्पेस, अधिकतम 40 अक्षर।" },
    generic: { en: "Something went wrong. Please try again.", hi: "कुछ गलत हो गया। कृपया फिर से प्रयास करें।" },
  } as Record<string, Record<Lang, string>>,
  forProduct: { en: "Your review of", hi: "आपकी समीक्षा:" },
  rating: { en: "Your rating", hi: "आपकी रेटिंग" },
  star: { en: (n: number) => `${n} star${n > 1 ? "s" : ""}`, hi: (n: number) => `${n} स्टार` },
  body: { en: "Your review", hi: "आपकी समीक्षा" },
  bodyHint: { en: "What was useful? What could be better? Honest feedback — positive or negative — is welcome.", hi: "क्या उपयोगी लगा? क्या बेहतर हो सकता है? सकारात्मक या नकारात्मक — ईमानदार राय का स्वागत है।" },
  name: { en: "Name shown publicly", hi: "सार्वजनिक रूप से दिखने वाला नाम" },
  nameHint: { en: "Your email and birth details are never shown.", hi: "आपका ईमेल और जन्म विवरण कभी नहीं दिखाया जाता।" },
  submit: { en: "Submit review", hi: "समीक्षा भेजें" },
  update: { en: "Update review", hi: "समीक्षा अपडेट करें" },
  editsLeft: { en: (n: number) => `You can edit this review ${n} more time${n === 1 ? "" : "s"}.`, hi: (n: number) => `आप यह समीक्षा ${n} बार और संपादित कर सकते हैं।` },
  published: { en: "Thank you! Your review is now published on the report page.", hi: "धन्यवाद! आपकी समीक्षा रिपोर्ट पेज पर प्रकाशित हो गई है।" },
  pending: { en: "Thank you! Your review will appear after a quick check (reviews with links or contact details are checked by our team).", hi: "धन्यवाद! एक छोटी जाँच के बाद आपकी समीक्षा दिखेगी (लिंक या संपर्क विवरण वाली समीक्षाएँ हमारी टीम जाँचती है)।" },
  rejected: { en: "This review was not published by our moderators.", hi: "यह समीक्षा हमारे मॉडरेटर द्वारा प्रकाशित नहीं की गई।" },
  view: { en: "View the report page", hi: "रिपोर्ट पेज देखें" },
  // F10-P17 notice shown before submitting; mirrors the Privacy Policy and
  // Terms "Verified Buyer Reviews" sections.
  notice: {
    en: "Your display name, star rating, review and date will be shown publicly on the report page and may appear in search results. Your email, birth details and order number are never shown. Reviews with links or contact details are checked by our team first; we never remove a review for being negative. To delete your review later, email support@jyotishasha.com from your order email.",
    hi: "आपका प्रदर्शित नाम, स्टार रेटिंग, समीक्षा और तारीख रिपोर्ट पेज पर सार्वजनिक रूप से दिखेंगे और सर्च परिणामों में भी दिख सकते हैं। आपका ईमेल, जन्म विवरण और ऑर्डर नंबर कभी नहीं दिखाए जाते। लिंक या संपर्क विवरण वाली समीक्षाएँ पहले हमारी टीम जाँचती है; नकारात्मक होने के कारण हम कोई समीक्षा नहीं हटाते। बाद में समीक्षा हटवाने के लिए अपने ऑर्डर वाले ईमेल से support@jyotishasha.com पर लिखें।",
  },
  agree: { en: "By submitting, you agree to the review rules in our", hi: "भेजकर आप हमारी इन शर्तों के समीक्षा नियमों से सहमत होते हैं:" },
  privacy: { en: "Privacy Policy", hi: "गोपनीयता नीति" },
  terms: { en: "Terms & Conditions", hi: "नियम और शर्तें" },
  and: { en: "and", hi: "और" },
  englishOnly: { en: "", hi: " (अंग्रेज़ी में)" },
};

function productHref(product: string, lang: Lang): string {
  if (reportsData.some((r) => r.slug === product)) return getReportProductPath(product, lang);
  return `${lang === "hi" ? "/hi" : ""}/reports/focused/${product.replace(/_/g, "-")}`;
}

async function postJson(path: string, body: unknown): Promise<{ ok: boolean; data: any }> {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return { ok: res.ok, data: await res.json().catch(() => ({})) };
  } catch {
    return { ok: false, data: { error: "generic" } };
  }
}

export default function ReviewForm({ lang }: { lang: Lang }) {
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "missing" | "error" | "ready" | "done">("loading");
  const [error, setError] = useState("generic");
  const [info, setInfo] = useState<Eligibility | null>(null);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<OwnReview | null>(null);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const errText = (code: string) => (T.errors[code] || T.errors.generic)[lang];

  useEffect(() => {
    const match = window.location.hash.match(/[#&]t=([^&]+)/);
    // Keep the private token out of the visible address bar / screenshots / shares.
    if (window.location.hash) window.history.replaceState(null, "", window.location.pathname);
    if (!match) { setState("missing"); return; }
    const t = decodeURIComponent(match[1]);
    setToken(t);
    postJson("/api/reviews/eligibility", { token: t }).then(({ ok, data }) => {
      if (!ok) { setError(data.error || "generic"); setState("error"); return; }
      setInfo(data);
      setName(data.review?.display_name || data.default_display_name || "");
      if (data.review) { setRating(data.review.rating); setBody(data.review.body); }
      setState("ready");
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || busy) return;
    setBusy(true);
    setSubmitError(null);
    const { ok, data } = await postJson("/api/reviews/submit", { token, rating, body, display_name: name });
    setBusy(false);
    if (!ok) { setSubmitError(data.error || "generic"); return; }
    setResult(data.review);
    setState("done");
  }

  const editsLeft = info?.review ? info.review.edits_left : null;
  const locked = editsLeft === 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">{T.title[lang]}</h1>
      {state === "loading" && <p role="status" className="text-center text-slate-400">{T.loading[lang]}</p>}
      {state === "missing" && <p role="alert" className="text-center">{T.missing[lang]}</p>}
      {state === "error" && <p role="alert" className="text-center">{errText(error)}</p>}

      {state === "done" && result && info && (
        <div role="status" className="text-center space-y-4">
          <p>{result.status === "PUBLISHED" ? T.published[lang] : result.status === "REJECTED" ? T.rejected[lang] : T.pending[lang]}</p>
          <a href={productHref(info.product, lang)} className="inline-block underline text-purple-300 hover:text-white">{T.view[lang]}</a>
        </div>
      )}

      {state === "ready" && info && (
        <form onSubmit={submit} className="space-y-6 rounded-2xl border border-slate-700/60 bg-slate-900/40 p-6">
          <p className="text-slate-300">{T.forProduct[lang]} <strong className="text-white">{info.product_name}</strong></p>
          {info.review?.status === "REJECTED" && <p className="text-amber-300 text-sm">{T.rejected[lang]}</p>}
          <fieldset disabled={locked}>
            <legend className="font-semibold text-white mb-2">{T.rating[lang]}</legend>
            <div className="flex gap-2" role="radiogroup">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="cursor-pointer">
                  <input type="radio" name="rating" value={n} checked={rating === n} onChange={() => setRating(n)} className="sr-only peer" required />
                  <span aria-hidden="true" className={`text-3xl ${n <= rating ? "text-amber-400" : "text-slate-600"} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-purple-400 rounded`}>★</span>
                  <span className="sr-only">{T.star[lang](n)}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="review-body" className="block font-semibold text-white mb-1">{T.body[lang]}</label>
            <p id="review-body-hint" className="text-xs text-slate-400 mb-2">{T.bodyHint[lang]}</p>
            <textarea id="review-body" aria-describedby="review-body-hint" value={body} onChange={(e) => setBody(e.target.value)}
              minLength={20} maxLength={2000} rows={6} required disabled={locked}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-slate-100" />
            <p className="text-right text-xs text-slate-500">{body.trim().length}/2000</p>
          </div>
          <div>
            <label htmlFor="review-name" className="block font-semibold text-white mb-1">{T.name[lang]}</label>
            <input id="review-name" aria-describedby="review-name-hint" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} disabled={locked}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-slate-100" />
            <p id="review-name-hint" className="text-xs text-slate-400 mt-1">{T.nameHint[lang]}</p>
          </div>
          {editsLeft !== null && <p className="text-xs text-slate-400">{T.editsLeft[lang](editsLeft)}</p>}
          <div id="review-notice" className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-3 text-xs text-slate-300 space-y-2">
            <p>{T.notice[lang]}</p>
            <p>
              {T.agree[lang]}{" "}
              <a href="/terms#reviews" target="_blank" rel="noopener" className="underline text-purple-300 hover:text-white">{T.terms[lang]}</a>{" "}
              {T.and[lang]}{" "}
              <a href="/privacy-policy#reviews" target="_blank" rel="noopener" className="underline text-purple-300 hover:text-white">{T.privacy[lang]}</a>
              {T.englishOnly[lang]}.
            </p>
          </div>
          <button type="submit" aria-describedby="review-notice" disabled={busy || locked || rating < 1}
            className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white disabled:opacity-50 hover:bg-purple-700">
            {info.review ? T.update[lang] : T.submit[lang]}
          </button>
          {submitError && <p role="alert" className="text-sm text-amber-300">{errText(submitError)}</p>}
        </form>
      )}
    </div>
  );
}
