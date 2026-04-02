"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function SignatureOffering() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
        
      
        <div className="flex flex-col justify-between h-full">
          
      
          <div>
            <h2 className="text-3xl md:text-2xl font-normal leading-snug">
             Explore Our Holistic {" "}
              <span className="text-[#AD46FF] text-3xl md:text-3xl"> Yoga and Healing Programs</span>
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed text-justify">
             At The Yoga Path, we offer a range of carefully designed programs to suit every stage of your wellness journey. From beginner-friendly Sahaj Yoga to advanced yoga practices, each course is structured to build strength, flexibility, and mindfulness. Our exclusive sound healing sessions further enhance emotional and spiritual balance. Whether you are starting fresh or deepening your practice, our offerings are accessible, affordable, and designed for global learners.

            </p>

          </div>

  
          <div className="mt-6">
            <button className="inline-flex items-center gap-2 
              bg-defined-purple 
              text-white px-6 py-3 rounded-full 
              font-medium shadow-md 
              hover:gap-3 transition-all duration-300">
              Explore More <FiArrowRight />
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full rounded-3xl overflow-hidden">
          <Image
            src="/assets/new-img/offering.png" 
            alt="Yoga About"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}