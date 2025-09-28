export default function ProcessingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="animate-spin h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-purple-700">
          Processing your payment...
        </h2>
        <p className="text-gray-600 mt-2">
          Please wait while we confirm your payment and generate your report.
        </p>
      </div>
    </div>
  );
}
