import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/MainTemplates";
import React from "react";

const ShippingPolicyPage = () => {
  return (
    <MainTemplates>
        <Subbanner heading="Shiping Policy"/>
    
    <section className="w-full bg-gray-50 py-10 px-4 md:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-[1300px] bg-white shadow-lg rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
          SHIPPING POLICY
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">

          <p className="font-semibold">
            Digital Service – No Physical Shipping
          </p>

          <p>
            The Yoga Path provides only digital services.
          </p>

          <p>
            No physical product will be shipped.
          </p>

          <p>
            After successful payment, course access details will be shared via WhatsApp/Email within 24 hours (usually instantly).
          </p>

          <p>
            Access to live classes will be provided through Google Meet link.
          </p>

          <p>
            If you do not receive access details, contact us immediately.
          </p>

        </div>
      </div>
    </section>
    </MainTemplates>
  );
};

export default ShippingPolicyPage;