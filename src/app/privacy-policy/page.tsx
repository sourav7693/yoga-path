import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/MainTemplates";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <MainTemplates>
      <Subbanner heading="Privacy Policy"/>
    
    <section className="w-full bg-gray-50 py-10 px-4 md:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-[1300px] bg-white shadow-lg rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
           PRIVACY POLICY
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
          
         

          {/* 1 */}
          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Payment Details (processed securely via Razorpay)</li>
            </ul>
            <p className="mt-2">
              We do NOT store card details.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide course access</li>
              <li>To send Google Meet links</li>
              <li>To send updates and communication</li>
              <li>For customer support</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">
              3. Data Protection
            </h2>
            <p>
              We implement reasonable security measures to protect user data.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">
              4. Third-Party Services
            </h2>
            <p>
              Payments are processed through Razorpay. We are not responsible for Razorpay’s privacy practices.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">
              5. Data Sharing
            </h2>
            <p>
              We do not sell or rent personal information.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-semibold text-lg md:text-xl mb-2">
              6. Contact
            </h2>
            <p>
              For privacy concerns, contact:
            </p>
            <p className="mt-2">
              📍 Ghogomali, Siliguri, WB – 734006 <br />
              📧 theyogapath@gmail.com
            </p>
          </div>

        </div>
      </div>
    </section>
    </MainTemplates>
  );
};

export default PrivacyPolicyPage;