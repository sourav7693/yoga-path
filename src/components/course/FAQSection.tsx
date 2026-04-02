"use client";

import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  heading: string;
  faqs: FAQItem[];
}

const FAQSection = ({ data }: { data: FAQProps }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-8 lg:py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold 
          bg-gradient-to-r from-defined-purple/70 to-defined-purple
          bg-clip-text text-transparent">
          {data.heading}
        </h2>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {data.faqs.map((faq, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-700
                  ${isActive ? "border-purple-400 shadow-md" : "border-gray-200"}
                `}
              >

                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-defined-black">
                    {faq.question}
                  </span>

                  <span className="text-purple-600">
                    {isActive ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 px-5
                    ${isActive ? "max-h-full pb-5" : "max-h-0"}
                  `}
                >
                  <p className="text-sm text-defined-brown leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;