import GrievanceOfficer from "@/components/legal/GrievanceOfficer";
import { BUSINESS_SUPPORT } from "@/lib/legalContacts";

// F10-P19: what account deletion actually removes and keeps, matching the
// backend (modules/auth/account_deletion_service.py, D0.1 policy;
// routes/routes_auth.py /api/auth/delete-account; firebase_cleanup_service.py).
export default function AccountDeletionPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Account Deletion – Jyotishasha
      </h1>
      <p className="mb-4">
        You can request deletion of your account and personal data using the following methods:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>From the app: open the Account tab and tap Delete Account. This takes effect immediately.</li>
        <li>
          Email: {BUSINESS_SUPPORT.email} from your registered email address. Email requests are completed
          within 7 working days after we verify them.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">What is deleted</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Your sign-in account.</li>
        <li>The profiles and birth details saved in the app.</li>
        <li>
          Personalised app content created for you: dasha timelines, alerts, AI-generated app reports,
          notifications, daily personalised content and your free daily questions.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">What we keep, and why</h2>
      <p className="mb-2">
        Some records are not deleted, because they are transaction records we keep for legal, tax and
        accounting purposes, or because they are not linked to your app account:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Payment and purchase records, such as subscriptions, Ask Now and chat purchases and payment
          confirmations. If you have any of these, your app profile is kept in anonymised form, with your
          name and other personal details removed, so that these records stay complete.
        </li>
        <li>
          Website report orders, including the name, email address, phone number and birth details entered
          for the report, because they are payment records linked to the order rather than to your app
          account.
        </li>
        <li>Records of app activity (which features were used and when), stored under an internal account identifier.</li>
        <li>
          Reviews of website reports. They belong to report orders, not to your app account; to have a review
          deleted, say so in your request (see our{" "}
          <a href="/privacy-policy#reviews" className="underline">Privacy Policy</a>).
        </li>
      </ul>
      <p className="mt-4">
        We keep these records for legal, tax and accounting purposes; at present they are not deleted
        automatically after a fixed period. For more detail, see our{" "}
        <a href="/privacy-policy" className="underline">Privacy Policy</a>.
      </p>

      <GrievanceOfficer />
    </div>
  );
}
