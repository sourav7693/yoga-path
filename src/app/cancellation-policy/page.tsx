import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/MainTemplates";
import React from "react";

const CancellationPolicyPage = () => {
  return (
    <MainTemplates>
        <Subbanner heading="Cancellation Policy"/>
    <section className="w-full bg-gray-50 py-10 px-4 md:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-[1300px] bg-white shadow-lg rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
           CANCELLATION POLICY
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">

          <p>
            Once a course is booked, cancellation is generally not allowed.
          </p>

          <p>
            In genuine cases (medical emergency or exceptional circumstances), cancellation requests may be reviewed.
          </p>

          <p>
            Approval of cancellation is at the sole discretion of The Yoga Path management.
          </p>

          <p>
            If approved, credit may be adjusted for a future batch instead of refund.
          </p>

          <p>
            To request cancellation, contact via WhatsApp within 24 hours of booking.
          </p>

        </div>
      </div>
    </section>
    </MainTemplates>
  );
};

export default CancellationPolicyPage;