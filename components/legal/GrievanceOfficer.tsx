import { BUSINESS_SUPPORT, GRIEVANCE_OFFICER } from "@/lib/legalContacts";

const COPY = {
  heading: { en: "Grievance Officer", hi: "शिकायत अधिकारी (Grievance Officer)" },
  intro: {
    en: "For complaints about our services, purchases, reviews or how we handle your personal information, contact our Grievance Officer:",
    hi: "हमारी सेवाओं, खरीद, समीक्षाओं या आपकी व्यक्तिगत जानकारी के उपयोग से जुड़ी शिकायतों के लिए हमारे शिकायत अधिकारी से संपर्क करें:",
  },
  name: { en: "Name", hi: "नाम" },
  designation: { en: "Designation", hi: "पद" },
  email: { en: "Email", hi: "ईमेल" },
  timelines: {
    en: "We acknowledge complaints within 48 hours and resolve them within one month of receipt.",
    hi: "हम शिकायत मिलने के 48 घंटे के भीतर उसकी पुष्टि करते हैं और एक महीने के भीतर उसका समाधान करते हैं।",
  },
  support: {
    en: (phone: string) => `General customer support (not the Grievance Officer's personal contact): ${BUSINESS_SUPPORT.email}, phone ${phone}.`,
    hi: (phone: string) => `सामान्य ग्राहक सहायता (शिकायत अधिकारी का निजी संपर्क नहीं): ${BUSINESS_SUPPORT.email}, फ़ोन ${phone}।`,
  },
} as const;

/** F10-P19: Grievance Officer disclosure (Consumer Protection (E-Commerce)
 * Rules 2020 r.4(4)-(5); IT (SPDI) Rules 2011 r.5(9)). Only owner-confirmed
 * facts are shown; the business support line is labelled as such. */
export default function GrievanceOfficer({ lang = "en", variant = "policy" }: { lang?: "en" | "hi"; variant?: "policy" | "card" }) {
  return (
    <section id="grievance-officer" aria-labelledby="grievance-officer-heading" className={variant === "card" ? "bg-[#1e1b4b] p-6 rounded-2xl shadow-lg text-white scroll-mt-24" : "scroll-mt-24"}>
      <h2 id="grievance-officer-heading" className="text-2xl font-semibold mt-6 mb-2">{COPY.heading[lang]}</h2>
      <p className="text-gray-300 mb-2">{COPY.intro[lang]}</p>
      <p className="text-gray-300 mb-2">
        <strong>{COPY.name[lang]}:</strong> {GRIEVANCE_OFFICER.name}<br />
        <strong>{COPY.designation[lang]}:</strong> {GRIEVANCE_OFFICER.designation}<br />
        <strong>{COPY.email[lang]}:</strong>{" "}
        <a href={`mailto:${GRIEVANCE_OFFICER.email}`} className="underline">{GRIEVANCE_OFFICER.email}</a>
      </p>
      <p className="text-gray-300 mb-2">{COPY.timelines[lang]}</p>
      <p className="text-gray-400 text-sm mb-4">{COPY.support[lang](BUSINESS_SUPPORT.phone)}</p>
    </section>
  );
}
