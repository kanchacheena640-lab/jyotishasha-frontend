import { hinduMonthsData, MonthSlug } from '@/lib/data/hinduMonthsData';

function getApproxHinduMonthSlug(): MonthSlug {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  if ((m === 3 && d >= 22) || (m === 4 && d < 20)) return "chaitra";
  if ((m === 4 && d >= 20) || (m === 5 && d < 21)) return "vaishakha";
  if ((m === 5 && d >= 21) || (m === 6 && d < 21)) return "jyeshtha";
  if ((m === 6 && d >= 21) || (m === 7 && d < 20)) return "ashadha";
  if ((m === 7 && d >= 20) || (m === 8 && d < 18)) return "shravana";
  if ((m === 8 && d >= 18) || (m === 9 && d < 17)) return "bhadrapada";
  if ((m === 9 && d >= 17) || (m === 10 && d < 16)) return "ashwin";
  if ((m === 10 && d >= 16) || (m === 11 && d < 15)) return "kartika";
  if ((m === 11 && d >= 15) || (m === 12 && d < 14)) return "margashirsha";
  if ((m === 12 && d >= 14) || (m === 1 && d < 12)) return "pausha";
  if ((m === 1 && d >= 12) || (m === 2 && d < 11)) return "magha";
  return "phalguna";
}

export default function CurrentHinduMonth({ isHi }: { isHi: boolean }) {
  const slug = getApproxHinduMonthSlug();
  const data = hinduMonthsData[slug];

  return (
    <section className="py-6 border-y border-white/10 text-center">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
        {isHi ? "वर्तमान हिंदू मास (अनुमानित)" : "Current Hindu Month (Approximate)"}
      </p>
      <h2 className="text-2xl font-bold text-purple-300">
        {isHi ? data.basic.hindiName : data.basic.englishName}
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        {isHi ? data.ritu.name.hi : data.ritu.name.en}
        {" · "}
        {isHi ? data.ayana.name.hi : data.ayana.name.en}
      </p>
    </section>
  );
}
