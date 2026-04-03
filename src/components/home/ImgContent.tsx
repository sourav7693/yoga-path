"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function ImgContent() {
  return (
    <section className="w-full bg-[linear-gradient(90deg,#AD46FF_0%,#16A34A_100%)] py-16 px-4">
  
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
       
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative rounded-tr-[80px] rounded-bl-[80px]">
          <Image
            src="/assets/new-img/Social Initiatives.jpg"
            alt="Yoga"
            fill
            className="object-cover rounded-tr-[80px] rounded-bl-[80px]"
          />
        </div>

      
        <div className="flex flex-col justify-center text-left text-white">
   
          <h2 className="text-3xl md:text-2xl font-bold leading-snug">
            Our Signature{" "}
            <span className=" text-3xl md:text-3xl">Offerings</span>
          </h2>
          <h3 className="text-[20px] text-white pt-2 font-semibold">
            Underprivileged Children and BMC
          </h3>

     
          <p className="mt-4 leading-relaxed text-white/90">
            Since 1994, Yoga Education program for BMC School Students has<br></br> been
            successfully running. The sessions are a mix of Yoga Asanas,<br></br>
            Pranayamas, Kriyas and Philosophy and Yogic Games, for holistic<br></br>
            development of the students.
          </p>

 
          <Link href={"/contact"}
            className="mt-6 inline-flex items-center gap-2 
            bg-white text-defined-green px-6 py-3 rounded-full font-medium 
            hover:gap-3 transition-all duration-300 w-fit shadow-md"
          >
            Contact Us <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
