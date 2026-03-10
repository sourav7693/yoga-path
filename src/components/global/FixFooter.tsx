"use client";

import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { CourseDoc } from "@/models/Course";

export default function FixFooter({courses} : {courses : CourseDoc[]}) {
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
    <div
      className="fixed bottom-0 left-0 w-full z-50
      md:bg-gradient-to-r from-black via-[#111] to-black
      px-4 py-3 md:py-4  md:rounded-tl-[0px] md:rounded-tr-[0px] rounded-tl-3xl rounded-tr-3xl bg-white"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* ================= MOBILE VIEW ================= */}
        <div className="md:hidden space-y-2">
          {/* Row 1 - Simple Text */}
          <div className="flex justify-center items-center text-sm text-white text-center">
            <span className="text-gray-800">
              Offer Will expire in {" "}
              <span className="font-semibold text-gray-800">
                {String(minutes).padStart(2, "0")}{" "} min{" "}
                {String(seconds).padStart(2, "0")}{" "} sec.
              </span>
            </span>
          </div>

          {/* Row 2 - Full Width Button */}
          <button
            onClick={() => setOpenForm(true)}
            className="w-full animated-glow-btn text-sm py-3 text-white font-semibold text-[20px]"
          >
            Begin My Wellness Journey
          </button>
        </div>

        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden md:flex items-center justify-between gap-2">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className="text-5xl font-bold text-defined-red pt-4">
                ₹99
              </span>
            </div>

            <div className="text-left">
              <p className="text-[12px] text-gray-300 pb-2">Offer Ends in</p>

              <div className="font-semibold text-white mt-1">
                <span className="p-3 bg-gray-600 rounded">
                  {String(minutes).padStart(2, "0")}
                </span>

                <span className="p-3 bg-gray-600 rounded ml-1">
                  {String(seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpenForm(true)}
            className="animated-glow-btn text-xl"
          >
            REGISTER NOW AT ₹99/- ONLY
          </button>
        </div>
      </div>

      {openForm && <FormModal onClose={() => setOpenForm(false)} courses={courses} />}
    </div>
  );
}
