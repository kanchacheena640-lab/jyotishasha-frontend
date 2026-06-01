export const revalidate = 86400;

export default function RahuKaalPage() {
  return (
    <main className="container mx-auto px-4 py-8">

      <h1>Today's Rahu Kaal</h1>

      <section>
        Live Rahu Kaal Timing
      </section>

      <section>
        Do's & Don'ts
      </section>

      <section>
        What is Rahu Kaal
      </section>

      <section>
        How Rahu Kaal is Calculated
      </section>

      <section>
        FAQ
      </section>

    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = params?.locale === "hi" ? "hi" : "en";

  return {
    title:
      lang === "hi"
        ? "आज का राहु काल | राहु काल समय, महत्व और गणना | ज्‍योतिष आशा"
        : "Today's Rahu Kaal | Rahu Kaal Timings, Meaning & Calculation | Jyotishasha",

    description:
      lang === "hi"
        ? "आज का राहु काल समय, राहु काल का महत्व, गणना विधि, क्या करें और क्या न करें। दैनिक राहु काल जानकारी।"
        : "Today's Rahu Kaal timings with meaning, calculation method, do's and don'ts. Daily updated Rahu Kaal information.",

    alternates: {
      canonical:
        lang === "hi"
          ? "https://www.jyotishasha.com/hi/rahu-kaal"
          : "https://www.jyotishasha.com/rahu-kaal",

      languages: {
        "en-US": "/rahu-kaal",
        "hi-IN": "/hi/rahu-kaal",
      },
    },

    openGraph: {
      title:
        lang === "hi"
          ? "आज का राहु काल"
          : "Today's Rahu Kaal",

      description:
        lang === "hi"
          ? "आज का राहु काल समय और महत्व"
          : "Today's Rahu Kaal timings and significance",

      url:
        lang === "hi"
          ? "/hi/rahu-kaal"
          : "/rahu-kaal",

      siteName: "Jyotishasha",
    },
  };
}