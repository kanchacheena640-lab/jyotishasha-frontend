import PolicyEffectiveDate from "@/components/legal/PolicyEffectiveDate";
import GrievanceOfficer from "@/components/legal/GrievanceOfficer";

export const metadata = {
  title: "Terms & Conditions | Jyotishasha",
  description:
    "Read Jyotishasha's Terms & Conditions before using our astrology tools and personalized reports. Understand your rights, responsibilities, and limitations.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <PolicyEffectiveDate policy="terms" />

      <p className="text-gray-300 mb-4">
        These Terms & Conditions govern your use of the Jyotishasha website and
        mobile application, operated by Spiritual Lifestyle Company. By accessing
        our services or purchasing any astrology-related product, you agree to
        be bound by these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Eligibility</h2>
      <p className="text-gray-300 mb-4">
        You must be at least 13 years of age to use Jyotishasha. By using our
        services, you confirm that you meet this eligibility requirement.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Scope of Services</h2>
      <p className="text-gray-300 mb-4">
        Jyotishasha provides astrology-based content including Kundali analysis,
        horoscopes, Panchang details, muhurtha information, and personalized
        reports generated using a structured Vedic astrology system. All content
        is offered for informational and spiritual guidance purposes only.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        User Responsibilities
      </h2>
      <p className="text-gray-300 mb-4">
        You are responsible for ensuring that all information provided, including
        date, time, and place of birth, is accurate. Jyotishasha is not liable for
        inaccuracies or outcomes resulting from incorrect or incomplete user
        data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Payments & Access
      </h2>
      <p className="text-gray-300 mb-4">
        Certain services or reports may require payment. Payments are processed
        securely through third-party gateways. Access to paid content is granted
        only after successful payment confirmation.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Refund & Cancellation
      </h2>
      <p className="text-gray-300 mb-4">
        Due to the personalized and digital nature of astrology reports, all
        purchases are generally non-refundable once the report has been
        generated or delivered. Any exceptions are handled at our sole
        discretion.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Intellectual Property
      </h2>
      <p className="text-gray-300 mb-4">
        All content, designs, reports, text, graphics, and software associated
        with Jyotishasha are the intellectual property of Spiritual Lifestyle
        Company. Unauthorized copying, reproduction, resale, or distribution is
        strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Prohibited Use
      </h2>
      <p className="text-gray-300 mb-4">
        Users must not misuse the platform, attempt to disrupt services, abuse
        content, or use Jyotishasha for unlawful or harmful activities. We
        reserve the right to restrict or terminate access in case of misuse.
      </p>

      <h2 id="reviews" className="text-2xl font-semibold mt-6 mb-2 scroll-mt-24">
        Verified Buyer Reviews
      </h2>
      <p className="text-gray-300 mb-4">
        Only customers who bought a report on the Jyotishasha website, whose
        payment was confirmed and whose report was emailed to them, can review
        it, using the personal link in the report delivery email. Each order can
        have one review, which you can edit up to three times. A buyer who later
        received a refund may still leave a genuine review, as long as the
        report was delivered to them.
      </p>
      <p className="text-gray-300 mb-2">When you write a review, you agree that it:</p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li>describes your own honest experience of the report you bought;</li>
        <li>
          is not written for, or in exchange for, payment, a discount or any
          other benefit, and not on behalf of anyone else;
        </li>
        <li>
          does not contain abusive content, anyone&apos;s personal data
          (including your own contact details), links or advertising.
        </li>
      </ul>
      <p className="text-gray-300 mb-4">
        <strong>Negative reviews are welcome.</strong> Honest critical or
        low-rated reviews are allowed. We do not decline, remove or hide a
        review because it is negative or has a low rating, and we do not change
        the words of any review.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Moderation.</strong> Reviews containing links, email addresses,
        phone numbers or HTML code are held for a check by our team before they
        appear. We may decline or remove a review only if it is spam, abusive,
        contains personal data, is off-topic or is not a review of the report.
        You can ask us to delete your own review at any time, as explained in
        our{" "}
        <a href="/privacy-policy#reviews" className="underline">
          Privacy Policy
        </a>
        .
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Display.</strong> By submitting a review, you allow Jyotishasha
        to show your review, rating, display name and date on our website,
        including in the page information that search engines read, until the
        review is deleted. Reviews are the personal opinions of their authors,
        not statements by Jyotishasha.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Limitation of Liability
      </h2>
      <p className="text-gray-300 mb-4">
        Astrology is interpretive and subjective in nature. We do not guarantee
        specific results, events, or outcomes. Jyotishasha and its operators
        shall not be held liable for any decisions, losses, or actions taken by
        users based on the content or guidance provided.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Disclaimer
      </h2>
      <p className="text-gray-300 mb-4">
        Astrology is a belief-based and interpretive system. All predictions,
        reports, and guidance provided through Jyotishasha are for informational
        and spiritual purposes only. They should not be considered as medical,
        legal, financial, or professional advice.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Governing Law
      </h2>
      <p className="text-gray-300 mb-4">
        These Terms & Conditions shall be governed and interpreted in accordance
        with the laws of India.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Modifications to Terms
      </h2>
      <p className="text-gray-300 mb-4">
        We reserve the right to update or modify these Terms & Conditions at any
        time. Continued use of our services after changes indicates acceptance
        of the revised terms.
      </p>

      <GrievanceOfficer />

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Contact Information
      </h2>
      <p className="text-gray-300">
        If you have any questions regarding these Terms & Conditions, please
        contact us at:
        <br />
        <strong>Email:</strong> support@jyotishasha.com <br />
        <strong>Phone:</strong> +91 9118877495
      </p>
    </div>
  );
}
