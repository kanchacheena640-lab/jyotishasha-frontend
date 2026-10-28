import { POLICY_PUBLICATION, formatEffectiveDate, type PolicyKey } from "@/lib/policyPublication";

/** Shows the recorded publication date of a policy's current text, or nothing
 * when none is recorded (see lib/policyPublication.ts). */
export default function PolicyEffectiveDate({ policy }: { policy: PolicyKey }) {
  const formatted = formatEffectiveDate(POLICY_PUBLICATION[policy].effectiveDate);
  if (!formatted) return null;
  return <p className="text-gray-400 text-sm -mt-3 mb-6">Effective date: {formatted}</p>;
}
