import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/MainTemplates";
import React from "react";

const RefundPolicyPage = () => {
  return (
    <MainTemplates>
      <Subbanner heading="Refund Policy"/>
      <section className="w-full bg-gray-50 py-10 px-4 md:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-[1300px] bg-white shadow-lg rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
           REFUND POLICY
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">

          <p className="font-semibold">
            No Refund Policy
          </p>

          <p>
            All payments made for online yoga classes and digital courses are non-refundable.
          </p>

          <p>
            Once a course is purchased and access is granted, refunds will not be provided under any circumstances.
          </p>

          <p>
            We recommend reviewing course details carefully before making payment.
          </p>

        </div>
      </div>
      </section>
    </MainTemplates>
  );
};

export default RefundPolicyPage;