import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/MainTemplates";
import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <MainTemplates>
        <Subbanner heading="Terms & Condition"/>
    <section className="w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-[1300px] bg-white shadow-lg rounded-2xl p-6 md:p-10">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
           TERMS & CONDITIONS
        </h1>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
          
          

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">1. Introduction</h2>
            <p>
              Welcome to The Yoga Path. By enrolling in our online yoga classes and purchasing our digital courses, you agree to abide by the following Terms & Conditions.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">2. Services</h2>
            <p>The Yoga Path provides:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Online Yoga Classes</li>
              <li>Pre-recorded / Live Yoga Sessions</li>
              <li>Digital Yoga Courses</li>
              <li>Access via Google Meet link shared through WhatsApp</li>
            </ul>
            <p className="mt-2">All services are delivered digitally.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">3. Course Enrollment & Access</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>After successful payment via Razorpay, a confirmation will be sent via Email/WhatsApp.</li>
              <li>Google Meet access link will be shared before the session starts.</li>
              <li>Users must provide correct contact details during checkout.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">4. Pricing</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Average course price: ₹499 INR (may vary depending on course type).</li>
              <li>All prices are in Indian Rupees (INR).</li>
              <li>Prices may change without prior notice.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">5. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Maintain respectful behavior in live sessions.</li>
              <li>Do not share course links with unauthorized users.</li>
              <li>Recording or redistributing sessions is strictly prohibited.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">6. Intellectual Property</h2>
            <p>
              All course materials, videos, content, and branding belong to The Yoga Path. Unauthorized reproduction is prohibited.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">7. Limitation of Liability</h2>
            <p>
              Participants are advised to consult a doctor before starting any yoga program. The Yoga Path is not liable for injuries due to improper practice.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">8. Governing Law</h2>
            <p>
              These Terms are governed by Indian law under the jurisdiction of Siliguri, West Bengal.
            </p>
          </div>

        </div>
      </div>
    </section>
    </MainTemplates>
  );
};

export default TermsAndConditionsPage;