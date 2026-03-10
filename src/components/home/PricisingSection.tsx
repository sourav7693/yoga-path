"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function PricingSection({courses} : {courses : CourseDoc[]}) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); 
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <section className="w-full bg-[#d9d2c5] py-16 md:py-24" id="pricing">
        <div className="max-w-[1200px] mx-auto px-4 text-center">

          {/* Prices */}
          <p className="text-lg line-through text-gray-700">
            Total Value : ₹7,486/-
          </p>

          <h3 className="text-2xl md:text-3xl font-semibold mt-2">
            Regular Price : ₹999/-
          </h3>

          {/* Today's Price Box */}
          <div className="inline-block bg-white rounded-xl px-6 py-3 mt-6 shadow-md">
            <h3 className="text-2xl md:text-3xl font-bold">
              Todays Price : ₹99/-
            </h3>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              onClick={() => setOpenForm(true)}
             className="animated-glow-btn "
            >
              REGISTER NOW AT ₹99/- ONLY
            </button>

          </div>

          {/* Sub Text */}
          <p className="mt-8 text-base md:text-lg font-medium text-gray-800">
            Reserve Your Seat Before The Timer Ends To Unlock End Bonuses Worth ₹6,487/-
          </p>

          {/* Countdown */}
         <div className="flex justify-center gap-4 md:gap-6 mt-10">

  {/* Minutes */}
  <div className="bg-[#2f2f2f] text-white rounded-xl 
                  w-[110px] h-[130px]
                  shadow-lg 
                  flex flex-col items-center justify-center">

    <h2 className="text-4xl md:text-5xl font-bold">
      {String(minutes).padStart(2, "0")}
    </h2>

    <p className="mt-2 text-sm uppercase tracking-wide">
      Minutes
    </p>
  </div>

  {/* Seconds */}
  <div className="bg-[#2f2f2f] text-white rounded-xl 
                  w-[110px] h-[130px]
                  shadow-lg 
                  flex flex-col items-center justify-center">

    <h2 className="text-4xl md:text-5xl font-bold">
      {String(seconds).padStart(2, "0")}
    </h2>

    <p className="mt-2 text-sm uppercase tracking-wide">
      Seconds
    </p>
  </div>

</div>

        </div>
      </section>

      {openForm && <FormModal onClose={() => setOpenForm(false)} courses={courses}/>}
    </>
  );
}