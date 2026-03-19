import Link from "next/link";

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentId?: string; reason?: string }>;
}) {
  const { paymentId, reason } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-white p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        <h1 className="text-2xl font-bold">⚠️ Oops! Payment Unsuccessful</h1>
        <h2 className="text-xl font-bold text-red-500">{reason}</h2>

        <p className="text-base text-gray-600">
          Your transaction didn’t go through. <br />
          Payment Id : {paymentId ? paymentId : ""}
        </p>

        <div className="bg-red-50 p-4 rounded-xl text-left text-sm text-gray-700">
          Please try again or return to the course page to restart your
          registration.
        </div>

        <div className="w-full">
          <Link href="/" className="w-full rounded-xl text-base bg-black text-white py-2 hover:scale-105 transition-all duration-300">
            Back to Registration
          </Link>
        </div>

        <div className="text-xs text-gray-500 pt-4">
          📩 Need help? Contact us anytime <br />
          📞 +91 79086 23983
        </div>
      </div>
    </div>
  );
}
