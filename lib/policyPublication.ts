/**
 * F10-P18 -- policy effective dates.
 *
 * `effectiveDate` is the date (IST, YYYY-MM-DD) the policy's CURRENT text was
 * first published on www.jyotishasha.com. It is entered by hand in the commit
 * that releases the text -- never the build date, never a guessed past date.
 * null = not recorded: the page shows no date at all.
 *
 * `fingerprint` is the SHA-256 of the page source (whitespace collapsed, the
 * PolicyEffectiveDate lines left out), plus any shared legal block the page
 * renders (e.g. GrievanceOfficer and lib/legalContacts.ts). lib/policyPublication.test.ts fails
 * when a policy's text changes without this record being updated, so changed
 * text cannot go out under an older date. When a policy's text changes:
 *   1. copy the new fingerprint the test prints into `fingerprint`;
 *   2. set `effectiveDate` to the IST date the change goes live (the day it is
 *      pushed to main and deployed) -- if the release slips, update it first.
 */
export type PolicyKey = "privacy" | "terms" | "refund";

export const POLICY_PUBLICATION: Record<PolicyKey, { effectiveDate: string | null; fingerprint: string }> = {
  privacy: { effectiveDate: "2026-10-29", fingerprint: "c697fb7c3ad7d818987d3d451c9679d4ee66e18fe51b528769bc113213c9f47f" },
  terms: { effectiveDate: "2026-10-29", fingerprint: "2ca3d72aee0728be5d7b630cd04473c294fc1c5c87e7d2a95ebf0b6899f72f4e" },
  // Refund Policy text is unchanged and its original publication date is not
  // on record, so no date is shown.
  refund: { effectiveDate: null, fingerprint: "d351d00463e37ae2bbb916c1a245d5016bc7bba3763860bb56d90c609d76f563" },
};

export const POLICY_FILES: Record<PolicyKey, string> = {
  privacy: "app/privacy-policy/page.tsx",
  terms: "app/terms/page.tsx",
  refund: "app/refund-policy/page.tsx",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-10-25" -> "25 October 2026"; null for anything that is not a real calendar date. */
export function formatEffectiveDate(iso: string | null): string | null {
  const m = iso ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso) : null;
  if (!m) return null;
  const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
