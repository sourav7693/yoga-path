"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function Highlights() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-3 gap-6">

       
        <div className="relative rounded-2xl overflow-hidden group h-[500px]">
          <Image
            src="/assets/new-img/highlight5.jpeg"
            alt="Yoga"
            fill
            className="object-cover"
          />

         
          <div className="absolute bottom-0 left-0 w-full p-5 bg-[#AD46FFE5] text-white">
            <h3 className="text-lg font-semibold">Yoga Training</h3>
            <p className="text-sm mt-1">
              Improve flexibility and mental clarity with expert sessions.
            </p>

            <button className="mt-4 inline-flex items-center gap-2 hover:gap-3 transition-all">
              Explore More <FiArrowRight />
            </button>
          </div>
        </div>

       
        <div className="relative rounded-2xl overflow-hidden group h-[500px]">
          <Image
            src="/assets/new-img/highlights4.png"
            alt="Meditation"
            fill
            className="object-cover"
          />

        
          <div className="absolute bottom-0 left-0 w-full p-5 bg-[#AD46FFE5] text-white">
            <h3 className="text-lg font-semibold">Meditation</h3>
            <p className="text-sm mt-1">
              Find inner peace through guided meditation practices.
            </p>

            <button className="mt-4 inline-flex items-center gap-2 hover:gap-3 transition-all">
              Explore More <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-start h-full">

          <h2 className="text-3xl md:text-3xl font-bold">
            Transform Your  <span className="text-defined-green text-3xl md:text-4xl">Life with Yoga</span>
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed text-justify">
            Yoga is more than just physical exercise—it is a path to complete transformation. At The Yoga Path, we help individuals reconnect with their inner selves, reduce stress, and improve overall well-being through guided practices. With consistent learning and expert mentorship, you can experience greater clarity, emotional balance, and inner peace, empowering you to live a healthier, more mindful, and fulfilling life every day.
          </p>

        
          <button className="mt-6 inline-flex items-center gap-2 
            bg-defined-purple 
            text-white px-6 py-3 rounded-full font-medium 
            hover:gap-3 transition-all duration-300 shadow-md w-fit">
            Contact Us <FiArrowRight />
          </button>

        </div>

      </div>
    </section>
  );
}