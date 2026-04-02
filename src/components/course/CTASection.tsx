import React from "react";

const CTASection = () => {
  return (
    <section className="w-full py-8 lg:py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">

        <div className="rounded-[32px] bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-14 px-6 flex flex-col items-center gap-6">

          <h2 className="text-3xl md:text-4xl font-semibold">
            Start Your Yoga Journey Today
          </h2>

          <p className="text-sm md:text-base text-white/90 max-w-xl">
            Limited Seats Available. Reserve your mat now and begin your transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            
            <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition">
              Book Your Seat Now
            </button>

            <button className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white/10 transition">
              Contact Support
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;