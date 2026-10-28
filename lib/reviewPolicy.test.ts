/** F10-P17: the Privacy Policy / Terms "Verified Buyer Reviews" clauses, the
 * notice beside the review form and the public review section must describe
 * what the review system actually does -- and the existing operator, payment
 * and refund clauses must be untouched until the legal transition is verified.
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/reviewPolicy.test.ts
 *   node .ts-test-out/reviewPolicy.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 * When the backend checkout sits next to this repo, its constants are
 * cross-checked too; otherwise those checks are reported as skipped.
 */
import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(file, "utf8");
// JSX text wraps across lines; compare on collapsed whitespace.
const text = (file: string) => read(file).replace(/\s+/g, " ").replace(/&apos;/g, "'").replace(/&quot;/g, '"');

const privacy = text("app/privacy-policy/page.tsx");
const terms = text("app/terms/page.tsx");
const refund = text("app/refund-policy/page.tsx");
const form = read("components/reports/ReviewForm.tsx");
const reviews = read("components/reports/ProductReviews.tsx");
const admin = read("app/admin/reviews/page.tsx");
const REASONS = ["spam", "abusive", "contains personal data", "off-topic", "not a review of the report"];

check("existing operator clauses are preserved (no unverified entity swap)", () => {
  assert.ok(privacy.includes("Spiritual Lifestyle Company (“we,” “our,” “us”) operates the Jyotishasha website"));
  assert.ok(terms.includes("operated by Spiritual Lifestyle Company. By accessing"));
  assert.ok(terms.includes("are the intellectual property of Spiritual Lifestyle Company."));
  assert.ok(refund.includes("operated by Spiritual Lifestyle Company."));
  assert.ok(refund.includes("sole discretion of Spiritual Lifestyle Company"));
});
check("payment and refund terms are unchanged", () => {
  assert.ok(!/review/i.test(refund), "Refund Policy needs no review clause");
  assert.ok(terms.includes("all purchases are generally non-refundable once the report has been generated or delivered"));
  assert.ok(terms.includes("Access to paid content is granted only after successful payment confirmation."));
  assert.ok(privacy.includes("We do not store or process your card or UPI details on our servers."));
});

check("Privacy Policy: review section with who, what, public, moderation, retention, deletion, contact", () => {
  assert.ok(read("app/privacy-policy/page.tsx").includes('id="reviews"'));
  assert.ok(privacy.includes('href="#reviews"'), "linked from 'How We Use Your Data'");
  for (const phrase of [
    "whose payment was confirmed and whose report was emailed to them",
    "Each order can have one review",
    "not the email address itself",
    "The link works for 365 days",
    "Your display name, star rating, review text and date are shown",
    "may appear in search results",
    "Your email address, phone number, birth details, order number and payment details are never shown",
    "We do not decline or remove a review because it is negative or has a low rating",
    "we do not change the words of any review",
    "up to three times",
    "The IP address is turned into a one-way code",
    "not stored with your review",
    "There is no automatic deletion date",
    "If the order record is deleted, its review is deleted with it",
    "email support@jyotishasha.com from the email address used for the order",
    "we delete the review completely",
    "search engines may show an older copy",
  ]) assert.ok(privacy.includes(phrase.replace(/<[^>]+>/g, "")) || privacy.replace(/<\/?strong>/g, "").includes(phrase), `missing: ${phrase}`);
  for (const reason of REASONS) assert.ok(privacy.includes(reason), `reason ${reason}`);
});
check("F10-P18 contacts: support@ added for privacy and account deletion; the existing jraviom@ route is kept", () => {
  assert.ok(privacy.includes("<strong>Email:</strong> support@jyotishasha.com or jraviom@gmail.com"));
  assert.ok(privacy.includes("<strong> support@jyotishasha.com </strong> or <strong> jraviom@gmail.com </strong> from your registered email address"));
  assert.ok(privacy.includes("deleting your Jyotishasha app account does not delete a review"), "account deletion does not cover website-order reviews");
});
check("Privacy Policy makes no unsupported promises (no deadline, no DPDP compliance claim)", () => {
  const section = privacy.slice(privacy.indexOf('id="reviews"'), privacy.indexOf("Data Protection & Retention"));
  assert.ok(!/within \d+ (working )?days|DPDP|Digital Personal Data Protection|compliant|GDPR/i.test(section), "unsupported promise in review section");
});

check("Terms: review rules, authenticity, negative reviews welcome, closed list of moderation grounds", () => {
  assert.ok(read("app/terms/page.tsx").includes('id="reviews"'));
  for (const phrase of [
    "describes your own honest experience of the report you bought",
    "in exchange for, payment, a discount or any other benefit",
    "Negative reviews are welcome.",
    "We do not decline, remove or hide a review because it is negative or has a low rating",
    "We may decline or remove a review only if it is spam",
    'href="/privacy-policy#reviews"',
    "until the review is deleted",
  ]) assert.ok(terms.replace(/<\/?strong>/g, "").includes(phrase), `missing: ${phrase}`);
  for (const reason of REASONS) assert.ok(terms.includes(reason), `reason ${reason}`);
});

check("review form: EN/HI notice before submit, linked to both policies", () => {
  assert.ok(/notice: \{\s*en: "Your display name, star rating, review and date will be shown publicly/.test(form));
  assert.ok(form.includes("hi: \"आपका प्रदर्शित नाम, स्टार रेटिंग, समीक्षा और तारीख रिपोर्ट पेज पर सार्वजनिक रूप से दिखेंगे"));
  assert.ok(form.includes("we never remove a review for being negative") && form.includes("नकारात्मक होने के कारण हम कोई समीक्षा नहीं हटाते"));
  assert.ok(form.includes('href="/terms#reviews"') && form.includes('href="/privacy-policy#reviews"'));
  assert.ok(form.includes('englishOnly: { en: "", hi: " (अंग्रेज़ी में)" }'), "Hindi readers are told the policies are in English");
  assert.ok(form.indexOf('id="review-notice"') < form.indexOf('<button type="submit"'), "notice sits before the submit button");
  assert.ok(form.includes('aria-describedby="review-notice"'));
});
check("public review section links to the review rules", () => {
  assert.ok(reviews.includes('href="/terms#reviews"') && reviews.includes("We do not remove reviews for being negative."));
});
check("admin: privacy-request deletion is confirmed and found by order id", () => {
  assert.ok(admin.includes("act(r.id, 'delete')") && admin.includes("window.confirm("));
  assert.ok(admin.includes("order_id=${encodeURIComponent(lookup)}"));
  // Execute the exact order-id patterns from both files: digits only.
  const adminPattern = new RegExp(admin.match(/setLookup\(\/(.+?)\/\.test\(/)![1]);
  const bffPattern = new RegExp(read("app/api/admin/reviews/route.ts").match(/if \(!\/(.+?)\/\.test\(orderId\)\)/)![1]);
  for (const p of [adminPattern, bffPattern]) {
    assert.ok(p.test("675") && p.test("1"), `${p} must accept a numeric order id`);
    assert.ok(!p.test("abc") && !p.test("1;drop") && !p.test("") && !p.test("d"), `${p} must reject non-digits`);
  }
});
check("'removed from the report page straight away': moderation invalidates the cached review summaries", () => {
  assert.ok(privacy.includes("removed from the report page straight away"));
  const lib = read("lib/reportReviews.ts");
  const bff = read("app/api/admin/reviews/route.ts");
  assert.ok(lib.includes("getJson<ReviewSummary>(`/api/reviews/product/${encodeURIComponent(slug)}`, [REVIEWS_CACHE_TAG])"), "review summaries carry the cache tag");
  assert.ok(lib.includes("next: { revalidate: REVALIDATE_SECONDS, ...(tags ? { tags } : {}) }"), "tag is passed to the Next fetch cache");
  assert.ok(bff.includes("if (res.ok) revalidateTag(REVIEWS_CACHE_TAG);"), "BFF invalidates after publish/reject/delete");
});

const backend = path.resolve("..", "..", "Python", "Jyotishasha_Backend-main");
if (fs.existsSync(path.join(backend, "modules", "reviews"))) {
  const tokens = read(path.join(backend, "modules", "reviews", "review_tokens.py"));
  const service = read(path.join(backend, "modules", "reviews", "review_service.py"));
  const limits = read(path.join(backend, "routes", "routes_reviews.py"));
  const model = read(path.join(backend, "modules", "reviews", "models.py"));
  check("backend matches the policy: 365-day links, 3 edits, 10-min/1-hour windows, cascade, hard delete", () => {
    assert.ok(tokens.includes("TOKEN_MAX_AGE_SECONDS = 365 * 24 * 3600"));
    assert.ok(service.includes("MAX_EDITS = 3"));
    assert.ok(limits.includes('_limited("eligibility", 30, 600)') && limits.includes('_limited("submit", 10, 3600)'));
    assert.ok(/ondelete="CASCADE"/i.test(model));
    assert.ok(service.includes("db.session.delete(review)"));
    assert.ok(/REJECT_REASONS = \("SPAM", "ABUSIVE", "PERSONAL_DATA", "OFF_TOPIC", "NOT_A_REVIEW"\)/.test(service));
  });
} else {
  console.log("SKIP: backend checkout not found next to this repo; constants not cross-checked");
}
console.log(`TOTAL: ${passed} passed, 0 failed`);
