"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);

  const inputClass =
    "w-full px-4 py-3 text-sm " +
    "text-defined-blue placeholder:text-defined-blue " +
    "bg-white/5 backdrop-blur-md border border-gray-200 " +
    "focus:outline-none transition-all duration-300";

  const handleFirstStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Form Submitted Successfully");

    setStep(1); 
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-[17px] font-semibold text-defined-red text-left">
        Lets Talk to Our Counsellors
      </h3>

      <h4 className="text-[14px] font-semibold text-defined-blue text-left">
        Fill out the form below to get started!
      </h4>

      {step === 1 && (
        <form onSubmit={handleFirstStep} className="space-y-3">
          <div className="rounded-[10px] overflow-hidden">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className={`${inputClass} rounded-tl-[10px] rounded-tr-[10px]`}
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              className={`${inputClass} rounded-bl-[10px] rounded-br-[10px]`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-defined-red text-white py-3 mt-2 rounded-md font-semibold transition-all duration-300 hover:opacity-90"
          >
            Register Now
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleFinalSubmit} className="space-y-3">
          <div className="rounded-[10px] overflow-hidden">
            <select
              name="course"
              required
              defaultValue=""
              className={`${inputClass} rounded-tl-[10px] rounded-tr-[10px]`}
            >
              <option value="" disabled className="text-black">
                Select Course
              </option>
              <option value="Yoga Class-I" className="text-black">
                Yoga Class-I
              </option>
              <option value="Yoga Class-II" className="text-black">
                Yoga Class-II
              </option>
              <option value="Yoga Class-III" className="text-black">
                Yoga Class-III
              </option>
              <option value="Yoga Class-IV" className="text-black">
                Yoga Class-IV
              </option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Location"
              className={inputClass}
            />

            <input
              type="text"
              name="remark"
              placeholder="Remark"
              className={`${inputClass} rounded-bl-[10px] rounded-br-[10px]`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-defined-red text-white py-3 mt-2 rounded-md font-semibold transition-all duration-300 hover:opacity-90"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}