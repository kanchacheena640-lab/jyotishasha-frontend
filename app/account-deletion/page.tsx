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
        <li>From app: Profile → Settings → Delete Account</li>
        <li>Email: support@jyotishasha.com</li>
      </ul>

      <p className="mt-4">
        All data will be permanently deleted within 7 working days.
      </p>
    </div>
  );
}