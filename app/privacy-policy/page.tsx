import PolicyEffectiveDate from "@/components/legal/PolicyEffectiveDate";
import GrievanceOfficer from "@/components/legal/GrievanceOfficer";

export const metadata = {
  title: "Privacy Policy | Jyotishasha",
  description:
    "Read Jyotishasha's Privacy Policy to understand how we collect, use, and protect your personal information across our website and mobile application.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <PolicyEffectiveDate policy="privacy" />

      <p className="text-gray-300 mb-4">
        Spiritual Lifestyle Company (“we,” “our,” “us”) operates the Jyotishasha
        website and mobile application. We are committed to safeguarding the
        privacy of our users and customers. This Privacy Policy explains how we
        collect, use, store, and protect your personal information when you use
        our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="text-gray-300 mb-4">
        We may collect personal information such as your name, email address,
        phone number, date of birth, time and place of birth, gender, and other
        details required for generating astrology-related content. When you make
        a purchase, payment processing is handled securely by third-party
        gateways.
      </p>
      <p className="text-gray-300 mb-4">
        We may also collect non-personal information including device details,
        browser type, IP address, and usage analytics to improve app and website
        performance.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        How We Use Your Data
      </h2>
      <p className="text-gray-300 mb-4">
        Your information is used strictly for:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li>Generating personalized astrology reports and horoscopes</li>
        <li>Providing Panchang, Kundali, and related services</li>
        <li>Improving user experience and service quality</li>
        <li>
          Sending service-related notifications or updates (only if enabled)
        </li>
        <li>
          Publishing verified buyer reviews you choose to submit, and preventing
          misuse of the review system (see{" "}
          <a href="#reviews" className="underline">Verified Buyer Reviews</a>)
        </li>
      </ul>
      <p className="text-gray-300 mb-4">
        We do <strong>not</strong> sell or trade your personal data. Limited data
        may be shared with trusted third-party services such as payment gateways,
        analytics, notification services, and hosting providers solely for
        service delivery, security, and legal compliance, and with advertising
        measurement partners as described under{" "}
        <a href="#advertising-measurement" className="underline">Advertising Measurement</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Payment Security
      </h2>
      <p className="text-gray-300 mb-4">
        All payments are processed through secure and trusted payment gateways
        such as Razorpay. We do not store or process your card or UPI details on
        our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Cookies & Analytics
      </h2>
      <p className="text-gray-300 mb-4">
        Our website and app may use cookies or similar technologies to enhance
        functionality, remember preferences, and analyze traffic. You can
        disable cookies in your browser or device settings, though some features
        may not work as intended.
      </p>

      <h2 id="advertising-measurement" className="text-2xl font-semibold mt-6 mb-2 scroll-mt-24">
        Advertising Measurement
      </h2>
      <p className="text-gray-300 mb-4">
        We use advertising measurement tools to understand whether our ads
        lead to report purchases. These tools may be provided by Google
        (including Google Analytics and Google advertising services, loaded
        through Google Tag Manager), Meta, and OpenAI (advertising in ChatGPT).
        They may automatically collect information such as your browser and
        device type, the pages you visit on our website, and identifiers stored
        in cookies or similar technologies.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>When we share purchase information.</strong> Only after a
        payment has been confirmed by our payment system, we may share a
        purchase event containing an order reference number, the amount and
        currency, and product information. With OpenAI we share only a general
        product type (for example, &quot;focused report&quot;), never the
        report title or topic. Google Analytics may receive the report name and
        category. We do not include your name, email address, phone number,
        date, time or place of birth, or the content of your report in these
        purchase events.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Cookies used for advertising measurement.</strong> When
        advertising measurement is allowed, OpenAI&apos;s measurement tool may
        store two first-party cookies on our website: <code>__oppref</code>,
        which records the reference of an ad you clicked in ChatGPT (kept for
        up to 30 days), and <code>__obref</code>, a randomly generated browser
        reference (kept for up to 365 days). Google and Meta may set their own
        cookies as described in their policies. Your browser settings or
        clearing cookies can shorten these periods.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Your choices.</strong> In most countries outside the European
        Economic Area, the United Kingdom and Switzerland, advertising
        measurement is on by default, and you can turn it off at any time using
        the &quot;Cookie Settings&quot; link at the bottom of our website
        pages. Turning off
        Advertising stops OpenAI&apos;s measurement on that browser, removes
        its cookies, and sends your updated choice to Google&apos;s tags. In
        the European Economic Area, the United Kingdom and Switzerland, your
        choices are managed through the consent message shown on our website,
        and OpenAI measurement is not used. You can also block or delete
        cookies in your browser settings.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Retention.</strong> Information received by these partners is
        handled and retained under their own privacy policies:{" "}
        <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Google</a>,{" "}
        <a href="https://www.facebook.com/privacy/policy/" className="underline" target="_blank" rel="noopener noreferrer">Meta</a> and{" "}
        <a href="https://openai.com/policies/privacy-policy/" className="underline" target="_blank" rel="noopener noreferrer">OpenAI</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Mobile App Permissions
      </h2>
      <p className="text-gray-300 mb-4">
        The Jyotishasha mobile application may request permissions such as
        notification access to deliver daily horoscopes, Panchang alerts, and
        important astrology updates. These permissions are optional and can be
        managed from your device settings.
      </p>

      <h2 id="reviews" className="text-2xl font-semibold mt-6 mb-2 scroll-mt-24">
        Verified Buyer Reviews
      </h2>
      <p className="text-gray-300 mb-4">
        <strong>Who can write a review.</strong> Only customers who bought a
        report on the Jyotishasha website, whose payment was confirmed and whose
        report was emailed to them, can write a review. This includes buyers
        who later received a refund, as long as the report was delivered to
        them. Each order can have one review.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>How we verify it.</strong> The report delivery email contains a
        personal review link. The link carries a signed code that identifies
        your order and a one-way coded form of the order&apos;s email address
        (not the email address itself). The link works for 365 days. Anyone who
        opens it can write or edit the review for your order, so please do not
        share it.
      </p>
      <p className="text-gray-300 mb-2">
        <strong>What we collect.</strong> When you submit a review we store:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li>your star rating (1 to 5) and the text you write;</li>
        <li>
          the display name shown with your review: we suggest your first name
          and the initial of your last name from your order, and you can change
          it;
        </li>
        <li>
          the order and report the review belongs to, the order&apos;s language,
          the dates it was written, edited and published, and how many times it
          was edited;
        </li>
        <li>
          its moderation status, any automatic check results, and the reason if
          it was not published.
        </li>
      </ul>
      <p className="text-gray-300 mb-4">
        <strong>What is shown publicly.</strong> Your display name, star rating,
        review text and date are shown on the report&apos;s page with a
        &quot;Verified buyer&quot; label, together with the average rating and
        number of reviews. The same details are included in the page code that
        search engines read, so they may appear in search results. Your email
        address, phone number, birth details, order number and payment details
        are never shown.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>How reviews are checked.</strong> Automatic checks look for web
        links, email addresses, phone numbers and HTML code. A review without
        these is published straight away; a review with them is held until our
        team checks it. Our team may decline or remove a review only if it is
        spam, abusive, contains personal data, is off-topic or is not a review
        of the report. We do not decline or remove a review because it is
        negative or has a low rating, and we do not change the words of any
        review. You can edit your review up to three times from the same link;
        an edited review that had been declined goes back for checking.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Preventing misuse.</strong> To limit repeated attempts, we
        count review requests from each IP address over a short period (10
        minutes or 1 hour). The IP address is turned into a one-way code before
        it is counted, the count is used only for that period, and it is not
        stored with your review.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>How long we keep reviews.</strong> We keep a review, whether
        published or not, until you ask us to delete it or we remove it under
        this policy. There is no automatic deletion date. If the order record
        is deleted, its review is deleted with it.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Correcting or deleting your review.</strong> You can correct
        your review yourself using the link in your report email (up to three
        edits). To have it deleted, or for any other request about your review,
        email <strong>support@jyotishasha.com</strong> from the email address
        used for the order, naming the report and the approximate order date.
        After confirming the request came from that address, we delete the
        review completely; no copy is kept in our review records. It is
        removed from the report page straight away, but search engines may show
        an older copy until they next visit the page. While your link is still valid,
        you can use it to write a new review later if you wish.
      </p>
      <p className="text-gray-300 mb-4">
        Reviews belong to website report orders, not to app accounts, so
        deleting your Jyotishasha app account does not delete a review. To
        remove a review as well, say so in your request.
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Security.</strong> Reviews are stored in our database with your
        order records. Only authorised administrators can access the moderation
        tools, and review links are signed with a secret key so they cannot be
        made up or altered.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Data Protection & Retention
      </h2>
      <p className="text-gray-300 mb-4">
        We implement appropriate technical and organizational security measures
        to protect your data. Personal information is retained only as long as
        necessary to provide our services or comply with legal obligations.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Children’s Privacy
      </h2>
      <p className="text-gray-300 mb-4">
        Jyotishasha services are not intended for children under the age of 13.
        We do not knowingly collect personal information from minors.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p className="text-gray-300 mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        reflected on this page with an updated effective date.
      </p>

      <GrievanceOfficer />

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="text-gray-300">
        If you have any questions or concerns regarding this Privacy Policy,
        please contact us:
        <br />
        <strong>Email:</strong> support@jyotishasha.com or jraviom@gmail.com <br />
        <strong>Phone:</strong> +91 9118877495
      </p>

      <p className="text-gray-500 text-sm mt-10">
        Jyotishasha is available on the Google Play Store. By using our website
        or mobile application, you agree to this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Account Deletion
      </h2>
      <p className="text-gray-300 mb-4">
        Users can request deletion of their Jyotishasha account and associated
        personal data at any time. In the app, open the Account tab and tap
        Delete Account. Or email
        <strong> support@jyotishasha.com </strong> or
        <strong> jraviom@gmail.com </strong>
        from your registered email address with the subject line
        <strong> “Account Deletion Request”</strong>.
      </p>
      <p className="text-gray-300 mb-4">
        In-app deletion takes effect immediately; email requests are completed
        within <strong>7 working days</strong> after verification. We delete
        your sign-in account and the profiles, birth details and personalised
        content saved in the app.
      </p>
      <p className="text-gray-300 mb-4">
        Certain transaction records or information required to be retained for
        legal, regulatory, or accounting purposes may be kept for the period
        mandated by applicable laws. This includes payment and purchase
        records and website report orders. Records of app activity are also
        not removed by account deletion. See our{" "}
        <a href="/account-deletion" className="underline">Account Deletion</a>{" "}
        page for exactly what is deleted and what is kept.
      </p>

    </div>
  );
}
