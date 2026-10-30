import Image from "next/image";
import type { Locale, TeamMember } from "@/app/data/teamMembers";

/** F11-P02 -- one full team profile. Illustrations carry a visible
 * "Illustration" badge so artwork is never mistaken for the person. */
export default function TeamMemberCard({ member, locale }: { member: TeamMember; locale: Locale }) {
  const { image } = member;
  const isIllustration = image.kind === "illustration";

  return (
    <article className="flex h-full flex-col sm:flex-row gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="relative mx-auto sm:mx-0 h-28 w-28 sm:h-32 sm:w-32 shrink-0">
        <Image
          src={image.src}
          alt={image.alt[locale]}
          width={600}
          height={600}
          sizes="(min-width: 640px) 128px, 112px"
          unoptimized={image.src.endsWith(".svg")}
          className="h-full w-full rounded-2xl object-cover ring-1 ring-indigo-300/20"
        />
        {isIllustration && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-indigo-300/40 bg-[#0f0a1e] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-100">
            {locale === "hi" ? "चित्रण" : "Illustration"}
          </span>
        )}
      </div>
      <div className="min-w-0 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-bold text-white">{member.name[locale]}</h3>
        <p className="mt-0.5 text-sm font-medium text-amber-200/90">{member.title[locale]}</p>
        {member.experience && <p className="mt-1 text-xs uppercase tracking-wide text-indigo-200/80">{member.experience[locale]}</p>}
        <p className="mt-3 text-sm leading-relaxed text-gray-300">{member.summary[locale]}</p>
        <ul className="mt-3 flex flex-wrap justify-center sm:justify-start gap-1.5" aria-label={locale === "hi" ? "विशेषज्ञता" : "Expertise"}>
          {member.expertise.map((e) => (
            <li key={e.en} className="rounded-full border border-indigo-300/20 bg-indigo-400/10 px-2.5 py-0.5 text-xs text-indigo-100">
              {e[locale]}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** A pointer to a profile shown in another section -- never a second full card. */
export function TeamCrossReference({ member, note, href, locale }: { member: TeamMember; note: string; href: string; locale: Locale }) {
  return (
    <p className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-gray-300">
      <span className="text-indigo-200">{locale === "hi" ? "साथ ही: " : "Also on this team: "}</span>
      <a href={href} className="font-semibold text-white underline decoration-indigo-300/50 underline-offset-2 hover:decoration-white">
        {member.name[locale]}
      </a>
      <span className="text-gray-400"> · {member.title[locale]} — {note}</span>
    </p>
  );
}
