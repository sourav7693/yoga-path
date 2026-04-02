import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentId?: string }>;
}) {
    const { paymentId } = await searchParams;  

    if(!paymentId) redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        <h1 className="text-2xl font-bold">
          ✅ Payment Successful! <br /> Welcome to Your Yoga Journey 🧘‍♂️
        </h1>

        <p className="text-base text-gray-600">
          Thank you for enrolling in our Yoga Course. <br /> Your payment has
          been successfully received.
        </p>

        <div className="bg-green-50 p-4 rounded-xl text-left text-sm text-gray-700">
          📩 We will connect with you soon. <br />
          Meeting links and course details will be shared shortly on your
          registered Email ID and WhatsApp number.
        </div>

        <p className="text-sm text-gray-600">
          Start your journey towards a healthier body and a calmer mind today!
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="tel:+917908623983"
            target="_blank"
            className="w-full rounded-xl text-base bg-black text-white py-2 hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            Contact Now
          </Link>

          <Link href="/" className="w-full rounded-xl text-base border py-2 hover:bg-gray-50 hover:scale-105 transition-all duration-300">
            Explore More Courses
          </Link>
        </div>

        <div className="text-xs text-gray-500 pt-4">
          👉 For any queries, feel free to contact our support team <br />
          📞 +91 79086 23983
        </div>
      </div>
    </div>
  );
}
