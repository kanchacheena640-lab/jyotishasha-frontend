/** F10-P19: Grievance Officer disclosure, contact consistency, account-deletion
 * accuracy and the refunded-buyer review clause.
 *   npx tsc --module commonjs --target es2021 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/legalContacts.test.ts
 *   node .ts-test-out/legalContacts.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 * When the backend checkout sits next to this repo, the account-deletion page
 * is cross-checked against the deletion service; otherwise that is skipped.
 */
import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import { BUSINESS_SUPPORT, GRIEVANCE_OFFICER, LEGACY_PRIVACY_EMAIL } from "./legalContacts";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(file, "utf8");
const text = (file: string) => read(file).replace(/\s+/g, " ").replace(/&apos;/g, "'");
const PAGES = {
  privacy: "app/privacy-policy/page.tsx",
  terms: "app/terms/page.tsx",
  refund: "app/refund-policy/page.tsx",
  contact: "app/[locale]/contact/page.tsx",
  deletion: "app/account-deletion/page.tsx",
  footer: "components/Footer.tsx",
  grievance: "components/legal/GrievanceOfficer.tsx",
};

check("Grievance Officer: exactly the owner-confirmed facts, no invented phone or address", () => {
  assert.deepEqual(GRIEVANCE_OFFICER, { name: "Shiksha Sharma", designation: "Grievance Officer", email: "support@jyotishasha.com" });
  assert.ok(!/phone|address|tel:/i.test(JSON.stringify(Object.keys(GRIEVANCE_OFFICER))));
});
check("Grievance block: name, designation, email, 48h/one-month timelines, EN + HI", () => {
  const g = read(PAGES.grievance);
  assert.ok(g.includes("{GRIEVANCE_OFFICER.name}") && g.includes("{GRIEVANCE_OFFICER.designation}") && g.includes("mailto:${GRIEVANCE_OFFICER.email}"));
  assert.ok(g.includes("We acknowledge complaints within 48 hours and resolve them within one month of receipt."));
  assert.ok(g.includes("शिकायत अधिकारी") && g.includes("48 घंटे"));
  assert.ok(g.includes('id="grievance-officer"'));
});
check("business support line is labelled as such, never as the officer's personal number", () => {
  const g = read(PAGES.grievance);
  assert.ok(g.includes("General customer support (not the Grievance Officer's personal contact)"));
  assert.ok(g.includes("सामान्य ग्राहक सहायता (शिकायत अधिकारी का निजी संपर्क नहीं)"));
  assert.ok(!/GRIEVANCE_OFFICER\.(phone|address)/.test(g));
});
check("Grievance block appears on Privacy, Terms, Contact (EN/HI) and Account Deletion; footer links to it", () => {
  for (const key of ["privacy", "terms", "deletion"] as const) assert.ok(read(PAGES[key]).includes("<GrievanceOfficer />"), key);
  assert.ok(read(PAGES.contact).includes('<GrievanceOfficer lang={isHi ? "hi" : "en"} variant="card" />'));
  assert.ok(read(PAGES.footer).includes("/contact#grievance-officer"));
});
check("contacts are consistent: support email + one phone everywhere; jraviom@ only as the Privacy legacy route", () => {
  for (const key of ["privacy", "terms", "refund", "contact", "deletion", "footer"] as const) {
    const emails = new Set(read(PAGES[key]).match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []);
    for (const e of emails) assert.ok(e === BUSINESS_SUPPORT.email || (key === "privacy" && e === LEGACY_PRIVACY_EMAIL), `${key}: unexpected email ${e}`);
    for (const phone of read(PAGES[key]).match(/\+91[\s-]?\d{10}/g) || []) assert.equal(phone, BUSINESS_SUPPORT.phone, `${key}: ${phone}`);
  }
  assert.ok(read(PAGES.privacy).includes(LEGACY_PRIVACY_EMAIL), "legacy route kept by owner decision");
});
check("operator, payment and refund clauses are preserved", () => {
  assert.ok(text(PAGES.terms).includes("operated by Spiritual Lifestyle Company. By accessing"));
  assert.ok(text(PAGES.privacy).includes("Spiritual Lifestyle Company (“we,” “our,” “us”) operates"));
  assert.ok(text(PAGES.refund).includes("sole discretion of Spiritual Lifestyle Company"));
  assert.ok(!/Jyotishasha Private Limited/.test(Object.values(PAGES).map(read).join(" ")), "no silent transfer of legal responsibility");
});

check("account deletion: no blanket 'all data deleted' claim; real app path; timings", () => {
  const d = text(PAGES.deletion);
  assert.ok(!/All data will be permanently deleted/i.test(d));
  assert.ok(d.includes("open the Account tab and tap Delete Account. This takes effect immediately."));
  assert.ok(d.includes("Email requests are completed within 7 working days after we verify them."));
});
check("account deletion: discloses what is kept (payments, anonymised profile, report orders, app activity, reviews) and no invented retention period", () => {
  const d = text(PAGES.deletion);
  for (const phrase of ["Payment and purchase records", "kept in anonymised form", "Website report orders, including the name, email address, phone number and birth details",
    "Records of app activity", "Reviews of website reports", "at present they are not deleted automatically after a fixed period"]) assert.ok(d.includes(phrase), phrase);
  assert.ok(!/\d+\s*(years?|months?)/i.test(d), "no invented retention period");
});
check("Privacy 'Account Deletion' no longer claims usage data is deleted and links to the detail page", () => {
  const p = text(PAGES.privacy);
  assert.ok(!p.includes("and usage data, within"));
  assert.ok(p.includes("Records of app activity are also not removed by account deletion.") && p.includes('href="/account-deletion"'));
});
check("refunded buyers who received the report may review (Privacy + Terms)", () => {
  assert.ok(text(PAGES.privacy).includes("This includes buyers who later received a refund, as long as the report was delivered to them."));
  assert.ok(text(PAGES.terms).includes("A buyer who later received a refund may still leave a genuine review, as long as the report was delivered to them."));
});

const backend = path.resolve("..", "..", "Python", "Jyotishasha_Backend-main");
const service = path.join(backend, "modules", "auth", "account_deletion_service.py");
if (fs.existsSync(service)) {
  const src = read(service);
  check("backend matches the page: deleted tables, retained financial tables, Order untouched, anonymise-in-place", () => {
    assert.ok(/UserDashaTimeline, AlertMicroEvent, AIReport, UserNotification,\s+NotificationLog, DailyPersonalizedCache, FreeDailyQuestion\./.test(src));
    assert.ok(/CurrentEntitlement, SubscriptionEvent, ChatPack, AskNowOrder,\s+SubscriptionOrder\./.test(src));
    assert.ok(/Nothing else \(ProcessedPayment, ProcessedSubscriptionEvent, Order,/.test(src));
    assert.ok(/ANONYMIZE in place/.test(src));
    assert.ok(!/ActivityEvent|activity_events/.test(src), "activity events are not handled by account deletion (page says they are kept)");
    assert.ok(!/ReportReview|report_reviews/.test(src), "reviews are not handled by account deletion (page says so)");
  });
} else {
  console.log("SKIP: backend checkout not found next to this repo; deletion service not cross-checked");
}
console.log(`TOTAL: ${passed} passed, 0 failed`);
