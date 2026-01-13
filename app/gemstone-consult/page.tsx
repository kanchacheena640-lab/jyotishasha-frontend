// app/gemstone-consult/page.tsx

import GemstoneConsultation from "@/components/GemstoneConsultation";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


export default function GemstoneConsultPage() {
  return (
    <main className="min-h-screen py-10 px-4">
        <GemstoneConsultation />

        {/* 🔐 EEAT TRUST */}
      <section className="mt-16">
        <EEATTrustSnippet />
      </section>
    </main>
  );
}
