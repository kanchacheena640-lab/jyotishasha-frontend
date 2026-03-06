type Props = {
  data: any;
};

function toMinutes(time: string) {
  const clean = time.trim();
  const isAMPM =
    clean.toLowerCase().includes("am") || clean.toLowerCase().includes("pm");

  if (!isAMPM) {
    const [h, m] = clean.split(":").map(Number);
    return h * 60 + m;
  }

  const date = new Date(`1970-01-01 ${clean}`);
  return date.getHours() * 60 + date.getMinutes();
}

export default function HomeTicker({ data }: Props) {
  if (!data) return null;

  const p = data?.selected_date ?? data;

  const slots = [
    ...(p?.chaughadiya?.day || []),
    ...(p?.chaughadiya?.night || []),
  ];

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let activeSlot: any = null;

  for (const slot of slots) {
    const startMin = toMinutes(slot.start);
    const endMin = toMinutes(slot.end);

    if (currentMinutes >= startMin && currentMinutes < endMin) {
      activeSlot = slot;
      break;
    }
  }

  if (!activeSlot && slots.length > 0) {
    activeSlot = slots[0];
  }

  const isGood = activeSlot?.nature_en === "shubh";

  const chaughadiyaMessage = activeSlot
    ? isGood
      ? `🟢 ${activeSlot.name_en} Chaughadiya (${activeSlot.start}–${activeSlot.end}) – Good for important work`
      : `🔴 ${activeSlot.name_en} Chaughadiya (${activeSlot.start}–${activeSlot.end}) – Avoid starting important tasks`
    : "";

  const panchakMessage = p?.panchak?.active
    ? "⚠ Panchak Present – Avoid starting auspicious activities"
    : "✅ Panchak Not Present";

  const sunriseMessage = `🌅 Sunrise ${p?.sunrise ?? "--:--"}`;
  const sunsetMessage = `🌇 Sunset ${p?.sunset ?? "--:--"}`;

  const tickerItems = (
    <>
      <span className={`${isGood ? "text-green-400" : "text-red-400"} mr-16`}>
        {chaughadiyaMessage}
      </span>

      <span
        className={`${
          p?.panchak?.active ? "text-yellow-400" : "text-green-400"
        } mr-16`}
      >
        {panchakMessage}
      </span>

      <span className="text-blue-300 mr-16">{sunriseMessage}</span>

      <span className="text-orange-300 mr-16">{sunsetMessage}</span>
    </>
  );

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 h-[48px] flex items-center overflow-hidden">

      {/* Label */}
      <div className="px-4 h-full flex items-center text-xs font-semibold text-indigo-300 bg-[#020617] whitespace-nowrap border-r border-gray-700 z-10">
        🪐 Astro Updates
      </div>

      {/* Marquee */}
      <div className="flex-1 ticker-wrapper">

        <div className="ticker-track whitespace-nowrap">

          <div className="flex items-center px-4 text-sm">
            {tickerItems}
          </div>

          <div className="flex items-center px-4 text-sm">
            {tickerItems}
          </div>

        </div>

      </div>

    </div>
  );
}